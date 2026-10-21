function bindTest140(){
    const get=id=>document.querySelector('#'+id);
    const gallery=get('test142-gallery');if(gallery)gallery.onclick=()=>{if(testBusy140)return;state.view='art';render136();};
    const back=get('art142-return');if(back)back.onclick=()=>{state.view='story';render136();};
    const run=async(ci,si,route=testPrefs140.route,mode=testPrefs140.mode)=>{
      const controls=document.querySelectorAll('.test140 button');controls.forEach(b=>b.disabled=true);
      try{await jump140(ci,si,route,mode)}catch(e){render136();const box=get('test140-status');if(box)box.textContent=e.message;const drawer=get('test140-drawer');if(drawer)drawer.open=true;}
    };
    const route=get('test140-route'),chapter=get('test140-chapter'),scene=get('test140-scene'),mode=get('test140-mode');
    const refresh=()=>{testPrefs140.scene=0;if(scene)scene.innerHTML=sceneOptions140();};
    if(route)route.onchange=()=>{testPrefs140.route=route.value;refresh()};
    if(chapter)chapter.onchange=()=>{testPrefs140.chapter=Number(chapter.value);refresh()};
    if(scene)scene.onchange=()=>testPrefs140.scene=Number(scene.value);
    if(mode)mode.onchange=()=>testPrefs140.mode=mode.value;
    const go=get('test140-go');if(go)go.onclick=()=>run(testPrefs140.chapter,testPrefs140.scene);
    const open=get('test140-open');if(open)open.onclick=()=>{const d=get('test140-drawer');if(d)d.open=!d.open;};
    document.querySelectorAll('[data-test140-shortcut]').forEach(b=>b.onclick=()=>{
      const ci=Number(b.dataset.test140Shortcut),needle=b.dataset.heading||'',route=needle==='承熙十四年四月'?'ning':testPrefs140.route;
      const si=ci===CHAPTERS.length?0:Math.max(0,scenes140(ci,route).findIndex(x=>x.heading.includes(needle)));
      run(ci,si,route,needle==='承熙十四年四月'?'preset':testPrefs140.mode);
    });
    const undo=get('test140-undo');if(undo)undo.onclick=()=>{if(!testUndo140)return;state=clone140(testUndo140);testUndo140=null;prepare139(state);save();render136();};
    const report=get('test140-location');if(report)report.onclick=()=>{const p=get('test140-report');if(p){p.hidden=false;p.textContent=JSON.stringify({version:'v146-test',chapter:state.index+1,title:CHAPTERS[state.index]?.title||'卷终',scene:state.chapterStep+1,heading:CHAPTERS[state.index]?.steps?.[state.chapterStep]?.heading||'人物瓷谱',empress:state.flags.v44NewEmpress,zhang:v138Person('zhangyuanzhao'),shen:v138Person('shen'),lastChoices:state.stepHistory},null,2);}};
    document.querySelectorAll('[data-test140-chapter]').forEach(b=>b.onclick=()=>run(Number(b.dataset.test140Chapter),0));
  }
