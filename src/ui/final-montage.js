let montagePlayer147=null;

function finalMontageView147(){
  return `<main class="final-montage" aria-label="浮生走马灯" tabindex="-1">
    <div class="memory-stage" role="button" tabindex="0" aria-label="继续下一段记忆">
      <div class="memory-pictures" aria-hidden="true"></div>
      <div class="memory-darkness" aria-hidden="true"></div>
      <div class="memory-lantern" aria-hidden="true"><i></i><b></b></div>
      <div class="memory-object" aria-hidden="true"></div>
      <div class="memory-source"></div>
      <div class="memory-captions" aria-live="polite" aria-atomic="true"><p class="memory-quote"></p><p class="memory-poem"></p><div class="memory-title" hidden><h1>宫灯未眠</h1><p>承熙纪事 · 终</p></div></div>
    </div>
    <div class="memory-controls"><span class="memory-progress">浮生</span><button id="memory-auto" aria-pressed="true">暂停</button><button id="memory-sound" aria-pressed="false">配乐：关</button><button id="memory-next">继续 <span aria-hidden="true">→</span></button><button id="memory-skip">跳过走马灯</button><button id="memory-exit">退出观看</button></div>
  </main>`;
}

function startFinalMontage147(){
  if(state.index!==CHAPTERS.length||!state.flags?.v82FinaleComplete)return;
  if(finaleReview149||state.finalMontage147?.status==='complete'||state.finalMontage147?.status==='reading')return beginEndingReview149('','montage');
  state.finalMontage147={version:147,status:'playing',beat:0,elapsed:0,paused:false};
  save();render136();
}

// Optional, quiet plucked notes. The project contains no recorded audio tracks.
// Follow the existing sound convention: enable only after an explicit click.
function memoryScore147(){
  let context=null,gain=null,enabled=false,last=-1,closed=false;
  const nodes=new Set();
  const quiet=()=>{
    if(!context||!gain)return;
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.setTargetAtTime(0,context.currentTime,.16);
    last=-1;
  };
  const close=()=>{closed=true;enabled=false;quiet();for(const n of nodes){try{n.stop()}catch(_e){}}nodes.clear();try{context?.close()?.catch(()=>{})}catch(_e){}context=null};
  return {
    async toggle(){
      if(closed)return false;
      if(enabled){enabled=false;quiet();return false}
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)throw Error('unavailable');
      try{
        if(!context){context=new Audio();gain=context.createGain();gain.gain.value=0;gain.connect(context.destination)}
        await context.resume();if(closed){close();return false}enabled=true;return true;
      }catch(e){close();throw e}
    },
    tick(time,act,muted){
      if(!enabled||!context||context.state!=='running')return;
      if(muted){quiet();return}
      const slot=Math.floor(time/3300);if(slot===last)return;last=slot;
      const warmth=Math.max(0,1-act/9);
      gain.gain.setTargetAtTime(.12*warmth,context.currentTime,.65);
      const sequence=[220,261.63,293.66,329.63,293.66,261.63,220,196];
      for(const [ratio,volume] of [[1,.16],[2,.025]]){
        const tone=context.createOscillator(),envelope=context.createGain(),now=context.currentTime;
        tone.type='sine';tone.frequency.value=sequence[slot%sequence.length]*ratio;
        envelope.gain.setValueAtTime(0,now);envelope.gain.linearRampToValueAtTime(volume,now+.035);
        envelope.gain.exponentialRampToValueAtTime(.0001,now+2.7);
        tone.connect(envelope);envelope.connect(gain);nodes.add(tone);
        tone.onended=()=>{nodes.delete(tone);tone.disconnect();envelope.disconnect()};tone.start();tone.stop(now+2.8);
      }
    },quiet,close
  };
}

function stopFinalMontage147(){montagePlayer147?.stop();montagePlayer147=null}

function mountFinalMontage147(){
  const root=document.querySelector('.final-montage');if(!root)return;
  const mountedState=state,progress=state.finalMontage147,beats=finalMontageBeats147();
  const stage=root.querySelector('.memory-stage'),pictures=root.querySelector('.memory-pictures');
  const quote=root.querySelector('.memory-quote'),poem=root.querySelector('.memory-poem');
  const title=root.querySelector('.memory-title'),source=root.querySelector('.memory-source');
  const next=root.querySelector('#memory-next'),auto=root.querySelector('#memory-auto'),sound=root.querySelector('#memory-sound');
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)'),score=memoryScore147();
  let beat=Math.max(0,Math.min(beats.length-1,progress.beat||0));
  let elapsed=Math.max(0,Math.min(beats[beat].duration-1,Number(progress.elapsed)||0));
  let paused=!!progress.paused,stopped=false,raf=0,last=performance.now(),loadGeneration=0,previous=null;
  const loaded=new Map(),loadTimers=new Set(),layers=new Set(),departTimers=new Set(),pendingLoads=new Set();
  const persist=()=>{
    if(state!==mountedState||state.finalMontage147?.status!=='playing')return;
    Object.assign(progress,{beat,elapsed,paused});save();
  };
  const hidden=()=>document.hidden||!!document.querySelector('dialog[open]');
  const freeze=()=>{
    const hold=paused||hidden();root.classList.toggle('memory-paused',hold);
    root.classList.toggle('memory-still',!!reduced?.matches||!effectsEnabled);
    auto.textContent=paused?'自动播放':'暂停';auto.setAttribute('aria-pressed',String(!paused));
    if(hold)score.quiet();last=performance.now();
  };
  function load(src){
    if(loaded.has(src))return loaded.get(src);
    const promise=new Promise(resolve=>{
      const img=new Image();let done=false;
      const finish=ok=>{if(done)return;done=true;clearTimeout(timer);loadTimers.delete(timer);pendingLoads.delete(cancel);img.onload=img.onerror=null;resolve(ok?img:null)};
      const cancel=()=>finish(false);pendingLoads.add(cancel);
      const timer=setTimeout(()=>finish(false),2200);loadTimers.add(timer);
      img.onload=()=>finish(img.naturalWidth>0);img.onerror=()=>finish(false);img.src=src;
      if(img.complete)finish(img.naturalWidth>0);
    });loaded.set(src,promise);return promise;
  }
  function addImage(layer,src,kind,key){
    const img=document.createElement('img');img.src=src;img.alt='';img.className=kind;
    if(key)img.dataset.person=key;
    img.onerror=()=>img.remove();layer.append(img);
  }
  async function picture(b){
    const generation=++loadGeneration;
    const files=[...(b.art?[`assets/asset-${b.art}.webp`]:[]),...(b.portraits||[]).map(k=>MEMORY_PORTRAITS147[k])].filter(Boolean);
    const images=await Promise.all(files.map(load));
    if(stopped||generation!==loadGeneration)return;
    const layer=document.createElement('div');layer.className='memory-picture';layer.dataset.beat=b.id;
    if(b.art&&images[0]){addImage(layer,files[0],'memory-art');if(Number(b.art)>=73&&Number(b.art)<=127)layer.classList.add('has-baked-caption')}
    for(const key of b.portraits||[]){const src=MEMORY_PORTRAITS147[key];if(images[files.indexOf(src)])addImage(layer,src,'memory-person',key)}
    pictures.append(layer);layers.add(layer);layer.offsetHeight;
    const outgoing=previous;previous=layer;
    if(outgoing){outgoing.classList.remove('is-present');outgoing.classList.add('is-departing');(()=>{const timer=setTimeout(()=>{departTimers.delete(timer);outgoing.remove();layers.delete(outgoing)},1300);departTimers.add(timer)})()}
    layer.classList.add('is-present');
    const following=beats[beat+1];if(following?.art)load(`assets/asset-${following.art}.webp`);
  }
  function paint(){
    const b=beats[beat];
    root.dataset.beat=b.id;root.dataset.motif=b.motif||'lamp';root.dataset.act=b.act??'coda';
    root.classList.toggle('memory-coda',!!b.coda);root.classList.toggle('memory-opening',!!b.opening);
    root.classList.toggle('memory-with-portraits',!!b.portraits?.length);
    quote.textContent=b.quote||b.line||'';poem.textContent=b.poemVisible?b.poem:'';
    title.hidden=!b.title;
    source.textContent=b.chapter?`《${b.chapter}》 · ${b.heading}`:b.coda&&!b.title&&b.motif!=='dark'?'张元照 · 新朝第一夜':'';
    root.querySelector('.memory-progress').textContent=b.act!=null?`${'一二三四五六七'[b.act]} / 七`:'浮生';
    stage.setAttribute('aria-label',b.title?'宫灯未眠，承熙纪事，终。继续进入卷终':`${b.poem||b.line||'宫灯亮起'} 继续下一段记忆`);
    root.classList.remove('memory-enter');root.offsetHeight;root.classList.add('memory-enter');
    void picture(b);persist();freeze();
  }
  function finish(){
    if(stopped||state!==mountedState)return;
    state.finalMontage147={version:147,status:'complete'};
    score.quiet();save();render136();
    document.querySelector('.finale-entries button')?.focus({preventScroll:true});
  }
  function advance(){
    if(stopped||hidden())return;
    if(beat===beats.length-1){finish();return}
    beat++;elapsed=0;paint();
  }
  const totalBefore=()=>beats.slice(0,beat).reduce((n,b)=>n+b.duration,0);
  let before=totalBefore();
  function tick(now){
    if(stopped)return;
    const delta=Math.max(0,now-last);last=now;
    if(!paused&&!hidden()){
      elapsed+=delta;
      // Save-panel pack() reads state directly. Keep the live position current
      // without writing localStorage on every animation frame.
      if(state===mountedState)Object.assign(progress,{beat,elapsed,paused});
      if(elapsed>=beats[beat].duration){advance();before=totalBefore();if(stopped)return}
      // In the coda, the remaining notes release into silence before the title.
      try{score.tick(before+elapsed,beats[beat].act??8,!!beats[beat].coda)}catch(_e){score.quiet()}
    }
    root.style.setProperty('--memory-time',Math.min(1,elapsed/beats[beat].duration));
    raf=requestAnimationFrame(tick);
  }
  next.onclick=()=>{advance();before=totalBefore()};
  root.querySelector('#memory-skip').onclick=finish;
  root.querySelector('#memory-exit').onclick=()=>{if(finaleReview149)leaveEndingReview149();else endingNavigation149('menu')};
  auto.onclick=()=>{paused=!paused;persist();freeze()};
  sound.onclick=async()=>{try{const on=await score.toggle();if(stopped){score.close();return}sound.textContent=on?'配乐：开':'配乐：关';sound.setAttribute('aria-pressed',String(on));freeze()}catch(_e){sound.textContent='配乐不可用';sound.disabled=true}};
  stage.onclick=()=>{advance();before=totalBefore()};
  const onKey=e=>{if(e.key==='Escape'){e.preventDefault();root.querySelector('#memory-exit').click();return}if((e.key==='Enter'||e.key===' ')&&(!e.target.closest('button')||e.target===stage)){e.preventDefault();advance();before=totalBefore()}};
  root.addEventListener('keydown',onKey);
  const visibility=()=>{persist();freeze()};
  const checkpoint=()=>persist();
  window.addEventListener('pagehide',checkpoint);
  document.addEventListener('visibilitychange',visibility);reduced?.addEventListener?.('change',freeze);
  const modalObserver=new MutationObserver(freeze);document.querySelectorAll('dialog').forEach(d=>modalObserver.observe(d,{attributes:true,attributeFilter:['open']}));
  const resize=()=>root.style.setProperty('--memory-header',`${Math.max(0,(document.querySelector('.ending-review-bar')||document.querySelector('header'))?.getBoundingClientRect().bottom||0)}px`);
  const observer=typeof ResizeObserver==='function'?new ResizeObserver(resize):null;
  if(document.querySelector('header'))observer?.observe(document.querySelector('header'));window.addEventListener('resize',resize);resize();
  montagePlayer147={stop(){if(stopped)return;persist();stopped=true;loadGeneration++;cancelAnimationFrame(raf);score.close();observer?.disconnect();modalObserver.disconnect();pendingLoads.forEach(cancel=>cancel());pendingLoads.clear();loadTimers.forEach(clearTimeout);loadTimers.clear();departTimers.forEach(clearTimeout);departTimers.clear();root.removeEventListener('keydown',onKey);layers.forEach(l=>l.remove());document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',checkpoint);reduced?.removeEventListener?.('change',freeze);window.removeEventListener('resize',resize)}};
  paint();raf=requestAnimationFrame(tick);root.focus({preventScroll:true});
}
