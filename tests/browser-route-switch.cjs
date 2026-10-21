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
    const result=await page.evaluate(async()=>{
      const out=[];
      for(const [from,to] of [['direct','ning'],['ning','direct']]){
        await TEST140.jump(CHAPTERS.length,0,from,'preset');
        const early=JSON.stringify(state.history.slice(0,3));
        await TEST140.jump(23,0,to,'keep');
        const chapter=CHAPTERS[state.index].title,queen=state.flags.v44NewEmpress;
        await TEST140.jump(CHAPTERS.length,0,to,'keep');
        out.push({from,to,chapter,route:!!state.flags.v74ShaoThenZhang,queen,ended:state.index===CHAPTERS.length,earlyChoicesKept:JSON.stringify(state.history.slice(0,3))===early});
      }
      return out;
    });
    assert.deepEqual(result.map(x=>x.chapter),['帘后朱笔','帘后朱笔']);
    assert.deepEqual(result.map(x=>x.route),[true,false]);
    assert.deepEqual(result.map(x=>x.queen),['ning','zhangyuanzhao']);
    assert.ok(result.every(x=>x.ended));
    assert.ok(result.every(x=>x.earlyChoicesKept));
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,result,errors}));
  }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
