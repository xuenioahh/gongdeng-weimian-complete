const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const chapter=await page.evaluate(()=>CHAPTERS.findIndex(c=>c.title==='帘后朱笔'));
    const jump=async(heading)=>{
      const si=await page.evaluate(({chapter,heading})=>TEST140.scenes(chapter,'ning').findIndex(s=>s.heading.includes(heading)),{chapter,heading});
      assert.ok(si>=0,heading);
      await page.evaluate(({chapter,si})=>TEST140.jump(chapter,si,'ning','preset'),{chapter,si});
      return page.locator('.prose').innerText();
    };
    let t=await jump('第一次把凤印推回御案');
    assert.ok(t.includes('初核')&&t.includes('正式结案还在后头'));
    assert.ok(t.includes('印带回凤仪宫')&&t.includes('次日，我按原定的日子召张元照'));
    assert.ok(!t.includes('正好来送'));
    t=await jump('凤印第二次离开凤仪宫');
    assert.ok(t.includes('三司结案那日')&&t.includes('逐项交回御前'));
    assert.ok(t.includes('封印入库')&&t.includes('没有代用凤印'));
    assert.ok(t.includes('礼部送来继后拟旨'));
    assert.ok(!t.includes('我把凤印推到她面前'));
    const before=await page.evaluate(()=>({ning:state.ranks.ning,zhang:state.ranks.zhangyuanzhao}));
    assert.equal(before.ning,'皇后');
    const beforeHomes=await page.evaluate(()=>{mapView();return {ning:v138Person('ning').home,zhang:v138Person('zhangyuanzhao').home,palace:V55_MAP_SPOTS.find(x=>x.name==='凤仪宫').residents.current}});
    assert.equal(beforeHomes.ning,'凤仪宫');assert.equal(beforeHomes.zhang,'景阳宫东配殿');
    assert.ok(beforeHomes.palace.includes('邵明贞'));
    await page.locator('[data-choice]:not(:disabled)').first().click();
    const after=await page.evaluate(()=>({ning:state.ranks.ning,zhang:state.ranks.zhangyuanzhao,former:state.flags.v74NingFormerEmpress,succeeded:state.flags.v74ZhangSucceeded,result:state.stepResults?.at(-1)||''}));
    assert.equal(after.ning,'皇贵妃');assert.equal(after.zhang,'皇后');
    assert.ok(after.former&&after.succeeded);
    const afterHomes=await page.evaluate(()=>{mapView();return {ning:v138Person('ning').home,zhang:v138Person('zhangyuanzhao').home,palace:V55_MAP_SPOTS.find(x=>x.name==='凤仪宫').residents.current}});
    assert.equal(afterHomes.ning,'景仁宫');assert.equal(afterHomes.zhang,'凤仪宫');
    assert.ok(afterHomes.palace.includes('张元照'));
    await page.evaluate(()=>TEST140.jump(CHAPTERS.length,0,'ning','keep'));
    const endingChronicle=await page.evaluate(()=>chronicleView());
    assert.ok(endingChronicle.includes('三司结案，查无邵氏本人私荐受赂'));
    assert.ok(endingChronicle.includes('凤印封入库'));
    assert.ok(endingChronicle.includes('中宫空四十九日'));
    assert.ok(endingChronicle.includes('五月十七日，帝册张元照为皇后'));
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,chapter:chapter+1,before,after:{ning:after.ning,zhang:after.zhang,former:after.former,succeeded:after.succeeded},errors}));
  }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
