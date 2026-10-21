(()=>{try{
  const ch=t=>CHAPTERS.find(c=>c.title===t);
  const ix=(c,n)=>c?.steps?.findIndex(st=>(st.heading||'').includes(n))??-1;
  const st=(c,n)=>{const i=ix(c,n);return i>=0?c.steps[i]:null};
  const arr=(v,s)=>{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]};
  const insertAfter=(c,n,scene)=>{if(!c||c.steps.some(x=>(x.heading||'')===scene.heading))return;const i=ix(c,n);c.steps.splice(i>=0?i+1:c.steps.length,0,scene)};
  const insertBefore=(c,n,scene)=>{if(!c||c.steps.some(x=>(x.heading||'')===scene.heading))return;const i=ix(c,n);c.steps.splice(i>=0?i:c.steps.length,0,scene)};

  // A. 闻人母女：不是三张“旧国功能卡”，让她们真正吵一次，而且吵不到和解。
  const mother=ch('母至');
  insertAfter(mother,'半年书信终于有了回音',{
    heading:'银簪落在茶盏旁',cast:['wenheng','baopu','hanzhang'],fx:'candle',narrative:true,text:s=>[
      `闻人蘅入宫后的第三日晚膳，拾遗阁第一次把门关得很早。桌上只有三碗面、一碟腌菜。她仍戴那支旧国银簪，抱朴却已经换上大晟新赐的石榴红，含章坐在窗边，袖口压得很平。`,
      `抱朴先开口：“母亲既然来了，就别再回驿馆。我们三个住在一处，至少没人敢把谁悄悄带走。”`,
      `含章抬眼：“姐姐说的是住在一处，还是把母亲也留在宫里当一道护身符？”`,
      `抱朴的筷子“啪”地搁在碗沿：“你总这样。什么都说得像在审人。”`,
      `“我只是不想每一次害怕，都拿另一个人的去留来堵。”`,
      `闻人蘅没有制止。她伸手摘下银簪，放到茶盏旁。没有簪子压着，鬓边几缕白发很快松下来。`,
      `抱朴看见那几根白发，声音反而低了：“我不是要利用母亲。我只是……不想再有人突然不见。”`,
      `含章沉默了一会儿：“我也怕。可怕不是理由。”`,
      `“那你靠什么活？”抱朴忽然笑了一声，“靠不争？靠什么都不说？你当然可以不争。你从小就知道，只要站得够安静，总有人觉得你最懂事。”`,
      `含章的手指把袖口抚平。她真正生气时反而不再看姐姐：“姐姐也知道，只要笑得够亮，总有人先看见你。”`,
      `屋里一下静了。闻人蘅这才开口：“够了。”`,
      `她没有说谁对。只把银簪重新插回发间：“你们两个都在拿自己最会的东西活命。抱朴用被人看见，含章用不让人看穿。谁也别先笑谁。”`,
      `那顿面最后都凉了。母女三人第二日仍一起去慈宁宫请安，礼数一个没错。只有拾遗阁的宫女知道，那晚三只碗收走时，没有一只吃完。`
    ],choices:[{label:'隔日照常召见，不追问昨夜谁说了什么',hint:'闻人蘅：“家里的话，让她们自己记。”',effects:{trust:{wenheng:2,baopu:1,hanzhang:2},flags:{v65WenrenConflict:true}},result:'第二日御前只问住处与饮食。姐妹都没有提昨夜，关系却从此不再只是“一个热烈、一个安静”。'}]
  });

  const loss=ch('香尽胎寒');
  insertAfter(loss,'那双没有分清左右的小鞋',{
    heading:'拾遗阁的门那夜没有关',cast:['wenheng','baopu','hanzhang'],fx:'snow',narrative:true,text:s=>[
      `失子后的第七夜，拾遗阁没有落内门。雪光从廊下照进来，抱朴披着外衣坐在榻边，手里捏着那只没有分清左右的小鞋。`,
      `闻人蘅端来药，她没接，只问：“母亲是不是还想说，我还年轻，以后还会有？”`,
      `闻人蘅的手停在半空。`,
      `“你真正想说的不是‘我还会有’。”抱朴看着她，“你想说的是——我们还需要一个孩子。”`,
      `“抱朴。”含章第一次在这种时候打断姐姐。`,
      `抱朴转过去：“你别叫我。你最干净。你从来没有想过拿孩子换什么，也从来没有求过谁多看你一眼。”`,
      `含章的袖口被她自己一寸寸抚平：“我没有孩子，不等于我没有被拿去换过。”`,
      `闻人蘅猛地抬眼。`,
      `“母亲想保旧人，姐姐想保自己，我也想活。”含章说，“可谁都不能因为怕，就把另一个人当成一条路。”`,
      `抱朴眼圈一下红了，却仍笑：“你现在有御前牌，当然会说这种话。”`,
      `含章没有退：“所以姐姐若觉得我欠你，就冲我来。别再拿一个还没出生的人替我们全家证明什么。”`,
      `闻人蘅终于把药碗放下。瓷底碰木案，声音很轻。她没有训任何一个女儿，只说：“这件事，到这里。”`,
      `可这件事并没有到这里。门一直开到天亮，雪风把桌上的药吹凉。第二日三个人照常见面，谁也没有道歉。`
    ],choices:[{label:'让拾遗阁自己过这一夜',effects:{flags:{v65WenrenRift:true}},result:'御前没有传问。第二日含章照常来还御前牌，抱朴照常穿最亮的衣裳，闻人蘅照常戴那支银簪。三个人照常请安、用膳，晚饭却第一次分在三张桌上。'}]
  });

  // B. 主控：行刺后不是突然懂人，而是先变得更不信“单一版本”；这种变化直接影响方案、元照与继后。
  const stab=ch('刃落宫门');
  insertAfter(stab,'伤口重新裂开',{
    heading:'伤口愈合得比疑心快',cast:['emperor','peiyan','hanzhang'],fx:'ink',narrative:true,text:s=>[
      `能重新坐到御案前时，我右肋仍不能久直。裴景和把当天值簿放在左边，含章的口供放在右边。以前同一件事我通常只留一份最完整的；那天我让他两份都留下。`,
      `“以后凡御前口谕、药物、宫门出入，同一件事若有两处记录，都送来。”`,
      `裴景和问：“若两份写得不一样？”`,
      `“先别替朕抄成一样。”`,
      `后来方小满案发，御案上同时有送药记录和宫门值簿。我让人将原件并排封存，逐处核对经手人与时辰。`
    ],choices:[{label:'两份都留原件',effects:{trust:{peiyan:2,hanzhang:2},flags:{v65EmperorDoubleSource:true}},result:'从此养心殿案头常有两份写着同一天的纸。它们有时完全相同，有时差一个时辰。'}]
  });

  // C. 张元照真正足以说服主控的“皇后理由”：敢破例救人，也敢让自己的破例被追问。
  const vacancy=ch('中宫空悬');
  insertBefore(vacancy,'凤印前最后一道旨',{
    heading:'东角门开了一刻钟',cast:['emperor','zhangyuanzhao','ning','xielin'],fx:'storm',keyDecision:true,text:s=>[
      `承熙十四年三月，春雷劈中皇嗣院东侧老槐。我在养心殿接到火报，赶到时东角门已经开了。乳母抱着孩子从门里出来，谢绍庭在门边清人数；邵明贞让人领他们去两处暖阁。`,
      `谢绍庭指给我看：火从院东的檐角落进旧棉帘耳房，东角门与耳房隔着一道砖墙，门外通往空着的外廊。西门那条窄道上，提水的人正往里赶，抱孩子的乳母原先也从那里往外走，两队人在门口挤住了。`,
      `谢绍庭说：“值门簿写着，东角门须奉御前口谕才开。西门挤住时，张氏叫臣开东门。臣带人卸了锁，让乳母走东廊，提水的仍走西门。”`,
      `张元照站在雨里，头发已经湿了大半。`,
      `我在门边停住：“谁准开的门？”`,
      `她没有看邵明贞，也没有看谢绍庭：“臣妾。”`,
      `“你知道这扇门什么规矩？”`,
      `“知道。”`,
      `“那为什么开？”`,
      `“让提水的人走西门，孩子走东门。等人去御前请旨再回来，耳房里的棉帘还在烧，乳母就得抱着孩子挤回水桶中间。”`,
      `等火压下去，谢绍庭又点了一遍人：孩子和乳母都在，两间耳房烧坏了，没有死人。天亮以后，尚宫局送来事故簿，原本想写“火急从权，众人合议启门”。张元照把那行划掉，改成：“张氏下令启东角门一刻钟。”`,
      `我把册子推回去：“救了人，还非要留下自己的名字？”`,
      `“昨夜若开错了，得知道该问谁。”她说，“若开对了，也不能让下一个人看见‘火急从权’四个字，就以为任何时候都能开。”`,
      `邵明贞站在旁边，没有替她说情，只补了一句：“昨夜若不开，臣妾也会请开。只是她比臣妾早到半刻。”`,
      ``
    ],choices:[
      {label:'“开门不罪，值簿照实留名。”',hint:'承认当夜启门的必要，保留张氏下令和谢绍庭执行的记录。',effects:{trust:{zhangyuanzhao:6,ning:2},flags:{v65ZhangGatePolicy:'keep',v65ZhangQueenReason:true}},result:'事故簿没有重抄。一个月后礼部送继后拟册时，我先想起的不是疫册，而是这一行没有被擦掉的名字。'},
      {label:'“开门不罪，留名；以后能先报就先报。”',hint:'事故簿照实留名；往后若来得及先报御前，来不及时仍先撤人。',effects:{trust:{zhangyuanzhao:3,ning:2},flags:{v65ZhangGatePolicy:'caution',v65ZhangQueenReason:true}},result:'事故簿照张元照原写法封存。尚宫局又在值门簿旁添一行：“能报先报；火急来不及，先撤人，事后补录下令者与开门者。”谢绍庭当天把这行读给值门侍卫听。'}
    ]
  });

  const final=st(vacancy,'凤印前最后一道旨');
  if(final){
    final.text=s=>[
      `凤印从库里取出来那日，匣面有一层极薄的灰。`,
      `邵明贞与张元照都在殿外等。太后没有来替侄女说话，只让人送来一句：“别选一个最像明宜的人。”`,
      `我先召邵明贞。她说：“臣妾若受凤印，会把该由中宫说的话说出来。不能每一件事都等陛下回头。”`,
      `再召张元照。她没有说自己做过多少疫务，只道：“若陛下把凤印给臣妾，臣妾想求一件事。”`,
      `“说。”`,
      `“中宫下的令也要留经手，也要能被查。皇后不是因为坐了这个位置，就天然不会错。”`,
      `我看了她一会儿。她说这句话时没有看凤印。`,
      `这些年我对她的态度并不是一路变软。夏天愿意见她，是因为她新鲜；时疫时肯给她临时牌，是因为她敢说“不能保证”；三皇子的事以后，我信她知道什么时候该退；东角门那一夜，我才第一次真正把她放进“能不能做中宫”的问题里。`,
      `最后这一笔仍然由我自己落。没有一个人能替我把两条路写成同一条。`
    ];
    for(const c of final.choices||[]){
      const lab=typeof c.label==='string'?c.label:'';
      if(lab.includes('邵明贞')){c.label='“邵氏，接凤印。”';c.hint='邵明贞：“臣妾接的是这个位置该说的最后一句，不是顾明宜留下的影子。”';}
      if(lab.includes('张元照')){c.label='“张氏，接凤印。”';c.hint='张元照：“臣妾会下令，也会留下是谁下的令。”';}
    }
  }

  // D. 皇后的边界再钉一处：方案后她继续相信“加规则”，时疫前仍如此，不突然长成元照。
  const empty=ch('空宫点灯');
  const repair=st(empty,'修缮图册');
  if(repair){const old=repair.text;repair.text=s=>[...arr(old,s),`方小满案以后，顾明宜的宫务册反而比从前更厚。旧物、药材、口谕、宫门，每一项旁边都多了新的核验记号。她没有变成一个怀疑规矩的人；她只是更相信，若把每一道缝都补好，下一次就能少错一个人。`];}

  // E. 大事录：加入“朱笔旁记”，把主控变化写成实际行为及其后果，而不是人格总结。
  const oldChron=chronicleView;
  chronicleView=function(){let h=oldChron();const f=state.flags||{};
    const track=`<section class="v65-emperor-track"><span class="eyebrow">御前旁记</span><h2>朱笔变过几次重量</h2>
      <p><b>承熙元年至三年</b>　六宫大多由皇后先看，我最后落位分与赏罚。这个习惯让中宫很快稳下来，也让我越来越习惯把“她会处理”当成省掉一次亲自过问的理由。</p>
      <p><b>重阳行刺以后</b>　我不再只留一份最完整的口供。${f.v65EmperorDoubleSource?'两份原件同时进御案，后来方小满案的送药记录也与门禁值簿逐处对照。':'我开始要求同一件事从不同来源核一遍。'}重阳以后，同一件事我常让人从两处来报。</p>
      <p><b>方小满案以后</b>　我对“手续齐全”不再像从前那样放心，却仍没有因此变成会先问人心的皇帝。很多时候，我只是查得更多、问得更细。</p>
      <p><b>承熙十一年盛夏到时疫</b>　我对张元照先有恩宠，后有授权。前者因为她有趣，后者因为她在不知道答案时仍敢说“不知道”，也肯让办法先小范围试。两件事没有混作一笔。</p>
      <p><b>顾皇后薨逝以后</b>　把事情交给别人逐渐从一种选择变成逃避。“照旧”“再议”越来越多，凤印空悬与三皇子的问题都因此拖到御前。</p>
      <p><b>三皇子以后</b>　我第一次没有把一份可以利用的往来册变成处罚，而是先问儿子缺什么。这个变化没有让我从此变成另一个人；第二天御案上的朱笔仍照常落，只是有一件家事没有被写成案子。</p>
      <p><b>承熙十四年</b>　${f.v65ZhangQueenReason?'东角门那一夜以后，我开始把“敢决定以后是否肯被追问”也放进继后的尺度。':'凤印不能再靠拖延留空。'}最后无论选谁，册后旨都必须由我亲自落笔。</p>
    </section>`;
    return h.replace('</main>',track+'</main>');
  };

  // F. 王静娴侧记彻底从渲染层移除，防旧存档/旧函数再次带出来。
  const oldStory65=storyView;
  storyView=function(){let h=oldStory65();return h.replace(/<span class="v54-thought">[\s\S]*?<\/span>/g,'');};

  // G. 大事录史笔补上东角门与闻人母女裂痕（若走到这些章节）。
  if(typeof historyRecordV38==='function'){
    const oldHist=historyRecordV38;
    historyRecordV38=function(e,i){
      if(e?.title==='中宫空悬'&&state.flags?.v65ZhangQueenReason)return '承熙十四年春，皇嗣院夜火，东角门非常启用，诸皇嗣与宫人无伤。张氏自署启门之责。其后帝议中宫人选。';
      return oldHist(e,i);
    };
  }

  // H. 立绘：给已有旧图加 class 后改成更短的 4:5 取景；新字形立绘不动。
  const legacy=new Set(['emperor','taihou','gu','shen','zhou','wenheng','baopu','hanzhang','fang']);
  const oldPortrait65=portrait;
  portrait=function(p,small=false){let h=oldPortrait65(p,small);const k=Object.keys(PEOPLE).find(x=>PEOPLE[x]===p);if(k&&legacy.has(k)&&!small)h=h.replace('class="portrait','class="portrait v65-legacy');return h;};

  // I. “信氏”检查：当前工程无既定信氏，不凭空增人；若用户实际指沈氏，人物/孕事标签已明确写回沈知微。
  globalThis.V65_QA={hasXin:!!PEOPLE.xin||Object.values(PEOPLE).some(p=>/^信/.test(p?.name||'')),wenrenConflict:!!st(mother,'银簪落在茶盏旁'),zhangQueenReason:!!st(vacancy,'东角门开了一刻钟'),thoughtBoxesRemoved:true};
  state.flags=state.flags||{};state.flags.v65Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v65 protagonist/empress patch failed',e)}})();
