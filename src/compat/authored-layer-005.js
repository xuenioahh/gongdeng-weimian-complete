(()=>{
  try{
    document.documentElement.dataset.build='v30';

    // ===== v30 style: 诏书 / 档案 / 旁白 =====
    const style=document.createElement('style');
    style.textContent=`
      .doc-slip{display:block;margin:18px 0;padding:16px 19px;background:#f0e5cf;border:1px solid #c7ad77;border-left:5px solid #8f3a32;box-shadow:inset 0 0 22px #7f613015;font-size:.96rem;line-height:1.9}
      .doc-slip b{display:block;color:#7b332d;letter-spacing:.18em;margin-bottom:5px}
      .annal-fragment{display:block;margin:18px 0;padding:13px 17px;background:#202f2d;color:#eee6d6;border-left:4px solid #b79148;font-size:.91rem;line-height:1.8}
      .annal-fragment b{color:#dfc787;letter-spacing:.12em}
      .aside-whisper{display:block;margin:16px 0;padding:11px 15px;border-left:2px solid #978d79;color:#675f52;background:#f7f2e8;font-size:.93rem}
      .wound-note{display:block;margin:18px 0;padding:14px 17px;background:#f4e6e1;border:1px solid #d1a49c;color:#6d342f}
      .choices h2{font-size:1.04rem;line-height:1.65}
    `;
    document.head.appendChild(style);

    // ===== 新增一位不抢主线的宫中人物：陈常在 =====
    if(!PEOPLE.chen){
      PEOPLE.chen={name:'陈婉宁',title:'陈常在',age:'21岁',home:'延禧馆',noPortrait:true,portraitKind:'youngwoman',glyph:'陈',introducedAt:5,tags:['低位宫嫔','安静','家世普通'],bio:'潜邸末年入侍，家世寻常，平日几乎不抢话。她在承熙三年有孕，成为那几年宫里最普通、也最容易被忽略的一桩喜事。'};
    }
    INITIAL_STATE.ranks.chen=INITIAL_STATE.ranks.chen||'常在';
    INITIAL_STATE.bond.chen=INITIAL_STATE.bond.chen??26;
    INITIAL_STATE.trust.chen=INITIAL_STATE.trust.chen??38;
    state.ranks.chen=state.ranks.chen||'常在';
    state.bond.chen=state.bond.chen??26;
    state.trust.chen=state.trust.chen??38;
    if(!HAREM_KEYS.includes('chen'))HAREM_KEYS.push('chen');

    // ===== 1-5章：不改节奏，只补时代与因果的“路” =====
    function appendScene(ci,si,fn){
      const st=CHAPTERS?.[ci]?.steps?.[si]; if(!st||!st.text)return;
      const old=st.text;
      st.text=s=>{const arr=typeof old==='function'?old(s):old;return [...arr,...fn(s)];};
    }
    appendScene(0,0,s=>[
      `<span class="annal-fragment"><b>承熙元年 · 朝局</b>新帝即位不足百日，宗室封爵刚定，北军换防尚未完成。宫里的第一场家宴看起来只是吃饭，其实每一个座次、称谓和谁先开口，都在替新朝练习新的秩序。</span>`,
      `我那时还以为，所谓新朝，不过是把旧人放到新位置上。后来才知道，位置一换，人也会被迫长成另一个样子。`
    ]);
    appendScene(1,0,s=>[
      `<span class="annal-fragment"><b>蘅地处置</b>蘅国亡后，旧境暂设三州，王府旧属分批造册。两位王女入宫既是安置，也是人质意义上的政治安排。礼部把这句话写得很漂亮，只写“归附”。</span>`
    ]);
    appendScene(2,6,s=>[
      `春日长案之后，宫里第一次有人私下说，拾遗阁已经“不像战俘住的地方”。话从尚食局传到绣坊，又从绣坊传到凤仪宫。没有人承认自己最先说过。宫里的定论常常就是这样长出来的。`
    ]);
    appendScene(3,3,s=>[
      `<span class="aside-whisper">那一晚乐声很热闹。真正被人记住的却不全在席上：谁退了半步让开舞袖，谁替别人捡起掉下来的银扣，谁在笑声里只看了一眼御座。宫里的人最会从这些细枝末节里猜一整段故事。</span>`
    ]);
    appendScene(4,0,s=>[
      `旧后并不是忽然“被接进宫”的。她到京后先在驿馆住了三个多月。那三个月里，蘅地王府旧属的名册换了三版，旧臣有人归乡，有人留京候审，还有一批旁支女眷没有定去处。`,
      `她递过一封奏牍。没有求复国，也没有求旧号，只写三件事：两位女儿不得因旧国身份牵连；旧王府妇孺不连坐；准她与女儿按月通信。最后一行才写：若大晟一定要给她一个新身份，她可以进宫。`,
      `所以她入宫，不只是因为女儿在这里。她知道宫墙里离我更近，也离消息更近。她想保住旧人，想看着两个女儿，也想在有朝一日真正有机会时，亲眼看我付出代价。三件事并不矛盾。她就是带着这三件事进来的。`
    ]);

    // ===== 第六章：承熙三年至六年，填实三年空白，多线并行 =====
    CHAPTERS[5].date='承熙三年春至六年六月';
    CHAPTERS[5].theme='几年不是空白；恩宠、孩子、旧案与亡国余脉都在暗处慢慢发酵';
    CHAPTERS[5].steps=[
      {
        heading:'第一幕 · 承熙三年的春帘',cast:['baopu','hanzhang','wenheng','shen'],fx:'petal',narrative:true,
        text:s=>[
          `承熙三年三月，拾遗阁把冬帘拆下来。宫人踩木梯收厚毡，灰落进日光里。${courtTitle(s,'baopu')}站在廊下指挥人把海棠往外挪，嫌窗前太暗；${courtTitle(s,'hanzhang')}坐在另一头给一本棋谱换线装。`,
          `新朝已经第三年。朝里正在清旧军籍，蘅地也从“亡国”变成地图上的三个州。奏折里少见“蘅国”二字，改成“蘅州旧属”“归附户籍”。名字被改得比人快。`,
          `蘅嫔看那类奏折看得很慢。她进宫时换来的三项宽免已经兑现了两项，剩下的旧王府妇孺还在一批批放归。她偶尔问我名单，我有时给，有时不给。她从不因此失态。只是回去后，会在一张旧纸上多添一行名字。`,
          `那张纸后来越来越长。里面既有她想保的人，也有她觉得将来可能用得上的人。她没有停止做母亲，也没有停止做一个亡国之后仍想留下些什么的人。`
        ],choices:[{label:'继续',effects:{flags:{hengNetworkSeeded:true}},result:''}]
      },
      {
        heading:'第二幕 · 一桩很普通的喜脉',cast:['chen','gu','baopu'],fx:'ink',
        text:s=>[
          `五月，太医院报陈常在有喜。消息送到养心殿时，我正在批漕运折子，朱笔只停了一下。`,
          `陈常在家世普通，进宫后也一直普通。她不跳舞，不写诗，见驾时常紧张得把茶盏放反。这样的一个人有孕，宫里反而比谁都松快——因为这件喜事不像谁的野心，更像日子自己长出来的。`,
          `皇后照例呈上位分折。她先写了“有喜可酌晋一级”，又把“可”字圈了一下。`,
          `${courtTitle(s,'baopu')}来请安时正好看见太医院送出的喜脉簿。她笑着问：“陈常在连酸梅都不爱吃，怎么先有了？”`,
          `她说完自己也笑。笑声很亮。只是转身时，把手里那颗本来要吃的梅子放回了碟里。`,
          `这桩喜脉本身不重要。重要的是，六宫所有人都看见：一个并不受宠的人，也可能先有孩子。`,
          `位分折现在就在我面前。你要怎么写？`
        ],keyDecision:true,choices:[
          {label:'陈常在有喜，晋陈贵人',hint:'按常例只进一级',effects:{ranks:{chen:'贵人'},bond:{chen:2},trust:{gu:1},flags:{chenPregnant:true,chenPromoted:true}},result:'册印没有大办。陈贵人接旨时先问能不能仍住原来的延禧馆，皇后说可以。宫里只热闹了半日，很快又恢复平常。'},
          {label:'暂不晋位，只加月例与医药',hint:'把喜脉当喜脉，不把它立刻变成位分',effects:{trust:{gu:1},flags:{chenPregnant:true,chenPromoted:false}},result:'皇后在折上补了“暂不晋位”四字。陈常在没有怨言，只让宫女来谢恩。拾遗阁那边却有人议论了两日：原来有孕也未必就能往前走。'}
        ]
      },
      {
        heading:'第三幕 · 满月宴没有真正的主角',cast:['chen','baopu','wenheng','fang'],fx:'lantern',narrative:true,
        text:s=>[
          `承熙四年正月，陈氏平安生下一位公主。孩子满月时，宫里办了一场很小的宴。`,
          `公主大半时候在乳母怀里睡。真正忙的是大人：皇后核赏单，太后摸了摸孩子额头，方常在蹲在桌边拆一只做歪了的虎头鞋。`,
          `${courtTitle(s,'baopu')}来得最晚。她穿一身石榴红，进门先把整个宴席夸了一遍，又弯腰去逗孩子：“这么小，眼睛怎么这么亮？”`,
          `孩子突然抓住她垂下来的耳坠。满桌都笑。她也笑，笑得最响，任由乳母小心把耳坠从那只小手里解出来。`,
          `散席后，她一个人站在廊下把耳坠重新戴好。风很冷，她却没有立刻走。`,
          `蘅嫔从后面出来，给她披上一件外衣：“喜欢孩子？”`,
          `“谁不喜欢？”`,
          `她答得很快。母女都没再往下说。那天以后，《承露录》里第一次出现“请脉”两个字。`
        ],choices:[{label:'继续',effects:{bond:{baopu:1,wenheng:1},flags:{baopuHeirAnxietySeeded:true}},result:''}]
      },
      {
        heading:'第四幕 · 一次迟来的月事',cast:['baopu'],fx:'rain',narrative:true,
        text:s=>[
          `承熙四年春，昭氏有一次月事迟了七日。她没有声张，只让贴身宫女去找相熟的女医。`,
          `那七日里，她突然不再用压香药，也不喝酒。第六日晚我去拾遗阁，她穿得比往常素，甚至没戴旧银簪。`,
          `“今天怎么不香？”我问。`,
          `她靠过来笑：“偶尔也让陛下记一记臣妾本人。”`,
          `她说得妩媚，手指却在袖中掐着一截帕子。那晚她比任何一次都主动，也比任何一次都容易走神。`,
          `第八日清晨，结果出来。没有喜脉。`,
          `宫女把沾了药气的水盆端出去时，她正坐在镜前描眉。描到一半，手腕突然一歪，眉尾多了一道。她盯着镜子看了两息，笑出声：“画坏了。”`,
          `她让人洗掉，重画。整个上午没有发脾气。`,
          `下午，《承露录》多了一页：——“不是。”只有两个字。`
        ],choices:[{label:'继续',effects:{trust:{baopu:1},flags:{baopuFalsePregnancy:true}},result:''}]
      },
      {
        heading:'第五幕 · 秋册该挪谁的一把椅子',cast:['baopu','hanzhang','gu'],fx:'seal',
        text:s=>[
          `承熙四年秋，皇后送来例行考封名册。不是谁犯了大功，也不是谁立了大过，只是三年里有人承宠较多，有人资序已到。`,
          `皇后把昭氏与珍氏的名字各夹了一张纸。她没有替我选，只说：“依例都可议。若都不动，也说得过去。”`,
          `${courtTitle(s,'baopu')}已经听见风声。那日请安，她偏偏穿了新裁的绯色外袍，笑着问周嫔：“我若往前坐一格，姐姐可别嫌挤。”`,
          `${courtTitle(s,'hanzhang')}像没听见，回去后照旧去御书房还棋谱。`,
          `一把椅子向前半尺，宫里就会看见。你要让谁先动？`
        ],keyDecision:true,choices:[
          {get label(){return `准${courtTitle(state,'baopu')}照例晋一级`;},hint:'只升一级，不越序',effects:{flags:{advanceBaopuYear4:true}},result:s=>`${courtTitle(s,'baopu')}接旨后先把礼服拿到窗边看颜色，嫌不够亮，又让尚衣局换一条腰带。她笑着在凤仪宫多坐了半尺，仿佛这半尺本来就该属于她。`},
          {get label(){return `准${courtTitle(state,'hanzhang')}照例晋一级`;},hint:'只升一级，不因姐姐受宠而连带',effects:{flags:{advanceHanzhangYear4:true}},result:s=>`${courtTitle(s,'hanzhang')}接旨时只是把册书合好。昭氏当晚来找她，绕着新礼服看一圈，最后说：“你穿这个颜色像要去奔丧。”她们为此吵了一刻钟。第二日仍一起去请安。`},
          {label:'今年都不晋',hint:'恩宠与年资都不必自动变成位分',effects:{trust:{gu:1},flags:{year4NoPromotion:true}},result:'皇后把两张夹纸都抽掉。宫里议论几日便散。真正记住这件事的人，比表面上多。'}
        ]
      },
      {
        heading:'第六幕 · 永和宫第一次烧信',cast:['shen','fang'],fx:'candle',narrative:true,
        text:s=>[
          `同年冬，永和宫收到第一封无名信。和妃看完，只烧了前半张。`,
          `纸灰里留下一个“营”字。方常在来送点心时刚好撞见，嘴比脑子快：“这个字我认识。”`,
          `和妃把纸灰夹进火钳：“那你今日什么也没看见。”`,
          `方常在立刻点头，又忍不住问：“是谁的营？”`,
          `和妃看了她一眼。`,
          `“一个死人。”`,
          `那是沈氏旧案第一次从茶罐底露出边角。没有顺王，没有冤案两个字，只有一个军营、一张不肯烧完的纸，和一个被和妃记了十年的死人。`
        ],choices:[{label:'继续',effects:{flags:{shenLettersBegin:true}},result:''}]
      },
      {
        heading:'第七幕 · 蘅嫔开始问御前的路',cast:['wenheng','hanzhang','baopu'],fx:'mist',narrative:true,
        text:s=>[
          `承熙五年初，蘅嫔问含章一件很小的事：“养心殿夜里换值，是哪几班人？”`,
          `${courtTitle(s,'hanzhang')}抬头：“母亲问这个做什么？”`,
          `“你姐姐常见驾，我总要知道什么时辰递药、递衣，不会冲撞御前。”`,
          `理由完全说得通。`,
          `${courtTitle(s,'hanzhang')}没有答。`,
          `蘅嫔又说：“你在御书房借书，认得人比她多。”`,
          `“所以才不该替她问。”`,
          `昭氏在旁边笑：“别吵。我要真想知道，自己问裴总管。”`,
          `含章后来把母亲问过的东西记在一页纸上：值班、旧蘅地来京官员、礼部递信路线、太医院夜间出入。写满一页以后，她把纸夹进棋谱。`,
          `她没有告诉我。那时她还没有决定要站到哪一边。`
        ],choices:[{label:'继续',effects:{trust:{hanzhang:1},flags:{hanzhangSeesMotherNetwork:true}},result:''}]
      },
      {
        heading:'第八幕 · 《承露录》不是情书',cast:['baopu'],fx:'rain',narrative:true,
        text:s=>[
          `承熙五年雨季，昭氏把一本册子带进养心殿。`,
          `第一页记我喝哪种酒会皱眉，第二页记兵部折子送来时不要说笑，第三页记太后在场时最好少用浓香。往后越来越细，细到某个雨夜我什么时候放下书、某次留宿我说过几句话。`,
          `名字写在封皮内侧：《承露录》。`,
          `她站在灯下，衣料是最艳的海棠红，腰带却收得比平日紧。`,
          `“这是讨好人的功课？”`,
          `她笑得很漂亮：“臣妾总不能靠天赋吃一辈子。”`,
          `这话惹人笑。可她说完没有笑。`,
          `她不是在写风月。她是在把“如何不被忘记”拆成一条条可以练习的办法。`
        ],choices:[{label:'继续',effects:{flags:{sawChenglu:true}},result:''}]
      },
      {
        heading:'第九幕 · 第二次考封',cast:['baopu','hanzhang','gu'],fx:'seal',
        text:s=>[
          `承熙五年秋，皇后又送来考封折。她仍旧只列事实：昭氏承宠最多，珍氏资序已到；两人都没有必须晋的功，也没有必须压着不动的过。`,
          `宫里却早已替我选了答案。有人说昭氏“该到嫔位了”，也有人说含章“无宠而稳，更该给体面”。`,
          `皇后把那些议论都删掉，只留两张空白朱批。`,
          `这一次，你还要不要挪动她们的位置？`
        ],keyDecision:true,choices:[
          {get label(){return `准${courtTitle(state,'baopu')}再晋一级`;},hint:'仍只进一阶',effects:{flags:{advanceBaopuYear5:true}},result:s=>`${courtTitle(s,'baopu')}接旨那日开了两坛酒，请拾遗阁所有宫人都喝一杯。她自己只沾唇，转身就去问太医“这个位分若有孩子，乳母例银是不是也不同”。她越来越把位分与孩子绑在一起。`},
          {get label(){return `准${courtTitle(state,'hanzhang')}晋一级`;},hint:'仍只进一阶',effects:{flags:{advanceHanzhangYear4:true}},result:s=>`${courtTitle(s,'hanzhang')}没有设宴。宫女把新礼服送来，她摸了摸袖口料子，只问能不能把多出来的一份月例换成两套旧棋谱。昭氏笑她“不会享福”。`},
          {label:'仍不晋任何人',hint:'让位分继续停住',effects:{flags:{year5NoPromotion:true}},result:'两张折子原样退回。宫里表面照旧。昭氏当晚却把《承露录》又翻了一遍，把“位分”两个字圈了三次。'}
        ]
      },
      {
        heading:'第十幕 · 旧铜扣',cast:['shen'],fx:'snow',narrative:true,
        text:s=>[
          `承熙五年冬，永和宫收到第二件东西——一枚旧铜扣。`,
          `背面的营号与沈家兄长旧营一致。和妃把它放在茶盏边，一整晚没有碰茶。`,
          `第二日她去了宗人府旧档处，只问十年前一份军令的抄送日期。掌档官说档册残缺。`,
          `第三日，她什么也没查，照常来请安。`,
          `第四日，顺王府忽然派人来宫门递了一盒旧琴弦，说是太后从前赏过，府里清库时翻出来的。没有人知道这与铜扣有没有关系。`,
          `旧案没有一下子被掀开。它先像一条线，从信纸里露头，再从铜扣背面绕出来，最后碰到一个多年不进宫的王府。`
        ],choices:[{label:'继续',effects:{flags:{oldButton:true,shunwangSeeded:true}},result:''}]
      },
      {
        heading:'第十一幕 · 母亲递来一匣旧香',cast:['wenheng','baopu','hanzhang'],fx:'candle',narrative:true,
        text:s=>[
          `承熙六年初，蘅嫔留两个女儿吃饭。她拿出一匣旧香，亲手推到昭氏面前。`,
          `“以前嫌我香太重，现在又给我？”昭氏笑。`,
          `蘅嫔说：“喜欢会散，赏赐会换人。孩子若进宗谱，才真正握得住。”`,
          `这句话不是慈母劝女儿生子。是一个亡国之后仍在算未来的人在教女儿：恩宠可以变成血缘，血缘可以变成位置，位置或许能替旧人多留一点活路。`,
          `昭氏听懂了政治，却只记住了“握得住”三个字。`,
          `${courtTitle(s,'hanzhang')}坐在另一边，把一根鱼刺挑出碟子。蘅嫔转头又说：“你姐姐不爱记人。御前来往、太医院换值，你替她记。”`,
          `${courtTitle(s,'hanzhang')}答：“我不替她记这个。”`,
          `蘅嫔第一次冷下脸。`,
          `那顿饭以后，三个女人各自带走了不同的东西：昭氏带走旧香，含章带走戒心，蘅嫔带走一种越来越急的感觉——她的两个女儿正在脱离她能安排的轨道。`
        ],choices:[{label:'继续',effects:{flags:{wenhengPushesHeir:true,hanzhangResistsMother:true}},result:''}]
      },
      {
        heading:'第十二幕 · 两条暗线第一次擦肩',cast:['shen','hanzhang','peiyan'],fx:'ink',narrative:true,
        text:s=>[
          `三月，裴景和在核一份旧军籍时发现，沈家军令的抄送人曾在蘅地归附后进京任职。不是同谋的证据，只是同一个名字在两套互不相干的档案里出现。`,
          `和妃来确认名字时，含章正好把一本棋谱送还御书房。`,
          `两个人隔着案桌站了一会儿。`,
          `和妃问：“你也认得这个名字？”`,
          `含章答：“母亲问过。”`,
          `这四个字让和妃第一次真正看她。`,
          `两人没有交换档册。含章只记下那个同名旧吏，沈知微则把蘅地归附后的任官表又借了一遍。`,
          `含章回拾遗阁时走得很慢。第二日，她把那张抄有同名旧吏的纸带进御前，没有再压回书箱。`
        ],choices:[{label:'继续',effects:{flags:{shenHanzhangCrossed:true}},result:''}]
      },
      {
        heading:'第十三幕 · 六月喜脉',cast:['baopu','wenheng','hanzhang','gu'],fx:'seal',
        text:s=>[
          `六月，昭氏终于有喜。太医院报喜那刻，她没有先笑。她坐在床边，把手掌压在尚且平坦的小腹上，像怕一动就把消息碰碎。`,
          `蘅嫔站在廊下盯着人换防滑毡。含章把姐姐床边的棋盘移到外间。皇后则把晋位折送到我案前。`,
          `“有喜可酌晋一级，不越序。”皇后把这句旧例写得很清楚。她没有替我多说一个字。`,
          `昭氏已经知道有一张折子在养心殿。她没有来问。反而是傍晚让宫女送来一碗酸汤，附一句：“陛下若批得太晚，别空腹。”`,
          `你要不要让这场喜脉改变她的位分？`
        ],keyDecision:true,choices:[
          {get label(){return `照例晋${courtTitle(state,'baopu')}一级，行全礼`;},hint:'只进一阶，不越序',effects:{flags:{promoteBaopu:true,baopuPregnant:true,baopuPromotionStyle:'full'}},result:s=>`册礼定在三日后。${courtTitle(s,'baopu')}嫌新礼服腰封太紧，当着尚衣局的人让拆了重做，又说“孩子还没显怀，别先把我做成一只粽子”。整座拾遗阁笑了一上午。`},
          {get label(){return `照例晋${courtTitle(state,'baopu')}一级，免繁礼`;},hint:'只进一阶，把体力留给养胎',effects:{flags:{promoteBaopu:true,baopuPregnant:true,baopuPromotionStyle:'quiet'}},result:s=>`位分照晋，册礼从简。${courtTitle(s,'baopu')}嘴上说省事，晚间却让人把新礼服挂在灯下看了很久。蘅嫔替她把匣子收好。`},
          {label:'暂不晋位，只加恩赏与医药',hint:'喜脉不必自动换来位分',effects:{bond:{baopu:-1},trust:{gu:1},flags:{baopuPregnant:true,baopuPromotionStyle:'none'}},result:'位分没有动。昭氏接到赏单时笑着说“也好，省得改椅子”。宫人散后，她把那张赏单折得很整齐，塞进《承露录》最后一页。'}
        ]
      }
    ];

    // ===== 第七章：失子前让希望与旁支生活足够具体 =====
    CHAPTERS[6].theme='宫里越像在认真等待一个孩子，失去时越不像一件“剧情”';
    const old7=CHAPTERS[6].steps;
    CHAPTERS[6].steps=[
      old7[0],
      {
        heading:'第二幕 · 别人的孩子会长大',cast:['chen','baopu','fang'],fx:'lantern',narrative:true,
        text:s=>[
          `八月，陈氏所生的小公主过周岁。孩子会扶着桌沿站，抓什么都往嘴里塞。`,
          `${courtTitle(s,'baopu')}去得很早，送的是一对金铃。小公主一只手抓住铃，一只手又来扯她衣带。她索性蹲下来陪孩子玩了半刻钟。`,
          `方常在在旁边夸：“娘娘以后一定很会抱孩子。”`,
          `话一出口，她就知道自己说重了。`,
          `${courtTitle(s,'baopu')}却笑：“那当然。我什么不会？”`,
          `她说着站起来，腰有些酸，扶了一下桌角。陈氏赶紧让人搬椅子。那一瞬间谁都没有再提“以后”。`,
          `宫里的孩子不会因为别人的等待而停下长大。对昭氏而言，这正是最难受的地方。`
        ],choices:[{label:'继续',effects:{bond:{baopu:1,chen:1,fang:1}},result:''}]
      },
      old7[1],old7[2],old7[3],old7[4],old7[5],old7[6],old7[7],
      {
        heading:'第十幕 · 太医院案上的一行字',cast:['hanzhang','peiyan'],fx:'ink',narrative:true,
        text:s=>[
          `孩子没有保住后的第二日，太医院照例补写案册。纸面上只有几行：胎位、脉象、用药、时辰。昨夜四个时辰的哭声、热水和雪都被压成了很工整的字。`,
          `<span class="doc-slip"><b>太医院产案摘录</b>“腊月初八戌正腹痛，亥初破水，子后血行不止。所用催产方与原定方略有出入。经查，临时口谕来源待核。”</span>`,
          `${courtTitle(s,'hanzhang')}没有资格调整册卷，只站在案外把那句“来源待核”看了两遍。`,
          `她问裴景和：“这个‘待核’，会核多久？”`,
          `“看有没有人继续问。”`,
          `她沉默了。`,
          `这句话后来一直留在她心里。宫里许多真相不是没有写下来，只是写成“待核”以后，再也没人往下翻。`
        ],choices:[{label:'继续',effects:{trust:{hanzhang:2},flags:{hanzhangWantsTruth:true}},result:''}]
      },
      old7[8],old7[9],old7[10]
    ];

    // ===== 第八章：补足含章主动坦白的动机 =====
    CHAPTERS[7].theme='她把最后一页口供放上御案';
    const old8=CHAPTERS[7].steps;
    CHAPTERS[7].steps=[
      {
        heading:'第一幕 · 她开始把母亲问过的话记下来',cast:['hanzhang','wenheng'],fx:'mist',narrative:true,
        text:s=>[
          `【灯下旧局 · 含章的独立一幕】昭氏失子后的大半年，含章把母亲问过的问题写在棋谱最后。那时，这页棋谱还没有送到御前。`,
          `“养心殿夜值几班。”“太医院哪位医官能进内廷。”“蘅州来京的旧人住哪一处会馆。”`,
          `每一问都有合理解释。合在一起，却越来越不像单纯护女儿。`,
          `她没有把这张纸交给我。她先自己看了很久。`,
          `蘅嫔也感觉到她在退开。有一日问：“你现在连母亲的话都要防？”`,
          `含章答：“我只是不想替别人做自己不知道后果的事。”`,
          `蘅嫔第一次没有反驳。`
        ],choices:[{label:'继续',effects:{flags:{hanzhangMotiveBuilt:true}},result:''}]
      },
      old8[1],
      {
        heading:'第三幕 · 姐姐也来求她查一件事',cast:['baopu','hanzhang'],fx:'candle',narrative:true,
        text:s=>[
          `入冬前，昭氏来找含章。她没有谈失去的孩子，只问太医院那名改过值簿的医官现在在哪。`,
          `“你不是有御书房的路吗？”`,
          `“借书的路。”`,
          `“路就是路。”昭氏笑，“妹妹从小就比我会走。”`,
          `这句本来像夸人，落在含章耳里却很重。母亲让她记御前，姐姐让她查太医。所有人都默认她最适合站在影子里替别人看路。`,
          `她没有答应。`,
          `昭氏离开前说：“你总不能一辈子什么都不选。”`,
          `门合上后，含章在廊下站了很久。第二日，她把自己的那份旧国名册、母亲问过的官员名单和姐姐近半年的出入时辰一并送来，只说：“陛下自己看。”`
        ],choices:[{label:'继续',effects:{trust:{hanzhang:2},flags:{hanzhangPressedBySister:true}},result:''}]
      },
      {
        heading:'第四幕 · 沈案与蘅地名单碰在同一页',cast:['shen','hanzhang','peiyan'],fx:'ink',narrative:true,
        text:s=>[
          `裴景和核旧军籍时，把两份原本毫无关系的名单并到同一张案上：沈家军令的一名抄送人，后来曾负责蘅地归附户籍。`,
          `和妃来认营号，含章来还棋谱，两个人就这样第一次同时看见那个名字。`,
          `“你母亲问过他？”和妃问。`,
          `含章点头。`,
          `“为什么？”`,
          `“不知道。”`,
          `和妃把铜扣收回袖中：“那就别替她猜。”`,
          `一句很普通的话，却像替含章划出一条界线。她不必替母亲解释，也不必替姐姐收拾。她只需要决定自己知道什么、愿意说什么。`
        ],choices:[{label:'继续',effects:{trust:{shen:1,hanzhang:2},flags:{oldCaseCrossesWenren:true}},result:''}]
      },
      old8[2],old8[3],old8[4],
      {
        heading:'第八幕 · 她终于把“为什么是今晚”说清楚',cast:['hanzhang'],fx:'candle',narrative:true,
        text:s=>[
          `过去说完以后，她没有立刻谈忠诚。`,
          `“陛下若问臣为什么今晚才说——不是因为臣突然信陛下。”`,
          `我没出声。`,
          `“是因为母亲在借姐姐的恩宠留旧人，姐姐在拿孩子证明自己还有用，而我若继续什么都不说，就会变成她们两条路中间那根最好用的线。”`,
          `她抬眼。`,
          `“我不想再替谁活一次。”`,
          `她说完以后没有收回那几页纸。我让裴景和封档，她站在一旁，看着封条贴好才走。`
        ],choices:[{label:'继续',effects:{trust:{hanzhang:4},flags:{hanzhangChoiceExplicit:true}},result:''}]
      },
      {
        heading:'第九幕 · “这盘棋，是我自己坐的”',cast:['hanzhang'],fx:'seal',
        text:s=>[
          `白棋被围在中央，只剩一线活路。含章落下一子，把棋救活。`,
          `“这盘棋，是我自己坐的。”`,
          `她没有求位分。也没有求我替她与母亲、姐姐划清界线。`,
          `但从这一夜起，我若还让她只以“昭氏妹妹”的位置存在，便等于假装没有听懂她说的全部话。`,
          `你要不要把这份独立公开写进六宫册？`
        ],keyDecision:true,choices:[
          {label:s=>{const next=hanzhangNextTitle08(s);return next?`${courtTitle(s,'hanzhang')}晋${next}，明旨赐册`:`${courtTitle(s,'hanzhang')}位分已满，赐册并记查卷之权`;},hint:'只进一阶，不越序',effects:{flags:{promoteHanzhang:true,hanzhangAlliance:true,hanzhangRecordsAccess:true}},result:s=>{const next=hanzhangNextTitle08(s);return next?`册旨到时，${courtTitle(s,'hanzhang')}晋为${next}。她没有露喜色，只问册礼哪日。昭氏比她先笑，说“总算轮到你让尚衣局头疼”。蘅嫔没有笑。`:`册旨到时，位分已至上限，不再晋封。御前仍准她查阅指定案册；她没有露喜色，只问册礼哪日。`}},
          {label:'不晋位，只赐御前牌与有限查卷权',hint:'信任不自动变成位分',effects:{trust:{hanzhang:5},flags:{hanzhangAlliance:true,hanzhangRecordsAccess:true,hanzhangNoPromotionByChoice:true}},result:s=>`${courtTitle(s,'hanzhang')}接过御前牌，只问了一句：“查卷到什么边界？”这比问赏赐更像她。宫里因此更猜不透：没有晋位，却能进御前档房，究竟算什么恩宠。`}
        ]
      },
      old8[6],old8[7]
    ];

    // ===== 第九章：抱朴走向刺杀，原因层层推进，主控重伤，处罚分歧 =====
    CHAPTERS[8].theme='重阳灯最亮时，刀从袖中出来';
    CHAPTERS[8].steps=[
      {
        heading:'第一幕 · 她忽然比从前更艳',cast:['baopu'],fx:'petal',narrative:true,
        text:s=>[
          `承熙八年春，昭氏又经历一次极早的失子。那次没有产房，也没有哭声，太医院只写“月份浅”。`,
          `十日后她重新请安。所有人都以为她会素一些。她偏偏穿了最亮的石榴红，鬓边簪一整枝海棠，香气从殿门一路带进来。`,
          `周嫔笑着说：“妹妹气色倒好。”`,
          `昭氏抬手摸了摸鬓花：“不好也得让人先看见好。”`,
          `她坐下以后笑得比平日多，说话也比平日快。皇后几次想提醒声音轻些，最后都没开口。`,
          `那天散席，尚衣局宫女私下说昭氏“像把整个人点着了”。`,
          `她照旧穿最亮的衣裳，宴上笑得比从前更响。夜里牌匣来得少了，她就让宫女把灯再添一盏。`
        ],choices:[{label:'继续',effects:{flags:{baopuManicBrightness:true}},result:''}]
      },
      {
        heading:'第二幕 · 一场只有她自己当真的夜宴',cast:['baopu','fang'],fx:'lantern',narrative:true,
        text:s=>[
          `四月，她忽然在拾遗阁办了一场小宴。没有节令，也没有名目。她说海棠开得好，就该喝酒。`,
          `她亲自换了三套衣裳，最后选一身绛红软纱，袖口坠细铃。走一步便响一下。`,
          `方常在被拉来陪酒，喝两口便趴在桌上说“娘娘今天像要唱一整夜的戏”。`,
          `昭氏笑得伏在桌边：“那就唱。”`,
          `她真叫来乐师，自己起舞。舞到最后一段，铃声越来越急，她忽然停在正中，问满屋宫人：“好不好看？”`,
          `所有人都说好看。`,
          `她笑了一会儿，又问：“那为什么陛下没来？”`,
          `这一次没人敢答。`,
          `她把杯子喝空，还是笑：“我就问问。”`
        ],choices:[{label:'继续',effects:{bond:{baopu:-1,fang:1},flags:{baopuPrivateFeast:true}},result:''}]
      },
      {
        heading:'第三幕 · 病未愈，她自己把牌子送出去',cast:['baopu'],fx:'candle',narrative:true,
        text:s=>[
          `夏末，她再次小产。太医让静养二十日。第十二日，牌匣便被她自己送到御前。`,
          `我去时，她已经换好寝衣，唇色比平日重。床边没有压香药，却点了三盏灯，亮得不像夜里。`,
          `“太医让你歇着。”`,
          `“臣妾已经歇够了。”`,
          `她靠近时仍有从前那种香气。动作也仍熟练。只有手腕在发抖。`,
          `天将亮时，她背对我坐起，忽然问：“陛下，臣妾是不是越来越没用了？”`,
          `我没有答。她低头去系散开的衣带，第一回没有系上，又重新来了一次。`,
          `我让她下去歇着。她等了两息，像还在等别的话。没有等到。`
        ],choices:[{label:'继续',effects:{flags:{baopuBreaks:true}},result:''}]
      },
      {
        heading:'第四幕 · 她在门外等，妹妹从里面出来',cast:['baopu','hanzhang'],fx:'candle',narrative:true,
        text:s=>[
          `九月初，昭氏拿着《承露录》新补的一页去养心殿。裴景和让她稍候，说我正在看旧案。`,
          `她从一更等到二更。殿门开时，先出来的是含章。`,
          `含章手里没有香盒，没有寝衣，也没有任何侍寝后的东西。只有一卷盖着御前封签的案册。`,
          `昭氏看了那卷案册很久：“妹妹现在也会熬夜了。”`,
          `${courtTitle(s,'hanzhang')}答：“核档。”`,
          `“核到这个时辰？”`,
          `“陛下让我看完。”`,
          `昭氏笑了一下。`,
          `“当然不一样。”`,
          `她没有解释哪里不一样。可那晚回拾遗阁后，她把《承露录》摊开，撕掉了写香、衣色和侍寝规矩的十几页。`,
          `她把最后一页翻回来，在“陛下来过”四个字旁停了很久，随后把写香名的一栏整个涂黑。第二天，拾遗阁没有再送牌匣。`
        ],choices:[{label:'继续',effects:{trust:{baopu:-2,hanzhang:1},flags:{baopuSeesTrustGap:true}},result:''}]
      },
      {
        heading:'第五幕 · 母亲说“够了”',cast:['wenheng','baopu','hanzhang'],fx:'candle',narrative:true,
        text:s=>[
          `第五日，蘅嫔把两个女儿叫来吃饭。桌上只有清粥和蒸蛋。`,
          `她把《承露录》从昭氏袖中抽出来：“够了。”`,
          `昭氏笑：“什么够了？”`,
          `“求子、等牌、算谁来看你。都够了。”`,
          `昭氏脸上的笑慢慢消失。她把那只旧香匣推到母亲面前。`,
          `“当年是谁告诉我，喜欢会散，孩子进宗谱才握得住？”`,
          `蘅嫔没答。`,
          `“当年是谁让我问御前、记太医、让妹妹替我看路？”`,
          `蘅嫔的手第一次抖了一下。`,
          `昭氏站起来。碗被袖口碰倒，滚到桌边，没有碎。`,
          `“母亲现在说够了，是因为我没用了，还是因为妹妹更好用？”`,
          `${courtTitle(s,'hanzhang')}终于抬头：“姐姐。”`,
          `“别叫我。”`,
          `昭氏走后，蘅嫔把滚到桌边的碗扶正。含章没有动面前那碗已经凉透的粥。`
        ],choices:[{label:'继续',effects:{bond:{wenheng:-3,baopu:-2,hanzhang:-1},flags:{familyBreaks:true}},result:''}]
      },
      {
        heading:'第六幕 · 重阳宴',cast:['baopu','hanzhang','wenheng','gu'],fx:'lantern',narrative:true,
        text:s=>[
          `重阳宴设在西暖阁。宴本来很小，只请六宫高位和宗亲女眷。`,
          `昭氏来得比谁都早。她没穿最惯常的红，而选了一身近乎黑的深绛，腰间压金线，袖口重新缝过。香也变了，甜味少，木香更重。`,
          `皇后看见她袖口新线，问了一句：“衣裳坏了？”`,
          `“旧线松了，重新缝的。”`,
          `她答得自然，还转过手腕给人看。`,
          `宴到中段，她亲自替我斟酒，笑着讲陈氏小公主把糕捏碎的笑话。满桌都笑。`,
          `没有人知道她袖里多了一层夹层。`,
          `那一晚天气很好。酒过三巡，抱朴甚至替含章夹了一筷子菜。`
        ],choices:[{label:'继续',effects:{flags:{sleeveSeed:true}},result:''}]
      },
      {
        heading:'第七幕 · 刀光之后，血先落在地毯上',cast:['baopu','hanzhang','xielin'],fx:'ember',narrative:true,
        text:s=>[
          `散席后我从西暖阁回养心殿。昭氏追出来，说有一句话忘了讲。`,
          `她走得很快。袖口细铃已经拆掉，只剩衣料擦过廊柱的声音。`,
          `“陛下。”`,
          `我回头。`,
          `第一刀不是冲咽喉，是从袖里贴着肋下送进来。距离太近，谢绍庭来不及拔刀。我只觉得侧腹一热，下一瞬才看见深色龙袍迅速洇开。`,
          `昭氏也愣了一下。像她自己都没想到真的刺中了。`,
          `第二刀更快。含章从后侧撞过来，手臂先挡住刀锋。我抓住昭氏手腕时，血已经顺着指缝往下淌。`,
          `她忽然笑了。`,
          `不是宴席上的笑。是哭到没力气以后才会有的那种笑。`,
          `“陛下不是一直想看臣妾到底还能做到什么吗？”`,
          `她挣了一下，刀尖又往里送了半寸。谢绍庭这才一脚踢开她手腕。`,
          `我站不住，扶住廊柱。耳边所有声音一下远了。`,
          `<span class="wound-note">主控受创：刀伤入侧腹，失血严重。此后数月需要养伤，行动、召见与旧案处理都会受影响。</span>`,
          `地毯上第一滴血不是她的。是我的。`
        ],choices:[{label:'继续',effects:{trust:{hanzhang:5,xielin:3},flags:{emperorSeverelyWounded:true,hanzhangWounded:true,baopuAttemptedRegicide:true}},result:''}]
      },
      {
        heading:'第八幕 · 你还在流血，她已经被按在地上',cast:['baopu','hanzhang','xielin','peiyan'],fx:'seal',keyDecision:true,
        text:s=>[
          `谢绍庭的人把昭氏压在廊下。她鬓边珠花散了一地，额角蹭破，仍在喘着笑。`,
          `太医已经撕开我的外袍止血。裴景和跪在一旁问要不要立刻封宫。含章靠在墙边，右臂的血顺着袖口往下滴。`,
          `所有人都等一句话。`,
          `昭氏抬脸看我。`,
          `“陛下。”她声音轻下来，“这次总该记得臣妾了。”`,
          `我按着伤口，看着她。谢绍庭等我开口。`
        ],choices:[
          {label:'当场处死',effects:{flags:{baopuPunishment:'onsite',baopuDead:true},ranks:{baopu:'废妃'},trust:{wenheng:-8,hanzhang:-2}},result:'我按着伤口：“当场处死。”谢绍庭领旨而去。廊下渐渐静了下来。'},
          {label:'押下，朕亲审',effects:{flags:{baopuPunishment:'prison',baopuImprisoned:true},trust:{hanzhang:2}},result:'“押下。”昭氏被带走，转过宫门前回头看了一眼。'},
          {label:'交刑部，按大逆论',effects:{flags:{baopuPunishment:'extreme',baopuImprisoned:true},trust:{wenheng:-10,hanzhang:-4},bond:{taihou:-2}},result:'“交刑部，按大逆论。”裴景和伏身领旨，宗人府当夜封存昭氏册档。'}
        ]
      },
      {
        heading:'第九幕 · 三天里，养心殿闻起来只有药味',cast:['hanzhang','peiyan','taihou'],fx:'candle',narrative:true,
        text:s=>[
          `我醒来时已经是第二日午后。侧腹缠着厚布，稍一动便牵着疼。太医说刀再深一寸，结果未必如此。`,
          `太后坐在床边，没有训我，也没有问昭氏。她只把佛珠一颗一颗拨过去，过了很久说：“你父皇年轻时，也觉得刀只会从前朝来。”`,
          `含章伤得比我轻。她右臂缝了五针，第三日便想下床核口供，被我拦住。`,
          `她站在门口：“陛下若死了，姐姐这刀就算赢了。”`,
          `“朕没死。”`,
          `“所以臣才来。”`,
          `那是她挡刀以后第一次完整看我。没有哭，没有邀功。只确认我还活着。`
        ],choices:[{label:'继续',effects:{trust:{hanzhang:3,taihou:1},flags:{emperorConvalescing:true}},result:''}]
      },
      {
        heading:'第十幕 · 救驾有功，要不要写进位分',cast:['hanzhang','gu'],fx:'seal',
        text:s=>[
          `皇后把救驾赏格送到病榻前。金银、田庄、宫人都有定例。只有位分仍要我决定。`,
          `含章自己没有递折。她甚至让人传话：“臣做的是当时该做的事。”`,
          `皇后翻了两遍旧例：“护驾有功，可晋一级。若陛下不晋，也可厚赏。”`,
          `这一次，不是她自己求位置。是我是否要把那一刀公开记在她身上。`
        ],keyDecision:true,choices:[
          {get label(){return `救驾有功，晋${courtTitle(state,'hanzhang')}一级`;},hint:'仍只进一阶，不越序',effects:{flags:{promoteHanzhang:true,hanzhangSavedEmperor:true}},result:s=>`册旨下时，${courtTitle(s,'hanzhang')}右臂还不能抬高。她用左手接册，动作很慢。六宫终于把“她为何得位”与那一夜的血连在一起。`},
          {label:'不晋位，只厚赏并记救驾功',hint:'让功劳留下，但不把每一次功劳都换成位分',effects:{trust:{hanzhang:4},flags:{hanzhangSavedEmperor:true,hanzhangNoRescuePromotion:true}},result:'含章只受了赏。宫里反而议论得更久：挡刀都不晋，到底是皇帝薄情，还是两人之间根本不是位分能说明的关系。'}
        ]
      },
      {
        heading:'第十一幕 · 若她还活着，终于有最后一场问话',cast:['baopu','wenheng'],fx:'candle',narrative:true,
        text:s=>[
          state.flags.baopuPunishment==='onsite'
            ? `昭氏没有留下最后一场问话。她死在行刺当夜。三日调查只能从《承露录》、袖里夹层和宫人口供里拼她最后半年。没有一个人能确认，她究竟在何时从“想被记住”走到“想杀了我”。`
            : state.flags.baopuPunishment==='prison'
              ? `第三日晚，我让人把昭氏带到偏殿。她瘦得很快，没上妆，也没戴簪。我问她为什么。她答：“一开始想让陛下疼。后来想让这座宫里所有人都知道，臣妾不是只能等。”停了一会儿又说：“母亲要我生孩子，姐姐要我停，妹妹什么都不用做。臣妾最后只剩这一件事，是自己选的。”`
              : `刑部定案前，我没有再见昭氏。她只在供词末尾按了手印，承认无同谋。供词被送到病榻前时，最醒目的一句不是认罪，是：“此事一人所为，与母妹无涉。”她到最后才第一次替家里划出一道界线。`,
          state.flags.baopuPunishment==='prison'
            ? `我准蘅嫔见她一面。母女隔着一道木栅坐了很久。蘅嫔说“是我把你逼成这样”。昭氏摇头：“不是。母亲只是教我怎么活。是我后来只会这一种活法。”这是她们最后一次说话。`
            : `蘅嫔没有得到最后一面。她后来最不能原谅的，既有我，也有自己。`
        ],choices:[{label:'继续',effects:{flags:{baopuFinalAccount:true}},result:''}]
      },
      {
        heading:'第十二幕 · 处置落定',cast:['baopu','peiyan'],fx:'seal',narrative:true,
        text:s=>[
          state.flags.baopuPunishment==='onsite'
            ? `<span class="doc-slip"><b>内廷记</b>“昭氏行刺，当场伏诛。未及讯。”</span>`
            : state.flags.baopuPunishment==='prison'
              ? `<span class="doc-slip"><b>御前裁断</b>“废去妃位，赐死内廷，不示刑于市。”</span>`
              : `<span class="doc-slip"><b>刑部议</b>“以大逆论，处极刑。旨准。”</span>`,
          state.flags.baopuPunishment==='extreme'
            ? `行刑细节没有写进宫史。六宫只知道那日宫门比平常早关一个时辰，刑部的人来过两趟。行刑那日宫门早关一个时辰。刑部的人来过两趟，六宫没有人再提那道刑名。`
            : state.flags.baopuPunishment==='prison'
              ? `偏殿灯在第四日晚熄灭。裴景和抱回《承露录》。最后一页没有字，只压着一截从旧礼服上拆下来的红线。`
              : `重阳宴后的第二日，拾遗阁少了一整套妃位陈设。撤东西的人比哭的人多。`,
          `第二日请安时，昭氏的位置空了。有人低头，有人装作没看见，拾遗阁的帘子一直没有卷起来。`
        ],choices:[{label:'继续',effects:{flags:{baopuDead:true},ranks:{baopu:'废妃'}},result:''}]
      },
      {
        heading:'第十三幕 · 蘅嫔终于只剩一个女儿',cast:['wenheng','hanzhang'],fx:'ash',narrative:true,
        text:s=>[
          state.flags.baopuPunishment==='extreme'
            ? `死讯到拾遗阁时，蘅嫔先看到的是刑部抄本。她把纸看完，折成四折，放进火盆。火烧到“极刑”二字时，她伸手把纸按得更深。`
            : state.flags.baopuPunishment==='prison'
              ? `蘅嫔见过女儿最后一面。回宫后她没有哭，只把旧香匣打开，把剩下的香丸一颗颗倒进火里。每烧一颗，她都像在烧掉自己当年说过的一句话。`
              : `蘅嫔没有最后一面。她一遍遍问：“她最后说什么？”没人能答。没有答案比任何供词都更折磨人。`,
          `${courtTitle(s,'hanzhang')}站在帘外。右臂仍缠着白布。`,
          `蘅嫔问：“你呢？”`,
          `“我在。”`,
          `“你站哪边？”`,
          `${courtTitle(s,'hanzhang')}没有说“陛下”，也没有说“蘅国”。她只答：“我站我自己选的地方。”`,
          `蘅嫔回拾遗阁以后，把两个女儿小时候共用的那只旧木匣搬到桌上。抱朴的银扣放在左边，含章留下的旧书签放在右边。她坐了很久。`,
          `那个月她不再问蘅地旧人名单，也不再让人送含章来。火盆从早烧到晚，旧信一封封少下去。`
        ],choices:[{label:'继续',effects:{trust:{wenheng:-5,hanzhang:2},flags:{wenhengPurposeCollapsed:true}},result:''}]
      },
      {
        heading:'第十四幕 · 二十三日',cast:['wenheng','hanzhang','taihou'],fx:'ash',narrative:true,
        text:s=>[
          `昭氏死后二十三日，蘅嫔仍旧每天起身、梳头、请安。`,
          `她烧掉多年记下的御前换值、太医院名册和旧人地址。也给蘅地送出最后一封家书，只写：“往后各自过日子，不必等宫里。”`,
          `太后去看过她一次。两个人对坐喝茶。太后说：“活着的人总得过下去。”`,
          `蘅嫔笑得很淡：“臣妾活着，就是大晟给蘅国最后一块牌位。”`,
          `第二十三日晚，她请求见我。`,
          `她没有再穿旧国礼服。因为那套衣服早已烧了。她只把那支旧银簪放在桌上。`,
          `“陛下赢了。”`,
          `我说：“朕从未与你赌这个。”`,
          `“所以才是陛下赢。”`,
          `那夜她没有叫人守夜。次日清晨，宫女发现桌上的旧银簪已经擦净，压在最后一封家书上。她饮毒而亡。`,
          `最后一封家书只有几句，分别写给蘅地旧人和含章。没有解释她为什么死。`
        ],choices:[{label:'继续',effects:{flags:{wenhengDead:true},ranks:{wenheng:'故蘅嫔'}},result:''}]
      },
      {
        heading:'第十五幕 · 余烬',cast:['hanzhang','shen','gu'],fx:'ash',narrative:true,
        text:s=>[
          `闻人一家从此只剩含章。`,
          `她没有搬出宫，也没有请求改姓。只是把拾遗阁那只旧香匣送去烧掉，把母亲留下的一半名册交御前封存。`,
          `和妃来时没有安慰，只把一盏新茶放在她面前。`,
          `皇后按例问丧仪怎么办。翻到“亡国后妃”那页时，她停了很久，因为旧例里没有“亡国后妃又成大晟嫔妃，女儿还在本朝为嫔”的写法。`,
          `她最终把册子合上：“请陛下定。”`,
          `一个家毁掉以后，宫里最先发生的仍然是这些事：谁住哪间屋、谁收遗物、谁在丧仪上站哪一排。悲剧过去，规矩会立刻来收拾残局。`
        ],choices:[{label:'翻到下一章',effects:{flags:{wenrenArcClosed:true}},result:''}]
      }
    ];

    // ===== 第十章：沈氏旧案已铺垫三年，不再突然出现 =====
    CHAPTERS[9].title='旧茶未凉';
    CHAPTERS[9].date='承熙九年·春至夏';
    CHAPTERS[9].theme='旧案真正被翻开时，所有人都已经提前看见过它的边角';
    CHAPTERS[9].bridge=s=>`重阳行刺让我养伤数月。闻人一家的旧局刚散，沈家十年前的军令却已经沿着无名信、铜扣、旧军籍和顺王府的断弦，一步一步走到御案前。`;
    CHAPTERS[9].steps=[
      {
        heading:'小传 · 和妃眼中的顺王',cast:['shen','shunwang'],fx:'candle',narrative:true,
        text:s=>[
          `重阳案后，永和宫换了冬炭。沈知微清理茶柜时，从旧军籍里滑出半封信。另一半早已烧掉，留下的只有营号和落款日期。`,
          `十年前，她在顺王府的西廊等兄长回信。雨从檐角滴进来，顺王把自己的伞递给她，又叫人把通往军营的路引送到她手里。她那时觉得，他总能在别人开口以前看见难处。`,
          `兄长的军法文书送到京中，她拿着抄件去找他。顺王说已经递了复核，让她再等几日。他说这话时，手里还拿着那把旧琴，断了一根弦，却没有叫人换。`,
          `她等过那几日。复核没有回音，案子却结了。从此她想起顺王，先想到的仍是那把伞，随后才是那句“再等”。两件事都是真的，她没法只留下一件。`,
          `沈知微把半封信重新夹回军籍。外头宫人问要不要添茶，她答：“先不用。”明年若再见顺王，她要问的已经不是他为何没来，而是那道军令究竟在谁手里变了日期。`
        ],choices:[{label:'合上旧军籍，翻到次年春',effects:{flags:{shenRemembersShunwang:true}},result:''}]
      },
      {
        heading:'第一幕 · 伤还没好，宗室先来问安',cast:['shunwang','taihou','shen'],fx:'plum',narrative:true,
        text:s=>[
          `承熙九年二月，我的伤口已经结痂，骑马却仍会牵疼。按宗室礼，几位亲王轮流入宫问安。顺王因此多年后第一次跨进内廷。`,
          `他比记忆里瘦，进门时先看了一眼我扶着桌沿的手，没有问伤，只行礼：“臣弟请圣安。”`,
          `太后留他喝茶。和妃恰好来送新茶，在门外与他撞上。`,
          `两个人都停了一下。`,
          `没有谁说“好久不见”。沈知微与顺王隔着茶案坐下，谁都没有先说“好久不见”。`
        ],choices:[{label:'继续',effects:{flags:{shunwangReturnsByWound:true}},result:''}]
      },
      {
        heading:'第二幕 · 偏廊只说三句话',cast:['shen','shunwang'],fx:'candle',narrative:true,
        text:s=>[
          `散茶后，顺王与和妃在偏廊遇见。`,
          `和妃说：“你还留着那把琴？”`,
          `顺王说：“弦断了。”`,
          `和妃又问：“我兄长那道军令，你当年真的没有看出问题？”`,
          `顺王很久没说话。`,
          `最后只答：“看出了。”`,
          `三句话已经够了。因为承熙四年的半封信、五年的铜扣、七年的军籍都已经替这一刻说过前半段。`
        ],choices:[{label:'继续',effects:{trust:{shen:2,shunwang:1},flags:{shenShunConfront:true}},result:''}]
      },
      {
        heading:'第三幕 · 方常在捡到的断弦',cast:['fang','shunwang'],fx:'petal',narrative:true,
        text:s=>[
          `顺王等召见时，方常在从廊下捡到一截断弦。她以为是谁掉的首饰线，追了半条宫道才还回去。`,
          `顺王接过，只说：“不是贵重东西。”`,
          `“那为什么一直带着？”`,
          `他苦笑：“因为不能用了，才一直没扔。”`,
          `方常在没听懂。她把这句话带回听雨轩，晚上又讲给阿芙。`,
          `阿芙说：“不能用还留着，多占地方。”`,
          `方常在想想：“也是。”`,
          `方小满没再追问，只把断弦放回原处。沈知微后来自己把匣子收进柜里。`
        ],choices:[{label:'继续',effects:{flags:{brokenString:true}},result:''}]
      },
      {
        heading:'第四幕 · 三次转手的军令',cast:['shen','shunwang','peiyan'],fx:'ink',narrative:true,
        text:s=>[
          `裴景和把十年前的三份抄件并排放在御案：前线原令、京中转抄、最终军法文书。`,
          `日期差了一日。一个印章位置也不对。`,
          `沈家兄长并非真正“临阵脱逃”，而是在撤军命令被改写后，背了一个必须有人承担的罪名。`,
          `顺王当年是主将。他看出过日期不对，也递过一次复核。复核没有下文。`,
          `真正让我沉默的是另一份旧档。那份复核曾经到过我的案前。`,
          `<span class="doc-slip"><b>潜邸旧批</b>“军心新定，勿因一案再动旧部。照例结案。”</span>`,
          `字是我的。`,
          `我没有改军令。也没有杀沈家兄长。`,
          `但我当年知道有疑点，选择不查。因为夺嫡刚结束，军权正在重排，我需要一个已经结束的案子比需要一个真正的答案更多。`
        ],choices:[{label:'继续',effects:{flags:{emperorOldCaseResponsibility:true}},result:''}]
      },
      {
        heading:'第五幕 · 旧案现在由你亲自决定怎么查',cast:['shen','shunwang'],fx:'seal',keyDecision:true,
        text:s=>[
          `和妃站在案前，没有哭，也没有骂。`,
          `“臣妾只问一句：现在还要继续不查吗？”`,
          `顺王坐在另一侧，手里转着酒杯，没有替她求情，也没有替自己辩。`,
          `十年前我选择让案子结束。现在旧案重新回到手里。你要怎么开它？`
        ],choices:[
          {label:'明旨重审沈氏旧案',hint:'让大理寺、兵部、宗人府一起重查',effects:{trust:{shen:4},flags:{shenCaseMethod:'open'}},result:'明旨一出，朝堂马上有人反对。因为重审的不只是一个死人，而是十年前整个夺嫡余波中的军令系统。和妃听完只说：“这次别再停在半路。”'},
          {label:'密查旧档，暂不惊动朝堂',hint:'先把人证物证查实，再决定是否公开',effects:{trust:{shen:2,shunwang:2},flags:{shenCaseMethod:'secret'}},result:'没有公开诏书。裴景和带着御前牌去调旧档，顺王府也悄悄交出当年军报。宫里知道的人不超过五个。和妃对此并不满意，却接受了。'}
        ]
      },
      {
        heading:'第六幕 · 我与顺王单独谈了一次',cast:['shunwang'],fx:'candle',narrative:true,
        text:s=>[
          `那晚我留顺王到很迟。`,
          `“你当年为什么不再追？”`,
          `他低头转酒杯：“臣弟追过一次。第二次时，皇兄已经登基。”`,
          `“所以怕了？”`,
          `“不是。”`,
          `他抬头。`,
          `“因为臣弟知道，再追下去，最后要问的人不是军法司，是皇兄。”`,
          `顺王说完，屋里安静了一阵。`,
          `顺王说完便低头拨了一下桌沿。我没有接话，只让人把那份旧档重新摊开。`
        ],choices:[{label:'继续',effects:{trust:{shunwang:3},flags:{shunwangTellsTruth:true}},result:''}]
      },
      {
        heading:'第七幕 · 平反文书怎么写',cast:['shen','gu'],fx:'seal',keyDecision:true,
        text:s=>[
          `证据够了以后，真正难的是文书。`,
          `皇后拿来三种写法。第一种只改沈家兄长罪名，不追责任；第二种明写军令被篡改；第三种还要把当年御批一并收入附档。`,
          `她把第三份放得最远。`,
          `“若录御批，后世也会看到。”`,
          `我问：“你觉得不该？”`,
          `皇后迟疑很久：“臣妾只是……不知道旧例有没有这样写本朝皇帝过失的。”`,
          `她仍在找旧例替自己承担判断。`,
          `这一次，答案只能由我写。`
        ],choices:[
          {label:'昭雪沈知微兄长，并将当年御批一并入档',hint:'真相包括我自己的选择',effects:{trust:{shen:6,gu:-1},flags:{shenVerdict:'full'}},result:'文书送到永和宫时，和妃看了很久。最后她没有说“谢恩”，只把那壶泡了十年的旧茶倒掉。'},
          {label:'昭雪沈知微兄长，只更正军令与军法结论',hint:'给死者清白，不把御批公开写入正档',effects:{trust:{shen:3,gu:1},flags:{shenVerdict:'limited'}},result:'沈知微兄长得复清白，御批仍封在御前附档。和妃接旨时行了全礼。她得偿所愿，却也知道仍有一部分真相只在少数人手中。'}
        ]
      },
      {
        heading:'第八幕 · 顺王没有要任何补偿',cast:['shunwang','shen'],fx:'mist',narrative:true,
        text:s=>[
          `平反之后，顺王没有请求复职，也没有要回旧部。`,
          `他只递一封离京折，请去南边旧庄住几年。`,
          `和妃去送他。两人在宫门外没有私语很久。`,
          `顺王把那根断弦交给她：“留不住的东西，别再拿来勒自己。”`,
          `和妃接了，却没有哭。`,
          `“你也是。”`,
          `这是他们最后一次见面。`,
          `顺王离开永和宫时，沈知微没有送到门外。次日她照常请安，回来后让宫女换掉了茶罐。`
        ],choices:[{label:'继续',effects:{trust:{shen:3,shunwang:2},flags:{shunwangLeaves:true}},result:''}]
      },
      {
        heading:'第九幕 · 新茶',cast:['shen','hanzhang','fang'],fx:'petal',narrative:true,
        text:s=>[
          `顺王离京后的第三日，和妃第一次换掉旧茶。`,
          `方常在来送点心，喝了一口便说：“这个不苦。”`,
          `和妃笑：“以前那壶苦？”`,
          `“很苦呀。”`,
          `含章坐在窗边看卷宗，听见这句话抬了一下眼。`,
          `三个人都没有再提顺王。`,
          `下一次烧水时，永和宫用的是新茶。`
        ],choices:[{label:'继续',effects:{flags:{shenNewTea:true}},result:''}]
      },
      {
        heading:'第十幕 · 闻人局散了，沈氏旧案也落了地',cast:['shen','hanzhang','gu'],fx:'ink',narrative:true,
        text:s=>[
          `承熙九年夏，宫里第一次出现一种很奇怪的安静。`,
          `拾遗阁少了两个人，永和宫换了新茶。含章仍住原处，请安时照旧坐在自己的位置上。`,
          `皇后重新清了一次宫册。她把空出来的两处宫室圈上记号，又在旁边写“暂封”。`,
          `她写完以后看着那两个圈很久。`,
          `后宫从不会永远空着。旧人留下的位置，迟早会有新人来坐。`,
          `只是下一轮故事开始之前，方常在还会先把几条已经散开的线重新串到一起。`
        ],choices:[{label:'翻到下一章',effects:{flags:{shenArcSettled:true,hanzhangRemains:true}},result:''}]
      }
    ];

    // ===== 人物说明同步 =====
    PEOPLE.wenheng.bio='蘅国旧后。入宫既是被迫接受大晟对亡国的最终定义，也是她主动换取女儿安全、旧王府妇孺宽免与消息通道的一场政治交换。她既想做母亲，也没有真正放下旧国与复仇。';
    PEOPLE.baopu.bio='蘅国王女。明艳、张扬，擅长把自己变成全场最醒目的那一个。她把受宠当成可以训练的能力，把求子当成证明自己价值与旧国余脉仍有未来的办法；一次次失去后，风情没有消失，反而变得更用力、更危险。';
    PEOPLE.hanzhang.bio='蘅国王女。寡言、少饰，回答总慢半拍。母亲和姐姐开始各自托她问事以后，她把几份旧国名册亲手送进御前；此后仍很少多话。';

    // 春秋笔法跟随刺杀处置变化
    if(typeof annalFor==='function'){
      const before=annalFor;
      annalFor=function(i){
        if(i===8&&state.flags?.baopuDead){
          if(state.flags.baopuPunishment==='onsite')return '承熙八年重阳，昭氏持刃行刺，上重伤。昭氏当场伏诛。后妃闻人氏旋卒。——《大晟史·本纪》';
          if(state.flags.baopuPunishment==='extreme')return '承熙八年重阳，昭氏行刺，上重伤。诏以大逆论极刑。珍氏救驾有功。蘅嫔旋卒。——《大晟史·本纪》';
          if(state.flags.baopuPunishment==='prison')return '承熙八年重阳，昭氏行刺，上重伤。昭氏下内廷狱，寻废赐死。珍氏救驾有功。蘅嫔旋卒。——《大晟史·本纪》';
        }
        return before(i);
      };
    }

    // 更新当前旧存档缺失的人物数值
    if(state&&typeof save==='function') save();
    if(typeof render==='function')render();
  }catch(e){console.error('v30 patch failed',e)}
})();
