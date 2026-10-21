(()=>{
try{
  document.documentElement.dataset.build='v31';
  const css=document.createElement('style');
  css.textContent=`
  .selection-board{margin:20px 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
  .selection-card{padding:15px 14px;border:1px solid #bea77b;background:linear-gradient(180deg,#fbf5e8,#eee1ca);box-shadow:0 5px 16px #43351e16;min-height:190px}
  .selection-card b{display:block;font-size:1.05rem;color:#633d2e;margin-bottom:5px}.selection-card em{font-style:normal;font-size:.76rem;letter-spacing:.12em;color:#967548}.selection-card p{font-size:.9rem;line-height:1.75;margin:10px 0 0;color:#5e5549}
  .low-roster{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}.low-roster span{border:1px solid #c7b48c;background:#faf5e9;padding:6px 10px;font-size:.82rem;color:#5e5140}
  .poison-trace{display:block;margin:17px 0;padding:15px 17px;border:1px solid #a88b7355;border-left:4px solid #7f5144;background:#f4ede2;line-height:1.85;color:#59493f}.poison-trace b{display:block;color:#7b493d;letter-spacing:.1em;margin-bottom:4px}
  .faction-note{display:block;margin:16px 0;padding:12px 15px;border-left:3px solid #4f665e;background:#edf1ec;color:#4e5a55;line-height:1.8}
  @media(max-width:760px){.selection-board{grid-template-columns:1fr}}
  `;document.head.appendChild(css);

  // 三位世家高位嫔妃：初封为嫔，不属于“晋升”，故不违反逐级晋封。
  Object.assign(PEOPLE,{
    ning:{name:'邵明贞',title:'徽嫔',age:'19岁',home:'景仁宫',noPortrait:true,portraitKind:'youngwoman',glyph:'徽',introducedAt:5,tags:['太后外戚','顾氏姻亲','中宫近支'],bio:'太后胞弟之女，母亲出自顾氏旁支。她幼时随母入慈宁宫，早就认识皇后。入宫并不是另立一派，而是太后与顾氏共同加固内廷的一枚稳棋。她做事不抢先，却比皇后更敢在没有旧例时直接作判断；皇后愿意亲近她、也确实需要她，却很难完全忘记——太后有时只需一句“让阿宁看看”，便像在无声比较两个人谁更适合撑住中宫。'},
    ke:{name:'霍素英',title:'晋嫔',age:'21岁',home:'翊坤宫',noPortrait:true,portraitKind:'youngwoman',glyph:'晋',introducedAt:5,tags:['勋贵武门','北营旧部','爽直'],bio:'定远侯之女，自幼随父兄在北地长大。行礼极稳，不爱绕话。她代表新朝仍必须倚重的军功集团，也因为霍家保存的旧军籍，后来与和妃那桩十年前的军案发生联系。'},
    hui:{name:'崔静仪',title:'元嫔',age:'19岁',home:'储秀宫东院',noPortrait:true,portraitKind:'youngwoman',glyph:'元',introducedAt:5,tags:['江南世家','财赋与贡造','擅应酬'],bio:'崔氏嫡女。衣色、香气、礼物都挑得恰到好处，说话从不让人当场难堪。崔家与江南财赋、贡造和内务府供应往来极深；她入宫以后最先学会的不是争宠，而是让所有人都觉得她“很好相处”。'},
    cao2:{name:'王淑惠',title:'待选',age:'18岁',home:'储秀宫',noPortrait:true,portraitKind:'youngwoman',glyph:'王',introducedAt:99,tags:['地方官女','安静','不抢话'],bio:'地方知府之女，家世不显赫，胜在性情稳。'},
    zhao2:{name:'张素英',title:'待选',age:'19岁',home:'储秀宫',noPortrait:true,portraitKind:'youngwoman',glyph:'张',introducedAt:99,tags:['京官女','机敏','善看脸色'],bio:'京中四品官员之女，反应快，很少让一句话落到地上没人接。'},
    lin2:{name:'林淑贞',title:'待选',age:'18岁',home:'储秀宫',noPortrait:true,portraitKind:'youngwoman',glyph:'林',introducedAt:99,tags:['医官世家','温顺','识药名'],bio:'太医旁支之女，知道一些宫中常见药名，却并不以此卖弄。'},
    ye2:{name:'陈婉仪',title:'待选',age:'17岁',home:'储秀宫',noPortrait:true,portraitKind:'youngwoman',glyph:'陈',introducedAt:99,tags:['书香门第','怕生','字好'],bio:'翰林旁支之女，声音轻，写字比说话稳。'},
    du2:{name:'李秀贞',title:'待选',age:'20岁',home:'储秀宫',noPortrait:true,portraitKind:'youngwoman',glyph:'李',introducedAt:99,tags:['盐运官女','爽利','善算账'],bio:'盐运使旁支之女，性情爽利，对数字格外敏感。'},
    su2:{name:'刘素华',title:'待选',age:'18岁',home:'储秀宫',noPortrait:true,portraitKind:'youngwoman',glyph:'刘',introducedAt:99,tags:['小京官女','爱笑','会唱南曲'],bio:'小京官之女，入宫前学过南曲，笑起来很快。'}
  });

  const newKeys=['ning','ke','hui','cao2','zhao2','lin2','ye2','du2','su2'];
  newKeys.forEach(k=>{
    INITIAL_STATE.ranks[k]=INITIAL_STATE.ranks[k]||'待选';
    INITIAL_STATE.bond[k]=INITIAL_STATE.bond[k]??28;
    INITIAL_STATE.trust[k]=INITIAL_STATE.trust[k]??35;
    state.ranks[k]=state.ranks[k]||'待选';
    state.bond[k]=state.bond[k]??28;
    state.trust[k]=state.trust[k]??35;
  });
  ['ning','ke','hui'].forEach(k=>{if(!HAREM_KEYS.includes(k))HAREM_KEYS.push(k)});

  const courtTitleV30=courtTitle;
  courtTitle=function(s,k){
    const raw=(s?.ranks&&s.ranks[k])||PEOPLE[k]?.title||'';
    const prefix={ning:'徽',ke:'晋',hui:'元'}[k];
    if(prefix&&['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'].includes(raw))return prefix+raw;
    return courtTitleV30(s,k);
  };

  const lowPool=['cao2','zhao2','lin2','ye2','du2','su2'];
  function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function installFirstSelection(){
    if(state.flags.firstGrandSelectionDone)return;
    state.ranks.ning='嫔';state.ranks.ke='嫔';state.ranks.hui='嫔';
    const count=2+Math.floor(Math.random()*4);
    const chosen=['zhao2',...shuffle(lowPool.filter(k=>k!=='zhao2')).slice(0,count-1)];
    chosen.forEach((k,i)=>{
      state.ranks[k]=i<2?'常在':'答应';
      PEOPLE[k].introducedAt=5;
      PEOPLE[k].title=state.ranks[k];
      PEOPLE[k].home=i%2===0?'延禧馆':'储秀宫西院';
      if(!HAREM_KEYS.includes(k))HAREM_KEYS.push(k);
    });
    const preg=chosen[Math.floor(Math.random()*chosen.length)];
    state.flags.lowConsorts=chosen;
    state.flags.lowPregnancyKey=preg;
    state.flags.lowAccompliceKey=[...chosen].reverse().find(k=>k!=='zhao2')||null;
    state.flags.firstGrandSelectionDone=true;
  }
  function selectedLow(s=state){return (s.flags.lowConsorts||[]).map(k=>`${PEOPLE[k].name}·${s.ranks[k]}`).join('、')||'尚未留牌'}
  function selectedLowCards(s=state){return `<span class="low-roster">${(s.flags.lowConsorts||[]).map(k=>`<span>${PEOPLE[k].name} · ${s.ranks[k]}</span>`).join('')}</span>`}
  function lowPregKey(s=state){return s.flags.lowPregnancyKey||s.flags.lowConsorts?.[0]||'cao2'}
  globalThis.lowPregKey=lowPregKey;
  function lowPregTitle(s=state){const k=lowPregKey(s);return `${PEOPLE[k]?.name||'某氏'}${s.ranks[k]?`（${s.ranks[k]}）`:''}`}

  const applyChoiceEffectsV30=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=applyChoiceEffectsV30(c);
    if(c.effects?.flags?.runFirstGrandSelection&&!state.flags.firstGrandSelectionDone){installFirstSelection();out.push(`三位世家女入宫；另留低位宫嫔 ${state.flags.lowConsorts.length} 人`)}
    if(c.effects?.flags?.promoteLowPregnant){const k=lowPregKey(state);if(promoteRank(k))out.push(`${PEOPLE[k].name}晋一级 → ${state.ranks[k]}`)}
    return out;
  };

  // --------- 第六章：第一次大选 + 三年至六年的后宫政治生活 ---------
  CHAPTERS[5].date='承熙三年春至六年六月';
  CHAPTERS[5].title='春闱入宫';
  CHAPTERS[5].theme='新帝第一次正式采选，把朝堂三股力量真正送进六宫；几年恩宠、旧案和暗害从这里同时起头';
  CHAPTERS[5].place='体元殿';
  CHAPTERS[5].cast=['gu','shen','baopu','wenheng'];
  CHAPTERS[5].fx='petal';
  CHAPTERS[5].bridge=s=>`承熙二年以后，北军换防与蘅地安置渐定。登基时被一再推迟的正式采选终于不能再拖。礼部说是“充实六宫”，朝臣真正关心的却是三件事：太后外戚与中宫母族要不要再添一重保险，勋贵要不要有一席，江南财赋世家又该得到什么位置。`;
  CHAPTERS[5].steps=[
    {heading:'第一幕 · 皇后先收到的不是画像，是三份家谱',cast:['gu','shen'],fx:'ink',narrative:true,text:s=>[
      `承熙三年二月，礼部把终选名册送进凤仪宫。皇后没有先看画像，先看三份家谱。`,
      `第一份邵氏，是太后母族的嫡支，母亲又出自顾氏旁支；第二份霍氏，祖上从军，父兄仍在北营握兵；第三份崔氏，江南大族，几代人管过漕粮、织造与贡造。`,
      `皇后把三份家谱压在案角，指尖来回抚平纸边。她并不喜欢这种名册——因为旧例能告诉她秀女怎么站、怎么问，却不能告诉她三个家族同时把女儿送进来以后，谁该离谁近一点。`,
      `和妃来看请安册时瞥了一眼：“这不是选三个人。”`,
      `皇后没有抬头：“本宫知道。”`,
      `“是把三家人请进宫墙。”`,
      `皇后这才停手。她把册子推给我时，只说：“臣妾把能照的旧例都附上了。至于三家之间怎么平，旧例没有。”`,
      `她真正怕的从来不是没有规矩。是规矩走到尽头以后，必须由自己承担一句判断。`
    ],choices:[{label:'继续',effects:{flags:{grandSelectionPrepared:true}},result:''}]},

    {heading:'第二幕 · 我亲临终选',cast:['gu','taihou'],fx:'lantern',text:s=>[
      `终选设在体元殿。窗外早春风还冷，殿里却已经换上薄帘。秀女分三列站着，衣色都被压在规制允许的范围里，真正能看见差别的只有站姿、眼神和开口的方式。`,
      `<span class="selection-board"><span class="selection-card"><em>外戚 · 邵氏</em><b>邵明贞</b><p>一身浅黛，进殿时先向太后行家礼，再按秀女礼重新拜过。皇后认出她时明显停了一息。问到宫务，她没有背旧例，只答：“有例循例；无例，总要有人担那一句准与不准。”太后没有夸，只把茶盖合上。皇后却把手里的名册翻慢了一页。</p></span><span class="selection-card"><em>勋贵 · 霍氏</em><b>霍素英</b><p>站得极稳。问北地风物，她先说军粮，再说雪。轮到才艺，只射了三箭，三箭都落在同一圈里，没有多射第四箭。</p></span><span class="selection-card"><em>财赋 · 崔氏</em><b>崔静仪</b><p>簪一朵极小的白玉兰，香气淡得几乎察觉不到。她没有抢答，却能在上一位秀女失手打翻茶盏时自然往旁边让半步，让宫女收拾而不叫场面难看。</p></span></span>`,
      `三个人没有谁“更美”到足以决定结果。她们真正不同的是：邵氏背后站着名望，霍氏背后站着兵，崔氏背后站着钱粮与宫中日常供应。`,
      `低位候选还在偏殿等。裴景和问我：“陛下要问什么？”`,
      `这一问不会改变三家都要入宫的现实，却会让她们第一次知道，新帝想先看见她们什么。`
    ],keyDecision:true,choices:[
      {label:'问：“进宫以后，你最怕失去什么？”',hint:'不问家族，先问她们自己',effects:{trust:{ning:2,ke:1,hui:1},flags:{runFirstGrandSelection:true,selectionQuestion:'self'}},result:'邵氏答“判断”，霍氏答“家书”，崔氏停得最久，只答“分寸”。太后在帘后轻轻笑了一声。三人都留牌。册页仍空着，封号与初位等我亲自落朱。'},
      {label:'问：“你们各自能替六宫做什么？”',hint:'让她们从第一天就知道这是政治位置',effects:{trust:{gu:1,ning:1,ke:1,hui:1},flags:{runFirstGrandSelection:true,selectionQuestion:'function'}},result:'邵氏说愿协理女学与祭礼，霍氏说可教宫中女眷骑射，崔氏说自己只会管细账与人情。三句话都不惊艳，却都准确落在各家最擅长的地方。三人留牌。册页仍空着，封号与初位等我亲自落朱。'},
      {label:'不问，让她们各自安静站完一炷香',hint:'先看人在沉默里怎么待着',effects:{trust:{hanzhang:1},flags:{runFirstGrandSelection:true,selectionQuestion:'silence'}},result:'邵氏目不斜视，霍氏站到最后肩背仍直，崔氏只在一个宫女咳嗽时侧了侧身替她挡风。没有人被一句漂亮话救，也没有人因不说话被罚。三人留牌。册页仍空着，封号与初位等我亲自落朱。'}
    ]},

    {heading:'第三幕 · 低位留牌不是“背景名单”',cast:['gu'],fx:'ink',narrative:true,text:s=>[
      `三位世家女定下以后，偏殿还有十余名候选。她们没有一个父兄能单独撬动朝局，也正因为如此，礼部只建议“酌留二至五人，以充六宫”。`,
      `我没有一一点名。裴景和按终选表现与家世回避规则随机留下了${s.flags.lowConsorts?.length||0}人。`,
      selectedLowCards(s),
      `她们的位分只从答应、常在起。有人字好，有人怕生，有人会唱南曲，也有人只是站得稳。`,
      `皇后让尚宫局逐一分住处。分到最后，她把名册压在掌心下，小声问：“是不是人太多了？”`,
      `和妃正好从殿外进来：“这才像真正的后宫。”`,
      `皇后看她一眼，没有笑。对她而言，人一多，规矩就不再是保护秩序的纸，而会变成她每天都可能用错的一把尺。`
    ],choices:[{label:'继续',effects:{flags:{lowRosterSeen:true}},result:''}]},

    {heading:'第四幕 · 新人入宫后的第一个月，哪盏灯亮得最久',cast:['gu','shen','baopu','hui'],fx:'candle',text:s=>[
      `三月里，新的绿头牌第一次摆满御案。${courtTitle(s,'ning')}、${courtTitle(s,'ke')}、${courtTitle(s,'hui')}的册命已经分别送到三宫；低位新人隔几日才轮到一次。`,
      `皇后仍按初一、十五宿中宫。那两夜往往没有风月，更多是她把选秀后的宫册拿来核，核到困了也不肯先放下。`,
      `和妃每月仍有一两次旧茶。她不争，也不避，新人问她“怎么得宠”，她只笑：“先活久一点再问。”`,
      `${courtTitle(s,'baopu')}的牌子仍翻得最勤。新秀入宫反而让她更会抢场：她会在你召别人之前先送一碟亲手挑的果子，也会明知元嫔善香，第二日偏把自己的旧国香熏得更明显。`,
      `元嫔的恩宠来得很稳。她从不主动催牌，却总能让御前记得她——一份不出错的账，一盏温度正好的茶，一句不会多一步的话。`,
      `这个月，你愿意让哪一处宫灯亮得最久？`
    ],keyDecision:true,choices:[
      {label:`多召${courtTitle(state,'baopu')}`,hint:'她会越来越把皇帝来不来，当成自己有没有用的证明',effects:{bond:{baopu:4},trust:{baopu:2},flags:{year3Favor:'baopu'}},result:s=>`${courtTitle(s,'baopu')}很快把这个月记满《承露录》。她笑得比从前更有底气，连新来的${courtTitle(s,'ning')}都被她拉去看新裁的舞衣。蘅嫔看见后没有阻止，只提醒她“越得宠，越要想下一步”。`},
      {label:'多去永和宫',hint:'旧茶线提前升温，沈氏旧案更早露出边角',effects:{bond:{shen:3},trust:{shen:2},flags:{year3Favor:'shen'}},result:'和妃没有因为次数变多而更柔软。第四次留宿时，她第一次把烧了一半的信放到桌上，没有递给我，只说“有些死人，名字被写错以后，活人会记很多年”。'},
      {label:'多宿中宫',hint:'把选秀后的秩序交给皇后，也让她更早被推到责任中央',effects:{bond:{gu:2},trust:{gu:3},flags:{year3Favor:'gu'}},result:'凤仪宫那个月灯熄得最晚。皇后几乎每晚都在改新宫人的月例、住处与请安次序。她被推得越靠前，反而越频繁问“旧例怎么写”。'},
      {get label(){return `多召${courtTitle(state,'hui')}`;},hint:'安抚江南财赋世家，也让昭氏第一次真正感觉新人会分走她的光',effects:{bond:{hui:3},trust:{hui:2,baopu:-1},flags:{year3Favor:'hui'}},result:s=>`${courtTitle(s,'hui')}没有显出得意，只让储秀宫东院的香换得更淡。昭氏却在下一次请安时穿了最醒目的红，笑着问${courtTitle(s,'hui')}“江南是不是连月亮都比宫里香”。满殿都听出那句话不是在夸月亮。`}
    ]},

    {heading:'第五幕 · 三个世家女开始长出自己的位置',cast:['ning','ke','hui','gu','shen'],fx:'petal',narrative:true,text:s=>[
      `承熙三年的夏天，三位新嫔很快不再只是“新秀”。`,
      `徽嫔常去凤仪宫帮皇后校祭礼册。她不是外人：幼时随母入宫，皇后甚至记得她小时候怕苦、喝药要含一颗松子糖。也正因为太熟，很多事反而更难说。那日皇后为女眷祭礼翻到第三份旧例，徽嫔替她压住被风掀起的册页，只道：“娘娘若觉得都不合适，也可以不用。”皇后没有答。午后太后来问进度，听完只说：“阿宁小时候就敢自己拿主意。”这不像夸奖，更不像训斥。皇后当天把那三份旧例又看了一遍，最后才自己写下新条。第二日徽嫔照旧来请安，两个人仍坐在一张案边喝茶，谁也没有提慈宁宫那句话。`,
      `晋嫔不爱久坐。她在御花园开了一处小小的女眷射圃，和妃偶尔路过，两人谈得最多的不是首饰，是北营换防。霍家保留的一本旧军粮簿，也是在这种闲谈里第一次提到“沈氏旧营”。`,
      `元嫔最会把陌生变成熟悉。她给太后送的是不留香的软枕，给皇后送的是江南新纸，给昭氏送的却是一只空香囊：“姐姐身上的香本就好，不必用我们的。”`,
      `昭氏当场笑着收了。两个人甚至有一阵看起来很投契——一个爱让人看，一个很懂怎么让别人被看得更漂亮。`,
      `真正危险的关系，很少一开始就像仇人。`
    ],choices:[{label:'继续',effects:{trust:{ning:1,ke:1,hui:1,gu:1,shen:1},flags:{threeFactionPositionsFormed:true}},result:''}]},

    {heading:'第六幕 · 蘅嫔入宫时，我亲手设下的防线',cast:['wenheng','peiyan','hanzhang'],fx:'ink',narrative:true,text:s=>[
      `蘅嫔入宫以后，我没有真正相信过她已经放下旧国。她可以每月写家书，可以见两个女儿，但旧国随身物、香料、药材与外来书信都必须经过内务府复验。`,
      `这是我亲自定的规矩。理由也很简单：她入宫不仅是母亲，也是一个亡国以后仍与旧人保持联系的人。`,
      `蘅嫔听完只问：“连我从前用的熏衣香也要验？”`,
      `“都验。”`,
      `她看我两息：“陛下怕我毒死谁？”`,
      `“朕怕的是不知道。”`,
      `她笑了一下，没有再争。`,
      `这道防线后来出了一个极讽刺的结果：原本只在蘅嫔自己手里的旧香，从此必须经过大晟内务府的手。`,
      `而崔家的旁支，恰好掌着那几年宫中一部分贡香与复验供应。`,
      `<span class="faction-note">主控的防备没有错。错在他以为“经过官方渠道”就等于更可控。后来真正被动过手脚的，恰恰是一批盖着复验印的旧香。</span>`
    ],choices:[{label:'继续',effects:{flags:{emperorOldStatePrecaution:true,oldIncenseMustInspect:true}},result:''}]},

    {heading:'第七幕 · 那匣香本来只是她母亲教她留住自己的办法',cast:['wenheng','baopu','hanzhang','hui'],fx:'candle',narrative:true,text:s=>[
      `入秋以后，蘅嫔留两个女儿吃饭，把一匣蘅国旧香丸推到昭氏手边。`,
      `不是药。只是过去王宫里用来熏衣、压住汗气与木箱潮味的旧香。昭氏从少女时便用，熟到闭眼也认得。`,
      `蘅嫔说：“喜欢会散，赏赐会换人。至少让人一闻到这味道，就知道是你。”`,
      `昭氏笑：“母亲现在也教我争宠了？”`,
      `“我教你别被替掉。”`,
      `含章坐在旁边没有接话。`,
      `这匣香按我的规矩送去复验。元嫔听说后主动说崔家熟悉江南与旧蘅地香材，可以替内务府核旧制。她说得顺理成章，连皇后都觉得省事。`,
      `十日后，香匣原封送回。封签是真的，验印是真的。`,
      `含章第一次闻时却皱了一下眉。`,
      `“怎么？”昭氏问。`,
      `“尾味不一样。”`,
      `昭氏笑她多心：“在大晟库房里闷十天，什么味都能变。”`,
      `她说完便把香匣推回案内。`
    ],choices:[{label:'继续',effects:{flags:{oldIncenseReturned:true,hanzhangNoticesScentChange:true}},result:''}]},

    {heading:'第八幕 · 一位低位新人先有了孩子',cast:['gu','baopu'],fx:'lantern',text:s=>[
      `承熙四年正月，新入宫的低位嫔妃里先有人报了喜脉。`,
      `有孕的是${lowPregTitle(s)}。她不是最漂亮，也不是最常被召的，甚至有几次请安站错过位置。`,
      `皇后把喜脉折送来时说：“有孕可酌晋一级。按常例，不必越序。”`,
      `${courtTitle(s,'baopu')}那日正好在凤仪宫。她听见“喜脉”两个字，先笑着恭喜，后来低头剥了一颗橘子，剥到一半却没吃。`,
      `昭妃把剥到一半的橘子放回碟里。果皮断在她指尖，沾了一点汁。`,
      `你要不要让这桩普通喜脉改变她的位分？`
    ],keyDecision:true,choices:[
      {get label(){const k=lowPregKey(state);return `${PEOPLE[k].name}有喜，照例晋一级`;},hint:'低位宫嫔也按同一套规则，只进一阶',effects:{flags:{promoteLowPregnant:true,lowNpcPregnant:true}},result:s=>`${PEOPLE[lowPregKey(s)].name}接旨时紧张得把册书拿反。宫里笑了半日，第二天便把注意力重新移开。昭氏却记住了这件事。`},
      {label:'暂不晋位，只加月例与医药',hint:'有孕不必自动换来身份',effects:{trust:{gu:1},flags:{lowNpcPregnant:true,lowNpcNoPromotion:true}},result:s=>`皇后照旨只加月例。${PEOPLE[lowPregKey(s)].name}没有抱怨，反而松了口气，说自己还没记熟新位分的礼。昭氏听说以后只问一句：“原来有孩子也可以不晋。”`}
    ]},

    {heading:'第九幕 · 和妃的旧案从晋嫔家的一本军粮簿开始',cast:['shen','ke'],fx:'ink',narrative:true,text:s=>[
      `同年春，晋嫔父兄从北营送入一批换防旧册。她本来只想给皇后看军眷名册，却在一本旧军粮簿里看见沈氏旧营的营号。`,
      `她没有直接送到御前，而是先问和妃：“娘娘认不认得这个号？”`,
      `和妃手指在茶盏沿停住。`,
      `“认得。”`,
      `霍家旧簿记着一件很不起眼的事：沈氏兄长被定“脱营”后的第二日，那个营仍照原人数领过军粮。`,
      `这还不能证明他无罪，却足够证明“人已经逃了”与“军粮仍按人在营中领”之间至少有一个地方不对。`,
      `和妃没有马上来找我。她只把那一页抄下来，夹进旧茶罐底。`,
      `沈氏旧案从此有了第一块不靠回忆的实物。`
    ],choices:[{label:'继续',effects:{trust:{shen:2,ke:2},flags:{shenOldCaseSeededByKe:true}},result:''}]},

    {heading:'第十幕 · 承熙四年的后宫并不只围着一个人转',cast:['gu','shen','ning','ke','hui','baopu'],fx:'petal',narrative:true,text:s=>[
      `这一年里，宫里的灯有自己的规律。`,
      `初一、十五多在凤仪宫。皇后常把白日没敢定的事留到夜里问，问完仍要把册子抚平再睡。`,
      `永和宫的旧茶每月总有一两次。和妃的话没有因为旧军粮簿变多，反而更少。她开始偶尔提“十年前北营”的天气，却不提人名。`,
      `徽嫔的恩宠不热，却很稳。她更多时候出现在祭礼、女眷宴和凤仪宫的长案边。太后偶尔留下她说两句话，皇后也会把最琐碎的宫册交给她校。外人看着是亲近，只有凤仪宫的人知道：徽嫔每替皇后办妥一件没有旧例可循的事，皇后夜里就会把那件事的旧档再翻一遍。`,
      `晋嫔更少侍寝，但每逢北营有折，她常被太后留下多坐一会儿。`,
      `元嫔最像水。她既不抢，也不退，哪里有空隙便自然补上。她与昭氏甚至越来越熟，偶尔互换香囊、衣样与江南胭脂。`,
      `${courtTitle(s,'baopu')}仍是最显眼的一个。只是她开始看得见别人也有自己的路：有人靠家族，有人靠稳，有人什么都没做便先有孩子。`,
      `昭氏回拾遗阁后，把当月请脉的日子重新抄了一遍。`
    ],choices:[{label:'继续',effects:{flags:{year4HaremEcologySet:true}},result:''}]},

    {heading:'第十一幕 · 慢性暗害没有“下毒那一夜”',cast:['baopu','hui','hanzhang'],fx:'rain',narrative:true,text:s=>[
      `承熙四年夏到五年冬，昭氏一直在用那批复验过的旧香。不是每天点炉，也不是吞服。香丸多数放在衣箱、枕匣和袖袋里，味道一点点贴在她身上。`,
      `真正被动过手脚的东西因此很难被发现：它不是烈毒，没有一次明显发作，也没有一碗可以当场验出的药。`,
      `太医院后来在旧香中验出“沉霜末”，这是孕舍禁用的香料。医官只写了一句：久熏无益，孕中尤忌。`,
      `崔家旁支掌着当时一段贡香复验。昭氏的旧香正是在那里重新封过。`,
      `元嫔本人从未碰过香丸。她只在一次闲谈里说过：“外来的皇嗣若真落地，朝里会多许多人睡不着。”`,
      `这句话不够定罪。甚至连她自己都可以解释成一句政治判断。`,
      `含章却一直记得那股变过的尾味。她把一颗旧香丸留在空棋罐里，没有告诉任何人。`
    ],choices:[{label:'继续',effects:{trust:{hanzhang:2},flags:{slowPoisonWorking:true,hanzhangKeepsIncenseSample:true,huiFamilySupplySuspect:true}},result:''}]},

    {heading:'第十二幕 · 承熙五年，昭氏开始把“有没有孩子”当成考试',cast:['baopu','wenheng','fang'],fx:'candle',narrative:true,text:s=>[
      `承熙五年，低位嫔妃的孩子已经会扶着桌沿走。昭氏每次见到，都笑得很好。`,
      `她的《承露录》却从“陛下爱喝什么”慢慢变成“这月请脉几次”“小日子迟几日”“元嫔几次承宠”“五公主何时会叫人”。`,
      `蘅嫔看见后没有立刻阻止。她自己也还相信：若昭氏能有一个孩子，这个孩子既能给女儿安全，也能让蘅地旧人多一层不敢轻动的保护。`,
      `方常在偶尔来送点心，看见她算日期便说：“娘娘，孩子又不是按账本来的。”`,
      `昭氏笑：“你不懂。”`,
      `方常在很诚实：“是不懂。”`,
      `方常在走后，昭氏把那一页日期从头算到尾，又重新算了一遍。`
    ],choices:[{label:'继续',effects:{flags:{baopuHeirObsessionClear:true}},result:''}]},

    {heading:'第十三幕 · 六月终于有喜',cast:['baopu','wenheng','hanzhang','gu'],fx:'seal',text:s=>[
      `承熙六年六月，昭氏终于有喜。`,
      `太医报喜时，她先把窗边香匣合上，又很快重新打开：“只是香，又不是药。”`,
      `蘅嫔站在廊下看人铺防滑毡，脸上第一次真正松下来。含章则把那只装着旧香样本的棋罐从书架上拿到自己房里。`,
      `皇后把晋位折送来，仍旧只写：“有喜可酌晋一级，不越序。”`,
      `昭氏已经知道折子在御案，却没有来问。傍晚只送一碗酸汤。`,
      `你要不要让这场喜脉改变她的位分？`
    ],keyDecision:true,choices:[
      {get label(){return `照例晋${courtTitle(state,'baopu')}一级，行全礼`;},hint:'只进一阶，不越序',effects:{flags:{promoteBaopu:true,baopuPregnant:true,baopuPromotionStyle:'full'}},result:s=>`${courtTitle(s,'baopu')}接册时笑着嫌礼服腰封太紧。蘅嫔亲手替她扶正妃冠。含章站得稍远，目光却在那只重新放回衣箱的香匣上停了一瞬。`},
      {get label(){return `照例晋${courtTitle(state,'baopu')}一级，免繁礼`;},hint:'只进一阶，把体力留给养胎',effects:{flags:{promoteBaopu:true,baopuPregnant:true,baopuPromotionStyle:'quiet'}},result:s=>`位分照晋，繁礼免去。${courtTitle(s,'baopu')}嘴上说省事，晚间却让人把新礼服挂在灯下看了很久。她等这一阶等得太久，哪怕不办礼，也要亲眼看见。`},
      {label:'暂不晋位，只加恩赏与医药',hint:'喜脉不自动换来位分',effects:{trust:{gu:1},bond:{baopu:-1},flags:{baopuPregnant:true,baopuPromotionStyle:'none'}},result:'位分没动。昭氏笑着说“那就等孩子出生再说”。宫人退下后，她把赏单夹进《承露录》，在“位分”二字旁划了一道很深的线。'}
    ]}
  ];

  // --------- 第七章：昭氏失子明确为慢性暗害，并把主控防备、蘅嫔动机、元嫔世家线串起来 ---------
  CHAPTERS[6].date='承熙六年六月至腊月';
  CHAPTERS[6].title='香尽胎寒';
  CHAPTERS[6].theme='真正伤她的不是一碗突然出现的毒，是几年来被当成安全、甚至被盖过官印的东西';
  CHAPTERS[6].bridge=s=>`昭氏有孕以后，拾遗阁把所有风险都当作可以列清单的东西：门槛包软毡、饮食重新验、太医轮值固定。唯一没有被拿走的，是那批早已盖过内务府复验印的旧香。因为所有人都以为，最危险的东西已经在几年前被检查过。`;
  CHAPTERS[6].steps=[
    {heading:'第一幕 · 怀孕以后，她第一次主动少用香',cast:['baopu','hui','hanzhang'],fx:'petal',narrative:true,text:s=>[
      `喜脉坐稳以后，昭氏自己把香炉撤了。`,
      `她不是怕香，只是太医说孕中少闻浓味。衣箱里的旧香囊却没有撤——那股味道太轻，又是她用了多年的东西。`,
      `元嫔来贺喜时送一匹江南软缎，没有送香。她甚至笑着说：“姐姐如今什么都别换，熟悉最好。”`,
      `含章听见“熟悉”两个字，目光落在衣箱上。`,
      `那天夜里，她把自己留下的旧香样本和姐姐衣箱里新拆的一颗放在两张白纸上。颜色几乎一样。只有燃尽后的灰，一份松，一份结得更硬。`,
      `她仍没有证据。只把两张纸包起来。`
    ],choices:[{label:'继续',effects:{flags:{incenseAshCompared:true}},result:''}]},

    {heading:'第二幕 · 孕期不是一条直线',cast:['baopu','gu','fang','wenheng'],fx:'candle',narrative:true,text:s=>[
      `头三个月很安稳。皇后每月来一次，不多坐，只核太医单与膳房单。她把所有香囊都列成“已验物”，因此从未要求再验第二次。`,
      `方常在送来一双左右脚缝反的小鞋，被昭氏笑了整整一刻钟。`,
      `蘅嫔则开始真的像一个等外孙的母亲：问小衣、问乳母、问孩子将来能不能学蘅语。`,
      `到了第五个月，昭氏偶尔会有一点腹痛和见红。症状不重，歇一日便好。太医把原因写成“旧损未复、心绪太过”。`,
      `她因此更不敢停下笑。每次我去，她都先问：“臣妾今日看起来是不是很好？”`,
      `一个人越害怕失去，越容易把所有异常解释成自己不够努力。`
    ],choices:[{label:'继续',effects:{flags:{baopuWarningSigns:true}},result:''}]},

    {heading:'第三幕 · 主控第一次怀疑蘅嫔',cast:['wenheng','hanzhang'],fx:'ink',narrative:true,text:s=>[
      `第六个月的一次小出血后，裴景和把昭氏全部衣箱重新封存。旧香自然也在其中。`,
      `我先问蘅嫔：“香是谁给她的？”`,
      `“我。”`,
      `“谁做的？”`,
      `“蘅国旧宫坊。原方我记得。”`,
      `“进大晟以后谁碰过？”`,
      `蘅嫔抬眼：“陛下的人。”`,
      `这句话并不是推责。我的规矩确实要求旧香进入内务府复验。`,
      `我又问她那些年为什么一直催昭氏求子。`,
      `她沉默很久：“因为臣妾以为，一个孩子能让她在这里更安全，也能让蘅地那些还活着的人多一条命。”`,
      `“所以你拿女儿当筹码。”`,
      `蘅嫔脸色第一次变了。`,
      `“陛下也一样。”`,
      `屋里静了下来。`,
      `含章站在门边，没有替任何一边说话。回去以后，她把母亲那页口供单独折了角：“这一页先不和香案并在一起。下毒是谁做的，另查。”`
    ],choices:[{label:'继续',effects:{trust:{wenheng:-2,hanzhang:2},flags:{emperorSuspectsWenheng:true,hanzhangNeedsIndependentTruth:true}},result:''}]},

    {heading:'第四幕 · 雪落产房',cast:['baopu','wenheng','hanzhang','xielin'],fx:'snow',narrative:true,text:s=>[
      `腊月初八，昭氏忽然发动。比预计早了许多。`,
      `拾遗阁四个时辰没有真正安静过。热水、炭盆、太医、女医、宫人的脚步一层层叠在一起。`,
      `蘅嫔坐在廊下，把一方帕子攥得失去形状。含章站在门边，一次次确认原定女医是否都在。`,
      `天亮前，孩子没有保住。`,
      `昭氏醒着。她脸白得像枕巾，第一句却不是问孩子。`,
      `“陛下是不是又要觉得臣妾没用？”`,
      `这句话比哭更难答。`,
      `她问完以后把脸转向床里，手一直压在被角上。`
    ],choices:[{label:'继续',effects:{trust:{baopu:-2},flags:{majorMiscarriage:true}},result:''}]},

    {heading:'第五幕 · 不是急毒，是几年以前就进来的东西',cast:['hanzhang','shen','peiyan'],fx:'ink',narrative:true,text:s=>[
      `孩子没保住后的第二日，含章把两份香灰送到御前。`,
      `太医院又调来旧蘅香原方与内务府复验样本。三份东西第一次放在同一张案上。`,
      `太医院把三份香灰分开验过。旧蘅香原方无碍，承熙三年复验返还的那一批却验出“沉霜末”。医官将“孕舍禁用”四字圈了两遍。`,
      `含章问：“是谁加的？”`,
      `裴景和把复验单翻到背面。经手的香料库掌事出身崔家旁支的贡造行。`,
      `和妃在旁边忽然说：“这个姓我见过。”`,
      `不是在后宫，是沈家旧军需账里。崔氏几代都替朝廷做供给生意，手伸到哪里并不奇怪。`,
      `和妃把沈家旧军需账翻到夹着崔氏商号的那一页，推到裴景和面前：“这个商号，再查一次。”`
    ],choices:[{label:'继续',effects:{trust:{hanzhang:4,shen:2},flags:{slowPoisonConfirmed:true,cuiSupplyLinkConfirmed:true}},result:''}]},

    {heading:'第六幕 · 元嫔没有被定罪',cast:['hui','gu','baopu'],fx:'candle',narrative:true,text:s=>[
      `我召元嫔来问。`,
      `她没有哭，也没有立刻说“臣妾不知”。她先把崔家近三年的贡香账册全部交出来。`,
      `“崔氏确实经手。”她说，“可经手不等于臣妾下令。”`,
      `这句话在证据上成立。`,
      `复验库掌事已经失踪，账里有一页被撕。崔家旁支那家供香行则在两个月前突然关门。所有东西都指向同一条线，却没有一封能写着“元嫔令”的字。`,
      `皇后照例翻宫规，翻到“外家干预内廷”那一条时停住：“若无实证，只凭家族关系……不能直接废位。”`,
      `她说得对。也正因为对，才让人更烦。`,
      `我没有动元嫔的位分，只停她承宠、换掉香料库全部人手，并下令从此孕宫用物复验不得由原供应家族经手。`,
      `昭氏听说后笑了一声：“所以有人想让我生不下来，但没人知道是谁。”`,
      `她没有大哭。她只是从那天开始，看每一份善意都像隔着一层纸。`
    ],choices:[{label:'继续',effects:{trust:{hui:-4,gu:1,baopu:-3},flags:{huiUnderWatch:true,baopuKnowsSabotageLikely:true}},result:''}]},

    {heading:'第七幕 · 蘅嫔终于知道自己那句话害了女儿多久',cast:['wenheng','baopu','hanzhang'],fx:'candle',narrative:true,text:s=>[
      `蘅嫔来床边时，没有带那只旧香匣。`,
      `昭氏闭着眼：“母亲不是说孩子进宗谱才握得住吗？”`,
      `蘅嫔坐下，过了很久才说：“是我错了。”`,
      `昭氏睁眼。`,
      `她大概等过很多句安慰，从没等过这一句。`,
      `“错在哪？”`,
      `“我把你能不能有孩子，当成了你有没有未来。”`,
      `昭氏看着她，忽然笑：“现在才知道？”`,
      `含章在窗边背对她们，把那只旧香样本重新包好。`,
      `这次失子并没有立刻把一家人推向决裂。它先给每个人留下一种不同的罪：蘅嫔的催逼，我的防备，崔氏家族的暗手，昭氏自己对价值的执念。几年以后，这些罪才会一起回到重阳那把刀上。`
    ],choices:[{label:'继续',effects:{bond:{wenheng:-1,baopu:-1,hanzhang:1},flags:{wenhengGuiltExplicit:true}},result:''}]},

    {heading:'第八幕 · 她还会再求一个孩子',cast:['baopu','fang'],fx:'snow',narrative:true,text:s=>[
      `三个月后，昭氏开始下床。`,
      `方常在来看她，把那双缝反的小鞋洗过一次又带回来。`,
      `“还留着？”昭氏问。`,
      `“扔了可惜。”`,
      `昭氏摸着那双鞋，没有再笑她笨。`,
      `“我还会有的。”她说。`,
      `方常在本想说“当然”，最后只点了点头。`,
      `这一句“还会有”不是希望那么简单。它也是昭氏后来不肯停手的开始。她已经知道有人想断她的孩子，正因为如此，她更不能接受自己真的被断掉。`
    ],choices:[{label:'翻到下一章',effects:{flags:{baopuWillTryAgain:true}},result:''}]}
  ];

  // 第八章开头补一句：后续两次早失为上次损伤与长期耗损余波，不是“又有人下毒”。
  if(CHAPTERS[8]?.steps?.[0]?.text){
    const old=CHAPTERS[8].steps[0].text;
    CHAPTERS[8].steps[0].text=s=>{
      const arr=typeof old==='function'?old(s):old;
      return [...arr,`太医院后来把这两次早失归在上一次重创之后的余损里，没有发现新的外来毒物。对昭氏来说，这个结论并没有让她安心——它只意味着承熙六年的那一匣香，即使已经烧掉，后果还留在她身体里。`];
    };
  }

  // --------- 方线：明确幕后，与昭氏案形成同一世家政治逻辑的回响 ---------
  if(CHAPTERS[10]?.steps){
    const st6=CHAPTERS[10].steps[5];
    if(st6?.text){
      const old=st6.text;
      st6.text=s=>[...old(s),`太医同时确认顺贵人有先兆小产。胎息尚在，却已经极不稳。有人不是只想让太后出事，也在把她的孩子一起拖进案子。`];
    }
    const st10=CHAPTERS[10].steps[9];
    if(st10?.text){
      const old=st10.text;
      st10.text=s=>{
        const arr=old(s);
        return [...arr,`那碗药下去以后，顺贵人先失去了孩子。她本人随后迅速衰弱。到这一步，方案已经不再只是“构陷她毒害太后”，而是有人借调查中的混乱，把一个本就不稳的孕体彻底推到绝路。`];
      };
    }
    const st12=CHAPTERS[10].steps[11];
    if(st12?.text){
      const old=st12.text;
      st12.text=s=>{
        const arr=old(s);
        const acc=s.flags.lowAccompliceKey&&PEOPLE[s.flags.lowAccompliceKey]?PEOPLE[s.flags.lowAccompliceKey].name:'一名低位宫嫔';
        return [...arr,
          `<span class="poison-trace"><b>真正合上的第四条线</b>香药局掌事收银的来源，最终追到崔家旧贡造行。送药环节使用的红纸小印，由元嫔陪嫁祁嬷嬷拿旧样私刻并交给跑腿人；${acc?acc+'曾替祁嬷嬷递过一次无名口信，只知道要把话送到，不知道后面接的是药与假口谕。':'另有一名无名宫人替她递过口信，身份最终没有写进正册。'}王静娴不在这条递信链上。</span>`,
          `昭氏当年的慢性暗害与顺贵人这一次并不是同一场具体行动，却出自同一种政治逻辑：崔氏外家不愿看见一个带着亡国母族的皇嗣坐大，也不愿看见一个几乎没有强大母族、却真正得我偏爱的孩子出现。前者可能成为旧蘅势力的旗，后者则可能让我摆脱世家平衡。`,
          `元嫔没有亲手配香，也没有亲手端药。可她后来承认，承熙六年她已经知道家里有人“动了旧香”，她选择没有说。顺贵人案发前，她又看见陪嫁嬷嬷与香药局往来，仍旧没有问到底。`,
          `崔氏本人是否下令，仍需另证。`,
          `皇后听到这里很久没有翻册子。因为这一次旧例很清楚：若坐实外家谋害皇嗣，应废位、问族。真正难的是，证据能不能穿过祁嬷嬷、贡造行和几层内务府关系，直接落到元嫔本人身上。`,
          `崔家旧贡造行的账册另封，继续查验。`
        ];
      };
    }
  }

  // 人物页同步
  PEOPLE.gu.bio='中宫皇后。她熟悉礼制、擅长维持秩序，却真正害怕的是旧例之外的判断。承熙三年第一次大选把三个强势世家同时送进六宫，她从此不只要管妃嫔，也要面对每个妃嫔背后的朝堂。';
  PEOPLE.shen.bio='和妃。旧茶与沈氏军案贯穿多年。第一次正式选秀后，霍家旧军粮簿给她留下第一块实物线索；她与晋嫔的交集，让这桩旧案在承熙三年至六年之间一直没有真正消失。';
  PEOPLE.wenheng.bio='蘅国旧后、后册蘅嫔。她进宫既是被迫接受亡国后的新身份，也是主动换取女儿安全、旧王府妇孺宽免与消息通道的一场政治交换。她曾相信女儿的恩宠与皇嗣能替旧人争到更多活路，这份算计后来成为她最深的悔意之一。';
  PEOPLE.baopu.bio='闻人氏长女。明艳、妩媚、极善抢场，也把“被看见”当成可以练习的能力。第一次正式选秀让她发现恩宠会被新世家分走；一名低位新人先有孩子，又让她把求子变成证明价值的考试。承熙六年的慢性暗害不是她疯狂的唯一原因，却把她对失宠、失子和无用的恐惧彻底钉死。';

  // 春秋笔法补选秀与昭氏暗害背景
  if(typeof annalFor==='function'){
    const annalV31=annalFor;
    annalFor=function(i){
      if(i===5)return '承熙三年，诏行大选。邵氏、霍氏、崔氏皆以名门入嫔位，另留低位宫嫔数人。六宫始备。——《大晟史·后妃传》';
      if(i===6)return '承熙六年冬，昭氏失皇嗣。上命核内务府香药旧案，罢香料库数人。案久未能尽白。——《大晟史·内廷记》';
      return annalV31(i);
    };
  }

  // 大改迁移：若旧档已走过第六章，保留前五章选择，自动退回第六章开头重走新结构。
  if(!state.flags?.v31Migrated){
    const first5=(state.history||[]).slice(0,5);
    const hadProgress=(state.index||0)>=5;
    if(hadProgress){
      const intro=state.intro;
      state=clone(INITIAL_STATE);state.intro=intro;
      // 新人物初始状态补入重建后的state
      newKeys.forEach(k=>{state.ranks[k]='待选';state.bond[k]=28;state.trust[k]=35});
      first5.forEach((p,idx)=>{state.index=idx;applyRecordedChapter(idx,p);state.index=idx+1});
      state.index=5;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];
    }
    state.flags.v31Migrated=true;
  }
  // 已完成选秀的存档重新解锁随机低位人物卡
  (state.flags.lowConsorts||[]).forEach(k=>{if(PEOPLE[k])PEOPLE[k].introducedAt=5});

  save();render();
}catch(e){console.error('v31 patch failed',e)}
})();
