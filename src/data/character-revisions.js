// Character work stays inside existing scenes and permanent scene identities.
// Paragraph slots carrying artwork are preserved. No choice or rank is rewritten.
const CHARACTER_REVISIONS_153=[
  {id:'gu-ice',chapter:'宫灯渐繁',scene:'承熙三年六月 · 冰酪化得比人说话快',people:['gu','emperor'],append:[
    '冰酪摆到顾明宜面前，她没有马上吃，先拿小匙将盏边刮下一圈，等它软些。我问她怎么只管别人的冰，自己的倒放着。',
    '“太硬，冰得牙疼。”她又舀了一匙，“陛下那盏也等一等。”',
    '我偏尝了一口，凉得吸气。她笑了一声，没有替我掩饰。我说她方才明明在等我出丑，她将自己的盏挪远：“提醒过了。”',
    '散席时尚宫来问一张月例单，她叫人放到晚间再拿。盏底还剩一点，她不肯撤：“这会儿才好吃。”我陪她吃完，宫女便在旁边等了片刻。'
  ],lives:{gu:'盛夏小宴，她等冰酪融软再吃，月例单留到晚间，不肯因传话便撤下未吃完的那一盏。',emperor:'盛夏与顾明宜同吃冰酪，没听她劝，冰得吸气，反被她笑了一回。'}},
  {id:'gu-sugar',chapter:'宫灯渐繁',scene:'三位新人各自站稳脚跟',people:['gu','ning'],append:[
    '那日我到凤仪宫时，邵明贞刚将松子糖的纸包打开。顾明宜认得，伸手拿一粒，邵明贞却把剩下的包好：“臣妾明日还要喝药，娘娘别全拿了。”',
    '顾明宜没放回去：“小时候这一包都是我给你的。”',
    '“小时候娘娘也挑最大的。”邵明贞找出一粒较小的，另放到她手边。顾明宜将两粒都留下，没叫宫女再取一盘。两人争完糖，才接着看那份没有合适旧例的册子。'
  ],lives:{gu:'与邵明贞熟识多年，仍会拿她喝药后吃的松子糖，被提醒后也不肯退回已经挑走的一粒。',ning:'顾明宜来取松子糖时，她肯分，也要留住次日喝药后自己要吃的份。'}},
  {id:'gu-rest',chapter:'凤仪宫最后一冬',scene:'八月初，皇后先病了一场',people:['gu','emperor'],append:[
    '外间的食盒声远了，顾明宜问我：“今年那几盏冰酪，陛下吃过没有？”我说吃过，问她要不要也取一盏。她摇头，咳完才笑：“太医不许凉的。我只是问问。”',
    '我说等她好了再摆小宴。她没有接这句，只叫人将银盏里的温水添满，喝了一口：“今日坐一会儿也行。那几本册子别再拿进来了。”',
    '我陪她坐到温水喝完。出殿时尚宫仍抱着册子，见我便要递上来；我让她晚些再送，自己却已经在想散朝漏看的那一份折子。'
  ],lives:{gu:'病初曾请杨叙只坐一会儿，将册子留在外间，提起往年的冰酪，却没有要求违医嘱再吃。'}},
  {id:'gu-loss',chapter:'凤仪宫最后一冬',scene:'十月二十三，凤仪宫灯灭',people:['gu','emperor'],when:s=>seenCharacter153(s,'gu-rest'),append:[
    '后来收拾日用盏，尚宫问那只银盏要不要仍送回养心殿。我叫她先放着，过了一会儿又让她收好。八月我答应过的小宴已经用不着预备；我记得她说冰酪要等软些，却想不起那日下午我们还讲过什么。'
  ],lives:{emperor:'顾明宜薨后，他想起未能再设的小宴。银盏收起，先前答应过的普通相处没有再兑现。'}},
  {id:'fang-evening',chapter:'听雨轩有喜',scene:'听雨轩难得安静的一夜',people:['fang','emperor'],insertBefore:{from:'她睡着以后，我没有立刻走。',text:[
    '笑完，她把书拿回去，仍指着方才那一行。我只得从头念，念到一个拗口的字，又停下来换了句说法。她听了半页才说：“陛下，下一回别只告诉臣妾少操心。”',
    '“还要什么？”',
    '“把这句念明白。”她将书角折了很小一下，“下回先念这里，别又从头来。”'
  ]},lives:{fang:'有孕时请杨叙将读不懂的书句念明白，不肯用一句“少操心”换过自己要问的事。'}},
  {id:'fang-food',chapter:'听雨轩有喜',scene:'方小满死后第三日 · 听雨轩封存',people:['fang','afu'],append:[
    '封院清单送到我这里时，阿芙另问一件小事：膳房仍按听雨轩旧数送晚食，已多送了两回。我原想让人照册停掉，她却说：“今夜已经做了。让值房的人吃，明日别再送那一份。”',
    '她指的是方小满那碗莲子羹。以前人还没从院里回来，羹便先凉在桌上；如今没有人催温，膳房仍照那一个时辰送。裴景和去传话，阿芙等到他回来确认改了，才把食盒的空格一并勾掉。'
  ],lives:{fang:'死后膳房仍送听雨轩旧份晚食，阿芙将已做的分给值房，次日停掉多出的那一份。',afu:'听雨轩封存时，她安排已做的晚食不浪费，又要求膳房次日停送亡者旧份。'}},
  {id:'fang-cat',chapter:'听雨轩有喜',scene:'封院第六日 · 小灰又回了花房',people:['fang','afu'],replace:[
    {from:'听雨轩的门封了五日。第六日阿芙回来，只为取猫。',to:'听雨轩的门封了五日。第六日，阿芙将封院时已经抱出的猫送回花房暂养。'},
    {from:'阿芙坐在台阶上看了一会儿。花房里有人正为第二日送哪盆海棠拌嘴，声音很吵。她忽然觉得吵一点也好。',to:'阿芙后来回话，说掌事问起猫吃什么，她张口便要叫方小满，叫出一个字才停。鱼干是她从前讨过的，她自己将份量说清，仍坐在台阶上听花房的人争第二日送哪盆海棠。'}
  ],lives:{afu:'将小灰送回花房暂养时，仍下意识要叫方小满，随后自己交代了猫的食物。'}},
  {id:'afu-room',chapter:'听雨轩有喜',scene:'听雨轩落锁以后，阿芙还得选自己往哪走',people:['afu'],append:[
    '调拨纸送到御前，还附着阿芙的两句请求。她问传簿房的通铺哪一处归她，又问自己的木箱能不能锁上，不随公用册匣一道翻。',
    '裴景和说她带的不过是旧衣和两封家信。她答：“那也是奴婢自己的。值房缺纸，奴婢给裁；家信不拿来垫册子。”',
    '我准她带自己的箱子。回话的人又来问猫窝，她问窗下能不能腾出一处。裴景和问何必连这个也先定，她说猫半夜会叫，别等同房人睡了再挪。'
  ],lives:{afu:'自请去传簿房时，还问明铺位，要求私箱与家信不混进公用册匣，也先问猫窝，免得半夜惊醒同房人。'}},
  {id:'afu-hours',chapter:'雪尽宫门',scene:'正月十二 · 张元照到尚宫局借的不是册子',people:['afu','zhangyuanzhao'],append:[
    '后来裴景和问阿芙交钥匙的日子，她没有立刻答，先请他把景阳宫当值的人数说清。白日传簿，夜里守内间，若都只算她一个，她便不接。',
    '张元照将白值、夜值分开给她看。阿芙看过才定下交钥匙的时辰，又道：“奴婢自己的衣裳也要缝。没急事，熄灯以后不再添一遍册。”',
    '张元照原想说自己也没歇，话到嘴边停了，只答：“急事另叫你。寻常的放到明早。”阿芙这才把自己用惯的针线包收进要带走的箱子。'
  ],lives:{afu:'答应转去景阳宫前，她先核白值和夜值人手，不愿一人兼两班；寻常添册留到次日，她也要时间缝自己的衣裳。',zhangyuanzhao:'请阿芙做掌事时，听取她对两班人手的要求，没有将自己未歇当作旁人也须陪值的理由。'}},
  {id:'afu-refusal',chapter:'帘后朱笔',scene:'一页废稿到了都察院',people:['afu','zhangyuanzhao'],when:s=>Boolean(s.flags?.v68AfuPersonal),append:[
    '张元照还想留她核另一摞旧稿，阿芙将封套推到裴景和手边：“这匣奴婢接过，已经写清。那一摞是谁收的，请谁来。”',
    '她的右手写了一夜，握住笔杆便疼，却没有拿疼作推辞。我让裴景和叫当值人。阿芙交完封套便退下，没留下等张元照从那十二份副稿里缓过神。'
  ],lives:{afu:'永和宫封匣后，只认自己接过的那一段，拒绝替别的经手人补核，也没有留下无限陪值。'}},
  {id:'zhang-trial',chapter:'荷风满座',scene:'三十日以后，留下来的只有两样',people:['zhangyuanzhao','gu'],insertAfter:{from:'张元照第二日便把自己的安排划掉，改成前后两班必须重叠半刻。',text:[
    '改完还不能就此结账。新旧班册的时辰错开，先前替过夜的人该补哪一更休息，也要逐个问。掌事将两册放回张元照面前：“娘娘这张划掉了，那些人已经当过的值，不能一道划掉。”',
    '她原要再添一栏，掌事说两边都抄一遍，今夜又得留人。张元照放下笔，让原班册留下，只另列未补的几更，自己先对了半晚。到了月底仍有两人的歇没补上，她没有把这一页记作已毕。'
  ]},lives:{zhangyuanzhao:'轮休试行漏算交班后，重叠半刻之外还须核旧班、补欠休；月末仍有未了事项，没有因改过安排便记作完成。',gu:'复核张元照的轮休试行，看到改法以外还有旧班与欠休需要逐项善后。'}},
  {id:'zhang-power',chapter:'帘后朱笔',scene:'女史院 · 正月十二 · 女史院开始招人',people:['zhangyuanzhao','afu'],append:[
    '女史录取后，旧差并没有当日就补齐。张元照原让新任者白日学新册、晚间仍交原差，阿芙看过问：“两班写在一张纸上，就不算两班了？”',
    '我见张元照翻到章程末尾，那里只写了考核，没有写旧差交给谁。她没有将人再叫回来听一遍勉励，先请尚宫列出仍未有人接的差。能交的先交；一时交不了的，试任起日往后移，原俸仍照旧。',
    '几份已经发下的到任牌也得收回改日子。有人隔日来问为什么旁人先入院，张元照亲自答了，没有让阿芙替她说是尚宫局迟了。'
  ],lives:{zhangyuanzhao:'女史试任曾漏列旧差接替，让人兼两班；受提醒后延后未交清者的试任起日，保留原俸，并亲自解释已发到任牌的改动。'}},
  {id:'zhang-bias',chapter:'帘后朱笔',scene:'雪落永和宫，张元照只剩这一张纸没写',people:['zhangyuanzhao'],append:[
    '天亮时她将删过的几张也留在案上。有一张开头写“留副稿以备复核”，后来划去了。我问为什么划，她答：“写的是她想留它的缘故，容易读成已经准她留。”',
    '她没有把废纸烧掉：“这一句是臣妾写的。原稿和改稿都留着。”我叫裴景和分开收好。她拟的处分仍须我亲自核；我不能因为她肯认这一句偏向，就将最后的字交给她。'
  ],lives:{zhangyuanzhao:'拟沈氏处分时，删去容易将留稿动机写成合法授权的开头，连同自己写偏的废稿一起交存；最终裁断仍归御前。'}},
  {id:'shen-tea',chapter:'旧茶未凉',scene:'夏末 · 新茶第一次被人嫌难喝',people:['shen'],append:[
    '后来我见永和宫的茶盒旁多了一罐糖，问她也改喝甜的了？沈知微将糖罐推到另一只杯旁：“小满要的。臣妾这壶不加。”',
    '我伸手要添，她拦了一下，另给我取杯。甜的可以另泡，她没有为我们都嫌淡，就把自己这一壶重煮。'
  ],lives:{shen:'方小满要甜茶，她另备糖，却仍留下自己淡泡、不加糖的那一壶。'}},
  {id:'shen-no-answer',chapter:'凤座无人',scene:'四月夜 · 新茶不是为了翻旧案',people:['shen','zhangyuanzhao'],replace:[
    {from:'张元照笑了一下：“这个理由比‘旧茶有旧意’好懂。”',to:'张元照笑了一下：“那旧罐子还留着？”'},
    {from:'沈知微也笑：“你嫌宫里人说话绕？”',to:'沈知微答：“留着。别问里面还放什么，今夜不想翻。”'},
    {from:'“嫌。”她答得很快，“但现在学会了。有些话绕一圈，是因为直着说会伤人；有些只是因为大家都不想负责。”',to:'张元照没有再追问，把米糕吃完，问剩下一块能不能带走。沈知微说等她坐完再包，省得手里捏碎。'}
  ],lives:{shen:'疫后与张元照饮茶时，不愿再翻旧茶罐，直说今夜不想回答；相处仍能继续吃糕，不必由她先解释清楚。'}},
  {id:'shen-quiet',chapter:'长夜未央',scene:'永和宫的茶凉了两回',people:['shen','emperor'],append:[
    '临走前我说这些年叫她等得太久。沈知微没有接，先让宫人收起没有动过的酒壶。我等了一会儿，她才道：“这话臣妾听见了。今晚不想答。”',
    '她没有送到门口。我回养心殿，仍得自己将三份折子分开看，不能把永和宫没有争吵的一晚算作她已经原谅。'
  ],lives:{shen:'杨叙再提旧年的等待，她听见却不愿当夜回应，没有用安慰替他结束未了的责任。'}},
  {id:'hanzhang-game',chapter:'灯下弈',scene:'换灯的时候',people:['hanzhang','emperor'],append:[
    '我指着未收的棋盘，问含章还下不下。她将我方才落的那一枚拿回原处：“灯暗的时候陛下多走了一步。”',
    '我说她不是忙着看巧果熟不熟？她道：“果子看了，棋也没忘。”方小满将半枚巧果塞到她手里，催她吃完再数。含章真吃了，仍不肯让我将那一步留下。',
    '收棋时她把那枚黑子在指间转了一圈，问下一次能不能让她执黑。我答应了，她便将棋盒扣上，没有再问别的。'
  ],lives:{hanzhang:'七夕换灯后仍记得棋盘上的一步，肯吃方小满递来的巧果，也不因对手是皇帝便让棋。'}},
  {id:'hanzhang-ointment',chapter:'刃落宫门',scene:'重阳后第七日 · 换药时',people:['hanzhang'],append:[
    '霍素英后来在御前问她药膏用了多少，含章答只用了薄薄一层。霍素英伸手讨回药罐，她又不肯：“还没好，拿走做什么？”',
    '“昨日还叫人追出来说不用。”',
    '“昨日是昨日。”含章用左手将罐子移到身后，自己也笑了一下。霍素英说等她能抬手了再去射圃，她回道：“去坐一会儿。别一见我就递弓。”'
  ],lives:{hanzhang:'救驾伤后嘴上拒过霍素英的药膏，真用上又不肯还罐；愿去射圃坐，却说好暂不接弓。'}},
  {id:'hanzhang-window',chapter:'西华门外',scene:'六月闷热，珍妃一会儿开窗一会儿又关',people:['hanzhang','zhou','ning'],append:[
    '周清漪后来将那日下午的事说给我听：窗终于留了半扇，含章却嫌冰酪底下太甜，周清漪说是她自己只吃上面的冰。邵明贞把小匙递过去，叫她从底下搅一回。',
    '含章搅匀尝了，说还是甜。周清漪笑她难伺候，她将碗推过去：“你方才夸得好，剩下的归你。”周清漪还真吃了，没再叫厨房重做。',
    '她们说到后来错过一声传膳。含章先想起，催另两人走，自己却还要等热帕子凉些才肯放下。'
  ],lives:{hanzhang:'年长以后旧臂仍痛，也能在绮春宫嫌冰酪甜、同周清漪拌嘴，不将每次聚坐都变成查案。',zhou:'与含章、邵明贞闲坐时仍爱顶嘴，接过含章吃剩的冰酪，没为一场小争执重做整碗。'}},
  {id:'baopu-question',chapter:'刃落宫门',scene:'病未愈，她自己把牌子送出去',people:['baopu','emperor'],append:[
    '我起身以前，她又问那批旧香的案子。她不要太医院再说身子该怎么养，只问当年失踪的经手人找到没有。我说还没有查清。',
    '“那臣妾还等多久？”',
    '我给不了日子。她把系好的衣带又解开一点，说勒着疼。我让人传太医，她摇头：“臣妾问的不是这个。”我仍让太医来。她看着门口，没有再同我说话。'
  ],lives:{baopu:'再度小产后，向杨叙追问旧香经手人和查清之日，未得到确答；关于旧案的追问仍被接成养病。'}},
  {id:'baopu-accusation',chapter:'刃落宫门',scene:'她拿妹妹藏过的香丸去告妹妹',people:['baopu'],append:[
    '那张记过纸后来送到御前，顾明宜将问话一并记下。含章认下私留香丸，抱朴却没有就此收回其余话：“她迟报的也记了，旧香到底是谁动过的，什么时候能记？”',
    '顾明宜说两件事分开查。抱朴问：“若又查不出来呢？”顾明宜没有拿妹妹受罚来答她。抱朴带走自己的抄件，没有留下喝茶。'
  ],lives:{baopu:'将妹妹私留香丸之事告到凤仪宫，见妹妹受记过仍追问旧香加害者；一次处分未满足她对旧案的要求。'}},
  {id:'baopu-narrowing',chapter:'刃落宫门',scene:'母亲说“够了”',people:['baopu'],insertBefore:{from:'她先离席。',text:[
    '后来含章将那顿饭的话照实告诉我。离席前，抱朴将《承露录》收回袖中，说当年是御前命旧物复验，东西封好送回，她才敢继续用；如今再问，得到的总是养身子。',
    '含章提醒她，准复验和谁在香里添了东西，不是同一件事。抱朴没有接那个经手人的名字，只问：“那他为什么一句养着，我就还得等？”',
    '含章说自己也不能替我答。抱朴便将那册日期合上，不再向妹妹问御前的事。'
  ]},lives:{baopu:'母女争执后，将对复验、未结旧案和等待的怨恨集中到御前，未接受含章对命令与加害者的区分。'}},
  {id:'baopu-sleeve',chapter:'刃落宫门',scene:'九月二十七 · 昭氏忽然什么都不要了',people:['baopu'],append:[
    '方小满那晚来送剩下的栗糕，说起她伸手要替昭氏理袖口，被将针线拿了回去。昭氏说已经缝到一半，不要别人拆，仍笑含章重阳又穿青衣，也留了半块栗糕。',
    '我问怎么不用尚衣局的人，方小满只说她想自己做。我那时也只当她终于肯管一件小事，没有再问那件衣裳。'
  ],lives:{baopu:'停下求召后独自改袖，拒绝方小满代缝，仍与妹妹说衣色、留栗糕。御前当时未从这几件事看出行刺之意。'}},
  {id:'zhou-letter',chapter:'西华门外',scene:'三月初十 · 她这一次先问女儿要不要她',people:['zhou'],when:s=>s.flags?.v69PrincessFate==='estate',append:[
    '她拿到回信后，先问分院的屋子朝哪边。我说还没定，她已经要叫人将女儿的旧衣、妆匣与自己的箱子合装，话说到一半停了。',
    '“她的东西先问她。”周清漪把写好的装箱单分成两张，“臣妾只装自己的。”',
    '我问她嫌不嫌分两处麻烦。她仍嫌，却没有将两张单再并回去。外头的人来问带几套花器，她只报了自己那一份。'
  ],lives:{zhou:'女儿准同行而要求分院后，她一度仍想合装箱笼，随即分单，女儿的衣物与花器不再由她一道安排。'}},
  {id:'zhou-departure',chapter:'西华门外',scene:'离宫前后，绮春宫最后一次把旧日翻出来',people:['zhou','emperor'],when:s=>Boolean(s.flags?.v75ZhouBest),append:[
    '门外掌事问到封邑以后还替不替二公主收婚帖。周清漪先说放到她那边，随即改口：“直接交公主。别经臣妾的手。”',
    '我听见，没说她终于想明白了。她已经替女儿回过太多话，这一次只是把一张还没来的帖子留给女儿，往后仍得照这样做。她走到门槛又嫌送行的花枝扎得太密，让人拆开两枝带回绮春宫，并没有连这点脾气也收起来。'
  ],lives:{zhou:'随女儿离京前，将将来的婚帖交收也改回公主本人，不因同行就取回替女儿答话的权力。'}},
  {id:'zhou-alive',chapter:'西华门外',scene:'承熙十九年冬 · 西华门还在那里',people:['zhou'],when:s=>!s.flags?.v69ZhouDead&&!/^故/.test(String(s.ranks?.zhou||'')),replace:[
    {from:'周清漪的牌位仍在绮春宫旧祭册里。',to:s=>s.flags?.v74ZhouLeavesWithDaughter?'周清漪随二公主住在封邑，母女分院。':'周清漪仍住绮春宫，宫权已停。'}
  ],lives:{}},
  {id:'emperor-copy',chapter:'长枝渐高',scene:'五月末 · 他开始自己记得母后',people:['emperor','gu'],append:[
    '他誊到下一页，我认出一处小字，说那是顾明宜后来补的。他把纸转过来：“父皇，这个是儿臣方才写的。”',
    '我看了半天，承认认错。他笑了一下，将原册挪近些。我本想叫裴景和来辨字，最后自己跟着往下看了一页，给他找那一行的起头。',
    '两个人都把同一个名字看漏了，又倒回去找。那一页没查出什么大事，他只嫌我的袖子挡光，让我往旁边坐。我挪了椅子，坐到他抄完才走。'
  ],lives:{emperor:'与三皇子同看顾明宜旧册，认错孩子刚写的小字，承认后陪他找漏读的一行，坐到那页誊完。'}},
  {id:'emperor-summons',chapter:'长夜未央',scene:'八月夜 · 西暖阁只剩两份没核完的册子',people:['emperor','zhangyuanzhao'],append:s=>{
    const fate=s.flags?.v47DrunkSummons;
    if(fate==='respected')return ['两人退出去以前，我险些又叫张元照留一会儿，话到嘴边改成问下次清册何时送。她答了日子，仍与沈知微一同走。我没有另传一张不写事由的牌，夜里却还觉得西暖阁太静。'];
    if(fate==='official')return ['张元照退下前把下次核册的事由一并写明。我问是否以后都这样，她答：“宫务写在这里。陛下若想留人说话，另问就是。”七月那夜我们只在外殿看册，没有碰酒；我原以为守住这一步便够了，如今仍得另问她愿不愿意。我没有再留她。'];
    if(fate==='cold')return ['那页旧名已经对上，我仍没有问她七月为何不来。她也只答册子上的事，没有提我三日不再单独传召。公文照常送，夜里也能共同核册，那一点不快却没有因差事办完就算说开。'];
    if(fate==='punished')return ['核完以后，张元照等沈知微先拿好册子，才一同告退。我想单独问她一处空格，她将页码留给裴景和，说次日按册来回。七月那道禁足旨没有因为三日过完就消失；她不再独留西暖阁，我也没有听见她说不计较。'];
    return [];
  },lives:s=>({emperor:s.flags?.v47DrunkSummons==='punished'?'旧档所记七月禁足之后，张氏仍回宫务，却未重新单独留殿。':s.flags?.v47DrunkSummons==='cold'?'七月被拒后退开三日，后来公文与核册照常，那点不快却尚未说开。':s.flags?.v47DrunkSummons==='official'?'七月将召见改为外殿公事，后来仍须另问张氏是否愿陪坐，没有以她肯办事代作同意。':s.flags?.v47DrunkSummons==='respected'?'七月撤回私人传召，后来仍会想留张氏，却先问具体宫务，没有因她肯回来办事便默认她愿陪坐。':''})},
  {id:'emperor-last',chapter:'万家灯火',scene:'承熙二十二年冬至后第三夜 · 养心殿没有熄灯',people:['emperor'],when:s=>seenCharacter153(s,'emperor-copy'),append:[
    '眼前那一小片灯光挪了，我忽然想起顺谦抄册时嫌我袖子挡光，让我往旁边坐。我那日真挪过椅子；今夜想再挪，手却只在褥上动了一下。没有一句话能将旧旨和欠过的事一起收回。张元照仍坐着，我没有另求她答一句好。'
  ],lives:{}},
  {id:'ning-nuts',chapter:'长枝渐高',scene:'家宴席间，诸子女渐长',people:['ning'],append:[
    '四公主见邵明贞将松仁留下，问是不是不爱吃。邵明贞说不是，把那一粒放在手心：“这是你剥的，我留到饭后。”',
    '太后伸手要，邵明贞将小碟往回拿了些，自己又剥一粒奉过去。太后笑她连一粒松仁都要分，我在旁边也笑。她没辩，饭后仍吃了女儿给的那一粒，没混进宫女剥好的一碟里。'
  ],lives:{ning:'家宴里将女儿亲手剥的松仁另留到饭后，肯给太后再剥，也不把女儿那一粒混进现成的一碟。'}},
  {id:'ning-govern',chapter:'帘后朱笔',scene:'承熙十四年四月 · 凤仪宫先有了一位真正的新主人',people:['ning','zhangyuanzhao'],when:s=>Boolean(s.flags?.v74ShaoThenZhang)&&!s.flags?.v74ZhangSucceeded,append:[
    '月底，两边送来的复值册各有一处没接上。张元照那边问过本人愿否，接新差的时辰却未定；邵明贞这一边准了原差，仍有人到门前不肯进去。谁也不能只交一句自己的办法好用。',
    '我听她们回话，张元照先请尚宫核新差时辰，邵明贞则将自己签过的那张留在最上面，派人再问不愿入门的人。她没有因此把全部复值都交给张元照，月底仍亲自收下一轮回话。'
  ],lives:{ning:'受印后与张元照分试复值办法，两边都有未接上的事；她补问自己已签原差的宫人，仍亲自收后续回话。',zhangyuanzhao:'邵后掌印时分试复值办法，她问过本人愿否，却仍漏了新差衔接，须再请尚宫核时辰。'}},
  {id:'ning-seal',chapter:'帘后朱笔',scene:'三月二十八 · 凤印第二次离开凤仪宫',people:['ning'],when:s=>Boolean(s.flags?.v74ShaoThenZhang),insertBefore:{from:'尚宫局当场把未了宫务逐项交回御前。',text:[
    '邵明贞从匣下另取一张未了单，先报病后转差，再报春衣补领。她说其中一处还没问到本人，不许随印务记作已经交清。尚宫接下，仍在她原先签字的那页后面续写。',
    '我问那一份也交御前？她说须落印的交，已经答应替人补问的，她回景仁宫仍会问完。太后叫她吃了饭再走，她才问今日有没有松子糖，说这几夜喝药，嘴里总发苦。'
  ]},lives:{ning:'解印前另交未了单，原签与未问完的转差不抹掉；不再掌印后，仍将已答应的补问继续办完。'}}
];

function seenCharacter153(s,id){return Object.values(s.events151||{}).some(e=>e.revision153?.version===153&&e.revision153.scenes.includes(id));}
function characterRows153(chapter,step,s){
  return CHARACTER_REVISIONS_153.filter(r=>r.chapter===chapter?.title&&r.scene===step?.heading&&(!r.when||r.when(s)));
}
function characterText153(chapter,step,paragraphs,s=state){
  let out=paragraphs.slice();
  if(chapter?.title==='听雨轩有喜'&&step?.heading==='听雨轩落锁以后，阿芙还得选自己往哪走'&&s.flags?.fangInvestigation==='threeDays')out=out.map(p=>String(p)
    .replace('送药的人说奉了口谕，奴婢就接了。','送药的人是往日送药的，奴婢也核过方子，就接了。')
    .replace('奴婢到现在都不知道，那道假口谕最先是谁递到他们手里的。','奴婢到现在还不知道，那一回临时换班，最先是谁让他们换的。'));
  for(const row of characterRows153(chapter,step,s)){
    for(const edit of row.replace||[])out=out.map(p=>String(p).split(edit.from).join(typeof edit.to==='function'?edit.to(s):edit.to));
    for(const [kind,insert] of [['before',row.insertBefore],['after',row.insertAfter]])if(insert){
      const i=out.findIndex(p=>String(p).includes(insert.from));
      // Expand inside the original paragraph slot; artwork indices do not shift.
      if(i>=0)out[i]=kind==='before'?insert.text.join('<br><br>')+'<br><br>'+out[i]:out[i]+'<br><br>'+insert.text.join('<br><br>');
    }
    if(row.append)out.push(...(typeof row.append==='function'?row.append(s):row.append));
  }
  return out;
}
function characterRecord153(before){
  const chapter=CHAPTERS[before.chapterIndex],step={heading:before.heading};
  const rows=characterRows153(chapter,step,{...before,events151:state.events151});
  const lives={};
  for(const row of rows)for(const [key,body] of Object.entries(typeof row.lives==='function'?row.lives(before):row.lives||{}))if(body)(lives[key]??=[]).push(body);
  return rows.length?{version:153,scenes:rows.map(r=>r.id),lives}:null;
}
function characterLife153(key,s,chapter,ids){
  const done=new Set((s.chronicle||[]).filter(Boolean).map(c=>c.title));
  return Object.values(s.events151||{}).filter(e=>e.revision153?.version===153&&done.has(CHAPTERS[e.chapterIndex]?.title)&&(!chapter||CHAPTERS[e.chapterIndex]?.title===chapter)&&(!ids||e.revision153.scenes.some(id=>ids.includes(id))))
    .sort((a,b)=>a.chapterIndex-b.chapterIndex||a.sceneIndex-b.sceneIndex)
    .flatMap(e=>e.revision153.lives?.[key]||[]).join('');
}
if(GAME_CONFIG.testMode)globalThis.CharacterRevision153={rows:()=>CHARACTER_REVISIONS_153.map(r=>({id:r.id,chapter:r.chapter,scene:r.scene,people:r.people,conditional:Boolean(r.when)}))};
