function result136(c){try{return edit140(typeof c?.result==='function'?String(c.result(JSON.parse(JSON.stringify(state)))||''):String(c?.result||''))}catch(e){console.warn('v136 result failed',e);return''}}

function choose136(i){
    normalize136();
    let chapter=CHAPTERS[state.index];
    if(!chapter)return;
    if(chapter.steps){
      const step=chapter.steps[state.chapterStep||0],c=step?.choices?.[i];
      if(!allowed136(c))return;
      rememberFinalScene147(chapter,step,c);
      const historyEvent=beginHistoryEvent151(chapter,step,c);
      const decision=step?.narrative?'':val136(c.label,'');
      const result=result136(c),changes=effects136(c);
      finishHistoryEvent151(historyEvent,c);
      chapter=CHAPTERS[state.index];
      state.stepHistory.push(i);state.stepDecisions.push(decision);state.stepResults.push(result);state.stepChanges.push(...changes);state.lastChoice=i;
      if(state.chapterStep<chapter.steps.length-1){
        state.chapterStep+=1;save();render136();
        try{if(!bulk140&&!step.narrative)sealFlashForChoice(c)}catch(_e){}
        try{if(!bulk140)scrollAfterChoice(Boolean(c.result),false)}catch(_e){}
        return;
      }
      state.history[state.index]=state.stepHistory.slice();
      state.chronicle[state.index]={date:chapter.date,title:chapter.title,decision:chapter.steps.map((st,idx)=>st.narrative?null:(state.stepDecisions[idx]??val136(st.choices?.[state.stepHistory[idx]]?.label,''))).filter(Boolean).join(' → '),result:state.stepResults.filter(Boolean).join(' '),changes:state.stepChanges.slice()};
      state.chapterSnapshots[state.index]=snapshot136();
      state.index=Math.min(state.index+1,CHAPTERS.length);state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.stepDecisions=[];
      globalThis.V52_ARCHIVES?.rememberEnding?.(true);save();render136();
      try{if(!bulk140&&!step.narrative)sealFlashForChoice(c)}catch(_e){}
      try{if(!bulk140)scrollAfterChoice(false,true)}catch(_e){}
      return;
    }
    const c=chapter.choices?.[i];if(!allowed136(c))return;
    const decision=val136(c.label,'');
    const result=result136(c),changes=effects136(c);
    state.history[state.index]=i;state.chronicle[state.index]={date:chapter.date,title:chapter.title,decision,result,changes};
    state.chapterSnapshots[state.index]=snapshot136();
    state.lastChoice=i;state.index=Math.min(state.index+1,CHAPTERS.length);globalThis.V52_ARCHIVES?.rememberEnding?.(true);save();render136();
    try{sealFlashForChoice(c);scrollAfterChoice(false,true)}catch(_e){}
  }
