(()=>{try{
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const ST=(ch,q)=>ch?.steps?.find(x=>String(x?.heading||'').includes(q));
  const findLoc=q=>{for(let ci=0;ci<CHAPTERS.length;ci++){const si=CHAPTERS[ci].steps?.findIndex(x=>String(x?.heading||'').includes(q))??-1;if(si>=0)return {ch:CHAPTERS[ci],ci,si,st:CHAPTERS[ci].steps[si]};}return null};
  function take(ch,q){if(!ch)return null;const i=ch.steps.findIndex(x=>String(x?.heading||'').includes(q));if(i<0)return null;return ch.steps.splice(i,1)[0]}
  function insertBefore(ch,targetQ,step){if(!ch||!step)return;const i=ch.steps.findIndex(x=>String(x?.heading||'').includes(targetQ));ch.steps.splice(i<0?ch.steps.length:i,0,step)}
  function insertAfter(ch,targetQ,step){if(!ch||!step)return;const i=ch.steps.findIndex(x=>String(x?.heading||'').includes(targetQ));ch.steps.splice(i<0?ch.steps.length:i+1,0,step)}
  function moveBefore(ch,movingQ,targetQ){insertBefore(ch,targetQ,take(ch,movingQ))}
  function moveAfter(ch,movingQ,targetQ){insertAfter(ch,targetQ,take(ch,movingQ))}
  function patchText(ch,q,key,fn){
    const st=ST(ch,q);if(!st)return;
    if(st.text&&st.text.__v102key===key)return;
    const old=st.text;
    const wrapped=s=>{const raw=typeof old==='function'?old(s):old;const a=Array.isArray(raw)?raw:[raw];return a.map(x=>fn(String(x),s));};
    wrapped.__v102key=key;st.text=wrapped;
  }
  function moveGlobalAfter(q,targetCh,targetQ){const loc=findLoc(q);if(!loc||!targetCh)return null;const step=loc.ch.steps.splice(loc.si,1)[0];insertAfter(targetCh,targetQ,step);return step}
  function applyV102Fixes(){
    const ch0=CH('宫门初定'),ch1=CH('拾遗阁开门'),ch2=CH('一碟杏仁酥'),ch3=CH('灯下弈'),ch4=CH('母至');

    // 第一章：月份与幕次回到正序。
    if(ch0){
      moveBefore(ch0,'正月初九','正月里的人情');
      moveBefore(ch0,'正月二十八','第一笔位分');
      moveBefore(ch0,'二月十二','二月十四');
      moveAfter(ch0,'雪停之后','二月十四');
      const snow=ST(ch0,'雪停之后');if(snow)snow.heading='二月下旬 · 雪停之后';
      patchText(ch0,'凤仪宫的一叠册页','ch0-fengyi-date',x=>x.replace('二月以后，日头终于能照进凤仪宫东窗。','正月中旬以后，日头终于能照进凤仪宫东窗。'));
      patchText(ch0,'雪停之后','ch0-snow-date',x=>x.replace('正月最后一场雪停在月底。','二月十五以后，宫墙根最后一层残雪一天天化开。').replace('二月初，礼部送来一封边报。','二月十六，礼部送来一封边报。'));
    }

    // 第二章的冬日“回雪灯”移到七夕卷年末。
    if(ch1&&ch3){
      const loc=findLoc('回雪灯只有一盏');
      if(loc){
        const step=loc.st;
        if(loc.ch!==ch3 || ch3.steps.indexOf(step)!==ch3.steps.findIndex(x=>String(x.heading||'').includes('七夕之后'))+1){
          loc.ch.steps.splice(loc.si,1);insertAfter(ch3,'七夕之后',step);
        }
        step.heading='腊月 · 蘅国的回雪灯只有一盏';
        if(!(step.text&&step.text.__v102key==='snowlamp-date')){
          const old=step.text;const wrapped=s=>{const raw=typeof old==='function'?old(s):old;const a=Array.isArray(raw)?raw:[raw];return a.map(x=>String(x).replace('那年入冬后的第一场雪，','腊月中旬落了一场雪，'))};wrapped.__v102key='snowlamp-date';step.text=wrapped;
        }
      }
      patchText(ch3,'七夕之后','ch3-letter-date',x=>x.replace('腊月里，拾遗阁收到一封蘅地来信。','腊月初，拾遗阁收到一封蘅地来信。'));
      if(ch3.bridge&&typeof ch3.bridge!=='function'){const b=String(ch3.bridge);ch3.bridge=()=>b;}
    }

    // 第三章：四月至六月不再插入秋夜，也不再五月后退回四月底。
    if(ch2){
      moveAfter(ch2,'小灰病了一晚','一场春雨');
      patchText(ch2,'一场春雨','ch2-rain-date',x=>x.replace('五月的雨从午后一直下到掌灯。','四月中旬的雨从午后一直下到掌灯。'));
      patchText(ch2,'小灰病了一晚','ch2-cat-date',x=>x.replace('册封后的第一个秋雨夜，','四月下旬一个雨夜，'));
    }

    // 第五章：去掉旧版重复的第三日晚膳，保留新版银簪冲突；第六日看梅先于第七日。
    if(ch4){
      const old=ch4.steps.findIndex(x=>String(x.heading||'').includes('一碗汤凉在三个人中间'));if(old>=0)ch4.steps.splice(old,1);
      moveAfter(ch4,'银簪落在茶盏旁','饭后看一圈');
      moveBefore(ch4,'两位母亲看梅','七日里');
      ch4.date='承熙二年·二月至冬';
      ch4.bridge=()=>`七夕以后，旧后与两个女儿靠每月一封家书维系来往。入冬她病了一场，闻人抱朴送药，闻人含章递方；太后听说后沉默许久。开春白梅将开，她终于开口：“让人进来看看女儿吧。”这才有了二月这次入宫。`;
    }
  }
  function restorePosition(title,heading){
    if(!heading)return;
    let ci=CHAPTERS.findIndex(c=>c.title===title),si=ci>=0?CHAPTERS[ci].steps.findIndex(x=>x.heading===heading):-1;
    if(si<0){for(let j=0;j<CHAPTERS.length;j++){const k=CHAPTERS[j].steps.findIndex(x=>x.heading===heading||String(x.heading||'').includes(heading.replace(/^.*?·\s*/,'')));if(k>=0){ci=j;si=k;break}}}
    if(si<0&&heading.includes('一碗汤凉在三个人中间')){ci=CHAPTERS.findIndex(c=>c.title==='母至');si=ci>=0?CHAPTERS[ci].steps.findIndex(x=>String(x.heading||'').includes('银簪落在茶盏旁')):-1;}
    if(ci>=0&&si>=0){state.index=ci;state.chapterStep=si;}
  }

  const SAVE_HINTS={
    '宫门初定::第一夜':'第一次关系分流：今夜去处会改变早期亲近与信任。',
    '宫门初定::第一笔位分':'第一次权力分配：宫务、位分与几个人的关系会从这里分开。',
    '宫门初定::双生之后，周嫔的位分也不能自动往前':'周清漪的位分会从这里分流，后续称谓与座次随之改变。',
    '拾遗阁开门::一道门怎么分':'闻人姐妹的居住方式会改变后续相处文本。',
    '拾遗阁开门::第一份册封':'姐妹的第一份正式位分会改变称谓、座次与后续反应。',
    '一碟杏仁酥::离开宫女籍之前，我先问她愿不愿意':'方小满正式离开宫女籍；三种处理会留下不同的关系记录。',
    '一碟杏仁酥::恩宠比春风快':'是否替听雨轩挡人情，会改变方小满与阿芙之后的应对方式。',
    '灯下弈::宴散以后':'七夕夜的去处是关系线的重要分流。',
    '母至::册页上那一行不能由皇后替我写':'蘅嫔入册方式会决定她保留多少旧国痕迹。',
    '母至::蘅嫔往后住哪里':'住处会改变母女往来与之后的宫中动线。'
  };
  function injectSaveReminder(){
    document.querySelectorAll('.v102-save-reminder').forEach(x=>x.remove());
    if(state.view!=='story')return;
    const c=CHAPTERS[state.index],st=c?.steps?.[state.chapterStep||0];if(!c||!st)return;
    const reason=SAVE_HINTS[`${c.title}::${st.heading}`];if(!reason)return;
    const choices=document.querySelector('.choices');if(!choices)return;
    const box=document.createElement('div');box.className='v102-save-reminder';
    box.innerHTML=`<div><b>关键节点 · 建议先存档</b><p>${reason}<br>每次落子会覆盖自动存档；若想之后回看另一条路线，请先留一个手动档。</p></div><button type="button">打开存档栏</button>`;
    box.querySelector('button').onclick=()=>document.querySelector('#v52-archives')?.click();choices.parentNode.insertBefore(box,choices);
  }
  function directV102(){
    try{
      if(typeof stopVoice==='function')stopVoice();
      const app=document.querySelector('#app');if(!app)return;
      app.innerHTML=nav()+(state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView());
      bind();if(typeof maybeAutoplayVoice==='function')maybeAutoplayVoice();injectSaveReminder();
    }catch(e){console.error('v102 direct render',e)}
  }

  const style=document.createElement('style');
  style.textContent=`.v102-save-reminder{margin:22px 0 8px;padding:14px 16px;border:1px solid #c6a15a;border-left:4px solid #9b6b34;background:#fbf4e4;display:flex;gap:16px;align-items:center;justify-content:space-between}.v102-save-reminder b{color:#7f3c31;letter-spacing:.06em}.v102-save-reminder p{margin:4px 0 0;color:#6d6558;font-size:.9rem;line-height:1.65}.v102-save-reminder button{flex:0 0 auto;border:1px solid #a9874d;background:#fffaf0;padding:9px 12px;cursor:pointer}.v102-save-reminder button:hover{background:#213b38;color:#fff}@media(max-width:700px){.v102-save-reminder{align-items:stretch;flex-direction:column}.v102-save-reminder button{width:100%}}`;
  document.head.appendChild(style);

  // 旧渲染器会在后期补丁重写章节后先跑一次 storyView；每次进入故事渲染前先恢复 v102 的章节结构，避免临时幕数越界或 bridge 类型不一致。
  const previousStoryView=storyView;
  storyView=function(){applyV102Fixes();return previousStoryView();};

  // applyChoiceEffects 在旧补丁中会重跑语言整理；这里确保它返回前把前五章顺序重新固定。
  // Display revision is applied at bootstrap; settlement never rewrites it.


  const previousRender=render;
  render=function(){
    const titleBefore=CHAPTERS[state.index]?.title||'',headingBefore=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
    let out;
    try{out=previousRender();}catch(e){console.warn('v102 intercepted legacy render error',e);}
    applyV102Fixes();restorePosition(titleBefore,headingBefore);directV102();
    document.documentElement.dataset.build='v102';document.title='宫灯未眠 · 前五章玩家测试修复 v102';return out;
  };

  const initTitle=CHAPTERS[state.index]?.title||'',initHeading=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
  applyV102Fixes();restorePosition(initTitle,initHeading);
  try{save()}catch(_e){};directV102();document.documentElement.dataset.build='v102';document.title='宫灯未眠 · 前五章玩家测试修复 v102';
}catch(e){console.error('v102 first-five player QA failed',e)}})();
