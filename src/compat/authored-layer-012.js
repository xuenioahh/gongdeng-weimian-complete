(()=>{try{
  document.documentElement.dataset.build='v38';

  // 1) 年龄校准：新帝与潜邸旧人更成熟；闻人蘅略年轻，但孕事仍属高风险。
  Object.assign(PEOPLE.emperor,{age:'30岁'});
  Object.assign(PEOPLE.gu,{age:'29岁'});
  Object.assign(PEOPLE.shen,{age:'28岁'});
  Object.assign(PEOPLE.zhou,{age:'27岁'});
  Object.assign(PEOPLE.wenheng,{age:'37岁'});

  // 2) 承熙元年二月：周清漪诞龙凤胎。异相只是一项先天体征，真正把它变成“异闻”的是宫廷解释。
  const first=CHAPTERS[0];
  const oldFirstCount=first?.steps?.length||0;
  function syncTwinChildrenV38(s=state){
    if(s.flags?.twinGirlBorn){
      CHILDREN.twinGirl={name:'杨昭焉',order:'五公主',age:'承熙元年二月生',mother:'zhou',note:'与一名皇子同胎而生。她本身健康，出生当夜却因同胞兄弟的先天异相一起卷入宫中议论；本卷暂不安排成长线。'};
    }else delete CHILDREN.twinGirl;
    if(s.flags?.twinBoyFate==='keep'){
      CHILDREN.twinBoy={name:'杨顺安',order:'四皇子',age:'承熙元年二月生',mother:'zhou',note:'与五公主同胎。出生时左眼瞳色极浅、右手六指，太医认为不妨碍当时的呼吸与吃奶，钦天监却以“异相”上奏。主控选择照常入玉牒。本卷暂不安排成长线。'};
    }else delete CHILDREN.twinBoy;
  }
  function huoPrinceOrderV38(s=state){return s.flags?.twinBoyFate==='keep'?'五皇子':'四皇子'}
  function fixExtraOrdersV38(s=state){
    const ex=s.flags?.extraHeirs||{};
    [1,2].forEach(r=>{const x=ex[r];if(!x||x.skipped)return;let n;if(x.gender==='M'){
      n=(s.flags?.twinBoyFate==='keep'?6:5);
      for(let j=1;j<r;j++)if(ex[j]?.gender==='M'&&!ex[j]?.skipped)n++;
      x.order=`${n}皇子`;
    }else{
      n=8; // 四公主 + 双生五公主 + 低位六公主 + 邵氏七公主之后。
      for(let j=1;j<r;j++)if(ex[j]?.gender==='F'&&!ex[j]?.skipped)n++;
      x.order=`${n}公主`;
    }
    const ck=`extraHeir${r}`;if(CHILDREN[ck])CHILDREN[ck].order=x.order;
    });
  }

  if(first?.steps && !first.steps.some(x=>x.heading?.includes('双生异闻'))){
    first.date='承熙元年·正月至二月';
    first.steps.push(
      {heading:'第四幕 · 承熙元年二月，绮春宫报双生',cast:['zhou','gu','taihou'],fx:'lantern',narrative:true,text:s=>[
        `登基时，周嫔已经有近七个月身孕。那是潜邸最后一个秋天留下的孩子，所以正月里无论第一夜我去了哪里，都不影响这桩孕事。`,
        `二月初七丑时，绮春宫先后传出两声婴啼。第一胎是公主，第二胎是皇子。乳母刚说“龙凤呈祥”，产婆的脸色却变了。`,
        `男婴左眼瞳色极浅，右手比常人多一指。除此之外，太医当夜所见呼吸、啼哭与进乳都无明显异常。`,
        `<span class="v38-omen"><b>同一夜，两种说法</b><br><i>太医院：</i>“胎中异相，不可据此言妖祥。”<br><i>钦天监：</i>“双生本非常数，皇子复有异征，请慎处之。”</span>`,
        `消息还没有出绮春宫，内廷已经有了第三种说法：有人说是祥瑞，有人说是亡国余气冲了宫门，还有人说新朝第一对双生“不该同时留下”。`,
        `周嫔刚从昏睡里醒，根本不知道外面已经把一个刚出生的孩子解释成了十几种意思。她只问：“两个都活着吗？”`,
        `这件事不能由钦天监替我决定。`
      ],choices:[{label:'先看过两个孩子，再下旨',effects:{flags:{twinBirthSeen:true}},result:''}]},
      {heading:'第五幕 · 双生异闻：这个孩子要不要留在宫里',cast:['zhou','gu','taihou'],fx:'seal',keyDecision:true,text:s=>[
        `我到绮春宫时，女婴已经睡着。男婴被裹在另一只襁褓里，右手露出一点，多出的手指很小。`,
        `太后先把钦天监奏本扣在桌上：“孩子才几个时辰，倒先有人替他写了一辈子的命。”`,
        `皇后却没有立刻附和。旧例里有双生，有残疾皇嗣，也有“异征不入宫闱”的前朝旧案，彼此互相矛盾。她把三份都带来了，却没有替我圈哪一份。`,
        `周嫔没有哭，只抱着女儿坐在床上。她知道另一个孩子能不能被叫作“皇子”，现在只差我一句话。`
      ],choices:[
        {label:'依钦天监议：秘处异子，玉牒只记公主',hint:'最冷的政治处理。史书会把这一胎写成“皇子不育”，不会记处决细节。',v38TwinFate:'kill',effects:{bond:{zhou:-14},trust:{zhou:-18,taihou:-5,gu:-2},flags:{twinGirlBorn:true}},result:'旨意没有传出绮春宫。当夜，男婴从内廷记录里消失；对外只称“一子不育”。周嫔从此再没有主动提过那一夜。宫里却一直有人记得：产房明明传过两次哭声。'},
        {label:'送出宫外：交可信宗室旁支抚养，不入玉牒',hint:'保住性命，也把皇子身份一并拿走。以后只作为宫中旧闻存在，不进入主线成长。',v38TwinFate:'send',effects:{bond:{zhou:-5},trust:{zhou:-4,taihou:1},flags:{twinGirlBorn:true}},result:'孩子第五日随一辆没有宗室标记的车出了西华门。乳母和随行医官都换了名册。周嫔知道他活着，却不能再公开称他为儿子。很多年后，宫里仍有人把“西华门那辆车”当成旧朝异闻讲。'},
        {label:'斥“妖异”之说：四皇子、五公主一并入玉牒，照常抚养',hint:'承认先天差异不等于凶兆。政治议论最大，但孩子的身份最完整。',v38TwinFate:'keep',effects:{bond:{zhou:7},trust:{zhou:9,taihou:4,gu:1},flags:{twinGirlBorn:true,twinBoyRegistered:true}},result:'我让钦天监删去“宜弃”二字，只准记天象，不准议皇嗣生死。男婴序为四皇子，女婴序为五公主。宫里关于“异皇子”的议论反而传得最久，但至少所有人都必须当着他的面称一声皇子。'}
      ]},
      {heading:'第六幕 · 双生之后，周嫔的位分也不能自动往前',cast:['zhou','gu'],fx:'seal',keyDecision:true,text:s=>[
        `双生的赏单送到凤仪宫，皇后另外夹了一张空白晋位折。`,
        `周嫔生下公主，也经历了一场几乎把整个内廷都卷进去的双生异闻。可“生了孩子”不是自动晋位的机关。`,
        `皇后只写：“周嫔资序已足，可议晋一级。”`,
        `要不要让她从嫔到妃，仍由我亲自决定。`
      ],choices:[
        {label:'晋周嫔为周妃',hint:'嫔→妃，只进一级',effects:{ranks:{zhou:'妃'},bond:{zhou:2},trust:{zhou:2},flags:{zhouTwinPromotion:true}},result:'册礼从简。周清漪接册时没有露出太多喜色，只让人把五公主的襁褓重新掖好。她知道这道晋位与那一夜永远分不开。'},
        {label:'位分不动，只加双生赏与产后月例',hint:'皇嗣与位分分开处理',effects:{trust:{gu:1},flags:{zhouTwinNoPromotion:true}},result:'周嫔仍是周嫔。赏赐照例进宫，她没有争位分，只把孩子的乳母名单亲自看了两遍。'}
      ]}
    );
  }

  // 3) 双生会改变后续序齿，但不提前安排任何孩子的成长。
  if(CHILDREN.fifthPrincess){CHILDREN.fifthPrincess.order='六公主';CHILDREN.fifthPrincess.note=(CHILDREN.fifthPrincess.note||'').replace(/五公主/g,'六公主')}
  if(CHILDREN.sixthPrincess){CHILDREN.sixthPrincess.order='七公主';CHILDREN.sixthPrincess.note=(CHILDREN.sixthPrincess.note||'').replace(/六公主/g,'七公主')}
  syncTwinChildrenV38(state);fixExtraOrdersV38(state);

  const applyChoiceEffectsV37Final=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=applyChoiceEffectsV37Final(c);
    if(c.v38TwinFate){
      state.flags.twinBoyFate=c.v38TwinFate;state.flags.twinGirlBorn=true;
      state.flags.twinBoyRegistered=c.v38TwinFate==='keep';
      syncTwinChildrenV38(state);fixExtraOrdersV38(state);
      out.push(c.v38TwinFate==='keep'?'四皇子、五公主入玉牒':c.v38TwinFate==='send'?'双生皇子出宫抚养，不入玉牒':'双生皇子不入玉牒');
    }
    if(c.heirPick){fixExtraOrdersV38(state)}
    return out;
  };

  // 皇嗣页渲染前动态校准霍氏之子和额外皇嗣序齿。
  const childrenViewV37Final=childrenView;
  childrenView=function(){
    syncTwinChildrenV38(state);fixExtraOrdersV38(state);
    let oldHuo;
    if(CHILDREN.fourthPrince){oldHuo=CHILDREN.fourthPrince.order;CHILDREN.fourthPrince.order=huoPrinceOrderV38(state);CHILDREN.fourthPrince.note=(CHILDREN.fourthPrince.note||'').replace(/四皇子|五皇子/g,huoPrinceOrderV38(state));}
    try{return childrenViewV37Final()}finally{if(CHILDREN.fourthPrince&&oldHuo)CHILDREN.fourthPrince.order=oldHuo}
  };

  // 4) 把“蘅嫔入宫即设复验”移回承熙二年；三至六年按年月真正交错排序。
  const years=CHAPTERS.find(x=>x.title==='宫灯渐繁');
  const motherCh=CHAPTERS.find(x=>x.title==='母至');
  if(years?.steps && motherCh?.steps){
    const di=years.steps.findIndex(x=>x.heading?.includes('蘅嫔入宫时，我亲手设下的防线'));
    if(di>=0){
      const defense=years.steps.splice(di,1)[0];
      defense.heading='入宫之后 · 我亲手设下的第一道防线';
      motherCh.steps.push(defense);
      motherCh.date='承熙二年·二月至三月';
    }

    function timeKey(st){const h=st.heading||'';
      const rules=[
        ['新人入宫后的第一个月',303],['三个世家女开始长出',306],['那匣香本来只是',309],
        ['一位低位新人先有了孩子',401],['蘅嫔是不是只剩一个名位',402],['一份不太像喜报',404],['和妃的旧案从',405],
        ['胎像开始不稳',407],['那个没有进玉牒',408.1],['五公主洗三',408.2],['六公主洗三',408.2],['承熙四年的后宫',409],['慢性暗害没有',410],['霍氏有喜',411],['晋嫔有喜',411],
        ['霍氏皇子出生',506],['四皇子出生',506],['五皇子出生',506],['邵氏也有了喜脉',507],['徽嫔也有了喜脉',507],['昭氏开始把',508],['九月 · 要不要再添',509],['十一月 · 第二张空白页',511],
        ['邵氏公主满月',602],['六公主满月',602],['七公主满月',602],['五月 · 玉牒又添一笔',605],['六月终于有喜',606],['七月 · 又一声婴啼',607]
      ];
      for(const [n,k] of rules)if(h.includes(n))return k;
      const m=h.match(/承熙([一二三四五六七八九十]+)年([一二三四五六七八九十冬腊正]+)月/);if(m){
        const cv={'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,'十一':11,'十二':12,'正':1,'冬':11,'腊':12};
        const num=x=>cv[x]||({'十一':11,'十二':12}[x])||99;return num(m[1])*100+num(m[2]);
      }
      return 999;
    }
    years.steps=years.steps.map((st,i)=>({st,i,k:timeKey(st)})).sort((a,b)=>a.k-b.k||a.i-b.i).map(x=>x.st);

    // 修正因双生导致的后续序齿称谓；先六→七，再五→六，避免连环替换。
    const rewriteV38=(txt,s)=>typeof txt==='string'?txt.replaceAll('六公主','七公主').replaceAll('五公主','六公主').replaceAll('四皇子',huoPrinceOrderV38(s)).replace('已经四十岁','三十七岁'):txt;
    years.steps.forEach((st,idx)=>{
      let h=st.heading||'';
      h=h.replaceAll('六公主','七公主').replaceAll('五公主','六公主');
      if(/四皇子出生|五皇子出生/.test(h))h=h.replace(/四皇子出生|五皇子出生/,'霍氏皇子出生');
      if(/邵氏.*公主满月/.test(h)||/七公主满月|六公主满月/.test(h))h=h.replace(/承熙六年二月 · .*/,'承熙六年二月 · 邵氏公主满月');
      h=h.replace(/^第[^·]+幕 · /,'');
      const cn=['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二十一','二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九','三十'];
      st.heading=`第${cn[idx]||idx+1}幕 · ${h}`;
      if(typeof st.text==='function'){const old=st.text;st.text=s=>{const r=old(s);return Array.isArray(r)?r.map(x=>rewriteV38(x,s)):rewriteV38(r,s)}}
      else if(Array.isArray(st.text))st.text=st.text.map(x=>rewriteV38(x,state));
    });
    years.date='承熙三年·三月至六年七月';
    const oldBridge=years.bridge;
    years.bridge=s=>`终选以后，日子不再按“谁的篇章”依次发生。${s.flags.twinBoyFate==='keep'?'承熙元年的双生异闻仍偶尔被人提起；四皇子与五公主已经记入玉牒。':s.flags.twinBoyFate==='send'?'承熙元年的双生异闻没有真正消失，宫里仍有人记得西华门那辆车。':'承熙元年的双生异闻被压进一句“一子不育”，但产房里的人都记得第二声哭。'} 三年春新人入宫，四年里沈氏旧案、蘅嫔孕事和低位宫嫔的喜脉同时推进；五年皇嗣增加，昭氏的焦虑与慢性暗害也在同一段时间里积累。这里按年月往前走，不再按人物一条线写完再换另一条。`;
  }

  // 5) 大事录：史官书为主体，御前真实裁断折叠保留；彻底移除亲近/信任数字流水账。
  function initialTitleV38(k){
    const pref=state.flags?.titlePrefixes?.[k]||({ning:'徽',ke:'晋',hui:'元'}[k]);
    const mode=state.flags?.[k==='ning'?'ningInitial':k==='ke'?'keInitial':'huiInitial'];
    const rank=mode==='cautious'?'贵人':'嫔';return `${pref}${rank}`;
  }
  function historyRecordV38(e,i){
    const t=e?.title||'';
    if(t==='宫门初定'){
      const twin=state.flags?.twinBoyFate==='keep'?'二月，周氏诞龙凤，四皇子、五公主生。皇子有异征，上斥妖言，命同常皇嗣育之。':state.flags?.twinBoyFate==='send'?'二月，周氏诞龙凤，一女入玉牒；一子以疾出养宗支，不列内廷。':'二月，周氏诞龙凤，一女入玉牒；一子不育。';
      return `承熙元年正月，上定中宫班序。${twin}`;
    }
    if(t==='母至')return '承熙二年二月，蘅国旧后闻人氏入内廷，特旨册为蘅嫔。上命旧国书信、香药及随身旧物皆经内务府复验。';
    if(t==='御前终选')return `承熙三年二月，上亲临体元殿终选。邵明贞初封${initialTitleV38('ning')}，霍素英初封${initialTitleV38('ke')}，崔静仪初封${initialTitleV38('hui')}；另留低位宫嫔${state.flags?.v37LowCount||0}人。`;
    if(t==='宫灯渐繁'){
      const a=['承熙三年至六年，六宫渐备。'];
      if(state.flags?.wenhengPregHistory)a.push(state.flags?.wenhengMiscarried?'四年，蘅嫔有娠，八月失之。':'四年，蘅嫔有娠。');
      if(state.flags?.fifthPrincessBorn)a.push('四年，低位宫嫔诞六公主。');
      if(state.flags?.fourthPrinceBorn)a.push(`五年，霍氏诞${huoPrinceOrderV38(state)}。`);
      if(state.flags?.sixthPrincessBorn)a.push('六年，邵氏诞七公主。');
      const ex=[state.flags?.extraHeirs?.[1],state.flags?.extraHeirs?.[2]].filter(x=>x?.born);if(ex.length)a.push(`六年，玉牒又增${ex.map(x=>x.order).join('、')}。`);
      if(state.flags?.baopuPregnant)a.push('六月，昭氏有娠。');
      return a.join('');
    }
    if(t==='香尽胎寒')return '承熙六年冬，昭氏失子。上命查太医院产案及旧香复验，内廷始疑旧年贡造、香药诸环节。';
    if(t==='灯下旧局')return '承熙七年，闻人含章陈旧国往来诸事，后因救驾受伤。上嘉其功，恩礼视所定。';
    if(t==='刃落宫门'){
      const bp=state.flags?.baopuPunishment==='onsite'?'昭氏行刺，当场伏诛。':state.flags?.baopuPunishment==='extreme'?'昭氏行刺，坐大逆，明正典刑。':'昭氏行刺，下慎刑司，后废位赐死。';
      const wh=state.flags?.wenhengFate==='west'?'蘅嫔退居西苑。':state.flags?.wenhengFate==='return'?'蘅嫔奉旨返蘅地终老。':'蘅嫔旋薨。';
      return `承熙八年，${bp}${wh}`;
    }
    if(t==='旧茶未凉')return state.flags?.shenVerdict==='limited'?'承熙九年，沈氏旧案平，追复旧臣名籍；旧年御批不宣于外。':'承熙九年，沈氏旧案平，上命军令、御批并入实录，以明旧案。';
    const base=typeof annalFor==='function'?annalFor(i):'';return (base||`${e.date}，内廷有事，史官从略。`).replace(/\s*——《[^》]+》/g,'').trim();
  }
  chronicleView=function(){
    const timeline=`<div class="v38-timebar"><b>史书的写法</b>这里不再列人物关系数值变化。大事录只把真正进入史册的事放在最前；你当时的具体选择保留在“御前实录”里，默认折叠。</div>`;
    return `<main class="page chronicle"><div class="page-title"><span class="eyebrow">承熙朝·后宫大事录</span><h1>大事录</h1><p>史书只记得被允许留下的句子。人的停顿、怨恨与亲疏，不会以数字出现在这里。</p></div>${timeline}${state.chronicle.length?state.chronicle.map((e,i)=>`<article><time>${e.date}</time><div><h2>${e.title}</h2><div class="v38-annal"><b>史官书</b>${historyRecordV38(e,i)}<em>——《大晟史·内廷记》</em></div><details class="v38-private"><summary>展开御前实录</summary><p><strong>裁断：</strong>${e.decision||'无明示裁断'}</p>${e.result?`<p>${e.result}</p>`:''}</details></div><button data-replay="${i}" title="从此处重走">重走</button></article>`).join(''):'<div class="empty">尚无已定之事。先完成第一章。</div>'}</main>`;
  };

  // 6) 老存档：因为第一章新增双生分支且会改变后续序齿，保留第一章原有选择，回到双生事件继续；其余章节需重新走时间线。
  if(!state.flags?.v38Migrated){
    const intro=state.intro;
    let oldPicks=[];
    if(state.index===0)oldPicks=(state.stepHistory||[]).slice(0,oldFirstCount);
    else if(Array.isArray(state.history?.[0]))oldPicks=state.history[0].slice(0,oldFirstCount);
    state=clone(INITIAL_STATE);state.intro=intro;state.flags.v38Migrated=true;
    delete CHILDREN.extraHeir1;delete CHILDREN.extraHeir2;delete CHILDREN.twinGirl;delete CHILDREN.twinBoy;
    oldPicks.forEach((p,si)=>{
      const st=first.steps[si],c=st?.choices?.[p];if(!c)return;
      const rr=resolvedResult(c,state);const chg=applyChoiceEffects(c);
      state.stepHistory.push(p);if(rr)state.stepResults.push(rr);state.stepChanges.push(...chg);state.lastChoice=p;
    });
    state.index=0;state.chapterStep=Math.min(oldPicks.length,oldFirstCount);
  }
  syncTwinChildrenV38(state);fixExtraOrdersV38(state);
  save();render();
}catch(e){console.error('v38 chronology/annals/twins patch failed',e)}})();
