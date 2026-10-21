(()=>{try{
  document.documentElement.dataset.build='v76';
  document.title='宫灯未眠 · 含章晚年、顺王暗线与关系直写 v76';
  const CH=t=>(CHAPTERS||[]).find(x=>x.title===t);
  const ST=(ch,q)=>ch?.steps?.find(x=>(x.heading||'').includes(q));
  const IX=(ch,q)=>ch?.steps?.findIndex(x=>(x.heading||'').includes(q))??-1;
  const addAfter=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v76id===obj.v76id))return;let i=IX(ch,q);if(i<0)i=ch.steps.length-1;ch.steps.splice(i+1,0,obj)};
  const addBefore=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v76id===obj.v76id))return;let i=IX(ch,q);if(i<0)i=0;ch.steps.splice(i,0,obj)};
  const rank=(s,k)=>{try{return courtTitle(s,k)||s.ranks?.[k]||PEOPLE?.[k]?.title||''}catch(_){return PEOPLE?.[k]?.title||''}};

  // 1. 元照与主控：不用作者词，改成两个人能直接听懂的关系定义。
  const late=CH('帘后朱笔');
  const rel=late?.steps?.find(x=>x?.v75id==='emperor-zhang-define');
  if(rel&&!rel.v76rewrite){
    rel.heading='雨停以后，她问：陛下为什么总叫我来';
    rel.text=s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
      `雨停时已经过了三更。沈知微先回永和宫，裴景和也退到外间。西暖阁只剩我和张元照。`,
      `她把最后一本折子合上，没有起身：“陛下，臣妾想问一句私话。”`,
      `“问。”`,
      `“陛下不爱臣妾。臣妾也不爱陛下。这个我们都知道。”`,
      `我嗯了一声。`,
      `她看着我：“那为什么有些夜里明明没有宫务，陛下还是会叫臣妾来？”`,
      `这句话比问“宠不宠”难答。她问的不是名分，是我为什么已经习惯在她面前留一个位置。`
    ]:[`本局张元照没有受凤印，这一场话没有发生。`];
    rel.choices=[
      {label:'“因为朕敢在你面前说：这件事朕不知道怎么办。”',requires:s=>!!(s.flags?.v44NewEmpress==='zhangyuanzhao'||s.flags?.v74ZhangSucceeded||s.ranks?.zhangyuanzhao==='皇后'||s.flags?.v96FreeJump),effects:{trust:{zhangyuanzhao:5},bond:{zhangyuanzhao:2},flags:{v75EmperorZhangBond:'confidant'}},result:'我说：“别人进养心殿，总等着朕给答案。朕若说不知道，他们会慌。你不会。你会坐下来把能问的先问完；朕若做错，你也会直接说错了。朕把这样的人叫知己。”张元照点头：“那臣妾明白了。知己不是替陛下收拾错事的人。”我道：“本来就不是。”'},
      {label:'“有时候没有事。朕只是想让你坐在那儿。”',requires:s=>!!(s.flags?.v44NewEmpress==='zhangyuanzhao'||s.flags?.v74ZhangSucceeded||s.ranks?.zhangyuanzhao==='皇后'||s.flags?.v96FreeJump),effects:{trust:{zhangyuanzhao:4},bond:{zhangyuanzhao:4},flags:{v75EmperorZhangBond:'family'}},result:'我说：“朕批朕的折子，你看你的册子，可以一晚上都不说话。朕累了不用解释，病了也不用听你哭。你想走的时候照样回凤仪宫。朕把这种相处算家人，不算夫妻情爱。”张元照问：“家人可以当面说不么？”我答：“你不说不，朕反而不习惯。”'},
      {label:'“因为难事来了，朕知道你会把你那一份做完。”',requires:s=>!!(s.flags?.v44NewEmpress==='zhangyuanzhao'||s.flags?.v74ZhangSucceeded||s.ranks?.zhangyuanzhao==='皇后'||s.flags?.v96FreeJump),effects:{trust:{zhangyuanzhao:5},flags:{v75EmperorZhangBond:'partner'}},result:'我说：“你把问题找出来，把利弊说清。最后准还是驳，朕自己写。事情办完，你回凤仪宫，朕回养心殿。朕不需要你爱朕，也不会拿这份信任换你的别的东西。”张元照笑了一下：“那就是一起做事的人。”我道：“是。”'}
    ];
    rel.v76rewrite=true;
  }

  // 2. 含章留下不是“舍不得后宫”，而是蘅国归附国书让她没有普通妃嫔的退路。
  const oldCase=CH('旧茶未凉');
  addAfter(oldCase,'顺王自己选择离开',{v76id:'hanzhang-cannot-leave',heading:'顺王出了宫，含章却不能跟着说“我也走”',cast:['hanzhang','emperor'],fx:'mist',narrative:true,text:s=>[
    `顺王离京第三日，含章来养心殿，没有带军案，也没有带证词。她只问了一件很私人的事：“臣妾若想搬去京郊女观，行不行？”`,
    `我没有立刻答。蘅国归附时的国书还压在宗人府。旧王室女眷“留京供养”，她后来又正式册入六宫。她若出宫，不只是换住处，礼部会把它解释成大晟如何处置亡国王女。`,
    `我把这层意思告诉她。`,
    `含章坐了一会儿：“所以姐姐死了，母亲也有自己的去处，臣妾还是不能走。”`,
    `“是。”`,
    `她慢慢把右边袖口抚平。那只手臂留着重阳救驾时的长疤，阴雨天仍会疼。`,
    `“那请陛下以后别在史笔里写‘珍妃自愿终老宫中’。”`,
    `我看她。`,
    `“臣妾会把这里的日子过下去。”她说，“但留下和愿意留下，不是一回事。”`,
    `“好。”`,
    `她起身行礼。那天以后，她没有再问过出宫。可我也没有再把她多年不争宠，当成她喜欢这座宫。`
  ],choices:[{label:'把“留京供养”那份国书重新调出来看一遍',effects:{trust:{hanzhang:4},flags:{v76HanzhangTreatyStay:true}},result:'国书没有改。至少从这一日起，御前知道珍妃为何一直还在。'}]});

  // 3. 第二次选秀：让含章参与“本人愿不愿”的判断，接她自己的政治困境。
  const second=CH('空宫点灯');
  addAfter(second,'最后一张名帖',{v76id:'hanzhang-asks-zhang',heading:'终选散后，含章只问张元照一句',cast:['hanzhang','zhangyuanzhao','emperor'],fx:'candle',narrative:true,text:s=>[
    `终选散了以后，张元照在体元殿西廊等尚宫领路。含章从后殿出来，停在她面前。`,
    `她没有问顺王府里发生过什么，只问：“如果今天把你的名帖撤掉，让你回顺王府，你愿意么？”`,
    `张元照答得很快：“不愿意。”`,
    `“如果进宫以后也未必能出去？”`,
    `张元照沉默片刻：“至少这一回，是臣女自己选的。”`,
    `含章看了她一会儿，只说：“知道了。”`,
    `她回来对我也只有一句：“她不是因为觉得宫里自由才来。她只是不要别人替她撤掉名字。”`,
    `我没有问含章为什么偏偏问这一句。她自己就是最知道“不能走”和“不想走”差多少的人。`
  ],choices:[{label:'名帖照旧，不再接受顺王代她求退',effects:{trust:{hanzhang:2,zhangyuanzhao:3},flags:{v76HanzhangSupportsChoice:true}},result:'第二次采选的名单没有因为亲王一句“为她好”而少掉一个名字。'}]});

  // 4. 顺王动机：张元照身上有沈知微年轻时的影子，他想重做一次“这回我能留住”。
  const wang=CH('王府旧笼');
  addAfter(wang,'她不肯谢恩',{v76id:'shunwang-sees-shen',heading:'火盆快熄时，顺王终于叫错了一个人',cast:['shunwang','zhangyuanzhao'],fx:'rain',narrative:true,text:s=>[
    `那张路引烧到只剩一个角时，顺王忽然说：“你们怎么都一样。”`,
    `张元照抬头：“谁们？”`,
    `顺王没有答，过了很久才道：“沈知微年轻时也是这样。别人替她把路铺好，她先问为什么不能走别的路。”`,
    `张元照这才明白，自己这些年为什么越安静、越不求人，顺王反而看得越紧。`,
    `她问：“王爷现在是在同臣女说话，还是在同和妃娘娘说话？”`,
    `顺王的脸色一下沉了。`,
    `“本王救过她。”`,
    `“王爷也救过臣女。”张元照说，“所以臣女一直记恩。可臣女不是她，她也不是臣女。”`,
    `顺王把火钳往炭盆边一搁：“本王只是知道你们这种人最后会怎么选。”`,
    `“那王爷更该让臣女自己选一次。”`,
    `那一夜东偏院的门没有开。顺王不是不知道自己在关门；他只是仍觉得，自己比门里的人更知道她出去以后会后悔什么。`
  ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:3,shunwang:-2},flags:{v76ShunwangProjectsShen:true}},result:''}]});

  // 5. 元照入宫后与和妃把顺王这层关系说开。
  const windowCh=CH('窗开半扇')||second;
  addBefore(windowCh,'尾声',{v76id:'shen-zhang-wang-link',heading:'一场雨把顺王府的名字带进永和宫',cast:['shen','zhangyuanzhao'],fx:'rain',narrative:true,text:s=>[
    `六月一场急雨，张元照去永和宫还一册旧军籍。沈知微看见册角有顺王府旧印，没有立刻伸手。`,
    `张元照先问：“娘娘以前认识顺王很久？”`,
    `“很久。”`,
    `“他有一句话常说。”张元照停了停，“‘我是为你好。’”`,
    `沈知微把茶盖扣上：“说过。”`,
    `“他还说，臣妾有些地方像娘娘年轻时。”`,
    `沈知微第一次正眼看她。`,
    `张元照道：“我以前以为他把我当我。后来发现，有时候他是在同一个已经走掉的人吵架。”`,
    `沈知微没有替顺王解释：“像不像我，都不是锁门的理由。”`,
    `“我知道。”`,
    `“也别因为他拿你同我比，就逼自己非得和我不一样。”沈知微把军籍接过去，“你先把自己的日子过明白。”`,
    `雨声很大。两个人后来很少再谈顺王，却从这一场开始，知道彼此都见过同一种温柔变成门闩的样子。`
  ],choices:[{label:'喝完这一盏再走',effects:{trust:{shen:3,zhangyuanzhao:3},flags:{v76ShenZhangKnowWangPattern:true}},result:'新茶添了一次水。顺王的名字没有再出现。'}]});

  // 6. 后期顺王不是消失：他成为女史制和元照新政最有分量的反对者之一。
  addAfter(late,'宫门里多了一种身份',{v76id:'shunwang-late-opposition',heading:'顺王从封地递来一封很长的折子',cast:['emperor','zhangyuanzhao','shen','shunwang'],fx:'ink',narrative:true,text:s=>[
    `女史试任榜贴出不到一个月，顺王从封地递来一封长折。前半篇并不胡闹：女史若层层签名，急事会不会因此多等半个时辰；内廷女子参与案卷，外朝官员又该向谁负责。`,
    `张元照看完说：“这两条要改。急事可以先办，事后补记；女史只能查自己那一段，不能替外朝定案。”`,
    `折子最后却多了一段私话：“张氏少时习档于臣府，性情与沈氏年轻时颇类。二人皆受人照拂日久，反以约束为苦。臣恐其将一己好恶写入新制。”`,
    `沈知微看完，把纸放下：“还是这句话。”`,
    `张元照问：“哪句？”`,
    `“只要有人离开他，他就先说那个人不懂恩。”`,
    `我没有因为最后那段话把整封折子扔掉。顺王前面指出的问题是真的。`,
    `张元照也没有赌气：“他说对的地方就改。说我的地方，不必写进制度。”`,
    `沈知微看她一眼：“这一点你确实不像我年轻时。”`,
    `“哪里？”`,
    `“我那时候会先气半个月。”`,
    `张元照笑了。`,
    `顺王没有因为她入宫就失去影响。他只是从关一扇门的人，变成了站在朝堂另一头、不断提醒所有人“这个女人的办法不可信”的人。`
  ],choices:[{label:'把他说对的两条改掉，其余照常试行',effects:{trust:{zhangyuanzhao:4,shen:2},flags:{v76ShunwangOpposesReform:true}},result:'新制多了“急事先办、事后补记”的例外。顺王没有赢，张元照也没有因为讨厌他就拒绝一条正确的意见。'}]});

  // 7. 沈知微终局后，顺王最后一次试图“替她安排”。
  addAfter(late,'雪落永和宫以前',{v76id:'shunwang-after-shen-fate',heading:'处分还没出宫，顺王的信先到了',cast:['shen','shunwang','zhangyuanzhao'],fx:'snow',narrative:true,text:s=>{
    const fate=s.flags?.v75ShenFate;
    if(!fate)return [`沈知微的最终处分尚未落定，这封信暂时没有内容。`];
    if(fate==='death')return [`顺王听到风声后请见沈知微最后一面。沈知微只让人回了两个字：“不见。”`,`张元照问她要不要再想一想。沈知微道：“我年轻时已经把很多告别说给他听过了。这一次不用。”`,`顺王最终没有进宫。沈知微把回话的纸折好，交还给等在门外的宫人。`];
    if(fate==='fief')return [`顺王来信，说自己的旧别业空着，沈知微与皇嗣若离京，可以先住那里。`,`沈知微看完把信折回去：“我有地方去。”`,`张元照道：“王爷大概是真心想帮你。”`,`“我知道。”沈知微说，“所以更要自己选住哪儿。”`,`信原封退回。顺王这一次没有再送第二封。`];
    return [`顺王得知沈知微要出宫修行，送来一笔香火银和一封信。`,`沈知微只收信，不收银。看完以后让人把信也退回去。`,`张元照问：“一句话都不回？”`,`沈知微说：“我已经活到不用再证明自己记不记恩了。”`,`此后顺王没有再给她送信。`];
  },choices:[{label:'照沈知微自己的意思办',effects:{flags:{v76ShunwangFinalBoundary:true}},result:'顺王没有再得到一个可以替她决定去处的位置。'}]});

  // 8. 含章参与女史院：她自己没有离宫的路，所以坚持别人必须保留退路。
  addAfter(late,'宫门里多了一种身份',{v76id:'hanzhang-female-office',heading:'含章只在女史章程上添了一句',cast:['hanzhang','zhangyuanzhao'],fx:'ink',narrative:true,text:s=>[
    `女史试任章程送到六宫传看时，含章没有改俸银，也没有改品级。她只在“任满三年”后面添了四个字：<b>本人可辞。</b>`,
    `张元照去问她：“娘娘觉得三年太久？”`,
    `“不是。”`,
    `“那为什么一定要写？”`,
    `含章把右臂慢慢放回桌上。旧伤阴雨天又酸，她方才举着笔久了，手指有一点麻。`,
    `“因为我没有这条路。”她说，“蘅国国书在宗人府，我不能说住腻了就走。正因为我没有，才知道有的人应该有。”`,
    `张元照没有说“娘娘受苦了”。她只把那四个字圈住：“这一条不删。”`,
    `后来女史院最先被人记住的，除了不列侍寝名册，就是任满可以自己辞。`
  ],choices:[{label:'把“本人可辞”留在正式章程里',effects:{trust:{hanzhang:4,zhangyuanzhao:3},flags:{v76HanzhangExitClause:true}},result:'含章自己仍不能走。她至少替后来的人留下了一扇能自己推开的门。'}]});

  // 9. 含章后期家常：身体会老、旧伤会疼，她不能一直只做“查证据的人”。
  const west=CH('西华门外');
  addBefore(west,'周清漪在慈宁宫外',{v76id:'older-consorts-domestic',heading:'六月闷热，珍妃一会儿开窗一会儿又关',cast:['hanzhang','zhou','ning'],fx:'rain',narrative:true,text:s=>[
    `承熙十八年六月，午后闷得像要下雨。含章到绮春宫坐了一会儿，进门先叫人开窗；不到一刻钟，又让宫女把窗关上一半。`,
    `周清漪看她：“你到底热还是冷？”`,
    `含章自己也烦：“不知道。前半夜热得睡不着，天快亮又怕风。”`,
    `太医这半年已经看过两次。她的月信忽早忽晚，有时两个月不来，来了又拖得久。太医只说妇人年岁渐长，有的人早些、有的人晚些，先别乱补。`,
    `更烦的是右臂旧伤。下雨前总酸，早上梳头举久了，手指还会麻。她从前最不爱别人碰自己的发簪，如今有两天实在抬不住手，只能让宫女替她插。`,
    `周清漪把一碗冰酪推过去：“吃这个。”`,
    `含章刚吃两口，又把碗推远：“太凉。”`,
    `周清漪笑得肩膀都动了：“珍妃娘娘也有拿不准的时候。”`,
    `“我如今连自己冷不冷都要问两遍。”`,
    `邵明贞正好从外头进来，听见最后一句：“那就别问。窗留半扇，冰酪吃半碗。”`,
    `含章抬眼：“皇贵妃如今连这个也要定？”`,
    `“没人定。只是你再开一次窗，宫女都要跑第三趟了。”`,
    `三个人都笑。那天下午谁也没谈外朝，也没翻旧案。雨真正落下来以后，含章右臂疼得厉害，周清漪让人拿热帕子，她也没再逞强说不用。`
  ],choices:[{label:'让这一个下午只停在吃冰、关窗和旧伤上',effects:{trust:{hanzhang:2,zhou:1,ning:1},flags:{v76OlderWomenDomestic:true}},result:'宫里的人会老。不是每一次身体不舒服都要变成阴谋。'}]});

  // 10. 二公主婚议前再给含章一句真正有用的话，后来的悲剧会反过来刺中它。
  const marriage=west?.steps?.find(x=>(x.heading||'').includes('婚')&&(x.cast||[]).includes('hanzhang'));
  if(marriage&&!marriage.v76hanzhang){
    const old=marriage.text; marriage.text=s=>{
      const a=typeof old==='function'?old(s):old; const out=Array.isArray(a)?a:[a];
      out.push(`${rank(s,'hanzhang')}没有替二公主挑人，只问：“若他不是候选驸马，没有礼部替他说话，你还愿不愿意单独见他？”`);
      out.push(`二公主当时没有马上回答。含章也没有催：“喜欢谁可以慢一点认，答应一辈子更可以。”`);
      return out;
    }; marriage.v76hanzhang=true;
  }

  // 11. 人物来源与选秀结果必须一致；方小满不是选秀入宫。
  if(PEOPLE?.fang){PEOPLE.fang.bio='原是御花园花房宫女，先以宫女身份在宫里生活。后来主控明确问她是否愿意进入后宫，她自己点头，才从花房搬进听雨轩；她从来不是哪一届选秀留下的人。';PEOPLE.fang.tags=['花房旧人','后来入后宫','爱笑手巧'];}
  if(PEOPLE?.hanzhang){PEOPLE.hanzhang.tags=['蘅国王女','国书约束留京','右臂旧伤'];}
  if(PEOPLE?.shunwang){PEOPLE.shunwang.tags=['宗室亲王','救人也控人','以恩作门'];}
  const firstIdx=Math.max(0,(CHAPTERS||[]).findIndex(x=>x.title==='御前终选'));
  const secondIdx=Math.max(0,(CHAPTERS||[]).findIndex(x=>x.title==='空宫点灯'));
  ['ning','ke','hui'].forEach(k=>{if(PEOPLE?.[k])PEOPLE[k].introducedAt=firstIdx});
  ['zhangyuanzhao','liang2','song2','xu2'].forEach(k=>{if(PEOPLE?.[k])PEOPLE[k].introducedAt=secondIdx});
  const lows=['cao2','zhao2','lin2','ye2','du2','su2'];
  if(state.flags?.firstGrandSelectionDone){const kept=new Set(state.flags.lowConsorts||[]);lows.forEach(k=>{if(PEOPLE?.[k])PEOPLE[k].introducedAt=kept.has(k)?firstIdx:9999})}

  // 12. 人物页：含章和顺王的后期说明，第一批留牌动态写实际名单；元照关系说明改成白话。
  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople&&!globalThis.__v76PeopleWrapped){globalThis.__v76PeopleWrapped=true;peopleView=function(){
    if(PEOPLE?.hanzhang){
      const lateEnough=(state.index||0)>=Math.max(0,(CHAPTERS||[]).findIndex(x=>x.title==='帘后朱笔'));
      PEOPLE.hanzhang.bio=lateEnough?'蘅国旧王室次女。她从未把留在后宫说成自己的选择：归附国书与既有册封让她不能像普通宫嫔一样说走就走。重阳救驾留下的右臂旧伤会在阴雨天发酸；年岁渐长以后，月信与冷热也开始不再准时。她仍查证据，却也会有开窗又嫌冷、举不起发簪、下午只想吃半碗冰酪的时候。':'蘅国旧王室次女。少饰寡言，行礼和回答都比旁人慢半拍。她进入六宫首先是归附后的政治安置，而不是一次普通选秀。';
    }
    if(PEOPLE?.shunwang){PEOPLE.shunwang.bio=state.flags?.v76ShunwangOpposesReform?'先帝诸子之一。年轻时确实救过沈知微，也照顾过孤女张元照；问题是他把救命与照顾慢慢当成替别人决定去留的资格。张元照身上那种安静、记事、不求人让他想起年轻时的沈知微，他于是更想把“这一次的人”留住。张氏入宫后，他又成为女史制与中宫新政最有分量的反对者之一——有些批评是对的，控制欲也是真的。':'先帝诸子之一。年轻时善琴，曾救过沈知微、收留过孤女张元照。他待人可以真心很好，却很难接受受过自己恩惠的人最后不按自己安排的路走。';}
    let h=oldPeople();
    const selected=(state.flags?.lowConsorts||[]).map(k=>PEOPLE?.[k]?.name).filter(Boolean);
    h=h.replace(/邵明贞、霍素英、崔静仪，以及低位留牌的何超英、王静娴、林淑贞、陈婉仪、张淑华、刘玉贞。/g,selected.length?`邵明贞、霍素英、崔静仪；御前低位实际留牌为${selected.join('、')}。其余候选未入宫，不再参与后续剧情。`:'邵明贞、霍素英、崔静仪；另有六名低位候选并列待选，由御前逐人点名；没有“按顺序留下前几位”的规则。');
    h=h.replace(/不是爱情。主控明确把她当“家里的人”：累时可以沉默，犯错时仍允许她说不；亲近来自长期共处，而不是床笫。/g,'不是爱情。有时养心殿根本没有事，主控也会叫她来坐一会儿：他批折子，她看自己的册子。两个人可以不说话。主控把这种“待在一起不用演给对方看”的关系叫家人。');
    h=h.replace(/不是爱情。两人把关系定义成搭档：可以把未定的难题摊在同一张桌上，但事情结束以后各自生活，最后决定仍由主控承担。/g,'不是爱情。大事来了，两个人一起看、一起争；最后由主控落笔。事情办完以后，张元照回凤仪宫，主控回养心殿，谁也不向对方索取工作之外的感情。');
    h=h.replace(/不是爱情。若已完成关系定义，主控把她称为知己：他敢当着她承认“朕没想明白”，她也可以当面说他错。/g,'不是爱情。主控敢当着张元照说“朕不知道怎么办”；张元照也敢直接回答“陛下这次想错了”。主控把能这样说话的人叫知己。');
    h=h.replace(/兄弟与政治对手混在一起。主控承认顺王曾救过人、也曾以“为你好”控制别人；血缘从来没有自动换成信任。/g,'兄弟，也是长期的政治对手。主控知道顺王救过沈知微、养过张元照；也看见他一旦觉得自己“最懂这个人”，就会开始替对方决定该住哪、该嫁谁、该不该走。');
    return h;
  }}

  // 13. 皇子皇女序齿只显示中文数字，不出现 5皇子 / VI皇子 这类写法。
  function cnNum(n){n=Number(n);if(!Number.isFinite(n)||n<=0)return String(n);const d=['零','一','二','三','四','五','六','七','八','九'];if(n<10)return d[n];if(n<20)return '十'+(n===10?'':d[n-10]);if(n<100)return d[Math.floor(n/10)]+'十'+(n%10?d[n%10]:'');return String(n)}
  function royalOrder(x){return String(x??'')
    .replace(/\b(\d{1,2})(皇子|公主)/g,(_,n,t)=>cnNum(n)+t)
    .replace(/\bVI(皇子|公主)/g,'六$1').replace(/\bV(皇子|公主)/g,'五$1').replace(/\bIV(皇子|公主)/g,'四$1');}
  if(typeof novel==='function'&&!globalThis.__v76NovelWrapped){globalThis.__v76NovelWrapped=true;const old=novel;novel=x=>royalOrder(old(x));}
  if(typeof childrenView==='function'&&!globalThis.__v76ChildrenWrapped){globalThis.__v76ChildrenWrapped=true;const old=childrenView;childrenView=()=>royalOrder(old());}
  if(typeof chronicleView==='function'&&!globalThis.__v76ChronWrapped){globalThis.__v76ChronWrapped=true;const old=chronicleView;chronicleView=()=>royalOrder(old());}
  if(typeof ending==='function'&&!globalThis.__v76EndingWrapped){globalThis.__v76EndingWrapped=true;const old=ending;ending=()=>royalOrder(old());}

  // 当前正史分支已经固定为双生男婴不入玉牒；霍氏之子保持四皇子，不再让旧“保留男婴”分支改动公开序齿。
  if(state.flags?.v69CruelTwin||state.flags?.twinBoyFate==='kill'){if(CHILDREN?.fourthPrince)CHILDREN.fourthPrince.order='四皇子';}

  state.flags=state.flags||{};state.flags.v76Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v76 patch failed',e)}})();
