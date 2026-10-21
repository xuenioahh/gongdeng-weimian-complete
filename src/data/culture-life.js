// Cultural detail is part of existing scenes. Scene order and choices stay intact.
// Tea pairings are individual preferences; they are not historical court menus.
const CULTURE_LIFE_SCENES=[
  {
    id:'ordinary-tea',chapter:'宫门初定',scene:'正月后半 · 宫里渐渐有了日常',at:2,
    cast:['ruoxi'],
    add:()=>[
      '一日下午，我在凤仪宫坐了片刻。宫女先撤去冷盏，换上洁净的茶托，才将茶库存下的春茶淡淡沏开。顾明宜手边是一只青白瓷盏，口沿绕着细蓝线，木托靠手的地方已经磨亮。',
      '白瓷碟里放了几方山药糕，其中一块淋着桂花蜜。令兮伸手之前先看顾明宜，她便把那块推过去：“用碟接着，别掉在衣襟上。”孩子咬了一口，仍掉了一点。顾明宜替她拂去，自己拿了没淋蜜的半块。茶喝完，宫女收走空碟，她又接着看方才没看完的那页。'
    ]
  },
  {
    id:'sisters-tea',chapter:'拾遗阁开门',scene:'入宫第一周',at:5,
    add:()=>[
      '午后送来的春茶用小壶沏着，旁边只配一碟切成小方的绿豆糕。抱朴尝了口茶，嫌涩，先拈一块糕；含章把自己那杯的茶叶滤去些，仍没动糕碟。姐姐看见，将最靠近她的两块拨到一边：“留着。你看完那页再吃，别又说没有了。”'
    ]
  },
  {
    id:'almond-pastry',chapter:'一碟杏仁酥',scene:'杏仁酥送错了门',at:10,
    add:()=>[
      '茶房添的是整叶沏开的绿茶，没有放蜜。热酥掰开，薄皮落了几屑在茶托上；方小满拿帕子去擦，抱朴却先把自己的茶喝了半杯：“配这个倒好，嘴里不粘了。”方小满把食盒里的净布揭开，盘底还留着一块颜色较深的，她赶紧将那块收回盒中。'
    ]
  },
  {
    id:'song-tea',chapter:'灯下弈',scene:'琴、舞与一盘残局',at:'end',cast:['gu'],
    add:()=>[
      '棋子收起以后，茶房的老嬷嬷又送来一只小汤瓶、几只黑釉盏和竹制茶筅。顾明宜让人从慈宁宫借了这套器具，照宋人点茶的旧法试一回。平日各宫仍用整叶沏饮，今夜案上的茶却是另备的饼茶，早已焙干、碾细，过了细罗。',
      '老嬷嬷先用热水温盏，倒净水，再用小匙抄入细匀的茶末。第一注只落了少许汤，她将茶末调成匀润的膏，盏底没有留下干粒。沈知微俯身看了一会儿，把琴弦上还没擦净的汗先拭去，才接茶筅。',
      '汤瓶口贴近盏畔，热汤分次落入。她先搅匀茶膏，再转腕击拂，茶筅在盏中周回，声音密而轻。黑釉上渐渐浮起细白的沫饽，几次注汤以后，乳花连成一片，不再只是浮着几颗大泡。',
      '方小满看得忍不住，问能不能试。她照样温过另一只盏，调膏时很仔细；添第二注汤时，偏被水榭外扑来的飞蛾引开了一眼，手一倾，水便多了。茶沫疏疏散开，盏边先露出一圈水痕。',
      '她放下汤瓶：“还能救么？”老嬷嬷看过盏面：“这盏水多了。另调一盏，比再添茶末省事。”她正要跪，顾明宜先让宫女收去那盏：“坐着重来。今晚又不考你。”',
      '第二回，含章将汤瓶往她手边挪近些，没替她拿。方小满一注便停下来看看，击拂到手腕发酸才换手歇了一息。乳花仍比沈知微那盏薄，却细了许多；过片刻，盏边还没露出水痕。她没敢先夸，抬头问我：“陛下看这回呢？”',
      '我端起来尝了一口：“能喝。”她终于松开绷紧的肩。抱朴将剩下的巧果拨过来，自己先咬一块，方小满这才记起还有东西没吃。',
      '散席前，老嬷嬷将用过的茶筅洗净，搁在小架上沥水。阿芙来收食盒，方小满还在问那只汤瓶为什么要做得这样细口。她把手腕甩了两下，又低头去看，早把那盏失败的茶忘了。'
    ]
  },
  {
    id:'mothers-plum',chapter:'母至',scene:'两位母亲看梅',at:2,
    add:()=>[
      '廊下的小炉温着武夷红茶。宫女奉盏时先托住盏底，再把茶托放到两位母亲手边；旁边一小碟杏脯，一小碟蜜渍梅子，都是随茶送来的。闻人蘅尝了一片杏脯，笑说酸味像家里晒的，太后便让人将那碟挪近。谈到孩子挑食时，两人又各取了一片，谁也没留意盘里少了多少。'
    ]
  },
  {
    id:'archery-snack',chapter:'宫灯渐繁',scene:'三位新人各自站稳脚跟',at:3,
    add:()=>[
      '有一回我在射圃外看她们说话，霍素英先掀开食盒，里面没有甜糕，只有几块咸香酥饼和去壳的松子。她将一碟推到沈知微面前，自己拿了酥饼，咬出一声脆响。茶用的是焙过火的武夷茶，香气还没散，她已问到下一班换防。'
    ]
  },
  {
    id:'rainy-new-tea',chapter:'旧茶未凉',scene:'夏末 · 新茶第一次被人嫌难喝',at:1,
    add:()=>[
      '茶罐里的叶子是当年的春茶，沈知微只拈了少许，汤色浅。宫女将沥过水的壶放回小炉旁，没再往盏里续浓的。含章把食盒底垫湿的绢巾抽出来，换了一块干布，方小满已经伸手去拿最上面那块杏仁酥。'
    ]
  },
  {
    id:'winter-flowers',chapter:'雪尽宫门',scene:'正月十六 · 新封号叫错的第一天',at:4,cast:['afu'],
    add:()=>[
      '我傍晚经过景阳宫，月例表已经收起。东配殿窗前铺着旧布，花房送来几枝含苞的腊梅、两茎水仙。周清漪来还一把花剪，含章也在；阿芙把空出的小案擦净，又添了一盆清水。',
      '周清漪先挑出弯向一侧的梅枝，把开得最密那枝暂搁在布上。张元照指着它：“这枝都开好了，不要？”“先看瓶。”她从几只日用花器中取了一个小口青瓷胆瓶，试了枝长，太高，便剪去下端一截。',
      '水线以下的细叶也被取净。梅枝斜斜入瓶，侧枝朝窗外伸；含章把水仙量成一长一短，从空着的半边瓶口送进去。张元照扶住瓶身，怕她松手以后花又挤到一处。',
      '那枝开得满的腊梅最后也插进去，瓶口顿时密了。周清漪将瓶转了半圈，伸手要抽它，张元照却按住案上的旧布：“已经剪下来了，白放着可惜。”',
      '周清漪看了看她，又看瓶：“不是嫌它不好。留在这里，旁边两枝就看不见了。”含章另取一只小铜瓶，只注半瓶水：“那给它这一只。”她将那枝剪短些，单独插好，没有再添花。',
      '我坐下看了片刻。张元照伸手把青瓷瓶往外挪了一寸，才发现水仙的细茎一直被梅枝挡住，方才扶瓶的人正是自己。她笑了一声：“我刚才只顾着不让它倒。”周清漪没有接什么道理，只提醒：“别紧挨炭盆。花不耐这股热。”',
      '阿芙将青瓷瓶留在窗边，铜瓶放到小灰够不到的高案上。换瓶水时，她捡起布上剩的一小段梅枝，插进自己的粗瓷水盂；那盂原是拿来洗笔的，洗干净也装得下。窗只开了一道缝，花香散得很慢。'
    ]
  },
  {
    id:'old-teacup',chapter:'凤座无人',scene:'第一场家宴，桌子短了一截',at:'end',
    add:()=>[
      '撤菜后换茶，宫人从旧库领来的常用茶器里，有一只口沿绕细蓝线的青白瓷盏。木托已经换了。我握到盏沿，才认出是从前凤仪宫案上那只；承熙元年的正月午后，明宜就是用它喝茶，令兮在旁边将桂花蜜掉到衣襟上。',
      '这回茶盏放在我手边，碟里还是山药糕。令兮把淋蜜的那块递给妹妹，随后自己也拿了一块，先用小碟接住。她吃得不急。宫女收空碟时，我将那只盏放回新茶托，没有叫人另封起来。'
    ]
  },
  {
    id:'late-visit',chapter:'凤座无人',scene:'四月夜 · 新茶不是为了翻旧案',at:1,
    add:()=>[
      '宫女退下前，还留下两块少糖米糕，茶是淡泡的春茶。张元照将册子放远，怕茶托上的水沾纸。她原说不饿，吃完一块，沈知微没问，只将另一块连碟挪过来。外间有人用火箸拨了一下炭，小炉里响了一声，屋里又安静下来。'
    ]
  },
  {
    id:'winter-dried-meat',chapter:'长夜未央',scene:'凤印在库里过了第二个冬天',at:'end',cast:['peiyan'],
    add:()=>[
      '裴景和先把残酒撤下，才送来陈贮的普洱和一小碟鹿脯。肉片腌过、晾干，切得薄，边缘略卷。我撕下一片，嚼得慢，他便将新续的茶移近些。咸味退了，案旁还留两块咸香酥饼；我吃一块，让他将另一块拿去值房。',
      '他叫小内监送空食盒回去，自己拿着那块饼站在帘外吃完，手擦净，才回来翻明日的值簿。炭盆里还有红火，不必再添。'
    ]
  },
  {
    id:'children-snacks',chapter:'长枝渐高',scene:'家宴席间，诸子女渐长',at:'end',
    add:s=>{
      const living=key=>children138(s).some(child=>child.key===key&&!child.dead);
      const out=[];
      if(living('fourthPrince'))out.push('撤去正膳，四皇子盯上了咸酥饼，先问能不能带去射圃。霍素英让宫女拿纸包两块：“你那包吃完，别又拿教习的。”他立刻把纸包塞到自己袖边，生怕旁人当成撤下的残点。');
      if(living('sixthPrincess'))out.push('四公主拿松子时嫌一个个剥得慢，邵明贞没有让宫女代劳，只把盛壳的小碟放近。她剥开第一粒便往嘴里送，第二粒想了想，放到母妃的小碟里。茶只在大人案边续，孩子手边是温水。');
      return out;
    }
  }
];

const cultureLifeKey=(chapter,scene)=>chapter+'\0'+scene;
const CULTURE_LIFE_BY_SCENE=new Map(CULTURE_LIFE_SCENES.map(entry=>[cultureLifeKey(entry.chapter,entry.scene),entry]));

function cultureText147(chapter,step,paragraphs,currentState){
  const entry=CULTURE_LIFE_BY_SCENE.get(cultureLifeKey(chapter.title,step?.heading||''));
  if(!entry)return paragraphs;
  const result=paragraphs.slice();
  result.splice(entry.at==='end'?result.length:entry.at,0,...entry.add(currentState));
  return result;
}

function cultureCast147(chapter,step){
  const original=step?.cast||chapter.cast||[];
  const extra=CULTURE_LIFE_BY_SCENE.get(cultureLifeKey(chapter.title,step?.heading||''))?.cast||[];
  return [...new Set([...original,...extra])];
}

for(const entry of CULTURE_LIFE_SCENES){
  const chapter=CHAPTERS.find(ch=>ch.title===entry.chapter);
  const step=chapter?.steps?.find(st=>st.heading===entry.scene);
  if(!step)throw Error('Culture scene missing: '+entry.chapter+' / '+entry.scene);
  // Existing artwork continues to follow the same original paragraph.
  if(entry.at!=='end'){
    const count=entry.add(state).length;
    for(const placement of SCENE_ART_PLACEMENTS){
      if(placement.chapter===entry.chapter&&placement.scene===entry.scene&&placement.after>=entry.at)placement.after+=count;
    }
  }
}
