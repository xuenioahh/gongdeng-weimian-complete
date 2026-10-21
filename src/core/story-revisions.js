function reviseStory139(){
    const ch=t=>CHAPTERS.find(c=>c.title===t),step=(t,h)=>ch(t)?.steps.find(x=>x.heading.includes(h));
    const set=(t,h,text,choices)=>{const st=step(t,h);if(st){st.text=text;if(choices)st.choices=choices;st.v139Revised=true;}return st;};
    const finalChildren=s=>{
      const heirs=children138(s);
      const child=key=>heirs.find(x=>x.key===key);
      const lines=[];
      const eldest=child('ruoxi');
      if(eldest)lines.push(eldest.dead?'令兮的小工房已久无人开门，刨花还留在旧箱里。':'令兮的小工房里，刨花卷着落地。');
      const ningyi=child('fifthPrincess');
      if(ningyi)lines.push(ningyi.dead?'宁矣的名字仍在玉牒上，她已不能再问那句“可以么”。':'宁矣不再事事先问可以不可以。');
      const yaner=child('sixthPrincess');
      if(yaner)lines.push(yaner.dead?'晏尔曾追问一条规矩最后落在谁身上。':'晏尔还会追问一条规矩最后落在谁身上。');
      const yizai=child('latePrincess');
      if(yizai)lines.push(yizai.dead?'宜哉没能长大，名字仍留在册上。':'宜哉还小，未必懂得长辈为什么忽然沉默。');
      return lines.join('');
    };
    const finalZhou=s=>{
      const daughter=children138(s).find(x=>x.key==='twinGirl');
      if(daughter?.dead)return '周清漪有过不敢说的话。二公主的名字仍留在玉牒上。';
      if(daughter)return '周清漪有过不敢说的话，她的女儿后来终于不再替所有人圆场。';
      return '周清漪有过不敢说的话。';
    };
    const zrank=(rank,flags={})=>({ranks:{zhangyuanzhao:rank},flags:{...flags,v139ZhangCareer:true}});
    const enrollment=ch('空宫点灯');
    if(enrollment&&!enrollment.steps.some(x=>x.v139Required))enrollment.steps.push({
      heading:'九月 · 迁宫册最后一页，写的是张元照',cast:['gu','zhangyuanzhao','afu'],fx:'ink',narrative:true,v139Required:true,
      text:[
        '第二批新人的箱笼安置完，顾明宜把迁宫册送到御前。前面是新人的住处，最后一页却另夹着张元照几年来经手的旧单。',
        '从答应晋常在以后，她在景阳宫东配殿又住了数年。宫人调值、病后复差、领物交接，原本没人愿意追的小错，她一条条问过，也留下几条自己看错以后重写的。',
        '皇后没有把这些说成奇功。她只道：“日子久了，做得稳的人，也该往前坐一席。臣妾拟晋张贵人。”',
        '我翻到末页。那一行先写错、又被横划改正的小字，还清清楚楚留在纸上。',
        '册旨送到景阳宫时，张元照先问原册要送到哪里。听说仍存尚宫局，她才松了口气：“那就好。往后查错，别只拿新抄的那一本。”'
      ],choices:[{label:'准晋张贵人，原册与改册一并留存',effects:zrank('贵人',{v139ZhangGuiren:true}),result:'张元照由常在晋贵人，仍居景阳宫东配殿。册封依已经核过的年资与差事，不牵涉有孕。'}]
    });
    set('凤仪宫最后一冬','请功折送到御前',[
      '疫后的请功折终于送来时，顾皇后的丧仪还没有办完。白纸压在红纸上，谁也没有先开口说吉利话。',
      '张贵人经手过的病籍、交班簿和药房出入单另装一匣。六宫能重新开门，不是她一个人的功劳；但那些原先只算作杂务的事情，确实救下过人。',
      '礼部拟晋嫔位。我在旁边添了一个“文”字，又把拟好的“纤尘无误”划去。册封不必先把一个人写成从未犯过错。',
      '太后看完，问：“追责那一本呢？”',
      '“照查。”我说，“有功就封。有错的地方，也不因此免了。”'
    ],[
      {label:'晋文嫔，明列办疫之功',effects:zrank('嫔',{zhangFeverMerit:true,v46ZhangEpidemicHero:true,v139ZhangPin:true}),result:'张贵人晋文嫔。功簿写清她实际做过的事，也列明共同经手者，不把众人的功劳归给一人。'},
      {label:'晋文嫔，将功簿与追责结果一并颁下',effects:{...zrank('嫔',{zhangFeverMerit:true,v46ZhangEpidemicHero:true,v139ZhangPin:true,v139MeritWithReview:true}),trust:{zhangyuanzhao:2}},result:'册封与追责同时落定。张元照接了文嫔册，也把自己该补签的两页旧记录补全。'}
    ]);
    set('雪尽宫门','大封 7/8',[
      '轮到景阳宫时，裴景和念的是“文嫔张元照”。她已经受过嫔册，这一次不是再把同一份疫中功劳念一遍。',
      '疫后开宫门、重排复值、把漏掉的名字补回去，几个月的善后已有复核。礼部拟晋文妃，并准她会同尚宫局总核三册。',
      '妃位意味着独当一面的体面，也意味着她的签字会让更多人无法再往上求。她看着册书，没有先笑。',
      '“这些册子出了错，”她问，“还能有人退回来么？”',
      '我让人在谕旨末尾添上复核日期：“你的字也一样。”'
    ],[
      {label:'册封文妃，三册按季复核',effects:zrank('妃',{v55Seal_zhangyuanzhao:'promote',v139ZhangFei:true}),result:'文嫔晋文妃。景阳宫的册书、月例与人物名册同日更换；三册按季复核，不能只凭她一人签名结案。'},
      {label:'册封文妃，先试办半年再定三册职掌',effects:{...zrank('妃',{v55Seal_zhangyuanzhao:'office',v139ZhangFei:true,v139ZhangTrial:true}),trust:{zhangyuanzhao:2}},result:'文妃位分即日生效，三册职掌先试半年。她接过册书，另把半年后的复议日期写在纸边。'}
    ]);
    set('中宫空悬','张元照再有一阶可进',[
      '文妃的册书在景阳宫放了数年。最初借来的几本册子，后来变成每季都要交到御前的复核卷。好用的做法留下，拖慢事情的也撤过两次。',
      '中宫久悬，祭礼、命妇朝见和皇子女大礼不能永远各递一份到御前。太后把礼部重议的册文送来：特晋文皇贵妃，副理六宫。',
      '这是特旨。册文逐项写明年资、办疫、善后与数年总核的考绩，没有把她从低位径直推上凤座，也没有说副理六宫便是许了后位。',
      '邵明贞看完，先把“文妃”二字改成新的称谓。张元照却问我：“往后有人说我错了，先递到哪里？”',
      '“照旧能递御前。”',
      '她看了我一会儿：“不能只写‘照旧’。得写清谁收，多久回。”'
    ],[
      {label:'晋文皇贵妃，副理六宫；申诉仍直达御前',effects:zrank('皇贵妃',{zhangSecondMerit:true,v139ZhangHighRank:true,v139DirectAppeal:true}),result:'文妃特晋文皇贵妃，奉命副理六宫。对其处分有异议者，可依明定期限另呈御前。'},
      {label:'晋文皇贵妃，副理六宫；每季由尚宫局另册复核',effects:zrank('皇贵妃',{zhangSecondMerit:true,v139ZhangHighRank:true,v139SeparateReview:true}),result:'文妃特晋文皇贵妃。副理六宫与独立复核同时写入册命，职掌不等于免受查问。'}
    ]);
    const seal=step('中宫空悬','凤印前最后一道旨');
    if(seal){
      seal.text=s=>[
        '两份册后拟旨放在御案上。张元照已经以文皇贵妃副理六宫；邵明贞的年资、宫务与宗亲礼序也逐项核过。如今要决定的，是谁来做最后签字的人。',
        '我没有让她们站在殿里等。凤印匣扣着，匣边没有写任何一个人的名字。',
        '若由张元照接印，她要把已经试过的办法带进中宫；若先由邵明贞接印，张元照仍以皇贵妃辅理，不能越过皇后的裁断。',
        '这一笔会改变她们先后走过的路。路上的事不能省，坐过凤座的人也不能当作从未来过。'
      ];
      seal.choices[0].requires=s=>s.ranks?.zhangyuanzhao==='皇贵妃';
      seal.choices[0].label='册文皇贵妃张元照为皇后';
      seal.choices[1].label='先册邵明贞为皇后，文皇贵妃辅理六宫';
      seal.choices[1].requires=s=>s.ranks?.zhangyuanzhao==='皇贵妃';
    }
    const after=ch('中宫空悬').steps;
    for(const st of after.filter(x=>/凤印落在谁手里以后|册后礼成后的|册后第三月/.test(x.heading))){
      const old=st.text;
      st.text=s=>s.flags.v44NewEmpress==='ning'?(st.heading.includes('册后礼成')?[
        '册后礼成那一晚，沈知微送来新茶。邵明贞卸下沉重的冠，额角还留着一道红印，先让人把张元照叫来。',
        '茶喝到第二盏，邵后说：“外面有人说，你替我做事，我替你挡责。”',
        '元照没有立刻接话。沈知微把茶盖轻轻放下，等她们说完。',
        '“我不答应。”邵后道，“我签的字，我要亲自看。你觉得不对，也不能因我如今是皇后便少说一句。”',
        '张元照看着她，忽然笑了：“那娘娘往后怕是要嫌臣妾话多。”',
        '邵明贞也笑了一下。那夜的茶没有很快凉下去，凤仪宫却第一次有了同从前不同的声音。'
      ]:st.heading.includes('册后第三月')?[
        '邵后受册第三月，一名亡故宫女的母亲到宫门外领恤银。值房照新册查了三遍，查不到女儿的名字。',
        '张元照查出，旧名已经从当差册划去，恤籍却还没誊完。账上的银子不曾少，宫门外的人却等了整整两日。',
        '邵后听完，让经手人把老妇请进避风的值房，先给热饭，又亲自署了补付的单。她没有先问按旧例该算谁的错。',
        '“旧名为什么要先划？”她问。',
        '尚宫局答不上来。邵后把那页纸摊平：“人不在了，名字也得留到事情办完。”',
        '元照在旁边记下这句话。她的册子里，由此多了一件不是自己先想出来的办法。'
      ]:[
        '册后旨意颁下，邵明贞入主凤仪宫。她从顾皇后留下的旧柜前走过，停了一会儿，没有让人先换掉所有陈设。',
        '张元照以文皇贵妃身份在下首行礼。裴景和念完新的座次，殿里安静得能听见衣料落在席上的声音。',
        '邵后接过第一摞宫务，先把自己要问的三处折了角，才让人送到尚宫局。',
        '散席前，她对我说：“往后请陛下把该问臣妾的话，先问臣妾。”',
        '我应了。元照站在廊下，也听见了。那一日没有谁被略过去，中宫最后签字的位置，真正在她手里。'
      ]):typeof old==='function'?old(s):old;
    }
    // 两条路都在张元照接印后进入这一章的共同正文，不保留空白占位选项。
    const pen=ch('帘后朱笔');
    const restoredLabels={
      '雨声把奏折压得更低':['准皇后分阅指定折子，朱批仍由御前落笔'],
      '和妃把一句太直的话改了三遍':['让她们把问目写清，原折仍留养心殿'],
      '灯下三个人都知道这件事太好用了':['把能做与不能做的事，一同写入值簿'],
      '承熙十五年十月旧事 · 一页废稿到了都察院':['先写明朕曾授权分折，再审私留副稿之过','命皇后交出完整经手簿，由三司逐项查验'],
      '朱笔重新落回我手里':['收下完整案卷，准下一件事照常呈报']
    };
    for(const st of pen.steps){const labels=restoredLabels[st.heading];if(!labels)continue;st.choices=st.choices.map((c,i)=>{const out={...c,label:labels[i]||labels[0],effects:c.v66OriginalEffects||c.effects||{}};delete out.v66Conditionalized;delete out.v66OriginalEffects;return out;});}
    set('帘后朱笔','雨声把奏折压得更低',s=>[
      s.flags.v74ZhangSucceeded?'邵明贞还印以后，张元照受册入主凤仪宫。此前一年多的宫务移交用了四十九日，旧案上邵后的署名一处也没有换成新后的。':'张元照受册入主凤仪宫，已过了最初三个月。景阳宫的旧案桌搬来以后，她仍在纸边留下没解开的空格。',
      '入夏的一场雨把我的旧伤又逼出来。折子压在御案上，张皇后只在西暖阁另设的小案边坐下。',
      '她分开急报与例行，圈出同一笔银两在两份折子里的不同数目，却没有替我写“准”。',
      '“臣妾能查出问目。”她把折子推回来，“最后让谁担责，陛下要亲自看。”',
      '我把朱笔拿起来。窗外雨声很大，隔着雨，尚宫局仍在等下一张回单。'
    ]);
    set('帘后朱笔','陛下为什么总叫我来',[
      '雨停时，西暖阁只剩我和张皇后。她把最后一本折子合上，没有起身：“陛下，臣妾想问一句私话。”',
      '“陛下不爱臣妾。臣妾也没有把受凤印当作一场姻缘。”她停了一下，“那为什么有些夜里明明没有宫务，仍叫臣妾来？”',
      '我看着桌上两盏放凉的茶。她问的不是宠不宠，而是这些年相对坐过的长夜，在我心里究竟叫什么。'
    ],[
      {label:'“因为朕敢在你面前说，这件事朕不知道怎么办。”',effects:{trust:{zhangyuanzhao:5},flags:{v75EmperorZhangBond:'confidant'}},result:'她说：“知己也不能替陛下把错误收起来。”我答：“所以才叫你来。”'},
      {label:'“有时候没有事，朕只是想让你坐在那儿。”',effects:{bond:{zhangyuanzhao:4},flags:{v75EmperorZhangBond:'family'}},result:'她没有笑我。过了一会儿，她问：“家人也可以当面说不么？”我说可以。'},
      {label:'“因为难事来了，朕知道你会把你那一份做完。”',effects:{trust:{zhangyuanzhao:5},flags:{v75EmperorZhangBond:'partner'}},result:'她把茶盖轻轻扣上：“一起做事的人，也得能一起把做错的事说清。”'}
    ]);
    for(const st of ch('雪尽宫门').steps)for(const c of st.choices||[]){if(!c.v55Promote)continue;const key=c.v55Promote;c.label=s=>{const ranks=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'],p=person138(key,s),next=ranks[ranks.indexOf(p.base)+1];if(!next||ranks.indexOf(p.base)<0)return '维持'+p.title+'，记功加赏';const cap=globalThis.V63_RANK_CAPS?.[next];if(cap&&globalThis.v63RankCount?.(next,s)>=cap)return next+'位额已满，维持'+p.title+'并加赏';return '晋封'+person138(key,{...s,ranks:{...s.ranks,[key]:next}}).title;};}
    const lastSeal=step('雪尽宫门','大封 8/8');
    if(lastSeal){
      const originalText=lastSeal.text,originalNarrative=lastSeal.narrative;
      lastSeal.text=s=>person138('zhao2',s).admitted?(typeof originalText==='function'?originalText(s):originalText):['这一页原为王氏预留。她没有在本局留牌入宫，尚宫局将空页抽出，红旨不列她的名字。'];
      Object.defineProperty(lastSeal,'narrative',{configurable:true,enumerable:true,get(){return !person138('zhao2').admitted||originalNarrative;}});
      for(const choice of lastSeal.choices){const label=choice.label,result=choice.result;choice.label=s=>person138('zhao2',s).admitted?(typeof label==='function'?label(s):label):'略过未入宫者的册页';choice.result=s=>person138('zhao2',s).admitted?(typeof result==='function'?result(s):result):'';}
    }
    const finale=ch('万家灯火');
    finale.bridge='宫门开合二十余年，有人离去，有人长成。张元照已经走过景阳宫与凤仪宫；养心殿的灯，却一夜比一夜亮得更久。';
    set('万家灯火','储位终于写进密匣',[
      '承熙二十一年，储位议定，密诏封入匣中。礼部、内阁与宗人府各存手续，原诏仍留御前。',
      '张皇后没有代我落这最后一笔。她把密匣外的交接册推过来：“钥匙谁拿，启匣谁在场，也写清。”',
      '我想说不至于这样急。话到嘴边，却只叫裴景和把灯拨亮一点。'
    ]);
    set('万家灯火','不许我一个人走长廊',[
      '到承熙二十二年冬，我从寝殿走到西暖阁，中间已经要歇一次。消渴与旧伤轮流磨人，太医换过方，夜里的水仍喝不够。',
      '张皇后让廊下多添一张矮凳。我嫌难看，她说：“坐下来喘口气，不算输。”',
      '她没有替我说身体一定会好。只把明日最急的两份折子先挑出来，其余压在后面。'
    ]);
    set('万家灯火','养心殿没有熄灯',[
      '冬至后第三夜，我已看不清屏风上的山水。太医跪在榻前，手指离开腕脉以后，没有立刻收回药箱。',
      '我知道他们在等什么。裴景和站了半生的那块地砖，忽然像离床很远。',
      '张元照坐到近处。她还穿着入夜时的衣服，袖边压出一道折痕。',
      '我想起第一次在御前见她，那时她还没有封号，答完一句话以后，会认真等我有没有听懂。如今她仍在等。',
      '这一回，我能留给她的话已经很少。'
    ]);
    const death=set('万家灯火','白玉扳指终于不转了',s=>[
      '<b>张元照视角</b>',
      '承熙二十二年冬，冬至后第四日，寅时。皇帝杨叙崩于养心殿。',
      '太医说出“大行皇帝”四个字时，我仍握着他的手。那只手还没有全冷，殿里却已经换了一个朝代的称呼。',
      s.flags.v82LastWord==='hand'?'他最后握过我的手，没有留下另一句话。那一点力气退去以后，再没有回来。':s.flags.v82LastWord==='work'?'他最后还说，明天的折子，让我先看一眼。天快亮了，明天已经到了。说这句话的人却没有等到。':'他最后叫的是我的名字。不是皇后，也不是任何一个封号。那两个字落下来，像灯芯燃尽时极轻的一声。',
      '裴景和跪了下去。哭声从屏风内传到廊下，又被闭着的宫门截住。遗诏尚未宣读，百官还不知道；这片极短的寂静里，我竟听见檐角一滴融雪落进铜盆。',
      '我把他的手放回衾里。随后，殿外有人问，储君、宫门、遗诏，先请哪一道令。',
      '从前这些问句最后总会送到他那里。现在，它们停在我面前。'
    ]);if(death)death.v139Perspective='zhangyuanzhao';
    const power=set('万家灯火','她第一次没有人可以回头问',s=>[
      '<b>张元照视角 · 大行皇帝梓宫移奉以后</b>',
      '白幡从宫门垂到石阶。新帝依遗诏即位，尊我为皇太后，又请我暂留西暖阁，会同内阁共议国事。期限写一年，届期复议。我让他们把这四个字念了两遍。',
      s.flags.v81PrinceOpenEnding?'新帝杨顺恭尚年轻，遗诏让我临朝听政，待朝局稳后再议归政。钥匙、名册、急报一件件送到我手边；每次点头，我都知道这些决定日后要向他交代。':'新帝杨顺谦已经成年，有自己的朝臣，也会有自己的判断。可眼前这场交接里，钥匙、名册、急报仍一件件送到我手边。人们等我点头的神情，我曾在杨叙面前见过无数次。',
      '我走回空着的凤仪宫。阿芙点好灯，把一碗放温的粥搁在案边。凤印已封存，新朝第一叠待议的折子就在旁边。',
      s.flags.v75ShenFate==='death'?'知微也死了。她的罪名、我的处分、最后一盏茶，都还在旧案里。没有哪一行批语能替我回答：若再有一回，我是否仍会这样写。':s.flags.v75ShenFate==='fief'?'知微在远方的封地。信能到，人却不能再像从前那样，听见我迟迟不落笔，便把茶往前推一点。':s.flags.v75ShenFate==='religion'?'知微在宫外女观。她还活着，我也还能去看她；只是我们约定过，只喝茶，不带折子。如今我才知道，守住这句话有多难。':'永和宫那只茶盖合上的声音，仍像在耳边。我却已经不能指望，永远有另一个人替我斟酌未出口的话。',
      '从顺王府到凤仪宫，我最不肯的，就是让别人替我填答案。如今一张纸递来，我可以放一个人回家，也可以让一扇门终身不再开。这支笔是我自己接的，往后写下什么，也都该由我担着。',
      '我仍喜欢权。喜欢一件拖了很久的事终于能办，喜欢被搁在门外的名字终于有人听见。可那些盼望我做主的人，不会因此只送来我擅长的难题。',
      '窗纸上晃过一阵树影。我几乎要像往常那样回头，问他这一笔怎么看。话没有出口，我便记起，杨叙已经死了。',
      '我坐下来。粥还温着，纸边空着一格。'
    ]);if(power)power.v139Perspective='zhangyuanzhao';
    const end=set('万家灯火','城外的灯比宫灯多',s=>[
      '<b>张元照视角 · 新朝第一夜</b>',
      '雪停以后，宫城像浮在一层淡白的雾里。远处更鼓敲过，声音越过一重重屋脊，到了城外，已分不清从哪一道门传来。',
      '我站在丹陛尽头，忽然觉得这些年的人都还在某一扇窗后。太后的手炉没有添炭；顾明宜正把纸角压齐。那张留下来的临时单，比凤仪宫的灯活得更久。',
      '拾遗阁的笑声曾那样亮。抱朴向人走来时，满身颜色像要把一整个失去的故国都穿回来。含章在她身后抚平袖口，一次次分清自己看见的、猜到的、不知道的。',
      s.flags.wenhengDead||s.flags.wenhengFate==='dead'?'闻人蘅的银簪已随她入土。可她曾经问过的那句“能保住谁”，仍隔着岁月，向每一个握权的人问来。':s.flags.wenhengFate==='return'?'闻人蘅已经离京。极远的旧陵与宫墙隔着山河，我看不见她窗前的灯，只记得她扶正银簪时那一点停顿。':s.flags.wenhengFate==='west'?'闻人蘅仍在西苑。隔着宫墙，我看不见她的灯，只记得她扶正银簪时那一点停顿。':'闻人蘅扶正银簪时那一点停顿，我还记得。她曾问“能保住谁”；如今再想起，案头仍有许多事要答。',
      '方小满从来没想过站在这里。她只想把袖口缝好，问清水房怎么走。阿芙的钥匙后来换过几串，手上做的却仍是那些事：扶人起来，把门打开，把漏掉的名字补回去。',
      s.flags.v74ShaoThenZhang?'我记得邵明贞做皇后的那一年。她认真执过凤印，也亲手交还过。那一年不能并进我的中宫年月，也不是专为等我接位。':'我也记得邵明贞。她能把礼序数得清楚，却终究没拿自己的姓氏替每个人决定去处。',
      '霍素英带来的北营旧簿还存着。梁素贞箱上那段黑桐油绳，我也记得。崔静仪把账册丝带重新系好，宋文秀则把并得太满的表拆成两页。',
      '许淑惠行礼前默数的步骤，没有救下她。许令宜后来递上一册少了一页的案卷；阿芙把缺页补回来时，纸上的人名和责任都变了。',
      `${finalZhou(s)}${finalChildren(s)}`,
      '外城灯火慢慢显出来。近处是卖热饼的摊，河边有迟归的船；更远的村舍，我站得这样高，也只能看见几点微光。',
      '那些灯各自为等归家的人亮着。它们并不认识我。可一份被压住的疫报、一次迟了的开仓、一道写得太快的旨意，真能让许多扇窗一夜黑下去。',
      s.flags.v82ZhangRegency==='power'?'我愿意继续执印。往后凡由我署名的文书，也得准人带着原卷来问。':s.flags.v82ZhangRegency==='duty'?'我答应先陪新帝走过这场交接。期限到了，留下还是退出，要再议一次。':'我还没有替余生作答。明日的事，等明日把卷宗摊开再定。',
      '身后，阿芙轻声道：“太后，前殿的人到了。”',
      '我回头。养心殿那个人已经不在，沿途却还有许多盏灯。风吹起衣袖，我想起景阳宫窗边那些一直没有填满的小格。',
      '我走进殿里。众人起身，等我先说话。',
      '“把原卷也拿来。”我说，“不急着替谁写完。”'
    ]);if(end)end.v139Perspective='zhangyuanzhao';
  }

reviseStory139();
