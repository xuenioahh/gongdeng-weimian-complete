const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    await page.waitForTimeout(1200);
    await page.waitForFunction(()=>{const entry=document.querySelector('.opening-entry'),button=document.querySelector('#enter-story');return entry&&!entry.inert&&typeof button?.onclick==='function'});
    await page.evaluate(()=>document.querySelector('#enter-story').onclick());
    await page.waitForSelector('.scene-title');
    await page.evaluate(()=>{window.__literaryBase=JSON.stringify(state)});
    const checks=[
      ['入宫第一夜','那夜宫里忙的是她们从旧国带来的旧物','那夜宫里忙的不是金银'],
      ['伤药送到花房值房','那盒伤药随御花园当日领用的药物一并送到花房值房','伤药不是送到某一宫'],
      ['第二日没有人问','请安殿里没人问昨夜','宫里都知道她已经按嫔妃例入了起居注'],
      ['留了谁，再定她们从哪里起步','我会多看她一眼','这只是我的偏爱'],
      ['留了谁，再定她们从哪里起步','名帖由我亲手挑定','不能拿点名先后当位次'],
      ['承熙三年七月 · 一场骤雨','她把干帕子分给众人','方小满把干帕子分给众人'],
      ['姐姐也来求她查一件事','这句话听着像夸奖','仿佛她天生就该'],
      ['五月初三，箱笼比人先认得宫门','西六宫一时忙乱','最容易错的反而不是人'],
      ['大公主借走一阵风','出门时身边仍跟着两个乳母','仿佛所有人都没商量过'],
      ['十月末 · 四个月很快过去','至于为何如此，我没有细想','不是因为突然爱上谁'],
      ['女史院 · 正月十二 · 女史院开始招人','几位掌事宫女围着看了很久','围得最久的不是年轻宫女']
    ];
    for(const route of ['direct','ning'])for(const [heading,after,before] of checks){
      const pos=await page.evaluate(({heading,route})=>{
        state=JSON.parse(window.__literaryBase);state.intro=true;state.view='story';state.flags.v74ShaoThenZhang=route==='ning';
        for(let ci=0;ci<CHAPTERS.length;ci++){const si=CHAPTERS[ci].steps.findIndex(s=>s.heading.includes(heading));if(si>=0){state.index=ci;state.chapterStep=si;render();return {ci,si};}}return {ci:-1,si:-1};
      },{heading,route});
      assert.ok(pos.ci>=0&&pos.si>=0,heading);
      const visible=await page.locator('.prose').innerText();
      const diagnostic=visible.includes(after)?'':JSON.stringify(await page.evaluate(()=>({state:[state.index,state.chapterStep],debug:globalThis.__literaryDebug148})));
      assert.ok(visible.includes(after),`${route} missing revised text: ${heading} ${diagnostic}\n${visible.slice(0,1400)}`);
      assert.ok(!visible.includes(before),`${route} retained old text: ${heading}`);
    }
    await page.setViewportSize({width:390,height:844});
    await page.evaluate(()=>{state=JSON.parse(window.__literaryBase);state.intro=true;state.view='story';state.index=CHAPTERS.findIndex(c=>c.title==='帘后朱笔');state.chapterStep=0;render()});
    const mobile=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,button:!!document.querySelector('[data-choice]')}));
    assert.equal(mobile.overflow,false);assert.equal(mobile.button,true);
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,routes:['direct','ning'],literaryScenes:checks.length,visibleChecks:checks.length*2,mobile,errors}));
  }finally{await browser.close()}
}
module.exports={main};
if(require.main===module)main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
