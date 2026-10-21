// The director owns the reading area's environment across story renders.
// Story text describes a scene; state and the few authored overrides decide
// which layers are active. No sound starts before the reader asks for it.
const EnvironmentDirector=(()=>{
  let pending=null,host=null,quietKey='',quietDeadline=0,quietTimer=0;
  const quietSeen=new Set();
  let soundEnabled=false,audioContext=null,audioSource=null,audioFilter=null,audioGain=null;

  function resolve(chapter,step,paragraphs,calendar,currentState){
    const air=atmosphereConfig146(chapter,step,paragraphs,calendar);
    const flags=currentState?.flags||{};
    const heading=String(step?.heading||'');
    const atFengyi=/凤仪宫/.test(chapter.place||'')||/凤仪宫/.test(heading);
    const emptyFengyi=atFengyi&&!!flags.guDead&&!flags.v44NewEmpress;
    let lamps=air.motif==='lamp'?3:0;
    if(chapter.title==='空宫点灯'||emptyFengyi)lamps=1;
    if(air.reopen)lamps=3;
    if(chapter.title==='万家灯火'&&/新朝第一夜/.test(heading))lamps=5;
    if(air.motif==='none'&&!air.reopen)lamps=0;
    if(Number.isInteger(air.lamps))lamps=air.lamps;
    const temperature=air.season==='冬'?'cold':lamps?'warm':'neutral';
    const tokens=[air.time==='night'?'PALACE_NIGHT':'DAY',air.weather.toUpperCase(),lamps?'BREATH':'STILL'];
    if(emptyFengyi)tokens.push('EMPTY');
    if(air.reopen)tokens.push('REOPEN');
    if(air.still)tokens.push('SILENCE');
    pending={...air,lamps,temperature,tokens,chapter:chapter.title,heading};
    return pending;
  }

  function detach(){
    clearTimeout(quietTimer);
    if(host?.isConnected)host.remove();
  }

  function setAudioTarget(){
    if(!audioContext)return;
    const onCover=!!document.querySelector('.palace-opening');
    const weather=onCover?'wind':pending?.still?'clear':pending?.weather||'clear';
    const audible=soundEnabled&&document.visibilityState!=='hidden'&&(onCover||!!document.querySelector('.scene-reading'));
    const volume=audible?({rain:.028,wind:.012}[weather]||0):0;
    const frequency=weather==='rain'?1700:420;
    audioFilter.frequency.setTargetAtTime(frequency,audioContext.currentTime,.4);
    audioGain.gain.setTargetAtTime(volume,audioContext.currentTime,.5);
  }

  async function toggleSound(){
    if(!soundEnabled){
      if(!makeAudio())return null;
      try{await audioContext.resume()}catch(_e){return null;}
      soundEnabled=true;
    }else soundEnabled=false;
    setAudioTarget();
    return soundEnabled;
  }

  function chime(){
    if(!soundEnabled||!audioContext||document.visibilityState==='hidden')return;
    const now=audioContext.currentTime;
    [130.81,261.62,393.4].forEach((frequency,i)=>{
      const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();
      oscillator.frequency.value=frequency;oscillator.type='sine';
      gain.gain.setValueAtTime(0,now);
      gain.gain.linearRampToValueAtTime(.015/(i+1),now+.025);
      gain.gain.exponentialRampToValueAtTime(.0001,now+2.8);
      oscillator.connect(gain);gain.connect(audioContext.destination);
      oscillator.start(now);oscillator.stop(now+3);
      oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
    });
  }

  function makeAudio(){
    if(audioContext)return true;
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioContextClass)return false;
    try{
      audioContext=new AudioContextClass();
      const length=audioContext.sampleRate*2;
      const buffer=audioContext.createBuffer(1,length,audioContext.sampleRate);
      const data=buffer.getChannelData(0);
      for(let i=0;i<length;i++)data[i]=Math.random()*2-1;
      audioSource=audioContext.createBufferSource();
      audioSource.buffer=buffer;audioSource.loop=true;
      audioFilter=audioContext.createBiquadFilter();audioFilter.type='lowpass';
      audioGain=audioContext.createGain();audioGain.gain.value=0;
      audioSource.connect(audioFilter);audioFilter.connect(audioGain);audioGain.connect(audioContext.destination);
      audioSource.start();
      return true;
    }catch(error){
      console.warn('环境声不可用',error);
      try{audioContext?.close()}catch(_e){}
      audioContext=null;audioSource=null;audioFilter=null;audioGain=null;
      return false;
    }
  }

  function bindSoundButton(){
    const tools=document.querySelector('.reading-tools');
    if(!tools)return;
    const soundLabel=()=>!soundEnabled?'环境声：关':pending?.still||!['rain','wind'].includes(pending?.weather)?'环境声：开（此幕静音）':'环境声：开';
    const button=document.createElement('button');
    button.id='scene-sound';button.type='button';button.className='voice-btn';
    button.setAttribute('aria-pressed',String(soundEnabled));
    button.textContent=soundLabel();
    button.onclick=async()=>{
      button.disabled=true;
      const enabled=await toggleSound();
      if(!button.isConnected)return;
      if(enabled===null){button.textContent='环境声不可用';return;}
      button.disabled=false;
      button.setAttribute('aria-pressed',String(soundEnabled));
      button.textContent=soundLabel();
      setAudioTarget();
    };
    tools.append(button);
  }

  function releaseQuiet(scene){
    if(!scene?.isConnected)return;
    const content=scene.querySelector('.scene-content');
    scene.classList.remove('environment-quiet-pending');
    if(content){content.inert=false;content.removeAttribute('aria-hidden');}
    scene.querySelector('.environment-quiet')?.remove();
  }

  function applyQuiet(scene,air){
    const key=air.chapter+'|'+air.heading;
    if(!air.quietMs){quietKey='';return;}
    if(!quietSeen.has(key)){
      quietSeen.add(key);quietKey=key;quietDeadline=performance.now()+air.quietMs;
    }
    const remaining=quietKey===key?quietDeadline-performance.now():0;
    if(remaining<=0)return;
    const content=scene.querySelector('.scene-content');
    if(content){content.inert=true;content.setAttribute('aria-hidden','true');}
    scene.classList.add('environment-quiet-pending');
    const veil=document.createElement('div');
    veil.className='environment-quiet';veil.setAttribute('aria-hidden','true');
    veil.textContent=air.quietLabel||air.chapter;
    scene.append(veil);
    quietTimer=setTimeout(()=>releaseQuiet(scene),remaining);
  }

  function mount(){
    const scene=document.querySelector('.scene-reading');
    if(!scene||!pending){setAudioTarget();return;}
    const fresh=scene.querySelector(':scope > .story-atmosphere');
    if(!fresh)return;
    if(host&&host.dataset.weather==='rain'&&pending.weather==='clear'&&!pending.still){
      const departing=host;
      departing.classList.add('environment-fade-out');
      fresh.before(departing);
      host=fresh;
      requestAnimationFrame(()=>{if(departing.isConnected)departing.classList.add('is-fading');});
      setTimeout(()=>departing.remove(),1900);
    }else if(host)fresh.replaceWith(host);
    else host=fresh;
    for(const [key,value] of Object.entries({weather:pending.weather,motif:pending.motif,time:pending.time,still:pending.still,lamps:pending.lamps,scene:pending.reopen?'reopen':'ordinary',environment:pending.tokens.join(' ')})){
      if(host.dataset[key]!==String(value))host.dataset[key]=String(value);
    }
    scene.dataset.temperature=pending.temperature;
    scene.dataset.environment=pending.tokens.join(' ');
    bindSoundButton();
    setAudioTarget();
    applyQuiet(scene,pending);
  }

  document.addEventListener('visibilitychange',setAudioTarget);
  return {resolve,detach,mount,toggleSound,chime,refreshAudio:setAudioTarget,get soundEnabled(){return soundEnabled},get current(){return pending}};
})();
