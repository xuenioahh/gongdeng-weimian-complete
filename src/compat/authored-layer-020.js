(()=>{try{
  document.documentElement.dataset.build='v46';

  const FIRST_LOW_V46=['cao2','zhao2','lin2','ye2','du2','su2'];
  const lowSelected=s=>(s?.flags?.lowConsorts||[]).filter(k=>FIRST_LOW_V46.includes(k)&&PEOPLE[k]);
  const lowPreg=s=>s?.flags?.lowPregnancyKey||lowSelected(s)[0]||'lin2';
  const lowTitle=(k,s=state)=>{
    const p=PEOPLE[k]||{name:'某氏'};let r=s?.ranks?.[k]||'常在';
    if(r==='待封'||r==='待选')r='常在';
    if(/^故/.test(r))return `故${p.name.slice(0,1)}${r.replace(/^故/,'')}`;
    return `${p.name.slice(0,1)}${r}`;
  };
  const zhangNext=(s=state)=>{
    const order=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];
    const raw=s.ranks?.zhangyuanzhao||'常在',i=order.indexOf(raw);
    return i>=0&&i<order.length-1?order[i+1]:raw;
  };

  // 年龄随时间推进；不在故事开头提前把“后来的四十岁”写死。
  function v46SyncAges(s=state){
    const date=(CHAPTERS?.[s.index]?.date||'');
    let y=1;const m=date.match(/承熙([一二三四五六七八九十]+)年/);
    const map={'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,'十一':11,'十二':12,'十三':13,'十四':14};
    if(m)y=map[m[1]]||1;
    const add=Math.max(0,y-1);
    if(PEOPLE.emperor)PEOPLE.emperor.age=`${30+add}岁`;
    if(PEOPLE.gu)PEOPLE.gu.age=`${29+add}岁`;
    if(PEOPLE.shen)PEOPLE.shen.age=`${28+add}岁`;
    if(PEOPLE.zhou)PEOPLE.zhou.age=`${27+add}岁`;
    if(PEOPLE.wenheng)PEOPLE.wenheng.age=`${37+add}岁`;
  }

  // 冗余人物清理：旧补丁的陈常在并回第一次选秀低位妃体系。
  if(PEOPLE.chen){PEOPLE.chen.introducedAt=99;PEOPLE.chen.bio='';}
  const ci=HAREM_KEYS.indexOf('chen');if(ci>=0)HAREM_KEYS.splice(ci,1);

  // 旧陈常在喜脉两幕已被第一次选秀后的随机低位孕事替代，直接撤掉；不删其他已成型场景。
  for(const ch of CHAPTERS){
    if(!ch?.steps)continue;
    ch.steps=ch.steps.filter(st=>!['第二幕 · 一桩很普通的喜脉','第三幕 · 满月宴没有真正的主角'].includes(st.heading));
    const grow=ch.steps.find(st=>(st.heading||'').includes('别人的孩子会长大'));
    if(grow&&!grow.v46){
      grow.cast=['baopu','fang'];
      grow.text=s=>{
        const k=lowPreg(s),p=PEOPLE[k]||{name:'一名低位宫嫔'};
        return [
          `承熙五年秋，${s.flags?.fifthPrincessBorn?'三公主已经会扶着桌沿慢慢走':'前一年出生的幼公主已经会扶着桌沿慢慢走'}。乳母把果子挪远，她还是踮着脚去够。`,
          `${p.name}坐在旁边缝一只松掉的虎头鞋。她入宫时并不起眼，如今仍不大会在请安时抢话；孩子却照自己的时辰长大，不等谁先得宠。`,
          `${courtTitle(s,'baopu')}送来一对金铃。孩子一只手抓住铃，一只手又来扯她衣带。她蹲下来陪了半刻钟。`,
          `方小满在旁边笑：“娘娘以后一定很会抱孩子。”`,
          `话出口以后，她自己先停住。`,
          `${courtTitle(s,'baopu')}把孩子递回乳母：“那当然。我什么不会？”`,
          `她站起身时扶了一下桌角。金铃还在孩子手里响，响得很轻。`
        ];
      };
      grow.choices=[{label:'继续',effects:{bond:{baopu:1,fang:1}},result:''}];
      grow.v46=true;
    }
  }

  // 第一次选秀低位妃：每个人留下一个不同的“有用之处”，在时疫中集中回收。
  if(PEOPLE.cao2)PEOPLE.cao2.bio='地方知府之女。何超英不抢话，却记路线、人数和物件极牢；宫里越乱，她越能说清“谁从哪里来、东西送到哪里去”。';
  if(PEOPLE.zhao2)PEOPLE.zhao2.bio='京中四品官员之女。王静娴最懂看场面：脸上永远把礼数做足，心里却常比旁人先一步看出哪句话是假客气、哪一笑是在遮难堪。她不爱争宠，也不把沉默当美德；真正让她迟疑的是——真话什么时候说出口，才不会只变成另一场热闹。';
  if(PEOPLE.lin2)PEOPLE.lin2.bio='太医旁支之女。林淑贞懂一些药名与医案写法，不敢冒充医官，却能听懂太医院在争什么，也能把张元照那些陌生说法翻成宫里听得懂的话。';
  if(PEOPLE.ye2)PEOPLE.ye2.bio='翰林旁支之女。陈婉仪不善在人前说话，一手小楷却极稳；宫务越乱，她越愿意坐下来把名字、时辰和缺漏一笔笔抄清。';
  if(PEOPLE.du2)PEOPLE.du2.bio='漕运官员之女。张淑华对数量与转运格外敏感，哪处炭少了、哪一班饭多送了一桶，她比掌事更快看出不对。';
  if(PEOPLE.su2)PEOPLE.su2.bio='京畿小官之女。刘玉贞会针线、会南曲，也比别人有耐心哄孩子；她最有用的时候往往不是在御前，而是在一群哭闹的乳母和幼儿之间。';

  // 第二次选秀减法：只保留真正有后续的梁、宋、许；张元照另走主线。
  const second=CHAPTERS.find(ch=>ch.title==='空宫点灯');
  if(second?.steps){
    const roster=second.steps.find(st=>(st.heading||'').includes('余下的名帖要留几张'));
    if(roster){
      roster.heading='第十三幕 · 余下只留三张名帖';roster.keyDecision=false;
      roster.text=s=>[
        `张元照的册页收好以后，御案上还剩三张真正需要记住的名帖：梁素贞、宋文秀、许淑惠。`,
        `梁氏背后是东南水师，宋氏家里熟漕运与织造，许氏父亲只是京中寻常给事中。三个人没有谁要在这一轮直接抬到高位。`,
        `皇后把三张纸并在一起，指节在桌面停了一会儿：“都留吧。再多，臣妾这副身子也记不住了。”`,
        `她说完自己先笑了一下，笑声里带着咳。邵明贞伸手去扶茶盏，皇后摆摆手，仍亲自在三张名帖旁落了小印。`
      ];
      roster.choices=[{label:'三人留牌，继续定初封',effects:{flags:{v45SecondRosterCount:3,v46SecondRosterPruned:true}},result:''}];
    }
    const lowrank=second.steps.find(st=>(st.heading||'').includes('低位新人初封'));
    if(lowrank){
      lowrank.text=s=>[
        `梁素贞、宋文秀、许淑惠都不是这一轮要立刻抬到高位的人。尚宫局只拟了两套册样：答应，或常在。`,
        `皇后把两份样册并在一起。她今天已经咳过三回，仍把三人的家世、住处和月例重新核了一遍。`,
        `“同一批入宫，初位不要差得太远。”她说。`
      ];
      lowrank.choices=[
        {label:'三人一律初封答应',hint:'位置最低，先让她们真正住进宫里',effects:{flags:{v45SecondLowStyle:'allDaying'}},result:'梁答应、宋答应、许答应依次接册。'},
        {label:'三人一律初封常在',hint:'仍属低位，但多一层体面',effects:{flags:{v45SecondLowStyle:'allChangzai'}},result:'梁常在、宋常在、许常在依次接册。'}
      ];
    }
    const firstgreet=second.steps.find(st=>(st.heading||'').includes('新人第一次请安'));
    if(firstgreet){
      firstgreet.text=s=>[
        `新人第一次合宫请安，凤仪宫比往年挤了一圈。张元照坐得很后，梁氏、宋氏、许氏依次行礼。`,
        `皇后在正座上坐得很直。只有离得近的人看得出，她每次咳嗽前都会先把指尖压住袖口，像怕惊动下面的人。`,
        `霍素英看见梁氏时只点一下头。崔静仪问宋氏江南今年雨水多不多。许氏没有任何显赫关系，散席时反倒帮一个慌乱的小宫女把落在地上的名牌捡起来。`,
        `请安散尽，皇后仍没有起身。邵明贞走过去时，她低声说：“总算办完了。”`,
        `“回去歇着。”`,
        `“还有住处册。”`,
        `邵明贞把册子从她手里抽走：“臣妾看。”`,
        `皇后这一次没有抢回来。`
      ];
    }
  }

  // ---------- 时疫：顾皇后真正终局，张元照的本领与边界 ----------
  const winter=CHAPTERS.find(ch=>ch.title==='凤仪宫最后一冬');
  const childBaseNotes={};
  function v46PickLowVictim(s=state){
    const a=lowSelected(s),preg=lowPreg(s);
    const pref=['ye2','cao2','su2','du2','lin2'];
    return pref.find(k=>a.includes(k)&&k!==preg)
      ||a.find(k=>k!=='zhao2'&&k!==preg)
      ||a.find(k=>k!=='zhao2')
      ||null;
  }
  function v46PickChildVictims(s=state){
    const cand=[];
    if(s.flags?.fifthPrincessBorn&&CHILDREN.fifthPrincess)cand.push('fifthPrincess');
    if(CHILDREN.extraHeir1)cand.push('extraHeir1');
    if(CHILDREN.extraHeir2)cand.push('extraHeir2');
    if(cand.length<2&&s.flags?.twinGirlBorn&&CHILDREN.twinGirl)cand.push('twinGirl');
    return [...new Set(cand)].slice(0,2);
  }
  function v46AssignDeaths(s=state){
    if(!s.flags.v46LowVictim)s.flags.v46LowVictim=v46PickLowVictim(s);
    if(!Array.isArray(s.flags.v46ChildVictims))s.flags.v46ChildVictims=v46PickChildVictims(s);
    const lk=s.flags.v46LowVictim;
    if(lk&&s.ranks?.[lk]&&!/^故/.test(s.ranks[lk]))s.ranks[lk]='故'+s.ranks[lk];
    s.flags.v46XuDead=true;
    s.flags.v46EpidemicDeathsAssigned=true;
  }
  function v46SyncChildDeaths(s=state){
    for(const [k,v] of Object.entries(CHILDREN)){
      if(!(k in childBaseNotes))childBaseNotes[k]=v.note||'';
      v.note=childBaseNotes[k];
    }
    for(const k of (s.flags?.v46ChildVictims||[]))if(CHILDREN[k])CHILDREN[k].note=(CHILDREN[k].note||'')+' 承熙十一年内廷时疫中薨。';
  }
  function v46ChildNames(s=state){return (s.flags?.v46ChildVictims||[]).map(k=>CHILDREN[k]?.order||CHILDREN[k]?.name).filter(Boolean)}
  function v46LowRoleLines(s=state){
    const a=lowSelected(s),lines=[];
    if(a.includes('cao2'))lines.push(`何超英把各宫送水、送炭的人重新画成一张路单。她记得谁总抄近路，也记得哪一扇角门午后最少有人经过。`);
    if(a.includes('lin2'))lines.push(`林淑贞没有替太医开方。她只坐在药案旁，把医官说的“时气”“相染”“热入营分”一一记下，再把张元照那些生硬的“先后、同住、接触”换成太医院听得进去的话。`);
    if(a.includes('ye2'))lines.push(`陈婉仪一整日没有离开小案。门外每换一个病人，她就重新誊一张名单，字到后半夜仍和早晨一样稳。`);
    if(a.includes('du2'))lines.push(`张淑华算的是最不体面的事：一日要多少米、多少炭、多少干净布巾。她把病院和未病各宫的领用彻底分开，谁来多领一桶水都要在边上按手印。`);
    if(a.includes('su2'))lines.push(`刘玉贞去了皇嗣暂居的西暖阁。孩子们不懂为什么不能回各自母妃身边，她便坐在帘外唱很轻的南曲，一边给每个乳母的袖口缝不同颜色的小线结。`);
    if(a.includes('zhao2'))lines.push(`王静娴不懂医，却最先抓到一份换值单里的两句话对不上：同一个内监上午说自己从未进过西院，下午又说替西院抬过水。她把两行供词并在一张纸上递给张元照：“臣妾不会看病，但一个人总不能同一天既去过，又没去过。”说完她自己咳了一声，顿了顿，又补一句：“顺便把臣妾也记上，刚才嗓子有点紧。臣妾现在不说‘没事’了。”`);
    return lines;
  }

  if(winter){
    winter.date='承熙十一年·夏末至冬';
    winter.title='凤仪宫最后一冬';
    winter.theme='第二次选秀刚落笔，宫门便开始一扇扇关上';
    winter.place='凤仪宫 / 储秀宫 / 西六宫';
    winter.cast=['gu','ning','zhangyuanzhao','taihou'];
    winter.bridge=s=>`承熙十一年，皇帝四十。第二次采选办完不过两个月，皇后的咳嗽还没有好，储秀宫先报了第一例高热。最初谁也没有把它当成会改掉这一年的事。`;
    winter.steps=[
      {heading:'第一幕 · 终选之后，皇后先病了一场',cast:['gu','ning'],fx:'rain',narrative:true,text:s=>[
        `五月末，凤仪宫把第二次选秀的最后一份住处册送出。顾明宜坐了一整日，起身时腿麻得扶住案角。`,
        `她这几年本就容易咳。重阳行刺以后，我自己的右肋每逢阴雨也会发紧；两个人都不再年轻，却都习惯把这些小病当成不值得停下来的事。`,
        `邵明贞抱着剩下的册子进来：“臣妾带回去看。”`,
        `皇后道：“只差三个印。”`,
        `“三个印明日也还在。”`,
        `皇后看她一眼，竟真的把印盒推过去。手松开以后，她低头咳了很久。`
      ],choices:[{label:'继续',effects:{flags:{guIllnessDeepens:true,v46SelectionExhaustedGu:true}},result:''}]},

      {heading:'第二幕 · 第一扇关上的门',cast:['gu','zhangyuanzhao'],fx:'rain',narrative:true,text:s=>[
        `八月十八，储秀宫西院一个宫女发热。第二日同屋又倒下两个。太医院仍写“秋燥时气”，第三日，尚衣局一个来取尺寸的女官也烧起来。`,
        `皇后下旨把西院暂封。她自己没有去，只让尚宫把住在那里的每个人名送来。`,
        `${courtTitle(s,'zhangyuanzhao')}看到名册以后问的第一句不是“用了什么药”，而是：“这三个人昨天分别去了哪里？”`,
        `掌事嬷嬷说她问得怪。她便自己拿一张废纸，把三个人名字横着写开。一个下面写尚衣局，一个写井房，一个写膳房。`,
        `第四日，井房又多了一个病人。`,
        `她把那张废纸重新誊了一遍。`
      ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:2},flags:{v46EpidemicBegins:true}},result:''}]},

      {heading:'第三幕 · 张元照要的不是药方',cast:['zhangyuanzhao','gu','ning'],fx:'ink',keyDecision:true,text:s=>[
        `张元照把三张纸带到凤仪宫。第一张只写发热先后，第二张写谁和谁同住，第三张写送饭、送水、换洗的人走过哪些门。`,
        `皇后问：“你想查谁下毒？”`,
        `“不是。”`,
        `“那查这些做什么？”`,
        `“臣妾想先知道病是怎么从一个院走到另一个院的。”`,
        `太医院有人觉得这是把“时气”说得太像人。邵明贞没有替她争，只问：“若照你的法子，要多少空院、多少人？”`,
        `张元照答得很快：“先把病的人和没病的人分开；送饭、倒水、洗衣的人也不要来回换。做不到全分，就先分最乱的三处。”`,
        `皇后把三张纸按在掌下，抬头看我。`
      ],choices:[
        {label:'准她持御前临时牌，与皇后、太医院一同办疫务',hint:'让她的方法真正越过位分限制',effects:{trust:{gu:2,ning:1,zhangyuanzhao:5},flags:{v46EpidemicPolicy:'full'}},result:'御前牌只许用到疫止。张元照接牌时手心全是汗，第一件事却是回去重新核西院的送水名单。'},
        {label:'仍由皇后总领，张元照只负责记录和查漏',hint:'不给她直接调人的权力，但允许方法进入宫务',effects:{trust:{gu:3,zhangyuanzhao:2},flags:{v46EpidemicPolicy:'record'}},result:'皇后把她留在凤仪宫西暖阁。所有调人旨意仍从中宫出，张元照只不停往返于名册和太医院之间。'},
        {label:'太医院照旧处置；她的册子留作旁证',hint:'最保守；她必须等局面恶化以后才得到更大空间',effects:{trust:{zhangyuanzhao:-1},flags:{v46EpidemicPolicy:'old'}},result:'三张纸被压在太医院案角。五日以后，纸上原来的六个名字变成了二十一。那时没人再嫌格子难看。'}
      ]},

      {heading:'第四幕 · 第一次选秀留下的人，没有谁只站在请安队伍里',cast:['gu','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
        `病院从一处变成三处以后，很多事根本轮不到高位妃嫔亲自做。第一批进宫那些低位女人，反而各自被推到一件最具体的差事上。`,
        ...v46LowRoleLines(s),
        `她们没有谁因此突然成了主角。只是宫里一旦乱起来，原先看着无用的小本事都开始有重量。`
      ],choices:[{label:'继续',effects:{flags:{v46FirstLowRolesPaidOff:true}},result:''}]},

      {heading:'第五幕 · 白幡不是从凤仪宫先挂起来的',cast:['zhangyuanzhao','ning'],fx:'snow',narrative:true,text:s=>{
        const lk=v46PickLowVictim(s),ln=lk?PEOPLE[lk].name:'一名低位宫嫔';
        return [
          `九月初三，第二次选秀才入宫数月的许淑惠死在西院。她没有得过宠，病中最后一句话是问自己的名牌会不会送错家。`,
          `两日后，${ln}也倒下。${lk===lowPreg(s)?'她床边还放着孩子小时候用过的一只旧铃。':'她没有住进西院以前，从没想过自己会因为替别人跑一趟路而被关在门后。'}`,
          `邵明贞让人把两处丧仪都压到最简。不是轻慢，是棺木、白布和抬棺的人都开始不够。`,
          `张元照站在廊下看着新挂的白布，没有进灵前。她回去把“主动报病不得追责”六个字重新描粗了一遍。`
        ];
      },choices:[{label:'继续',effects:{flags:{v46MarkEpidemicDead:true}},result:''}]},

      {heading:'第六幕 · 皇嗣院第一次不按母妃分房',cast:['gu','ning','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
        `幼年的皇子皇女原本各随乳母住在母妃宫里。时疫进到西六宫以后，张元照却请把暂时无恙的孩子集中到两处空暖阁，乳母也固定下来，不许每日往返母妃住处。`,
        `这道建议最难下。几位生母当场便红了眼。`,
        `皇后靠在椅背上听完，只问张元照：“你能保证这样就不会死人？”`,
        `“不能。”`,
        `“那你凭什么要人把孩子交出来？”`,
        `张元照沉默一息：“因为现在至少知道，来回跑的人越少，病就少几条路。”`,
        `皇后闭上眼，过很久才说：“照办。每日两次把孩子情形送给生母。”`,
        `那天傍晚，大公主自己抱着小包袱走进东暖阁，没有哭。年纪更小的几个从进门一直哭到睡着。`
      ],choices:[{label:'继续',effects:{trust:{gu:2,zhangyuanzhao:3},flags:{v46ChildrenCohorted:true}},result:''}]},

      {heading:'第七幕 · 还是有人没有熬过去',cast:['gu','taihou'],fx:'snow',narrative:true,text:s=>{
        v46AssignDeaths(s);v46SyncChildDeaths(s);const names=v46ChildNames(s);
        return [
          `九月下旬，皇嗣院也开始报病。太医院的人几乎住在门外。`,
          names.length?`${names.join('、')}先后没有熬过去。玉牒房来请示怎么记时，皇后把纸看了很久，只说：“照实写日子。”`:`有一个未满周岁的孩子没有熬过去。玉牒房来请示怎么记时，皇后只说：“照实写日子。”`,
          `太后第一次在慈宁宫发了火。她把钦天监送来的禳灾折子扔到地上：“孩子烧着，你们跟哀家说星宿？”`,
          `那晚养心殿没有传膳。我坐在窗边，旧伤一阵阵发紧。四十岁以前，我总觉得只要把事情看清，便总能找出一个该负责的人。这个秋天没有。`
        ];
      },choices:[{label:'继续',effects:{flags:{v46ChildrenDied:true}},result:''}]},

      {heading:'第八幕 · 皇后也开始发热',cast:['gu','ning','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
        `十月初九，顾明宜晨起时没有去请安。午后体温升高，晚上已经认不清尚宫递来的第二本册子。`,
        `她先问的仍是西院今天新增几人。邵明贞说已经交给别人。`,
        `“谁？”`,
        `“臣妾。”`,
        `皇后点一下头，又问：“张氏那三张纸呢？”`,
        `张元照就站在床尾。她把新画的路线图往后藏了一点：“臣妾在。”`,
        `皇后看见了：“藏什么。拿来。”`,
        `她只看了半页，手便撑不住纸。邵明贞接过去。`,
        `皇后没有再把它要回来。`
      ],choices:[{label:'继续',effects:{trust:{gu:3,ning:2,zhangyuanzhao:2},flags:{guHandsJudgmentToNing:true,v46GuInfected:true}},result:''}]},

      {heading:'第九幕 · “你救不了所有人”',cast:['gu','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
        `病到第六日，皇后有一阵难得清醒。张元照来回报新增人数，站在帘外没有进去。`,
        `皇后叫她名字。`,
        `${courtTitle(s,'zhangyuanzhao')}跪到床前。`,
        `“外头说，是你把这场疫压住的。”`,
        `“没有压住。”`,
        `“死的人少了没有？”`,
        `张元照没有立刻答。`,
        `皇后看着她：“你这个人，最讨厌的地方就是一定要把话说准。”`,
        `张元照眼圈一下红了。`,
        `“臣妾以前也见过这种事。”`,
        `“在你家乡？”`,
        `她低下头：“很远的地方。”`,
        `皇后闭上眼：“那就记着。你救不了所有人，不等于可以不救下一个。”`,
        `张元照在床前跪了很久。皇后睡过去以后，她才把额头碰到地上。`
      ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:5,gu:2},flags:{v46GuLastWordsToZhang:true}},result:''}]},

      {heading:'第十幕 · 凤仪宫最后一页',cast:['gu','ning','taihou'],fx:'snow',narrative:true,text:s=>[
        `十月二十一，皇后已经很少醒。她最后亲自过目的宫务册只剩三行：大公主冬衣；三皇子弓房漏水；病愈宫人复值要再隔几日。`,
        `最后一行没有写完。`,
        `邵明贞坐在小案边，把那句话补完整，递过去。皇后看了一遍，只改了一个字。`,
        `太后来时没有哭。她替顾明宜把被角往上拉了拉，像很多年前在潜邸看一个晚辈生病。`,
        `皇后忽然说：“钗别给下一位。”`,
        `太后道：“不给。”`,
        `金凤钗尾羽那道旧划痕在灯下亮了一下。`
      ],choices:[{label:'继续',effects:{flags:{v46GuFinalLedger:true}},result:''}]},

      {heading:'第十一幕 · 十月二十三，凤仪宫灯灭',cast:['gu','taihou','ning'],fx:'snow',narrative:true,text:s=>[
        `十月二十三寅初，顾明宜薨。`,
        `凤仪宫报丧的钟声没有敲足旧例规定的遍数。疫还没完全退，宫门不能同时聚太多人。礼部在礼制与疫禁之间争了半日，最后是邵明贞说：“人已经死了，不必再让活人为了哭她站在一处。”`,
        `大公主被嬷嬷牵到廊下，三皇子已经长得很高，低着头一句话没说。`,
        `那支金凤钗随梓宫封入。`,
        `我站了一会儿便回养心殿。右肋旧伤从早晨一直疼到夜里。裴景和问要不要叫太医，我说不用。`,
        `那天以后，凤仪宫正殿再没有点过顾明宜惯用的那种短烛。`
      ],choices:[{label:'继续',effects:{ranks:{gu:'故皇后'},flags:{guDead:true,guPhoenixPinSealed:true,v46QueenDiesInEpidemic:true}},result:''}]},

      {heading:'第十二幕 · 疫止以后，张元照第一次真正有了功名',cast:['zhangyuanzhao','ning'],fx:'seal',keyDecision:true,text:s=>[
        `十一月，新增病人终于连续多日没有再涨。太医院不肯说“疫止”，只在回奏里写“势缓”。`,
        `张元照把最早那三张纸和最后一张总表放在一起。第一张只有三个名字，最后一张密密麻麻。`,
        `尚宫局给她请功。折子没有写“后世之法”，只写她在疫中核人、分院、定送药与送水路线，昼夜不辍。`,
        `邵明贞看过折子，没有删一个字。`
      ],choices:[
        {get label(){return `办疫有功，晋${courtTitle(state,'zhangyuanzhao')}一级`;},hint:'仍只进一阶，不越序',effects:{flags:{v44PromoteZhang:true,zhangFeverMerit:true,v46ZhangEpidemicHero:true}},result:s=>`册旨下去时，张元照没有设宴。她只把第一张写着三个人名的废纸夹进新册首页。`},
        {label:'不晋位，只记功厚赏',hint:'功劳留下，但不立刻换成位分',effects:{trust:{zhangyuanzhao:3},flags:{zhangFeverMerit:true,zhangNoFeverPromotion:true,v46ZhangEpidemicHero:true}},result:'金银和绢布送去，她一半转给病亡宫人的家属，一半留下买纸。'}
      ]},

      {heading:'尾声 · 活下来的人重新开门',cast:['ning','zhangyuanzhao'],fx:'dawn',narrative:true,text:s=>{
        const lk=s.flags?.v46LowVictim,n=lk?PEOPLE[lk].name:'一名低位宫嫔',kids=v46ChildNames(s);
        return [
          `十二月初，储秀宫西院先开了一扇门。不是庆典，只是一个病愈宫女抱着晒过的被褥走出来。`,
          `<span class="v46-epidemic-ledger"><b>疫后内廷薄册</b>顾皇后薨；许氏卒；${n}卒；${kids.length?kids.join('、')+'薨；':''}宫人、内监另有死者。病愈者陆续复值。</span>`,
          `邵明贞把宫务重新分到各处，没有去坐凤仪宫正座。张元照则把那本疫册锁进自己的箱子。`,
          `宫门重新开了，人却比春天少。`
        ];
      },choices:[{label:'进入下一章',effects:{flags:{v46EpidemicEnded:true}},result:''}]}
    ];
  }

  // 张元照的“穿越”不是标签：重写坦白，让她有前世职业、创伤与明确目标。
  const vacancy=CHAPTERS.find(ch=>ch.title==='中宫空悬');
  if(vacancy){
    vacancy.date='承熙十二年·冬至十三年秋';
    vacancy.bridge=s=>`皇后死后，凤印收进库里。六宫宫务先由邵明贞与尚宫局分担；张元照因为疫中留下的那一册记录，开始频繁被御前问事。皇帝已经四十有余，很多事情却越来越不愿亲自看完。`;
    const reveal=vacancy.steps.find(st=>(st.heading||'').includes('臣妾不是从哪个州府来的'));
    if(reveal){
      reveal.text=s=>[
        `门合上以后，张元照先问：“陛下若觉得臣妾疯了，会怎么处置？”`,
        `“先听你说。”`,
        `她坐得很直，手却一直按着膝上的衣料。`,
        `“臣妾不是从哪个州府来的。”`,
        `“臣妾原先活在很久以后。那时臣妾二十六岁，在一座很大的城里做疫病调查。不是大夫，更多时候是问人去了哪里、见过谁，再把几百个人的名字和日期排在一起。”`,
        `她说，前世最怕接到的是一张已经来不及再问的问题单。人死了，家属只记得最后一天；可病往往早几日就已经沿着饭桌、车厢和一扇门走出去。`,
        `“有一年城里也有大疫。臣妾跟着查了几个月，最后自己没有死在病里。”她笑了一下，“是回家路上出的事故。醒来以后，就成了九岁的张元照。”`,
        `她花了十年学会这个时代的字、礼和沉默。最初只想平安活着，从不打算告诉任何人。`,
        `“那为什么进宫？”`,
        `“因为臣妾后来发现，不进到能改规矩的地方，知道再多也只是多看见几个人怎么死。”`,
        `她抬头看我：“臣妾不是为了证明后世比这里聪明。后世也会死人，也会来不及。臣妾只是不想每一次都从零开始。”`,
        `“你想要什么？”`,
        `“一套不会因为换了一个皇后、一个太医、一个掌事，就全部忘掉的东西。”`,
        `她停一下：“若陛下觉得这句话听起来像求权，臣妾认。”`
      ];
    }
  }

  // ---------- 皇帝四十以后：伤、丧与长期权力把人磨坏 ----------
  if(vacancy&&!CHAPTERS.some(ch=>ch.title==='长夜未央')){
    const vi=CHAPTERS.indexOf(vacancy);
    CHAPTERS.splice(vi,0,{
      date:'承熙十二年·春至秋',title:'长夜未央',theme:'没有人突然变坏；只是越来越少有人敢叫皇帝停下来',place:'养心殿 / 西六宫',cast:['emperor','taihou','ning','zhangyuanzhao'],fx:'lantern',
      bridge:s=>`顾明宜死后的第一个春天，皇帝四十一岁。重阳那一刀留下的旧伤还在，服丧、时疫和十余年的朝事也都在。养心殿最先恢复的不是早朝，是夜里的乐声。`,steps:[
        {heading:'第一幕 · 守制结束以后，酒先回到案上',cast:['emperor','peiyan'],fx:'lantern',narrative:true,text:s=>[
          `正式守制一满，御膳房第一晚只送了一壶酒。第二晚两壶。到月底，西暖阁又开始有琵琶声。`,
          `从前我饮到二更便散，这一年常拖到三更。旧伤一疼，酒反而下得更快。`,
          `裴景和有一次把酒壶往后挪了半寸。我看见了。`,
          `“谁让你动？”`,
          `他把手收回来：“奴才手滑。”`,
          `第二日他再没有碰。`,
          `这一年新入宫的人承宠次数比前两年加起来都多。内务府换洗寝具的册子突然厚了一截，没人把原因写在页眉上。`
        ],choices:[{label:'继续',effects:{flags:{v46EmperorIndulgenceBegins:true}},result:''}]},
        {heading:'第二幕 · 三份折子都写了“照旧”',cast:['emperor','ning','peiyan'],fx:'ink',narrative:true,text:s=>[
          `六月的一天，御案上压着三份折子：河道决口后的赈米、北营换防、宫中疫后抚恤。`,
          `我醒得迟，午后还要去听新排的曲。三份折子看到一半，朱笔都写了“照旧”。`,
          `邵明贞来送六宫月例，看见那三个字，没有马上说话。`,
          `她把第一份折子重新推到我手边：“河道去年没有决口。”`,
          `我盯着那行字看了片刻。`,
          `“那你说怎么办。”`,
          `她没有接笔：“臣妾可以把不同处圈出来，不能替陛下批。”`,
          `殿外的乐师一直等到天黑。那天曲子最终没有听成。`
        ],choices:[
          {label:'让邵明贞把三份折子的不同处全部圈出来',hint:'你仍落朱批，但把越来越多的前置判断交给她',effects:{trust:{ning:4},flags:{v46EmperorDelegates:'ning'}},result:'第二日，景仁宫送来三张夹纸。她一个结论也没有替我写，只把旧例不能照搬的地方全部圈了出来。'},
          {label:'让张元照按“事情发生了什么”另做一页摘要',hint:'她不会替你决定，但会把被你略过的事实重新排出来',effects:{trust:{zhangyuanzhao:4},flags:{v46EmperorDelegates:'zhang'}},result:'张元照送来的纸比原折薄得多，第一行只写：“今年与去年不同处如下。”我看完以后，把三份“照旧”划掉了两份。'},
          {label:'把折子留到明日，今夜照常开宴',hint:'事情没有消失，只是继续往后压',effects:{bond:{zhangyuanzhao:-1,ning:-1},flags:{v46EmperorDelegates:'delay'}},result:'乐声照常响到三更。第二日上午，河道第二封急报已经到了。'}
        ]},
        {heading:'第三幕 · 太后问我今年到底睡过几个整夜',cast:['taihou','emperor'],fx:'candle',narrative:true,text:s=>[
          `七月，太后把我叫到慈宁宫吃午饭。她没有先提朝政，只问：“昨晚几时睡？”`,
          `“记不得。”`,
          `“前晚呢？”`,
          `“母后什么时候管起这个？”`,
          `她夹了一块鱼，把刺慢慢挑出来：“哀家不管。哀家只是想知道，你到底是在享福，还是不敢让屋里安静。”`,
          `我没有答。`,
          `太后也没有再问。吃完饭，她把那碟鱼往我面前推：“四十多岁了，别还拿二十岁的身子使。”`,
          `我笑了一下，把酒盏翻扣在桌上。`,
          `当晚回养心殿，我仍传了人。`
        ],choices:[{label:'继续',effects:{trust:{taihou:-1},flags:{v46TaihouSeesDecline:true}},result:''}]},
        {heading:'第四幕 · 夜宴里的人越来越年轻',cast:['emperor','zhangyuanzhao','ning'],fx:'lantern',narrative:true,text:s=>[
          `入秋以后，夜宴来的人换得很快。第一次选秀留下的低位妃有的已经做了母亲，有的在时疫里死了；第二次进宫的新人反而最常见。`,
          `我不再像年轻时那样费心分辨谁是真的喜欢哪支曲。有人笑，我便赏；有人沉默，我也懒得问。`,
          `张元照有一晚来送疫后册，站在帘外听见里面笑声，没有进去。第二日那本册子照样摆在御案最上面。`,
          `邵明贞则把六宫请安从辰初往后挪了半个时辰。她没有解释，只说“诸位昨夜辛苦”。`,
          `这句话传到养心殿时，我正在补眠。`
        ],choices:[{label:'继续',effects:{flags:{v46IndulgenceVisibleToCourt:true}},result:''}]},
        {heading:'第五幕 · 凤印为什么忽然不能再空太久',cast:['ning','zhangyuanzhao','taihou'],fx:'seal',narrative:true,text:s=>[
          `九月，礼部第三次请立中宫。前两次我都压着。`,
          `这一次折子后面没有写“六宫无主”四个字，只附了三张东西：疫后宫规、近半年请安与承宠册、两份被我批了“照旧”后又追回重批的奏折抄件。`,
          `太后看完只说：“现在不是给谁体面的问题了。”`,
          `邵明贞站在一边没有动。张元照也没有。`,
          `凤印仍在库里。可所有人都已经知道，它不会再空一年。`
        ],choices:[{label:'进入中宫之争',effects:{flags:{v46EmpressUrgency:true}},result:''}]}
      ]
    });
  }

  // 皇帝人物卡随晚期状态更新；张元照不再只是“穿越者”标签。
  const oldSync=typeof v44SyncZhang==='function'?v44SyncZhang:null;
  function v46SyncPeople(s=state){
    v46SyncAges(s);v46SyncChildDeaths(s);
    if(s.flags?.v46EmperorIndulgenceBegins&&PEOPLE.emperor){
      PEOPLE.emperor.tags=s.flags?.v69HiddenPrinceRevealed?['亲断','旧旨归卷','不替人选']:['旧伤','渐倦','怕安静'];
      PEOPLE.emperor.bio='承熙十一年前后已过四十。重阳行刺留下的右肋旧伤仍在；顾明宜之死以后，他开始用夜宴、酒和不断有人声的屋子回避太安静的时刻。朱批里的“照旧”“再议”越来越多，过去“先看清再决定”的谨慎慢慢滑成“先让别人替我看完”的倦怠。';
    }
    if(s.flags?.zhangRevealed&&PEOPLE.zhangyuanzhao){
      PEOPLE.zhangyuanzhao.tags=['穿越者','前世疫病调查','想把经验变成制度'];
      PEOPLE.zhangyuanzhao.bio='她前世活在遥远后世，二十六岁时从事疫病调查与数据记录，九岁时在大晟醒来。她想留下的不是几条新鲜办法，而是病人怎么报、谁经手、什么时候复值都能查得到的做法。这样就算换了皇后、太医和掌事，也不用每次从头摸索。';
    }else if(PEOPLE.zhangyuanzhao){
      PEOPLE.zhangyuanzhao.bio='承熙三年第一次大选入宫。她不善用漂亮话争宠，却异常执着于名字、时辰、路线和缺漏；时疫到来以前，旁人只觉得她记事的方法很怪。';
    }
  }

  // 自定义效果：第一次低位妃、疫病伤亡。
  const v46ApplyOld=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=v46ApplyOld(c);
    if(c.effects?.flags?.v46PromoteFirstLow){const k=lowPreg(state);if(k&&promoteRank(k))out.push(`${PEOPLE[k].name}晋一级 → ${lowTitle(k,state)}`)}
    if(c.effects?.flags?.v46MarkEpidemicDead){v46AssignDeaths(state);v46SyncChildDeaths(state);const lk=state.flags.v46LowVictim;if(lk)out.push(`${PEOPLE[lk].name}卒`);}
    v46SyncPeople(state);return out;
  };

  // 时疫后的史书口径与中宫时间线。
  if(typeof historyRecordV38==='function'){
    const v46HistOld=historyRecordV38;
    historyRecordV38=function(e,i){
      if(e?.title==='凤仪宫最后一冬')return '承熙十一年秋，内廷大疫。皇后顾氏躬理宫务，染疾崩。张氏协理疫务有功，宫门分区，病者渐息。';
      if(e?.title==='长夜未央')return '承熙十二年，上久不豫，宴饮渐繁，朝政多倚近臣及内廷能事者。礼部屡请正中宫。';
      if(e?.title==='中宫空悬')return state.flags?.v44NewEmpress==='ning'?'承熙十三年，册邵氏为皇后，告庙受印。':state.flags?.v44NewEmpress==='zhangyuanzhao'?'承熙十三年，特旨册张氏为皇后，告庙受印。':v46HistOld(e,i);
      return v46HistOld(e,i);
    };
  }

  // 旧存档：第二次选秀后的结构全面改变，回到空宫点灯重走，不动此前十年。
  if(!state.flags?.v46Migrated){
    const idx=CHAPTERS.findIndex(ch=>ch.title==='空宫点灯');
    if(idx>=0&&(state.index||0)>idx){state.index=idx;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.lastChoice=null;}
    state.flags.v46Migrated=true;
  }

  const v46RenderOld=render;
  render=function(){v46SyncPeople(state);return v46RenderOld();};
  v46SyncPeople(state);save();render();
}catch(e){console.error('v46 epidemic/zhang/emperor patch failed',e)}})();
