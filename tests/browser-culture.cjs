const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),url=pathToFileURL(path.join(root,'index.html')).href;
const out=path.join(root,'audit','宫廷生活文化深化');
const baseline=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/culture-structure-before.json'),'utf8'));
const hash=value=>crypto.createHash('sha256').update(JSON.stringify(order(value))).digest('hex');
function order(value){if(Array.isArray(value))return value.map(order);if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(k=>[k,order(value[k])]));return value;}
const targets=[
 [0,'正月后半 · 宫里渐渐有了日常','细蓝线'],
 [1,'入宫第一周','绿豆糕'],
 [2,'杏仁酥送错了门','整叶沏开的绿茶'],
 [3,'琴、舞与一盘残局','宋人点茶的旧法'],
 [4,'两位母亲看梅','武夷红茶'],
 [6,'三位新人各自站稳脚跟','咸香酥饼'],
 [10,'夏末 · 新茶第一次被人嫌难喝','当年的春茶'],
 [17,'正月十六 · 新封号叫错的第一天','腊梅'],
 [18,'第一场家宴，桌子短了一截','细蓝线'],
 [18,'四月夜 · 新茶不是为了翻旧案','少糖米糕'],
 [20,'凤印在库里过了第二个冬天','鹿脯'],
 [21,'家宴席间，诸子女渐长','盛壳的小碟']
];

async function surface(page,label){
 const data=await page.evaluate(()=>{
  const chapter=document.querySelector('.chapter'),r=chapter.getBoundingClientRect();
  return {pos:[state.index,state.chapterStep],heading:document.querySelector('.scene-title').innerText,text:document.querySelector('.prose').innerText,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,chapterHeight:chapter.clientHeight,chapterScroll:chapter.scrollHeight,
   choices:[...document.querySelectorAll('[data-choice]')].map(b=>({bound:typeof b.onclick==='function',inside:b.getBoundingClientRect().bottom<=r.bottom+1})),
   images:[...document.querySelectorAll('.moment-figure[data-scene-asset]')].map(e=>({id:e.dataset.sceneAsset,after:e.dataset.afterParagraph,previous:e.previousElementSibling?.dataset.voiceLine,anchor:e.previousElementSibling?.innerText})),
   people:Object.fromEntries(['gu','fang','zhangyuanzhao','hanzhang','zhou','afu'].map(k=>[k,v138Person(k)])),
   children:v138Children().map(c=>({key:c.key,name:c.name,dead:c.dead}))};
 });
 assert.ok(data.scrollWidth<=data.width+1,label+': horizontal overflow');
 assert.ok(data.chapterScroll<=data.chapterHeight+2,label+': clipped prose');
 assert.ok(data.choices.length&&data.choices.every(c=>c.bound&&c.inside),label+': choices missing, unbound or clipped');
 assert.ok(data.images.every(a=>a.after===a.previous),label+': image detached from paragraph');
 return data;
}

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const errors=[],report={structureChecks:0,sceneChecks:[],saveLoad:false,errors};
 fs.mkdirSync(out,{recursive:true});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto(url);await page.waitForTimeout(600);
  for(const expected of baseline.chapters){
   await page.evaluate(({ci,route})=>TEST140.jump(ci,0,route,'preset'),{ci:expected.index,route:expected.route});
   const actual=await page.evaluate(()=>{
    const serialize=v=>JSON.parse(JSON.stringify(v,(_k,item)=>typeof item==='function'?item.toString():item));
    const c=CHAPTERS[state.index];
    return {title:c.title,date:c.date,place:c.place,state:{flags:state.flags,ranks:state.ranks},steps:c.steps.map(st=>{const result=serialize(st);delete result.text;delete result.cast;
      // Later romance/neighbor prose wrappers mark only whether text was appended.
      // Keep all choices, effects, requires and actual event flags in the hash.
      for(const key of ['__v141HeWangRain','__v141SecondBatchTable','__v141NeighborReturns','__v140MutualChoice','__v140SharedDays','__v140RomanceTouch'])delete result[key];
      return result;})};
   });
   assert.equal(actual.title,expected.title);assert.equal(actual.date,expected.date);assert.equal(actual.place,expected.place);
   if(hash(actual.state)!==expected.stateHash)fs.writeFileSync(path.join(out,'state-difference.json'),JSON.stringify({route:expected.route,index:expected.index,actual:actual.state},null,2));
   assert.equal(hash(actual.state),expected.stateHash,expected.route+' '+expected.title+': preceding outcomes changed');
   assert.equal(actual.steps.length,expected.steps.length,expected.title+': scene positions changed');
   actual.steps.forEach((st,i)=>{assert.equal(st.heading,expected.steps[i].heading);assert.equal(hash(st),expected.steps[i].engineHash,expected.title+' / '+st.heading+': choice, guard or event metadata changed');});
   report.structureChecks+=actual.steps.length;
  }
  console.log('All '+report.structureChecks+' scene structures and 52 route/chapter states match the pre-edit baseline.');
  for(const route of ['direct','ning'])for(const [ci,heading,marker] of targets){
   const scenes=await page.evaluate(({ci,route})=>TEST140.scenes(ci,route),{ci,route});
   const si=scenes.findIndex(st=>st.heading===heading);assert.ok(si>=0,heading+': scene missing');
   await page.evaluate(({ci,si,route})=>TEST140.jump(ci,si,route,'preset'),{ci,si,route});
   await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});
   const desktop=await surface(page,route+' '+heading);assert.ok(desktop.text.includes(marker),heading+': culture detail absent from actual display');
   if(ci===3){assert.equal(desktop.people.gu.dead,false);assert.equal(desktop.people.fang.dead,false);await page.screenshot({path:path.join(out,'点茶_桌面.png'),fullPage:true});}
   if(ci===17){assert.equal(desktop.people.gu.dead,true);assert.ok(!desktop.text.includes('玉兰'));}
   await page.setViewportSize({width:390,height:844});
   const mobile=await surface(page,'mobile '+heading);
   if(ci===17&&route==='direct')await page.screenshot({path:path.join(out,'插花_手机.png'),fullPage:true});
   report.sceneChecks.push({route,chapter:ci+1,heading,desktop,mobile});
   await page.setViewportSize({width:1440,height:900});
  }
  const flower=report.sceneChecks.find(s=>s.chapter===18&&s.route==='direct');
  await page.evaluate(({ci,si})=>TEST140.jump(ci,si,'direct','preset'),{ci:17,si:flower.desktop.pos[1]});
  const saved=await page.evaluate(()=>({index:state.index,step:state.chapterStep,history:state.stepHistory.slice(),flags:{...state.flags},ranks:{...state.ranks}}));
  await page.locator('#v52-archives').click();await page.locator('[data-save-slot="2"]').click();await page.locator('#modal .close').click();
  await page.locator('[data-choice]:not(:disabled)').first().click();
  await page.locator('#v52-archives').click();await page.locator('[data-load-slot="2"]').click();
  assert.deepEqual(await page.evaluate(()=>({index:state.index,step:state.chapterStep,history:state.stepHistory.slice(),flags:{...state.flags},ranks:{...state.ranks}})),saved,'save/load altered culture-scene state');
  await page.reload();await page.locator('.chapter').waitFor();
  const reloaded=await surface(page,'reloaded flowers');
  assert.deepEqual(reloaded.pos,[saved.index,saved.step]);assert.equal(reloaded.text.split('东配殿窗前铺着旧布').length-1,1,'reload duplicated prose');
  report.saveLoad=true;assert.deepEqual(errors,[],'browser errors');
  fs.writeFileSync(path.join(out,'功能核查.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:true,structures:report.structureChecks,scenes:report.sceneChecks.length,viewports:2,saveLoad:report.saveLoad,errors}));
  await context.close();
 }finally{await browser.close();}
})().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
