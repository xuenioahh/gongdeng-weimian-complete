(()=>{try{
  document.documentElement.dataset.build='v43';

  const v43Court=(k,s=state)=>{
    if(k==='gu')return '皇后';
    if(k==='shen')return '和妃';
    const t=(typeof courtTitle==='function'?courtTitle(s,k):'')||s?.ranks?.[k]||PEOPLE?.[k]?.title||PEOPLE?.[k]?.name||'某氏';
    if(['cao2','zhao2','lin2','ye2','du2','su2'].includes(k))return `${PEOPLE[k]?.name||'某氏'}${t?`（${t}）`:''}`;
    return t;
  };
  const v43AsArray=(x)=>Array.isArray(x)?x:(x==null?[]:[x]);
  const v43MetaLine=(x)=>typeof x==='string'&&/(?:class=["'](?:v40-thread|v41-thread|v41-thread-grid|v42-callback)["'])/.test(x);
  function v43RewriteLine(x,s){
    if(typeof x!=='string')return x;
    if(v43MetaLine(x))return null;
    if(x.includes('没有谁因为出身低、已经生过孩子，或不是新宠，就被系统预先排除'))return null;
    if(x.includes('她们的次序来自这一日的终选表现，每局会不同'))return x.replace('，每局会不同','');
    if(x.includes('闻人抱朴、闻人含章、闻人蘅不进入这一段通用孕事候选'))return `这一轮承宠册没有列拾遗阁三人的名字。含章本就不入寝，蘅嫔旧疾反复；昭氏近来请脉频繁，太医也让她少折腾。`;
    let y=x;
    y=y.replace(/我没有一一点名。裴景和按终选表现与家世回避规则随机留下了(\d+)人。/,'礼部按终选表现与家世回避排出次序，我在册尾圈留了$1人。');
    y=y.replace('真正危险的关系，很少一开始就像仇人。','散席前，崔静仪还替昭氏扶正了一支被风吹歪的珠钗。昭氏照着铜镜看了看，笑着说“妹妹眼睛倒尖”。两个人一道出了亭子。');
    y=y.replace('沈氏旧案从此有了第一块不靠回忆的实物。','和妃把那页军粮数抄在一张素纸上，折了两折，压到旧茶罐旁边。她没有递折，也没有对外说“翻案”两个字。');
    y=y.replace('这次失子并没有立刻把一家人推向决裂。它先给每个人留下一种不同的罪：蘅嫔的催逼，我的防备，崔氏家族的暗手，昭氏自己对价值的执念。几年以后，这些罪才会一起回到重阳那把刀上。','那几日拾遗阁里没有人互相指责。蘅嫔把求子用过的旧册收进柜底，我让裴景和重封香料库，昭氏醒着时很少说话。含章每天照旧把药碗放到床边，只是不再劝她喝快一点。');
    y=y.replace('也正因为如此，这条线不会看起来像突然有人替和妃送来答案。','霍素英把抄件重新塞回信封，封口按实，只留下一句：“若还要看，照规矩再来取。”');
    y=y.replace('三件事没有人在当天把它们连起来。后来回头看，却会发现：皇后开始怀疑制度、沈氏旧案开始有实物、昭氏开始把“熟悉的东西”重新抓紧，恰好发生在同一天。','那晚凤仪宫的灯亮到三更；永和宫多了一张折起的军粮抄页；拾遗阁则重新点起昭氏最熟悉的旧香。三处宫门各自关上，没有人去敲第二处。');
    y=y.replace('崔静仪顺着她的话问起花房梅雨天怎么晒种子，方小满讲了半天晒棚漏雨。说到最后，两个人都笑了，话题也就过去。','崔静仪顺着她的话问起花房梅雨天怎么晒种子，方小满讲了半天晒棚漏雨。说到最后，两个人都笑了，话题也就过去。');
    y=y.replace('后来很多证词之所以会落到她身上，正因为她从这时起就成了那个“哪里都去过一点”的人。','当晚回听雨轩，阿芙给她脚底的水泡挑破，笑她“做了主子还比宫女跑得勤”。方小满疼得直吸气，仍把三处配殿缺什么被褥一一说完。');
    y=y.replace('从花房宫女到顺贵人，史书最后只会写两三个名位变化。真正把她连起来的，却一直是同一种针脚、同一种看见别人有麻烦就顺手过去的习惯。','阿芙把那件旧短褂重新叠好，袖口朝里，放在小鞋和食盒下面。皇后等她收完才在清单末尾落笔。');
    y=y.replace('他们没有重新开始。那段旧事说清以后，也就停在那里。','顺王的车出了西华门以后，和妃回永和宫，让乐师把那支旧琴曲重新抄进常用曲单。她没有叫人弹，只让它留在那里。');
    y=y.replace('方小满把那几只礼盒一只只打开，阿芙在旁边记落款和送来的日子。','和妃把沈家已经合卷的匣子亲手锁上，将钥匙交给宫女，转身接过珍妃递来的轮值表。两个人一前一后出了永和宫。');
    y=y.replace('三样东西摆到同一张案上以后，','三样东西摆到同一张案上以后，');
    y=y.replace('悲剧没有让她们突然成为知己。只是让三个完全不同的人第一次愿意用同一张纸处理下一件事。','散席时，皇后留下新规底稿，和妃带走香方副本，珍妃把轮值表夹进案册。三个人从不同的宫门方向回去。');
    y=y.replace('<b>真正合上的第四条线</b>','<b>口供与银路</b>');
    return y;
  }

  // 正文只留人物正在经历的事；后期补丁中的“线索说明/写作说明”全部拿出正文。
  (CHAPTERS||[]).forEach(ch=>(ch.steps||[]).forEach(st=>{
    if(st.v43Cleaned)return;
    const old=st.text;
    if(old){st.text=s=>v43AsArray(typeof old==='function'?old(s):old).map(x=>v43RewriteLine(x,s)).filter(x=>x!==null&&x!=='');}
    st.v43Cleaned=true;
  }));

  // 章节题眼也改成叙事语言，不在正文上方解释“哪条线如何推进”。
  const v43Themes={
    '春闱入宫':'春门一开，家世、恩宠与旧账一同进了宫',
    '御前终选':'殿前一纸朱批，从此有人住进宫墙',
    '宫灯渐繁':'宫灯一年比一年多，旧事也一年比一年近',
    '香尽胎寒':'香还在烧，等的人却没有等到哭声',
    '灯下旧局':'有些话开口时，已经在心里压了很多年',
    '刃落宫门':'刀落下以前，许多事早已走到尽头',
    '旧茶未凉':'旧茶换了几回，旧名字终于写回原处',
    '听雨轩有喜':'雪落听雨轩，旧路与旧物都回来作证'
  };
  (CHAPTERS||[]).forEach(ch=>{if(v43Themes[ch.title])ch.theme=v43Themes[ch.title];});

  // ---------- 初封细节：留牌不等于嫔位；封号与位分必须以御前实际册命为准 ----------
  function v43FixResult(c){
    if(!c||c.v43ResultFixed)return;
    const old=c.result;
    if(typeof old==='function')c.result=s=>String(old(s)||'')
      .replace(/<span class=["']v40-zhou["']>[\s\S]*?<\/span>/g,'')
      .replaceAll('三人都留牌，初封嫔位。','三人都留牌。册页仍空着，封号与初位等我亲自落朱。')
      .replaceAll('三位世家嫔入宫','三位世家女入宫');
    else if(typeof old==='string')c.result=old
      .replace(/<span class=["']v40-zhou["']>[\s\S]*?<\/span>/g,'')
      .replaceAll('三人都留牌，初封嫔位。','三人都留牌。册页仍空着，封号与初位等我亲自落朱。')
      .replaceAll('三位世家嫔入宫','三位世家女入宫');
    c.v43ResultFixed=true;
  }
  (CHAPTERS||[]).forEach(ch=>(ch.steps||[]).forEach(st=>(st.choices||[]).forEach(v43FixResult)));

  // 终选问答结束时只留牌，不预设位分。
  (CHAPTERS||[]).forEach(ch=>(ch.steps||[]).forEach(st=>{
    if(!/亲临终选|殿前问答/.test(st.heading||''))return;
    (st.choices||[]).forEach(c=>v43FixResult(c));
  }));

  const years43=(CHAPTERS||[]).find(ch=>ch.title==='宫灯渐繁'||ch.title==='春闱入宫');
  function v43WrapStep(needle,fn){
    if(!years43?.steps)return;
    const st=years43.steps.find(x=>(x.heading||'').includes(needle));if(!st)return;
    const old=st.text;st.text=s=>fn(v43AsArray(typeof old==='function'?old(s):old),s,st);return st;
  }

  // 入宫后的称谓不再假定“徽嫔/晋嫔/元嫔”。
  v43WrapStep('新人入宫后的第一个月',(a,s)=>a.map(line=>{
    if(typeof line!=='string')return line;
    if(line.includes('新的绿头牌第一次摆满御案'))return `三月里，新的绿头牌第一次摆满御案。${v43Court('ning',s)}、${v43Court('ke',s)}、${v43Court('hui',s)}的册命已经分别送到景仁、翊坤、长春三处；低位新人隔几日才轮到一次。`;
    return line.replaceAll('元嫔',v43Court('hui',s)).replaceAll('徽嫔',v43Court('ning',s)).replaceAll('晋嫔',v43Court('ke',s));
  }));
  v43WrapStep('三个世家女开始长出自己的位置',(a,s)=>a.map(line=>typeof line==='string'?line
    .replaceAll('三位新嫔','三位世家女')
    .replaceAll('徽嫔',v43Court('ning',s)).replaceAll('晋嫔',v43Court('ke',s)).replaceAll('元嫔',v43Court('hui',s)):line));
  v43WrapStep('旧案从',(a,s)=>a.map(line=>typeof line==='string'?line.replaceAll('晋嫔',v43Court('ke',s)):line));

  // 霍氏、邵氏孕事标题与正文都按实际初封位分、封号走。
  (CHAPTERS||[]).forEach(ch=>(ch.steps||[]).forEach(st=>{
    const h=st.heading||'';
    if(/晋嫔有喜|霍氏有喜/.test(h)){
      st.heading=h.replace(/晋嫔有喜|霍氏有喜/,'霍氏有喜');
      const old=st.text;st.text=s=>v43AsArray(typeof old==='function'?old(s):old).map(line=>{
        if(typeof line!=='string')return line;
        if(line.includes('晋嫔初封便是嫔'))return `她入宫时的初位由我在终选亲定。如今有孕，按六宫常例也只能从${v43Court('ke',s)}所处的位次酌晋一级；册书已经拟好一半，余下一句由我来写。`;
        return line.replaceAll('晋嫔',v43Court('ke',s)).replaceAll('毅嫔',v43Court('ke',s)).replaceAll('晋贵人',v43Court('ke',s));
      });
    }
    if(/四皇子出生|五皇子出生|霍氏皇子出生/.test(h)){
      st.heading=h.replace(/四皇子出生|五皇子出生|霍氏皇子出生/,'霍氏生产');
      const old=st.text;st.text=s=>v43AsArray(typeof old==='function'?old(s):old).map(line=>typeof line==='string'?line.replaceAll('晋嫔',v43Court('ke',s)).replaceAll('毅嫔',v43Court('ke',s)):line);
    }
    if(/徽嫔也有了喜脉|邵氏也有了喜脉/.test(h)){
      st.heading=h.replace(/徽嫔也有了喜脉|邵氏也有了喜脉/,'邵氏有喜');
      const old=st.text;st.text=s=>v43AsArray(typeof old==='function'?old(s):old).map(line=>{
        if(typeof line!=='string')return line;
        if(line.includes('她初封嫔位'))return `她入宫时的册命是我亲手定下的。如今有孕，也只按她此刻的位次酌晋一级。太后没有替任何人开口。`;
        return line.replaceAll('徽嫔',v43Court('ning',s)).replaceAll('纯嫔',v43Court('ning',s)).replaceAll('徽贵人',v43Court('ning',s));
      });
    }
    if(/六公主满月|七公主满月|邵氏生产/.test(h)){
      st.heading=h.replace(/六公主满月|七公主满月|邵氏生产/,'邵氏生产之后');
      const old=st.text;st.text=s=>v43AsArray(typeof old==='function'?old(s):old).map(line=>typeof line==='string'?line.replaceAll('徽嫔',v43Court('ning',s)).replaceAll('纯嫔',v43Court('ning',s)):line);
    }
  }));


  // 霍氏与邵氏孕事恢复原有慢场景；只让位分与封号动态，不再用机制性三句话覆盖正文。
  const v43KePreg=v43FindStep('霍氏有喜');
  if(v43KePreg){
    v43KePreg.text=s=>[
      `入冬以后，${v43Court('ke',s)}报了喜脉。消息来得很安静——前一晚她还在射圃收弓，第二日太医便让人把弓架整个搬走。`,
      `她站在廊下看了半天。最后一张弓被宫人抱走时，她忽然伸手，把弓弦松了两寸：“别绷着。几个月没人用，弦会坏。”说完才肯让人拿走。`,
      `皇后免了她半月请安。她听见后只问：“半月以后还能来？”皇后正在核冬炭册，头也没抬：“先把这半月过完。”`,
      `第三日，和妃来翊坤宫。别人送燕窝、参片，她带来一册北营冬粮旧账，外面只裹了层青布。${v43Court('ke',s)}看见便笑：“娘娘来看孕妇，还带账？”`,
      `和妃把账搁在炕桌最远的一角：“你躺着也是躺着。”`,
      `两个人没有立刻谈沈家。先对了半页粮数，又为一个模糊营号争了几句。宫女进来换药时，和妃把账合上，等人出去才重新摊开。`,
      `皇后傍晚过来时正撞见这一幕。她看了看药碗，又看了看账：“太医若知道，大概要怪本宫。”${v43Court('ke',s)}答：“那娘娘别告诉他。”皇后没忍住笑了一下。`,
      `笑过以后，晋位册书仍摆到了养心殿。她入宫时的位分和封号是我在终选亲自定的；有孕可以成为晋位理由，却不能把原来的一级之差抹掉。若晋，只能从${v43Court('ke',s)}此刻所在的位次往前一步。`
    ];
  }
  const v43NingPreg=v43FindStep('邵氏有喜');
  if(v43NingPreg){
    v43NingPreg.text=s=>[
      `四皇子满月后的第二个月，${v43Court('ning',s)}也报了喜。`,
      `太后没有大张旗鼓，只叫慈宁宫的人去景仁宫看了一遍冰盆，又让厨房把寒凉的果子撤掉。赏赐反而到得很晚。`,
      `皇后亲自过去时，邵明贞正坐在窗边拆一只旧针线筐。那是她未入宫时的东西，竹篾边已经磨得发白，里面一团丝线缠得死紧。`,
      `“怎么自己拆？”皇后问。`,
      `“闲着也是闲着。”她把线团递过去，“娘娘帮我拽一下。”`,
      `皇后真的在她身边坐下。一个拽，一个慢慢挑线头。窗外有人换冰，两个人有一阵只听见竹帘碰窗框的声音。`,
      `线终于松开，邵明贞才道：“太后让我少管凤仪宫的事。”`,
      `皇后的手停了一下：“应该的。”`,
      `这三个字出得太快。邵明贞抬头看她，没有追问，只把刚理顺的丝线一圈圈绕回木轴。`,
      `临走前，皇后替她把窗再关严一扇。回凤仪宫以后，晋位折已经送到案上。她入宫时究竟是贵人还是嫔，是我在终选时亲手写下的；如今有孕，也只准按她现在的位次酌晋一级。太后没有替侄女开口。`
    ];
  }

  // ---------- 通用孕事：删除“周妃观察所有人”的机制；改为当事人、宫务承担者、母族/旧案相关人各自受影响 ----------
  function v43PregAfter(k,s,round){
    const t=v43Court(k,s);
    if(k==='gu')return `半月后，太医院在凤仪宫复了两次脉。皇后听完只把正在批的月例册合上，叫尚宫把三项宫务分出去。太后得信后没有立刻赏东西，只让人送来一只她幼时用过的软枕。邵明贞来请安时在门外站了一会儿，最后只说：“娘娘先把今天的药喝了，册子我拿走。”皇后没有推辞。`;
    if(k==='shen')return `喜脉报到永和宫那晚，案上还摊着霍家送来的旧军粮抄页。和妃让宫女先把安胎药放下，自己把那页数字抄完才净手。皇后免了她早请安，霍素英则托人送来一句：“旧簿不急着还。”和妃回道：“孩子归孩子，账归账。”`;
    if(k==='zhou')return `太医第二次确认喜脉后，绮春宫先把钦天监挡在门外。周清漪把承熙元年双生时的旧产案找出来，一页页看值夜名字。她对嬷嬷说：“这回先听太医，别先听什么吉凶。”宫人去收旧册时，她又叫住：“留着。谁进产房，照旧记。”`;
    if(k==='fang')return `阿芙听见“喜脉”时比方小满先红了眼。方小满却先低头看自己的手，像还在确认这双从前搬花盆、提炭筐的手是不是也能接一张皇嗣脉案。皇后亲自把听雨轩的炭例和夜值太医添了一份；方小满看完赏单，只问阿芙：“咱们以前那张出入单还在不在？”`;
    if(k==='ning')return `${t}报喜以后，慈宁宫与凤仪宫同日都派了人。太后的赏先到，皇后的医案后到。邵明贞把两份东西并在桌上，先叫宫女把最华贵的补品撤下，只留太医点过名的几样。皇后来时，她仍把旧针线筐推过去：“娘娘坐会儿，别替我算位分。”皇后坐下，却直到茶凉都没碰那张晋位折。`;
    if(k==='ke')return `${t}报喜后，北营贺礼第二日便到了宫门。霍素英让人把超例的礼单圈出来退回，自己仍把军粮旧簿压在枕边。和妃来看她，第一句不是道喜，而是问：“初七那一栏你看过没有？”霍素英把簿子递过去：“看过。等我能下床，再陪娘娘对一次。”`;
    if(k==='hui')return `${t}有喜后，崔家从江南送来的补品、细布和香料一并到京。她在长春宫亲自拆单，凡是崔家自己经手的香药全部退回，只留下太医院点名的药材。皇后看见退单，没有夸她谨慎，只问：“这些东西若不是你有孕，平日是谁验？”崔静仪答了三个名字。皇后让人一一记下。`;
    const home=PEOPLE[k]?.home||'配殿';
    return `${t}的喜脉写进太医院簿时，${home}里先静了半刻。她的家里不能直接递折，只能托尚宫局送进一只小匣。同住一宫的另一位低位宫嫔替她把门前脚踏擦干，嘴上说“怕你滑”，第二天请安时却悄悄换了座位。皇后把她的月例、乳母预备和太医值次单独列出，没有因为位分低少一项。`;
  }
  function v43NoPreg(s){return `冬月的承宠册照常翻过，没有谁因为“添嗣”被特意叫到御前。皇后把空白请脉页夹回册尾；永和宫继续对旧账，凤仪宫继续理新人月例，各宫灯火按原来的次序一盏盏熄下去。`;}

  (CHAPTERS||[]).forEach(ch=>(ch.steps||[]).forEach(st=>{
    const heirChoices=(st.choices||[]).filter(c=>c?.v40Heir);
    if(!heirChoices.length&&!((st.choices||[]).some(c=>c?.v40HeirSkip)))return;
    // 去掉正文里的系统解释，只保留这一季实际发生的宫务。
    const old=st.text;st.text=s=>v43AsArray(typeof old==='function'?old(s):old).map(x=>v43RewriteLine(x,s)).filter(Boolean);
    (st.choices||[]).forEach(c=>{
      if(c.v40Heir){const {round,key}=c.v40Heir;c.result=s=>v43PregAfter(key,s,round);c.hint=`承宠若成喜脉，位分仍不自动变化；之后另按常例请旨。`;}
      if(c.v40HeirSkip)c.result=s=>v43NoPreg(s);
    });
  }));

  // 随机皇嗣出生后，只写真正受影响的人，不再强行让周妃每次出场。
  function v43BirthAfter(k,s){
    const t=v43Court(k,s);
    if(k==='gu')return `凤仪宫报平安以后，皇后先让人去告诉三皇子，再让尚宫把当日积下的宫务送到偏殿。太后抱过孩子，只说“先养身子”。顾氏的贺表被压到第二日才呈。`;
    if(k==='shen')return `和妃醒来以后先问孩子，再问永和宫那只装旧军簿的匣子有没有挪地方。宫女说没有，她才闭眼睡过去。`;
    if(k==='zhou')return `孩子第一声哭出来时，周清漪没有问男女。她等太医把孩子抱到灯下看完手脚、眼睛和呼吸，才伸手接过去。钦天监的人一直等到第二日才被准入宫。`;
    if(k==='fang')return `阿芙守着产房门，把每一更进出的人都写在纸上。方小满醒后看到那张密密麻麻的名单，笑她“比皇后还会记”，阿芙却把纸折好收进柜里。`;
    if(k==='ke')return `北营的贺礼当天便到了，霍素英只留下合例的几件。和妃隔日来看孩子，顺手把那册旧军粮簿带来，放在离摇篮最远的桌角。`;
    if(k==='ning')return `太后把孩子抱去慈宁宫的次数渐多。皇后每回去都亲手看乳母记录，邵明贞则坐在一旁拆孩子袜带上的线头。两个人仍像旧亲，只是说到三皇子的课业时，皇后的话会比从前多一点。`;
    if(k==='hui')return `崔家的贺礼在宫门堆了半日。皇后按单退回超例部分，崔静仪自己又退了一批带香的衣料。那张退单最后和贡造验记一起归进长春宫档册。`;
    return `${t}产后，皇后让尚宫按同一套皇嗣例补齐乳母、月例和太医值次。同宫几位低位嫔妃轮流来坐一会儿，真正热闹的反而是那间平日最不起眼的配殿。`;
  }
  (CHAPTERS||[]).forEach(ch=>(ch.steps||[]).forEach(st=>{
    const h=st.heading||'';if(!/玉牒又添一笔|又一声婴啼/.test(h))return;
    const old=st.text;st.text=s=>{
      const base=v43AsArray(typeof old==='function'?old(s):old).map(x=>v43RewriteLine(x,s)).filter(Boolean);
      const round=h.includes('玉牒又添一笔')?1:2;const x=s.flags?.extraHeirs?.[round];
      if(x&&!x.skipped&&x.mother)base.push(v43BirthAfter(x.mother,s));
      return base;
    };
  }));

  // ---------- 把几个必须慢下来的旧场景重新加回“停顿”和物件 ----------
  function v43FindStep(needle){for(const ch of CHAPTERS||[]){const st=(ch.steps||[]).find(x=>(x.heading||'').includes(needle));if(st)return st;}return null;}
  function v43InsertDetails(needle,detailFn,marker){
    const st=v43FindStep(needle);if(!st||st[marker])return;const old=st.text;
    st.text=s=>detailFn(v43AsArray(typeof old==='function'?old(s):old).map(x=>v43RewriteLine(x,s)).filter(Boolean),s);
    st[marker]=true;
  }

  v43InsertDetails('永和宫只烧了半封信',(a,s)=>{
    const out=[];for(const line of a){
      if(typeof line==='string'&&line.startsWith('几个月后我才知道'))continue;
      out.push(line);
      if(typeof line==='string'&&line.includes('第二日阿芙来取')){
        out.push(`方小满走后，永和宫把门关得很早。和妃从旧茶罐底重新取出那半张纸，纸边已经被火舔得卷起，只剩“初四换防”四个字还完整，下面一个名字只露出末笔。`);
        out.push(`她把纸举到烛上。火舌刚碰到边角，她又把手收回来。指腹被烫红一小块，她没有叫宫女，只把纸重新折好，压回茶叶下面。`);
        out.push(`茶罐合上时发出一声很轻的瓷响。那半张纸在那里压了三年。`);
      }
    }return out;
  },'v43HalfLetter');

  v43InsertDetails('天亮前没有孩子哭',(a,s)=>{
    const out=[];for(const line of a){out.push(line);if(typeof line==='string'&&line.includes('空着的小襁褓')){
      out.push(`她的嘴唇动了一下，过了很久才问：“有人抱过吗？”`);
      out.push(`${v43Court('hanzhang',s)}站在床尾，手里那块干净布巾已经被攥出折痕：“我抱过。”`);
      out.push(`昭妃闭上眼，没有再问孩子像谁，也没有问太医为什么。她把手慢慢从被面上收回去，塞到枕下。`);
    }}return out;
  },'v43LossSlow');

  v43InsertDetails('一只小鞋被拿回听雨轩',(a,s)=>a.map(line=>typeof line==='string'?line.replace('很多年后，那只鞋还压在她箱底。她当时不知道，自己会用这种不起眼的方式，一次次从别人的故事里带走一点东西，再把它带进下一段命运。','方小满回听雨轩以后，把那只鞋用旧帕子包好，压在食盒下面。阿芙问为什么不放衣箱，她说：“衣箱总要翻，这个先别动。”'):line),'v43ShoeSlow');

  v43InsertDetails('“这盘棋，是我自己坐的”',(a,s)=>{
    const out=[];for(const line of a){
      if(typeof line==='string'&&line.includes('她没有求位分。也正因为没有求')){
        out.push(`她起身告退时，我没有立刻叫人撤棋。白子刚从死地里留出一口气，棋盘边还放着两份没写名字的册页。`);
        out.push(`她走到帘边，我才叫住她。她回身，没有跪，也没有问赏。裴景和把朱笔放到我手边，屋里只剩灯芯轻响。`);
        continue;
      }
      out.push(line);
    }return out;
  },'v43HanzhangSlow');

  v43InsertDetails('顺王自己选择离开',(a,s)=>a.map(line=>typeof line==='string'?line.replace('他们没有重新开始。那段旧事说清以后，也就停在那里。','顺王的车出了西华门以后，和妃回永和宫，让乐师把那支旧琴曲重新抄进常用曲单。她没有叫人弹，只把曲单合上，压在茶盘下面。'):line),'v43ShunSlow');

  v43InsertDetails('药还是进来了',(a,s)=>{
    const out=[];
    for(const line of a){
      if(typeof line==='string'&&(line.startsWith('听雨轩的人后来反复问')||line.startsWith('她从前做宫女时学会的是')||line.includes('宫里真正危险的东西')))continue;
      out.push(line);
      if(typeof line==='string'&&line.includes('她床边还压着前两日那道旨意')){
        out.push(`方小满接碗前还是照旧看了封签，又看了一眼送药人的腰牌。她的拇指在蜡印边缘摸了一圈，动作和从前在花房接内务府物料时一模一样。`);
        out.push(`阿芙还想再问，方小满却先低声道：“别让人一直等着回话。”她把碗接过去，放到鼻下闻了闻。药味和前两日没有明显不同。`);
      }
    }
    return out;
  },'v43PoisonSlow');

  v43InsertDetails('雪落宫墙',(a,s)=>a.map(line=>typeof line==='string'&&line.includes('我第一次发现，“先做哪件事”')?`谢绍庭站在雪里等令，身后的人已经牵来马；听雨轩那边也有人一路跑来，鞋底带着雪水。两边都在等我先叫出一个方向。`:line),'v43SnowSlow');

  // 方氏旧籍场景删掉作者总结，留皇后实际如何改记录。
  v43InsertDetails('宫女旧籍也被送上御案',(a,s)=>a.filter(line=>!(typeof line==='string'&&/这条线与昭氏旧香案真正合上/.test(line))),'v43FangRecord');

  // 旧存档无需重置；只改叙事、称谓和反应。
  if(!state.flags?.v43Migrated)state.flags.v43Migrated=true;
  try{save();render()}catch(_e){}
}catch(e){console.error('v43 rank/detail patch failed',e)}})();
