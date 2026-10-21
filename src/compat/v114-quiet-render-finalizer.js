(()=>{try{
  const inheritedRender=render;
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t);
  render=function(){
    const wantedView=state.view;
    const title=CHAPTERS[state.index]?.title||'';
    const heading=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
    // 旧版多层 render 在 story 分支会先调用已过时的 c.text；先借非剧情页跑完其同步副作用，再恢复真实视图。
    if(wantedView==='story')state.view='children';
    let out;try{out=inheritedRender()}catch(e){console.warn('v114 inherited non-story render intercepted',e)}
    state.view=wantedView;
    const ni=CHAPTERS.findIndex(c=>c.title===title);
    if(ni>=0){state.index=ni;if(heading){const si=CHAPTERS[ni].steps?.findIndex(x=>String(x.heading||'')===heading);if(si>=0)state.chapterStep=si;}}
    try{
      const app=document.querySelector('#app');
      if(app){
        app.innerHTML=nav()+(state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView());
        bind();if(typeof maybeAutoplayVoice==='function')maybeAutoplayVoice();
      }
    }catch(e){console.error('v114 final direct render failed',e)}
    document.documentElement.dataset.build='v114';
    document.title='宫灯未眠 · 皇子女全局人设梳理润色 v114';
    return out;
  };
  try{render()}catch(_e){}
}catch(e){console.error('v114 quiet render finalizer failed',e)}})();
