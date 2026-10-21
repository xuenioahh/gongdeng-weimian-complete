const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const reports={};
  try{
    for(const file of ['audit-person-consistency.js','audit-rescue-promotion.js','audit-rank-chronicle.js']){
      const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto(pathToFileURL(path.join(root,'index.html')).href);
      const source=fs.readFileSync(path.join(__dirname,file),'utf8');
      const report=await page.evaluate(source=>eval(source),source);
      reports[file]={report,errors};
      assert.deepEqual(errors,[],file+' page errors');
      assert.deepEqual(report.failures||[],[],file+' failures');
      await page.close();
    }
    fs.writeFileSync(path.join(root,'tests/results/focused-audits-v146.json'),JSON.stringify(reports,null,2));
    console.log(JSON.stringify({pass:true,audits:Object.keys(reports),failures:0,output:'tests/results/focused-audits-v146.json'}));
  }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
