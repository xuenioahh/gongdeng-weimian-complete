const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/历史Prompt总审计_2026-10-11');
async function main(){
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const report={pass:false,checks:[],errors:[],consoleErrors:[]},runtime=[];
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text())});
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);
  const cases=[
   ['宫灯渐繁','承熙四年三月 · 霍家的旧簿','问候和旧事的半张纸'],
   ['旧茶未凉','三次转手的军令','不能证明沈家兄长那日一定在营里'],
   ['旧茶未凉','旧案现在由你亲自决定怎么查','若最后查出兄长当时确有别的过失'],
   ['旧茶未凉','我与顺王单独谈了一次','都有'],
   ['旧茶未凉','平反文书怎么写','不能补一个人进去'],
   ['旧茶未凉','宫外旧纸 · 茶棚','仍未把它列作改判依据'],
   ['旧茶未凉','偏廊只说三句话','你以前总说琴坏了还能修'],
   ['王府旧笼','九岁以后，她一直住在顺王府','可我连问一问的机会都没有'],
   ['王府旧笼','永和宫里，那句话并不陌生','烧路引是他下的令'],
   ['帘后朱笔','顺王从封地递来','能用的意见照用'],
   ['凤仪宫最后一冬','皇嗣院第一次不按母妃分房','调人权随疫务结束收回'],
   ['凤仪宫最后一冬','十月二十三，凤仪宫灯灭','她没有因为顾明宜离世就走近我'],
   ['长枝渐高','张元照把这件事报到御前','不要把臣妾记得皇后娘娘'],
   ['中宫空悬','一年多以后','问到当年当值的宫人']
  ];
  for(const route of ['direct','ning'])for(const [chapter,needle,expected] of cases){
   const at=await page.evaluate(async({chapter,needle,route})=>{const ci=CHAPTERS.findIndex(c=>c.title===chapter),si=TEST140.scenes(ci,route).findIndex(st=>String(st.heading).includes(needle));if(si<0)return {ci,si};await TEST140.jump(ci,si,route,'preset');return {ci,si};},{chapter,needle,route});
   assert.ok(at.ci>=0&&at.si>=0,chapter+' '+needle+' exists');
   await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});
   const text=await page.locator('.prose').innerText();assert.ok(text.includes(expected),chapter+' '+needle+' missing '+expected);
   if(needle.includes('茶棚'))assert.ok(!text.includes('中旨赶到军中'));
   await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.setViewportSize({width:1440,height:900});
   report.checks.push({route,chapter,needle,expected,mobile:true});
  }
  // Every newly added scene must be visible, and enrollment/death must control each character.
  const lowCases=[['宫灯渐繁','承熙四年秋 · 各宫的灯','鞋口重新缝过'],['窗开半扇','五月初八','借你的人'],['凤座无人','春衣少了几个尺寸','旧袋缝得密'],['西华门外','西华门还在那里','借人的时辰仍照旧']];
  const show=async(chapter,needle,absent)=>{
   await page.evaluate(async({chapter,needle,absent})=>{
    const ci=CHAPTERS.findIndex(c=>c.title===chapter),si=TEST140.scenes(ci,'direct').findIndex(st=>String(st.heading).includes(needle));await TEST140.jump(ci,si,'direct','preset');
    state.flags.lowConsorts=['cao2','zhao2','lin2','du2'];state.flags.v46LowVictim=absent||null;
    for(const key of ['cao2','zhao2','lin2','du2','liang2','song2'])state.ranks[key]='常在';
    if(absent)state.ranks[absent]=absent==='liang2'||absent==='song2'?'待选':'故常在';render();
   },{chapter,needle,absent});
   await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});return page.locator('.prose').innerText();
  };
  for(const [chapter,needle,expected] of lowCases){assert.ok((await show(chapter,needle)).includes(expected));report.checks.push({chapter,needle,expected,allLiving:true});}
  const late='西华门外',needle='西华门还在那里';
  const exclusions={cao2:'两条路都讲清',zhao2:'袖口折得和平日',lin2:'慢慢补旧袋',du2:'借人的时辰仍照旧',liang2:'借人的时辰仍照旧',song2:'慢慢补旧袋'};
  for(const [key,quote] of Object.entries(exclusions)){assert.ok(!(await show(late,needle,key)).includes(quote),key+' absent or deceased leaked into new life scene');report.checks.push({key,absence:true});}
  // Read both non-full epidemic policies after choosing them, rather than
  // granting a temporary badge through a display-only state injection.
  for(const [pick,expected] of [[1,'没有领临时调人牌'],[2,'她未领御前临时牌']]){
   await page.evaluate(async()=>{const ci=16,si=TEST140.scenes(ci,'direct').findIndex(st=>st.heading==='张元照要的不是药方');await TEST140.jump(ci,si,'direct','preset')});
   await page.locator('[data-choice="'+pick+'"]').click();
   while(!(await page.locator('.scene-title').innerText()).includes('皇嗣院第一次不按母妃分房'))await page.locator('[data-choice]:not(:disabled)').first().click();
   const prose=await page.locator('.prose').innerText();assert.ok(prose.includes(expected));assert.ok(!prose.includes('临时牌用了十日'));report.checks.push({policy:pick,expected,actualChoice:true});
  }
  await page.evaluate(async()=>{const ci=13,si=TEST140.scenes(ci,'direct').findIndex(st=>st.heading==='九月 · 迁宫册最后一页，写的是张元照');await TEST140.jump(ci,si,'direct','preset')});
  assert.match(await page.locator('.scene-title').innerText(),/^暮春/);
  await page.locator('#v52-archives').click();await page.locator('[data-save-slot="3"]').click();await page.locator('#modal .close').click();
  await page.locator('[data-choice]:not(:disabled)').first().click();await page.locator('#v52-archives').click();await page.locator('[data-load-slot="3"]').click();
  assert.match(await page.locator('.scene-title').innerText(),/^暮春/);report.checks.push({promotionCalendar:true,legacySceneIndex:true,saveLoad:true});
  // Capture real rendered prose for requirement-to-result audit, separate from source strings.
  for(const route of ['direct','ning'])for(let ci=0;ci<26;ci++){
   await page.evaluate(({ci,route})=>TEST140.jump(ci,0,route,'preset'),{ci,route});
   const chapter=await page.evaluate(()=>({title:CHAPTERS[state.index].title,date:CHAPTERS[state.index].date,steps:CHAPTERS[state.index].steps.map(st=>({heading:st.heading,narrative:!!st.narrative,cast:st.cast||[],choices:(st.choices||[]).map(c=>({label:typeof c.label==='function'?c.label(state):c.label,effects:c.effects||{},requires:typeof c.requires==='function'?c.requires.toString():c.requires,costMind:c.costMind||0}))}))}));
   for(let si=0;si<chapter.steps.length;si++){
    const scene=await page.evaluate(({si,route})=>{
     if(state.chapterStep!==si)throw Error('Runtime export lost actual scene progression');
     state.view='story';render();const st=CHAPTERS[state.index].steps[si];
     if(st.v95ManualRoster){
      for(const key of ['cao2','zhao2','lin2','ye2','du2'])if(!(state.flags.v78LowSelected||[]).includes(key))document.querySelector('[data-v95-low="'+key+'"], [data-v78-low="'+key+'"]').click();
     }
     const captured={heading:document.querySelector('.scene-title')?.innerText,text:document.querySelector('.prose')?.innerText||'',ranks:{...state.ranks},flags:JSON.parse(JSON.stringify(state.flags))};
     const buttons=[...document.querySelectorAll('[data-choice]')];
     let pick=st.choices.some(c=>c.v74ShaoThenZhang)?st.choices.findIndex(c=>route==='ning'?c.v74ShaoThenZhang:c.effects?.flags?.v44NewEmpress==='zhangyuanzhao'):buttons.findIndex(b=>!b.disabled);
     if(pick<0||buttons[pick]?.disabled)throw Error('No playable export choice at '+state.index+':'+si+' '+st.heading);
     buttons[pick].click();return captured;
    },{si,route});
    runtime.push({route,ci,si,title:chapter.title,date:chapter.date,...chapter.steps[si],displayHeading:scene.heading,text:scene.text,ranks:scene.ranks,flags:scene.flags});
   }
  }
  fs.writeFileSync(path.join(out,'当前运行场景.json'),JSON.stringify(runtime,null,2));
  const before=JSON.parse(fs.readFileSync(path.join(root,'audit/疫情篇专项重写/runtime-before.json')));
  // Compare scene count and choice definitions to the immediately preceding backup in a separate page.
  const old=await browser.newPage({reducedMotion:'reduce'});
  await old.route('**/assets/**',r=>r.abort());
  await old.goto(pathToFileURL(path.join(root,'backups/历史Prompt总审计_2026-10-11/index.html')).href);
  for(const route of ['direct','ning'])for(let ci=0;ci<26;ci++){
   const engine=async p=>p.evaluate(async({ci,route})=>{await TEST140.jump(ci,0,route,'preset');return CHAPTERS[ci].steps.map(st=>({heading:st.heading,narrative:!!st.narrative,choices:(st.choices||[]).map(c=>({label:typeof c.label==='function'?c.label.toString():c.label,effects:c.effects,requires:typeof c.requires==='function'?c.requires.toString():c.requires,costMind:c.costMind}))}));},{ci,route});
   assert.deepEqual(await engine(page),await engine(old),route+' chapter '+(ci+1)+' changed saved scene/choice structure');
  }
  report.engineChapters=52;report.renderedScenes=runtime.length;
  const biographyViews=[];
  for(const route of ['direct','ning']){
   await page.evaluate(route=>TEST140.jump(26,0,route,'preset'),route);
   const keys=await page.evaluate(()=>[...new Set([...document.querySelectorAll('#app [data-person]')].map(b=>b.dataset.person))]);
   for(const key of keys){
    await page.locator('#app [data-person="'+key+'"]').first().click();
    const life=await page.locator('#modal .history-biography138').innerText();assert.ok(life.length>40,key+' life missing');
    biographyViews.push({route,key,text:life});await page.locator('#close-modal138').click();
   }
  }
  fs.writeFileSync(path.join(out,'人物志实际详情.json'),JSON.stringify(biographyViews,null,2));report.biographyViews=biographyViews.length;
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.consoleErrors,[]);report.pass=true;
 }finally{fs.writeFileSync(path.join(out,'本轮定向验收.json'),JSON.stringify(report,null,2));await browser.close();}
 console.log(JSON.stringify({pass:report.pass,checks:report.checks.length,engineChapters:report.engineChapters,renderedScenes:report.renderedScenes,errors:report.errors}));
}
module.exports={main};if(require.main===module)main().catch(e=>{console.error(e);process.exit(1)});
