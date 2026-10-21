(()=>{try{
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const plain=s=>{const d=document.createElement('div');d.innerHTML=String(s??'');return (d.textContent||'').replace(/\s+/g,' ').trim();};
  const cut=(s,max=190)=>{s=plain(s);if(s.length<=max)return s;const parts=s.match(/[^。！？]+[。！？]?/g)||[s];let out='';for(const p of parts){if(out&&out.length+p.length>max)break;out+=p;if(out.length>=max*.65)break;}return (out||s.slice(0,max)).replace(/\s+$/,'')+(out.length<s.length?'…':'');};
  const currentYear=()=>{try{return typeof yearNow==='function'?yearNow():1}catch(_e){return 1}};

  // ---------- 封面：只负责建立故事入口，不重复序章正文 ----------
  prologueView=function(){
    const c=CHAPTERS?.[state.index];
    const current=state.intro&&c?`<small class="v117-cover-current">当前进度：${esc(c.date)} · ${esc(c.title)}</small>`:`<small class="v117-cover-current">从承熙元年正月开始。</small>`;
    return `<main class="prologue"><section class="prologue-cover v52-cover"><div class="cover-copy new-cover-copy"><span class="cover-volume">承熙纪事 · 皇帝视角宫廷群像</span><h1>宫灯未眠</h1><p class="cover-theme">“陛下，今夜往哪一宫？”</p><p class="v117-cover-note">新帝登基后的第一场家宴刚散。故事从这一夜开始，宫里的人会一年年长大、离开，也会把早年的决定带到很多年以后。</p><button id="enter-story" class="enter">${state.intro?'继续当前进度':'从这一夜开始'} →</button><button class="cover-background-link" id="v52-background">故事背景</button>${current}</div></section></main>`;
  };

  // ---------- 人物页：只做“认人”，不再放人物弧线分析 ----------
  const oldPeople117=typeof peopleView==='function'?peopleView:null;
  const visibleKeys=()=>{
    if(!oldPeople117)return Object.keys(PEOPLE||{}).filter(k=>(PEOPLE[k]?.introducedAt??999)<=state.index);
    try{const box=document.createElement('div');box.innerHTML=String(oldPeople117());return [...new Set([...box.querySelectorAll('.person-card[data-person]')].map(x=>x.dataset.person).filter(k=>PEOPLE[k]))];}catch(_e){return Object.keys(PEOPLE||{}).filter(k=>(PEOPLE[k]?.introducedAt??999)<=state.index);}
  };
  const profileBody=k=>{
    const p=PEOPLE[k]||{};let rank='';try{rank=displayRank(k)}catch(_e){rank=p.title||''}if(!rank||rank===p.name)rank=p.title||rank;
    const tags=(p.tags||[]).slice(0,3).map(t=>`<span>${esc(t)}</span>`).join('');
    let sig=plain(p.signature||'');
    if(!sig&&oldPeople117){try{const box=document.createElement('div');box.innerHTML=String(oldPeople117());const card=box.querySelector(`.person-card[data-person="${CSS.escape(k)}"]`);sig=plain(card?.querySelector('.v61-signature')?.textContent||'').replace(/^识别点\s*/,'');}catch(_e){}}
    sig=cut(sig,115);
    const bio=cut(p.bio||'',210);
    let rel='';try{if(Number.isFinite(state.bond?.[k])&&Number.isFinite(state.trust?.[k]))rel=meters(k)}catch(_e){}
    return `<span class="rank">${esc(rank)}</span><h2>${esc(p.name||k)}</h2><p class="meta">${esc(p.age||'')}${p.home?' · '+esc(p.home):''}</p>${tags?`<div class="tags">${tags}</div>`:''}<div class="v117-profile-copy">${sig?`<p class="v117-signature"><b>识别点</b>${esc(sig)}</p>`:''}${bio?`<p class="v117-bio">${esc(bio)}</p>`:''}</div>${rel}`;
  };
  const profileCard=k=>`<article class="person-card" tabindex="0" data-person="${esc(k)}">${portrait(PEOPLE[k])}<div>${profileBody(k)}</div></article>`;
  const groups117=[
    ['御前与潜邸旧人','开篇便在宫里的旧人。',['emperor','taihou','gu','shen','zhou']],
    ['闻人一家','从蘅国来到京中的母女三人。',['wenheng','baopu','hanzhang']],
    ['承熙三年入宫','第一次大选以后进入后宫的人。',['zhangyuanzhao','ning','ke','hui','cao2','zhao2','lin2','ye2','du2','su2']],
    ['承熙十一年以后','后来进入宫廷的新人与外来贵女。',['liang2','song2','xu2','daila','xulingyi']],
    ['宫中与宫外','内侍、宫女、宗室与后来牵入旧案的人。',['fang','afu','peiyan','xielin','shunwang','yinprince']]
  ];
  peopleView=function(){
    const vis=new Set(visibleKeys());const used=new Set();const secs=[];
    for(const [title,desc,keys] of groups117){const ks=keys.filter(k=>vis.has(k));ks.forEach(k=>used.add(k));if(ks.length)secs.push(`<section class="v117-person-section"><header><span class="eyebrow">${esc(title)}</span><p>${esc(desc)}</p></header><div class="people-grid">${ks.map(profileCard).join('')}</div></section>`);}
    const rest=[...vis].filter(k=>!used.has(k));if(rest.length)secs.push(`<section class="v117-person-section"><header><span class="eyebrow">其他人物</span><p>已经在正文中出现的人。</p></header><div class="people-grid">${rest.map(profileCard).join('')}</div></section>`);
    return `<main class="page"><div class="page-title"><span class="eyebrow">人物</span><h1>已登场人物</h1><p>这里只放当前身份、住处、识别点和已经知道的近况。完整经历回正文看，不在人物页重复总结。</p></div>${secs.join('')}</main>`;
  };
  modal=function(k){if(!PEOPLE[k])return;const d=document.querySelector('#modal');d.innerHTML=`<button class="close" aria-label="关闭人物资料">×</button><div class="modal-person">${portrait(PEOPLE[k])}<div>${profileBody(k)}</div></div>${globalThis.WARDROBE?.[k]&&typeof wardrobeControls==='function'?wardrobeControls(k):''}`;if(!d.open)d.showModal();d.querySelector('.close').onclick=()=>d.close();d.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{const look=b.dataset.look;if(look==='auto')delete wardrobePrefs[k];else wardrobePrefs[k]=look;try{localStorage.setItem(GAME_CONFIG.storage.wardrobe,JSON.stringify(wardrobePrefs))}catch{}d.close();render();modal(k)});};

  // ---------- 子女页：每个孩子只保留一张卡，把“成长侧写”并回近况 ----------
  const records117=()=>{try{if(typeof globalThis.v52ChildRecords==='function')return globalThis.v52ChildRecords(state)||[]}catch(_e){}return Object.entries(CHILDREN||{}).map(([key,c])=>({key,name:c.name,order:c.order,birth:currentYear(),mother:c.mother,motherName:c.motherName,foster:c.foster,dead:false}));};
  const childNote=(r,f)=>{
    if(r.dead)return '已记入卒册。';
    if(r.key==='shunqian'){
      if(f.v81PrinceOpenEnding)return '承熙十六年自请就藩朔川，已经离京。次年只递回一封平安折。';
      if(f.v47PrinceEducation==='strict')return '聪明求快，严教以后开始习惯把反对意见听完，也能承认自己不知道。';
      if(f.v47PrinceEducation==='public')return '已经开始旁听朝议；答不上来时要在众人面前自己认，也不能让人替他删掉失误。';
      if(f.v47PrinceEducation==='indulged')return '东所越来越少有人直接反驳他；他答得快，也越来越不耐烦看第二页。';
      return '现存长子，聪明、求快，仍在学怎么面对一个没人替他收场的“不”。';
    }
    if(r.key==='ruoxi')return f.v114EldestWorkshop?'已经成年，开始把时间放在宗室女学和木工小工房上；婚事不再由礼部催着先定。':'由顾皇后抚养。她很会照顾弟妹，也慢慢有了木工、风轮这些只属于自己的兴趣。';
    if(r.key==='twinGirl'){
      if(f.v69PrincessFate==='stay')return '旧血案后留京。她不再替所有人圆场，也允许自己生气。';
      if(f.v69PrincessFate==='estate')return '旧血案后移居封邑；谁能进门、什么时候再议婚，由她自己定。';
      if(f.v69PrincessFate==='convent')return '旧血案后住进京郊道观，不削发；她主动离开了原来的婚议安排。';
      return '最会看场面，也最会替弟妹救场。长大以后，她开始学会不想圆场时可以不圆。';
    }
    if(r.key==='twinBoy')return '不爱在人多的地方久坐，喜欢拆装小物。别人盯着他的眼睛和右手看时，他常把手收进袖里。';
    if(r.key==='fifthPrincess')return '从小习惯先问“可以吗”。她仍懂礼，也慢慢知道有些属于自己的小事不必先得到许可。';
    if(r.key==='fourthPrince')return f.v81PrinceOpenEnding?'三皇子远藩后被推到储位最前。以前输了总说“再来”，如今第一次面对有些位置不给第二局。':'好胜，但输了不赖账，总要求下一局重新来。';
    if(r.key==='sixthPrincess')return '喜欢追着问“为什么”。长大以后，她除了问规矩为何如此，也开始注意这条规矩最后会让谁吃亏。';
    return '年纪尚小，日常随乳母与教习起居。';
  };
  childrenView=function(){
    const y=currentYear(),f=state.flags||{},rows=records117();
    const cards=rows.map(r=>{const endY=r.dead?Math.min(y,11):y;const age=Math.max(0,endY-(Number(r.birth)||0));const ageText=age?`${age}岁`:'未满周岁';const mother=r.mother?(courtTitle(state,r.mother)||PEOPLE[r.mother]?.name||'未录'):(r.motherName||'未录');const foster=r.foster?` · 抚养：${courtTitle(state,r.foster)||PEOPLE[r.foster]?.name||r.foster}`:'';let status=r.dead?'已故':'在册';if(r.key==='shunqian'&&f.v81PrinceOpenEnding)status='已就藩朔川';return `<article class="v117-child-card ${r.dead?'dead':''}"><div class="topline"><span class="heir-order">${esc(r.order||'')}</span><small>${esc(ageText)}</small></div><h2>${esc(r.name||'未命名')}</h2><dl><dt>生母</dt><dd>${esc(mother+foster)}</dd><dt>状态</dt><dd>${esc(status)}</dd><dt>近况</dt><dd>${esc(childNote(r,f))}</dd></dl></article>`;}).join('');
    const notes=[];
    if(f.baopuLostChild)notes.push(`<section class="v117-child-note"><span class="eyebrow">未序齿</span><h2>昭氏失胎</h2><p>承熙六年冬，昭氏失去一胎。孩子未入玉牒序齿，产房记录另存。</p></section>`);
    if(f.v69HiddenPrinceRevealed)notes.push(`<section class="v117-child-note"><span class="eyebrow">旧子别录</span><h2>陆既明</h2><p>承熙元年周氏双生男婴。奉差内侍违旨将其带出西华门，改姓陆长大；承熙十九年自行陈明血脉。朝廷没有追补玉牒序齿。</p><p>他当年不该被一道死令抹掉；后来利用二公主婚议复仇，也确实伤了她。两件事分开记。</p></section>`);
    return `<main class="page"><div class="page-title"><span class="eyebrow">皇室子女 · 承熙${esc(y)}年</span><h1>皇室子女</h1><p>只记已经出生并进入当前剧情的孩子。姓名、年岁、身份和近况会随进度更新，不再另外重复一套“成长侧写”。</p></div><div class="v117-child-grid">${cards}</div>${notes.join('')}</main>`;
  };

  // ---------- 大事录：只按时间记本局已经发生的事，人物分析不再混进来 ----------
  chronicleView=function(){
    const rows=(state.chronicle||[]).map((e,i)=>{
      let ann='';try{ann=typeof historyRecordV38==='function'?historyRecordV38(e,i):''}catch(_e){}ann=plain(ann)||`${e.date}，${e.title}。`;
      const dec=plain(e.decision||'无明示裁断');const res=plain(e.result||'');
      return `<article><time>${esc(e.date||'')}</time><div><h2>${esc(e.title||'')}</h2><div class="v117-annal"><b>简记</b>${esc(ann)}</div><details class="v117-private"><summary>查看当时的选择</summary><p class="choice"><strong>御前裁断：</strong>${esc(dec)}</p>${res?`<p class="result">${esc(cut(res,520))}</p>`:''}</details></div><button data-replay="${i}" title="从此处重走">重走</button></article>`;
    }).join('');
    return `<main class="page chronicle"><div class="page-title"><span class="eyebrow">承熙朝</span><h1>大事录</h1><p>按时间记录这一局已经落定的事。先看简记；想回忆当时怎么选，再展开“当时的选择”。</p></div><div class="v117-chron-intro">人物性格、关系变化和作者式总结不放在这里。大事录只回答两件事：什么时候发生了什么，当时你怎么处理。</div>${rows||'<div class="empty">尚无已定之事。先完成第一章。</div>'}</main>`;
  };

  // ---------- 导航名称与实际页面一致 ----------
  const oldNav117=typeof nav==='function'?nav:null;
  if(oldNav117)nav=function(){return String(oldNav117()).replaceAll('人物关系','人物').replace(/>皇子女</g,'>子女<');};

  const oldRender117=typeof render==='function'?render:null;
  if(oldRender117){render=function(...a){const r=oldRender117.apply(this,a);document.documentElement.dataset.build='v117';document.title='宫灯未眠 · 页面内容整理 v117';return r;};}
  document.documentElement.dataset.build='v117';document.title='宫灯未眠 · 页面内容整理 v117';
  try{render()}catch(_e){}
}catch(e){console.error('v117 page structure cleanup failed',e)}})();
