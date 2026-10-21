const oldBind=bind;

bind=function(){oldBind();document.querySelector('#v52-archives')?.addEventListener('click',slots);document.querySelector('#v52-background')?.addEventListener('click',background);document.querySelectorAll('[data-person]').forEach(e=>{e.onkeydown=x=>{if(x.key==='Enter'||x.key===' '){x.preventDefault();modal(e.dataset.person);}};});};

const oldChron=chronicleView;

chronicleView=()=>neutralize(oldChron());

const oldRender=render;

render=function(){oldRender();document.title='宫灯未眠 · v52';
 // Repair invalid nested paragraph/block markup from older chapter additions.
 document.querySelectorAll('.prose > p').forEach(p=>{if(!p.textContent.trim()&&!p.querySelector('img'))p.remove();});
 document.querySelectorAll('.arc-box,.arc-fate').forEach(e=>e.remove());
 document.querySelectorAll('.chapter-head .theme').forEach(e=>e.remove());
};

const oldMap=mapView;

mapView=function(){const h=oldMap(),img=h.match(/<img\b[^>]*>/)?.[0]||'';
 const generic={'养心殿':'御前寝居与理事处。','慈宁宫':'太后日常起居之所。','御花园':'宫中赏花与散步之处。','太医院':'太医当值、存放脉案之处。','内务府':'经办宫中衣食、器用与登记。','宗人府档房':'收藏宗室档册。','慎刑司':'内廷审讯办事之处。','储秀宫':'采选期间安排候选女子暂住。','前朝':'朝会与外廷理事之处。'};
 const spots=MAP_SPOTS.map(s=>{const residents=Object.keys(PEOPLE).filter(k=>known(k)&&PEOPLE[k].home?.startsWith(s.name));return {...s,desc:residents.length?'当前已知住处：'+residents.map(k=>courtTitle(state,k)).join('、')+'。':generic[s.name]||'宫苑。此刻尚无更多记述。'};});MAP_SPOTS.splice(0,MAP_SPOTS.length,...spots);
 return `<main class="page map-page"><div class="page-title"><span class="eyebrow">宫城图</span><h1>宫廷地图</h1><p>点击宫殿，查看当下已知的住处。</p></div><div class="palace-map v41-palace-map">${img}${spots.map((s,i)=>`<button style="left:${s.x}%;top:${s.y}%" data-spot="${i}"><i></i>${esc(s.name)}</button>`).join('')}<div id="map-info"><b>宫城中轴</b><p>前朝、寝宫与御花园依次展开。</p></div></div></main>`;
};

childrenView=function(){const y=yearNow();const records=globalThis.v52ChildRecords(state);return `<main class="page"><div class="page-title"><span class="eyebrow">皇室子女 · 承熙${y}年</span><h1>皇嗣</h1><p>记出生、年岁与已经发生的家事。</p></div><div class="heir-v47-grid">${records.map(r=>{const age=Math.max(0,(r.dead?Math.min(y,11):y)-r.birth);let note=age<1?'尚在襁褓，由乳母照料。':age<4?'尚幼，起居由乳母与宫人照看。':'日常随教习读书，起居另有值簿。';if(r.key==='shunqian')note=y<6?'读书时喜欢抢着答，答错了便往皇后那边看。':'已入上书房读书，功课与请安依例记档。';if(r.key==='ruoxi')note='由皇后抚养，平日说话轻，行礼很认真。';if(r.dead)note='已记入卒册，年岁停在离世之年。';return `<article class="heir-v47-card ${r.dead?'dead':''}"><span class="heir-order">${esc(r.order)}</span><span class="heir-age">${age?age+'岁':'未满周岁'}</span><h2>${esc(r.name)}</h2><dl><dt>生母</dt><dd>${esc(r.mother?courtTitle(state,r.mother):r.motherName||'未录')}${r.foster?' · 抚养：'+esc(courtTitle(state,r.foster)):''}</dd><dt>状态</dt><dd>${r.dead?'已故':'在册'}</dd><dt>起居记</dt><dd>${note}</dd></dl></article>`;}).join('')}</div>${state.flags.baopuLostChild?'<p class="heir-v47-memorial">别录：失去的皇嗣未序齿，产房记录另存。</p>':''}</main>`;};

chronicleView=()=>`<main class="page chronicle"><div class="page-title"><span class="eyebrow">承熙朝</span><h1>大事录</h1><p>只录已经落定的裁断。</p></div>${state.chronicle.length?state.chronicle.map((e,i)=>`<article><time>${esc(e.date)}</time><div><h2>${esc(neutralize(e.title))}</h2><p>${esc(clean(e.decision||'本章已阅'))}</p><p>${clean(e.result||'')}</p><div class="deltas">${(e.changes||[]).map(x=>`<span>${esc(x)}</span>`).join('')}</div></div><button data-replay="${i}">重读</button></article>`).join(''):'<div class="empty">尚无已定之事。</div>'}</main>`;

globalThis.V52_ARCHIVES={pack,validate,restore,endings:endingRecords149,rememberEnding:rememberEnding149,open:slots,background,save:()=>save(),known,getData:()=>clone(archive)};

document.documentElement.dataset.build='v52';

render();
