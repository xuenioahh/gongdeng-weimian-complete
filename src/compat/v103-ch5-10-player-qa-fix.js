(()=>{try{
  const BUILD103='v103';
  const CH=t=>CHAPTERS.find(c=>c.title===t);
  const ST=(ch,q)=>ch?.steps?.find(st=>String(st.heading||'').includes(q));
  const asArray=v=>Array.isArray(v)?v:[v];

  function patchText(st,key,transform){
    if(!st||!st.text)return;
    const old=st.text;
    if(old&&old.__v103PatchKey===key)return;
    const wrapped=s=>{
      const raw=typeof old==='function'?old(s):old;
      const arr=asArray(raw).map(x=>transform(String(x),s)).filter(x=>String(x).trim());
      return Array.isArray(raw)?arr:arr[0];
    };
    wrapped.__v103PatchKey=key;
    st.text=wrapped;
  }

  function applyV103Fixes(){
    // 章节桥接兼容：旧渲染器只接受函数。第7章和第11章原本是字符串，跨章时会留下上一幕的旧画面。
    for(const c of CHAPTERS){
      if(c?.bridge&&typeof c.bridge!=='function'){
        const value=String(c.bridge);
        c.bridge=()=>value;
      }
    }

    // 第5章：删掉两处重复句，并把并未跨章的按钮改成真实动作。
    const c5=CH('母至');
    patchText(ST(c5,'宣召夜'),'v103-c5-stand-dup',(x)=>x.replace(
      '她站着，我便没有再说第二遍“坐”。她站着，我便没有再说第二遍“坐”。',
      '她站着，我便没有再说第二遍“坐”。'
    ));
    patchText(ST(c5,'多出来的一把椅子'),'v103-c5-seat-dup',(x)=>x.replace(
      '皇后把三份旧例并排铺开，看了许久。皇后把三份旧例并排铺开，看了许久也没敢擅改。',
      '皇后把三份旧例并排铺开，看了许久也没敢擅改。'
    ));
    const c5Seat=ST(c5,'多出来的一把椅子');
    if(c5Seat?.choices?.[0])c5Seat.choices[0].label='继续';

    // 第7章：昭氏的动态称谓不能在页面初始化时就被固化；低位留牌人数也不能硬写成“六”。
    const c7=CH('宫灯渐繁');
    const favor=ST(c7,'新人入宫后的第一个月');
    const baopuChoice=favor?.choices?.find(x=>x?.effects?.flags?.year3Favor==='baopu');
    if(baopuChoice){
      const desc=Object.getOwnPropertyDescriptor(baopuChoice,'label');
      if(!desc?.get){
        Object.defineProperty(baopuChoice,'label',{configurable:true,enumerable:true,get(){
          const t=typeof courtTitle==='function'?courtTitle(state,'baopu'):(state.ranks?.baopu||PEOPLE?.baopu?.title||'昭氏');
          return `多召${t||'昭氏'}`;
        }});
      }
    }
    const rain=ST(c7,'一场骤雨，低位宫里');
    if(rain)rain.heading='承熙三年七月 · 一场骤雨，低位宫里各忙各的';
    const papers=ST(c7,'六张小纸')||ST(c7,'几张没有写进史书的小纸');
    if(papers){
      papers.heading='承熙三年三月至七月 · 几张没有写进史书的小纸';
      patchText(papers,'v103-c7-low-count',(x)=>x.replace(
        '四月，凤仪宫收到六份“初次承宠以后是否加例”的请示。',
        '四月，凤仪宫收到一摞“初次承宠以后是否加例”的请示。'
      ));
    }

    // 第8章：后面还有两幕，不能提前告诉玩家“翻到下一章”。
    const c8=CH('香尽胎寒');
    const tryAgain=ST(c8,'她还会再求一个孩子');
    if(tryAgain?.choices?.[0])tryAgain.choices[0].label='继续';

    // 第10章：清掉误留的幕次编号、错误跨章文案与极刑分支的重复叙述。
    const c10=CH('刃落宫门');
    const tell=ST(c10,'她拿妹妹藏过的香丸去告妹妹');
    if(tell)tell.heading='她拿妹妹藏过的香丸去告妹妹';
    const ashes=ST(c10,'余烬');
    if(ashes?.choices?.[0])ashes.choices[0].label='继续养伤';
    patchText(ST(c10,'处置落定'),'v103-c10-extreme-dup',(x)=>x.replace(
      '行刑细节没有写进宫史。六宫只知道那日宫门比平常早关一个时辰，刑部的人来过两趟。行刑那日宫门早关一个时辰。刑部的人来过两趟，六宫没有人再提那道刑名。',
      '行刑细节没有写进宫史。那日宫门比平常早关一个时辰，刑部的人来过两趟，六宫没有人再提那道刑名。'
    ));
  }

  // 存档提醒收紧：前十章仅保留会明显改变长期路线/人物结局的五处。
  const SAVE_POINTS=new Map([
    ['灯下弈::宴散以后','七夕夜的去处会明显改变几条长期关系线。'],
    ['御前终选::我亲自问最后一题','接下来会连续决定终选、初封与低位留牌；若想比较不同的后宫构成，可以在这里留一档。'],
    ['宫灯渐繁::承熙四年二月 · 蘅嫔是不是只剩一个名位','是否真正进入承宠册，会改变蘅嫔之后的家庭与皇嗣线。'],
    ['刃落宫门::你还在流血，她已经被按在地上','格杀、亲审或交刑部，会直接改变昭氏最后的处置与后续证词。'],
    ['刃落宫门::二十三日以后，蘅嫔还要不要继续做蘅嫔','退居、离京或照旧留宫，会决定蘅嫔最后的去处与生死。']
  ]);
  function applyV103Reminder(){
    document.querySelectorAll('.v103-save-reminder').forEach(x=>x.remove());
    const c=CHAPTERS[state.index],st=c?.steps?.[state.chapterStep||0];
    const key=c&&st?`${c.title}::${st.heading}`:'';
    const reason=SAVE_POINTS.get(key);
    const old=document.querySelector('.v102-save-reminder');
    if(!reason){ if(old)old.remove(); return; }
    if(old){ old.remove(); }
    const choices=document.querySelector('.choices');
    if(!choices)return;
    const box=document.createElement('div');
    box.className='v102-save-reminder v103-save-reminder';
    box.innerHTML=`<div><b>关键分岔 · 可考虑存档</b><p>${reason}<br>想之后回来看另一条路线时，再留手动档即可。</p></div><button type="button">打开存档栏</button>`;
    box.querySelector('button').onclick=()=>document.querySelector('#v52-archives')?.click();
    choices.parentNode.insertBefore(box,choices);
  }

  const previousStoryView103=storyView;
  storyView=function(){applyV103Fixes();let h=previousStoryView103();h=h.replace(/(<h2 class=\"scene-title\"[^>]*>)([\s\S]*?)(<\/h2>)/,(_,a,t,b)=>a+t.replace('承熙五年，拾遗阁的灯','承熙五年，昭氏开始把“有没有孩子”当成考试')+b);return h;};
  // Display revision is applied at bootstrap; settlement never rewrites it.


  const previousRender103=render;
  render=function(){
    applyV103Fixes();
    const out=previousRender103();
    applyV103Fixes();
    applyV103Reminder();
    document.documentElement.dataset.build=BUILD103;
    document.title='宫灯未眠 · 第5至10章玩家测试修复 v103';
    return out;
  };

  applyV103Fixes();
  try{render()}catch(e){console.error('v103 initial render failed',e)}
  document.documentElement.dataset.build=BUILD103;
  document.title='宫灯未眠 · 第5至10章玩家测试修复 v103';
}catch(e){console.error('v103 chapter 5-10 player QA patch failed',e)}})();
