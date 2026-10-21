(()=>{try{
  document.documentElement.dataset.build='v75';
  document.title='宫灯未眠 · 人物情感定义、换后大礼与人生录 v75';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const idx=(c,q)=>c?.steps?.findIndex(x=>String(x.heading||'').includes(q))??-1;
  const addAfter=(c,q,o)=>{if(!c?.steps||c.steps.some(x=>x?.v75id===o.v75id))return;const i=idx(c,q);if(i>=0)c.steps.splice(i+1,0,o);else c.steps.push(o)};
  const esc=x=>String(x??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
  const title=(s,k)=>{try{return (typeof courtTitle==='function'&&courtTitle(s,k))||s.ranks?.[k]||PEOPLE?.[k]?.title||''}catch(_){return PEOPLE?.[k]?.title||''}};
  function shenChild(s){const a=[];for(const [key,v] of Object.entries(typeof CHILDREN!=='undefined'?CHILDREN:{}))if(v&&v.mother==='shen'&&!/薨|早夭|亡/.test(String(v.note||'')))a.push({...v,key});for(const [key,v] of Object.entries(s.flags?.extraHeirs||{}))if(v&&v.mother==='shen'&&v.born&&!v.skipped&&!a.some(x=>x.name===v.name))a.push({...v,key:'extra-'+key});return a[0]||null}
  const childLabel=c=>c?`${c.order||'皇嗣'}${c.name?' '+c.name:''}`:'皇嗣';

  // A. 周清漪是主控少年时第一个真正喜欢过的女子。不是后期临时补一段爱情，而是早期就写清。
  const first=CH('宫门初定');
  addAfter(first,'正月里的人情',{v75id:'zhou-first-love',heading:'山茶枝上还系着一截旧绢',cast:['zhou','emperor'],fx:'snow',narrative:true,text:s=>[
    `御花园那株被风折过的山茶后来活了。周清漪把细竹重新扎紧时，我站在回廊另一头看了一会儿。她没发现我，低头咬住手套一角，腾出手去系那根绳。`,
    `我忽然想起潜邸最初几年。那时我还不是太子，更不是皇帝。东园有一回下急雨，一枝海棠被风折断，她顺手拿走我刚换的绢帕，撕成两条去绑枝子。`,
    `我问她知不知道那是什么料子。她蹲在泥里回头：“花都要断了，殿下还管帕子？”`,
    `那天以后，我有几次办完差事，明明不需要去她院里，还是绕过去坐一会儿。后来才知道，那是我第一次真正喜欢一个女子——不是因为婚书，不是因为母族，也不是因为她能替我做什么。只是想看见她。`,
    `这些年过去，她已经很少在我面前露出当年那种不管不顾的神情。可方才她回头看宫女时，眼睛弯了一下，我还是认得。`,
    `她终于看见我，起身行礼：“陛下站在那里做什么？”`,
    `“看你拿宫里的绳子救花。”`,
    `周清漪低头看了看手里的细绳，笑道：“臣妾如今可不敢再撕陛下的帕子了。”`,
    `我也笑了一下。谁都没有再提潜邸。那段年少时真正喜欢过的日子，并没有因为后来发生的一切就变成假的。`
  ],choices:[{label:'替她扶住那根细竹',effects:{bond:{zhou:2},flags:{v75ZhouFirstLoveKnown:true}},result:'她把绳结系好以后退开一步。山茶枝仍有旧伤，却没有再倒。'}]});

  // B. 元照和主控必须把关系说成人话。三种关系均明确“不是爱情”，但情感重量不同。
  const late=CH('帘后朱笔');
  addAfter(late,'雨声把奏折压得更低',{v75id:'emperor-zhang-define',heading:'雨停以后，她问我到底把她当什么',cast:['emperor','zhangyuanzhao'],fx:'rain',keyDecision:true,text:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
    `那场雨到后半夜才停。西暖阁的窗开着一道缝，湿气把纸边都压软了。沈知微已经回永和宫，裴景和也退到外间，只剩我和张元照对着最后两本折子。`,
    `她忽然合上手边那一本：“陛下，有件事臣妾一直没问。”`,
    `“问。”`,
    `“陛下其实不爱臣妾，对不对？”`,
    `我看了她一会儿：“对。”`,
    `她点头，像只是核对了一件早就知道的事：“臣妾也不爱陛下。”`,
    `“这句你倒说得很痛快。”`,
    `“因为这样才好问下一句。”她把笔搁下，“既然不是爱情，陛下为什么到了最难下决定的时候，总把臣妾叫到这里？”`,
    `这一次我没有拿“皇后”“能臣”“中宫”这些现成的词挡过去。她问的是我们两个到底算什么。`
  ]:[`本局张元照没有受凤印。御前没有走到必须给这段关系命名的地步。`],choices:[
    {label:'“知己。朕没想明白的话，也敢当着你说没想明白。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao',effects:{trust:{zhangyuanzhao:5},bond:{zhangyuanzhao:2},flags:{v75EmperorZhangBond:'confidant'}},result:'我说：“旁人等朕给答案。你会先问朕为什么这么想。朕说错了，你也不会为了让朕舒服改成对的。若一定要叫一个名字，就是知己。”张元照问：“知己能当面说陛下错了？”我道：“不能说错，还叫什么知己。”她这才重新翻开折子。'},
    {label:'“家人。不是爱人，是朕已经习惯不用在你面前装作什么都知道。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao',effects:{trust:{zhangyuanzhao:4},bond:{zhangyuanzhao:4},flags:{v75EmperorZhangBond:'family'}},result:'我说：“朕病的时候，你不会围着哭；朕烦的时候，你也不逼朕说话。朕做错了，你照样会指出来。不是男女之情，只是这些年下来，朕已经把你算进自己家里。”张元照沉默一会儿：“那家人也可以说不？”我答：“可以。不然只是另一种听话的人。”'},
    {label:'“搭档。朕信你能把事情和朕一起做到最后，也信你不会替朕落最后那一笔。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao',effects:{trust:{zhangyuanzhao:5},flags:{v75EmperorZhangBond:'partner'}},result:'我说：“朕需要的不是一个顺着朕的人。朕把没定的事给你看，是因为你敢指出哪里不对，也知道最后决定不是你的。”张元照道：“那臣妾是一起做事的人。”我说：“是。事情做完，你可以回凤仪宫，我也回养心殿。谁都不用装成爱情。”'}
  ]});

  // C. 先邵后张：换后不能只靠一只印匣，要有完整的大礼。旧后必须真正向新后行臣礼。
  if(late){
    const hand=ST(late,'凤印第二次离开凤仪宫');
    if(hand&&!late.steps.some(x=>x?.v75id==='shao-kneels-zhang')){
      const i=late.steps.indexOf(hand);
      late.steps.splice(i+1,0,{v75id:'shao-kneels-zhang',heading:'五月十八 · 景仁宫来行新后的第一场礼',cast:['ning','zhangyuanzhao','emperor','taihou'],fx:'seal',narrative:true,text:s=>s.flags?.v74ZhangSucceeded?[
        `张元照受册后的第二日，凤仪宫第一次正式受六宫朝贺。红毡还是新的，昨夜落过一阵雨，殿门外的石缝里留着一点潮气。`,
        `邵明贞来得最早。她已经换回皇贵妃服色，头上的凤纹少了一层，站在阶下时却仍像过去一年里那个最熟悉这里的人。`,
        `唱礼声落下，她没有等宫女提醒，自己走到殿中，整了整袖口。`,
        `张元照从座上站起来半步。邵明贞抬眼看她：“别扶。”`,
        `殿里一下静得只剩衣料摩擦声。`,
        `邵明贞跪了下去，按皇贵妃朝见新后的礼数叩首。张元照的手指在袖中蜷了一下，没有伸出去。`,
        `“臣妾邵氏，恭请皇后娘娘安。”`,
        `张元照停了两息，才说：“皇贵妃免礼。”`,
        `礼成以后邵明贞自己起身。她走近时声音很低：“这一跪不是说我那一年做错了。”`,
        `“我知道。”`,
        `“也不是说你赢了。”`,
        `“我知道。”`,
        `邵明贞看着她：“以后六宫有人拿我同你比，也有人拿你来解释我。别替我活，也别把我那一年写成你的铺路。”`,
        `张元照把景仁宫昨日送来的短笺从袖中取出来：“我留着。”`,
        `<div class="v75-kneel"><strong>两位皇后第一次真正交接的不是凤印，而是这一跪。</strong>邵明贞把“中宫只有一个”做给所有人看；张元照则必须站着受完，因为此刻退半步也会变成另一种不负责任。</div>`,
        `我坐在侧面的御座上，从头到尾没有开口。是我先立邵氏，也是我后来准她解印、再立张氏。今日这一跪的重量，不能让两个女人替我解释。`
      ]:[`这一条线没有走“先邵后张”的换后路线。`],choices:[{label:'让朝贺照礼继续，不替任何一方说圆场话',requires:s=>!!s.flags?.v74ZhangSucceeded,effects:{trust:{ning:3,zhangyuanzhao:3},flags:{v75ShaoKneelDone:true}},result:'六宫随后依次入殿。所有人都看见邵明贞跪过，也看见张元照没有假意免掉这场必须完成的礼。'}]});
    }
  }

  // D. 沈知微机务案：处分不再只有一个结局。由张元照决定，并让她的性格真正改变。
  const shenDecision=ST(late,'新茶停在两个人中间');
  if(shenDecision&&!shenDecision.v75rewrite){
    shenDecision.heading='雪落永和宫以前，张元照必须亲自写下沈氏的去处';
    shenDecision.text=s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
      `十二份副稿封进御前案卷以后，真正难写的只剩最后一张纸：沈知微怎么办。`,
      `都察院有人请赐死，说后妃私留机务，若只降位，往后谁还怕内外之禁；也有人认为她既奉旨参与拟稿，罪只在私存，不应按泄密论。`,
      `我把两边的折子都看完，没有替张元照圈答案。`,
      `“这件事你来定。”我说。`,
      `她抬头：“陛下真让我定？”`,
      `“她是你带进这套文字的人。边界也是你同她一起越过去的。朕最后会落朱批，但处置先由你写。”`,
      `张元照一夜没回凤仪宫。天亮时，纸仍是空的。她知道无论写哪一条，沈知微都不会再回到从前那个位置。`
    ]:[`这一条线里没有形成张后、和妃共同参与御前文牍的局面。`];
    shenDecision.choices=[
      {label:'张元照写：“赐死。罪名照实，不改作暴病。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao',effects:{trust:{zhangyuanzhao:-2,shen:-5},flags:{v75ShenFate:'death',v66ShenSacrificed:true,v66ZhangCourtScandal:true,v75ZhangAfterShen:'hard'}},result:'旨意落下前，张元照亲自去永和宫。沈知微只问：“写的什么罪？”她答：“私留机务副草，越内外之界。”沈知微点头：“别替我改成病逝。”两个人把最后一壶新茶喝完。张元照走到门口时，沈知微叫她名字；她没有回头，只停了一息。此后凡是不可追回的重罚，张元照都要求自己把原案再看一遍——不是因为她变软，而是她知道一纸决定真的会把一个人从明天里拿走。'},
      {label:'张元照写：“削去御前与宫务之权；若其皇嗣赴封地，准沈氏随子女离京。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'&&!!shenChild(s),effects:{trust:{zhangyuanzhao:2,shen:2},flags:{v75ShenFate:'fief',v66ShenSacrificed:true,v66ZhangCourtScandal:true,v75ZhangAfterShen:'recusal'}},result:s=>{const c=shenChild(s);return `沈知微被削去御前文字与六宫实权，不再入养心殿。${childLabel(c)}赴封地时，她获准同行。离宫那日张元照送到西华门，沈知微看着打开的城门说：“这次门是开着的。”张元照答：“是我让你走的。”沈知微道：“我知道。所以别把它说成成全。”从此张元照在新制度里加了一条很具体的回避办法：事情牵到至亲，可以退出经手，不必非要在亲疏之间证明自己无情。`; }},
      {label:'张元照写：“降位，出宫清修；永不再接触机务。”',requires:s=>s.flags?.v44NewEmpress==='zhangyuanzhao',effects:{trust:{zhangyuanzhao:1,shen:1},flags:{v75ShenFate:'religion',v66ShenSacrificed:true,v66ZhangCourtScandal:true,v75ZhangAfterShen:'leave'}},result:'沈知微离宫去皇家女观。临走前，她把旧茶罐和新茶罐都留在永和宫，只带了两身衣服。张元照送她到观门外。沈知微问：“以后还能来么？”张元照说：“能。但不是以皇后查问你的身份来。”沈知微笑了一下：“那就来喝茶。”这以后张元照设女史任期、退任和辞职制度时，第一次明确写下：退出一个位置，不等于承认自己一无是处。'}
    ];
    shenDecision.v75rewrite=true;
  }

  const redBack=ST(late,'朱笔重新落回我手里');
  if(redBack&&!redBack.v75rewrite){
    redBack.text=s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
      s.flags?.v75ShenFate==='death'?`永和宫封门以后，养心殿明显安静了。张元照写问目时比过去慢，遇到涉及死罪、废籍、终身幽禁的折子，会把原案重新摊开看第二遍。她没有因此变得仁慈，只是不再把“以后还能改”当成理所当然。`:
      s.flags?.v75ShenFate==='fief'?`沈知微随皇嗣离京后，每年只有两封平安折进宫。张元照没有把人叫回来。后来女史院另添一条：亲属涉案，可具名申请换一名复核人。`:
      s.flags?.v75ShenFate==='religion'?`沈知微去女观以后，张元照偶尔出宫看她。两人不再谈未公开的折子。女史院后来第一次允许任满主动退任，不把退出写成失宠或有罪——这一条正是在那年加进去的。`:
      `和妃离开御前以后，事情明显慢了。`,
      `御案重新全压回我这里。第一旬我烦得厉害，第二旬开始重新习惯自己把原折看到最后。`,
      `三个月后，我准张元照回西暖阁。外朝原折不得出养心殿；初稿当日回收；皇后可以列问目、拟议，却不能替御前落朱批。`,
      `她问：“那臣妾还能说陛下这一本看错了么？”`,
      `“能。”`,
      `“能直接说？”`,
      `“你什么时候学会拐弯了？”`,
      `她笑了一下。`,
      `后来很多年，她仍能把一件事逼到我面前重新问一遍。可最后那一笔始终是我的。她没有变回一个只管六宫的皇后，我也没有再把“有人替我看”当成可以不看的理由。`
    ]:[`本局晚年政务没有形成张后长期分折的格局。`];
    redBack.v75rewrite=true;
  }

  // E. 周妃后期只保留最好/最坏两个落点。公开真相的旧“留京”结局并入封邑线。
  const west=CH('西华门外');
  const reveal=ST(west,'他自己把西华门那一夜送到御前');
  if(reveal?.choices){
    for(const c of reveal.choices){
      if(c?.v69Final==='public'){
        c.effects=c.effects||{};c.effects.flags=c.effects.flags||{};c.effects.flags.v69PrincessFate='estate';c.effects.flags.v75PrincessPublicEstate=true;
        c.result='朝廷公开承认陆既明为周氏双生旧子，婚议撤销。二公主不再留在京中供所有人打量，主动请去自己的封邑住几年；她仍保留公主封号，也继续遥领女学与恤孤事务。';
      }
    }
  }
  if(state.flags?.v69PrincessFate==='stay')state.flags.v69PrincessFate='estate';

  const zc=west?.steps?.find(x=>x?.v74ZhouChoice);
  if(zc&&!zc.v75rewrite){
    zc.heading='三月初十 · 她这一次先问女儿要不要她';
    zc.text=s=>s.flags?.v69PrincessFate==='convent'?[
      `二公主已经决定去清修。周清漪第二日又来养心殿，只求跟女儿一起走。`,
      `我让人把话原样送去。傍晚只回来一张很短的纸：<b>“不必来。”</b>`,
      `周清漪看完，折了两次，没有像从前那样折第三次。`,
      `“她不肯见臣妾。”`,
      `“先等一阵。”`,
      `她抬头看我：“陛下到今天还觉得，给一个去处、等一阵，事情就算处理过了。”`,
      `这句话不是赌气。她没有再求，也没有再哭。`
    ]:[
      `二公主决定离京去自己的封邑。周清漪第二日又来养心殿，只求一件事：“若她肯，让臣妾跟她走。”`,
      `我没有替女儿回答，叫人把这句话原样送过去。`,
      `半日以后，二公主回了一句：“可以。分院住。别替我收婚帖，也别替我回答别人问我还嫁不嫁。”`,
      `周清漪把那张纸看了很久：“好。”`,
      `这是她这些年第一次得到一个不需要猜后半句的答案。`
    ];
    zc.choices=[
      {label:'准周妃随二公主去封邑，母女分院居住',requires:s=>s.flags?.v69PrincessFate==='estate',effects:{trust:{zhou:2},flags:{v74ZhouLeavesWithDaughter:true,v74ZhouStayedPunished:false,v75ZhouBest:true}},result:'周妃保妃号，停一切宫权，随二公主离京。她们在封邑分院居住。二公主不必原谅母亲才允许母亲留在同一座城里。'},
      {label:'二公主既不肯见她，周妃留宫停权',requires:s=>s.flags?.v69PrincessFate==='convent',effects:{trust:{zhou:-4},bond:{zhou:-6},flags:{v74ZhouLeavesWithDaughter:false,v74ZhouStayedPunished:true,v75ZhouWorst:true,v75ZhouBreakEmperor:true}},result:'二公主去清修，周清漪仍留绮春宫。她从此只在大礼出席，御前再没有私下召她。她从此只在大礼出席，御前再没有收到她的私人请见牌。'}
    ];
    zc.v75rewrite=true;
  }

  // 周妃两种终局都给完整诀别。最好结局回看少年情谊；最坏结局让旧情真正断掉。
  if(zc&&!west.steps.some(x=>x?.v75id==='zhou-farewell')){
    const i=west.steps.indexOf(zc);west.steps.splice(i+1,0,{v75id:'zhou-farewell',heading:'离宫前后，绮春宫最后一次把旧日翻出来',cast:['zhou','emperor'],fx:'autumn',narrative:true,text:s=>{
      if(s.flags?.v75ZhouBest)return [
        `周清漪离京前一晚来养心殿还宫权印册。她穿得很素，鬓边已经有两三根银丝，眼尾也比潜邸时细了。可她抬眼看人的那一下，我仍认得。`,
        `我忽然提起东园那场雨：“你还欠朕一方帕子。”`,
        `她怔了一下，随后笑了：“陛下记了快二十年？”`,
        `“那是朕第一次喜欢一个人。总要记得久一点。”`,
        `她没有避开这句话，只把手里的印册放下：“臣妾知道。”`,
        `“你那时候知道？”`,
        `“殿下无事总往臣妾院里绕，谁看不出来。”`,
        `两个人都笑了一下。笑完以后，屋里反而安静。`,
        `她一抬眼，我仍认得东园雨里那个周清漪。眼下的细纹和鬓边的白发，却也都是这二十年留下的。`,
        `周清漪也看着我：“陛下鬓边也白了。”`,
        `“你也没年轻到哪里去。”`,
        `“臣妾又没说自己年轻。”`,
        `她起身行礼。这一次我没有说“以后常回宫看看”。她去的是女儿选的地方，不是换一座宫继续等我召。`,
        `走到门边，她回头：“当年那方帕子，臣妾真不记得是什么料子了。”`,
        `我说：“朕也只记得你拿它绑了花。”`];
      if(s.flags?.v75ZhouWorst)return [
        `二公主去清修以后，周清漪仍住绮春宫。她第三日来还宫权印册，脸上没有泪。`,
        `我说：“等孩子缓一缓——”`,
        `“别再替她说以后。”她第一次直接截断我。`,
        `我没有再说。`,
        `她看了我很久：“陛下还记得东园那方帕子么？”`,
        `“记得。”`,
        `“臣妾也记得。那时候臣妾觉得，殿下虽然不爱解释，至少真的会把臣妾放在心里。”`,
        `她顿了一下：“后来那个男婴出了事，臣妾怕；再后来臣妾自己也开始瞒。我们一个下死令，一个把真话咽下去。到最后害的是两个孩子。”`,
        `“清漪——”`,
        `“陛下别这样叫。”`,
        `她把印册放在案上：“臣妾年少时喜欢过陛下。这件事是真的。如今不想再见陛下，也是真的。”`,
        `她行礼离开。以后除大朝礼外，绮春宫再没有主动递过一次请见牌。`];
      return [`周清漪的去留仍待这一局最终选择。`];
    },choices:[{label:'让这场话停在这里',effects:{flags:{v75ZhouFarewellDone:true}},result:'有些几十年的关系，最后不需要再找一句更漂亮的话。'}]});
  }

  // F. 人物来源、主控情感立场、人生录——三层人物录，避免新人来源和关系混在一起。
  function entryBlocks(){return `
  <section class="v75-box"><span class="eyebrow">人物录 · 入宫次序</span><h2>这些人不是同一批进来的</h2><div class="v75-grid">
    <div class="v75-card"><b>潜邸旧人 · 登基以前</b><p>顾明宜、沈知微、周清漪。她们先认识的是还没有坐上御座的杨叙，因此和后来选秀入宫的人天然不同。</p></div>
    <div class="v75-card"><b>承熙元年三月 · 蘅国旧王室</b><p>闻人抱朴、闻人含章因旧国归附进入拾遗阁，之后再册入六宫；闻人蘅在承熙二年二月入京，是否册为蘅嫔由御前决定。</p></div>
    <div class="v75-card"><b>宫女转入后宫 · 方小满</b><p>原是御花园花房宫女。她不是选秀入宫，而是在宫中已经生活、与主控相识以后，明确表示愿意，才从宫女身份进入后宫。</p></div>
    <div class="v75-card"><b>承熙三年二月 · 第一次大选</b><p>邵明贞、霍素英、崔静仪；低位另有六名候选，由御前逐人点名。只有御前实际留牌的人才会进入后宫，未留者不再出现。后期不再另开一批同功能妃嫔。</p></div>
    <div class="v75-card"><b>承熙十一年春 · 第二次采选</b><p>梁素贞、宋文秀、许淑惠在这一年入宫。她们和承熙三年已经入宫的张元照不是同一批。</p></div>
    <div class="v75-card"><b>承熙十二年 · 珂兰盟议</b><p>黛拉是随外交盟议留京的珂兰王族女，不属于常规选秀，也不进入通用侍寝池。后来的许令宜是女史，陆既明来自宫外与前朝，都不是新增妃嫔。</p></div>
  </div></section>`}

  function zhangBondText(s){const v=s.flags?.v75EmperorZhangBond;return v==='family'?'不是爱情。主控明确把她当“家里的人”：累时可以沉默，犯错时仍允许她说不；亲近来自长期共处，而不是床笫。':v==='partner'?'不是爱情。两人把关系定义成搭档：可以把未定的难题摊在同一张桌上，但事情结束以后各自生活，最后决定仍由主控承担。':'不是爱情。若已完成关系定义，主控把她称为知己：他敢当着她承认“朕没想明白”，她也可以当面说他错。'}
  function stanceMap(s){return {
    taihou:'母子。主控会烦她看得太准，却从不怀疑她在关键时刻首先护的是皇室里活着的人；她也是少数能直接问他“你是不是在逃”的长辈。',
    gu:'结发夫妻与长期共事者。不是最炽烈的爱情，却是多年形成的生活依赖和责任信任；她死后，他最先失去的是“总有人替这座宫守着日常”的确定感。',
    shen:s.flags?.v75ShenFate==='death'?'旧日亲近、长期敬重，最后又隔着张元照的选择成为永远不能重来的旧人。主控对她有欠债，也承认她后来爱的人不是自己。':'有旧日亲近，也有沈氏旧案留下的歉疚。后来更多是尊重：他知道沈知微不会再把自己的人生交回一段旧恩宠里。',
    zhou:s.flags?.v75ZhouWorst?'她是主控少年时第一个真正喜欢过的女子，也是晚年与他彻底决裂的旧人。喜欢曾经是真的，决裂也是真的。':s.flags?.v75ZhouBest?'她是主控第一个真正喜欢过的女子。几十年以后爱情早已变成旧亲、亏欠与共同记忆；最好结局里，两个人承认年轻时相爱过，也允许彼此最后走向不同的地方。':'她是杨叙少年时第一个喜欢过的女子。后来有了位分、孩子和多年沉默，两个人再也回不到最初，但那份喜欢确实存在过。',
    wenheng:'尊重多于亲近。主控知道她首先是亡国后的母亲和旧王室女人，不把她的服从误认成爱慕。',
    baopu:'确实被她的热烈吸引过，也享受过被她全力注视；但从未把这种吸引当成可以托付判断的信任。后来更多是警惕、责任和迟来的愧疚。',
    hanzhang:'非情爱。主控信任她，是因为她敢把不利于任何人的证据原样摆出来；救驾以后也没有把这种信任换成侍寝或占有。',
    fang:'真切的喜欢和怜惜，但这种喜欢里曾带着高位者的轻率：他以为护着她就够了。方氏案以后留下的是很具体的愧疚，而不是把她神化成白月光。',
    peiyan:'多年主仆形成的习惯性信任。裴景和知道主控什么时候不想说话，主控也允许他在最难听的时候提醒一句“面要坨了”。',
    xielin:'杨叙信谢绍庭办差。行刺以后尤其如此：别人都慌的时候，谢绍庭仍会先看门、看人、看出口。两人私下并不亲近。',
    afu:'不是私情。主控看她时始终会想起方小满案；后来尊重她，是因为她没有把自己困成遗属，而是重新选了一份差事、又重新选了第二个主子。',
    shunwang:'兄弟与政治对手混在一起。主控承认顺王曾救过人、也曾以“为你好”控制别人；血缘从来没有自动换成信任。',
    zhangyuanzhao:zhangBondText(s),
    ning:s.flags?.v74NingFormerEmpress?'高度尊重，没有强烈男女情爱。她曾完整做过皇后，主控信她能把混乱按住；后来准她解印，是承认她有权决定不再用余生替娘家自证清白。':'尊重与可靠感多于爱情。主控看重的是她敢先给办法、肯担结果，而不是“像不像顾皇后”。',
    ke:'杨叙欣赏霍素英说话直、懂军务，也知道她姓霍，任何恩宠都会被外朝多想。因此两人一直保持分寸。',
    hui:'礼貌、警惕、有限的欣赏。主控承认她能把场面做得漂亮，却始终不肯把崔氏家族网络和她本人完全分开看。',
    zhao2:'轻松的好感。主控喜欢她看得懂场面却不急着邀功，也越来越信她会在真的不对时开口；不是深宠，但相处不累。',
    cao2:'熟悉感来自她记路和肯跑腿；主控对她没有深私情，却知道乱局里她常是最先找到人在哪儿的那个。',
    lin2:'信任她能把听不懂的医话说明白。关系更像长期可靠的宫中熟人，不靠恩宠维系。',
    ye2:'欣赏她在越乱时越能把字写清楚；私人亲近很淡，但她留下的纸常比她的位分更有用。',
    du2:'主控记得她算数快、说话直接。不是宠妃线，杨叙对她没有深私情，但记得她算数快、说话直接。',
    su2:'温和的熟悉。她与孩子、乳母和针线活连得最紧，主控对她的信任来自日常而非政治。',
    liang2:'欣赏她不肯做“第二个霍素英”。主控看她首先是一个有自己专业和脾气的人，其次才是军门之女。',
    song2:'既用她的效率，也防她把效率做成新的垄断。感情很淡，判断很清楚。',
    xu2:'没有发展成深宠，却留下具体惋惜。主控后来记得的不是她的位分，而是她总怕行错礼、熟了以后又很爱笑。',
    daila:'杨叙对黛拉更多是好奇和尊重，也常被她逗笑，并没有男女之情。他至少没有把她当成抱朴的替身，也没有因为她来自珂兰就直接拿她换利益。'
  }}
  function relationSection(s){const m=stanceMap(s);const keys=Object.keys(m).filter(k=>PEOPLE?.[k]&&((PEOPLE[k].introducedAt??0)<=s.index||['taihou','gu','shen','zhou'].includes(k)));return `<section class="v75-box"><span class="eyebrow">人物录 · 御前关系</span><h2>主控对他们到底是什么感情</h2><p>这里不写“好感很高”这种数值，而写关系本身。爱情、旧情、家人、知己、愧疚、职业信任和政治戒心不是同一种东西。</p><div class="v75-grid">${keys.map(k=>`<div class="v75-card"><b>${esc(title(s,k)||PEOPLE[k].title||'')} · ${esc(PEOPLE[k].name)}</b><p>${esc(m[k])}</p></div>`).join('')}</div></section>`}

  function lifeRows(s){const f=s.flags||{},rows=[];const add=(name,meta,text)=>rows.push(`<div class="v75-life"><h4>${esc(name)}</h4><small>${esc(meta)}</small><p>${esc(text)}</p></div>`);
    if(f.guDead)add('顾明宜','潜邸嫡福晋 → 皇后 → 承熙十一年疫中薨','她把“守住秩序”做了一生。她并未在方氏案后突然领悟另一套道理，而是直到最后仍相信漏洞应该靠更细的规矩补上；她的可靠与局限来自同一个地方。');
    if(f.baopuDead||f.baopuPunishment)add('闻人抱朴','蘅国王女 → 昭氏宫嫔 → 行刺案终结','她一生都太需要被选择。失子、母女裂痕与恩宠变化把这种需要越绷越紧，最后在重阳行刺中付出生命。');
    if(f.fangDead)add('方小满','花房宫女 → 后宫宫嫔 → 顺贵人/顺嫔身后追恤',`她不是为了什么大义而死。她只是想把日子过明白，却因为${f.fangInvestigation==='threeDays'?'煎药房无名替班、':'假口谕、换值和'}那碗药一步步走进死局。她死后，阿芙仍活着。`);
    if(f.v70XuMurderProved)add('许淑惠','第二次采选 → 低位宫嫔 → 疫中被改牌送入病区','她的病是真的，进入病区的理由是假的。多年后堂姐许令宜借女史院重查旧疫，她的死亡才从“普通疫亡”里被重新写出来。');
    if(f.v74NingFormerEmpress)add('邵明贞','第一次大选 → 徽妃/皇贵妃 → 皇后 → 皇贵妃','她完整做过一年皇后，并非张元照的过渡。外戚不断借中宫之名敲门；三司证明她本人清白以后，她仍主动解印，因为不愿以后每一个决定都先替自己的姓氏辩白。');
    if(f.v44NewEmpress==='zhangyuanzhao')add('张元照','承熙三年入宫 → 疫务 → 皇后','她能走到中宫，不是因为她比前人更聪明，而是因为遇到没有旧例的事，她敢先拿主意；出了错，也肯留下自己的名字。主控与她的私人关系是'+(f.v75EmperorZhangBond==='family'?'家人':f.v75EmperorZhangBond==='partner'?'搭档':'知己')+'，不是爱情。');
    if(f.v75ShenFate==='death')add('沈知微','潜邸旧人 → 和妃/和贵妃 → 御前掌笔 → 赐死','她因私留机务副草越界，最终由张元照亲自写下死处分。两人的爱情没有被定罪，真正被处罚的是她把不该离开养心殿的文字留在永和宫。');
    if(f.v75ShenFate==='fief')add('沈知微','潜邸旧人 → 和妃/和贵妃 → 御前掌笔 → 随皇嗣离京','她失去御前文字权与六宫实权，后来随自己的孩子赴封地。张元照没有把这条路说成成全：那仍然是一道处分，只是没有把人从世上抹掉。');
    if(f.v75ShenFate==='religion')add('沈知微','潜邸旧人 → 和妃/和贵妃 → 御前掌笔 → 出宫清修','她离开宫廷与机务，但没有被写成病亡或“自请退居”。她与张元照的关系从权力中心退出以后，反而第一次不再需要借官位证明存在。');
    if(f.v75ZhouBest)add('周清漪','潜邸旧人 → 周妃 → 随二公主赴封邑','她是主控第一个真正喜欢过的女子。晚年因隐瞒陆既明线索失去宫权，最终在女儿同意后随二公主离京、分院居住；不是团圆，只是终于有机会把母女关系从宫里重新开始。');
    if(f.v75ZhouWorst)add('周清漪','潜邸旧人 → 周妃 → 留宫停权','二公主清修并拒绝她同行。周清漪留在绮春宫，与主控彻底决裂。年少时的喜欢没有被否认，却也不能抵销他们共同对两个孩子造成的伤害。');
    if(f.v56DailaFate)add('黛拉','珂兰王族女 → 盟议留京 → 自择去留',f.v56DailaFate==='return'?'她最终回珂兰。宫里没有把她写成“第二个昭氏”，她也没有用一段恩宠证明自己存在过。':f.v56DailaFate==='hold'?'她仍以盟议身份暂留京中，既不是普通妃嫔，也没有被写成完全自由的客人。':'她继续留京，但不进入侍寝与争宠轨道。');
    if(f.v69HiddenPrinceRevealed)add('陆既明','承熙元年被“秘处”的双生男婴 → 宫外长大 → 宗室清议 → 复仇者','他活到成年，后来明知二公主是自己的双生亲姐姐，仍接受她私下许婚，用这桩婚议逼皇帝面对十八年前的死令。十九年后，他亲手把自己的血统证据送进御前。');
    if(f.v67AfuTransfer||f.v68AfuWithZhang)add('阿芙','花房/听雨轩宫女 → 尚宫局传簿 → 景阳宫/凤仪宫掌事','方小满死后她没有殉主，也没有变成查案高手。她换了一份差事，又重新选择新的主子；到后期，她已经能当着皇后的面问“这是谁下的令”。');
    return rows.join('')
  }
  function lifeSection(s){const rows=lifeRows(s);return rows?`<section class="v75-box"><span class="eyebrow">人生录</span><h2>已经走到明确结局的人</h2><p>人物志只留一句话；人生录把这个人从哪里来、走过什么、最后去了哪里写清楚。</p>${rows}</section>`:''}

  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople&&!globalThis.__v75People){globalThis.__v75People=true;peopleView=function(){let h=oldPeople();return h.replace('</main>',entryBlocks()+relationSection(state)+lifeSection(state)+'</main>')}}

  // G. 卷终与大事录同步关系和新结局，删掉已经废弃的中间周妃结局。
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron&&!globalThis.__v75Chron){globalThis.__v75Chron=true;chronicleView=function(){let h=oldChron();const f=state.flags||{};
    h=h.replace(/二公主暂时没有离京[^<。]*。?/g,'');
    const rel=f.v75EmperorZhangBond==='family'?'家人（不是爱人）':f.v75EmperorZhangBond==='partner'?'共同办事的搭档':f.v75EmperorZhangBond==='confidant'?'知己':'尚未在御前明确命名';
    const extra=`<section class="v75-box"><span class="eyebrow">御前关系定名</span><h3>张元照与主控</h3><p>${f.v44NewEmpress==='zhangyuanzhao'?`两人明确承认彼此没有男女之爱。两人后来把这段关系说成：<b>${rel}</b>。这份亲近允许张元照说“不”，却不允许她替皇帝落最后的朱批。`:'张元照没有受凤印，这段关系没有走到必须正式命名的程度。'}</p></section>`;
    return h.replace('</main>',extra+'</main>')};}

  const oldEnd=typeof ending==='function'?ending:null;
  if(oldEnd&&!globalThis.__v75End){globalThis.__v75End=true;ending=function(){let h=oldEnd();const f=state.flags||{};
    h=h.replace(/二公主暂时留在京中[^。]*。/g,'');
    if(f.v75ShenFate==='death')h=h.replace(/沈知微[^<]*?留下。/g,'沈知微最终因私留机务副草被张元照亲笔处分赐死。她们的感情不是罪名，但张元照没有为最亲近的人另造一条例外。');
    return h;};}

  // 老存档迁移：取消周妃“京郊半年”中间结局。
  state.flags=state.flags||{};
  if(state.flags.v69PrincessFate==='stay')state.flags.v69PrincessFate='estate';
  if(state.flags.v74ZhouLeavesWithDaughter&&state.flags.v69PrincessFate==='convent'){state.flags.v74ZhouLeavesWithDaughter=false;state.flags.v74ZhouStayedPunished=true;state.flags.v75ZhouWorst=true;state.flags.v75ZhouBreakEmperor=true;}
  state.flags.v75Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v75 patch failed',e)}})();
