function normalize136(){
    if(!state||typeof state!=='object')state=initial136();
    migrate138();
    prepare139(state);
    globalThis.SceneHistory151?.bind();
    repairHistoryKnowledge154(state);
    const seed=initial136();
    for(const k of ['ranks','bond','trust','flags'])state[k]={...(seed[k]||{}),...(state[k]||{})};
    for(const k of ['stepHistory','stepResults','stepChanges','stepDecisions','history','chronicle','chapterSnapshots'])if(!Array.isArray(state[k]))state[k]=[];
    if(state.stepDecisions.length>state.stepHistory.length)state.stepDecisions.length=state.stepHistory.length;
    while(state.stepDecisions.length<state.stepHistory.length)state.stepDecisions.push(null);
    state.index=Math.max(0,Math.min(CHAPTERS.length,Number(state.index)||0));
    state.chapterStep=Math.max(0,Number(state.chapterStep)||0);
    const ch=CHAPTERS[state.index];
    if(ch?.steps?.length)state.chapterStep=Math.min(state.chapterStep,ch.steps.length-1);
    else state.chapterStep=0;
    if(typeof state.intro!=='boolean')state.intro=false;
    if(!state.view)state.view='story';
    if(!Number.isFinite(Number(state.mind)))state.mind=seed.mind??3;
  }
