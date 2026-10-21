(()=>{try{
  document.documentElement.dataset.build='v41';

  // ---------- 住处：人数增加后，人物页与地图必须同步 ----------
  const V41_LOW_HOMES=['咸福宫西配殿','钟粹宫东配殿','景阳宫后殿','咸福宫东配殿','钟粹宫西配殿'];
  function v41SyncHomes(s=state){
    if(PEOPLE.zhou)PEOPLE.zhou.home='绮春宫';
    if(PEOPLE.ning)PEOPLE.ning.home='景仁宫';
    if(PEOPLE.ke)PEOPLE.ke.home='翊坤宫';
    if(PEOPLE.hui)PEOPLE.hui.home='长春宫';
    (s.flags?.lowConsorts||[]).forEach((k,i)=>{if(PEOPLE[k])PEOPLE[k].home=V41_LOW_HOMES[i]||'景阳宫后殿'});
    ['cao2','zhao2','lin2','ye2','du2','su2'].forEach(k=>{if(PEOPLE[k]&&!(s.flags?.lowConsorts||[]).includes(k))PEOPLE[k].home='储秀宫'});
    if(PEOPLE.wenheng){
      if(s.flags?.wenhengFate==='west')PEOPLE.wenheng.home='西苑静居';
      else if(s.flags?.wenhengFate==='return')PEOPLE.wenheng.home='蘅地旧陵别院';
      else if((s.ranks?.wenheng||'').includes('蘅嫔'))PEOPLE.wenheng.home=s.flags?.wenhengHome==='cining'?'慈宁宫西偏院':s.flags?.wenhengHome==='west'?'西宫独院':'拾遗阁';
    }
  }
  v41SyncHomes();

  function v41RankName(k,s=state){
    const p=PEOPLE[k];if(!p)return '';
    if(k==='gu'||k==='shen'||k==='taihou'||k==='emperor')return `${p.title}·${p.name}`;
    const t=courtTitle(s,k)||s.ranks?.[k]||p.title||'';
    return `${t&&t!=='待选'&&t!=='待封'?t+'·':''}${p.name}`;
  }
  function v41PregMark(k,s=state){
    const extra=Object.values(s.flags?.extraHeirs||{}).some(x=>x?.mother===k&&!x?.born&&!x?.skipped);
    const fixed=(k==='ning'&&s.flags?.ningPregnant&&!s.flags?.sixthPrincessBorn)||(k==='ke'&&s.flags?.kePregnant&&!s.flags?.fourthPrinceBorn)||(k==='fang'&&s.flags?.fangPregnant&&!s.flags?.fangDead)||(k==='baopu'&&s.flags?.baopuPregnant&&!s.flags?.baopuLostChild)||(k==='wenheng'&&s.flags?.wenhengPregnant&&!s.flags?.wenhengLostPregnancy);
    return extra||fixed?' · 有孕':'';
  }
  function v41PeopleAt(prefix,s=state){
    return Object.keys(PEOPLE).filter(k=>{
      const p=PEOPLE[k];if(!p?.home)return false;
      if((p.introducedAt??0)>s.index+1&&!['emperor','taihou','gu','shen','zhou'].includes(k))return false;
      return p.home.startsWith(prefix)&&!/^故|^废/.test(s.ranks?.[k]||'');
    });
  }
  function v41Residents(prefix,s=state){const ks=v41PeopleAt(prefix,s);return ks.length?ks.map(k=>v41RankName(k,s)+v41PregMark(k,s)).join('、'):'暂无固定居住者'}
  function v41ThreadStatus(key,s=state){
    const map={
      gu:s.flags?.fangDead?'方氏案后，中宫开始怀疑“每一步都合规”是否真的等于正确':s.flags?.v37SelectionCompleted?'新人、孕例与宫务都压到中宫案头，皇后越来越难只靠旧例回答':'仍在建立新朝六宫秩序',
      shen:s.flags?.shenVerdict?'沈氏旧案已落定':s.flags?.oldCaseGrainLedger?'军粮旧簿已经露出破绽，和妃仍未急着翻案':'旧案只在茶罐、旧曲和半封信里露出影子',
      cui:s.flags?.baopuLostChild?'昭氏失子后，崔氏供应网络进入调查视野':s.flags?.v37SelectionCompleted?'崔氏家族的贡造与内务府关系仍藏在日常供应里':'尚未正式进入内廷',
      zhou:s.flags?.twinBoyFate?`双生异闻已留下后果：${s.flags.twinBoyFate==='keep'?'异态皇子照常入玉牒':s.flags.twinBoyFate==='send'?'异态皇子送出宫外':'异态皇子被秘处'}`:'双生旧事尚未发生',
      wenren:s.flags?.baopuPunishment?'昭氏行刺已把闻人一家推到终局':s.flags?.baopuLostChild?'失子、失宠恐惧与姐妹差异正在叠加':'母女三人仍在把“留下来”理解成三件不同的事',
      fang:s.flags?.fangDead?(s.flags?.fangInvestigation==='threeDays'?'听雨轩案让宫里不得不重查送药与煎药房换值的漏洞':'听雨轩案让宫里不得不重查送药、换值和假口谕的漏洞'):s.flags?.fangPregnant?'方氏喜脉让一个低位宫嫔第一次成为各方都要计算的人':'方小满仍只是穿梭各宫、最容易被所有人信任的低位旧人'
    };return map[key]||'';
  }

  // ---------- 地图扩容：保留原底图，新增高位妃嫔宫苑、低位配殿与关键办事处 ----------
  const V41_BASE_MAP=MAP_SPOTS.slice();
  const v41Spot=(name,x,y,desc)=>({name,x,y,desc});
  function v41MapSpots(s=state){
    v41SyncHomes(s);
    const base=V41_BASE_MAP.map(o=>({...o}));
    base.forEach(o=>{
      if(o.name==='凤仪宫')o.desc=`皇后顾明宜居所。当前：${v41ThreadStatus('gu',s)}`;
      if(o.name==='永和宫')o.desc=`和妃沈知微居所。当前：${v41ThreadStatus('shen',s)}`;
      if(o.name==='拾遗阁')o.desc=`闻人一家主要居处。现住：${v41Residents('拾遗阁',s)}。${v41ThreadStatus('wenren',s)}`;
      if(o.name==='听雨轩')o.desc=`方小满与阿芙居处。${v41ThreadStatus('fang',s)}`;
      if(o.name==='养心殿')o.desc='御前寝居与理事处。选秀册、太医院脉案、军令旧抄与内务府密报最终都会在这里相遇。';
      if(o.name==='慈宁宫')o.desc=`太后居所，也是皇子公主最常被抱去的地方。现住/常来：${v41Residents('慈宁宫',s)}。`;
    });
    const extras=[
      v41Spot('绮春宫',14,50,`周清漪居处。现住：${v41Residents('绮春宫',s)}。${v41ThreadStatus('zhou',s)}`),
      v41Spot('景仁宫',63,44,`邵明贞居处。现住：${v41Residents('景仁宫',s)}。她连接太后外戚与顾氏中宫两条关系。`),
      v41Spot('翊坤宫',66,58,`霍素英居处。现住：${v41Residents('翊坤宫',s)}。`),
      v41Spot('长春宫',36,55,`崔静仪居处。现住：${v41Residents('长春宫',s)}。${v41ThreadStatus('cui',s)}`),
      v41Spot('咸福宫',16,67,`低位宫嫔配殿之一。现住：${v41Residents('咸福宫',s)}。低位孕事、互借东西与宫女往来常从这里进入主线。`),
      v41Spot('钟粹宫',84,46,`低位宫嫔配殿之一。现住：${v41Residents('钟粹宫',s)}。这里离景仁宫近，新人与中宫近支往来最频。`),
      v41Spot('景阳宫',84,65,`低位宫嫔配殿之一。现住：${v41Residents('景阳宫',s)}。位置偏，很多消息总比别处晚半步。`),
      v41Spot('储秀宫',88,31,`选秀期间候选所居。未留牌者最终从这里离宫；后期再开采选时，这里会重新亮灯。`),
      v41Spot('太医院',58,66,'脉案、产案、药单与夜值名册所在地。蘅嫔高危孕事、昭氏失子和方氏案都曾让这里的旧簿重新被翻开。'),
      v41Spot('内务府',42,69,'贡造、香料、织物、宫中器具与出入登记的枢纽。崔氏供应网络、旧蘅香料复验和后来听雨轩证据链都从这里留下纸面痕迹。'),
      v41Spot('宗人府档房',69,73,'宗室旧案与军令抄送档案。沈氏旧案查到顺王以后，这里的日期差成为关键一环。'),
      v41Spot('慎刑司',25,76,'内廷重案拘押与审讯之处。若昭氏行刺后没有当场处置，她会被押到这里，供词也从这里送回御前。')
    ];
    if(s.flags?.wenhengFate==='west'||PEOPLE.wenheng?.home?.startsWith('西苑'))extras.push(v41Spot('西苑',8,29,'蘅嫔退居后的静处。远离六宫请安与承宠册，却仍留在皇城之内。'));
    return [...base,...extras];
  }
  function v41MapCards(s=state){
    const residences=['凤仪宫','永和宫','绮春宫','拾遗阁','景仁宫','翊坤宫','长春宫','听雨轩','咸福宫','钟粹宫','景阳宫'];
    return `<section class="v41-map-index"><h2>宫苑与人物</h2><div class="v41-map-grid">${residences.map(n=>{const ks=v41PeopleAt(n,s);return `<div class="v41-map-card"><b>${n}</b><small>${ks.length?'当前居住':'宫苑'}</small><p class="res">${ks.length?ks.map(k=>v41RankName(k,s)+v41PregMark(k,s)).join(' · '):'暂无主线人物'}</p><p>${v41MapSpots(s).find(x=>x.name===n)?.desc||''}</p></div>`}).join('')}</div><div class="v41-map-threads"><span><b>中宫</b><small>${v41ThreadStatus('gu',s)}</small></span><span><b>沈氏旧案</b><small>${v41ThreadStatus('shen',s)}</small></span><span><b>崔氏供应</b><small>${v41ThreadStatus('cui',s)}</small></span><span><b>周妃双生</b><small>${v41ThreadStatus('zhou',s)}</small></span><span><b>闻人一家</b><small>${v41ThreadStatus('wenren',s)}</small></span><span><b>听雨轩</b><small>${v41ThreadStatus('fang',s)}</small></span></div></section>`;
  }
  const mapViewV41=mapView;
  mapView=function(){
    const spots=v41MapSpots(state);MAP_SPOTS.splice(0,MAP_SPOTS.length,...spots);
    let html=mapViewV41();
    html=html.replace('<div class="palace-map">','<div class="palace-map v41-palace-map">');
    return html.replace('</main>',`${v41MapCards(state)}</main>`);
  };

  // ---------- 时间线织网：把“后来才重要”的小事提前发生 ----------
  const years41=CHAPTERS.find(ch=>ch.title==='宫灯渐繁');
  function v41InsertBefore(needle,steps){if(!years41?.steps)return;const i=years41.steps.findIndex(x=>x.heading?.includes(needle));if(i>=0)years41.steps.splice(i,0,...steps)}
  function v41InsertAfter(needle,steps){if(!years41?.steps)return;const i=years41.steps.findIndex(x=>x.heading?.includes(needle));if(i>=0)years41.steps.splice(i+1,0,...steps)}
  if(years41?.steps&&!years41.steps.some(x=>x.heading?.includes('分宫不是搬箱子'))){
    years41.steps.unshift({heading:'承熙三年三月 · 分宫不是搬箱子',cast:['gu','zhou','ning','ke','hui','fang'],fx:'lantern',narrative:true,text:s=>[
      `终选后的第三日，六宫真正开始挪人。邵明贞入景仁宫，霍素英入翊坤宫，崔静仪移居长春宫；低位新人则按尚宫局空缺分进咸福、钟粹、景阳几处配殿。`,
      `皇后从早到晚在凤仪宫看钥匙、炭例、宫女名册和厨房份额。邵明贞坐在下首替她把重复名字圈掉，遇到一处旧例没写清，她没有问“从前怎么做”，而是先说：“两边都减一成，月底再看实耗。”皇后抬眼看了她片刻，最后点头。`,
      `周清漪没有参与分配，却把一篮新晒的薄荷送到三处新宫。给景仁宫的最多，给长春宫的最少，理由都说得过去。她回绮春宫后才对宫女道：“新进来的人，不先看她们怎么争宠。先看谁的门口最早有人排队。”`,
      `方小满和阿芙被皇后临时借去带低位新人认路。她们从内务府领被褥、去尚食局认膳牌，又在太医院门口排过一次脉案。方小满当晚脚底磨出泡，却已经能说出谁住哪一宫、谁的宫女最爱走近路。后来很多证词之所以会落到她身上，正因为她从这时起就成了那个“哪里都去过一点”的人。`,
      `<span class="v41-thread"><b>从这一天起，宫里的人不再只按位分相遇。</b><small>住得近、共用一条取水路、同一个太医值次，都会让原本无关的人在几年后互相成为证人。</small></span>`
    ],choices:[{label:'继续',effects:{flags:{v41HomesSettled:true}},result:''}]});

    years41.steps.splice(1,0,{heading:'承熙三年六月 · 一场消暑宴，三条线第一次碰在一起',cast:['gu','shen','zhou','ning','ke','hui','fang'],fx:'lantern',narrative:true,text:s=>[
      `六月暑重，皇后在御花园设了一场很小的消暑宴。不是大宴，桌上只有冰酪、瓜果和几碟凉菜。正因为人少，很多平时被礼数隔开的关系第一次坐得很近。`,
      `邵明贞替皇后核冰例，发现景仁宫多领了两匣，直接让人退回一匣。皇后本来要去翻去年旧册，她已经把手按在册页上：“这件事不必找去年，今天够不够吃才是答案。”皇后没有反驳，只把手收回来。`,
      `霍素英嫌冰酪太甜，和妃顺口问起北地军粮。霍氏说父亲前些日子清库，翻出过几本旧营簿，“十年前的也有”。和妃端杯的手停了一下，却只说：“旧纸最会留灰。”她没有当场追问。`,
      `崔静仪带来的不是吃食，是两匹透气的夏纱。她说是家里旧贡造剩下的样布，已经经内务府验过。皇后收下给宫女做夏衣。那一天没有任何人觉得“经内务府验过”这几个字值得记。`,
      `周清漪全程只管笑。散席时她却问方小满：“今日冰从哪处库出的？”方小满答了。她又问：“崔家的纱是谁送进来的？”方小满也答了。周清漪笑：“你倒比我记得全。”方小满只当她夸自己。`,
      `<span class="v41-thread-grid"><span><b>沈氏旧案</b><em>霍家“旧营簿”第一次被说出口。</em></span><span><b>崔氏供应</b><em>“经内务府验过”第一次成为安全的代名词。</em></span><span><b>周妃</b><em>开始习惯记物流与人情，而非只记恩宠。</em></span><span><b>方小满</b><em>因为总在跑腿，慢慢成了很多流程的共同见证者。</em></span></span>`
    ],choices:[
      {label:'散席后留下皇后与邵明贞，把宫务说完',hint:'看中宫如何面对一个比自己更敢直接判断的近亲',effects:{flags:{v41SummerFocus:'gu'}},result:'邵明贞离开前替皇后合上最后一本册。皇后忽然问：“你是不是觉得这些事都很简单？”她答：“不简单。只是总得有人先说怎么办。”皇后没再接话。'},
      {label:'送和妃与霍素英走一段',hint:'旧营簿还只是一句闲谈',effects:{flags:{v41SummerFocus:'shen'}},result:'霍素英走到岔路口才说：“沈娘娘若真想看，我可以写信问父亲那几本旧簿还在不在。”和妃答：“先别。太早要的东西，最容易先被人知道你在找什么。”'},
      {label:'叫崔静仪留下，问贡造与内务府怎么走账',hint:'把贡造与内务府的走账问清楚',effects:{flags:{v41SummerFocus:'hui'}},result:'崔静仪把流程说得很清楚：地方贡造、验样、入库、复验、发宫。每一步都有印，每一步都有经手人。她说完还笑：“所以最不容易出错。”'},
      {label:'去绮春宫坐一会儿',hint:'周清漪已经开始用自己的方式看新人',effects:{flags:{v41SummerFocus:'zhou'}},result:'周清漪把今日座次重画了一遍，圈的不是谁坐得近，而是谁向谁借过东西、谁替谁叫过宫女。“宠爱会变，”她把纸推给我，“人情走过的路，变得慢一点。”'}
    ]});

    v41InsertBefore('蘅嫔是不是只剩一个名位',[{heading:'承熙三年十月 · 一张换库单',cast:['hui','hanzhang','wenheng','gu'],fx:'ink',narrative:true,text:s=>[
      `入秋连雨，内务府报西库返潮，要把一批旧香、旧布和药材挪库复晒。这里面也包括闻人一家从蘅地带来的旧香。`,
      `当初是我亲口下令：旧蘅物件凡入六宫，都要经过内务府复验。皇后因此只问“印齐不齐”，没有理由单独拦这一批。`,
      `${courtTitle(s,'hui')}的家族恰有一支贡造行临时帮内务府补做防潮绢袋。她本人没有经手，只在请安时听见“西库发霉”后说了一句：“江南库房也常这么换袋。”这句话普通得不能再普通。`,
      `${courtTitle(s,'hanzhang')}去领姐姐的旧物时，看见新绢袋封口用了两枚印：一枚内务府，一枚贡造行验记。她多看了一眼，却没有资格拆别人的库册，只记住了验记边上一道像水纹的缺口。`,
      `蘅嫔收到重新封好的香料后反而放心了些：“你看，大晟自己验过。”她后来把其中一批分给昭氏。`,
      `<span class="v41-thread"><b>真正的悲剧从这里开始变得讽刺。</b><small>主控为了防旧蘅势力而设置的复验制度，反而让一件被“官方确认安全”的东西更难再被怀疑。</small></span>`
    ],choices:[{label:'继续',effects:{flags:{v41IncenseTransferSeed:true}},result:''}]}]);

    v41InsertBefore('胎像开始不稳',[{heading:'承熙四年三月 · 霍家的旧簿没有直接送给和妃',cast:['ke','gu','shen'],fx:'ink',narrative:true,text:s=>[
      `霍素英果然写信回家问了旧营簿。定远侯没有把整箱旧纸送进后宫，只摘抄了其中三页军粮数字，按规矩先送凤仪宫验看。`,
      `皇后本想原样封回去。邵明贞却提醒：“既是北营旧册，永和宫那边或许认得营号。”皇后犹豫了一会儿，最后只让和妃来凤仪宫“看一眼，不带走”。`,
      `和妃看见其中一个营号时，脸上没有任何变化。她只发现一个很小的矛盾：沈家兄长被记作初五已脱营，但初七那一队仍按原人数领了整份军粮。`,
      `“可能是账没改。”皇后说。`,
      `“可能。”和妃把纸放回去，“所以现在还不是翻案，只是终于有一处纸面不肯跟判词站在一起。”`,
      `霍素英没有替沈家说话，只让父亲把十年前同月的北营粮秣总册补送进京。`
    ],choices:[{label:'继续',effects:{flags:{oldCaseGrainLedger:true,v41OldCaseSeed:true}},result:''}]}]);

    v41InsertAfter('五公主洗三',[{heading:'承熙四年九月 · 洗三散了，产房的名单留下来',cast:['zhou','fang','afu','gu','hui'],fx:'candle',narrative:true,text:s=>[
      `六公主的洗三散后，低位生母还在坐月子。皇后忙着乳母、月例和抱养旧例，方小满与阿芙被留下来帮着送东西。`,
      `周清漪从袖里抽出一张折得很旧的纸，递给阿芙：“这是我生双生时用过的值夜单。哪一更谁进产房、谁换水、谁端药，都记。”`,
      `阿芙看得头疼：“娘娘那时真有空记这个？”`,
      `“我没空。嬷嬷记的。”周清漪淡淡道，“后来才知道，孩子一出事，所有人都会说‘大概是谁’。纸上最好不要写大概。”`,
      `${courtTitle(s,'hui')}送来的是细棉布，仍走内务府验收入库；邵明贞则替皇后把低位母妃是否亲养的两套旧例并在一页。几个人做的是完全不同的事，却都在同一间产房外留下痕迹。`,
      `方小满把那张旧值夜单拿回听雨轩照着抄了一份。阿芙从此养成习惯：主子有病、有孕、夜里叫太医，谁进谁出都记一笔。`,
      `<span class="v41-thread"><b>这张纸此时没有任何阴谋意味。</b><small>多年以后听雨轩出事，阿芙为什么会执着于“每一道手都要记清”，从这里才有来处。</small></span>`
    ],choices:[{label:'继续',effects:{flags:{afuKeepsEntryLog:true,zhouBirthLogPassed:true}},result:''}]}]);

    v41InsertBefore('要不要再添一个孩子',[{heading:'承熙五年八月 · 宫里孩子一多，所有人都开始算',cast:['gu','zhou','baopu','ning','ke','hui','shen'],fx:'lantern',narrative:true,text:s=>[
      `这一年宫里最明显的变化不是哪一宫最得宠，而是乳母突然不够用了。皇子公主的衣料、奶娘、太医值次和满月礼全挤在一起，凤仪宫桌上的孩子名字第一次比妃嫔名字多。`,
      `皇后把名册分成三摞：已经落地的、正在孕中的、只是太医建议继续观察的。她不再能靠一份旧例解决所有人，因为同一天可能有嫡子功课、低位母妃月例、勋贵皇子贺礼与太后抱孩子去慈宁宫四件事。`,
      `周清漪帮她把乳母排班重新抄了一遍，没有邀功。她经历过双生异闻以后，对孩子的态度反而比从前更实际：“先让他们吃饱，再谈什么祥瑞。”`,
      `${courtTitle(s,'baopu')}来时正碰见几名乳母抱孩子从廊下过去。她一路笑着逗，回拾遗阁后却把《承露录》里“请脉”二字写了四次。蘅嫔没有劝她放下，只问：“你还要等多久？”`,
      `和妃此时已经握着军粮旧簿的一处破绽，却没有趁后宫忙乱去催我翻案；霍素英也没有借皇嗣替霍家讨额外恩典。崔静仪则替长春宫退回一批超例补品，单子上仍是那几家熟悉的贡造行。`,
      `<span class="v41-thread-grid"><span><b>皇嗣线</b><em>孩子越多，宫务与母族利益越具体。</em></span><span><b>昭氏线</b><em>别人一年一年成为母亲，她把“没有孩子”越来越解释成自己的失败。</em></span><span><b>沈氏线</b><em>旧案继续推进，但不被恩宠和生育盖掉。</em></span><span><b>崔氏线</b><em>危险仍然藏在人人看惯的日常供应里。</em></span></span>`
    ],choices:[{label:'继续',effects:{flags:{v41ChildrenPressure:true}},result:''}]}]);

    v41InsertBefore('六月 · 昭氏有孕',[{heading:'承熙六年三月 · 同一日，三件小事',cast:['gu','shen','hui','baopu','hanzhang'],fx:'mist',narrative:true,text:s=>[
      `三月十二日，宫里同时发生三件谁都不会单独写进大事录的小事。`,
      `第一件，皇后把新一季皇嗣衣料单退回内务府，因为其中两项又是崔氏旧贡造行。她没有指控谁，只在旁边写：“同类物料，另取两家比价。”这是她第一次不是因为旧例，而是因为自己不放心，主动改流程。`,
      `第二件，和妃收到一枚旧铜扣，营号与霍家那三页旧军粮簿一致。她把铜扣压在茶罐底，没有立刻拿来御前。旧案终于从“账不对”变成“确实有人从那个营活着把东西带出来”。`,
      `第三件，昭氏在慈宁宫看见几个孩子追着一只纸鸢跑。她替最小的那个系好松开的鞋带，起身时脸上的笑还在，回拾遗阁以后却把旧香囊重新挂回衣箱。含章注意到了，却什么也没说。`,
      `到掌灯时，三样东西还各在各处：退回的衣料单压在凤仪宫案头，旧铜扣在永和宫茶罐底，昭氏的旧香囊重新挂回了拾遗阁衣箱。`
    ],choices:[{label:'继续',effects:{flags:{v41MarchThreeThreads:true}},result:''}]}]);
  }

  // ---------- 后段回收：让前面的小事在重大案件里真正回来 ----------
  const loss41=CHAPTERS.find(ch=>ch.title==='香尽胎寒');
  if(loss41?.steps&&!loss41.steps.some(x=>x.heading?.includes('四本簿子第一次放到同一张桌上'))){
    const i=loss41.steps.findIndex(x=>x.heading?.includes('元嫔没有被定罪'));
    if(i>=0)loss41.steps.splice(i+1,0,{heading:'第七幕前 · 四本簿子第一次放到同一张桌上',cast:['gu','shen','zhou','ke','hui','hanzhang'],fx:'ink',narrative:true,text:s=>[
      `查到旧香复验这一层时，养心殿案上第一次同时摆了四本本来互不相干的簿子：内务府换库单、太医院孕案、霍家旧军粮摘簿、以及周清漪当年双生时留下的产房值夜单。`,
      `皇后盯着内务府那本最久。每一枚印都是真的，每一个经手名也都能找到人。她低声道：“若每一步都是真的，为什么最后还是错的？”`,
      `和妃却看向霍家旧军粮簿：“军中那桩旧案也是这样。日期是真的，签名是真的，结案的批红也是真的。真东西一样可以拼出一桩假的结论。”`,
      `霍素英没有替父兄辩，也没有替沈家说话，只把两份纸并在一起：“所以要查的不是哪一枚印假，是谁知道流程怎样走，才最不容易被怀疑。”`,
      `周清漪把自己的旧值夜单往前推了一寸：“那就把人走过的路也画出来。谁进过库、谁换过袋、谁碰过香，不要只看最后谁手里有东西。”`,
      `${courtTitle(s,'hanzhang')}终于把承熙三年那枚有水纹缺口的贡造验记画在纸角。崔静仪看到那枚验记时，手指把盒带重新系了一遍。她没有否认，只问：“这张旧样现在还在谁手里？”`
    ],choices:[{label:'继续',effects:{flags:{v41LedgersMeet:true}},result:''}]});
  }

  const oldcase41=CHAPTERS.find(ch=>ch.title==='旧茶未凉');
  if(oldcase41?.steps){
    const st=oldcase41.steps.find(x=>x.heading?.includes('军令不是一张纸，是三次转手'));
    if(st&&!st.v41Woven){
      const old=st.text;st.text=s=>{const arr=typeof old==='function'?old(s):old;return [...arr,
        `霍素英让父亲补送的不是“替沈家说情”的信，而是北营十年前同月的粮秣总册。它证明那支队伍在所谓“脱营”以后仍按完整编制领粮。霍素英在附页上只写：“原册在北营，可复核。”`,
        `我忽然想起承熙三年消暑宴上，她第一次说起“家里还有旧营簿”时，和妃只回了一句“旧纸最会留灰”。这层灰用了六年才真正落到御案上。`];};st.v41Woven=true;
    }
  }

  const fang41=CHAPTERS.find(ch=>ch.title==='雪落宫墙'||ch.title==='一炉香灰'||ch.steps?.some(x=>x.heading?.includes('太后昏厥以后')));
  if(fang41?.steps){
    const st=fang41.steps.find(x=>x.heading?.includes('三份密报没有一份完整'));
    if(st&&!st.v41Woven){const old=st.text;st.text=s=>{const arr=typeof old==='function'?old(s):old;return [...arr,
      `阿芙另外交上一册很薄的值夜记。她说这习惯是承熙四年替低位宫嫔坐月子时学来的，纸样还是周清漪给的旧产房单。上面没有凶手，却能证明某几个晚上谁根本没进过听雨轩。`,
      `皇后看见这册时明显停了一下。昭氏旧香案之后，她已经知道“合规的印”不能自动证明无罪；如今她又第一次真正看到，“不起眼的出入记录”也能证明一个人没有做过什么。`];};st.v41Woven=true;}
  }

  // 人物页每次渲染前同步动态住处。
  const renderV41=render;render=function(){v41SyncHomes(state);return renderV41();};

  if(!state.flags?.v41Migrated){state.flags.v41Migrated=true;try{save()}catch(_e){}}
  try{render()}catch(_e){}
}catch(e){console.error('v41 weave/map patch failed',e)}})();
