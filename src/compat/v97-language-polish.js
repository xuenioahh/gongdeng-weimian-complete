(()=>{try{
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const ST=(ch,q)=>(ch?.steps||[]).find(st=>String(st.heading||'').includes(q));
  const cleanText=x=>String(x??'').replace(/<div class="v67-name-list">[\s\S]*?<\/div>/g,'').replace(/<div class="v68-courtcase">[\s\S]*?<\/div>/g,'').replace(/<div class="v70-oldseal">[\s\S]*?<\/div>/g,'');
  const arr=v=>Array.isArray(v)?v:[v];
  function setText(ch,q,val){const st=ST(ch,q);if(st)st.text=val;return st}
  function setBridge(ch,val){if(ch)ch.bridge=val}
  function rawRank(k,s=state){return s?.ranks?.[k]||PEOPLE?.[k]?.title||''}
  function livingRank(k,s=state){const r=rawRank(k,s);return !r||/待选|未入宫|故|废/.test(r)?'':r}
  function entered(k,s=state){const r=rawRank(k,s);return !!PEOPLE?.[k]&&!/待选|未入宫/.test(r)}

  function apply97(){
    // ---------- 章节桥接：只交代时间与发生的事，不替读者总结 ----------
    const ch3=CH('灯下弈');
    setBridge(ch3,`四月底以后，听雨轩与拾遗阁已经走动了几个月。阿芙能背出拾遗阁回礼的格式，闻人姐妹也渐渐认得大晟的宴饮规矩。七夕前一日，尚宫局来问灯架和席位，几处宫门直到掌灯才安静下来。`);
    const ch6=CH('宫灯渐繁');
    setBridge(ch6,`承熙三年春，新人陆续分宫。此后几年，沈氏旧军籍、蘅嫔孕事、内务府旧香和新生的皇子女先后进了御案。到承熙六年六月，凤仪宫的乳母册已经添了几页，拾遗阁的《承露录》也越记越厚。`);
    const ch10=CH('旧茶未凉');
    setBridge(ch10,`重阳以后，我让沈氏旧案另调一份宫外记录。北去驿道上，一个退役老卒还留着十一年前抄下的军令页。二月，宗人府的人去取；永和宫那边仍照常煮茶。`);
    const ch11=CH('听雨轩有喜');
    setBridge(ch11,`沈氏旧案落印以后，永和宫换了新茶。五月，听雨轩报喜。方小满把太医开的安胎方压在点心盒下面，阿芙第二天才找出来。`);
    const ch18=CH('凤座无人');
    setBridge(ch18,`红旨宣完以后，请安重新按时，御花园也渐渐有了孩子的声音。凤仪宫仍锁着正殿。祭礼、命妇朝见、皇子女的大礼遇到没有旧例的地方，尚宫局便把册子送到养心殿，再等一道回话。`);
    const ch19=CH('极西来客');
    setBridge(ch19,`承熙十二年六月，关闭近一年的极西互市准备重开。新盟议除了马匹、盐道和关税，又添了疫病互报。珂兰使团随文书入京，王族女子黛拉也在其中。她带来的箱子里除了国书，还有蓝石、铜铃和几只孩子玩的玻璃鸟哨。`);
    const ch21=CH('长枝渐高');
    setBridge(ch21,`顾明宜去世后的第二个春天，三皇子杨顺谦十八岁，大公主杨令兮十七岁。上书房开始给成年皇子添朝议课，公主的婚帖也陆续送到宗人府。更小的孩子换了先生、骑射和琴谱，衣袖一年比一年长。`);
    const ch22=CH('中宫空悬');
    setBridge(ch22,`冬春之间，礼部再请册后。三皇子已经成年，珂兰回信到了，张元照也把自己的来处告诉了我。凤印从匣里取出来那天，慈宁宫、礼部和宗人府各送来一份册样。`);
    const ch23=CH('帘后朱笔');
    setBridge(ch23,`凤印落定以后，张元照开始替御前分折，沈知微偶尔帮她改问目。疫后留下的一批识字女子也被尚宫局重新登记。承熙十五年春，第一份女史试任名单送进养心殿。`);
    const ch24=CH('西华门外');
    if(ch24){
      ch24.theme='皇子女陆续长成，婚帖、封地与旧案一起送进御前';
      setBridge(ch24,`承熙十五年以后，宫里添了幼嗣，年长的皇子女也开始议婚、议封。宗人府送来的册子越来越厚。到承熙十八年，二公主的婚帖上出现了一个叫陆既明的名字。`);
    }
    const ch25=CH('万家灯火');
    setBridge(ch25,`承熙二十年以后，我的旧伤与消渴都重了。太医把夜值从一人增到三人，张元照则把养心殿的蜜饯撤得越来越远。二十二年冬至后，宫门照旧落锁，御案上还压着第二日要批的折子。`);

    // ---------- 早期：去掉后见之明和提前剧透 ----------
    const ch0=CH('宫门初定');
    setText(ch0,'山茶枝上还系着一截旧绢',s=>[
      `御花园那株被风折过的山茶活了下来。周清漪给枝子重新绑细竹时，我站在回廊另一头看了一会儿。她没发现我，低头咬住手套一角，腾出手去系绳。`,
      `我想起潜邸最初几年。东园有一回下急雨，一枝海棠被风折断，她拿走我刚换的绢帕，撕成两条去绑枝子。`,
      `我问她知不知道那是什么料子。她蹲在泥里回头：“花都要断了，殿下还管帕子？”`,
      `那阵子我常在办完差事后绕去她院里坐一会儿。没有公事，也没有非见不可的理由，只是想见她。`,
      `如今她已经很少在我面前露出当年的神情。方才宫女把花盆碰歪，她回头笑了一下，我还是认得。`,
      `她终于看见我，起身行礼：“陛下站在那里做什么？”`,
      `“看你拿宫里的绳子救花。”`,
      `周清漪低头看了看手里的细绳：“臣妾如今可不敢再撕陛下的帕子了。”`,
      `我笑了一下，替她扶住那根细竹。`
    ]);
    setText(ch0,'绮春宫先改掉两个字',s=>[
      `双生后的第三日，绮春宫终于安静。外头却仍有人来问钦天监、宗室和玉牒该怎么写。`,
      `周清漪把值夜单一张张看过去，划掉“祥瑞”，又把“异兆”两个字涂黑。`,
      `顾明宜进门时正看见她改字：“你连值夜单也自己看？”`,
      `“孩子还不会说话。”周清漪把笔搁下，“先别替他们说。”`,
      `顾明宜没有接这句话，只把已经核过的产房名单收走。`,
      `午后，“秘处已毕”的回执送到凤仪宫。纸上写着交出男婴的内侍姓名，接收一栏空着。顾明宜把它夹进产案。`,
      `案里另有两张纸。第一张是顾明宜签的“移出产殿、候御前裁”，第二张是我的“秘处”旨，相隔不到一个时辰。`,
      `顾明宜把三张纸压在同一册里，封签落下以后，产案送进了凤仪宫旧柜。`
    ]);
    const ch1=CH('拾遗阁开门');
    const lastMarch=ST(ch1,'三月最后一天');
    if(lastMarch){lastMarch.text=s=>[
      `册封后的头两日，拾遗阁门前比平时热闹。有人送花，有人送香，也有人只送一张贺帖。姐姐把东西摊开看，含章只挑必须回的礼单。`,
      `三月最后一天，我从御花园回养心殿，远远看见一个穿浅青宫装的人追着一只狸猫穿过月门。她跑得太急，差点撞上端花盆的宫人，道完歉又继续追。`,
      `拾遗阁廊下，姐姐趴在栏杆上笑。含章从屋里出来，只问：“谁？”`,
      `“不知道。”`,
      `那人很快消失在花丛后。我问裴景和是哪一宫的，他说隔得远，没看清。`,
      `当天值房登记还有一行小字：“白海棠一盆，误送西廊，后补至拾遗阁。”签名是花房宫女方小满。`,
      `四月花单重新分路以后，她开始抱着花篮在几座宫门之间来回跑。`
    ];}
    const ch2=CH('一碟杏仁酥');
    const firstKneel=ST(ch2,'第一次有人跪她');
    if(firstKneel){firstKneel.text=s=>[
      `册旨送到花房时，方小满正在给一盆海棠换土。传旨内监一进院，掌事和宫女跪了一地，她自己也跟着跪，跪完才发现所有人面对的是自己。`,
      `花房掌事从前叫她“小满”，接完旨以后改口叫“方常在”。第一声叫得生，方小满听着也生。`,
      `她去扶同铺睡过两年的宫女，对方不敢借她的手，只往后退了半步。`,
      `阿芙的差籍同日改到听雨轩。收箱子时，阿芙把旧木箱往肩上一扛，方小满去抬另一头。掌事赶紧拦：“主子不能抬。”`,
      `方小满的手还搭在箱沿：“昨日还能。”`,
      `屋里静了一下。`,
      `顾明宜听说后，免了听雨轩头三日请安，只派老宫女去教受礼、座次和月例。第四日再照常入凤仪宫。`
    ];}

    // ---------- 添嗣：删掉教程腔和“策划说明” ----------
    const ch6b=CH('宫灯渐繁');
    const r1=ST(ch6b,'要不要再添一个孩子');
    if(r1)r1.text=s=>{
      const cand=typeof ensureHeirCandidates==='function'?ensureHeirCandidates(1,s):[];
      return [
        `四皇子满月后的第二日，凤仪宫东暖阁还堆着没有收完的小衣和红蛋。顾明宜等人撤完喜幛，才把近半年的承宠册和请脉簿摊开。`,
        `她问太医：“这几个人里，谁近来不宜劳累？”太医逐页看过，先划掉需要调养的人。`,
        `<span class="heir-pending"><b>九月承宠册</b><em>${cand.map(k=>typeof heirMotherLabel==='function'?heirMotherLabel(k,s):(PEOPLE[k]?.name||'')).join(' · ')}</em></span>`,
        `顾明宜把剩下的名字推到我面前：“陛下自己定。”`
      ];
    };
    const r2=ST(ch6b,'第二张空白页');
    if(r2)r2.text=s=>{
      const cand=typeof ensureHeirCandidates==='function'?ensureHeirCandidates(2,s):[],x=s.flags?.extraHeirs?.[1];
      return [
        x?.mother?`${typeof heirMotherLabel==='function'?heirMotherLabel(x.mother,s):PEOPLE[x.mother]?.name}报喜以后，名字从冬月承宠册上划去，旁边另写“安胎”。`:`九月没有新的喜脉。冬月承宠册送来时，顾明宜又把请脉簿放在旁边。`,
        `太后听见外头有人议论皇子多少，只说：“人还没来，算盘倒先响了。”`,
        `<span class="heir-pending"><b>冬月承宠册</b><em>${cand.map(k=>typeof heirMotherLabel==='function'?heirMotherLabel(k,s):(PEOPLE[k]?.name||'')).join(' · ')}</em></span>`,
        `我把册子翻到下一页。`
      ];
    };

    // ---------- 方小满案：让证据自己说话 ----------
    const ch11case=CH('听雨轩有喜');
    const incense=ST(ch11case,'安神香只是一个小差事');
    if(incense){incense.text=s=>[
      `十月底以后，太后夜里醒得多。沈知微提起沈家旧安神方，慈宁宫便让香药局照方重配。`,
      `请安散得晚。太后随口说旧香囊漏粉，顺贵人低头看了看自己的袖口：“阿芙缝内袋很牢，臣妾替娘娘换一个。”`,
      `太后笑她：“你如今有身子，还管这些碎事。”`,
      `“坐着缝，又不用跑。”`,
      `香方从永和宫抄出，香药局配药；慈宁宫取出周清漪多年前送的一只空木盒。周清漪来看过一次，只提醒掌事：“底下有夹层，灰要扫净。”`,
      `内务府登记后把木盒送到听雨轩。顺贵人和阿芙只负责换绢袋、系结，次日再由慈宁宫的人取走。`,
      `阿芙打的是活结。绳头一抽就开。交接单核过取盒、领药和送回的人名以后，压进值簿。`
    ];}
    const reports=ST(ch11case,'三份密报没有一份完整');
    if(reports){reports.text=s=>[
      `正午以前，三份东西先后到御前。`,
      `周清漪说木盒早已送出多年，与自己无关，又说不记得盒底还有夹层；这和她十月底在慈宁宫提醒掌事的话对不上。香药局账册则记着顺贵人亲自取药。含章的密奏只有三行：药粉与香方无关，盒底夹层被重新封过，请先查“谁放的”。`,
      `沈知微把原始香方送来，纸边还有沈家旧压纹。顾明宜把登记册、口供和香药局账页叠齐：“涉事宫嫔，按例是否先移偏院？”`,
      `我没有立刻落笔。阿芙又交上一册值夜记，上面逐夜写着谁进过听雨轩、谁没有。`,
      `顾明宜翻了两页：“这些都是你记的？”`,
      `“是。”`,
      `她把那册值夜记放到最上面。`,
      `朱笔仍悬在纸上。`
    ];}
    const cuiAsk=ST(ch11case,'崔静仪单独进养心殿');
    if(cuiAsk){cuiAsk.text=s=>[
      `第八日，我才召崔静仪。她进来时没戴平日那支宝石簪，只把衣带系得很齐。`,
      `我把祁嬷嬷的供词放到她面前：“认不认这张旧印样？”`,
      `她看了很久：“认得。臣妾陪嫁箱里以前有一份。”`,
      `“祁嬷嬷拿走，你知不知道？”`,
      `“不知道。”`,
      `裴景和又递上一页香药局往来簿。祁嬷嬷的名字没有写在上面，崔家贡造行一个管事的私印却出现过两次。`,
      `我问：“承熙六年旧香案以后，你有没有问过家里还碰不碰宫里的香药？”`,
      `“问过一次。家里说已经停了。”`,
      `“你信了？”`,
      `“臣妾当时信了。”`,
      `我把供词推回裴景和：“继续查。没有她下令的实证，不废位。”`,
      `崔静仪停承宠，崔家旧贡造行退出宫供；祁嬷嬷和香药局经手人仍分开审。`
    ];}

    // ---------- 张元照前期：喜欢就是喜欢，不另加题解 ----------
    const ch15b=CH('荷风满座');
    const fav=ST(ch15b,'景阳宫的灯亮得比从前多');
    if(fav){fav.text=s=>[
      `从御花园回养心殿要过两道月门。七月里，我比从前多走了几次那条路。`,
      `我那个月召张元照五次。三次在白日，两次在晚膳后。她说话新鲜，我愿意多听一会儿。`,
      `她每提一个“可以改”，我都会问：“谁来做？做坏了算谁的？别人不愿意怎么办？”有时她答得上，有时想一会儿，说：“那先别改。”`,
      `一次请安后，顾明宜道：“陛下近来常去景阳宫。”`,
      `“嗯。”`,
      `“张氏聪明。”`,
      `我看她。她把衣襟抚平：“聪明的人得宠不奇怪。只别让六宫听成张氏说什么都准。”`,
      `我说：“朕知道。”`
    ];}
    const pc=ST(ch15b,'大公主借走一阵风');
    if(pc&&Array.isArray(pc.choices))pc.choices.forEach(c=>{if(String(c.label).includes('转进支线'))c.label='去看看大公主那边';});

    // ---------- 时疫：删掉“不是为了画表”式提示 ----------
    const ch16=CH('凤仪宫最后一冬');
    const west=ST(ch16,'西仓外那双泥靴');
    if(west){const old=west.text;west.text=s=>arr(typeof old==='function'?old(s):old).map(x=>String(x)
      .replace('第七日午后，含章把最早六名发热者的去处重新摊了一遍。不是为了再画一张更漂亮的表，而是因为其中三个人都提到同一个地方：内务府西仓。','第七日午后，含章把最早六名发热者的去处重新摊了一遍。其中三个人都提到同一个地方：内务府西仓。')
      .replace('真正让她停笔的不是货，而是人——替驮队卸货的两个脚夫都在入宫前后发过热，其中一人已经死在城南客栈。','替驮队卸货的两个脚夫都在入宫前后发过热，其中一人已经死在城南客栈。她把笔停在那两个人名旁。'))}

    // ---------- 大封：每个人只写自己的事，不重复解释制度 ----------
    const ch17=CH('雪尽宫门');
    setText(ch17,'太后亲手删掉侄女册页上的一个理由',s=>[
      `大封前夜，尚宫局把功册送到慈宁宫。邵明贞那页末尾写着：“太后近亲，素承慈眷。”`,
      `太后用指甲压住那一行：“删掉。”`,
      `掌事低声道：“这是照例写家世。”`,
      `“家世写进家谱。”太后把册子推回去，“明日她该受什么赏，照她做过的事写。”`,
      `人退下以后，她把邵明贞那页重新看了一遍，才合上功册。`
    ]);
    setText(ch17,'邵明贞的册页',s=>[
      `顾明宜病重以后，邵明贞接过六宫里不少杂务；丧仪结束，她又把钥匙和册子一项项交回尚宫局。`,
      `她那页红册写得很满。我读完，把笔搁在册边。`
    ]);
    setText(ch17,'沈知微的册页',s=>[
      `沈氏旧案已经昭雪。方小满案里她交出旧香方，时疫时又把永和宫药册给太医院抄用。`,
      `她的册页送到御前时，茶渍还沾在最下面一角。`
    ]);
    setText(ch17,'闻人含章的册页',s=>[
      `含章救驾受过伤，也查过产案和假印。尚宫局把这些逐项写进功册。`,
      `她本人站得很远，只在唱到自己名字时抬了一下眼。`
    ]);
    setText(ch17,'周清漪的册页',s=>[
      `周清漪这些年留下的产房、乳母和值夜单最多。她的册页不长，后面却附了厚厚一叠旧记录。`,
      `我翻到最后一页，才提笔。`
    ]);
    setText(ch17,'霍素英的册页',s=>[
      `霍素英带进宫的北营旧簿替沈氏案补过一处缺口。她自己的功册反而薄，只写了几件能对得上日期的事。`,
      `北营送来的请封折子没有夹在里面。`
    ]);
    setText(ch17,'崔静仪的册页',s=>[
      `崔静仪的册页旁另压着崔家旧贡造行的案卷。祁嬷嬷与香药局经手人的供词已经在刑部，崔静仪本人仍没有直接下令的实证。`,
      `我把功册与案卷分开放着，没有用其中一本替另一本下结论。`
    ]);
    const fangLetter=ST(ch17,'两封信出了宫门');
    if(fangLetter){const old=fangLetter.text;fangLetter.text=s=>arr(typeof old==='function'?old(s):old).map(x=>String(x).replace(/宫册上写的是“故顺贵人方氏”，若后来若追晋，又会再添一个更高的名位；没有一句官文写她怎样被冤、怎样信下最后一碗药。/,'宫册按最后追赠誊名，另封一份送往方家。礼部公文写得很短，只记生卒与追赠。'));}
    const roster=ST(ch17,'名字要一一念完');
    if(roster){roster.text=s=>{
      const order=['皇贵妃','贵妃','妃','嫔','贵人','常在','答应'];
      const rows=[];
      for(const rank of order){
        const a=(HAREM_KEYS||[]).filter(k=>PEOPLE[k]&&rawRank(k,s)===rank&&!/故|废|未入宫|待选/.test(rawRank(k,s))).map(k=>`${typeof courtTitle==='function'?courtTitle(s,k):rank} ${PEOPLE[k].name}${PEOPLE[k].home?`（${PEOPLE[k].home}）`:''}`);
        if(a.length)rows.push(`<p><b>${rank}：</b>${a.join('　')}</p>`);
      }
      const kids=Object.values(CHILDREN||{}).filter(c=>c?.name&&c?.order&&!/未取名/.test(c.name)).map(c=>`${c.order} ${c.name}`).slice(0,12);
      return [
        `红旨宣完，慈宁宫正殿没有立刻散。尚宫局重新按位次念名，念过一个，掌事便在新册上落一个小印。`,
        `<div class="v66-roster-prose"><h3>红旨落定后 · 六宫现有人名</h3><p><b>慈宁宫：</b>太后邵令仪。　<b>中宫：</b>凤仪宫暂空。</p>${rows.join('')}${kids.length?`<p><b>皇子女：</b>${kids.join('；')}</p>`:''}</div>`,
        `我从第一行看到最后一行。太后等我合册，才让人收走殿外的红毡。`
      ];
    };}

    // ---------- 空后与册后：删掉作者判断卡 ----------
    const ch22b=CH('中宫空悬');
    const posts=ST(ch22b,'两份帖子都没有写谁想做皇后');
    if(posts){const old=posts.text;posts.text=s=>arr(typeof old==='function'?old(s):old).map(cleanText).filter(x=>x.trim());}
    const seal=ST(ch22b,'凤印前最后一道旨');
    if(seal){seal.text=s=>[
      `凤印摆到御案前时，我想起这个夏天去景阳宫的几次，也想起秋疫里给她临时牌、三皇子那夜她站在门外没有再往里走。`,
      `东角门失火那晚，她把“众人合议”划掉，改成自己的名字。那张纸也在案上。`,
      `我转了一下白玉扳指，叫礼部把册后诏书再念一遍。`
    ];}
    const reveal=ST(ch22b,'臣妾不是从哪个州府来的');
    if(reveal){const old=reveal.text;reveal.text=s=>arr(typeof old==='function'?old(s):old).map(x=>String(x).replace('这一次她不是为了证明自己有奇术。她把顺王府、时疫、三皇子和凤仪宫空着的一年全说在前面：','她先把顺王府、时疫、三皇子和凤仪宫空着的一年说完，才道：'));}

    // ---------- 顾后旧印：只把两道命令摆在桌上 ----------
    const oldSeal=ST(ch24,'已故皇后的名字也被重新翻出来');
    if(oldSeal){oldSeal.text=s=>[
      `陆既明的身世一见光，第二日便有宗室与御史追问顾明宜。有人请削美谥，更重的一份甚至提到撤配享。`,
      `我把折子压到最下面。御案上另摊着两张旧纸：顾明宜的“移出产殿、候御前裁”，和我的“秘处”旨。`,
      `张元照看完，只问：“实录怎么写？”`,
      `我让裴景和把两张纸并排放好。第一张时间在前，第二张不到一个时辰。`,
      `“照原字写。”我说。`,
      `张元照没有再替谁求情。`
    ];}

    // ---------- 终章与自由跳转：前台不出现“本局/第二主控路线”等后台词 ----------
    for(const ch of CHAPTERS||[])for(const st of ch.steps||[]){
      if(st.text){const old=st.text;st.text=function(s){let a;try{a=typeof old==='function'?old(s):old}catch(_e){a=[]}return arr(a).map(cleanText).filter(x=>!/^本局/.test(String(x).trim())&&!/另一条中宫路线里/.test(String(x)));};}
      if(Array.isArray(st.choices))st.choices=st.choices.map(c=>{if(String(c.label||'').includes('中宫不是张元照'))return {...c,label:'由生母继续抚养'};return c});
    }

    // ---------- 人物台词/旁白中几处最明显的解释句 ----------
    const ch16b=CH('凤仪宫最后一冬');
    const zh=ST(ch16b,'西仓外那双泥靴');
    if(zh){const old=zh.text;zh.text=s=>arr(typeof old==='function'?old(s):old).map(x=>String(x).replace('真正让她停笔的不是货，而是人——','').replace('第七日午后，含章把最早六名发热者的去处重新摊了一遍。不是为了再画一张更漂亮的表，而是因为','第七日午后，含章把最早六名发热者的去处重新摊了一遍。'));}

    // UI：跳转面板不显示开发说明；跳到晚章时给一个可读的正史预览状态。
    const oldJump=globalThis.v96Jump;
    if(oldJump&&!globalThis.__v97JumpWrapped){
      globalThis.__v97JumpWrapped=true;
      globalThis.v96Jump=function(ci,si=0){
        ci=Number(ci)||0;state.flags=state.flags||{};state.ranks=state.ranks||{};
        if(ci>=23){state.flags.v44NewEmpress='zhangyuanzhao';state.flags.v74ZhangSucceeded=true;state.ranks.zhangyuanzhao='皇后';if(state.ranks.ning==='皇后')state.ranks.ning='皇贵妃';}
        return oldJump(ci,si);
      };
    }
  }

  const prevRender97=render;
  render=function(){apply97();const out=prevRender97();apply97();const note=document.querySelector?.('.v96-devnote');if(note)note.remove();document.documentElement.dataset.build='v97';document.title='宫灯未眠 · 全篇语言精修 v97';return out};
  // Display revision is applied at bootstrap; settlement never rewrites it.

  apply97();

  // 运行时语言自检：只报前台明显不该出现的开发/剧透词。
  globalThis.V97_QA=function(){
    const bad=['本局张元照','本局中宫','转进支线','不在六宫位分册内、却仍在主线里的人','人物小传','这一幕说明','这条线意味着','让读者','玩家'];
    const issues=[];
    for(const ch of CHAPTERS||[])for(const st of ch.steps||[]){let a=[];try{a=arr(typeof st.text==='function'?st.text(state):st.text)}catch(_e){};for(const x of a)for(const q of bad)if(String(x).includes(q))issues.push(`${ch.title}/${st.heading}:${q}`);for(const c of st.choices||[])for(const q of bad)if(String(c.label||'').includes(q))issues.push(`${ch.title}/${st.heading}/choice:${q}`)}
    return {ok:issues.length===0,issues};
  };
  try{save()}catch(_e){};try{render()}catch(e){console.error('v97 render',e)}
}catch(e){console.error('v97 language patch failed',e)}})();
