const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage();const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const jump=async needle=>{
      await page.evaluate(async needle=>{
        const ci=CHAPTERS.findIndex(c=>c.title==='宫灯渐繁');
        const si=TEST140.scenes(ci,'direct').findIndex(st=>st.heading.includes(needle));
        if(si<0)throw Error('Missing scene '+needle);
        await TEST140.jump(ci,si,'direct','keep');
      },needle);
      await page.waitForFunction(needle=>document.querySelector('.scene-title')?.innerText.includes(needle),needle);
      await page.waitForFunction(()=>!!document.querySelector('.prose')?.innerText.trim());
    };
    for(const pregnancyChoice of [0,1]){
      await jump('一位低位新人先有了孩子');
      await page.locator(`[data-choice="${pregnancyChoice}"]`).click();
      await jump('三公主洗三');
      const before=await page.evaluate(()=>{const k=lowPregKey(state);return {k,name:PEOPLE[k].name,rank:state.ranks[k],promoted:state.flags.v91FirstLowBirthPromoted}});
      assert.equal(before.promoted,undefined);
      const prose=await page.locator('.prose').innerText();
      assert.ok(prose.includes(`${before.name}由${before.rank}晋`),`Birth text omitted promotion for ${before.name}, ${before.rank}: ${prose.slice(0,1200)}`);
      await page.locator('[data-choice="0"]').click();
      const after=await page.evaluate(()=>{const k=lowPregKey(state);return {rank:state.ranks[k],person:v138Person(k),promoted:state.flags.v91FirstLowBirthPromoted}});
      assert.equal(after.promoted,true);
      assert.notEqual(after.rank,before.rank);
      assert.ok(after.person.title.includes(after.rank)||after.person.base===after.rank,`Person card rank did not update: ${JSON.stringify(after)}`);
    }
    await jump('要不要再添一个孩子');
    const extraChoiceMeta=await page.evaluate(()=>({heading:CHAPTERS[state.index].steps[state.chapterStep].heading,choices:CHAPTERS[state.index].steps[state.chapterStep].choices.map(c=>({label:typeof c.label==='function'?c.label(state):c.label,heirPick:c.heirPick})),low:state.flags.lowConsorts.map(k=>({k,name:PEOPLE[k].name})),candidates:state.flags.extraHeirCandidates}));
    const lowChoice=extraChoiceMeta.choices.findIndex(c=>extraChoiceMeta.low.some(p=>c.label.includes(p.name)));
    assert.ok(lowChoice>=0);
    await page.locator(`[data-choice="${lowChoice}"]`).click();
    const extraMother=await page.evaluate(()=>state.flags.extraHeirs?.[1]?.mother);
    assert.ok(extraMother);
    assert.ok((await page.evaluate(k=>state.flags.lowConsorts.includes(k),extraMother)));
    for(let n=0;n<80;n++){
      if((await page.locator('.scene-title').innerText()).includes('玉牒又添一笔'))break;
      await page.locator('[data-choice="0"]').click();
      if(n===79)throw Error('Extra birth not reached');
    }
    const extraBefore=await page.evaluate(k=>{
      return {k,rank:state.ranks[k],name:PEOPLE[k].name};
    },extraMother);
    assert.ok(extraBefore.k);
    await page.waitForFunction(({name,rank})=>document.querySelector('.scene-title')?.innerText.includes('玉牒又添一笔')&&document.querySelector('.prose')?.innerText.includes(`${name}（${rank}）晋一级`),extraBefore);
    const extraProse=await page.locator('.prose').innerText();
    assert.ok(extraProse.includes(`${extraBefore.name}（${extraBefore.rank}）晋一级`),`${JSON.stringify(extraBefore)}: ${extraProse.slice(0,1100)}`);
    await page.locator('[data-choice="0"]').click();
    const extraAfter=await page.evaluate(()=>{const k=state.flags.extraHeirs?.[1]?.mother;return {rank:state.ranks[k],person:v138Person(k)}});
    assert.notEqual(extraAfter.rank,extraBefore.rank);
    assert.ok(extraAfter.person.title.includes(extraAfter.rank)||extraAfter.person.base===extraAfter.rank);
    await page.evaluate(async()=>{const ci=CHAPTERS.findIndex(c=>c.title==='荷风满座');const si=TEST140.scenes(ci,'direct').findIndex(st=>st.heading.includes('大公主借走一阵风'));if(si<0)throw Error('Princess scene missing');await TEST140.jump(ci,si,'direct','preset')});
    assert.equal(await page.evaluate(()=>v138Person('gu').dead),false);
    await page.locator('[data-choice="0"]').click();
    const princessResult=await page.locator('.recent-result').innerText();
    assert.ok(!princessResult.includes('母后走后'));
    assert.ok(princessResult.includes('做错了便重做'));
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,pregnancyPaths:2,extraBirths:1,princessBeforeQueenDeath:true,birthPromotionAutomatic:true,errors}));
  }finally{await Promise.race([browser.close(),new Promise(resolve=>setTimeout(resolve,3000))])}
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
