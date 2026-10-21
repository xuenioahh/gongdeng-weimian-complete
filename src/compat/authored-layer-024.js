(()=>{try{
  const ch=t=>CHAPTERS.find(x=>x.title===t);
  const st=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));

  // 1) 静态资料与动态系统统一，避免页面初次渲染短暂显示旧设定。
  if(CHILDREN.ruoxi){
    CHILDREN.ruoxi.order='大公主';
    CHILDREN.ruoxi.note='现存皇女中序齿第一，生母已故宁嫔，由皇后顾明宜抚养。她自幼常在凤仪宫听大人说话，后来比同龄孩子更早学会看场面、照应年幼弟妹。';
  }
  if(PEOPLE.fang){
    PEOPLE.fang.bio='原在御花园花房当差，与阿芙同房值宿。一次救猫受伤后才真正被御前记住，后来由宫女籍除名、册为常在，迁听雨轩。她熟悉领花、领炭、送物和太医院取药的宫道；这些最普通的旧差事，后来都被人重新写成了“熟悉各处出入”。';
  }
  const front=MAP_SPOTS?.find(x=>x.name==='前朝');
  if(front)front.desc='故事只偶尔经过这里。承熙十四年里许多真正改变人的决定，仍发生在宫门之后。';

  // 张元照：十年腊月仍十七，十一年二月前后满十八，终选时十八。
  if(PEOPLE.zhangyuanzhao){
    try{Object.defineProperty(PEOPLE.zhangyuanzhao,'age',{configurable:true,enumerable:true,get(){
      const c=CHAPTERS[state.index], step=c?.steps?.[state.chapterStep||0];
      const txt=`${step?.heading||''} ${c?.date||''}`;
      if(/承熙十年/.test(txt))return '17岁';
      return `${18+Math.max(0,yearNow()-11)}岁`;
    },set(_v){}})}catch(_e){}
  }

  // 2) 十三年春是顾皇后去世后的第二个春天；三皇子此时才满十八。
  const growth=ch('长枝渐高');
  if(growth){
    growth.date='承熙十三年·春至六月';
    growth.bridge=s=>`顾明宜死后的第二个春天，三皇子杨顺谦十八岁，大公主杨令兮十七。上书房里已经很少再有人把他们统称作“孩子”；更小的皇子皇女也开始有自己偏爱的先生、骑射、琴谱和脾气。顾明宜生前替顺谦挡下的一次次小错，霍氏不肯替儿子说的几句情，周清漪教女儿看人脸色的习惯，到这一年都慢慢长在孩子自己身上。`;
    const prince=st(growth,'三皇子已经十八');
    if(prince){
      const old=prince.text;
      prince.text=s=>{
        const a=typeof old==='function'?old(s):old;
        return [
          `承熙十三年三月，顺谦行冠礼后的第三日第一次坐到御前旁听河工。不是正式参政，只准听，不准落笔。`,
          `他进殿前先在廊下把袖口理了两次。这个动作像极了顾明宜。等真坐到案边，他却只翻了折子的第一页。`,
          ...(Array.isArray(a)?a:[a])
        ];
      };
    }
  }

  // 3) 中宫之争从十三年六月延续到十四年春，旧步骤里的具体日期保持向前走。
  const vacancy=ch('中宫空悬');
  if(vacancy){
    vacancy.date='承熙十三年·六月至十四年春';
    const summer=st(vacancy,'同一场夏雨');
    if(summer){
      const old=summer.text;
      summer.text=s=>{
        const a=typeof old==='function'?old(s):old;
        const arr=Array.isArray(a)?a:[a];
        if(arr.length&&typeof arr[0]==='string')arr[0]=arr[0].replace(/^十三年六月，/,'承熙十三年六月，');
        return arr;
      };
    }
    const reopen=st(vacancy,'凤仪宫重新开门');
    if(reopen){
      const old=reopen.text;
      reopen.text=s=>{
        const a=typeof old==='function'?old(s):old;
        const arr=Array.isArray(a)?a:[a];
        if(arr.length&&typeof arr[0]==='string')arr[0]=arr[0].replace(/^十四年二月，/,'承熙十四年二月，');
        return arr;
      };
    }
  }

  // 4) 顾明宜：删去“作者替人物总结”的句子，用动作继续表现她的懦弱与护短。
  const firstDawn=st(ch('宫门初定'),'天亮以前');
  if(firstDawn){
    const old=firstDawn.text;
    firstDawn.text=s=>{
      const a=typeof old==='function'?old(s):old;
      return (Array.isArray(a)?a:[a]).flatMap(x=>{
        if(typeof x!=='string')return [x];
        if(x.includes('她不是不守规矩。恰恰因为太守规矩'))return [
          `掌事说照例要扣那小宫女一月例银。顾明宜把旧器册翻到前年，指着“底足已有暗裂”那一行，让人把新破损并到旧损里。`,
          `“不是免罚。”她把册子推回去，“旧器自己有病，不能全算在人头上。”小宫女叩头出去以后，她又让掌事把那只银盏单独封起来，免得下一回再砸到别人手里。`
        ];
        return [x];
      });
    };
  }
  const guFever=st(ch('凤仪宫最后一冬'),'皇后也开始发热');
  if(guFever){
    const old=guFever.text;
    guFever.text=s=>{
      const a=typeof old==='function'?old(s):old;
      return (Array.isArray(a)?a:[a]).flatMap(x=>{
        if(typeof x!=='string')return [x];
        if(x.includes('__v89_removed_gu_summary__'))return [
          `邵明贞把宫务册从她膝上接走，她手指还压着东所那一页。册子已经离手，她仍低声补了一句：“顺谦夜里若再喘，先叫原来那位医官。”`,
          `邵明贞应了。她这才慢慢松开手。第二日清醒时，又问昨夜的处分有没有先送御前朱批；听见“没有越例”，眉心才舒开一点。`
        ];
        return [x];
      });
    };
  }

  // 5) 主控晚年不变成顺王式强迫者：即便被拒，最坏也是冷淡、撤回和不再追问。
  const night=ch('长夜未央');
  const reject=st(night,'第一次有人把传召退回来');
  if(reject?.choices?.length>=3){
    reject.choices[1]={
      label:'让她来外殿，把今夜改成一场公事',
      hint:'你被拒得不舒服，却仍把私人召见和御前差事分开',
      effects:{trust:{zhangyuanzhao:1},flags:{v47DrunkSummons:'official'}},
      result:'她来得很快，却只带了疫册。酒案留在内殿，外殿只点两盏灯。她把病籍、复值和新添的宫人调班讲完，起身告退。我没有留她，也没有问那张笺。门合上以后，我才回去把已经凉掉的酒喝完。'
    };
    reject.choices[2]={
      label:'把那张笺压在案下，三日不再单独召她',
      hint:'没有惩罚，也没有逼她来；只是被拒以后，你选择先退开',
      effects:{trust:{zhangyuanzhao:-1},flags:{v47DrunkSummons:'cold'}},
      result:'三日里，景阳宫送来的公文照常进养心殿，我却没有再传她进西暖阁。第四日公开核档，她照旧把册子摊开。我只问数字，没有问那晚；她也没有请罪。礼数还在，两个人都知道那一点不快也还在。'
    };
  }

  // 6) 从元年到十四年再补几处同一性格的回声：他一直先看、再问；后期只是越来越容易停在“看见”。
  const earlyLedger=st(ch('宫门初定'),'凤仪宫的一叠册页');
  if(earlyLedger&&!earlyLedger.v481EmperorEcho){
    const old=earlyLedger.text;
    earlyLedger.text=s=>{const a=typeof old==='function'?old(s):old;return [...(Array.isArray(a)?a:[a]),
      `回养心殿以后，我让裴景和把那两份互相矛盾的旧例也抄了一份。不是为了替皇后再选一次，而是想知道她下回遇到没有先例的事，会不会仍把最后一句推回来。那时我对人的判断，总愿意多等一回。`
    ];};earlyLedger.v481EmperorEcho=true;
  }
  const shenFinal=st(ch('旧茶未凉'),'我与顺王单独谈了一次');
  if(shenFinal&&!shenFinal.v481Echo){
    const old=shenFinal.text;
    shenFinal.text=s=>{const a=typeof old==='function'?old(s):old;return [...(Array.isArray(a)?a:[a]),
      `我把那张旧批红夹进新卷，没有烧。沈知微要的不是我说一句“当年情势不同”，而是让那两个字留在卷里，往后每个翻案的人都能看见：日期不对时，皇帝曾经看见，也曾经决定不查。`
    ];};shenFinal.v481Echo=true;
  }
  const finalChoice=st(ch('中宫空悬'),'凤印前最后一道旨');
  if(finalChoice&&!finalChoice.v481Echo){
    const old=finalChoice.text;
    finalChoice.text=s=>{const a=typeof old==='function'?old(s):old;return [...(Array.isArray(a)?a:[a]),
      `裴景和把朱笔搁到我右手边。右肋旧伤在阴天里仍有一点钝痛。我没有叫礼部替我把两份册书按“更稳妥”排先后，只让所有人退出去。殿里安静下来以后，那两份纸仍在原处。年轻时我总以为多看一会儿便能看懂；如今我知道未必看得懂，却也终于没有再把“不确定”当作不落笔的理由。`
    ];};finalChoice.v481Echo=true;
  }

  // 7) 当前年份与人物年龄再统一一次。死人停在卒年，活人随章节增长。
  const death={gu:11,baopu:8,fang:10,wenheng:8};
  const bases={emperor:[1,30],gu:[1,29],shen:[1,28],zhou:[1,27],wenheng:[2,37],baopu:[1,20],hanzhang:[1,20],fang:[1,17],peiyan:[1,31],xielin:[1,29],afu:[1,19],shunwang:[1,27],ning:[3,19],ke:[3,21],hui:[3,19]};
  for(const [k,[start,base]] of Object.entries(bases))if(PEOPLE[k]){
    try{Object.defineProperty(PEOPLE[k],'age',{configurable:true,enumerable:true,get(){
      let y=yearNow();
      if(death[k] && ((state.ranks?.[k]||'').startsWith('故') || (k==='gu'&&state.flags?.guDead)))y=Math.min(y,death[k]);
      return `${base+Math.max(0,y-start)}岁`;
    },set(_v){}})}catch(_e){}
  }

  // 8) 大事录的关键年份只保留最终有效记载。
  if(typeof historyRecordV38==='function'){
    const old=historyRecordV38;
    historyRecordV38=function(e,i){
      const t=e?.title||'';
      if(t==='王府旧笼')return '承熙十年冬至十一年春，张氏元照自顺王府旧居入采选，上命先问本人意愿。';
      if(t==='空宫点灯')return '承熙十一年春，再开采选。皇后顾氏抱病亲阅名册，张氏及梁、宋、许诸氏入宫。';
      if(t==='凤仪宫最后一冬')return '承熙十一年秋，内廷大疫。十月二十三日，皇后顾氏染疾崩；张氏协理疫务，病势至冬渐息。';
      if(t==='长夜未央')return '承熙十二年，上宴饮渐繁，召幸渐数，政事多命近臣先阅；中宫久虚。';
      if(t==='长枝渐高')return '承熙十三年春，三皇子顺谦年十八，诸皇子女渐长，始分教习。';
      if(t==='中宫空悬'){
        if(state.flags?.v44NewEmpress==='ning')return '承熙十四年春，册邵氏明贞为皇后，告庙受印。';
        if(state.flags?.v44NewEmpress==='zhangyuanzhao')return '承熙十四年春，特旨册张氏元照为皇后，告庙受印。';
        return '承熙十三年至十四年，中宫久虚，廷议册后。';
      }
      return old(e,i);
    };
  }

  save();render();
}catch(e){console.error('v48.1 final continuity patch failed',e)}})();
