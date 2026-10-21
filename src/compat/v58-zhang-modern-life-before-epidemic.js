(()=>{try{
  document.documentElement.dataset.build='v58';
  document.title='宫灯未眠 · 元照入宫日常与疫前铺垫 v58';
  const V58_CURRENT_TITLE=CHAPTERS[state.index]?.title;
  const CH=t=>CHAPTERS.find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));
  const A=(v,s)=>{const a=typeof v==='function'?v(s):v;return Array.isArray(a)?a:[a];};
  const zt=s=>courtTitle(s,'zhangyuanzhao')||'张氏';

  // 1) 第二批选秀结束后单独留出五月至七月。先让她活成一个新人，再让她的方法进入时疫。
  if(!CH('窗开半扇')){
    const winterIndex=CHAPTERS.findIndex(x=>x.title==='凤仪宫最后一冬');
    const chapter={
      date:'承熙十一年·五月至七月',
      title:'窗开半扇',
      theme:'第二批新人真正住下来以后，最先暴露的不是野心，而是各自怎么过日子',
      place:'景阳宫东配殿 / 凤仪宫 / 御花园',
      cast:['zhangyuanzhao','gu','ning'],fx:'summer',
      bridge:s=>`第二次采选落定，张元照与梁氏、宋氏、许氏一同真正住进六宫。她的初封由御前裁定，住在景阳宫东配殿。五月到七月之间，宫里没有大案，也没有人知道秋天会发生什么；新人每天要面对的，只是请安、月例、宫女、饭菜、天气和一扇到底该不该关严的窗。`,
      steps:[
        {heading:'第一幕 · 新主子进宫第一件事，是把香炉搬远',cast:['zhangyuanzhao'],fx:'window',narrative:true,text:s=>[
          `入景阳宫东配殿的第一晚，尚宫局照例送来新香、被褥、妆奁和两名贴身宫女。别人先看首饰，${zt(s)}先看窗。`,
          `她让人把靠床那扇推开半扇。掌事嬷嬷立刻道：“夜里有风，主子初入宫，还是关严稳妥。”`,
          `“留一条缝。”她把手伸到窗边试了试，“屋里香太重，我睡不着。”`,
          `香炉也被从床边挪到外间。嬷嬷以为她嫌香不好，第二日换了更贵的沉水，她闻了一下，还是让人搬远。`,
          `“娘娘不喜欢香？”宫女问。`,
          `“喜欢好闻的。”她答，“不喜欢睡觉的时候一直闻。”`,
          `说完她又让人找了两只小木牌，一只挂在洗脸盆旁，一只挂在净手盆旁。宫女看了半天：“都是水，为什么还要分？”`,
          `她想了想：“因为……习惯。”`,
          `这两个字后来成了景阳宫最常听见的回答。`
        ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:1},flags:{v58WindowHalfOpen:true}},result:''}]},

        {heading:'第二幕 · 她把一天画成很多小方格',cast:['zhangyuanzhao'],fx:'ink',narrative:true,text:s=>[
          `第三日清晨，宫女发现案上压着一张很奇怪的纸。不是诗，也不是账。上面一行一行写着：请安、领夏衣、回尚宫局住处册、给太后谢赏、问太医旧伤药。每件事前面都画一个空方框。`,
          `做完一件，${zt(s)}便在方框里斜划一笔。`,
          `宫女看得新鲜：“娘娘怕忘？”`,
          `“怕脑子里一直装着。”`,
          `“写下来就不用想了？”`,
          `“写下来，是不用一直记着有没有忘。”`,
          `她把一张已经划满的小纸折好，又抄了一份新的。脱口而出一句：“这个留作备份。”`,
          `“备……什么？”`,
          `她停了一下：“抄本。留个抄本。”`,
          `宫女点点头，没再追问。当天晚上，“张主子把日子画成格子过”已经传到隔壁值房。`
        ],choices:[{label:'继续',effects:{flags:{v58ChecklistHabit:true}},result:''}]},

        {heading:'第三幕 · 梳子、口脂和筷子都不能顺手借',cast:['zhangyuanzhao'],fx:'summer',narrative:true,text:s=>[
          `六月第一次小宴，新入宫的几个人还没有熟到能说私话。梁氏嫌宫里的甜汤太腻，宋氏认出果盘是江南来的，许淑惠一直怕自己又行错礼。`,
          `席间宫女拿错一双筷子，${zt(s)}接过以后没有发脾气，只另要了一双，又叫人在公盘边常备一双夹菜的。`,
          `许淑惠小声问：“娘娘嫌别人用过？”`,
          `“不是嫌。”她说，“就是自己的东西自己用。”`,
          `她的梳篦、帕子、口脂也从不和人混。宫女替她收妆奁时把两把梳子叠到一处，她会重新分开；有人拿她的手巾擦过桌角，那条巾当日便被她改作抹布。`,
          `宋氏笑道：“张姐姐规矩倒比尚宫局还细。”`,
          `她低头夹了一筷青笋：“这不算规矩。真定成规矩，大家都会烦。”`,
          `这句话听着不像谦虚，更像她真的认真想过“什么值得所有人都照做”。`
        ],choices:[{label:'继续',effects:{flags:{v58PersonalItemsHabit:true}},result:''}]},

        {heading:'第四幕 · 宫女打碎茶盏，她先问有没有烫到',cast:['zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
          `六月末，景阳宫一个小宫女换茶时碰翻托盘，热水泼了一地。她第一反应就是跪下，额头已经快碰到砖。`,
          `${zt(s)}却把椅子往后挪：“先起来。”`,
          `小宫女没敢动。`,
          `“站起来，先看手。”`,
          `她手背已经红了一片。张元照让人拿凉水来，又问托盘为什么滑。宫女哭着说自己昨夜替同屋值了半更，早上手一直发抖。`,
          `掌事嬷嬷在旁边等着听罚。${zt(s)}只道：“今晚别再让她替值。茶盏照月例扣一个，别扣她月钱。”`,
          `嬷嬷忍不住提醒：“不罚，下面的人以后都说是不小心。”`,
          `“那就先把为什么出错记清楚。”她说，“故意和没睡够，不是一回事。”`,
          `这句话传到凤仪宫时，顾明宜正核一份小错簿。皇后听完只问：“她真没罚？”`,
          `来人道：“没罚跪。”`,
          `皇后没有评价，只把那页折了个角。`
        ],choices:[{label:'继续',effects:{trust:{gu:1,zhangyuanzhao:2},flags:{v58NoKneelForSmallMistake:true}},result:''}]},

        {heading:'第五幕 · 她有一本只记自己的小册子',cast:['zhangyuanzhao'],fx:'ink',narrative:true,text:s=>[
          `七月初，景阳宫请了一次太医。不是大病，${zt(s)}只是连着两日头疼、胃口差。`,
          `太医问什么时候开始，她答：“前日亥初以后。白日还好，夜里更重。昨晚睡了约三个时辰，中途醒两次。”`,
          `太医抬头看了她一眼。`,
          `她又补：“月事比上月迟两日，昨日吃过冰酪，午后没有腹痛。”`,
          `宫女在旁边脸都红了。`,
          `太医忍不住笑：“娘娘看诊，倒像把自己的供词先写好了。”`,
          `“不记会忘。”`,
          `太医走后，宫女才发现她箱子里真有一本巴掌大的册子。每页只有日期，后面写睡得好不好、吃了什么、有没有头疼、月事何时来。没有一句宫斗，也没有一个人的名字。`,
          `“这也要记？”`,
          `“身体也是自己的事。”`,
          `她把册子收回去，没有觉得这句话有什么特别。`
        ],choices:[{label:'继续',effects:{flags:{v58HealthLogHabit:true}},result:''}]},

        {heading:'第六幕 · 王静娴说，她偏不爱写',cast:['zhangyuanzhao'],fx:'lantern',narrative:true,text:s=>[
          `七月中旬一次请安散后，王静娴与${zt(s)}同走了一段宫道。前者在宫里多年，几乎不用看名册就知道谁今日换了宫女、哪一处月例少送半日。`,
          `她看见张元照袖里露出一角小方格纸，笑了一声：“又记？”`,
          `“不记会混。”`,
          `王静娴道：“我偏不爱写。”`,
          `“为什么？”`,
          `“写出来，就有人能拿走、能烧、能说你写错了。”她说得像闲话，“记在脑子里，至少烧不掉。”`,
          `${zt(s)}看了她一眼：“脑子也会忘。”`,
          `“所以我们两个都别死得太早。”`,
          `张元照怔了一下，随后笑出声。`,
          `两个人在宫道口分开。一个把事情写下来，一个习惯先把人记住。那时谁也没觉得这两种办法有什么必要争个高下。`
        ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:1,zhao2:1},flags:{v58WangZhangMemoryContrast:true}},result:''}]},

        {heading:'尾声 · 七月最后一夜，窗还是开着半扇',cast:['zhangyuanzhao'],fx:'night',narrative:true,text:s=>[
          `七月底闷热。别宫都怕夜露，景阳宫东配殿那扇窗仍留着一条缝。`,
          `宫女已经懒得再劝。她只在窗下多压一块镇纸，免得风把案上的小方格吹走。`,
          `${zt(s)}洗过手，把净手巾挂回自己的木钩，又把第二日要做的事写成五格。最后一格是：“去凤仪宫谢夏赏。”`,
          `她划掉今日最后一件事，熄灯前又看了一眼窗。`,
          `外面只是普通的夏夜。远处有人咳了一声，很快又没了。`,
          `她没有起身，也没有记。`
        ],choices:[{label:'进入八月',effects:{flags:{v58ZhangHabitsSeen:true}},result:''}]}
      ]
    };
    if(winterIndex>=0)CHAPTERS.splice(winterIndex,0,chapter);else CHAPTERS.push(chapter);
  }

  // 2) 秋疫从八月才真正开始；皇后疲病也放到疫前十余日，不与五月新入宫生活倒序。
  const winter=CH('凤仪宫最后一冬');
  if(winter){
    winter.date='承熙十一年·八月至十二月';
    winter.bridge=s=>`第二次采选已经过去三个月。梁氏、宋氏、许氏渐渐认得宫路，张元照那些开半扇窗、分巾分盆、什么都画格子的习惯也早被景阳宫的人见怪不怪。八月中旬，顾明宜的旧咳又重了一次；几日后，储秀宫西院报了第一例高热。最初谁也没有把它当成会改掉这一年的事。`;
    const gu=ST(winter,'终选之后，皇后先病了一场');
    if(gu){
      gu.heading='第一幕 · 八月初，皇后先病了一场';
      gu.text=s=>[
        `八月初，凤仪宫把夏末最后一份新人住处册核完。顾明宜坐了一整日，起身时腿麻得扶住案角。`,
        `她这几年本就容易咳。重阳行刺以后，我自己的右肋每逢阴雨也会发紧；两个人都不再年轻，却都习惯把这些小病当成不值得停下来的事。`,
        `邵明贞抱着剩下的册子进来：“臣妾带回去看。”`,
        `皇后道：“只差三个印。”`,
        `“三个印明日也还在。”`,
        `皇后看她一眼，竟真的把印盒推过去。手松开以后，她低头咳了很久。`,
        `景阳宫来谢夏赏的${zt(s)}在外间等了一刻钟，听见里面咳嗽，没有托人催。她回去以后，只在自己的小方格纸上把“谢夏赏”移到第二日。`
      ];
    }
    const first=ST(winter,'第一扇关上的门');
    if(first){
      first.text=s=>[
        `八月十八，储秀宫西院一个宫女发热。第二日同屋又倒下两个。太医院仍写“秋燥时气”，第三日，尚衣局一个来取尺寸的女官也烧起来。`,
        `皇后下旨把西院暂封。她自己没有去，只让尚宫把住在那里的每个人名送来。`,
        `${zt(s)}看到名册以后问的第一句不是“用了什么药”，而是：“这三个人昨天分别去了哪里？”`,
        `掌事嬷嬷说她问得怪。她从袖里抽出的却还是平日那种小方格纸——只是这一次，格子里不再写自己的请安和头痛，而是写三个人的名字。`,
        `一个下面写尚衣局，一个写井房，一个写膳房。`,
        `第四日，井房又多了一个病人。`,
        `她把那张纸重新誊了一遍，又让宫女把景阳宫原本各自分开的巾盆照样留着，不许因为人手紧便混在一起。`
      ];
    }
    const method=ST(winter,'张元照要的不是药方');
    if(method){
      method.text=s=>[
        `张元照把三张纸带到凤仪宫。第一张只写发热先后，第二张写谁和谁同住，第三张写送饭、送水、换洗的人走过哪些门。`,
        `那种画法并不是为了这场病才突然想出来。她入宫以后一直这样过日子：自己的睡眠、头痛、月事写日期；该办的事画方格；怕混的东西便分开。如今只是把“自己”换成了一整座西院。`,
        `皇后问：“你想查谁下毒？”`,
        `“不是。”`,
        `“那查这些做什么？”`,
        `“臣妾想先知道病是怎么从一个院走到另一个院的。”`,
        `太医院有人觉得这是把“时气”说得太像人。邵明贞没有替她争，只问：“若照你的法子，要多少空院、多少人？”`,
        `张元照答得很快：“先把病的人和没病的人分开；送饭、倒水、洗衣的人也不要来回换。做不到全分，就先分最乱的三处。”`,
        `说完她又补了一句：“还有巾、盆、杯盏，能不混就别混。”`,
        `皇后看她：“也是你的习惯？”`,
        `“是。”`,
        `“有用么？”`,
        `张元照停了一下：“臣妾不知道每一样有没有用。所以先做代价最小、最容易做到的。”`,
        `皇后把三张纸按在掌下，抬头看我。`
      ];
    }
  }

  // 3) 玩家人物卡在秘密揭开前只显示“生活方式古怪”，不提前把穿越答案写出来。
  if(PEOPLE.zhangyuanzhao&&!state.flags?.zhangRevealed){
    PEOPLE.zhangyuanzhao.tags=['承熙三年入宫','生活习惯古怪','爱写清单'];
    PEOPLE.zhangyuanzhao.bio='承熙三年第一次大选入宫，居景阳宫东配殿。她不爱浓香，睡觉总留半扇窗；洗脸、净手的巾盆分开，梳篦口脂从不混用；每天把要做的事画成小方格，做完便划掉。她偶尔会脱口而出一个谁也听不懂的词，再若无其事换成宫里听得懂的说法。';
  }

  // 4) 新章不进史官大事录。它只是日常，不替读者总结其意义。
  if(typeof historyRecordV38==='function'){
    const oldHist=historyRecordV38;
    historyRecordV38=function(e,i){if(e?.title==='窗开半扇')return '';return oldHist(e,i);};
  }

  // 5) 新增一章后重算晚期人物首次登场索引；当前存档仍停在原章节标题，不因插章错位。
  const dailaIdx=CHAPTERS.findIndex(x=>x.title==='极西来客');if(dailaIdx>=0&&PEOPLE.daila)PEOPLE.daila.introducedAt=dailaIdx;
  const zhangIdx=CHAPTERS.findIndex(x=>x.title==='王府旧笼');if(zhangIdx>=0&&PEOPLE.zhangyuanzhao)PEOPLE.zhangyuanzhao.introducedAt=zhangIdx;
  if(V58_CURRENT_TITLE){const ni=CHAPTERS.findIndex(x=>x.title===V58_CURRENT_TITLE);if(ni>=0)state.index=ni;}

  state.flags=state.flags||{};state.flags.v58Build=true;
  globalThis.V58_QA={
    chapterIndex:CHAPTERS.findIndex(x=>x.title==='窗开半扇'),
    windowBeforeEpidemic:CHAPTERS.findIndex(x=>x.title==='窗开半扇')<CHAPTERS.findIndex(x=>x.title==='凤仪宫最后一冬'),
    habitsScenes:(CH('窗开半扇')?.steps||[]).length,
    winterDate:CH('凤仪宫最后一冬')?.date,
    duplicateTitles:CHAPTERS.map(x=>x.title).filter((x,i,a)=>a.indexOf(x)!==i)
  };
  try{save()}catch(_e){}
  try{render()}catch(_e){}
}catch(e){console.error('v58 zhang modern-life pre-epidemic patch failed',e)}})();
