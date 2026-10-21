(()=>{try{
  document.title='宫灯未眠 · 帘后朱笔、珂兰疫路与大封全名册 v66';
  document.documentElement.dataset.build='v66';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const ST=(ch,needle)=>ch?.steps?.find(x=>(x.heading||'').includes(needle));
  const A=(v,s)=>{try{return typeof v==='function'?v(s):Array.isArray(v)?v:[v]}catch(_e){return[]}};
  const insAfter=(ch,needle,obj)=>{if(!ch||ch.steps?.some(x=>x.v66id===obj.v66id))return;const i=ch.steps.findIndex(x=>(x.heading||'').includes(needle));if(i>=0)ch.steps.splice(i+1,0,obj);else ch.steps.push(obj)};
  const insBefore=(ch,needle,obj)=>{if(!ch||ch.steps?.some(x=>x.v66id===obj.v66id))return;const i=ch.steps.findIndex(x=>(x.heading||'').includes(needle));if(i>=0)ch.steps.splice(i,0,obj);else ch.steps.push(obj)};
  const insertChapterAfter=(needle,obj)=>{if((typeof CHAPTERS!=='undefined'?CHAPTERS:[]).some(x=>x.title===obj.title))return;const i=CHAPTERS.findIndex(x=>x.title===needle);if(i>=0)CHAPTERS.splice(i+1,0,obj);else CHAPTERS.push(obj)};
  const rankOrder=['皇贵妃','贵妃','妃','嫔','贵人','常在','答应'];
  const cleanRank=v=>{v=String(v||'');if(/^故|^废|^未入宫|^待选|^待封/.test(v))return null;for(const r of rankOrder)if(v===r||v.endsWith(r))return r;return null};
  const personTitle=(s,k)=>{try{return courtTitle(s,k)}catch(_e){return s?.ranks?.[k]||PEOPLE?.[k]?.title||''}};
  const safeName=k=>PEOPLE?.[k]?.name||k;

  // A. 时疫来源：只确认“最早能接上的西路链条”，不把珂兰人写成单一祸源。
  const winter=CH('凤仪宫最后一冬');
  insAfter(winter,'秋疫第五日',{
    v66id:'west-road-clue',heading:'秋疫第七日 · 西仓外那双泥靴',cast:['hanzhang','zhangyuanzhao','ning'],fx:'mist',narrative:true,text:s=>[
      `第七日午后，含章把最早六名发热者的去处重新摊了一遍。不是为了再画一张更漂亮的表，而是因为其中三个人都提到同一个地方：内务府西仓。`,
      `西仓前几日刚收过一批从极西互市转进京的毛毡和蓝石。真正让她停笔的不是货，而是人——替驮队卸货的两个脚夫都在入宫前后发过热，其中一人已经死在城南客栈。`,
      `张元照问：“边站有没有报过病？”`,
      `含章把一封皱得发软的驿报推过去。四个月前，西路驿站曾收到珂兰边境的通报，译文只写“暑热，不妨行程”。原文后面还有半行没人能确定的珂兰词，被译官用墨圈住，旁边写着“似指营中多人同病”。`,
      `邵明贞站在窗边听完，没有说“就是这里”。她只让人把最早几批驮队、译吏和西仓值簿全封起来：“先接路，不先找一个国家认罪。”`,
      `张元照在第一张路线图左上角添了一行：<b>“西路人流——疑，未定源。”</b>她特意把“未定”写得比前面两个字更大。`,
      `<div class="v66-source"><strong>这一日只能确认：</strong>宫里最早一批病例，与一支经过极西互市的驮队存在时间和人员上的交叉。病究竟从哪一个人、哪一站进来，当时仍没有证据可以写死。</div>`
    ],choices:[{label:'把“疑，未定源”原样留在疫册上',hint:'含章：“先别替后人把疑点写成结论。”',effects:{trust:{hanzhang:2,zhangyuanzhao:2,ning:1},flags:{v66WestRoadSuspected:true}},result:'西路驿报与最早六人的行迹被一起封进副册。没有人因此被写成“疫源”。'}]
  });

  // B. 黛拉的到来成为上一年时疫的外交余波；她带来另一边的记录，却拒绝承担“民族罪名”。
  const kelan=CH('极西来客');
  if(kelan){
    kelan.bridge=s=>`承熙十二年六月，关闭近一年的极西互市准备重开。上一年西路与京中的时疫让两边都吃过亏：珂兰失了三处商站，大晟也封过宫门。新盟议里除了马匹、盐道和关税，还第一次多了一条——两国遇到成片发热，必须互报原文，不得只给一份好看的译文。黛拉正是在这份新盟议里随使团入京。她既是王族女，也是珂兰拿来证明“这次不会只送一张翻译过的纸”的人。`;
    insAfter(kelan,'珂兰话里，一个词能有两层门',{
      v66id:'kelan-epidemic-truth',heading:'那一年，珂兰也埋过人',cast:['daila','zhangyuanzhao','hanzhang'],fx:'wind',narrative:true,text:s=>[
        `张元照把上一年那封西路驿报拿到承露馆时，黛拉只看了一眼被圈起来的珂兰词，脸上的笑就没了。`,
        `“这不是‘暑热’。”她说。`,
        `含章问：“那是什么？”`,
        `黛拉把原文念了一遍。那个词在珂兰并不指一种确定的病，更接近“营地里一个接一个倒下的热病”。她说完坐回去，过了一会儿才补：“去年春天，珂兰北港先病。后来王庭怕互市停，地方官把‘营中相染’改成了‘暑热’。”`,
        `张元照没有追问谁下的令，只问日期。`,
        `黛拉报了三个日子。张元照把它们和大晟西路驿站、进京驮队、西仓第一批发热者排在一起。时间接得上。`,
        `“所以是珂兰传来的？”含章问得很直。`,
        `黛拉抬眼：“你要问这场病是不是沿西路进了你们京城——很可能。你要问是不是‘珂兰人把病带给你们’——这句话我不认。”`,
        `她从自己的行箱里取出一册薄薄的港口封站簿。第一页就有她熟悉的名字。`,
        `“我的乳母也死在那一年。”她说，“我们那里也埋了人。”`,
        `后来查清的东西比一句“从哪来”更难看：珂兰边官怕停市，把病写轻；大晟西站也怕耽误贡期，没有坚持扣下驮队。两边都各自把一句难听的话磨得好看了一点。病就从那些被磨掉的字缝里继续往前走。`,
        `<div class="v66-source"><strong>疫路最终记法：</strong>“承熙十一年宫疫，最早可追至西路驮队与珂兰前期营热记录之交叉；具体初始病例不可考。珂兰与大晟边站均有迟报、轻报。”</div>`
      ],choices:[{label:'把珂兰原文、黛拉译文和大晟旧译并列入档',hint:'黛拉：“别替我删掉你们那一份，也别替你们删掉我们的。”',effects:{trust:{daila:4,hanzhang:2,zhangyuanzhao:2},flags:{v66KelanEpidemicLinked:true}},result:'上一年的疫册第一次多出宫墙以外的第一页。黛拉的名字没有写在“疫源”旁边，而写在“译文复核”旁边。'}]
    });
  }

  // C. 大封以后，在正文中明确逐层点名：太后、中宫、所有在宫嫔妃、所有皇嗣。
  function rosterLines(s){
    const lines=[];
    lines.push(`<div class="v66-roster-prose"><h3>红旨落定后 · 六宫现有人名</h3>`);
    lines.push(`<p><b>慈宁宫：</b>太后邵令仪。<br><b>中宫：</b>顾皇后已崩，凤仪宫暂空。</p>`);
    for(const r of rankOrder){
      const ks=Object.keys(s.ranks||{}).filter(k=>PEOPLE?.[k]&&cleanRank(s.ranks[k])===r&&!/^故|^废/.test(String(s.ranks[k]||'')));
      const names=ks.map(k=>`${personTitle(s,k)} ${safeName(k)}${PEOPLE[k]?.home?`（${PEOPLE[k].home}）`:''}`);
      lines.push(`<p><b>${r}：</b>${names.length?names.join('；'):'无'}</p>`);
    }
    const dead=new Set(s.flags?.v46ChildVictims||[]), live=[], gone=[];
    for(const [k,v] of Object.entries(typeof CHILDREN!=='undefined'?CHILDREN:{})){
      if(k==='unborn')continue; const label=`${v.order||''}${v.name?` ${v.name}`:''}`.trim();if(!label)continue;
      const mom=v.mother&&PEOPLE?.[v.mother]?`，生母${personTitle(s,v.mother)} ${safeName(v.mother)}`:v.motherName?`，生母${v.motherName}`:'';
      const foster=v.foster&&PEOPLE?.[v.foster]?`，养于${personTitle(s,v.foster)} ${safeName(v.foster)}`:'';
      (dead.has(k)||/薨|早夭|亡/.test(String(v.note||''))?gone:live).push(`${label}${mom}${foster}`);
    }
    lines.push(`<p><b>现存皇嗣：</b>${live.length?live.join('；'):'无'}。</p>`);
    if(gone.length)lines.push(`<p><b>另册追记：</b>${gone.join('；')}。</p>`);
    lines.push(`<p><small>位额：皇贵妃一人、贵妃二人、妃四人、嫔六人；贵人以下不设人数上限。皇后另列中宫，不占皇贵妃位。</small></p></div>`);
    return lines;
  }
  const snow=CH('雪尽宫门');
  const roster=snow?.steps?.find(x=>(x.heading||'').includes('大封后')||(x.heading||'').includes('红旨落定'));
  if(roster&&!roster.v66rewrite){
    roster.heading='红旨落定以后，名字要一一念完';
    roster.text=s=>[
      `红旨宣完，慈宁宫正殿没有立刻散。昨天这些名字还分别躺在功册、病册、皇嗣簿和旧案里，今天它们第一次被重新放回同一张纸上。`,
      ...rosterLines(s),
      `我从第一行看到最后一行。太后没有催，只等我把纸真正看完。`,
      `“这就是现在还住在这座宫里的人。”她说，“以后别只在要封、要罚、要死的时候才想起名字。”`,
      `殿外有人开始收宣旨时铺的红毡。毡边从台阶上一寸寸卷起来，大封到这里才算真正结束。`
    ];roster.v66rewrite=true;
  }

  // D. 终局权力线：张后协理朝政，和妃掌文字；能力越强，越危险。
  const late={date:'承熙十四年·夏至十五年冬',title:'帘后朱笔',theme:'朱笔仍在皇帝手里，帘后却已经多了两双眼睛；一套太好用的办法终于逼出它的代价',place:'养心殿 / 凤仪宫 / 永和宫',cast:['emperor','zhangyuanzhao','shen'],fx:'candle',
    bridge:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'
      ?`册后第三个月，我旧伤逢雨便痛，御案上的折子却一天也不会因为天阴少一封。张元照起初只替我把“今天必须看”与“明日还能等”分开；再后来，她开始把互相矛盾的数字圈出来，把我真正需要问朝臣的问题写在纸边。和妃沈知微没有官名，也没有坐进前朝。沈知微偶尔替她把纸边的问题改成奏折能用的问句，改完便把笔搁回去。`
      :`这一局凤印没有落到张元照手里。她仍能以疫后册务入御前问事，却没有资格长期分阅外朝章奏；沈知微也没有走到替中宫掌笔的那一步。另一条危险而亲密的路，因此没有真正发生。`,
    steps:[
      {heading:'雨声把奏折压得更低',cast:['emperor','zhangyuanzhao'],fx:'rain',narrative:true,text:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
        `六月连雨，我右肋旧伤发作，坐久了便疼。那日案上压着河工、盐引、北营换防和珂兰互市四摞折子。张元照来请安时看了一眼，没有说“臣妾替陛下看”。`,
        `她问：“今晚一定要落朱批的，有几本？”`,
        `“你先替朕挑。”`,
        `她没有坐御案正面，只在西暖阁小案上把折子一封封打开。急报放左，例行放右；数字前后不一样的单独抽出。她不替我写“准”或“不准”，只在纸边写：<b>“这两处说法冲突”“若照旧，谁承担新增粮价”“去年的前提今年还在不在”。</b>`,
        `我看完第一摞，问她：“你觉得哪一本该驳？”`,
        `她摇头：“臣妾能告诉陛下哪里不对劲。驳不驳，是另一件事。”`,
        `<div class="v66-power"><b>从这一天起，张元照开始正式替御前分折。</b><small>她可以列轻重、圈矛盾、写问目；最后的朱批仍只能由皇帝落。</small></div>`
      ]:[`中宫另有其人。张元照仍按旧例送疫后册，不阅外朝章奏。`],choices:[{label:'“西暖阁给皇后留一张小案。”',hint:'张元照：“只放陛下准臣妾看的。”',effects:{trust:{zhangyuanzhao:4},flags:{v66ZhangCourtDesk:true}},result:'从此养心殿西暖阁多了一张不大的书案。它离御案只有十几步，却始终低半级。'}]},
      {heading:'和妃把一句太直的话改了三遍',cast:['zhangyuanzhao','shen','emperor'],fx:'ink',narrative:true,text:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
        `张元照最初写的问目很不好看。河工折子上，她直接写：“去年说不会决，今年又决了。是谁在撒谎？”`,
        `我看了一眼：“这句话送出去，工部先忙着证明自己没撒谎，河还在那里决。”`,
        `她沉默半晌，把纸送去永和宫。`,
        `沈知微看完，茶盖扣上才说：“娘娘想问的是谁在撒谎，还是哪一段河工判断错了？”`,
        `“后一个。”`,
        `“那就别先骂人。”`,
        `她提笔改成：“前岁所称可守之段，今岁何以先溃？请将当时勘验、今年水位与经手官姓名一并具陈。”`,
        `张元照看了半天：“这听起来不像我。”`,
        `“像能让他们把东西交上来。”沈知微把笔搁下，“娘娘负责把问题看出来，我负责让人别只顾着生气。”`,
        `后来很多夜里，张元照先圈出问题，沈知微把它们整理成问目和谕旨初稿，我在最后一页改字、删句、落朱批。三个人分工越来越熟，熟到养心殿的小太监只看纸张叠放的顺序，就知道哪一摞还没过和妃的手。`,
        `<div class="v66-power"><b>沈知微没有得到一个外朝官名。</b><small>可她事实上开始承担最敏感的文字工作：把中宫的判断变成能进朝堂的语言，也提醒哪一句会把一个尚书逼得只顾自保。</small></div>`
      ]:[`和妃仍在永和宫处理自己的旧事，并未进入御前文牍。`],choices:[{label:'让和妃只在养心殿改稿，不得带外朝原折回宫',effects:{trust:{shen:4,zhangyuanzhao:3},flags:{v66ShenCourtPen:true}},result:'第一条边界写得很清楚：原折不出养心殿。沈知微只带走空纸，不带走任何外朝章奏。'}]},
      {heading:'灯下三个人都知道这件事太好用了',cast:['emperor','zhangyuanzhao','shen'],fx:'candle',narrative:true,text:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
        `入秋以后，这套办法越来越快。张元照能在一堆折子里先挑出彼此矛盾的数字；沈知微记得哪个官员上一次在同一件事上用了什么措辞，也知道什么时候一句“严查”会逼下面先毁证据。`,
        `我仍自己落朱批，可我开始习惯在落笔前问一句：“你们怎么看？”`,
        `有一夜我问完以后，张元照没有答。沈知微也没有。`,
        `“怎么？”`,
        `张元照说：“因为陛下刚才问的是‘你们怎么看’，不是‘这折子哪里有问题’。”`,
        `我看她。`,
        `“前一个问题，会让臣妾越来越像替陛下做决定的人。”`,
        `沈知微把已经凉透的茶往旁边推了一寸：“可若我们每次都答得很好，陛下确实会越来越省力。”`,
        `屋里安静了一会儿。最后我把那本折子重新拉回自己面前。`,
        `我把折子重新拉回自己面前。张元照没有再替我圈下一处，沈知微也把笔放下。那晚以后，“你们怎么看”这句话在养心殿少了许多。`
      ]:[`另一条中宫路线里，御前没有形成这一套三人分折与掌笔的习惯。`],choices:[{label:'朱批仍由朕亲看原折后再落',effects:{flags:{v66RedInkBoundary:true}},result:'御前留下新规：皇后与和妃可以列问目、拟初稿，但皇帝落笔前必须亲阅原折。'}]},
      {heading:'承熙十五年十月旧事 · 一页废稿到了都察院',cast:['emperor','zhangyuanzhao','shen'],fx:'storm',narrative:true,text:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[ 
        `承熙十五年十月，都察院御史在一份弹章后夹进一页没有署名的废稿。纸是养心殿常用的澄心纸，前半页是张元照圈出的三处疑点，后半页是沈知微的字。`,
        `最要命的不是字迹，而是那页上写着尚未公开的漕粮调拨数。`,
        `我叫人查纸从哪里出去。最后查到的不是阴谋，而是永和宫一个旧匣。沈知微这些月把自己改过的重要初稿各留一份副本——不是为了传给外头，是为了日后若有人说“当时没有这么写”，还能拿出原先的字。`,
        `张元照进殿时看见那只匣子，脸色一下白了。`,
        `“你知道她留副本？”我问。`,
        `“不知道。”`,
        `沈知微没有替自己找好听的话：“臣妾留了。原折没带出去，初稿留了十二份。”`,
        `“为什么？”`,
        `“因为改过的东西最容易被说成从来没有过。”`,
        `张元照看着那十二份副稿，一时没有接话。`,
        `<div class="v66-crisis"><b>东窗事发</b>外朝真正抓住的不是“后宫女人聪明”，而是一个无法轻描淡写的问题：中宫与妃嫔是否正在形成一套不经正式官署、却能接触和保存机务的第二套文字系统。</div>`
      ]:[`这一局没有形成“帘后要目”，都察院也没有拿到这页废稿。`],choices:[
        {label:'“先把朕准她们看折子的口谕写进案卷。”',hint:'不让和妃独自背“私窥朝政”的罪。',effects:{trust:{shen:2,zhangyuanzhao:2},flags:{v66EmperorOwnsAuthorization:true}},result:'案卷第一行先写明：皇后分折、和妃拟稿，均曾奉御前口谕。可“奉旨看过”仍不能解释为什么永和宫私留十二份机务副稿。'},
        {label:'“叫皇后自己来回这道弹章，朕最后落字。”',hint:'让她先说明自己定的办法出了什么问题，再由朕最后落字。',effects:{trust:{zhangyuanzhao:3},flags:{v66ZhangMustAnswer:true}},result:'弹章没有被压下。张元照坐到西暖阁那张小案前，第一次要写的是自己定下的办法出了什么问题、该怎么改。'}
      ]},
      {heading:'新茶停在两个人中间',cast:['zhangyuanzhao','shen','emperor'],fx:'snow',narrative:true,text:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
        `张元照最后没有烧那十二份副稿。她把它们全部封进御前案卷，然后亲自下中宫处分。`,
        `${personTitle(s,'shen')}沈知微奉口谕参与拟稿，不以私窥机务论；但私留外朝机务副草于永和宫，越内外之界。褫去一切御前文字之权，降一等，移居西苑静养，此后不得入养心殿阅折。`,
        `处分里还有一句：“中宫失察，停分折外朝章奏三月。”`,
        `我看完，没有替她删。`,
        `“你可以把那十二页说成朕叫她留的。”我说。`,
        `张元照摇头：“陛下没叫。”`,
        `“也可以只收副稿，不降她。”`,
        `她很久才说：“那以后所有人都会知道，这条规矩碰到臣妾最亲近的人，可以不算。”`,
        `处分下去前，她去了永和宫。沈知微已经把茶沏好，是新茶。`,
        `张元照坐下，没有碰。`,
        `沈知微先开口：“你要是今天替我把那十二页烧掉，我才真的不认得你了。”`,
        `“可我还是把你推出去了。”`,
        `“是。”`,
        `窗外第一场雪落得很轻。沈知微把茶往她面前推了一点：“这两件事可以同时是真的。”`,
        `张元照没有哭，也没有说以后。她坐到茶凉，起身时把杯子摆回原位。`,
        `<div class="v66-after"><em>她终于把“规则不能替最亲近的人开例外”做到了最彻底的一次。代价不是一张处分，而是从此养心殿的夜里少了一支她最信任的笔。</em></div>`
      ]:[`张元照没有受凤印，沈知微也没有因御前文牍被处分。`],choices:[{label:'处分照发，不改成“和妃自请退居”',hint:'张元照：“是臣妾下的，就写臣妾下的。”',effects:{flags:{v66ShenSacrificed:true,v66ZhangCourtScandal:true}},result:'第二日，宫里都知道和妃被降位移居。没人知道前一夜永和宫那壶新茶一直没有续第二遍水。'}]},
      {heading:'朱笔重新落回我手里',cast:['emperor','zhangyuanzhao'],fx:'ink',narrative:true,text:s=>s.flags?.v44NewEmpress==='zhangyuanzhao'?[
        `和妃离开御前以后，事情明显慢了。张元照写出来的问目又开始太直，我有两次看着都想笑。`,
        `她三个月不得分折外朝章奏，御案重新全压回我这里。第一旬我烦得厉害，第二旬开始重新习惯自己把原折看到最后。`,
        `三个月后，我准她回西暖阁。条件比从前多：外朝原折不得出养心殿；初稿当日回收；所有参与人署名；皇后只能列问目、拟议，不得替御前落朱批。`,
        `她听完问：“那臣妾还能说陛下这一本看错了么？”`,
        `“能。”`,
        `“能直接说？”`,
        `“你什么时候学会拐弯了？”`,
        `她笑了一下。`,
        `后来很多年，朝臣仍知道中宫能看折、能说话、能把一件事逼到御前重新问一遍。可最后那一笔始终是我的。张元照没有因此变回一个只管六宫的皇后，我也没有再把“有人替我看”当成可以不看的理由。`,
        `永和宫旧人后来很少再进养心殿。西暖阁那张小案还在，只是旁边再没有第二盏茶。`
      ]:[`本局的晚年政务仍由皇帝与外朝承担。`],choices:[{label:'合上最后一摞折子',effects:{flags:{v66LateCourtArcDone:true}},result:'养心殿落锁时已近子时。朱笔洗净，西暖阁的灯比御案先熄一刻。'}]}
    ]
  };
  insertChapterAfter('中宫空悬',late);

  // E. 主控全局态度：不是把朝政让出去，而是授权、依赖、出事后重建边界。
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron)chronicleView=function(){let h=oldChron();const f=state.flags||{};const extra=`<section class="v66-court-note"><span class="eyebrow">御前后记</span><h2>帘后多了人，朱笔没有换主人</h2><p><b>册后初期：</b>我准张元照分折、列疑点，是因为旧伤与政务都真实存在；准她看，不等于准她替我决定。</p><p><b>和妃入笔：</b>沈知微让那些太直的问目变成朝臣愿意回答的话。她不是外朝官，却事实上参与了文字形成。</p><p><b>依赖变深：</b>三个人配合得越顺，我越容易先问“你们怎么看”。张元照自己先意识到这会把协助变成代决。</p><p><b>东窗事发：</b>${f.v66ShenSacrificed?'和妃因私留御前副草被降位移居；皇后同时停分折三月。':'御前仍需面对“内廷能否长期保存外朝机务”的边界。'}</p><p><b>最后：</b>张元照仍参与朝政，但只能列问目、拟议并留下经手；原折与朱批回到养心殿。主控没有回到早年的全包，也没有把最后判断交出去。</p></section>`;return h.replace('</main>',extra+'</main>')};

  // F. 大事录：补上疫路、黛拉与帘后朱笔。
  if(typeof historyRecordV38==='function'){
    const old=historyRecordV38;historyRecordV38=function(e,i){
      if(e?.title==='凤仪宫最后一冬'&&state.flags?.v66WestRoadSuspected)return '承熙十一年秋，内廷大疫。最早病例行迹与西路互市驮队相接，疫册记“疑，未定源”；十月皇后顾氏崩。';
      if(e?.title==='极西来客'&&state.flags?.v66KelanEpidemicLinked)return '承熙十二年，珂兰王族女黛拉随重开互市之盟入京。其所携旧港簿与西路驿报互证：前岁两国边站均有轻报疫情之失。';
      if(e?.title==='帘后朱笔')return state.flags?.v66ShenSacrificed?'承熙十五年，皇后张氏奉旨协理章奏，和妃沈氏参与拟稿。后沈氏私留机务副草事发，降位移居；中宫停分折三月，御前重定内外文牍之界。':'承熙十四年以后，御前尝议令中宫分折章奏，终以朱批仍归天子为限。';
      return old(e,i);
    };
  }

  // G. 人物录与卷终人物志后期更新。
  const oldPeopleView=typeof peopleView==='function'?peopleView:null;
  if(oldPeopleView)peopleView=function(){
    if(state.flags?.v66LateCourtArcDone&&PEOPLE?.zhangyuanzhao){PEOPLE.zhangyuanzhao.tags=['中宫','分折章奏','权力留痕'];PEOPLE.zhangyuanzhao.bio='受凤印以后，她逐渐从六宫走到御前章奏旁：先分轻重、圈矛盾，后来参与拟议朝政。她最危险也最独特的一点，是既敢使用权力，也坚持经手必须留名；最终这条原则逼她亲手处分了最亲近的沈知微。';}
    if(state.flags?.v66ShenSacrificed&&PEOPLE?.shen){PEOPLE.shen.tags=['旧案已平','御前掌笔','退居西苑'];PEOPLE.shen.bio='旧案平反以后，她没有变成第二个查案者。张后协理章奏时，她曾替御前磨文字、记人情与官场脾性；后来因私留机务副草被降位移居。她越界不是为了夺权，而是太相信“改过的东西必须有人记得原样”。';}
    if(state.flags?.v66KelanEpidemicLinked&&PEOPLE?.daila){PEOPLE.daila.tags=['珂兰王族','互市译证','拒绝替国认罪'];PEOPLE.daila.bio='来自极西珂兰。她后来拿出本国旧港簿，证明上一年珂兰也经历过同类营热，且两国边站都曾轻报。她愿意帮大晟追疫路，却拒绝把一场跨境灾病压成“某个国家的人带来的罪”。';}
    return oldPeopleView();
  };

  const oldEnding=typeof ending==='function'?ending:null;
  if(oldEnding)ending=function(){let h=oldEnding();if(state.flags?.v66ShenSacrificed){
      h=h.replace(/(<article class="v55-chronicle-card"><h3>[^<]*·\s*沈知微<\/h3><p class="fate">)[\s\S]*?(<\/p><blockquote>)/,`$1她曾成为张后最信任的御前掌笔，后来因私留机务副草被降位移居。她最后没有求一个好听的说法。私留机务副稿是她自己做的，这件事不会因为她得过宠爱就抹掉。$2`);
      h=h.replace(/(<article class="v55-chronicle-card"><h3>[^<]*·\s*张元照<\/h3><p class="fate">)[\s\S]*?(<\/p><blockquote>)/,`$1她受凤印后开始协理章奏，手里能管的事越来越多。后来沈知微私留机务副稿，她没有因为两人亲近就压下，而是亲手写出处分。$2`);
    }return h};

  state.flags=state.flags||{};state.flags.v66Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v66 patch failed',e)}})();
