(()=>{try{
  document.documentElement.dataset.build='v94';
  document.title='宫灯未眠 · 元照首批入宫与过渡重构 v94';
  const C=t=>(CHAPTERS||[]).find(x=>x?.title===t);
  const S=(ch,q)=>(ch?.steps||[]).find(x=>String(x?.heading||'').includes(q));
  const arr=(x,s)=>{try{const v=typeof x==='function'?x(s):x;return Array.isArray(v)?v:[v]}catch(_){return[]}};
  const wrap=(st,fn)=>{if(!st||!st.text||st.__v94wrap)return;const old=st.text;st.text=s=>fn(arr(old,s),s);st.__v94wrap=true};
  const z='zhangyuanzhao';

  // ---- 1. 张元照改为承熙三年第一次大选同批入宫：不单开终选页，不参与低位孕事抽取。 ----
  const first=C('御前终选');
  if(first){
    const fi=CHAPTERS.indexOf(first);
    if(PEOPLE?.[z]){
      PEOPLE[z].introducedAt=fi;
      PEOPLE[z].home='景阳宫东配殿';
      PEOPLE[z].tags=['承熙三年入宫','低位旧人','善记人名'];
      PEOPLE[z].bio='承熙三年第一次大选入宫。初封低位，家世与应答都不算最显眼；她长期住在景阳宫东配殿，没有子嗣，前几年承宠也不多。宫人更早记住的是她爱开半扇窗、私人物件分得清、纸边常画小方格。';
    }
    if(typeof HAREM_KEYS!=='undefined'&&!HAREM_KEYS.includes(z))HAREM_KEYS.push(z);
    first.cast=Array.from(new Set([...(first.cast||[]),z]));

    const q=S(first,'我亲自问最后一题');
    if(q){
      wrap(q,(a,s)=>{
        // 不把张元照做成第四张重点人物卡，只让她真实存在于同一批秀女里。
        const insert=`体元殿里不只有前三张家谱。后排还站着一列普通候选，衣料、首饰都按储秀宫规制来。张元照在靠门的位置，礼官唱到她名字时，她照常上前、答话、退回原位。我当日没有再单独问她第二题。`;
        const pos=Math.max(0,a.length-1);a.splice(pos,0,insert);return a;
      });
    }

    const low=S(first,'偏殿六张脸')||S(first,'偏殿还有六个人');
    if(low){
      wrap(low,(a,s)=>[
        `三张高位册页定下以后，偏殿还有六名低位候选。她们的家世不足以单独牵动朝局，却各有各的脾气。`,
        ...a.filter(x=>String(x).includes('v78-low-grid')||String(x).includes('v78-count')),
        `张元照不在这六张可增减的名额里。她已经随同一批名帖留牌，按普通低位初封，不赐单字封号。这里要点的，是余下六个人里还留下谁。`
      ]);
    }

    const decree=S(first,'册书送出体元殿');
    if(decree){
      wrap(decree,(a,s)=>{
        const line=`张元照的册页夹在低位册书中，只写“答应”二字，没有单字封号。宣旨时她与其余新人一同跪下，起身以后跟着领路嬷嬷往西六宫去。`;
        if(!a.some(x=>String(x).includes('张元照的册页夹在低位册书中')))a.splice(Math.max(1,a.length-1),0,line);
        return a;
      });
      const c=decree.choices?.[0];
      if(c){
        c.effects=c.effects||{};c.effects.ranks={...(c.effects.ranks||{}),[z]:'答应'};
        c.effects.flags={...(c.effects.flags||{}),v94ZhangFirstSelection:true,v44ZhangEntered:true,zhangNoPregnancy:true};
      }
    }
  }

  // 旧存档只要已经跨过第一次大选，就确保张氏已经在宫中；不覆盖后来真实晋封。
  const firstIdx=Math.max(0,(CHAPTERS||[]).findIndex(x=>x?.title==='御前终选'));
  if((state.index||0)>firstIdx){
    state.ranks=state.ranks||{};state.flags=state.flags||{};
    if(!state.ranks[z]||/待选|待封/.test(String(state.ranks[z])))state.ranks[z]='答应';
    state.flags.v94ZhangFirstSelection=true;state.flags.v44ZhangEntered=true;state.flags.zhangNoPregnancy=true;
  }
  if(state.flags){
    delete state.flags.zhangPregnant;delete state.flags.zhangPregnancy;delete state.flags.zhangHasPregnancy;
  }

  // 年龄基准随入宫时间改为承熙三年十八岁；v85 的旧 getter 可配置，最终层重写。
  if(PEOPLE?.[z]){
    try{Object.defineProperty(PEOPLE[z],'age',{configurable:true,enumerable:true,get(){const y=typeof storyYearV85==='function'?storyYearV85(state):(typeof yearNow==='function'?yearNow(state):3);return `${18+Math.max(0,Number(y||3)-3)}岁`},set(_v){}})}catch(_e){}
  }

  // ---- 2. 王府旧笼不再承担“第二次采选前特别登场”，而是七年后由旧箱把前史带回来。 ----
  const wang=C('王府旧笼');
  if(wang){
    wang.date='承熙十年·冬';
    wang.theme='一只旧木箱送进景阳宫，才让一段已经过去多年的日子重新有了声音';
    wang.place='养心殿 / 景阳宫 / 永和宫';
    wang.cast=['shunwang','zhangyuanzhao','shen'];
    wang.bridge=s=>`承熙十年冬，顺王府清旧库，送进宫一只写着“张氏旧物”的木箱。张元照已经在宫中七年，仍住景阳宫东配殿，位分不高，也没有孩子。若不是那把磨圆了齿的铜钥匙重新落到御案上，我几乎不会把她与顺王府联系在一起。`;
    wang.steps=[
      {heading:'一只七年没有开过的旧箱',cast:['emperor','zhangyuanzhao'],fx:'snow',narrative:true,text:s=>[
        `箱子不大，锁已经换过，旧钥匙却用红线拴在提手上。顺王府长史只附了一句：“张氏旧物，今归本人。”`,
        `我让裴景和先问景阳宫。张元照来得很快，看见钥匙以后没有立刻碰。`,
        `“你的？”`,
        `“臣妾十七岁以前，东偏院那间屋的钥匙。”`,
        `她把钥匙拿起来试着转了一下。铜齿已经磨圆，打不开眼前的新锁。`,
        `“箱里有什么？”`,
        `“大概是旧衣、旧纸。臣妾走的时候没能带出来。”`
      ],choices:[{label:'让她自己开箱',effects:{trust:{zhangyuanzhao:1},flags:{v94OldBoxOpened:true}},result:''}]},
      {heading:'九岁以后，她一直住在顺王府',cast:['zhangyuanzhao','shunwang'],fx:'candle',narrative:true,text:s=>[
        `箱底压着几本旧账和一件已经穿不下的青布夹袄。张元照把账册翻到自己的字迹，才慢慢说起那九年。`,
        `她九岁寄居王府。最初几年，顺王待她确实不坏：给她书房，让她读旧札，也让她替府里誊账。她十四岁时从两份雪灾文书里看出相差三日，顺王从此更爱把档案丢给她看。`,
        `到了十六七岁，族里替她议过几门亲。第一家顺王说门第不好，第二家说人品不好，第三张帖子她根本没有见到。`,
        `她第一次说想回张氏族宅，顺王问：“本王养你这些年，你回去做什么？”`,
        `她答：“过自己的日子。”`,
        `第二天，东偏院门口多了两个内侍。`
      ],choices:[{label:'继续',effects:{flags:{v94WangPastTold:true}},result:''}]},
      {heading:'那张没有带出王府的路引',cast:['zhangyuanzhao','shunwang'],fx:'rain',narrative:true,text:s=>[
        `两人闹翻是在承熙二年冬。张氏族叔替她办了一张路引，她把衣裳装进箱底，想从二门出去。`,
        `内侍把箱子一件件翻开，路引从夹层里找出来，送到顺王手上。`,
        `顺王没有打她。他只是把纸折成四折，放进火盆。`,
        `“你年纪小，不知道外面是什么样。”`,
        `张元照站在廊下：“王爷知道，也不是臣女知道。”`,
        `顺王的右手食指在桌沿敲了一下：“我是为你好。”`,
        `第二年春礼部登记大选，顺王没有替她把名字划掉。张元照也没有去求他。她照着礼部的名册进了储秀宫，最后只得一个答应。`
      ],choices:[{label:'继续',effects:{trust:{shunwang:-1,zhangyuanzhao:2},flags:{v94RoadPassBurned:true}},result:''}]},
      {heading:'永和宫里，那句话并不陌生',cast:['zhangyuanzhao','shen'],fx:'candle',narrative:true,text:s=>[
        `张元照从养心殿出来，没有立刻把旧箱搬回景阳宫。她先去了永和宫。`,
        `沈知微看见那把钥匙，只问：“王府送来的？”`,
        `“嗯。”`,
        `张元照把钥匙放在茶盘边：“王爷以前是不是也常同娘娘说‘我是为你好’？”`,
        `沈知微合上茶盖：“说过。”`,
        `“他还说臣妾有些地方像娘娘年轻时。”`,
        `沈知微抬眼看她：“像不像我，都不是锁门的理由。”`,
        `张元照坐了一会儿，把钥匙重新收进袖中。新茶凉了半盏，两个人谁也没有再提顺王。`
      ],choices:[{label:'带旧箱回景阳宫',effects:{trust:{shen:2,zhangyuanzhao:2},flags:{v94WangThreadReframed:true}},result:''}]}
    ];
  }

  // ---- 3. 第二次采选和顺贵人之死拆开：隔了八年，本就是礼部按例再办的一届。 ----
  const second=C('空宫点灯');
  if(second){
    second.date='承熙十一年·正月至五月';
    second.theme='隔了八年，储秀宫重新开门；旧人照旧生活，新人从这一春开始认路';
    second.bridge=s=>`承熙十年腊月，听雨轩封了门。年节仍照旧过：除夕挂灯，正月朝贺，太医院与内务府各自把旧账往后结。二月末，礼部送来采选奏折——自承熙三年第一次大选以后已经八年，宗室勋贵适龄女子依例重新登记。顾明宜把折子送到御案，只问了一句：“今年一定要办？”礼部的回话也很短：“按例该办。”三月，储秀宫重新开门。`;
    second.cast=Array.from(new Set((second.cast||[]).filter(k=>k!==z)));
    // 删除旧版本给张元照单独设置的“最后一张名帖”。
    second.steps=(second.steps||[]).filter(st=>{
      const h=String(st?.heading||'');
      if(h.includes('体元殿最后一页')||h.includes('最后一张名帖')){
        const sample=arr(st.text,state).join('');
        if(sample.includes('张元照')||sample.includes('末页'))return false;
      }
      return true;
    });
    const petition=S(second,'礼部的奏折');
    if(petition){
      petition.text=s=>[
        `二月末，礼部把采选奏折送到养心殿。上一次正式大选还是承熙三年。`,
        `这八年里有人晋位，有人生子，也有人死去；可礼部这一回只按年岁、籍贯和家世重新造册。`,
        `顾明宜把候选总数看完，咳了一声：“十二人太多。”`,
        `我问：“你想留多少？”`,
        `“先让她们进终选。见过人再减。”`,
        `奏折第二日发回礼部。储秀宫开始晒被褥、修窗闩，三月初第一批秀女进宫。`
      ];
    }
    const lights=S(second,'储秀宫先亮灯');
    if(lights){
      lights.text=s=>[
        `三月初，储秀宫重新点灯。先进去的是扫灰的宫人、送被褥的内务府小吏和检查窗闩的老嬷嬷。`,
        `顾明宜拿到第一版名册，先问住处够不够、教习几人、病了往哪里送。`,
        `邵明贞替她把一摞住处册搬到窗下。张元照那日也在凤仪宫送旧账，经过时只看了一眼新名册，没有凑过去。`,
        `八年前她自己的名字也这样写在一张纸上。如今储秀宫里换了一批人。`
      ];
    }
    // 第二次采选只剩梁、宋、许三名新妃；张元照可以作为旧人旁观，但不能再被称作新人或候选。
    for(const st of second.steps||[]){
      wrap(st,(a,s)=>a.map(x=>String(x)
        .replaceAll('张元照、梁素贞、宋文秀、许淑惠','梁素贞、宋文秀、许淑惠')
        .replaceAll('张元照、梁氏、宋氏、许氏','梁氏、宋氏、许氏')
        .replaceAll('四人留牌','三人留牌')
        .replaceAll('四个新人','三个新人')
        .replaceAll('第二批四人','第二批三人')
      ));
    }
    const greet=S(second,'新人第一次请安');
    if(greet){
      greet.text=s=>[
        `新人第一次合宫请安，梁素贞、宋文秀、许淑惠依次行礼。`,
        `顾明宜在正座上坐得很直。离得近的人才能看出，她每次咳嗽前都会先用指尖压住袖口。`,
        `霍素英看见梁素贞，只点了一下头。崔静仪问宋文秀江南今年雨水多不多。许淑惠起身时慢了半拍，自己先红了耳朵。`,
        `张元照坐在旧人的后排，手里替皇后压着一页住处册。散席时许淑惠差点走错廊门，她才抬手指了一下：“那边。”`,
        `许淑惠小声道谢。张元照把册页翻过去，没有再说。`
      ];
    }
  }

  // ---- 4. 《窗开半扇》改为“旧人被新人重新看见”，不再写张元照刚入宫。 ----
  const win=C('窗开半扇');
  if(win){
    win.date='承熙十一年·五月至六月';
    win.theme='三个新人刚住下来，景阳宫那个住了八年的旧人也第一次被她们认真看见';
    win.bridge=s=>`梁素贞、宋文秀、许淑惠分宫以后，日子先慢了下来。张元照已经在景阳宫住了八年：东配殿的窗常开半扇，自己的杯盏从不混用，纸边总有一排小方格。旧宫人早已见怪不怪，新来的三个人却会停下来多看一眼。`;
    // 最明显的新入宫措辞改为多年旧习。
    const w1=S(win,'景阳宫的窗先开了一条缝')||S(win,'新主子进宫第一件事');
    if(w1)w1.text=s=>[
      `景阳宫东配殿的窗开了很多年。冬天只留一道缝，春夏便推开半扇。`,
      `张元照刚入宫时，掌事嬷嬷嫌风大，关过几回。后来发现她夜里睡得更稳，也不影响旁人，便懒得再管。`,
      `承熙十一年五月，许淑惠第一次来还一本礼册，站在门口问：“娘娘不怕夜风？”`,
      `张元照正在把两只茶盏分开：“怕冷的时候就关。”`,
      `“那为什么总开着？”`,
      `“因为现在不冷。”`,
      `许淑惠想了想，竟找不到下一句，只好先把礼册递过去。`
    ];
    const sup=S(win,'四个新人第一次凑在一张小桌吃夜膳')||S(win,'五月初八');
    if(sup){
      sup.heading='五月初八 · 三个新人把夜膳送错到景阳宫';
      sup.cast=['zhangyuanzhao','liang2','song2','xu2'];
      sup.text=s=>[
        `入宫第八日，尚膳局把梁、宋、许三人的夜膳错送到景阳宫。等宫人发现时菜已经摆开，张元照索性让她们留下吃。`,
        `她在公盘旁边多放了一双筷子。梁素贞看了一眼：“娘娘怕我们抢？”`,
        `“不是。夹菜的和入口的分开。”`,
        `宋文秀已经去看食盒底的小签：“三盒从两个膳房来，为什么最后都绕到这里？”`,
        `许淑惠最紧张。她进门差点又把礼行重，硬生生停在半路，自己先笑：“臣妾现在一见宫里旧人，膝盖就比脑子快。”`,
        `梁素贞道：“那今晚放心，张娘娘又不吃人。”`,
        `张元照把汤往她那边推：“汤快凉了。”`,
        `四个人便低头吃饭。窗外风把竹帘吹起来一次，又落回去。`
      ];
    }
    const wangmem=S(win,'宫道尽头，两种记法')||S(win,'王静娴说，她偏不爱写');
    if(wangmem){
      wangmem.text=s=>[
        `王静娴与张元照是同一年入宫的。八年下来，一个习惯先看人的手，一个习惯把时辰写在纸上，两个人谁也没把谁说服。`,
        `那日王静娴看见她又在纸边画格子，问：“你真不怕哪天这纸让人拿走？”`,
        `“怕。”`,
        `“那还写？”`,
        `“所以不该写的就不写。”`,
        `王静娴笑了一声：“你这答案跟八年前一样。”`,
        `张元照头也没抬：“你问的问题也没换。”`,
        `两个人在宫道口分开。王静娴仍记人，张元照仍记纸。`
      ];
    }
  }

  const summer=C('荷风满座');
  if(summer){
    summer.bridge=s=>`六月以后，第二批新人已经认得回宫的路。旧妃也记住了她们的脚步声。张元照在景阳宫住了八年，原本只是六宫里一个不太显眼的旧人；这一年她与新人的往来多起来，养心殿也开始更频繁地听见她的名字。`;
  }

  // ---- 5. 承熙三年至六年补两处极轻的张氏存在感：不怀孕、不抢戏。 ----
  const years=C('宫灯渐繁');
  if(years){
    years.cast=Array.from(new Set([...(years.cast||[]),z]));
    if(!years.steps.some(st=>String(st.heading||'').includes('景阳宫东配殿'))){
      let at=Math.min(3,years.steps.length);
      years.steps.splice(at,0,{
        heading:'承熙三年三月 · 景阳宫东配殿',cast:['zhangyuanzhao','zhao2'],fx:'petal',narrative:true,text:s=>[
          `第一次大选的册书送完，新人分往各宫。张元照初封答应，住景阳宫东配殿。王静娴也在这一批低位新人里。`,
          `搬箱笼那日，两个人在廊下碰见。王静娴先看她抱箱子的手：“你箱底是不是有瓷器？走得这么慢。”`,
          `张元照道：“有两个杯子。”`,
          `“两个还分箱？”`,
          `“一个喝水，一个漱口。”`,
          `王静娴看她一眼，替她把快掉下来的箱带往上提了一寸。两个人就这样认识了。`
        ],choices:[{label:'继续',effects:{bond:{zhangyuanzhao:1,zhao2:1},flags:{v94ZhangSettledYear3:true}},result:''}]});
    }
    if(!years.steps.some(st=>String(st.heading||'').includes('年资册上多了一行'))){
      const pos=Math.max(0,years.steps.length-2);
      years.steps.splice(pos,0,{
        heading:'承熙六年春 · 年资册上多了一行',cast:['gu','zhangyuanzhao'],fx:'ink',narrative:true,text:s=>[
          `春季例核时，尚宫局把几名低位旧人的年资册一并送来。有人晋常在，有人加月例。张元照的名字夹在中间，从答应晋了常在。`,
          `册旨送到景阳宫时，她正在晾被褥。宫女提醒她先接旨，她才把竹竿靠稳，跪下谢恩。`,
          `第二天请安，她仍坐在原来那一排，只往前挪了一个位置。`
        ],choices:[{label:'继续',effects:{flags:{v94ZhangRoutinePromotion:true}},result:''}]});
      // 执行到这一幕时才晋，不覆盖已经更高的旧存档。
      const rp=years.steps.find(st=>String(st.heading||'').includes('年资册上多了一行'));
      if(rp?.choices?.[0]){rp.choices[0].v94RoutineZhang=true;}
    }
  }

  const oldApply94=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=oldApply94(c);
    if(c?.v94RoutineZhang){
      const ranks=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];
      const cur=state.ranks?.[z]||'答应';
      if(ranks.indexOf(cur)>=0&&ranks.indexOf(cur)<ranks.indexOf('常在')){state.ranks[z]='常在';out.push('张元照 → 常在');}
      state.flags.v94ZhangRoutinePromotion=true;
    }
    return out;
  };

  // ---- 6. 后期所有“第二次采选入宫的张元照”改为“承熙三年入宫的旧人”；邵张摊牌也改成同批旧识。 ----
  for(const ch of CHAPTERS||[]){for(const st of ch?.steps||[]){
    wrap(st,(a,s)=>a.map(x=>String(x)
      .replaceAll('第二次采选入宫的张元照','承熙三年入宫的张元照')
      .replaceAll('承熙三年第一次大选入宫。她','承熙三年第一次大选入宫。她')
      .replaceAll('第二次选秀才入宫的张元照','承熙三年已经入宫的张元照')
      .replaceAll('第二次选秀入宫的张元照','承熙三年入宫的张元照')
    ));
  }}
  const vacancy=C('中宫空悬');
  const rival=vacancy?.steps?.find(st=>String(st.heading||'').includes('她们第一次把话说在凤仪宫里'));
  if(rival){
    rival.text=s=>[
      `太后走后，正殿只剩邵明贞和张元照。`,
      `邵明贞把旧宫务册放回架上：“承熙三年，我们是同一天进体元殿的。”`,
      `张元照点头。`,
      `“我那日拿的是嫔册。”邵明贞看她一眼，“你在后排，册书只写答应。我当时连你的名字都没有记牢。”`,
      `张元照笑了一下：“臣妾记得娘娘。因为娘娘的册页念得很久。”`,
      `邵明贞也笑，转眼又收住：“八年、十年过去，最后倒坐到同一间殿里说凤印。”`,
      `“所以当年的位分说明不了今天。”`,
      `“你那些别人没见过的办法，也说明不了你一定适合坐这里。”`,
      `“臣妾知道。”`,
      `邵明贞走到窗边，把卡住半寸的窗栓推开。张元照伸手压住被风卷起的帘角。两个人谁也没有让。`
    ];
  }

  if(PEOPLE?.ning)PEOPLE.ning.bio=String(PEOPLE.ning.bio||'').replace(/承熙十一年第二次采选时[^。]*。/,'承熙三年与张元照同批入宫，后来长期协助顾明宜处理六宫杂务。');
  if(PEOPLE?.[z])PEOPLE[z].bio=PEOPLE[z].bio.replaceAll('第二次采选','第一次大选');

  // 旧的 v44 “最后一张名帖”若被别的补丁插在任一章节里，一律删除。
  for(const ch of CHAPTERS||[]){if(!ch?.steps)continue;ch.steps=ch.steps.filter(st=>{
    const h=String(st?.heading||'');if(!(h.includes('体元殿最后一页')||h.includes('最后一张名帖')))return true;
    const a=arr(st.text,state).join('');return !(a.includes('张元照')&&(/末页|最后一册名帖|最后一张/.test(a)));
  })}

  // 旧存档迁移：结构改动发生在第一次大选，跨过该点的旧档至少补齐入宫事实；不强制整局重开。
  state.flags=state.flags||{};
  state.flags.v94Build=true;
  globalThis.V94_QA={
    zhangIntroducedAt:PEOPLE?.[z]?.introducedAt,
    firstSelectionIndex:firstIdx,
    zhangRank:()=>state.ranks?.[z],
    zhangNeverPregnant:()=>!!state.flags?.zhangNoPregnancy,
    wangDate:C('王府旧笼')?.date,
    secondBridge:C('空宫点灯')?.bridge?.(state)||'',
    lastPageCount:(CHAPTERS||[]).flatMap(ch=>ch.steps||[]).filter(st=>/体元殿最后一页|最后一张名帖/.test(String(st.heading||''))).length
  };
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v94 first-selection / transition patch failed',e)}})();
