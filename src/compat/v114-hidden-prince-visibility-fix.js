(()=>{try{
  const westIndex=(CHAPTERS||[]).findIndex(c=>c.title==='西华门外');
  if(PEOPLE?.yinprince&&westIndex>=0){
    PEOPLE.yinprince.introducedAt=westIndex;
    if(!state.flags?.v69HiddenPrinceRevealed){
      PEOPLE.yinprince.bio='出身不高、履历短，因整理宗室旧籍与赈孤账出名。支持他的人多反对《经手留名令》。他不靠门第压人，也因此在二公主后期婚议中显得格外不像传统驸马候选。';
    }
  }
  const beforeRender=render;
  render=function(){
    if(PEOPLE?.yinprince&&westIndex>=0)PEOPLE.yinprince.introducedAt=westIndex;
    return beforeRender();
  };
  document.documentElement.dataset.build='v114';
}catch(e){console.error('v114 hidden prince visibility fix failed',e)}})();
