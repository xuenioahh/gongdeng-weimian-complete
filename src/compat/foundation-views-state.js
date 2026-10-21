const $=s=>document.querySelector(s);

const clone=o=>JSON.parse(JSON.stringify(o));

let state=load()||clone(INITIAL_STATE);

function clamp(n){return Math.max(0,Math.min(100,n))}

function load(){try{const s=JSON.parse(localStorage.getItem(GAME_CONFIG.storage.progress));return s?.version===26?s:null}catch{return null}}

function save(){try{localStorage.setItem(GAME_CONFIG.storage.progress,JSON.stringify(state))}catch(e){}}

function scrollAfterChoice(showResult=false,newChapter=false){requestAnimationFrame(()=>requestAnimationFrame(()=>{const target=newChapter?(document.querySelector('.bridge')||document.querySelector('.scene-title')||document.querySelector('.chapter-head')):(showResult?(document.querySelector('.recent-result')||document.querySelector('.scene-title')):document.querySelector('.scene-title'));if(!target)return;const y=target.getBoundingClientRect().top+window.scrollY-22;window.scrollTo({top:y,left:0,behavior:'smooth'});const ch=document.querySelector('.chapter');if(ch){ch.classList.add('scene-enter');setTimeout(()=>ch.classList.remove('scene-enter'),850)}}))}

function applyMap(target,map){if(!map)return;Object.entries(map).forEach(([k,v])=>target[k]=clamp((target[k]??0)+v))}

function effectText(e){
 const a=[]; Object.entries(e?.bond||{}).forEach(([k,v])=>a.push(`${PEOPLE[k].name}亲近 ${v>0?'+':''}${v}`));
 Object.entries(e?.trust||{}).forEach(([k,v])=>a.push(`${PEOPLE[k].name}信任 ${v>0?'+':''}${v}`));
 Object.entries(e?.ranks||{}).forEach(([k,v])=>a.push(`${PEOPLE[k].name} → ${v}`));
 return a;
}

function applyMilestones(next,changes){ return; }

function applyChoiceEffects(c){
 applyMap(state.bond,c.effects?.bond);applyMap(state.trust,c.effects?.trust);
 Object.assign(state.ranks,c.effects?.ranks||{});Object.assign(state.flags,c.effects?.flags||{});
 if(c.effects?.final)state.flags.final=c.effects.final;
 const extra=[];
 if(c.costMind){state.mind=Math.max(0,(state.mind??0)-c.costMind);extra.push(`帝王心术 -${c.costMind}`);}
 // Certain story promotions are expressed as flags so they can respect the current rank.
 if(c.effects?.flags?.advanceBaopuYear4&&promoteToward('baopu','嫔')){state.flags.baopuYear4Promoted=true;extra.push(`${PEOPLE.baopu.name}按资序晋一级 → ${courtTitle(state,'baopu')}`)}
 if(c.effects?.flags?.advanceBaopuYear5&&promoteToward('baopu','嫔')){state.flags.baopuYear5Promoted=true;extra.push(`${PEOPLE.baopu.name}按资序晋一级 → ${courtTitle(state,'baopu')}`)}
 if(c.effects?.flags?.advanceHanzhangYear4&&promoteToward('hanzhang','贵人')){state.flags.hanzhangYear4Promoted=true;extra.push(`${PEOPLE.hanzhang.name}按年资晋一级 → ${courtTitle(state,'hanzhang')}`)}
 if(c.effects?.flags?.promoteBaopu&&promoteRank('baopu'))extra.push(`${PEOPLE.baopu.name}晋一级 → ${courtTitle(state,'baopu')}`);
 if(c.effects?.flags?.promoteHanzhang&&promoteRank('hanzhang'))extra.push(`${PEOPLE.hanzhang.name}晋一级 → ${courtTitle(state,'hanzhang')}`);
 if(c.effects?.flags?.promoteFang&&promoteRank('fang'))extra.push(`${PEOPLE.fang.name}晋一级 → ${courtTitle(state,'fang')}`);
 return [...effectText(c.effects||{}),...extra];
}

const HAREM_KEYS=['gu','shen','zhou','fang','baopu','hanzhang','wenheng'];

const RANKS=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];

function rankIndex(v){if(!v)return -1;if(v==='和妃'||v==='昭妃'||v==='珍妃'||v==='蘅嫔')return RANKS.indexOf(v.includes('嫔')?'嫔':'妃');const stripped=v.replace(/^(昭|珍|蘅|周|顺)/,'');return RANKS.indexOf(stripped)}

function promoteRank(k){if(k==='gu'||k==='wenheng')return false;const cur=state.ranks[k];const i=rankIndex(cur);if(i<0||i>=RANKS.length-1)return false;state.ranks[k]=RANKS[i+1];return true}

function promoteToward(k,maxRank){if(k==='gu'||k==='wenheng')return false;const i=rankIndex(state.ranks[k]),m=rankIndex(maxRank);if(i<0||i>=m)return false;return promoteRank(k)}

function demoteRank(k){if(k==='gu'||k==='wenheng')return false;const cur=state.ranks[k];const i=rankIndex(cur);if(i<=0)return false;state.ranks[k]=RANKS[i-1];return true}

function sealMeta(c={}){const label=(c.label||'')+' '+resolvedResult(c,state);const e=c.effects||{};if(e.ranks&&Object.keys(e.ranks).length)return {char:/降|废|褫/.test(label)?'降':'晋',cls:'rank'};if(/赐死|处死|诛|五马|罪无可赦|废为庶人/.test(label))return {char:'诛',cls:'ban'};if(/禁足|冷院|幽禁|移居/.test(label))return {char:'禁',cls:'ban'};if(/查|审|证据|详查|追/.test(label))return {char:'查',cls:'investigate'};if(/侍寝|宿|留至夜深|移驾|翻牌/.test(label))return {char:'召',cls:'chamber'};if(/采选|小选|十二人|六人|储秀/.test(label))return {char:'选',cls:'selection'};if(/册|封|入六宫|住/.test(label))return {char:'册',cls:'rank'};return {char:'准',cls:'default'}}

function sealFlashForChoice(c={}){const old=document.getElementById('edict-stamp');if(old)old.remove();const meta=sealMeta(c),d=document.createElement('div');d.id='edict-stamp';d.className=meta.cls;d.innerHTML=`<b>${meta.char}</b><small>${(c.label||'御前裁断').replace(/<[^>]+>/g,'')}</small>`;document.body.appendChild(d);setTimeout(()=>d.remove(),1250)}

function ambientFx(kind){
 if(!kind)return '';
 const n=kind==='lantern'?12:kind==='petal'||kind==='plum'?14:kind==='candle'?8:7;
 return `<div class="ambient fx-${kind}" aria-hidden="true">${Array.from({length:n},(_,i)=>`<i style="--i:${i};--x:${(i*37)%97}%;--d:${3+(i%6)}s;--delay:${-(i%5)}s"></i>`).join('')}</div>`;
}

function resolvedResult(c,st=state){return typeof c?.result==='function'?c.result(st):(c?.result||'')}

function choose(i){
 const chapter=CHAPTERS[state.index];
 if(chapter.steps){
  const step=chapter.steps[state.chapterStep||0],c=step.choices[i];
  if(c.requires&&!c.requires(state))return;
  if((c.costMind||0)>(state.mind??0))return;
  const resultText=resolvedResult(c,state);
  const changes=applyChoiceEffects(c);
  state.stepHistory.push(i);state.stepResults.push(resultText);state.stepChanges.push(...changes);state.lastChoice=i;
  if(state.chapterStep<chapter.steps.length-1){state.chapterStep+=1;save();render();if(!step.narrative)sealFlashForChoice(c);scrollAfterChoice(Boolean(c.result),false);return;}
  state.history[state.index]=state.stepHistory.slice();
  state.chronicle.push({date:chapter.date,title:chapter.title,decision:chapter.steps.map((st,idx)=>st.narrative?null:st.choices[state.stepHistory[idx]]?.label).filter(Boolean).join(' → '),result:state.stepResults.filter(Boolean).join(' '),changes:state.stepChanges.slice()});
  state.index=Math.min(state.index+1,CHAPTERS.length);state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];applyMilestones(state.index,changes);save();render();if(!step.narrative)sealFlashForChoice(c);scrollAfterChoice(false,true);return;
 }
 const c=chapter.choices[i];
 if(c.requires&&!c.requires(state))return;
 if((c.costMind||0)>(state.mind??0))return;
 const changes=applyChoiceEffects(c);
 state.history[state.index]=i;
 state.chronicle.push({date:chapter.date,title:chapter.title,decision:c.label,result:resolvedResult(c,state),changes});
 state.lastChoice=i;state.index=Math.min(state.index+1,CHAPTERS.length);applyMilestones(state.index,changes);save();render();sealFlashForChoice(c);scrollAfterChoice(false,true);
}

function applyRecordedChapter(idx,pickRecord){
 const chapter=CHAPTERS[idx];
 if(chapter.steps&&Array.isArray(pickRecord)){
  const decisions=[],results=[],changes=[];
  pickRecord.forEach((p,si)=>{const st=chapter.steps[si],c=st?.choices[p];if(!c)return;const rr=resolvedResult(c,state);changes.push(...applyChoiceEffects(c));if(!st.narrative)decisions.push(c.label);if(rr)results.push(rr);state.lastChoice=p;});
  state.history[idx]=pickRecord.slice();state.chronicle.push({date:chapter.date,title:chapter.title,decision:decisions.join(' → '),result:results.join(' '),changes});return;
 }
 const c=chapter.choices?.[pickRecord];if(!c)return;const rr=resolvedResult(c,state);const changes=applyChoiceEffects(c);state.history[idx]=pickRecord;state.chronicle.push({date:chapter.date,title:chapter.title,decision:c.label,result:rr,changes});state.lastChoice=pickRecord;
}

function replay(to){
 const old=state.history.slice(0,to);state=clone(INITIAL_STATE);state.intro=true;
 old.forEach((p,idx)=>{state.index=idx;applyRecordedChapter(idx,p);state.index=idx+1;applyMilestones(state.index,[])});
 state.index=to;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];save();render();
}

function inkPortrait(p,small=false){
 const kind=p.portraitKind||'figure';
 const head=`<circle class="soft" cx="50" cy="39" r="15"/>`;
 const body=`<path class="ink" d="M20 96 Q25 63 50 58 Q75 63 80 96 Z"/>`;
 const hair=kind==='maid'||kind==='youngwoman'?`<path class="ink" d="M34 34q3-18 16-18t17 18q-7-8-17-8t-16 8Z"/><circle class="ink" cx="50" cy="17" r="7"/>`:`<path class="ink" d="M34 35q2-17 16-17t16 17q-7-7-16-7t-16 7Z"/>`;
 let mark='';
 if(kind==='eunuch') mark=`<path class="line" d="M34 19h32M39 14h22v8"/><path class="line" d="M70 62l11 24"/>`;
 if(kind==='guard') mark=`<path class="line" d="M30 19h40l-6 10H36Z"/><path class="line" d="M76 54L91 91M82 52l7 5"/>`;
 if(kind==='prince') mark=`<path class="line" d="M37 17h26l4 8H33Z"/><path class="line" d="M29 75h42"/><path class="line" d="M24 86q26-12 52 0"/>`;
 if(kind==='maid') mark=`<path class="line" d="M28 73q22 12 44 0"/><path class="line" d="M68 61q13 4 17 15"/>`;
 if(kind==='youngwoman') mark=`<path class="line" d="M25 80q25-15 50 0"/><circle class="line" cx="68" cy="23" r="3"/>`;
 return `<div class="portrait ink-portrait ${small?'small':''}" aria-label="${p.name}画像"><svg viewBox="0 0 100 100" role="img"><rect class="paper" width="100" height="100"/>${hair}${head}${body}${mark}<path class="line" d="M44 40h1M55 40h1M46 49q4 2 8 0"/></svg></div>`;
}

function portrait(p,small=false){if(p.portraitKind)return inkPortrait(p,small);if(p.noPortrait)return `<div class="portrait glyph-portrait ${small?'small':''}"><b>${p.glyph||'·'}</b></div>`;const variant=p.portraitVariant?` variant-${p.portraitVariant}`:'';return `<div class="portrait ${small?'small':''}${variant}" style="--px:${[0,33.333,66.666,100][p.portrait%4]}%;--py:${p.portrait<4?0:100}%"></div>`}

function nav(){
 const items=[['story','正文'],['people','人物关系'],['children','皇嗣'],['chronicle','大事录'],['map','宫廷地图']];
 return `<header><div class="brand"><span>大晟·承熙</span><b>宫廷纪事</b></div><nav>${items.map(([v,n])=>`<button class="${state.view===v?'active':''}" data-view="${v}">${n}</button>`).join('')}</nav><button id="voice-open" class="ghost" title="语音包">声 · 语音包</button><button id="restart" class="ghost">重新开局</button></header>`;
}

// Earlier render functions still reference these names. Current scene illustrations
// are resolved only by chapter title and exact scene heading in scene-art.js.
const SCENE_MEDIA={};
const CHAPTER_SCENE_MEDIA={};

const STORY_ARTIFACTS={
 '4-10':{name:'旧国玉饰',tag:'御案遗物',text:'册入六宫后的宣召夜，蘅嫔胸前最后一枚旧国玉饰被留在御案。它不合规制，却一直没有被收走。'},
 '5-3':{name:'《承露录》',tag:'私册',text:'一本记录如何等、如何笑、如何避开冷脸的册子。它越细，越像一个人把自己训练成“可被喜欢”的证据。'},
 '6-3':{name:'军中旧铜扣',tag:'沈家旧案',text:'背面营号与沈家兄长旧营一致。它不能证明谁有罪，却证明十年前那份军令并没有真正死去。'},
 '9-2':{name:'断弦',tag:'顺王旧物',text:'已经不能再用的琴弦。顺王没有扔，方常在也没听懂原因。很多旧事第一次从卷宗变回了具体的人。'},
 '10-7':{name:'朱批',tag:'御前旨意',dynamic:true},
};

function artifactFor(ci,si){const a=STORY_ARTIFACTS[`${ci}-${si}`];if(!a)return'';let text=a.text;if(a.dynamic){text=state.flags.fangEdict?`御笔已落：${state.flags.fangEdict}`:'朱笔还未落定。真正危险的不是一句旨意本身，而是宫里会如何沿着这句话行动。';}return `<details class="artifact-note"><summary><span>${a.tag}</span><b>${a.name}</b><i>展开</i></summary><p>${text}</p></details>`}

function mediaFor(ci,si){const c=CHAPTERS[ci],step=c?.steps?.[si],m=CHAPTER_SCENE_MEDIA[`${c?.title}|${step?.heading}`];if(!m)return'';return `<figure class="scene-visual ${m.kind||'scene'}" data-scene-image="${ci}-${si}"><div class="scene-image-wrap"><img src="${m.src}" alt="${m.caption}" loading="lazy"></div><figcaption><span>${m.kind==='prop'?'道具特写':'场景插图'}</span>${m.caption}<button type="button" class="scene-expand">展开</button></figcaption></figure>`}

function reactionForChoice(c){if(!c?.reactionKey)return'';const m=SCENE_MEDIA[c.reactionKey];if(!m)return'';return `<figure class="scene-visual reaction-visual ${m.kind||'scene'}" data-scene-image="${c.reactionKey}"><div class="scene-image-wrap"><img src="${m.src}" alt="${c.reactionCaption||m.caption}" loading="lazy"></div><figcaption><span>落旨余波</span>${c.reactionCaption||m.caption}<button type="button" class="scene-expand">展开</button></figcaption></figure>`}

function storyView(){
 if(state.index===0&&!state.intro)return prologueView();
 if(state.index>=CHAPTERS.length)return ending();
 const c=CHAPTERS[state.index],past=state.index>0?state.chronicle[state.index-1]:null;
 const step=c.steps?c.steps[state.chapterStep||0]:null;
 const activeText=step?step.text(state):c.text(state),activeChoices=step?step.choices:c.choices;
 const cast=(step&&step.cast)?step.cast:(c.cast||[]),fx=(step&&step.fx)||c.fx||'';
 const prevStep=step&&state.chapterStep>0?c.steps[state.chapterStep-1]:null;
 const recentResult=(prevStep&&!prevStep.narrative)?[...state.stepResults].reverse().find(Boolean):'';
 const prevPick=(prevStep&&state.chapterStep>0)?state.stepHistory[state.chapterStep-1]:null;
 const prevChoice=(prevStep&&prevPick!=null)?prevStep.choices?.[prevPick]:null;
 return `<main class="story-layout"><aside class="chapters"><span class="eyebrow">卷目</span>${CHAPTERS.map((x,i)=>`<button ${i>state.index?'disabled':''} class="${i===state.index?'current':''}" data-replay="${i}"><small>${String(i+1).padStart(2,'0')}</small><span>${i>state.index?"未至之年":x.title}</span></button>`).join('')}</aside>
 <article class="chapter">${ambientFx(fx)}<div class="chapter-head"><div><span class="eyebrow">${c.date} · ${c.place}</span><h1>${c.title}</h1><p class="theme">${c.theme}</p><div class="voice-head-actions"><button class="voice-btn" id="read-page">朗读本页</button><button class="voice-btn" id="stop-voice">停声</button><span class="voice-status" id="voice-status">语音待命</span></div></div><div class="cast-stack">${cast.slice(0,4).map(k=>portrait(PEOPLE[k],true)).join('')}</div></div>
 ${(state.chapterStep||0)===0&&c.bridge?`<div class="bridge"><b>前情</b><p>${c.bridge(state)}</p></div>`:(state.chapterStep||0)===0&&past?`<div class="bridge"><b>前情</b><p>上一章，你选择了“${past.decision}”。这件事并未立刻结束。</p></div>`:''}
 ${step?`<div class="scene-progress">${c.steps.map((_,i)=>`<span class="${i===(state.chapterStep||0)?'active':''}">${i+1}/${c.steps.length}</span>`).join('')}</div><h2 class="scene-title" id="scene-reading-anchor">${step.heading}</h2>`:''}
 ${step?mediaFor(state.index,state.chapterStep||0):''}${step?artifactFor(state.index,state.chapterStep||0):''}
 ${recentResult?`<div class="recent-result" id="decision-result-anchor"><b>上一幕</b><p>${recentResult}</p></div>`:''}
 ${prevChoice?reactionForChoice(prevChoice):''}
 <div class="prose">${activeText.map((p,i)=>`<div class="v52-paragraph ${i===1?'dialogue':''}" data-voice-line="${i}"><button class="voice-mini" data-speak-line="${i}" title="朗读这一段" aria-label="朗读这一段">声</button>${p}</div>`).join('')}</div>
 ${step?.keyDecision?`<div class="key-decision-note"><b>关键落子</b> · 这一处会留下长期余波。选择后可在大事录查看已经发生的结果。</div>`:''}
 ${step?.narrative?`<section class="narrative-turn"><button class="narrative-next" data-choice="0">${activeChoices[0]?.label||'继续阅读'}<i>→</i></button></section>`:`<section class="choices"><h2>${step?.keyDecision?'这一子，你落在哪里？':step?`这件事到了我这里。`:'这件事到了我这里。'}</h2>${activeChoices.map((x,i)=>{const reqLocked=x.requires&&!x.requires(state),mindLocked=(x.costMind||0)>(state.mind??0),locked=reqLocked||mindLocked;const sub=mindLocked?'帝王心术不足':reqLocked?'前面的选择尚不足以开启':(x.hint||'');return `<button class="${step?.keyDecision?'key-choice':''}" data-choice="${i}" ${locked?'disabled':''}><span><b>${x.label}</b>${x.costMind?`<em class="cost-tag">帝王心术 -${x.costMind}</em>`:''}${sub?`<small>${sub}</small>`:''}</span><i>${step&&state.chapterStep<c.steps.length-1?'落子':'落旨'}</i></button>`}).join('')}</section>`}</article>
 <aside class="context"><span class="eyebrow">当前人物</span>${cast.map(k=>{const p=PEOPLE[k];return `<button data-person="${k}">${portrait(p,true)}<span><b>${p.name}</b><small>${displayRank(k)}</small></span></button>`}).join('')}${step?.keyDecision?`<div class="fate-meter"><div class="meter-top"><b>帝王心术</b><span class="stones">${'●'.repeat(state.mind??0)}${'○'.repeat(Math.max(0,3-(state.mind??0)))}</span></div><p>只在极少数真正不可轻易回头的节点出现。</p></div>`:''}</aside></main>`;
}

function openSceneLightbox(key){const m=SCENE_MEDIA[key];if(!m)return;let d=document.getElementById('scene-lightbox');if(!d){d=document.createElement('dialog');d.id='scene-lightbox';d.className='scene-lightbox';document.body.appendChild(d);}d.innerHTML=`<button class="scene-lightbox-close" aria-label="关闭">×</button><img src="${m.src}" alt="${m.caption}"><p>${m.caption}</p>`;d.showModal();d.querySelector('.scene-lightbox-close').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close();};}

function prologueView(){
 return `<main class="prologue">
  <section class="prologue-cover">
   <div class="cover-copy"><span class="eyebrow">大晟 · 承熙元年</span><h1>宫门初启</h1><p class="theme">一个人要杀死自己多少次，才能成为一个合格的皇帝？</p><p>我三十岁登基。朝堂上换了年号，宫里也换了称谓。昨日还是潜邸旧人的，如今成了皇后、和妃、太后；许多话听起来仍和从前一样，落在今日，却未必还是从前的意思。</p><button id="enter-story" class="enter">翻开承熙元年</button></div>
  </section>
  <section class="background">
   <div class="background-title"><span class="eyebrow">序章 · 故事背景</span><h2>在我成为皇帝以后</h2><p>登基以后，我很快发现，宫里的事并不比朝堂更容易判断。人会说真话，也会只说一半；会因为情分做事，也会恰好让情分成为最好的借口。我能看见很多细节，却未必能在当下知道它们意味着什么。</p></div>
   <div class="relation-core">
    <div class="emperor-node"><b>我 · 杨叙</b><span>大晟新帝 · 30岁</span><p>我习惯先听、先看，迟些再下判断。这样的习惯让我赢过夺嫡，也让我以为许多事只要看得足够久，总能看明白。故事开始时，我尚不知道这是不是对的。</p></div>
    <div class="relation-lines">
     <article><span>母子</span><h3>太后</h3><p>她很少把一句话说尽。有时是因为不愿干涉，有时或许只是想让我自己走一遍。我至今也并非每次都分得清。</p></article>
     <article><span>中宫</span><h3>皇后</h3><p>她做事稳妥，几乎从不在人前出错。她究竟是真的相信规矩，还是只有规矩能让她安心，我从未认真问过。</p></article>
     <article><span>旧人</span><h3>和妃</h3><p>她跟随我多年，熟悉我的脾气，我也熟悉她许多小习惯。但熟悉一个人，并不等于知道她没有说出口的那一部分。</p></article>
    </div>
   </div>
   <div class="before-record"><h3>从潜邸到承熙元年</h3><ol>
    <li><b>数年前 · 潜邸</b><span>那时我还是皇子。皇后料理内宅，和妃住在侧院，太后偶尔来府中看孩子。许多事尚可关起门来处理。</span></li>
    <li><b>夺嫡之后</b><span>有人因我得势，也有人因这场胜负失去了东西。那些旧事没有消失，只是很少再有人当面提起。</span></li>
    <li><b>承熙元年 · 登基</b><span>我继位称帝。旧人换了新身份，宫规重新排定，连年幼的皇子皇女也被大人的新称谓包围。</span></li>
    <li><b>正月 · 故事将启</b><span>新朝第一场家宴设在凤仪宫。宴席本身没有出事。真正留下来的，是宴散之后那些看似寻常的小事。</span></li>
   </ol></div>
  </section>
 </main>`;
}

function ending(){return `<main class="ending"><span class="eyebrow">承熙朝·卷一终</span><h1>空宫已点灯</h1><p>结局：${state.flags.final||'未定'}。你走过的每一步都已写入大事录。</p><button class="primary" data-view="chronicle">查看完整大事录</button></main>`}

function meters(k){return `<div class="meter-row"><span>亲近 <b>${state.bond[k]}</b></span><div><i style="width:${state.bond[k]}%"></i></div></div><div class="meter-row trust"><span>信任 <b>${state.trust[k]}</b></span><div><i style="width:${state.trust[k]}%"></i></div></div>`}

function peopleView(){const visible=Object.entries(PEOPLE).filter(([k,p])=>(p.introducedAt??0)<=state.index);return `<main class="page"><div class="page-title"><span class="eyebrow">人物录</span><h1>宫中人物</h1><p>人物会随着正文逐步记入。这里只写你已经见过、或宫中公开可知的信息；尚未登场的人不会提前出现。</p></div><div class="people-grid">${visible.map(([k,p])=>`<article class="person-card" data-person="${k}">${portrait(p)}<div><span class="rank">${displayRank(k)}</span><h2>${p.name}</h2><p class="meta">${p.age} · ${p.home}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${p.bio}</p>${meters(k)}</div></article>`).join('')}</div></main>`}

function childrenView(){return `<main class="page"><div class="page-title"><span class="eyebrow">皇室子女</span><h1>皇嗣</h1><p>皇嗣保留在玉牒中，但前五章只作为各宫生活的一部分出现，不再承担主线冲突。这里仅记公开身份与幼年状态。</p></div><div class="child-grid">${Object.values(CHILDREN).map(c=>{const mother=c.mother?(PEOPLE[c.mother]?.name||'—'):(c.motherName||'—');const foster=c.foster?` · 抚养：${PEOPLE[c.foster]?.name||c.foster}`:'';return `<article><span class="seal">嗣</span><small>${c.order}</small><h2>${c.name}</h2><p>${c.age}</p><p>${c.note}</p><b>生母：${mother}${foster}</b></article>`}).join('')}</div></main>`}

function annalFor(i){
 const lines=[
  '承熙元年正月，上定六宫班序，内廷肃然。',
  '三月，蘅国王女入宫，上以礼纳之，各授内职。',
  '四月，上宴诸嫔于御园，宫中和睦。',
  '七月七夕，上与后妃同宴，赐物有差。',
  '承熙二年二月，蘅国旧后入内廷，册为蘅嫔，恩礼甚厚。',
  '承熙六年，昭妃有娠，上进其位，命谨护皇嗣。',
  '承熙六年冬，昭妃失子，上命内廷查问。',
  '承熙七年，闻人氏进珍妃，常侍御前。',
  '承熙八年，昭妃谋逆伏诛，蘅嫔旋薨。',
  '承熙九年，沈氏旧案平，上悯旧臣。',
  '承熙十年，顺贵人暴薨，上命彻查。',
  '承熙十一年，内廷旧案渐平，六宫稍定。',
  '承熙十一年春，诏开采选，以充内廷。',
  '新秀入宫，中宫亲阅名册。'
 ]; return lines[i]||'';
}

function chronicleView(){return `<main class="page chronicle"><div class="page-title"><span class="eyebrow">承熙朝·后宫大事录</span><h1>大事录</h1><p>这里一边记你真正做过的裁断，一边留下史官最终写给后人的版本。两者有时并不是同一件事。</p></div><div class="mirror-note">你记得屋里谁停了一下、谁没有说话；史书通常只留下“上许之”“宫中和睦”“恩礼甚厚”。</div>${state.chronicle.length?state.chronicle.map((e,i)=>`<article><time>${e.date}</time><div><h2>${e.title}</h2><p class="decision">裁断：${e.decision||'无明示裁断'}</p><p>${e.result}</p>${annalFor(i)?`<p class="annal"><b>史官书</b>${annalFor(i)} <em>——《大晟史·内廷记》</em></p>`:''}<div class="deltas">${e.changes.map(x=>`<span>${x}</span>`).join('')}</div></div><button data-replay="${i}" title="从此处重走">重走</button></article>`).join(''):'<div class="empty">尚无已定之事。先完成第一章。</div>'}</main>`}

function mapView(){return `<main class="page map-page"><div class="page-title"><span class="eyebrow">宫城图 · 内外朝位置</span><h1>承熙宫苑</h1><p>宫城南为前朝，北为御花园；养心殿居中承接内外朝，凤仪宫、永和宫、慈宁宫分列东西，拾遗阁与听雨轩在西侧偏院，西华门及顺王府在宫墙之外。</p></div><div class="palace-map"><img src="assets/asset-013.webp" alt="大晟皇宫俯瞰图">${MAP_SPOTS.map((s,i)=>`<button style="left:${s.x}%;top:${s.y}%" data-spot="${i}"><i></i>${s.name}</button>`).join('')}<div id="map-info"><b>宫城中轴</b><p>南起前朝，北至御花园；养心殿居中，诸宫依东西宫道相通。</p></div></div></main>`}

function modal(k){const p=PEOPLE[k];$('#modal').innerHTML=`<button class="close">×</button><div class="modal-person">${portrait(p)}<div><span class="rank">${displayRank(k)}</span><h2>${p.name}</h2><p class="meta">${p.age} · ${p.home}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${p.bio}</p>${meters(k)}</div></div>`;$('#modal').showModal();$('.close').onclick=()=>$('#modal').close()}

if(speechAvailable())speechSynthesis.onvoiceschanged=()=>{};

function render(){stopVoice();document.title='宫廷纪事 · 承熙';$('#app').innerHTML=nav()+(state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView());bind();maybeAutoplayVoice()}

const VOICE_PROFILES={
 narrator:{label:'叙事',rate:.90,pitch:.86,sample:'宫门合上以后，许多话便只剩下回声。'},
 emperor:{label:'主控',rate:.86,pitch:.72,sample:'朕知道了。'},
 taihou:{label:'太后',rate:.80,pitch:.78,sample:'哀家眼睛花，心可不花。'},
 gu:{label:'皇后',rate:.84,pitch:.88,sample:'这件事，还是照规矩办。'},
 shen:{label:'和妃',rate:.89,pitch:.86,sample:'旧茶虽苦，胜在记得。'},
 zhou:{label:'周嫔',rate:.98,pitch:1.00,sample:'姐姐这话，倒叫人不好接了。'},
 baopu:{label:'昭妃',rate:.94,pitch:1.04,sample:'臣妾既来了，总不能叫陛下觉得无趣。'},
 hanzhang:{label:'珍妃',rate:.82,pitch:.80,sample:'臣在。'},
 wenheng:{label:'蘅嫔',rate:.77,pitch:.73,sample:'亡国之人，不敢忘了自己从哪里来。'},
 fang:{label:'方常在',rate:.98,pitch:1.08,sample:'陛下，您尝尝这个呀。'},
 peiyan:{label:'裴景和',rate:.87,pitch:.82,sample:'奴才记下了。'},
 xielin:{label:'谢绍庭',rate:.84,pitch:.69,sample:'宫门已封，请陛下示下。'},
 afu:{label:'阿芙',rate:1.08,pitch:1.06,sample:'主子，您又走错门了。'},
 shunwang:{label:'顺王',rate:.83,pitch:.75,sample:'这江山，臣从来就没想要过。'},
 zhangyuanzhao:{label:'张元照',rate:.94,pitch:.96,sample:'臣妾记得。'}
};

let voicePrefs=(()=>{try{return Object.assign({enabled:true,autoplay:false,roleVoices:{}},JSON.parse(localStorage.getItem('chengxi_test140_voice')||'{}'))}catch(e){return {enabled:true,autoplay:false,roleVoices:{}}}})();

let voiceRunToken=0;

function saveVoicePrefs(){localStorage.setItem('chengxi_test140_voice',JSON.stringify(voicePrefs))}

function speechAvailable(){return 'speechSynthesis' in window&&'SpeechSynthesisUtterance' in window}

function cleanSpeechText(t){const d=document.createElement('div');d.innerHTML=t;return (d.textContent||'').replace(/\s+/g,' ').trim()}

function currentSpeechLines(){if(state.view!=='story'||state.index>=CHAPTERS.length)return[];const c=CHAPTERS[state.index],step=c.steps?c.steps[state.chapterStep||0]:null;return (step?step.text(state):c.text(state))||[]}

function inferSpeaker(text){
 const t=cleanSpeechText(text);
 const tests=[['taihou',['太后','哀家']],['gu',['皇后','中宫']],['shen',['和妃','永和宫']],['zhou',['周嫔','周妃']],['baopu',['昭妃','昭贵人','昭常在']],['hanzhang',['珍妃','珍贵人','珍常在']],['wenheng',['蘅嫔']],['fang',['方常在','顺贵人','听雨轩']],['peiyan',['裴景和','裴总管']],['xielin',['谢绍庭','谢统领']],['afu',['阿芙']],['shunwang',['顺王']],['zhangyuanzhao',['张元照','张常在']]];
 for(const [k,words] of tests)if(words.some(w=>t.includes(w))&&/[“"]/u.test(t))return k;
 if(/(?:我|朕)[道说问答：]/.test(t)||t.startsWith('朕'))return 'emperor';
 return 'narrator';
}

function chineseVoices(){return speechAvailable()?speechSynthesis.getVoices().filter(v=>/^zh/i.test(v.lang||'')):[]}

const ROLE_VOICE_HINTS={
 narrator:['Yunyang','Yunjian','Yunze','Yunxi','Natural','Online','Google'],emperor:['Yunyang','Yunfeng','Yunze','Yunxi','Natural','Online'],taihou:['Xiaorui','Xiaomo','Xiaozhen','Natural','Online'],gu:['Xiaohan','Xiaoyi','Xiaomo','Natural','Online'],shen:['Xiaomo','Xiaohan','Xiaoyi','Natural','Online'],zhou:['Xiaoyi','Xiaomeng','Xiaoxiao','Natural','Online'],baopu:['Xiaomeng','Xiaoyi','Xiaoxiao','Natural','Online'],hanzhang:['Xiaohan','Xiaorui','Xiaomo','Natural','Online'],wenheng:['Xiaorui','Xiaozhen','Xiaomo','Natural','Online'],fang:['Xiaoyi','Xiaoxiao','Xiaomeng','Natural','Online'],afu:['Xiaomeng','Xiaoyi','Natural','Online'],shunwang:['Yunxi','Yunxia','Yunfeng','Natural','Online'],peiyan:['Yunyang','Yunze','Natural','Online'],xielin:['Yunfeng','Yunjian','Natural','Online']};

function voiceScore(v,key){let score=0,n=(v.name||'')+' '+(v.voiceURI||'');if(!v.localService)score+=18;if(/natural|premium|enhanced|neural|online/i.test(n))score+=24;if(/microsoft|google|apple/i.test(n))score+=6;for(const [i,h] of (ROLE_VOICE_HINTS[key]||[]).entries())if(new RegExp(h,'i').test(n))score+=18-i*1.5;if(v.default)score+=2;return score}

function pickChineseVoice(profileKey){const vs=chineseVoices();if(!vs.length)return null;const manual=voicePrefs.roleVoices?.[profileKey];if(manual){const hit=vs.find(v=>v.name===manual||v.voiceURI===manual);if(hit)return hit}return [...vs].sort((a,b)=>voiceScore(b,profileKey)-voiceScore(a,profileKey))[0]||vs[0]}

function voiceQuality(v){if(!v)return'未检测到中文声线';const n=(v.name||'');if(/natural|premium|enhanced|neural|online/i.test(n)||!v.localService)return'优先高质量 / 远程声线';return'本机系统声线'}

function setVoiceStatus(msg,playing=false){const el=document.getElementById('voice-status');if(el){el.textContent=msg;const b=document.getElementById('read-page');if(b)b.classList.toggle('playing',playing)}}

function stopVoice(){voiceRunToken++;if(speechAvailable())speechSynthesis.cancel();document.querySelectorAll('.voice-reading-mark').forEach(x=>x.classList.remove('voice-reading-mark'));setVoiceStatus('已停声',false)}

function speakText(text,key='narrator',opts={}){if(!voicePrefs.enabled)return Promise.resolve();if(!speechAvailable()){setVoiceStatus('浏览器不支持',false);return Promise.resolve()}const cleaned=cleanSpeechText(text);if(!cleaned)return Promise.resolve();const profile=VOICE_PROFILES[key]||VOICE_PROFILES.narrator;return new Promise(resolve=>{const u=new SpeechSynthesisUtterance(cleaned);u.lang='zh-CN';u.rate=opts.rate||profile.rate;u.pitch=opts.pitch||profile.pitch;const v=pickChineseVoice(key);if(v)u.voice=v;u.volume=.96;u.onstart=()=>setVoiceStatus(profile.label+' · '+(v?.name||'系统声线'),true);u.onend=()=>resolve();u.onerror=()=>resolve();speechSynthesis.speak(u)})}

function quoteSpeaker(full,before,quote){if(/^(朕|孤)/.test(quote))return'emperor';if(/^哀家/.test(quote))return'taihou';const near=before.slice(-55);const tests=[['taihou',/太后|邵令仪/],['gu',/皇后|顾明宜/],['shen',/和妃|沈知微/],['baopu',/昭妃|抱朴|长女/],['hanzhang',/珍妃|含章|次女/],['wenheng',/蘅嫔|闻人蘅|旧后/],['fang',/方常在|顺贵人|方贵人|方小满/],['zhou',/周嫔|周妃/],['shunwang',/顺王/],['afu',/阿芙/],['peiyan',/裴景和/],['xielin',/谢绍庭/]];for(const [k,r] of tests)if(r.test(near))return k;return inferSpeaker(full)}

function speechSegments(raw){const full=cleanSpeechText(raw),out=[];let last=0;const re=/“([^”]+)”/g;let m;while((m=re.exec(full))){const before=full.slice(last,m.index);if(before.trim())out.push({text:before,key:'narrator'});out.push({text:m[1],key:quoteSpeaker(full,full.slice(0,m.index),m[1])});last=re.lastIndex}const tail=full.slice(last);if(tail.trim())out.push({text:tail,key:'narrator'});return out.length?out:[{text:full,key:inferSpeaker(full)}]}

async function speakRichLine(raw){const segs=speechSegments(raw);for(const seg of segs){await speakText(seg.text,seg.key);await new Promise(r=>setTimeout(r,seg.key==='narrator'?85:125))}}

async function speakCurrentPage(singleIndex=null){if(!voicePrefs.enabled){openVoicePanel();return}stopVoice();const token=++voiceRunToken,lines=currentSpeechLines();const indexes=singleIndex==null?lines.map((_,i)=>i):[singleIndex];for(const i of indexes){if(token!==voiceRunToken)break;const p=document.querySelector(`[data-voice-line="${i}"]`);if(p)p.classList.add('voice-reading-mark');await speakRichLine(lines[i]);if(p)p.classList.remove('voice-reading-mark')}if(token===voiceRunToken)setVoiceStatus('朗读完毕',false)}

function voicePanelHTML(){const supported=speechAvailable(),vs=chineseVoices();return `<div class="voice-panel-inner"><div class="voice-panel-head"><div><span class="eyebrow">承熙 · 声线包</span><h2>宫中声线</h2><p class="voice-note">已改为<strong>旁白 / 人物对白分轨</strong>。网页会优先选择设备上更自然的中文远程 / Natural 声线；你也可以为每个人手动换声。云端商业配音需要密钥，单文件版不会把密钥写进网页。</p></div><button class="voice-close" id="voice-close">×</button></div>${supported?'':`<p class="voice-unsupported">当前浏览器没有提供语音合成功能。正文仍可正常阅读。</p>`}<div class="voice-master"><label><input type="checkbox" id="voice-enabled" ${voicePrefs.enabled?'checked':''}> 启用语音包</label><label class="voice-autoplay"><input type="checkbox" id="voice-autoplay" ${voicePrefs.autoplay?'checked':''}> 翻页自动朗读</label></div><div class="voice-list">${Object.entries(VOICE_PROFILES).map(([k,v])=>{const pv=pickChineseVoice(k);return `<div class="voice-card"><div><b>${v.label}</b><small>${k==='emperor'?'低、慢、留白':k==='hanzhang'?'冷、轻、极克制':k==='fang'?'轻快、不设防':k==='wenheng'?'极慢、字字压住':k==='shen'?'柔而带刺':k==='gu'?'端整但略迟疑':k==='taihou'?'缓慢、压低':k==='baopu'?'明亮、张扬':k==='zhou'?'体面、略快':k==='narrator'?'克制旁白':'自然声线'}</small><div class="voice-quality">推荐：${pv?pv.name:'暂无'} · ${voiceQuality(pv)}</div></div><button data-voice-preview="${k}">试听</button><div class="voice-config"><select data-role-voice="${k}"><option value="">自动选择最佳可用声线</option>${vs.map(x=>`<option value="${x.name}" ${voicePrefs.roleVoices?.[k]===x.name?'selected':''}>${x.name}${x.localService?' · 本机':' · 远程'}</option>`).join('')}</select></div></div>`}).join('')}</div></div>`}

function openVoicePanel(){const d=document.getElementById('voice-panel');if(!d)return;d.innerHTML=voicePanelHTML();d.showModal();document.getElementById('voice-close').onclick=()=>d.close();document.getElementById('voice-enabled').onchange=e=>{voicePrefs.enabled=e.target.checked;saveVoicePrefs();if(!voicePrefs.enabled)stopVoice()};document.getElementById('voice-autoplay').onchange=e=>{voicePrefs.autoplay=e.target.checked;saveVoicePrefs()};d.querySelectorAll('[data-voice-preview]').forEach(b=>b.onclick=()=>{stopVoice();const k=b.dataset.voicePreview;speakText(VOICE_PROFILES[k].sample,k)});d.querySelectorAll('[data-role-voice]').forEach(sel=>sel.onchange=()=>{voicePrefs.roleVoices=voicePrefs.roleVoices||{};if(sel.value)voicePrefs.roleVoices[sel.dataset.roleVoice]=sel.value;else delete voicePrefs.roleVoices[sel.dataset.roleVoice];saveVoicePrefs();});}

function maybeAutoplayVoice(){if(voicePrefs.enabled&&voicePrefs.autoplay&&state.view==='story')setTimeout(()=>speakCurrentPage(),120)}

function bind(){
 document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;save();render()});
 document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>choose(+b.dataset.choice));
 document.querySelectorAll('[data-scene-image]').forEach(el=>el.onclick=e=>{if(e.target.closest('.scene-expand')||e.target.closest('.scene-image-wrap'))openSceneLightbox(el.dataset.sceneImage)});
 document.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>modal(b.dataset.person));
 document.querySelectorAll('[data-replay]').forEach(b=>b.onclick=()=>{if(+b.dataset.replay<=state.index&&confirm('从这一章重新选择？之后的记录会被改写。'))replay(+b.dataset.replay)});
 document.querySelectorAll('[data-spot]').forEach(b=>b.onclick=()=>{const s=MAP_SPOTS[+b.dataset.spot];$('#map-info').innerHTML=`<b>${s.name}</b><p>${s.desc}</p>`});
 const enter=$('#enter-story');if(enter)enter.onclick=()=>{state.intro=true;save();render()};
 const voiceOpen=$('#voice-open');if(voiceOpen)voiceOpen.onclick=openVoicePanel;
 const readPage=$('#read-page');if(readPage)readPage.onclick=()=>speakCurrentPage();
 const stopBtn=$('#stop-voice');if(stopBtn)stopBtn.onclick=stopVoice;
 document.querySelectorAll('[data-speak-line]').forEach(b=>b.onclick=e=>{e.stopPropagation();speakCurrentPage(+b.dataset.speakLine)});
 $('#restart').onclick=()=>{if(confirm('清除本轮记录，重新开始？')){stopVoice();state=clone(INITIAL_STATE);save();location.reload()}};
}

function editScene(ci,si,fn){const scene=CHAPTERS[ci].steps[si],old=scene.text;scene.text=s=>fn(old(s),s)}

function replaceParagraph(ci,si,index,text){editScene(ci,si,(a,s)=>{a[index]=typeof text==='function'?text(s):text;return a})}

function witness(ci,si,line){editScene(ci,si,a=>[line,...a])}

CHAPTERS[5].date='承熙三年春至六年六月';

CHAPTERS[6].date='承熙六年·六月至腊月';

CHAPTERS[7].date='承熙七年·春至冬';

CHAPTERS[8].date='承熙八年·春至十月';

CHAPTERS[8].bridge=s=>'过了七年的冬天，拾遗阁仍按旧例送来请安折。昭妃有时亲来，有时告病；我叫太医院把每次诊候另附一页，不许只写“照常”。';

CHAPTERS[6].bridge=s=>'六月的喜脉报来后，拾遗阁开始换软毡、添小衣。我每次过去，总能看见多出一件细小的东西。';

const themes=['新岁换了称谓，旧日相处还在摸索','先安下行李，再慢慢认得彼此','一盒伤药，一碟点心，几道渐熟的宫门','灯下同坐，各有一句没有说完的话','从宫外到宫内，一道门走了半年','年复一年，灯下的册页渐渐写满','小衣慢慢裁好，产期一天天近了','旧事由她亲口说起','请安照常，告病折却渐渐多了','一壶茶凉了，旧卷仍摊在案上'];

themes.forEach((t,i)=>CHAPTERS[i].theme=t);

PEOPLE.hanzhang.age='20岁';

PEOPLE.peiyan.introducedAt=0;

CHAPTERS[5].steps[1].heading='第二幕 · 一年被写进几行起居注';

witness(1,2,'翌日觐见前，我在正殿侧窗看见两人走过庭中。唱礼官上前引路，她们的声音隔着半扇窗传进来。');

witness(1,3,'这日请安，我在凤仪宫屏后等皇后议春衣的支用。茶盏落定，外间先有人低低问了一声好。');

witness(1,4,'这一周我去过拾遗阁几次。见到的多半是吃饭、挪花、还书；有些琐事是两人当面说起，彼此还会纠正一句。');

witness(1,5,'家书送出那日，我问长女昨夜为何还亮着灯。她说写信太费纸，把姐妹各自怎样写、怎样不许人看讲了一遍。讲到争执时，次女低头拨茶盖，没有否认。');

witness(1,7,'分好住处后的几次探访，皇后也随我去过。我是在这些往来里，看见她们慢慢认得宫中人。');

replaceParagraph(2,1,0,'第二日傍晚，我到听雨轩看那只猫。方常在把凤仪宫的字条递来，说伤药上午已经送到了，随后拉着阿芙讲起写谢帖的事。阿芙替她补了一句，她便急着解释一句。');

replaceParagraph(2,1,9,'说到这里，阿芙把一碟烤焦的酥饼拿给我看。方常在伸手要挡，没挡住，先笑了：“这是第一炉，不算。”');

replaceParagraph(2,2,0,'第三日午后，方常在让人送来一小碟新烤的杏仁酥，请我先尝。我到廊下时，她正同阿芙商量给皇后那一盒怎样装。');

replaceParagraph(2,2,3,'阿芙才把红绳系紧，内务府便遣人来叫她核月例。方常在说自己认得凤仪宫，不必等。我先往御花园去，走到新修的月门，才想起这几日有一段路还围着。');

replaceParagraph(2,2,2,'这一次酥皮薄了，甜味也收住。她请阿芙尝过，才挑了八块最完整的装进食盒，又拿红绳绕了两圈。');

replaceParagraph(2,5,1,s=>`躲雨之后，她再去拾遗阁，是送猫掉下来的绒毛——${courtTitle(s,'baopu')}说想做个小绒球。下一回是借厨房模具，再下一回是还棋谱。我去园中散步，渐渐总能碰见她们。`);

replaceParagraph(2,8,4,'六月末，皇后开始拟七夕宴单，遣人来问今年可有另行的旨意。我让她先把单子拟来，再一项项看。');

replaceParagraph(2,8,5,'那日午后，园中开始试挂灯架。匠人把旧孔填平，又依皇后的图样量过一回。');

witness(2,4,'四月中旬，我在拾遗阁借一场雨歇脚。话说到一半，门外便传来湿鞋踩过青砖的急响。');

editScene(4,10,(a,s)=>a.map(p=>p.replace('重新簪上银簪',s.flags.hengKeepsOldTrace?'重新簪上银簪':'将新制素钗插稳')));

editScene(4,11,(a,s)=>a.map(p=>p.replace('旧银簪还在',s.flags.hengKeepsOldTrace?'旧银簪还在':'发间换成了尚衣局配来的素钗')));

editScene(4,9,(a,s)=>a.map(p=>p.replace('去看过一次宫外别苑','去看过一次西六宫的空院')));

editScene(4,10,(a,s)=>a.map(p=>p.replace('第二日，拾遗阁收到一只铜盆。','第二日，蘅嫔住处收到一只铜盆。')));

witness(4,8,'皇后来请我看新拟的宫务单，我便留在凤仪宫等请安散去。帘外正好响起通传声。');

witness(4,11,'次日我仍去凤仪宫听宫务回话。御座设在侧间，从半卷的帘下能看见请安的人。');

editScene(4,12,(a,s)=>{a.unshift(s.flags.wenhengHome==='shiyi'?'蘅嫔留在拾遗阁后，母女见面不必再候传。':`蘅嫔另有住处，每次去拾遗阁都先遣人递话。她到时，女儿们通常已经留好晚膳。`);return a});

replaceParagraph(5,3,0,s=>s.flags.baopuYear5Promoted?`承熙五年秋，${courtTitle(s,'baopu')}按年资与承宠又晋一级。自四年秋第一次按例晋封以来，已隔了一年；两次各进一阶，如今到了嫔位。她把新衣穿来，先问我这回的颜色可好。`:`承熙五年秋，她已在嫔位，礼部没有再为惯常恩宠加封。她仍旧照样点灯、照样等人。`);

witness(5,0,'三年春，我在拾遗阁用了几次午膳。母女之间有些话便是那时听到的；问得深了，她们也会停下来，等我先开口。');

editScene(5,0,a=>a.map(p=>p.replace('两个女儿听见的是不同的意思。','两个女儿一个低头，一个笑着添汤，我没有听到她们接话。')));

replaceParagraph(5,5,0,'月底，我到拾遗阁时，母女正要用晚膳。我让人不必添仪仗，只在屏边净手。尚未落座，蘅嫔先让宫女捧来一只旧木匣。');

replaceParagraph(5,5,4,'“不是求。”蘅嫔看我一眼，放轻声音，“喜欢会散，赏赐会换人。臣妾说句冒犯的话：孩子若进了宗谱，她心里才有个能握住的念想。”');

replaceParagraph(5,5,10,s=>`蘅嫔没有再逼。${courtTitle(s,'baopu')}把匣盖合上。我让宫人先盛汤，又吩咐将方子交太医核验。她答应得很快，手却仍留在匣上。`);

CHAPTERS[5].steps[6].text=s=>[
'同月，我到永和宫时，方常在也来送点心。宫女才撤下火盆，廊下留着一股纸灰味。',
'方常在跨门槛时踉跄了一下，食盒磕到炭盆边。一角未烧尽的纸翻出来，露出一个“营”字。和妃先弯腰拾起，将纸折在掌中。',
'“臣妾没看。”方常在忙道，转眼见我也在，声音更小了。',
'和妃看她：“这话倒像看了许多。”',
'我没有让人展开那角纸，只问：“旧信？”',
'她嗯了一声。隔了片刻，才补道：“家兄从前军中的事，还缺一份能对得上的凭据。”',
'“想查，就让裴景和核来件。不要独自信一封无名信。”',
'她把纸收入袖中：“臣妾记下了。”方常在将食盒轻轻放好，这一回没再说笑。',
'稍后宫中乐师试起旧曲，和妃听了一会儿，请我准他们换一支。我答应了，没有问缘由。'];

editScene(5,7,(a,s)=>{a.splice(2,0,s.flags.chengluPlace==='imperial'?'前一年冬，她来问能否把《承露录》取回续写。我将原册交还，嘱她不必再送来核看；自那日起，册子仍由她收着。':'《承露录》仍由她自己收着，续写了多少，我没有再问。');return a});

replaceParagraph(6,0,0,'六月到九月，我去拾遗阁时，总能看见添出来的小东西。昭妃的衣腰一寸寸放宽，门槛包上软毡，御膳房从酸梅送到清汤，又改回她忽然想吃的辣鱼。');

editScene(6,0,(a)=>a.map(p=>p.replace('有没有结冰','软毡有没有翘边')));

CHAPTERS[6].steps[3].text=s=>[
'同一场雪里，我从拾遗阁回殿前，去了永和宫。和妃桌边放着一封薄信，一枚旧铜扣压在信上。',
'她见我看见，便把铜扣递来。边缘已经磨平，背面尚留一行营号。',
'“兄长从前军中的制式。”她说，“送来的人不肯留名。”',
'我让裴景和登记来件，却不凭这一枚扣子下断语：“先查营号，再查是谁递进来的。”',
'和妃点头，指腹在扣背停了一下：“能查到哪一步，便先查哪一步。”',
'茶已经凉透，她却没动。我将铜扣放回原处，窗外有人拍去披风上的雪，碎雪落在门槛外。'];

witness(6,8,'第二日下午，我到拾遗阁探病。内间梳子碰在妆台上，昭妃先说了声疼。我停在帘边，没有让宫人唱名。');

replaceParagraph(6,9,7,'方常在捧着剩下那只鞋从帘后出来。我正站在外间，她问该把鞋放哪里。我说先收好。她点头，用帕子裹了两层，才交给阿芙。');

replaceParagraph(6,10,2,s=>`裴景和按御前规矩核值，把抄本送到我案上。值簿刮改处另经一名书吏誊写；那书吏已调离京城，不是当夜递方的太医。${s.flags.birthChoice==='split'?'谢绍庭扣住的人仍在，供认药单经人转交，留下一个可继续追查的交接时辰。':'宫门外找到的太医只认得送单人的衣色；他离开产房后与谁接触，尚无可靠旁证。'}`);

witness(6,10,'产房那夜之后，御前开始逐日核收来件。以下这些，是我从值簿、问话与当面回禀中陆续拼出的。');

replaceParagraph(7,4,2,s=>`按她的说法，蘅嫔当时已经把姐姐推上车。${courtTitle(s,'hanzhang')}留在火场里，自己沿宫墙追了出去。`);

replaceParagraph(7,6,0,s=>`册封两日后，${courtTitle(s,'hanzhang')}来交回核过的值簿。我问母亲可说了什么，她低头看着封签，说母亲等到很迟，只问：“你给了他什么？”`);

replaceParagraph(7,6,4,'说到这里，她把封签压实：“后面便没再问。”我也没有续问。');

replaceParagraph(7,6,11,'我看着三个人分那盘糕。方常在还想问些什么，见和妃拿起茶盏，便也端起自己的杯子。');

replaceParagraph(8,0,1,'休养第十日，我去拾遗阁看她。她已经着妆，桌上摊着《承露录》。我问是否仍在写，她将册子推过来：日期照写，后面却空着。');

replaceParagraph(8,0,3,'“不记了？”我问。她用指腹抹去页边一点干墨：“没想好。”我将册子放回她手边。这一次，她没有忙着合上。');

witness(8,2,'九月初，我去拾遗阁看昭妃是否能正常用膳。门口没有唱名，内间先响起她的声音，我便停在半开的帘前。');

replaceParagraph(8,2,10,'蘅嫔没有追。她转头看见帘前的我，起身要行礼。我让她坐，桌上的蒸蛋已凉，她再没有拿起勺子。');

editScene(8,3,(a,s)=>{a[0]='那顿饭后的第五日，裴景和进殿说昭妃来了。我正在核旧案，让她稍候。';a[1]='裴景和退到廊下传话，回来禀说娘娘不肯添披风。我让他把炭盆挪近些。';a[2]='等到第二盏灯换芯，我合起值簿，亲自送人到殿门。昭妃仍站在廊下，听到门响，先把袖中的纸压平。';return a});

replaceParagraph(8,4,4,s=>`${courtTitle(s,'hanzhang')}坐在斜对面，几次望向姐姐。我循着目光看去，昭妃正将右袖拢紧，随即端起酒杯。隔着桌上的菊枝，我没有看清她袖里是什么。`);

CHAPTERS[8].steps[4].choices[0].effects.flags={hanzhangWatchful:true};

replaceParagraph(8,5,0,'宴散后，我从水榭回养心殿。昭妃说前几日送来续看的那一页还留在御案，想取回夹进原册，便跟到廊下。');

replaceParagraph(8,7,2,'裴景和回禀：看守已依例收去发簪与随身物，只留下她请求保留的纸册。他进门时，见她撕下了最后一页。');

replaceParagraph(8,7,6,'她点头，将剩下的册页压在桌边。看守没有给火盆，只从门外送进热水。');

replaceParagraph(8,8,0,'死讯传出后，我准珍妃去看母亲，自己留在拾遗阁外廊。门里先响起蘅嫔的声音：“含章呢？”');

replaceParagraph(8,9,5,'内务府呈来的添炭簿比往日厚了几页。我问起，宫人说蘅嫔常烧旧信，却不许旁人经手。纸灰里是什么，他们也看不清。');

replaceParagraph(8,11,1,'第一杯饮尽，她仍端坐。到第二杯时，手指忽然抖起来，唇边也失了颜色。我叫人传太医，伸手去夺酒杯，她却把壶推到桌的另一端。');

replaceParagraph(8,11,10,'太医赶进来时，她的杯子已经滑下，只滚到御案脚边。救治声乱了一阵，终于有人伏地禀说酒中有毒，已无力回天。我望着那只杯子，没有说话。');

witness(8,12,'治丧后，我去拾遗阁看封院清册。里面的人听到通传，只起身让出一张椅子。');

replaceParagraph(9,1,0,'宴后我在慈宁宫阶前等辇，见和妃从偏廊出来，恰与顺王迎面。两人隔着几步停下，话声被风送到阶上。');

replaceParagraph(9,2,0,'第二日，我在慈宁宫陪太后用茶。方常在来送点心，手里另捏着一根断弦，问方才在廊下弹琴的是谁。');

replaceParagraph(9,2,8,'稍后和妃也来了，方常在把捡弦的事又讲了一遍。和妃正倒茶，水漫过杯沿，宫女提醒才放下壶。');

replaceParagraph(9,5,0,'平反文书拟好，我请皇后、和妃一同在凤仪宫核字。和妃从头看到尾，又翻回名字那一行。');

replaceParagraph(9,5,4,'我随后去了永和宫。她从茶罐底取出那半封旧信，摊在火盆旁，问我是否还需留证。我说卷宗已留抄录，原件由她收处。她这才将纸递入火中。');

replaceParagraph(9,6,2,'离京前，他去慈宁宫辞太后。我送到阶前，和妃正从偏廊出来，两人又在那里停了一次。');

replaceParagraph(9,7,0,'顺王离京后，我与珍妃一道去永和宫送军令抄本。和妃正泡新茶，桌上已不见那只旧铜扣。');

replaceParagraph(9,7,6,'我起身时，珍妃还在向和妃问一名旧掌事的去向。和妃想了一会儿，亲自取纸写下名字，又补了他惯用的别称。');

const CALENDARS=[
 ['元年正月','冬'],['元年三月','春'],['元年四月','春'],['元年七月','夏'],['二年二月','春'],['三年春','春'],['六年夏','夏'],['七年春','春'],['八年春','春'],['九年春','春']
];

function sceneCalendar(ci,si){let [date,season]=CALENDARS[ci]||[CHAPTERS[ci]?.date||'','春'];
 if(ci===5){[date,season]=si<2?['三年春至冬',si===0?'春':'冬']:si===2?['四年秋','秋']:si<7?['五年秋','秋']:['六年六月','夏']}
 if(ci===6){[date,season]=si===0?['六年六月至九月','夏']:si===1?['六年十月','冬']:si<4?['六年十一月','冬']:['六年腊月','冬']}
 if(ci===7){[date,season]=si===0?['七年春至秋','秋']:si===7?['七年腊月','冬']:['七年冬','冬']}
 if(ci===8){[date,season]=si===0?['八年春','春']:si===1?['八年夏末','夏']:si<7?['八年九月','秋']:si<10?['八年九月至十月','秋']:['八年十月','冬']}
 if(ci===9&&si===7)[date,season]=['九年春至岁末','冬'];
 if(ci===10)[date,season]=si<4?['十年五月','夏']:['十年十一月','冬'];
 if(ci===11)[date,season]=si===7?['十一年四月','春']:['十一年春','春'];
 return {date:'承熙'+date,season};
}

const REACTION_BEATS={
 '0-5':['gu',0,'她把册页压平，指尖仍停在折角。'],
 '3-1':['gu',0,'座次图递来时，她又抚平了一次衣襟。'],
 '4-9':['wenheng',3,'接册以后，她把钥匙慢慢收入袖中。'],
 '5-3':['baopu',1,'册子搁在火盆旁，她一页页抚平受潮的纸。'],
 '5-4':['baopu',1,'她仍站在案前，食指一点点抠着指甲边缘。'],
 '6-0':['fang',5,'她把做好的小鞋捧出来，还笑着替针脚辩解。'],
 '6-3':['shen',4,'指腹停在铜扣背面，她没有碰那杯冷茶。'],
 '6-8':['wenheng',3,'梳子放回妆台以后，她的手停在女儿肩头。'],
 '7-2':['hanzhang',2,'那枚棋子悬在棋罐上方，迟迟没有落下。'],
 '7-5':['hanzhang',2,'她垂眼看棋盘，将中央的白棋救活。'],
 '8-2':['wenheng',3,'碗停在桌边，她坐着，没有拿起汤勺。'],
 '9-3':['shen',4,'她把那四个字再看一遍，才慢慢放下纸。'],
 '9-5':['shen',4,'守到最后一角纸烧黑，她才叫人换茶。']
};

function reactionBeat(ci,si){const r=REACTION_BEATS[ci+'-'+si];if(!r)return'';const [key,tile,caption]=r;const name=courtTitle(state,key);return `<figure class="character-beat"><div class="reaction-face" role="img" aria-label="${name}的当下神情" style="--position:${tile%3*50}% ${Math.floor(tile/3)*100}%"></div><figcaption><small>此刻 · ${name}</small><b>一瞬神情</b><p>${caption}</p></figcaption></figure>`}

REACTION_BEATS['4-9']=['wenheng',3,'问到住处，她只说随旨，手仍压在旧木匣上。'];

const baseChildrenView=childrenView;

childrenView=function(){const unborn=CHILDREN.unborn;
 if(!state.flags.baopuPregnant)delete CHILDREN.unborn;
 else if(state.flags.baopuLostChild)CHILDREN.unborn={...unborn,order:'昭妃所怀皇嗣',note:'承熙六年腊月未能存活。玉牒据已呈报的产房记录记存。'};
 try{return baseChildrenView()}finally{CHILDREN.unborn=unborn}
};

const baseAnnalFor=annalFor;

annalFor=function(i){return i===7?'承熙七年，晋珍贵人为珍嫔，准核指定内廷案册。':baseAnnalFor(i)};

let effectsEnabled=(()=>{try{return localStorage.getItem(GAME_CONFIG.storage.effects)!=='off'}catch{return true}})();

function seasonWeather(ci,si,season){const scene=CHAPTERS[ci].steps?.[si];const text=scene?.text(state).join('')||'';const outdoors=/我.*(?:廊|园|宫道)|宴|雪|雨/.test(text);let kind=season==='冬'?'snow':season==='秋'?'leaf':season==='春'?'petal':'rain';if(season==='夏'&&!/雨/.test(text))return'';
 return `<div class="season-weather ${kind} ${outdoors?'':'indoor'}" aria-hidden="true">${Array.from({length:10},(_,i)=>`<i style="--left:${3+(i*29)%93}%;--sway:${(i*19)%51-25}px;--duration:${9+(i*7)%6}s;--delay:-${((i*17)%29)/2}s"></i>`).join('')}</div>`;
}

ambientFx=()=>'';

const baseStoryView=storyView;

storyView=function(){let html=baseStoryView();if((state.index===0&&!state.intro)||state.index>=CHAPTERS.length)return html;const ci=state.index,si=state.chapterStep||0,cal=sceneCalendar(ci,si);
 html=html.replace('<article class="chapter">',`<article class="chapter" data-season="${cal.season}">${seasonWeather(ci,si,cal.season)}`);
 const marker='<div class="scene-progress">';
 const bar=`<div class="season-bar"><b>${cal.season}</b><span>${cal.date}</span><small>${cal.season==='冬'?'窗外寒色，灯下微暖':cal.season==='秋'?'庭叶渐疏，暮色早临':cal.season==='夏'?'日长帘静，暑气渐深':'春光入户，庭草渐生'}</small><button id="toggle-effects" aria-pressed="${effectsEnabled}">特效${effectsEnabled?'开':'关'}</button></div>`;
 html=html.replace(marker,bar+marker);
 const end=html.indexOf('<section class="narrative-turn">')>=0?'<section class="narrative-turn">':'<section class="choices">';
 html=html.replace(end,reactionBeat(ci,si)+end);
 return html;
};

const baseBind=bind;

bind=function(){baseBind();document.body.classList.toggle('effects-off',!effectsEnabled);const btn=document.getElementById('toggle-effects');if(btn)btn.onclick=()=>{effectsEnabled=!effectsEnabled;try{localStorage.setItem(GAME_CONFIG.storage.effects,effectsEnabled?'on':'off')}catch{}document.body.classList.toggle('effects-off',!effectsEnabled);btn.textContent='特效'+(effectsEnabled?'开':'关');btn.setAttribute('aria-pressed',String(effectsEnabled));};};

const LOOKS={daily:'常服',foreign:'异域服饰',court:'盛装',pregnant:'孕期',penitent:'受罚'};

const WARDROBE={baopu:{sheet:'a',row:0,base:1},hanzhang:{sheet:'a',row:1,base:2},wenheng:{sheet:'a',row:2,base:3},gu:{sheet:'b',row:0,base:0},shen:{sheet:'b',row:1,base:4},fang:{sheet:'b',row:2,base:5}};

let wardrobePrefs=(()=>{try{return JSON.parse(localStorage.getItem(GAME_CONFIG.storage.wardrobe)||'{}')||{}}catch{return {}}})();

function automaticLook(k,s=state){
 const rank=s.ranks[k]||PEOPLE[k]?.title||'';
 if(/^废|罪/.test(rank)||(k==='baopu'&&s.flags.baopuAttack&&!s.flags.baopuDead)||(k==='fang'&&s.flags.fangInvestigation==='confine'))return 'penitent';
 if(k==='baopu'&&s.flags.baopuPregnant&&!s.flags.baopuLostChild)return 'pregnant';
 if(k==='fang'&&s.flags.fangPregnant&&!s.flags.fangDead)return 'pregnant';
 if(['baopu','hanzhang','wenheng'].includes(k)&&/待封|未入宫|旧后/.test(rank))return 'foreign';
 if(k==='gu'||rankIndex(rank)>=3)return 'court';
 return 'daily';
}

function selectedLook(k){const saved=wardrobePrefs[k];return Object.hasOwn(LOOKS,saved)?saved:automaticLook(k)}

function wardrobePortrait(k,look,small=false){const w=WARDROBE[k];if(!w)return '';const title=displayRank(k)||PEOPLE[k].title;
 const daily=look==='daily',col={foreign:0,court:1,pregnant:2,penitent:3}[look]??0;
 const pos=daily?`${w.base%3*50}% ${Math.floor(w.base/3)*100}%`:`${col*100/3}% ${w.row*50}%`;
 return `<div class="portrait wardrobe-portrait ${small?'small':''} ${daily?'wardrobe-daily':''}" role="img" aria-label="${PEOPLE[k].name} · ${LOOKS[look]}" style="--wardrobe-image:${daily?'var(--reaction-atlas)':`var(--wardrobe-${w.sheet})`};--wardrobe-size:${daily?'300% 200%':'400% 300%'};--wardrobe-pos:${pos}">${small?'':`<span class="look-caption">${title} · ${LOOKS[look]}</span>`}</div>`;
}

const portraitBeforeWardrobe=portrait;

portrait=function(p,small=false){const k=Object.keys(WARDROBE).find(k=>PEOPLE[k]===p);return k?wardrobePortrait(k,selectedLook(k),small):portraitBeforeWardrobe(p,small)};

function wardrobeControls(k){const current=selectedLook(k),manual=Object.hasOwn(LOOKS,wardrobePrefs[k]);return `<section class="wardrobe-controls"><div class="wardrobe-heading"><h3>衣冠与神情</h3><span>${manual?'手动外观':'随剧情'} · ${LOOKS[current]}</span></div><p>固定人物面容，切换服饰与姿态。手动外观不改变位分或经历。</p><div class="wardrobe-options"><button data-look="auto" data-owner="${k}" aria-pressed="${!manual}"><b>随剧情</b><small>依据位分与已发生的事件</small></button>${Object.entries(LOOKS).map(([look,label])=>`<button data-look="${look}" data-owner="${k}" aria-pressed="${manual&&current===look}">${wardrobePortrait(k,look,true)}<b>${label}</b></button>`).join('')}</div><small class="wardrobe-note">常服适用于低位与日常；嫔位以上自动换盛装。有孕、受罚仅在相关情节发生后自动显示。所有造型均可手动试穿。</small></section>`}

const modalBeforeWardrobe=modal;

modal=function(k){modalBeforeWardrobe(k);if(!WARDROBE[k])return;const d=document.querySelector('#modal');d.insertAdjacentHTML('beforeend',wardrobeControls(k));d.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{const look=b.dataset.look;if(look==='auto')delete wardrobePrefs[k];else wardrobePrefs[k]=look;try{localStorage.setItem(GAME_CONFIG.storage.wardrobe,JSON.stringify(wardrobePrefs))}catch{}d.close();render();modal(k)});};

const peopleBeforeWardrobe=peopleView;

peopleView=function(){return peopleBeforeWardrobe().replace('这里只写你已经见过、或宫中公开可知的信息；尚未登场的人不会提前出现。','点开人物可修改外观；六位主要人物已开放换装。尚未登场的人不会提前出现。')};

const navBeforeWardrobe=nav;

nav=function(){return navBeforeWardrobe().replace('宫廷纪事','宫灯未眠').replace('大晟·承熙','承熙纪事').replace('<nav>','<button class="ghost" id="show-cover">封面</button><nav>')};

let coverPreview=false;

const prologueBeforeWardrobe=prologueView;

prologueView=function(){let content=prologueBeforeWardrobe();const start=content.indexOf('<div class="cover-copy">'),end=content.indexOf('</div>',start)+6;
const copy=`<div class="cover-copy new-cover-copy"><span class="cover-volume">承熙纪事 · 宫廷互动长篇</span><h1>宫灯未眠</h1><p class="cover-theme">宫门之内，恩宠会变，日子仍要过。</p><div class="cover-hook"><p>登基后的第一场家宴散了。</p><p>皇后留下半盏未动的茶，和妃在廊下等着取伞。太后临走前，只问我今夜还忙不忙。</p><p>裴景和提灯近前，低声问：<br><strong>“陛下，往哪一宫？”</strong></p><p>雪还没停。我没有立刻回答。</p></div><div class="cover-tags"><span>皇帝视角</span><span>后宫群像</span><span>岁月与选择</span></div><button id="enter-story" class="enter">${state.intro?'续上这一夜':'提灯入宫'} <span>→</span></button><button class="cover-background-link" id="read-background">先读故事背景</button><small class="cover-footer">从一个夜晚开始，慢慢认得宫里的人。</small></div>`;
content=content.slice(0,start)+copy+content.slice(end);
content=content.replace('一个人要杀死自己多少次，才能成为一个合格的皇帝？','宫门之内，恩宠会变，日子仍要过。');
return content;
};

const storyBeforeWardrobe=storyView;

storyView=function(){return coverPreview?prologueView():storyBeforeWardrobe()};

const bindBeforeWardrobe=bind;

bind=function(){bindBeforeWardrobe();document.title='宫灯未眠 · 承熙纪事';const cover=document.getElementById('show-cover');if(cover)cover.onclick=()=>{coverPreview=true;state.view='story';render();window.scrollTo({top:0,behavior:'smooth'})};
const enter=document.getElementById('enter-story');if(enter)enter.onclick=()=>{coverPreview=false;state.intro=true;state.view='story';save();render();window.scrollTo({top:0,behavior:'smooth'})};
const bg=document.getElementById('read-background');if(bg)bg.onclick=()=>document.querySelector('.background')?.scrollIntoView({behavior:'smooth'});
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{coverPreview=false;state.view=b.dataset.view;save();render()});};

const portraitBeforeV28=wardrobePortrait;

wardrobePortrait=function(k,look,small=false){return portraitBeforeV28(k,look,small).replace(/(style="[^"]*">)/,'$1<span class="wardrobe-art" aria-hidden="true"></span>')};

CHAPTERS[8].steps[4].heading='第五幕 · 重阳宴散';

CHAPTERS[8].steps[4].text=s=>[
'重阳那日，皇后在临水榭设家宴。菊花搬进廊下避风，酒温在小炉上，方常在尝过一块糕，又伸手去拿第二块。和妃用扇柄敲了敲盘沿，她才把手缩回去。',
'昭妃来得迟。她穿了从前常穿的红衣，走到席前先向皇后告罪，说午后睡沉了，没听见宫人来叫。皇后让人给她换一盏温茶，没有追问。',
'她落座时，我看见袖口重新缝过，针脚比另一边紧。她察觉我的目光，将茶盏往袖前挪了一点。',
'“陛下看什么？”',
'“这衣裳穿过几年了。”',
'“臣妾穿旧的，陛下反倒记得。”她笑了笑，“那以后就不做新的了。”',
'方常在把糕递过去。昭妃接了，掰下一小角放在嘴里，却许久没有再动剩下半块。席上说起御园新种的菊，她也接过两句话。',
`${courtTitle(s,'hanzhang')}坐在斜对面，几次抬眼望她。我只当是在看姐姐病后的脸色，便吩咐酒撤下，给两人都换热茶。`,
'散席时，皇后留下核撤席的人数，和妃先陪太后回宫。昭妃走到我身侧，说有一页续写的《承露录》还在御案，想取回去。',
'“明日叫人送给你。”',
'“臣妾自己去取，不费事。”她把两手收进袖中，又问，“陛下今夜，连这一小段路也不得空吗？”',
'我看她片刻，转身下阶：“走吧。”',
`${courtTitle(s,'hanzhang')}将姐姐留在椅背上的披风拿起，跟了出来。园门外，谢绍庭带着侍卫候着。灯笼被风吹向一侧，照不到回廊转角。`
];

CHAPTERS[8].steps[5].heading='第六幕 · 昭妃行刺';

CHAPTERS[8].steps[5].cast=['baopu','hanzhang','xielin','peiyan'];

CHAPTERS[8].steps[5].text=s=>[
'回廊比园中冷。昭妃起初落后半步，走过第二根廊柱时，忽然问我：“陛下还记得，臣妾第一次跳舞是哪一夜？”',
'“七夕。”',
s.flags.qixiNight==='baopu'?'“那夜臣妾问过一句话。”她看着前方，“陛下说过记得。”':'“臣妾那夜一直等着，想问陛下跳得好不好。”她看着前方，“后来人都走了。”',
s.flags.qixiNight==='baopu'?'我记得那夜她拆下银簪，反复问我还记不记得那支舞。我当时答得迟，她却握着那句话安静了许久。':s.flags.qixiNight==='hanzhang'?'那夜我召她妹妹下完残局。她问起那支舞时，我在园门前答过一句好，之后便上了御辇。':'那夜的灯、舞和河水仍记得，宴散后她说过的每一句话，我却未必都能想起。',
'我放慢脚步：“你想说什么？”',
'她也停下。从袖里抽出一张折纸，递到我眼前。我伸手去接，她却没有松开。',
'“臣妾照着记，照着做。”她盯着我的手，“后来连生病都算着日子。臣妾想问一句，到底还差在哪里？”',
'“这些话，进去再说。”',
'“又是等。”',
'她说得很轻。下一瞬，纸从手里落下，右袖里露出一截短刃。刀柄一直藏在收紧的袖口里；她猛地跨近，刀尖直向我胸前送来。',
'我向后退，肩背撞到廊柱。裴景和提灯的手一偏，灯罩磕在柱上，火光骤然晃开。谢绍庭在阶下喝了一声：“护驾！”',
`${courtTitle(s,'hanzhang')}原在后面替姐姐拿披风。她先一步扔下衣裳，横插到两人之间，抬臂挡住刀锋，另一手攥住姐姐持刀的手腕。`,
'布帛裂开的声音近得分明。刀锋偏过去，划开她的小臂，袖口立即洇出一道深色。她没有松手，只往前抵住姐姐，不让刀尖再转回来。',
'“姐姐，松手。”',
'昭妃望着她，像一时没认出面前的人。手腕仍在挣，声音却先变了：“你连这个也要替他拦？”',
'“先放下。”',
'谢绍庭赶到，扣住昭妃右臂，将短刃夺下。两名侍卫把她按离我身前。她挣了一下，发钗落到地上，响得很脆。',
'我仍靠着廊柱。方才接纸的手还抬着，指尖碰到柱上剥落的漆，才发现自己没有放下。',
'昭妃隔着侍卫看我：“这回，陛下总肯看臣妾了。”',
'我没有答她。她妹妹先低头去拾披风，受伤的手使不上力，衣裳又掉回地上。',
'“传太医。”我开口时声音比自己想的低。裴景和连应了两声，转身遣人。廊下所有宫人都跪了，掉在地上的那页纸，被一只湿鞋踩住了边角。'
];

CHAPTERS[8].steps[5].choices[0].label='先稳住廊下的人';

CHAPTERS[8].steps[6].heading='第七幕 · 我的第一道口谕';

CHAPTERS[8].steps[6].text=s=>[
`${courtTitle(s,'hanzhang')}被扶到廊边坐下。她让宫人先去看我，自己用披风压住袖口。谢绍庭把夺下的短刃裹进白布，仍站在原处等令。`,
'昭妃被两名侍卫看住，脸色一点点退白。她想往妹妹那里走，才抬脚便被拦下。',
'“她伤在哪里？”她问。',
'没有人敢替我回答。',
`我走到${courtTitle(s,'hanzhang')}面前。她抬起未伤的手，像要行礼，又停住。`,
'我握住她的指尖：“不用起来。”',
'她怔了一息，将手轻轻抽回：“陛下，先下旨。这里的人都等着。”',
'我回头。谢绍庭仍捧着那块裹刀的白布，裴景和站在半步外，等着记下我这一夜的第一道处置。'
];

CHAPTERS[8].steps[6].narrative=false;

CHAPTERS[8].steps[6].choices=[
 {label:'先送伤者入殿，封锁宫门，分开问话',hint:'先救治，留住在场的人与物证',effects:{trust:{hanzhang:5},flags:{emperorSlipHanzhang:true,promoteHanzhang:true,hanzhangRescuePromotion:true,attackResponse:'care'}},result:s=>`我让人先送${courtTitle(s,'hanzhang')}入最近的偏殿，命谢绍庭封住这段回廊，侍卫、掌灯宫人分别候问。昭妃想开口，被我止住：“你先站着，等太医来。”裴景和将那页沾湿的纸拾起，与短刃分封。太医赶来包扎时，昭妃一直望着偏殿的门，没再挣扎。`},
 {label:'先问昭妃为何持刃，再命人押回看守',hint:'当面问她一句，伤者同时交太医救治',effects:{trust:{hanzhang:3},flags:{emperorSlipHanzhang:true,promoteHanzhang:true,hanzhangRescuePromotion:true,attackResponse:'question'}},result:'我命人送伤者去偏殿，自己留在廊下问：“刀是你带来的？”昭妃低头看空了的右手：“是。”我又问是否有人指使。她忽然笑了一下：“这件事，陛下也觉得臣妾自己做不了？”谢绍庭要喝止，我抬手拦住。半晌，我命她回原宫偏殿看守，衣物与出入册逐项封存，任何人不得擅自问讯。'}
];

CHAPTERS[8].steps[7].text=s=>[
'翌日，谢绍庭把初审记录送到御案。短刃出自昭妃旧物匣，出库时登记为裁纸小刀；当值宫人只核过匣封，没有逐件验看。昨夜的口供分开录下，目前没有查到他人同谋的凭据。',
s.flags.attackResponse==='question'?'昭妃昨夜当面认下持刃，今日也没有改口。记录末尾仍是她那句话：“是我带的。”':'昭妃被看守一夜，最先问的是妹妹伤势。问讯官回禀无碍，她才说刀是自己藏的，与旁人无关。',
'救驾之功另行记奏，依六宫常例晋珍嫔为珍妃。册礼暂缓，先养伤。这道旨意送出时，我没有让它与昭妃的案卷放在同一只匣里。',
'裴景和问昭妃可要见母亲。她说不见；问要不要见妹妹，她把头转开，也说不见。',
'最后她问起那本册子。裴景和照实回说仍在。她便不再说话，只让宫人把窗掩上。',
'问讯、核物、复核口供用了三日。期间皇后送来一次六宫安置单，我只批暂缓；太后让人送来一盏汤，放凉了也没有动。',
'第三日，定案文书停在我案前。昭妃持刃行刺，证物与自供俱在。我看过她画押的末页，才落下朱笔。',
'处置没有向六宫宣读细节。次日，内廷回报昭妃已伏诛。起居注只记了一行，我看着那行字，把原本要添上的话又划掉了。'
];

const annalBeforeV28=annalFor;

annalFor=function(i){return i===8?'承熙八年九月，昭妃于宴后回廊持刃行刺，珍嫔挡刃救驾，晋珍妃。昭妃论罪伏诛。十月，蘅嫔薨。':annalBeforeV28(i)};

render();
