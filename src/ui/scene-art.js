function sceneArtwork146(chapter,scene,paragraph,air) {
  const art=SCENE_ART_PLACEMENTS.filter(p=>p.chapter===chapter&&p.scene===scene&&p.after===paragraph).map(p=>
    `<figure class="moment-figure" data-scene-asset="${p.id}" data-after-paragraph="${p.after}"><div class="moment-image" ${Number(p.id)>=73&&Number(p.id)<=127?'data-baked-title="true"':''} data-weather="${air.weather}" data-motif="${air.motif}" data-still="${air.still}"><img src="${p.src}" alt="${esc136(p.caption)}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async">${atmosphere146(air)}</div><figcaption>${esc136(p.caption)}</figcaption></figure>`
  ).join('');
  if(chapter==='中宫空悬'&&scene==='东角门开了一刻钟'&&paragraph===1){
    return art+`<details class="scene-site-map"><summary>查看东角门现场位置</summary><div class="scene-site-grid"><div><b>西门 · 进水</b><small>谢绍庭所报</small><p>窄道被提水者与抱孩子的乳母挤住。</p></div><div><b>耳房 · 起火</b><small>谢绍庭所报</small><p>檐角的火落进旧棉帘，仍在烧。</p></div><div><b>东角门 · 出人</b><small>我到场所见</small><p>隔着砖墙通向外廊，乳母抱孩子从此门撤出。</p></div></div></details>`;
  }
  return art;
}
