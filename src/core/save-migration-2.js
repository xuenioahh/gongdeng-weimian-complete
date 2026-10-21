function migrate138(){
    if(migrating138||state?.runtimeSchema===140)return;
    const old=JSON.parse(JSON.stringify(state)),savedSave=save;
    if(!old.history?.length&&!old.stepHistory?.length){state.runtimeSchema=140;return;}
    // 只按实际保存的落子重算，不用默认路线补齐缺失历史。
    if(Array.from({length:old.index},(_,i)=>old.history?.[i]).some(x=>x==null)){
      state.runtimeSchema=140;state.stateRepairNotice='这份旧档缺少部分落子记录，已保留原进度；可从最近一章重走以重新结算位分。';return;
    }
    migrating138=true;save=()=>{};
    try{
      state=initial136();state.intro=old.intro;state.view=old.view;
      const selected=old.flags?.lowConsorts||old.flags?.v78LowSelected||[];
      prepare139(state);
      for(let ci=0;ci<=old.index&&ci<CHAPTERS.length;ci++){
        state.index=ci;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];
        const partial=ci===old.index,record=partial?old.stepHistory:old.history[ci],picks=alignPicks139(ci,record,partial,old);
        const decisions=[],stepDecisions=[],results=[],changes=[];
        if(!partial&&picks.length!==(CHAPTERS[ci].steps?.length||1))throw Error('旧档幕次与现行章节不一致');
        for(let si=0;si<picks.length;si++){
          state.chapterStep=si;state.stepHistory=picks.slice(0,si);state.stepResults=results.slice();
          const ch=CHAPTERS[ci],st=ch.steps?.[si],c=(st?.choices||ch.choices)?.[picks[si]];
          if(!c)throw Error('旧档选项不存在');
          if(ci===5&&selected.length)state.flags.v78LowSelected=selected.slice();
          const label=st?.narrative?'':val136(c.label,'');
          const result=result136(c);changes.push(...effects136(c));if(!old.flags?.v155SevereArcChosen)delete state.flags.v155SevereArcChosen;results.push(result);stepDecisions.push(label);if(label)decisions.push(label);
        }
        if(partial){state.stepHistory=picks.slice();state.stepDecisions=stepDecisions;state.stepResults=results;state.stepChanges=changes;}
        else{
          state.history[ci]=picks.slice();
          state.chapterSnapshots[ci]=snapshot136();
          state.chronicle[ci]={date:CHAPTERS[ci].date,title:CHAPTERS[ci].title,decision:decisions.join(' → '),result:results.filter(Boolean).join(' '),changes};
        }
      }
      state.index=old.index;state.chapterStep=old.index<CHAPTERS.length?state.stepHistory.length:0;state.lastChoice=old.lastChoice;
      for(const [r,x] of Object.entries(state.flags.extraHeirs||{})){const prior=old.flags?.extraHeirs?.[r];if(prior?.mother===x.mother&&!prior.skipped&&prior.name){const generated=x.name;x.name=prior.name;x.gender=prior.gender||x.gender;if(generated&&generated!==x.name){for(const e of state.chronicle)if(e?.result)e.result=e.result.split(generated).join(x.name);state.stepResults=state.stepResults.map(t=>String(t).split(generated).join(x.name));}if(x.born)CHILDREN['extraHeir'+r]={...x,mother:x.mother};}}
      state.runtimeSchema=140;
    }catch(e){
      globalThis.__migration139Error=String(e.stack);state=old;state.runtimeSchema=140;state.stateRepairNotice='这份旧档的幕次与现行正文不一致，已保留原进度；可从最近一章重走以重新结算位分。';
    }finally{save=savedSave;migrating138=false;}
  }
