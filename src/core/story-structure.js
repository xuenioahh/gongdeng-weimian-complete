const oldStructure139=CHAPTERS.map(ch=>(ch.steps||[]).map(st=>st.heading));

function prepare139(s=state){
    const west=CHAPTERS.find(x=>x.title==='西华门外');
    if(west){
      if(s.flags?.v155SevereArcChosen){if(!west.steps.some(x=>x.v155SeverePrince))west.steps.unshift(...(globalThis.v155SeverePrinceScenes?.()||[]));}
      else west.steps=west.steps.filter(x=>!x.v155SeverePrince);
    }
    const ch=CHAPTERS.find(x=>x.title==='帘后朱笔');if(!ch)return;
    if(s.flags?.v74ShaoThenZhang){
      if(!ch.steps.some(x=>x.v106ShaoRoute))ch.steps.unshift(...(globalThis.v139ShaoScenes?.()||[]).map(x=>({...x,v139Required:true})));
    }else ch.steps=ch.steps.filter(x=>!x.v106ShaoRoute&&!x.v74route&&!x.v155SeverePrince);
  }

globalThis.v139PrepareChapters=prepare139;
