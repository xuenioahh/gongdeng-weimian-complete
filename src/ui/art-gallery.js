function artPortrait142(k,name){return `<div class="portrait v141-portrait ${k==='child_twinGirl_grown'?'v142-child-portrait':''}" data-character="${k}" role="img" aria-label="${esc136(name)}立绘"></div>`;}

function artGallery142(){
    return `<main class="page"><div class="page-title"><h1>立绘总览</h1><p>测试预览 · 已完成的独立立绘，可提前查看尚未出场的人物。</p><button id="art142-return">返回剧情</button></div><div class="v142-art-grid">${ART141_KEYS.map(k=>`<figure class="v142-art-card">${artPortrait142(k,PEOPLE[k].name)}<figcaption>${esc136(PEOPLE[k].name)}</figcaption></figure>`).join('')}<figure class="v142-art-card">${artPortrait142('child_twinGirl_grown','杨昭焉')}<figcaption>杨昭焉<small>二公主 · 成年</small></figcaption></figure></div></main>`;
  }
