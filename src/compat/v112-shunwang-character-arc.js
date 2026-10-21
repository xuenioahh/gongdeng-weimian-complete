(()=>{try{
  document.documentElement.dataset.build='v112';
  document.title='宫灯未眠 · 顺王杨承晏全局人设梳理润色 v112';
  const CH=t=>(CHAPTERS||[]).find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x?.heading||'').includes(q));
  const AS=(v,s)=>{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]};
  const wrap=(st,tag,fn)=>{if(!st||st[tag])return;const old=st.text;st.text=s=>fn(AS(old,s).map(String),s);st[tag]=true};
  const append=(st,tag,fn)=>wrap(st,tag,(a,s)=>[...a,...fn(s)]);
  const insertAfter=(ch,q,obj,tag)=>{if(!ch?.steps||ch.steps.some(x=>x?.[tag]))return;const i=ch.steps.findIndex(x=>String(x?.heading||'').includes(q));if(i<0)return;obj[tag]=true;ch.steps.splice(i+1,0,obj)};

  // 1. 第一次正式回宫：他不是落魄王爷，而是主动把自己放到权力边缘的人。
  const tea=CH('旧茶未凉');
  wrap(ST(tea,'太后寿宴把顺王叫回宫'),'__v112WangReturn',(a,s)=>{
    if(a.some(x=>x.includes('背后正好是实墙')))return a;
    const i=a.findIndex(x=>x.includes('坐得很偏'));
    if(i>=0)a.splice(i+1,0,
      `他挑的位置背后正好是实墙，抬眼能看见正门和侧门。年轻时出入军帐留下的习惯，这么多年没有改。只是如今再没有人等他发号施令。`,
      `宗室里有人过来寒暄，他一律起身回礼，不留人久坐。不是失势后的谨慎，更像他自己把能牵出的线一根根剪短了。`
    );
    return a;
  });

  // 2. 沈氏军令：他递过复核，也确实在复核被压下后选择停手。责任不能洗掉。
  wrap(ST(tea,'军令不是一张纸'),'__v112WangMilitary',(a,s)=>{
    if(a.some(x=>x.includes('没有再递第二封')))return a;
    const i=a.findIndex(x=>x.includes('“因为那时再查下去，会牵出更多人。”'));
    if(i>=0)a.splice(i+1,0,
      `“那次复核石沉大海以后，臣没有再递第二封。”`,
      `沈知微问：“是怕再死人，还是怕顺王府剩下的人也被拖进去？”`,
      `顺王看了她很久：“都有。”`,
      `这句比一句“无能为力”难听得多，也更接近当年的事实。他不是没有看见沈家兄长被推去顶罪；他只是到了必须拿自己的人、自己的旧部、自己的位置再赌一次时，停了。`
    );
    return a;
  });

  // 3. 兄弟关系：不是赢家/输家，而是同一种“先替别人算风险”的习惯走向两处。
  const alone=ST(tea,'我与顺王单独谈了一次');
  if(alone&&!alone.__v112Brother){
    alone.text=s=>[
      `当夜我留顺王在偏殿。没有和妃，也没有珍妃。`,
      `我问：“你恨朕？”`,
      `他垂眼转酒杯：“年轻时恨过。”`,
      `“因为这个位置？”`,
      `顺王终于抬头：“臣想过不被人摆布，不等于想坐这里。”`,
      `这句话我信一半。先帝末年，谁都不可能真的站在局外。顺王有旧部、有军功、有人押过他的名字；我有储位、有东宫，也有一批必须保住的新任官员。我们都说自己是在护人。`,
      `“沈家的复核，你停了一次。”我道。`,
      `“陛下也停了一次。”`,
      `“所以你觉得一样？”`,
      `他摇头：“不一样。陛下把人放进一张局里算，臣喜欢把人圈在自己看得见的地方。最后都觉得，只要是为了少出事，就可以先替别人决定一点。”`,
      `我没有立刻反驳。`,
      `顺王笑了一下，很淡：“臣退了兵权、退了朝局，这些年还以为只要不碰天下，就不会再把谁推到不想去的位置。”`,
      `那时我没有问他，王府门里的人是不是也这样想。`,
      `我们把那份旧档重新摊开。窗外更鼓过了一遍，谁也没有再谈输赢。`
    ];
    alone.__v112Brother=true;
  }

  // 4. 王府旧笼：给顺王自己的版本。理由可以成立，烧路引与羞辱仍然是他的责任。
  const cage=CH('王府旧笼');
  insertAfter(cage,'她不肯谢恩',{
    heading:'顺王说，他只是不能再看一个人走错路',cast:['shunwang','emperor'],fx:'candle',narrative:true,text:s=>[
      `张元照把路引的事说完以后，我没有让两个人当面对质，只单独召顺王入宫。`,
      `“路引是你烧的？”`,
      `“是。”`,
      `“为什么？”`,
      `顺王没有否认她想走。他甚至把理由说得很清楚：张氏族宅已经多年没人真正照看她；三门议亲里，一家盯着王府旧关系，一家子弟有赌债，第三家想借她父亲留下的旧档攀门路。`,
      `“她不知道这些。”`,
      `“她十八岁。”`,
      `“十八岁便不会选错？”`,
      `我看着他：“所以你替她选？”`,
      `顺王沉默了一会儿：“臣只是不能再看一个人明知道外头有坑，还非要往里走。”`,
      `“沈知微？”`,
      `他的手指在杯沿停住。`,
      `“起初不像。”他说，“后来有些地方像。都不求人，都以为知道代价就等于承受得起。”`,
      `我问：“你是在护张元照，还是想证明这一次你能把人护住？”`,
      `顺王很久没有回答，最后只道：“有什么分别？”`,
      `那一刻我才听明白问题正在哪里。对他来说，保护一个人和拥有替她决定风险的资格，已经长成了同一件事。`,
      `王府替她挡过的婚事可以是真的；他烧路引、加门禁、当众逼她受训也同样是真的。前一件事不能替后一件事抵账。`
    ],choices:[{label:'回去继续问张元照本人',effects:{trust:{shunwang:1,zhangyuanzhao:2},flags:{v112HeardShunwangVersion:true}},result:'我没有叫顺王替她回答。终选名册上要不要留这个名字，仍回到张元照本人。'}]
  },'__v112WangOwnVersion');

  // 5. 顺王最终去留：第一次只写自己的去处，不再把任何女人塞进同一封“安排”。
  const cageLast=cage?.steps?.find(st=>/永和宫里，那句话并不陌生|顺王.*去处|旧封别业/.test(String(st?.heading||'')));
  if(cageLast&&!cageLast.__v112Exit){
    cageLast.heading='顺王第二日递折，只写自己的去处';
    cageLast.text=s=>[
      `旧箱退回以后，顺王没有再给张元照送第二只箱子，也没有再写“她不宜如何”。`,
      `第二日，他递进来一封自己的折子。`,
      `前半页只认三件事：烧路引是他下的令；王府加门禁是他下的令；替张元照压婚帖也是他自己做的。没有“下人会错意”，也没有“本意是为她好”。`,
      `后半页写：“臣过去总以为，看得远的人替近处的人选一步，事后总会明白。如今不敢再求谁明白。”`,
      `最后才写自己的去处：回旧封别业，或仍留京中王府。`,
      `这是他这些年第一封没有顺手替另一个人安排下一步的折子。`,
      `张元照没有来替他选。沈知微也没有。最后这一回，顺王只需要承担自己的去处。`
    ];
    cageLast.choices=[
      {label:'准顺王赴旧封别业，非诏不必入京',hint:'离京不是赎罪，只是第一次由他自己承担自己的去处',effects:{flags:{v94WangThreadReframed:true,shunwangFinalFate:'fief',shunwangLeaves:true,v112ShunwangOwnExit:true},trust:{zhangyuanzhao:2,shen:1}},result:'顺王离京时只带一把旧琴和两车书。张元照没有送，沈知微也没有。他没有得到一场被原谅的告别，只得到一条终于只属于自己的路。'},
      {label:'仍留京中，明旨不得再干预张氏内廷事务',hint:'人留京，边界写清；改变不能只靠他自觉',effects:{flags:{v94WangThreadReframed:true,shunwangFinalFate:'capital',shunwangLeaves:false,v112ShunwangBoundaryByEdict:true},trust:{zhangyuanzhao:1}},result:'顺王仍住京中王府。旨意把“不得再以旧日监护干预张氏私事”写得很清楚。他想没想通并不影响这道旨意。以后他不能再替张元照决定私事。'}
    ];
    cageLast.__v112Exit=true;
  }

  // 6. 女史制反对：保留他看得到制度风险的能力，也保留他总想替人解释动机的旧毛病。
  const late=CH('帘后朱笔');
  const oppose=(late?.steps||[]).find(st=>st?.v76id==='shunwang-late-opposition'||String(st?.heading||'').includes('顺王从封地递来一封很长的折子'));
  append(oppose,'__v112Opposition',s=>[
    `新章程按他指出的两处补完后，我让人把改稿抄了一份送回去。顺王没有再写第二篇长论，只回六个字：“已阅，臣知已改。”`,
    `他没有为最后那段私话道歉，也没有撤回自己的判断。他很会看规矩哪里会出问题，却还是常常替别人做主。这一点，他到很晚才改。`
  ]);

  // 7. 沈知微终局：他最后的进步不是“终于会爱”，而是被拒绝以后真的不再送第二封。
  const shenAfter=(late?.steps||[]).find(st=>st?.v76id==='shunwang-after-shen-fate'||String(st?.heading||'').includes('处分还没出宫，顺王的信先到了'));
  append(shenAfter,'__v112AfterShen',s=>[
    `后来无论她去了哪里，顺王都没有再托第三个人转话。不是因为旧情忽然断了，也不是终于证明自己变成了一个好人；只是这一次，“不”终于停在了“不”。`
  ]);

  // 8. 人物卡：不再用“占有欲极强”概括，让他的长处、过失与有限变化同时存在。
  function syncShunwang(s=state){
    const p=PEOPLE?.shunwang;if(!p)return;
    const f=s.flags||{};
    p.signature='说话前常先把风险列完；真正被拒绝时会沉默很久。年轻时善琴，断弦和旧谱很少扔。';
    if(f.v76ShunwangOpposesReform){
      p.tags=['宗室亲王','看得见制度风险','仍爱替人解释'];
      p.bio='先帝诸子之一。沈氏旧案里，他曾递过复核，却在复核被压下后选择停手；张元照寄居王府时，他又把照拂、判断与控制逐渐混成一件事。她入宫以后，他不再能替她决定去留，却仍会从宗室与制度角度反对新政。有些批评确实指出了漏洞，有些话仍旧把自己的理解放在当事人意愿之前。他不是失去判断力，而是直到很晚才学会：他看得再远，也不能替别人决定下一步怎么走。';
    }else if(f.shunwangFinalFate==='fief'){
      p.tags=['宗室亲王','退居旧封','只决定自己的去处'];
      p.bio='年轻时有军功，也曾真心替沈知微挡过事、收留孤女张元照。问题在于，他把“我替你挡过风险”逐渐理解成“我比你更有资格决定下一步”。沈氏旧案与王府旧笼都让这套逻辑付出代价。最后他离京赴旧封，不代表过去被原谅，只代表他第一次把一封折子只写自己的去处。';
    }else if(f.shunwangFinalFate==='capital'){
      p.tags=['宗室亲王','留京自守','边界由明旨写清'];
      p.bio='年轻时有军功，也曾真心照拂过沈知微与张元照；同样真实的是，他习惯把保护和替人作主混在一起。张元照入宫后，他仍留京中王府，但御前明旨写清不得再以旧日监护干预她的私事。他想没想通都不重要。旨意已经写明，他不能再替张元照作主。';
    }else if(f.v47WangLetterSeen||f.v49ShenSeesWangPattern||f.v112HeardShunwangVersion){
      p.tags=['宗室亲王','救人也控人','把保护当判断权'];
      p.bio='先帝诸子之一，年轻时善琴，也曾领军。沈氏旧案里他递过复核，却没有在第一次受阻后继续追；后来收留张元照，又从给书房、给钥匙、替她挡婚事，一步步走到压婚帖、加门禁、烧路引。他并非不知道别人想走，而是太相信自己更知道哪条路安全。';
    }else if(f.militaryTruth||f.shenCaseOpened){
      p.tags=['宗室亲王','旧案当事人','护短'];
      p.bio='先帝诸子之一。年轻时有军功，善琴，长期少入内廷。沈家军令旧案重新翻起后，他承认自己当年递过一次复核，也承认复核被压下以后没有继续追。他习惯先保住仍在自己身边的人，这既让他救过人，也让他放弃过本该继续追问的事。';
    }else{
      p.tags=['宗室亲王','久离权场','善琴'];
      p.bio='先帝诸子之一。年轻时有军功，后来长期不领实职、少入内廷。说话不多，习惯先看门、人和退路，再谈自己的意思。宫里只知道他与沈氏旧军案有旧牵连；他为什么离权力中心这么远，尚没人当面问清。';
    }
  }
  syncShunwang(state);

  // 9. 人物页是旧补丁最容易再次覆盖顺王简介的地方；先保存本层结果，再对旧页面输出做最后替换。
  if(typeof peopleView==='function'&&!globalThis.__v112People){
    globalThis.__v112People=true;const oldPeople112=peopleView;
    peopleView=function(){
      syncShunwang(state);
      const desiredBio=PEOPLE.shunwang?.bio||'';
      const desiredTags=[...(PEOPLE.shunwang?.tags||[])];
      let h=oldPeople112();
      const overwrittenBio=PEOPLE.shunwang?.bio||'';
      if(desiredBio&&overwrittenBio&&desiredBio!==overwrittenBio)h=h.split(overwrittenBio).join(desiredBio);
      if(PEOPLE.shunwang){PEOPLE.shunwang.bio=desiredBio;PEOPLE.shunwang.tags=desiredTags;}
      h=h.replace(/兄弟，也是长期的政治对手。主控知道顺王救过沈知微、养过张元照；也看见他一旦觉得自己“最懂这个人”，就会开始替对方决定该住哪、该嫁谁、该不该走。/g,
      '两人是兄弟，也有一个很像的毛病：都觉得自己看得更远，所以有时会先替别人作主。杨叙用的是圣旨和章程，杨承晏用的是王府里的照管和门禁。');
      return h;
    };
  }
  const oldRender112=render;
  render=function(){
    const out=oldRender112();
    syncShunwang(state);
    // 若当前正停在人物页，用最终 peopleView 再落一次，避免 v49/v76 的旧简介留在 DOM。
    try{if(state.view==='people'&&typeof peopleView==='function'){const appEl=document.getElementById('app');if(appEl)appEl.innerHTML=peopleView();}}catch(_e){}
    return out;
  };

  state.flags=state.flags||{};state.flags.v112Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v112 shunwang character patch failed',e)}})();
