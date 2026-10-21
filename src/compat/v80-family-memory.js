(()=>{try{
  document.documentElement.dataset.build='v80';
  document.title='宫灯未眠 · 慈宁宫白幡与皇女回声 v80';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const IX=(ch,needle)=>ch?.steps?.findIndex(x=>(x.heading||'').includes(needle))??-1;
  const ST=(ch,needle)=>ch?.steps?.find(x=>(x.heading||'').includes(needle));
  const AS=(v,s)=>{try{return typeof v==='function'?v(s):Array.isArray(v)?v:[v]}catch(_e){return []}};
  const addAfter=(ch,needle,obj)=>{if(!ch||ch.steps?.some(x=>x?.v80id===obj.v80id))return;let i=IX(ch,needle);if(i<0)ch.steps.push(obj);else ch.steps.splice(i+1,0,obj)};
  const addBefore=(ch,needle,obj)=>{if(!ch||ch.steps?.some(x=>x?.v80id===obj.v80id))return;let i=IX(ch,needle);if(i<0)ch.steps.push(obj);else ch.steps.splice(i,0,obj)};
  const ningMotherCall=s=>{const t=(typeof courtTitle==='function'?courtTitle(s,'ning'):(s.ranks?.ning||''))||'';return /皇后/.test(t)?'母后':'母妃'};

  // A. 先把四公主“为什么受宠”写在死亡以前：她不懂得把父亲只当皇帝。
  const growth=CH('长枝渐高');
  addAfter(growth,'家宴席间，诸子女渐长',{v80id:'ruoyi-beloved',heading:'四月初九 · 四公主把御案上的盐梅拿走了',cast:['emperor','ning','taihou'],fx:'petal',narrative:true,text:s=>{
    if(!s.flags?.sixthPrincessBorn)return [`这一局邵氏所出的四公主没有走到这条成长线，养心殿里少了那个总敢伸手拿御案点心的孩子。`];
    return [
      `四公主杨晏尔七岁以后，进养心殿越来越不像来见皇帝。别人先行礼，她先看御案上有没有吃的；行完礼再补一句“儿臣没有忘”。`,
      `那日我案边放着一小碟盐梅。她盯了半天，趁我翻折子时拿走一颗。裴景和看见了，装作没看见。`,
      `“谁准你拿的？”`,
      `她含着梅子，腮帮鼓起来：“父皇若真不许，早叫裴总管收走了。”`,
      `我没罚她。几个女儿里，我确实偏她一点。她不像大公主那样总先替别人想，也不像二公主那样先看满屋人的脸色。她想到什么就问，问错了也不太怕。`,
      `太后后来听说，叫人把她带去慈宁宫训了一顿。第二日四公主回来，袖子里却多了一包太后给的松子糖。`,
      `“皇祖母罚你了？”`,
      `“罚了。”她把糖往袖里塞紧，“罚我以后拿东西先问。糖是罚完以后给的。”`
    ];
  },choices:[{label:'让她把剩下那颗盐梅也带走',effects:{bond:{ning:1},flags:{v80RuoyiBeloved:true}},result:'四公主走到门口又折回来，把空碟子也端走：“这个也要还膳房。”'}]});

  // B. 黛拉给皇子女留下一个真的会被孩子记住的东西和一句珂兰话。
  const daila=CH('极西来客');
  addAfter(daila,'笑声先过门槛',{v80id:'daila-whistle',heading:'七月初四 · 珂兰话只学会了两个字',cast:['daila','taihou','emperor'],fx:'wind',narrative:true,text:s=>[
    `黛拉第二次进御花园时，袖袋里装了五六枚拇指大的蓝玻璃鸟哨。珂兰贡单本来就有琉璃，这些却不是贡品，做得也不精细，吹一头声音尖，倒过来吹又低一截。`,
    `几个年幼的皇子女围上来，她先教了一句珂兰话：“维拉。”`,
    `四公主学得最快：“什么意思？”`,
    `“风来了。”黛拉想了想，又补一句，“也可以当‘快跑’。我们小时候放风筝，风一来，大人就喊维拉。”`,
    `不到半刻钟，御花园里到处都是“维拉——”，连原本端着架子的孩子也追着风筝跑。三皇子已经大了，起初嫌幼稚；风筝真被风托起来时，他还是在后头喊了一声。`,
    `四公主最喜欢一只蓝玻璃海鸟，吹得整条回廊都响。太后听了三遍，终于伸手：“给哀家。”`,
    `“皇祖母也想吹？”`,
    `“哀家想让耳朵歇一会儿。”`,
    `太后把那只哨收进慈宁宫抽屉。四公主追着问什么时候还，太后道：“等你大到知道什么时候不该吹。”`,
    `<div class="v80-keepsake"><b>孩子们后来一直记得</b>风筝一起，便有人喊“维拉”。宫里的先生纠正过几次，最后也懒得管了。</div>`
  ],choices:[{label:'由着他们跑一阵',effects:{bond:{daila:2,taihou:1},flags:{v80DailaWhistle:true}},result:'那天下午上书房迟了一刻钟。教习不敢罚皇子女，只把“维拉”两个字写在自己的值册边上，旁边画了个问号。'}]});

  // C. 宋文秀：不是所有生母都把亲手照料孩子当作人生中心。她保证孩子不缺东西，却首先保全自己。
  const west=CH('西华门外');
  addAfter(west,'长春宫又响起一声婴啼',{v80id:'song-self-preserve',heading:'承熙十五年七月 · 长春宫的叶子牌没有停',cast:['song2','zhou','emperor'],fx:'summer',narrative:true,text:s=>{
    if(!s.flags?.v69LatePrincess||!PEOPLE.song2)return [`这一局宋氏的小公主没有出生，长春宫没有这场夏夜。`];
    const p=s.flags.v69LatePrincess;
    return [
      `七月闷得厉害，长春宫外间摆着冰盆，宋文秀同两名旧识打叶子牌。她刚换了一件轻薄的藕色夏衣，桌边是酸梅汤和切得很薄的蜜瓜。`,
      `东暖阁忽然来人，说${p.order||'小公主'}${p.name||'杨宜哉'}发热。乳母已经请了太医。`,
      `宋文秀手里的牌停了一下：“烧得很高？”`,
      `“太医说先用药看一夜。”`,
      `她把牌放回桌上，却没有起身：“那边的人今晚别往外间来。要什么冰、药、炭，直接报数。缺一样来告诉我。”`,
      `周清漪正好来送一匣新做的纱帐，站在帘边听完：“你不去看看？”`,
      `宋文秀抬头：“太医在，乳母在，女官也在。我去了，除了跟着慌，还能做什么？”`,
      `“抱她一下。”`,
      `宋文秀笑得很淡：“她现在烧得难受，未必想让我抱。”`,
      `我傍晚过去时，叶子牌已经收了。宋文秀正一项项核冰、药和夜里轮值，却仍坐在外间。她见我，只说：“陛下若觉得臣妾该守床边，可以下旨。”`,
      `我看了她一会儿：“朕不能下旨叫一个人喜欢怎么做母亲。孩子醒了以后，你自己去见她。”`,
      `第二日热退。小公主醒来先伸手找的是乳母。宋文秀站在床边，把新买的小金锁放到枕头旁：“认谁都行。别再烧了。”`
    ];
  },choices:[{label:'不罚她，孩子的照料照常留痕',effects:{trust:{song2:1,zhou:1},flags:{v80SongDetachedMother:true}},result:'长春宫没有因为这件事受罚。之后小公主的衣料、药例从没短过；夜里哭醒时，最常进去的仍是乳母。'}]});

  // 若张后后来抚养宋氏公主，让这种母女距离继续存在，而不是忽然改成人设。
  const foster=west&&ST(west,'凤仪宫添了两只小碗');
  if(foster&&!foster.v80SongEcho){const old=foster.text;foster.text=s=>{
    const xs=AS(old,s);if(!s.flags?.v80SongDetachedMother||!s.flags?.v69LatePrincess)return xs;
    return [...xs,`宋文秀嘴上问“还能天天见么”，孩子真搬进凤仪宫以后却不是天天来。第三日她送来一箱新衣，第五日托人送了一只银铃，第九日才亲自坐了半个时辰。小公主先扑到乳母怀里，再转身规规矩矩向她行礼。宋文秀看了一会儿，只说：“礼学得倒快。”`];
  };foster.v80SongEcho=true}

  // D. 太后去世：插在十六年冬与十七年冬婚议之间。
  addBefore(west,'承熙十七年冬',{v80id:'taihou-last-days',heading:'承熙十七年三月 · 慈宁宫的手炉没有再添炭',cast:['emperor','taihou','ning'],fx:'candle',narrative:true,text:s=>[
    `三月里慈宁宫的海棠才刚冒芽，太后的胃口却一天比一天小。她仍嫌太医开的汤苦，也仍嫌宫人扶得太多：“哀家只是腿没力，不是连路都不认得。”`,
    `我每日散朝都去一趟。她有时醒着，有时睡着。醒着时照旧问孩子，问四公主今日是不是又嫌先生讲得慢，问三皇子最近有没有少皱眉。很少问朝政。`,
    `四公主坐在床脚剥松子，剥十颗自己吃三颗，被太后发现以后还辩：“皇祖母现在不能多吃，儿臣替您分担。”`,
    `太后笑得咳起来，仍抬手敲了她一下。`,
    `那天傍晚我临走，太后的沉香手炉已经凉了。宫女要添炭，她摆手：“不用。今儿不冷。”`,
    `第二日天没亮，慈宁宫来报。她是在睡里走的。`,
    `我到时床帐已经放下。昨晚那只手炉还在原处。我伸手碰了一下，铜壁一点温度都没有。`,
    `裴景和问要不要先回养心殿更衣。我没有答。直到天完全亮，我仍坐在床前那张很矮的脚踏上。小时候生病，母亲也这样坐在我的床边。`
  ],choices:[{label:'留在慈宁宫送母后一程',effects:{flags:{v80TaihouDead:true},bond:{taihou:3}},result:'这一日养心殿的早膳原样撤了下去。七七以前，宫中停宴。'}]});

  addBefore(west,'承熙十七年冬',{v80id:'taihou-funeral-princess',heading:'承熙十七年三月回望 · 大丧之日，白幡垂到石阶下面',cast:['emperor','ning'],fx:'snow',narrative:true,text:s=>{
    const mc=ningMotherCall(s);
    return [
      `这是承熙十七年三月的回望。大丧那日没有雪，天却白得像要下雪。慈宁宫檐下全换了素色，风一过，白幡底端不停擦着石阶。礼官的唱声从前殿传到后殿，一层一层，很远。`,
      `我在梓宫前行礼。第三次起身时慢了一拍，右肋旧伤和膝弯一起发紧。裴景和往前半步，又停住。我自己站了起来。`,
      `四公主一直跪在我身后。她平日最坐不住，这一天却安静得反常。等礼官退开，她忽然伸手抓住我的袖口。`,
      `“父皇。”`,
      `“嗯。”`,
      `她盯着梓宫边垂下来的白绫：“儿臣刚才……把里面的人换成父皇想了一下。”`,
      `我没有立刻说话。`,
      `“父皇的白玉扳指也不会再转了，眼睛也不睁。”她说得很慢，像怕自己说错，“然后儿臣又想，若是${mc}躺在那里，头发是不是也不用再梳了？”`,
      `邵明贞站在另一侧，脸一下白了。她没有喝止孩子。`,
      `四公主抬头：“父皇以后也会死么？”`,
      `我说：“会。”`,
      `“${mc}也会？”`,
      `“会。”`,
      `她的手抓得更紧：“那儿臣怎么办？”`,
      `我低头看她。她眼睛红，却没有哭。`,
      `“到那时候，你会比现在大很多。”我说，“今天不用先想那么远。今天先陪父皇站一会儿。”`,
      `她点头，没有松手。那一刻我第一次觉得，自己的女儿已经能看见“皇帝”后面那个也会没有母亲的人。`
    ];
  },choices:[{label:'让她继续抓着袖口',effects:{trust:{ning:2},flags:{v80RuoyiSawMortality:true}},result:'礼官下一次唱礼时，四公主才把手松开。我的袖口留下了四道很浅的皱痕。'}]});

  addBefore(west,'承熙十七年冬',{v80id:'taihou-whistle-return',heading:'百日后 · 那只蓝玻璃鸟又响了一次',cast:['emperor','ning'],fx:'wind',narrative:true,text:s=>[
    `百日以后，慈宁宫开始整理太后的随身小物。四公主分到的不是什么贵重首饰，只是一只旧抽屉。宫女从最里面翻出一方褪色手帕，里面包着一枚蓝玻璃海鸟哨。`,
    `她愣了半天：“皇祖母还没扔？”`,
    `那正是黛拉当年送的。太后嫌她吹得太吵，收走以后竟一直放在这里。`,
    `四公主把鸟哨攥在掌心，没有在慈宁宫吹。`,
    `又过十几日，御花园起了风，旧海棠的枝叶响了许久。她站在树旁，把哨子放到嘴边，吹了一声。声音先尖后低，还是难听。`,
    `远处两个年幼皇嗣听见，齐声喊：“维拉！”`,
    `四公主终于笑出来：“你们还记得？”`,
    `“当然记得。风来了。”`,
    `她又吹了一声。裴景和站在我身后，小声道：“太后娘娘若听见，大约还得没收一次。”`,
    `我说：“这回让她吹吧。”`
  ],choices:[{label:'在风里站一会儿再回养心殿',effects:{bond:{ning:2},flags:{v80WhistleReturned:true}},result:'那天以后，四公主把蓝鸟哨系在书袋上。只有起风时才吹。'}]});

  // 太后去世后的实际余波：停宴、主控更常让皇女本人先说婚事意愿。
  const marriage=west&&ST(west,'大公主的婚事又被提起来');
  if(marriage&&!marriage.v80TaihouEcho){const old=marriage.text;marriage.text=s=>{
    const xs=AS(old,s);if(!s.flags?.v80TaihouDead)return xs;
    return [`太后大丧过去还不到一年，慈宁宫仍只开半边门。`,...xs.slice(0,2),`我把婚帖推给大公主自己看。四公主在白幡下问过我的那句“那儿臣怎么办”，我没有忘。`,...xs.slice(2)];
  };marriage.v80TaihouEcho=true}

  // E. 人物与皇嗣页的少量同步，不额外塞作者解释。
  const oldPeople80=typeof peopleView==='function'?peopleView:null;
  if(oldPeople80&&!globalThis.__v80People){globalThis.__v80People=true;peopleView=function(){
    if(state.flags?.v80TaihouDead&&PEOPLE.taihou){PEOPLE.taihou.title='故昭懿慈宁圣母皇太后';PEOPLE.taihou.bio='承熙十七年春薨于慈宁宫。她晚年仍最爱问孩子吃了没有、腿冷不冷；四公主那只被她嫌吵收走多年的蓝玻璃鸟哨，最后从她抽屉里重新回到孩子手里。'}
    return oldPeople80();
  }}
  const oldChildren80=typeof childrenView==='function'?childrenView:null;
  if(oldChildren80&&!globalThis.__v80Children){globalThis.__v80Children=true;childrenView=function(){let h=oldChildren80();if(state.flags?.v80RuoyiBeloved){const box=`<section class="v80-mourning"><h3>四公主 · 杨晏尔</h3><p>她小时候最敢直接进养心殿问父皇问题，也是慈宁宫最常见的孩子之一。承熙十七年太后大丧，她第一次问父皇：“你以后也会死么？”太后留下的蓝玻璃鸟哨后来一直系在她书袋上。</p></section>`;h=h.replace('</main>',box+'</main>')}return h}}

  // 大事录只记事实，不替人物下总结。
  if(typeof historyRecordV38==='function'&&!globalThis.__v80Hist){globalThis.__v80Hist=true;const old=historyRecordV38;historyRecordV38=function(e,i){
    const r=old(e,i);if(e?.title==='西华门外'&&state.flags?.v80TaihouDead){return `${r?r+' ':''}承熙十七年春，皇太后邵氏薨；帝亲临大丧，宫中停宴七七。`;}return r;
  }}

  try{save();render()}catch(_e){}
}catch(e){console.error('v80 patch failed',e)}})();
