const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage();const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const jump=async(title,part,route='direct')=>{
      const found=await page.evaluate(({title,part,route})=>{
        const ci=CHAPTERS.findIndex(c=>c.title===title);
        const si=CHAPTERS[ci]?.steps.findIndex(s=>s.heading.includes(part))??-1;
        if(ci<0||si<0)throw new Error(`missing ${title}/${part}`);
        return {ci,si};
      },{title,part,route});
      await page.evaluate(({ci,si,route})=>TEST140.jump(ci,si,route,'preset'),{...found,route});
      return page.locator('.prose').innerText();
    };
    let t=await jump('西华门外','他自己把西华门那一夜');
    for(const phrase of ['托孤便条','末尾是常福的押','便条只能证明他曾把孩子交出去','宗人府又核了自陈与便条的笔迹'])assert.ok(t.includes(phrase),phrase);
    assert.ok(!t.includes('私交纸'));
    await page.locator('[data-choice]:not(:disabled)').filter({hasText:'先公开旧皇子身份'}).click();
    assert.equal(await page.evaluate(()=>state.flags.v69HiddenPrinceFinal),'public');
    t=await jump('西华门外','他自己把西华门那一夜','ning');
    assert.ok(t.includes('几件证物合看，才足以认定身世'));
    t=await jump('西华门外','大丧之日');
    assert.ok(t.includes('大丧那日没有雪'));
    assert.ok(!t.includes('承熙十七年四月'));
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,routes:['direct','ning'],evidenceChain:true,publicBranchClicked:true,funeralHeading:true,errors}));
  }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
