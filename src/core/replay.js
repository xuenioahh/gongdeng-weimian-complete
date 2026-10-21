function replay136(to){
    normalize136();to=Math.max(0,Math.min(Number(to)||0,Math.min(state.index,CHAPTERS.length-1)));
    const old=state.history.slice(0,to),oldChronicle=state.chronicle.slice(0,to),oldSnapshots=(state.chapterSnapshots||[]).slice(0,to),roster=[...(state.flags?.lowConsorts||state.flags?.v78LowSelected||[])],view=state.view;
    const oldEvents=Object.fromEntries(Object.entries(state.events151||{}).filter(([,e])=>e.chapterIndex<to));
    state=initial136();state.events151=oldEvents;state.sceneChoices151=Object.fromEntries(Object.values(oldEvents).map(e=>[e.id,e.pick]));state.intro=true;state.view=view||'story';
    state.chapterSnapshots=oldSnapshots;
    if(to>0&&restoreSnapshot136(oldSnapshots[to-1])){
      state.history=old;state.chronicle=oldChronicle;
    }else
    old.forEach((record,idx)=>{
      const ch=CHAPTERS[idx],picks=Array.isArray(record)?record:[record],decisions=[],results=[],changes=[];
      if(!ch)return;
      picks.forEach((pick,si)=>{
        state.index=idx;state.chapterStep=si;
        const st=CHAPTERS[idx].steps?.[si],c=st?st.choices?.[pick]:ch.choices?.[pick];
        if(!c)return;
        if(idx===5&&roster.length){state.flags.v78LowSelected=[...roster];state.flags.lowConsorts=[...roster]}
        const label=val136(c.label,'');const rr=result136(c);changes.push(...effects136(c));if(!st?.narrative)decisions.push(label);if(rr)results.push(rr);
      });
      state.history[idx]=Array.isArray(record)?record.slice():record;
      state.chronicle[idx]={date:ch.date,title:ch.title,decision:decisions.join(' → '),result:results.join(' '),changes};
      state.index=idx+1;
    });
    state.index=to;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.stepDecisions=[];state.lastChoice=null;
    save();render136();
  }
