const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=process.env.CULTURE_BASELINE||'/private/tmp/gongdeng-culture-review';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];
  if(process.env.BASELINE_APP)await page.route('**/app.js',route=>route.fulfill({path:process.env.BASELINE_APP,contentType:'application/javascript'}));
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.waitForTimeout(500);
  const chapters=[];
  for(const route of ['direct','ning'])for(let ci=0;ci<26;ci++){
   await page.evaluate(({ci,route})=>TEST140.jump(ci,0,route,'preset'),{ci,route});
   chapters.push(await page.evaluate(route=>{
    const serialize=v=>JSON.parse(JSON.stringify(v,(_k,item)=>typeof item==='function'?item.toString():item));
    const ch=CHAPTERS[state.index];
    return {route,index:state.index,title:ch.title,date:ch.date,place:ch.place,flags:serialize(state.flags),ranks:serialize(state.ranks),people:Object.fromEntries(Object.keys(PEOPLE).map(k=>[k,v138Person(k)])),steps:ch.steps.map(st=>({...serialize(st),evaluated:typeof st.text==='function'?st.text(serialize(state)):st.text}))};
   },route));
  }
  fs.mkdirSync(out,{recursive:true});
  fs.writeFileSync(path.join(out,'runtime-before.json'),JSON.stringify({chapters,errors},null,2));
  console.log(JSON.stringify({chapters:chapters.length,scenes:chapters.reduce((n,c)=>n+c.steps.length,0),errors,output:path.join(out,'runtime-before.json')}));
 }finally{await browser.close();}
})().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
