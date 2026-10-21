(()=>{try{
  document.documentElement.dataset.build='v72';
  document.title='宫灯未眠 · 全线合流与中宫抚养 v72';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));
  const IX=(c,q)=>c?.steps?.findIndex(x=>(x.heading||'').includes(q))??-1;
  const AS=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return []}};
  const currentTitle=CHAPTERS[state.index]?.title||'';
  const currentHeading=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
  const mergeMap={
    '间隙 · 柱中旧纸':'旧茶未凉',
    '间隙 · 城南药价':'凤仪宫最后一冬',
    '间隙 · 西华门外':'王府旧笼',
    '间隙 · 极西那一栏':'中宫空悬',
    '青衣过重门':'帘后朱笔'
  };

  function spliceSteps(parent,afterQuery,steps,tag){
    if(!parent?.steps||parent.steps.some(x=>x?.[tag]))return;
    const arr=steps.map((st,i)=>{st[tag]=true;return st});
    let at=afterQuery?IX(parent,afterQuery)+1:parent.steps.length;if(at<=0)at=parent.steps.length;
    parent.steps.splice(at,0,...arr);
  }
  function takeChapter(title){const i=CHAPTERS.findIndex(c=>c.title===title);if(i<0)return null;return CHAPTERS.splice(i,1)[0]}
  function relabel(st,prefix){if(!st)return st;const h=String(st.heading||'').replace(/^第一幕 · |^第二幕 · /,'');st.heading=`${prefix} · ${h}`;return st}

  // 1. 把四个“插播”与女史线真正并回母线，解决阅读顺序与时间交叉。
  const oldPaper=CH('间隙 · 柱中旧纸');
  if(oldPaper){spliceSteps(CH('旧茶未凉'),'平反文书怎么写',oldPaper.steps.map(s=>relabel(s,'宫外旧纸')),'v72MergedOldPaper');takeChapter('间隙 · 柱中旧纸')}
  const city=CH('间隙 · 城南药价');
  if(city){spliceSteps(CH('凤仪宫最后一冬'),'第一张告示先写“不追责”',city.steps.map(s=>relabel(s,'城南')),'v72MergedCity');takeChapter('间隙 · 城南药价')}
  const wangOut=CH('间隙 · 西华门外');
  if(wangOut){spliceSteps(CH('王府旧笼'),'采选诏书成了她唯一能看见的门',wangOut.steps.map(s=>relabel(s,'王府门外')),'v72MergedWang');takeChapter('间隙 · 西华门外')}
  const kelanPage=CH('间隙 · 极西那一栏');
  if(kelanPage){spliceSteps(CH('中宫空悬'),'二月 · 黛拉自己选那扇门',kelanPage.steps.map(s=>relabel(s,'珂兰文书')),'v72MergedKelan');takeChapter('间隙 · 极西那一栏')}
  const office=CH('青衣过重门');
  if(office){spliceSteps(CH('帘后朱笔'),'九月十五，永和宫那声“元照”被孩子听见了',office.steps.map(s=>relabel(s,'女史院')),'v72MergedOffice');takeChapter('青衣过重门')}

  // 2. 母线桥接：前一条线的后果直接成为下一条线的入口。
  const oldCase=CH('旧茶未凉');
  if(oldCase)oldCase.bridge=s=>`重阳行刺以后，我开始习惯同一件事多看一份来处。沈氏旧案因此没有只停在宫里的军籍上；北去驿道还有一个退役老卒，把十一年前抄下的那一页藏在茶棚柱子里。宫内翻案，宫外等名字改回去，本来就是同一件事的两头。`;
  const wang=CH('王府旧笼');
  if(wang)wang.bridge=s=>`方小满案刚落卷，第二次采选便送到御前。名单里有张元照，删名信却先从顺王府来。宫里问她愿不愿进，西华门外一座旧别业也正在清点她住过九年的钥匙——同一段“照顾”，从两边看出了完全不同的样子。`;
  const winter=CH('凤仪宫最后一冬');
  if(winter)winter.bridge=s=>`七月荷风宴散后，宫里还在说冰酪和风轮。八月第一扇病院门落锁，城南药铺也开始一天改一次价牌。宫墙里有人试着让病人敢开口，宫墙外却有人因为怕封街把“发热”说成“受凉”。同一场病，从一开始就不只发生在凤仪宫。`;
  const vacant=CH('中宫空悬');
  if(vacant)vacant.bridge=s=>`凤印空了一年，继后之议、三皇子的成年、珂兰密信与张元照的来处在同一个冬春挤到御前。黛拉要决定回不回故国，三皇子要学会不再从另一个人身上找母后，张元照则要回答：若她真的坐上中宫，哪些决定可以替别人做，哪些不可以。`;
  const late=CH('帘后朱笔');
  if(late)late.bridge=s=>`凤印落定以后，宫里没有从此安稳。张元照开始替御前分折，沈知微替她把太直的话磨成朝臣肯答的文字；与此同时，疫后留下的一批识字女子被推到另一扇门前——她们若有本事，除了做宫女、做妃嫔，还能不能有第三种身份。两条线最后在同一个问题上碰头：一个人靠什么资格进入权力。`;

  // 3. 修掉原先 v63 因脚本中断而没有真正执行的位额与大封全名单。
  const CAPS={'皇贵妃':1,'贵妃':2,'妃':4,'嫔':6};
  const ORDER=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];
  const baseRank=v=>{v=String(v||'');if(/^故|^废|^未入宫|^待选|^待封/.test(v))return null;for(const r of ORDER.slice().reverse())if(v===r||v.endsWith(r))return r;return null};
  const aliveHarem=(s=state)=>Object.keys(s.ranks||{}).filter(k=>PEOPLE[k]&&baseRank(s.ranks[k])&&!/^故|^废/.test(String(s.ranks[k]||'')));
  const countRank=(r,s=state)=>aliveHarem(s).filter(k=>baseRank(s.ranks[k])===r).length;
  const applyV72=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(applyV72&&!globalThis.__v72Caps&&!globalThis.V63_RANK_CAPS){globalThis.__v72Caps=true;applyChoiceEffects=function(c){const before={...(state.ranks||{})};let out=applyV72(c)||[];for(const [r,cap] of Object.entries(CAPS)){let ks=aliveHarem().filter(k=>baseRank(state.ranks[k])===r);while(ks.length>cap){const changed=ks.filter(k=>baseRank(before[k])!==r);if(!changed.length)break;const k=changed[changed.length-1];state.ranks[k]=before[k];out=out.filter(x=>!String(x).includes(PEOPLE[k]?.name||'§'));out.push(`${PEOPLE[k]?.name||k}未晋${r}：该位只设${cap}人，改为原位厚赏。`);ks=aliveHarem().filter(x=>baseRank(state.ranks[x])===r)}}return out};}
  function rosterHTML(s=state){
    const lines=['皇贵妃','贵妃','妃','嫔','贵人','常在','答应'].map(r=>{const xs=aliveHarem(s).filter(k=>baseRank(s.ranks[k])===r).map(k=>`${courtTitle(s,k)} ${PEOPLE[k]?.name||''}`);return `<div class="rankline"><b>${r}${CAPS[r]?` <small>${xs.length}/${CAPS[r]}</small>`:''}</b><span>${xs.length?xs.join('　｜　'):'—'}</span></div>`}).join('');
    let kids=[];try{kids=(globalThis.v52ChildRecords?globalThis.v52ChildRecords(s):[]).filter(x=>!x.dead).map(x=>`${x.order} ${x.name}`)}catch(_e){}
    return `<div class="v72-roster"><h3>大封落定后的六宫</h3>${lines}<p><b>现存皇嗣：</b>${kids.length?kids.join('　｜　'):'依当前玉牒为准'}</p><small>皇后另列中宫，不占皇贵妃位额。皇贵妃一人、贵妃二人、妃四人、嫔六人。</small></div>`;
  }
  const snow=CH('雪尽宫门');
  if(snow&&!snow.steps.some(x=>x.v72Roster||String(x.heading||'').includes('大封后，宫中还有谁'))){
    let at=IX(snow,'大封六宫');if(at<0)at=snow.steps.length-1;
    snow.steps.splice(at+1,0,{heading:'红旨宣完，名字再念一遍',cast:['taihou'],fx:'ink',narrative:true,v72Roster:true,text:s=>[
      `宣旨的人退下以后，慈宁宫正殿还留着一股新墨和红绸的味道。我没有立刻走。刚才一串位分听得太快，真正坐在这座宫里的究竟还有谁，反而应该慢一点看。`,
      rosterHTML(s),
      `太后从头看到尾，把手炉往膝上挪了挪：“以后这些人要生病、要生孩子、要嫁女儿，也会有娘家来求事。位分只是今天这一笔，日子还在后面。”`
    ],choices:[{label:'合上名册，往后过日子',effects:{flags:{v72SealRoster:true}},result:''}]});
  }

  // 4. 中宫抚养：不是抹掉生母，而是让张元照建立自己的家庭关系；同时成为后期派别的新压力。
  const west=CH('西华门外');
  if(west&&!west.steps.some(x=>x.v72Foster)){
    const at=IX(west,'承熙十六年八月');
    const foster={heading:'承熙十六年冬 · 凤仪宫添了两只小碗',cast:['zhangyuanzhao','song2','liang2','afu'],fx:'snow',keyDecision:true,v72Foster:true,text:s=>{
      if(s.flags?.v44NewEmpress!=='zhangyuanzhao')return [`这一年宗人府仍议过幼嗣抚育，但本局张元照并未受凤印，中宫过继一事不由她作主。宋氏公主与梁氏幼皇子仍各由生母抚养。`];
      const hasP=!!s.flags?.v69LatePrincess,hasM=!!s.flags?.v69LatePrince;
      if(!hasP&&!hasM)return [`凤仪宫这一年没有可议的幼嗣。张元照也没有因为自己没有亲生皇嗣，就从别宫硬挑一个孩子过来。`];
      return [
        `冬至前，宗人府送来一道很旧的说法：中宫没有亲生皇嗣，可择幼嗣“归皇后抚养”，以定名分。纸上列了两个名字——${hasP?'宋文秀所出的'+s.flags.v69LatePrincess.order+'杨宜哉':''}${hasP&&hasM?'，以及':''}${hasM?'梁素贞所出的幼皇子杨顺澜':''}。`,
        `张元照看完先问：“归我抚养以后，生母那一栏怎么写？”`,
        `宗人府答：“照旧例，可改记中宫抚育，生母另注。”`,
        `她把纸推回来：“另注不行。谁生的就写谁生的。若孩子住凤仪宫，写‘中宫抚养’；别把母亲挪到小字里。”`,
        `我问她：“你想养么？”`,
        `她沉默了一会儿。桌角的小风轮早已经坏过三次，只剩一片竹叶还挂着。她伸手拨了一下：“想不想和该不该，是两件事。”`,
        hasP?`宋文秀被叫来时，第一句话不是求女儿留在自己宫里，而是：“若她去凤仪宫，臣妾还能天天见么？”张元照答：“你是她母亲，不用把见孩子变成恩典。”`:null,
        hasM?`梁素贞来得更直：“若皇子住进中宫，外头一定有人说储位有变。”张元照道：“所以先把这句话说死：住在哪里，不等于立谁。谁拿一个孩子的床铺去猜储位，先问他到底在替谁着急。”`:null,
        `阿芙在旁边没有插话。第二日她却让小厨房添了两只很小的青瓷碗，又把凤仪宫东暖阁最矮的一张桌角包了软布。她以前只在听雨轩照顾过一只瘸腿猫，从没想过自己还会在中宫替孩子收玩具。`
      ].filter(Boolean);
    },choices:[
      {label:'让宋氏公主住进凤仪宫，由中宫抚养',hint:'张元照：“她的生母仍是宋氏。我只管她住在这里以后怎么长大。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'&&!!s.flags?.v69LatePrincess,v72Foster:'princess',effects:{trust:{zhangyuanzhao:2,song2:3,liang2:-1},flags:{v72FosterPrincess:true}},result:'杨宜哉迁入凤仪宫东暖阁。宋文秀照常来见女儿；江南宋家却立刻有人把这件事解释成“宋氏重新得势”。'},
      {label:'让梁氏幼皇子住进凤仪宫，由中宫抚养',hint:'梁素贞：“养可以。别让兵部替他先想储位。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'&&!!s.flags?.v69LatePrince,v72Foster:'prince',effects:{trust:{zhangyuanzhao:2,liang2:3,ke:1},flags:{v72FosterPrince:true}},result:'杨顺澜迁入凤仪宫。军门当天便有人借题试探储位，御前随即申明：中宫抚养与储立无关。'},
      {label:'两个都接来，生母照常来往',hint:'不是为了多养两个皇嗣，只是凤仪宫终于要有孩子长期住下。',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'&&!!s.flags?.v69LatePrincess&&!!s.flags?.v69LatePrince,v72Foster:'both',effects:{trust:{zhangyuanzhao:3,song2:2,liang2:2,afu:2},flags:{v72FosterPrincess:true,v72FosterPrince:true}},result:'凤仪宫第一次同时摆了两张小床。外朝反而更难把中宫抚养解释成单押某一家，但“张后聚皇嗣”的闲话也从这年冬天开始。'},
      {label:'不过继，孩子都留在生母宫中',hint:'张元照：“中宫不是非得用一个孩子证明自己像个家。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao',v72Foster:'none',effects:{trust:{zhangyuanzhao:2,song2:1,liang2:1},flags:{v72FosterNone:true}},result:'宗人府旧例没有启用。凤仪宫仍会请孩子来读书吃饭，却不改变任何抚养归属。'},
      {label:'中宫不是张元照，照旧由生母抚养',hint:'这一条只用于其他继后分支。',requires:s=>s.flags?.v44NewEmpress!=='zhangyuanzhao',effects:{},result:'张元照没有凤印，也不会越过中宫决定皇嗣抚养。两个孩子仍各自留在生母宫中。'}
    ]};
    west.steps.splice(at>=0?at+1:2,0,foster);
  }

  // 5. 过继的前因后果继续进入后期政治，而不是单独可爱一场就消失。
  const lu=west&&ST(west,'宗室清议多了一个');
  if(lu&&!lu.v72FosterEcho){const old=lu.text;lu.text=s=>{
    const xs=AS(old,s);
    if(s.flags?.v44NewEmpress!=='zhangyuanzhao')return xs;
    if(s.flags?.v72FosterPrince)return [...xs,`宗室清议后来最爱拿凤仪宫里的杨顺澜说事：“张皇后自己没有亲生皇子，却把梁氏的皇子养在凤仪宫，谁能不猜储位？”陆既明没有跟着喊。他只在条陈末尾问了一句：既然一个孩子住进哪座宫都能被解释成政治，那么承熙元年那个连出生都没写进玉牒的孩子，又是谁替他解释过一次？`];
    if(s.flags?.v72FosterPrincess)return [...xs,`宋氏公主住进凤仪宫以后，江南旧家很快把一个孩子的寝宫说成恩宠回潮。陆既明在条陈里拿这件事讥过一句：“活着的孩子总有人抢着解释。”当时没人知道，他真正想的并不是宋家。`];
    return xs;
  };lu.v72FosterEcho=true}
  const reveal=west&&ST(west,'他自己把西华门那一夜送到御前');
  if(reveal&&!reveal.v72FosterEcho){const old=reveal.text;reveal.text=s=>{
    const xs=AS(old,s);const line=s.flags?.v72FosterPrince?`他看了一眼凤仪宫方向：“十六年，你们可以把另一个皇子接进中宫，公开写谁生、谁养、谁探望。我不是嫉妒他。我只是想知道，为什么我出生那年，连‘生’这个字都嫌多。”`:s.flags?.v72FosterPrincess?`他道：“后来你们连公主住哪座宫、由谁抚养都可以摊开说。原来不是皇家的事都不能写，只是当年我的事不肯写。”`:null;return line?[...xs.slice(0,6),line,...xs.slice(6)]:xs};reveal.v72FosterEcho=true}

  // 6. 皇嗣页把中宫抚养写清楚，不改生母。
  const oldChildren72=typeof childrenView==='function'?childrenView:null;
  if(oldChildren72&&!globalThis.__v72Children){globalThis.__v72Children=true;childrenView=function(){let h=oldChildren72();const f=state.flags||{};let note='';
    if(f.v72FosterPrincess&&f.v69LatePrincess)note+=`<p><b>${f.v69LatePrincess.order} ${f.v69LatePrincess.name}</b>：生母宋氏；承熙十六年冬起由皇后张元照在凤仪宫抚养，生母身份与日常来往不变。</p>`;
    if(f.v72FosterPrince&&f.v69LatePrince)note+=`<p><b>${f.v69LatePrince.order} ${f.v69LatePrince.name}</b>：生母梁氏；承熙十六年冬起由皇后张元照在凤仪宫抚养。中宫抚养不等同储位。</p>`;
    if(note)h=h.replace('</main>',`<section class="v72-foster"><h4>中宫抚养</h4>${note}</section></main>`);return h};}

  // 7. 人物录加“前后人物”索引，避免后期人物越来越多以后断代。
  const oldPeople72=typeof peopleView==='function'?peopleView:null;
  if(oldPeople72&&!globalThis.__v72People){globalThis.__v72People=true;peopleView=function(){let h=oldPeople72();
    const groups=[
      ['潜邸与中宫','gu','shen','zhou','taihou'],
      ['闻人旧国','wenheng','baopu','hanzhang'],
      ['第一次大选','ning','ke','hui','cao2','zhao2','lin2','ye2','du2','su2'],
      ['第二次采选','zhangyuanzhao','liang2','song2','xu2'],
      ['贯穿前后的旁支','fang','afu','shunwang','peiyan','xielin','daila','xulingyi','yinprince']
    ];
    const seen=k=>{try{return typeof known==='function'?known(k):true}catch(_e){return true}};const rows=groups.map(g=>{const names=g.slice(1).filter(k=>PEOPLE[k]&&seen(k)).map(k=>`${courtTitle(state,k)||PEOPLE[k].title} · ${PEOPLE[k].name}`);return names.length?`<div class="row"><b>${g[0]}</b>${names.join('　｜　')}</div>`:''}).join('');
    if(rows)h=h.replace('<div class="people-grid">',`<section class="v72-cast-index"><span class="eyebrow">人物前后</span>${rows}</section><div class="people-grid">`);return h};}

  // 8. 大事录直接给出“合流图”，但只放在大事录，不污染正文。
  const oldChron72=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron72&&!globalThis.__v72Chron){globalThis.__v72Chron=true;chronicleView=function(){let h=oldChron72();const f=state.flags||{};const lateAt=CHAPTERS.findIndex(x=>x.title==='西华门外');if((state.index||0)<lateAt&&!f.v69LatePrincess&&!f.v69LatePrince&&!f.v69HiddenPrinceRevealed)return h;const extra=`<section class="v72-threadmap"><span class="eyebrow">承熙十九年 · 故事合流</span><h3>这些线最后不是各走各的</h3><div class="v72-threadmap-grid">
  <div><b>主控与中宫</b>顾明宜把秩序守到生命尽头；她死后，主控先逃避，后又被三皇子、继后与外朝重新逼回“必须自己落最后一笔”的位置。</div>
  <div><b>方小满 → 阿芙 → 元照</b>方氏案中${f.fangInvestigation==='threeDays'?'煎药房的无名替班':'假口谕'}让阿芙去核对交接簿；阿芙的交接习惯进入秋疫，和含章、元照的方法合在一起，后来又反查许淑惠案、机务案与陆既明旧案。</div>
  <div><b>顺王 → 元照 → 三皇子</b>元照在王府学到“照顾也会变成控制”；所以三皇子把丧母之痛投向她时，她没有私下接住，而是把父子之间的位置还给主控。</div>
  <div><b>崔宋供应 → 许氏暗害 → 女史院</b>冰库的一枚银扣后来变成秋疫里一张被改过的调院牌；许淑惠之死又把她的堂姐送进女史院，让元照的新制度第一次面对“真证据也会被复仇剪掉一页”。</div>
  <div><b>周氏双生 → 皇女婚议</b>承熙元年被抹去的男婴在宫外长大，十八年后先让周清漪从二公主的相貌里起疑，再故意走进亲姐姐的婚议，把主控最早的一道死令重新送回御案。</div>
  <div><b>珂兰与宫疫</b>宫疫沿西路人流与迟报一路进京；黛拉带来的珂兰旧记录补上了宫里查不到的一半，也让“译什么、隐瞒什么”从外交线重新回到全书的判断问题。</div>
  </div>${f.v72FosterPrince||f.v72FosterPrincess?`<p><b>中宫抚养：</b>${f.v72FosterPrincess?'杨宜哉':''}${f.v72FosterPrincess&&f.v72FosterPrince?'、':''}${f.v72FosterPrince?'杨顺澜':''}进入凤仪宫以后，孩子不再只是背景，也直接改变了宗室清议如何看待张元照与储位。</p>`:''}</section>`;return h.replace('</main>',extra+'</main>')};}

  // 9. 卷终旧“六段/八段”容易被多版补丁叠成提纲，隐藏旧版，换成一版真正合流后的十九年脉络。
  const oldEnd72=typeof ending==='function'?ending:null;
  if(oldEnd72&&!globalThis.__v72End){globalThis.__v72End=true;ending=function(){let h=oldEnd72();const spine=`<section class="v72-spine"><span class="eyebrow">故事回看</span><h2>十九年，故事最后合成五条路</h2><ol>
  <li><b>家与权：</b>杨叙从把六宫交给顾明宜，到失去皇后后不断把决定推给别人，再到三皇子、张元照和前朝一次次逼他亲自承担结果。主控没有变成另一个人，只是再也不能把“有人替我看”当成“我已经决定”。</li>
  <li><b>旧案与记录：</b>沈氏军籍、方小满案的送药记录、宫疫、许淑惠调院牌、沈知微副稿和陆既明旧回执都在讲同一件事：纸不会自己说真话，人也会改纸。含章、阿芙、元照各自补了其中不同的一块。</li>
  <li><b>母亲与孩子：</b>顾明宜与三皇子、周清漪与双生姐弟、霍梁宋等人的新皇嗣，以及张元照后来是否抚养幼嗣，让“谁生、谁养、谁替孩子决定”从后宫家事一路长成储位与宗室政治。</li>
  <li><b>女人如何进入权力：</b>沈知微从旧案当事人到御前掌笔，含章从证据守门人到坚持本人选择，张元照从第二批新人走到中宫与章奏，女史院再把这条路从妃嫔身份之外重新开了一扇门。</li>
  <li><b>宫墙以外：</b>北境老卒、城南药铺、顺王别业、珂兰疫路与陆既明都证明，宫里的每一道裁断都会在外面长出第二种生活。十九年后，真正回到御前的往往正是当年以为已经处理完的那一部分。</li>
  </ol></section>`;h=h.replace(/<section class="v55-spine">[\s\S]*?<\/section>/,spine);return h};}

  // 10. 修正文档中几个后期旧口径，让二公主与合流线不再出现旧版大公主残句。
  const w=CH('西华门外');
  if(w){for(const st of w.steps||[]){if(typeof st.heading==='string')st.heading=st.heading.replace('大公主','二公主');const old=st.text;st.text=s=>AS(old,s).map(x=>String(x).replaceAll('大公主婚议','二公主婚议').replaceAll('大公主已经','二公主已经').replaceAll('大公主自己','二公主自己').replaceAll('大公主因此','二公主因此').replaceAll('大公主碰过','二公主碰过').replaceAll('大公主喜欢','二公主喜欢').replaceAll('大公主没有被否定','二公主没有被否定').replaceAll('大公主名誉','二公主名誉').replaceAll('大公主自请','二公主自请').replaceAll('大公主选择','二公主选择').replaceAll('最疼的孩子','那一夜活下来的另一个孩子'))}}

  // 10.5 大封后几版补丁曾留下两场几乎相同的“念名册/叫错封号”，这里保留信息更完整的一场并按日期排回去。
  if(snow){
    snow.steps=snow.steps.filter(st=>!['红旨宣完，名字再念一遍','正月初七，新封号还没叫顺'].includes(String(st.heading||'')));
    const tailNames=['红旨落定以后，名字要一一念完','红毡卷走以后，第二批少了一把椅子','正月十一 · 红旨未干，纸外先起了风','正月十二 · 张元照到尚宫局借的不是册子','正月十六 · 新封号叫错的第一天','二月初三 · 阿芙在旧簿里看见一个没有接收人的孩子'];
    const tail=[];for(const name of tailNames){const i=snow.steps.findIndex(x=>String(x.heading||'')===name);if(i>=0)tail.push(snow.steps.splice(i,1)[0]);}
    const sealAt=IX(snow,'大封六宫');if(sealAt>=0)snow.steps.splice(sealAt+1,0,...tail);
  }

  // 11. 章节合并后保持当前阅读位置。若正好停在被合并章，跳到母章中的同名场景。
  const targetTitle=mergeMap[currentTitle]||currentTitle;const ni=CHAPTERS.findIndex(c=>c.title===targetTitle);if(ni>=0){state.index=ni;if(mergeMap[currentTitle]&&currentHeading){const si=CHAPTERS[ni].steps.findIndex(x=>String(x.heading||'').includes(currentHeading.replace(/^第一幕 · |^第二幕 · /,'')));state.chapterStep=si>=0?si:0}else state.chapterStep=Math.min(state.chapterStep||0,(CHAPTERS[ni].steps?.length||1)-1)}

  state.flags=state.flags||{};state.flags.v72Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v72 full weave/foster patch failed',e)}})();
