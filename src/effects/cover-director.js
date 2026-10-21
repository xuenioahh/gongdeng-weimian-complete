const CoverDirector147=(()=>{
  const arrivalMs=4900;
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let host=null,startedAt=0,finished=false,revealTimer=0,leaveTimer=0,leaving=false;

  function reveal(){
    clearTimeout(revealTimer);
    finished=true;
    if(!host?.isConnected)return;
    host.classList.add('opening--revealed');
    const entry=host.querySelector('.opening-entry');if(entry)entry.inert=false;
    const skip=host.querySelector('#opening-skip');if(skip){skip.hidden=true;}
  }

  function applyMotion(){
    if(!host)return;
    const still=!effectsEnabled||!!reduced?.matches;
    host.classList.toggle('opening--still',still);
    const button=host.querySelector('#opening-motion');
    if(button){button.setAttribute('aria-pressed',String(!still));button.textContent=still?'灯影静止':'灯影流动';}
    if(still)reveal();
  }

  function enter(fromBackground=false){
    if(leaving||!host?.isConnected)return;
    reveal();leaving=true;
    if(fromBackground)document.querySelector('#modal')?.close();
    EnvironmentDirector.chime();
    host.classList.add('opening--departing');
    host.setAttribute('aria-busy','true');
    host.querySelectorAll('button').forEach(button=>button.disabled=true);
    const finish=()=>{
      const animate=effectsEnabled&&!reduced?.matches;
      if(animate)document.body.classList.add('opening-story-arrival');
      leaving=false;coverPreview=false;state.intro=true;state.view='story';save();render136();
      if(animate)setTimeout(()=>document.body.classList.remove('opening-story-arrival'),700);
      window.scrollTo({top:0,left:0,behavior:'instant'});
      const heading=document.querySelector('.chapter h1,.ending h1');
      if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
    };
    if(reduced?.matches||!effectsEnabled)finish();
    else leaveTimer=setTimeout(finish,680);
  }

  function mount(){
    clearTimeout(revealTimer);
    host=document.querySelector('.palace-opening');
    if(!host){EnvironmentDirector.refreshAudio();return;}
    if(!startedAt)startedAt=performance.now();
    const elapsed=performance.now()-startedAt;
    host.style.setProperty('--opening-offset',`-${Math.round(elapsed)}ms`);
    if(finished||elapsed>=arrivalMs)reveal();
    else revealTimer=setTimeout(reveal,arrivalMs-elapsed);
    applyMotion();
    const skip=host.querySelector('#opening-skip');if(skip)skip.onclick=reveal;
    const enterButton=host.querySelector('#enter-story');if(enterButton)enterButton.onclick=()=>enter();
    const motion=host.querySelector('#opening-motion');if(motion)motion.onclick=()=>{
      if(reduced?.matches){reveal();return;}
      effectsEnabled=!effectsEnabled;
      try{localStorage.setItem(GAME_CONFIG.storage.effects,effectsEnabled?'on':'off')}catch(_e){}
      document.documentElement.dataset.motion=effectsEnabled?'on':'off';applyMotion();
    };
    const sound=host.querySelector('#opening-sound');if(sound)sound.onclick=async()=>{
      sound.disabled=true;
      const enabled=await EnvironmentDirector.toggleSound();
      if(!sound.isConnected)return;
      if(enabled===null){sound.textContent='夜声不可用';return;}
      sound.disabled=false;sound.setAttribute('aria-pressed',String(enabled));sound.textContent=enabled?'夜声开':'夜声关';
      if(enabled)EnvironmentDirector.chime();
    };
    const background=host.querySelector('#v52-background');if(background)background.onclick=()=>{
      globalThis.V52_ARCHIVES?.background?.();
      const enterBackground=document.querySelector('#v52-background-enter');
      if(enterBackground)enterBackground.onclick=()=>enter(true);
    };
    EnvironmentDirector.refreshAudio();
  }

  function show(){document.body.classList.remove('opening-story-arrival');coverPreview=true;state.view='story';render136();window.scrollTo({top:0,left:0,behavior:'instant'});}
  function reset(){clearTimeout(revealTimer);clearTimeout(leaveTimer);startedAt=0;finished=false;leaving=false;}
  reduced?.addEventListener('change',applyMotion);
  return {mount,show,reset,get busy(){return leaving}};
})();
