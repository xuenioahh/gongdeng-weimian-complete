function known138(){
    const seen=new Set(['emperor','taihou','gu','shen','zhou','peiyan']);
    for(let ci=0;ci<=Math.min(state.index,CHAPTERS.length-1);ci++){
      const ch=CHAPTERS[ci];(ch.cast||[]).forEach(k=>seen.add(k));
      (ch.steps||[]).slice(0,ci===state.index?(state.chapterStep||0)+1:undefined).forEach(st=>(st.cast||[]).forEach(k=>seen.add(k)));
    }
    consorts138.forEach(k=>{if(person138(k).admitted)seen.add(k)});
    if(state.flags?.v70XuOfficialEntered)seen.add('xulingyi');
    return [...seen].filter(k=>PEOPLE[k]&&k!=='chen'&&k!=='ruoxi'&&(!consorts138.includes(k)||person138(k).admitted||['fang','wenheng','daila','baopu','hanzhang'].includes(k))&&(!low138.includes(k)||(state.flags.lowConsorts||[]).includes(k)));
  }
