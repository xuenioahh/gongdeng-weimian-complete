(()=>{try{
  document.documentElement.dataset.build='v33';

  // v33: names stay plain; character is carried by behavior rather than ornate given names.
  Object.assign(PEOPLE.ning,{name:'邵明贞',title:'徽嫔',bio:'太后胞弟之女，母亲出自顾氏旁支。她小时候常随母入慈宁宫，皇后一直叫她阿宁。入宫后，她与中宫天然亲近：祭礼、宫册、女眷宴都肯搭手；也正因为她遇到没有旧例的事敢自己拿主意，皇后有时会在她身上感到一种说不出口的压力。'});
  Object.assign(PEOPLE.ke,{name:'霍素英',title:'晋嫔',bio:'定远侯之女，自幼随父兄在北地长大。她不爱说漂亮话，站得稳，做事也快。霍家仍在北营握有分量，家中保存的一批旧军籍后来成为沈氏旧案最早的实物线索。'});
  Object.assign(PEOPLE.hui,{name:'崔静仪',title:'元嫔',bio:'江南崔氏嫡女。说话温和，送礼从不过界。崔家长期参与漕粮、织造与宫中贡造，内务府不少掌事都认得她家的旧人。'});
  Object.assign(PEOPLE.cao2,{name:'王淑惠'});Object.assign(PEOPLE.zhao2,{name:'张素英'});Object.assign(PEOPLE.lin2,{name:'林淑贞'});Object.assign(PEOPLE.ye2,{name:'陈婉仪'});Object.assign(PEOPLE.du2,{name:'李秀贞'});Object.assign(PEOPLE.su2,{name:'刘素华'});

  // courtTitle in v31 accidentally used “宁” as the prefix. Keep the actual title “祺”.
  const courtTitleV32=courtTitle;
  courtTitle=function(s,k){
    if(k==='ning'){
      const raw=(s?.ranks&&s.ranks[k])||PEOPLE[k]?.title||'';
      if(/^故|^废/.test(raw))return raw;
      if(['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'].includes(raw))return '徽'+raw;
      if(/^宁(嫔|妃|贵妃|皇贵妃)$/.test(raw))return raw.replace(/^宁/,'徽');
      return raw;
    }
    return courtTitleV32(s,k);
  };

  // More children exist in the palace, but only some carry main-line political weight.
  Object.assign(CHILDREN,{
    fifthPrincess:{name:'杨宁矣',order:'三公主',age:'承熙四年生',motherName:'生母依御前留牌确定',note:'承熙四年秋出生，洗三时入玉牒，赐名宁矣。她的母亲并非最得宠的人，因此她的出生第一次让昭氏真正明白：承宠多少与能不能有孩子并不是一回事。'},
    fourthPrince:{name:'杨顺恭',order:'四皇子',age:'承熙五年生',mother:'ke',note:'晋嫔所出。出生时北营几家同时送来贺礼，三皇子的嫡子身份没有动摇，但宫里第一次多了一个活着长大的幼弟。'},
    sixthPrincess:{name:'杨晏尔',order:'六公主',age:'承熙六年生',mother:'ning',note:'徽嫔所出。她是太后母族的外孙女，也是顾氏姻亲一脉的孩子；出生后常被抱去慈宁宫，皇后与徽嫔之间那份亲近也因此多了一层不易言明的比较。'}
  });

  // Add generic promotion hooks; every promotion remains a player decision and moves only one rank.
  const applyChoiceEffectsV32=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=applyChoiceEffectsV32(c);
    if(c.effects?.flags?.promoteKePregnant){if(promoteRank('ke'))out.push(`${PEOPLE.ke.name}晋一级 → ${courtTitle(state,'ke')}`)}
    if(c.effects?.flags?.promoteNingPregnant){if(promoteRank('ning'))out.push(`${PEOPLE.ning.name}晋一级 → ${courtTitle(state,'ning')}`)}
    return out;
  };

  const ch=CHAPTERS[5];
  if(ch?.steps && !ch.steps.some(x=>x.heading?.includes('五公主洗三'))){
    const find=(needle)=>ch.steps.findIndex(x=>x.heading?.includes(needle));

    // Low-ranking pregnancy becomes a real birth, not a one-line statistic.
    const fiveBirth={heading:'承熙四年八月 · 五公主洗三',cast:['gu','baopu'],fx:'lantern',narrative:true,text:s=>{
      const k=lowPregKey(s), mother=PEOPLE[k]?.name||'一名低位宫嫔', rank=s.ranks[k]||'常在';
      return [
        `八月末，${mother}发动。她住的院子小，产房外连候着的宫人都排不开，皇后索性把隔壁两间耳房一并腾出来。`,
        `天快亮时，孩子哭了。是个公主。皇后听见女医报“母女平安”，先问的不是赏多少，而是乳母名册有没有复核第二遍。直到册子合上，她才进去看了一眼。`,
        `${mother}不过${rank}，抱孩子时两只手一直发抖。她问皇后：“娘娘，臣妾能自己养吗？”皇后愣了一下，翻旧例的手已经伸出去，又慢慢收回来：“先养着。你身子若撑不住，再说。”`,
        `洗三那日，玉牒记作三公主，赐名杨宁矣。银盆里浮着艾叶和小铜钱，太后只坐了半刻钟便说“别折腾孩子”。`,
        `${courtTitle(s,'baopu')}也来过。她送的是一只做得过分精细的小金铃。三公主抓不到，只把她一根手指攥住。她笑得很响，等孩子松手以后却站在廊下停了很久。`,
        `昭妃从产房出来时，那只小金铃还攥在掌心。宫女提醒她落了东西，她低头看了一眼，才把铃放回托盘。`
      ];
    },choices:[{label:'继续',effects:{flags:{fifthPrincessBorn:true}},result:''}]};
    let i=find('和妃的旧案从晋嫔家的一本军粮簿开始'); if(i>=0) ch.steps.splice(i+1,0,fiveBirth);

    // Make the long slow-poison montage start after the fifth princess's birth, so chronology no longer jumps backward.
    const slow=ch.steps.find(x=>x.heading?.includes('慢性暗害没有'));
    if(slow?.text){const old=slow.text;slow.text=s=>old(s).map((x,idx)=>idx===0?'承熙四年入秋以后，昭氏仍一直在用那批复验过的旧香。不是每天点炉，也不是吞服。香丸多数放在衣箱、枕匣和袖袋里，味道一点点贴在她身上。':x)}

    const kePreg={heading:'承熙四年十一月 · 晋嫔有喜',cast:['ke','gu','shen'],fx:'candle',text:s=>[
      `入冬以后，晋嫔报了喜脉。消息来得很安静——她前一晚还在射圃收弓，第二日太医便让人把弓架整个搬走。`,
      `皇后把她的请安免了半月。晋嫔听说后只问：“半月以后还能来？”皇后道：“先把这半月过完。”`,
      `和妃去看她时带的不是补品，是一册北营冬粮旧账。晋嫔笑：“娘娘来看孕妇，还带账？”和妃答：“你躺着也是躺着。”两个人把账摊在炕桌上，沈氏旧案就在这样的日常里继续往前挪了一点。`,
      `晋嫔初封便是嫔。有孕按例可以酌晋，但没有哪条规矩说一定要晋。册书已经拟好一半，剩下那一句由我来写。`
    ],keyDecision:true,choices:[
      {get label(){return `${PEOPLE.ke.name}报喜，准依例晋一阶`;},hint:'按当前位分进一阶：贵人晋嫔，嫔晋妃',effects:{flags:{promoteKePregnant:true,kePregnant:true}},result:s=>`${courtTitle(s,'ke')}接册后第一件事，是让人把射圃钥匙交给皇后：“等臣妾生完再拿回来。”皇后接过钥匙，反而笑了一下。`},
      {label:'不晋位，只加月例与医药',hint:'有孕不自动换来身份',effects:{trust:{gu:1,ke:1},flags:{kePregnant:true,keNoPregPromotion:true}},result:s=>`位分不动。${courtTitle(s,'ke')}只说“知道了”，仍让人把北营送来的羊毛毡分一半给产房。`}
    ]};

    const fourthBirth={heading:'承熙五年六月 · 四皇子出生',cast:['ke','gu','taihou','baopu'],fx:'lantern',narrative:true,text:s=>[
      `承熙五年六月，晋嫔生下四皇子。`,
      `这一次宫里比五公主出生时安静得多，也紧张得多。前朝当天便有人递贺表，北营几家武臣的礼单长得让皇后皱眉。她把超例的东西一件件退回去，退到第三份时问：“皇子才三日，怎么就有人替他攒人情了？”`,
      `太后只看了孩子一会儿，说鼻子像霍家。皇后抱过来时动作很稳，三皇子也被带来见弟弟。他站在摇篮边看了半天，只问：“他以后也住宫里？”`,
      `“不然呢？”我问。`,
      `三皇子没答。皇后立刻让人带他去看新得的弓。她把话岔得太快，晋嫔在榻上看了一眼，没有出声。`,
      `${courtTitle(s,'baopu')}送来一整套小衣。她摸了摸四皇子的脸，回去以后却把《承露录》里“请脉”那一页重新抄了一遍。`,
      `四皇子没有立刻改变储位。可从这一日开始，“皇子”不再只是皇后宫里那一个孩子。`
    ],choices:[{label:'继续',effects:{flags:{fourthPrinceBorn:true}},result:''}]};

    const ningPreg={heading:'承熙五年七月 · 徽嫔也有了喜脉',cast:['ning','gu','taihou'],fx:'petal',text:s=>[
      `四皇子满月后的第二个月，徽嫔也报了喜。`,
      `太后没有大张旗鼓，只叫人把景仁宫的冰盆减一半。皇后却亲自过去了一趟。她进门时，徽嫔正坐在窗边拆一只旧针线筐，里面还是她未入宫时的东西。`,
      `“怎么自己拆？”皇后问。`,
      `“闲着也是闲着。”徽嫔把一团缠住的线递过去，“娘娘帮我拽一下。”`,
      `皇后真的坐下替她拽线。两个人有一阵谁也没说宫务。等线解开，徽嫔才道：“太后让我少管凤仪宫的事。”`,
      `皇后手停了一下：“应该的。”`,
      `这句“应该的”说得太快。徽嫔看她一眼，没有再说。`,
      `她入宫时的册命由御前亲定。如今有孕，也只到“可酌晋一级”。这一次，太后没有替任何人开口。`
    ],keyDecision:true,choices:[
      {get label(){return `${PEOPLE.ning.name}报喜，准依例晋一阶`;},hint:'按当前位分进一阶：贵人晋嫔，嫔晋妃',effects:{flags:{promoteNingPregnant:true,ningPregnant:true}},result:s=>`${courtTitle(s,'ning')}接旨后先去凤仪宫谢皇后。皇后替她把新册书收好，笑得很体面。慈宁宫来人说太后等她过去时，皇后手里的茶盖轻轻碰了杯沿一下。`},
      {label:'暂不晋位，只按孕例优待',hint:'不把太后外戚的喜脉自动变成更高位分',effects:{trust:{gu:2},bond:{ning:-1},flags:{ningPregnant:true,ningNoPregPromotion:true}},result:s=>`位分未动。${courtTitle(s,'ning')}没有争，只把册书样稿退回尚宫局。太后也没问，反倒让皇后自己定景仁宫的孕例。皇后那晚把旧例翻到很迟。`}
    ]};

    const sixthBirth={heading:'承熙六年二月 · 六公主满月',cast:['ning','gu','taihou','baopu'],fx:'lantern',narrative:true,text:s=>[
      `年后不久，徽嫔生下六公主。孩子很安静，洗三时被铜钱碰到脚也只皱了皱脸。`,
      `太后喜欢得很，隔三差五便叫人抱去慈宁宫。皇后也常去。她与徽嫔本就是旧亲，如今一人坐中宫，一人生了太后母族的外孙女，关系反而比从前更难用“亲近”两个字说完。`,
      `有一日我到慈宁宫，正看见皇后抱着六公主，徽嫔蹲在一旁替孩子系袜带。太后闭着眼说：“你们小时候也这样坐过。”`,
      `皇后笑：“臣妾不记得了。”`,
      `徽嫔却说：“我记得。娘娘那时候就怕我把东西弄乱。”`,
      `太后笑出了声。皇后也笑。只是回凤仪宫以后，她让人把三皇子的功课册送来，比往日多看了两页。`,
      `${courtTitle(s,'baopu')}来贺时没有穿最艳的衣服。她抱了六公主一小会儿，孩子在她怀里睡着。她低头看得太久，直到蘅嫔叫她，她才把孩子还回去。`,
      `到了这一年，宫中皇子女各有序齿与年岁。小儿啼哭，宫册便添一行；家常宴席上，也须为他们重新排席。`
    ],choices:[{label:'继续',effects:{flags:{sixthPrincessBorn:true}},result:''}]};

    // Move the existing year-five obsession scene later, after the new pregnancies and fourth prince birth.
    const obsessionIndex=find('承熙五年，昭氏开始把“有没有孩子”当成考试');
    let obsession=obsessionIndex>=0?ch.steps.splice(obsessionIndex,1)[0]:null;
    let slowIndex=find('慢性暗害没有');
    if(slowIndex>=0){ch.steps.splice(slowIndex+1,0,kePreg,fourthBirth,ningPreg);}
    // Place obsession after the two high-ranking pregnancy/birth changes.
    let ningIndex=find('徽嫔也有了喜脉');
    if(ningIndex>=0 && obsession)ch.steps.splice(ningIndex+1,0,obsession,sixthBirth);
  }

  // Keep the royal register spoiler-free: children appear only after their births.
  const childrenViewV32=childrenView;
  childrenView=function(){
    const hidden=[];
    const maybeHide=(k,flag)=>{if(!state.flags?.[flag]&&CHILDREN[k]){hidden.push([k,CHILDREN[k]]);delete CHILDREN[k]}};
    maybeHide('fifthPrincess','fifthPrincessBorn');maybeHide('fourthPrince','fourthPrinceBorn');maybeHide('sixthPrincess','sixthPrincessBorn');
    let fifthOld;
    if(CHILDREN.fifthPrincess){
      fifthOld=CHILDREN.fifthPrincess.motherName;
      const k=lowPregKey(state); if(k&&PEOPLE[k])CHILDREN.fifthPrincess.motherName=`${PEOPLE[k].name}（${state.ranks[k]||'低位宫嫔'}）`;
    }
    try{return childrenViewV32()}finally{
      if(CHILDREN.fifthPrincess&&fifthOld!==undefined)CHILDREN.fifthPrincess.motherName=fifthOld;
      hidden.forEach(([k,v])=>CHILDREN[k]=v);
    }
  };

  // Update the history-book layer too; it records births without turning every child into a protagonist.
  if(typeof annalFor==='function'){
    const annalV32=annalFor;
    annalFor=function(i){
      if(i===5)return '承熙三年，诏行大选。邵氏、霍氏、崔氏皆以名门入嫔位，另留低位宫嫔数人。四年五公主生，五年四皇子生，六年六公主生。六宫渐备。——《大晟史·后妃传》';
      return annalV32(i);
    }
  }

  // New chapter-six structure invalidates old mid-chapter save positions; preserve the first five chapters and restart at the grand selection once.
  if(!state.flags?.v33Migrated){
    const hadProgress=(state.index||0)>=5;
    if(hadProgress){
      const first5=(state.history||[]).slice(0,5), intro=state.intro;
      state=clone(INITIAL_STATE);state.intro=intro;
      ['ning','ke','hui','cao2','zhao2','lin2','ye2','du2','su2'].forEach(k=>{state.ranks[k]='待选';state.bond[k]=28;state.trust[k]=35});
      first5.forEach((p,idx)=>{state.index=idx;applyRecordedChapter(idx,p);state.index=idx+1});
      state.index=5;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];
    }
    state.flags.v33Migrated=true;
  }

  save();render();
}catch(e){console.error('v33 patch failed',e)}})();
