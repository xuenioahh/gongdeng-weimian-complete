(()=>{try{
  document.documentElement.dataset.build='v42';

  // ---------- 暂撤新妃嫔立绘 ----------
  const V42_NEW=['ning','ke','hui','cao2','zhao2','lin2','ye2','du2','su2'];
  V42_NEW.forEach(k=>{const p=PEOPLE[k];if(!p)return;delete p.portraitImage;p.noPortrait=true;p.portraitKind=null;p.glyph=p.glyph||((p.name||'·')[0]);});

  // ---------- 方小满：由宫女到常在 ----------
  Object.assign(PEOPLE.fang,{
    title:'御花园宫女',home:'御花园花房值房',
    tags:['宫女出身','爱笑','手巧','熟宫路'],
    bio:'原是御花园花房名下的小宫女，与阿芙同住一间值房。她认路其实并不好，却熟悉领水、领炭、送花、跑尚食局和内务府这些宫女每天要走的路。承熙元年因救一只受伤狸猫被皇帝真正注意，后来由宫女籍册为常在，赐居听雨轩。她从不觉得这一步意味着自己突然成了另一个人。'
  });
  Object.assign(PEOPLE.afu,{
    title:'听雨轩宫女',home:'听雨轩耳房',
    bio:'原与方小满同在御花园花房当差，个子不高，走路很快，袖口总收得利落。方小满册封后，她被一并调去听雨轩。比主子记路，也比主子更早学会哪扇门什么时候不能敲。'
  });
  INITIAL_STATE.ranks.fang='宫女';
  function v42FangName(s=state){const r=s?.ranks?.fang||'宫女';return r==='宫女'?'方小满':(/^故/.test(r)?r:`方${r}`)}
  function v42FangElevated(s=state){return (s?.ranks?.fang||'宫女')!=='宫女'}
  function v42SyncFangHome(s=state){
    if(v42FangElevated(s)){PEOPLE.fang.home='听雨轩';PEOPLE.afu.home='听雨轩耳房';PEOPLE.afu.title='听雨轩宫女';}
    else{PEOPLE.fang.home='御花园花房值房';PEOPLE.afu.home='御花园花房值房';PEOPLE.afu.title='御花园宫女';}
  }
  v42SyncFangHome();

  // 在闻人姐妹初入宫时，只留下一个无名宫女的背景动作；到下一章才知道她是谁。
  const shiyi42=CHAPTERS.find(ch=>ch.title==='拾遗阁开门');
  if(shiyi42?.steps&&!shiyi42.steps.some(x=>x.heading?.includes('抬炭的小宫女'))){
    const st=shiyi42.steps[Math.min(1,shiyi42.steps.length-1)];
    if(st?.text){const old=st.text;st.text=s=>{const a=typeof old==='function'?old(s):old;return [...a,
      `那日替拾遗阁抬炭、送花盆的宫女很多。我后来才知道，其中有个圆脸小宫女抱着一盆白海棠走错了两次门，最后还是阿芙把她从西廊拽回来。那时我没有问她名字。`,
      `<span class="v42-oldplot">这一笔不会取代拾遗阁原来的任何相识，只让后来那场“花丛里的猫”不是凭空出现。</span>`
    ]};}
  }

  const fangIntro=CHAPTERS.find(ch=>ch.title==='一碟杏仁酥');
  if(fangIntro?.steps){
    fangIntro.bridge=s=>`三月末，拾遗阁终于从“新来的住处”变成普通宫院。那天下午，我远远看见一个浅青短褂的宫女抱着花盆穿过月门，身后另一个宫女追着喊“小满，你又走反了”。几日后，我在同一处假山后真正看清了她。`;
    const cat=fangIntro.steps.find(x=>x.heading?.includes('花丛里的猫'));
    if(cat){cat.cast=['fang','afu','peiyan'];cat.text=s=>[
      `四月午后，我没乘辇，从含芳门往养心殿走。假山后先传来一声猫叫，前头宫人便不约而同慢下来。`,
      `蹲在花丛里的是御花园花房的小宫女方小满。浅青短褂洗得发软，袖口自己收过一圈，针脚细密；她半跪着哄一只后腿受伤的狸猫，鬓边沾着嫩叶和草籽，膝边还放着本来要送去慈宁宫的两枝海棠。`,
      `阿芙抱着空花盆追来，刚要骂她，看见我便猛地跪下：“奴婢叩见陛下。”`,
      `方小满回头太快，膝盖撞上石阶，疼得吸了口气。她先看我，又看猫，显然在“行礼”和“别让猫跑了”之间犹豫了一瞬，最后还是跪下。`,
      `我问：“叫什么？”她答“方小满”。再问为何擅离花房，她老老实实说：“听见猫叫，想看看是不是卡在石洞里。看完就……忘了原来那条路。”`,
      `裴景和在身后轻轻咳了一声。阿芙把额头压得更低，像已经替她把罚俸都想好了。`,
      `我只道：“先把猫弄出来。”`,
      `方小满抬头确认了一遍，真转回去继续哄。过一会儿才小声问：“陛下能不能往后站一点？它怕生。”`,
      `猫最后仍不给我面子，是阿芙从尚食局讨来一小块鱼干才抱出来。方小满手背被划出一道口子，却先用自己帕子给猫缠腿。那两枝海棠直到日头偏西才送进慈宁宫。`,
      `第二日皇后从宫务册里看见“花房宫女误了送花时辰”，本来要按例扣半月例银；裴景和只补了一句“昨日是御前叫她先救猫”。皇后把罚记划掉，又让尚药局顺手送一小盒伤药。`,
      `<span class="v42-origin"><b>这时她还只是宫女。</b>没有封号、没有自己的院子，也没有人因为她笑了一次就猜皇帝的意思。后面所有变化，都是从这一步一步长出来的。</span>`
    ];}
    const medicine=fangIntro.steps.find(x=>x.heading?.includes('伤药送到听雨轩'));
    if(medicine){medicine.heading='第二幕 · 伤药送到花房值房';medicine.cast=['fang','afu'];medicine.text=s=>[
      `伤药不是送到某一宫，而是随着御花园当日领用的药物一起到了花房值房。盒子不大，没有中宫印，只压一张字条：“每日两次，勿沾水。”`,
      `方小满把字条看了两遍：“皇后娘娘怎么知道我总沾水？”`,
      `阿芙正替她拆旧纱布：“你昨日救完猫就在池边洗手，半宫的人都看见了。”`,
      `“那也不用特意送药。”`,
      `“你先别把‘顺手’想成天大的恩典。”阿芙嘴上这么说，还是替她把药盒收进两人共用的小木柜。`,
      `宫女没有像样的东西能回中宫。方小满想了半天，跑去尚食局求熟识的嬷嬷借一角小灶，想烤几块杏仁酥。第一炉焦边，第二炉糖多，阿芙咬一口便把眉毛拧起来。`,
      `第三炉才勉强像样。她挑出八块完整的，用花房装花签的红绳绕了两圈。阿芙问：“你一个宫女给皇后送点心，不怕人说你攀高枝？”`,
      `阿芙问要不要替她写张谢帖。方小满把挑好的杏仁酥装进小纸盒：“皇后娘娘给的是药，我回她一盒点心，正好。”`,
      `她说得太理直气壮，阿芙一时竟没想出怎么反驳。`
    ];}
    if(!fangIntro.steps.some(x=>x.heading?.includes('离开宫女籍'))){
      const idx=Math.max(2,fangIntro.steps.indexOf(medicine)+1);
      fangIntro.steps.splice(idx,0,{heading:'第三幕 · 离开宫女籍之前，我先问她愿不愿意',cast:['fang','gu','peiyan','zhou'],fx:'candle',keyDecision:true,text:s=>[
        `伤药之后又过了几日。裴景和把花房名册放到御案时，我才知道方小满十六岁入宫，父亲早亡，母亲带着幼弟住在城南；她不是谁家送进来的女儿，也没有人在前朝等着她得一个位分。`,
        `皇后没有反对册封，只提醒我：“宫女一旦入后宫，原来的同伴会给她磕头。她若自己没想明白，这道旨意未必是恩典。”`,
        `我让人把方小满叫来。她以为还是问救猫误差，进殿先解释海棠后来没有蔫。`,
        `我问：“若从宫女籍除名，册入后宫，你愿不愿意？”`,
        `她整个人静下来。过了好一会儿，才问：“奴婢以后还能去看那只猫吗？”`,
        `裴景和低下头。皇后坐在一旁，没有替她圆场。`,
        `我说能。她又问：“阿芙能不能跟我走？”`,
        `这一次皇后先笑了：“你倒先挑起宫女来了。”`,
        `方小满脸一下红了，却没有把问题收回去。`,
        `门外周清漪正好来送宫册，听见半句，回绮春宫后只对身边人说：“从前是她给人端茶，明日起别人要给她端茶。宫里最难学的不是礼，是忽然换了位置以后还记不记得地有多硬。”这话半真半酸，却没有传到方小满耳朵里。`
      ],choices:[
        {label:'册方小满为常在，赐听雨轩；阿芙随侍',hint:'直接给她一个新身份，但不替她抹掉宫女出身',effects:{ranks:{fang:'常在'},bond:{fang:3},trust:{gu:1,afu:3},flags:{fangElevated:true,fangElevation:'direct',afuFollows:true}},result:'册旨到花房时，方小满正在给一盆海棠换土。所有人忽然跪下，她自己慢了半拍才意识到这些人以后也要向她行礼。她第一句话是让阿芙起来，第二句才想起自己也该跪着接旨。'},
        {label:'先让皇后教她三日宫规，再册为常在',hint:'让中宫替她把身份转换接稳一些',effects:{ranks:{fang:'常在'},bond:{gu:2,fang:2},trust:{fang:2,afu:2},flags:{fangElevated:true,fangElevation:'queen',afuFollows:true}},result:'方小满在凤仪宫学了三日。第一日总忘记别人不能再叫她“小满”，第二日坐错位子，第三日终于学会受礼时不先去扶人。皇后最后只说：“记住规矩，不必装成另一个人。”册旨随后送到。'},
        {label:'让她把“不愿意”也说得出口，再册为常在',hint:'先确认这不是皇帝替她决定的人生',effects:{ranks:{fang:'常在'},trust:{fang:5},bond:{fang:1},flags:{fangElevated:true,fangElevation:'asked',afuFollows:true}},result:'我又问了一遍：“若不愿意，也可以回花房。”她低头很久，最后说：“奴婢愿意试一试。若以后做得不好，陛下别说奴婢骗了您。”那句话不像谢恩，更像谈一件她还没弄懂的差事。册旨当晚才写。'}
      ]});
    }
    // 原有杏仁酥、春雨、长案、小宴等场景全部保留，只补身份转换后的回声。
    const wrong=fangIntro.steps.find(x=>x.heading?.includes('杏仁酥送错了门'));
    if(wrong&&!wrong.v42){const old=wrong.text;wrong.text=s=>{const a=typeof old==='function'?old(s):old;return [
      `搬进听雨轩的第四日，方小满还会在看见高位宫人时下意识让到墙边。阿芙提醒她两次：“主子，现在该别人给您让。”她每次都说“知道了”，下一次仍旧忘。`,
      ...a,
      `吃到最后，${courtTitle(s,'baopu')}忽然问她：“从宫女变成主子，好不好玩？”方小满想了半天：“不好玩。衣服多了，磕头的人也多了。我以前只怕做错事扣月例，现在还怕别人因为我做错事。”`,
      `${courtTitle(s,'baopu')}笑意淡了一瞬：“至少你是从宫女升成了主子。我们不是，我们是从原来的地方被送进宫。”她没有解释这句话。含章抬眼看了姐姐一下，也没有解释。两个人第一次坐在同一张桌边。抱朴看了一眼方小满的新袖口，方小满则把点心盘往她那边推了推。`
    ];};wrong.v42=true;}
    const walking=fangIntro.steps.find(x=>x.heading?.includes('走动是慢慢多起来的'));
    if(walking&&!walking.v42){const old=walking.text;walking.text=s=>{const a=typeof old==='function'?old(s):old;return [...a,
      `方小满仍保留宫女时的毛病：去永和宫会顺手帮门口小宫女把歪掉的水桶扶正，进凤仪宫看见地上落针会先弯腰捡。皇后有一回看见，没有训她，只说：“你如今不必什么都自己做。”她答：“臣妾知道。可看见了就顺手。”`,
      `她仍照旧往花房、尚食局和领物处跑，见到熟脸就停下来问一句。宫女出身留下的习惯，并没有因为换了衣裳立刻消失。`
    ];};walking.v42=true;}
  }

  // ---------- 御前终选：宫女册封成为新人都听说过的先例，但不抢选秀主戏 ----------
  const sel42=CHAPTERS.find(ch=>ch.title==='御前终选');
  if(sel42?.steps&&!sel42.steps.some(x=>x.heading?.includes('名册之外的先例'))){
    sel42.steps.splice(1,0,{heading:'第二幕前 · 名册之外还有一个先例',cast:['gu','zhou','fang'],fx:'ink',narrative:true,text:s=>[
      `终选前一夜，皇后整理明日名册，把三位世家女和六位低位候选分成两摞。最上面压着的，却是一张不属于本次选秀的旧册页：方小满的宫女除籍文书。`,
      `她当年不在任何世家名单里，也不是朝臣平衡的一部分。正因为如此，她后来被册封，宫里人人都记得这是皇帝自己做的一次选择。`,
      `周清漪看见那页纸，笑道：“明日那些姑娘进殿以前，大概已经听说过十遍方常在。”`,
      `皇后道：“听说的是故事，不是她当时三夜没睡好、连别人给她行礼都不会受。”`,
      `第二日进殿的世家女因此面对的并不只是后位以下的等级。她们还知道：这座后宫里，出身决定很多东西，却不是唯一能决定名位的东西。`,
      `<span class="v42-callback">这不会削弱御前终选原来的政治选择。恰恰相反，它让三位世家女更清楚：她们带着家族进宫，而方小满曾经什么家族都没有。</span>`
    ],choices:[{label:'继续终选',effects:{flags:{fangPrecedentRemembered:true}},result:''}]});
  }

  // ---------- 三至六年：让宫女出身真正参与旧案、孕事、供应线，但不替代既有剧情 ----------
  const years42=CHAPTERS.find(ch=>ch.title==='宫灯渐繁');
  if(years42?.steps){
    const settle=years42.steps.find(x=>x.heading?.includes('分宫不是搬箱子'));
    if(settle&&!settle.v42){const old=settle.text;settle.text=s=>{const a=typeof old==='function'?old(s):old;const out=[];for(const line of a){out.push(line);if(typeof line==='string'&&line.includes('方小满和阿芙被皇后临时借去带低位新人认路'))out.push(`方小满带她们走的不是嫔妃最常走的御道，而是她做宫女时天天跑的短路：哪处井冬天不结冰、哪扇侧门午后能过小车、内务府领炭要先找哪个牌房。低位新人第一次意识到，眼前这个常在比她们更熟宫里“下面那一层”怎样运转。`);}return out;};settle.v42=true;}
    const ledger=years42.steps.find(x=>x.heading?.includes('一张换库单'));
    if(ledger&&!ledger.v42){const old=ledger.text;ledger.text=s=>{const a=typeof old==='function'?old(s):old;return [...a,
      `方小满后来看到那批新防潮绢袋时，只说了一句“花房以前领种子袋也用过这家的布”。她认得的是手感和封口，不认得贡造行的名字。没人因此立案，没人觉得一个常在对旧宫物料的熟悉值得写进档册。`,
      `崔静仪听见后还问她：“你从前在花房很辛苦吧？”方小满答：“也还好，最辛苦的是梅雨天晒不干东西。”两个人说完便换了话题。崔静仪顺着她的话问起花房梅雨天怎么晒种子，方小满讲了半天晒棚漏雨。说到最后，两个人都笑了，话题也就过去。`
    ];};ledger.v42=true;}
    const wenloss=years42.steps.find(x=>x.heading?.includes('胎像开始不稳'));
    if(wenloss&&!wenloss.v42){const old=wenloss.text;wenloss.text=s=>{const a=typeof old==='function'?old(s):old;return [...a,
      `蘅嫔卧床那几日，方小满没有天天来。她只让阿芙送过两次热水袋和一包晒干的艾草——都是宫女值房里常用的笨办法。她知道有些时候高位妃嫔最不缺的就是围在床边问“好些没有”的人。`,
      `${courtTitle(s,'baopu')}却记住了。后来她自己怀孕时，也曾问阿芙“你们宫女以前保胎都怎么做”。阿芙答：“宫女哪有保胎例。”一句无心的话，让昭氏沉默了很久。`
    ];};wenloss.v42=true;}
  }

  // ---------- 方氏案：旧宫女经历反过来被拼成“有机会” ----------
  const fangCase42=CHAPTERS.find(ch=>ch.title==='听雨轩有喜');
  if(fangCase42?.steps&&!fangCase42.steps.some(x=>x.heading?.includes('宫女旧籍也被送上御案'))){
    const idx=fangCase42.steps.findIndex(x=>x.heading?.includes('太后昏厥以后'));
    if(idx>=0)fangCase42.steps.splice(idx+1,0,{heading:'第六幕后 · 宫女旧籍也被送上御案',cast:['fang','gu','zhou','afu','peiyan'],fx:'ink',narrative:true,text:s=>[
      `太后昏厥后的当日下午，尚宫局把方小满承熙元年的宫女旧籍也送来了。原本只是例行核查。可纸一摊开，很多普通经历忽然都能被读成另一种意思。`,
      `旧籍写着：御花园花房当差，曾往慈宁宫送花，曾去尚食局领鱼食，曾在内务府领炭与麻绳，曾替花房去太医院取过一次外伤药。每一项都是真的。`,
      `负责抄录的人在旁边加了一句：“熟悉宫中各处出入。”再下一页又写：“与多处宫人相识。”两个句子合在一起，便像是在说她天然有能力接触香、药、盒子与传话的人。`,
      `皇后看完后先问：“这些差事，是她自己挑的，还是当年花房派的？”`,
      `尚宫答：“都是轮值。”`,
      `“那就把‘熟悉各处出入’删掉。”皇后第一次没有照抄调查官的概括，“写原事。不要替原事下结论。”`,
      `${courtTitle(s,'zhou')}也在场。她望着那页旧籍很久，忽然说：“当年我还笑过她一个宫女忽然成了主子。如今倒好，连做宫女走过的路都能拿来做罪证。”`,
      `阿芙站在门外听见，脸色发白。她比谁都知道那些路意味着什么——不是门路，是提水、搬盆、领炭，是下雨天鞋里全是泥。`,
      `<span class="v42-callback"><b>这条线与昭氏旧香案真正合上了：</b>制度不只会把“真的印章”拼成假的结论，也会把“真的生活轨迹”拼成一个看似合理的嫌疑人。</span>`
    ],choices:[{label:'继续查原事，不接受概括替人定罪',effects:{trust:{gu:2,fang:2,afu:2},flags:{fangOldMaidRecordExamined:true}},result:''}]});
  }

  // 雪夜前，把她为什么如此相信熟路上的东西再收回来。
  if(fangCase42?.steps){
    const poison=fangCase42.steps.find(x=>x.heading?.includes('药还是进来了'));
    if(poison&&!poison.v42){const old=poison.text;poison.text=s=>{const a=typeof old==='function'?old(s):old;return [
      `听雨轩的人后来反复问：方小满做过宫女，明明比很多妃嫔更熟悉宫里的路，为什么仍会信那碗药？答案恰恰相反——因为她太熟悉“东西沿着正确的路送来”是什么样子。`,
      ...a,
      `她从前做宫女时学会的是：牌子对、封签对、送来的人脸熟，就该赶紧把差事接过去，别耽误上头。十年后，这套让一个小宫女不挨罚的本能，成了凶手最容易利用的东西。`
    ];};poison.v42=true;}
    const belongings=fangCase42.steps.find(x=>x.heading?.includes('顺贵人的东西并不多'));
    if(belongings&&!belongings.v42){const old=belongings.text;belongings.text=s=>{const a=typeof old==='function'?old(s):old;return [...a,
      `阿芙最后从箱底翻出方小满当宫女时那件洗得发白的浅青短褂。袖口仍是她自己收过的针脚。皇后看见后没有让它进“嫔妃遗物”那一栏，只另写了一行：“旧衣一件，随身多年。”`,
      `从花房宫女到顺贵人，史书最后只会写两三个名位变化。真正把她连起来的，却一直是同一种针脚、同一种看见别人有麻烦就顺手过去的习惯。`
    ];};belongings.v42=true;}
  }

  // 地图同步方小满身份：册封前在花房，册封后才出现听雨轩。
  const oldV41MapSpots=typeof v41MapSpots==='function'?v41MapSpots:null;
  if(oldV41MapSpots){v41MapSpots=function(s=state){const a=oldV41MapSpots(s);if(!v42FangElevated(s)){const ty=a.find(x=>x.name==='听雨轩');if(ty)ty.desc='尚未赐居。此时方小满仍在御花园花房当差。';if(!a.some(x=>x.name==='御花园花房'))a.push({name:'御花园花房',x:39,y:18,desc:'宫花、盆景与节令花木从这里分送六宫。方小满册封前与阿芙都在这里当差。'});}return a;};}

  // 旧存档涉及方小满前史的，保留前两章选择后回到第三章重新体验；不动更早剧情。
  if(!state.flags?.v42Migrated){
    const hadProgress=(state.index||0)>=2;
    if(hadProgress){
      try{
        const keep=(state.history||[]).slice(0,2),intro=state.intro;
        state=clone(INITIAL_STATE);state.intro=intro;
        keep.forEach((p,idx)=>{state.index=idx;applyRecordedChapter(idx,p);state.index=idx+1;applyMilestones(state.index,[])});
        state.index=2;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];
      }catch(_e){state.ranks.fang='宫女';state.index=Math.min(state.index||2,2);}
    }else state.ranks.fang='宫女';
    state.flags.v42Migrated=true;
  }

  const renderV42=render;render=function(){v42SyncFangHome(state);return renderV42();};
  try{save();render()}catch(_e){}
}catch(e){console.error('v42 fang/original-plot patch failed',e)}})();
