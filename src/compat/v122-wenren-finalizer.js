(()=>{try{
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const ARR=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const repl=[
    ['一扇独立的宫门给了她体面，也把母女之间原本就不均匀的距离照得更清楚。','她有了自己的住处，去见两个女儿要多走一段路，也不必再日日挤在同一个院子里。'],
    ['宫里的人渐渐不再每次都先想到“亡国王后”四个字。可身份不会因为没人提便消失。她自己知道，我也知道。','后来宫里很少再当面提她曾是蘅国王后。没人提，不代表这件事不存在；她自己从没忘。'],
    ['那一年之后，蘅嫔与两个女儿的关系看起来比刚入宫时近了许多。','那一年以后，她和两个女儿见得更多了。'],
    ['宫宴座次没有旧例可套。她如今在六宫册上是嫔位，却又曾是一国之母。皇后把三份旧例并排铺开，看了许久。皇后把三份旧例并排铺开，看了许久也没敢擅改。','宫宴座次没有现成例子。她如今是嫔位，又曾是一国王后。皇后翻了几份旧册，还是拿着座次图去问太后。'],
    ['大家都听清了这个新称呼。','殿里的人都听清了“蘅嫔”两个字。'],
    ['那个称呼真的落地了。','殿里的人都听清了“蘅嫔”两个字。'],
    ['旧后以客礼入宫可以是一时，若长期留下，就不能一直靠一把“多出来的椅子”过日子。','旧后按客礼住七日可以；若长期留宫，礼部就得把她的身份、月例和请安次序写清。']
  ];
  const clean=x=>{let z=String(x??'');for(const [a,b] of repl)z=z.replaceAll(a,b);return z};
  function cleanScene(st){
    if(!st)return;
    if(st.text&&!st.__v122FinalClean){const o=st.text;st.text=s=>ARR(o,s).map(clean);st.__v122FinalClean=true}
    for(const c of st.choices||[]){
      if(typeof c.hint==='string')c.hint=clean(c.hint);
      if(typeof c.result==='string')c.result=clean(c.result);
    }
  }
  function applyFinal(){
    const mother=CH('母至');
    const arrival=ST(mother,'宫门打开');
    if(arrival){arrival.text=s=>[
      `旧后进宫那天没有下雪。她穿着旧国式高领深衣，发间只有一支素银长簪，比礼部旧画像里瘦了许多。`,
      `皇后原本收到三套迎见仪注，看过以后只说：“今日她是来见女儿，不是来受审。”于是减了仪仗，仍按客礼入宫。`,
      `${courtTitle(s,'baopu')}远远迎出来，前几步走得很快，快到母亲面前时反而慢下来。`,
      `闻人蘅先看她的脸，又看她发间的银簪，抬手扶正：“还是戴得歪。”`,
      `${courtTitle(s,'baopu')}笑了：“宫里没人敢这么说我。”`,
      `${courtTitle(s,'hanzhang')}站在廊下，没有立刻上前。闻人蘅看过去：“你也瘦了。”`,
      `${courtTitle(s,'hanzhang')}行礼：“母亲。”`,
      `闻人蘅没有抱她，只碰了一下她的肩：“一路还好吗？”`,
      `“还好。”`,
      `“颈上的伤呢？”`,
      `${courtTitle(s,'hanzhang')}顿了顿：“早好了。”`,
      `闻人蘅点头，没有再问。三个人就这样进了屋。没人哭，也没人说久别重逢该说的话。`
    ]}

    const silver=ST(mother,'银簪落在茶盏旁');
    if(silver){silver.text=s=>[
      `闻人蘅入宫后的第三日晚膳，拾遗阁早早关了门。桌上只有三碗面、一碟腌菜。`,
      `${courtTitle(s,'baopu')}先开口：“母亲别回驿馆了。住在这里，至少我们有事还能照应。”`,
      `${courtTitle(s,'hanzhang')}看她一眼：“你是想陪母亲，还是想让母亲留在宫里替我们撑腰？”`,
      `“都有。”${courtTitle(s,'baopu')}把筷子搁下，“我就是怕她一走，又出什么事。”`,
      `${courtTitle(s,'hanzhang')}道：“怕也不能替母亲决定。”`,
      `${courtTitle(s,'baopu')}立刻回她：“你每次都说让别人自己决定。你以为什么都不争，就没人能拿你怎么样？”`,
      `“我没这么说。”`,
      `“你就是这个意思。”`,
      `闻人蘅把银簪摘下来，放到茶盏旁：“够了。”`,
      `她先看抱朴：“你想留我，就说你舍不得，别把‘为了大家安全’全压在我身上。”`,
      `又看含章：“你不想替别人作主，这很好。但也别把话说得像你从来不怕。”`,
      `${courtTitle(s,'hanzhang')}沉默了一会儿：“我也怕。”`,
      `闻人蘅点头：“我以前做王后，也总觉得自己多算一步，就能替你们少吃一点亏。很多时候我算对了，也有时候我把你们管得太死。”`,
      `${courtTitle(s,'baopu')}低声问：“那母亲到底想不想留下？”`,
      `闻人蘅重新把银簪插好：“这件事让我自己想。七日到了，我亲口告诉你们。”`,
      `后面三个人都没再吵。面凉了大半，还是各自吃了几口。`
    ]}

    const plum=ST(mother,'两位母亲看梅');
    if(plum){plum.text=s=>[
      `第六日，太后邀闻人蘅去慈宁宫看梅。白梅只开了半树，廊下摆着两只手炉。`,
      `我到时，她们没有谈蘅国。太后正在说我小时候最怕喝苦药，闻人蘅便说${courtTitle(s,'baopu')}三岁时把一整盒胭脂倒进水盆，手红了两天。`,
      `太后看见我，笑道：“皇帝来了，哀家不说你的旧事了。”`,
      `闻人蘅也笑：“原来陛下小时候也会躲药。”`,
      `太后道：“小孩子只知道苦不苦、疼不疼，哪懂什么身份。”`,
      `她看我一眼：“长大以后，才天天有人提醒你该怎么坐、该怎么说。”`,
      `闻人蘅道：“做王后久了也是这样。先想别人会怎么看，再想自己想说什么。”`,
      `太后问：“累不累？”`,
      `闻人蘅停了一会儿：“以前没空觉得累。现在有空了。”`,
      `后面两人又说起女儿怕冷、谁小时候挑食，我没有再听。`
    ]}

    const reg=ST(mother,'顾明宜把两份仪注都留了空')||ST(mother,'册页上那一行');
    if(reg){reg.text=s=>[
      `第七日傍晚，皇后把两份仪注送到养心殿。一份让闻人蘅继续按客礼留宫，一份把她册入六宫。`,
      `我问：“你觉得哪一份合适？”`,
      `皇后道：“都能办，但后果不同。按客礼，她往后请安、月例、住处都得一件件另定；入六宫，就得按嫔妃的规矩来。”`,
      `“没有旧例？”`,
      `“没有。”皇后答得很快，“所以臣妾没有替陛下选。”`,
      `闻人蘅坐在下首，这时才开口：“臣妾若留下，只求把规矩一次说清。以后该怎么行礼、领多少月例、能不能见女儿，都照明文办。”`,
      `她抬手碰了一下银簪：“还有这支簪。若不能留，也请今日直说。”`,
      `我问礼官。礼官答，礼服要按宫制，私下常服和旧簪可由御前另准。`,
      `皇后没有再说话，只把两份仪注一起推到我面前。`
    ]}

    const aud=ST(mother,'第一次以蘅嫔请安');
    if(aud){aud.text=s=>[
      `第二日一早，闻人蘅第一次以蘅嫔身份去凤仪宫请安。昨日还是客礼，今日已经换成嫔位礼数。`,
      `宫人唱“蘅嫔到”，殿里静了一瞬，随后照常起身、落座。`,
      `她走到皇后面前，礼数没有错。皇后叫起，让人添椅。`,
      `宫女奉茶，她一直没碰。皇后问：“喝不惯？”`,
      `蘅嫔道：“不是。只是还没习惯别人这样叫臣妾。”`,
      `皇后点头：“慢慢来。茶凉了就换。”`,
      `散席时皇后拿出三处住处的图：“向阳的冬天暖，背风的夏天凉。你要住很久，自己选。”`,
      `蘅嫔原本说“都可”，听完又低头看了一遍：“向阳。”`,
      `皇后让尚宫记下。蘅嫔看着那两个字，没有改口。`
    ]}

    const summon=ST(mother,'宣召夜');
    if(summon){summon.text=s=>[
      `蘅嫔册入六宫后的第三夜，裴景和把牌匣放到案边。我看完折子，道：“传蘅嫔。”`,
      s.flags.hengKeepsOldTrace?`她来时仍穿旧国高领深衣，只去了王后金饰，发间留着那支素银簪。`:`她已经换上大晟嫔服，旧银簪也没戴，只在领口内侧缝着一小条旧衣料。`,
      `她行礼后一直站着。我道：“坐。”`,
      `她答：“臣妾站着就好。”`,
      `我问：“还不习惯？”`,
      `“臣妾七日前还是蘅国旧后，三日前成了蘅嫔。没那么快。”`,
      `我让宫人都退下：“今晚既然来了，有话直说。”`,
      `她沉默一会儿：“臣妾知道入了六宫，就要按六宫规矩过日子。臣妾只求陛下一件事。”`,
      `“说。”`,
      `“抱朴和含章以后犯什么错，就按她们自己的事处置。不要因为臣妾曾是蘅国王后，就多疑她们一层，也不要因为臣妾如今是嫔妃，就替她们遮一层。”`,
      `我道：“朕记下。”`,
      `她胸前还戴着一枚旧国玉饰。我问：“这个按宫规也不能戴。”`,
      `她低头看了一眼：“臣妾知道。只是一直没舍得摘。”`,
      `“那就先放这里。”我让她自己取下，放在御案上。`,
      `天快亮时，她整理好衣领，行礼告退。第二日，她让人取来铜盆，把最后一套旧后礼服烧了。宫女问为何，她只说：“既然留下，就照现在的身份过日子。”`,
      `那枚玉没有送回去，一直留在御案角落。`
    ]}

    const nd=ST(mother,'第二日没有人问');
    if(nd){nd.text=s=>[
      `第二日请安，蘅嫔来得准时。她换了大晟嫔位的衣色，${s.flags.hengKeepsOldTrace?'旧银簪仍在':'发间换成宫制素簪'}，袖口没有旧国纹样。`,
      `没人当面问昨夜。宫里都知道她已经按嫔妃例入了起居注，也知道这种事没必要在请安殿拿来议论。`,
      `${courtTitle(s,'baopu')}比平日安静，只把茶往母亲手边推近一点。`,
      `${courtTitle(s,'hanzhang')}散席后在廊下等她。两人走出一段，含章先问：“昨晚睡了吗？”`,
      `蘅嫔道：“睡了。”`,
      `“骗人。”`,
      `蘅嫔看她一眼：“那你还问。”`,
      `${courtTitle(s,'hanzhang')}没再追问，只替她把披风拢紧一点。`,
      `午后旧后礼服烧完，裴景和来回话。我问御案上的玉饰，他说还在。`,
      `尚宫局后来问过一次要不要收走，我说不用。此后便没人再问。`
    ]}

    const chair=ST(mother,'多出来的一把椅子');
    if(chair&&!chair.__v122ChairRewrite){const old=chair.text;chair.text=s=>ARR(old,s).map(clean).filter((x,i,a)=>x!==a[i-1]);chair.__v122ChairRewrite=true}

    for(const ch of (CHAPTERS||[]).slice(0,5)){
      if(typeof ch.bridge==='string')ch.bridge=clean(ch.bridge);
      for(const st of ch.steps||[])cleanScene(st);
    }
    document.documentElement.dataset.build='v122';
    document.title='宫灯未眠 · 前五章闻人线对白重写 v122';
  }
  applyFinal();
  const sv0=typeof storyView==='function'?storyView:null;
  if(sv0&&!globalThis.__v122FinalStory){globalThis.__v122FinalStory=true;storyView=function(){applyFinal();return sv0.apply(this,arguments)}}
  const r0=typeof render==='function'?render:null;
  if(r0&&!globalThis.__v122FinalRender){globalThis.__v122FinalRender=true;render=function(){applyFinal();const x=r0.apply(this,arguments);applyFinal();return x}}
  try{render()}catch(e){console.error('v122 final render',e)}
}catch(e){console.error('v122 finalizer failed',e)}})();
