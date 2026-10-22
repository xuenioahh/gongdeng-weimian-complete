function modal138(k){
    if(!PEOPLE[k])return;const p=person138(k),profile=window.V135_CONSORT_PROFILES?.[k]||{},box=document.querySelector('#modal');if(!box)return;
    const biography=typeof historyBiography138==='function'?historyBiography138(k,state):'';
    box.innerHTML=`<button class="close" id="close-modal138" aria-label="关闭">×</button><div class="modal-person">${portrait138(k)}<div><span class="rank">${esc136(p.title)}</span><h2>${esc136(p.name)}</h2><p class="meta">${esc136(p.status)} · ${esc136(p.home)}</p>${biography?`<section class="history-biography138"><h3>${esc136(p.name)}小传</h3><p>${esc136(biography)}</p></section>`:''}${[['长相',profile.appearance],['性格',profile.temperament],['身世',profile.origin],['习惯',PEOPLE[k].signature]].filter(([,t])=>t).map(([h,t])=>`<p><b>${h}：</b>${esc136(t)}</p>`).join('')}</div></div>`;
    if(globalThis.WARDROBE?.[k]&&typeof wardrobeControls==='function')box.innerHTML+=wardrobeControls(k);
    if(state.index>=CHAPTERS.length&&ART_REFERENCE_FILES.porcelain[k])box.innerHTML+=`<figure class="moment-figure"><img src="${ART_REFERENCE_FILES.porcelain[k]}" alt="${esc136(p.name)}人物瓷器" loading="lazy"></figure>`;
    if(typeof mountCostumeControls156==='function')mountCostumeControls156(k,box);
    if(!box.open)box.showModal();
    document.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{if(b.dataset.look==='auto')delete wardrobePrefs[k];else wardrobePrefs[k]=b.dataset.look;try{localStorage.setItem(GAME_CONFIG.storage.wardrobe,JSON.stringify(wardrobePrefs))}catch(_e){}box.close();render136();modal138(k)});
    const close=document.querySelector('#close-modal138');if(close)close.onclick=()=>box.close();bindFlip138();
  }
