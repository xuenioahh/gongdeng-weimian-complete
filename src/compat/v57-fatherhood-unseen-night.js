(()=>{try{
  document.documentElement.dataset.build='v57';
  document.title='宫灯未眠 · 灯下唯一看不见的一夜 v57';
  const V57_CURRENT_TITLE=CHAPTERS[state.index]?.title;
  const CH=t=>CHAPTERS.find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));
  const IX=(c,q)=>c?.steps?.findIndex(x=>(x.heading||'').includes(q))??-1;
  const A=(v,s)=>{const a=typeof v==='function'?v(s):v;return Array.isArray(a)?a:[a];};

  // 张元照若走到嫔位以上，启用“文”字封号；低位时仍按张氏本姓称谓。
  const courtTitleV57Old=courtTitle;
  courtTitle=function(s,k){
    const raw=courtTitleV57Old(s,k);
    if(k!=='zhangyuanzhao')return raw;
    const r=(s?.ranks&&s.ranks[k])||'';
    const m={嫔:'文嫔',妃:'文妃',贵妃:'文贵妃',皇贵妃:'文皇贵妃'};
    if(m[r])return m[r];
    if(r==='贵人')return '张贵人';
    if(r==='常在')return '张常在';
    if(r==='答应')return '张答应';
    return raw;
  };
  function zTitle(s=state){return courtTitle(s,'zhangyuanzhao')||'张氏';}

  // A. 病榻前把因果种下：三皇子先把她认成“记得母后的人”，而不是恋爱对象。
  const winter=CH('凤仪宫最后一冬');
  if(winter&&!winter.steps.some(x=>(x.heading||'').includes('榻边那个“误”字'))){
    const at=IX(winter,'“你救不了所有人”');
    const seed={heading:'十月十九 · 榻边那个“误”字',cast:['gu','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
      `三皇子来凤仪宫探病时，门帘没有完全放下。顾明宜半靠在榻上，${zTitle(s)}坐在小案边誊临时宫务册。`,
      `册上记一名小宫女慌乱中把两处送药牌换反，原稿写的是“值夜有错”。皇后看了一会儿，抬手指了指那个字：“改成‘误’。”`,
      `${zTitle(s)}没有问为什么，提笔便改。`,
      `皇后气息很轻：“宫人也是人。慌乱中拿错，和明知道不该还去做，不是一回事。”`,
      `三皇子一直站在门边。母后没有叫他，他也没有出声。`,
      `那天他记住的却是小案边那个人落笔很稳。母后说“误”，她就把“错”改成“误”；母后停在哪里，她便把那句话完整留在哪里。`,
      `顾明宜抬眼看见儿子，才招手：“站那么远做什么？”`,
      `三皇子走过去。经过小案时，他又看了一眼那个刚改过的字。`
    ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:1},flags:{v57PrinceSeesZhangAtBedside:true}},result:''}]};
    if(at>=0)winter.steps.splice(at,0,seed);else winter.steps.push(seed);
  }
  if(winter&&!winter.steps.some(x=>(x.heading||'').includes('母后最后记了什么'))){
    const at=IX(winter,'十月二十三，凤仪宫灯灭');
    const after={heading:'十月二十四 · “母后最后记了什么？”',cast:['peiyan'],fx:'snow',narrative:true,text:s=>[
      `报丧后的第二日，三皇子问了好几个人同一句话：“母后最后记了什么？”`,
      `乳母说皇后最后还问过他的弓房。尚宫说最后一页是病愈宫人的复值。太后只叫他先吃饭。`,
      `他最后问到裴景和。`,
      `裴景和想了一会儿：“娘娘最后亲自核过的几本册子，有两本还在凤仪宫封匣。另一本临时疫册，张主子誊过副本。”`,
      `“她记得母后说过什么？”`,
      `“记册子的人，总要记得些。”`,
      `三皇子没有再问。那天下午，他第一次让东所的人去尚宫局问：皇后病中留下的册子，皇子以后能不能按例借阅。`
    ],choices:[{label:'继续',effects:{flags:{v57PrinceAsksLastNotes:true}},result:''}]};
    if(at>=0)winter.steps.splice(at+1,0,after);
  }

  // B. 承熙十二年：靠近每次只越一寸，先从完全合理的借阅开始。
  const vacant=CH('凤座无人');
  if(vacant&&!vacant.steps.some(x=>(x.heading||'').includes('他借的第一本只是遗物清单'))){
    const pos=Math.max(1,Math.min(vacant.steps.length,6));
    vacant.steps.splice(pos,0,{heading:'五月 · 他借的第一本只是遗物清单',cast:['zhangyuanzhao','peiyan'],fx:'ink',narrative:true,text:s=>[
      `三皇子第一次借顾明宜旧册，借的是中宫遗物清单。理由没有任何问题——他是嫡子，想知道母后留下哪些书、哪些旧衣、哪些东西随梓宫入了陵。`,
      `册子经尚宫局、裴景和两道手送过去，三日后原样归还。夹在里面的只有一张小纸：“有劳${zTitle(s)}校出母后亲笔批注。”`,
      `${zTitle(s)}把纸也随册归档，没有另收。`,
      `第二次，他借的是皇后生前处理皇嗣功课的旧页。第三次，是几份没有涉密的六宫月例旧案。每次都合规，每次也都按时归还。`,
      `真正慢慢变化的是问题。起先他问“母后当年怎么做”，后来变成“母后若还在，会怎么做”。`,
      `${zTitle(s)}第一次听见后一种问法时，没有替顾明宜答。她只说：“册上没有写的，臣妾不能替娘娘补。”`,
      `三皇子点头，仍把书带走。走到门口却回头看了一眼，像是第一次发现，记得一个人的话和替那个人继续说话，并不是同一件事。`
    ],choices:[{label:'继续',effects:{trust:{zhangyuanzhao:1},flags:{v57PrinceBorrowChainBegins:true}},result:''}]});
  }

  // C. 重写承熙十三年的边界线：求救式投射，不写成觊觎；元照退避、留痕、报御前。
  const growth=CH('长枝渐高');
  if(growth){
    const borrow=ST(growth,'张元照退回一匣书');
    if(borrow){
      borrow.heading='第三幕 · 借到最后，他问的已经不是旧册';
      borrow.text=s=>[
        `成年礼前夜，三皇子又来还一本顾明宜批过的旧册。按规矩应该交给裴景和，他却在回廊遇见${zTitle(s)}，便自己抱着册子停下来。`,
        `“娘娘。”他仍按后宫位分行礼，“母后若在，会让我做什么？”`,
        `${zTitle(s)}看了一眼他怀里的册子：“殿下问的是哪件事？”`,
        `“什么都不是。”他笑了一下，笑意很快又没了，“母后大概会让我按规矩来。”`,
        `他低头摸过书脊。那本册子边角已经被翻得发白。`,
        `“可规矩之外呢？”他问，“母后有没有想过，让我做一回自己？”`,
        `${zTitle(s)}没有接这句话。她往后退半步：“三殿下，夜深了。册子交裴总管即可，臣妾告退。”`,
        `三皇子没有拦。等她已经走出几步，他才低声道：“娘娘记得母后说的每个字。连母后自己都忘了的，你也记得。”`,
        `${zTitle(s)}脚步没有停。`,
        `她听懂的不是求爱。那句话真正问的是：若母后不在了，还有没有一个人能证明，母后曾经记得我。正因为听懂，她才必须退。`
      ];
      borrow.choices=[{label:'继续',effects:{flags:{v57PrinceProjectionCrossesLine:true}},result:''}];
    }
    const report=ST(growth,'她把这件事告诉御前');
    if(report){
      report.heading='第四幕 · 她把“接住他”的位置还给御前';
      report.text=s=>[
        `第二日起，${zTitle(s)}不再单独经手三皇子的旧册。所有借阅仍可照例，只改由尚宫局与裴景和转手。`,
        `她把过去一年借过什么、何日归还、自己批过哪几行，重新按日期排了一遍。不是罪证，只是一份能说明事情怎样走到这里的记录。`,
        `傍晚，她请见御前。`,
        `“陛下，臣妾呈一份记录。”`,
        `我翻了几页：“这些借阅都在规矩之内。”`,
        `“是。”`,
        `“那你担心什么？”`,
        `${zTitle(s)}停了一息：“臣妾以为，殿下借的不是书。”`,
        `“是什么？”`,
        `“是母后。”`,
        `她没有说三皇子喜欢谁，也没有替他定一个难看的心思。她只把那句成年礼前夜的话原样复述。`,
        `“臣妾记得皇后娘娘改过的字，殿下便慢慢把臣妾当成了能替娘娘继续回答的人。”`,
        `她抬头：“臣妾是记录的人，不是接住殿下的人。这个位置，臣妾不能占，也不该占。”`,
        `我问：“谁该接？”`,
        `“陛下。”`,
        `这一句说得很直。她说完便低下头，没有再替我找台阶。`
      ];
      report.choices=[{label:'把记录留下，今夜只叫三皇子来',hint:'不传宗人府，不拿他的丧母之痛做罪名；先做父亲',effects:{trust:{zhangyuanzhao:6},flags:{v57PrinceBoundary:'father'}},result:'册子留在御案。没有一道惩处旨意出养心殿。'}];
    }
    const father=ST(growth,'东所封门');
    if(father){
      father.heading='同夜 · 我第一次没有先问他犯了哪条规矩';
      father.text=s=>[
        `我没有让宗人府来，也没有叫掌笔内侍先候在门外。三皇子进养心殿时，还不知道${zTitle(s)}来过。`,
        `我先问：“你借的那些册子，看完了？”`,
        `“看完了。”`,
        `“查出什么？”`,
        `他沉默片刻：“母后最后改过一个‘误’字。原来写的是‘错’。”`,
        `我看着他。那件事我也记得，只是直到他说出来，才想起顾明宜病中为什么偏要改那个字。`,
        `“你母后一辈子最怕‘错’。”我说，“她总想先找到一条旧例，免得自己落错一笔。到最后才慢慢知道，‘误’和‘错’不是一回事。”`,
        `三皇子抬起头。`,
        `“你借册子，不全是在查她。”`,
        `他没有答。`,
        `“你想问的是，她有没有后悔生你这个总让她担心的儿子。”`,
        `他的眼圈一下红了，仍强撑着没有低头。`,
        `“她没有。”`,
        `我说得很慢。不是因为这句话需要想，而是这些年我竟从没对他说过。`,
        `“她只是怕。怕你学她，一辈子不敢自己拿主意。”`,
        `我走到窗边，又停住：“朕也怕。朕怕你学朕——什么事都先拆成最省事的一步，拆到最后，连自己儿子缺了什么都看不见。”`,
        `他终于跪下：“父皇——”`,
        `“起来。”我说，“你母后最不喜欢人跪着说心里的话。”`,
        `他起身时抬袖擦了一下眼睛。这个动作很快，像小时候摔疼了还怕别人看见。那一刻他不像现存长子，也不像将来可能被朝臣衡量的皇子，只是顾明宜留下的孩子。`
      ];
      father.choices=[{label:'让他坐下，把那本册子从第一页说起',effects:{trust:{zhangyuanzhao:2},flags:{v57FatherSeesPrince:true}},result:'这一夜没有训诫书，也没有宗人府笔录。父子二人把一册旧名册从头翻到尾。'}];
    }
    const record=ST(growth,'门关上以后还留不留字');
    if(record){
      record.heading='子时 · 留痕，但不把他的求救做成罪档';
      record.text=s=>[
        `${zTitle(s)}呈来的往来册仍在御案。它需要留下——不是为了哪天拿来压三皇子，也不是为了替继后候选添一笔“守节有功”。`,
        `我在封皮上只写：“借阅往来，止于此日。此后内廷旧册仍循尚宫局转手。”`,
        `没有写“私情”，没有写“觊觎”，也没有把一个刚丧母两年的孩子钉成另一种人。`,
        `第二日，三皇子自己去向${zTitle(s)}行了一礼。她照礼受下。`,
        `“往后册子仍能借么？”他问。`,
        `“能。”`,
        `“还是裴总管转？”`,
        `“是。”`,
        `“好。”`,
        `他没有再问别的。`,
        `有些边界写清楚以后，并不会把人推远。它只是让两边都知道，门在哪里。`
      ];
      record.choices=[{label:'封存往来册，不作罪档',effects:{trust:{zhangyuanzhao:4},flags:{v57PrinceRecord:'boundary_only'}},result:'册子进御前档，只记他当夜已经明确说过什么。以后议储、议后，不拿这次求助当证据。'}];
    }
    if(!growth.steps.some(x=>(x.heading||'').includes('他开始自己记得母后'))){
      const at=IX(growth,'门关上以后还留不留字');
      const ep={heading:'五月末 · 他开始自己记得母后',cast:['emperor'],fx:'ink',narrative:true,text:s=>[
        `几日后，三皇子自己来养心殿，手里抱着一册空白纸。`,
        `“父皇，儿子想把母后改过的那本名册誊一遍。”`,
        `“为什么？”`,
        `“想看看她到底改过哪些字。”`,
        `我问：“还要找${zTitle(s)}替你解释？”`,
        `他摇头。`,
        `“不找了。看不懂的，儿子先自己想。”`,
        `他把第一页铺平，第一处就是那个“误”字。誊到那里时，他停了很久，最后连顾明宜原先划掉的“错”也照样抄在旁边。`,
        `从那以后，他没有再去找一个“记得母后的人”。他开始自己记。`
      ],choices:[{label:'继续',effects:{flags:{v57PrinceCopiesGuLedger:true}},result:''}]};
      if(at>=0)growth.steps.splice(at+1,0,ep);else growth.steps.push(ep);
    }
  }

  // D. v56 承熙十二年的共夜降成纯共事，不提前消费“唯一一次”暧昧。
  const night=CH('长夜未央');
  const oldNight=night?ST(night,'一场没人真正侍寝的侍寝'):null;
  if(oldNight){
    oldNight.heading='八月夜 · 西暖阁只剩两份没核完的册子';
    oldNight.narrative=true;
    oldNight.text=s=>[
      `那晚两份疫后册子互相对不上：永和宫记的病愈人数比景阳宫少一人。我让和妃与${zTitle(s)}一并到西暖阁，把差的一名找出来。`,
      `核到三更，我喝了两杯酒，倦意先上来，靠着椅背闭了片刻。`,
      `两个人没有停。沈知微按名字回忆那名宫女原来在哪处当差，${zTitle(s)}则把复值日期一页页往前推。最后发现不是人少了，是一人改过姓名，两个册子各记一名。`,
      `裴景和叫醒我时，案上的错已经圈出来。`,
      `“怎么找到的？”`,
      `${zTitle(s)}道：“和妃娘娘记得人，臣妾只记得日期。”`,
      `沈知微接了一句：“少把‘只’字用在自己身上。”`,
      `两人各自拿回自己的册子。那夜没有谁留宿，也没有谁需要替另一人解释为什么留下。`
    ];
    oldNight.choices=[{label:'让她们回宫',effects:{trust:{shen:1,zhangyuanzhao:1},flags:{v57EarlierNightOnlyWork:true}},result:''}];
  }

  // E. 立后前夜：太后最后逼落笔；皇帝召的是说话的人。随后切进张元照的“灯下别录”。
  const vacancy=CH('中宫空悬');
  if(vacancy&&!vacancy.steps.some(x=>(x.heading||'').includes('太后把最后一句话留在御案'))){
    const at=IX(vacancy,'凤印前最后一道旨');
    const pre={heading:'承熙十四年春 · 太后把最后一句话留在御案',cast:['taihou','emperor'],fx:'candle',narrative:true,text:s=>[
      `立后前一夜，太后来养心殿时没有带侍从。两份拟册已经在御案上摊了一整日，我仍一个字没写。`,
      `她没有再替邵明贞说好话，也没有问张元照来处。只看了一眼那两份纸：“凤印不能无限空置。”`,
      `“朕知道。”`,
      `“你每回说知道，后面都还有一句‘再议’。”`,
      `我没有反驳。`,
      `太后起身前把手炉放在案角：“哀家今晚不问你选谁。明日太阳出来以前，别再让别人替你等。”`,
      `门合上以后，屋里忽然安静得过分。朱批写到一半，笔搁在砚边，墨慢慢干住。`,
      `我四十余岁，第一次觉得不是哪一宫太吵，而是整座养心殿没有一个人说话。`,
      `裴景和第三次进来续茶时，我闭着眼说：“朕今夜不想一个人。”`,
      `“陛下要召——”`,
      `“和妃。还有${zTitle(s)}。”`,
      `我睁开眼：“想听人说说话。她们两个，是这宫里最不会说谎的人。”`,
      `裴景和看了一眼案上那两份拟册，没有问为什么。只应了一声，退了出去。`
    ],choices:[{label:'传她们来，只说话',effects:{flags:{v57DrunkSummonsBegins:true}},result:'两道口信一前一后出了养心殿。传的不是绿头牌，也没有叫敬事房记侍寝。'}]};
    const privateNight={heading:'同夜 · 他睡着以后',cast:['shen','zhangyuanzhao'],fx:'lantern',narrative:true,text:s=>[
      `【灯下别录】`,
      `我到御前时，和妃娘娘已经在了。她坐在下首，手里捧着一盏茶，没有喝，只是暖着手。`,
      `陛下摆了摆手：“坐。今夜没有规矩。”`,
      `他是真的醉了。先问我疫年的册子还留不留，又问和妃娘娘旧案合卷以后夜里睡不睡得着。问题之间没有什么关系，像一个人把多年没问出口的话随手从抽屉里往外拿。`,
      `答到第三句，他声音慢慢低下去，头偏在椅背上。裴总管上前看了一眼，轻声道：“睡着了。”`,
      `殿里只剩烛芯轻轻爆了一声。`,
      `我看着陛下。睡着以后，他眉间那道纹还没有松开。我忽然想起这些年自己记过无数个时辰：哪一宫何时关门，哪一人何时发热，哪一条路何时断过。原来这个人也有一个没人记的时辰。`,
      `有人在看我。`,
      `我抬头。和妃娘娘没有移开目光。`,
      `平日我们之间总隔着东西——茶盏、名册、病籍、另一个正在说话的人。今夜那些东西都在案上，陛下却睡着了。`,
      `“娘娘……”`,
      `“嗯。”`,
      `她把茶放下，走到我面前。墙上的两道影子因为她走近，慢慢叠到一处。`,
      `“方才陛下问我，旧案合卷以后睡不睡得着。”她说，“我没答。”`,
      `我仰头：“娘娘睡得着么？”`,
      `她没有立刻答。手抬起来，在半空停了一息。`,
      `我应该后退。这个判断很清楚，甚至不需要写进任何册子。可我没有动。`,
      `她的指尖最后只碰到我鬓边，把一缕不知什么时候散下来的头发拢到耳后。很轻。`,
      `我记得承熙十一年九月第一名发热宫女报病是在卯正，记得凤仪宫最后一页哪一行少了一个字，记得三皇子借过每一本旧册的归还日。`,
      `可那一刻，我忽然记不住自己的心跳到底快了几下。`,
      `“臣妾想了一夜，要怎么答。”和妃娘娘声音很低，“后来觉得，不如答实话。”`,
      `她离我只有半臂。我闻到她袖口的新茶气。`,
      `“旧案合卷那天，我一个人坐了很久。后来第一件想做的事，不是再翻一遍案卷。”`,
      `她停下来。`,
      `“是想叫一个人来看看。”`,
      `我的呼吸停了一拍。`,
      `她像要再说什么。那个称谓已经到了唇边——`,
      `“……水。”`,
      `陛下在榻上翻了个身，含糊地说了一句。`,
      `我们像同时被烛火烫了一下，各自退开。和妃娘娘回到原来的椅子，我低头看自己的袖口。系带松了一截。`,
      `我不知道是什么时候松的。`,
      `这件事最不应该发生在我身上。可我没有去回想。`,
      `过了很久，我问：“陛下醒了，会问起么？”`,
      `“不会。”她已经恢复平日语气，“他睡着的时候，什么都不记得。”`,
      `天快亮时，我重新摊开一册根本没有必要再看的名册。和妃娘娘重新捧起已经凉透的茶。`,
      `陛下醒来，按了按额角：“昨夜……朕睡着了。”`,
      `我们同时起身：“陛下安寝。”`,
      `他看了我们一会儿，像觉得哪里不对，最后只低头看见那本批到一半的折子。`,
      `朱笔重新蘸墨。那半句话被他补完。`,
      `我们一前一后出了殿门。起居注只会记：和妃、${zTitle(s)}奉召入御前，至卯初退。`,
      `至于他睡着以后那段时辰，我没有补进任何册子。`
    ],choices:[{label:'天亮',effects:{trust:{shen:5,zhangyuanzhao:5},flags:{v57OnlyUnseenNight:true}},result:'殿门打开时，两个人仍隔着合乎礼数的一步。没人看得出那一夜有什么不同。'}]};
    if(at>=0)vacancy.steps.splice(at,0,pre,privateNight);else vacancy.steps.push(pre,privateNight);
  }

  // F. 最后一笔之前，主控只留一个很短的“不知道”，不替读者解释那一夜。
  if(vacancy){
    const final=ST(vacancy,'凤印前最后一道旨');
    if(final&&!final.v57UnseenEcho){
      const old=final.text;
      final.text=s=>[
        ...A(old,s),
        s.flags?.v57OnlyUnseenNight?`昨夜和妃与${zTitle(s)}离开时，我确实觉得哪里不同。想了一会儿，什么也没想起来。我没有叫裴景和去问。`:'',
        `我把那一点不知道留在那里，伸手拿起朱笔。`
      ].filter(Boolean);
      final.v57UnseenEcho=true;
    }
  }

  // G. 顺王回声再落一笔：恩情、丧母与依赖都不能替别人开门。
  if(growth&&!growth.steps.some(x=>(x.heading||'').includes('门闩不一定长在门上'))){
    const at=IX(growth,'他开始自己记得母后');
    const echo={heading:'同月 · 门闩不一定长在门上',cast:['shen','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
      `事情过去以后，沈知微在永和宫看见${zTitle(s)}把三皇子借阅册重新装订。`,
      `“都结束了？”`,
      `“借阅没结束。只是以后不过臣妾自己的手。”`,
      `沈知微点头。过了一会儿才道：“顺王当年总觉得，记得一个人怕什么、喜欢什么，就有资格替她把门关好。”`,
      `${zTitle(s)}把线穿过最后一个孔：“三殿下不是王爷。”`,
      `“我知道。”`,
      `“所以才要现在说清。”`,
      `沈知微看着她把线头剪断：“门闩不一定长在门上。”`,
      `${zTitle(s)}抬眼。`,
      `“有时是恩。有时是需要。”`,
      `她们都没有再提顺王。装订好的册子被送回尚宫局，封皮上只多了一行新的转手规矩。`
    ],choices:[{label:'继续',effects:{trust:{shen:2,zhangyuanzhao:2},flags:{v57ShunwangBoundaryEcho:true}},result:''}]};
    if(at>=0)growth.steps.splice(at+1,0,echo);else growth.steps.push(echo);
  }

  // H. 去掉少数明显“作者在场”的句子，保留内容，让场景自己落下。
  if(growth){
    const d=ST(growth,'六个字压在旧档最后');
    if(d&&!d.v57NoMeta){
      const old=d.text;d.text=s=>A(old,s).map(x=>String(x).replace('从那以后，黛拉在人前反而笑得更响了一阵。只有读者知道，那笑里多了一点故意：她像是在和一份已经合上的档案赌气。','从那以后，黛拉在人前反而笑得更响。笑完回承露馆，她会把那册旧档压到最底下，不再翻。')).filter(Boolean);d.v57NoMeta=true;
    }
  }
  if(vacancy){
    const k=ST(vacancy,'珂兰密信只有一句话最难译');
    if(k&&!k.v57NoMeta){
      const old=k.text;k.text=s=>A(old,s).map(x=>String(x).replace('这句话不像后宫争宠，也不像外交请命。它只是一个曾经被当作筹码的人，要求自己的筹码说明书别写错。','她说完把密信推回御案，手指仍压着那一个珂兰词，没有再替任何一种译法作证。')).filter(Boolean);k.v57NoMeta=true;
    }
  }

  // I. 人物录不剧透关系，只继续把元照现代感落在说话习惯与边界上。
  if(PEOPLE.zhangyuanzhao){
    PEOPLE.zhangyuanzhao.bio=state.flags?.zhangRevealed
      ?'她来自遥远后世，前世做疫病调查。遇到乱局时，她会下意识问“谁、什么时候、经过哪一步”，偶尔脱口而出“工作、备份、同事”再自己改口。她习惯留下可交接的痕迹，也坚持恩情、依赖与服从从来不是一回事。'
      :'从顺王府走进宫中的张元照，说话有一种不太像宫里人的直线感：先拆问题，再找会失效的那一环。她很少用漂亮话圆场，也拒绝让“为你好”成为别人替她决定的理由。';
  }

  // J0. 时间顺序校准：不删事件，只把旧补丁造成的月份倒序归位。
  if(night){
    night.date='承熙十二年·六月至十三年正月';
    const guard=ST(night,'守制结束以后');if(guard)guard.heading='六月初 · 守制结束以后，酒先回到案上';
    const three=ST(night,'三份折子都写了“照旧”');if(three)three.heading='六月 · 三份折子都写了“照旧”';
    const shen=ST(night,'永和宫不替我把三件事说成一样');if(shen)shen.heading='六月末 · 永和宫不替我把三件事说成一样';
    const tai=ST(night,'太后问我今年到底睡过几个整夜');if(tai)tai.heading='七月 · 太后问我今年到底睡过几个整夜';
    const reject=ST(night,'第一次有人把传召退回来');if(reject){reject.heading='七月中旬 · 第一次有人把传召退回来';const o=reject.text;reject.text=s=>A(o,s).map(x=>String(x).replace('顾明宜死后的第一个春天，','承熙十二年七月，'));}
    const work=ST(night,'西暖阁只剩两份没核完的册子');if(work)work.heading='八月夜 · 西暖阁只剩两份没核完的册子';
    const young=ST(night,'夜宴里的人越来越年轻');if(young)young.heading='十月 · 夜宴里的人越来越年轻';
    const fast=ST(night,'四个月很快过去');if(fast){fast.heading='十月末 · 四个月很快过去';const o=fast.text;fast.text=s=>A(o,s).map(x=>String(x).replace('到了夏天，身边的人才慢慢意识到','到了十月，身边的人才慢慢意识到'));}
    const order=[guard,three,shen,tai,reject,work,ST(night,'裴景和第一次把两把钥匙记反'),ST(night,'珍妃把半份折子推回御案'),ST(night,'凤印为什么忽然不能再空太久'),young,fast,ST(night,'凤印在库里过了第二个冬天')].filter(Boolean);
    const used=new Set(order);night.steps=[...order,...night.steps.filter(x=>!used.has(x))];
  }
  if(vacancy){
    const afterSeal=ST(vacancy,'凤印落在谁手里以后');
    if(afterSeal)afterSeal.heading='承熙十四年春 · 凤印落在谁手里以后';
  }

  // J. 当前存档按章节标题复位，避免新增步骤改变用户所在章。
  if(V57_CURRENT_TITLE){const ni=CHAPTERS.findIndex(x=>x.title===V57_CURRENT_TITLE);if(ni>=0)state.index=ni;}
  state.flags=state.flags||{};state.flags.v57Build=true;
  globalThis.V57_QA={
    duplicateTitles:CHAPTERS.map(x=>x.title).filter((x,i,a)=>a.indexOf(x)!==i),
    unseenNightCount:CHAPTERS.flatMap(x=>x.steps||[]).filter(x=>(x.heading||'').includes('他睡着以后')).length,
    oldIntimateCount:CHAPTERS.flatMap(x=>x.steps||[]).filter(x=>(x.heading||'').includes('没人真正侍寝')).length,
    princeSeed:!!ST(CH('凤仪宫最后一冬'),'榻边那个“误”字'),
    princeFather:!!ST(CH('长枝渐高'),'第一次没有先问他犯了哪条规矩'),
    princeCopy:!!ST(CH('长枝渐高'),'他开始自己记得母后'),
    vacancyIndex:CHAPTERS.findIndex(x=>x.title==='中宫空悬')
  };
  if(globalThis.V57_QA.duplicateTitles.length)console.warn('v57 duplicate chapter titles',globalThis.V57_QA.duplicateTitles);
  if(globalThis.V57_QA.unseenNightCount!==1)console.warn('v57 unseen night count',globalThis.V57_QA.unseenNightCount);
  try{save()}catch(_e){}
  try{render()}catch(_e){}
}catch(e){console.error('v57 fatherhood/unseen-night patch failed',e)}})();
