(()=>{try{
  document.documentElement.dataset.build='v63';
  document.title='宫灯未眠 · 宫苑定景、人物支线与位分上限 v63';
  const CURRENT_TITLE=CHAPTERS[state.index]?.title;
  const CH=t=>CHAPTERS.find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));
  const ARR=(v,s)=>{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]};
  function wrap(c,q,tag,fn){const st=ST(c,q);if(!st||st[tag])return null;const old=st.text;st.text=s=>fn(ARR(old,s).map(String),s);st[tag]=true;return st}
  function prepend(c,q,tag,line){return wrap(c,q,tag,(xs,s)=>[typeof line==='function'?line(s):line,...xs])}
  function append(c,q,tag,line){return wrap(c,q,tag,(xs,s)=>[...xs,typeof line==='function'?line(s):line])}
  function insertAfter(c,q,step,tag){if(!c?.steps||c.steps.some(x=>x[tag]))return;const i=c.steps.findIndex(x=>(x.heading||'').includes(q));if(i<0)return;step[tag]=true;c.steps.splice(i+1,0,step)}
  const place=(name,body)=>`<span class="v63-place"><b>${name}</b>${body}</span>`;

  // ---------- 1. 固定宫苑：让同一地点每次出现都能被认出来 ----------
  const PLACE_DESC={
    '凤仪宫':'正殿朝南，丹陛比别处高两级；请安殿的椅子沿东西两侧排开，中间永远留出一条太宽的空道。东暖阁少熏香，只用梨木柜与素色帐幔。顾明宜从潜邸带来的一只白猫“雪团”常睡在暖阁矮柜下，正式请安时会被宫女抱去后窗。',
    '体元殿':'终选用的殿宇不算华丽，最刺眼的是亮。南窗透进来的天光正照在秀女站的位置上，御座与帘后反而在阴影里。三列青砖缝被礼官提前量过，裙摆落在哪一道缝上，都像已经替人分好了远近。',
    '养心殿':'前殿收折，西暖阁留人，东侧小书房放旧档。御案常有三种味道混在一起：朱砂、松烟墨和隔夜冷茶。窗下没有花，只有一只总被杨叙转到指根发热的白玉扳指；夜深以后，整座殿最先听见的往往不是说话，而是笔搁回青玉笔山的一声轻响。',
    '永和宫':'门内先是一方不大的天井，西窗下摆水仙，花总比别宫迟开几日。屋里木色深，旧书多，茶罐比首饰盒多。沈知微养着一只玳瑁猫“砚尾”，平日不理人，只爱趴在温过茶的炉边；她若一夜没碰茶，猫反而会在门边等。',
    '绮春宫':'窗纱常用月白与藕荷，家具不重，最显眼的是靠窗一架低矮花几和一只青羽鹦哥“青豆”。周清漪教它说过许多吉利话，它偏偏最先学会“都好”。后来谁在殿里说这两个字，宫女都会忍不住看它一眼。',
    '拾遗阁':'原是闲置旧院，梁高、窗大，冬天冷得快。闻人抱朴住进来后加了亮色毡毯和铜铃，含章却只在东窗添一张窄书案。姐妹俩的东西很少混在一起，只有院里那棵海棠谁也没划归哪一边。',
    '听雨轩':'院子只有一进，雨水落在青瓦上比别处响。葡萄架从西墙一路爬到窗前，夏天把半间屋遮成青色。方小满从花房救下的瘸腿狸猫后来也跟着住进来，阿芙叫它“小灰”，方小满嘴上说只是暂养，碗却一直摆在廊柱后。',
    '景仁宫':'屋内摆设极少挪动：一张榆木长案、两只对称花觚、一只磨白边的旧针线筐。邵明贞不喜欢香气压过人，常年只插一枝季节花。东西放歪半寸她会看见，却不一定马上伸手扶正。',
    '翊坤宫':'正屋宽而空，屏风旁没有古董架，反倒立着一张收弓的木架。霍素英把北地带来的小隼“青羽”养在外院鹰架上，雨天亲自去看脚绳有没有受潮；宫女怕它，她只说：“它又不爱你，离远点就是。”',
    '长春宫':'陈设最像江南旧宅：漆盒、细瓷、香囊都精，却从没有一样多到显摆。窗边一只白瓷鱼缸养两尾红鲤，崔静仪每天只喂一小撮，绝不让人多撒。方氏案以后，长春宫先停的是香，鱼缸却仍每日换水。',
    '景阳宫':'东配殿采光一般，张元照进来以后第一件事是把最里面那扇窗改成可以从内侧自己支开的。桌上少摆花瓶，多的是分开的巾、杯、笔和一叠方格纸。每天清晨有只麻雀落在窗沿啄米，宫女替它取过三个名字，她一个也不认：“没养。它自己来的。”',
    '御花园':'不是一片完整花海，而是一条条被宫墙、月门和假山切开的路。春天先闻湿土，夏天水榭边最凉，秋天桂香能一直飘到御道，冬天湖面结薄冰。人在这里说话最容易以为四下无人，也最容易在转过假山以后撞见另一个人。'
  };
  // 同步精简地图的地点文字，不增加地图节点。
  try{for(const spot of MAP_SPOTS||[]){if(PLACE_DESC[spot.name])spot.desc=PLACE_DESC[spot.name].replace(/<[^>]+>/g,'')}}catch(_e){}

  prepend(CH('宫门初定'),'请安不是一天学会的','v63FengyiPlace',place('凤仪宫 · 请安殿',PLACE_DESC['凤仪宫']));
  prepend(CH('御前终选'),'我亲临终选','v63TiyuanPlace',place('体元殿 · 殿选现场',PLACE_DESC['体元殿']));
  prepend(CH('承露录'),'她把一本册子带进养心殿','v63YangxinPlace',place('养心殿 · 西暖阁',PLACE_DESC['养心殿']));
  prepend(CH('宫门初定'),'永和宫的一壶茶','v63YonghePlace',place('永和宫',PLACE_DESC['永和宫']));
  prepend(CH('宫灯渐繁'),'绮春宫报双生','v63QichunPlace',place('绮春宫',PLACE_DESC['绮春宫']));
  prepend(CH('拾遗阁开门'),'入宫第一夜','v63ShiyiPlace',place('拾遗阁',PLACE_DESC['拾遗阁']));
  prepend(CH('一碟杏仁酥'),'听雨轩第一夜','v63TingyuPlace',place('听雨轩',PLACE_DESC['听雨轩']));
  prepend(CH('宫灯渐繁'),'三个世家女开始长出自己的位置','v63ThreePalaces',s=>[
    place('景仁宫 · 邵明贞',PLACE_DESC['景仁宫']),
    place('翊坤宫 · 霍素英',PLACE_DESC['翊坤宫']),
    place('长春宫 · 崔静仪',PLACE_DESC['长春宫'])
  ].join(''));
  prepend(CH('窗开半扇'),'新主子进宫第一件事','v63JingyangPlace',place('景阳宫东配殿',PLACE_DESC['景阳宫']));
  prepend(CH('宫门初定'),'正月里的人情','v63GardenPlace',place('御花园',PLACE_DESC['御花园']));

  // 宠物/活物不单独发“设定卡”，只在生活里反复出现。
  append(CH('宫门初定'),'凤仪宫的一叠册页','v63GuCat',`雪团从矮柜底下钻出来，尾巴扫过顾明宜裁得笔直的纸边。她下意识把纸扶正，随后才伸手把猫往旁边推：“别坐这里。”雪团没听，索性团在她脚边。她低头看了一会儿，终于没有再赶。`);
  append(CH('宫门初定'),'永和宫的一壶茶','v63ShenCat',`砚尾从炉边抬头，闻了闻我衣摆，又毫无兴趣地趴回去。沈知微看见，淡淡道：“它不认位分，只认谁身上暖。”`);
  append(CH('灯下弈'),'绮春宫报双生','v63ZhouParrot',`窗边的青豆忽然学着宫女的腔调叫了一声“都好”。周清漪抬头看它，笑意停了一瞬：“你倒比人学得快。”`);
  append(CH('一碟杏仁酥'),'听雨轩第一夜','v63FangCat',`门关上以后，小灰一瘸一拐从葡萄架底下钻进来，熟门熟路跳不上门槛，只能扒着木沿叫。方小满立刻蹲下去抱它。阿芙看着新换的宫装和她怀里一身灰毛，叹道：“主子第一夜就这样？”方小满把猫往怀里拢了拢：“门都关了。”`);

  // ---------- 2. 点名重写：秋疫第五日。先写人，再让办法从关系里长出来。 ----------
  const winter=CH('凤仪宫最后一冬');
  const fifth=ST(winter,'秋疫第五日');
  if(fifth&&!fifth.v63Rewrite){
    fifth.heading='秋疫第五日 · 太医院廊下的一处刮痕';
    fifth.cast=['hanzhang','zhangyuanzhao'];
    fifth.fx='rain'; fifth.narrative=true;
    fifth.text=s=>[
      `第五日午后刚停雨。太医院东值房潮得厉害，晒药的竹帘全收在廊下，湿艾草、陈醋和煎药的苦气混在一起。院里每隔一阵便有人快步穿过去，鞋底带着水，谁也没有心思抬头。`,
      `${courtTitle(s,'hanzhang')}坐在窗边核一张转院单。她没有从头看，只在“辰初”两个字上停住。纸面起了毛，下面还能看见被刮过的墨痕。`,
      `她把纸转向光。不是秘记，也不是有人故意做假——值房小吏很快承认，原先写的是“卯末”，交班时才发现自己记错，怕整张重抄来不及，便刮掉补成“辰初”。`,
      `含章没有罚他。她只是把那张纸留在手里，站到廊下等张元照。`,
      `张元照来的时候袖口还沾着一点药汁。她先看含章，再看那处刮痕：“改错了？”`,
      `“改对了。”含章说。`,
      `这回答让她停了一下。`,
      `含章把纸递过去：“所以才麻烦。若他今天改的是对的，明天有人改成错的，我们看见的都只是一张已经改好的纸。”`,
      `张元照低头摸了一下被刮薄的纸纤维。她原先做病册时，刻意把步骤压得很少。宫里人已经够累，一套办法若每走一步都要盖章签字，最后只会被人绕过去。她知道这一点，所以一直在删。`,
      `“你想再加一道复核。”她说。`,
      `“不是凡事都复核。”含章靠在廊柱边，右手无意识把袖口抚平，“转院、送药、换值。东西或人真正从一边交到另一边的时候，交出去的人认一个名字，接到的人也认一个名字。”`,
      `张元照没有立即点头。廊外有人抬着空药罐跑过，木屐踩进水洼，溅得两人裙角都湿了一点。她看着那道水痕，心里先算的是另一件事：多签一个名字，就多停一会儿；病人多起来以后，一会儿也可能很贵。`,
      `“会慢。”她终于说，“尤其夜里转院，人手最少。”`,
      `含章抬眼：“那就别让所有事都慢。只卡最容易把人弄丢的三处。”`,
      `张元照这才看她。她忽然明白，含章不是在和她争谁的方法更对。含章见过另一种坏法子——所有人都说“记得”，最后纸上只剩两个字：待核。`,
      `她蹲到廊边的小案前，把原来的表格往左挪出一指宽：“那这里加两格。交出、接入。不是抄两本，是让两边都留下自己的名字。”`,
      `含章也蹲下来：“太医院一份，尚宫局一份。”`,
      `“这个可以。”张元照拿笔，又停住，“但若两份不一样，先查哪里不一样，不先抓一个人问罪。否则他们以后只会想办法把两本抄得一样。”`,
      `含章看了她一息，唇角很轻地动了一下：“这才像你。”`,
      `第一份双册当晚就出了差异：一个宫女的送药时辰差了一刻。查到最后，只是接药的人先去扶了一个在廊下呕吐的孩子。没人受罚。含章把两册合上时，窗外已经彻底黑了。`,
      `她的手指在封皮“待核”一栏上停了一下。这一次，那两个字后面还有地方继续写。`
    ];
    fifth.choices=[{label:'让这套交接法先试三日',effects:{trust:{hanzhang:3,zhangyuanzhao:3},flags:{v49DoubleLedger:true,v63DoubleSign:true}},result:'三日后，两册并没有变得更漂亮，却多出了几处可以真正追下去的差异。张元照没有把它扩成所有宫务通例；含章也没有要求。她们只留下了最需要的三道签名。'}];
    fifth.v63Rewrite=true;
  }

  // ---------- 3. 可选人物小传：每次只留两三个人，切一个短暂的旁观视角 ----------
  function branch(heading,cast,intro,enterLabel,html,flag){return {heading,cast,fx:'candle',text:s=>[intro,`<span class="v63-branch"><b>人物小传 · 可选</b><small>进入后只看这一小段，不改变主线结果。</small></span>`],choices:[{label:enterLabel,effects:{flags:{[flag]:true}},result:typeof html==='function'?html(state):html},{label:'不进去，继续主线',effects:{},result:'御辇没有转弯。这一晚仍照原来的时辰过去。'}]}}

  insertAfter(CH('宫门初定'),'凤仪宫的一叠册页',branch(
    '支线 · 凤仪宫后窗那只白猫', ['gu','ruoxi'],
    `午后离凤仪宫还有一段空时辰。后窗半开，雪团从暖阁溜了出去。大公主追到廊下，顾明宜也跟了两步。`,
    '留下，看大公主眼里的皇后',
    `<div class="v63-branch"><b>大公主视角</b><br>大公主一直觉得母后什么都会。会记住她冬衣的尺寸，会知道三皇子弓房哪块瓦漏水，也会在她把字写歪时只把纸转正，不直接替她重写。可雪团钻进花盆底下以后，母后也会蹲下来，裙摆沾灰，叫了三声都叫不出来。<br><br>“它为什么不听母后的？”她问。<br><br>顾明宜怔了一下，竟笑了：“因为它是猫。”<br><br>“人就会听吗？”<br><br>这回母后没有马上答。她把手伸进花盆后面，被雪团轻轻拍了一爪，才说：“人也未必。”<br><br>大公主后来记得的不是答案，是顾明宜袖口那一点土。原来母后不是永远端坐在凤座上的人。她也有叫不动一只猫的时候。</div>`,
    'v63BranchGuCat'), 'v63BranchGu');

  insertAfter(CH('一碟杏仁酥'),'听雨轩第一夜',branch(
    '支线 · 小灰病了一晚', ['fang','afu'],
    `册封后的第一个秋雨夜，小灰忽然不肯吃东西。听雨轩没有惊动御前，只亮了一夜小灯。`,
    '听雨轩夜里，阿芙照料方小满',
    `<div class="v63-branch"><b>阿芙视角</b><br>阿芙最烦主子蹲在地上。以前在花房蹲就算了，如今穿着常在的衣裳也蹲，裙角拖在砖上，第二日又要她洗。<br><br>小灰不吃鱼，方小满就把鱼撕成更小的丝。阿芙说：“它又不是皇子。”<br><br>方小满头也没抬：“皇子不吃饭有太医。它没有。”<br><br>阿芙想笑，没笑出来。半夜猫终于舔了一口水，方小满整个人往墙上一靠，像刚从什么大事里活下来。</div>`,
    'v63BranchFangCat'), 'v63BranchFang');

  insertAfter(CH('宫灯渐繁'),'三个世家女开始长出自己的位置',branch(
    '支线 · 翊坤宫收隼', ['ke','liang2'],
    `一场骤雨把射圃冲空，梁素贞替人送回一卷弓弦，正撞见霍素英在外院收青羽。`,
    '进去，看梁素贞眼里的霍素英',
    s=>`<div class="v63-branch"><b>梁素贞视角</b><br>梁素贞原以为霍素英会喜欢别人说“军门女子都一样”。她从小听这种话听得太多——能骑马、能拉弓、脾气直，仿佛只要父兄在营里，女儿便是同一个模子。<br><br>青羽被雨惊得扑翅，霍素英没哄，只拿厚布罩住鹰眼，等它自己安静。梁素贞忍不住道：“娘娘不怕它啄？”<br><br>“怕。”霍素英说，“怕还伸手，和不怕不是一回事。”<br><br>梁素贞第一次听见她承认“怕”。<br><br>临走时霍素英把那卷弓弦还给她：“海边的东西你比我懂。别因为进了宫，就什么都来问我。”<br><br>那句话不像提携，反而让梁素贞松了一口气。她终于不用成为第二个霍氏。</div>`,
    'v63BranchHuo'), 'v63BranchHuo');

  insertAfter(CH('空宫点灯'),'长春宫收到一盒新茶',branch(
    '支线 · 长春宫鱼缸换水', ['hui','song2'],
    `宋文秀第一次去长春宫谢见面礼时，崔静仪正亲自把白瓷鱼缸里半盆旧水舀出来。`,
    '进去，看宋文秀眼里的崔静仪',
    `<div class="v63-branch"><b>宋文秀视角</b><br>宋文秀一直觉得崔静仪不像一个失势的人。她的盒带仍系得齐，茶仍泡得好，连鱼缸里的两尾红鲤都游得安稳。<br><br>“为什么只换一半水？”她问。<br><br>崔静仪道：“全换干净，鱼反而受不住。”<br><br>宋文秀下意识说：“可旧水若有问题呢？”<br><br>崔静仪抬眼看她。那一眼没有敌意，却让她忽然想起家里人这几个月反复说的那句话——崔家退了，宋家就该把整条路接过来。<br><br>崔静仪把最后一瓢水倒进去：“接一条路，比抢一张椅子危险。人坐满了会嫌挤，路被一家占满，大家一开始只会觉得方便。”<br><br>宋文秀回去以后，把原本准备呈上的“统一六宫转运”折子撕了第一页。</div>`,
    'v63BranchCuiSong'), 'v63BranchCuiSong');

  insertAfter(CH('窗开半扇'),'她第一次把一张表撕了',branch(
    '支线 · 景阳宫窗沿那只麻雀', ['zhangyuanzhao','shen'],
    `七月末，沈知微去景阳宫还一本借过的旧医案。屋里没有旁人说话，只有窗沿一只麻雀啄米。`,
    '进去，看和妃眼里的张元照',
    s=>`<div class="v63-branch"><b>沈知微视角</b><br>沈知微第一次注意到，张元照不是“爱整齐”。她桌上其实有不少乱东西：写一半的纸、用过的线、吃剩半块的点心。她只是把不能混的东西分开，把需要回头的地方空出来。<br><br>窗沿麻雀啄完米还不走。沈知微问：“养的？”<br><br>“不是。”${courtTitle(s,'zhangyuanzhao')}说，“它想来就来。”<br><br>“那为什么喂？”<br><br>“它来了。”<br><br>沈知微看了她一会儿，没有再问麻雀。<br><br>她没有把这句话说出口，只把医案推过去：“明日别开太大窗。要下雨。”<br><br>张元照抬头看了一眼天：“你怎么知道？”<br><br>“膝盖疼。”<br><br>张元照笑了：“这个我没法做成表。”</div>`,
    'v63BranchZhangSparrow'), 'v63BranchZhang');

  // ---------- 4. 重头戏之后留喘息：悲剧不连着悲剧冲刺 ----------
  const blade=CH('刃落宫门');
  if(blade&&!blade.steps.some(x=>(x.heading||'').includes('药味终于淡了一点'))){blade.steps.push({heading:'尾声 · 十月二十，药味终于淡了一点',cast:['emperor','peiyan','xielin'],fx:'sun',narrative:true,text:s=>[
    `<span class="v63-breath"><b>喘息</b>重阳后的第十日，养心殿第一次把西窗全推开。药味没有一下散干净，只是风进来以后终于能闻见院里晒过被褥的太阳味。</span>`,
    `谢绍庭照例先看门窗，看到那扇大开的西窗时脚步明显顿了一下。裴景和端来一碗很普通的阳春面，什么补药也没放。`,
    `我吃到一半，谢绍庭忽然道：“陛下，面要坨了。”`,
    `裴景和抬眼：“谢统领今日话很多。”`,
    `“一句。”`,
    `“比昨日多一句。”`,
    `我笑了一声，右肋立刻跟着疼，只好停。三个人都没再说话。窗外有人晾被子，竹竿敲到墙两次。那一刻没有案子，没有旧国，也没有谁必须立刻死。`
  ],choices:[{label:'把面吃完',effects:{bond:{peiyan:1,xielin:1},flags:{v63BreathAfterAttack:true}},result:''}]})}

  const fangCh=CH('听雨轩有喜');
  if(fangCh&&!fangCh.steps.some(x=>(x.heading||'').includes('小灰又回了花房'))){fangCh.steps.push({heading:'尾声 · 封院第五日，小灰又回了花房',cast:['afu','fang'],fx:'petal',narrative:true,text:s=>[
    `<span class="v63-breath"><b>喘息</b>听雨轩的门封了五日。第六日阿芙回来，只为取猫。</span>`,
    `小灰不肯进笼，最后是被阿芙裹在一件旧外衫里抱出去的。它一路叫，叫到御花园花房门口反而安静。`,
    `花房掌事认得它：“又回来了？”`,
    `阿芙道：“嗯。”`,
    `掌事没问方小满。只把廊下一个旧竹筐翻过来，垫了块晒暖的布。小灰钻进去，转了两圈便睡。`,
    `阿芙坐在台阶上看了一会儿。花房里有人正为第二日送哪盆海棠拌嘴，声音很吵。她忽然觉得吵一点也好。`
  ],choices:[{label:'继续',effects:{flags:{v63BreathAfterFang:true}},result:''}]})}

  if(winter&&!winter.steps.some(x=>(x.heading||'').includes('终于有人嫌粥太甜'))){winter.steps.push({heading:'尾声 · 腊月初八，终于有人嫌粥太甜',cast:['taihou','zhangyuanzhao','zhao2'],fx:'snow',narrative:true,text:s=>[
    `<span class="v63-breath"><b>喘息</b>最后一扇病院门开后的第七日，慈宁宫熬了腊八粥。没人敢说庆贺，只是把能来的人叫来吃一碗热的。</span>`,
    `四公主吃两口便皱脸：“太甜。”`,
    `太后立刻道：“嫌甜说明舌头好了。再吃两口。”`,
    `王静娴低头忍笑，还是没忍住。张元照手边没有病册，只有一只空碗。她下意识摸袖子找笔，摸了个空。`,
    `沈知微从旁边把一碟咸萝卜推过去：“今天别记。”`,
    `张元照看她一眼，真的没有去找纸。窗外晒着一排刚洗净的被面，风一吹，像许多面终于肯重新张开的帆。`
  ],choices:[{label:'吃完这一碗，再去看白诏',effects:{flags:{v63BreathAfterEpidemic:true}},result:''}]})}

  // ---------- 5. 位分上限：皇贵妃1、贵妃2、妃4、嫔6。 ----------
  const CAPS={'皇贵妃':1,'贵妃':2,'妃':4,'嫔':6};
  const RANK_ORDER_V63=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];
  function baseRank(v){v=String(v||'');if(/^故|^废|^未入宫|^待选|^待封/.test(v))return null;for(const r of [...RANK_ORDER_V63].reverse())if(v.endsWith(r)||v===r)return r;return null}
  function activeHarem(s=state){return Object.keys(s.ranks||{}).filter(k=>PEOPLE[k]&&baseRank(s.ranks[k])&&!/^故|^废/.test(String(s.ranks[k]||''))&&(!globalThis.v138Person||globalThis.v138Person(k,s).active))}
  function countRank(r,s=state){const n=activeHarem(s).filter(k=>baseRank(s.ranks[k])===r).length;return n+(r==='妃'&&s.index===17&&globalThis.v138Person&&!['妃','贵妃','皇贵妃','皇后'].includes(globalThis.v138Person('zhangyuanzhao',s).base)?1:0)}
  function nextRank(k,s=state){const r=baseRank(s.ranks?.[k]);const i=RANK_ORDER_V63.indexOf(r);return i>=0&&i<RANK_ORDER_V63.length-1?RANK_ORDER_V63[i+1]:null}
  function canAdvance(k,s=state){const nr=nextRank(k,s);if(!nr)return false;return !CAPS[nr]||countRank(nr,s)<CAPS[nr]}
  globalThis.V63_RANK_CAPS=CAPS;
  globalThis.v63RankCount=countRank;

  // 普通 promoteRank 先拦一次。
  const promoteBeforeV63=promoteRank;
  promoteRank=function(k){const nr=nextRank(k,state);if(nr&&CAPS[nr]&&countRank(nr,state)>=CAPS[nr]){state.flags.v63RankBlocked={k,target:nr,cap:CAPS[nr]};return false}return promoteBeforeV63(k)};

  // 所有 choice 效果再做一次保险：包括和妃的特殊“和贵妃/皇贵妃”和直接 effects.ranks。
  const applyBeforeV63=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const before={...(state.ranks||{})};
    let out=applyBeforeV63(c)||[];
    const blocked=[];
    for(const [r,cap] of Object.entries(CAPS)){
      let keys=activeHarem(state).filter(k=>baseRank(state.ranks[k])===r);
      while(keys.length>cap){
        const changed=keys.filter(k=>baseRank(before[k])!==r && before[k]!==undefined);
        const k=changed.length?changed[changed.length-1]:null;
        if(!k)break;
        state.ranks[k]=before[k];blocked.push([k,r,cap]);keys=activeHarem(state).filter(x=>baseRank(state.ranks[x])===r);
      }
    }
    if(state.flags?.v63RankBlocked){const b=state.flags.v63RankBlocked;blocked.push([b.k,b.target,b.cap]);delete state.flags.v63RankBlocked}
    if(blocked.length){
      const names=new Set(blocked.map(x=>PEOPLE[x[0]]?.name).filter(Boolean));
      out=out.filter(line=>![...names].some(n=>String(line).includes(n)&&/晋一级|→/.test(String(line))));
      for(const [k,r,cap] of blocked)out.push(`${PEOPLE[k]?.name||k}未晋：${r}位额最多${cap}人，当前已满。改按原位记功厚赏。`);
    }
    return out;
  };

  // 大封按钮文字也直接提示位额已满，避免玩家按完才知道。
  const snow=CH('雪尽宫门');
  if(snow){for(const st of snow.steps||[]){for(const c of st.choices||[]){if(!c.v55Promote)continue;const k=c.v55Promote;try{Object.defineProperty(c,'label',{configurable:true,enumerable:true,get(){const nr=nextRank(k,state);if(!nr)return '位分不再进，只加册赏';if(CAPS[nr]&&countRank(nr,state)>=CAPS[nr])return `${nr}位额已满：原位厚赏`;return `晋${courtTitle(state,k)}一级`;}})}catch(_e){}}}}

  // ---------- 6. 大封之后：把此刻宫里所有妃嫔、孩子列清楚，再给一场轻松日常 ----------
  function rosterHtml(s=state){
    const groups=Object.fromEntries(RANK_ORDER_V63.slice().reverse().map(r=>[r,[]]));
    for(const k of activeHarem(s)){const r=baseRank(s.ranks[k]);if(groups[r])groups[r].push(`${courtTitle(s,k)} ${PEOPLE[k]?.name||''}${PEOPLE[k]?.home?` · ${PEOPLE[k].home}`:''}`)}
    const rankRows=['皇贵妃','贵妃','妃','嫔','贵人','常在','答应'].map(r=>`<div class="rank-row"><div class="rank-name">${r}${CAPS[r]?`<small>定额 ${countRank(r,s)}/${CAPS[r]}</small>`:''}</div><div class="people">${groups[r]?.length?groups[r].join('　｜　'):'—'}</div></div>`).join('');
    const dead=new Set(s.flags?.v46ChildVictims||[]);
    const kids=[]; const gone=[];
    for(const [k,v] of Object.entries(CHILDREN||{})){
      if(k==='unborn')continue;
      const label=`${v.order||''}${v.name?` ${v.name}`:''}`.trim(); if(!label)continue;
      if(dead.has(k)||/薨|早夭|亡/.test(v.note||''))gone.push(label);else kids.push(label);
    }
    return `<section class="v63-roster"><h3>承熙十二年正月 · 大封后宫中名册</h3>${rankRows}<div class="kids"><b>现存皇嗣</b><br>${kids.length?kids.join('　｜　'):'—'}${gone.length?`<br><small>另册追记：${gone.join('、')}</small>`:''}</div><p style="margin:12px 0 0;color:#8b7b68;font-size:.82rem">位额铁律：皇贵妃一人、贵妃二人、妃四人、嫔六人；贵人以下不设此人数上限。皇后另列中宫，不占皇贵妃位额。</p></section>`;
  }
  if(snow&&!snow.steps.some(x=>(x.heading||'').includes('大封后宫中还有谁'))){
    const i=snow.steps.findIndex(x=>(x.heading||'').includes('大封六宫'));
    const rosterStep={heading:'第十四幕 · 大封后，宫中还有谁',cast:['taihou'],fx:'ink',narrative:true,text:s=>[
      `红旨宣完以后，我没有立刻离开慈宁宫。人名刚刚被重新排过一次，反而更应该在这一刻把宫里真正还有谁看清。`,
      rosterHtml(s),
      `太后看完那张名册，只说：“这才是你以后每天要见的人。别只在要封、要罚、要死的时候才想起她们。”`
    ],choices:[{label:'合上名册',effects:{flags:{v63RosterAfterSeal:true}},result:''}]};
    const breathStep={heading:'第十五幕 · 正月初七，新封号还没叫顺',cast:['zhao2','zhangyuanzhao','ke','zhou'],fx:'sun',narrative:true,text:s=>[
      `<span class="v63-breath"><b>喘息</b>第二日没有再宣旨。御花园暖亭摆了几盘冬果，谁想来便来，不按册页讲次序。</span>`,
      `一个小宫女迎面看见王静娴，嘴里先冒出旧称，硬生生咽回去，脸都憋红了。王静娴先笑：“慢慢叫。臣妾自己今早也差点答错。”`,
      `霍素英把一只橘子抛给周清漪。周清漪没接稳，橘子滚到张元照脚边。张元照弯腰捡起来，下意识看了一眼果皮有没有裂。`,
      `王静娴道：“张娘娘放心，这个不用登记去了哪里。”`,
      `张元照抬头：“我没想登记。”`,
      `“那就好。臣妾刚晋完位，不想第一天就被记成‘抢了周娘娘一只橘子’。”`,
      `几个人都笑了。亭外残雪从松枝上啪地掉下一块，惊得远处宫女回头。大封昨日像一座山，到了今日，先从一个叫错的称谓和一只滚远的橘子里慢慢落回日子。`
    ],choices:[{label:'进入疫后第一个春天',effects:{flags:{v63BreathAfterSeal:true}},result:''}]};
    if(i>=0)snow.steps.splice(i+1,0,rosterStep,breathStep);
  }

  // 大封场自身改成先去名册/喘息，不直接跳下一章。
  const grand=ST(snow,'第十三幕 · 大封六宫');if(grand?.choices?.[0])grand.choices[0].label='先看大封后的宫中名册';

  // ---------- 7. 少一点“杂务说明”：把两处最像办事流程的段落转成人物/空间戏 ----------
  const spring=ST(CH('凤座无人'),'春衣少了几个尺寸');
  if(spring&&!spring.v63Rewrite){spring.text=s=>[
    `三月，尚衣局把新春衣送进景仁宫试样。旧册夹在衣箱最上面，纸边已经卷了。邵明贞翻到一页时忽然不动。`,
    `那一行尺寸属于顾明宜。肩宽、袖长、冬衣要比常服多放半寸——全是很普通的数字。`,
    `王静娴站在旁边，也看见了。她没有先说安慰的话，只伸手把窗边被风吹起来的那页按住。`,
    `“娘娘打算划掉？”`,
    `邵明贞握着笔：“不划，明年还会有人照着做。”`,
    `“那写什么？”`,
    `她想了很久，只写一个“停”。`,
    `王静娴看着那个字：“比删好。”`,
    `“为什么？”`,
    `“删了像她从没穿过。”`,
    `邵明贞抬头。窗外正有人抖开一件新裁的春衫，浅色衣料在风里鼓了一下。她最终把笔递给王静娴：“把这句话写在旁边。”`
  ];spring.v63Rewrite=true}

  state.flags=state.flags||{};state.flags.v63Build=true;
  if(CURRENT_TITLE){const i=CHAPTERS.findIndex(x=>x.title===CURRENT_TITLE);if(i>=0)state.index=i}
  try{save()}catch(_e){};try{render()}catch(_e){}
  globalThis.V63_QA={build:'v63',rankCaps:CAPS,branches:CHAPTERS.flatMap(c=>c.steps||[]).filter(x=>(x.heading||'').startsWith('支线')).map(x=>x.heading),snowSteps:(snow?.steps||[]).map(x=>x.heading)};
}catch(e){console.error('v63 patch failed',e)}})();
