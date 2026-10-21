(()=>{try{
  document.documentElement.dataset.build='v48';
  state.flags=state.flags||{};
  const chapter=t=>CHAPTERS.find(ch=>ch.title===t);
  const step=(ch,q)=>ch?.steps?.find(st=>(st.heading||'').includes(q));
  const stepIndex=(ch,q)=>ch?.steps?.findIndex(st=>(st.heading||'').includes(q))??-1;
  const append=(chTitle,q,tag,fn)=>{
    const st=step(chapter(chTitle),q); if(!st||st[tag])return;
    const old=st.text;
    st.text=s=>{const a=typeof old==='function'?old(s):old;return [...(Array.isArray(a)?a:[a]),...fn(s)];};
    st[tag]=true;
  };
  const prepend=(chTitle,q,tag,fn)=>{
    const st=step(chapter(chTitle),q); if(!st||st[tag])return;
    const old=st.text;
    st.text=s=>{const a=typeof old==='function'?old(s):old;return [...fn(s),...(Array.isArray(a)?a:[a])];};
    st[tag]=true;
  };
  const replaceStringInStep=(chTitle,q,from,to)=>{
    const st=step(chapter(chTitle),q);if(!st)return;const old=st.text;
    st.text=s=>{const a=typeof old==='function'?old(s):old;return (Array.isArray(a)?a:[a]).map(x=>typeof x==='string'?x.replace(from,to):x);};
  };

  // ---------- A. 全卷年月硬校准 ----------
  const dateMap={
    '宫门初定':'承熙元年·正月至二月',
    '拾遗阁开门':'承熙元年·三月',
    '一碟杏仁酥':'承熙元年·四月至六月',
    '灯下弈':'承熙元年·七月至腊月',
    '母至':'承熙二年·二月至三月',
    '御前终选':'承熙三年·二月',
    '宫灯渐繁':'承熙三年·三月至六年六月',
    '香尽胎寒':'承熙六年·六月至腊月',
    '灯下旧局':'承熙七年·春至冬',
    '刃落宫门':'承熙八年·春至十月',
    '旧茶未凉':'承熙九年·二月至夏',
    '听雨轩有喜':'承熙十年·五月至十一月',
    '王府旧笼':'承熙十年·腊月至十一年二月',
    '空宫点灯':'承熙十一年·二月至五月',
    '凤仪宫最后一冬':'承熙十一年·五月至十二月',
    '长夜未央':'承熙十二年·春至十三年正月',
    '长枝渐高':'承熙十三年·春至六月',
    '中宫空悬':'承熙十三年·六月至十四年春'
  };
  for(const [t,d] of Object.entries(dateMap)){const c=chapter(t);if(c)c.date=d;}

  // 强制后半卷顺序，避免后期补丁把年份插回去。
  const tailOrder=['王府旧笼','空宫点灯','凤仪宫最后一冬','长夜未央','长枝渐高','中宫空悬'];
  const tailObjs=tailOrder.map(chapter).filter(Boolean);
  if(tailObjs.length===tailOrder.length){
    const at=Math.min(...tailObjs.map(x=>CHAPTERS.indexOf(x)));
    for(const x of tailObjs){const i=CHAPTERS.indexOf(x);if(i>=0)CHAPTERS.splice(i,1);}
    CHAPTERS.splice(at,0,...tailObjs);
  }

  // 六年七月的额外皇嗣出生应落在昭氏有孕之后，不应留在上一章末尾。
  const years=chapter('宫灯渐繁'), loss=chapter('香尽胎寒');
  if(years?.steps&&loss?.steps){
    const ji=years.steps.findIndex(st=>(st.heading||'').includes('承熙六年七月 · 又一声婴啼'));
    if(ji>=0){
      const jul=years.steps.splice(ji,1)[0];
      let li=loss.steps.findIndex(st=>(st.heading||'').includes('孕期不是一条直线'));
      loss.steps.splice(li>=0?li+1:1,0,jul);
    }
    years.date='承熙三年·三月至六年六月';
    loss.date='承熙六年·六月至腊月';
  }

  // 中宫篇不再从“皇后死后第一个月”倒叙；它发生在皇嗣成年事件之后。
  const vacancy=chapter('中宫空悬');
  if(vacancy){
    vacancy.date='承熙十三年·六月至十四年春';
    vacancy.bridge=s=>`顾明宜已经离开凤仪宫一年有余。凤印一直锁在库里，六宫由邵明贞和尚宫局分担；张元照的病籍、往来册和复值册也从一场时疫留下的权宜之物，慢慢变成御前会反复翻看的东西。三皇子已经成年，后宫里再没有谁能把“暂且不立后”当成没有代价的拖延。`;
    const first=vacancy.steps?.[0];
    if(first){
      first.heading='第一幕 · 一年多以后，六宫仍没有皇后的早晨';
      first.text=s=>[
        `承熙十三年六月，合宫请安仍设在慈宁宫。最初那些会走错宫道的人早已不再走错，凤仪宫正门却仍旧封着。`,
        `${courtTitle(s,'ning')}照旧比旁人早到半刻钟。她先看太后的药，再看尚宫局送来的宫务；有人已经不再称她“代掌六宫”，只把折子自然地先递到她手里。`,
        `她每次都先看封面，再把折子推回尚宫：“入册。别送到景仁宫私下批。”`,
        `太后看在眼里，从不夸她。只在一回散席后问我：“凤印空一年是服制，空两年便是你自己不愿意定。”`,
        `我把杯盖合上：“再等等。”`,
        `太后指了指案上的礼部请立中宫疏：“去年说等明宜的丧仪，今年丧仪已毕，这份疏还压着。须中宫落印的宫务每月都有人来问该送哪一处，你总得给他们一句准话。”`,
        `这句话我没有接。窗外六月雨刚落，凤仪宫檐下的铜铃隔着半座宫墙响了一阵。`
      ];
    }
    const blank=step(vacancy,'张元照的册子里总有些奇怪的空格');
    if(blank)blank.text=s=>[
      `${courtTitle(s,'zhangyuanzhao')}把承熙十一年的疫册重新誊了一遍。旧纸已经起毛，她仍在每个人名后留三列：发病时辰、去过何处、最后一次接触。`,
      `裴景和拿来给我看：“张主子这两年一直不肯把最早那本废掉。”`,
      `我翻到许淑惠的名字，又翻到顾明宜最后一次看过的那页。`,
      `“为什么现在重誊？”`,
      `张元照答：“因为旧册只有臣妾看得懂。若臣妾死了，它便又只是一堆纸。”`,
      `她说完没有立刻告退。`,
      `三皇子的书匣才在不久前被她原封退回，礼部又开始私议中宫。她站了很久，终于道：“还有一件事。若陛下真要在臣妾与邵娘娘之间选一个人，就不能只知道臣妾愿意让陛下知道的那一半。”`
    ];
    const reveal=step(vacancy,'臣妾不是从哪个州府来的');
    if(reveal){
      const old=reveal.text;
      reveal.text=s=>{
        const a=typeof old==='function'?old(s):old;
        return [`这一次她不是为了证明自己有奇术。她把顺王府、时疫、三皇子和凤仪宫空着的一年全说在前面：“臣妾若只做一个低位妃嫔，可以把来处带进棺材。若有可能坐凤仪宫，就不能让陛下在不知道这件事的情况下落印。”`,...(Array.isArray(a)?a:[a])];
      };
    }
  }

  // 长夜未央补足十二年冬，让十二年到十三年春之间不空档。
  const night=chapter('长夜未央');
  if(night?.steps&&!night.steps.some(st=>(st.heading||'').includes('凤印在库里过了第二个冬天'))){
    night.date='承熙十二年·春至十三年正月';
    night.bridge=s=>`顾明宜死后的第一个春天来得很慢。白日里我仍照常批折、听回话，到了夜里却常把最后一本折子压到更晚才合上。右肋的旧伤阴雨时仍会牵痛，最后一本折子合上以后，我常叫人再添一盏灯。`;
    night.steps.push({
      heading:'第六幕 · 凤印在库里过了第二个冬天',cast:['emperor','taihou','ning','zhangyuanzhao'],fx:'snow',narrative:true,text:s=>[
        `入冬以后，礼部没有再日日催立后，只在每月初一照例把旧折重送一遍。凤印的匣子由库官开封查一次，再原样锁回去。`,
        `我有时夜宴散得晚，经过库门，会看见值守内监抱着钥匙打盹。那只匣子离养心殿并不远，我却一次也没有让人取来。`,
        `邵明贞把六宫年例做完后只问：“明年春还照今年这样？”`,
        `“先照旧。”`,
        `她抬眼看我，没有立刻退下。`,
        `我自己也听见了那两个字。九年前沈氏旧案上是“照例结案”，这一年河工、换防、宫务又越来越多“照旧”。我没有把它划掉，只在旁边添了一句：“正月后再议。”`,
        `张元照后来看到那页，没有评价，只在复值册背面记下承熙十三年正月的日期。`,
        `除夕那晚没有大宴。我仍召了两名年轻嫔妃听曲，酒只喝到二更便停。人散以后，养心殿终于安静下来。我坐到灯芯结花，才叫裴景和把第二日的折子拿进来。`
      ],choices:[{label:'进入承熙十三年',effects:{flags:{v48WinterBridge:true}},result:''}]
    });
  }

  // ---------- B. 主控人设：从克制到倦怠，变的是“是否愿意继续追问”，不是突然换一种人格 ----------
  append('宫门初定','第一夜','v48EmperorStart',s=>[
    `我最终无论去哪里，都让裴景和把第二日的起居注照常写，不许另添“恩宠尤厚”一类内廷私语。新朝第一夜已经足够被人猜，我不愿再替那些猜测添一句话。`,
    `那时我三十岁，仍相信慢一点总比下错判断好。很多年后我才知道，慢和不肯判断有时只隔一层纸。`
  ]);
  append('拾遗阁开门','第一日','v48EmperorObserve',s=>[
    `我记人先记动作。抱朴进门先看灯，含章先看门，宫人先看我的脸色。谁也没有因为一场召见立刻变成我以为的样子。于是我没有急着问她们忠不忠，只让尚宫把各自住处、月例和可见之人写清。`
  ]);
  append('母至','宣召夜','v48EmperorWenheng',s=>[
    `她站着，我便没有再说第二遍“坐”。裴景和仍按旧例把她来去时辰记进御前簿。`
  ]);
  append('御前终选','我亲自问最后一题','v48EmperorSelection',s=>[
    `我没有让太后或皇后替我先圈名字。三份家谱背后各有人等着从一道册书里读朝局，我能做的只有把那一笔写成自己的，而不是事后说“礼部原本如此”。`
  ]);

  // 把旧香场景的作者解释改成皇帝当时真实看到的东西。
  const yearsCh=chapter('宫灯渐繁');
  if(yearsCh){
    yearsCh.bridge=s=>`承熙三年以后，宫里的事很少一件一件来。新人分宫时沈氏旧案已经露出第一张旧纸；蘅嫔孕事还没落定，内务府又在换旧香的库；孩子陆续出生，昭氏把笑脸留在洗三宴上，回去却把请脉的日子一笔笔记进《承露录》。到承熙六年六月，许多当时看似无关的小事已经住进了同一座宫里。`;
    for(const st of yearsCh.steps||[]){
      const old=st.text; if(!old||st.v48MetaClean)continue;
      st.text=s=>{
        const a=typeof old==='function'?old(s):old;
        return (Array.isArray(a)?a:[a]).map(x=>typeof x==='string'?x
          .replace(/<span class="faction-note">主控的防备没有错。错在他以为“经过官方渠道”就等于更可控。后来真正被动过手脚的，恰恰是一批盖着复验印的旧香。<\\\/span>/g,`我当时亲眼看过返还香匣上的复验印。印泥颜色、库号、经手名字都对得上。我把匣子合回去，没有再问第二遍。后来再看那枚印，才知道一件东西手续齐全，只能证明每一道手续都有人经过。`):x);
      };
      st.v48MetaClean=true;
    }
  }

  append('香尽胎寒','主控第一次怀疑蘅嫔','v48EmperorSuspicion',s=>[
    `我没有下令拿人。先封香匣、封换库簿、把拾遗阁与内务府的人分开问。怀疑蘅嫔是我的第一反应，却不能让第一反应先变成供词。`,
    `含章看见我把“蘅嫔”两个字写在纸边，又用朱笔圈住，没有划罪名。她什么也没说，只把母亲那几个月收到的信一封封按日期排开。`
  ]);

  append('灯下旧局','这盘棋，是我自己坐的','v48EmperorHanzhang',s=>[
    `我没有因为她终于开口便立刻相信全部。问完人名，又问她哪一件是亲眼看见、哪一件只是推出来。她每答一句，我便在纸上分开写。那一夜我第一次发现，谨慎并不只是不信人，也可以是不替一个人把她没说过的话说完。`
  ]);

  // 行刺：保留既有惨烈场面，只补主控在剧痛中的反应仍是控制局面，而非突然失控。
  append('刃落宫门','你还在流血，她已经被按在地上','v48EmperorWoundedChoice',s=>[
    `血从指缝里往外涌。谢绍庭问如何处置昭氏，我只说：“先封门。”`
  ]);
  append('刃落宫门','三天里，养心殿闻起来只有药味','v48WoundRecovery',s=>[
    `第五日退热以后，我第一次让裴景和把行刺当夜的口供念完。念到昭氏在门外等含章那一段，我叫停了一次。不是因为听不下去，是伤口一咳便像重新裂开。太医换完布，我才让他从原处继续。`,
    `此后很久，我仍会记得刀进来以前自己其实看见了她袖口重新缝过。看见了，不等于明白那根线为什么在那里。`
  ]);

  append('旧茶未凉','我与顺王单独谈了一次','v48EmperorShenCase',s=>[
    `顺王走后，我把十年前那道“照例结案”的批红重新摊开。字是我自己的，笔锋也没有任何被人冒写的地方。那时我并非没看见日期不对；我只是刚坐稳皇位，觉得一桩军案若再翻，会把刚换完的人和营一起掀起来。`,
    `年轻时那不是懒。我确实衡量过，确实选择了稳定。也正因为如此，十年后不能把错误全推给下面的人。`
  ]);

  append('听雨轩有喜','宫女旧籍也被送上御案','v48EmperorFangCase',s=>[
    `昭氏旧香以后，我已经不肯再把“手续齐全”当作结论。方小满的旧籍越写得完整，我反而越让人把每一条拆回原来的日子：送花是哪一日，领炭是哪一日，去太医院又是为了哪一道抓伤。`,
    `可我能拆慢调查，拆不慢所有人心里的先入为主。等到药真的送进听雨轩，很多人已经把她“熟路、识人、常跑各处”默认为一种罪证。`
  ]);

  append('王府旧笼','她说“臣女愿意入宫”','v48EmperorZhangEntrance',s=>[
    `我没有当场应她。先让宗人府核张氏族籍，又让人把顺王替她求退的手书与她本人那句“愿意”分开归档。两张纸都是真的，却不能让其中一张替另一张作主。`,
    `这也是我后来对她始终保留的一点礼数：不是因为她来自哪里，而是因为我第一次见她时，最先看见的是有人已经替她决定得太多。`
  ]);

  append('凤仪宫最后一冬','第一扇关上的门','v48EmperorEpidemic',s=>[
    `我准封西院时，没有把太医院的“时气”改成别的病名。谁也不知道这场病会走多远。御前能做的是决定哪些门先关、粮和炭从哪里补、谁有权调人；治病的事仍让太医说。`,
    `张元照拿三张纸来时，我先看她写错没有，再看她说得有没有用。她后来救下多少人，并不能倒过来证明她第一天每句话都对。`
  ]);

  // 晚年纵宴：仍看得见，只是越来越常选择不追问；保留“纵欲”但不写成强迫型人格。
  const nightCh=chapter('长夜未央');
  append('长夜未央','守制结束以后，酒先回到案上','v48LateEmperor',s=>[
    `牌子这一年翻得比从前勤。我仍不许内侍在被婉拒以后再催第二遍，也没有哪一个人因为不肯留下便被强行抬进暖阁。变的是另一件更不起眼的事：从前我会问她为什么沉默、为什么忽然想回宫；后来往往只赏一件东西，便让她退下。`,
    `我仍看得见，只是越来越常不愿把看见的东西追到底。`
  ]);
  append('长夜未央','夜宴里的人越来越年轻','v48LateEmperor2',s=>[
    `有一晚，新入宫的梁氏笑到一半忽然按住胃口。我看见了，也知道她大概不舒服。年轻时我会让人撤酒、问太医；那夜我只叫人换一支慢曲。半刻钟后她自己告退，我准了。`,
    `这种省事没有一道旨意，也没有一个明确的开始。只是越来越多时候，我把“她若真有事会自己说”当成不必再问的理由。`
  ]);

  // 张元照退回醉后传召：删去会直接把杨叙写成顺王的惩罚枝，保留受挫后的冷处理。
  if(nightCh?.steps){
    const ref=nightCh.steps.find(st=>(st.heading||'').includes('把传召退回来'));
    if(ref?.choices?.length>=3){
      ref.choices[2]={
        label:'把那张笺压在案下，三日不再单独召她',
        hint:'你没有逼她来，但被拒后的自尊让你先退开',
        effects:{trust:{zhangyuanzhao:-1},flags:{v47DrunkSummons:'cold'}},
        result:'三日里，景阳宫送来的公文仍照常进养心殿，我却没有再传她进西暖阁。第四日公开核档，她照旧把册子摊开。我只问数字，没有问那晚；她也没有请罪。两个人都把那点不快留在礼数里面。'
      };
    }
  }

  append('长枝渐高','三皇子已经十八','v48EmperorSeesSelf',s=>[
    `他说“照旧加银”时，我没有立即训他。先把折子第二页翻给他看，让他自己念去年与今年不同的三处。念到第二处，他声音已经慢下来。`,
    `我忽然很清楚自己为什么生气——不是因为他说错两个字，而是因为那两个字这些年也越来越常从我笔下出去。训孩子容易，承认他学到的是大人的省事更难。`
  ]);

  append('中宫空悬','凤印前最后一道旨','v48EmperorFinalChoice',s=>[
    `我没有先问谁更亲近，也没有问谁能让我夜里安静一点。两份册书都摊开以后，我让礼部把母族、宫务、疫册、皇嗣教养和外廷可能的反弹分别另列一页。`,
    `四十多岁以后我越来越常把事情交给别人看；这一道旨却不能再写“照旧”，也没有旧例能替我从两个人中选一个。凤印空了近三年，最后这一笔仍只能由我自己落。`
  ]);

  // ---------- C. 顾明宜：把早、中、晚三段行为连起来 ----------
  append('宫门初定','天亮以前','v48GuEarly',s=>[
    `凤仪宫一名小宫女收旧宴器时碰裂了银盏底座，跪着等罚。顾明宜先问是不是昨夜就有裂纹，又让掌事把库房旧登记拿来。最后册上只记“旧器损”，没有记宫女名字。`,
    `她不是不守规矩。恰恰因为太守规矩，她总想在规矩里找一条能把自己人遮住的缝。`
  ]);
  append('御前终选','三份家谱先于三张脸到御前','v48GuSelection',s=>[
    `顾明宜看邵明贞那页最久。她没有替表妹求高位，反而把顾氏与邵氏的姻亲关系在旁边又注明一次，像怕礼部漏写，也像怕别人以后说她故意没写。`,
    `轮到陌生世家，她问得最多的是“先帝朝有没有同例”；轮到熟人，她问得最多的是“写进册里会不会害她”。`
  ]);
  append('凤仪宫最后一冬','皇后也开始发热','v48GuLate',s=>[
    `发热以后她仍问东所门禁，问三皇子的太医有没有被抽走。邵明贞说都按她最后的吩咐办了，她才闭眼。`,
    `邵明贞把册子接过去时，顾明宜的手还压在那一页上。过了一会儿，她才松开：“东所那边，明早再核一遍。”`
  ]);

  // ---------- D. 年龄显示：当前章节/幕推进，死人停在卒年 ----------
  const cn={'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,'十一':11,'十二':12,'十三':13,'十四':14,'十五':15};
  function yearNow(){
    const ch=CHAPTERS[state.index]||CHAPTERS[0], st=ch?.steps?.[state.chapterStep||0];
    const txt=`${st?.heading||''} ${(typeof st?.text==='string'?st.text:'')}`;
    let m=txt.match(/承熙(十一|十二|十三|十四|十五|十|[一二三四五六七八九])年/);
    if(m)return cn[m[1]]||1;
    if(ch?.title==='中宫空悬' && (st?.heading||'').includes('凤仪宫重新开门'))return 14;
    if(ch?.title==='中宫空悬' && (st?.heading||'').includes('凤印前最后一道旨'))return 14;
    m=String(ch?.date||'').match(/承熙(十一|十二|十三|十四|十五|十|[一二三四五六七八九])年/);
    return m?(cn[m[1]]||1):1;
  }
  globalThis.yearNow=yearNow;
  const ageBase={
    emperor:[1,30],gu:[1,29],shen:[1,28],zhou:[1,27],wenheng:[2,37],baopu:[1,20],hanzhang:[1,20],fang:[1,17],peiyan:[1,31],xielin:[1,29],afu:[1,19],shunwang:[1,27],ning:[3,19],ke:[3,21],hui:[3,19],zhangyuanzhao:[11,18]
  };
  const deathYear={gu:11,baopu:8,fang:10};
  for(const [k,[start,base]] of Object.entries(ageBase)){
    if(!PEOPLE[k])continue;
    try{Object.defineProperty(PEOPLE[k],'age',{configurable:true,enumerable:true,get(){let y=yearNow();if(deathYear[k]&&state.ranks?.[k]&&/^故/.test(state.ranks[k]))y=Math.min(y,deathYear[k]);if(k==='wenheng'&&state.ranks?.wenheng&&/^故/.test(state.ranks.wenheng))y=Math.min(y,8);return `${base+Math.max(0,y-start)}岁`;},set(_v){}})}catch(_e){}
  }

  // 皇嗣页在十四年春的后几幕显示十四年，而不是仍停在十三年。
  if(typeof childrenView==='function'){
    const oldChildrenV48=childrenView;
    childrenView=function(){
      const ch=CHAPTERS[state.index], st=ch?.steps?.[state.chapterStep||0], oldDate=ch?.date;
      const y=yearNow();
      if(ch&&y===14)ch.date='承熙十四年·春';
      try{return oldChildrenV48();}finally{if(ch)ch.date=oldDate;}
    };
  }

  // 页面上的静态皇帝节点同步。
  const oldRenderV48=render;
  render=function(){
    const r=oldRenderV48();
    const n=document.querySelector('.emperor-node span');if(n)n.textContent='大晟新帝 · 30岁';
    const meta=document.querySelector('meta[name="description"]');if(meta)meta.content='以杨叙之名，走过承熙十四年的后宫纪事。前因会成为后果；少数落子改变镜象，却不能逃出宿命。';
    return r;
  };

  // ---------- E. 史书记年同步 ----------
  if(typeof historyRecordV38==='function'){
    const oldHistV48=historyRecordV38;
    historyRecordV38=function(e,i){
      const t=e?.title||'';
      if(t==='凤仪宫最后一冬')return '承熙十一年秋，内廷大疫。十月，皇后顾氏染疾崩。张氏协理疫务，宫门分区，病势至冬渐息。';
      if(t==='长夜未央')return '承熙十二年，上宴饮渐繁，政事多委近臣先阅。礼部屡请正中宫，留中不发。';
      if(t==='长枝渐高')return '承熙十三年，诸皇子女渐长。三皇子顺谦成年，始预闻部分朝议。';
      if(t==='中宫空悬'){
        if(state.flags?.v44NewEmpress==='ning')return '承熙十四年春，册邵氏为皇后，告庙受印。';
        if(state.flags?.v44NewEmpress==='zhangyuanzhao')return '承熙十四年春，特旨册张氏为皇后，告庙受印。';
      }
      return oldHistV48(e,i);
    };
  }

  // 旧存档只回退后半卷，不动前十年已经做过的选择。
  if(!state.flags.v48Migrated){
    const i=CHAPTERS.findIndex(ch=>ch.title==='长夜未央');
    if(i>=0&&(state.index||0)>i){state.index=i;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.lastChoice=null;}
    state.flags.v48Migrated=true;
  }
  save();render();
}catch(e){console.error('v48 timeline/persona patch failed',e)}})();
