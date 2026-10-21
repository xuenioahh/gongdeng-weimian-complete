function clean(t){let v=String(t??'');for(const [a,b]of swaps)v=v.split(a).join(b);v=v.replace(/<(?:span|div)\b[^>]*class="[^"]*(?:faction-note|motive-note|poison-trace|v42-oldplot)[^"]*"[^>]*>[\s\S]*?<\/(?:span|div)>/g,'');return v;}

for(const c of CHAPTERS){if(c.bridge){const old=c.bridge;c.bridge=s=>clean(typeof old==='function'?old(s):old);}for(const st of c.steps){const old=st.text;st.text=s=>{const a=typeof old==='function'?old(s):old;return (Array.isArray(a)?a:[a]).map(clean).filter(Boolean);};for(const ch of st.choices||[]){if(typeof ch.result==='function'){const old=ch.result;ch.result=s=>clean(old(s));}else if(ch.result)ch.result=clean(ch.result);if(ch.hint&&/日后|将会|注定|结局|主线|支线|后期|后续|伏笔/.test(ch.hint))ch.hint='';}}}

const neutral={'香尽胎寒':'冬日问安','刃落宫门':'长廊夜雨','凤仪宫最后一冬':'凤仪宫冬日'};

function neutralize(h){for(const [a,b] of Object.entries(neutral))h=h.split(a).join(b);return h;}

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

prologueView=function(){return `<main class="prologue"><section class="prologue-cover v52-cover"><div class="cover-copy new-cover-copy"><span class="cover-volume">承熙纪事 · 后宫群像</span><h1>宫灯未眠</h1><p class="cover-theme">“陛下，今夜往哪一宫？”</p><button id="enter-story" class="enter">${state.intro?'续上灯火':'提灯入宫'} →</button><button class="cover-background-link" id="v52-background">故事背景</button></div></section></main>`;};
