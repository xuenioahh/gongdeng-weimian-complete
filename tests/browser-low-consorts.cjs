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
    const scene=async(chapter,needle,flags,ranks)=>page.evaluate(({chapter,needle,flags,ranks})=>{
      const ci=CHAPTERS.findIndex(c=>c.title===chapter),ch=CHAPTERS[ci];
      const si=ch?.steps.findIndex(s=>String(s.heading||'').includes(needle))??-1;
      if(ci<0||si<0)return {ci,si};
      state=JSON.parse(JSON.stringify(INITIAL_STATE));
      state.index=ci;state.chapterStep=si;state.intro=true;state.view='story';
      state.flags={...state.flags,...flags};state.ranks={...state.ranks,...ranks};
      render();
      return {ci,si,text:document.querySelector('.prose')?.innerText||'',width:document.documentElement.scrollWidth};
    },{chapter,needle,flags,ranks});

    const early=await scene('宫灯渐繁','低位宫里各忙各的',{lowConsorts:['cao2','zhao2'],v46LowVictim:null},{cao2:'答应',zhao2:'答应'});
    assert.ok(early.ci>=0&&early.si>=0,'early-life step exists');
    assert.match(early.text,/何超英脱了鞋/);assert.match(early.text,/王静娴/);

    const newcomer=await scene('窗开半扇','五月初八',{v95SecondThreeSelected:true,v46SecondRosterPruned:true},{liang2:'答应',song2:'答应'});
    assert.ok(newcomer.ci>=0&&newcomer.si>=0,'newcomer supper step exists');
    assert.match(newcomer.text,/我只是怕明日还送错/);assert.match(newcomer.text,/下回别再让它们白跑一趟/);

    const later=await scene('雪尽宫门','新封号叫错的第一天',{
      lowConsorts:['cao2','zhao2','lin2','ye2','du2'],v46LowVictim:null,
      v95SecondThreeSelected:true,v46SecondRosterPruned:true
    },{cao2:'答应',zhao2:'常在',lin2:'答应',ye2:'答应',du2:'答应',liang2:'答应',song2:'答应'});
    assert.ok(later.ci>=0&&later.si>=0,'post-investiture everyday step exists');
    assert.match(later.text,/钟粹宫西配殿的炭单/);assert.match(later.text,/景阳宫后殿收晚膳/);
    assert.equal(later.width<=390,true,'mobile layout has no horizontal overflow');

    const absent=await scene('雪尽宫门','新封号叫错的第一天',{
      lowConsorts:['cao2','zhao2','lin2','ye2','du2'],v46LowVictim:null
    },{cao2:'答应',zhao2:'常在',lin2:'答应',ye2:'答应',du2:'答应',liang2:'待选',song2:'待选'});
    assert.doesNotMatch(absent.text,/钟粹宫西配殿的炭单/);
    assert.doesNotMatch(absent.text,/景阳宫后殿收晚膳/);
    assert.deepEqual(errors,[]);
    const result={pass:true,scenes:3,checks:['early peer recognition','newcomer neighbor continuity','dynamic palace and rank presence','absence when newcomers are not enrolled','mobile overflow'],errors};
    console.log(JSON.stringify(result));return result;
  }finally{await browser.close()}
}
module.exports={main};
if(require.main===module)main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
