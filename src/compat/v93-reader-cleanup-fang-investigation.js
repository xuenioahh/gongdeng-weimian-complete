(()=>{try{
  document.documentElement.dataset.build='v93';
  document.title='宫灯未眠 · 前台清理与方氏案重构 v93';
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const IX=(c,q)=>c?.steps?.findIndex(x=>String(x.heading||'').includes(q))??-1;
  const chosen=(s,k)=>{const a=s?.flags?.lowConsorts||[];return a.includes(k)};

  // 1) 前台只保留真正给读者使用的内容。历代“作者梳理/关系总结/主题总结”模块不再渲染。
  function stripBackstage(h){
    h=String(h||'');
    const classes=['v72-cast-index','v65-emperor-track','v66-court-note','v68-factions','v69-factions','v72-threadmap','v83-spine','v55-spine','v72-spine'];
    for(const c of classes){
      const re=new RegExp(`<section[^>]*class=["'][^"']*${c}[^"']*["'][^>]*>[\\s\\S]*?<\\/section>`,'gi');
      h=h.replace(re,'');
    }
    // v75 在不同页面共用 class；只删除“御前关系定名”这一块，不动人物页的人生录。
    h=h.replace(/<section[^>]*class=["'][^"']*v75-box[^"']*["'][^>]*>[\s\S]*?御前关系定名[\s\S]*?<\/section>/gi,'');
    // 旧版可能没有稳定 class，按标题兜底删除整块作者总结。
    const heads=['朱笔变过几次重量','帘后多了人，朱笔没有换主人','这些“派”不是谁在宫里挂出来的牌子','几件旧事终于长出了真正的后果','两件私人选择最后都进入了朝局','二十二年，最后收成五段','十九年，故事最后合成五条路'];
    for(const x of heads){
      const re=new RegExp(`<section[^>]*>[\\s\\S]*?${x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}[\\s\\S]*?<\\/section>`,'gi');
      h=h.replace(re,'');
    }
    return h;
  }
  if(typeof peopleView==='function'&&!globalThis.__v93People){const old=peopleView;globalThis.__v93People=true;peopleView=function(){return stripBackstage(old())};}
  if(typeof chronicleView==='function'&&!globalThis.__v93Chron){const old=chronicleView;globalThis.__v93Chron=true;chronicleView=function(){return stripBackstage(old())};}
  if(typeof ending==='function'&&!globalThis.__v93Ending){const old=ending;globalThis.__v93Ending=true;ending=function(){return stripBackstage(old())};}

  // 2) 方小满死后：不再让三位高位妃并排“开案情会”。先收遗物，再逐处问人。
  const fang=CH('听雨轩有喜');
  const oldEnd=ST(fang,'顺贵人的东西并不多');
  if(fang&&oldEnd){
    oldEnd.heading='方小满死后第三日 · 听雨轩封存';
    oldEnd.cast=['afu','gu','peiyan'];
    oldEnd.fx='candle';
    oldEnd.narrative=true;
    oldEnd.text=s=>[
      `方小满死后第三日，听雨轩开始封存。阿芙把柜门一格格打开，衣裳不多，食盒两个，旧针线一包，床头还有那本翻软了的胎教书。`,
      `箱底压着她当宫女时那件浅青短褂，袖口还是自己收过的针脚。阿芙把衣裳抖开，又重新叠好。`,
      `顾明宜来时只带了尚宫和一名记册女官。她站在门口看了一会儿，问：“${s.flags.fangInvestigation==='threeDays'?'药碗、封签、煎药房轮值簿':'药碗、封签、红纸口谕'}，都另封了？”`,
      `“都在。”阿芙答。`,
      `顾明宜翻到遗物清单最后一页，看见那件旧短褂：“这件也留着。”`,
      `她没有在听雨轩问案。封条贴好以后，裴景和把药碗和${s.flags.fangInvestigation==='threeDays'?'轮值簿':'口谕'}带回养心殿，阿芙抱着小灰最后一个出来。`
    ];
    oldEnd.choices=[{label:s=>s.flags.fangInvestigation==='threeDays'?'继续查药和换班':'继续查药和口谕',effects:{flags:{fangDead:true,v93FangItemsSealed:true},trust:{afu:1,gu:1}},result:''}];

    // 清掉此前围绕这一幕追加的重复群像/王氏总结标记，最终由上面的正文接管。
    delete oldEnd.v54WangAfterFang; delete oldEnd.v41Woven; delete oldEnd.v42Woven;

    // 3) 分开调查：库房/香药局/门禁分别进御前，不先拼成“完整答案”。
    const at=IX(fang,'方小满死后第三日');
    const add=[
      {v93id:'fang-storehouse',heading:'第五日 · 先问库房，再问香药局',cast:['emperor','peiyan','xielin'],fx:'ink',narrative:true,text:s=>[
        `第五日，裴景和把三本册子送到御案：内务府库房、香药局轮值、听雨轩门禁。没有把人全叫到一处，只按册上的名字一个个分开问。`,
        `木盒从慈宁宫送出以后，确实在内务府库房停过一夜。值夜库吏记得盒子来过，却说第二日交班时封绳已经换新；谁换的，他答不上来。`,
        `香药局那边少了一笔夜班交接。原本值夜的人被临时支去西库，替班人的名字没有写。账房却在同一天多收过一枚来历不明的银锭。`,
        s.flags.fangInvestigation==='threeDays'?`谢绍庭把门禁册摊开：“送药的人走平日送药的门，牌子和封签都是真的。煎药房最后一次换手却没有落名。”`:`谢绍庭把门禁册摊开：“送药的人走的是平日送药的门，牌子也是真的。假的是他手里那张红纸口谕。”`,
        s.flags.fangInvestigation==='threeDays'?`我问：“原值夜人是谁支走的？”`:`我问：“印从哪来？”`,
        `“还在追。”`,
        `我把三本册子分开放回桌上：“先别替它们拼成一个答案。名字一个个往前找。”`
      ],choices:[{label:'继续',effects:{flags:{v93FangSeparateInquiry:true}},result:''}]},
      {v93id:'fang-seal',heading:'第六日 · 旧贡造行的线索',cast:['emperor','peiyan','hanzhang'],fx:'seal',narrative:true,text:s=>s.flags.fangInvestigation==='threeDays'?[
        `第二天下午，含章送来煎药房轮值簿。原值夜人被支去西库，替班者没有落名；送药牌和封签本身都是真的。`,
        `香药局那枚来历不明的银锭还在核查。它与旧贡造行的往来能否接上，也须先查账，不能凭一枚银锭定谁下了换班令。`,
        `我命裴景和封存崔家旧贡造行在京的账册，谢绍庭继续找煎药房的替班者。崔静仪尚未被传问。`
      ]:[
        `第二天下午，含章只送来一件东西：那张假口谕和一枚从跑腿内监住处搜出的木印。`,
        `她没有坐下，站在御案前说：“印不是御前的。刀口太新，但字样照的是三年前废掉的旧式。”`,
        `裴景和随后查到，旧式样本曾由内务府发给几家贡造行做节庆纸印，其中一家姓崔。`,
        `跑腿内监熬到傍晚才供出名字：“祁嬷嬷。”`,
        `崔静仪的陪嫁嬷嬷。`,
        `我让谢绍庭先拿人，又叫裴景和封住崔家旧贡造行在京的账房。没有先传崔静仪。`
      ],choices:[{label:s=>s.flags.fangInvestigation==='threeDays'?'封存账册，继续追替班者':'先拿祁嬷嬷和账房',effects:{flags:{v93FangBranchInvestigated:true}},result:''}]},
      {v93id:'fang-cui-question',heading:'第八日 · 崔静仪单独进养心殿',cast:['emperor','hui','peiyan'],fx:'candle',narrative:true,text:s=>[
        `第八日，我才召崔静仪。她进来时没戴平日那支宝石簪，只把衣带系得很齐。`,
        s.flags.fangInvestigation==='threeDays'?`我把封存的旧贡造行账册放到她面前：“香药局那笔来路不明的银，你知不知道？”`:`我把祁嬷嬷的供词放到她面前：“你认不认这张旧印样？”`,
        s.flags.fangInvestigation==='threeDays'?`崔静仪看了账册，摇头：“臣妾不知道。”`:`她看了很久：“认得。臣妾陪嫁箱里以前有一份。”`,
        s.flags.fangInvestigation==='threeDays'?`“宫里煎药房临时换班，你家可有人插手？”`:`“祁嬷嬷拿走，你知不知道？”`,
        `“不知道。”`,
        `裴景和又递上一页香药局往来簿。祁嬷嬷的名字没有写在上面，崔家贡造行一个管事的私印却出现过两次。`,
        `我问：“承熙六年旧香案以后，你有没有问过家里还碰不碰宫里的香药？”`,
        `崔静仪手指压住袖口，半晌才答：“问过一次。家里说已经停了。”`,
        `“你信了？”`,
        `“臣妾当时信了。”`,
        `这句话只能证明她知道得不够多，不能证明她下过令。`,
        `我没有在这一日废她，只停了承宠，命崔家旧贡造行退出宫供，${s.flags.fangInvestigation==='threeDays'?'煎药房换班和香药局收银两线继续分查':'祁嬷嬷与香药局经手人继续分审'}。`
      ],choices:[{label:'案子继续往崔家旧贡造行查',effects:{trust:{hui:-3},flags:{huiUnderWatch:true,v93CuiNotYetConvicted:true}},result:''}]},
      {v93id:'fang-provisional',heading:'第十日 · 卷宗仍在追查',cast:['emperor','gu','peiyan'],fx:'ink',narrative:true,text:s=>[
        s.flags.fangInvestigation==='threeDays'?`十日后，香药局掌事收银已有凭据；煎药房无名替班者${s.flags.fangFinal==='evidence'?'被扣押，留下口供':'仍在追查'}。谁下令换班、谁向药中下毒，仍须继续查。`:`十日后，祁嬷嬷私刻旧印、香药局掌事收银、跑腿内监持假口谕送药三件事先后坐实。三人分别收监，口供仍分开存。`,
        `顾明宜把内廷处置册送来，只问：“崔氏呢？”`,
        `我把她那一页留在御案上：“还没有能直接落到她身上的东西。”`,
        `顾明宜翻到外家干预内廷那条，又合上：“那就先不写废位。”`,
        `她走后，裴景和把崔家两本贡造旧账另装一匣。匣上只写了四个字：继续查验。`
      ],choices:[{label:'合上这十日的卷宗',effects:{flags:{v93FangInquiryStageDone:true}},result:''}]}
    ];
    // 防止重复插入。
    if(!fang.steps.some(x=>x?.v93id==='fang-storehouse'))fang.steps.splice(at+1,0,...add);
  }

  // 4) 下一章不能再写“案子已经查清”。只承认直接经手者已定、崔氏线未结。
  const empty=CH('空宫点灯');
  if(empty){
    empty.bridge=s=>`顺贵人死后，${s.flags.fangInvestigation==='threeDays'?'煎药房替班与香药局收银分头追查，换班下令者仍未查明':'私刻旧印、收银和持假口谕送药的直接经手人先后入狱'}，崔家旧贡造行仍在查。听雨轩封了门，开春以后内务府先来修墙。宫里没有等所有旧账都结清，第二次采选的名册已经送到礼部。`;
  }

  // 5) 把几句仍然明显替读者下结论的旧文本从运行正文里过滤掉。
  const banned=[
    '所以她不是一个拿着毒碗的凶手。她更麻烦',
    '没有哪一个人单独做成整件事',
    '正因为每个人只动了一小步',
    '这件事没有在这一夜结束。它会成为下一篇',
    '几年以后再翻出来',
    '这层灰用了六年才真正落到御案上'
  ];
  for(const ch of (CHAPTERS||[]))for(const st of (ch.steps||[])){
    if(!st?.text||st.__v93Clean)continue;
    const old=st.text;
    st.text=s=>{const v=typeof old==='function'?old(s):old;return (Array.isArray(v)?v:[v]).filter(x=>!banned.some(b=>String(x).includes(b)));};
    st.__v93Clean=true;
  }

  state.flags=state.flags||{};state.flags.v93Build=true;
  globalThis.V93_QA={backstageHidden:true,fangRebuilt:!!fang?.steps?.some(x=>x?.v93id==='fang-storehouse')};
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v93 reader cleanup/fang investigation failed',e)}})();
