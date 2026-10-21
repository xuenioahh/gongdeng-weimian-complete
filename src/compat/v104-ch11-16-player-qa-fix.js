(()=>{try{
  const BUILD104='v104';
  const CH=t=>CHAPTERS.find(c=>c.title===t);
  const ST=(ch,q)=>ch?.steps?.find(st=>String(st.heading||'').includes(q));
  const asArray=v=>Array.isArray(v)?v:[v];

  function patchText(st,key,transform){
    if(!st||!st.text)return;
    const old=st.text;
    if(old&&old.__v104PatchKey===key)return;
    const wrapped=s=>{
      const raw=typeof old==='function'?old(s):old;
      const arr=asArray(raw).map(x=>transform(String(x),s)).filter(x=>String(x).trim());
      return Array.isArray(raw)?arr:arr[0];
    };
    wrapped.__v104PatchKey=key; st.text=wrapped;
  }
  function moveByHeadings(ch,headings){
    if(!ch)return;
    const map=new Map((ch.steps||[]).map(st=>[st.heading,st]));
    const ordered=headings.map(h=>map.get(h)).filter(Boolean);
    const used=new Set(ordered);
    ch.steps=[...ordered,...(ch.steps||[]).filter(st=>!used.has(st))];
  }
  function relocateHeading(title,heading){
    // 先限定章节再找幕名。像“新茶”这样的标题在不同章节会重复，若全书先搜会把玩家送回旧章。
    const ci=CHAPTERS.findIndex(c=>c.title===title);
    if(ci>=0){
      const j=(CHAPTERS[ci].steps||[]).findIndex(st=>st.heading===heading);
      state.index=ci;
      state.chapterStep=j>=0?j:Math.min(state.chapterStep||0,Math.max(0,(CHAPTERS[ci].steps||[]).length-1));
      return;
    }
    if(!heading)return;
    for(let i=0;i<CHAPTERS.length;i++){
      const j=(CHAPTERS[i].steps||[]).findIndex(st=>st.heading===heading);
      if(j>=0){state.index=i;state.chapterStep=j;return;}
    }
  }

  function applyV104Fixes(){
    // 第11章：这里并没有翻章，后面仍有“夏末 · 新茶”一幕。
    const c11=CH('旧茶未凉');
    const falseTurn=ST(c11,'闻人局散了，沈氏旧案也落了地');
    if(falseTurn?.choices?.[0])falseTurn.choices[0].label='继续';
    // 夏末新茶这一幕发生在承熙九年；张元照尚未参加第二次采选，不能提前出现在宫里。
    patchText(ST(c11,'夏末 · 新茶第一次被人嫌难喝'),'v104-c11-zhang-anachronism',(x)=>{
      const lateZhang=[
        '王静娴看见张元照','“不写会忘。”','王静娴笑：“臣妾是不敢什么都写。”',
        '“怕被人拿走？”','“也怕自己哪天看见白纸黑字','张元照没有反驳',
        '“什么？”','“这壶茶难喝。”','王静娴终于笑出声'
      ];
      return lateZhang.some(k=>x.includes(k))?'':x;
    });

    // 第12章：调查日序重新按第三日→第五/六日→第八日→第十日排列。
    const c12=CH('听雨轩有喜');
    if(c12){
      const aftermathAt=(c12.steps||[]).findIndex(st=>String(st.heading||'').includes('方小满死后第三日'));
      const first=(c12.steps||[]).slice(0,aftermathAt<0?11:aftermathAt);
      const by=q=>(c12.steps||[]).find(st=>String(st.heading||'').includes(q));
      const byId=id=>(c12.steps||[]).find(st=>st.v93id===id);
      const tail=[
        by('方小满死后第三日'),
        by('第五日 · 先问库房'),
        byId('fang-seal')||by('第六日 · 红纸小印'),
        by('小灰又回了花房'),
        by('第八日 · 崔静仪单独'),
        by('第八日 · 三张新规'),
        byId('fang-provisional')||by('第十日 · 直接经手'),
        by('听雨轩落锁以后')
      ].filter(Boolean);
      c12.steps=[...first,...tail];
      const cat=ST(c12,'小灰又回了花房');
      if(cat)cat.heading='封院第六日 · 小灰又回了花房';
    }
    patchText(ST(c12,'她第一次知道“对我好”不能作证'),'v104-c12-repeat',(x)=>x.replace(
      '回去以后，她让阿芙把这些年收到的礼盒全搬出来重新登记。太迟了。但回去以后，她让阿芙把这些年收到的礼盒全搬出来重新登记。阿芙问：',
      '回去以后，她让阿芙把这些年收到的礼盒全搬出来重新登记。已经太迟了。阿芙问：'
    ));

    // 第15/16章原先彼此重叠：15章已到七月底，16章又倒回六月。
    // 15章保留五月至六月中旬的人物落脚；六月末—七月的生活段并入16章，按日期顺排。
    const c15=CH('窗开半扇'), c16=CH('荷风满座');
    if(c15&&c16){
      const old15=[...(c15.steps||[])], old16=[...(c16.steps||[])];
      // 已经搬进第16章的幕次，下次 render 时不能只回第15章找，否则会被下一轮重排吞掉。
      const find15=q=>old15.find(st=>String(st.heading||'').includes(q))||old16.find(st=>String(st.heading||'').includes(q));
      const find16=q=>old16.find(st=>String(st.heading||'').includes(q))||old15.find(st=>String(st.heading||'').includes(q));
      const early15=old15.slice(0,8);
      c15.steps=early15;
      c15.date='承熙十一年·五月至六月中旬';
      const last15=c15.steps[c15.steps.length-1];
      if(last15?.choices?.[0])last15.choices[0].label='翻到六月下旬';

      const order16=[
        find16('请安散后，廊下还挤着新鞋'),
        find16('冰在谁的宫门前先化'),
        find16('大公主借走一阵风'),
        find16('景阳宫的竹叶第一次转起来'),
        find16('荷风宴，灯从水面一盏盏亮'),
        find16('一张宴席，几处故乡'),
        find16('景阳宫窗沿那只麻雀'),
        find15('六月末 · 宋氏第一次发现'),
        find15('碎瓷落地以后'),
        find15('七月初 · 许氏终于敢'),
        find15('那本只写自己的小册子'),
        find15('宫道尽头，两种记法'),
        find16('那个月，景阳宫的灯亮得比从前多'),
        find15('七月廿三 · 她第一次把一张表撕了'),
        find16('三十日以后，留下来的只有两样'),
        find15('七月尽头，窗仍开着半扇'),
        find16('七月尽头，蝉声忽然停了一刻')
      ].filter(Boolean);
      c16.steps=order16;
      c16.date='承熙十一年·六月下旬至七月';
    }
    const julyWindow=ST(c16,'七月尽头，窗仍开着半扇');
    patchText(julyWindow,'v104-july-window',(x)=>{
      x=x.replace('六月末已经闷热。','七月尽头已经闷热。');
      if(x.includes('七月最后一夜，张元照的小方格里还写着'))return '';
      if(x.includes('第二天是八月初一。晨起风里有了凉意。'))return '';
      return x;
    });
    if(julyWindow?.choices?.[0])julyWindow.choices[0].label='继续';
  }

  const SAVE_POINTS104=new Map([
    ['听雨轩有喜::雪落宫墙','这里是在“最后一面”和“追住仍在逃的证人”之间二选一，结果不可同时得到。'],
    ['空宫点灯::“孩子还小”','三皇子是否真正承担后果，会影响他之后如何理解身份、错误与母后的庇护。']
  ]);
  function applyV104Reminder(){
    document.querySelectorAll('.v104-save-reminder').forEach(x=>x.remove());
    if(state.view!=='story')return;
    const c=CHAPTERS[state.index],st=c?.steps?.[state.chapterStep||0];
    const reason=c&&st?SAVE_POINTS104.get(`${c.title}::${st.heading}`):null;
    if(!reason)return;
    const choices=document.querySelector('.choices')||document.querySelector('.narrative-turn');
    if(!choices)return;
    const box=document.createElement('div');
    box.className='v102-save-reminder v104-save-reminder';
    box.innerHTML=`<div><b>关键分岔 · 可考虑存档</b><p>${reason}<br>只在想回看另一条结果时留手动档即可。</p></div><button type="button">打开存档栏</button>`;
    box.querySelector('button').onclick=()=>document.querySelector('#v52-archives')?.click();
    choices.parentNode.insertBefore(box,choices);
  }

  const initialTitle=CHAPTERS[state.index]?.title||'';
  const initialHeading=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
  applyV104Fixes(); relocateHeading(initialTitle,initialHeading);

  const previousEffects104=applyChoiceEffects;
  applyChoiceEffects=function(c){
    // 旧补丁可能在结算 effects 时重新插入/移动幕次。先记住玩家当前真正所在的幕，
    // 重排后再把数字下标锚回这一幕，随后原 choose() 的 +1 才会落到正确的下一幕。
    const titleBefore=CHAPTERS[state.index]?.title||'';
    const headingBefore=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
    const out=previousEffects104(c);
    if(!globalThis.__canonicalStory155){applyV104Fixes(); relocateHeading(titleBefore,headingBefore);}
    return out;
  };
  function directV104(){
    try{
      if(typeof stopVoice==='function')stopVoice();
      const app=document.querySelector('#app');if(!app)return;
      app.innerHTML=nav()+(state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView());
      bind(); applyV104Reminder();
    }catch(e){console.error('v104 direct render failed',e)}
  }
  const previousRender104=render;
  render=function(){
    applyV104Fixes();
    const titleBefore=CHAPTERS[state.index]?.title||'', headingBefore=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
    let out;
    try{out=previousRender104();}catch(e){console.warn('v104 intercepted legacy render error',e)}
    applyV104Fixes(); relocateHeading(titleBefore,headingBefore); directV104();
    document.documentElement.dataset.build=BUILD104;
    document.title='宫灯未眠 · 第11至16章玩家测试修复 v104';
    return out;
  };
  try{save()}catch(_e){};
  try{render()}catch(e){console.error('v104 initial render failed',e)}
  document.documentElement.dataset.build=BUILD104;
  document.title='宫灯未眠 · 第11至16章玩家测试修复 v104';
}catch(e){console.error('v104 chapter 11-16 player QA patch failed',e)}})();
