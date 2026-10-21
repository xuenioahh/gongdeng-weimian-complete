(()=>{try{
  // Scene illustrations remain attached to their matching chapter/moment in SCENE_MEDIA.
  // Individual portraits (asset-031–058) are rendered from each scene's cast; porcelain
  // (asset-017–030) stays locked to the ending gallery as required by the current design.
  const annalPlain=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
  const annalEscape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lowPregChapter=CHAPTERS.find(c=>c.title==='宫灯渐繁');
  const lowPregStep=lowPregChapter?.steps?.find(s=>String(s.heading||'').includes('一位低位新人先有了孩子'));
  const lowPregChoice=lowPregStep?.choices?.find(c=>c.effects?.flags?.promoteLowPregnant);
  const lowPregMother=()=>{const chosen=(state?.flags?.lowConsorts||[]).filter(k=>['cao2','zhao2','lin2','ye2','du2','su2'].includes(k));let k=state?.flags?.lowPregnancyKey;if(!chosen.includes(k))k=chosen[0]||null;if(k&&state?.flags)state.flags.lowPregnancyKey=k;return k;};
  if(lowPregChoice){Object.defineProperty(lowPregChoice,'label',{configurable:true,get(){const name=PEOPLE?.[lowPregMother()]?.name||'低位妃嫔';return `${name}有喜，照例晋一级`;}});lowPregChoice.result=()=>{const name=PEOPLE?.[lowPregMother()]?.name;return name?`${name}接旨时紧张得把册书拿反。宫里笑了半日，第二天便把注意力重新移开。昭氏却记住了这件事。`:'低位妃嫔接旨，依例晋一阶。'};}
  const lowNoPromotion=lowPregStep?.choices?.find(c=>c.effects?.flags?.lowNpcNoPromotion);
  if(lowNoPromotion)lowNoPromotion.result=()=>{const name=PEOPLE?.[lowPregMother()]?.name;return `皇后照旨只加月例。${name||'这名低位宫嫔'}没有抱怨，反而松了口气，说自己还没记熟新位分的礼。昭氏听说以后只问一句：“原来有孩子也可以不晋。”`;};
  const classicalChoice=(label,result)=>{
    const raw=annalPlain(label).replace(/[。！？；]+$/,'').trim();
    if(!raw||raw==='继续'||raw==='继续阅读')return '';
    const pregnancy=raw.match(/^(.+?)(?:有喜，照例晋一级|报喜后依例晋一阶|报喜，准依例晋一阶)$/);
    if(pregnancy)return `${pregnancy[1]}报喜，帝准晋一阶。`;
    const seasonalSummons=raw.match(/^(?:这一季，)?多召(?:故废妃 |故皇后 |故和贵妃 |昭嫔 |昭妃 |皇后 |和妃 |方常在 |方贵人 |方妃 |珍嫔 |珍妃 |文妃 |文皇贵妃 )?(.+)$/);
    if(seasonalSummons&&/^(闻人抱朴|闻人含章|闻人蘅|顾明宜|沈知微|方小满|张元照|邵明贞|霍素英|崔静仪|周清漪|王静娴|何超英|林淑贞|梁素贞)$/.test(seasonalSummons[1])){
      const name=seasonalSummons[1];
      if(name==='顾明宜')return '帝数临凤仪宫，与顾明宜相见。';
      if(name==='沈知微')return '帝数幸永和宫，与沈知微相见。';
      if(name==='张元照')return '帝数召张元照入见。';
      return `帝数召${name}入侍。`;
    }
    const exact={
      '按例宿凤仪宫':'帝宿凤仪宫。','移驾永和宫':'帝幸永和宫。','回养心殿':'帝还养心殿。',
      '去永和宫':'帝幸永和宫，与和妃叙旧。','让这盏灯烧完':'次日换回大晟宫装，窗台尚留灯油。','回养心殿':'帝还养心殿。',
      '“宋氏停半月例。春屏调出近身，冰库小吏革差。”':'帝命停宋文秀半月月例，徙春屏出其近身，革冰库吏差。','宋氏停半月例。春屏调出近身，冰库小吏革差。':'帝命停宋文秀半月月例，徙春屏出其近身，革冰库吏差。',
      '按妃位加产后赏，不再另晋':'周嫔产后加赐赏银及二公主月例，位分仍旧。','听雨轩夜里，阿芙照料方小满':'夜间小灰病发，方小满守之，阿芙侍侧。','明旨重审沈氏旧案':'帝命重审沈知微兄长旧案。','昭雪沈知微兄长，并将当年御批一并入档':'帝昭雪沈知微兄长旧案，并将当年御批收入档册。',
      '当场处死':'帝命处死行刺者闻人抱朴。','救驾有功，不晋位，只记功厚赏':'闻人含章救驾，帝记其功、厚赐而不晋位。','准她退居西苑，从此免请安、免承宠':'帝准闻人蘅退居西苑，免请安、免承宠。','先去见她':state.flags?.fangInvestigation==='threeDays'?'帝亲往听雨轩见方小满最后一面。':'帝亲往偏院见方小满最后一面。','先追送药人':state.flags?.fangInvestigation==='threeDays'?'帝先追煎药房替班者，未及见方小满最后一面。':'帝先追持假口谕送药者，未及见方小满最后一面。',
      '小选六人':'帝命小选六人入宫。','梁素贞、宋文秀、许淑惠三人留牌':'梁素贞、宋文秀、许淑惠三人留牌入宫。','诏梁氏跟霍氏学宫中骑射礼':'诏梁素贞从霍素英习宫中骑射礼。','让梁氏跟霍氏学宫中骑射礼':'诏梁素贞从霍素英习宫中骑射礼。','诏崔氏交出旧贡造清册，崔家退出宫中独供':'诏崔静仪交旧贡造清册，崔家不得独供宫中。','让崔氏交出旧贡造清册，崔家退出宫中独供':'诏崔静仪交旧贡造清册，崔家不得独供宫中。','诏三皇子亲自去给伴读赔礼，并恢复原伴读':'帝命三皇子向伴读致歉，复其伴读之职。','让三皇子亲自去给伴读赔礼，并恢复原伴读':'帝命三皇子向伴读致歉，复其伴读之职。',
      '让和妃协理内廷账册':'诏和妃协理内廷，掌内廷库册。','晋周嫔为周妃':'晋周嫔为周妃。','位分与宫务都暂照旧':'六宫位分、宫务悉仍其旧。',
      '长女贵人，次女常在':'帝册闻人抱朴为昭贵人，闻人含章为珍常在。','姐妹同封贵人':'闻人抱朴、闻人含章并封贵人。','姐妹都从常在起':'闻人抱朴、闻人含章并授常在。',
      '闻人姐妹同居拾遗阁，共用一班宫人':'闻人抱朴、闻人含章同居拾遗阁，共用一班宫人。','长女贵人，次女常在':'帝册闻人抱朴为昭贵人，闻人含章为珍常在。',
      '替听雨轩挡一挡':'帝命退还借势馈礼，听雨轩门前自次日起稍静。','不替她挡':'听雨轩来客渐增，阿芙分类记礼，方小满仍逐盒回礼。',
      '册方小满为答应，赐听雨轩；阿芙随侍':'帝册方小满为答应，赐居听雨轩，命阿芙随侍。','照例晋方答应为常在':'晋方小满为常在。',
      '特旨册为蘅嫔，准留旧银簪与常服':'特旨帝册闻人蘅为蘅嫔，许其仍佩旧簪、服常衣。','特旨册为蘅嫔，衣冠礼制尽改大晟宫制':'帝特旨册闻人蘅为蘅嫔，衣冠悉改大晟制。',
      '册为蘅嫔，准留旧银簪与常服':'帝册闻人蘅为蘅嫔，许其仍佩旧簪、服常衣。','留拾遗阁，与两位宫嫔同院':'诏蘅嫔居拾遗阁，与闻人姐妹同院。',
      '晋珍嫔，明旨赐册':'晋闻人含章为珍嫔，明册之。','晋珍嫔，免繁册礼并赐御前牌':'晋闻人含章为珍嫔，赐御前牌。',
      '晋一级，明旨赐册':'帝晋闻人含章为贵人，明册之。','照例晋一级，行全礼':'帝晋闻人抱朴为昭妃，行全册礼。','依例晋一阶，行全礼':'帝晋闻人抱朴为昭妃，行全册礼。','依例晋一阶，行全礼册封':'帝晋闻人抱朴为昭妃，行全册礼。',
      '晋顺贵人，照例告六宫贺喜':'帝晋方小满为顺贵人，命六宫称贺。','晋顺贵人，只受册印免各宫来贺':'晋方小满为顺贵人，免六宫称贺。',
      '当席止议：皇嗣只论安康，不以形貌议祥祸':'帝禁宗宴以皇嗣形貌论祥祸，并入宴仪。','按六宫例召蘅嫔侍寝':'帝依六宫例召闻人蘅侍寝。','封宫静养，太医院专守':'蘅嫔封宫静养，太医院遣医专守。',
      '就留我点中的这些人':'帝命御前选定诸女留牌入宫，姓名录于册籍。','都从常在起':'诏留牌诸人同授常在，不以点名次序定高下。','宣旨':'册旨既下，低位留牌者各依所定位分入宫。',
      '问：“进宫以后，你最怕失去什么？”':'帝问诸女入宫所惧；邵明贞惧循旧例，霍素英惧失家书，崔静仪惧失分寸。',
      '问：“你们各自能替六宫做什么？”':'帝问诸女所长；邵明贞愿协祭礼女学，霍素英愿教骑射，崔静仪长于细账人情。',
      '不问，静看一炷香':'帝不发一问，静观邵、霍、崔三女立于御前。',
      '去看看大公主那边':'帝往凤仪宫视大公主。','进去，看梁素贞眼里的霍素英':'梁素贞入翊坤宫，与霍素英论驯鹰、弓弦。','进去，看和妃眼里的张元照':'沈知微入景阳宫，与张元照叙谈。',
      '宋氏停半月例。春屏调出近身，冰库小吏革差。':'宋文秀停例半月，春屏调离近身，冰库小吏革差。',
      '准她持御前临时牌，与皇后、太医院一同办疫务':'帝准张元照持御前临时牌，协同皇后、太医院办理疫务。','东所留一医官，另一人调去病院':'帝命东所留医官一人，余者悉调入病院。','晋文嫔，明列办疫之功':'帝晋张元照为文嫔，诏以办疫之功明载册籍。',
      '命追晋故顺贵人为顺嫔，另恤其家':'帝追封方小满为顺嫔，另恤其家。','追晋故顺贵人为顺嫔，另恤其家':'帝追封方小满为顺嫔，另恤其家。','晋封徽皇贵妃':'帝晋邵明贞为徽皇贵妃。','晋封故和皇贵妃':'帝晋沈知微为和皇贵妃。','晋封和皇贵妃':'帝晋沈知微为和皇贵妃。','晋封珍贵妃':'晋闻人含章为珍贵妃。','贵妃位额已满，维持珍妃并加赏':'闻人含章仍居珍妃，帝另加赏。','晋封周贵妃':'晋周清漪为周贵妃。','贵妃位额已满，维持周妃并加赏':'周清漪仍居周妃，帝另加赏。','晋封晋贵妃':'晋霍素英为晋贵妃。','贵妃位额已满，维持晋妃并加赏':'霍素英仍居晋妃，帝另加赏。','晋封元嫔':'晋崔静仪为元嫔。','妃位额已满，维持元嫔并加赏':'崔静仪仍居元嫔，帝另加赏。','册封文妃，三册按季复核':'帝册张元照为文妃，诏三册按季复核。','晋封王嫔':'帝晋王静娴为嫔。','晋王静娴为嫔':'帝晋王静娴为嫔。',
      '暂压此疏，入秋再议':'帝留此疏，俟秋再议。','撤回传召，让她今夜不必来':'帝撤张元照之召，令其今夜不必入养心殿。',
      '“崔家这条路，已经不是第一次出事了。”':'帝谓崔家之事再发，已非初见。','“先听她自己说。”':'帝命先听文皇贵妃自陈。','“着内廷详查，非朕亲审，不得妄动顺贵人。”':'帝命内廷详查，非经亲审不得妄动顺贵人。',
      '把记录留下，今夜只叫三皇子来':'帝留三皇子求见之录，独召其入见。','让他坐下，把那本册子从第一页说起':'帝与三皇子同阅旧册，未加训诫。','封存往来册，不作罪档':'帝命封存三皇子往来册，不作罪档。','照最严宗室教法：两师同教，半年内不准自行停课换师':'帝命两师共教三皇子，半年内不得擅停易师。','仍按年岁统一教养':'诸皇子女仍依年岁分班教养。',
      '此事止于御前，不许再对第二人提':'帝命此事止于御前，不立密档。','先改眼前这三行':'帝命先改宫务簿三行，未入密匣。','三本都先试一年':'诏三册先试行一年。','晋文皇贵妃，副理六宫；申诉仍直达御前':'帝晋张元照为文皇贵妃，命副理六宫，申诉直达御前。','准她归珂兰；以王族使节身份送出西门':'帝准黛拉归珂兰，以王族使节礼送出西门。','“值簿照原样留。张氏的名字也留。”':'帝命事故簿仍其旧，张元照之名不删。','册文皇贵妃张元照为皇后':'帝册文皇贵妃张元照为皇后。',
      '准皇后分阅指定折子，朱批仍由御前落笔':'准皇后分阅指定奏折，朱批仍由御前裁定。','“因为朕敢在你面前说，这件事朕不知道怎么办。”':'帝与张元照议分阅章奏，坦言尚无定策。','颁《经手留名令》，三年后必须复议':'颁《经手留名令》，约三年复议。','让她们把问目写清，原折仍留养心殿':'准皇后、和妃拟列问目，原折仍留养心殿。','把能做与不能做的事，一同写入值簿':'诏以值簿明记皇后、和妃职权边界。','“你自己定。定完以后，只告诉朕哪些事能做、哪些不能做。”':'张元照自定宫规，明申宫务、御前、皇嗣三界。','先试三年，人数只开十二名':'诏设女史十二名，先试三年。','吃这一块，晚膳后去走一圈':'帝节食少许，晚膳后步行。','把他说对的两条改掉，其余照常试行':'女史新制增急务先行后记、经手不得自断二条。','准许令宜入女史院，兼旧疫恤籍复核':'准许令宜入女史院，兼核旧疫恤籍。','继续查完整，不许只停在“春屏是宋氏的人”':'命彻查许氏旧疫案，不止于春屏。','让许令宜把缺页补回去，由她本人重新署名呈案':'春屏以直接加害论，宋文秀失察记过，许令宜降等留任。','先写明朕曾授权分折，再审私留副稿之过':'案卷先载分折拟稿皆奉口谕，再究私留副稿之过。','“赐死。罪名照实写，不改作病亡。”':'赐沈知微死，诏实录载罪，不得伪作病亡。','照沈知微自己的意思办':'准沈知微自决去留，禁顺王代为传话安置。',
      '按常例记入玉牒，不因生女替宋家恢复旧权':'宋氏公主入玉牒，宋氏不复旧权。','不罚她，孩子的照料照常留痕':'免究宋文秀之过，仍记公主衣药起居。','孩子入玉牒，军门贺礼一律按常例裁减':'梁氏皇子入玉牒，军门贺礼悉裁如例。','留在慈宁宫送母后一程':'帝留慈宁宫，送太后一程。','让她继续抓着袖口':'礼间四公主攥帝袖不放。','在风里站一会儿再回养心殿':'帝陪四公主立于风中，后还养心殿。','“女学的小工房由你自己拟章程。”':'诏大公主自拟女学小工房章程。','婚帖先留着，让她自己继续看':'婚帖暂留，命二公主自察婚事。','只查籍贯，不因相貌拿人':'命宗人府查陆既明籍贯，毋以异貌先罪之。','周妃把名字记下，却没有报御前':'周妃识出陆既明，未即奏闻。','让这一个下午只停在吃冰、关窗和旧伤上':'太医按常症为二公主调治，未作疑案。','周妃仍然没有报':'周妃藏其旧布，未奏陆既明之事。','这一夜，周妃还是没有说出旧布':'周妃秘旧布未告二公主，母女渐生嫌隙。','暂缓婚书，但亲口答应她：查清后由她自己决定':'暂缓婚书，俟查清陆既明身世，再由二公主自决。','把陆既明和那枚玉扣一起带到二公主面前，全部说清':'二公主知陆既明为双生弟，遂折断玉扣系绳，离京赴封邑。','让她自己离开这一间屋':'二公主自出宗人府，未替母弟解围。','准周妃随二公主去封邑，母女分院居住':'帝准周妃随二公主赴封邑，母女分院而居。','不动顾后追谥；把她的移出令与朕的秘处旨并列入实录':'顾后追谥、陵寝悉仍旧制；起居注并录其移子令与帝秘处旨。',
      '封好密匣':'储位既定，立三皇子杨顺谦为储君。','吃完这一小块，出去走一圈':'帝与张元照步出养心殿，往返乾清门。','叫她近一点':'帝召张元照近前。','“元照。”':'帝呼张元照，张氏应之。','先去看储君，再回前殿':'张元照命三皇子先往见帝，不令其遽习帝事。','“我留下。不是替他守，是我自己还想做。”':'张元照自请留任，愿亲理国事。','回殿':'帝后入殿，宫门未闭。',
      '初封嫔位，赐号“徽”':'帝册邵明贞为徽嫔。','初封嫔位，赐号“纯”':'帝册邵明贞为纯嫔。','初封贵人，赐号“徽”':'帝册邵明贞为徽贵人。',
      '初封嫔位，赐号“晋”':'帝册霍素英为晋嫔。','初封嫔位，赐号“毅”':'帝册霍素英为毅嫔。','初封贵人，赐号“晋”':'帝册霍素英为晋贵人。',
      '初封嫔位，赐号“元”':'帝册崔静仪为元嫔。','初封嫔位，赐号“贞”':'帝册崔静仪为贞嫔。','初封贵人，赐号“元”':'帝册崔静仪为元贵人。',
      '邵明贞初封嫔位，赐号“徽”':'帝册邵明贞为徽嫔。','邵明贞初封嫔位，赐号“纯”':'帝册邵明贞为纯嫔。','邵明贞初封贵人，赐号“徽”':'帝册邵明贞为徽贵人。',
      '霍素英初封嫔位，赐号“晋”':'帝册霍素英为晋嫔。','霍素英初封嫔位，赐号“毅”':'帝册霍素英为毅嫔。','霍素英初封贵人，赐号“晋”':'帝册霍素英为晋贵人。',
      '崔静仪初封嫔位，赐号“元”':'帝册崔静仪为元嫔。','崔静仪初封嫔位，赐号“贞”':'帝册崔静仪为贞嫔。','崔静仪初封贵人，赐号“元”':'帝册崔静仪为元贵人。',
      '昭雪沈氏，并将当年御批一并入档':'帝昭雪沈知微兄长旧案，并将当年御批收入档册。','昭雪沈氏，只更正军令与军法结论':'昭雪沈知微兄长旧案，改正军令与军法结论。'
    };
    if(exact[raw])return exact[raw];
    if(/^[“「『]/.test(raw)){
      const spoken=raw.replace(/^[“「『]/,'').replace(/[”」』]$/,'').replace(/[。！？；]+$/,'').trim();
      if(spoken)return `帝曰：“${spoken}。”`;
    }
    const yearTurn=raw.match(/^(?:翻到|进入)(.+)$/);
    if(yearTurn)return `纪年进至${yearTurn[1]}。`;
    const early={
      '留下，看大公主眼里的皇后':'帝留凤仪宫，观大公主与皇后相处。','让御辇继续往前':'御辇仍行，不入后宫。','替她扶住那根细竹':'帝为之扶竹。',
      '守在外间，不让钦天监先入绮春宫':'命守外间，禁钦天监先入绮春宫。','先看过两个孩子，再下旨':'帝亲验二子，乃后下旨。',
      '秘处异子：玉牒只留公主':'周嫔产下一子一女；帝命处死皇子，玉牒只录公主。','位分不动，只加产后赏与二公主月例':'帝于周嫔产后加赐赏银，增二公主月例，位分仍旧。',
      '翻到三月':'纪年进至三月。','让太医院按双胎准备，但不先传“祥瑞”或“异兆”':'命太医院按双胎备治，毋妄称祥异。'
    };
    if(early[raw])return early[raw];
    let s=raw.replace(/^让/,'诏').replace(/^准/,'准').replace(/^查/,'命查').replace(/^追/,'命追').replace(/^赐/,'赐').replace(/^册/,'册').replace(/^封/,'封').replace(/^晋/,'晋').replace(/^留/,'留').replace(/^选/,'选').replace(/^不许/,'禁').replace(/^允许/,'许');
    if(/^继续/.test(s))return '';
    if(/^(我|朕)/.test(s))s=s.replace(/^(我|朕)/,'帝');
    if(/[？?]$/.test(s))s=s.replace(/[？?].*$/,'');
    return (s||firstFact(result)||'上裁定此事。').replace(/[。！？；]+$/,'')+'。';
  };
  const firstFact=s=>{
    const text=annalPlain(s).replace(/^[“「『][^”」』]*[”」』]\s*/, '').trim();
    if(!text)return '';
    const sentence=(text.match(/^[^。！？；]+[。！？]?/)||[text])[0].replace(/[。！？；]+$/,'').trim();
    if(!sentence)return '';
    const compact=sentence.length>46?sentence.slice(0,44).replace(/[，、；：]$/,'')+'……':sentence;
    return compact+'。';
  };
  function selectedChoiceAnnals(chapterIndex,entry){
    const chapter=CHAPTERS[chapterIndex];if(!chapter)return [];
    const record=state.history?.[chapterIndex];
    const picks=Array.isArray(record)?record:(record==null?[]:[record]);
    const steps=chapter.steps||[{choices:chapter.choices||[]}];
    const recordedLabels=annalPlain(entry?.decision||'').split(/\s*→\s*/).filter(Boolean);
    let recordedIndex=0;
    const selected=picks.map((pick,stepIndex)=>{
      const step=steps[stepIndex],choice=step?.choices?.[pick]||(!chapter.steps?chapter.choices?.[pick]:null);
      if(!choice)return '';
      const identity=globalThis.SceneHistory151?.identity(chapter,step),event=identity?state.events151?.[identity.id]:null;
      if(step?.narrative)return event?.facts?.join('')||'';
      const recorded=recordedLabels[recordedIndex++];
      const label=recorded||((typeof choice.label==='function'?choice.label(state):choice.label)||'');
      if(event?.command)return event.facts.join('');
      if(event?.facts?.length&&/晋一级|晋一阶|都从常在|全部从答应|王静娴若/.test(label))return event.facts.join('');
      const result=typeof choice.result==='string'?choice.result:'';
      let sentence='';
      if(/^(?:就留我点中的这些人|就按我点中的名字留牌)$/.test(annalPlain(label).trim())){
        const selection=(entry?.changes||[]).find(x=>typeof x==='string'&&x.startsWith('御前亲点低位留牌 '));
        const names=selection?.replace(/^御前亲点低位留牌\s*/,'').trim();
        if(names)sentence=`帝择${names}留牌，命入宫。`;
      }
      if(!sentence)sentence=classicalChoice(label,result);
      if(!sentence)sentence=firstFact(result);
      return sentence;
    }).filter(Boolean);
    if(entry?.title==='帘后朱笔'&&state.flags?.v74ZhangSucceeded){
      const remaining=selected.filter(line=>!/先查到底|册张氏|邵氏还皇贵妃位/.test(line));
      return [
        '邵后掌宫一年，吏部、礼部与宗人府初核外戚荐帖、婚帖；三司结案，查无邵氏本人私荐受赂。',
        '三月二十八日，邵氏请解印务，凤印封入库；中宫空四十九日，需印宫务逐件送御前。',
        '五月十七日，帝册张元照为皇后；邵氏还皇贵妃位，退居景仁宫。',
        ...remaining
      ];
    }
    if(selected.length)return selected;
    const oldDecision=annalPlain(entry?.decision||'');
    const fromDecision=oldDecision.split(/\s*→\s*/).filter(Boolean).map(label=>classicalChoice(label,'')).filter(Boolean);
    if(fromDecision.length)return fromDecision;
    if(entry?.title==='香尽胎寒')return ['帝未召闻人抱朴、闻人含章、闻人蘅；含章翌日照常交还绿头牌，三人晚膳始分席。'];
    if(entry?.title==='极西来客')return ['礼部据盟议册黛拉为黛贵人，居承露馆；不入侍寝名册，亦不循常例传召。'];
    const fact=firstFact(entry?.result||'');
    return fact?[fact]:[];
  }
  const priorChronicle=chronicleView;
  if(typeof priorChronicle==='function'&&!globalThis.__v144Annal){
    globalThis.__v144Annal=true;
    chronicleView=function(){
      let html=String(priorChronicle());
      let row=0;
      html=html.replace(/<article>([\s\S]*?)<\/article>/g,(whole,inner)=>{
        if(!inner.includes('v117-annal'))return whole;
        const entries=selectedChoiceAnnals(row,state.chronicle?.[row]||{});row++;
        if(!entries.length)return whole.replace(/<details class="v117-private">[\s\S]*?<\/details>/,'');
        const annalDate=annalPlain(state.chronicle?.[row-1]?.date||'').replace(/[·・]/g,'').replace(/\s+/g,'');
        const lines=entries.map((line,idx)=>`<li>${idx===0&&annalDate?`${annalEscape(annalDate)}，`:''}${annalEscape(line).replace(/^承熙[^，]+，/,'')}</li>`).join('');
        let next=inner.replace(/<div class="v117-annal">[\s\S]*?<\/div>/,`<div class="v117-annal v144-annal"><b>史书记事</b><ol>${lines}</ol></div>`);
        next=next.replace(/<details class="v117-private">[\s\S]*?<\/details>/,'');
        const entry=state.chronicle?.[row-1],privateFacts=globalThis.SceneHistory151?.events(row-1,state).flatMap(e=>e.privateFacts||[])||[];
        if(entry?.decision||privateFacts.length)next+=`<details class="v151-private"><summary>当时的选择与御前附记</summary>${entry?.decision?`<p>${annalEscape(entry.decision)}</p>`:''}${privateFacts.map(fact=>`<p>${annalEscape(fact)}</p>`).join('')}</details>`;
        return `<article>${next}</article>`;
      });
      return html;
    };
  }
  document.documentElement.dataset.build='v146-scene-reading';
}catch(e){console.error('v145 map and seasonal scene integration failed',e)}})();
