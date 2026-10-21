(()=>{try{
  document.documentElement.dataset.build='v61';
  document.title='宫灯未眠 · 全员鲜明识别点 v61';
  const V61_SIG={
    emperor:'思考时会慢慢转拇指上的白玉扳指；真正决定以后，手反而会停。',
    taihou:'沉香手炉几乎不离手；真要动怒或替谁担一句话时，她反而会把手炉放下。',
    gu:'越慌越要把衣襟、鬓发和纸角理齐；她的失控总先表现成“太整齐”。',
    shen:'重话往往等茶盖扣上以后才说；心里越有事，那盏茶越容易放到凉。',
    zhou:'习惯把帕子慢慢折成三折；真正尖的那句话，常在帕子收好以后才出口。',
    wenheng:'发间那支素银长簪几乎从不歪；越被逼到无路，她越会伸手再扶正一次。',
    baopu:'笑声总比人先到；越怕被忽略、越受伤，她反而笑得越亮。',
    hanzhang:'回答前总慢半拍；真正动怒时不会抬高声音，只会先把袖口一点点放平。',
    fang:'缝袋、系香囊都爱打一拉就开的活结；她不喜欢把任何东西系成死扣。',
    peiyan:'要说一句不好听的话以前，会先把御案上的朱笔、杯盖或折子摆正。',
    xielin:'进一间屋先看门、窗和人站的位置，再看屋里是谁；这是侍卫的本能，也是他的后遗症。',
    afu:'一忙就把两边袖口卷到腕上同样高；嘴上嫌麻烦，手永远已经先动了。',
    shunwang:'右手食指留着旧琴弦磨出的薄茧；越想把话说得温和，越会无意识在桌沿轻拨两下。',
    zhangyuanzhao:'爱在纸边画小方格；没解决的事宁可留一个空格，也不肯为了好看硬划掉。',
    ning:'称谓或名分一错，她会先纠正名字再谈事情；对她而言，叫对一个人是秩序的第一步。',
    ke:'坐下时总下意识把裙摆往靴边一收，像下一刻就要起身；宫里多年也没完全改掉军门习惯。',
    hui:'礼盒、账册系带都喜欢理成左右对称；越心虚或越不安，手下的结反而越漂亮。',
    cao2:'遇到乱局会用食指在自己掌心先画一遍路线；路一画清，她才开口。',
    zhao2:'听人说话时常先看手而不是看嘴；她记住的是谁理袖口、谁躲目光、谁改了一个小动作。',
    lin2:'听见太医院的术语会低声换成一句白话复述；她确认自己听懂以后才继续往下记。',
    ye2:'写完一页小楷会对着墨迹轻吹三下才抬头；外面越乱，她的字越稳。',
    du2:'一听见数目，手指就会在桌沿拨出算盘珠的节奏；没有算盘也照样在算。',
    su2:'哄孩子前总先轻轻拍两下再起南曲；哭得再乱，她自己的拍子也很少乱。',
    liang2:'看见弓弦会先用指腹捻一下湿度；她不用看天，就能说出今日的潮气重不重。',
    song2:'看见三张散单就忍不住先叠齐，第一反应总是“能不能并成一张”；后来才学会有些路必须故意留两条。',
    xu2:'行礼前嘴唇会无声把步骤数一遍；真正放松以后，左脸那个浅酒窝会先露出来。',
    daila:'越防备越笑得满殿都听见；真正被戳中或真正生气时，她反而会忽然不笑。',
    chen:'随身小布袋总分成三格收零碎；拿到月例也习惯先分成自己、宫人和寄家的三份。'
  };
  for(const [k,v] of Object.entries(V61_SIG))if(PEOPLE[k])PEOPLE[k].signature=v;

  // 人物录直接显示“识别点”，让识别点不依赖玩家记住作者设定。
  peopleView=function(){
    const visible=Object.entries(PEOPLE).filter(([k,p])=>(p.introducedAt??0)<=state.index);
    return `<main class="page"><div class="page-title"><span class="eyebrow">人物录</span><h1>宫中人物</h1><p>人物会随着正文逐步记入。这里只写已经见过、或宫中公开可知的信息；每个人的识别点也会在正文里反复出现，而不是只留在人物卡。</p></div><div class="people-grid">${visible.map(([k,p])=>`<article class="person-card" data-person="${k}">${portrait(p)}<div><span class="rank">${displayRank(k)}</span><h2>${p.name}</h2><p class="meta">${p.age} · ${p.home}</p><div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>${p.signature?`<p class="v61-signature"><b>识别点</b><em>${p.signature}</em></p>`:''}<p>${p.bio||''}</p>${meters(k)}</div></article>`).join('')}</div></main>`;
  };

  const CH=t=>CHAPTERS.find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));
  const A=(v,s)=>{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x];};
  function wrap(c,q,tag,fn){const st=ST(c,q);if(!st||st[tag])return;const old=st.text;st.text=s=>fn(A(old,s).map(x=>String(x)),s);st[tag]=true;}
  function append(c,q,tag,line){wrap(c,q,tag,(xs,s)=>[...xs,typeof line==='function'?line(s):line]);}

  // 1) 第一批低位妃：原有功能已经不同，再补身体动作与生活习惯，避免只像六张功能卡。
  wrap(CH('宫灯渐繁'),'低位宫里乱成六种样子','v61LowSignatures',(xs,s)=>xs.map(line=>{
    if(line.includes('何超英先站到廊口'))return line.replace('何超英先站到廊口看了一圈','何超英先用食指在左掌心划了三道线，才站到廊口看了一圈');
    if(line.includes('王静娴没帮着指路'))return line.replace('她盯着一个说“刚从库房回来”的小内监看了两息','她没有先看那小内监的脸，先看他垂着的两只手和鞋底，随后才盯了两息');
    if(line.includes('林淑贞听见一个宫女抱怨'))return line.replace('把太医院写在外签上的药名念了一遍','把太医院写在外签上的药名念了一遍，又低声换成一句人人都听得懂的白话');
    if(line.includes('陈婉仪蹲在窗下'))return line.replace('一笔笔写在废纸上','一笔笔写在废纸上。每写满一页，她都会对着墨迹轻吹三下再翻面');
    if(line.includes('张淑华把湿掉的炭袋'))return line.replace('然后蹲下重数','右手食指已经在桌沿拨起算盘珠似的节奏，然后才蹲下重数');
    if(line.includes('刘玉贞没碰账和路'))return line.replace('她先把孩子接过去唱了半段南曲','她先在孩子背上轻拍两下，才接过去唱了半段南曲');
    return line;
  }));

  // 2) 第二批新人：把专业差异再落到手上，不靠人物简介解释。
  wrap(CH('窗开半扇'),'梁氏晒弓弦','v61LiangSignature',(xs,s)=>xs.map(line=>line.includes('梁素贞把自己从家里带来的旧弓弦')?line+' 她每挂一根都先用指腹捻一下，捻到第三根便说：“今日潮气比昨日重。”':line));
  wrap(CH('窗开半扇'),'宋氏第一次发现','v61SongSignature',(xs,s)=>xs.map(line=>line.includes('宋文秀入宫后仍习惯看送进来的箱笼签')?'宋文秀入宫后仍习惯看送进来的箱笼签。案上只要摊着三张单，她就会先把纸边叠齐，像不并成一张便浑身不自在。':line));
  // 许淑惠“数三遍+酒窝”已在原场景中完整出现，不再重复写。

  // 3) 高位新人：一个守名分、一个带军门身体记忆、一个把不安藏进漂亮系带。
  wrap(CH('雪尽宫门'),'新封号叫错的第一天','v61HighSignatures',(xs,s)=>xs.map(line=>{
    if(line.includes('景仁宫一个小宫女连叫错三回'))return line.replace('邵明贞前两回纠正','邵明贞眉间先皱了一下，前两回都把新称谓一个字一个字纠正');
    if(line.includes('霍素英嫌新仪仗多了四个人'))return line.replace('霍素英嫌新仪仗多了四个人','霍素英坐下前仍习惯把裙摆往靴边一收，随后才嫌新仪仗多了四个人');
    if(line.includes('崔静仪接完旨'))return '崔静仪接完旨，先把册封礼盒上歪了一寸的系带重新理成左右对称的双结。她手上越整齐，脸上越看不出心事。长春宫却没有恢复旧日贡造往来；她的新名位很体面，旧供应网仍要一笔笔核。';
    return line;
  }));

  // 4) 两个男性角色此前功能鲜明、身体识别较弱：让动作成为长期记忆点。
  append(CH('长夜未央'),'裴景和开始教一个小内监记“人”','v61PeiSignature',`裴景和真正要说一句不好听的话以前，仍会下意识把案边朱笔摆正。徒弟后来也学会了：看见他开始摆东西，就知道下一句多半不是客套。`);
  append(CH('长夜未央'),'谢绍庭把一扇门提前开了半刻','v61XieSignature',`谢绍庭说完仍没有立刻跟进去。他站在门边先看门轴、窗格和廊下两个侍卫的位置，确认完才转身。多年以后，这个“先进屋先看门”的习惯已经比伤疤更难改。`);
  append(CH('王府旧笼'),'采选诏书成了她唯一能看见的门','v61ShunSignature',s=>`顺王听完很久没说话，右手食指只在桌沿轻轻拨了两下，像年轻时试琴弦。张元照小时候就知道：他把话说得越温和，这个动作往往越慢。`);

  // 5) 旧国三人和听雨轩已经有强识别点，只把最核心动作再钉一次，不额外开说明段。
  append(CH('母至'),'母至','v61WenhengSignature',`蘅嫔说到最后，仍抬手扶了一下那支从未真正歪过的素银长簪。宫人后来渐渐知道，她越需要撑住场面，越爱做这个动作。`);
  append(CH('香尽胎寒'),'她第一次不肯听“还年轻”','v61BaopuSignature',`昭氏把最后一颗栗子剥完，门外有人来请安。她起身那一刻笑声又亮了起来，像方才那个安静的人从没出现过。含章却看见她先摸了一下旧银簪。`);
  append(CH('刃落宫门'),'伤口把四个人各自改了一点','v61HanzhangSignature',s=>`${courtTitle(s,'hanzhang')}真正不悦时仍不会提高声音。那日她听见“自愿”二字，只把袖口从腕骨一直抚到肘弯，抚得没有一道褶，才叫人把供词重新问一遍。`);
  append(CH('听雨轩有喜'),'安神香只是一个小差事','v61FangSignature',`阿芙后来回想，顺贵人给香囊换绢袋时仍照自己的老习惯打了活结——绳头一抽就开。她从不喜欢死结。也正因为这样，后来那个被人重新系死的结才会显得格外不对。`);
  append(CH('听雨轩有喜'),'一段真正安静的夜晚','v61AfuSignature',`阿芙进来添水前照例先把两边袖口卷到腕上同样高，嘴里还小声嫌“又喝凉的”。方小满没睁眼，只笑了一下。`);

  // 6) 周清漪的“场面感”落到帕子；其余开篇人物已有扳指/手炉/纸角/茶的反复，不再硬加。
  append(CH('宫门初定'),'正月里的人情','v61ZhouSignature',s=>`${courtTitle(s,'zhou')}离开御花园前把沾了湿泥的帕子折成三折收进袖里。宫女后来发现，她真正准备说一句不好听的话以前，也总会先把帕子这样折好。`);

  // 7) 黛拉保持“越防备越笑，真被击中反而安静”的反向识别，不增加第二套异国符号。
  append(CH('极西来客'),'你不是她','v61DailaSignature',`那天以后宫人第一次真正分清她和昭氏：黛拉平日笑得再响都不稀奇；她忽然不笑，才说明一句话真的进去了。`);

  // 8) 元照不再额外发明新怪癖，只把“小方格未完成不硬划”固定成她的长期动作。
  append(CH('凤仪宫最后一冬'),'她没有划掉最后一格','v61ZhangSignature',`那张纸后来一直夹在疫册最前面。她此后仍画小方格，却再没因为一件事“应该结束了”，就替一个没有结束的格子划勾。`);

  // 9) 隐藏旧角色陈婉宁已退出当前人物体系，保留 signature 只为兼容旧存档，不重新让她登场。

  // QA
  state.flags=state.flags||{};state.flags.v61Build=true;
  globalThis.V61_QA={
    signatures:Object.entries(PEOPLE).filter(([k,p])=>(p.introducedAt??0)<99).filter(([k,p])=>!p.signature).map(([k])=>k),
    signatureCount:Object.values(PEOPLE).filter(p=>(p.introducedAt??0)<99&&p.signature).length,
    lowSignatureScene:!!ST(CH('宫灯渐繁'),'低位宫里乱成六种样子'),
    secondSignatureScene:!!ST(CH('窗开半扇'),'梁氏晒弓弦'),
    highSignatureScene:!!ST(CH('雪尽宫门'),'新封号叫错的第一天')
  };
  const renderV61=render;
  render=function(){const out=renderV61();document.title='宫灯未眠 · 全员鲜明识别点 v61';document.documentElement.dataset.build='v61';return out;};
  try{save();render()}catch(_e){try{render()}catch(__e){}}
}catch(e){console.error('v61 character signatures failed',e)}})();
