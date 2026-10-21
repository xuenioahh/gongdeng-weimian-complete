(()=>{try{
  document.documentElement.dataset.build='v39';

  const V39_PORTRAITS={};
  Object.entries(V39_PORTRAITS).forEach(([k,src])=>{
    if(!PEOPLE[k])return;
    PEOPLE[k].portraitImage=src;
    PEOPLE[k].noPortrait=false;
    PEOPLE[k].portraitKind=null;
  });

  const portraitBeforeV39=portrait;
  portrait=function(p,small=false){
    if(p?.portraitImage){
      const aria=(p.name||'人物').replace(/"/g,'&quot;');
      return `<div class="portrait newcomer-portrait ${small?'small':''}" aria-label="${aria}画像" style="background-image:url('${p.portraitImage}')"></div>`;
    }
    return portraitBeforeV39(p,small);
  };

  const highMetaV39={
    ning:['太后亲侄女 · 顾氏姻亲','熟礼，但遇到无旧例之事敢自己判断。'],
    ke:['北营勋贵','不善讨巧，谈军粮、边地与骑射比谈首饰自然。'],
    hui:['江南财赋世家','最懂分寸，也最懂怎样让家族关系藏进日常流程。']
  };
  const lowMetaV39={
    cao2:'地方官女 · 稳，记性好，不抢话',
    zhao2:'京官女 · 表面周全，内心清醒',
    lin2:'太医旁支 · 懂一点常见药名',
    ye2:'翰林旁支 · 小楷好，声音轻',
    du2:'漕运官女 · 做事爽利',
    su2:'京畿官女 · 性情平和，会针线与小调'
  };
  const LOW_V39=['cao2','zhao2','lin2','ye2','du2','su2'];

  function ensureLowOrderV39(s=state){
    if(!s.flags.v37LowOrder){
      const a=[...LOW_V39];
      for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
      s.flags.v37LowOrder=a;try{save()}catch(_e){}
    }
    return s.flags.v37LowOrder;
  }
  function highCardV39(k){
    const m=highMetaV39[k]||['',''];
    return `<span class="v39-candidate-card">${portrait(PEOPLE[k])}<b>${PEOPLE[k].name}</b><em>${m[0]}</em><p>${m[1]}</p></span>`;
  }
  function lowCardV39(k){
    return `<span class="v39-low-card">${portrait(PEOPLE[k])}<b>${PEOPLE[k].name}</b><em>${lowMetaV39[k]||'家世清白'}</em></span>`;
  }
  function focusV39(k,tip){
    return `<span class="v39-focus">${portrait(PEOPLE[k])}<span><b>${PEOPLE[k].name}</b><em>${highMetaV39[k]?.[0]||''}</em><p>${tip}</p></span></span>`;
  }

  const selectionV39=CHAPTERS.find(ch=>ch.title==='御前终选');
  if(selectionV39){
    const ask=selectionV39.steps?.find(st=>st.heading?.includes('亲自问最后一题'));
    if(ask){
      ask.text=s=>[
        `体元殿没有鼓乐。太后坐帘后，皇后执名册，我坐在正中。`,
        `<span class="v39-candidate-grid">${['ning','ke','hui'].map(highCardV39).join('')}</span>`,
        `礼部已经看过她们的家世与礼法。到了御前，脸、神情、停顿与回答才第一次同时摆在我面前。现在我真正想知道什么，只能自己问。`
      ];
    }
    const stepN=selectionV39.steps?.find(st=>st.heading?.includes('邵明贞的册页'));
    if(stepN){const old=stepN.text;stepN.text=s=>[focusV39('ning','她与中宫天然亲近。初封太高，会被看作太后外戚再添一层；压得太低，也会被解释成你公开防太后。'),...(typeof old==='function'?old(s):old)];}
    const stepK=selectionV39.steps?.find(st=>st.heading?.includes('霍素英的册页'));
    if(stepK){const old=stepK.text;stepK.text=s=>[focusV39('ke','她背后是北营军功集团。你是在给霍素英本人位置，也是在给北营看新帝如何安置勋贵。'),...(typeof old==='function'?old(s):old)];}
    const stepH=selectionV39.steps?.find(st=>st.heading?.includes('崔静仪的册页'));
    if(stepH){const old=stepH.text;stepH.text=s=>[focusV39('hui','她本人温和，真正有重量的是崔氏在漕运、织造、贡造与内务府供应中的长期关系。'),...(typeof old==='function'?old(s):old)];}
    const low=selectionV39.steps?.find(st=>st.heading?.includes('偏殿还有六个人'));
    if(low){
      low.text=s=>{
        const a=ensureLowOrderV39(s);
        return [
          `高位三册定下以后，偏殿还有六名家世清白、却不足以单独代表一派朝臣的候选。礼部建议“酌留二至五”。`,
          `<span class="v39-low-grid">${a.map(lowCardV39).join('')}</span>`,
          `这一日的终选次序每局都会不同。你现在可以真正看见她们，再决定后宫究竟要充到什么程度。`
        ];
      };
    }
    const end=selectionV39.steps?.find(st=>st.heading?.includes('册书送出体元殿'));
    if(end){
      const old=end.text;
      end.text=s=>{
        const base=typeof old==='function'?old(s):old;
        const kept=['ning','ke','hui',...(s.flags.lowConsorts||[])];
        return [
          `<span class="v39-selected-strip">${kept.map(k=>`<span>${portrait(PEOPLE[k])}${courtTitle(s,k)||s.ranks[k]||PEOPLE[k].name}</span>`).join('')}</span>`,
          ...base
        ];
      };
    }
  }

  // ---- 位分 / 封号审计：选秀之后的所有选项与结果，不再写死默认“徽/晋/元” ----
  function titleTokenV39(str,s=state){
    if(typeof str!=='string')return str;
    return str
      .replace(/(?:徽|纯)(?:贵人|嫔|妃|贵妃|皇贵妃)/g,()=>courtTitle(s,'ning'))
      .replace(/(?:晋|毅)(?:贵人|嫔|妃|贵妃|皇贵妃)/g,()=>courtTitle(s,'ke'))
      .replace(/(?:元|贞)(?:贵人|嫔|妃|贵妃|皇贵妃)/g,()=>courtTitle(s,'hui'));
  }
  function dynamicChoiceFieldV39(c,field){
    const d=Object.getOwnPropertyDescriptor(c,field);
    if(d?.get){
      const g=d.get;
      Object.defineProperty(c,field,{configurable:true,enumerable:true,get(){return titleTokenV39(g.call(c),state)}});
      return;
    }
    const v=c[field];
    if(typeof v==='string' && /[徽纯晋毅元贞](?:贵人|嫔|妃|贵妃|皇贵妃)/.test(v)){
      Object.defineProperty(c,field,{configurable:true,enumerable:true,get(){return titleTokenV39(v,state)}});
    } else if(typeof v==='function'){
      c[field]=function(s){return titleTokenV39(v.call(this,s),s||state)};
    }
  }
  const selIndexV39=CHAPTERS.findIndex(ch=>ch.title==='御前终选');
  CHAPTERS.slice(Math.max(selIndexV39+1,0)).forEach(ch=>{
    (ch.steps||[]).forEach(st=>{
      (st.choices||[]).forEach(c=>{dynamicChoiceFieldV39(c,'label');dynamicChoiceFieldV39(c,'hint');dynamicChoiceFieldV39(c,'result');});
    });
  });

  // 三个最容易穿帮的承熙三年选项，直接改成实时称谓。
  const yearsV39=CHAPTERS.find(ch=>ch.title==='宫灯渐繁');
  if(yearsV39){
    (yearsV39.steps||[]).forEach(st=>{
      (st.choices||[]).forEach(c=>{
        if(c.effects?.flags?.year3Favor==='hui'){
          Object.defineProperty(c,'label',{configurable:true,enumerable:true,get(){return `多召${courtTitle(state,'hui')}`;}});
          c.result=s=>`${courtTitle(s,'hui')}没有显出得意，只让住处的香换得更淡。昭氏却在下一次请安时穿了最醒目的红，笑着问${courtTitle(s,'hui')}“江南是不是连月亮都比宫里香”。满殿都听出那句话不是在夸月亮。`;
        }
        if(c.effects?.flags?.year3Favor==='baopu'){
          c.result=s=>`${courtTitle(s,'baopu')}很快把这个月记满《承露录》。她笑得比从前更有底气，连新来的${courtTitle(s,'ning')}都被她拉去看新裁的舞衣。蘅嫔看见后没有阻止，只提醒她“越得宠，越要想下一步”。`;
        }
      });
    });
  }

  // 展示层最后一道保险：人物页、侧栏、册封结果统一由 state.ranks + titlePrefixes 决定。
  displayRank=function(k,s=state){return courtTitle(s,k)};

  try{save();render()}catch(_e){}
}catch(e){console.error('v39 portrait/title audit patch failed',e)}})();
