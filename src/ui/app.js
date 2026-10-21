function render136(){
    if(bulk140||CoverDirector147.busy)return;
    stopFinaleReveal146();
    stopFinalMontage147();
    normalize136();
    globalThis.V52_ARCHIVES?.rememberEnding?.();
    try{stopVoice()}catch(_e){}
    const app=document.querySelector('#app');if(!app)return;
    EnvironmentDirector.detach();
    let body='';
    try{
      if(state.view==='story')body=story136();
      else if(state.view==='people')body=people138();
      else if(state.view==='children')body=childrenView138();
      else if(state.view==='art')body=artGallery142();
      else if(state.view==='chronicle')body=html136(chronicleView);
      else body=html136(mapView);
      const onCover=state.view==='story'&&(coverPreview||(state.index===0&&!state.intro));
      document.body.classList.toggle('cover-is-open',onCover);
      app.innerHTML=(onCover?'':html136(nav)+testPanel140())+body;
    }catch(e){console.error('v136 render failed',e);app.innerHTML=`<main class="page"><div class="page-title"><h1>页面暂时无法显示</h1><p>${esc136(e?.message||e)}</p></div></main>`}
    bind136();
    mountEndingNavigation149();
    CoverDirector147.mount();
    EnvironmentDirector.mount();
    document.documentElement.dataset.build=BUILD136;document.title=TITLE136;
    try{if(typeof enrich==='function')enrich(document)}catch(_e){}
  }
