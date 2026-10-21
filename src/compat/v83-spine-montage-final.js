(()=>{try{
  document.documentElement.dataset.build='v83';
  document.title='宫灯未眠 · 走马灯与双主控收束 v83';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const IX=(ch,q)=>ch?.steps?.findIndex(x=>String(x.heading||'').includes(q))??-1;
  const ST=(ch,q)=>ch?.steps?.find(x=>String(x.heading||'').includes(q));
  const A=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_){return []}};

  // A. Canonical reading order. Preserve the current chapter by title when old saves are reloaded.
  const currentTitle=CHAPTERS[state.index]?.title||'';
  const order=[
    '宫门初定','拾遗阁开门','一碟杏仁酥','灯下弈','母至','御前终选','宫灯渐繁','香尽胎寒','灯下旧局','刃落宫门','旧茶未凉','听雨轩有喜',
    '王府旧笼','空宫点灯','窗开半扇','荷风满座','凤仪宫最后一冬','雪尽宫门','凤座无人','极西来客','长夜未央','长枝渐高','中宫空悬','帘后朱笔','西华门外','万家灯火'
  ];
  const p=new Map(order.map((x,i)=>[x,i]));
  const tagged=CHAPTERS.map((c,i)=>({c,i}));
  tagged.sort((a,b)=>{
    const pa=p.has(a.c.title)?p.get(a.c.title):1000+a.i;
    const pb=p.has(b.c.title)?p.get(b.c.title):1000+b.i;
    return pa-pb || a.i-b.i;
  });
  CHAPTERS.splice(0,CHAPTERS.length,...tagged.map(x=>x.c));
  if(currentTitle){const ni=CHAPTERS.findIndex(x=>x.title===currentTitle);if(ni>=0)state.index=ni;}
  // Recalculate late introductions after final ordering.
  for(const k of ['zhangyuanzhao','daila'])if(PEOPLE?.[k]){
    const t=k==='zhangyuanzhao'?'王府旧笼':'极西来客';const i=CHAPTERS.findIndex(x=>x.title===t);if(i>=0)PEOPLE[k].introducedAt=i;
  }

  // B. Zhang's modern consciousness is made concrete after her origin reveal: not "turn the dynasty modern", but choices she can name.
  const vacancy=CH('中宫空悬');
  if(vacancy&&!vacancy.steps.some(x=>x?.v83id==='zhang-not-copy-future')){
    let at=IX(vacancy,'最大的秘密说完以后'); if(at<0)at=IX(vacancy,'臣妾不是从哪个州府来的'); if(at<0)at=Math.max(0,vacancy.steps.length-2);
    vacancy.steps.splice(at+1,0,{v83id:'zhang-not-copy-future',heading:'第二日 · “你想把这里变成你来的地方么？”',cast:['emperor','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
      `第二日我把她留下，没有再问她前世叫什么城、坐什么车。那些东西离这里太远。`,
      `我问：“你总改旧例。你想把大晟变成你来的地方？”`,
      `张元照摇头：“变不了，也没必要。”`,
      `“你不是总说后世有更好的办法？”`,
      `“有些有。有些一样糟。”她想了一会儿，“臣妾来的地方也有人怕担责，也有人明知道错了还把话写得很好看。”`,
      `“那你到底想改什么？”`,
      `张元照没有立刻答。过了一会儿，她说：“臣妾不知道大晟最后会变成什么样。”`,
      `“不知道还敢改？”`,
      `“臣妾只是见过别的活法。”她抬起眼，“所以每逢有人告诉臣妾‘向来如此，只能如此’，臣妾就总想多问一句——真的只能这样么？”`,
      `“若你问错了？”`,
      `“那就认错，再改。”`,
      `“若改了，还是有人死？”`,
      `她安静了一会儿：“那也不能拿‘总有人救不下来’当成什么都不碰的理由。”`,
      `我问：“你前世那些大机器、大医院、大城，一个也带不来？”`,
      `“一个也带不来。臣妾连一支针都没带来。”`,
      `“那你凭什么总觉得还能换一种做法？”`,
      `“因为臣妾见过‘还能有别的办法’这件事本身。”`,
      `我把案上的一张空纸推给她。她看了看，没有写什么天下大计，只把今日卡住的那件事重新写了一遍。`
    ],choices:[{label:'先改眼前这三行',effects:{trust:{zhangyuanzhao:3},flags:{v83ZhangModernLifeNamed:true}},result:'那张纸后来没有装进密匣，只进了当月宫务册。'}]});
  }

  // C. Emperor's final montage: objects and sounds bring the whole reign back before the last private conversation with Zhang.
  const end=CH('万家灯火');
  if(end&&!end.steps.some(x=>x?.v83id==='emperor-life-montage')){
    let at=IX(end,'冬至后第三夜'); if(at<0)at=Math.max(1,end.steps.length-4);
    end.steps.splice(at,0,{v83id:'emperor-life-montage',heading:'承熙二十二年冬至后第二夜 · 灯影里的人一个个回来',cast:['emperor'],fx:'candle',narrative:true,text:s=>{
      const low=[];
      const have=k=>(s.flags?.lowConsorts||[]).includes(k)&&s.flags?.v46LowVictim!==k;
      if(have('cao2'))low.push('何超英摊开手掌，在乱成一团的宫道里重新指路');
      if(have('zhao2'))low.push('王静娴先看人的手，再听那个人嘴里说什么');
      if(have('lin2'))low.push('林淑贞把太医争了半天的话翻成一句谁都听得懂的意思');
      if(have('ye2'))low.push('陈婉仪把墨吹了三遍，写歪以后终于没有整页撕掉');
      if(have('du2'))low.push('张淑华指尖在桌上敲着算盘的节拍');
      if(have('su2'))low.push('刘玉贞抱着孩子，把疫年那支旧曲换成了新调');
      return [
        `这一夜我睡得很浅。灯罩上的影子被炭火一晃，先变成慈宁宫那只沉香手炉。母亲把它放下时，往往是真的生气；最后一次摸到它，却已经凉透。`,
        `再一晃，是顾明宜的手。她把纸角压齐，把鬓发理得一根不乱。凤仪宫里总有一叠她觉得“再核一遍就会更稳妥”的册子。后来白幡垂下来，纸角还是齐的，人不在了。`,
        `周清漪年轻时拿我的绢帕去绑海棠。很多年以后，她把帕子折到第四次，坐在二公主婚帖旁边，一句话也没有说。`,
        `沈知微把茶盖合上。那声音我听了二十多年。旧茶、新茶、顺王、沈家旧案，到最后有些话她仍只在茶盖合上以后才说。`,
        `闻人蘅扶过发间那支素银长簪。抱朴笑得满殿都听得见，越难受反而越响。含章总慢半拍才回答，真正生气时只会把袖口慢慢抚平。`,
        `我又看见方小满低头打一个活结。她说死结伤指甲。阿芙站在旁边嫌她手慢，很多年以后，阿芙自己卷齐袖子，一张张问药是谁送来的、又交给了谁。`,
        `刃光从重阳宴边闪过去。谢绍庭第一个看的永远不是脸，是门、窗和人站的位置。裴景和把御案上的东西重新摆直，然后才说一句我不想听的话。`,
        `邵明贞先纠正一个叫错的封号，再谈正事。霍素英坐下以前总把裙摆往靴边一收。崔静仪越紧张，礼盒上的带子系得越对称。`,
        ...(low.length?[`再往后是一群位分不高、史书未必肯多写的人：${low.join('；')}。秋疫那年，她们不是一串封号，是一双双真正忙过、怕过、活下来的手。`]:[]),
        `梁素贞摸一下弓弦有没有返潮；宋文秀看见三张表就想并成一张；许淑惠站在请安队尾默数步子，最后一次却笑着说这回不数了。`,
        `黛拉把蓝玻璃小鸟塞给孩子，教他们喊“维拉”。御花园里一群皇子女追着风跑，先生在后面喊慢些，没人听。`,
        `顺王右手食指轻轻敲着桌沿。他越说“我是为你好”，声音越温和。张元照九岁以后就是在这样的声音里学会：别人对你好，和别人有权替你活，不是一回事。`,
        `三皇子把朔川点在藩图最远的一角。二公主把婚帖压进箱底。四公主抓过我的袖口，问有一天父皇和母妃都不在了，她怎么办。`,
        `太多门开过，也关过。拾遗阁、听雨轩、凤仪宫、景阳宫、西华门。有人从门里进来，有人终于从门里出去，也有人一辈子没有真正得到过走出去的资格。`,
        `最后那些影子都散了。`,
        `灯下只剩张元照。`,
        `她坐在离床不远的椅子上，纸边还是画着几个小方格。最末一个空着。御案旁那碟蜜枣早被她撤了。`,
        `我忽然想起第一次真正问她“你自己愿不愿意”的时候。那时我不知道，这个从很久以后掉进来的人，会把自己活成承熙朝最后一个还敢同我争的人。`
      ];
    },choices:[{label:'叫她近一点',effects:{bond:{zhangyuanzhao:2},flags:{v83EmperorMontageSeen:true}},result:'我叫了一声“元照”。她立刻抬头，把纸放到一边。'}]});
  }

  // D. Make the first paragraph of Zhang's second-controller reflection concrete: she brought no technology, only remembered ordinary rights and habits.
  const noOne=end&&ST(end,'她第一次没有人可以回头问');
  if(noOne&&!noOne.v83ModernEcho){const old=noOne.text;noOne.text=s=>{
    const xs=A(old,s); if(!s.flags?.v83ZhangModernLifeNamed)return xs;
    const add=[
      `我九岁醒在这里时，最先学会的不是怎么改变谁，而是先看清门在哪里。顺王府的门明明开着，我却不能走；后来进了宫，才发现这里有更多这样的门。`,
      `病院的门有一次关得太死，药差点送不进去；含章住了几十年，想走也走不了；陆既明出生那一夜，连玉牒那扇门都没有进去。`,
      `后来也有几扇门真的开过。女史任满以后有人自己辞了职，婚帖送到皇女手里以前会先问一句本人，阿芙追旧案时终于能从一张纸往前找到另一个名字。`,
      `可方小满没有等到，许淑惠也没有。三皇子最后还是去了最远的朔川。有些规矩换了名字以后，一样会被人拿来害人。`,
      `我没有把大晟变成我来的地方。我也做不到。只是见过门原来可以打开以后，就很难再相信这一堵墙天生没有门。`,
      `桌上的凤印没有因此变轻。`
    ];
    return [...xs.slice(0,3),...add,...xs.slice(3)];
  };noOne.v83ModernEcho=true}

  // E. Chronicle-only spine. This is navigation, not prose inside the story.
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron&&!globalThis.__v83Chron){globalThis.__v83Chron=true;chronicleView=function(){let h=oldChron();const box=`<section class="v83-spine"><span class="eyebrow">全书主线</span><h3>二十二年，最后收成五段</h3><ol><li><b>承熙元年至六年：</b>旧人、旧国与第一次大选。杨叙以为只要看清每个人的位置，就能把后宫安稳地排下去。</li><li><b>七年至十年：</b>行刺、沈氏旧案、方小满之死。旧规则开始反噬，主控第一次发现“证据完整”和“事情是真的”不是一回事。</li><li><b>十年至十二年：</b>张元照离开顺王府、承熙三年入宫、宫中日常、秋疫与顾后之死。一个来自后世的人不再只想活下去，开始试着把自己记得的办法放进这个时代。</li><li><b>十二年至十九年：</b>空后、两次受印、女史、前朝、皇嗣成年、太后大丧与陆既明旧案。张元照得到越来越多权力，也不断碰见“改一条规矩会伤到另一个人”的现实。</li><li><b>二十年至二十二年：</b>杨叙病重、储位落定、承熙朝终。主控去世以后，叙事交到张元照手里；她不替前世复刻一个世界，只决定眼前下一件事要不要继续改。</li></ol></section>`;return h.replace('</main>',box+'</main>')}}

  // F. Clear a few stale meta explanation boxes that survived older patches.
  const metaClass=/(?:v69-warning|v69-time|v55-decree-stage)/;
  for(const ch of (CHAPTERS||[]))for(const st of (ch.steps||[])){
    if(!st?.text||st.__v83scrub)continue;const old=st.text;
    st.text=s=>A(old,s).flatMap(x=>{
      const z=String(x??'');
      if(metaClass.test(z)&&/(主控若|意味着|真正|不是.*而是|本身就是|从这一日以后)/.test(z.replace(/<[^>]+>/g,'')))return [];
      return [x];
    });st.__v83scrub=true;
  }

  // G. Runtime QA markers for final convergence.
  globalThis.V83_QA={
    titles:CHAPTERS.map(x=>x.title),
    duplicateTitles:CHAPTERS.map(x=>x.title).filter((x,i,a)=>a.indexOf(x)!==i),
    canonicalOrder:order,
    missingCanonical:order.filter(x=>!CHAPTERS.some(c=>c.title===x)),
    montageCount:CHAPTERS.flatMap(x=>x.steps||[]).filter(x=>x?.v83id==='emperor-life-montage').length,
    modernDialogueCount:CHAPTERS.flatMap(x=>x.steps||[]).filter(x=>x?.v83id==='zhang-not-copy-future').length
  };
  if(V83_QA.duplicateTitles.length)console.warn('v83 duplicate titles',V83_QA.duplicateTitles);
  if(V83_QA.missingCanonical.length)console.warn('v83 missing canonical chapters',V83_QA.missingCanonical);
  state.flags=state.flags||{};state.flags.v83Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v83 convergence patch failed',e)}})();
