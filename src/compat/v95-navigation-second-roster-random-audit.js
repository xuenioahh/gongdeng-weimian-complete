(()=>{try{
  document.documentElement.dataset.build='v95';
  document.title='宫灯未眠 · 跳转、三新人介绍与随机分支校准 v95';
  const CH=t=>(CHAPTERS||[]).find(c=>c?.title===t);
  const ST=(ch,q)=>(ch?.steps||[]).find(x=>String(x?.heading||'').includes(q));
  const AS=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return []}};
  const LOW=['cao2','zhao2','lin2','ye2','du2','su2'];
  const LOW_NOTE={
    cao2:'何超英 · 先看出口和近路，答话不抢先',
    zhao2:'王静娴 · 先看人的手，再听人说什么',
    lin2:'林淑贞 · 听见药名会下意识换成白话',
    ye2:'陈婉仪 · 小楷极稳，紧张时反复压纸角',
    du2:'张淑华 · 对数目敏感，手指会在桌沿轻敲',
    su2:'刘玉贞 · 会南曲，照看孩子时最有耐心'
  };
  const lowSel=s=>((s.flags?.v78LowSelected)||[]).filter(k=>LOW.includes(k));
  globalThis.v95ToggleLow=function(k){
    if(!LOW.includes(k))return;
    state.flags=state.flags||{};state.flags.v78LowSelected=state.flags.v78LowSelected||[];
    const a=state.flags.v78LowSelected,i=a.indexOf(k);
    if(i>=0)a.splice(i,1);else if(a.length<5)a.push(k);
    try{save()}catch(_e){};try{render()}catch(_e){}
  };
  if(!globalThis.__v95LowClick){globalThis.__v95LowClick=true;document.addEventListener('click',e=>{const b=e.target?.closest?.('[data-v95-low]');if(!b)return;e.preventDefault();e.stopPropagation?.();globalThis.v95ToggleLow(b.dataset.v95Low);});}

  // 1) 第一次大选低位候选：真正按立绘自由点名，不再让旧随机/“王氏先留”界面覆盖。
  const first=CH('御前终选');
  const lowStep=(first?.steps||[]).find(st=>/王静娴先留下|偏殿六张脸|偏殿还有六个人/.test(String(st?.heading||'')));
  if(lowStep){
    lowStep.heading='偏殿六张脸，我自己点名字';lowStep.keyDecision=true;lowStep.narrative=false;lowStep.v95ManualRoster=true;
    lowStep.text=s=>{
      const a=lowSel(s);
      return [
        `三位高位秀女的册页收好以后，偏殿还站着六个人。名帖并排放着，没有先后名次。`,
        `<div class="v78-low-grid">${LOW.map(k=>`<button type="button" class="v78-low-card ${a.includes(k)?'selected':''}" data-v95-low="${k}">${portrait(PEOPLE[k])}<span><b>${PEOPLE[k].name}</b><small>${LOW_NOTE[k]}</small></span></button>`).join('')}</div>`,
        `<div class="v78-count"><b>已点 ${a.length} 人：</b>${a.length?a.map(k=>PEOPLE[k].name).join('、'):'尚未点名'}。可留二至五人。</div>`
      ];
    };
    lowStep.choices=[{label:'就留我点中的这些人',hint:'二至五人；点名顺序不影响初封',requires:s=>{const n=lowSel(s).length;return n>=2&&n<=5},v78ConfirmLow:true,v95ConfirmLow:true,effects:{flags:{v78ManualLowSelection:true}},result:s=>`留牌：${(s.flags.lowConsorts||[]).map(k=>PEOPLE[k].name).join('、')}。`}];
  }

  // 2) 承熙六年小时间倒序：不改幕数，只改标题，旧存档仍能按序走。
  const years=CH('宫灯渐繁');
  const senior=ST(years,'年资册上多了一行');
  if(senior)senior.heading='承熙六年五月末 · 年资册上多了一行';

  // 3) 顺王去留只在《王府旧笼》收束，不再混进第二次采选。
  const wang=CH('王府旧笼');
  if(wang?.steps?.length){
    const last=wang.steps[wang.steps.length-1];
    last.heading='永和宫里，那句话并不陌生';last.keyDecision=true;
    last.text=s=>[
      `旧箱送回景阳宫以后，张元照只留下父亲当年的两页手稿，其余照旧封好。`,
      `我让裴景和把顺王这些年替她压过的婚帖、门禁和那张烧掉的路引一并送去永和宫。沈知微看完，只问：“王爷现在还觉得自己是在替她省事么？”`,
      `顺王第二日递折。他不再替张元照求什么，只写自己的去处：一是回旧封别业，一是仍留京中王府。`,
      `张元照没有来替他选。沈知微也没有。`
    ];
    last.choices=[
      {label:'准顺王赴旧封别业，非诏不必入京',effects:{flags:{v94WangThreadReframed:true,shunwangFinalFate:'fief',shunwangLeaves:true},trust:{zhangyuanzhao:2,shen:1}},result:'顺王离京只带一把旧琴和两车书。'},
      {label:'仍留京中，明旨不得再干预张氏内廷事务',effects:{flags:{v94WangThreadReframed:true,shunwangFinalFate:'capital',shunwangLeaves:false},trust:{zhangyuanzhao:1}},result:'顺王仍住京中王府，此后不得再以旧日监护名义递张氏的私事。'}
    ];
  }

  // 4) 第二次采选：三人真正完成“见人—留牌—发册入宫”。保留幕数，修复跳转。
  const second=CH('空宫点灯');
  if(second?.steps?.length>=11){
    const s8=second.steps[8],s9=second.steps[9],s10=second.steps[10];
    s8.heading='终选最后，只剩三张名帖';s8.cast=['gu','ning','liang2','song2','xu2'];s8.fx='candle';s8.narrative=false;s8.keyDecision=false;
    s8.text=s=>[
      `终选到最后，御案左边只剩三张名帖。`,
      `先叫到的是梁素贞，十八岁。父亲在东南水师任职多年。她行礼以后看见殿角搁着一只受潮的弓匣，目光停了一下。我问她看什么，她答：“绳结打得太紧，海边这么收，明日里面更潮。”她自己箱笼上用的也是黑桐油绳。`,
      `宋文秀也是十八岁，家里做漕运、织造和仓储。她没有谈诗书，反而认出了名帖纸角的仓号，说那是今年新换的一路江南贡纸。问她怎么知道，她答：“家里仓单也是这套号。”`,
      `许淑惠十七岁，父亲是京中给事中，家里没有军权，也没有宫中旧供应。她进殿第一礼行得太深，自己起身时就知道错了，耳根一下红透。邵明贞让她重来，她在袖中悄悄数了三步，第二次没有错。`,
      `三个人退到阶下。我把三张名帖都留在左手边。`
    ];
    s8.choices=[{label:'梁素贞、宋文秀、许淑惠三人留牌',v95SecondEnroll:true,effects:{flags:{v95SecondThreeSelected:true,v45SecondRosterCount:3,v46SecondRosterPruned:true}},result:'三张名帖一同送往尚宫局。'}];

    s9.heading='散场以后，许淑惠把那一礼又走了三遍';s9.cast=['xu2','ning'];s9.fx='petal';s9.narrative=true;s9.keyDecision=false;
    s9.text=s=>[
      `终选散后，许淑惠没有马上回储秀宫。她站在体元殿外廊，把刚才那一礼从起步到收袖重新走了一遍。`,
      `第二遍还是快。第三遍她索性小声数：“一、二、三。”`,
      `邵明贞从后殿出来正好听见：“还数？”`,
      `许淑惠脸又红了：“臣女一紧张就数。数着至少不会把皇后礼行给娘娘。”`,
      `邵明贞看她一眼：“进宫以后没人能一辈子替你数。”`,
      `“那臣女争取早点不数。”许淑惠停了一下，自己先笑了。左颊露出一个很浅的酒窝。`
    ];
    s9.choices=[{label:'回储秀宫等册页',effects:{flags:{v95XuIntroduced:true}},result:''}];

    s10.heading='册页发下来，三把钥匙往三个方向走';s10.cast=['liang2','song2','xu2'];s10.fx='wind';s10.narrative=true;s10.keyDecision=false;
    s10.text=s=>[
      `册页发下来的那日上午，三个人同从储秀宫出来。初封都是答应。`,
      `梁素贞的箱子最少，两只木箱都用黑桐油绳重新捆过。她去钟粹宫西配殿，走到岔路口还回头问掌事：“射圃的弓弦也是尚武处统一换么？”`,
      `宋文秀往景阳宫西配殿走。路过内务府领物处，她停下来把墙上三张领物单从头看到尾，问身边宫女：“领、验、收，为什么写在三张纸上？”宫女答不上来。`,
      `许淑惠住咸福宫东配殿。她一路没再数礼数，却把宫门数多了一座，走过头以后自己折回来：“这回数的是门，还是错。”`,
      `三串钥匙在西六宫的岔路口分开。`
    ];
    s10.choices=[{label:'让尚宫局按新住处安置',effects:{flags:{v95SecondThreeSettled:true}},result:''}];
  }

  // 三人的人物卡只写看得见的东西。
  const secondIdx=Math.max(0,(CHAPTERS||[]).findIndex(c=>c.title==='空宫点灯'));
  if(PEOPLE.liang2)Object.assign(PEOPLE.liang2,{name:'梁素贞',age:'18岁',home:'钟粹宫西配殿',introducedAt:secondIdx,tags:['东南水师','识弓械','黑桐油绳'],bio:'父亲在东南水师任职多年。她的箱笼习惯用黑桐油绳，见到弓先摸弦有没有返潮；说起海防器械时话会突然多起来。'});
  if(PEOPLE.song2)Object.assign(PEOPLE.song2,{name:'宋文秀',age:'18岁',home:'景阳宫西配殿',introducedAt:secondIdx,tags:['江南漕运','仓储','爱并单据'],bio:'家里熟悉漕运、织造和仓储。她看到三张领物单总想先并成一张，算转运与损耗很快；进宫后最先问清的是库房、验收和领物处。'});
  if(PEOPLE.xu2)Object.assign(PEOPLE.xu2,{name:'许淑惠',age:'17岁',home:'咸福宫东配殿',introducedAt:secondIdx,tags:['京中小族','数礼步','左颊酒窝'],bio:'父亲是京中给事中，家中没有重兵财权。她紧张时会在心里数行礼步数，终选第一礼便行重了；放松下来以后爱拿这件事笑自己。'});

  // 梁、宋后续第一次互动去掉“待选”残字，直接认人。
  if(second?.steps?.[11]){
    const st=second.steps[11];st.cast=['liang2','ke'];
    st.text=s=>[
      `梁素贞入宫半月以后，太后让新人去射圃看春射。她站在末席，却一眼认出霍素英案边那张北营旧弓。`,
      `霍素英叫她过去：“你父亲若看见，会怎么改？”`,
      `梁素贞用指腹捻了捻弦：“换弦，不改弓。海边潮，弦坏得比弓快。”`,
      `“你怕别人把你当第二个我？”`,
      `“怕。”梁素贞把弓放回架上，“北营是北营，东南水师是东南水师。”`,
      `霍素英笑了一声：“那就记住这句话。”`
    ];
  }
  if(second?.steps?.[12]){
    const st=second.steps[12];st.cast=['song2','hui'];
    st.text=s=>[
      `宋文秀入宫后的第一个月，内务府把夏贡单送到御前。绢、茶、药材袋旁边第一次同时出现崔家旧行和宋家熟悉的漕仓。`,
      `崔静仪看到新贡号，叫人把宋文秀请到长春宫。`,
      `宋文秀进门便说：“三处仓行可以并成一张总单，少走两道转运。”`,
      `崔静仪没有马上答。她从旧匣里找出自己入宫第一年拟过的一张贡造总单，放在桌上：“我当年也觉得越集中越省事。”`,
      `宋文秀把两张纸并在一起看了很久，回去后没有撤掉新法，只把三家改成轮换承办。`
    ];
  }

  // 5) 张元照在承熙十一年已经是八年旧人；清掉《窗开半扇》残留的“待选秀女”。
  const windowCh=CH('窗开半扇');
  for(const st of (windowCh?.steps||[])){
    const old=st.text;if(typeof old!=='function')continue;
    st.text=s=>AS(old,s).map(x=>String(x)
      .replace(/待选秀女/g,'张元照')
      .replace(/四个新人第一次/g,'三个新人第一次')
      .replace(/四个新人/g,'三个新人'));
  }

  // 6) 分支内稳定的“随机”：同样选择重走时结果不跳变。
  function hash(str){let h=2166136261>>>0;for(const ch of String(str)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h>>>0}
  const canonicalLow=s=>[...new Set((s.flags?.lowConsorts||s.flags?.v78LowSelected||[]).filter(k=>LOW.includes(k)))].sort((a,b)=>LOW.indexOf(a)-LOW.indexOf(b));
  function stableLowState(s){
    const a=canonicalLow(s);if(!a.length){s.flags.lowPregnancyKey=null;s.flags.lowAccompliceKey=null;return}
    const sig=a.join('|');s.flags.lowPregnancyKey=a[hash('preg|'+sig)%a.length];
    const accomp=a.filter(k=>k!=='zhao2');s.flags.lowAccompliceKey=accomp.length?accomp[hash('accomp|'+sig)%accomp.length]:null;
  }
  function cn(n){return ['零','一','二','三','四','五','六','七','八','九','十'][n]||String(n)}
  function stableExtra(round,key,s){
    s.flags=s.flags||{};s.flags.extraHeirs=s.flags.extraHeirs||{};
    const sig=[round,key,canonicalLow(s).join(','),s.flags.year3Favor||'',s.flags.twinBoyRegistered?'T':''].join('|');
    const gender=(hash('sex|'+sig)%100)<52?'F':'M';
    const boys=['杨顺昭','杨顺安','杨顺平','杨顺礼','杨顺嘉','杨顺宁','杨顺和'];
    const girls=['杨清而','杨嘉则','杨和乃','杨贞亦','杨安以','杨柔于','杨宛然'];
    const used=new Set(Object.entries(s.flags.extraHeirs).filter(([r])=>Number(r)!==Number(round)).map(([,x])=>x?.name).filter(Boolean));
    Object.values(CHILDREN||{}).forEach(x=>x?.name&&used.add(x.name));
    const pool=(gender==='M'?boys:girls).filter(n=>!used.has(n));
    const name=pool.length?pool[hash('name|'+sig)%pool.length]:(gender==='M'?'杨顺康':'杨昭焉');
    let num=gender==='M'?(s.flags?.twinBoyRegistered?6:5):8;
    for(let r=1;r<round;r++){const x=s.flags.extraHeirs?.[r];if(x&&!x.skipped&&x.gender===gender)num++}
    s.flags.extraHeirs[round]={...(s.flags.extraHeirs[round]||{}),mother:key,gender,name,order:`${cn(num)}${gender==='M'?'皇子':'公主'}`,born:!!s.flags.extraHeirs[round]?.born,v40:true,v95Stable:true};
  }

  // 最终 effects 包装：确认自由留牌后覆盖旧 Math.random；第二批三人真正入宫；额外皇嗣稳定重走。
  const apply95Prev=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=apply95Prev(c);
    if(c?.v78ConfirmLow||c?.v95ConfirmLow){
      state.flags=state.flags||{};
      const a=(state.flags.lowConsorts||state.flags.v78LowSelected||[]).filter(k=>LOW.includes(k));
      state.flags.lowConsorts=[...new Set(a)];state.flags.v78LowSelected=[...state.flags.lowConsorts];stableLowState(state);
      LOW.forEach(k=>{if(!state.flags.lowConsorts.includes(k)){state.ranks[k]='待选';if(PEOPLE[k])PEOPLE[k].introducedAt=9999;}});
    }
    if(c?.v95SecondEnroll){
      const ranks={liang2:'答应',song2:'答应',xu2:'答应'};
      Object.entries(ranks).forEach(([k,r])=>{state.ranks[k]=r;if(PEOPLE[k]){PEOPLE[k].title=r;PEOPLE[k].introducedAt=secondIdx;}if(typeof HAREM_KEYS!=='undefined'&&!HAREM_KEYS.includes(k))HAREM_KEYS.push(k)});
    }
    if(c?.v40Heir?.key){
      const k=c.v40Heir.key,r=c.v40Heir.round;
      if(LOW.includes(k)&&!canonicalLow(state).includes(k)){if(state.flags?.extraHeirs?.[r]?.mother===k)delete state.flags.extraHeirs[r];}
      else stableExtra(r,k,state);
    }
    return out;
  };

  // 方小满在孕事选择里显示当前宫位，不再漏回“宫女”。
  for(const st of (years?.steps||[]))for(const c of (st.choices||[]))if(c?.v40Heir?.key==='fang'){
    try{Object.defineProperty(c,'label',{configurable:true,get(){const t=state.ranks?.fang||PEOPLE.fang?.title||'常在';return `这一季，多召${/方/.test(t)?t:`方${t}`}`;}})}catch(_e){}
  }

  // 7) 未入宫者的后续“怀孕/召幸”选项不显示，不只是灰掉。
  const story95Prev=storyView;
  storyView=function(){
    let h=story95Prev();
    try{
      if(state.index<CHAPTERS.length){const ch=CHAPTERS[state.index],st=ch?.steps?.[state.chapterStep||0];
        (st?.choices||[]).forEach((c,i)=>{const k=c?.v40Heir?.key;if(!LOW.includes(k))return;if(canonicalLow(state).includes(k))return;const re=new RegExp(`<button[^>]*data-choice="${i}"[^>]*>[\\s\\S]*?<\\/button>`,'g');h=h.replace(re,'');});
      }
    }catch(_e){}
    return h;
  };

  // 8) “重走”保留第一次大选手动点名结果，否则 history 只有一个确认按钮索引，无法重建名单。
  const replay95Prev=replay;
  replay=function(to){
    const snap={low:[...(state.flags?.lowConsorts||[])],selected:[...(state.flags?.v78LowSelected||[])]};
    globalThis.__v95ReplayRoster=snap;
    try{return replay95Prev(to)}finally{globalThis.__v95ReplayRoster=null}
  };
  const apply96Prev=applyChoiceEffects;
  applyChoiceEffects=function(c){
    if((c?.v78ConfirmLow||c?.v95ConfirmLow)&&globalThis.__v95ReplayRoster){
      state.flags=state.flags||{};
      const a=globalThis.__v95ReplayRoster.low.length?globalThis.__v95ReplayRoster.low:globalThis.__v95ReplayRoster.selected;
      state.flags.v78LowSelected=[...a];state.flags.lowConsorts=[...a];
    }
    return apply96Prev(c);
  };

  // 9) 旧存档越过第二采选但三人仍“待选”时，只补身份，不倒退章节。
  if((state.index||0)>secondIdx || ((state.index||0)===secondIdx&&(state.chapterStep||0)>8)){
    for(const k of ['liang2','song2','xu2'])if(PEOPLE[k]&&(/待选|未入宫/.test(state.ranks?.[k]||PEOPLE[k].title||''))){state.ranks[k]='答应';PEOPLE[k].title='答应';PEOPLE[k].introducedAt=secondIdx;if(typeof HAREM_KEYS!=='undefined'&&!HAREM_KEYS.includes(k))HAREM_KEYS.push(k)}
  }

  // 10) 位置安全：章节重排后只做 clamp，不再把玩家莫名跳到旧章节。
  if(!Number.isInteger(state.index)||state.index<0)state.index=0;
  if(state.index<CHAPTERS.length){const n=CHAPTERS[state.index]?.steps?.length||1;if(!Number.isInteger(state.chapterStep)||state.chapterStep<0)state.chapterStep=0;if(state.chapterStep>=n)state.chapterStep=n-1;}

  globalThis.V95_QA={run(s=state){
    const issues=[];
    const c13=CH('空宫点灯'),c14=CH('窗开半扇'),c6=CH('宫灯渐繁');
    const txt=ch=>((ch?.steps||[]).flatMap(st=>AS(st.text,s)).join('\n'));
    if(/张元照正式入宫的第三日|入宫第五日|终选散后，含章只问张元照一句/.test(txt(c13)))issues.push('第二采选仍残留元照旧入宫线');
    if(/待选秀女/.test(txt(c14)))issues.push('窗开半扇仍残留待选秀女');
    if(!String(ST(c6,'年资册上多了一行')?.heading||'').includes('五月末'))issues.push('承熙六年时间标题未校准');
    if(!ST(c13,'终选最后，只剩三张名帖'))issues.push('梁宋许终选缺失');
    if(['liang2','song2','xu2'].some(k=>!PEOPLE[k]))issues.push('第二批人物资料缺失');
    for(const ch of CHAPTERS){if(!ch?.steps?.length)issues.push(`空章节:${ch?.title}`);for(const st of ch?.steps||[]){if(!st?.choices?.length)issues.push(`无跳转:${ch.title}/${st.heading}`)}}
    return {ok:issues.length===0,issues,chapters:CHAPTERS.length,secondHeadings:(c13?.steps||[]).slice(7,13).map(x=>x.heading)};
  }};

  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v95 navigation/roster/random audit failed',e)}})();
