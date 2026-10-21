const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage({viewport:{width:1200,height:800}});
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const reset=()=>page.evaluate(()=>{
      const ci=CHAPTERS.findIndex(c=>c.title==='刃落宫门');
      const si=CHAPTERS[ci].steps.findIndex(s=>s.heading.includes('救驾有功，要不要写进位分'));
      state=JSON.parse(JSON.stringify(INITIAL_STATE));
      state.index=ci;state.chapterStep=si;state.intro=true;state.view='story';state.ranks.hanzhang='贵人';
      render();
    });
    await reset();
    const promotion=await page.locator('[data-choice="0"]').innerText();
    const noPromotion=await page.locator('[data-choice="1"]').innerText();
    assert.match(promotion,/珍贵人晋珍嫔/);
    assert.doesNotMatch(promotion,/不晋位/);
    assert.match(noPromotion,/不晋位/);
    const leaves=await page.evaluate(()=>{
      for(let ci=0;ci<CHAPTERS.length;ci++)for(let si=0;si<(CHAPTERS[ci].steps?.length||0);si++){
        const step=CHAPTERS[ci].steps[si];
        if(step.fx!=='wind')continue;
        state.index=ci;state.chapterStep=si;render();
        const found=[...document.querySelectorAll('.story-atmosphere[data-weather="wind"] .air-weather i')];
        if(found.length)return found.map(e=>({left:parseInt(e.style.getPropertyValue('--drop'),10),delay:parseFloat(e.style.getPropertyValue('--drift-delay')),animation:getComputedStyle(e).animationName}));
      }
      return [];
    });
    assert.equal(leaves.length,14);
    assert.equal(new Set(leaves.map(x=>x.left)).size,14);
    assert.ok(Math.max(...leaves.map(x=>x.left))-Math.min(...leaves.map(x=>x.left))>=12);
    assert.ok(new Set(leaves.map(x=>x.delay)).size>=10);
    assert.ok(leaves.every(x=>x.animation==='wind-sweep'));
    await reset();
    await page.locator('[data-choice="0"]').click();
    assert.equal(await page.evaluate(()=>state.ranks.hanzhang),'嫔');
    await reset();
    await page.locator('[data-choice="1"]').click();
    assert.equal(await page.evaluate(()=>state.ranks.hanzhang),'贵人');
    const shortStory=await page.evaluate(()=>{
      const c=CHAPTERS.find(x=>x.title==='旧茶未凉');
      return {heading:c.steps[0].heading,text:c.steps[0].text(state).join('')};
    });
    assert.equal(shortStory.heading,'小传 · 和妃眼中的顺王');
    assert.match(shortStory.text,/顺王府的西廊/);
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({promotion,noPromotion,leafPositions:leaves.map(x=>x.left),shortStory:shortStory.heading,pass:true}));
  }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
