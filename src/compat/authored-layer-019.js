(()=>{try{
  document.documentElement.dataset.build='v45';

  const second=CHAPTERS.find(ch=>ch.title==='空宫点灯');
  const winter=CHAPTERS.find(ch=>ch.title==='凤仪宫最后一冬');
  const vacancy=CHAPTERS.find(ch=>ch.title==='中宫空悬');

  const ensureFlag=(k,v)=>{if(state.flags[k]===undefined)state.flags[k]=v};
  ['v45SecondRosterCount','v45SecondLowStyle'].forEach(k=>ensureFlag(k,null));

  const v45SecondPeople={
    liang:{name:'梁素贞',family:'东南水师旧将之家',note:'父兄常年在海防任职，识军中弓械，却与霍氏北营并非一支。'},
    song:{name:'宋文秀',family:'江南漕运世家',note:'家中近年承接漕运、织造与仓储，正好填进崔氏旧供应网留下的空处。'},
    xu:{name:'许淑惠',family:'京中清望小族',note:'母族不显，家中也无重兵财权；太后在初阅名册时多问了她两句。'},
    sun:{name:'孙玉英',family:'御史之家',note:'说话慢，答问不抢先。'},
    wang:{name:'王静娘',family:'地方学官之家',note:'家世普通，字写得极稳。'},
    li:{name:'李淑云',family:'工部官员之家',note:'擅女红，也识一点营造尺寸。'}
  };
  const secondFixed=['liang','song','xu'];
  const secondFill=['sun','wang','li'];
  const secondSelectedKeys=s=>{
    const n=Math.max(3,Math.min(6,Number(s.flags?.v45SecondRosterCount||3)));
    return [...secondFixed,...secondFill.slice(0,n-3)];
  };
  const secondRank=s=>s.flags?.v45SecondLowStyle==='allDaying'?'答应':'常在';
  const secondCourt=(key,s=state)=>`${v45SecondPeople[key].name.slice(0,1)}${secondRank(s)}`;
  const selectedRosterText=s=>secondSelectedKeys(s).map(k=>`${v45SecondPeople[k].name}（${secondRank(s)}）`).join('、');

  // 第二次选秀：旧妃也在看新人，新人也在看旧妃。
  if(second?.steps){
    const zidx=second.steps.findIndex(x=>(x.heading||'').includes('最后一张名帖'));
    if(zidx>=0&&!second.steps.some(x=>(x.heading||'').includes('殿里的人也在被看'))){
      second.steps.splice(zidx,0,
        {heading:'第九幕 · 殿里的人也在被看',cast:['gu','ning','ke','hui','taihou'],fx:'candle',narrative:true,text:s=>[
          `第二轮终选比承熙三年安静得多。旧人已经在宫里坐了八年，秀女进殿以前，教引嬷嬷先教她们认座次、认宫门，也认谁是谁。`,
          `皇后仍坐正中。${courtTitle(s,'ning')}在她下首帮着翻名册，${courtTitle(s,'ke')}与${courtTitle(s,'hui')}只在最后几日过来旁听。没人说是在挑下一任什么人，礼部的名册上也只写家世、年岁与三代亲族。`,
          `许淑惠进殿时，先向皇后行礼，又转向${courtTitle(s,'ning')}。那一礼比妃礼重了半分，膝几乎已经要落到皇后礼的深度。`,
          `邵明贞没有让她跪完：“礼错了。”`,
          `许淑惠一下白了脸。`,
          `“起来，重来。”邵明贞声音并不重，“宫里最怕不是礼轻，是自己不知道在给谁行什么礼。”`,
          `许淑惠重新行了一次。皇后坐在后面，没有替任何人圆场，只把名册翻到下一页。`,
          `散场以后，两个小宫女在廊下收坐垫，其中一个低声问：“方才那礼为什么错？”另一个立刻让她闭嘴。脚步一响，两个人一起低头。`
        ],choices:[{label:'继续终选',effects:{flags:{v45TooDeepBow:true}},result:''}]},
        {heading:'第十幕 · 北营之外还有别的弓',cast:['ke'],fx:'wind',narrative:true,text:s=>[
          `终选前的骑射验看设在西苑射圃。梁素贞不是最会射的那个，她只在取弓时停了一下。`,
          `${courtTitle(s,'ke')}正站在廊下看名册。梁素贞抬头问教习：“这张是北营改过的弓么？弓梢比水师旧制短。”`,
          `教习没答上来。霍素英走过去，把弓从她手里接过，拇指压了一下弓弦：“你认得水师旧制？”`,
          `“臣女父亲在东南待过十一年。”`,
          `“海上也用这样的弓？”`,
          `“船上用得少。登岸以后才用。”`,
          `两个人接下来谈的全是弓臂、潮气和弦怎么收。等掌事来催，梁素贞才想起自己还在终选，忙退开半步。`,
          `霍素英把弓挂回架上，没有说留不留，只在名帖背面写了两个小字：识弓。`
        ],choices:[{label:'继续',effects:{flags:{v45LiangKnownToHuo:true}},result:''}]},
        {heading:'第十一幕 · 长春宫收到一盒新茶',cast:['hui'],fx:'petal',narrative:true,text:s=>[
          `宋文秀的家人在江南做漕运，也替织造局管过几年仓。她的名字进末轮以后，长春宫第二日便收到一盒江南新茶。`,
          `不是宋家私送，是内务府按例分给六宫的新贡。崔静仪把茶罐转了一圈，看到罐底新的贡号，才叫人泡。`,
          `嬷嬷道：“往年这一路都是崔家旧行接。”`,
          `“今年不是了。”`,
          `“娘娘要不要问问？”`,
          `崔静仪喝了一口。茶比往年的淡。她把杯子放下：“以后宫里的贡造单，不必都送我看了。”`,
          `嬷嬷一怔：“娘娘是不想管了？”`,
          `“不是。”崔静仪把茶罐盖好，“是不能再让人觉得，什么都得经过我。”`,
          `她让人照例给宋文秀送了一份见面礼，只是一匣普通绢花，没有崔家印记。`
        ],choices:[{label:'继续',effects:{flags:{v45SongThreatensCui:true}},result:''}]}
      );
    }

    // 重写张元照终选，让邵明贞亲手建议留下她。
    const zstep=second.steps.find(x=>(x.heading||'').includes('最后一张名帖'));
    if(zstep&&!zstep.v45){
      zstep.cast=['gu','ning','zhangyuanzhao'];
      zstep.text=s=>[
        `终选最后一日下午，储秀宫送来末页名帖。张元照排得很后，家世不算最高，前几轮答问也没有出过风头。`,
        `皇后已经看了一日名册，右手腕酸得厉害。她把册子往旁边推了推，${courtTitle(s,'ning')}顺手接过去，替她压住被穿堂风掀起的一角。`,
        `张元照进殿时先看了一眼门槛，脚抬得比别人高一点。皇后问：“若一宫忽然有多人发热，你先做什么？”`,
        `她没有答请太医，也没有答焚香祈福。`,
        `“先记清谁先病、谁和谁同住、昨天分别去了哪里。”`,
        `皇后抬眼：“为什么？”`,
        `“不然人越来越多，就只记得最后病倒的那个。”`,
        `殿里静了片刻。`,
        `邵明贞第一次从名册上抬头，认真看了她一眼。`,
        `又问了两句以后，张元照退到殿外。皇后拿笔蘸墨：“你方才一直看她。”`,
        `邵明贞把她那页名帖翻回来：“这个可以留。”`,
        `“因为那几句话？”`,
        `“因为她不知道的时候，会先承认自己不知道。”`,
        `皇后在张元照名字旁点了一粒墨，没有替我写位分。`
      ];
      zstep.v45=true;
    }

    // 张元照之后：主控亲定第二轮低位新人数量和初位。
    const zpos=second.steps.findIndex(x=>(x.heading||'').includes('最后一张名帖'));
    if(zpos>=0&&!second.steps.some(x=>(x.heading||'').includes('余下的名帖要留几张'))){
      second.steps.splice(zpos+1,0,
        {heading:'第十三幕 · 三张名帖一起落下',cast:['gu','ning'],fx:'seal',keyDecision:false,text:s=>[
          `张元照的册页收好以后，御案上还剩三张走到末轮的名帖：梁素贞、宋文秀、许淑惠。`,
          `梁家在东南水师，宋家近年接手江南漕运与仓储，许家门第不显。三个人站在同一轮，却没有谁是为了补足人数才留下。`,
          `我逐张看过，把三张都压在御案左侧。`
        ],choices:[
          {label:'三张名帖一并留下',effects:{flags:{v45SecondRosterCount:3,v46SecondRosterPruned:true}},result:'梁素贞、宋文秀、许淑惠留牌。连同先前留下的张元照，这一轮最终只有四人入宫。'}
        ]},
        {heading:'第十四幕 · 低位新人初封',cast:['gu'],fx:'seal',keyDecision:true,text:s=>[
          `留下的人都不是这一轮要立刻抬到高位的世家重臣之女。尚宫局只拟了两套册样：答应，或常在。`,
          `皇后把两份样册并在一起：“初封可以不同，但同一批新人若差得太多，宫里会立刻替陛下猜缘故。”`,
          `我看了一遍名帖。${secondSelectedKeys(s).map(k=>v45SecondPeople[k].name).join('、')}几个人的名字还没有和任何宫殿连在一起。`
        ],choices:[
          {label:'这一批一律初封答应',hint:'位置最低，先让她们在宫里住下来',effects:{flags:{v45SecondLowStyle:'allDaying'}},result:s=>`${secondSelectedKeys(s).map(k=>v45SecondPeople[k].name+'答应').join('、')}分别接了册页。`},
          {label:'这一批一律初封常在',hint:'仍是低位，但比答应多一层体面',effects:{flags:{v45SecondLowStyle:'allChangzai'}},result:s=>`${secondSelectedKeys(s).map(k=>v45SecondPeople[k].name+'常在').join('、')}分别接了册页。`}
        ]},
        {heading:'第十五幕 · 新人第一次请安',cast:['gu','ning','ke','hui','zhangyuanzhao'],fx:'dawn',narrative:true,text:s=>[
          `新人入宫后的第一次合宫请安，凤仪宫比过去挤得多。旧妃的位置没有变，新添的坐席却让宫女来回量了两遍。`,
          `${courtTitle(s,'zhangyuanzhao')}坐得很后。${secondSelectedKeys(s).map(k=>secondCourt(k,s)).join('、')}依次行礼。许氏这一次没有再错，膝盖只落到该落的位置。`,
          `皇后咳了一声，宫女把温水递上。邵明贞本能地伸手去接，手到一半又停住，让皇后自己的宫女先来。`,
          `霍素英看见梁氏时只点了一下头。崔静仪则对宋氏笑得很温和，还问她江南今年雨水多不多。`,
          `请安散后，新人一拨拨往外走。一个答应在门口回头看凤仪宫匾额，被嬷嬷轻轻推了一下肩：“别看了，路还长。”`
        ],choices:[{label:'继续',effects:{flags:{v45SecondSelectionComplete:true}},result:''}]}
      );
    }

    // 霍素英：第二支军门到底是同盟还是替代。
    if(!second.steps.some(x=>(x.heading||'').includes('射圃里多了一张新弓'))){
      second.steps.push({heading:'第十六幕 · 射圃里多了一张新弓',cast:['ke'],fx:'wind',keyDecision:true,text:s=>[
        `梁氏入宫半月以后，太后让新人去射圃看春射。她没有资格下场，站在最后，却还是认出了霍素英案边那张北营旧弓。`,
        `${courtTitle(s,'ke')}叫她过去，让她摸了一下弓梢：“你父亲若看见，会怎么改？”`,
        `梁氏说会换弦，不改弓。`,
        `“为什么？”`,
        `“海边潮，弦坏得比弓快。”`,
        `霍素英笑了一下。第二日，前朝便有折子提到东南水师换将。宫里的这场对话本来谁也不会在意。`
      ],choices:[
        {label:'让梁氏跟霍氏学宫中骑射礼',hint:'两支军门在宫里先成为熟人',effects:{trust:{ke:2},flags:{v45HuoLiang:'mentor'}},result:s=>`${courtTitle(s,'ke')}没有推辞。她给梁氏定的第一条规矩却是：“在宫里别替你父兄说话，我也不替北营说。”`},
        {label:'让两人各守各宫，不必走得太近',hint:'避免两支军门在内廷形成固定一线',effects:{flags:{v45HuoLiang:'separate'}},result:s=>`${courtTitle(s,'ke')}听完只说“知道了”。往后春射照样见面，私下却没有再叫梁氏过去看弓。`},
        {label:'不下旨干预她们来往',hint:'看她们自己怎么相处',effects:{trust:{ke:1},flags:{v45HuoLiang:'natural'}},result:s=>`霍素英偶尔指点梁氏两句，更多时候各练各的。宫里很快习惯射圃里同时挂着两种制式的旧弓。`}
      ]});
    }

    // 崔静仪：新江南世家进入后，贡造权如何切。
    if(!second.steps.some(x=>(x.heading||'').includes('贡造单第一次不只写一家'))){
      second.steps.push({heading:'第十七幕 · 贡造单第一次不只写一家',cast:['hui','gu','peiyan'],fx:'ink',keyDecision:true,text:s=>[
        `宋氏入宫后一个月，内务府把新的夏贡单送到御前。绢、茶、香料、药材袋都不再只走崔家旧行，宋家熟悉的几处漕仓也列在旁边。`,
        `${courtTitle(s,'hui')}没有递话求见。第三日她照常来请安，衣上也没有用崔家新送的香。`,
        `皇后把贡单递给我：“昭氏旧香和顺贵人的案子以后，内务府已经换过两轮人。如今再添宋家，不如把规矩一次定清。”`,
        `崔静仪坐在下首，听见自己的姓时才抬眼。`
      ],choices:[
        {label:'让崔氏交出旧贡造清册，崔家退出宫中独供',hint:'切得最彻底；她保住自己，母族会失去多年利益',effects:{trust:{hui:2},flags:{v45CuiSupply:'cut'}},result:s=>`${courtTitle(s,'hui')}回长春宫以后，把陪嫁嬷嬷叫进去关了一个时辰门。第二日，一整箱旧贡单送到内务府。她只留下一本没有盖家印的家书。`},
        {label:'崔、宋与第三家轮供，所有物料两处复验',hint:'不让任何一家再成为唯一入口',effects:{trust:{gu:2},flags:{v45CuiSupply:'shared'}},result:s=>`新规下去后，崔家仍有生意，却不能再独走一条路。崔静仪把今年的新茶照常分给各宫，只是不再问是哪一批船送来的。`},
        {label:'暂不动崔家旧供，只再加一道复验',hint:'宫里变化最小，崔氏家族的旧网络也保留最多',effects:{bond:{hui:1},flags:{v45CuiSupply:'kept'}},result:s=>`崔静仪谢恩时神色没有变化。当天夜里，长春宫却有两封家书连夜送出宫门。裴景和照例登记，没有拆。`}
      ]});
    }
  }

  // 顾明宜病中：她亲口问邵明贞怎么看张元照。
  if(winter?.steps&&!winter.steps.some(x=>(x.heading||'').includes('只聪明'))){
    const pos=winter.steps.findIndex(x=>(x.heading||'').includes('凤仪宫也开始闭门'));
    const at=pos>=0?pos:1;
    winter.steps.splice(at,0,{heading:'夜话 · “只聪明？”',cast:['gu','ning','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
      `秋热最乱的那几日，张元照每天傍晚把一张新表送到凤仪宫。纸上没有漂亮字，只是一格一格的人名、时辰和去处。`,
      `这日晚间她回完话，皇后让她退下。门合上以后，邵明贞仍看着那张纸。`,
      `皇后问：“你觉得她怎么样？”`,
      `“聪明。”`,
      `“只聪明？”`,
      `邵明贞把纸翻过来，又翻回去。`,
      `“不像我们这里长大的人。”`,
      `皇后看她一眼。`,
      `“哪里不像？”`,
      `“她怕的东西不一样。别人怕答错，她更怕漏掉。”`,
      `皇后没有再问。她把那张表压进宫务册里，第二日照着上面的次序重新排了一遍储秀宫送水的人。`
    ],choices:[{label:'继续',effects:{trust:{gu:1,ning:1,zhangyuanzhao:1},flags:{v45GuAskedAboutZhang:true}},result:''}]});
  }

  // 中宫空悬之前，给霍氏和崔氏各一个不争凤印但有自己结局的收束。
  if(vacancy?.steps&&!vacancy.steps.some(x=>(x.heading||'').includes('凤印之外还有两座宫'))){
    const pos=vacancy.steps.findIndex(x=>(x.heading||'').includes('凤仪宫重新开门'));
    const at=pos>=0?pos:Math.max(0,vacancy.steps.length-2);
    vacancy.steps.splice(at,0,{heading:'第六幕前 · 凤印之外还有两座宫',cast:['ke','hui'],fx:'dawn',narrative:true,text:s=>[
      s.flags?.v45HuoLiang==='mentor'
        ? `${courtTitle(s,'ke')}后来仍带梁氏去过射圃。梁氏问起北营，她只答北营的事；问起水师，她便让梁氏自己写信回家问。春射名册上，两个人的名字隔着三行，再没有谁把她们写成一党。`
        : s.flags?.v45HuoLiang==='separate'
          ? `${courtTitle(s,'ke')}与梁氏一直客气。两支军门在宫里没有结成一线。霍素英反而把更多时间放回自己宫里和皇子身上，北营来的家书也从每月三封减成一封。`
          : `${courtTitle(s,'ke')}与梁氏偶尔在射圃说几句话。她没有把新人当学生，也没有当敌人。后来前朝真的调动东南水师时，她只是把那张旧弓重新挂高了一寸。`,
      s.flags?.v45CuiSupply==='cut'
        ? `${courtTitle(s,'hui')}交出旧贡造清册以后，崔家在宫中的几处旧差陆续换人。娘家来信最密的那个月，她一封没烧，也一封没拿到御前，只按日期封进箱里。崔家失去的东西越来越多，她自己却安静地留在长春宫。`
        : s.flags?.v45CuiSupply==='shared'
          ? `${courtTitle(s,'hui')}后来很少再问贡造。崔家、宋家和另外两家轮供以后，长春宫收到的茶有时好、有时差。她喝到差的也不退，只让人另沏一壶。`
          : `${courtTitle(s,'hui')}仍知道不少贡造上的事。每次内务府换掌事，裴景和都会把名单抄一份送到御前。崔静仪从不问为什么。她只是越来越少用娘家送来的东西。`,
      `顾明宜死后，礼部议中宫人选时，霍氏和崔氏的名字都曾在私下被人提起。两个人都没有递过一句话。`,
      `霍素英照常去射圃。崔静仪照常在长春宫喝茶。凤印并不是每一个活到最后的人都想伸手去拿。`
    ],choices:[{label:'继续',effects:{flags:{v45OldHighConsortsSettled:true}},result:''}]});
  }

  // 邵明贞与张元照摊牌时，回扣“当初是我说她可以留”。
  if(vacancy?.steps){
    const rival=vacancy.steps.find(x=>(x.heading||'').includes('她们第一次把话说在凤仪宫里'));
    if(rival&&!rival.v45){
      rival.text=s=>[
        `太后走后，正殿只剩邵明贞和张元照。`,
        `邵明贞先把旧宫务册放回架上。手收回来以后，她忽然说：“承熙十一年，是我对皇后娘娘说，你可以留。”`,
        `张元照看着她：“臣妾知道。”`,
        `“你怎么会知道？”`,
        `“后来尚宫说漏过一句。”`,
        `邵明贞笑了一下，很短：“早知道便不说了？”`,
        `“娘娘不会。”`,
        `“为什么？”`,
        `“因为那时候娘娘觉得我该留。现在要不要坐这里，是另一件事。”`,
        `两个人终于都抬头看向正中的座位。`,
        `邵明贞道：“你若真想坐这里，别只靠那些别人没听过的办法。”`,
        `张元照答：“娘娘若真想坐这里，也别只因为所有人都认识你。”`,
        `邵明贞走到窗边，把卡住半寸的窗栓推开：“皇后不是让人觉得新鲜。”`,
        `张元照把另一扇也推开：“也不是让人觉得熟悉。”`,
        `风一下灌进来，把旧帘吹得很高。两个人同时伸手去按，手碰到一处，又同时收回。`
      ];
      rival.v45=true;
    }
  }

  // 人物卡轻量更新：三位第一次高位妃的后半段不再停在承熙三年。
  if(PEOPLE.ning)PEOPLE.ning.bio='太后胞弟之女，母亲出自顾氏旁支。她幼时就认识顾明宜，入宫后长期帮中宫处理没有成例可循的杂务。承熙十一年第二次采选时，她已经能替病弱的皇后翻名册；张元照最初正是她亲口说“可以留”的人。顾皇后死后，她实际分担六宫事务，也因此成为最自然的继后人选。';
  if(PEOPLE.ke)PEOPLE.ke.bio='定远侯之女，自幼随父兄在北地长大。她代表北营军功集团，也曾用霍家旧军籍替沈氏旧案补上关键实证。第二次采选时，另一支东南军门的女子入宫，她第一次真切看见朝廷可以同时保留两套军方姻亲；她后来的选择不在凤印，而在如何让霍家不必永远成为唯一。';
  if(PEOPLE.hui)PEOPLE.hui.bio='崔氏嫡女。崔家长期插手江南财赋、贡造与宫廷供应。昭氏旧香与顺贵人案以后，这份便利变成最沉的疑影；第二次采选又有新的江南家族入宫，她第一次看见崔家的位置可以被别家补上。她后半段真正要选的，是保家、切割，还是在两者之间永远留一层不肯说破的余地。';

  // 旧存档若已经跨过第二次选秀，回到空宫点灯开头重走新增内容。
  if(!state.flags?.v45Migrated){
    const idx=CHAPTERS.findIndex(ch=>ch.title==='空宫点灯');
    if(idx>=0 && (state.index||0)>idx){
      state.index=idx;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.lastChoice=null;
    }
    state.flags.v45Migrated=true;
  }

  save();render();
}catch(e){console.error('v45 second-selection high-consorts patch failed',e)}})();
