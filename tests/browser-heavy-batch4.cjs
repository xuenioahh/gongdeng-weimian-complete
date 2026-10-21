const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  let page;
  try{
    page=await browser.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const scene=async(chapter,heading,route)=>{
      const meta=await page.evaluate(async({chapter,heading,route})=>{
        const ci=CHAPTERS.findIndex(c=>c.title===chapter);
        const si=TEST140.scenes(ci,route).findIndex(s=>s.heading.includes(heading));
        if(ci<0||si<0)throw new Error('Missing '+chapter+' / '+heading);
        await TEST140.jump(ci,si,route,'preset');
        const st=CHAPTERS[ci].steps.find(s=>s.heading.includes(heading));
        return {choices:(st.choices||[]).map(c=>({label:typeof c.label==='function'?c.label(state):c.label,hint:typeof c.hint==='function'?c.hint(state):c.hint||''}))};
      },{chapter,heading,route});
      return {text:await page.locator('.prose').innerText(),choices:meta.choices};
    };
    for(const route of ['direct','ning']){
      const twin=await scene('宫门初定','第二声哭没有名字',route);
      assert.ok(twin.text.includes('我先到绮春宫。周清漪仍倚在产床上'));
      assert.ok(twin.text.includes('我没有答，转身去了西华门'));
      assert.ok(twin.text.indexOf('我先到绮春宫')<twin.text.indexOf('我赶到那处空院'));
      assert.equal(twin.choices.length,1);
      assert.equal(twin.choices[0].label,'下“秘处”死令；玉牒只留公主');
      assert.ok(twin.choices[0].hint.includes('秘密处死'));

      const blade=await scene('刃落宫门','刀光之后',route);
      assert.ok(blade.text.includes('谢绍庭让人抬来软榻'));
      assert.ok(blade.text.indexOf('扶住廊柱')<blade.text.indexOf('抬来软榻'));
      const decision=await scene('刃落宫门','你还在流血',route);
      assert.equal(decision.choices.length,3);
      assert.deepEqual(decision.choices.map(c=>c.label),['当场处死','押下，朕亲审','交刑部，按大逆论']);
      await page.locator(`[data-choice="${route==='direct'?1:2}"]`).click();
      assert.equal(await page.evaluate(()=>state.flags.baopuPunishment),route==='direct'?'prison':'extreme');

      const fire=await scene('中宫空悬','东角门开了一刻钟',route);
      assert.ok(fire.text.includes('东角门须奉御前口谕才开'));
      assert.ok(fire.text.includes('张氏叫臣开东门。臣带人卸了锁'));
      assert.equal(fire.choices.length,2);
      assert.ok(fire.choices[0].label.includes('值簿照实留名'));
      assert.ok(fire.choices[1].label.includes('以后能先报就先报'));
      await page.locator(`[data-choice="${route==='direct'?0:1}"]`).click();
      assert.equal(await page.evaluate(()=>state.flags.v65ZhangGatePolicy),route==='direct'?'keep':'caution');
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,routes:['direct','ning'],scenesChecked:8,choiceBranchesClicked:4,errors}));
  }finally{
    const timeout=()=>new Promise(resolve=>setTimeout(resolve,3000));
    if(page&&!page.isClosed())await Promise.race([page.close(),timeout()]);
    await Promise.race([browser.close(),timeout()]);
  }
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
