(()=>{'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone=x=>JSON.parse(JSON.stringify(x));
const KEY=GAME_CONFIG.storage.archives;let archive={schema:1,slots:{}};let storageProblem='';
try{const a=JSON.parse(localStorage.getItem(KEY)||'null');if(a?.schema===1&&a.slots&&typeof a.slots==='object')archive=a;}catch{storageProblem='无法读取本机存档，请先导出当前进度。';}
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(archive));storageProblem='';return true;}catch{storageProblem='浏览器未能保存，请使用“导出当前进度”下载备份。';return false;}};
function pack(){return {game:'gongdeng',schema:1,build:52,savedAt:new Date().toISOString(),chapter:CHAPTERS[state.index]?.title||'卷终',heading:CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'',state:clone(state),people:Object.fromEntries(Object.entries(PEOPLE).map(([k,p])=>[k,{introducedAt:p.introducedAt,title:p.title,home:p.home,glyph:p.glyph}])),harem:typeof HAREM_KEYS!=='undefined'?[...HAREM_KEYS]:[],wardrobe:clone(wardrobePrefs)};}
function validate(a){
 if(a?.state&&globalThis.v139PrepareChapters)globalThis.v139PrepareChapters(a.state);
 if(!a||a.game!=='gongdeng'||a.schema!==1||a.build!==52||!a.state)throw Error('请选择本版导出的《宫灯未眠》存档。');
 const s=a.state;
 if(s.version!==26||!Number.isInteger(s.index)||s.index<0||s.index>CHAPTERS.length||!Number.isInteger(s.chapterStep)||s.chapterStep<0||(s.index<CHAPTERS.length&&s.chapterStep>=CHAPTERS[s.index].steps.length))throw Error('存档的章节位置无效。');
 for(const k of ['flags','ranks','bond','trust'])if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k]))throw Error('存档数据不完整。');
 for(const k of ['history','chronicle','stepHistory','stepResults','stepChanges'])if(!Array.isArray(s[k]))throw Error('存档记录不完整。');
 if(s.index<CHAPTERS.length&&(a.chapter!==CHAPTERS[s.index].title||a.heading!==CHAPTERS[s.index].steps[s.chapterStep].heading))throw Error('存档与当前章节结构不一致，未覆盖当前进度。');
 return a;
}
function restore(a,backup=true){validate(a);if(backup){archive.slots.backup=pack();if(!persist())throw Error(storageProblem);}state=clone(a.state);state.view='story';coverPreview=false;
 for(const [k,p] of Object.entries(a.people||{}))if(PEOPLE[k])for(const key of ['introducedAt','title','home','glyph'])if(p[key]!==undefined)PEOPLE[k][key]=p[key];
 if(typeof HAREM_KEYS!=='undefined'&&Array.isArray(a.harem)){HAREM_KEYS.splice(0,HAREM_KEYS.length,...a.harem.filter(k=>PEOPLE[k]));}
 wardrobePrefs=clone(a.wardrobe||{});if(backup)save();return true;
}
if(archive.slots.auto){try{restore(archive.slots.auto,false);}catch(e){storageProblem=e.message;}}
save=function(){archive.slots.auto=pack();persist();};
const BIOS={
 emperor:'我三十岁登基，年号承熙。遇事总想把同一件事多听一面，再落朱笔。我一直以为，只要看得够清楚，最后那一笔就能把混乱压回秩序里。',taihou:'母亲喜欢问起孩子的饭食与功课。她有偏爱，却常把最后一句话留给我说。',gu:'潜邸时便由她料理内宅。她理事前常翻旧例，册页总压得齐整。',shen:'潜邸旧人。她说话轻，泡茶用的仍是那只旧罐；我熟悉她停顿的习惯。',zhou:'潜邸旧人，偏爱浅色衣裳。席上应答周全，散席后才偶尔说一句俏话。',baopu:'蘅国长女。初见时衣色明亮，说话不肯低下声去，也会直接问我住处与饭食。',hanzhang:'蘅国次女。衣饰比长姐素，习惯先听别人说完。问到她时，她才抬眼。',wenheng:'蘅国旧后。礼数严整，发间留着旧国银簪；同我说话时很少省掉称谓。',fang:'在御花园花房当过差。圆脸杏眼，袖口自己收过针脚，说到花草时话便多起来。',ning:'太后胞弟之女，幼时便认识皇后。行礼端整，答话时先把问题听清。',ke:'出自北地武门。肩背挺直，提起骑射与北地天气，比谈衣料更自在。',hui:'江南崔家女。衣饰细致，接话总留几分余地，初见时礼数很周全。',shunwang:'宗室亲王。我认得他平缓的语气；他说话时常先替人挪开手边的物件。',zhangyuanzhao:'张元照，名在此次采选册上。她记事快，答话偶有停顿，目光却不躲闪。',peiyan:'潜邸时便跟在御前。身形瘦长，记得各宫作息，通传时从不抢话。',xielin:'御前侍卫统领。眉骨近鼻梁处有道淡疤，进内廷时步子放得很轻。',afu:'御花园花房宫女。个子不高，袖口收得利落，走路和答话都快。',cao2:'地方官女。初见时不抢话，问过的细节却记得清楚。',zhao2:'京官之女。脸上礼数周全，心里却很少被场面骗过去；她习惯先看一圈，再决定哪句真话值得现在说。',lin2:'医官旁支之女。说话温和，知道一些药名，遇到不懂的会先说不知。',ye2:'书香门第出身。话轻，写的小楷却很稳。',du2:'漕运官员之女。答话爽利，核数时会用指尖抵住册页。',su2:'京畿小官之女。爱笑，会针线，也学过南曲。'};
function known(k){if(!PEOPLE[k]||k==='chen')return false;if(['emperor','taihou','gu','shen','zhou','peiyan'].includes(k))return true;
 if((PEOPLE[k].introducedAt??99)>state.index)return false;
 for(let ci=0;ci<=Math.min(state.index,CHAPTERS.length-1);ci++){const c=CHAPTERS[ci];const n=ci===state.index?(state.chapterStep||0):c.steps.length-1;for(let si=0;si<=n;si++)if(c.steps[si]?.cast?.includes(k))return true;}
 return ['cao2','zhao2','lin2','ye2','du2','su2'].includes(k)&&state.flags.lowConsorts?.includes(k);
}
const observable=/笑|抿|皱|眉|抬眼|垂眼|低头|眼眶|望|看着|手指|指尖|握|攥|攥紧|停顿|吸气|颤|脸色|唇|拢|袖口/;
function currentLines(){const step=CHAPTERS[state.index]?.steps?.[state.chapterStep||0];if(!step)return[];try{return step.text(state)||[];}catch{return[];}}
function glimpse(k,lines=currentLines()){
 const names=[PEOPLE[k]?.name,courtTitle(state,k)].filter(x=>x&&x.length>1&&!/待选|待封/.test(x));
 for(const line of lines){const plain=String(line).replace(/<[^>]*>/g,'');for(const sentence of plain.match(/[^。！？]+[。！？]?/g)||[]){if(sentence.length<180&&names.some(n=>sentence.includes(n))&&observable.test(sentence))return sentence;}}
 return '';
}
function info(k){return `<span class="rank">${esc(displayRank(k))}</span><h2>${esc(PEOPLE[k].name)}</h2><p class="meta">${esc(PEOPLE[k].age)}</p><p>${esc(BIOS[k]||'我已见过此人，尚未有更多交谈。')}</p>${glimpse(k)?`<p class="v52-observation"><small>眼前所见</small>${esc(glimpse(k))}</p>`:''}${meters(k)}`;}
peopleView=()=>`<main class="page"><div class="page-title"><span class="eyebrow">人物录</span><h1>我所认识的人</h1><p>记下已经见过的面容与言行。</p></div><div class="people-grid">${Object.keys(PEOPLE).filter(known).map(k=>`<article class="person-card" tabindex="0" data-person="${k}">${portrait(PEOPLE[k])}<div>${info(k)}</div></article>`).join('')}</div></main>`;
modal=function(k){if(!known(k))return;const d=document.querySelector('#modal');d.innerHTML=`<button class="close" aria-label="关闭人物资料">×</button><div class="modal-person">${portrait(PEOPLE[k])}<div>${info(k)}</div></div>${WARDROBE[k]?wardrobeControls(k):''}`;if(!d.open)d.showModal();d.querySelector('.close').onclick=()=>d.close();d.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{if(b.dataset.look==='auto')delete wardrobePrefs[k];else wardrobePrefs[k]=b.dataset.look;save();d.close();modal(k);});};
// Replace advance explanations with what is visible in the scene.
const swaps=[
 ['昭氏已死，蘅嫔也退出宫中权力中心；闻人线散去以后，沈家十年前的军令终于有空间走到御案前。','养心殿换了新灯。裴景和将沈家旧军令放在御案上，等我翻看。'],
 ['我那时还以为，所谓新朝，不过是把旧人放到新位置上。后来才知道，位置一换，人也会被迫长成另一个样子。','新朝才开始。我看着席上熟悉的面孔，叫出口的称谓却已经换了。'],
 ['那时我三十岁，仍相信慢一点总比下错判断好。很多年后我才知道，慢和不肯判断有时只隔一层纸。','我三十岁，仍觉得慢一点总比下错判断好。朱笔搁在手边，我又看了一遍名册。'],
 ['这是我第一次近距离见到她们。那顿饭没有出事。后来再想起她们刚入宫的样子，我最先记起的还是桌上那两碗面。','这是我第一次真正见到她们。面汤还热，窗边的风却一阵紧过一阵。'],
 ['我后来才知道，那夜拾遗阁没有睡好。','第二日内侍来回话，说拾遗阁昨夜没有睡好。'],
 ['那日替拾遗阁抬炭、送花盆的宫女很多。我后来才知道，其中有个圆脸小宫女抱着一盆白海棠走错了两次门，最后还是阿芙把她从西廊拽回来。那时我没有问她名字。','廊下，一个圆脸小宫女抱着海棠走岔了路，同伴低声叫住她。我只看了一眼，没有问名字。'],
 ['那是很普通的一夜。也正因为普通，我后来才记得清楚。','夜已深了，茶盏还搁在原处。'],
 ['这道防线后来出了一个极讽刺的结果：原本只在蘅嫔自己手里的旧香，从此必须经过大晟内务府的手。','旧香从此须先交内务府验看，再按册领回。我在条目末尾落了朱批。'],
 ['这句玩笑后来会在很多人口供里出现。','她说完便把香匣推回案内。'],
 ['待封却记住了。后来她自己怀孕时，也曾问阿芙“你们宫女以前保胎都怎么做”。阿芙答：“宫女哪有保胎例。”一句无心的话，让昭氏沉默了很久。','她听到这里，剥橘子的手停了停。'],
 ['八月没有产房，也没有小产。蘅嫔把更多时间放到女儿身上。后来她催抱朴求子，更多来自亡国后的不安全感，而不是自己曾失去一胎。','八月里，蘅嫔去女儿住处的次数多了。她们谈过什么，我没有追问。'],
 ['这一句“还会有”不是希望那么简单。它也是昭氏后来不肯停手的开始。她已经知道有人想断她的孩子，正因为如此，她更不能接受自己真的被断掉。','她把“还会有”又说了一遍。我没有立刻接话，帐边的灯烧得很低。'],
 ['她后来告诉我，那天真正让她决定开口的，并不是信任突然变多。是她终于发现：继续不选，也会被别人替她选。','我问她还有没有话。她握着册页，过了片刻才开口。'],
 ['蘅嫔没有得到最后一面。她后来最不能原谅的，既有我，也有自己。','蘅嫔没有得到最后一面。传话的人回来，只说她站在门边，很久没有坐下。'],
 ['不管选哪一种，昭氏都死了。不同的是，宫里后来记得的是一场谋逆、一个疯掉的女人，还是一个被秘密处理掉的旧宠。','御案上的纸还没有收走。外头换了一班值守，靴声隔着门槛传进来。'],
 ['闻人线到这里退出主线。死亡与否不同，但含章必须开始只为自己的选择负责，这一点不会改变。','含章行过礼，没有再回头。我看着帘子落下，让裴景和收起案上的册页。'],
 ['每一道手都有人看见。也正因此，后来每一道手都能被反过来指成证据：她碰过盒，她系过绳，她知道香方从哪里来。陷阱最稳的时候，从来不像陷阱，只像一件人人都觉得她顺手能做的小事。','交接单逐项记着谁取盒、谁系绳、谁领药。内侍核过名字，便将单子收进值簿。'],
 ['可她后来承认，承熙六年她已经知道家里有人“动了旧香”，她选择没有说。顺贵人案发前，她又看见陪嫁嬷嬷与香药局往来，仍旧没有问到底。','我让裴景和把有关她与陪嫁嬷嬷的问话另列一页，逐条核实。'],
 ['这也是我后来对她始终保留的一点礼数：不是因为她来自哪里，而是因为我第一次见她时，最先看见的是有人已经替她决定得太多。','我将顺王的信扣在案上，等她自己回答。'],
 ['她后来救下多少人，并不能倒过来证明她第一天每句话都对。','纸上的办法尚须核实。我叫太医院把人数和时辰逐项对过。'],
 ['后来前朝真的调动东南水师时，她只是把那张旧弓重新挂高了一寸。','那张旧弓仍挂在射圃廊下。'],
 ['接册时她的手指在“贞”字上停了一息。','她将新封号复述了一遍，声音很轻。']
];
function clean(t){let v=String(t??'');for(const [a,b]of swaps)v=v.split(a).join(b);v=v.replace(/<(?:span|div)\b[^>]*class="[^"]*(?:faction-note|motive-note|poison-trace|v42-oldplot)[^"]*"[^>]*>[\s\S]*?<\/(?:span|div)>/g,'');return v;}
for(const c of CHAPTERS){if(c.bridge){const old=c.bridge;c.bridge=s=>clean(typeof old==='function'?old(s):old);}for(const st of c.steps){const old=st.text;st.text=s=>{const a=typeof old==='function'?old(s):old;return (Array.isArray(a)?a:[a]).map(clean).filter(Boolean);};for(const ch of st.choices||[]){if(typeof ch.result==='function'){const old=ch.result;ch.result=s=>clean(old(s));}else if(ch.result)ch.result=clean(ch.result);if(ch.hint&&/日后|将会|注定|结局|主线|支线|后期|后续|伏笔/.test(ch.hint))ch.hint='';}}}
const neutral={'香尽胎寒':'冬日问安','刃落宫门':'长廊夜雨','凤仪宫最后一冬':'凤仪宫冬日'};
function neutralize(h){for(const [a,b] of Object.entries(neutral))h=h.split(a).join(b);return h;}
// Reflections derive from the current page, never a chapter/step number left over from an older build.
reactionBeat=()=>'';
artifactFor=()=>'';
function reactionPortrait(k,t){const tile={gu:0,baopu:1,hanzhang:2,wenheng:3,shen:4,fang:5}[k];if(tile!==undefined&&/泪|紧|垂|皱|颤|眼眶|脸色|停顿/.test(t))return `<div class="reaction-face v52-reaction" role="img" aria-label="${esc(courtTitle(state,k))}的神情" style="--position:${tile%3*50}% ${Math.floor(tile/3)*100}%"></div>`;return portrait(PEOPLE[k]);}
const oldStory=storyView;
storyView=function(){let h=oldStory();if(!state.intro||state.index>=CHAPTERS.length)return h;
 h=neutralize(h).replace(/<p class="theme">[\s\S]*?<\/p>/g,'').replace(/<div class="scene-progress">[\s\S]*?<\/div>/g,`<div class="scene-progress v52-progress">${state.chapterStep+1} / ${CHAPTERS[state.index].steps.length}</div>`);
 const st=CHAPTERS[state.index].steps[state.chapterStep||0],lines=currentLines();const cards=(st.cast||[]).filter(k=>known(k)&&k!=='emperor').map(k=>({k,t:glimpse(k,lines)})).filter(x=>x.t).slice(0,3);
 if(cards.length){const box=`<section class="v52-glimpses" aria-label="一瞬神情"><span class="eyebrow">一瞬神情</span><div>${cards.map(({k,t})=>{const mood=/笑/.test(t)?'微露笑意':/泪|眼眶|颤/.test(t)?'眼底微动':/握|攥|指尖/.test(t)?'指间停顿':/低头|垂眼/.test(t)?'垂眸未语':/皱|眉/.test(t)?'眉间微蹙':'目光流转';return `<figure>${reactionPortrait(k,t)}<figcaption><small>${esc(courtTitle(state,k))} · ${mood}</small><p>${esc(t)}</p></figcaption></figure>`;}).join('')}</div></section>`;h=h.replace(/(<section class="(?:choices|narrative-turn)">)/,box+'$1');}
 return h;
};
// Keep the original cover art; the background is revealed only on request.
prologueView=function(){return `<main class="prologue"><section class="prologue-cover v52-cover"><div class="cover-copy new-cover-copy"><span class="cover-volume">承熙纪事 · 后宫群像</span><h1>宫灯未眠</h1><p class="cover-theme">“陛下，今夜往哪一宫？”</p><button id="enter-story" class="enter">${state.intro?'续上灯火':'提灯入宫'} →</button><button class="cover-background-link" id="v52-background">故事背景</button></div></section></main>`;};
const oldNav=nav;nav=()=>oldNav().replace('</header>','<button id="v52-archives" class="ghost">存档 · 读档</button></header>');
function showDialog(html){const d=document.querySelector('#modal');d.innerHTML=`<button class="close" aria-label="关闭">×</button>${html}`;if(!d.open)d.showModal();d.querySelector('.close').onclick=()=>d.close();return d;}
function background(){showDialog(`<section class="v52-background"><span class="eyebrow">序章</span><h1>宫门之内</h1><p>我叫杨叙。登基之前，我也曾是住在王府里的皇子。</p><p>那时，顾明宜是我的嫡福晋，内宅的用度、孩子的起居都由她料理；沈知微住在侧院，周清漪也是府中旧人。母亲有时来坐坐，问过饭食，再问孩子。</p><p>如今我三十岁，承继大统，改元承熙。母亲尊为太后，嫡福晋册为皇后，沈知微封和妃，周清漪封嫔。人仍是那些人，唱名时的称谓却已不同。</p><p>承熙元年正月，第一场家宴散了。裴景和提着灯，停在我身侧。门外还落着雪。</p><button class="primary" id="v52-background-enter">走入这一夜 →</button></section>`).querySelector('#v52-background-enter').onclick=()=>{document.querySelector('#modal').close();state.intro=true;coverPreview=false;state.view='story';save();render();};}
function download(a){const blob=new Blob([JSON.stringify(a,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='宫灯未眠_存档_'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function slots(){const d=showDialog(`<section class="v52-save-panel"><span class="eyebrow">灯下留卷</span><h1>存档与读档</h1><p>六个手动栏位。每次落子自动保存；读档前另留一份当前进度。</p><p class="v52-status" role="status">${esc(storageProblem)}</p><div class="v52-save-grid">${['auto','backup','1','2','3','4','5','6'].map(k=>{const a=archive.slots[k];return `<article><h3>${k==='auto'?'自动存档':k==='backup'?'读档前备份':'存档 '+k}</h3><p>${a?esc(a.state.intro?neutralize(a.chapter)+' · 第'+(a.state.chapterStep+1)+'幕':'序章'):'空白卷页'}</p><small>${a?esc(new Date(a.savedAt).toLocaleString()):'尚未保存'}</small><div>${!['auto','backup'].includes(k)?`<button data-save-slot="${k}">${a?'覆盖保存':'保存到此'}</button>`:''}<button data-load-slot="${k}" ${a?'':'disabled'}>读取</button>${a?`<button data-export-slot="${k}">导出</button>`:''}</div></article>`;}).join('')}</div><div class="v52-save-actions"><button id="v52-export">导出当前进度</button><label class="v52-import">导入存档<input type="file" id="v52-import" accept="application/json,.json"></label></div><p class="meta">本机存档保存在当前浏览器。换设备、换浏览器或打开新版文件时，可导入下载的 JSON 存档。</p></section>`);
 d.querySelectorAll('[data-save-slot]').forEach(b=>b.onclick=()=>{const k=b.dataset.saveSlot;if(archive.slots[k]&&!confirm('覆盖此栏位的旧存档？'))return;archive.slots[k]=pack();persist();slots();});
 d.querySelectorAll('[data-load-slot]').forEach(b=>b.onclick=()=>{try{restore(archive.slots[b.dataset.loadSlot]);d.close();render();}catch(e){d.querySelector('.v52-status').textContent=e.message;}});
 d.querySelectorAll('[data-export-slot]').forEach(b=>b.onclick=()=>download(archive.slots[b.dataset.exportSlot]));
 d.querySelector('#v52-export').onclick=()=>download(pack());
 d.querySelector('#v52-import').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>10000000)throw Error('存档文件过大，请确认选择了 JSON 存档。');const a=validate(JSON.parse(await file.text()));if(!confirm('导入并读取此存档？当前进度会保留在“读档前备份”。'))return;restore(a);d.close();render();}catch(err){d.querySelector('.v52-status').textContent=err.message;}e.target.value='';};
}
const oldBind=bind;bind=function(){oldBind();document.querySelector('#v52-archives')?.addEventListener('click',slots);document.querySelector('#v52-background')?.addEventListener('click',background);document.querySelectorAll('[data-person]').forEach(e=>{e.onkeydown=x=>{if(x.key==='Enter'||x.key===' '){x.preventDefault();modal(e.dataset.person);}};});};
const oldChron=chronicleView;chronicleView=()=>neutralize(oldChron());
const oldRender=render;render=function(){oldRender();document.title='宫灯未眠 · v52';
 // Repair invalid nested paragraph/block markup from older chapter additions.
 document.querySelectorAll('.prose > p').forEach(p=>{if(!p.textContent.trim()&&!p.querySelector('img'))p.remove();});
 document.querySelectorAll('.arc-box,.arc-fate').forEach(e=>e.remove());
 document.querySelectorAll('.chapter-head .theme').forEach(e=>e.remove());
};
const oldMap=mapView;mapView=function(){const h=oldMap(),img=h.match(/<img\b[^>]*>/)?.[0]||'';
 const generic={'养心殿':'御前寝居与理事处。','慈宁宫':'太后日常起居之所。','御花园':'宫中赏花与散步之处。','太医院':'太医当值、存放脉案之处。','内务府':'经办宫中衣食、器用与登记。','宗人府档房':'收藏宗室档册。','慎刑司':'内廷审讯办事之处。','储秀宫':'采选期间安排候选女子暂住。','前朝':'朝会与外廷理事之处。'};
 const spots=MAP_SPOTS.map(s=>{const residents=Object.keys(PEOPLE).filter(k=>known(k)&&PEOPLE[k].home?.startsWith(s.name));return {...s,desc:residents.length?'当前已知住处：'+residents.map(k=>courtTitle(state,k)).join('、')+'。':generic[s.name]||'宫苑。此刻尚无更多记述。'};});MAP_SPOTS.splice(0,MAP_SPOTS.length,...spots);
 return `<main class="page map-page"><div class="page-title"><span class="eyebrow">宫城图</span><h1>宫廷地图</h1><p>点击宫殿，查看当下已知的住处。</p></div><div class="palace-map v41-palace-map">${img}${spots.map((s,i)=>`<button style="left:${s.x}%;top:${s.y}%" data-spot="${i}"><i></i>${esc(s.name)}</button>`).join('')}<div id="map-info"><b>宫城中轴</b><p>前朝、寝宫与御花园依次展开。</p></div></div></main>`;
};
childrenView=function(){const y=yearNow();const records=globalThis.v52ChildRecords(state);return `<main class="page"><div class="page-title"><span class="eyebrow">皇室子女 · 承熙${y}年</span><h1>皇嗣</h1><p>记出生、年岁与已经发生的家事。</p></div><div class="heir-v47-grid">${records.map(r=>{const age=Math.max(0,(r.dead?Math.min(y,11):y)-r.birth);let note=age<1?'尚在襁褓，由乳母照料。':age<4?'尚幼，起居由乳母与宫人照看。':'日常随教习读书，起居另有值簿。';if(r.key==='shunqian')note=y<6?'读书时喜欢抢着答，答错了便往皇后那边看。':'已入上书房读书，功课与请安依例记档。';if(r.key==='ruoxi')note='由皇后抚养，平日说话轻，行礼很认真。';if(r.dead)note='已记入卒册，年岁停在离世之年。';return `<article class="heir-v47-card ${r.dead?'dead':''}"><span class="heir-order">${esc(r.order)}</span><span class="heir-age">${age?age+'岁':'未满周岁'}</span><h2>${esc(r.name)}</h2><dl><dt>生母</dt><dd>${esc(r.mother?courtTitle(state,r.mother):r.motherName||'未录')}${r.foster?' · 抚养：'+esc(courtTitle(state,r.foster)):''}</dd><dt>状态</dt><dd>${r.dead?'已故':'在册'}</dd><dt>起居记</dt><dd>${note}</dd></dl></article>`;}).join('')}</div>${state.flags.baopuLostChild?'<p class="heir-v47-memorial">别录：失去的皇嗣未序齿，产房记录另存。</p>':''}</main>`;};
chronicleView=()=>`<main class="page chronicle"><div class="page-title"><span class="eyebrow">承熙朝</span><h1>大事录</h1><p>只录已经落定的裁断。</p></div>${state.chronicle.length?state.chronicle.map((e,i)=>`<article><time>${esc(e.date)}</time><div><h2>${esc(neutralize(e.title))}</h2><p>${esc(clean(e.decision||'本章已阅'))}</p><p>${clean(e.result||'')}</p><div class="deltas">${(e.changes||[]).map(x=>`<span>${esc(x)}</span>`).join('')}</div></div><button data-replay="${i}">重读</button></article>`).join(''):'<div class="empty">尚无已定之事。</div>'}</main>`;

globalThis.V52_ARCHIVES={pack,validate,restore,open:slots,background,save:()=>save(),known,getData:()=>clone(archive)};
document.documentElement.dataset.build='v52';render();
})();
