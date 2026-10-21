(()=>{try{
  document.documentElement.dataset.build='v69';
  document.title='宫灯未眠 · 后期宫斗与旧血回潮 v69';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const ST=(ch,q)=>ch?.steps?.find(x=>(x.heading||'').includes(q));
  const arr=(v,s)=>{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]};
  const alive=(s,k)=>{const r=String(s.ranks?.[k]||PEOPLE?.[k]?.title||'');return !!PEOPLE?.[k]&&!/^(故|废)/.test(r)};
  const cn=n=>['零','一','二','三','四','五','六','七','八','九','十','十一','十二'][n]||String(n);
  function childRecords(s=state){try{return typeof globalThis.v52ChildRecords==='function'?globalThis.v52ChildRecords(s):[]}catch(_e){return []}}
  function nextOrder(s,sex){const rows=childRecords(s).filter(x=>x.sex===sex);const n=rows.length+1;if(sex==='F')return n===1?'大公主':`${cn(n)}公主`;/* 前两位皇子早夭，现有序齿不按在册人数简单重排；后添皇子只写“幼皇子”避免撞旧玉牒序。 */return '幼皇子';}

  // A. 双生异闻改为唯一且最残忍的公开选择。主控相信孩子已被“处理”，真正存活只留作多年后的暗雷。
  const first=CH('宫门初定');
  const twin=ST(first,'双生异闻：这个孩子要不要留在宫里');
  if(twin&&!twin.v69Canonical){
    twin.heading='承熙元年二月 · 第二声哭没有名字';
    twin.text=s=>[
      `男婴会哭、会吃奶，除了左眼瞳色浅、右手六指，没有太医能写出“活不成”三个字。真正让屋里安静下来的，是钦天监递进来的那张“宜秘处”折。`,
      `周清漪抱着女婴，一直没有问位分，也没有问吉凶，只问我：“陛下是要他死，还是要所有人以后都当他没有活过？”`,
      `这两句话在当时没有区别。新朝刚立，宗室、礼部与钦天监都在等一个答案；我最后选了最省事、也最残忍的那一个。`,
      `<div class="v69-ash"><b>这一处不再提供温和分支。</b>男婴不入玉牒，不送宗室，不留宫中。内务府奉旨秘处，对外只记“一子不育”。从这一夜起，周清漪公开只有一名双生女儿。</div>`
    ];
    twin.choices=[{label:'秘处异子：玉牒只留公主',hint:'没有宗室外养，也没有留宫观察。你要让这一声哭从宫册里消失。',v38TwinFate:'kill',v69CruelTwin:true,effects:{bond:{zhou:-16},trust:{zhou:-18,taihou:-5,gu:-2},flags:{twinGirlBorn:true}},result:'旨意当夜下去。内务府回报“已毕”，没有尸身入内廷停灵，也没有第二个人来复核。周清漪从此再不主动提那一夜。宫史只剩“一子不育”四字。'}];
    twin.v69Canonical=true;
  }

  // B. 早期铺垫一：最残忍旨意本身就留下一个空白，但当时没人追。
  const afterTwin=ST(first,'绮春宫先改掉两个字');
  if(afterTwin&&!afterTwin.v69Gap){const old=afterTwin.text;afterTwin.text=s=>[...arr(old,s),
    `那份“秘处已毕”的回执后来也送到凤仪宫。顾明宜照例夹进产案，没有追问尸身去了哪里；纸上只有交出男婴的内侍姓名，接收一栏空着。那时所有人都把空白理解成“这种事本就不该留下名字”。`,
    `很多年以后，阿芙会在另一套完全不同的簿册里重新看见这个空格。`
  ];afterTwin.v69Gap=true;}

  // C. 阿芙把方小满时代学到的“谁交给谁”带回来，第一次碰到承熙元年的旧空白。
  const snow=CH('雪尽宫门');
  if(snow&&!snow.steps.some(x=>x?.v69id==='afu-old-gap')){
    const i=snow.steps.findIndex(x=>(x.heading||'').includes('张元照到尚宫局借的不是册子'));
    const obj={v69id:'afu-old-gap',heading:'二月初三 · 阿芙在旧簿里看见一个没有接收人的孩子',cast:['afu','zhangyuanzhao'],fx:'ink',narrative:true,text:s=>[
      `大封后整理旧册，阿芙把承熙元年至十年的“已毕”“已送”“已交”一类回执单独挑出来。她不是查旧案，只是想看看如今这套交接法最早在哪些地方会断。`,
      `翻到承熙元年二月，她停住了。绮春宫产案旁夹着一张很薄的纸：<b>交出：有名。接收：空。事由：一子不育，秘处已毕。</b>`,
      `张元照看见“秘处”两个字，没有问那孩子是谁，只问：“没有第二张？”`,
      `“奴婢找了三匣。”阿芙说，“只有这一张。”`,
      `“那就只能写——不知道交给谁。”`,
      `阿芙抬头：“这种事也写不知道？”`,
      `“越是这种事，越不能拿‘已毕’两个字替我们假装知道。”`,
      `<div class="v69-ledger"><b>旧簿缺口：</b>承熙元年二月的“秘处”回执只有交出者，没有接收者、复核者与尸身记录。此时没人知道这意味着什么，只能标成“不可追”。</div>`
    ],choices:[{label:'在旧簿旁只添两个字：“不可追”',hint:'不替过去补一个不存在的答案。',effects:{trust:{afu:2,zhangyuanzhao:1},flags:{v69OldTwinGapFound:true}},result:'那张旧纸没有被销毁，也没有被解释。它第一次被明确标成了一个缺口。'}]};
    if(i>=0)snow.steps.splice(i+1,0,obj);else snow.steps.push(obj);
  }

  // D. 后期宫斗总章：十四年不是终点。十五至十九年，派别、皇嗣与婚议一起把早年的旧罪重新推回来。
  if(!CH('西华门外')){
    const lateIndex=CHAPTERS.findIndex(x=>x.title==='帘后朱笔');
    const lateChapter={date:'承熙十五年·春至十九年·冬',title:'西华门外',theme:'宫里以为早已抹掉的一声哭，十八年后从前朝和婚帖里重新回来',place:'养心殿 / 凤仪宫 / 绮春宫 / 宗人府 / 公主府',cast:['emperor','zhangyuanzhao','shen','zhou','afu'],fx:'snow',bridge:s=>{
      const q=s.flags?.v44NewEmpress==='zhangyuanzhao'?'凤仪宫换了主人，御前也重新划过内外文书的界。':'新后坐稳以后，六宫终于有了一个能落最后一笔的人。';
      return `${q} 可宫里越稳定，婚姻、皇嗣和前朝派别就越开始往更长的年份里算。承熙十五年以后，真正危险的已经不是谁多得一次召见，而是谁的孩子长大、谁的家门复起、谁能把一桩旧事变成今天的政治。`;
    },steps:[
      {heading:'承熙十五年五月 · 长春宫又响起一声婴啼',cast:['song2','zhou','afu'],fx:'lantern',narrative:true,text:s=>{
        if(!alive(s,'song2'))return [`这一年六宫仍有新生皇嗣，但宋文秀这一支已经不在宫中，产育只记入背景，不再另开主线。`];
        const order=s.flags?.v69LatePrincess?.order||nextOrder(s,'F');
        return [
          `澧河赈粮案过去一年多以后，宋文秀在长春宫生下一位公主。江南宋家送来的贺礼比喜报还快，礼单第一页仍写着“新漕仓整顿有功”。`,
          `我把那一页折回去，只准按皇嗣常例收礼。孩子出生不是替宋家赈粮案翻案的印章。`,
          `宋文秀抱着孩子时倒没有争。她低头看女儿的小手：“臣妾从前总想把三张单并成一张。现在只希望她以后别被人把一辈子并成‘宋家生了个公主’。”`,
          `阿芙来核洗三赏单，照旧问谁交、谁收。周清漪站在旁边看了一会儿，没有再说“孩子只是孩子”这种大道理，只替小公主把襁褓往下松了半寸。`,
          `<div class="v69-time">这一胎不改变储位，却改变江南派在六宫里的重量：宋家有了皇嗣血缘，却没有因此拿回被限制的漕运独揽权。</div>`
        ];
      },choices:[{label:'按常例记入玉牒，不因生女替宋家恢复旧权',v69LatePrincess:true,effects:{trust:{song2:2,zhou:1,afu:1}},result:'小公主入玉牒。宋家得了皇亲，却没有拿回那条被切断的独路。'}]},

      {heading:'承熙十六年八月 · 东南水师的贺表比孩子先到',cast:['liang2','ke','zhangyuanzhao'],fx:'wind',narrative:true,text:s=>{
        if(!alive(s,'liang2'))return [`梁素贞这一支未能走到承熙十六年的产育线，军门的后宫筹码因此少了一层。`];
        return [
          `梁素贞生下一名皇子。孩子还没洗三，东南水师已经递来三份贺表，字里行间全在说海防、船料和“皇嗣母家”。`,
          `霍素英看完只把折子往回推：“孩子会吃奶以前，先别替他学会要船。”`,
          `梁素贞没有觉得被冒犯。她摸着窗边被海风旧绳磨出的毛刺：“臣妾小时候最烦别人说‘你爹是水师，所以你该懂海’。轮到他，臣妾也不想先替他懂。”`,
          `${s.flags?.v44NewEmpress==='zhangyuanzhao'?'张元照把所有超例贺礼单独列一页，最后只写“退”。':'中宫照常例退掉超额军门礼，不许一名婴儿成为兵部新的借口。'}`,
          `<div class="v69-time">军门因此没有重新合成“一派”：霍家北营与梁家水师都各有皇嗣，却仍各算各的账。</div>`
        ];
      },choices:[{label:'孩子入玉牒，军门贺礼一律按常例裁减',v69LatePrince:true,effects:{trust:{liang2:2,ke:2},flags:{v69ArmyBirthBounded:true}},result:'皇子记入玉牒。兵部没有因此多得到一条绕过正式军议的路。'}]},

      {heading:'承熙十七年冬 · 大公主的婚事又被提起来',cast:['emperor','hanzhang','zhangyuanzhao','yinprince'],fx:'snow',narrative:true,text:s=>[
        `大公主已经二十一。承熙十三年那四张婚帖，她先后推掉两张，另外两家也因为前朝案子散了。几年下来，朝上开始有人说“皇女久不议婚，有失礼序”。`,
        `这回我没有把婚帖先交礼部。大公主自己坐在养心殿西暖阁，一张张看。她已经不像十七岁那年先问“父皇想选谁”，而是先问：“这些人想从我这里得到什么？”`,
        `含章在旁边听见，慢半拍才说：“这个问题问得比门第有用。”`,
        `${s.flags?.v44NewEmpress==='zhangyuanzhao'?'张元照没有替她挑，只把每一家的朝中关系、近三年处分与婚后居处并排列出来。':'中宫只列清家世、差事与婚后居处，不替皇女圈人。'}`,
        `这一轮礼部新添了一个名字：<b>陆既明</b>。出身不高，履历短，却因替宗室清议整理旧籍、在一次赈孤账里挑出重名而出名。支持他的人恰好大多反对《经手留名令》。`,
        `最奇怪的是，他明明靠清议起身，却从不当着公主说“礼法”“妇德”。第一次见面只谈恤孤院的冬炭怎么不够。大公主因此多看了他一眼。`
      ],choices:[{label:'不许礼部催定，让大公主自己先见过候选人',hint:'婚议可以是政治，但当事人不能只剩一个被递来递去的名字。',effects:{trust:{hanzhang:2,zhangyuanzhao:1},flags:{v69PrincessMarriageReopened:true}},result:'婚议进入“先见人、再议门第”的阶段。外朝有人骂坏旧礼，也有人开始真正争夺谁能成为驸马。'}]},

      {heading:'承熙十八年春 · 宗室清议多了一个总戴右手薄套的人',cast:['emperor','afu','zhangyuanzhao','yinprince'],fx:'ink',narrative:true,text:s=>[
        `陆既明很快成了宗室清议最年轻的一支笔。所谓宗室清议，本来就是礼序旧门在张元照新政以后分出来的一支：不全反对皇后，却最反感中宫的方法走进外朝。他最擅长挑《经手留名令》的毛病：地方为了留签拖慢急务、官员为了自保层层补字、没人愿意在最后一格写自己的名字。`,
        `我读过他的三篇条陈。不是胡搅蛮缠，甚至有两条我让户部照着改了。真正令人不舒服的是，他太懂这套法最容易在哪里伤人。`,
        `他右手常戴一只很薄的深色手套，对外说幼时受过旧伤；左眼颜色比常人浅一些，只说是儿时眼疾。京中异域商旅多，这两样都不足以定一个人的来处。`,
        `阿芙第一次远远看见他，是在宗人府外廊。她没有认出人，只突然想起承熙元年那张“接收为空”的旧纸。`,
        `她回凤仪宫后把那张旧簿重新找出来，递给张元照：“奴婢没有证据。只是想起它。”`,
        `张元照没有把陆既明抓来验人，只在旧簿旁又加一行：<b>“十八年后仍不可追。”</b>`,
        `<div class="v69-warning">此时任何“他就是当年的孩子”的判断都仍然只是猜测。主控若因一只手套和一只眼睛先抓人，反而会把自己重新写回最早用“异相”定命的那一夜。</div>`
      ],choices:[{label:'不因形貌立案，只查陆既明真实籍贯与六岁以前记录',hint:'这一次先查“他从哪里来”，而不是先查“他长得像谁”。',effects:{trust:{afu:2,zhangyuanzhao:2},flags:{v69LuBackgroundCheck:true}},result:'宗人府只查籍贯。陆既明六岁以前的户籍果然是一段空白，但仍不足以证明皇室血脉。'}]},

      {heading:'承熙十八年秋 · 周妃收到一块十八年前的软布',cast:['zhou'],fx:'candle',narrative:true,text:s=>[
        `绮春宫收到一个没有落款的小包。里面没有信，只有一小块已经褪成灰白的软布，边角绣着周清漪当年亲手挑的双生襁褓纹。`,
        `她看了一眼就把所有宫人赶出去。那块布不是二公主那一套——双生生产后，她亲手把男婴那两件小衣收过，针脚走向不一样。`,
        `包底压着一句话：<b>“第二声哭也活到了今天。”</b>`,
        `周清漪坐到天黑，没有去养心殿。她甚至没有把布烧掉，只锁进最底层。`,
        `她这一生最擅长知道什么时候该把一句话咽回去。可有些沉默只是给下一场灾祸多留一年。`
      ],choices:[{label:'这一夜，周妃没有来报',hint:'这是她自己的错误，不是主控替她做出的选择。',effects:{trust:{zhou:-4},flags:{v69ZhouHidClue:true}},result:'软布被锁进绮春宫。主控仍不知道那名男婴可能活着。'}]},

      {heading:'承熙十九年二月 · 大公主第一次说“这个人可以再看一看”',cast:['emperor','zhangyuanzhao','yinprince'],fx:'plum',narrative:true,text:s=>[
        `婚议拖了又一年。陆既明没有频繁进内廷，只在恤孤院、宗室女学和两次灾后赈孤里与大公主碰过几次。每一次旁边都有人，每一次都只谈正在做的事。`,
        `他最讨大公主喜欢的一点，是从不先说“公主应该怎样”。她问账，他答账；她说不想嫁进一个全家都等着借皇亲的人家，他也没有劝她“女子总要成婚”。`,
        `她最后把名字留在两名候选里，对我说：“这个人可以再看一看。”`,
        `我没有因为女儿这句话立刻赐婚。陆既明的六岁以前仍然没有户籍，宗室清议却有三位老臣联名为他作保。`,
        `${s.flags?.v69OldTwinGapFound?'阿芙把承熙元年的空白回执又递了一次。这回我看得比第一次久。':''}`,
        `真正的问题已经不只是“他是不是合适的驸马”，而是：为什么一个要进皇家婚书的人，童年最早六年像被人从纸上剪掉了。`
      ],choices:[{label:'婚书暂缓，先补完陆氏六岁以前的来历',hint:'大公主没有被否定；候选人的身份必须先说清。',effects:{flags:{v69MarriagePausedForIdentity:true}},result:'礼部没有落婚书。宗室清议因此开始公开攻击御前“借新法苛查驸马”。'}]},

      {heading:'承熙十九年三月初九 · 他自己把西华门那一夜送到御前',cast:['emperor','zhou','afu','zhangyuanzhao','yinprince'],fx:'snow',keyDecision:true,text:s=>[
        `陆既明没有等宗人府查完。三月初九，他自己请入养心殿，只带一个旧木匣。`,
        `匣里有三样东西：绮春宫双生襁褓的一段旧布、当年奉差内侍临死前留下的自陈、以及一张和宫中“秘处已毕”同日同墨的外门交接纸。`,
        `那名奉差内侍当年没有把孩子交给宗室。他奉的是“秘处”死令，却在西华门外最后一刻违旨，把仍在呼吸的男婴交给自己守寡的姐姐，对内则回报“已毕”。孩子后来改姓陆，六岁以前一直没有正式户籍。`,
        `陆既明把右手的薄套摘下来，只露了一瞬，又重新戴上。没有人需要再盯着看。那只手与那只浅色眼睛不是证据；真正把十八年前接起来的是纸、时间和那名内侍留下的自陈。`,
        `他没有跪着求认祖：“我不是来要一个皇子名分。”`,
        `“那你要什么？”`,
        `“我要你知道，你当年最想从纸上抹掉的人，活到了能自己走进来的一天。”`,
        `我问他为什么接近大公主。`,
        `他看着我：“因为你最疼的孩子已经长大了。我要让你在婚书落笔以前，先想起当年你替另一个孩子落过什么。”`,
        `<div class="v69-court"><b>陆既明没有与皇女发生亲密关系，也没有真正成婚。</b>他利用的是婚议本身：让一个被皇室公开考虑过的驸马候选，在最后一刻证明自己竟是被抹去的皇子。伤害来自欺骗、血缘与皇家公开失察，而不是把近亲关系写成情欲戏。</div>`,
        `门外忽然传来急报。绮春宫的人跪在阶下，说周妃留下了一张纸以后自尽。没有人把死法带进御前。纸上只有一句：<b>“那夜我没能护住他，后来我又没有把那块布说出来。”</b>`,
        `张元照看完没有说“她以死谢罪便算了”。她只把纸压平：“她死了，也不能替我们把这件事变干净。”`,
        `阿芙把两张纸并在御案上：承熙元年的回执只写了“已毕”，接收处空着；陆既明带来的外门交接纸上，则清清楚楚写着当年奉差内侍的名字。`
      ],choices:[
        {label:'公开旧事：承认当年“秘处”旨，也公开陆氏真实来历',hint:'大公主的婚议被明确认定为受骗；你同时把自己元年的旧罪写进起居注。',v69Final:'public',effects:{trust:{zhangyuanzhao:3,afu:2},flags:{v69HiddenPrinceRevealed:true,v69PrincessFate:'stay'}},result:'朝廷公开撤婚议，承认陆既明为周氏双生旧子但不补皇子序齿。大公主名誉被正式澄清，留京继续主持恤孤与女学。陆既明以冒籍、欺君与借皇女婚议报复之罪幽置宗人府别院。'},
        {label:'只治冒籍，不公开皇室血脉',hint:'保住皇室表面体面，却无法向天下解释大公主为什么突然撤婚。',v69Final:'hide',effects:{trust:{zhangyuanzhao:-3,afu:-1},flags:{v69HiddenPrinceRevealed:true,v69PrincessFate:'convent'}},result:'陆既明以冒籍结党论处，真实血脉只留密档。外间因此始终猜测大公主婚议出了什么丑闻。她最终自请入道观清修，不是赎罪，而是不愿余生继续做别人猜测皇室秘密的入口。'},
        {label:'先把全部真相告诉大公主，让她决定公开到哪一步',hint:'这一次，最后被伤到的人先拥有对自己故事的解释权。',v69Final:'princess',effects:{trust:{zhangyuanzhao:2,hanzhang:2},flags:{v69HiddenPrinceRevealed:true,v69PrincessFate:'estate'}},result:'大公主选择公开“婚议受冒籍欺骗”与陆氏皇室血脉，但不要求父皇替她宣布余生如何过。她离京住进自己的封邑，几年内不再议亲，却仍以大长公主身份往返京城与封地。'}
      ]},

      {heading:'承熙十九年冬 · 西华门还在那里',cast:['emperor','zhangyuanzhao','afu'],fx:'snow',narrative:true,text:s=>{
        const f=s.flags||{};
        const p=f.v69PrincessFate==='convent'?'大公主已经搬入京郊道观。她没有削发，也没有被废，只是不再参加婚议。':f.v69PrincessFate==='estate'?'大公主去了自己的封邑，冬至仍按礼回京。她不再允许礼部替自己先收婚帖。':'大公主仍住在京中，恤孤院与女学照常开门。再有人议亲，先把帖子送到她自己手里。';
        return [
          `这一年冬天，我经过西华门时，门洞和十八年前没有什么不同。石缝里还是积雪，换值的内侍仍会在风大时把手缩进袖里。`,
          `不同的是，我终于知道当年那道“已毕”后面发生过什么。不是因为我忽然更会看人，而是因为一个被删掉的人活得足够久，久到能自己回来反驳那四个字。`,
          p,
          `周清漪的牌位没有因为她最后的自尽被写成“殉母”。她的错误被单独记着：十八年秋收到线索而未报。她前半生护孩子、后半生沉默，也都是真的。`,
          ``,
          ``,
          `我没有说“以后不会再错”。宫里活了十九年以后，最不该说的就是这种话。`
        ];
      },choices:[{label:'合上承熙十九年的最后一页',effects:{flags:{v69LateArcComplete:true}},result:'西华门落锁。旧血没有洗净任何人，只把早年的决定重新交回活人手里。'}]}
    ]};
    const at=lateIndex>=0?lateIndex+1:CHAPTERS.length;CHAPTERS.splice(at,0,lateChapter);
  }

  // E. 选择副作用：记录后添皇嗣、最残忍双生路径与终局。
  const oldApply=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldApply&&!globalThis.__v69ApplyWrapped){globalThis.__v69ApplyWrapped=true;applyChoiceEffects=function(c){const out=oldApply(c);state.flags=state.flags||{};
    if(c?.v69CruelTwin){state.flags.v69TwinOrderedDead=true;state.flags.twinBoyFate='kill';state.flags.twinBoyRegistered=false;}
    if(c?.v69LatePrincess&&!state.flags.v69LatePrincess){state.flags.v69LatePrincess={name:'杨宜哉',order:nextOrder(state,'F'),birth:15,mother:'song2'};out.push(`${state.flags.v69LatePrincess.order}杨宜哉出生 · 宋文秀所出`);}
    if(c?.v69LatePrince&&!state.flags.v69LatePrince){state.flags.v69LatePrince={name:'杨顺澜',order:'幼皇子',birth:16,mother:'liang2'};out.push('承熙十六年新增幼皇子杨顺澜 · 梁素贞所出');}
    if(c?.v69Final){state.flags.v69HiddenPrinceRevealed=true;state.flags.v69HiddenPrinceFinal=c.v69Final;state.flags.v69ZhouDead=true;if(state.ranks?.zhou&&!String(state.ranks.zhou).startsWith('故'))state.ranks.zhou='故'+String(state.ranks.zhou);if(PEOPLE?.zhou)PEOPLE.zhou.title=state.ranks.zhou||'故周妃';}
    return out;};}

  // F. 陆既明作为后期角色：揭露前不剧透皇室血脉，揭露后才改人物卡。
  const lateIdx=Math.max(0,CHAPTERS.findIndex(x=>x.title==='西华门外'));
  if(!PEOPLE.yinprince)PEOPLE.yinprince={name:'陆既明',title:'宗室清议校书',age:'承熙十八年17岁',home:'宫外',noPortrait:true,portraitKind:'youngman',glyph:'陆',introducedAt:lateIdx,tags:['宗室清议','履历从六岁开始','右手常戴薄套'],bio:'出身不高、履历短，因整理宗室旧籍与赈孤账出名。支持他的人多反对《经手留名令》。他不靠门第压人，也因此在大公主后期婚议中显得格外不像传统驸马候选。'};
  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople)peopleView=function(){
    if(PEOPLE?.yinprince){if(state.flags?.v69HiddenPrinceRevealed){PEOPLE.yinprince.title='周氏双生旧子 · 无玉牒位分';PEOPLE.yinprince.tags=['被秘处的旧子','宫外长大','借婚议复仇'];PEOPLE.yinprince.bio='承熙元年周清漪所生双生男婴。主控下“秘处”旨后，奉差内侍违旨将仍在呼吸的孩子带出西华门，改姓陆在宫外长大。他后来从残存交接纸与襁褓得知血脉，借宗室清议进入前朝，再把大公主婚议变成逼皇帝直面旧罪的武器。他拒绝补一个迟到十八年的皇子名分。';}else{PEOPLE.yinprince.title='宗室清议校书';}}
    if(state.flags?.v69ZhouDead&&PEOPLE?.zhou){PEOPLE.zhou.bio='周清漪最擅长看见别人忽略的细节，也最擅长判断哪句话该咽回去。十八年前，她失去一个被“秘处”的双生男婴；十八年后收到孩子仍活着的线索，她再次选择沉默。旧子借皇女婚议复仇事发后，她自尽，没有因此被写成殉情或殉子——她的爱、她的沉默和她造成的后果必须分开记。';}
    return oldPeople();
  };

  // G. 皇嗣页补十五、十六年新增孩子；旧子揭露后只入“别录”，不补进公开玉牒序齿。
  const oldChildren=typeof childrenView==='function'?childrenView:null;
  if(oldChildren)childrenView=function(){let h=oldChildren();const f=state.flags||{};let cards='';
    if(f.v69LatePrincess){const c=f.v69LatePrincess;cards+=`<article class="heir-v47-card"><span class="heir-order">${c.order}</span><span class="heir-age">承熙十五年生</span><h2>${c.name}</h2><dl><dt>生母</dt><dd>${courtTitle(state,'song2')}</dd><dt>状态</dt><dd>在册</dd><dt>起居记</dt><dd>出生在澧河案以后；宋家没有因皇嗣恢复旧供应特权。</dd></dl></article>`;}
    if(f.v69LatePrince){const c=f.v69LatePrince;cards+=`<article class="heir-v47-card"><span class="heir-order">${c.order}</span><span class="heir-age">承熙十六年生</span><h2>${c.name}</h2><dl><dt>生母</dt><dd>${courtTitle(state,'liang2')}</dd><dt>状态</dt><dd>在册</dd><dt>起居记</dt><dd>东南水师贺表曾试图借其出生扩大政治筹码，御前按常例裁减。</dd></dl></article>`;}
    if(cards)h=h.replace('</div></main>',cards+'</div></main>');
    if(f.v69HiddenPrinceRevealed){h=h.replace('</main>',`<div class="heir-v47-memorial"><b>别录：</b>承熙元年周氏双生男婴并未死于“秘处”旨。奉差内侍违旨将其带出西华门，改姓陆长大。承熙十九年其自陈血脉；朝廷未追补玉牒序齿。</div></main>`);}return h;};

  // H. 大事录和卷终：后期宫斗分成“派别成形→皇嗣增生→婚议代理战→旧子复仇→旧罪回身”。
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron)chronicleView=function(){let h=oldChron();if(state.flags?.v69LateArcComplete||state.index>=CHAPTERS.findIndex(x=>x.title==='西华门外')){const f=state.flags||{};const extra=`<section class="v69-factions"><span class="eyebrow">承熙十五—十九年 · 后期宫斗</span><h4>宫斗不再只发生在寝殿里</h4><p><b>皇嗣：</b>${f.v69LatePrincess?'宋氏添公主，江南家门没有因此复权。':'后添皇嗣尚未发生。'} ${f.v69LatePrince?'梁氏添皇子，军门贺礼被按常例压回。':''}</p><p><b>婚议：</b>大公主成年以后，驸马人选成为礼序旧门、经制新议与宗室清议重新划线的地方。</p><p><b>旧血：</b>${f.v69HiddenPrinceRevealed?'承熙元年被“秘处”的周氏双生旧子陆既明在十九年自陈血脉，旧旨与旧簿缺口同时见光。':'承熙元年的“秘处”旧簿仍有一处接收为空。'}</p><p><b>后果：</b>${f.v69ZhouDead?'周妃在事发后自尽；她十八年秋隐瞒线索的责任另记，不以死亡抵销。':''} ${f.v69PrincessFate==='convent'?'大公主自请入道观。':f.v69PrincessFate==='estate'?'大公主移居封邑。':f.v69PrincessFate==='stay'?'大公主留京，婚议受骗被公开澄清。':''}</p></section>`;h=h.replace('</main>',extra+'</main>');}return h;};

  if(typeof historyRecordV38==='function'&&!globalThis.__v69Hist){globalThis.__v69Hist=true;const oldH=historyRecordV38;historyRecordV38=function(e,i){const base=oldH(e,i);if(e?.title==='西华门外'){const f=state.flags||{};return `承熙十五年至十九年，六宫再有皇嗣，皇女婚议渐与前朝派别相牵。${f.v69HiddenPrinceRevealed?'十九年，承熙元年周氏双生旧子陆既明自陈血脉，帝始知当年“秘处”旨未实际杀死男婴。周妃后自尽，皇女婚议撤。':'元年双生旧案仍有疑处。'}`;}return base;};}

  const oldEnding=typeof ending==='function'?ending:null;
  if(oldEnding)ending=function(){let h=oldEnding();h=h.replace('承熙朝·卷一终','承熙十九年 · 卷一终');h=h.replace('这些年真正走过的七段路','这十九年真正走过的八段路');h=h.replace('</ol></section>',`<li><b>旧血回潮：</b>十五年以后，新增皇嗣、皇女婚议和前朝派别把后宫推入更长的政治周期。承熙元年被“秘处”的周氏双生旧子最终从宫外回来，把最早那道残忍旨重新送到御前；阿芙当年坚持的“谁交给谁”，到最后连皇帝自己的旧命也必须回答。</li></ol></section>`);if(state.flags?.v69HiddenPrinceRevealed){h=h.replace('结局：','结局：旧血已归卷 · ');}return h;};

  // I. 主控弧线：这不是“他终于变善良”，而是早年的省事判断最后反过来决定子女命运。
  const oldPolicy=CH('西华门外');
  if(oldPolicy)oldPolicy.theme='十九年前最省事的一笔，最终变成十九年后最不能省的一笔';

  state.flags=state.flags||{};state.flags.v69Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v69 late court/hidden prince patch failed',e)}})();
