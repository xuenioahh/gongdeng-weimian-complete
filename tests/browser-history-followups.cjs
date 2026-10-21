const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
async function main(){
 const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const report={pass:false,checks:[],errors:[]};
 try{
  const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  p.on('pageerror',e=>report.errors.push(e.message));await p.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
  const cases=[['御前终选','我亲自问最后一题','没听清礼官唱的名字'],['宫灯渐繁','景阳宫东配殿','杯沿碰在一起响了一声'],['窗开半扇','五月初八','那半刻不能从单子上抹掉'],['荷风满座','七月廿三','旧册也错了'],['凤座无人','四月夜','桌上有蒸笋和鱼羹']];
  for(const route of ['direct','ning'])for(const [title,heading,expected] of cases){
   await p.evaluate(async({title,heading,route})=>{const ci=CHAPTERS.findIndex(x=>x.title===title),si=TEST140.scenes(ci,route).findIndex(x=>x.heading.includes(heading));await TEST140.jump(ci,si,route,'preset')},{title,heading,route});
   await p.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});
   assert.ok((await p.locator('.prose').innerText()).includes(expected));
   await p.setViewportSize({width:390,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await p.setViewportSize({width:1440,height:900});report.checks.push({route,title,heading,expected,mobile:true});
  }
  for(const route of ['direct','ning'])for(const fate of ['capital','fief']){
   await p.evaluate(async({route,fate})=>{const ci=CHAPTERS.findIndex(x=>x.title==='帘后朱笔'),si=TEST140.scenes(ci,route).findIndex(x=>x.heading.includes('顺王从封地递来'));await TEST140.jump(ci,si,route,'preset');state.flags.shunwangFinalFate=fate;render()},{route,fate});
   const title=await p.locator('.scene-title').innerText(),txt=await p.locator('.prose').innerText();
   assert.ok(title.includes(fate==='capital'?'京中王府':'封地'));assert.ok(txt.includes(fate==='capital'?'顺王从京中王府递来':'顺王从封地递来'));
   if(fate==='capital')assert.ok(!txt.includes('退回封地'));
   report.checks.push({route,fate,title,location:true});
  }
  assert.deepEqual(report.errors,[]);report.pass=true;
 }finally{fs.writeFileSync(path.resolve(__dirname,'../audit/历史运行审计/定向回归.json'),JSON.stringify(report,null,2));await b.close()}
 console.log(JSON.stringify({pass:report.pass,checks:report.checks.length,errors:report.errors}));return report;
}
module.exports={main};if(require.main===module)main().catch(e=>{console.error(e);process.exit(1)});
