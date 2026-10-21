const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const readScene=async(title,heading,route,flags={})=>page.evaluate(({title,heading,route,flags})=>{
      const ci=CHAPTERS.findIndex(c=>c.title===title),ch=CHAPTERS[ci];
      const si=ch?.steps.findIndex(s=>s.heading.includes(heading))??-1;
      if(ci<0||si<0)return {ci,si};
      state=JSON.parse(JSON.stringify(INITIAL_STATE));
      state.index=ci;state.chapterStep=si;state.intro=true;state.view='story';
      state.flags={...state.flags,...flags,v74ShaoThenZhang:route==='ning'};
      render();
      return {ci,si,heading:ch.steps[si].heading,text:document.querySelector('.prose')?.innerText||'',choices:[...document.querySelectorAll('[data-choice]')].map(x=>x.innerText)};
    },{title,heading,route,flags});
    for(const route of ['direct','ning']){
      let scene=await readScene('中宫空悬','最大的秘密说完以后',route);
      assert.ok(scene.ci>=0&&scene.si>=0,`${route}: confession passage remains within existing step`);
      assert.match(scene.text,/我想见你/);assert.match(scene.text,/我也会等你来/);
      assert.match(scene.text,/没有把这件事交给皇帝替她们命名/);
      assert.ok(scene.choices.length>0);
      scene=await readScene('帘后朱笔','永和宫那声“元照”被孩子听见了',route);
      assert.ok(scene.ci>=0&&scene.si>=0,`${route}: shared days remain within existing step`);
      assert.match(scene.text,/嫌甜/);assert.match(scene.text,/说好不带折子/);assert.match(scene.text,/雨停，茶凉/);
      scene=await readScene('中宫空悬','他睡着以后',route);
      assert.ok(scene.ci>=0&&scene.si>=0,`${route}: first touch scene remains`);
      assert.match(scene.text,/我能替你把鬓边的头发拢好吗/);assert.match(scene.text,/我点了点头/);
      assert.doesNotMatch(scene.text,/我应该后退/);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,routes:['direct','ning'],scenes:3,checks:['mutual confession','post-confirmation shared life','consensual first touch','mobile overflow'],errors}));
  }finally{await browser.close()}
}
module.exports={main};
if(require.main===module)main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
