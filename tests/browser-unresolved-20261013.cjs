const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/遗留续修_2026-10-13/验收.json');
async function main(){
 const report={pass:false,checks:[],errors:[]};
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const page=await browser.newPage({reducedMotion:'reduce',viewport:{width:1440,height:900}});
  page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
  const body=fs.readFileSync(path.join(root,'app.js'),'utf8').replace('/* Source: src/boot-2.js */','globalThis.T154={normalize:normalize136,occurrenceDate:occurrenceDate154,biography:historyBiography138,settle:settleSeals154,bulk:x=>bulk140=x};\n/* Source: src/boot-2.js */');
  await page.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body}));
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);
  assert.match(await page.locator('.opening-scope').innerText(),/重大往事沿既定脉络/);
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(root,'audit/遗留续修_2026-10-13/封面手机.png'),fullPage:true});await page.setViewportSize({width:1440,height:900});
  const jump=async(title,part,route)=>page.evaluate(({title,part,route})=>{
   const ci=CHAPTERS.findIndex(c=>c.title===title),si=TEST140.scenes(ci,route).findIndex(s=>s.heading.includes(part));
   if(si<0)throw Error('Missing '+title+'/'+part);return TEST140.jump(ci,si,route,'preset');
  },{title,part,route});
  for(const route of ['direct','ning']){
   await jump('宫灯渐繁','承熙五年九月',route);assert.match(await page.locator('.prose').innerText(),/九月初/);assert.ok(!(await page.locator('.prose').innerText()).includes('满月后的第二日'));
   await jump('灯下旧局','她开始把母亲',route);assert.match(await page.locator('.prose').innerText(),/含章的独立一幕/);
   await jump('听雨轩有喜','雪落宫墙',route);
   const buttons=await page.locator('[data-choice]').allTextContents();assert.ok(buttons.some(s=>s.includes('最后')));assert.ok(buttons.every(s=>!s.includes('救下')));
   for(const strategy of ['hide','public','princess']){
    await jump('西华门外','他自己把西华门那一夜',route);
    const pick=await page.evaluate(strategy=>CHAPTERS[state.index].steps[state.chapterStep].choices.findIndex(c=>c.v69Final===strategy),strategy);
    await page.locator(`[data-choice="${pick}"]`).click();
    const data=await page.evaluate(()=>({flags:state.flags,events:Object.values(state.events151||{}),text:document.querySelector('.prose').innerText}));
    assert.equal(data.flags.v69HiddenPrinceFinal,strategy);
    const event=data.events.find(e=>e.heading.includes('他自己把西华门'));assert.ok(event?.command,'special-field decision must record a command');
    if(strategy==='hide'){assert.ok(event.privateFacts.some(f=>f.includes('未被告知双生血缘')));assert.match(data.text,/只被告知陆氏冒籍/);assert.ok(!data.text.includes('知道真相以后'));}
    else{assert.ok(event.privateFacts.some(f=>f.includes('获知陆氏为自己的双生弟弟')));assert.ok(!data.text.includes("只被告知陆氏冒籍"));}
    const bio=await page.evaluate(()=>{const fixture=JSON.parse(JSON.stringify(state));fixture.chronicle.push({title:'西华门外'});return T154.biography('yinprince',fixture)});
    if(strategy==='hide'){assert.ok(!bio.includes('本人另被告知全部真相'));assert.match(bio,/未被告知双生血缘/);}
    report.checks.push({route,strategy,events:true,knowledge:true,biography:true});
   }
   await jump('帘后朱笔','张后四签',route);assert.equal(await page.locator('.decree-attachment').count(),1);assert.equal(await page.locator('.decree-attachment').getAttribute('open'),null);
   await page.locator('.decree-attachment summary').click();assert.match(await page.locator('.decree-attachment').innerText(),/补改须留原痕/);
   await jump('雪尽宫门','大封 1/8',route);
   const seed=await page.evaluate(()=>JSON.stringify(state));
   for(const mask of [0,255,1,2,4,8,16,32,64,128,85,170]){
    const picks=Array.from({length:8},(_,i)=>(mask>>i)&1);
    const data=await page.evaluate(({seed,picks})=>{
     function reset(){state=JSON.parse(seed);T154.normalize();}
     function snapshot(){return JSON.stringify({index:state.index,chapterStep:state.chapterStep,ranks:state.ranks,flags:state.flags,bond:state.bond,trust:state.trust,stepHistory:state.stepHistory,stepDecisions:state.stepDecisions,stepResults:state.stepResults,stepChanges:state.stepChanges,events:state.events151,choices:state.sceneChoices151});}
     T154.bulk(true);try{reset();for(const pick of picks)choose(pick);const sequential=snapshot();
     reset();T154.settle(picks,state.index,state.chapterStep);return {sequential,combined:snapshot(),heading:CHAPTERS[state.index].steps[state.chapterStep].heading};}finally{T154.bulk(false);render();}
    },{seed,picks});
    assert.equal(data.combined,data.sequential,route+' mask '+mask);assert.ok(!/^大封 [1-8]\/8/.test(data.heading));
    report.checks.push({route,mask,batchEqualsSequential:true});
   }
   // Actual form, partial continuation, mobile flow and save/restore.
   await jump('雪尽宫门','大封 4/8',route);
   await page.setViewportSize({width:390,height:844});await page.locator('.seal-review > summary').click();
   assert.equal(await page.locator('#seal-review-form select').count(),5);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   for(const select of await page.locator('#seal-review-form select').all())await select.selectOption('1');
   await page.screenshot({path:path.join(root,'audit/遗留续修_2026-10-13/合阅手机-'+route+'.png'),fullPage:true});
   await page.locator('#seal-review-form button[type=submit]').click();
   const pos=await page.evaluate(()=>[state.index,state.chapterStep]);await page.reload();assert.deepEqual(await page.evaluate(()=>[state.index,state.chapterStep]),pos);
   await page.setViewportSize({width:1440,height:900});report.checks.push({route,partialBatch:true,reload:true,mobile:true});
  }
  assert.equal(await page.evaluate(()=>T154.occurrenceDate('承熙十七年三月回望 · 大丧之日，白幡垂到石阶下面','承熙十九年冬')),'承熙十七年三月');
  assert.equal(await page.evaluate(()=>T154.occurrenceDate('承熙十五年十月旧事 · 副稿案','承熙十七年')),'承熙十五年十月');report.checks.push({explicitEventDates:true});
  const legacy=await page.evaluate(()=>{const old={id:'legacy-knowledge',command:'以冒籍撤陆氏婚议，血脉不载公开纪事。',privateFacts:['御前密档留陆氏血脉；婚议所涉皇女本人已被告知。'],pick:2};state.events151['legacy-knowledge']=old;const pos=[state.index,state.chapterStep];render();return {event:state.events151['legacy-knowledge'],pos,after:[state.index,state.chapterStep]}});
  assert.match(legacy.event.privateFacts[0],/未被告知双生血缘/);assert.equal(legacy.event.pick,2);assert.deepEqual(legacy.pos,legacy.after);report.checks.push({legacyKnowledgeRepair:true,positionPreserved:true});
  assert.deepEqual(report.errors,[]);report.pass=true;
 }finally{fs.writeFileSync(out,JSON.stringify(report,null,2));await browser.close();}
 console.log(JSON.stringify({pass:report.pass,checks:report.checks.length,errors:report.errors}));
}
main().catch(e=>{console.error(e);process.exitCode=1});
