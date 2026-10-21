(()=>{try{
  document.documentElement.dataset.build='v68';
  document.title='宫灯未眠 · 前朝后宫派别与双簿四签 v68';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const IX=(ch,q)=>ch?.steps?.findIndex(x=>(x.heading||'').includes(q))??-1;
  const ST=(ch,q)=>ch?.steps?.find(x=>(x.heading||'').includes(q));
  const addAfter=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v68id===obj.v68id))return;const i=IX(ch,q);if(i>=0)ch.steps.splice(i+1,0,obj);else ch.steps.push(obj)};
  const append=(step,key,fn)=>{if(!step||step[key])return;const old=step.text;step.text=s=>{const a=typeof old==='function'?old(s):old||[];return [...a,...fn(s)]};step[key]=true};
  const who=(s,k)=>{try{return `${courtTitle(s,k)}${PEOPLE?.[k]?.name||''}`}catch(_e){return PEOPLE?.[k]?.name||k}};
  const afuCurrentTitle=s=>s.flags?.v68AfuPersonal?'景阳宫掌事宫女':s.flags?.v67AfuTransferred?'尚宫局传簿女史':'听雨轩宫女';

  // 1) 秋疫：给张元照的记录方法一个真正能被记住、以后能出宫门的名字。
  const winter=CH('凤仪宫最后一冬');
  addAfter(winter,'阿芙把“送到”两个字划掉',{v68id:'four-sign-named',heading:'八月二十二 · 四个空格终于有了名字',cast:['zhangyuanzhao','afu','hanzhang','shen'],fx:'rain',narrative:true,text:s=>[
    `第二天夜里，景阳宫的小案上摊着两份一模一样的纸。阿芙从尚宫局抱来的是交接格式，含章又在右下角添了一处“改动人”。`,
    `张元照把纸转了半圈，在最上头重新画了四个位置：<b>发出、接收、复核、改动。</b>旁边另留时辰和去处。`,
    `阿芙指着最后一格：“若没有改呢？”`,
    `“写无改。”张元照说，“空着，别人不知道是没改，还是忘了写。”`,
    `含章拿笔在“改动”旁又补了四个小字：“旧字须留。”她最讨厌刮得干干净净的纸。`,
    `沈知微看了两遍：“两份册子分开放，四处都要有人认。总不能每次叫‘张氏那套格子’。”`,
    `张元照自己先笑了一下：“那就叫<b>双簿四签</b>。”`,
    `“不一定四个人。”阿芙提醒。`,
    `“是不一定。”张元照把笔搁下，“一个人可以兼两签，但四个位置不能凭空消失。”`,
    `<div class="v68-rule"><b>双簿四签法</b>　同一件关键交接留两份簿册，分处保存；发出、接收、复核、改动四处必须留名，改字不刮旧痕。它最早只用于转院、送药与换值。</div>`,
    `那一夜没人觉得这是大事。外头雨还在下，太医院只催第二批退热药。后来这四个空格却一路从病院走到了粮仓、军械库和御案边。`
  ],choices:[{label:'“双簿四签，就这样写进疫册。”',hint:'张元照：“名字只是为了以后叫得清。不好用，照样改。”',effects:{trust:{zhangyuanzhao:2,afu:2,hanzhang:1,shen:1},flags:{v68DoubleBookFourSign:true}},result:'第一份写着“双簿四签”的册页分别送入太医院与尚宫局。'}]});

  // 2) 大封：前朝先替后宫画派别，而非妃嫔突然自觉结党。
  const snow=CH('雪尽宫门');
  addAfter(snow,'红旨落定以后，名字要一一念完',{v68id:'factions-after-sealing',heading:'正月十一 · 红旨未干，纸外先起了风',cast:['emperor','peiyan','ning','hui','ke','zhangyuanzhao'],fx:'wind',narrative:true,text:s=>[
    `大封第五日，裴景和从袖里抽出一张没有落款的薄纸。不是奏折，是前朝几处茶席间传开的“六宫关系图”。`,
    `我原以为会看见谁与谁交恶，纸上写的却全是外朝的名字：礼部、户部、北营、江南贡造、东南水师。妃嫔的名字被写在它们旁边，像一根根牵进宫墙的线。`,
    `<div class="v68-factions"><h4>前朝私议里的几种叫法</h4><div class="v68-factions-grid"><div><b>礼序旧门</b>御史常把邵氏、顾氏旧亲和礼部宗室并在一起说。</div><div><b>江南财赋</b>崔家与宋家本来互相抢路，折子里却常被并称江南财赋。</div><div><b>军门</b>霍氏北营与梁氏东南水师并非一路，兵部清议仍习惯合称军门。</div><div><b>经制新议</b>一些年轻官员常引用疫册、双簿和核账办法，折子里便渐渐带上张元照的名字。</div></div></div>`,
    `裴景和问：“要查是谁画的吗？”`,
    `我把纸折回去：“查得到一张，查不掉他们心里那张。”`,
    `当天请安时，邵明贞仍纠正一个宫女叫错的称谓；霍素英照旧先看门口值卫；崔静仪手里的礼盒丝带系得比平时更齐；张元照根本不知道自己已经有了一个“派”。`,
    `可从这一天起，她们每做一件事，外头都会有人问：这是谁家的意思？`
  ],choices:[{label:'把那张关系图留在御案底下',hint:'我不按图治罪，也不装作这张图不存在。',effects:{flags:{v68FactionMapKnown:true}},result:'纸没有传入六宫。可前朝看六宫的方式，已经变了。'}]});

  // 3) 阿芙：先在尚宫局有自己的路，之后才主动选择成为张元照的贴身掌事，形成前后桥梁。
  addAfter(snow,'红毡卷走以后，第二批少了一把椅子',{v68id:'afu-to-zhang',heading:'正月十二 · 张元照到尚宫局借的不是册子',cast:['zhangyuanzhao','afu'],fx:'candle',narrative:true,text:s=>[
    `大封第二日，张元照自己去了尚宫局。她没带仪仗，只带着景阳宫那本已经被阿芙划过好几次的送药册。`,
    `阿芙正把昨日各宫接册的回执归匣，看见她便起身。`,
    `“娘娘要哪一本？”`,
    `“不要册。”张元照把那本送药册放到她面前，“我要你。”`,
    `阿芙的脸一下冷了半分。方小满死后，她最烦别人说“你以后跟着谁”。`,
    `张元照看出来了，改口：“我想请你去景阳宫做掌事。三个月。你若觉得不合适，自己回尚宫局。”`,
    `“为什么是奴婢？”`,
    `“因为你敢把我写的‘送到’划掉。”`,
    `阿芙低头看那道墨痕：“若以后娘娘写错更大的呢？”`,
    `“也划。”`,
    `“当着娘娘面？”`,
    `“最好当着。”`,
    `阿芙沉默许久，最后问的却是：“小灰能带过去么？”`,
    `张元照怔了一下：“它若肯。”`,
    `<div class="v68-afu"><b>阿芙没有立刻给第二个主子补上方小满的位置。</b>她先在尚宫局独自活了一段，确认自己留下来的本事属于自己。到这一日，她才重新选择跟一个人走。</div>`
  ],choices:[{label:'“去景阳宫吧。你仍有权把写错的地方划掉。”',hint:'阿芙：“那奴婢真划。”',v68AfuToZhang:true,effects:{trust:{afu:4,zhangyuanzhao:2}},result:'阿芙把传簿房的钥匙交出去，抱着小灰去了景阳宫。桌上第一样新东西不是首饰，是一只专门收废稿的木匣。'}]});

  // 4) 前朝第一案：漕粮案把双簿四签带出宫门，也把崔/宋两条财赋线真正洗牌。
  const night=CH('长夜未央');
  addAfter(night,'三份折子都写了“照旧”',{v68id:'grain-case',heading:'十月初九 · 河水进了御案',cast:['emperor','zhangyuanzhao','hui','song2','afu'],fx:'rain',narrative:true,text:s=>[
    `十月，江南澧河决了一段堤。赈粮从京仓拨出一万二千石，到了灾县，只剩九千四百。最怪的是沿途五处仓簿都写得很齐——每一处都写“足数收讫”。`,
    `我把五本账摊在养心殿。张元照看了很久：“每一本单看都对，因为它们只证明‘我这里收过’，不证明同一批粮从头到尾还是那一批。”`,
    `${s.flags?.v68AfuPersonal?'阿芙如今在景阳宫当值，站在后面':'阿芙仍在尚宫局，被临时叫来核交接，站在案侧'}一眼认出来：“双簿四签。”`,
    `我问：“宫里的送药法，拿去查河粮？”`,
    `“先试三趟。”张元照说，“若不好用就撤。发仓一签、交驿一签、到仓一签；任何改数另签。京里和地方各留一簿。”`,
    `试到第二趟，缺口就露出来了。崔家旧贡造行承接的转仓，几十年来一直先按“水脚损耗”扣一个固定比例，没人再称；宋家新接的并仓则把三处粮合到一仓，省了人手，却让一名管事把重新分装的差额藏进了总数里。`,
    `崔静仪被召来时没有喊冤。她只说：“臣妾小时候就见过家里账上有‘水脚损耗’四字。大家都说这是规矩。”`,
    `宋文秀比她更难堪：“并仓是臣妾哥哥主张的。他说少两道手就少两道错。臣妾也觉得对。”`,
    `“现在呢？”我问。`,
    `宋文秀把三张原本叠齐的单子重新摊开：“少手不等于少人钻空子。”`,
    `<div class="v68-courtcase"><strong>前朝后果：</strong>崔家旧贡造资格被停，宋家仓储不得独揽一路；所有赈粮先在两路试行“双簿四签”。<br><strong>后宫后果：</strong>长春宫与宋氏家书、家礼全部改走明册复核。外朝开始真正相信：六宫里谁得势，会改变哪一家在宫外的路。</div>`
  ],choices:[
    {label:'对崔静仪说：“旧案已经不是第一次落到你家这条路上。”',hint:'把旧贡造与方氏案累计计算；后宫会真正洗牌。',v68DemoteCui:true,effects:{trust:{hui:-3,song2:1,zhangyuanzhao:2},flags:{v68GrainCase:'demote-cui',v68FourSignPilot:true}},result:'崔静仪降一级，停娘家递牌半年；宋文秀原位记过，宋家仓储限额。宫里第一次因为前朝财赋案真正动了一个高位嫔妃的位分。'},
    {label:'“家罪办家罪。两宫都停娘家私递，不动位分。”',hint:'不把家族罪直接换算成妃嫔罪，但切断两家借后宫伸手的路。',effects:{trust:{hui:1,song2:1},flags:{v68GrainCase:'separate',v68FourSignPilot:true}},result:'崔、宋两家外朝差事照办；长春宫与宋氏三个月内不得收未入明册的家书家礼。位分不动，势力却明显换了方向。'}
  ]});

  // 5) 军门案：霍/梁被前朝强行画成“军门一派”，案件逼她们公开拆开。
  const grow=CH('长枝渐高');
  addAfter(grow,'上书房以后不再只按序齿教',{v68id:'army-case',heading:'八月十九 · 北营的弩，东南的铁',cast:['emperor','ke','liang2','zhangyuanzhao'],fx:'wind',narrative:true,text:s=>[
    `兵部同一日送来两封急折。北营说八百张新弩迟迟不到，东南水师却报今年铁料已经按数北运。朝上很快有人把两件事说成一句：“宫里霍、梁两家，总得有一家知道东西去哪了。”`,
    `霍素英先收到娘家信。信里没求她救人，只让她“在陛下面前说明北营确实缺弩”。她看完把信放回封套，没有烧。`,
    `梁素贞也收到一封。东南那边希望她趁机说明水师一直被北营压着份额。她摸了摸封口的潮气，半天没拆第二遍。`,
    `我把两个人一起叫来，没有让她们替家里作证，只把两封信都推回去：“朕问你们一件事——这信想让你们替谁省一道正式手续？”`,
    `霍素英先答：“臣妾家里想省兵部那一道。”`,
    `梁素贞道：“臣妾家里想省等查清以后再邀功那一道。”`,
    `张元照把已经试过半年的“双簿四签”用在这批军械上。结果八百张弩确实出了军器监；中途转运官提前签了“北营收讫”，北营实际接收那一栏却是空的。那名转运官恰好是霍家远亲。东南铁料也没有少，只因台风封港晚发十三日，梁家报迟了。`,
    `霍素英看完案卷，脸色很沉：“该革就革。别写‘霍家请罪’，写那个人名字。”`,
    `梁素贞也没有笑：“东南迟报十三日，该罚也罚。”`,
    `<div class="v68-courtcase"><strong>这一案以后，所谓“军门后妃一派”第一次被事实拆开。</strong>霍家远亲革职，东南水师主管迟报受罚；霍、梁两宫都没有替娘家换到额外兵权。她们在宫里反而比从前更能说话——因为皇帝知道，她们至少不会把亲族错写成自己。</div>`
  ],choices:[{label:'“朕问你们，不问你们的家。”',hint:'霍素英：“那最好。”　梁素贞：“臣妾也省事。”',effects:{trust:{ke:3,liang2:3,zhangyuanzhao:1},flags:{v68ArmyCaseDone:true}},result:'兵部案按经手人逐级问责。霍、梁两人的位分不动，外朝却再难把她们简单画成同一股军门势力。'}]});

  // 6) 皇女婚议：前朝四派开始争一位公主，玩家直接与当事人对话而非点抽象按钮。
  addAfter(grow,'三皇子已经十八',{v68id:'princess-marriage',heading:'九月初六 · 四张婚帖都写着“合适”',cast:['emperor','hanzhang','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>{
    const princess=Object.values(s.children||{}).find(c=>c&&c.gender==='女'&&!c.dead)||null;
    const label=princess?.title||princess?.name||'大公主';
    return [
      `${label}年岁渐长以后，礼部一次送来四张婚帖。一个是礼部旧门，一个与江南漕运有亲，一个出自北营旧勋，还有一个家世最轻，只在翰林读书。每一张旁边都写“门第相称”。`,
      `我看见的却是大封以后那张关系图又换了一种写法。前朝想借一个皇女的婚事，把某一根线绑得更牢。`,
      `含章只问：“公主自己看过么？”`,
      `礼官愣住：“婚帖照例先由御前与中宫——”`,
      `张元照没有接“照例”两个字，只把四张帖叠好：“先让她知道自己被拿来平哪几股风，再问愿不愿。她若连自己在选什么都不知道，点头也没有意思。”`,
      `我没有在她们面前定。傍晚，我把${label}叫到御花园西暖亭。四张帖就放在我们之间。`,
      `她看了一遍，先问：“父皇想选哪一个？”`,
      `“朕先听你说。”`,
      `她沉默很久，终于伸手把其中一张推远了一点。`
    ];
  },choices:[{label:'对公主说：“先告诉朕，你最不愿意哪一个。”',hint:'先问她最不愿意哪一个，不让礼部替她把四个人都说成“合适”。',effects:{trust:{hanzhang:2,zhangyuanzhao:2},flags:{v68PrincessAsked:true}},result:'礼部第二日收到的不是赐婚旨，而是一句“重拟二人”。四股前朝势力第一次发现，皇女本人也会改变他们的算盘。'}]});

  // 7) 后期：双簿四签从技术变成政策，进而形成真正的“张后新政”争议。
  const late=CH('帘后朱笔');
  addAfter(late,'雨声把奏折压得更低',{v68id:'policy-formalized',heading:'七月廿七 · 有人开始叫它“张后四签”',cast:['emperor','zhangyuanzhao','shen','afu'],fx:'ink',narrative:true,text:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
    `双簿四签在澧河赈粮与北营军械两案里都抓出了缺口以后，户部和都察院各有人上折，请求扩大试行。反对的折子来得更快。`,
    `礼部说“内廷簿法不可擅出宫门”；江南几个旧家说这套办法拖慢转运；还有御史索性在折子里写了四个字：<b>“张后四签”。</b>`,
    `张元照看到那四个字，把折子推远：“这名字不能留。”`,
    `我问：“嫌难听？”`,
    `“嫌太好听。”她说，“今天叫张后四签，明日换个皇后，他们就能说法也该跟着换。”`,
    `沈知微在旁边把茶盖扣好：“那就别用人的名字。”`,
    `阿芙站在后面低声道：“本来也不是一个人想出来的。”`,
    `张元照回头看了她一眼。阿芙没有避。`,
    `最后御前把适用范围压到四类：赈粮、军械、重大疫报、官办大宗转运。不是每件小事都要四签，也不许地方为了填格子拖死人。`,
    `正式诏名定成：<b>《经手留名令》</b>。`,
    `<div class="v68-policy"><h4>《经手留名令》</h4>源自宫疫中的“双簿四签法”。重大人、物、文书转交须留双册；发出、接收、复核、改动必须可追到具体经手人。旧字不得刮净，补改须留原痕。若因紧急情形先行处置，可事后补签，但不得用“众议”“从权”抹掉下令者。</div>`,
    `诏书一下，外朝的分歧也摆到了明面上：年轻的经制官愿意试，礼序旧门担心中宫影响外朝，江南旧网最怕经手留名，军门则在北营案以后分成支持与反对两边。`,
    `我没有让人把“这是皇后的办法”从史官笔下抹掉，只在诏书最后加了一句：“奉旨试行，三年后复议。”`,
    `张元照看完：“三年后若不好用？”`,
    `“废。”`,
    `她点头：“那才像一条法。”`
  ]:[`张元照没有受凤印。“双簿四签”仍停留在宫内与少数御前试行，没有形成全国性的《经手留名令》。`],choices:[{label:'颁《经手留名令》，三年后必须复议',hint:'张元照：“能废，才不是供起来的牌位。”',effects:{trust:{zhangyuanzhao:3,shen:1,afu:1},flags:{v68HandlingNameEdict:true}},result:'诏书出养心殿以后，支持它的人与反对它的人都第一次有了一个明确名字。后宫的风，也因此更快吹进前朝。'}]});

  // 8) 东窗事发时，阿芙已经是张元照身边的人；旧方法最终指向自己的主子。
  const scandal=ST(late,'一页废稿到了都察院');
  append(scandal,'v68AfuScandal',s=>s.flags?.v68AfuPersonal?[
    `封永和宫旧匣时，是阿芙抱着空封条跟去。她没有因为匣子里是和妃的字就少写一栏。`,
    `回养心殿，她把封套推到张元照面前：“永和宫掌事交出，奴婢接收，裴总管复核。娘娘，这一格写谁下令封的？”`,
    `张元照看着那张自己一路带大的格式，停了很久：“写我。”`,
    `阿芙落笔，在封套最下面写清：“下令封存：皇后张氏。”写完才把笔搁回去。`
  ]:[]);

  // 9) 选择效果：动态降位与阿芙正式转入景阳宫；若张元照受凤印再随入凤仪宫。
  const oldApply=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldApply&&!globalThis.__v68ApplyWrapped){globalThis.__v68ApplyWrapped=true;applyChoiceEffects=function(c){const out=oldApply(c);state.flags=state.flags||{};
    if(c?.v68AfuToZhang){state.flags.v68AfuPersonal=true;if(PEOPLE?.afu){PEOPLE.afu.title='景阳宫掌事宫女';PEOPLE.afu.home='景阳宫';PEOPLE.afu.tags=['方氏旧人','张氏掌事','双簿四签的第一支笔'];}out.push('阿芙转入景阳宫 · 成为张元照贴身掌事');}
    if(c?.v68DemoteCui){try{demoteRank('hui')}catch(_e){};state.flags.v68CuiDemoted=true;out.push('崔静仪因家门旧案累积降一级');}
    return out;};}

  // 10) 人物录、结局：阿芙真正成为前后卷的桥；宋梁霍崔得到前朝事件后的新层次。
  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople)peopleView=function(){
    if(PEOPLE?.zhangyuanzhao){const t=PEOPLE.zhangyuanzhao.tags||[];if(!t.includes('双簿四签'))PEOPLE.zhangyuanzhao.tags=[...t,'双簿四签'];if(state.flags?.v68HandlingNameEdict)PEOPLE.zhangyuanzhao.bio='承熙三年第一次大选入宫后，她先以古怪却实用的生活习惯惹人侧目；宫疫中把阿芙的交接习惯、含章的改痕意识和自己的双册思路合成“双簿四签”。后来这套办法走出宫门，成为《经手留名令》。她真正让人忌惮的，是能把自己的做法写成章程，换个人来办也得照着走。';}
    if(PEOPLE?.afu&&state.flags?.v68AfuPersonal){PEOPLE.afu.title=state.flags?.v44NewEmpress==='zhangyuanzhao'?'凤仪宫掌事宫女':'景阳宫掌事宫女';PEOPLE.afu.home=state.flags?.v44NewEmpress==='zhangyuanzhao'?'凤仪宫':'景阳宫';PEOPLE.afu.tags=['方小满旧人','张元照贴身掌事','经手留名'];PEOPLE.afu.bio='方小满死后，她先在尚宫局学会独自活，不急着投第二个主子。直到张元照主动请她去景阳宫，她才重新选择跟一个人走。她把“谁交给谁”从听雨轩带进疫册，再带进中宫；最后连皇后自己的处分和封匣，也照样要求写清经手。';}
    if(PEOPLE?.song2&&state.flags?.v68GrainCase){PEOPLE.song2.tags=['江南漕运','并仓吃过亏','永远留第二条路'];PEOPLE.song2.bio='她最初真心相信把三张单并成一张、把三处仓并成一处就会更少出错。澧河赈粮案让她亲眼看见：效率也能替新的垄断藏东西。此后她仍爱省事，却坚持任何供应路线至少留第二条路。';}
    if(PEOPLE?.ke&&state.flags?.v68ArmyCaseDone&&!String(PEOPLE.ke.bio||'').includes('北营军械案中')){PEOPLE.ke.bio=(PEOPLE.ke.bio||'')+' 北营军械案中，她没有替霍家远亲遮掩空签，反而要求案卷只写具体经手人，不写“霍家请罪”。';}
    if(PEOPLE?.liang2&&state.flags?.v68ArmyCaseDone){PEOPLE.liang2.bio='梁素贞来自东南水师，却一直拒绝成为霍素英的复制品。北营军械案里，她既没有替水师借机邀功，也没有替迟报找借口；她最在意的仍是潮气、时辰和一件东西到底有没有真正到岸。';}
    return oldPeople();
  };

  const oldEnding=typeof ending==='function'?ending:null;
  if(oldEnding)ending=function(){
    if(state.flags?.v68AfuPersonal&&PEOPLE?.afu){PEOPLE.afu.title=state.flags?.v44NewEmpress==='zhangyuanzhao'?'凤仪宫掌事宫女':'景阳宫掌事宫女';PEOPLE.afu.home=state.flags?.v44NewEmpress==='zhangyuanzhao'?'凤仪宫':'景阳宫';}
    let h=oldEnding();
    h=h.replace(/(<article class="v55-chronicle-card"><h3>[^<]*阿芙<\/h3><p class="fate">)[\s\S]*?(<\/p><blockquote>)[\s\S]*?(<\/blockquote>)/,`$1方小满死后，阿芙先在尚宫局传簿房独自站住，后来才主动成为张元照的贴身掌事。她把一句“谁交给谁”从听雨轩带进宫疫，再带到中宫与《经手留名令》；到最后，连皇后自己也不能从她的经手栏里被省掉。$2“娘娘，这一格写谁下令？”$3`);
    return h;
  };

  // 11) 大事录：让前朝事件真正写进既有章节史笔。
  if(typeof historyRecordV38==='function'){
    const oldHist=historyRecordV38;historyRecordV38=function(e,i){const base=oldHist(e,i);const t=e?.title||'';let extra='';
      if(t==='雪尽宫门'&&state.flags?.v68FactionMapKnown)extra=' 大封后，朝中遂以礼序、财赋、军门、经制诸说议六宫，外廷之争渐与内廷相接。';
      if(t==='长夜未央'&&state.flags?.v68FourSignPilot)extra=' 同年澧河赈粮短少，御前以“双簿四签”试核转运；崔氏旧贡造停办，宋氏仓储受限。';
      if(t==='长枝渐高'&&state.flags?.v68ArmyCaseDone)extra=' 十三年，北营军械失接案发，按经手签查得转运空签，霍、梁两家各按其责处分，不以宫嫔合论。';
      if(t==='帘后朱笔'&&state.flags?.v68HandlingNameEdict)extra=' 后“双簿四签”扩为《经手留名令》，行于赈粮、军械、重大疫报及官办转运，三年一复议。';
      return base+extra;
    };
  }

  // 12) 大事录页面额外给出“前朝后宫风向”，不是固定党籍，而是事件后的实际站位。
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron)chronicleView=function(){let h=oldChron();const f=state.flags||{};const extra=`<section class="v68-factions"><span class="eyebrow">前朝与六宫</span><h4>这些“派”不是谁在宫里挂出来的牌子</h4><p><b>礼序旧门：</b>邵氏与顾氏旧亲仍被礼部、宗室视为最稳的中宫路线。</p><p><b>江南财赋：</b>${f.v68GrainCase?'崔氏旧贡造与宋氏新仓储已经在澧河案里正面碰撞；两边都受了限制。':'崔、宋两条供应线仍在彼此试探。'}</p><p><b>军门：</b>${f.v68ArmyCaseDone?'北营与东南水师已被军械案证明不能混作一党。':'外朝仍习惯把霍、梁两家并称“军门后妃”。'}</p><p><b>经制新议：</b>${f.v68HandlingNameEdict?'《经手留名令》让支持与反对张后方法的人真正形成清晰阵线。':'双簿四签仍只是宫疫留下的一套办法。'}</p><p class="v68-party-note">皇帝始终没有按这些圈直接给妃嫔定罪；可每一次外朝案子，都在改变后宫谁有家门可依、谁还能收家书、谁的“得宠”会被解释成政治信号。</p></section>`;return h.replace('</main>',extra+'</main>')};

  // 13) 旧存档迁移：已经是张后且阿芙已转景阳宫，则同步成为凤仪宫掌事。
  state.flags=state.flags||{};
  if(state.flags.v68AfuPersonal&&PEOPLE?.afu&&state.flags?.v44NewEmpress==='zhangyuanzhao'){PEOPLE.afu.title='凤仪宫掌事宫女';PEOPLE.afu.home='凤仪宫';}
  state.flags.v68Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v68 court factions/four-sign patch failed',e)}})();
