const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
module.exports=async({page,root,out,cohort="male"})=>{
 const file=path.join(out,'后期全交叉矩阵-'+cohort+'.json');
 await page.exposeFunction('crossProgress155',progress=>{fs.writeFileSync(path.join(out,'交叉验收进度-'+cohort+'.json'),JSON.stringify(progress));console.log(JSON.stringify(progress))});
 const report=await page.evaluate(async(cohort)=>{
  const axes=[
   {name:'顺王',flag:'shunwangFinalFate'}, {name:'黛拉',flag:'v56DailaFate'},
   {name:'继后',flag:'v44NewEmpress'}, {name:'沈氏处分',flag:'v75ShenFate'},
   {name:'抚养',special:'v72Foster'}, {name:'陆氏公开',special:'v69Final'},
   {name:'临终回应',flag:'v82LastWord'}, {name:'新朝先行',flag:'v82ZhangFirstChoice'}, {name:'留任意愿',flag:'v82ZhangRegency'}
  ];
  const report={pass:false,cohort,axes,rows:[],failures:[],excluded:[],reviewChecks:0,scope:'Every available value of all nine listed late-game axes, taken through actual choice-engine transitions from a new-game prefix. No fate flag is injected.'};
  const clone=x=>JSON.parse(JSON.stringify(x)),oldSave=save,api=globalThis.V52_ARCHIVES,oldRemember=api.rememberEnding;
  save=()=>{};api.rememberEnding=()=>{};F155.bulk(true);
  function step(){F155.normalize();return CHAPTERS[state.index]?.steps?.[state.chapterStep];}
  function defaultPick(st){
   if(['public','indulged'].includes(cohort)&&st.choices.some(c=>c.effects?.flags?.v47PrinceEducation))return st.choices.findIndex(c=>c.effects?.flags?.v47PrinceEducation===cohort);
   if(cohort==='female'&&st.choices.some(c=>c.effects?.flags?.year3Favor))return 1;
   if(['no-shen','shen-loss'].includes(cohort)&&st.choices.some(c=>c.v40Heir?.round===1))return st.choices.findIndex(c=>c.v40Heir?.key===(cohort==='shen-loss'?'shen':'gu'));
   if(['no-shen','shen-loss'].includes(cohort)&&st.choices.some(c=>c.v40Heir?.round===2))return st.choices.findIndex(c=>c.v40Heir?.key==='hui');
   if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];return st.choices.findIndex(F155.allowed);}
  function play(pick){const before=state.index+':'+state.chapterStep;choose(pick);if(before===state.index+':'+state.chapterStep)throw Error('Stalled '+before);}
  function choicesFor(st,axis){return st.choices.map((c,i)=>({c,i,value:axis.special?c[axis.special]:c.effects?.flags?.[axis.flag]})).filter(x=>x.value!=null);}
  function progressState(){return JSON.stringify({index:state.index,chapterStep:state.chapterStep,flags:state.flags,ranks:state.ranks,bond:state.bond,trust:state.trust,mind:state.mind,history:state.history,stepHistory:state.stepHistory,chronicle:state.chronicle,events:state.events151,sceneChoices:state.sceneChoices151});}
  async function walk(index,path){
   if(index===axes.length){
    while(state.index<26)play(defaultPick(step()));
    const key=path.map(p=>p.value).join('|'),row={key,path:path.map(p=>({axis:p.name,value:p.value})),pass:false};
    try{
     if(!state.flags.v82FinaleComplete)throw Error('Missing ending flag');
     if(state.flags.v75ShenFate!==path[3].value)throw Error('Shen fate overwritten');
     if(['public','indulged'].includes(cohort)&&state.flags.v81PrinceOpenEnding)throw Error('Adult successor route wrongly sent away');
     if(['male','female','no-shen','shen-loss'].includes(cohort)&&!state.flags.v81PrinceOpenEnding)throw Error('Severe education route did not reach departure');
     const shen=F155.person('shen');if(shen.dead!==(path[3].value==='death'))throw Error('Shen death mismatch');
     const children=F155.children();const seen=new Set();for(const child of children){if(seen.has(child.name))throw Error('Duplicate child '+child.name);seen.add(child.name);}
     for(const [key,flag] of [['latePrincess','v72FosterPrincess'],['latePrince','v72FosterPrince']]){
      const child=children.find(c=>c.key===key);if(!child)throw Error('Late heir missing '+key);
      if(child.mother===(child.foster||''))throw Error('Mother overwritten by foster');
      if(Boolean(child.foster==='zhangyuanzhao')!==Boolean(state.flags[flag]))throw Error('Foster mismatch '+key);
     }
     for(const mode of ['read','menu','montage']){
      const before=progressState();if(!F155.endingBegin('',mode))throw Error('Cannot review '+mode);
      F155.endingLeave('',false);if(progressState()!==before)throw Error('Review changed saved progress '+mode);report.reviewChecks++;
     }
     row.pass=true;
    }catch(error){row.error=error.message;report.failures.push(row);}
    report.rows.push(row);if(report.rows.length%256===0)await crossProgress155({phase:'late-cross',completed:report.rows.length,failed:report.failures.length,reviewChecks:report.reviewChecks});
    return;
   }
   const axis=axes[index];let found,steps=0;
   while(state.index<26){const st=step();found=choicesFor(st,axis);if(found.length)break;play(defaultPick(st));if(++steps>500)throw Error('Missing axis '+axis.name);}
   if(!found?.length)throw Error('No axis '+axis.name);
   const seed=clone(state);
   for(const {c,i,value} of found){
    state=clone(seed);F155.normalize();const live=step().choices[i];
    if(!F155.allowed(live)){report.excluded.push({path:path.map(x=>x.value),axis:axis.name,value,reason:'Requires not satisfied'});continue;}
    play(i);await walk(index+1,[...path,{name:axis.name,value}]);
   }
  }
  try{state=F155.initial();state.intro=true;state.view='story';await walk(0,[]);report.pass=report.failures.length===0;}
  finally{save=oldSave;api.rememberEnding=oldRemember;F155.bulk(false);}
  return report;
 },cohort);
 fs.writeFileSync(file,JSON.stringify(report,null,2));assert.equal(report.rows.length,7776,'all legal combinations after the top-two-fates requirement must be enumerated');assert.deepEqual(report.failures,[]);assert.equal(report.reviewChecks,report.rows.length*3);console.log(JSON.stringify({pass:report.pass,cohort,combinations:report.rows.length,revisitChecks:report.reviewChecks,excluded:report.excluded.length}));
};
