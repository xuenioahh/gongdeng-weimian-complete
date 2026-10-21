(()=>{try{
  document.documentElement.dataset.build='v70';
  document.title='宫灯未眠 · 女史新制与旧血追责 v70';
  const CH=t=>(CHAPTERS||[]).find(x=>x.title===t);
  const ST=(ch,q)=>ch?.steps?.find(x=>(x.heading||'').includes(q));
  const AS=(v,s)=>{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]};
  const idxOf=t=>CHAPTERS.findIndex(x=>x.title===t);
  const addAfter=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v70id===obj.v70id))return;const i=ch.steps.findIndex(x=>(x.heading||'').includes(q));if(i>=0)ch.steps.splice(i+1,0,obj);else ch.steps.push(obj)};

  // 1) 承熙元年双生：宫中势力在皇帝最终裁断前，已经先把孩子推出了“皇嗣”的位置。
  const first=CH('宫门初定');
  const twin=ST(first,'第二声哭没有名字')||ST(first,'双生异闻');
  if(twin&&!twin.v70Power){
    twin.text=s=>[
      `男婴会哭、会吃奶。太医能写下的只有左眼瞳色浅、右手六指，没有人能写出“活不成”三个字。可第二声哭刚落，产房外已经有人开始讨论他该不该被看见。`,
      `钦天监的人先送来一句“异相宜秘”，宗人府掌籍随后来问玉牒要不要暂缓。凤仪宫的司礼嬷嬷最实际，只问一句：“若消息先传出去，三皇子的嫡序怎么办？”`,
      `顾明宜没有说杀。她做的是她最熟悉的事——先把失控的东西挪出正在运转的秩序。她亲笔签了临时单：<b>“男婴先移出产殿，不入皇嗣院，不报玉牒，候御前裁。”</b>`,
      `我到绮春宫时，孩子已经不在周清漪身边。西华门内一处多年不用的小院先接了人。桌上摆着顾明宜的小印、钦天监的折子、宗人府的空白玉牒页。宫里实际上已经替我把选择缩成了很窄的一条路。`,
      `周清漪抱着女婴，只问：“陛下是要他死，还是要所有人以后都当他没有活过？”`,
      `顾明宜先签了“移出产殿、不入皇嗣院、不报玉牒、候御前裁”。不到一个时辰，御前又落了第二道旨。`
    ];
    twin.choices=[{label:'秘处异子：玉牒只留公主',hint:'孩子已经被移到西华门内。你的旨意会把“暂不入册”变成真正的死令。',v38TwinFate:'kill',v69CruelTwin:true,v70TwinDeathOrder:true,effects:{bond:{zhou:-16},trust:{zhou:-18,taihou:-5,gu:-4},flags:{twinGirlBorn:true}},result:'秘处旨追到西华门时，男婴已经先被中宫临时处置移出产殿。奉差内侍接了死令，把孩子带出西华门；内务府随后回报“已毕”。宫史只留“一子不育”。'}];
    twin.v70Power=true;
  }
  const earlyFollow=ST(first,'绮春宫先改掉两个字');
  if(earlyFollow&&!earlyFollow.v70Power){const old=earlyFollow.text;earlyFollow.text=s=>[...AS(old,s),
    `后来夹进产案的其实有两张纸。第一张是顾明宜签的“移出产殿、候御前裁”，时间在前；第二张才是我的“秘处”旨。两张纸相隔不到一个时辰。那时没有人觉得这个先后值得记。`,
    `顾明宜把两张一起收进凤仪宫旧案。很多年后，我重新看到它们时，两张纸仍按先后压在同一册里。`
  ];earlyFollow.v70Power=true;}

  // 2) 疫前冰库案：给宋氏陪嫁宫女一个名字，让小争执成为后来的暗害入口。
  const summer=CH('荷风满座');
  const ice=ST(summer,'冰在谁的宫门前先化');
  if(ice&&!ice.v70Maid){const old=ice.text;ice.text=s=>AS(old,s).map(line=>{
    let z=String(line);
    z=z.replace('宋文秀的陪嫁宫女拿一枚银扣塞给冰库小吏','宋文秀的陪嫁宫女春屏拿一枚银扣塞给冰库小吏');
    return z;
  }).concat([
    `春屏被问话时一直低着头。许淑惠其实一句重话都没有说，只在退下时对她道：“冰送回来就好。”春屏却抬眼看了她一下。那一眼很短，王静娴仍然记住了。`,
    `<span class="v70-note">这时没人会把一枚银扣和几个月后的秋疫联系起来。宫里真正危险的后果，往往先以“小事已经罚完了”的样子结束。</span>`
  ]);for(const c of ice.choices||[]){const oldr=c.result;c.result=typeof oldr==='function'?oldr:s=>oldr;c._v70_old_result=c.result;c.result=s=>{const base=typeof c._v70_old_result==='function'?c._v70_old_result(s):c._v70_old_result;return `${base}<br><br>春屏被调出宋氏近身，暂拨尚宫局抄送牌簿。宋文秀没有再问她后来去了哪一房。`;};}ice.v70Maid=true;}

  // 3) 秋疫：许淑惠不是单纯病亡。春屏利用混乱改过调院牌，把她故意推入最危险的病区。
  const winter=CH('凤仪宫最后一冬');
  const xuDeath=ST(winter,'许淑惠这回没有行礼');
  if(xuDeath&&!xuDeath.v70Framed){
    xuDeath.heading='九月初二 · 许淑惠被一张改过的牌子送进西院';
    xuDeath.cast=['xu2','ning','afu','zhao2'];
    xuDeath.text=s=>[
      `九月初一，许淑惠原本只在病愈者外院帮着认名牌。午后尚宫局送来一张临时调院条，说她三日前曾与西院病者同处一室，应立即转入西院观察。`,
      `她盯着那张纸看了半天：“我三日前在东廊。王姐姐也在。”`,
      `王静娴立刻说：“她没去过西院。”`,
      `送牌的人却只认上面的红记。那几日人手已经乱，谁都怕漏掉真正接触过病人的人。许淑惠最后还是自己把小包袱抱起来：“别因为我一个人，把这一院都拖着等。”`,
      `阿芙接过调院条时，注意到“东”字下面有一道很浅的刮痕，补写的“西”比旁边几个字重。她想追抄牌的人，前院却同时抬来两个高热宫女，只能先把纸夹进册里。`,
      `第二日，许淑惠开始发热。邵明贞隔着帘子来看，她听见脚步，本能地撑着床沿要坐起来。`,
      `“别行礼。”邵明贞在外头先说。`,
      `许淑惠烧得脸发红，居然还笑了一下：“娘娘说了别行礼，那臣妾这回就不数了。”`,
      `夜里她问阿芙：“我的名牌以后会不会送错家？”`,
      `阿芙说不会。她这一次没有只说安慰话，而是把许家的父名、籍贯和封套重新念了一遍。`,
      `第二日寅时，许淑惠没能醒来。宫册先写“疫亡”。那张刮过一个字的调院条，则被阿芙单独夹进了最后一页。`,
      `<div class="v70-revenge"><b>此时没人知道那不是笔误。</b>后来才查明，冰库案后被调离宋氏近身的春屏正好在尚宫局临时抄牌。她把许淑惠的去处改成了西院。她没有用毒，也没有碰药——她只让一张错误的纸在最混乱的时候看起来像真的。</div>`
    ];
    xuDeath.choices=[{label:'把那张刮过的调院条单独封存',hint:'阿芙：“病可以是真的，送她进去的理由未必是真的。”',effects:{trust:{afu:3,zhao2:2},flags:{v70XuSuspiciousDeath:true}},result:'许氏仍按疫亡发丧。没有证据证明是谁改的字，案子暂时只能压在疫册最后。'}];
    xuDeath.v70Framed=true;
  }

  // 4) 阿芙动机：她不是因为喜欢“填满空格”，而是无法忘掉自己亲手接过那碗药。
  const fang=CH('听雨轩有喜');
  const afuStay=ST(fang,'阿芙还得选自己往哪走');
  if(afuStay&&!afuStay.v70Motive){const old=afuStay.text;afuStay.text=s=>{
    const xs=AS(old,s);const out=[];for(const line of xs){
      if(String(line).includes('奴婢只是不想以后册上再写')){
        out.push(`“不想。”阿芙答得很快，“奴婢不是想查谁。”`);
        out.push(`她低头看自己的手：“那晚药送进来，是奴婢验的封签，也是奴婢从那个人手里接的碗。纸对、印对，奴婢还亲手把药递给主子。”`);
        out.push(`“主子死以后，奴婢总会想起那只碗。送药的人说奉了口谕，奴婢验过封签，就接了。后来再问，前一个人说自己只是送药，后一个人说自己只是接药。可碗最后是奴婢递到主子手里的。”`);
        out.push(`“奴婢想去传簿房。以后再有药、信、箱笼送进来，奴婢想把送来的人和接下的人都问清楚。真出了事，至少能一户一户、一门一门往回找，不至于问到最后只剩一句‘不知道’。”`);
      }else if(String(line).includes('那碗药进听雨轩的时候')||String(line).includes('经手宫人不详')||String(line).includes('阿芙留下来的不是方小满的案子')){
        continue;
      }else out.push(line);
    }
    out.push(`<div class="v70-oldseal"><b>阿芙忘不了的是那只药碗。</b>药不是她煎的，口谕不是她传的，可最后确实是她把碗递到了方小满手里。她后来去传簿房，只因为下一次再出事时，她想知道那样东西究竟经过了哪些人。</div>`);
    return out;
  };afuStay.v70Motive=true;}

  // 5) 张元照后期新政：女官不再只是宫女的高一级，而是一条不靠婚姻进入宫廷权力的路径。
  if(!CH('青衣过重门')){
    const west=idxOf('西华门外');
    const office={date:'承熙十五年·正月至四月',title:'青衣过重门',theme:'宫里第一次出现一批不以侍奉谁为身份的女人；其中一个人进来，只为了把堂妹的死重新打开',place:'凤仪宫 / 女史院 / 尚宫局旧库 / 长春宫',cast:['zhangyuanzhao','afu','song2','xulingyi'],fx:'ink',bridge:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?`张元照受凤印以后，没有立刻再碰更大的朝政。她先改了一件宫里人人习以为常的小事：会写字、会算账、会教书的女子，为什么只能做宫女，或者成为谁的妃嫔？正月，凤仪宫第一次贴出女史试任榜。`:`这一年御前仍试着把一部分宫务交给有专长的女史。张元照没有凤印，制度只开了很小一道门，却仍有人从这道门里走了进来。`,steps:[
      {heading:'正月十二 · 宫门里多了一种身份',cast:['zhangyuanzhao','afu'],fx:'ink',narrative:true,text:s=>[
        `榜文贴在尚宫局外墙时，围得最久的不是年轻宫女，是几个已经识字多年、却知道自己这一辈子最多只能做到掌事的人。`,
        `${s.flags?.v44NewEmpress==='zhangyuanzhao'?'张元照定的第一条不是“女官听命中宫”，而是“女官有任期”。':'试行条目里最显眼的一句，是张元照坚持加上的“任满可退”。'}`,
        `女史试任三年，领独立俸银，按所长进司籍、女学、医案校录与恤籍复核。任期内不列侍寝名册；若以后本人另有选择，先辞职，再谈别的。`,
        `裴景和看完只问：“若陛下看中了其中一个呢？”`,
        `张元照答：“那先问她想不想辞。”`,
        `我没有因为这句话生气。真正让我多看一遍的是另一条：<b>女官的升退不按谁的宫里得宠。</b>`,
        `<div class="v70-office"><b>女史院试任制</b><br>它最特别的地方不是多设几个职位，而是第一次承认：一个女子可以因为会做一件事进入宫廷权力，却不必先成为某个人的女人。</div>`
      ],choices:[{label:'先试三年，人数只开十二名',hint:'主控：“先看它会长成什么，再谈扩大。”',effects:{trust:{zhangyuanzhao:2,afu:1},flags:{v70FemaleOffice:true}},result:'十二名女史分入四处。榜文没有写“开天下女子仕途”，只从宫门里先开了一道很窄的缝。'}]},

      {heading:'二月初六 · 许家的姐姐站在最后一排',cast:['zhangyuanzhao','afu','xulingyi'],fx:'dawn',narrative:true,text:s=>[
        `最后一轮试问时，一个二十六岁的女子把名帖放到案上：许令宜。京中小族出身，守过父丧，会算家产、核族谱，也在女塾教过两年字。`,
        `张元照看到姓氏便停了一下：“许淑惠是你什么人？”`,
        `“堂妹。”`,
        `屋里安静下来。许令宜没有哭，也没有说“求娘娘做主”。她只说：“家里收到的文书写疫亡。臣女想知道，她为什么会从外院进西院。”`,
        `阿芙站在张元照身后，这才抬眼端详她。`,
        `张元照道：“你可以进恤籍复核。但你不能一个人给自己堂妹的案子下结论。”`,
        `许令宜答：“臣女要的是能看，不是一个人定。”`,
        `她说得很稳。只有退出殿门时，手指在袖口里攥得太紧。`
      ],choices:[{label:'准许令宜入女史院，兼旧疫恤籍复核',hint:'她有资格查自己的问题，但不能独自决定答案。',effects:{trust:{zhangyuanzhao:2,afu:1},flags:{v70XuOfficialEntered:true}},result:'许令宜成为试任女史。她进宫的第一份差事，就是重新核十一年秋疫死者的恤籍与调院旧档。'}]},

      {heading:'三月十九 · 一枚银扣从六年前滚回来',cast:['xulingyi','afu','song2','zhangyuanzhao'],fx:'ink',narrative:true,text:s=>[
        `许令宜查到许淑惠那张调院条时，第一眼便看出“西”字不是同一支笔。她没有立刻来报，先去找当年冰库案的旧簿。`,
        `旧簿只记了几行：<b>宋氏陪嫁宫女春屏，以银扣求冰，事后调离近身。</b>`,
        `再往后，秋疫时尚宫局临时抄录的名册里又出现春屏。她在许淑惠死后第四日也染病而亡，已经无从问话。`,
        `王静娴当年的旁证、阿芙留下的刮痕调院条，再同两处笔迹一对，前后的事便连了起来：春屏因为冰库案被调离，一直认定自己是被许淑惠“害”出去的；秋疫混乱时，她故意改了那张牌。`,
        `宋文秀听完脸色一点点白下去：“她调走以后……臣妾没有再问。”`,
        `许令宜第一次抬高声音：“你当然没有问。死的又不是你家的人。”`,
        `张元照没有喝止她。等屋里静下来才问：“你查到宋氏让她改牌了吗？”`,
        `许令宜没有答。`,
        `“查到她知道春屏要报复吗？”`,
        `还是没有。`,
        `<div class="v70-revenge"><b>许淑惠确实是被人故意送进病区的。</b>可真正下手的人已经死在同一场疫里。剩下最难的问题不是“有没有凶手”，而是一个亲人能不能把还活着的主子一起算成凶手。</div>`
      ],choices:[{label:'继续查完整，不许只停在“春屏是宋氏的人”',effects:{trust:{zhangyuanzhao:2,afu:2},flags:{v70XuMurderProved:true}},result:'旧疫册第一次从“许氏疫亡”改成“疫中遭人为错调，后病亡”。宋文秀是否承担更重责任，仍需另判。'}]},

      {heading:'四月初四 · 许令宜把少了一页的案卷递给都察院',cast:['xulingyi','zhangyuanzhao','afu','song2'],fx:'seal',keyDecision:true,text:s=>[
        `许令宜没有等御前裁。她把旧疫案抄成一册，托女史院外送文书时递给都察院。`,
        `那一册里有冰库银扣、有春屏名字、有被刮改的调院条，唯独少了一页：<b>宋文秀在冰库案后已将春屏调离近身，此后没有再给她私令。</b>`,
        `都察院当天就有人上折，要求追究宋氏“使婢害宫嫔”。消息先传进长春宫，宋文秀抱着女儿坐了一下午。`,
        `阿芙把缺的那页放到许令宜面前：“你不是没看见。”`,
        `许令宜说：“春屏死了。她还能向谁偿命？”`,
        `“所以你挑一个还活着的人？”`,
        `“她是春屏的主子。”`,
        `张元照这才开口：“主子该担她该担的。不能因为真正下手的人死了，就把没做过的那一段也塞给活人。”`,
        `许令宜盯着她：“娘娘若死的是自己的妹妹，还能这么分？”`,
        `张元照停了很久：“我不知道。我只知道我若今天因为心疼你，就准你少递一页，女史院明天就只是另一种替自己人改卷子的地方。”`
      ],choices:[
        {label:'让许令宜把缺页补回去，由她本人重新署名呈案',hint:'不抹掉她查出的真相，也不准她替真相剪掉不顺眼的一页。',effects:{trust:{zhangyuanzhao:3,afu:2,song2:1},flags:{v70XuOfficialFate:'stay'}},result:'许令宜降一等留任，停外递文书半年。完整案卷重送都察院：春屏为直接加害者；宋文秀对陪嫁人旧怨与去向失察，记过并停母家私递半年，但不以谋害宫嫔论。'},
        {label:'撤许令宜女史职，案卷由另一组女史重新呈送',hint:'她查到的证据仍有效；公器私用另论。',effects:{trust:{zhangyuanzhao:2,afu:1,song2:1},flags:{v70XuOfficialFate:'dismiss'}},result:'许令宜离开女史院，但许淑惠的案子没有随她一起被撤。完整证据仍确认春屏故意改牌；宋氏承担失察，不承担她没有下过的杀人令。'}
      ]}
    ]};
    CHAPTERS.splice(west>=0?west:CHAPTERS.length,0,office);
  }

  // 6) 后期旧子揭露：补顾明宜的旧印与主控震怒；随后单独处理她的身后评价。
  const west=CH('西华门外');
  const reveal=ST(west,'他自己把西华门那一夜送到御前');
  if(reveal&&!reveal.v70GuSeal){const old=reveal.text;reveal.text=s=>{
    const xs=AS(old,s);const out=[];
    for(const line of xs){out.push(line);if(String(line).includes('匣里有三样东西')){
      out.push(`匣底其实还压着第四样：顾明宜当年签的“移出产殿、不入皇嗣院、候御前裁”。凤仪宫小印还在，时辰比我的“秘处”旨早。`);
      out.push(`我盯着那枚印看了很久。十八年来我一直以为，是我的死令把孩子推出宫门。到这一刻才知道，在我落笔以前，中宫、宗人府、钦天监已经先替一个刚出生的孩子决定了“不能留在正常秩序里”。`);
      out.push(`我把木匣盖得太重，案角的茶盏震了一下。裴景和没有抬头。我把木匣盖得太重，案角的茶盏震了一下。裴景和没有抬头。我让他把两道原旨都留下，不许只抄最后一道。`);
    }}return out;
  };reveal.v70GuSeal=true;}
  if(west&&!west.steps.some(x=>x?.v70id==='gu-posthumous-reckoning')){
    const i=west.steps.findIndex(x=>(x.heading||'').includes('他自己把西华门那一夜送到御前'));
    const obj={v70id:'gu-posthumous-reckoning',heading:'承熙十九年三月十一 · 已故皇后的名字也被重新翻出来',cast:['emperor','zhangyuanzhao','afu'],fx:'candle',keyDecision:true,text:s=>[
      `陆既明的身世一见光，第二日便有宗室与御史追问顾明宜。她当年用中宫印先把孩子移出产殿，又在我的“秘处”旨下去以后把两张纸并入旧案。`,
      `有人上折说，应削顾后身后美谥；更重的一份甚至提到撤配享。`,
      `我看完以后把折子压在最下面。怒意并没有因为她已经死了就消失。她若还活着，我会问她：为什么在我裁决以前，就先把一个孩子从皇嗣院挪出去？`,
      `可同一张桌上还摆着我的“秘处”旨。顾明宜先把人推出秩序，我后来亲手把那条路变成死路。`,
      `张元照没有替前任皇后求情，也没有顺着外朝说该削。她只道：“身后名可以动。但动了以后，也不能让人以为当年真正下死令的是她。”`,
      `<div class="v70-oldseal"><b>这不是给顾明宜翻案，也不是把罪全推给死人。</b>她的局限终于留下真实后果：她太相信先把异常移出秩序、再慢慢等裁决。可最终“秘处”二字，仍然是皇帝自己写下的。</div>`
    ],choices:[
      {label:'不动顾后追谥；把她的移出令与朕的秘处旨并列入实录',hint:'不拿削死人的名号替活着的皇帝减轻责任。',effects:{trust:{zhangyuanzhao:2,afu:1},flags:{v70GuPosthumous:'kept'}},result:'顾后追谥、陵寝与配享不动。起居注补录：顾后曾先令异子移出产殿候裁；帝后下秘处旨。两件事不再互相遮盖。'},
      {label:'削去顾后一字美谥，但不废后位、不动陵寝',hint:'对她当年的中宫处置作出身后谴责；御前死令仍另记在帝名下。',effects:{trust:{zhangyuanzhao:1},flags:{v70GuPosthumous:'trimmed'}},result:'礼部削去顾后一字美谥，皇后位、陵寝与其余追恩不动。实录同时明载秘处死令出自御前，不以削谥替皇帝卸责。'}
    ]};
    if(i>=0)west.steps.splice(i+1,0,obj);else west.steps.push(obj);
  }

  // 7) 终局制度后果：不再是“把流程填满”，而是不许用异相把出生事实从宗牒抹掉。
  const final=ST(west,'西华门还在那里');
  if(final&&!final.v70Law){const old=final.text;final.text=s=>{
    const xs=AS(old,s).filter(line=>!String(line).includes('不得以‘已毕’结案')&&!String(line).includes('这回至少不会空着'));
    const out=[];for(const line of xs){if(String(line).includes('周清漪的牌位')){out.push(line);out.push(
      `<div class="v70-law"><h4>承熙十九年 · 宗牒新例</h4><b>皇嗣先记“生”，再记后来发生了什么。</b><br>凡皇室子女，只要活产，出生事实必须进入真实宗牒；先天残疾、异相与疾病不得作为抹除出生、伪作“不育”的理由。是否养育、如何医治、是否离宫可以另议，但不能先把一个活过的人改写成没有来过。</div>`,
      `阿芙看完那条“先记生”，很久没有说话。她想起的不是承熙元年的空格，是听雨轩那只药碗。`,
      `“主子死的时候，奴婢最恨的不是少写一个名字。”她说，“是每个人都能说自己只做了一小步，到最后好像谁也没把她送到那儿。”`,
      `她把新例往回推了一寸：“人活过，就先承认他活过。后面再难写，也别为了好写，把人改没了。”`
    );}else out.push(line);}return out;
  };final.v70Law=true;}

  // 8) 女官角色卡。
  const officeIdx=Math.max(0,idxOf('青衣过重门'));
  if(!PEOPLE.xulingyi)PEOPLE.xulingyi={name:'许令宜',title:'试任女史',age:'26岁',home:'女史院值房',noPortrait:true,portraitKind:'woman',glyph:'令',introducedAt:officeIdx,tags:['许淑惠堂姐','旧疫复核','复仇心未消'],bio:'许淑惠的堂姐。她进女史院不是为了仕途名声，而是想知道堂妹为何从外院被送进西院。她擅核族谱、家产与旧档，最危险的地方却在于：当真正下手的人已经死了，她很容易把“找真相”一步走成“必须找一个活人偿命”。'};

  // 9) 阿芙人物卡与卷终文案改成“拒绝所有人都只是照例”。
  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople&&!globalThis.__v70PeopleWrapped){globalThis.__v70PeopleWrapped=true;peopleView=function(){
    if(PEOPLE?.afu){PEOPLE.afu.bio='方小满死前最后那碗药，是阿芙亲手验封、接过、再递出去的。她后来去了尚宫局传簿房，因为她始终记得自己当时没有追问送药的人究竟从谁手里接令。此后凡是药、信、箱笼经过她的桌子，她都要问清送来的人和接下的人。后来她跟随张元照，也仍敢当面追问一句：这东西到底是谁交给谁的。';PEOPLE.afu.tags=['方小满旧人','记得自己的手','不许“照例”洗掉责任'];}
    return oldPeople();
  };}

  const oldEnding=typeof ending==='function'?ending:null;
  if(oldEnding&&!globalThis.__v70EndingWrapped){globalThis.__v70EndingWrapped=true;ending=function(){let h=oldEnding();
    h=h.replace('阿芙当年坚持的“谁交给谁”，到最后连皇帝自己的旧命也必须回答。','方小满死后，阿芙总记着自己亲手递出的那只药碗。她去了尚宫局以后，凡是药、信和箱笼，都习惯问清送来的人和接下的人。这个习惯后来让她在秋疫旧档和承熙元年的产案里看见了几处过去没人追问过的断处。');
    h=h.replace(/方小满死后，阿芙先在尚宫局传簿房独自站住，后来才主动成为张元照的贴身掌事。[\s\S]*?不能从她的经手栏里被省掉。/,'方小满死后，阿芙先在尚宫局独自站住，后来才重新选择跟随张元照。她一直记得那碗药最后是自己递到方小满手里的，也一直记得事后再问时，每个人都只能说清自己眼前那一步。于是她后来见到交接，总要多问一句前后是谁。');
    h=h.replace('“娘娘，这一格写谁下令？”','“人活过，就别为了好写，把人改没了。”');
    return h;};}

  // 10) 大事录补女史院、许氏暗害与顾后身后追责。
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron&&!globalThis.__v70ChronWrapped){globalThis.__v70ChronWrapped=true;chronicleView=function(){let h=oldChron();const f=state.flags||{};const extra=`<section class="v69-factions"><span class="eyebrow">承熙十五—十九年 · 新的回声</span><h4>几件旧事终于长出了真正的后果</h4><p><b>许淑惠：</b>${f.v70XuMurderProved?'旧疫复核确认，她并非单纯疫亡；春屏故意改过调院牌，将她送入西院。':'疫亡旧档仍有一张被刮改的调院条。'}</p><p><b>女史院：</b>${f.v70FemaleOffice?'宫中第一次以专长、任期和俸银设女史，不以侍奉某个主子为身份。':'尚未正式试行。'}</p><p><b>顾后旧印：</b>${f.v70GuPosthumous==='trimmed'?'旧子案曝光后削去一字美谥；皇帝秘处死令仍另记。':f.v70GuPosthumous==='kept'?'追谥未动，中宫移出令与御前秘处旨并列入实录。':'旧案尚未走到身后追责。'}</p><p><b>宗牒新例：</b>皇嗣只要活产，先记出生事实；异相、残疾与疾病不再成为把一个人从宗牒里改成“未曾出生”的理由。</p></section>`;return h.replace('</main>',extra+'</main>');};}

  state.flags=state.flags||{};state.flags.v70Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v70 patch failed',e)}})();
