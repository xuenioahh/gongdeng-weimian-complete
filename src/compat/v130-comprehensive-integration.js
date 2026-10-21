(()=>{try{
  if(globalThis.__v130ComprehensiveApplied)return;
  globalThis.__v130ComprehensiveApplied=true;
  const C=t=>CHAPTERS.find(ch=>ch.title===t);
  const S=(c,p)=>c?.steps?.find(st=>(st.heading||'').includes(p));
  const arr=x=>Array.isArray(x)?x:(x==null?[]:[x]);
  const nameOf=k=>PEOPLE?.[k]?.name||({gu:'顾明宜',shen:'沈知微',zhou:'周清漪',fang:'方小满',ning:'邵明贞',ke:'霍素英',hui:'崔静仪',baopu:'闻人抱朴',hanzhang:'闻人含章',zhangyuanzhao:'张元照',cao2:'何超英',zhao2:'王静娴',lin2:'林淑贞',ye2:'陈婉仪',du2:'张淑华',su2:'刘玉贞'}[k]||k);
  const namedRank=(s,k)=>{let t='';try{t=courtTitle(s,k)||''}catch(_e){};const n=nameOf(k);if(!t||t==='待选'||t==='待封'||t==='宫女')return n;return t.includes(n)?t:`${t} ${n}`;};
  const textValue=(st,s)=>arr(typeof st?.text==='function'?st.text(s):st?.text).map(String);
  const mapText=(st,fn)=>{if(!st)return;const old=st.text;st.text=s=>arr(typeof old==='function'?old(s):old).map(x=>fn(String(x),s));};
  const mapResult=(ch,fn)=>{if(!ch)return;const old=ch.result;ch.result=s=>fn(String(typeof old==='function'?old(s):(old||'')),s);};
  const mergeFlags=(choice,flags)=>{if(!choice)return;choice.effects=choice.effects||{};choice.effects.flags={...(choice.effects.flags||{}),...flags};};

  // ===== 第6章：先让人立住，再谈她们身后的家门 =====
  {
    const ch=C('御前终选');
    const q=S(ch,'我亲自问最后一题');
    if(q?.choices?.[0]) q.choices[0].result=`邵明贞想了一会儿：“怕以后事事先问旧例，问久了便不敢自己拿主意。”霍素英答得最快：“家书。”崔静仪停了一息：“怕该问的时候没有问，不该多问的时候反而问多了。”太后没有点评。最后怎么册封，仍由我自己落笔。`;
    const n=S(ch,'邵明贞的册页');
    if(n){const old=n.text;n.text=s=>{const a=arr(typeof old==='function'?old(s):old).map(String);return [a[0],`轮到邵明贞时，我没有先问邵家的功劳，只问她：“两份旧例互相打架，你怎么办？”`,`她答：“先看眼前会伤到谁。实在没有现成答案，就先定一个能执行的办法，过一阵再回来看看有没有错。”`,`她与太后、顾家都有亲缘，这层关系写在册上就够了。接下来我要定的是她本人从什么位分开始。`];};}
    const k=S(ch,'霍素英的册页');
    if(k){const old=k.text;k.text=s=>{const a=arr(typeof old==='function'?old(s):old).map(String);return [a[0],`霍素英站到御前，我问她进宫最舍不得什么。她先说“家书”，想了想又补：“还有弓。”`,`她父兄在北营，朝臣当然会看她的初封。但她自己从头到尾没有替北营讨一句体面。`,`这一笔可以顾及霍家，也可以只按她本人起步。`];};}
    const h=S(ch,'崔静仪的册页');
    if(h){const old=h.text;h.text=s=>{const a=arr(typeof old==='function'?old(s):old).map(String);return [a[0],`我问崔静仪：“若所有手续都齐了，你还会不会再问一句？”`,`她答：“若东西看着不对，会问。只是臣女从小也被教过，很多时候追问太多会让人难堪。”`,`她最会让场面舒服。这是长处，也可能让她太容易在听到一个顺耳答案以后停下来。崔家与贡造的关系另写在家谱，不替她本人作答。`];};}
  }

  // ===== 第7章：去掉香案提前揭底；把旧占位称呼清干净 =====
  {
    const ch=C('宫灯渐繁');
    const favor=S(ch,'新人入宫后的第一个月');
    if(favor?.choices?.length>=4){
      favor.choices[0].label=s=>`多召${namedRank(s,'baopu')}`;
      mapResult(favor.choices[0],(x,s)=>x.replaceAll('待封',namedRank(s,'baopu')).replaceAll('新来的待选','张元照'));
      favor.choices[3].label=s=>`多召${namedRank(s,'hui')}`;
      mapResult(favor.choices[3],(x,s)=>x.replaceAll('待选',namedRank(s,'hui')));
    }
    const mid=S(ch,'中秋席上有人提起');
    if(mid){const old=mid.text;mid.text=s=>{const a=textValue({text:old},s);a.splice(2,0,`那孩子大概是在家里听长辈提过“绮春宫当年一胎双生，一子不育”，却不知道这是宫里没人愿意再问的一件事。`);return a;};}
    mapText(S(ch,'一张换库单'),(x)=>x.replaceAll('待封','含章'));
    const poison=S(ch,'慢性暗害没有');
    if(poison){
      poison.heading='承熙四年秋 · 旧香的尾味一直没有回来';
      poison.text=s=>[
        `入秋以后，昭氏仍在用那批经过复验的旧香。不是日日点炉，多半只是放在衣箱、枕匣和袖袋里。`,
        `含章始终记得返还后的香尾味和从前不一样。她没有证据，也说不出究竟差在哪里，只从姐姐的香匣里留下一颗，放进自己不用的棋罐。`,
        `内务府的换库单上能看见贡造行参与过防潮绢袋和复验，但这只能说明谁碰过这一批东西，不能说明是谁动了手。`,
        `太医那时也没有给出结论。旧香照常留在昭氏身边，这件事便被压进了许多“看起来没出事”的日常里。`
      ];
    }
    const kePreg=S(ch,'霍氏有喜');
    if(kePreg?.choices){kePreg.choices.forEach(c=>mapResult(c,x=>x.replaceAll('待选','霍素英')));}
    mapText(S(ch,'霍氏生产'),x=>x.replaceAll('待封','昭氏'));
    const ningPreg=S(ch,'邵氏有喜');
    if(ningPreg?.choices){ningPreg.choices.forEach(c=>mapResult(c,x=>x.replaceAll('待选','邵明贞')));}
    const assignLabels=(st)=>{
      if(!st?.choices?.length)return;
      const keys=['gu','shen','zhou','fang','ning','ke','hui','cao2','zhao2','lin2','ye2','du2','su2'];
      keys.forEach((k,i)=>{const c=st.choices[i];if(!c)return;c.label=s=>`这一季，多召${namedRank(s,k)}`;mapResult(c,(x,s)=>x.replaceAll('待选',nameOf(k)).replaceAll(`（${nameOf(k)}）`,nameOf(k)).replaceAll('（）',''));});
    };
    assignLabels(S(ch,'要不要再添一个孩子'));
    assignLabels(S(ch,'第二张空白页'));
    const finalPreg=S(ch,'六月终于有喜');
    if(finalPreg?.choices)finalPreg.choices.forEach(c=>mapResult(c,x=>x.replaceAll('待封','昭氏')));
  }

  // ===== 第8章：时间顺序纠正；把“你也一样”说清楚 =====
  {
    const ch=C('香尽胎寒');
    const doubt=S(ch,'主控第一次怀疑蘅嫔');
    if(doubt)mapText(doubt,x=>x.replace('“陛下也一样。”','“陛下当年也觉得，一个孩子若会给新朝惹麻烦，就可以先把他从玉牒上抹掉。”'));
    if(ch?.steps?.length>=11){
      const a=[...ch.steps];
      const first=a.slice(0,8), three=a[8], ten=a[9], seven=a[10];
      ch.steps=[...first,seven,ten,three];
      seven.heading='失子后的第七夜 · 拾遗阁的门没有关';
      ten.heading='失子后的第十日 · 她第一次不肯听“还年轻”';
      three.heading='三个月后 · 她仍说“我还会有的”';
    }
  }

  // ===== 第9章：两案只是名字重合；清掉“待封” =====
  {
    const ch=C('灯下旧局');
    const cross=S(ch,'沈案与蘅地名单');
    if(cross){const old=cross.text;cross.text=s=>{const a=textValue({text:old},s);a.push(`沈知微把两张纸分开放：“名字重了，只能先查这个人。不能因为他两边都出现过，就把两桩事写成同一案。”`);return a;};}
    (ch?.steps||[]).forEach(st=>{mapText(st,x=>x.replaceAll('待封','含章'));(st.choices||[]).forEach(c=>{if(typeof c.label==='string')c.label=c.label.replaceAll('待封','含章');mapResult(c,x=>x.replaceAll('待封','含章'));});});
    const cake=S(ch,'一盘栗糕');
    if(cake){const old=cake.text;cake.text=s=>{let a=textValue({text:old},s).map(x=>x.replaceAll('册封两日后','两日后').replaceAll('含章来交回','含章来交回'));return a;};}
  }

  // ===== 第10章：给刺杀补最后触发；蘅嫔不再说谜语；删未来剧透 =====
  {
    const ch=C('刃落宫门');
    (ch?.steps||[]).forEach(st=>{mapText(st,x=>x.replaceAll('待封','含章'));(st.choices||[]).forEach(c=>{if(typeof c.label==='string')c.label=c.label.replaceAll('待封','含章');mapResult(c,x=>x.replaceAll('待封','含章'));});});
    const feast=S(ch,'重阳宴散');
    if(feast){const old=feast.text;feast.text=s=>{const a=textValue({text:old},s);a.splice(Math.max(0,a.length-1),0,`她走到门口，又像忽然想起什么似的回头问我：“陛下还记得《承露录》第一页写的什么吗？”`,`我没有答上来。她看了我一会儿，只笑：“没什么。臣妾随口问问。”`);return a;};}
    const mother=S(ch,'二十三日以后');
    if(mother){mother.text=s=>[
      `昭氏死后二十三日，蘅嫔仍每天起身、梳头、请安。她烧掉御前换值、太医院名册和旧人地址，也给蘅地送出最后一封家书：“往后各自过日子，不必等宫里。”`,
      `她来见我时没有再带任何名册，只把那支旧银簪放在桌上。`,
      `“我进宫的时候只想保住两个女儿。”她说，“现在一个死了，一个已经不需要我替她做主。”`,
      `她停了一会儿：“臣妾也不知道还留在这里做什么。”`,
      `这一次要决定的，不是谁输谁赢，而是她往后还要不要继续以蘅嫔的身份住在宫里。`
    ];}
    const last=S(ch,'伤口愈合得比疑心快');
    if(last){last.text=s=>[
      `能重新坐到御案前时，我右肋仍不能久直。裴景和把当天值簿放在左边，含章的口供放在右边。以前同一件事我通常只留一份最完整的；那天我让他两份都留下。`,
      `“以后凡御前口谕、药物、宫门出入，同一件事若有两处记录，都送来。”`,
      `裴景和问：“若两份写得不一样？”`,
      `“先别替朕抄成一样。先看为什么不一样。”`,
      `那以后御案上常同时摊着两份写着同一天的纸。有时完全相同，有时差一个时辰。差异本身不等于有人有罪，却至少不再被提前抹平。`
    ];}
  }

  // ===== 第14—16章：清占位称谓；删掉下一幕剧透 =====
  {
    const c14=C('空宫点灯');
    mapText(S(c14,'射圃里多了一张新弓'),x=>x.replaceAll('待选','霍素英'));
    const g=S(c14,'贡造单第一次不只写一家');
    if(g){mapText(g,x=>x.replaceAll('待选','崔静仪'));(g.choices||[]).forEach(c=>mapResult(c,x=>x.replaceAll('待选','崔静仪')));}
    const c15=C('窗开半扇');
    (c15?.steps||[]).forEach(st=>mapText(st,x=>x.replaceAll('待选','张元照')));
    const c16=C('荷风满座');
    (c16?.steps||[]).forEach(st=>{mapText(st,x=>x.replaceAll('待选秀女','张元照').replaceAll('待选','张元照'));(st.choices||[]).forEach(c=>mapResult(c,x=>x.replaceAll('待选秀女','张元照').replaceAll('待选','张元照')));});
    const first=S(c16,'请安散后');
    if(first)mapText(first,x=>x.replace('宋文秀没理她，三天后还是把表并了。再后来冰库出了事，她才把旧表重新翻出来。','宋文秀没理她，三天后还是把表并了。'));
  }

  // ===== 第17章：疫病篇去说明书化，并把33幕收成更清楚的主线 =====
  {
    const ch=C('凤仪宫最后一冬');
    if(ch?.steps?.length){
      (ch.steps||[]).forEach(st=>mapText(st,x=>x.replaceAll('待选','张元照').replaceAll('待封','含章')));
      const policy=S(ch,'张元照要的不是药方');
      if(policy)mapText(policy,x=>x.replace('顾明宜把三张纸按在掌下：“先照这个查三日。”','顾明宜把三张纸按在掌下。').replace('“先照这个查三日。”顾明宜说完停了一息。','“先照这个查三日。”顾明宜说。'));
      const hand=S(ch,'阿芙把“送到”');
      if(hand?.choices?.[0])mergeFlags(hand.choices[0],{v59FangRuleUsedInEpidemic:true,v68DoubleBookFourSign:true,v56ShenZhangEpidemicSeed:true,v49NoPenaltyReporting:true,v49DoubleLedger:true,v63DoubleSign:true});
      if(hand){hand.text=s=>[
        `病院刚开第三日，张元照把送药表贴在太医院外墙。上面写着时辰、药名、病院，最后一栏只有“已送到”。`,
        `阿芙看完直接把那三个字划掉：“听雨轩那时候也总写‘已送到’。可最后谁递给谁，没人记。”`,
        `她在下面添了“交出者、接收者”。含章又补了一栏“改动人”，要求改过的旧字也留下。`,
        `张元照没有把它做成所有宫务都要填的表。她们只先用在转院、送药、换值三件最容易把人弄丢的事上。两份册子分开放，若写得不一样，先查差在哪里，不先逼两边抄成一样。`
      ];}
      const noBlame=S(ch,'第一张告示');
      if(noBlame)noBlame.text=s=>[
        `临时牌下来以后，张元照第一张贴出去的不是病院图，而是一张很短的告示：发热、咳嗽、乏力先报；主动报病，不扣当月例，也不按误值处罚。`,
        `顾明宜问：“为什么把不追责写在最上面？”`,
        `“因为会怕。”张元照说，“人若知道一开口先挨罚，下一次只会先学会闭嘴。”`,
        `沈知微又补了一句：“已经发热还故意瞒着、继续串门的另算。”`
      ];
      const city=S(ch,'城南 · 药铺');
      if(city?.choices?.[0])mergeFlags(city.choices[0],{v56OutsideTwoReports:true});
      if(city){city.heading='城南 · 药和米都开始变贵';city.text=s=>[
        `宫里忙着封院时，城南药铺也在一天三次改价。掌柜说北路断货，账面没假，后院却还压着上月进的旧药。穷人开始把一帖药煎两遍，先给老人，再添水给孩子。`,
        `京兆府同时下令平价卖米。牌子上的价没有变，米行却换了底更厚的木升。月底一份奏报写“京师米价平稳”，另一份巡城折子写“四门外已有饿死者”。`,
        `两份纸都是真的。问题只是第一份先被送到了御案上。`
      ];}
      const work=S(ch,'第一次选秀留下的人');
      if(work?.choices?.[0])mergeFlags(work.choices[0],{v59SecondBatchEpidemicRoles:true,v46IsolationCostShown:true});
      if(work)work.text=s=>[
        `病院从一处变成三处以后，谁也没有只按位分站着。低位宫嫔有人守路、有人抄名、有人算炭；第二批新人也被推到送水、布巾、名牌这些最具体的差事上。`,
        `梁素贞把抬水的人拆成两班，宋文秀不再只走一条仓路，许淑惠发现一块名牌挂错了床。没人因为这些事突然变成英雄，只是忙起来以后，谁能做什么很快便看得出来。`,
        `最难的仍是隔开想见的人。一个发热乳母隔着两道门听见孩子哭了一下午。张元照没有放她回去，只让人把孩子常抱的布偶烫过、晒干，再送进去。第二日顾明宜只说：“规矩若要人守，先别把守规矩的人累死。”`
      ];
      const xu=S(ch,'许淑惠被一张改过的牌子');
      if(xu?.choices?.[0])mergeFlags(xu.choices[0],{v46MarkEpidemicDead:true,v67XuNameplateSafe:true});
      const loss=S(ch,'同一夜 · 玉牒');
      if(loss?.choices?.[0])mergeFlags(loss.choices[0],{v46ChildrenDied:true});
      const death=S(ch,'十月二十三，凤仪宫灯灭');
      if(death?.choices?.[0])mergeFlags(death.choices[0],{v60UncrossedBox:true});
      // 只删掉重复解释型节点；重要选择和人物后果全部保留。
      const removeHeads=['八月初六 · 新规第一次不是为了死人被翻出来','八月二十二 · 四个空格终于有了名字','城南 · 米行 · “平价”第四天','一盏亮一点的灯','秋疫第三日 · 永和宫先发现“没人敢说自己病了”','秋疫第五日 · 太医院廊下的一处刮痕','九月初 · 水车在西夹道停了半刻','帘子两边','九月初四，名牌没有送错家','还是有人没有熬过去','同日夜 · 她没有划掉最后一格'];
      ch.steps=ch.steps.filter(st=>!removeHeads.includes(st.heading));
      ch.theme='疫病逼所有人把最具体的事先做完；顾明宜也在这个冬天第一次不得不把手里的东西交出去。';
    }
  }

  // ===== 第18章：大封仍逐人决定，但不再像八份履历；前朝“派系图”改成人话 =====
  {
    const ch=C('雪尽宫门');
    const names=['邵明贞','沈知微','闻人含章','周清漪','霍素英','崔静仪','张元照','王静娴'];
    names.forEach((n,i)=>{const st=S(ch,`${n}的册页`);if(st)st.heading=`大封 ${i+1}/8 · ${n}`;});
    const map=S(ch,'红旨未干，纸外先起了风');
    if(map)map.text=s=>[
      `大封第五日，裴景和拿来一张没有落款的薄纸。前朝有人把六宫几个人的名字写在礼部、北营、江南贡造、东南水师旁边，像替她们各自圈好了“是哪一家的人”。`,
      `邵明贞旁边写着邵氏与礼部；霍素英旁边写北营；梁素贞明明来自东南水师，也被草草圈进“军门”；张元照旁边则写着疫册和新法。`,
      `裴景和问：“要查是谁画的吗？”`,
      `我把纸折回去：“画这张的人可以查，外头怎么想却查不掉。”`,
      `第二日梁素贞听见有人把她和霍家并称，只问了一句：“他们连北营和东南水师都懒得分？”霍素英在旁边笑了一声。`,
      `太后看见自己侄女旁边那一圈，只道：“他们倒替哀家认了不少亲戚。”当天一名邵氏远亲递来的请托牌被慈宁宫原封退回，封皮只有两个字：“不见。”`
    ];
  }

  // ===== 第19章：凤座从第一幕就“空着”；旧子线只轻埋，不提前掀底 =====
  {
    const ch=C('凤座无人');
    const gap=S(ch,'没有接收人的孩子');
    if(gap){gap.heading='二月初三 · 阿芙在旧簿里看见一处空白交接';gap.text=s=>[
      `大封后整理旧册，阿芙把承熙元年至十年那些“已毕”“已送”“已交”的回执单独挑出来。翻到承熙元年二月，她看见一页西华门交接：交出人有名字，接收一栏却是空的。`,
      `纸边的事由被旧墨压得很重，只能看出这件事当年被写成“已毕”。`,
      `张元照没有替那一格补人名，只写：“不知道，另封存。”`,
      `阿芙问要不要继续追。张元照摇头：“现在只有一个空格。先别拿猜的东西填进去。”`,
      `那页旧纸被单独封进匣底。没有人因此立刻翻案，也没有人再把空白写成已经查清。`
    ];}
    const dinner=S(ch,'第一场家宴');
    if(dinner){const old=dinner.text;dinner.text=s=>{const a=textValue({text:old},s);a.splice(1,0,`尚膳局送来的座次单末尾仍印着“中宫核准”。那一栏空着，没人能替顾明宜签。`);return a;};}
    const reluct=S(ch,'她站在凤仪宫门外');
    if(reluct){const old=reluct.text;reluct.text=s=>{const a=textValue({text:old},s);a.push(`几日后又有人只答“随便”。张元照没有替她填“愿”或“不愿”，只在册页旁记下两日后再问。`);return a;};}
    const extra=S(ch,'回答“随便”');
    if(extra)ch.steps=ch.steps.filter(st=>st!==extra);
    ch.theme='顾明宜不在以后，宫里少的不只是一个人，还有过去由她最后签字的位置。';
  }

  // ===== 其余全局易读清理：最终显示层只做明确占位词修正，不改历史称谓 =====
  const targeted=['御前终选','宫灯渐繁','香尽胎寒','灯下旧局','刃落宫门','旧茶未凉','听雨轩有喜','王府旧笼','空宫点灯','窗开半扇','荷风满座','凤仪宫最后一冬','雪尽宫门','凤座无人'];
  targeted.forEach(t=>{const ch=C(t);(ch?.steps||[]).forEach(st=>{(st.choices||[]).forEach(c=>{if(typeof c.hint==='string')c.hint=c.hint.replaceAll('规则原则','做法');});});});

  document.documentElement.dataset.build='v130';
  document.title='宫灯未眠 · 全篇综合整理 v130';
}catch(e){console.error('v130 comprehensive integration failed',e)}})();
