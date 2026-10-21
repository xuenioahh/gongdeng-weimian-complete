(()=>{try{
  document.documentElement.dataset.build='v64';
  document.title='宫灯未眠 · 主控弧线与继后理由 v65';
  const V64_CUR=CHAPTERS[state.index]?.title;
  const CH=t=>CHAPTERS.find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));
  const IX=(c,q)=>c?.steps?.findIndex(x=>(x.heading||'').includes(q))??-1;
  const A=(v,s)=>{const a=typeof v==='function'?v(s):v;return Array.isArray(a)?a:[a];};
  const zt=s=>courtTitle(s,'zhangyuanzhao')||'张氏';
  const placeShift=(name,txt)=>`<span class="v64-place-shift"><b>${name}</b>${txt}</span>`;
  const rankBase=r=>{r=String(r||'');for(const x of ['皇贵妃','贵妃','妃','嫔','贵人','常在','答应'])if(r.endsWith(x)||r===x)return x;return null};

  // 1) 日历与季节栏：插入章节不再出现“承熙承熙”，季节不再一律回退成春。
  const v64CalendarOld=sceneCalendar;
  function inferSeasonV64(raw,fallback='春'){
    raw=String(raw||'');
    if(/腊月|十一月|十二月|正月|冬/.test(raw))return '冬';
    if(/八月|九月|十月|秋/.test(raw))return '秋';
    if(/五月|六月|七月|盛夏|夏/.test(raw))return '夏';
    if(/二月|三月|四月|春/.test(raw))return '春';
    return fallback;
  }
  sceneCalendar=function(ci,si){
    const old=v64CalendarOld(ci,si)||{};const c=CHAPTERS[ci],st=c?.steps?.[si];
    let date=String(old.date||c?.date||'').replace(/^承熙承熙/,'承熙');
    if(date&&!date.startsWith('承熙')&&/[元一二三四五六七八九十百0-9]/.test(date))date='承熙'+date;
    const raw=`${st?.heading||''} ${c?.date||''}`;
    return {date,season:inferSeasonV64(raw,old.season||'春')};
  };

  function seasonLineV64(c,st,cal){
    const where=String(c?.place||''); const h=String(st?.heading||'');
    if(where.includes('养心殿'))return /夜|二更|酒|灯/.test(h)?'西暖阁的灯照到深夜，院里巡更声一遍遍过去。':'西窗的光沿御案慢慢挪，朱砂和冷茶的味道一直没有散。';
    if(where.includes('凤仪宫'))return '请安的人声从廊下退远以后，凤仪宫才听得见檐水和猫爪落地。';
    if(where.includes('景阳宫'))return '窗缝里的风先动纸角，再动帘子；景阳宫的日子总从这些小动静开始。';
    if(where.includes('太医院'))return '药气压着潮气，廊下的脚步比别处急，天色也像落得更早。';
    if(where.includes('御花园'))return cal?.season==='夏'?'水榭边风比宫道凉半层，荷叶一翻，日影就在水面碎开。':'月门一转，宫墙后的风声和前一条路便不一样了。';
    if(cal?.season==='冬')return '窗纸上的天光短得很快，炭火稍一松，屋里便先冷下来。';
    if(cal?.season==='秋')return '午后的影子比上月长了一截，庭叶落在石阶上，扫完又来。';
    if(cal?.season==='夏')return '日头从宫墙上压下来，青砖到申时仍带着热。';
    return '檐下新叶一日比一日密，晨光也比上月更早进屋。';
  }
  const v64StoryOld=storyView;
  storyView=function(){
    let html=v64StoryOld();
    if((state.index===0&&!state.intro)||state.index>=CHAPTERS.length)return html;
    const c=CHAPTERS[state.index],st=c?.steps?.[state.chapterStep||0],cal=sceneCalendar(state.index,state.chapterStep||0);
    html=html.replace(/<small>(?:窗外寒色，灯下微暖|庭叶渐疏，暮色早临|日长帘静，暑气渐深|春光入户，庭草渐生)<\/small>/,`<small>${seasonLineV64(c,st,cal)}</small>`);
    html=html.replace('这一子，你落在哪里？',st?.v64Prompt||'殿里静下来，都在等我开口。');
    html=html.replace('这件事到了我这里。','轮到我说一句话。');
    return html;
  };

  // 2) 标题去掉“第一幕/第十二幕”式提纲编号；保留真正有时间意义的月份。
  for(const c of CHAPTERS){for(const st of c.steps||[]){
    st.heading=String(st.heading||'').replace(/^第[一二三四五六七八九十百]+幕(?:半)?\s*·\s*/,'').replace(/^尾声\s*·\s*/,'');
  }}
  const headingMap={
    '同一个病愈宫女，三个人给出三种答案':'她站在凤仪宫门外，不肯再进去',
    '一张宫务单送了三遍':'大公主的笄礼少了一个位置',
    '三份折子都写了“照旧”':'朱笔越来越短',
    '四个月很快过去':'秋灯一盏盏添起来',
    '夜宴里的人越来越年轻':'酒过二更，笑声还没有散',
    '守制结束以后，酒先回到案上':'第一坛酒重新开封',
    '大封后，宫中还有谁':'红旨落定以后',
    '这一次要不要给张元照进一级':'十一月，红册停在她名字旁',
    '最后一张名帖':'体元殿最后一页',
    '余下的名帖要留几张':'雨声里还压着六张名帖',
    '低位新人初封':'册页第一次写上她们的新称呼'
  };
  for(const c of CHAPTERS){for(const st of c.steps||[]){if(headingMap[st.heading])st.heading=headingMap[st.heading];}}

  // 3) 《窗开半扇》只承担“住下来”，不再从五月一路拖到七月底。
  const windowCh=CH('窗开半扇');
  if(windowCh){
    windowCh.date='承熙十一年·五月至六月';
    windowCh.theme='新雨洗过景阳宫的窗，新人终于开始按自己的方式过日子';
    windowCh.bridge=s=>`终选散场以后，秀女的小轿从体元殿一顶顶往后宫去。过了月门，前朝的钟声变远，迎面先是各宫来领人的嬷嬷、箱笼和新铺的席毡。张元照住进景阳宫东配殿时，没有谁等着她立刻做成一件大事。她先得知道哪扇门几点落锁、哪一碗茶是自己的、夜里想开窗时需不需要先问别人。`;
    const ren={
      '新主子进宫第一件事，是把香炉搬远':'景阳宫的窗先开了一条缝',
      '她把一天画成很多小方格':'纸边长出一排小方格',
      '梳子、口脂和筷子都不能顺手借':'一双筷子没有落回原处',
      '宫女打碎茶盏，她先问有没有烫到':'碎瓷落地以后',
      '她有一本只记自己的小册子':'那本只写自己的小册子',
      '王静娴说，她偏不爱写':'宫道尽头，两种记法',
      '七月最后一夜，窗还是开着半扇':'六月将尽，窗仍开着半扇'
    };
    for(const st of windowCh.steps||[]){for(const [a,b] of Object.entries(ren))if((st.heading||'').includes(a))st.heading=b;}
    const end=ST(windowCh,'六月将尽')||ST(windowCh,'七月最后一夜');
    if(end){const old=end.text;end.text=s=>A(old,s).map(x=>String(x).replace(/七月底闷热/g,'六月末已经闷热').replace(/第二日要做的事写成五格/g,'第二日要做的事仍写成五格').replace(/进入八月/g,'进入盛夏'));if(end.choices?.[0])end.choices[0].label='走进盛夏';}
  }

  // 4) 第二批新人真正和旧妃撞在一起：新增一整段盛夏，不急着进入时疫。
  if(!CH('荷风满座')){
    const wi=CHAPTERS.findIndex(x=>x.title==='凤仪宫最后一冬');
    const summer={date:'承熙十一年·六月下旬至七月',title:'荷风满座',theme:'新人与旧人终于不只在册页上并列，夏天把每个人的脾气都照得更清楚',place:'凤仪宫 / 冰库夹道 / 景阳宫 / 御花园水榭 / 养心殿',cast:['zhangyuanzhao','ruoxi','zhao2','hui','song2','ning','gu'],fx:'summer',bridge:s=>`六月以后，请安的座位终于不再需要宫女每天重量。新人认得了回宫的路，旧妃也记住了她们的脚步声。真正的磨合这才开始：谁先拿到一块冰、谁在宴席上被多问一句、谁的宫女敢借娘家的名头走近路——这些小事不致命，却最容易让人看见一个人以后会怎么活。`,steps:[
      {heading:'请安散后，廊下还挤着新鞋',cast:['gu','ning','ke','hui','zhangyuanzhao','song2','liang2','xu2','zhao2'],fx:'dawn',narrative:true,text:s=>[
        placeShift('凤仪宫 · 辰初',`晨光刚越过东廊，殿里香还没散。旧妃的椅子靠前，新人的坐席贴着门一字排开；请安散得越慢，门口堆的绣鞋越多。`),
        `那日我去凤仪宫看大公主及笄后的礼单，正赶上众人起身。许淑惠这一次没有再行错礼，膝落到该停的地方，起身时自己先松了一口气。`,
        `梁素贞经过霍素英身边，目光先落在她靴边，再行礼。霍素英只点头，没有摆出“同是军门”的亲近。宋文秀向崔静仪请安，崔静仪回得很周全，连笑意都挑不出错。`,
        `王静娴站在后排，先看人的手。宋氏宫女替主子整理袖口时动作太快，把一枚小银扣藏进掌心。她多看了一眼，没有当场说。`,
        `${zt(s)}坐得更后。她没抢话，也没有缩成一团，只在殿里太闷时悄悄往开着的窗边挪了半寸。顾明宜看见了，等人散得差不多才道：“景阳宫那扇窗，还开着？”`,
        `“开。”`,
        `皇后把茶盏放下：“别把凤仪宫也拆成景阳宫。”`,
        `张元照笑了一下：“臣妾暂时还不敢。”`,
        `这句有一点没规没矩，顾明宜却没有斥。殿外有人抱着坐垫匆匆经过，廊下蝉声已经响了起来。`
      ],choices:[{label:'随她们一起走出凤仪宫',effects:{flags:{v64OldNewMeet:true}},result:''}]},

      {heading:'冰在谁的宫门前先化',cast:['song2','xu2','hui','zhangyuanzhao','gu'],fx:'summer',keyDecision:true,text:s=>{
        const hasW=(s.flags?.lowConsorts||[]).includes('zhao2');
        const helper=hasW
          ?`王静娴正从凤仪宫出来，见她扶住廊柱，便把手里的团扇塞过去：“先坐。别硬撑。”`
          :`值门宫女见她扶住廊柱，忙搬来矮凳，又叫人去取井水浸帕子。`;
        return [
          placeShift('冰库夹道 · 午后',`六月最热的几日，北库的冰车一出门便往下滴水。青砖晒得发白，木轮过去，留下一路湿痕。`),
          `许淑惠在凤仪宫外等回话时忽然眼前发黑，手里的帕子掉在地上。她宫里那日该有的冰迟迟没有送到。${helper}`,
          `尚宫去冰库核数，很快查出长春宫旁的新院多领了半篓。宋文秀的陪嫁宫女春屏拿一枚银扣给了冰库小吏，让他把宋氏的冰车往前挪。小吏怕账面对不上，便从许氏那一车里扣了两块。`,
          `春屏跪在阶下，银扣也摆在盘里。宋文秀看了一眼，没有说“不知情”。她道：“冰送来时臣妾看出比昨日多，问了一句。春屏说冰库同宋家旧识，顺手照应。臣妾没有叫她退回去。”`,
          `顾明宜问：“你可曾叫她拿银子？”`,
          `“没有。”`,
          `“那你知不知道这半篓不在份例里？”`,
          `宋文秀停了一息：“知道。”`,
          `太医已经从廊下进去看许淑惠。屋门一开一合，凉帕换了第二次。`
        ];
      },choices:[
        {label:'“宋氏停半月例。春屏调出近身，冰库小吏革差。”',effects:{trust:{song2:1,xu2:1},flags:{v64IceCase:'shared',v96ChunpingRemoved:true}},result:'宋文秀领旨，没有替春屏求情。许淑惠那边缺的冰当日补足。'},
        {label:'“春屏与冰库小吏分开问。宋氏先记过，查清是否授意再定罚。”',effects:{trust:{song2:1,zhangyuanzhao:1},flags:{v64IceCase:'separate',v96IceFurtherInquiry:true}},result:'春屏和小吏分别带走。当天傍晚，两边口供仍只落到私下送银，没有供出宋文秀授意。'},
        {label:'“先叫太医照看许氏。封冰库账册，酉时再审。”',effects:{trust:{xu2:2},flags:{v64IceCase:'careFirst',v96IceCareFirst:true}},result:'许淑惠退热以后才知道冰库已经封账。酉初重新问话，春屏认下送银，宋文秀仍因收下超例之冰记过。'}
      ]},

      {heading:'大公主借走一阵风',cast:['ruoxi','zhangyuanzhao'],fx:'window',text:s=>[
        `冰库那件事过去三日，大公主自己来了景阳宫。她已经十五岁，个子快和张元照一般高，身后却还跟着两个乳母，仿佛所有人都没商量过她究竟什么时候不再算孩子。`,
        `她不是来问案子。她看中了窗边一张画得乱七八糟的竹架图：“这是什么？”`,
        `${zt(s)}把纸转给她：“想做个不用人一直扇的扇子。”`,
        `“不用人扇，谁扇？”`,
        `“手摇一下，让轮轴带叶片转。”`,
        `大公主盯了一会儿，忽然把自己袖里的小团扇放到纸上比尺寸。她从凤仪宫长大，会裁衣，会看顾明宜改字，却从来没人问过她想不想做木工。`,
        `“我能帮么？”`,
        `“能。先替我证明这个角度会不会打到脸。”`,
        `大公主笑出声。过了一会儿，她又说：“今日不用带妹妹？”`,
        `“为什么要带？”`,
        `“她们都说我懂事。”`,
        `张元照正拿炭笔画轴，头也没抬：“听着像别人省事。”`,
        `大公主愣了半息，随后笑得更厉害。那以后她去景阳宫，多半为了借图、看风轮、吃一块不那么甜的点心。张元照见她来了，便把做到一半的竹架留给她接着试。`
      ],choices:[{label:'转进支线，看大公主眼里的张氏',effects:{flags:{v64PrincessBranch:true}},result:`<div class="v64-side"><b>大公主视角</b><br>她第一次觉得张氏奇怪，不是因为那些木牌和方格，而是因为张氏从不夸她“懂事”。她把一块歪掉的竹叶递过去，张氏只说：“这个不行，重做。”<br><br>大公主反而很高兴。在凤仪宫，她做事常被人夸懂事；到这里，张氏先看竹叶能不能转。做错了便重做，转起来才说“这个能用”。<br><br>那天风轮终于转起来，吹得两张纸飞出窗。两个人追到廊下，大公主踩住一张，张氏抓住另一张。她回去时还问，下回能不能试一试更薄的竹片。</div>`},{label:'不进去，让她们自己把竹架折腾完',effects:{},result:'御前没有传她们。那天下午景阳宫连坏两根竹条，晚膳前终于有一架风轮能转。'}]},

      {heading:'景阳宫的竹叶第一次转起来',cast:['emperor','zhangyuanzhao','ruoxi','peiyan'],fx:'summer',narrative:true,text:s=>[
        placeShift('景阳宫 · 申时',`西晒正落在东配殿的窗纸上。竹架立在窗边，一只手柄伸到案侧，转一下便带四片薄竹叶慢慢走一圈。`),
        `大公主第二日把“会自己扇风的东西”说给太后听，太后又说给我听。到第三日，我经过景阳宫，没有叫仪仗先报。`,
        `张元照正蹲在地上修轴，听见通传才猛地站起来，额角还沾着一点木屑。`,
        `“这就是你的新东西？”`,
        `“还不算。”她看了一眼已经歪掉的叶片，“现在只能算会转。”`,
        `我让她摇。风确实有一点，转快了又嘎吱作响。裴景和站在后面，脸上写着“内作坊绝不会喜欢”。`,
        `“在哪学的？”`,
        `张元照手停了一瞬：“见过类似的。臣妾只是把走马灯的轮轴和扇叶拼在一起。”`,
        `她没有把自己说成巧匠。第四圈时木楔突然松了，一片竹叶飞下来，正落到我的茶盏旁。`,
        `殿里所有人都跪了。张元照也跪，只是跪下以前先把剩下三片按停。`,
        `我看着那片竹叶，忽然笑了：“先起来。会飞的部分先拆掉。”`,
        `那天下午我在景阳宫坐了半个时辰。问的不是疫病，也不是旧案，只问她为何总想把东西换个做法。她想很久：“因为很多‘一直这样’只是没人再问过。”`,
        `这句话我记住了，却没有当圣旨。走前只准内作坊给她两名匠人，做三架，先在景阳宫和大公主处试。`
      ],choices:[{label:'“先做三架。坏了就撤，不许拿朕的话压内作坊。”',effects:{trust:{zhangyuanzhao:3},flags:{v64FanTrial:true}},result:'张元照谢恩。裴景和当场补了一句：“三架，多一架都算张娘娘自己的。”她点头点得很快。'}]},

      {heading:'荷风宴，灯从水面一盏盏亮',cast:['emperor','gu','taihou','ning','shen','zhangyuanzhao','zhao2','ke','hui','ruoxi'],fx:'lantern',narrative:true,text:s=>{
        const extra=Object.values(s.flags?.extraHeirs||{}).filter(x=>x?.born&&!x?.skipped).map(x=>x.order).filter(Boolean);
        return [
          placeShift('御花园水榭 · 六月望后',`日头落到宫墙后，水面才真正凉下来。水榭四面撤了两扇屏风，长桌没有铺满一条线，而是按旧位次分成几处小案，中间留出孩子走动的路。`),
          `这场宴最初只是大公主一句“让风轮去水边试试”。张元照顺势提了许多小改动：冷食分小碟，不让一双筷子从头夹到尾；每桌放一双公筷；冰酪分盏；席签写大字，免得新人走到座前才发现坐错。`,
          `顾明宜听完第一句便道：“位次不能乱。”`,
          `张元照答：“位次照旧。臣妾只是不想所有人为了守一个位次坐到腿麻。”`,
          `皇后看她两息，竟同意了。`,
          `席开以后，几年前洗三时还只会哭的孩子已经会自己抢果子。三公主把冰酪吃得太快，被乳母夺走；四公主抱着碗跑去找太后评理。${extra.length?`此前玉牒另添的${extra.join('、')}也由乳母带到水榭外，真正坐不住的孩子远比礼单上多。`:''}`,
          `大公主没有像往常一样一直替妹妹们收残局。她选了靠水的一席，偶尔转头看景阳宫那架风轮。三皇子从上书房来得晚，只同她打了个照面。姐弟两个都已经高过顾明宜肩头。`,
          `第一架风轮转得很好。第二架转到一半发出一声怪响，把霍素英桌上的桂花吹进茶里。霍素英低头看那盏茶：“张氏，你这风有军情。”`,
          `王静娴接得极快：“至少敌我分得清，只打霍娘娘一桌。”`,
          `连顾明宜都笑了一下。`,
          `那一晚没有人立功，也没有人翻案。灯从水面一盏盏亮起来，新人和旧人第一次在同一场宴上不必时时想着自己是哪一批进宫的。`
        ];
      },choices:[{label:'让宴席再坐一会儿',effects:{bond:{zhangyuanzhao:3,zhao2:1},flags:{v64LotusBanquet:true}},result:'宴散到亥初。第二日宫里传得最多的不是谁坐得近御前，而是霍素英那盏被桂花“突袭”的茶。'}]},

      {heading:'那个月，景阳宫的灯亮得比从前多',cast:['emperor','zhangyuanzhao','gu'],fx:'candle',narrative:true,text:s=>[
        placeShift('养心殿与景阳宫之间',`从御花园回养心殿要过两道月门。七月里，我比从前多走了几次那条路。宫里只会数御驾停在哪一宫，却不会记我进去以后谈的是风轮、孩子的席位，还是一碗太甜的冰酪。`),
        `我那个月召张元照五次。三次在白日，两次在晚膳后。她年轻，说话新鲜，我确实愿意多听一会儿——这也是恩宠，不必硬说全是公事。`,
        `可她每提一个“可以改”，我都会再问一句：“谁来做？做坏了算谁的？别人不愿意怎么办？”她有时答得上，有时会停下来，说“那先别改”。`,
        `顾明宜看得比谁都清楚。一次请安后，她道：“陛下近来常去景阳宫。”`,
        `“嗯。”`,
        `“张氏聪明。”`,
        `我看她。皇后把衣襟抚平：“聪明的人得宠不奇怪。只别让六宫把‘陛下喜欢新鲜’误听成‘张氏说什么都准’。”`,
        `这句话没有刺，我也听懂了。`,
        `<span class="v64-favor"><b>恩宠第一次真正落到她身上</b>不是因为她救了谁，也不是因为她提前知道会有时疫。只是这一整个夏天，我确实愿意多见她，也愿意给她比初入宫时更多的体面。</span>`
      ],choices:[{label:'“张氏，起来。朕给你进一级。”',hint:'张元照：“臣妾谢恩。若陛下是因为那架风轮，臣妾觉得它还没值这么多。”',effects:{flags:{v64ZhangSummerPromote:true}},result:'册旨不写“奇巧”，只写“侍奉谨慎，才识可取”。宫里却都知道，这一级位分带着这个夏天明显的偏爱。'}]},

      {heading:'三十日以后，留下来的只有两样',cast:['zhangyuanzhao','gu','zhao2','ning'],fx:'ink',narrative:true,text:s=>[
        `进位以后，张元照反而没有立刻再提新东西。我曾准她把盛夏里三样小改法各试三十日：家宴用公筷；冰库把当日先后顺序挂在门边木牌上；连续值夜的人试着轮休。`,
        `第一样留下得最快。没人觉得一双夹菜筷会动摇祖制。`,
        `第二样只撑了十日。木牌一挂，大家立刻开始算哪一宫总排前、哪一宫总排后。王静娴看完第一天就说：“这东西公开得很公平，吵起架来也很公平。”张元照当天把各宫份数撤掉，只留冰库今日还剩多少、哪一批已经出门。`,
        `第三样险些出事。一次轮休交接少算半刻，夜里有宫女腹痛，找了两处才找到当值人。张元照第二日便把自己的安排划掉，改成前后两班必须重叠半刻。`,
        `皇后问她：“不觉得丢脸？”`,
        `“觉得。”她答，“所以赶紧改，免得再丢一次。”`,
        `顾明宜看了她片刻，竟笑了一声。`,
        `三十日后，真正留下来的只有公筷和交班重叠半刻。风轮则因为太费人修，只留了景阳宫、大公主处和慈宁宫三架。`,
        `张元照没有把失败的木牌烧掉。她挂在景阳宫后窗，拿来垫一盆薄荷。`
      ],choices:[{label:'让能留下的留下，不能用的就撤',effects:{trust:{zhangyuanzhao:3,gu:2,zhao2:1},flags:{v64PalaceTrials:true}},result:'尚宫局没有得到一套“张氏新法”。只多了几样已经证明能用的小习惯。'}]},

      {heading:'七月尽头，蝉声忽然停了一刻',cast:['zhangyuanzhao','ruoxi','gu'],fx:'night',narrative:true,text:s=>[
        `七月最后一日晚，大公主从景阳宫抱走一册木工图。她走到月门，又折回来，把一小包酸梅放到桌上：“明日再来。”`,
        `张元照正在试第三版风轮的轴，只抬手挥了一下。`,
        `更远处，凤仪宫刚熄了外廊一盏灯。顾明宜这几日咳得比平时多，仍说只是暑气。`,
        `宫墙外蝉声一阵接一阵。到亥初，忽然有一瞬全停了。景阳宫窗纸安静得能听见竹叶风轮自己慢慢停下来。`,
        `张元照抬头，以为要下雨。`,
        `第二日，储秀宫西院报了第一名高热宫女。`
      ],choices:[{label:'进入八月',effects:{flags:{v64SummerEnds:true}},result:''}]}
    ]};
    if(wi>=0)CHAPTERS.splice(wi,0,summer);else CHAPTERS.push(summer);
  }

  // 5) 盛夏进位真正落位；时疫立功若再晋，是另一层功劳，不混成同一件事。
  const v64ApplyOld=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=v64ApplyOld(c)||[];
    if(c.effects?.flags?.v64ZhangSummerPromote&&!state.flags?.v64ZhangSummerPromotionApplied){
      state.flags.v64ZhangSummerPromotionApplied=true;
      const before=state.ranks?.zhangyuanzhao;
      if(promoteRank('zhangyuanzhao'))out.push(`张元照因盛夏恩宠晋一级：${before} → ${courtTitle(state,'zhangyuanzhao')}`);
      else out.push(`张元照的位额未能再进，改赐景阳宫正殿起居并加月例。`);
    }
    return out;
  };

  // 6) 时疫之前的过渡重写：先把一个热闹夏天收掉，八月才真正收紧宫门。
  const winter=CH('凤仪宫最后一冬');
  if(winter){
    winter.date='承熙十一年·八月至十二月';
    winter.bridge=s=>`荷风宴散后不过十余日，御花园的灯架还没全部撤。八月十八，储秀宫西院第一扇门落了锁。前一个月大家还在争冰、试风轮、记新封号，到了这一天，同一条宫道忽然只剩送药的人能走。张元照那些原本被人当作怪习惯的东西，也从这一刻起不再只是她自己的日子。`;
    const zmerit=ST(winter,'十一月，红册停在她名字旁')||ST(winter,'张元照进一级');
    if(zmerit){
      zmerit.text=s=>[
        `十一月，病势终于退下去一些。凤仪宫赏单里再次出现张元照的名字。`,
        s.flags?.v64ZhangSummerPromotionApplied?`她夏天刚因恩宠进过一级。顾明宜把那一页看了很久，只写“疫中有劳”，没有替她再往上添字。`:`她入宫后一直得我多看几眼，这一次写在纸上的却不是恩宠，而是疫中实打实做过的事。`,
        `张元照来谢赏时没有带风轮图，也没有带宴单，只抱着一册被翻得发毛的病籍。`,
        `我忽然很清楚：夏天我愿意见她，是因为她有趣；秋天所有人愿意听她，是因为她做成了事。这两件事不能混在一起。`
      ];
      if(zmerit.choices?.[0])zmerit.choices[0].hint='皇后：“夏日的宠是宠，今日的功是功。若再晋她，陛下得说清楚赏的是哪一件事。”';
      if(zmerit.choices?.[1])zmerit.choices[1].hint='张元照：“不晋也好。先把病院关掉再说。”';
    }
  }

  // 7) 《凤座无人》删掉“人物分型说明卡”；空后问题换成真正落在人身上的事。
  const vacancy=CH('凤座无人');
  if(vacancy){
    vacancy.bridge=s=>`红旨宣完以后，宫里先恢复的是声音：晨起请安又能听见唱礼，午后御花园重新有人带孩子散步，夜里也不再处处闻药。可凤仪宫一直空着。它的空不是一把椅子没人坐，而是每逢一件没有旧例、又不能一直往慈宁宫送的事，所有人都会先停一下——这句话究竟该由谁说。`;
    const three=ST(vacancy,'她站在凤仪宫门外')||ST(vacancy,'病愈宫女');
    if(three){three.heading='她站在凤仪宫门外，不肯再进去';three.text=s=>[
      placeShift('凤仪宫西廊 · 四月',`春雨刚停，青砖仍湿。那名病愈宫女被带到旧值处时，脚已经跨上台阶，却在看见凤仪宫匾额以后整个人往后退了一步。`),
      `尚宫催她：“病已经好了，旧差也还在。”她跪下，却说不出“领命”。`,
      `含章先让围观的人退到月门外。她没有问“为什么不回”，只问：“你自己说，想不想进去？”`,
      `宫女抖了很久，才摇头。`,
      `沈知微蹲下去，没有立刻要第二句答案。她把披风边压在宫女膝前：“今日先不进。你昨夜睡了么？”`,
      `宫女眼泪一下掉下来：“一闭眼就听见咳。”`,
      `张元照已经拿出纸，笔尖却停住。她原本想把“本人愿否”写进复值册，可看见那人盯着纸也发抖，便先把纸合上。`,
      `“你若不回这里，愿意去哪？”她问。`,
      `“花房。”`,
      `“为什么？”`,
      `“那里开门。”`,
      `张元照看了一眼凤仪宫紧闭的正门，没有再问。十日以后，她才把“本人愿否、原处是否诱发旧病、可否转差”三项加进复值册。`,
      `含章看过新页，只改了一处：把“愿否”放到最前。沈知微没有改字，只在旁边写：“不必当日答。”`,
      `三个人都没有说自己救了她。那名宫女后来真的去了花房，第一件差事是给小灰换水。`
    ];three.choices=[
      {label:'“先听她自己说。”',hint:'含章：“她若连‘不愿意’都说不出口，后面的安排都只是替她说。”',effects:{trust:{hanzhang:3},flags:{v55RecoveryRule:'agency'}},result:'尚宫局先把“本人愿否”提到复值问话第一句。'},
      {label:'“今日不必定。让她先睡几夜。”',hint:'沈知微：“人从病里回来，不等于心也已经回来了。”',effects:{trust:{shen:3},flags:{v55RecoveryRule:'mercy'}},result:'宫女得到十日休养，第八日自己提出去花房。'},
      {label:'“十日后，把她真正想去哪里也写进册里。”',hint:'张元照：“这次有三个人在这里。下次未必。”',effects:{trust:{zhangyuanzhao:3},flags:{v55RecoveryRule:'system'}},result:'复值册多了三项，但“愿否”被放在最前，“可否转差”放在最后。'}
    ];}

    const mig=ST(vacancy,'大公主的笄礼少了一个位置')||ST(vacancy,'迁宫单');
    if(mig){mig.heading='大公主的笄礼少了一个位置';mig.cast=['ruoxi','ning','taihou','emperor'];mig.text=s=>[
      placeShift('慈宁宫东暖阁 · 五月',`大公主的笄礼没有大办。她已经过了十五岁，顾明宜却不在了；礼单上原本该由中宫主持的一栏空着，墨线从上到下直直露出一块白。`),
      `礼部先请太后主礼。太后看完退回：“祖母可以受她的礼，不能替她母后站那个位置。”`,
      `又有人提邵明贞。邵明贞自己先摇头：“臣妾能替公主理衣、看礼单，不能在册礼上假装自己已经是中宫。”`,
      `最后那张礼单送到养心殿。大公主也来了。她没哭，只问：“一定要有人替母后么？”`,
      `我看着她。她从五岁起在凤仪宫长大，这几年每个人都怕在她面前提那个空位。`,
      `“不一定。”我说。`,
      `她自己从礼单上把那一栏划去：“那就空着。”`,
      `笄礼那日，太后替她簪第一支成人簪，邵明贞替她整衣，我坐在对面。没有人站顾明宜的位置。礼仍然做完了。`,
      `从慈宁宫出来，大公主没有回自己的住处，绕御花园去了景阳宫。张元照那架风轮已经收进库，她却还记得怎么摇。`
    ];mig.choices=[{label:'“这一栏不补。她母后的位置不必临时借一个人来站。”',hint:'大公主：“儿臣也不想让谁为了礼单像母后。”',effects:{trust:{taihou:1,ning:1},trust:{ning:2,taihou:2},flags:{v64PrincessHairpin:true}},result:'册礼照样完成。空白第一次没有被当成一项必须立刻补上的错误。'}];}
  }

  // 8) 大封后的倦怠过渡改成人话，并用空间移动表现“白天还能过，夜里开始难熬”。
  const night=CH('长夜未央');
  if(night){
    night.date='承熙十二年·秋至十三年正月';
    night.bridge=s=>`大封后的春夏并不坏。清晨请安重新准时，午后御花园有人带孩子放纸鸢，凤仪宫虽然空着，六宫至少知道每天该往哪里去。真正难熬的是入秋后的夜。白日我还能见人、批折、听回话；等宫门一层层落锁，养心殿只剩翻纸声，我便越来越不想让屋里静下来。有人递来难题，我也开始常说“先让邵氏看”“叫张氏核一遍”——不是因为她们什么都能替我做，只是那一刻，我确实想少想一会儿。`;
    const map={
      '六月初 · 第一坛酒重新开封':'白露以后，第一坛酒重新开封',
      '六月 · 朱笔越来越短':'朱笔越来越短',
      '六月末 · 永和宫不替我把三件事说成一样':'永和宫的茶凉了两回',
      '承熙十二年·七月至十月 · 秋灯一盏盏添起来':'秋灯一盏盏添起来'
    };
    for(const st of night.steps||[])if(map[st.heading])st.heading=map[st.heading];
    const first=night.steps?.[0];if(first){const old=first.text;first.text=s=>[placeShift('慈宁宫 → 御花园 → 养心殿',`八月末一场雨后，我从慈宁宫出来，没有乘辇。御花园西路的石头还湿，走到养心殿时天已经全黑。白天的宫城一路有人，进西暖阁以后却只剩裴景和收折子的声音。`),...A(old,s)];}
  }

  // 9) 选项提示更像当场的人在说话，而不是作者从旁边解释。
  const second=CH('空宫点灯');
  const zsel=ST(second,'体元殿最后一页')||ST(second,'最后一张名帖');
  if(zsel?.choices?.[0])zsel.choices[0].hint='皇后：“贵人位不算高，可足够让六宫立刻记住她。陛下若给，就别说只是随手。”';
  if(zsel?.choices?.[1])zsel.choices[1].hint='邵明贞：“先让她以常在住下来。一个人是什么样，不必终选这一刻就全定。”';
  const firstMem=ST(vacancy,'礼部第一道请立中宫疏');if(firstMem?.choices?.[0])firstMem.choices[0].hint='太后：“你可以今天不立，可别拿‘再议’当成已经想过。”';
  const nightThree=ST(night,'朱笔越来越短');if(nightThree){for(const c of nightThree.choices||[]){if((c.label||'').includes('邵'))c.hint='邵明贞：“臣妾可以先看，但最后那一笔仍要陛下自己落。”';if((c.label||'').includes('张'))c.hint='张元照：“臣妾能把不同处挑出来，不能替陛下决定哪一个更重要。”';}}

  // 10) 人物录：元照在夏日以后先被看成“新鲜、有办法、受宠”，秘密揭开后再显示后世身份。
  if(PEOPLE.zhangyuanzhao&&!state.flags?.zhangRevealed){
    PEOPLE.zhangyuanzhao.tags=['承熙三年入宫','受宠渐盛','喜欢拆旧办法'];
    PEOPLE.zhangyuanzhao.bio='承熙三年第一次大选入宫后，张元照先因一身不太像宫里的生活习惯惹人侧目，随后又用风轮、分食、公筷和几次敢于认错的试行让六宫记住她。皇帝确实愿意多召她说话，也因此给过她明显的恩宠；但她站稳脚跟，不是因为每个办法都对，而是出了错肯认，也肯撤回重来。';
  }

  // 11) 旧的“景阳宫麻雀”小传挪到盛夏之后，时间不再写成七月末却落在五月章。
  const oldBranch=windowCh?.steps?.find(x=>(x.heading||'').includes('景阳宫窗沿那只麻雀'));
  const summer=CH('荷风满座');
  if(oldBranch&&summer&&!summer.steps.includes(oldBranch)){
    const oi=windowCh.steps.indexOf(oldBranch);if(oi>=0)windowCh.steps.splice(oi,1);
    oldBranch.text=s=>[
      `荷风宴后的第三日，沈知微去景阳宫还一本旧医案。屋里难得没有匠人，只有窗沿一只麻雀啄米。`,
      `<span class="v63-branch"><b>人物小传 · 可选</b><small>从和妃眼里看一眼刚刚得宠的张氏。</small></span>`
    ];
    if(oldBranch.choices?.[0])oldBranch.choices[0].label='进去，看和妃眼里的张元照';
    const at=summer.steps.findIndex(x=>(x.heading||'').includes('那个月，景阳宫的灯'));
    summer.steps.splice(Math.max(0,at+1),0,oldBranch);
  }

  // 12) 跨章空间接缝再收一次。
  if(windowCh)windowCh.bridge=s=>`体元殿终选散后，新人的轿子先沿宫墙往北，再从月门分向各处。张元照的轿子停在景阳宫东配殿时，凤仪宫请安已经散了半个时辰。前一刻她还是名帖上的“张氏”，后一刻便得自己决定这间屋子的窗开多大、香炉放哪里。`;
  const snow=CH('雪尽宫门');if(snow)snow.bridge=s=>`十二月，最后一处病院开门。宫人先把药炉和烧坏的被褥从西夹道抬出去，再把凤仪宫旧幡重新理平。等这些东西都搬完，礼部的白封诏才从前朝送进慈宁宫。红绸仍压在箱底——这一日先轮到死人。`;

  // 13) 调整人物登场索引与当前存档位置。
  const zIdx=CHAPTERS.findIndex(x=>x.title==='王府旧笼');if(zIdx>=0&&PEOPLE.zhangyuanzhao)PEOPLE.zhangyuanzhao.introducedAt=zIdx;
  const dIdx=CHAPTERS.findIndex(x=>x.title==='极西来客');if(dIdx>=0&&PEOPLE.daila)PEOPLE.daila.introducedAt=dIdx;
  if(V64_CUR){const ni=CHAPTERS.findIndex(x=>x.title===V64_CUR);if(ni>=0)state.index=ni;}
  state.flags=state.flags||{};state.flags.v64Build=true;
  globalThis.V64_QA={
    order:['空宫点灯','窗开半扇','荷风满座','凤仪宫最后一冬','雪尽宫门','凤座无人','长夜未央','长枝渐高','中宫空悬'].map(t=>[t,CHAPTERS.findIndex(x=>x.title===t)]),
    summerSteps:(CH('荷风满座')?.steps||[]).map(x=>x.heading),
    duplicateTitles:CHAPTERS.map(x=>x.title).filter((x,i,a)=>a.indexOf(x)!==i),
    doubleChengxi:false,
    zhangRank:state.ranks?.zhangyuanzhao
  };
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v64 summer/narrative patch failed',e)}})();
