(()=>{try{
  document.documentElement.dataset.build='v82';
  document.title='宫灯未眠 · 万家灯火与第二主控 v82';
  const flags=()=>state.flags||(state.flags={});
  const finalZhang=s=>s.flags?.v44NewEmpress==='zhangyuanzhao'||s.ranks?.zhangyuanzhao==='皇后'||s.flags?.v74ZhangSucceeded;
  const strictGone=s=>!!s.flags?.v81PrinceOpenEnding;
  const heirName=s=>strictGone(s)?'四皇子杨顺恭':'三皇子杨顺谦';
  const heirShort=s=>strictGone(s)?'四皇子':'三皇子';
  const bondLine=s=>{
    const b=s.flags?.v75EmperorZhangBond;
    if(b==='family')return '有时候养心殿根本没有事，我也会叫她来坐着。我批折子，她看自己的纸。两个人可以一晚不说一句话。';
    if(b==='partner')return '难事来了，我知道她会把她那一份做完；她也知道最后那个“准”或“驳”必须由我自己写。';
    return '我敢当着她说“朕不知道怎么办”，她也敢当面说“陛下这次错了”。';
  };
  const shenLove=s=>{
    const f=s.flags?.v75ShenFate;
    if(f==='death')return '臣妾爱过知微。她死了，这句话也不会改成别的。';
    return '臣妾爱知微。这件事陛下一直知道。';
  };
  if(!CHAPTERS.some(ch=>ch.title==='万家灯火')){
    CHAPTERS.push({
      date:'承熙二十年至二十二年冬',
      title:'万家灯火',
      theme:'承熙朝最后一夜；钟声停下以后，仍有人必须决定明天怎么办',
      place:'养心殿 / 奉先殿 / 丹陛',
      cast:['emperor','zhangyuanzhao','peiyan','xielin','ning'],
      fx:'candle',
      bridge:s=>finalZhang(s)?`承熙十九年的旧案落定以后，宫里难得安静了两年。孩子继续长大，封地照常来折，女史院换了第二批人。我的消渴却没有好。最初只是口渴、夜里频起，后来一场小伤也要拖很久才能收口。张元照还是管我的甜食，裴景和还是偶尔替我藏一小碟。谁也没有把“最后”两个字说出口。`:`这条终章属于张元照最终受凤印的路线。本局中宫不是她，承熙朝仍会走向自己的终点，但不会发生“第二主控”的交接。`,
      steps:[
        {v82:true,heading:'承熙二十一年九月 · 储位终于写进密匣',cast:['emperor','zhangyuanzhao'],fx:'ink',narrative:true,text:s=>{
          if(!finalZhang(s))return ['张元照没有受凤印，略过这一条终章支线。'];
          if(strictGone(s))return [
            `朔川来折那日，顺谦没有谈京中的储位。他只在末尾写：“儿臣在藩安好，无意返京争储。”`,
            `我把折子给张元照看。她看完没有劝我把人召回来，只问：“陛下还要不要再问他一次？”`,
            `“不问了。”`,
            `我在密匣里写下四皇子的名字。杨顺恭十六岁，已经跟着兵部和户部听过两年朝议，却还年轻。`,
            `张元照看着那张纸：“陛下既然让顺谦走，就别等到需要一个储君时又把他叫回来。”`,
            `我说：“朕知道。”`,
            `她把密匣锁上。钥匙一把在御前，一把送宗人府。`
          ];
          return [
            `三皇子这些年已经能独自听完一场朝议。顾明宜留下的那本旧名册，他仍自己收着。`,
            `九月，我把储位正式写进密匣。名字没有出乎任何人的意料：杨顺谦。`,
            `张元照看完只问：“要不要现在告诉他？”`,
            `“告诉。”`,
            `“也告诉他，储君不是提前学会当皇帝，是先知道自己以后不能再把所有错都推给父皇。”`,
            `我看她：“这句话你自己去说。”`,
            `“臣妾会。”`
          ];
        },choices:[{label:'封好密匣',requires:s=>finalZhang(s),effects:{flags:{v82HeirSettled:true}},result:s=>`承熙二十一年秋，储位正式定下：${heirName(s)}。`} ]},

        {v82:true,heading:'承熙二十二年十一月 · 她开始不许我一个人走长廊',cast:['emperor','zhangyuanzhao','peiyan'],fx:'snow',narrative:true,text:s=>finalZhang(s)?[
          `入冬以后，我走得比从前慢。右肋旧伤仍在，腿脚又添了一层没来由的乏。最麻烦的是右足一道很小的破口，半个月还没有完全收住。太医不敢说重话，只把“消渴日久”写得越来越靠前。`,
          `张元照从此不许我散朝后一个人穿长廊。她自己未必来，来不了就让裴景和跟着。`,
          `我嫌烦：“朕走了几十年，还会在自己宫里迷路？”`,
          `她看都不看我脚上的鞋：“迷路倒好办。陛下若摔一跤，臣妾得听十个人说‘万岁爷只是没站稳’。”`,
          `“你现在越来越像太后。”`,
          `“臣妾若真像太后，已经先骂陛下一顿。”`,
          `那晚我还是从折子后摸出半块桂花糖藕。她伸手。`,
          `“就半块。”`,
          `“上回也是半块。”`,
          `“朕都五十多了。”`,
          `“所以更不能当十岁孩子哄。”`,
          `她最后没有把糖藕扔掉，切成两小块，只留一块给我。另一块自己吃了，酸着脸说：“太甜。”`,
          `我笑她：“你不爱吃，抢什么？”`,
          `“省得陛下吃第二块。”`
        ]:['本局略过。'],choices:[{label:'吃完这一小块，出去走一圈',requires:s=>finalZhang(s),effects:{bond:{zhangyuanzhao:2},flags:{v82LateCare:true}},result:'那晚我们从养心殿走到乾清门，再慢慢走回来。雪还没下，风已经很冷。'}]},

        {v82:true,heading:'承熙二十二年冬至后第三夜 · 养心殿没有熄灯',cast:['emperor','zhangyuanzhao','peiyan','ning'],fx:'candle',keyDecision:true,text:s=>{
          if(!finalZhang(s))return ['本局略过张元照终章。'];
          return [
            `冬至以后我起了一场热。最初谁都当作风寒，第三日却连坐起都费力。养心殿把炭添得很足，我还是觉得冷。`,
            `裴景和在外间守了两夜。张元照第三夜把人全赶出去，只留一盏不太亮的灯。`,
            `我看见御案边空着：“蜜枣呢？”`,
            `“撤了。”`,
            `“都这时候了还管？”`,
            `“太医没说这是最后一夜。”`,
            `我笑了一下，没力气再同她争。`,
            bondLine(s),
            `我问：“元照，我们这样到底算什么？”`,
            `她坐在床边，没有立刻答。`,
            `“不是夫妻那种。”她说，“也不是知微那种。”`,
            `“朕知道。”`,
            `“臣妾心疼陛下。”`,
            `我转头看她。`,
            `她说得很慢：“陛下右肋疼的时候不说，夜里口渴也不说，累了只会把折子往旁边推。臣妾看得出来。看见陛下难受，臣妾也会难受；陛下做错了，臣妾还是会骂。”`,
            shenLove(s),
            `“对陛下，是心疼，是舍不得，也是这么多年一起过下来的习惯。不是同一件事。”`,
            `我问：“朕死了，你会难过？”`,
            `“会。”`,
            `“多久？”`,
            `“不知道。”`,
            `我闭着眼笑：“你终于也有不知道的事。”`,
            `过了一会儿，我说：“朕死以后，他们都会先看你。”`,
            `她没有装听不懂：“陛下想让臣妾接？”`,
            `“朕不替你选。”`,
            `“那臣妾自己选。”`,
            `“好。”`,
            `窗外更鼓过了四下。她替我把被角往上拉了一点。我最后看见的是她低着头，手还压在被角上。`
          ];
        },choices:[
          {label:'“元照。”',requires:s=>finalZhang(s),effects:{flags:{v82LastWord:'name'}},result:'她俯下身：“臣妾在。”我没有再说下一句。'},
          {label:'握一下她的手，不再说话',requires:s=>finalZhang(s),effects:{flags:{v82LastWord:'hand'}},result:'她没有把手抽开。天快亮时，我的手先凉下去。'},
          {label:'“明天的折子，你先替朕看一眼。”',requires:s=>finalZhang(s),effects:{flags:{v82LastWord:'work'}},result:'张元照红着眼睛骂了一句：“陛下到这个时候还使唤人。”我笑不出来，只眨了一下眼。'}
        ]},

        {v82:true,heading:'天亮以前 · 白玉扳指终于不转了',cast:['zhangyuanzhao','ning','peiyan','xielin'],fx:'snow',narrative:true,text:s=>{
          if(!finalZhang(s))return ['本局略过。'];
          return [
            `<div class="v82-pov">此刻起，御前的“我”不再是杨叙。</div>`,
            `天快亮的时候，他没有再醒。`,
            `我坐在床边很久。先听见外间有人跪下，后来是第二个、第三个。裴景和没有哭出声，只在门槛外说：“娘娘。”`,
            `我低头看见皇帝右手上的白玉扳指。过去二十多年，他想事情时总会转它。现在它停在指节上，一点也不动。`,
            `四公主进来时已经十六岁。她站在床尾，脸白得像那年慈宁宫的白幡。`,
            `她看了很久，忽然说：“父皇的扳指真的不动了。”`,
            `我知道她在说什么。五年前太后大丧，她跪在梓宫后面，曾经把这个画面先想过一次。`,
            `这一次没有人告诉她“别乱想”。`,
            `她蹲下来，把脸埋在床沿。`,
            `外头第一遍丧钟响起来。钟声越过宫墙以后，整座宫的人都会知道承熙朝结束了。`,
            `裴景和又叫了一声：“皇后娘娘，外头都在等。”`,
            `我抬头。`,
            `门外有储君，有皇子女，有宗室，有六部尚书，有旧妃，有女史，还有一群根本不知道下一句话该听谁说的人。`,
            `他们没有再往床上看。`,
            `他们都在看我。`
          ];
        },choices:[
          {label:'先去看储君，再回前殿',requires:s=>finalZhang(s),effects:{flags:{v82ZhangFirstChoice:'heir',v82EmperorDead:true}},result:s=>`${heirShort(s)}跪在侧殿，第一句话是：“母后，儿臣该先做什么？”我说：“先去见你父皇。别急着学皇帝。”`},
          {label:'先把遗诏、兵符和宫门钥匙都送来',requires:s=>finalZhang(s),effects:{flags:{v82ZhangFirstChoice:'state',v82EmperorDead:true}},result:'我说：“哭可以。边哭边把该交的东西交清。”裴景和抬头看我一眼，转身去传话。'},
          {label:'“都出去。给我一刻钟。”',requires:s=>finalZhang(s),effects:{flags:{v82ZhangFirstChoice:'grief',v82EmperorDead:true}},result:'门合上以后，我终于哭了一会儿。只一刻钟。钟声第二遍响起以前，我自己把门打开。'}
        ]},

        {v82:true,heading:'承熙二十二年冬 · 她第一次没有人可以回头问',cast:['zhangyuanzhao'],fx:'candle',keyDecision:true,text:s=>{
          if(!s.flags?.v82EmperorDead)return ['这一场还没有发生。'];
          const heir=heirName(s);
          return [
            `大行皇帝梓宫移入奉先殿以后，我回了一趟凤仪宫。屋里没有人。阿芙把灯点好便退了出去。`,
            `桌上放着三样东西：凤印、${heir}即位以后要用的新玺样，还有杨叙最后没批完的那叠折子。`,
            `我忽然很想把门关上。`,
            `这些年我说过喜欢权。那不是逞强。现在仍然喜欢。可我第一次发现，喜欢权和愿意独自承担它，不完全是一回事。`,
            `知微不在这张桌边。${s.flags?.v75ShenFate==='death'?'她连一封信都不会再有。':s.flags?.v75ShenFate==='fief'?'她在很远的封地。':s.flags?.v75ShenFate==='religion'?'她在宫外的女观。':'她已经不再坐在御前替我改句子。'}`, 
            `杨叙也不在。以后我做错一件事，不会再有人从御案后抬头说：“元照，这一步再想想。”`,
            `凤印已经封存。我把手停在案边那叠待议折子上，没有立刻翻开。`
          ];
        },choices:[
          {label:'“我留下。不是替他守，是我自己还想做。”',requires:s=>!!s.flags?.v82EmperorDead,effects:{flags:{v82ZhangRegency:'power',v82SecondController:true}},result:'我抽出案边第一叠待议折子，叫阿芙开门：“让他们进来。”'},
          {label:'“先把新帝送过最乱的这几年。以后退不退，以后再说。”',requires:s=>!!s.flags?.v82EmperorDead,effects:{flags:{v82ZhangRegency:'duty',v82SecondController:true}},result:'我把新玺样放到凤印旁边：“先传六部和宗人府。今晚把明日该做的事说清。”'},
          {label:'“我今天不替余生做决定。今天先把这一夜接住。”',requires:s=>!!s.flags?.v82EmperorDead,effects:{flags:{v82ZhangRegency:'open',v82SecondController:true}},result:'我把门打开。外面的人已经站满长廊。我说：“先从宫门和京营开始。”'}
        ]},

        {v82:true,heading:'新朝第一夜 · 城外的灯比宫灯多',cast:['zhangyuanzhao'],fx:'lantern',narrative:true,text:s=>{
          if(!s.flags?.v82SecondController)return ['这一场还没有发生。'];
          const reg=s.flags?.v82ZhangRegency;
          return [
            `新帝即位后的第一夜，我从前殿出来已经很晚。${strictGone(s)?'新帝年轻，遗诏令我临朝听政，等朝局稳后再议归政。':'新帝已经成年，仍请我在西暖阁共议国事一年。'}无论名目叫什么，明日第一封折子还是会送到我面前。`,
            `我没有回凤仪宫，沿丹陛慢慢走到能看见外城灯火的地方。宫墙里面的灯一盏一盏，城里却更多。近处是坊市，远一点是河岸，再远就分不清是哪家窗。`,
            `我前世听过一首歌。曲子早忘得差不多，只剩一句还在脑子里。`,
            `<span class="lyric">“是你给我，流淌的人间星河，最平凡的万家灯火。”</span>`,
            `我在风里站了一会儿。`,
            `这句话里的“你”是谁，我忽然想不出来。不是杨叙，也不是我。城南卖饼的人会自己点灯，船到渡口会自己挂灯，女史下值回家也会替母亲留一盏。那些灯不是皇帝赏的。`,
            `可一道错的旨意、一场拖久的河工、一份被压住的疫报，真的能让很多灯一起灭掉。`,
            reg==='power'?`我已经承认自己想要权。现在权真的到了手里，我也没有忽然不想要。只是从今以后，做成的事不会有人替我分一半名字，做错的也一样。`:reg==='duty'?`我没有给自己定哪一年一定退。先把眼前这些人和事送过最乱的一段，再看新帝能不能自己站稳。到时候若我仍不想放手，也得老实承认。`:`我仍不知道这一生最后会走到哪一步。以前我总逼别人先把答案写清，这一次先容自己留一格空白。`,
            `身后有人来报：“娘娘，六部都到了。”`,
            `我回头看了一眼宫里的灯。养心殿那一盏已经灭了。`,
            `“走吧。”我说。`,
            `我转身回殿。里面还有很多人，等我说新朝的第一句话。`
          ];
        },choices:[{label:'回殿',requires:s=>!!s.flags?.v82SecondController,effects:{flags:{v82FinaleComplete:true,final:'万家灯火'}},result:'宫门没有关。风从长廊一直吹进来。'}]}
      ]
    });
  }

  // 人物页：承熙帝去世后，身份与关系切到终局。
  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople&&!globalThis.__v82People){globalThis.__v82People=true;peopleView=function(){
    if(flags().v82EmperorDead&&PEOPLE.emperor){PEOPLE.emperor.title='故承熙帝';PEOPLE.emperor.bio='承熙二十二年冬崩于养心殿。年轻时他总想替每一处空白写下可执行的答案，中年一度又把太多答案推给“照旧”和身边能办事的人。晚年他重新把最后的朱笔收回自己手里，也终于学会有些空白必须留给本人。最后一夜，他没有替张元照决定自己死后该留下还是退场。';}
    if(flags().v82SecondController&&PEOPLE.zhangyuanzhao){PEOPLE.zhangyuanzhao.title='皇太后';PEOPLE.zhangyuanzhao.home='慈宁宫 / 西暖阁';PEOPLE.zhangyuanzhao.bio='承熙帝崩后，新帝即位。她没有把手里的权说成先帝遗愿，也没有退回后宫证明自己淡泊；她亲自选择继续参与朝政。此后故事里的第一个“我”已经不在，许多人的下一步开始先来问她。';}
    return oldPeople();
  }}

  // 大事录只写发生的事。
  if(typeof historyRecordV38==='function'&&!globalThis.__v82Hist){globalThis.__v82Hist=true;const oldHist=historyRecordV38;historyRecordV38=function(e,i){
    if(e?.title==='万家灯火'&&flags().v82EmperorDead){return `承熙二十二年冬，帝崩于养心殿。${heirName(state)}即位；${flags().v82SecondController?'张皇后尊为皇太后，参与新朝政务。':''}`;}
    return oldHist(e,i);
  }}

  // 终页改为真正的承熙朝终章；不复述作者分析。
  const oldEnding=typeof ending==='function'?ending:null;
  if(oldEnding&&!globalThis.__v82Ending){globalThis.__v82Ending=true;ending=function(){
    if(!flags().v82FinaleComplete)return oldEnding();
    const mode=flags().v82ZhangRegency==='power'?'她明确选择继续掌权。':flags().v82ZhangRegency==='duty'?'她先陪新帝走过新朝最初几年。':'她没有替余生预先落笔，但这一夜没有退。';
    return `<main class="ending"><span class="eyebrow">承熙朝·终</span><h1>万家灯火</h1><p>杨叙崩。新帝即位，张元照接过凤印之外更重的那一部分。${mode}</p><div class="v82-citylights"><b>宫灯未眠。</b><br>养心殿的灯熄了，城里的灯还亮着。<br>张元照转身回殿，新朝第一批奏折正在等她。</div><button class="primary" data-view="chronicle">查看完整大事录</button></main>`;
  }}

  // 人生录给两位主控补终点，但保持人物档案语气。
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron&&!globalThis.__v82Chron){globalThis.__v82Chron=true;chronicleView=function(){let h=oldChron();if(flags().v82FinaleComplete){
    const extra=`<section class="v82-lastlight"><span class="eyebrow">承熙二十二年冬</span><h3>两次“我”</h3><p><b>杨叙：</b>承熙朝止于养心殿最后一夜。储位已定，他没有替张元照决定余生，只告诉她：他死以后，所有人都会先看她。</p><p><b>张元照：</b>从这一夜开始，故事里的选择第一次落到她手里。她会悲痛，也仍然想要权力；两件事同时存在。</p></section>`;
    h=h.replace('</main>',extra+'</main>');
  }return h;}}

  flags().v82Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v82 finale patch failed',e)}})();
