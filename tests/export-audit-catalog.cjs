const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'audit');
const csv=(rows)=>rows.map(row=>row.map(value=>`"${String(value??'').replaceAll('"','""')}"`).join(',')).join('\n')+'\n';
const id=(chapter,heading)=>'S-'+crypto.createHash('sha1').update(chapter+'\0'+heading).digest('hex').slice(0,10);

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  let page;
  try{
    page=await browser.newPage();
    page.on('pageerror',e=>console.error('PAGE ERROR',e.message));
    page.on('console',m=>{if(m.type()==='error')console.error('CONSOLE ERROR',m.text())});
    await page.goto(pathToFileURL(path.join(root,'index.html')).href);
    await page.waitForTimeout(1200);
    const data=await page.evaluate(()=>({
      chapters:CHAPTERS.map((c,ci)=>({ci,title:c.title,date:c.date,place:c.place,steps:c.steps.map(s=>({heading:s.heading,cast:s.cast||[],choices:s.choices?.length||0,fx:s.fx||''}))})),
      people:Object.entries(PEOPLE).map(([key,p])=>({key,name:p.name,title:p.title,home:p.home,introducedAt:p.introducedAt})),
      children:Object.entries(CHILDREN).map(([key,c])=>({key,...c})),
      art:TEST140.artPlacements()
    }));
    const result=JSON.parse(fs.readFileSync(path.join(root,'tests/results/browser-v146.json'),'utf8'));
    fs.mkdirSync(out,{recursive:true});
    const sceneRows=[['审计场景ID','路线','章节序号','章节','场景序号','场景','章节日期','章节地点','视角','在场人物','当场目的','冲突','选项数','立即结果','延迟回应','环境效果','配图ID','核查状态']];
    for(const x of result.scenes){
      const ch=data.chapters[x.ci],step=ch.steps.find(s=>s.heading===x.heading)||{};
      const arts=data.art.filter(p=>p.chapter===ch.title&&p.scene===x.heading).map(p=>p.id).join('、');
      let purpose='',conflict='',after='',later='',status='待逐场人工核查';
      if(ch.title==='中宫空悬'&&x.heading.includes('一年多以后')){purpose='催定中宫与宫务归口';conflict='礼部请立疏久压，宫务无人可用凤印';status='本批已读双路线';}
      if(ch.title==='中宫空悬'&&x.heading.includes('不是她的错')){purpose='将三皇子陈述与旧处分一并送礼部';conflict='避免只摘张元照回避或三皇子言语';after='两份送礼部';status='本批已读双路线，三种处分待专项测试';}
      if(ch.title==='中宫空悬'&&x.heading==='东角门开了一刻钟'){purpose='撤出皇嗣并记录启门责任';conflict='西门人流相撞，东门平日禁开';after='撤人、清点、留值簿';later='继后议册回想此事';status='本批已读双路线';}
      sceneRows.push([id(ch.title,x.heading),x.route,x.ci+1,ch.title,x.si+1,x.heading,ch.date,ch.place,'皇帝第一人称（待逐场复核）',(step.cast||[]).join('、'),purpose,conflict,step.choices||'',after,later,step.fx||'',arts,status]);
    }
    fs.writeFileSync(path.join(out,'场景表.csv'),csv(sceneRows));
    const imageRows=[['资源ID','资源路径','用途标题','审计场景ID','章节','场景','显示段落序号','路线条件','剧透核查','视觉结论','比例','交互状态']];
    for(const p of data.art)imageRows.push([p.id,p.src,p.caption,id(p.chapter,p.scene),p.chapter,p.scene,p.after+1,'按场景显示','待人工逐张核查',p.id==='125'?'保留：空殿与重新开门相符':'待人工逐张核查',`${p.width}:${p.height}`,'无']);
    imageRows.push(['095','assets/asset-095.webp','原标凤仪宫两人对话',id('中宫空悬','她们第一次把话说在凤仪宫里'),'中宫空悬','她们第一次把话说在凤仪宫里',1,'无','无','取消展示：画面含男性，与两名女性对话不符','1448:1086','无']);
    imageRows.push(['101','assets/asset-101.webp','原标东角门火息之后',id('中宫空悬','东角门开了一刻钟'),'中宫空悬','东角门开了一刻钟',10,'无','无','取消展示：殿内群像无法说明火场','1448:1086','改用可展开位置说明；不改剧情状态']);
    fs.writeFileSync(path.join(out,'图片互动表.csv'),csv(imageRows));
    const personRows=[['类别','正式ID','姓名','初始称号或序齿','初始住处','入场章索引','出生／登记','生母','状态／位分变更来源','核查状态']];
    for(const p of data.people)personRows.push(['人物',p.key,p.name,p.title,p.home,p.introducedAt,'','','待按册命场景补齐','初始资料已提取，时序待逐项核查']);
    for(const c of data.children)personRows.push([c.key==='unborn'?'孕胎（未入玉牒）':'皇嗣',c.key,c.name||'',c.order||'',c.home||'',c.introducedAt??'',c.birth??c.age??'',c.mother||c.motherName||'',c.key==='unborn'?'未出生，不应出现在现存皇嗣名单':'待按出生与入玉牒场景核对','数据已提取，时序待逐项核查']);
    fs.writeFileSync(path.join(out,'人物皇嗣基表.csv'),csv(personRows));
    const snapshots=[['路线','章首／卷终索引','章节','正式ID','姓名','当前位分／称号','住处','记录性质']];
    for(const route of ['direct','ning'])for(const ci of [0,13,17,22,23,24,26]){
      await page.evaluate(({ci,route})=>TEST140.jump(ci,0,route,'preset'),{ci,route});
      const rows=await page.evaluate(()=>Object.keys(PEOPLE).map(key=>{const p=v138Person(key);return {key,name:p.name,title:p.title,home:p.home,status:p.status}}));
      for(const p of rows)snapshots.push([route,ci,ci===26?'卷终':data.chapters[ci].title,p.key,p.name,p.title,p.home,'按该路线默认前情重建；非全部选择组合']);
    }
    fs.writeFileSync(path.join(out,'人物时序快照.csv'),csv(snapshots));
    console.log(JSON.stringify({scenes:sceneRows.length-1,activeImages:data.art.length,people:data.people.length,children:data.children.length,snapshots:snapshots.length-1,files:['audit/场景表.csv','audit/图片互动表.csv','audit/人物皇嗣基表.csv','audit/人物时序快照.csv']}));
  }finally{
    const timeout=()=>new Promise(resolve=>setTimeout(resolve,3000));
    if(page&&!page.isClosed())await Promise.race([page.close(),timeout()]);
    await Promise.race([browser.close(),timeout()]);
  }
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
