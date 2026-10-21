const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
module.exports=async({page,out})=>{
 const report={pass:false,crops:[],inactiveSeal:[]};
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  await page.evaluate(async()=>{const ci=CHAPTERS.findIndex(c=>c.title==='极西来客'),si=TEST140.scenes(ci,'direct').findIndex(s=>s.heading==='笑声先过门槛');await TEST140.jump(ci,si,'direct','preset')});
  const figure=page.locator('[data-scene-asset="076"]'),box=figure.locator('.moment-image'),img=box.locator('img');await img.evaluate(i=>i.decode());
  const data=await box.evaluate(el=>{const img=el.querySelector('img'),a=el.getBoundingClientRect(),b=img.getBoundingClientRect();return {overflow:getComputedStyle(el).overflow,titleBandTop:b.top+135/1086*b.height,boxTop:a.top,boxHeight:a.height,imageHeight:b.height,transform:getComputedStyle(img).transform,loaded:img.naturalWidth>0}});
  assert.equal(data.overflow,'hidden');assert.ok(data.loaded);assert.ok(data.titleBandTop<=data.boxTop+2);assert.ok(data.imageHeight>data.boxHeight);
  await figure.screenshot({path:path.join(out,`正文图片裁切-${width}.png`)});report.crops.push({width,...data});
 }
 for(const pick of [0,1]){
  const evidence=await page.evaluate(pick=>{
   const priorSave=save;save=()=>{};F155.bulk(true);
   try{state=F155.initial();state.intro=true;state.view='story';let n=0;
    while(state.index<26){F155.normalize();const st=CHAPTERS[state.index].steps[state.chapterStep];
     if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=['cao2','lin2'];
     if(st.heading.startsWith('大封 8/8')){const prose=F155.story(),before=JSON.stringify({rank:state.ranks.zhao2,trust:state.trust.zhao2,bond:state.bond.zhao2,seal:state.flags.v55Seal_zhao2});const sceneId=st.sceneId||null;choose(pick);return {pick,prose,before,after:JSON.stringify({rank:state.ranks.zhao2,trust:state.trust.zhao2,bond:state.bond.zhao2,seal:state.flags.v55Seal_zhao2}),admitted:F155.person('zhao2').admitted,sceneId};}
     choose(st.choices.findIndex(F155.allowed));if(++n>600)throw Error('No absent consort scene');
    }
   }finally{save=priorSave;F155.bulk(false);render();}
  },pick);
  assert.equal(evidence.admitted,false);assert.equal(evidence.before,evidence.after);assert.match(evidence.prose,/没有在本局留牌入宫/);assert.ok(!evidence.prose.includes('data-person="zhao2"'));delete evidence.prose;report.inactiveSeal.push(evidence);
 }
 report.successors=[];
 for(const education of ['strict','public','indulged']){
  const evidence=await page.evaluate(education=>{const oldSave=save;save=()=>{};F155.bulk(true);try{state=F155.initial();state.intro=true;state.view='story';let n=0;while(state.index<26){F155.normalize();const st=CHAPTERS[state.index].steps[state.chapterStep];if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];if(st.heading.includes('她第一次没有人可以回头问'))return {education,departure:!!state.flags.v81PrinceOpenEnding,prose:F155.story()};let pick=st.choices.findIndex(F155.allowed);if(st.choices.some(c=>c.effects?.flags?.v47PrinceEducation))pick=st.choices.findIndex(c=>c.effects?.flags?.v47PrinceEducation===education);choose(pick);if(++n>600)throw Error('No successor consequence');}}finally{save=oldSave;F155.bulk(false);render();}},education);
  assert.equal(evidence.departure,education==='strict');assert.match(evidence.prose,education==='strict'?/新帝杨顺恭尚年轻/:/新帝杨顺谦已经成年/);report.successors.push({education,departure:evidence.departure,matchedNameAndRegency:true});
 }
 report.pass=true;fs.writeFileSync(path.join(out,'正文裁切与未入宫册页验收.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
};
