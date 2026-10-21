(()=>{try{
  document.documentElement.dataset.build='v86';
  document.title='宫灯未眠 · 发布前总检与入宫分支锁定 v86';
  state.flags=state.flags||{};

  const LOW86=['cao2','zhao2','lin2','ye2','du2','su2'];
  const LOW_NAMES86={cao2:'何超英',zhao2:'王静娴',lin2:'林淑贞',ye2:'陈婉仪',du2:'张淑华',su2:'刘玉贞'};
  const LOW_SURNAME86={cao2:'何',zhao2:'王',lin2:'林',ye2:'陈',du2:'张',su2:'刘'};
  const RANK_WORD86='答应|常在|贵人|嫔|妃|贵妃|皇贵妃';
  const firstSel86=Math.max(0,(CHAPTERS||[]).findIndex(ch=>ch.title==='御前终选'));
  const secondSel86=Math.max(0,(CHAPTERS||[]).findIndex(ch=>ch.title==='空宫点灯'));
  const arr86=v=>Array.isArray(v)?v:[v];
  const hasSelection86=s=>!!(s?.flags?.v78ManualLowSelection||s?.flags?.firstGrandSelectionDone||(s?.flags?.lowConsorts||[]).length);
  const selected86=s=>new Set((s?.flags?.lowConsorts||[]).filter(k=>LOW86.includes(k)));

  function lineHasLow86(line,k,s=state){
    const z=String(line||'');
    const name=LOW_NAMES86[k];if(name&&z.includes(name))return true;
    // 张淑华与张元照同姓，不能仅按“张常在”等泛称删除。
    if(k!=='du2'){const sn=LOW_SURNAME86[k];if(new RegExp(`${sn}(?:${RANK_WORD86})`).test(z))return true;}
    return false;
  }
  function candidateFromChoice86(c,s=state){
    const hits=[];
    let label='',hint='',result='';
    try{label=String(c?.label||'')}catch(_e){}
    try{hint=String(c?.hint||'')}catch(_e){}
    try{result=typeof c?.result==='string'?c.result:String(c?.result||'')}catch(_e){}
    let effects='';try{effects=JSON.stringify(c?.effects||{})}catch(_e){}
    const src=[label,hint,result,effects,String(c?.v55Promote||''),String(c?.v40Heir?.key||'')].join('\n');
    for(const k of LOW86){
      if(src.includes(k)||src.includes(LOW_NAMES86[k])){hits.push(k);continue;}
      if(k!=='du2'&&new RegExp(`${LOW_SURNAME86[k]}(?:${RANK_WORD86})`).test(src))hits.push(k);
    }
    return [...new Set(hits)];
  }

  // 保存 v86 过滤前的最终章节结构。重新开始同一页面时，可以恢复后再按新一局留牌重新筛选，避免上一局删掉的角色永久消失。
  const BASE_STEPS86=(CHAPTERS||[]).map(ch=>({
    ch,
    steps:[...(ch?.steps||[])],
    data:new Map((ch?.steps||[]).map(st=>[st,{
      heading:st.heading,
      cast:Array.isArray(st.cast)?[...st.cast]:st.cast,
      text:st.text,
      choices:Array.isArray(st.choices)?[...st.choices]:st.choices
    }]))
  }));
  const BASE_LOW_PEOPLE86=Object.fromEntries(LOW86.map(k=>[k,PEOPLE?.[k]?{introducedAt:PEOPLE[k].introducedAt,home:PEOPLE[k].home}:null]));
  function restoreLowStructure86(){
    for(const snap of BASE_STEPS86){
      if(!snap?.ch)continue;
      snap.ch.steps=[...snap.steps];
      for(const st of snap.steps){
        const d=snap.data.get(st);if(!d)continue;
        st.heading=d.heading;st.cast=Array.isArray(d.cast)?[...d.cast]:d.cast;st.text=d.text;
        st.choices=Array.isArray(d.choices)?[...d.choices]:d.choices;
        delete st.__v86PresenceText;delete st.__v86PresenceChoices;
      }
    }
  }

  function syncLowPresence86(s=state){
    if(!globalThis.__canonicalStory155)restoreLowStructure86();
    if(!hasSelection86(s)){
      // 未完成殿选时，六人只是候选，不属于后宫，也不能沿用上一局的位分/六宫状态。
      for(const k of LOW86){
        if(PEOPLE?.[k]&&BASE_LOW_PEOPLE86[k]){
          PEOPLE[k].introducedAt=BASE_LOW_PEOPLE86[k].introducedAt;
          PEOPLE[k].home=BASE_LOW_PEOPLE86[k].home;
        }
        if(s.ranks&&k in s.ranks)delete s.ranks[k];
        if(typeof HAREM_KEYS!=='undefined'){let i;while((i=HAREM_KEYS.indexOf(k))>=0)HAREM_KEYS.splice(i,1);}
      }
      return;
    }
    const keep=selected86(s);
    const gone=LOW86.filter(k=>!keep.has(k));
    const kept=LOW86.filter(k=>keep.has(k));

    // 人物录、位分表、六宫名单：未留牌者从后宫数据中退出。
    for(const k of LOW86){
      if(!PEOPLE?.[k])continue;
      if(keep.has(k)){
        PEOPLE[k].introducedAt=firstSel86;
        if(typeof HAREM_KEYS!=='undefined'&&!HAREM_KEYS.includes(k))HAREM_KEYS.push(k);
      }else{
        PEOPLE[k].introducedAt=9999;
        PEOPLE[k].home='未入宫';
        if(s.ranks)s.ranks[k]='未入宫';
        if(typeof HAREM_KEYS!=='undefined'){let i;while((i=HAREM_KEYS.indexOf(k))>=0)HAREM_KEYS.splice(i,1);}
      }
    }
    // 老存档若随机到了一个如今未留牌者，重新落到实际留牌者身上。
    if(!keep.has(s.flags?.lowPregnancyKey))s.flags.lowPregnancyKey=kept[0]||null;
    if(!keep.has(s.flags?.lowAccompliceKey))s.flags.lowAccompliceKey=[...kept].reverse().find(k=>k!=='zhao2')||null;
    if(s.flags?.v46LowVictim&&!keep.has(s.flags.v46LowVictim))s.flags.v46LowVictim=null;

    // 终选之后：人物卡 cast、正文段落、人物专属选项都只能引用实际入宫者。
    if(!globalThis.__canonicalStory155)for(let ci=firstSel86+1;ci<(CHAPTERS||[]).length;ci++){
      const ch=CHAPTERS[ci];if(!ch?.steps)continue;
      const next=[];
      for(const st of ch.steps){
        const originalCast=Array.isArray(st.cast)?[...st.cast]:[];
        if(originalCast.length)st.cast=originalCast.filter(k=>!LOW86.includes(k)||keep.has(k));

        if(st.text&&!st.__v86PresenceText){
          const old=st.text;
          st.text=function(ss){
            const a=typeof old==='function'?old(ss):old;
            const absent=LOW86.filter(k=>!selected86(ss).has(k));
            return arr86(a).filter(x=>!absent.some(k=>lineHasLow86(x,k,ss)));
          };
          st.__v86PresenceText=true;
        }

        // 专门以未入宫者为标题的后续场景直接不存在。
        const head=String(st.heading||'');
        if(gone.some(k=>head.includes(LOW_NAMES86[k])))continue;
        if(originalCast.length&&originalCast.every(k=>LOW86.includes(k))&&st.cast.length===0)continue;

        if(Array.isArray(st.choices)&&!st.__v86PresenceChoices){
          st.choices=st.choices.filter(c=>{
            const refs=candidateFromChoice86(c,s);
            return !refs.some(k=>gone.includes(k));
          });
          if(!st.choices.length)st.choices=[{label:'继续',effects:{flags:{}},result:''}];
          st.__v86PresenceChoices=true;
        }
        next.push(st);
      }
      ch.steps=next;
    }
    s.flags.v86PresenceLocked=true;
  }

  // 第一次大选一旦确认留牌，立刻锁定后续人物存在性；加载旧存档也重新校。
  const oldApply86=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldApply86&&!globalThis.__v86Apply){globalThis.__v86Apply=true;applyChoiceEffects=function(c){
    const out=oldApply86(c);
    if(c?.v78ConfirmLow||c?.v78LowRank||hasSelection86(state))syncLowPresence86(state);
    return out;
  }}
  syncLowPresence86(state);

  // 第二次采选的最终正史只留张元照、梁素贞、宋文秀、许淑惠；旧版三张填充名帖不得流入后文。
  if((state.index??0)>secondSel86||state.flags?.v46SecondRosterPruned){
    state.flags.v45SecondRosterCount=3;
    state.flags.v46SecondRosterPruned=true;
  }

  // 杨晏尔底层序齿也统一，不只在 HTML 层替换。
  if(CHILDREN?.sixthPrincess&&CHILDREN.sixthPrincess.name==='杨晏尔')CHILDREN.sixthPrincess.order='四公主';

  // 方小满最终来源锁定：绝不是选秀秀女。
  if(PEOPLE?.fang){
    PEOPLE.fang.tags=['花房旧人','后来入后宫','爱笑手巧'];
    const dead=String(state.ranks?.fang||'').startsWith('故');
    PEOPLE.fang.bio=dead?'方小满原是御花园花房宫女，后来在主控明确询问、本人点头之后才册入后宫。她从来不是任何一届选秀留下的人。后来听雨轩旧案成为承熙朝最难翻过去的一页之一。':'原是御花园花房宫女。主控后来明确问她是否愿意进入后宫，她自己点头，才从宫女籍转入听雨轩；她从来不是任何一届选秀留下的人。';
  }

  // 人物录“第一次大选”必须按本局真实留牌动态显示。
  const oldPeople86=typeof peopleView==='function'?peopleView:null;
  if(oldPeople86&&!globalThis.__v86People){globalThis.__v86People=true;peopleView=function(){
    let h=String(oldPeople86());
    const chosen=(state.flags?.lowConsorts||[]).map(k=>PEOPLE?.[k]?.name).filter(Boolean);
    const replacement=hasSelection86(state)
      ?`邵明贞、霍素英、崔静仪；本局低位实际由御前点名留下${chosen.length?'：'+chosen.join('、'):'无人'}。未留牌者没有入宫，也不会进入后续人物录、晋封、皇嗣或结局选项。`
      :'邵明贞、霍素英、崔静仪；低位六名候选并列待选，由御前逐人点名，没有“按顺序留前几位”的规则。';
    h=h.replace(/邵明贞、霍素英、崔静仪；低位另有六名候选，由御前逐人点名。只有御前实际留牌的人才会进入后宫，未留者不再出现。后期不再另开一批同功能妃嫔。/g,replacement);
    h=h.replace(/邵明贞、霍素英、崔静仪；另有六名低位候选[^<]*。/g,replacement);
    return h;
  }}

  // 最终运行自检，可在控制台调用 V86_QA.run()。
  globalThis.V86_QA={
    checklist:[
      '时间与年龄随承熙年份变化','姓名与封号/终局称谓一致','皇子女中文序齿一致','第一次殿选只保留玩家点中的低位人物','未入宫者不进入后续正文/选项/人物录/六宫名单','第二次采选只保留最终四人','死亡/离宫/清修/赴封地状态不与当前身份冲突','方小满来源不误写成选秀','含章后期保留必要日常但不抢主线','张元照现代意识通过事件而非口号表达','作者分析说明不进入正文','杨叙死亡后才切换第二主控张元照'
    ],
    run(s=state){
      const chosen=selected86(s),issues=[];
      if(String(document.documentElement.dataset.build)!=='v86')issues.push('build 不是 v86');
      if(PEOPLE?.emperor?.name!=='杨叙')issues.push('主控姓名异常');
      if(CHILDREN?.sixthPrincess?.name==='杨晏尔'&&CHILDREN.sixthPrincess.order!=='四公主')issues.push('杨晏尔序齿异常');
      if(hasSelection86(s)){
        for(const k of LOW86)if(!chosen.has(k)&&((PEOPLE?.[k]?.introducedAt||0)<9999||HAREM_KEYS?.includes?.(k)))issues.push(`${LOW_NAMES86[k]}未留牌但仍在后宫数据`);
      }
      if((s.index??0)>secondSel86&&Number(s.flags?.v45SecondRosterCount||3)!==3)issues.push('第二次采选人数异常');
      if(typeof storyYearV85==='function'){const y=storyYearV85(s);if(y<1||y>22)issues.push(`故事年份异常:${y}`)}
      return {ok:issues.length===0,issues,chosen:[...chosen].map(k=>LOW_NAMES86[k]),year:typeof storyYearV85==='function'?storyYearV85(s):null};
    }
  };

  state.flags.v86Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v86 release audit / candidate presence lock failed',e)}})();
