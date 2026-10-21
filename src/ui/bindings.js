function bind136(){
    mountFinaleReveal146();
    mountFinalMontage147();
    bindMotion146();
    bindSealReview154();
    bindYearbook155();
    bindTest140();
    bindFlip138();
    const archives=document.querySelector('#v52-archives');if(archives)archives.onclick=()=>globalThis.V52_ARCHIVES?.open?.();
    const background=document.querySelector('#v52-background');if(background)background.onclick=()=>globalThis.V52_ARCHIVES?.background?.();
    document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{if(b.dataset.endingGallery&&!finaleReview149){if(!beginEndingReview149('','menu'))return;}coverPreview=false;state.view=b.dataset.view;save();render136()});
    const cover=document.querySelector('#show-cover');if(cover)cover.onclick=()=>{if(finaleReview149)leaveEndingReview149('cover');else CoverDirector147.show()};
    document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>choose136(Number(b.dataset.choice)));
    document.querySelectorAll('[data-v78-low]').forEach(b=>b.onclick=e=>{e?.preventDefault?.();e?.stopPropagation?.();state.flags=state.flags||{};const a=state.flags.v78LowSelected||(state.flags.v78LowSelected=[]),k=b.dataset.v78Low,i=a.indexOf(k);if(i>=0)a.splice(i,1);else if(a.length<5)a.push(k);save();render136()});
    document.querySelectorAll('[data-v95-low]').forEach(b=>b.onclick=e=>{e?.preventDefault?.();e?.stopPropagation?.();state.flags=state.flags||{};const a=state.flags.v78LowSelected||(state.flags.v78LowSelected=[]),k=b.dataset.v95Low,i=a.indexOf(k);if(i>=0)a.splice(i,1);else if(a.length<5)a.push(k);save();render136()});
    document.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>{try{modal138(b.dataset.person)}catch(e){console.warn('v136 person modal failed',e)}});
    document.querySelectorAll('[data-replay]').forEach(b=>b.onclick=()=>{const to=Number(b.dataset.replay);if(finaleReview149)return;if(to<=state.index&&confirm('从这一章重新选择？之后的记录会被改写。'))replay136(to)});
    document.querySelectorAll('[data-scene-image]').forEach(el=>el.onclick=e=>{if(e.target.closest('.scene-expand')||e.target.closest('.scene-image-wrap'))try{openSceneLightbox(el.dataset.sceneImage)}catch(_e){}});
    document.querySelectorAll('[data-spot]').forEach(b=>b.onclick=()=>{try{const s=MAP_SPOTS[Number(b.dataset.spot)],box=document.querySelector('#map-info');if(box&&s)box.innerHTML=`<b>${s.name}</b><p>${s.desc}</p>`}catch(_e){}});
    document.querySelectorAll('[data-v55spot]').forEach(b=>{const show=()=>{try{if(globalThis.PalaceAtlas148)return globalThis.PalaceAtlas148.select(Number(b.dataset.v55spot));const s=globalThis.V55_MAP_SPOTS?.[Number(b.dataset.v55spot)],box=document.querySelector('#map-info');if(box&&s)box.innerHTML=`<b>${esc136(s.name)}</b><p>${esc136(s.desc)}</p>`}catch(_e){}};b.onclick=show;b.onmouseenter=show;b.onfocus=show});
    globalThis.PalaceAtlas148?.mount();
    const enter=document.querySelector('#enter-story');if(enter)enter.onclick=()=>{state.intro=true;save();render136()};
    const restart=document.querySelector('#restart');if(restart)restart.onclick=()=>{if(confirm('清除本轮记录，重新开始？')){if(finaleReview149)leaveEndingReview149('',false);try{stopVoice()}catch(_e){}CoverDirector147.reset();coverPreview=false;state=initial136();save();render136()}};
    const voiceOpen=document.querySelector('#voice-open');if(voiceOpen)voiceOpen.onclick=()=>{try{openVoicePanel()}catch(_e){}};
    const read=document.querySelector('#read-page');if(read)read.onclick=()=>{try{speakCurrentPage()}catch(_e){}};
    const stop=document.querySelector('#stop-voice');if(stop)stop.onclick=()=>{try{stopVoice()}catch(_e){}};
    document.querySelectorAll('[data-speak-line]').forEach(b=>b.onclick=e=>{e.stopPropagation();try{speakCurrentPage(Number(b.dataset.speakLine))}catch(_e){}});
  }
