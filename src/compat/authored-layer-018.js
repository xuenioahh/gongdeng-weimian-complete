(()=>{try{
  document.documentElement.dataset.build='v44';

  // ---------- 皇女序齿：现存皇女从大公主起顺排 ----------
  function v44PrincessText(txt){
    if(typeof txt!=='string')return txt;
    const marks=[
      ['十一公主','__V44P8__'],['十公主','__V44P7__'],['九公主','__V44P6__'],['八公主','__V44P5__'],
      ['七公主','__V44P4__'],['六公主','__V44P3__'],['五公主','__V44P2__'],['四公主','__V44P1__']
    ];
    let out=txt;marks.forEach(([a,b])=>out=out.replaceAll(a,b));
    return out
      .replaceAll('__V44P1__','大公主').replaceAll('__V44P2__','二公主')
      .replaceAll('__V44P3__','三公主').replaceAll('__V44P4__','四公主')
      .replaceAll('__V44P5__','五公主').replaceAll('__V44P6__','六公主')
      .replaceAll('__V44P7__','七公主').replaceAll('__V44P8__','八公主');
  }
  function v44FixPrincessOrders(s=state){
    if(CHILDREN.ruoxi){
      CHILDREN.ruoxi.order='大公主';
      CHILDREN.ruoxi.note='皇女中居长。生母已故宁嫔，由皇后抚养。她偶尔从大人的谈话边经过，更多时候只是看见，不承担本卷主要冲突。';
    }
    if(CHILDREN.twinGirl){CHILDREN.twinGirl.order='二公主';CHILDREN.twinGirl.note=v44PrincessText(CHILDREN.twinGirl.note||'')}
    if(CHILDREN.fifthPrincess){CHILDREN.fifthPrincess.order='三公主';CHILDREN.fifthPrincess.note=v44PrincessText(CHILDREN.fifthPrincess.note||'')}
    if(CHILDREN.sixthPrincess){CHILDREN.sixthPrincess.order='四公主';CHILDREN.sixthPrincess.note=v44PrincessText(CHILDREN.sixthPrincess.note||'')}
    const ex=s?.flags?.extraHeirs||{};let next=5;
    [1,2].forEach(r=>{const x=ex[r];if(!x||x.skipped||x.gender!=='F')return;x.order=`${next++}公主`;const ck=`extraHeir${r}`;if(CHILDREN[ck])CHILDREN[ck].order=x.order;});
  }
  if(typeof fixExtraOrdersV38==='function'){
    const v44FixExtraOld=fixExtraOrdersV38;
    fixExtraOrdersV38=function(s=state){
      v44FixExtraOld(s);
      const ex=s.flags?.extraHeirs||{};let pn=5;
      [1,2].forEach(r=>{const x=ex[r];if(!x||x.skipped)return;if(x.gender==='F'){x.order=`${pn++}公主`;const ck=`extraHeir${r}`;if(CHILDREN[ck])CHILDREN[ck].order=x.order;}});
      v44FixPrincessOrders(s);
    };
  }
  if(typeof syncExtraHeirs==='function'){
    const v44SyncExtraOld=syncExtraHeirs;
    syncExtraHeirs=function(s=state){v44SyncExtraOld(s);v44FixPrincessOrders(s)};
  }

  // 让所有既有正文在最终显示时采用新皇女序齿；不改皇子序齿。
  CHAPTERS.forEach(ch=>{
    if(typeof ch.bridge==='function'){
      const old=ch.bridge;ch.bridge=s=>v44PrincessText(old(s));
    }else if(typeof ch.bridge==='string')ch.bridge=v44PrincessText(ch.bridge);
    (ch.steps||[]).forEach(st=>{
      st.heading=v44PrincessText(st.heading||'');
      const old=st.text;
      if(typeof old==='function')st.text=s=>{const a=old(s);return Array.isArray(a)?a.map(v=>v44PrincessText(v)):v44PrincessText(a)};
      else if(Array.isArray(old))st.text=s=>old.map(v=>v44PrincessText(typeof v==='function'?v(s):v));
      (st.choices||[]).forEach(c=>{
        const d=Object.getOwnPropertyDescriptor(c,'label');
        if(d&&'value'in d&&typeof c.label==='string')c.label=v44PrincessText(c.label);
        if(typeof c.hint==='string')c.hint=v44PrincessText(c.hint);
        if(typeof c.result==='string')c.result=v44PrincessText(c.result);
        else if(typeof c.result==='function'){const r=c.result;c.result=s=>v44PrincessText(r(s));}
      });
    });
  });
  v44FixPrincessOrders(state);

  // ---------- 重阳行刺仍是重头戏：保留原场面，只补足主控重伤与数日濒危 ----------
  const v44Assault=CHAPTERS?.[8]?.steps?.find(x=>x.heading?.includes('刀光之后'));
  if(v44Assault&&typeof v44Assault.text==='function'){
    const old=v44Assault.text;
    v44Assault.text=s=>{
      const arr=old(s).slice();
      const woundIdx=arr.findIndex(x=>typeof x==='string'&&x.includes('主控受创'));
      const extra=[
        `我想把腰直起来，右腿却先失了力。谢绍庭扶住我时，手掌刚碰到后腰便沾了一层血。`,
        `刀已经离身，伤口却压不住。太医从宴席另一头跑来，跪在廊砖上剪开龙袍内衬。第一块止血布很快透了，第二块压上去时，我已经听不清他在说什么。`,
        `皇后从西暖阁追出来，只看了一眼便停住脚。她没有喊，先回身命人封门，又让所有端过酒、换过灯、近过御座的人原地留下。`,
        `我被抬回养心殿时中途醒过一次。檐下的灯一盏一盏从眼前退过去，到了第三道门，我已经分不清哪一盏是真的。`,
        `后来裴景和告诉我，那夜从西暖阁到养心殿一共换了三次压伤的布。第五更以前，太医没有一个人敢说“无碍”。`
      ];
      if(woundIdx>=0)arr.splice(woundIdx,0,...extra);else arr.push(...extra);
      return arr;
    };
  }
  const v44Recovery=CHAPTERS?.[8]?.steps?.find(x=>x.heading?.includes('养心殿闻起来只有药味'));
  if(v44Recovery){
    v44Recovery.heading='第九幕 · 五日高热，养心殿没有开朝门';
    v44Recovery.text=s=>[
      `我第二日下午才真正醒过来。右肋下缠着厚布，呼吸深一点，伤处便像被人从里面重新扯开。太医不许我坐起，只让宫人把枕头垫高一寸。`,
      `第一夜高热来得很急。我记得太后坐在床边，后来又以为坐着的是先帝。有人替我换额上的冷帕，有人一遍遍问我认不认得眼前是谁。我答过什么，第二天全不记得。`,
      `第三日仍没有退热。前朝的折子只能送到养心殿外间，皇后在帘外收印，裴景和把必须当日回覆的军报另压一摞。没人敢把朱笔塞到我手里。`,
      `朝会停了五日。宫门外因此生出许多猜测：有人说刀伤入了脏腑，有人说我整夜昏迷，还有人已经悄悄打听几位皇子的起居。谢绍庭连换两轮禁军，不许一句未经核实的消息出内城。`,
      `太后第三日来时仍没有问昭氏。她把佛珠拨过半圈，忽然说：“你父皇年轻时，也总觉得刀只会从前朝来。”`,
      `我想笑，伤口却先抽了一下，只能闭眼。太后把后半句话咽了回去。`,
      `${courtTitle(s,'hanzhang')}伤得比我轻，右臂缝了五针。第三日她便想下床核口供，被我从内殿传话拦住。`,
      `她隔着帘子站了很久：“陛下若死了，姐姐这刀就算赢了。”`,
      `“朕没死。”`,
      `“所以臣才来。”`,
      `第五日夜里，高热终于退下去。太医撤掉一只炭盆，我才发现窗外已经下过一场雨。伤口仍不能碰，翻身要两个人扶。`,
      `第六日，我第一次在榻上听完一份完整口供。说到昭氏时，裴景和停了一下。我让他继续。声音落在药气里，比平日慢得多。`,
      `直到半个月后，我才勉强下地走到窗前。走七八步便会出冷汗。重阳那一刀没有留在一夜里，它跟着我进了之后几个月的每一次召见、每一次骑马和每一次夜里翻身。`
    ];
  }

  // ---------- 张元照：从新一轮采选进入，不提前用正文揭底 ----------
  Object.assign(PEOPLE.zhangyuanzhao,{
    name:'张元照',title:'待选秀女',age:'19岁',home:'储秀宫',noPortrait:true,portraitKind:'youngwoman',glyph:'照',introducedAt:11,
    tags:['新选秀女','记事极快','言语偶有生疏'],
    bio:'新一轮采选入宫的秀女之一。她学宫规很快，却偶尔会在最普通的事情上停顿，好像先要把眼前的规矩与另一套完全不同的生活重新对齐。'
  });
  INITIAL_STATE.ranks.zhangyuanzhao=INITIAL_STATE.ranks.zhangyuanzhao||'待选';
  INITIAL_STATE.bond.zhangyuanzhao=INITIAL_STATE.bond.zhangyuanzhao??28;
  INITIAL_STATE.trust.zhangyuanzhao=INITIAL_STATE.trust.zhangyuanzhao??34;
  state.ranks.zhangyuanzhao=state.ranks.zhangyuanzhao||'待选';
  state.bond.zhangyuanzhao=state.bond.zhangyuanzhao??28;
  state.trust.zhangyuanzhao=state.trust.zhangyuanzhao??34;

  const v44CourtOld=courtTitle;
  courtTitle=function(s,k){
    if(k==='zhangyuanzhao'){
      const raw=s?.ranks?.[k]||PEOPLE[k]?.title||'待选';
      if(/^故|^废/.test(raw)||raw==='皇后')return raw;
      if(['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'].includes(raw))return '张'+raw;
      return raw==='待选'?'待选秀女':raw;
    }
    return v44CourtOld(s,k);
  };
  displayRank=function(k,s=state){return courtTitle(s,k)};
  function v44NextZhangTitle(s=state){
    const order=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];
    const raw=s.ranks?.zhangyuanzhao||'常在',i=order.indexOf(raw),n=i>=0&&i<order.length-1?order[i+1]:raw;
    return n==='皇后'?'皇后':'张'+n;
  }
  function v44SyncZhang(s=state){
    if(s.flags?.zhangRevealed){
      PEOPLE.zhangyuanzhao.tags=['穿越者','御前知情','不熟旧时代的理所当然'];
      PEOPLE.zhangyuanzhao.bio='她向皇帝坦白，自己并非来自大晟任何州府，而是来自遥远的后世。宫中无人知晓此事；旁人只觉得她记事方式、卫生习惯与一些判断异乎寻常。';
    }
  }

  const v44ApplyOld=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=v44ApplyOld(c);
    if(c.effects?.ranks?.zhangyuanzhao&&!HAREM_KEYS.includes('zhangyuanzhao'))HAREM_KEYS.push('zhangyuanzhao');
    if(c.effects?.flags?.v44PromoteZhang){
      if(promoteRank('zhangyuanzhao'))out.push(`张元照晋一级 → ${courtTitle(state,'zhangyuanzhao')}`);
    }
    v44FixPrincessOrders(state);v44SyncZhang(state);
    return out;
  };

  // 在承熙十一年的新选篇末真正让张元照入宫。
  const v44Selection=CHAPTERS[11];
  const v44OldSelectionLen=v44Selection?.steps?.length||0;
  if(v44Selection?.steps&&!v44Selection.steps.some(x=>x.heading?.includes('最后一张名帖'))){
    const previousLast=v44Selection.steps[v44Selection.steps.length-1];
    if(previousLast?.choices?.[0]){previousLast.choices[0].label='继续终选';previousLast.choices[0].result='';}
    v44Selection.steps.push({
      heading:'第十二幕 · 最后一张名帖',cast:['gu','zhangyuanzhao'],fx:'candle',keyDecision:true,
      text:s=>[
        `终选最后一日下午，储秀宫送来最后一册名帖。张元照排在末页，不是家世最高的，也不是最会应答的。`,
        `她进殿时先看了一眼门槛，脚抬得比别人高一点，像还没习惯宫门为什么总有这么高的槛。`,
        `皇后问：“若宫中旧例与眼前实情相冲突，该听哪一个？”`,
        `张元照没有立刻背女训。她想了一会儿：“先把眼前的事记清楚。”`,
        `皇后抬眼。`,
        `她又补了一句：“旧例若是为了解决事情，总得先知道现在发生的，和当年是不是同一件事。”`,
        `殿里静了一息。太后没有说好，也没有说不好。`,
        `我问：“你在家里也这样说话？”`,
        `她笑了一下，很快收住：“臣女在家……说话更随便些。”`,
        `皇后在她名字旁边点了一粒墨，却没有替我写位分。`
      ],choices:[
        {label:'留牌，初封张贵人',hint:'初封，不属于晋级；位分较高，也更容易被六宫注意',effects:{ranks:{zhangyuanzhao:'贵人'},flags:{v44ZhangEntered:true,v44ZhangInitial:'贵人'}},result:'册书下到储秀宫时，张元照把“贵人”两个字看了好一会儿。教习嬷嬷提醒她接旨，她才跪下。起身后，她把册书从头到尾又读了一遍。'},
        {label:'留牌，初封张常在',hint:'从低位开始，让她先在宫里真正住下来',effects:{ranks:{zhangyuanzhao:'常在'},flags:{v44ZhangEntered:true,v44ZhangInitial:'常在'}},result:'她以常在入宫，住处不大。第一晚她没有问什么时候承宠，只问宫里夜间若有人发热，应该先去报哪一处。掌事嬷嬷觉得问题晦气，没有答她。'}
      ]
    });
  }

  // ---------- 顾明宜终局：慢下来写完凤仪宫最后一冬 ----------
  if(!CHAPTERS.some(x=>x.title==='凤仪宫最后一冬')){
    CHAPTERS.push({
      date:'承熙十二年·秋至十三年正月',title:'凤仪宫最后一冬',theme:'窗纸一层层换新，凤仪宫那盏灯却终于没有等到天亮',place:'凤仪宫',cast:['gu','ning','zhangyuanzhao','taihou'],fx:'snow',
      bridge:s=>`新一轮采选以后，储秀宫重新有人声。皇后照旧核月例、住处和请安班次，仿佛十一年来她每天做的事只是换了几本新名册。到承熙十二年秋，宫里起了一场拖得很久的秋热。`,steps:[
        {heading:'第一幕 · 最先咳嗽的是储秀宫西院',cast:['gu','ning','zhangyuanzhao'],fx:'rain',narrative:true,text:s=>[
          `九月初，储秀宫西院先有两个宫女发热。第三日又添一人。太医院说只是时气，皇后仍把三个人挪到空着的侧院，不许再回原值房。`,
          `她亲自核了送饭、送水和换洗的人名。名册写到半夜，金凤钗那道旧划痕在灯下时明时暗。`,
          `${courtTitle(s,'ning')}来接走一半宫务。皇后最初还说“不必”，邵明贞已经把冬衣、药材和储秀宫三项支用抱到自己膝上：“娘娘若都要自己看，明日太医先要看您。”`,
          `${courtTitle(s,'zhangyuanzhao')}那时位分不高，只负责自己院里的人。她却把喝水的杯子分开做了记号，又叫人把用过的布巾煮过再晒。嬷嬷嫌她事多，她也不争，只自己盯着做。`,
          `皇后听见以后，把她叫到凤仪宫问缘故。张元照答：“混着用，病的人只会更多。”`,
          `皇后问：“太医教你的？”`,
          `她停了一下：“家里旧习。”`,
          `皇后没有继续问，只让尚宫把这条也抄进临时章程。`
        ],choices:[{label:'继续',effects:{trust:{gu:2,ning:1,zhangyuanzhao:2},flags:{autumnFeverBegins:true}},result:''}]},
        {heading:'第二幕 · 凤仪宫也开始闭门',cast:['gu','taihou'],fx:'candle',narrative:true,text:s=>[
          `十月中旬，皇后第一次咳到说不完整一句话。`,
          `她仍坐在案后，咳完把帕子折进去，继续问内务府冬炭够不够。尚宫答了两遍，她才发现自己刚才已经问过。`,
          `太医请她停宫务。她说“等今日这页看完”，看完以后又翻到下一页。`,
          `太后亲自来了一次，没有训她，只把案上的册子一本一本合上。`,
          `皇后看着母后把最后一本也收走，过了一会儿说：“还有西院那几个病人的药。”`,
          `“有人管。”`,
          `“谁？”`,
          `太后朝门外看了一眼。邵明贞正站在廊下等回话。`,
          `皇后没有再把册子要回来。`
        ],choices:[{label:'继续',effects:{flags:{guIllnessDeepens:true}},result:''}]},
        {heading:'第三幕 · 她第一次把空白处交给别人',cast:['gu','ning'],fx:'ink',narrative:true,text:s=>[
          `病到第十二日，凤仪宫送出一张没有写完的宫务单。`,
          `最后一栏是“发热宫人痊愈后如何复值”。旧例里没有这一条。皇后过去遇到这种空白，总要把前朝、先帝朝和潜邸旧规翻遍。`,
          `这一次，她把纸递给邵明贞。`,
          `“你写。”`,
          `${courtTitle(s,'ning')}没有立刻接：“娘娘要什么写法？”`,
          `皇后靠在软枕上，呼吸很轻：“你觉得怎么妥，就怎么写。”`,
          `邵明贞这才坐到小案边。她写了三行，划掉一行，再添一行。皇后从头看完，只改了一个字。`,
          `纸送出去以前，两个人谁也没有再提“旧例”。`
        ],choices:[{label:'继续',effects:{trust:{gu:3,ning:3},flags:{guHandsJudgmentToNing:true}},result:''}]},
        {heading:'第四幕 · 张元照留下的那本薄册',cast:['zhangyuanzhao','gu'],fx:'candle',narrative:true,text:s=>[
          `${courtTitle(s,'zhangyuanzhao')}把各院发热的日子、接触过的人、送药路线抄成一本很薄的册子。她画的不是宫图，只是一条条线。`,
          `皇后病中看了半页，问：“为什么把人名写在一起？”`,
          `“谁先病，谁后来去过哪里，放在一起比较容易看。”`,
          `“比较什么？”`,
          `张元照把一句已经到嘴边的话咽回去：“看是不是总从同一处传开。”`,
          `皇后用指腹压住其中一条线。那条线从储秀宫西院绕到尚衣局，又停在两名已经发热的宫女名字上。`,
          `她叫人把尚衣局那一班先换下来休息。三日后，那一处没有再添新病人。`,
          `薄册没有署名。皇后却让人收进凤仪宫临时章程的匣子里。`
        ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:4,gu:1},flags:{zhangFeverLedger:true}},result:''}]},
        {heading:'第五幕 · 这一次要不要给张元照进一级',cast:['gu','zhangyuanzhao'],fx:'seal',keyDecision:true,text:s=>[
          `十一月，秋热渐退。凤仪宫的赏单里多出张元照的名字。`,
          `皇后没有替她写“晋”，只写了“有劳”。`,
          `张元照也没有递请封折。她来谢赏时还抱着那本薄册，边角已经卷了。`,
          `位分仍在御案上，由我决定。`
        ],choices:[
          {get label(){return `办事有功，晋${courtTitle(state,'zhangyuanzhao')}一级`;},hint:'仍只进一阶，不越序',effects:{flags:{v44PromoteZhang:true,zhangFeverMerit:true}},result:s=>`册旨写的是${v44NextZhangTitle(s)}。张元照接旨后没有设宴，只把新月例里多出的纸张全换成了厚一点的册纸。`},
          {label:'不晋位，只按功厚赏',hint:'把功劳与位分分开',effects:{trust:{zhangyuanzhao:2},flags:{zhangFeverMerit:true,zhangNoFeverPromotion:true}},result:'金银和绢布照例送去，她的位分没有动。她把赏下来的绢分给同院病愈的宫女，自己只留下两匹最耐洗的。'}
        ]},
        {heading:'第六幕 · 冬至以后，皇后不再梳全套钗环',cast:['gu','emperor'],fx:'snow',narrative:true,text:s=>[
          `入冬以后，皇后的热退了，咳嗽却一直没有断。`,
          `她不再每日梳全套中宫钗环，只把那支潜邸旧金凤钗插在发间。人瘦下来以后，钗显得比从前更重。`,
          `我去凤仪宫时，她正让人把大公主的冬衣加一层棉，又让三皇子的弓课暂减两日。`,
          `“你病着还管这些。”`,
          `“他们又不会因为臣妾病了就不长。”`,
          `她说完咳了一阵。宫女来扶，被她摆手退下。`,
          `等气息平下来，她问我：“若以后凤仪宫换了人，陛下会让她照我的规矩来么？”`,
          `我没有马上答。`,
          `她摸到金凤钗尾羽的旧痕，笑得很淡：“别。她若坐这里，让她自己学。”`
        ],choices:[{label:'继续',effects:{bond:{gu:3},flags:{guLastWinterTalk:true}},result:''}]},
        {heading:'第七幕 · 最后一页宫务册',cast:['gu','ning','taihou'],fx:'candle',narrative:true,text:s=>[
          `腊月二十七，皇后把这一年的宫务册翻到最后一页。`,
          `她已经握不稳朱笔，写一个字要停一次。邵明贞坐在床边替她磨墨，没有催。`,
          `最后一页只写了三件事：大公主开春换师傅；三皇子的弓房修漏；慈宁宫东暖阁添一层地毡。`,
          `没有哪一件与皇后自己有关。`,
          `太后来时，她已经睡着。邵明贞起身让座，太后没有坐，只替皇后把被角掖进去。`,
          `半夜她醒了一次，问：“册子收了吗？”`,
          `我说收了。`,
          `“别压在最底下。明年还要接着写。”`,
          `她说完又睡过去。`
        ],choices:[{label:'继续',effects:{flags:{guFinalLedger:true}},result:''}]},
        {heading:'第八幕 · 凤仪宫没有等到晨钟',cast:['gu','taihou','ning'],fx:'snow',narrative:true,text:s=>[
          `正月初二，天还没亮，凤仪宫来人叩养心殿门。`,
          `我赶到时，殿里的灯全点着。皇后没有再戴金凤钗，那支钗放在枕边的小匣里。`,
          `太医跪了一地。太后坐在床侧，手掌一直覆在皇后腕上，像这样便还能摸到一点脉。`,
          `邵明贞站在帘外，没有进去。`,
          `皇后最后醒得很短。她先看见太后，又看见我。嘴唇动了两次，我俯身才听清。`,
          `“钗别给下一位。”`,
          `我说好。`,
          `她像放下一件拖了很久的宫务，眼睛慢慢合上。`,
          `晨钟响以前，太医伏地。凤仪宫所有人同时跪下。`
        ],choices:[{label:'继续',effects:{ranks:{gu:'故皇后'},flags:{guDead:true,guPhoenixPinSealed:true}},result:'凤仪宫正殿停了三日常灯。那支有旧划痕的金凤钗随梓宫封入，不再作为下一位皇后的旧物。'}]},
        {heading:'皇后出殡',cast:['taihou','ning','zhangyuanzhao','shen','hanzhang'],fx:'snow',narrative:true,text:s=>[
          `梓宫移出凤仪宫那日没有下雪，风却很硬。`,
          `太后从头站到尾。大公主被嬷嬷牵着，几次回头看宫门。三皇子低着头，没有哭。`,
          `${courtTitle(s,'ning')}替中宫料理完最后一批丧仪名册，手上沾着朱砂。礼毕以后她没有回景仁宫，先去慈宁宫陪太后吃了一碗几乎没动的粥。`,
          `${courtTitle(s,'zhangyuanzhao')}站在较远的一列。她没有资格靠前，只在梓宫经过时深深俯身。`,
          `当晚，凤仪宫落锁。第二日清晨，没有人再从那里送出合宫请安的时辰单。`
        ],choices:[{label:'翻到下一章',effects:{flags:{guFuneralComplete:true}},result:''}]}
      ]
    });
  }

  // ---------- 中宫空悬：邵氏与张元照真正争后位 ----------
  if(!CHAPTERS.some(x=>x.title==='中宫空悬')){
    CHAPTERS.push({
      date:'承熙十三年·春至十四年春',title:'中宫空悬',theme:'凤印收进匣中以后，两种完全不同的秩序同时走到御前',place:'养心殿 / 凤仪宫',cast:['ning','zhangyuanzhao','taihou'],fx:'candle',
      bridge:s=>`皇后梓宫出宫以后，凤仪宫空了整整一年。六宫的请安改到慈宁宫，宫务暂由邵明贞会同尚宫局处置。张元照仍住原来的宫室，只是递到御前的册子渐渐多起来。`,steps:[
        {heading:'第一幕 · 六宫先学会没有皇后的早晨',cast:['ning','taihou'],fx:'dawn',narrative:true,text:s=>[
          `头一个月，请安时总有人下意识往凤仪宫方向走半段，再在宫道口折回。`,
          `${courtTitle(s,'ning')}每天比众人早到慈宁宫半刻钟。她先看太后的药，再看尚宫局送来的宫务。有人称她“代掌六宫”，她第一次听见时皱了皱眉：“只管事，不代谁。”`,
          `太后没有替侄女说话。她只在一回散席后问我：“凤印总不能一直锁着。”`,
          `我说还在服制。`,
          `“哀家知道。”`,
          `她便不再提。`
        ],choices:[{label:'继续',effects:{trust:{ning:3},flags:{ningManagesPalace:true}},result:''}]},
        {heading:'第二幕 · 张元照的册子里总有些奇怪的空格',cast:['zhangyuanzhao'],fx:'ink',narrative:true,text:s=>[
          `${courtTitle(s,'zhangyuanzhao')}把秋热后的值房记录重新誊了一遍。她在每个人名后留三列空格：何时发热、去过何处、最后一次见谁。`,
          `裴景和看不惯那种格式，拿来给我看：“张主子写账不像账。”`,
          `我把她叫来。`,
          `“为什么这样写？”`,
          `她说：“这样容易找共同的地方。”`,
          `“谁教你的？”`,
          `这一次她没有再说家里旧习。她站了很久，问能不能只留裴景和一人在殿外。`
        ],choices:[{label:'让殿里的人都退下',effects:{flags:{zhangPrivateAudience:true}},result:''}]},
        {heading:'第三幕 · “臣妾不是从哪个州府来的”',cast:['zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
          `门合上以后，张元照先问：“陛下若觉得臣妾疯了，会怎么处置？”`,
          `“先听你说。”`,
          `她低头看了很久自己的手。`,
          `“臣妾不是从哪个州府来的。”`,
          `我没有说话。`,
          `“臣妾来的地方……在很久以后。”`,
          `她说那里夜里的街可以亮得像白昼，女子能在学堂读到二十多岁，千里外的人不靠驿马也能说话。她没有拿出任何神物，身上也没有能证明这些话的东西。`,
          `我问她那个时代叫什么。她报了一个纪年，又自己摇头：“陛下不会认得。”`,
          `“为何现在说？”`,
          `“皇后娘娘死前用了臣妾那本册子。臣妾若还把所有不合时宜的东西都推给‘家里旧习’，迟早会害到别人。”`,
          `她跪下去：“这件事，臣妾只敢让陛下知道。”`
        ],choices:[
          {label:'此事止于御前，不许再对第二人提',hint:'保住秘密，也把风险留在御前',effects:{trust:{zhangyuanzhao:7},flags:{zhangRevealed:true,zhangSecretPolicy:'sealed'}},result:'我让裴景和把当日召见时辰照常记，不另立密档。她起身时腿已经跪麻，扶了一下桌角才站稳。'},
          {label:'继续问她后世，但不准拿“未来”干预朝政',hint:'允许她解释自己，不让未证之事变成谶语',effects:{bond:{zhangyuanzhao:3},trust:{zhangyuanzhao:4},flags:{zhangRevealed:true,zhangSecretPolicy:'questioned'}},result:'那一夜谈到很晚。我问的多是最普通的事：人怎么取暖、怎么读书、病了去哪里。她答到后来声音发哑。我没有问大晟以后会怎样。'},
          {label:'不追问来处，只看她此后做什么',hint:'不相信，也不急着揭穿',effects:{trust:{zhangyuanzhao:2},flags:{zhangRevealed:true,zhangSecretPolicy:'watch'}},result:'我没有让她证明。她也没有再讲那些遥远的东西。第二日起，她仍照常请安，照常学这个时代的规矩。'}
        ]},
        {heading:'第四幕 · 同一场夏雨，两个人各管一半',cast:['ning','zhangyuanzhao'],fx:'rain',narrative:true,text:s=>[
          `十三年六月，一场暴雨灌进西六宫两处库房。药材怕潮，冬衣也泡了水。`,
          `${courtTitle(s,'ning')}先调空殿、点人数、封受潮库门，照宫中品级把人和物一层层分开。半个时辰以后，乱跑的宫人已经各归一处。`,
          `${courtTitle(s,'zhangyuanzhao')}则蹲在库门边，把所有搬出来的箱子重新编号。她不问哪宫先领，只先分“还能用”“要晾”“必须丢”。`,
          `两个人第一次真正顶上，是一批只湿了外层的药包。邵明贞说太医院验过再用；张元照说开封前先整批隔开，别和干药放在一起。`,
          `最后两样都做了。`,
          `雨停时，两个人站在廊下各自拧袖口的水。邵明贞看着她：“你总喜欢把东西分得很开。”`,
          `张元照答：“娘娘总喜欢先把人站稳。”`,
          `“不好？”`,
          `“很好。”`,
          `她顿了顿，“只是有时候，站稳以后还得重新分。”`
        ],choices:[{label:'继续',effects:{trust:{ning:2,zhangyuanzhao:2},flags:{ningZhangWorkTogether:true}},result:''}]},
        {heading:'第五幕 · 张元照再有一阶可进',cast:['zhangyuanzhao','ning'],fx:'seal',keyDecision:true,text:s=>[
          `雨后的库房清点没有出乱子。尚宫局把两个人的名字都写进回奏。`,
          `${courtTitle(s,'ning')}已经在替六宫担事，位分是否再动另有旧例可议。张元照这边却有一张单独的晋位折。`,
          `折子很薄，只写“办事勤慎”。`,
          `我把它留到最后才批。`
        ],choices:[
          {get label(){return `准${courtTitle(state,'zhangyuanzhao')}再晋一级`;},hint:'仍只进一阶，不越序',effects:{flags:{v44PromoteZhang:true,zhangSecondMerit:true}},result:s=>`这一次册书写成${v44NextZhangTitle(s)}。她谢恩后先去慈宁宫，再去景仁宫。邵明贞受了她一礼，只说：“往后坐得更近，话也会更多。”`},
          {label:'仍不晋位，只记功',hint:'让她以现位继续参与宫务',effects:{trust:{zhangyuanzhao:2},flags:{zhangSecondMerit:true,zhangNoSecondPromotion:true}},result:'位分仍旧。她没有再问，回去继续把受潮库房的清单补完。'}
        ]},
        {heading:'第六幕 · 凤仪宫重新开门',cast:['ning','zhangyuanzhao','taihou'],fx:'candle',narrative:true,text:s=>[
          `十四年二月，皇后服制将尽，凤仪宫第一次重新开正门。`,
          `不是迎新主，只是清点封存。金凤钗已经随梓宫入葬，妆台上只剩一只空匣。`,
          `${courtTitle(s,'ning')}先到。她把旧宫务册从最上层取下来，没有翻，只交给尚宫：“原处放回。”`,
          `${courtTitle(s,'zhangyuanzhao')}晚半刻到。她站在门内看了很久，最后问的却是窗子为什么总只开一半。`,
          `太后坐在正殿，没有叫任何人坐皇后的旧位置。`,
          `她看了两个人一会儿：“一个从小认得这宫里的路，一个到现在还常问为什么要这样走。”`,
          `没人接话。`,
          `“路总要有人带，也总要有人问。”太后把茶放下，“余下的，皇帝自己定。”`
        ],choices:[{label:'继续',effects:{flags:{empressChoiceOpened:true}},result:''}]},
        {heading:'第七幕 · 她们第一次把话说在凤仪宫里',cast:['ning','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
          `太后走后，正殿只剩邵明贞和张元照。`,
          `邵明贞先开口：“你若真想坐这里，别只靠那些别人没听过的办法。”`,
          `张元照没有装听不懂：“娘娘若真想坐这里，也别只因为所有人都认识你。”`,
          `两句话都不客气。说完以后，反而没有再绕。`,
          `邵明贞走到窗边，把卡住半寸的窗栓推开：“皇后不是让人觉得新鲜。”`,
          `张元照把另一扇也推开：“也不是让人觉得熟悉。”`,
          `风一下灌进来，把旧帘吹得很高。两个人同时伸手去按，手碰到一处，又同时收回。`
        ],choices:[{label:'继续',effects:{trust:{ning:1,zhangyuanzhao:1},flags:{rivalsSpeakPlainly:true}},result:''}]},
        {heading:'第八幕 · 凤印前最后一道旨',cast:['ning','zhangyuanzhao','taihou'],fx:'seal',keyDecision:true,text:s=>[
          `凤印从库里取出来那日，匣子上积了一层极薄的灰。`,
          `礼部把两份拟册摆在御案。邵明贞的那一份，背后是太后母族、顾氏旧亲和这些年实际担过的六宫事务；张元照的那一份，背后没有能替她说话的大族，只有御前知道的秘密与这些年留下的一本本册子。`,
          `册立皇后不是寻常一次晋封。无论从哪一位次立后，都要另下册后特旨、告宗庙、受凤印。`,
          `太后没有替侄女开口。`,
          `殿外等着宣旨。`
        ],choices:[
          {get label(){return `册${courtTitle(state,'ning')}邵明贞为皇后`;},hint:'旧亲、外戚与实际宫务经验都更稳；她也必须从顾明宜的影子里真正走出来',effects:{ranks:{ning:'皇后'},flags:{v44NewEmpress:'ning'}},result:'册后诏书先送慈宁宫，再告宗庙。邵明贞受凤印时没有戴顾明宜留下的任何旧物。礼成后她回凤仪宫，第一件事是把窗全部打开。'},
          {get label(){return `册${courtTitle(state,'zhangyuanzhao')}张元照为皇后`;},hint:'她没有显赫母族替她兜底。可她敢在没有答案时先做决定，也肯在天亮以后留下自己的名字——中宫的权力若交给她，不等于交给一个永远不会错的人。',effects:{ranks:{zhangyuanzhao:'皇后'},flags:{v44NewEmpress:'zhangyuanzhao'}},result:'诏书下时，前朝先安静了一日。张元照受凤印后独自在凤仪宫站到很晚。第二天她让尚宫把所有旧章程搬来，一本没烧，只另外放了一叠空纸。'}
        ]}
      ]
    });
  }

  // ---------- 大事录与页面同步 ----------
  if(typeof historyRecordV38==='function'){
    const v44HistOld=historyRecordV38;
    historyRecordV38=function(e,i){
      const t=e?.title||'';
      if(t==='凤仪宫最后一冬')return '承熙十二年秋，内廷有疾。十三年正月，皇后顾氏崩，辍朝，谥册从典。';
      if(t==='中宫空悬'){
        if(state.flags?.v44NewEmpress==='ning')return '承熙十四年，册邵氏为皇后，告庙受印。';
        if(state.flags?.v44NewEmpress==='zhangyuanzhao')return '承熙十四年，特旨册张氏为皇后，告庙受印。';
        return '承熙十四年，中宫久虚，廷议册后。';
      }
      return v44PrincessText(v44HistOld(e,i));
    };
  }
  if(typeof chronicleView==='function'){
    const v44ChronOld=chronicleView;chronicleView=()=>v44PrincessText(v44ChronOld());
  }
  if(typeof childrenView==='function'){
    const v44ChildOld=childrenView;childrenView=()=>{v44FixPrincessOrders(state);return v44PrincessText(v44ChildOld())};
  }

  FUTURE_ARC.zhangyuanzhao={name:'张元照',startRank:'常在/贵人（由主控初封）',endRank:'皇后或留宫',status:'承熙十一年起登场',note:'来自后世；秘密只在御前揭开，与邵明贞争夺顾皇后之后的中宫之位'};
  v44SyncZhang(state);v44FixPrincessOrders(state);

  // 老存档若已走完原来的卷一，拉回承熙十一年终选最后一张名帖，避免跳过张元照。
  if(!state.flags?.v44Migrated){
    if((state.index||0)>=12&&!state.flags?.v44ZhangEntered){
      state.index=11;state.chapterStep=v44OldSelectionLen;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.lastChoice=null;
    }
    state.flags.v44Migrated=true;
  }

  save();render();
}catch(e){console.error('v44 succession/princess/assassination patch failed',e)}})();
