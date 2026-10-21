(()=>{try{
  document.documentElement.dataset.build='v47';
  state.flags=state.flags||{};

  // ---------- 人物年龄与核心设定 ----------
  if(PEOPLE.emperor){PEOPLE.emperor.age='承熙元年30岁';PEOPLE.emperor.tags=['天子','旧伤未愈','晚年渐纵'];}
  if(PEOPLE.gu){
    PEOPLE.gu.age='承熙元年29岁';
    PEOPLE.gu.tags=['守规','怕担责','护短'];
    PEOPLE.gu.bio='顾明宜做事极细，却极怕自己成为第一个下判断的人。能找到旧例时，她会一页页翻到最稳妥；找不到时，常先问太后、问皇帝，或把熟悉的人护在自己身后。她尤其护顾氏旧人和三皇子，旁人犯错她讲规矩，自己人犯错她总先想“能不能关起门来处置”。这种偏心并不张扬，却贯穿她做皇后的很多年。';
  }
  if(PEOPLE.shen)PEOPLE.shen.age='承熙元年28岁';
  if(PEOPLE.zhou)PEOPLE.zhou.age='承熙元年27岁';
  if(PEOPLE.wenheng)PEOPLE.wenheng.age='承熙二年37岁';
  if(PEOPLE.shunwang){PEOPLE.shunwang.age='承熙元年27岁';PEOPLE.shunwang.tags=['宗室亲王','旧案知情人','占有欲极强'];}
  if(PEOPLE.zhangyuanzhao){PEOPLE.zhangyuanzhao.age='承熙十一年18岁';PEOPLE.zhangyuanzhao.home='入宫后居景阳宫东配殿';}
  try{delete FUTURE_ARC.zhaoguiren}catch(_e){}

  const everyStep=()=>CHAPTERS.flatMap(ch=>ch.steps||[]);
  const findStep=(q)=>everyStep().find(st=>(st.heading||'').includes(q));
  const appendText=(st,tag,fn)=>{
    if(!st||st[tag])return;
    const old=st.text;
    st.text=s=>{const a=typeof old==='function'?old(s):old;return [...(Array.isArray(a)?a:[a]),...fn(s)];};
    st[tag]=true;
  };

  // ---------- 顾明宜：守规、护熟人，前后行为保持一致 ----------
  const second=CHAPTERS.find(ch=>ch.title==='空宫点灯');
  if(second?.steps){
    const bow=second.steps.find(st=>(st.heading||'').includes('殿里的人也在被看'));
    appendText(bow,'v47GuProtectNing',s=>[
      `许淑惠退下以后，礼仪女官照例要把“越礼”记在终选附册上。皇后伸手把那页压住。`,
      `“记教引失察。”她说，“邵氏没有受她的礼，不要把这件事写到邵氏名下。”`,
      `女官应了。邵明贞看了皇后一眼，没有道谢。皇后却低头把那页纸折得格外齐，像只要纸上不留下那一句，宫外那些关于“下一任中宫”的猜测便也能少一点。`
    ]);

    if(!second.steps.some(st=>(st.heading||'').includes('孩子还小'))){
      second.steps.push({
        heading:'第十六幕 · “孩子还小”',cast:['gu','taihou'],fx:'rain',keyDecision:true,text:s=>[
          `终选刚结束，东所又送来一件不大不小的事。三皇子杨顺谦与伴读校射，伴读指出他把一箭记重了。顺谦当场冷了脸，让人站在廊下等他重新射完两轮。那日下着细雨，伴读回去便发了热。`,
          `事情原本要送宗人府记一笔。皇后先把人叫进凤仪宫，给了药和银子，又把那名伴读调去别处。宗人府来问时，她只说是孩子们争强，不必闹到外头。`,
          `我知道这事，是因为谢绍庭在御前值房提了一句：“那孩子父亲昨日来接人，脸色不太好。”`,
          `皇后晚上来解释，坐下以后先理了理袖口：“顺谦不是有意伤人。他才十六，脾气急些。臣妾已经赔过礼，也换了伴读。”`,
          `我问：“宗人府为什么没有记录？”`,
          `她停了一下：“记上去，外头会拿这件事说他品性。孩子还小。”`
        ],choices:[
          {label:'让三皇子亲自去给伴读赔礼，并恢复原伴读',hint:'把错误真正落回他自己身上',effects:{trust:{gu:-1},flags:{v47PrinceDiscipline:'strict'}},result:'三皇子在东所站了很久才肯去。皇后没有再拦，只让人把赔礼的东西备得比旧例多一倍。'},
          {label:'交皇后处置，不再追问宗人府',hint:'你默认中宫把这件事关在门里',effects:{trust:{gu:3},flags:{v47PrinceDiscipline:'shielded'}},result:'皇后明显松了一口气。第二日那名伴读便离了东所。三皇子再没有见到他，也没有真正向他道歉。'},
          {label:'只训斥三皇子几句，不追究伴读去留',hint:'事情很快过去，三皇子也会记住什么样的错只值几句话',effects:{flags:{v47PrinceDiscipline:'lenient'}},result:'三皇子低头听训，答得极快。出门时他已经在问明日还能不能去射圃。'}
        ]
      });
    }
  }

  // 时疫里的护短：她先找旧例，也先护自己的儿子。
  const winter=CHAPTERS.find(ch=>ch.title==='凤仪宫最后一冬');
  if(winter?.steps){
    const firstDoor=winter.steps.find(st=>(st.heading||'').includes('第一扇关上的门'));
    if(firstDoor){
      const old=firstDoor.text;
      firstDoor.text=s=>[
        `八月十八，储秀宫西院一个宫女发热。第二日同屋又倒下两个。第三日，尚衣局一个来取尺寸的女官也烧起来。`,
        `太医院仍写“秋燥时气”。皇后没有立刻下新章程，先让人把先帝朝痘疹、伤寒与宫中闭院的三份旧例全搬来。她一页页比，最后挑了最接近的一条，在旁边写“姑照此例”，又叫尚宫送到养心殿请我朱批。`,
        `西院这才封门。她自己没有去，只让尚宫把住在那里的人名、送饭和换洗名单送来。`,
        `${courtTitle(s,'zhangyuanzhao')}看到名册以后问的第一句不是“用了什么药”，而是：“这三个人昨天分别去了哪里？”`,
        `掌事嬷嬷说她问得怪。她便自己拿一张废纸，把三个人名字横着写开。一个下面写尚衣局，一个写井房，一个写膳房。`,
        `皇后看见那张纸，先问：“先帝朝有这样查过么？”张元照摇头。皇后便没有立刻准，只把纸留下。`,
        `第四日，井房又多了一个病人。她才让人重新把张元照叫回来。`
      ];
    }

    const policy=winter.steps.find(st=>(st.heading||'').includes('张元照要的不是药方'));
    appendText(policy,'v47GuHesitates',s=>[
      `皇后没有立即表态。她先问太医院有没有反对的旧案，又问邵明贞“若关三处院子，月例和饭食谁补”。最后才把三张纸推到我面前：“臣妾不敢拿六宫试一个没有旧例的法子。陛下定。”`
    ]);

    const cohortIndex=winter.steps.findIndex(st=>(st.heading||'').includes('皇嗣院第一次不按母妃分房'));
    if(cohortIndex>=0&&!winter.steps.some(st=>(st.heading||'').includes('三皇子的太医'))){
      winter.steps.splice(cohortIndex,0,{
        heading:'第五幕半 · 三皇子的太医',cast:['gu','ning','zhangyuanzhao'],fx:'candle',keyDecision:true,text:s=>[
          `病院越来越多，太医院开始缺人。尚宫拿来一张调班单，请把东所给三皇子值守的两名医官抽走一名。`,
          `皇后看完便把那一行划掉。`,
          `“顺谦小时候有过喘症。”`,
          `邵明贞道：“他今年十六，已经三年没有发过。”`,
          `皇后没有抬头：“三年没有，不等于以后没有。”`,
          `张元照站在旁边，没有插话，只把病院医官连续值夜的时辰放到桌上。最久的一个已经两夜没合眼。`,
          `皇后把那张纸推远一点：“他是皇子。”`,
          `这一句说完，她自己也安静了。`
        ],choices:[
          {label:'东所留一医官，另一人调去病院',hint:'给三皇子留保障，也让太医院喘一口气',effects:{trust:{ning:2,zhangyuanzhao:2,gu:-1},flags:{v47PrincePhysician:'split'}},result:'皇后没有反驳，只亲自把留下那名医官的值夜表又看了一遍。'},
          {label:'两名医官都留在三皇子东所',hint:'明确优先保护现存长子',effects:{trust:{gu:4,zhangyuanzhao:-2},flags:{v47PrincePhysician:'kept'}},result:'病院那一夜少了一个医官。皇后把东所门禁又加了一层，直到第二天才肯睡。'},
          {label:'两名都调去病院，东所只留一名医士',hint:'最严厉地打破中宫护短',effects:{trust:{gu:-4,zhangyuanzhao:3},flags:{v47PrincePhysician:'moved'}},result:'皇后脸色一下白了。她没有抗旨，回凤仪宫以后却亲自派人每两个时辰去东所问一次三皇子体温。'}
        ]
      });
    }

    const lastPage=winter.steps.find(st=>(st.heading||'').includes('凤仪宫最后一页'));
    appendText(lastPage,'v47GuLastShield',s=>[
      `她昏睡前忽然又问：“顺谦那回伴读的事……宗人府后来记了没有？”`,
      `我没有立刻答。`,
      `她指尖在被面上动了一下：“他脾气坏些，不是坏孩子。以后若再犯，陛下关起门来罚。别让外头先给他定了性。”`,
      `到最后，她仍在替自己的儿子留一扇可以关上的门。`
    ]);
  }

  // ---------- 张元照在入宫前：顺王府九年的“恩”与牢笼 ----------
  const secondIdx=CHAPTERS.findIndex(ch=>ch.title==='空宫点灯');
  if(secondIdx>=0&&!CHAPTERS.some(ch=>ch.title==='王府旧笼')){
    CHAPTERS.splice(secondIdx,0,{
      date:'承熙十年·冬至十一年春',title:'王府旧笼',theme:'有人把救命之恩做成门闩，也有人宁肯走进更大的宫墙',place:'养心殿 / 顺王府',cast:['shunwang','zhangyuanzhao','shen'],fx:'snow',
      bridge:s=>`礼部准备第二次采选前，养心殿收到顺王一封很短的手书。信里没有替任何姑娘求位分，只求删去一个名字：张元照。`,steps:[
        {heading:'第一幕 · 顺王为什么替一个秀女求退',cast:['shunwang'],fx:'ink',narrative:true,text:s=>[
          `顺王的信只有四行：“张氏幼年寄居王府，出入内宅多年，身份不宜再入采选。请从名册除去。”`,
          `礼部附来的家谱却很干净。张元照，十八岁，父亲张廷谟曾在顺王府做过几年记室，九年前病故。母亲早亡，族中把孤女暂托王府照看。她仍在张氏族谱，也没有婚约。`,
          `我把两张纸并在一起看了许久。顺王替沈氏旧案说话时从没有这样简短。越简短，越像不愿别人多问。`,
          `我让礼部暂时不要划名，又命宗人府只查一件事：张氏自己的意思。`
        ],choices:[{label:'继续',effects:{flags:{v47WangLetterSeen:true}},result:''}]},
        {heading:'第二幕 · 她说“臣女愿意入宫”',cast:['zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
          `张元照没有在体元殿第一次见我。终选前，她先被单独带到养心殿外间。不是召幸，也不是审问，只是因为顺王的信。`,
          `她进门以后行礼很稳。我把顺王手书推到桌边：“王爷说你不宜入选。”`,
          `她只看一眼：“臣女愿意入选。”`,
          `“你在王府住了九年。”`,
          `“是。”`,
          `“为什么要走？”`,
          `她沉默很久，最后说：“因为王府不肯让臣女走。”`,
          `这句话说得太平。我反而没有马上接。`
        ],choices:[{label:'让她把话说完',effects:{trust:{zhangyuanzhao:2},flags:{v47ZhangAskedToSpeak:true}},result:''}]},
        {heading:'第三幕 · 宠信先是书房里的一把钥匙',cast:['zhangyuanzhao','shunwang'],fx:'candle',narrative:true,text:s=>[
          `她九岁进王府。最初几年，顺王待她确实不坏。张廷谟生前替王府理过旧档，顺王便让女儿继续住在东偏院，还给她一间小书房。`,
          `张元照记日子很准。十四岁那年，她替府里重抄军中旧札，一眼看出同一场雪灾在两份文书上差了三天。顺王从那以后常把旧信、账册和军报丢给她看。`,
          `他会在旁人面前说：“她不懂官场，胜在眼睛干净。”也会让管事绕过别人，直接把要紧的匣子送到她屋里。`,
          `王府里很多人羡慕这份信任。张元照起初也以为，这是她能在这个陌生地方站稳的办法。`,
          `后来有人替她议亲，顺王压下了第一家，说门第不好；第二家他说人品不好；第三家连帖子都没有让她看见。`,
          `她十六岁第一次正式提出回张氏族宅。顺王问：“本王养你这些年，你回去做什么？”`,
          `她答：“过自己的日子。”`,
          `顺王很久没有说话。第二天，东偏院的门多了两个内侍。`
        ],choices:[{label:'继续',effects:{flags:{v47WangFavorTurnsControl:true}},result:''}]},
        {heading:'第四幕 · 她不肯谢恩',cast:['zhangyuanzhao','shunwang'],fx:'rain',narrative:true,text:s=>[
          `真正闹翻是在承熙十年春。顺王送她一套新衣和一支金簪，让她在府宴上坐到自己身后。张元照把东西原样退了。`,
          `她说：“王爷待臣女有恩，臣女记得。恩不是婚书，也不是卖身契。”`,
          `顺王第一次当着下人的面沉了脸。`,
          `她当天收拾箱笼，想拿张氏族叔替她办好的路引离府。内侍在二门把人拦住。顺王没有打她，只命人把箱笼一件件搬到外廊，当着她的面搜。那张路引从夹层里翻出来，被内侍递到顺王手上。`,
          `顺王把纸折成四折，放进火盆。`,
          `张元照仍不跪谢那套新衣。`,
          `他便让内侍把她自己的出门衣收走，照王府女眷礼替她重新梳头换装，逼她在外廊跪着听完一整套“受恩知礼”的训诫。来往下人都看见了。`,
          `她从头到尾没有说“知错”。第二日又开始要路引。第三日也是。`,
          `顺王后来仍旧让她进书房看档，仍旧信她记事，也仍旧不准她离府。宠信与禁足从此成了同一件事。`
        ],choices:[{label:'继续',effects:{trust:{shunwang:-2,zhangyuanzhao:3},flags:{v47ZhangHumiliatedInWangfu:true}},result:''}]},
        {heading:'第五幕 · 采选诏书成了她唯一能看见的门',cast:['zhangyuanzhao'],fx:'ink',narrative:true,text:s=>[
          `第二次采选的诏书下来时，顺王府本来准备直接替她报“久居王府，不便参选”。`,
          `张元照却让张氏族叔把名字重新递进礼部。她知道宫里不是自由地方。她甚至比大多数秀女更清楚，进去以后每一道门都有人管。`,
          `“可宫里的位分写在册上，召见有记录，赏罚有名目。”她对我说，“王府的门开不开，只看王爷那天高不高兴。”`,
          `我问：“若进了宫，朕也不让你走呢？”`,
          `她抬头看我。这是她进门以后第一次直视御座。`,
          `“那臣女只是从一个笼子走进另一个笼子。”`,
          `她说完便重新低下头：“可臣女还是想自己选这一回。”`
        ],keyDecision:true,choices:[
          {label:'驳顺王所请：张氏名帖照常进入终选',hint:'不替她决定是否入宫，也不替顺王拘住她',effects:{trust:{zhangyuanzhao:4,shunwang:-2},flags:{v47ZhangSelectionRight:'direct'}},result:'礼部收到朱批时只有六个字：“本人既愿，照例。”'},
          {label:'先令宗人府确认王府不得扣她路引，再准终选',hint:'先切断顺王府对她人身去留的控制',effects:{trust:{zhangyuanzhao:5},flags:{v47ZhangSelectionRight:'legal'}},result:'宗人府去王府核了张氏族籍和路引。顺王没有再拦，但那一夜王府书房的灯亮到天明。'},
          {label:'只谕礼部：采选取本人意愿，不收王府代奏',hint:'把原则写进这一次流程',effects:{trust:{zhangyuanzhao:3},flags:{v47ZhangSelectionRight:'rule'}},result:'礼部把顺王手书退回。终选名册上，张元照三个字没有被划掉。'}
        ]}
      ]
    });
  }

  // 第二次选秀中的张元照：她不是普通秀女，皇后反而本能地想避麻烦。
  const secondNow=CHAPTERS.find(ch=>ch.title==='空宫点灯');
  if(secondNow?.steps){
    const zstep=secondNow.steps.find(st=>(st.heading||'').includes('最后一张名帖'));
    if(zstep){
      zstep.text=s=>[
        `最后一张名帖是张元照。她的家世并不显赫，名字旁却多压着一份顺王府退回的旧手书。`,
        `皇后先皱了眉：“久居亲王内宅，再入宫，外头会说得难听。”`,
        `她没有问张元照本人，只先问我：“是不是干脆照顺王原请，把名字撤了，最省事？”`,
        `邵明贞翻到名帖背面：“礼部已经核过，她本人坚持参选。”`,
        `皇后抿住唇。她最怕这种旧例也说不清、每个选择都可能留下话柄的人。`,
        `张元照入殿以后没有替自己诉苦。我只问：“若留牌，你想从宫里得到什么？”`,
        `她答：“先有一扇不是别人想关就关的门。”`,
        `皇后抬眼。太后也看了她一眼。`,
        `片刻后，她又补一句：“臣女会守宫规。只是宫规写什么，臣女想先看清。”`
      ];
    }
    if(!secondNow.steps.some(st=>(st.heading||'').includes('第一夜没有传召'))){
      const zi=secondNow.steps.findIndex(st=>(st.heading||'').includes('最后一张名帖'));
      const insertAt=zi>=0?zi+1:secondNow.steps.length;
      secondNow.steps.splice(insertAt,0,{
        heading:'第十二幕半 · 第一夜没有传召',cast:['zhangyuanzhao','shunwang'],fx:'candle',narrative:true,text:s=>[
          `张元照正式入宫的第三日，顺王府送来一只沉香木箱。衣料、旧书、金簪都齐，最上面只有一张纸：“你用惯的东西。”`,
          `她一件没有拆，直接把箱子送到御前，请求退回。`,
          `裴景和问：“娘娘不留一本书？”`,
          `她摇头：“留下东西，就会有人说臣妾还欠王府一个情分。”`,
          `那晚我原本翻过她的绿头牌，最后没有传。只在偏殿见了她一刻钟。`,
          `我说：“箱子按你的意思退。顺王以后再送私物，也先问你收不收。”`,
          `她明显没有料到这句话，半晌才谢恩。`,
          `我又道：“今晚回去。朕召你，是问事，不是叫你拿别的来还。”`,
          `她走到门口又回头：“陛下以后也会一直这样么？”`,
          `“哪样？”`,
          `“先问。”`,
          `我没有许一个永远，只说：“至少今夜会。”`
        ],choices:[{label:'让顺王府的箱子原封退回',effects:{trust:{zhangyuanzhao:5},flags:{v47WangGiftReturned:true,v47EmperorTreatsZhangWithCourtesy:true}},result:'木箱当天出宫。顺王府没有再回一句话。'}]
      });
    }
  }

  // 顺王人物卡在关系公开后更新。
  const v47RenderPersonOld=render;
  render=function(){
    if(PEOPLE.shunwang&&state.flags?.v47WangLetterSeen){
      PEOPLE.shunwang.bio='先帝诸子之一。年轻时善琴，也长期与沈氏旧军案牵连。张廷谟死后，他把九岁的张元照留在王府，最初给书、给书房、给旁人得不到的信任；后来这份宠信逐渐变成不许议亲、不许离府、扣路引和强迫受恩。他最不能忍受的并不是张元照恨他，而是她始终不肯承认自己属于王府。';
    }
    if(PEOPLE.zhangyuanzhao){
      if(state.flags?.zhangRevealed){
        PEOPLE.zhangyuanzhao.tags=['穿越者','曾困顺王府','不受恩控制'];
        PEOPLE.zhangyuanzhao.bio='九岁时，她在大晟张元照的身体里醒来，随后寄居顺王府九年。顺王给过她书房、旧档和极重的宠信，也以同一份“恩”阻断她的婚事与离府。承熙三年大选是她主动抓住的出口。她最厌恶别人用“我对你好”索取服从，因此即使入宫，也从不把承宠、赏赐和忠诚混成一件事。';
      }else if(state.flags?.v47WangLetterSeen){
        PEOPLE.zhangyuanzhao.tags=['顺王府旧居','记事极细','执意自择'];
        PEOPLE.zhangyuanzhao.bio='父亲死后寄居顺王府九年。顺王曾极信她整理旧档，却不肯放她回族宅。第二次采选时，她违逆顺王意思，坚持把自己的名字留在终选册上。她很少主动求恩，只对“谁能替谁决定去留”格外敏感。';
      }
    }
    return v47RenderPersonOld();
  };

  // 坦白穿越时，把“醒来后先在顺王府”的全部前史接回来。
  const vacancy=CHAPTERS.find(ch=>ch.title==='中宫空悬');
  if(vacancy){
    vacancy.date='承熙十三年·秋';
    const reveal=vacancy.steps?.find(st=>(st.heading||'').includes('臣妾不是从哪个州府来的'));
    if(reveal){
      reveal.text=s=>[
        `门合上以后，张元照先问：“陛下若觉得臣妾疯了，会怎么处置？”`,
        `“先听你说。”`,
        `她坐得很直，双手却一直捏着袖口。`,
        `“臣妾九岁那年在顺王府醒来。醒以前那个人也叫张元照，有父亲、有族谱。可臣妾记得的另一个地方，没有大晟，也没有顺王。”`,
        `她前世活到二十六岁，做的工作不是治病，而是在疫病发生以后追人、追时间、追住处：第一个人什么时候病，后来见过谁，哪一班人换过岗。`,
        `“臣妾刚醒那几年，以为只要安静学这里的规矩就能活。顺王给臣妾书看，让臣妾碰他的旧档。臣妾一度很感激他。”`,
        `她说到这里停了一下。`,
        `“后来臣妾才明白，一个人可以一面说最信你，一面把你的路引烧掉。”`,
        `她没有再讲东偏院那场羞辱。我已经从宗人府记录里看过。`,
        `“所以臣妾进宫，最初不是因为喜欢陛下，也不是因为想当皇后。”`,
        `“是为了离开顺王？”`,
        `“是。”她答得很快，“也因为臣妾没有更好的门。”`,
        `她抬头：“后来留下，是另一回事。”`,
        `我问：“哪一回事？”`,
        `“陛下第一次把王府箱子退回去的时候，没有问臣妾为什么不知恩。”`,
        `殿里很静。`,
        `“臣妾从那时才开始相信，权力大的人也可能先问一句。”`
      ];
    }
  }

  // ---------- 皇帝晚年：张元照成为第一个敢把传召退回来的人 ----------
  const longNight=CHAPTERS.find(ch=>ch.title==='长夜未央');
  if(longNight?.steps&&!longNight.steps.some(st=>(st.heading||'').includes('把传召退回来'))){
    const pos=Math.min(3,longNight.steps.length);
    longNight.steps.splice(pos,0,{
      heading:'第三幕半 · 第一次有人把传召退回来',cast:['zhangyuanzhao'],fx:'lantern',keyDecision:true,text:s=>[
        `顾明宜死后的第一个春天，西暖阁重新有了琵琶。那晚我喝到第三壶，忽然叫裴景和传张元照。`,
        `她没有来。`,
        `回来的不是人，是一张很短的笺：“若陛下要问疫册，臣妾即来；若只是今夜不愿独处，臣妾不来。”`,
        `裴景和捧着那张纸，连头都不敢抬。宫里从来没有人这样退过御前传召。`,
        `我盯着最后四个字看了很久。顺王当年最恨的，大概也是这一点——她收恩，却不肯把自己也一并交出去。`
      ],choices:[
        {label:'撤回传召，让她今夜不必来',hint:'你仍然承认她可以拒绝私人意义上的召见',effects:{trust:{zhangyuanzhao:5},flags:{v47DrunkSummons:'respected'}},result:'裴景和把笺收好。我又倒了一杯酒，西暖阁那一晚仍旧很吵，只是没有张元照。'},
        {label:'仍叫她来，只在外殿谈宫务',hint:'你不接受被直接拒绝，但仍守住礼数',effects:{trust:{zhangyuanzhao:1},flags:{v47DrunkSummons:'official'}},result:'她来了，坐在离酒案最远的位置，把病籍复值讲完便告退。整个晚上没有碰一杯酒。'},
        {label:'以抗旨为名禁足三日',hint:'你开始像顺王一样把拒绝当成冒犯',effects:{trust:{zhangyuanzhao:-6},flags:{v47DrunkSummons:'punished'}},result:'禁足旨送到景阳宫，她只回了“臣妾领旨”。三日后照常来回宫务，连一句委屈也没有说。她从此再不单独留在西暖阁。'}
      ]
    });
  }

  // ---------- 皇嗣：统一序齿、年龄、死亡与成长 ----------
  function v47Year(s=state){
    const d=CHAPTERS[s?.index||0]?.date||'';
    const m=String(d).match(/承熙([一二三四五六七八九十百\d]+)年/);
    if(!m)return 1;
    if(/^\d+$/.test(m[1]))return Number(m[1]);
    const map={'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,'十一':11,'十二':12,'十三':13,'十四':14,'十五':15};
    return map[m[1]]||1;
  }
  function v47Age(birth,baseAge=0,s=state){
    const y=v47Year(s);const a=baseAge+(y-birth);
    if(a<=0)return '未满周岁';return `约${a}岁`;
  }
  function v47MotherName(k,s=state){
    if(!k)return '—';
    const p=PEOPLE[k];if(!p)return k;
    const r=s.ranks?.[k];
    return `${p.name}${r&&!/^待/.test(r)?`（${courtTitle(s,k)||r}）`:''}`;
  }
  function v47LowMother(s=state){try{return typeof lowPregKey==='function'?lowPregKey(s):null}catch(_e){return null}}
  function v47Dead(k,s=state){return Array.isArray(s.flags?.v46ChildVictims)&&s.flags.v46ChildVictims.includes(k)}
  function v47GenericProfile(mother,s=state){
    const maps={
      gu:['好胜而敏感','记忆与骑射','中宫的保护让孩子很早知道身份能替自己挡下一部分后果'],
      shen:['寡言、记旧事','音律与记忆','永和宫少争宠，孩子更会听大人没有说完的话'],
      zhou:['会看场面、反应快','音律与识人','母亲擅长察言观色，孩子也很早学会先看别人脸色'],
      ke:['爽直、争强','骑射与体能','霍氏军门家风使孩子更习惯输赢清楚、赏罚直接'],
      ning:['稳、爱追问缘由','读书与宫务','邵氏与太后往来频繁，孩子从小见到的不是宠爱多少，而是谁真正把事情办完'],
      hui:['克制、会算得失','算学与物料','长春宫与供应账相连，孩子很早便知道漂亮东西背后也有数字和人情'],
      cao2:['认路快、好奇','空间记忆','生母习惯记路径与出入，孩子也爱追问东西从哪里来'],
      zhao2:['嘴甜、眼快、很会听弦外之音','察言观色与应对','生母习惯先听懂场面再说话，孩子也很早学会分辨真客气和假客气'],
      lin2:['安静、问题多','记药名与阅读','生母能听懂太医院争论，孩子很早习惯问“为什么”'],
      ye2:['耐得住坐','书写与摹写','生母一手稳字，孩子也更能在一件小事上坐很久'],
      du2:['爽快、爱数东西','算术与数量','生母管物料时总先数清，孩子也喜欢把玩具排成行'],
      su2:['亲人、情绪柔软','音律与手工','生母常照料幼儿，孩子对声音与人的情绪尤其敏感']
    };
    return maps[mother]||['性情尚未定型','仍在观察','母妃与所在宫苑会继续影响其长成'];
  }
  function v47ChildRecords(s=state){
    const rows=[];const y=v47Year(s);
    rows.push({key:'shunqian',sex:'M',name:'杨顺谦',order:'三皇子 · 现存长子',birth:-5,base:0,mother:'gu',foster:null});
    rows.push({key:'ruoxi',sex:'F',name:'杨令兮',order:'大公主',birth:-4,base:0,mother:null,motherName:'故宁嫔苏氏',foster:'gu'});
    if(s.flags?.twinGirlBorn)rows.push({key:'twinGirl',sex:'F',name:'杨昭焉',order:'二公主',birth:1,base:0,mother:'zhou'});
    if(s.flags?.twinBoyFate==='keep')rows.push({key:'twinBoy',sex:'M',name:'杨顺安',order:'四皇子',birth:1,base:0,mother:'zhou'});
    if(s.flags?.fifthPrincessBorn){const lm=v47LowMother(s);rows.push({key:'fifthPrincess',sex:'F',name:'杨宁矣',order:'三公主',birth:4,base:0,mother:lm,motherName:lm?null:'生母依御前留牌确定'});}
    if(s.flags?.fourthPrinceBorn)rows.push({key:'fourthPrince',sex:'M',name:'杨顺恭',order:s.flags?.twinBoyFate==='keep'?'五皇子':'四皇子',birth:5,base:0,mother:'ke'});
    if(s.flags?.sixthPrincessBorn)rows.push({key:'sixthPrincess',sex:'F',name:'杨晏尔',order:'四公主',birth:6,base:0,mother:'ning'});
    let nextM=s.flags?.twinBoyFate==='keep'?(s.flags?.fourthPrinceBorn?6:5):(s.flags?.fourthPrinceBorn?5:4);
    let nextF=5;
    const ex=s.flags?.extraHeirs||{};
    const usedNames=new Set(rows.map(r=>r.name));
    const spareM=['杨顺礼','杨顺宁','杨顺嘉','杨顺和','杨顺承','杨顺祐'];
    const spareF=['杨清而','杨嘉则','杨和乃','杨贞亦','杨安以','杨柔于'];
    [1,2].forEach(i=>{const x=ex[i];if(!x||!x.born||x.skipped)return;
      if(!x.name||usedNames.has(x.name)){const pool=x.gender==='M'?spareM:spareF;x.name=pool.find(n=>!usedNames.has(n))||(x.gender==='M'?`杨顺${i+5}`:'杨宛然');}
      usedNames.add(x.name);
      if(x.gender==='M')rows.push({key:`extraHeir${i}`,sex:'M',name:x.name,order:`${nextM++}皇子`,birth:6,base:0,mother:x.mother});else rows.push({key:`extraHeir${i}`,sex:'F',name:x.name,order:`${nextF++}公主`,birth:6,base:0,mother:x.mother});});
    return rows.map(r=>({...r,dead:v47Dead(r.key,s)}));
  }
  globalThis.v52ChildRecords=v47ChildRecords;
  function v47Growth(r,s=state){
    const y=v47Year(s);const age=r.key==='shunqian'?y+5:r.key==='ruoxi'?y+4:Math.max(0,y-r.birth);
    if(r.key==='shunqian'){
      if(y<=5)return ['聪明、争强，犯错后第一反应是看母后','骑射上手快，背书也快','皇后几乎总替他把麻烦关在凤仪宫与东所之间'];
      if(y<=11)return ['自尊极强，越来越习惯别人让路','骑射、记忆、临场反应都好，耐心很差',state.flags?.v47PrinceDiscipline==='strict'?'御前曾逼他亲自赔礼，他因此更会把不满藏住':'中宫多次替他收尾，他很少真正承担失礼的后果'];
      return ['聪明、骄矜，占有欲开始越过身份边界','骑射突出，读折子抓重点很快，却厌烦细节',state.flags?.v47PrinceBoundary==='disciplined'?'成年后第一次被御前真正压住边界':'皇后长期护短，加上父皇晚年放纵，使他越来越把“想要”当成理所当然'];
    }
    if(r.key==='ruoxi')return ['安静、自持，很会先看场面再说话','书写、记人和宫务顺序','生母早亡、由皇后抚养；时疫中她是第一个自己抱包袱进暖阁的孩子，后来更少在人前哭'];
    if(r.key==='twinBoy')return ['敏感、警觉，不喜欢别人盯着自己看','观察细节、拆解器物',`出生异相使他从小知道“被看”本身也会变成压力；周清漪教他先分辨别人是在好奇还是在恶意议论`];
    if(r.key==='twinGirl')return ['活泼、会说话，很早懂得替场面找台阶','音律与模仿','与异相同胞一起出生，母亲周清漪让她学会在人前先护住家里人的体面'];
    if(r.key==='fourthPrince')return ['直、好胜，输了也要再来一次','骑射、体能','霍素英不替他向教习说情；北营送来的玩具多是小弓和木马，他比同龄皇嗣更习惯规则写清楚'];
    if(r.key==='sixthPrincess')return ['稳、爱追问“为什么”','读书、记规矩','常往慈宁宫，既看太后处事，也看邵明贞自己拿主意；她比许多孩子更不怕问大人理由'];
    const [t,tal,inf]=v47GenericProfile(r.mother,s);return [t,tal,inf];
  }
  function v47ChildAgeLabel(r,s=state){
    const y=v47Year(s);if(r.key==='shunqian')return `约${y+5}岁`;if(r.key==='ruoxi')return `约${y+4}岁`;const a=y-r.birth;return a<=0?'未满周岁':`约${a}岁`;
  }
  function v47ChildMother(r,s=state){
    let m=r.mother?v47MotherName(r.mother,s):(r.motherName||'—');
    if(r.foster)m+=` · 抚养：${PEOPLE[r.foster]?.name||r.foster}`;return m;
  }
  childrenView=function(){
    const rows=v47ChildRecords(state),y=v47Year(state);
    const memorial=[];
    if(state.flags?.twinBoyFate==='send')memorial.push('周氏双生男婴未列玉牒，按主控当年裁断送宗室外养。');
    if(state.flags?.twinBoyFate==='kill')memorial.push('周氏双生男婴按主控当年裁断未列玉牒，对外只记“一子不育”；产房别录仍记得第二声哭。');
    if(state.flags?.baopuLostChild)memorial.push('昭氏承熙六年所怀皇嗣未能存活，未序齿，产房别录仍存。');
    const cards=rows.map(r=>{const [temper,talent,influence]=v47Growth(r,state);const status=r.dead?'承熙十一年时疫中薨':'在册';return `<article class="heir-v47-card ${r.dead?'dead':''}"><span class="heir-order">${r.order}</span><span class="heir-age">${v47ChildAgeLabel(r,state)}</span><h2>${r.name}</h2><dl><dt>生母</dt><dd>${v47ChildMother(r,state)}</dd><dt>状态</dt><dd>${status}</dd><dt>性情</dt><dd>${temper}</dd><dt>天资</dt><dd>${talent}</dd><dt>所受影响</dt><dd>${influence}</dd></dl></article>`}).join('');
    return `<main class="page"><div class="page-title"><span class="eyebrow">皇室子女 · 承熙${y}年</span><h1>皇嗣与成长</h1><p>这里记玉牒序齿、生母、抚养与当前年岁。</p></div><div class="heir-v47-head"><b>序齿说明：</b>前两位皇子在承熙元年前已经早夭，因此杨顺谦仍按玉牒称“三皇子”，同时是现存长子；现存皇女则依你的设定从大公主重新顺排。</div><div class="heir-v47-grid">${cards}</div>${memorial.length?`<div class="heir-v47-memorial"><b>别录</b><br>${memorial.join('<br>')}</div>`:''}</main>`;
  };
  try{v46ChildNames=function(s=state){return v47ChildRecords(s).filter(r=>(s.flags?.v46ChildVictims||[]).includes(r.key)).map(r=>r.order)}}catch(_e){}

  // ---------- 皇嗣开始真正长大：顾皇后死后，孩子们的性格进入主线 ----------
  const vacancyNow=CHAPTERS.find(ch=>ch.title==='中宫空悬');
  const vacancyIdx=CHAPTERS.indexOf(vacancyNow);
  if(vacancyIdx>=0&&!CHAPTERS.some(ch=>ch.title==='长枝渐高')){
    CHAPTERS.splice(vacancyIdx,0,{
      date:'承熙十三年·春夏',title:'长枝渐高',theme:'孩子不再只是玉牒上一行名字，他们开始把大人的习惯长成自己的脾气',place:'上书房 / 御花园 / 景阳宫',cast:['ning','zhangyuanzhao','ke','zhou'],fx:'petal',
      bridge:s=>`顾皇后死后的第一个春天，三皇子十八岁，大公主十七。更小的孩子也已经能在家宴上自己说话。有人像母亲，有人偏偏长成了母亲最怕的样子。`,steps:[
        {heading:'第一幕 · 家宴席间，诸子女渐长',cast:['ning','ke','zhou'],fx:'petal',narrative:true,text:s=>{
          const rows=v47ChildRecords(s).filter(r=>!r.dead);const line=[];
          for(const r of rows){
            const order=String(r.order||'').replace(/([0-9]+)(皇子|公主)/g,(_,n,t)=>`${['零','一','二','三','四','五','六','七','八','九','十'][Number(n)]||n}${t}`);
            if(r.key==='shunqian')line.push(`三皇子杨顺谦已经十八，进门时没有等内侍替他解披风，自己把弓扔给身后的人。太傅夸他策论抓得快，他只问父皇什么时候准他真正旁听军议。`);
            else if(r.key==='ruoxi')line.push(`大公主杨令兮十七岁，先替两个年幼妹妹换了离炭盆远一点的位置。别人说话时她很少插口，却能记得哪一个孩子不吃姜、哪一个乳母昨日咳过。`);
            else if(r.key==='twinBoy')line.push(`四皇子杨顺安不爱坐在人多的地方。他把右手多出的那根手指藏在袖内，却会在别人以为他没有注意时，把桌上拆坏的铜锁重新拼回去。`);
            else if(r.key==='twinGirl')line.push(`二公主杨昭焉最会救场。弟妹打翻茶盏，她先笑着说“今年第一场春雨在桌上”，等宫人收完才回头训人。周清漪听见，只在旁边抿了一口茶。`);
            else if(r.key==='fourthPrince')line.push(`${order}杨顺恭一坐下就问什么时候能去射圃。他输了不闹，只要求再来一次；霍素英从来不替他说“孩子小”。`);
            else if(r.key==='sixthPrincess')line.push(`四公主杨晏尔抱着一本启蒙书来，听大人谈到旧例时忽然问：“若旧例不对，为什么还叫旧例？”太后听得笑，邵明贞却让她先把饭吃完。`);
            else {const [t,tal]=v47Growth(r,s);line.push(`${order}${r.name}年纪还小，性子却已经露出一点：${t}。教习最先记下的是${tal}。`);}
          }
          return [`同一桌上的孩子已经长成完全不同的人。`,...line];
        },choices:[{label:'继续',effects:{flags:{v47HeirGrowthShown:true}},result:''}]},
        {heading:'第二幕 · 三皇子已经十八',cast:['ning'],fx:'wind',keyDecision:true,text:s=>[
          `杨顺谦成年礼以后，宗室称贺的帖子堆满东所。他是现存长子，又是顾皇后唯一的亲生皇子。母后死后，很多人反而比从前更让着他。`,
          `他骑射确实好，读军报也快。问题是他越来越不耐烦别人告诉他“不行”。`,
          `有一次上书房讨论河工，他只看了第一页便说“照旧加银就是”。我听见这两个字，忽然想起自己这些年在折子上写过多少次“照旧”。`,
          `太傅私下说：“殿下聪明，正因聪明，更容易觉得细看是给笨人做的事。”`,
          `顾明宜若还在，大概会先问这句话有没有被别人听见。`
        ],choices:[
          {label:'把三皇子交给两名不同路数的师傅，半年不得自行换人',hint:'逼他习惯有人长期反驳',effects:{flags:{v47PrinceEducation:'strict'}},result:'三皇子没有抗旨，只问“半年以后呢”。太傅说半年以后再看你有没有学会把第二页也读完。'},
          {label:'让他开始旁听部分朝议，错了就在朝臣面前自己答',hint:'给权力，也让后果公开',effects:{flags:{v47PrinceEducation:'public'}},result:'第一次旁听他答得极漂亮，第二次被户部问住。那天回东所，他摔了一只笔洗，却没有人替他把那一问从记录里删掉。'},
          {label:'成年了，不必再管得太细；赐马、准多去射圃',hint:'晚年的你更愿意让宫里少一点争执',effects:{flags:{v47PrinceEducation:'indulged'}},result:'三皇子谢恩得很快。一个月后，东所新添了两匹马，也新添了更多会顺着他说话的人。'}
        ]},
        {heading:'第三幕 · 张元照退回一匣书',cast:['zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
          `五月，景阳宫把一只紫檀书匣送回东所。里面是一部少见的前朝疫书和两册西域舆图。`,
          `三皇子说是“借张氏看”。张元照连封纸都没有拆。`,
          `两日后，他在御花园回廊拦住她。不是堵门，只是身后跟着四个内侍，别人自然都绕开。`,
          `“你为什么肯替父皇看那些册子，却连我的书都不肯收？”`,
          `张元照行礼：“殿下若问疫册，尚宫局每月初五公开核档，臣妾可以当众答。”`,
          `“我不是问疫册。”`,
          `她抬起头。`,
          `三皇子看了她一会儿，声音压低：“父皇比你大那么多。你若不是为了宠爱，何必一直留在他身边？”`,
          `张元照脸上一点笑意都没有：“这不是殿下该问的话。”`,
          `他没有退：“以后也许就是我该问。”`,
          `她转身就走。三皇子没有拉她，只在身后说：“顺王留不住你，不代表谁都留不住。”`,
          `张元照脚步停了一下。只一下。`
        ],choices:[{label:'继续',effects:{flags:{v47PrinceImproperInterest:true}},result:''}]},
        {heading:'第四幕 · 她把这件事告诉御前',cast:['zhangyuanzhao','ning'],fx:'ink',keyDecision:true,text:s=>[
          `张元照没有等流言长出来。当天夜里，她请裴景和转呈，只说三皇子越了边界。`,
          `她没有说“他喜欢臣妾”，只把书匣、回廊里的话和在场内侍名字一一写下。`,
          `邵明贞也来了。她看完以后第一句不是怪张元照：“顺谦小时候所有人都在替他把难看的东西收走。”`,
          `她停了一下：“现在收不住了。”`,
          `张元照道：“臣妾不求陛下替臣妾猜他的心。只求以后不要让他以为，身份高就能把一句拒绝当成没听见。”`
        ],choices:[
          {label:'召三皇子，当面责令止步；撤去东所私下传递内廷物件的权限',hint:'把问题明确归到三皇子越界，而不是让张元照避让',effects:{trust:{zhangyuanzhao:5,ning:2},flags:{v47PrinceBoundary:'disciplined'}},result:'三皇子脸色极难看，却只能接旨。第二日书匣全部退回，他的内侍也换了两人。'},
          {label:'压下此事，只命张元照以后少经过东所与御花园西廊',hint:'保护现存长子的名声，把避嫌责任推给张元照',effects:{trust:{zhangyuanzhao:-6},flags:{v47PrinceBoundary:'shielded'}},result:'张元照听完只问：“臣妾若绕路，他就学会了吗？”没人答。她以后确实绕了路。'},
          {label:'不立案，只私下警告三皇子',hint:'你仍想把皇家的难看关在门里',effects:{trust:{zhangyuanzhao:-2},flags:{v47PrinceBoundary:'private'}},result:'三皇子口头答应。事情没有进宗人府，也没有进起居注。顾明宜若还在，大概会最熟悉这种处理。'}
        ]},
        {heading:'第五幕 · 上书房以后不再只按序齿教',cast:['ning','ke'],fx:'ink',keyDecision:true,text:s=>[
          `这一年更小的皇子皇女也开始显出差别。有人坐得住，有人只要见到马便忘了书；有人记人名，有人对数字特别快。`,
          `过去上书房最省事的办法，是按年岁分班，同一套书、同一套骑射。邵明贞拿来一张新的教习单，霍素英在骑射一栏旁边添了几个名字。`,
          `“总不能因为同一个父亲，就当他们是同一种孩子。”霍素英说。`
        ],choices:[
          {label:'仍按年岁统一教养',hint:'最稳妥，也最省人手',effects:{flags:{v47HeirEducation:'age'}},result:'上书房照旧分班。天资不同的孩子只能自己往前跑，或自己慢下来。'},
          {label:'文课、骑射、算学、音律分别按天资加教习',hint:'开始承认皇嗣不是同一副模子',effects:{flags:{v47HeirEducation:'talent'}},result:'教习表一下复杂了许多。几个月后，有人第一次在自己真正擅长的课上跑到兄姐前面。'},
          {label:'让生母各自再选一门专长，但必须报中宫备案',hint:'母妃影响会更明显，也可能把家族偏好带进孩子身上',effects:{flags:{v47HeirEducation:'maternal'}},result:'霍氏选骑射，邵氏选经史，周氏选音律。低位母妃也第一次被问：“你觉得自己的孩子擅长什么？”'}
        ]}
      ]
    });
  }

  // 邵氏与张氏争后位时，三皇子的越界成为真实政治风险，而不是攻击张氏的污点。
  const vacancyFinal=CHAPTERS.find(ch=>ch.title==='中宫空悬');
  if(vacancyFinal?.steps&&!vacancyFinal.steps.some(st=>(st.heading||'').includes('不是她的错'))){
    const finalIdx=vacancyFinal.steps.findIndex(st=>st.keyDecision&&Array.isArray(st.choices)&&st.choices.some(c=>String(c.label||'').includes('皇后')));
    const at=finalIdx>=0?finalIdx:vacancyFinal.steps.length;
    vacancyFinal.steps.splice(at,0,{
      heading:'第七幕半 · “不是她的错”',cast:['ning','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
        `礼部议继后，向御前索要两位候选人的旧事。三皇子送到景阳宫的书匣和御花园回廊里那几句话，张元照当夜已经写明，连在场内侍的名字也在。邵明贞取来那份陈述，没有替顺谦收起。`,
        `“他问你为什么留在陛下身边，还说以后也许轮到他来问。”邵明贞把纸放在案上，“这话是他不该说。”`,
        `${s.flags?.v47PrinceBoundary==='disciplined'?'“陛下已经当面责过他，东所私传内廷物件的路也断了。礼部若问，我便把处分和你的陈述一道呈去。”':s.flags?.v47PrinceBoundary==='shielded'?'“当时只叫你绕开西廊，东所却没有受罚。礼部若问，我不能把那道避嫌旨写成你的过错。”':'“御前当时只私下告诫过他，宗人府没有立案。礼部若问，也不能写成已经处分妥当。”'}`,
        `张元照道：“原话可以给他们看。我当面拒了，书匣也退回去了；若呈册只写我与三皇子有私，那便把他做的事删掉了。”`,
        `“我担心的是呈出去以后，他们仍会拿这件事阻你的后位。”`,
        `“他们要议，就请他们指着这张纸议。”`,
        `邵明贞将陈述和御前当时的处置并在一处，交给等在殿外的裴景和：“两份都送。不许只摘其中一句。”`,
        `张元照看着纸出了门，才说：“多谢娘娘。”`
      ],choices:[{label:'继续',effects:{flags:{v47EmpressDebateIncludesPrince:true}},result:''}]
    });
  }

  // 历史记录补充。
  try{
    const oldHist=historyRecordV38;
    historyRecordV38=function(e,i){
      if(e?.title==='王府旧笼')return '承熙十一年春，张氏自顺王府旧居入采选，上准其本人自择。';
      if(e?.title==='长枝渐高')return '承熙十三年，诸皇子女渐长，上始分教习；三皇子有失仪，上诫之。';
      return oldHist(e,i);
    };
  }catch(_e){}

  // 老存档：新增王府前史与皇嗣成长，回到王府旧笼重走后半卷。
  if(!state.flags.v47Migrated){
    const pi=CHAPTERS.findIndex(ch=>ch.title==='王府旧笼');
    const si=CHAPTERS.findIndex(ch=>ch.title==='空宫点灯');
    if(pi>=0&&(state.index||0)>=si){state.index=pi;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.lastChoice=null;}
    state.flags.v47Migrated=true;
  }
  save();render();
}catch(e){console.error('v47 Zhang/Shunwang/heirs patch failed',e)}})();
