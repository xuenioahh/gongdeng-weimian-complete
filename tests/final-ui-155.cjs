const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
module.exports=async({page,out})=>{
 const report={pass:false,checks:[],gates:[],errors:[]};page.on('pageerror',e=>report.errors.push(e.message));
 for(const cohort of ['male','female','no-shen','shen-loss']){
  const gate=await page.evaluate(cohort=>{
   const prior=save;save=()=>{};F155.bulk(true);
   try{
    state=F155.initial();state.intro=true;state.view='story';
    let count=0;
    while(state.index<26){
     F155.normalize();const st=CHAPTERS[state.index].steps[state.chapterStep];
     if(st.choices.some(c=>c.effects?.flags?.v75ShenFate))return {cohort,children:F155.children().filter(c=>c.mother==='shen'),available:st.choices.filter(F155.allowed).map(c=>c.effects.flags.v75ShenFate)};
     if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];
     let pick=st.choices.findIndex(F155.allowed);
     if(cohort==='female'&&st.choices.some(c=>c.effects?.flags?.year3Favor))pick=1;
     if(['no-shen','shen-loss'].includes(cohort)&&st.choices.some(c=>c.v40Heir?.round===1))pick=st.choices.findIndex(c=>c.v40Heir?.key===(cohort==='shen-loss'?'shen':'gu'));
     if(['no-shen','shen-loss'].includes(cohort)&&st.choices.some(c=>c.v40Heir?.round===2))pick=st.choices.findIndex(c=>c.v40Heir?.key==='hui');
     choose(pick);if(++count>600)throw Error('Cannot reach Shen gate');
    }
   }finally{save=prior;F155.bulk(false);render();}
  },cohort);
  if(cohort==='male'||cohort==='female'){assert.ok(gate.children.some(c=>!c.dead&&c.sex===(cohort==='male'?'M':'F')));assert.ok(gate.available.includes('fief'));}
  else{assert.ok(gate.children.every(c=>c.dead));assert.ok(!gate.available.includes('fief'));if(cohort==='shen-loss')assert.ok(gate.children.length>0);assert.ok(gate.available.includes('religion'));}
  report.gates.push(gate);
 }
 for(const route of ['direct','ning']){
  await page.evaluate(async route=>{const ci=6,si=TEST140.scenes(ci,route).findIndex(st=>st.heading.includes('承熙五年九月'));await TEST140.jump(ci,si,route,'preset');},route);
  await page.setViewportSize({width:390,height:844});await page.locator('.yearbook-review > summary').click();
  const indices=await page.evaluate(()=>{const steps=CHAPTERS[6].steps,st=steps[state.chapterStep],next=steps[state.chapterStep+1];return {first:st.choices.findIndex(c=>c.v40Heir?.key==='gu'),blocked:next.choices.findIndex(c=>c.v40Heir?.key==='gu'),second:next.choices.findIndex(c=>c.v40Heir?.key==='shen'),position:[state.index,state.chapterStep]}});
  const before=await page.evaluate(()=>JSON.stringify(state));await page.locator('#yearbook-september').selectOption(String(indices.first));assert.equal(await page.evaluate(()=>JSON.stringify(state)),before);
  assert.equal(await page.locator(`#yearbook-november option[value="${indices.blocked}"]`).getAttribute('disabled'),'');
  await page.locator('#yearbook-november').selectOption(String(indices.second));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.ok(await page.locator('.chapters').evaluate(el=>el.getBoundingClientRect().height<125));
  await page.locator('.yearbook-review').screenshot({path:path.join(out,'九月冬月合阅-'+route+'.png')});
  await page.locator('#yearbook-form button[type=submit]').click();assert.deepEqual(await page.evaluate(()=>[state.index,state.chapterStep]),[6,indices.position[1]+2]);
  const position=await page.evaluate(()=>[state.index,state.chapterStep]);
  await page.locator('#v52-archives').click();await page.locator('[data-save-slot="5"]').click();await page.locator('#modal .close').click();
  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).slots['5']);assert.ok(stored.sceneId);
  await page.locator('[data-choice="0"]').click();await page.locator('#v52-archives').click();await page.locator('[data-load-slot="5"]').click();assert.deepEqual(await page.evaluate(()=>[state.index,state.chapterStep]),position);
  const restored=await page.evaluate(pack=>{const altered=JSON.parse(JSON.stringify(pack));altered.state.chapterStep=0;V52_ARCHIVES.restore(altered,false);return [state.index,state.chapterStep]},stored);assert.deepEqual(restored,position);
  await page.reload();assert.deepEqual(await page.evaluate(()=>[state.index,state.chapterStep]),position);report.checks.push({route,formClick:true,blockedPregnantMother:true,previewDoesNotCommit:true,legacyPositionAndId:true,reload:true,mobile:true});
 }
 await page.setViewportSize({width:1440,height:900});
 for(const route of ['direct','ning']){
  await page.evaluate(async route=>{const ci=23,si=TEST140.scenes(ci,route).findIndex(st=>st.heading==='女史院 · 正月十二 · 女史院开始招人');await TEST140.jump(ci,si,route,'preset')},route);
  const attachment=page.locator('.decree-attachment');assert.equal(await attachment.count(),1);assert.equal(await attachment.getAttribute('open'),null);await attachment.locator('summary').click();assert.match(await attachment.innerText(),/试任三年/);
  report.checks.push({route,officeAttachment:true});
 }
 assert.deepEqual(report.errors,[]);report.pass=true;fs.writeFileSync(path.join(out,'最终界面与旧档验收.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({pass:true,checks:report.checks.length,gates:report.gates.map(g=>({cohort:g.cohort,available:g.available,children:g.children.map(c=>({sex:c.sex,dead:c.dead}))})),errors:report.errors}));
};
