const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    await page.evaluate(()=>{
      state.index=CHAPTERS.length;
      state.view='story';
      state.flags.v82FinaleComplete=true;
      state.flags.v81PrinceOpenEnding=false;
      render();
    });
    assert.match(await page.locator('.finale-prose').textContent(),/杨顺谦即位/);
    assert.equal(await page.locator('.finale-line:not([hidden])').count(),0);
    const before=await page.evaluate(()=>JSON.stringify(state.flags));
    await page.locator('.finale-line:not([hidden])').first().waitFor();
    assert.equal(await page.locator('.finale-line[hidden]').count()>0,true);
    await page.locator('#finale-show-all').click();
    assert.equal(await page.locator('.finale-line[hidden]').count(),0);
    assert.equal(await page.locator('#finale-entries').isVisible(),true);
    assert.equal(await page.locator('#finale-show-all').isVisible(),false);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    assert.equal(await page.evaluate(()=>JSON.stringify(state.flags)),before);
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.evaluate(()=>render());
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))});
    const paused=await page.locator('.finale-line:not([hidden])').count();
    await page.waitForTimeout(1200);
    assert.equal(await page.locator('.finale-line:not([hidden])').count(),paused);
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'))});
    await page.locator('.finale-line:not([hidden])').first().waitFor();
    const beforeRevisit=await page.evaluate(()=>JSON.stringify({flags:state.flags,index:state.index}));
    await page.locator('#finale-show-all').click();
    assert.equal(await page.evaluate(()=>JSON.stringify({flags:state.flags,index:state.index})),beforeRevisit);
    await page.evaluate(()=>render());
    assert.equal(await page.locator('.finale-line:not([hidden])').count(),0);
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.evaluate(()=>{state.flags.v81PrinceOpenEnding=true;render()});
    assert.match(await page.locator('.finale-prose').innerText(),/杨顺恭即位/);
    assert.equal(await page.locator('.finale-line[hidden]').count(),0);
    assert.equal(await page.locator('#finale-entries').isVisible(),true);
    await page.evaluate(()=>save());
    await page.reload();
    assert.match(await page.locator('.finale-prose').innerText(),/杨顺恭即位/);
    assert.equal(await page.locator('.finale-line[hidden]').count(),0);
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,heirs:2,showAll:true,reducedMotion:true,mobileNoOverflow:true,visibilityPause:true,revisit:true,saveReload:true,stateStable:true}));
  }finally{await browser.close()}
}
main().catch(error=>{console.error(error);process.exitCode=1});
