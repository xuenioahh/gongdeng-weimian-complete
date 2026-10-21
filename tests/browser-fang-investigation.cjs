const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const jump=async(heading)=>page.evaluate(async heading=>{
      const ci=CHAPTERS.findIndex(c=>c.title==='听雨轩有喜');
      const si=TEST140.scenes(ci,'direct').findIndex(s=>s.heading.includes(heading));
      if(si<0)throw Error('Missing scene: '+heading+'; tail: '+TEST140.scenes(ci,'direct').slice(-8).map(s=>s.heading).join(' / ')+'; v93: '+JSON.stringify(globalThis.V93_QA));
      await TEST140.jump(ci,si,'direct','keep');
    },heading);
    const cases=[
      {investigation:0,final:0,place:'听雨轩',path:'煎药房',absent:'那张假口谕'},
      {investigation:0,final:1,place:'听雨轩',path:'煎药房',absent:'那张假口谕'},
      {investigation:1,final:0,place:'偏院',path:'假口谕',absent:'煎药房无名替班者仍在追查'},
      {investigation:1,final:1,place:'偏院',path:'假口谕',absent:'煎药房无名替班者仍在追查'}
    ];
    for(const item of cases){
      await jump('三份密报没有一份完整');
      await page.locator(`[data-choice="${item.investigation}"]`).click();
      await jump('雪落宫墙');
      const death=await page.locator('.prose').innerText();
      assert.ok(death.includes(item.path));
      await page.locator(`[data-choice="${item.final}"]`).click();
      const result=await page.locator('.recent-result').innerText();
      assert.ok(result.includes(item.place));
      await jump('卷宗仍在追查');
      const inquiry=await page.locator('.prose').innerText();
      assert.ok(inquiry.includes(item.path));
      assert.ok(!inquiry.includes(item.absent));
      if(item.investigation===0)assert.ok(inquiry.includes(item.final===1?'被扣押，留下口供':'仍在追查'));
      const flags=await page.evaluate(()=>({investigation:state.flags.fangInvestigation,final:state.flags.fangFinal}));
      assert.equal(flags.investigation,item.investigation===0?'threeDays':'confine');
      assert.equal(flags.final,item.final===0?'emperor':'evidence');
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,combinations:cases.length,errors}));
  }finally{await Promise.race([browser.close(),new Promise(resolve=>setTimeout(resolve,3000))])}
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
