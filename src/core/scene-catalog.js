function scenes140(ci,route=testPrefs140.route){
    if(ci===CHAPTERS.length)return [{heading:'卷终 · 人物瓷谱'}];
    const common=(CHAPTERS[ci]?.steps||[]).filter(x=>!x.v106ShaoRoute&&!x.v74route);
    return ci===23&&route==='ning'?[...(globalThis.v139ShaoScenes?.()||[]),...common]:common;
  }
