(()=>{try{
  document.documentElement.dataset.build='v56';
  document.title='宫灯未眠 · 宫外回声与人物分化 v56';
  const V56_CURRENT_TITLE=CHAPTERS[state.index]?.title;
  const CH=t=>CHAPTERS.find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));
  const IX=(c,q)=>c?.steps?.findIndex(x=>(x.heading||'').includes(q))??-1;
  const arr=(v,s)=>{const a=typeof v==='function'?v(s):v;return Array.isArray(a)?a:[a];};
  const append=(st,tag,fn)=>{if(!st||st[tag])return;const old=st.text;st.text=s=>[...arr(old,s),...fn(s)];st[tag]=true;};
  const addAfter=(c,q,obj,tag)=>{if(!c?.steps||c.steps.some(x=>x?.[tag]))return;const i=IX(c,q);if(i>=0){obj[tag]=true;c.steps.splice(i+1,0,obj);}};
  const addBefore=(c,q,obj,tag)=>{if(!c?.steps||c.steps.some(x=>x?.[tag]))return;const i=IX(c,q);if(i>=0){obj[tag]=true;c.steps.splice(i,0,obj);}};
  const hasLow=(s,k)=>(s?.flags?.lowConsorts||[]).includes(k)&&PEOPLE[k];

  // ---------- A. 新人物：黛拉。她不进入通用承宠池，避免任何系统自动把她写成侍寝角色。 ----------
  if(!PEOPLE.daila){
    PEOPLE.daila={name:'黛拉',title:'珂兰贵女',age:'19岁',home:'承露馆',noPortrait:true,portraitKind:'youngwoman',glyph:'黛',introducedAt:999,
      tags:['珂兰王族','笑声很亮','不肯做玩物'],
      bio:'来自极西珂兰。她说中原话时常把尾音拖得比旁人长一点，笑声也从不压低；越有人想把她当成新奇玩意儿看，她越先用玩笑把对方的话堵回去。她不太怕失宠，更怕别人只把她当成一件新鲜玩意儿。'};
  }
  INITIAL_STATE.ranks.daila=INITIAL_STATE.ranks.daila||'未入宫';
  INITIAL_STATE.bond.daila=INITIAL_STATE.bond.daila??24; INITIAL_STATE.trust.daila=INITIAL_STATE.trust.daila??34;
  state.ranks.daila=state.ranks.daila||'未入宫';state.bond.daila=state.bond.daila??24;state.trust.daila=state.trust.daila??34;

  // ---------- B. 宫外间隙一：沈氏旧案的源头。宫外只提供痕迹，判断仍回到宫内。 ----------
  if(!CH('间隙 · 柱中旧纸')){
    const oldcase=CH('旧茶未凉');const at=oldcase?CHAPTERS.indexOf(oldcase)+1:-1;
    if(at>0)CHAPTERS.splice(at,0,{
      date:'承熙九年·夏',title:'间隙 · 柱中旧纸',theme:'京北旧驿道',place:'北境旧营外茶棚',cast:[],fx:'wind',
      bridge:s=>`沈氏平反诏书出京的同月，北去驿道上也有人听见了消息。宫里改的是案卷上一行字，宫外有人等那一行字等了十一年。`,steps:[
        {heading:'茶棚 · 一根从不让人劈的柱子',cast:[],fx:'wind',narrative:true,text:s=>[
          `旧营撤并以后，原来的行军主簿在驿道边开了间茶棚。右腿坏在早年的冻伤里，走路总先把木拐往前点一下。`,
          `茶棚最靠灶的一根柱子颜色比别处黑。伙计换过三茬，人人都知道那根柱子不能劈来烧火。问为什么，老卒只说：“承重。”`,
          `十一年前那一夜，中旨赶到军中，要把沈家那名校尉的“战殁”改成“脱营逃亡”。主簿说前一日还见过尸册，来人只让他照写。`,
          `他在正册上写了“逃”，又趁换灯时抄下一页。纸容易烂，他便拿油布裹住，外头再用炭重描一遍，塞进柱腹。`,
          `第二日他因“抗命多言”挨了二十军棍。后来营散、人走、正册重抄，那根柱子却被他买回家，立进茶棚。`
        ],choices:[{label:'继续',effects:{flags:{v56OutsideOldLedger:true}},result:''}]},
        {heading:'诏书到驿道',cast:[],fx:'candle',narrative:true,text:s=>[
          `平反诏书并不是给他看的。驿卒换马时在棚里喝茶，随口说：“沈家那个逃兵，朝廷改回来了。”`,
          `老卒正在滤茶叶，手忽然停住：“改成什么？”`,
          `“战殁，有功。”`,
          `他没有再问谁查的、皇帝认没认错，只等客人走远，才拿凿子一点点撬开柱背。油布已经硬得像旧皮。`,
          `他把抄本铺在桌上，最显眼的是那个“逃”字。因为当年怕写错，那一字反而比前后都端正，一横一竖都压得很重。`,
          `傍晚，他在茶棚后给一块没有名字的小木牌倒了一盏茶，把油布送进火里：“名字改回来了。你走吧。”`,
          `第二日，京里新封好的沈氏平反卷宗入库。没人知道北边也有一份旧纸在同一天化成灰。`
        ],choices:[{label:'回宫',effects:{flags:{v56OutsideOldLedgerBurned:true}},result:''}]}
      ]
    });
  }

  // ---------- C. 王静娴 × 元照：一个让记录可交接，一个让被抹掉的内容仍有人记得。 ----------
  if(PEOPLE.zhao2){
    PEOPLE.zhao2.tags=['懂场面','记人不记册','活的备份'];
    PEOPLE.zhao2.bio='京中四品官员之女。她不爱抄时辰路线，真正记得牢的是人：谁说话时先看了谁、谁把一句话改过口、谁每逢心虚就去理袖口。纸能被收走，她脑子里那份场面却很难被人重写。';
  }
  const growth=CH('长枝渐高');
  if(growth&&!growth.steps.some(x=>(x.heading||'').includes('少了一页以后'))){
    const p=Math.max(1,Math.min(growth.steps.length-1,3));
    growth.steps.splice(p,0,{heading:'四月 · 少了一页以后',cast:['zhangyuanzhao','zhao2'],fx:'ink',narrative:true,text:s=>[
      `景阳宫复核疫后旧册时，张元照发现一页换值记录不见了。不是整本失窃，只少了一页，线眼还在，像有人用很薄的刀沿装订处慢慢割走。`,
      `她先封柜、核钥匙、问经手，做到第三步时王静娴正好来还一份借看的宫女名册。`,
      `“哪一页？”`,
      `张元照报了日期。`,
      `王静娴想了一会儿，把那天下午七个换值人的名字依次说出来，又补了两句：“第三个原先说未时到，后来改成申初。第五个念自己名字时咳了一声，旁边那个替他接了话。”`,
      `张元照第一次没有立刻落笔：“你记下来了？”`,
      `“没有。”`,
      `“那你怎么——”`,
      `“臣妾不太爱记纸。”王静娴看着那道被割开的线眼，“纸写了，就会有人想着怎么让它消失。人当场怎么说话，臣妾反而忘得慢。”`,
      `张元照脱口道：“那也得有备份。”见王静娴没听懂，她顿了一下，换回宫里的说法，“同一件事，不能只留在一个地方。”`,
      `王静娴笑：“娘娘负责让它传下去。臣妾就负责有人想烧的时候，还能把话说回来。”`,
      `那页纸后来仍没有找到。缺口却没有因此变成空白。`
    ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:2,zhao2:3},flags:{v56LivingBackup:true}},result:''}]});
  }

  // ---------- D. 邵明贞：她不是顾明宜2.0。她真正危险的是太相信“名分正确”。 ----------
  const vacant=CH('凤座无人');
  if(vacant&&!vacant.steps.some(x=>(x.heading||'').includes('规矩完全没错的那一次'))){
    const i=IX(vacant,'同一个病愈宫女');
    const obj={heading:'三月末 · 规矩完全没错的那一次',cast:['ning','taihou'],fx:'rain',narrative:true,text:s=>[
      `许淑惠死后，她原来身边的宫女素荷一直留在封院里整理遗物。疫禁解除，尚宫局来问去处。`,
      `按宫籍，主位亡故，旧宫人应归内务府重新分差。邵明贞看完籍册，只说：“照籍归还。空院不能私留宫人。”`,
      `没有一条旧例写错。素荷也没有抗命，当日下午便跟着人搬去新差。`,
      `第二日，她在抬一箱春衣时晕倒。太医说病后气血未复，本该至少再歇十日。原来封院那边知道她身子虚，新接手的掌事只看到籍册上两个字：可用。`,
      `邵明贞去看她时站在门外很久。素荷醒来还先请罪：“奴婢误了差。”`,
      `“不是你误。”邵明贞答得很慢。`,
      `她回去把那张调差文书重新翻了一遍。名分、宫籍、签押全部正确，错的是她相信“正确”已经足够。`,
      `当晚她另补一条：疫后复差须附太医可任何等劳作，不得只写“可用”。太后看完没有夸，只问：“这回你记住的是规矩错了，还是你也会错？”`,
      `邵明贞把纸折好：“臣妾会错。”`
    ],choices:[{label:'继续',effects:{trust:{ning:2},flags:{v56NingRightButHurt:true}},result:''}]};
    if(i>=0){obj.v56NingHarm=true;vacant.steps.splice(i,0,obj);}
  }

  // ---------- E. 两组镜像人物：梁/霍不是两把同样的弓；宋/崔不是同一套供应网换姓。 ----------
  const second=CH('空宫点灯');
  if(second){
    const huo=ST(second,'射圃里多了一张新弓')||ST(second,'北营之外还有别的弓');
    append(huo,'v56LiangHuoSplit',s=>[
      `散场以后，梁素贞没有立刻走。她把弓弦卸下来，用指腹捻了一下受潮后起毛的位置：“北边干，弦可以绷着收。东南这样放一夜，第二天就废。”`,
      `霍素英问：“你怕别人把你当第二个我？”`,
      `梁素贞答得很快：“怕。也怕他们先把娘娘当第一支军门，再把臣妾当第二支。”`,
      `霍素英笑出声：“那就别学我。你若哪天跟我说海防只要把宫门守紧，我先赶你出去。”`,
      `梁素贞也笑。两人后来仍不常私下走动；不是不合，而是都知道两支军门太亲近，本身就会被朝堂解释成另一件事。`
    ]);
    const cui=ST(second,'长春宫收到一盒新茶');
    append(cui,'v56SongCuiSplit',s=>[
      `宋文秀入宫以后很快送来一份建议：由宋家熟悉的三处仓行统一代办六宫冬布，再由内务府总验，可以少走两道转运。纸面上每一条都比旧法省事。`,
      `崔静仪看完，问她：“为什么一定要三处都归一张总单？”`,
      `“统一才不容易出错。”宋文秀说。`,
      `崔静仪沉默片刻，把自己当年第一份替宫中“省事”的贡造旧单找出来放在她面前：“我家当初也是这么开始的。”`,
      `宋文秀脸上的自信第一次松了一点。她没有撤回建议，只把三家改成轮换承办，验收人也不得连续两季相同。`,
      `崔静仪看着她改字，忽然像看见了一个没有走完自己旧路的人。`
    ]);
  }

  // ---------- F. 时疫：和妃与元照先因工作互补，不发爱情信号。元照的说话方式更像现代人。 ----------
  const winter=CH('凤仪宫最后一冬');
  if(winter&&!winter.steps.some(x=>(x.heading||'').includes('一盏亮一点的灯'))){
    const i=IX(winter,'张元照要的不是药方');
    if(i>=0)winter.steps.splice(i+1,0,{heading:'第三幕半 · 一盏亮一点的灯',cast:['shen','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
      `张元照第一次在永和宫和沈知微单独说疫务，是为了“为什么有人发热也不肯报”。`,
      `她把问题拆得很直：“先不问谁瞒报。先问报了以后会失去什么。月例？差事？会不会连同屋一起受罚？”`,
      `和妃看她一眼：“你说话像在拆一只箱子。”`,
      `“不拆开就只剩一句‘她为什么不说实话’。”`,
      `沈知微让宫女拿来几份旧宫规。里面果然有病中停差便减月例、同屋一并隔离后记旷差的旧条。`,
      `“人怕的不是病。”和妃说，“是先承认病了，日子就先没了。”`,
      `张元照当晚在新告示最上面写：主动报病，不追责，不扣当月例。她写得很快，最后一个“不”字墨尤其重。`,
      `她核名册时习惯把灯挪得很近。第二晚再来永和宫，案边已经换了一盏灯芯更粗的灯。她抬头看了一眼。沈知微正在翻别的册子，没有解释。`
    ],choices:[{label:'继续',effects:{trust:{shen:2,zhangyuanzhao:2},flags:{v56ShenZhangEpidemicSeed:true}},result:''}]});
  }

  // ---------- G. 宫外间隙二：宫里的报病规则落不到城里，每一份数字都有自己的来路。 ----------
  if(!CH('间隙 · 城南药价')){
    const wi=CHAPTERS.findIndex(x=>x.title==='凤仪宫最后一冬');
    const snowi=CHAPTERS.findIndex(x=>x.title==='雪尽宫门');
    const at=snowi>=0?snowi:(wi>=0?wi+1:-1);
    if(at>=0)CHAPTERS.splice(at,0,{
      date:'承熙十一年·九月至十一月',title:'间隙 · 城南药价',theme:'汴京城南',place:'药铺 / 米行 / 京兆府',cast:[],fx:'rain',
      bridge:s=>`宫门一扇扇关上的时候，汴京并没有一起关门。城里照常开市、卖米、抓药，也照常有人把发热说成受凉。`,steps:[
        {heading:'药铺 · 同一帖药三个价',cast:[],fx:'rain',narrative:true,text:s=>[
          `城南药铺的小学徒从九月起每天第一件事就是重写门口木牌。前一天一百二十文的方子，第二日一百八十，第三日掌柜让他直接擦掉价钱。`,
          `京兆府衙役来问，掌柜把进货单摊开：“北路断了两日，药材就是贵。”账面没有假。后院却还压着三箱上月进的旧货。`,
          `小学徒不敢说。他只发现穷人开始把一帖药拆成两次煎，第一次给老人，第二次添水给孩子。`,
          `有个妇人问“是不是疫病”，掌柜立刻说：“别乱讲。说了要封街。”妇人抱着药走时，把围巾往孩子脸上又裹了一层。`
        ],choices:[{label:'继续',effects:{flags:{v56OutsideDrugPrice:true}},result:''}]},
        {heading:'米行 · “平价”第四天',cast:[],fx:'ink',narrative:true,text:s=>[
          `京兆府下令平价卖米，前三日米行确实按公文上的价出。第四日，旧米卖完，掌柜换了新到的一批。牌子上的价没变，一斗的木升却换成了底更厚的。`,
          `来买米的人看不出木升少了多少，只知道同样一袋钱，回家倒进缸里比上月浅。`,
          `月底两份奏报同时进宫。一份写“京师米价遵令平稳”，盖着京兆府印；另一份来自巡城御史，写“四门外已有饿死者”。`,
          `两份纸都是真的。第一份先被放到御案上。`,
          `那天宫里，张元照正要求每一个新增病人都写清“从哪里来”。城外没有人替那个饿死的人写这一栏。`
        ],choices:[{label:'回宫',effects:{flags:{v56OutsideTwoReports:true}},result:''}]}
      ]
    });
  }

  // ---------- H. 《雪尽宫门》再加身后事：制度能把诏书送到家，却未必送得回真话。 ----------
  const snow=CH('雪尽宫门');
  if(snow&&!snow.steps.some(x=>(x.heading||'').includes('两封信出了宫门'))){
    const i=IX(snow,'方小满的名字又被写了一次');
    if(i>=0)snow.steps.splice(i+1,0,{heading:'第二幕半 · 两封信出了宫门',cast:['afu'],fx:'snow',narrative:true,text:s=>[
      `白诏核完以后，礼部另外封了两只窄匣。第一只送许淑惠家：名牌、恤银、病亡文书。传旨的人照官样说“疫中薨逝，朝廷悯恤”。许家人跪着听完，许母抬头问：“她最后疼不疼？”`,
      `传旨内监没有这个答案。他只重复：“娘娘名牌已经送归，不会错。”许母嘴唇动了一下，最终又叩下头。`,
      `另一封送往方小满原籍。宫册上写的是“故顺贵人方氏”，若后来若追晋，又会再添一个更高的名位；没有一句官文写她怎样被冤、怎样信下最后一碗药。`,
      `开春以后阿芙得了几日假，替听雨轩旧物跑了一趟。她没有带案卷，只带了一张杏仁酥的做法。`,
      `“她以前说家里人会喜欢。”`,
      `方家照着做了一盘，火候没掌好，边上有几块烤焦。晚饭时仍摆在空着的座位前。`,
      `宫里能给死者名位、祭葬、抚恤。那一晚，真正进了方家门的却只是一股有点焦的杏仁甜味。`
    ],choices:[{label:'继续看红诏',effects:{flags:{v56LettersHome:true}},result:''}]});
  }

  // ---------- I. 大封后：和妃第一次为“新的人”沏新茶；顺王成为两人共同识别控制的旧经验。 ----------
  if(vacant&&!vacant.steps.some(x=>(x.heading||'').includes('新茶不是为了翻旧案'))){
    const i=IX(vacant,'同一个病愈宫女');
    const pos=i>=0?i+1:Math.min(4,vacant.steps.length);
    vacant.steps.splice(pos,0,{heading:'四月夜 · 新茶不是为了翻旧案',cast:['shen','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
      `复值册做到很晚，张元照去永和宫核一名旧宫人的住处。沈知微让人退下，只留一壶茶。`,
      `张元照喝了半杯才问：“娘娘以前也这么喝？”`,
      `“以前喝得更苦。”`,
      `“为什么换？”`,
      `“有些东西放太久，味道不是更深，是坏了。”`,
      `张元照没有追问旧案。她低头转着茶杯，忽然问：“娘娘还记得自己来的地方吗？”`,
      `沈知微看了她一会儿，反问：“你来的地方，有人记得你吗？”`,
      `张元照指尖停在杯沿。她没有回答。`,
      `过了一会儿，她说起顺王：“王爷以前也总说，他记得臣妾喜欢什么、怕什么，所以替臣妾选的才最好。”`,
      `沈知微道：“他年轻时也替我关过门，然后说外面风大。”`,
      `“娘娘恨他吗？”`,
      `“不必什么都用恨收尾。”沈知微把茶壶往她那边推，“受过恩，也不等于把余生还回去。”`,
      `张元照把凉掉的半杯喝完。沈知微看见茶汤很浅，才想起今晚拿的是新茶。她没有换壶。`
    ],choices:[{label:'继续',effects:{trust:{shen:3,zhangyuanzhao:3},flags:{v56ShenZhangNewTea:true}},result:''}]});
  }

  // ---------- J. 宫外间隙三：顺王旧别业。保护与控制的边界从宫内回到一扇普通的门。 ----------
  if(!CH('间隙 · 西华门外')){
    const snowi=CHAPTERS.findIndex(x=>x.title==='雪尽宫门');const vi=CHAPTERS.findIndex(x=>x.title==='凤座无人');
    const at=vi>=0?vi:(snowi>=0?snowi+1:-1);
    if(at>=0)CHAPTERS.splice(at,0,{
      date:'承熙十二年·二月',title:'间隙 · 西华门外',theme:'京郊旧封别业',place:'顺王旧别业',cast:['shunwang'],fx:'snow',
      bridge:s=>`大封六宫的红诏传遍内廷时，西华门外另有一辆车没有挂彩。顺王若离京，旧别业要先封；若仍留京，也总有一些多年没动过的门该重新点一遍。`,steps:[
        {heading:'老仆 · 一串多出来的钥匙',cast:['shunwang'],fx:'snow',narrative:true,text:s=>[
          `替顺王看旧别业的老仆收到账房来信，只写“清点东偏院旧物”。他拿着钥匙走到最里面，发现钥匙串上仍多着一把小铜钥。`,
          `那把钥匙原先开王府一间小书房。张元照离府以后，门锁早换了，钥匙却一直跟着旧账箱送到别业。`,
          `老仆不知道宫里发生过什么，只记得很多年前王爷来此避暑，常说“女孩子一个人在外不安全”。后来又听说那姑娘为了出府，连路引都被收走。`,
          `他把钥匙从串上摘下来，没有扔。只是放进一只写着“无用旧铜”的盒子。`,
          `院门合上时，他忽然觉得所谓保护，大概就是一扇门从里面能不能自己打开。`
        ],choices:[{label:'继续',effects:{flags:{v56OutsideWangKey:true}},result:''}]},
        {heading:'车出西华门',cast:['shunwang'],fx:'wind',narrative:true,text:s=>[
          s.flags?.shunwangFinalFate==='fief'?`顺王的车真正出西华门那天，没有人来送。老仆在别业门口等到午后，才收到一句“王爷不回京了”。他把正门钥匙交给宗人府，只留下那只旧铜盒。`:`顺王最终仍留京，旧别业没有封死。老仆每月照例开门扫尘，却再没有接到“替谁把门看紧”的吩咐。`,
          `宫里，沈知微把一支旧曲重新抄进常用曲单；张元照把顺王府退回的木箱列入“本人拒收”旧例。两件事没有写在同一本册里。`
        ],choices:[{label:'回宫',effects:{flags:{v56OutsideWangDoor:true}},result:''}]}
      ]
    });
  }

  // ---------- K. 黛拉第一幕：所有人以为“像”，主控只恍惚一息，然后主动划界。 ----------
  if(!CH('极西来客')){
    const vi=CHAPTERS.findIndex(x=>x.title==='凤座无人');const ni=CHAPTERS.findIndex(x=>x.title==='长夜未央');
    const at=ni>=0?ni:(vi>=0?vi+1:CHAPTERS.length);
    const dchapter={date:'承熙十二年·六月',title:'极西来客',theme:'热烈也有第二种来处',place:'承露馆 / 养心殿',cast:['emperor','daila','peiyan'],fx:'lantern',
      bridge:s=>`六月末，珂兰贡使入京。贡单里有马、琉璃、蓝石和一行最难写的字：国主之侄女黛拉随使团留京。礼部把“留”写得很轻，所有人都知道那其实也是两国谈判的一部分。`,steps:[
        {heading:'第一幕 · 笑声先过门槛',cast:['daila','peiyan'],fx:'lantern',narrative:true,text:s=>[
          `黛拉第一次进养心殿时，中原话已经说得很熟，只是“陛下”两个字总带一点珂兰卷舌音。`,
          `她行完礼，抬头便问：“你们宫里是不是不许女人笑太大声？一路上三个人提醒我。”`,
          `裴景和低头。旁边两个老宫人却都露出极短的迟疑。回廊外有人压着声音说：“又一个昭氏那样的。”`,
          `黛拉听见了，反而转头：“昭氏是谁？教我，我也学学怎么勾皇帝。”`,
          `满殿的人都不敢笑。她自己先笑起来，声音亮得几乎撞到梁上。`,
          `我抬眼看她，有一瞬确实想起旧日另一个总把笑声留在门外的人。只一瞬。`,
          `那个人的眼睛总在问“看我”；黛拉此刻眼里更像一句先发制人的“别笑我”。`,
          `我把目光收回来。裴景和替她添座时，比平日慢了半息。`
        ],choices:[{label:'让她坐下，把贡使留下的条件先说清',effects:{ranks:{daila:'黛贵人'},trust:{daila:1},flags:{v56DailaEntered:true}},result:'礼部以外邦贵女礼暂册黛贵人，居承露馆。册命写的是政治安置，不入通用侍寝名册。'}]},
        {heading:'第二幕 · 她先问自己是不是一件贡品',cast:['daila'],fx:'ink',narrative:true,text:s=>[
          `礼部拟的安置文书写“珂兰贵女自愿留京，以敦两国之好”。黛拉看完第一句便笑：“自愿？”`,
          `“你不愿？”`,
          `“我愿不愿，和他们需要我留，是两件事。”`,
          `她把文书往前推：“陛下可以把我当人质，也可以把我当贵客。别写成我一路哭着求进你后宫。”`,
          `我问：“那你方才一路撩拨宫人，也是怕别人写错？”`,
          `她靠回椅背：“先把自己说得像个玩笑，别人再笑我，就没那么疼。”`,
          `说完她自己先怔了一下，像没打算把后半句说出来。很快又笑：“陛下当没听见。”`,
          `我没有追问。`
        ],choices:[{label:'文书改为“依盟议暂居京中”，不写自愿求留',effects:{trust:{daila:4},flags:{v56DailaWordingRespected:true}},result:'改了三个字，礼部重誊一份。黛拉看完没有谢“恩”，只说：“这回像人话。”'}]},
        {heading:'第三幕 · 裴景和问“像不像”',cast:['peiyan'],fx:'candle',narrative:true,text:s=>[
          `黛拉走后，裴景和收茶盏，收到第三只时才问：“陛下觉得……像么？”`,
          `我知道他问谁。`,
          `“不像。”`,
          `“奴才也觉得不像。”`,
          `他答得太快。我看他一眼。裴景和立刻低头去收第四只茶盏。`,
          `那晚我没有传承露馆，也没有叫人把她的名字放进绿头牌。她是珂兰留在京中的一枚政治筹码，已经够重，不需要再用床榻证明一次。`
        ],choices:[{label:'继续',effects:{flags:{v56EmperorDrawsDailaLine:true}},result:''}]},
        {heading:'第四幕 · 珂兰话里，一个词能有两层门',cast:['daila'],fx:'ink',narrative:true,text:s=>[
          `使团留下的旧译官来教宫里几句珂兰礼语。一个词，他译作“迎归”；黛拉在旁边忽然笑：“也可以译成‘收回’。”`,
          `译官脸色一变：“贵人，朝会用语自然取敬义。”`,
          `“可信里若有人写这个词，陛下看到‘迎归’，珂兰人心里想的可能是‘收回’。”`,
          `她拿朱笔在两个汉字之间画一条线：“翻译不是把一个词换成另一个词。你选哪一个意思，后面的人就会以为事情本来只有那一个意思。”`,
          `我让礼部以后遇到争义词，原文与两种译法并列。黛拉挑眉：“陛下倒不怕看见两个答案。”`,
          `“怕。总比只看一个错答案好。”`
        ],choices:[{label:'继续',effects:{trust:{daila:2},flags:{v56KelanDualTranslation:true}},result:''}]}
      ]};
    CHAPTERS.splice(at,0,dchapter);
  }

  // 黛拉登场索引必须在插章完成后再写，避免人物录提前出现。
  PEOPLE.daila.introducedAt=Math.max(0,CHAPTERS.findIndex(x=>x.title==='极西来客'));

  // ---------- L. 长夜未央：唯一一次身体上的暧昧。皇帝醉召二人，自己先睡着。 ----------
  const night=CH('长夜未央');
  if(night&&!night.steps.some(x=>(x.heading||'').includes('一场没人真正侍寝的侍寝'))){
    const i=IX(night,'守制结束以后')>=0?IX(night,'守制结束以后'):0;
    night.steps.splice(i+1,0,{heading:'八月夜 · 一场没人真正侍寝的侍寝',cast:['shen','zhangyuanzhao','peiyan'],fx:'lantern',narrative:true,text:s=>[
      `那晚我喝得太快，忽然叫裴景和同时传和妃与张元照。传话用的是侍寝的旧口径，连裴景和都停了一息，仍照旨去了。`,
      `两个人到西暖阁时，我已经靠在榻上睡着。酒盏还握在手里，裴景和费了半天才抽出来。`,
      `“叫醒么？”张元照问。`,
      `沈知微看一眼榻上：“你想叫？”`,
      `“不想。”`,
      `裴景和像终于等到一句能执行的话，立刻让人撤酒，只留下外间一盏灯。按侍寝规矩，两人的外氅已经被宫女收走，发上的重簪也解了一半。`,
      `张元照有一枚细簪缠在发尾，自己伸手越解越紧。沈知微看了一会儿：“别动。”`,
      `她站到张元照身后，把那缕头发从簪脚一点点绕出来。最后一下太近，指腹擦过耳后。张元照呼吸忽然停了一拍。`,
      `沈知微的手也停住。`,
      `两个人在灯下都没有马上退。近到张元照能闻见她袖口的新茶气，沈知微也能看见她熬夜后眼下极淡的一层青。`,
      `榻上我翻了个身，含糊说了一句谁也没听清的话。`,
      `两人同时后退半步。沈知微把解下来的簪子放到桌上：“好了。”`,
      `“……多谢娘娘。”`,
      `后半夜她们谁也没有再靠近，只隔着一张茶案坐到天将亮。宫中起居注第二日仍照旧写“召和妃、张氏入侍”。只有屋里三个人知道，这一夜真正睡得最熟的是皇帝。`
    ],choices:[{label:'天亮以前让她们各自回宫',effects:{trust:{shen:2,zhangyuanzhao:2},flags:{v56ShenZhangOnlyTouch:true}},result:'裴景和开门时，沈知微先出去。张元照等了一息才跟上。两人一路没有并肩。'}]});
  }

  // ---------- M. 裴景和 × 元照：人脑记人，纸面记事；裴的衰老让制度必要性更具体。 ----------
  if(night&&!night.steps.some(x=>(x.heading||'').includes('裴景和第一次把两把钥匙记反'))){
    const i=IX(night,'三份折子')>=0?IX(night,'三份折子'):Math.min(3,night.steps.length);
    night.steps.splice(i+1,0,{heading:'九月 · 裴景和第一次把两把钥匙记反',cast:['peiyan','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
      `裴景和在御前二十多年，第一次把两把柜钥匙递反，是个没有任何后果的小错。景仁宫宫务柜的钥匙递给了张元照，疫册柜那把递给邵明贞。两个人都在开锁前发现了。`,
      `裴景和接回来，笑着说：“老眼昏花。”笑完却把两把钥匙放在掌心看了很久。`,
      `张元照第二日做了两块不同形状的木牌，一块方，一块圆，分别穿在钥匙上。裴景和摸了摸：“以后换个人，也认得？”`,
      `“就是为了换个人也认得。”`,
      `“那你这册子会记得和妃冬天手冷，茶要先温杯么？”`,
      `张元照愣了一下：“不会。”`,
      `“大公主紧张时先摸左边袖口？”`,
      `“也不会。”`,
      `裴景和把圆木牌挂回腰间：“你记事。我记人。只是人脑子会老。”`,
      `张元照道：“所以事不能只靠裴公公记。人……也不能只靠一个人记。”`,
      `裴景和没接这句，只叫来跟了自己三年的小内监，让他认两把新钥匙。`
    ],choices:[{label:'继续',effects:{trust:{peiyan:2,zhangyuanzhao:2},flags:{v56PeiMemoryAges:true}},result:''}]});
  }

  // ---------- N. 黛拉第二拍：她自己去看那份旧档，只出现一次旧人名字，然后停止比较。 ----------
  if(growth&&!growth.steps.some(x=>(x.heading||'').includes('六个字压在旧档最后'))){
    const p=Math.max(1,growth.steps.length-1);
    growth.steps.splice(p,0,{heading:'五月夜 · 六个字压在旧档最后',cast:['daila','hanzhang'],fx:'candle',narrative:true,text:s=>[
      `黛拉在宫里住近一年，终于从旧档里拼出那些老宫人为什么看她时总多停半眼。`,
      `她借阅的是公开内廷记，不是私案。最后只有六个字：“昭妃谋逆，伏诛。”`,
      `她把那一页翻回去，又翻回来。前面写册封、失子、救驾、行刺，每一行都比宫人口中的故事短。`,
      `含章来还另一卷书，见她坐在那里，没有问她读到什么。`,
      `黛拉合上册子，对着封皮很轻地说：“你输在太想要。我偏不想要。”`,
      `含章听见，只道：“你不必赢她。”`,
      `黛拉抬头。`,
      `“也不必输。”含章把自己的书放回架上，“活你自己的。”`,
      `从那以后，黛拉在人前反而笑得更响了一阵。只有读者知道，那笑里多了一点故意：她像是在和一份已经合上的档案赌气。`
    ],choices:[{label:'继续',effects:{trust:{daila:2,hanzhang:1},flags:{v56DailaReadsOldArchive:true}},result:''}]});
  }

  // ---------- O. 元照坦白后不把秘密告诉和妃，只选择去一个不用解释的地方。 ----------
  const vacancy=CH('中宫空悬');
  if(vacancy){
    const reveal=ST(vacancy,'臣妾不是从哪个州府来的');
    append(reveal,'v56ZhangModernVoice',s=>[
      `说到前世的差事时，她仍会不自觉用一些这里没有的说法：“臣妾以前习惯先把问题拆开。谁、什么时候、在哪里、和谁接触。不是因为人能变成格子，是因为所有人同时说话时，不拆开就什么也听不清。”`,
      `她说完“工作”两个字，自己停了一下，改成“差事”。我没有纠正。那一瞬，她听起来终于不像努力学了十年宫廷话的人。`
    ]);
    if(!vacancy.steps.some(x=>(x.heading||'').includes('最大的秘密说完以后'))){
      const i=IX(vacancy,'臣妾不是从哪个州府来的');
      if(i>=0)vacancy.steps.splice(i+1,0,{heading:'同夜 · 最大的秘密说完以后',cast:['shen','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
        `从养心殿出来以后，张元照没有直接回景阳宫。她在永和宫门外站了一会儿，让宫女只报“张氏求见”。`,
        `沈知微已经睡下又披衣起来。她没问为什么这么晚，只让人添一盏茶。`,
        `张元照坐到对面，半个时辰一句话也没说。她刚把自己最大的秘密交给皇帝，却没有把那个秘密再说第二遍。`,
        `第一盏茶凉透，沈知微倒掉，重新续一盏。`,
        `“娘娘不问？”`,
        `“你若想说，刚才就说了。”`,
        `张元照低头看着新冒起的热气。`,
        `她那一夜直到三更才回景阳宫。宫门值簿只记“张氏访和妃，谈宫务”。没有人改这四个字。`
      ],choices:[{label:'继续',effects:{trust:{shen:4,zhangyuanzhao:4},flags:{v56ShenZhangAfterReveal:true}},result:''}]});
    }
  }

  // ---------- P. 黛拉第三拍：密信、翻译权与主控唯一一次说破。其后不再拿旧人比较她。 ----------
  if(vacancy&&!vacancy.steps.some(x=>(x.heading||'').includes('珂兰密信只有一句话最难译'))){
    const anchor=IX(vacancy,'凤印前最后一道旨');const at=anchor>=0?anchor:Math.max(0,vacancy.steps.length-1);
    const dsteps=[
      {heading:'承熙十四年正月 · 珂兰密信只有一句话最难译',cast:['daila','emperor'],fx:'ink',narrative:true,text:s=>[
        `边市截到一封没有署名的珂兰密信。信里没有兵数，只有一句反复出现的话。礼部译官写：“请迎贵女归帐。”`,
        `黛拉看完笑了一声：“又是‘迎归’。”`,
        `“你怎么译？”`,
        `“字面也是回去。”她指着其中一个词，“可放在王族文书里，更接近‘收回到自己手里’。听起来都像回家，差别是回去以后门从哪边锁。”`,
        `译官脸色发白。黛拉没有趁机说对方翻错，只要求把原词音译附在旁边。`,
        `“陛下若最后决定我该回还是该留，至少别让一个汉字替我先决定。”`,
        `这句话不像后宫争宠，也不像外交请命。它只是一个曾经被当作筹码的人，要求自己的筹码说明书别写错。`
      ],choices:[{label:'原文、旧译、黛拉异译三栏并存',effects:{trust:{daila:3},flags:{v56KelanLetterThreeTranslations:true}},result:'密信入档时没有删掉任何一种译法。朝臣因此吵了三日，也因此没人能假装词义从来只有一个。'}]},
      {heading:'同月 · “你不是她”',cast:['daila','emperor','peiyan'],fx:'candle',narrative:true,text:s=>[
        `议信那日散得晚。黛拉又故意把一句中原官话学得夸张，逗得两个小宫女低头忍笑。`,
        `我批完最后一本折子，抬头：“笑够了？”`,
        `她仍笑：“陛下嫌吵？”`,
        `我看着她。殿里慢慢静下来。`,
        `“你不是她。”`,
        `黛拉脸上的笑第一次没来得及换下一层。`,
        `“不必学她笑。”`,
        `她想问是谁，最后没有问。旧档那六个字她已经见过。`,
        `“……臣妾没有学。”`,
        `“那就只笑你的。”`,
        `我低下头继续批折。没有安慰，也没有再提旧人。`,
        `黛拉站了一会儿，忽然把嘴角收平。她第一次在御前不笑，也没有因此显得少了什么。`
      ],choices:[{label:'让她退下休息',effects:{trust:{daila:4},flags:{v56DailaNotReplacement:true}},result:'裴景和送她到门口。回来时没有再问像不像。'}]},
      {heading:'二月 · 黛拉自己选那扇门',cast:['daila'],fx:'seal',keyDecision:true,text:s=>[
        `珂兰新使到京，请正式议黛拉去留。使臣说国主愿迎侄女归国，也说若大晟仍需她留京，可以续盟三年。两句话都把她放在条件后面。`,
        `我让礼部退到殿外，只问她：“你自己呢？”`,
        `黛拉没有立刻笑。她看了一眼窗外：“这句话在珂兰和中原，倒终于是同一个意思。”`
      ],choices:[
        {label:'准她归珂兰；以王族使节身份送出西门',effects:{trust:{daila:5},flags:{v56DailaFate:'return'}},result:'她不要金银加赏，只要礼部把“自请归国”四字写在关牒最前。出宫那日，她笑得很响，走到门外却一次也没有回头。'},
        {label:'依她本人意愿，继续留京；保留黛贵人名位但不入侍寝册',effects:{trust:{daila:4},flags:{v56DailaFate:'stay'}},result:'她选择留下。不是为了争宠，也没有把留下说成爱情。承露馆照旧开门，她第一次要求把珂兰海图挂在自己房里。'},
        {label:'密信案尚有未清处，暂留承露馆；待互市复核后再问本人',effects:{trust:{daila:-1},flags:{v56DailaFate:'hold'}},result:'她听完只说：“好。可下次问的时候，还得问我。”这一次她没有笑。'}
      ]}
    ];
    vacancy.steps.splice(at,0,...dsteps);
  }

  // ---------- Q. 和妃 × 元照的收束兼容两种继后分支：凤印之外，仍有一盏新茶。 ----------
  if(vacancy&&!vacancy.steps.some(x=>(x.heading||'').includes('新茶没换手法'))){
    const cor=ST(vacancy,'册后礼成')||ST(vacancy,'凤印落在谁手里以后');
    const i=cor?vacancy.steps.indexOf(cor):vacancy.steps.length-1;
    vacancy.steps.splice(Math.min(vacancy.steps.length,i+1),0,{heading:'册后礼成后的一个夜晚 · 新茶没换手法',cast:['shen','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>{
      const z=s.flags?.v44NewEmpress==='zhangyuanzhao';
      return z?[
        `礼成后的第五夜，凤仪宫终于没有礼官。沈知微来送一份永和宫月例，按规矩本该递给尚宫便走。`,
        `张元照却让人留了茶。两个人仍互称封号，连宫女在外间听都挑不出半分不合礼数。`,
        `张元照喝了一口：“还是那个味道。”`,
        `沈知微道：“嗯。换了新茶，没换手法。”`,
        `凤印就放在隔壁案上。谁也没有去看。`
      ]:[
        `邵明贞受凤印以后，张元照从凤仪宫出来得很晚。景阳宫已经熄了半边灯，她却在岔路口转向永和宫。`,
        `沈知微像早知道她会来，只让人添了一只杯子。`,
        `张元照喝了一口：“还是那个味道。”`,
        `“嗯。”沈知微把壶盖合上，“换了新茶，没换手法。”`,
        `她没有得到凤印。可那一夜有人知道她会从哪扇门回来，也没有问她输了没有。`
      ];
    },choices:[{label:'让这盏茶凉得慢一点',effects:{trust:{shen:2,zhangyuanzhao:2},flags:{v56ShenZhangEndTea:true}},result:''}]});
  }

  // ---------- R. 宫外间隙四：珂兰文书只写她的政治身份，读者知道那并不等于她全部的人生。 ----------
  if(!CH('间隙 · 极西那一栏')){
    const vaci=CHAPTERS.findIndex(x=>x.title==='中宫空悬');const at=vaci>=0?vaci+1:CHAPTERS.length;
    CHAPTERS.splice(at,0,{date:'承熙十四年·春',title:'间隙 · 极西那一栏',theme:'珂兰互市文书',place:'极西互市 / 珂兰海岸',cast:['daila'],fx:'wind',
      bridge:s=>`凤印落定前后，极西互市也重新开账。大晟宫里的人会把黛拉的去留写进内廷记，珂兰那边则只需要一行足够办关牒的字。`,steps:[
        {heading:'通译 · 文书里的人只有一行',cast:['daila'],fx:'ink',narrative:true,text:s=>{
          if(s.flags?.v56DailaFate==='return')return [
            `互市通译在关牒上写：“王族女黛拉自大晟归，礼送出境。”写完便去核下一车盐。`,
            `她本人回到珂兰后没有先去王庭。车队走到海边，她叫人停了一刻钟。`,
            `海比她在宫里说过的更蓝，风大得几乎睁不开眼。她站在岸边很久，才说：“原来我记得的，都是真的。”`,
            `回到王庭以后，她仍是国主的侄女、使臣的女儿、两国谈判里最好用的一行身份。只是这一次，她至少是自己走回去的。`
          ];
          if(s.flags?.v56DailaFate==='hold')return [
            `珂兰新贡单最后多了一行：“王族女黛拉，暂留大晟。”通译写“暂”字时停了两回，因为没人知道这个字要写到哪一年。`,
            `互市照常开，蓝石和马匹照常过关。只有每一封家书末尾都会多问一句：她什么时候回来？`
          ];
          return [
            `珂兰贡单最后多了一栏：“黛贵人安。”四个字每季照抄一次，像只要这一栏还在，两国之间就没有人质。`,
            `承露馆收到贡单副本时，黛拉看完笑：“他们终于学会不替我写想不想回去了。”`,
            `她把纸压在珂兰海图下面。宫外的海没有因为她留下而消失。`
          ];
        },choices:[{label:'合上这份互市文书',effects:{flags:{v56KelanOutsideEcho:true}},result:''}]}
      ]});
  }

  // ---------- T. 元照的现代感继续落在普通对话，而不是人物说明。 ----------
  const three=vacant?ST(vacant,'同一个病愈宫女'):null;
  append(three,'v56ZhangModernEveryday',s=>[
    `人散以后，张元照把刚才三种处理写在同一页边上：“臣妾以前做事有个毛病，碰到乱局先想把所有人分组。”`,
    `沈知微问：“现在改了？”`,
    `“没有。”她很坦白，“只是现在知道，分完组也得记得格子里是人。”`,
    `含章道：“这句总算像人话。”`,
    `张元照笑了一下：“臣妾以前同事也这么说。”`,
    `另外两个人都没听懂“同事”。她低头把那两个字划掉，改成“同差”。`
  ]);

  // ---------- U. 人物录晚期分化：不写关系剧透，只把独有盲区与语言保留下来。 ----------
  function v56ProfileSync(){
    const y=typeof yearNow==='function'?yearNow():1;
    if(PEOPLE.zhangyuanzhao&&y>=11){
      PEOPLE.zhangyuanzhao.tags=state.flags?.zhangRevealed?['来自后世','拆问题','把经验做成制度']:['说话直','先拆问题','拒绝恩情换服从'];
      PEOPLE.zhangyuanzhao.bio=state.flags?.zhangRevealed
        ?'她来自遥远后世，前世二十六岁时做疫病调查。她说话常有一种不合时代的直线感：先把问题拆开、再问哪一环会失败；偶尔会脱口而出“工作、备份、同事”再自己改口。她最在意的不是谁这一次做了好人，而是换了人以后事情还能不能照样做下去。'
        :'从顺王府走进承熙三年大选的张元照，很少把恩宠当目标。她遇事总先拆成“谁、什么时候、经过哪一步”，说话有时直得不像宫里长大的人；受恩与服从在她这里始终是两件事。';
    }
    if(PEOPLE.shen&&y>=9){PEOPLE.shen.tags=['记得','会放下','先看人'];}
    if(PEOPLE.hanzhang&&y>=8){PEOPLE.hanzhang.tags=['边界','本人选择','不以爱情定义亲近'];}
    if(PEOPLE.ning&&y>=11){PEOPLE.ning.tags=['信秩序','敢判断','会为判断负责'];PEOPLE.ning.bio='邵明贞不是因为怕担责才守规矩，她是真的相信名分与秩序能保护人；因此她敢在没有旧例时先判断，也可能在“名分完全正确”时伤到具体的人。她真正的成长，是承认秩序需要人负责，而负责也包括承认自己会错。';}
    if(PEOPLE.ke&&y>=11){PEOPLE.ke.tags=['北营旧勋','近卫逻辑','拒做军门代言'];}
  }

  // ---------- V. 黛拉人物志：v55 的人物志闭包不知道新人物经典台词，这里只替换她自己的卡片，不动其他人。 ----------
  const endingV56=ending;
  ending=function(){
    let h=endingV56();
    if(h.includes('黛拉')){
      const fate=state.flags?.v56DailaFate==='return'?'黛拉最终自请归珂兰。她没有带走宫中能证明得宠的东西，只带走自己的关牒。'
        :state.flags?.v56DailaFate==='hold'?'黛拉仍暂留承露馆。她没有把“暂留”解释成归属，也不再用笑声替别人把尴尬圆过去。'
        :'黛拉继续留在京中。她的名位仍是政治安排的一部分，但她没有因此进入侍寝与争宠的轨道。';
      h=h.replace(/(<article class="v55-chronicle-card"><h3>[^<]*·\s*黛拉<\/h3><p class="fate">)[\s\S]*?(<\/p><blockquote>)[\s\S]*?(<\/blockquote><\/article>)/,
        `$1${fate}$2“那就只笑我的。”$3`);
    }
    return h;
  };

  // ---------- W. 大事录只写“落定”，宫外间隙不硬塞史官总结。 ----------
  if(typeof historyRecordV38==='function'){
    const histV56=historyRecordV38;historyRecordV38=function(e,i){
      if(e?.title==='极西来客')return '承熙十二年，珂兰使至京，王族女黛拉依盟议留居，礼部定其仪秩。';
      if(e?.title==='间隙 · 柱中旧纸'||e?.title==='间隙 · 城南药价'||e?.title==='间隙 · 西华门外'||e?.title==='间隙 · 极西那一栏')return '';
      return histV56(e,i);
    };
  }

  // 晚期人物首次登场索引按章节重算，避免新增间隙章让人物卡提前解锁。
  const dailaIntro=CHAPTERS.findIndex(x=>x.title==='极西来客');if(dailaIntro>=0&&PEOPLE.daila)PEOPLE.daila.introducedAt=dailaIntro;
  const zhangIntro=CHAPTERS.findIndex(x=>x.title==='王府旧笼');if(zhangIntro>=0&&PEOPLE.zhangyuanzhao)PEOPLE.zhangyuanzhao.introducedAt=zhangIntro;

  // ---------- X. 当前存档位置保持在原章节；新章只在自然推进时进入。 ----------
  if(V56_CURRENT_TITLE){const ni=CHAPTERS.findIndex(x=>x.title===V56_CURRENT_TITLE);if(ni>=0)state.index=ni;}
  state.flags=state.flags||{};state.flags.v56Build=true;
  const renderV56=render;
  render=function(){v56ProfileSync();return renderV56();};
  v56ProfileSync();

  // 内部 QA 标记，不显示到正文。
  globalThis.V56_QA={
    chapterTitles:CHAPTERS.map(x=>x.title),
    duplicateTitles:CHAPTERS.map(x=>x.title).filter((x,i,a)=>a.indexOf(x)!==i),
    hasDaila:!!PEOPLE.daila,
    dailaInHarem:HAREM_KEYS.includes('daila'),
    shenZhangTouchCount:CHAPTERS.flatMap(x=>x.steps||[]).filter(x=>(x.heading||'').includes('一场没人真正侍寝的侍寝')).length,
    outsideChapters:CHAPTERS.filter(x=>x.title.startsWith('间隙 · ')).map(x=>x.title)
  };
  if(globalThis.V56_QA.duplicateTitles.length)console.warn('v56 duplicate chapter titles',globalThis.V56_QA.duplicateTitles);
  if(globalThis.V56_QA.dailaInHarem)console.warn('v56 daila unexpectedly entered generic harem pool');

  try{save()}catch(_e){}
  try{render()}catch(_e){}
}catch(e){console.error('v56 relationship/outside-world/personality patch failed',e)}})();
