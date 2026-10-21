(()=>{try{
 const CH=t=>(CHAPTERS||[]).find(c=>c.title===t), ST=(ch,q)=>(ch?.steps||[]).find(st=>String(st.heading||'').includes(q)), arr=v=>Array.isArray(v)?v:[v];
 function patchText(ch,q,fn){const st=ST(ch,q);if(!st)return;const old=st.text;st.text=s=>arr(typeof old==='function'?old(s):old).map(x=>fn(String(x),s)).filter(x=>String(x).trim());}
 function setText(ch,q,val){const st=ST(ch,q);if(st)st.text=val;return st}
 function apply100(){
  const ch8=CH('灯下旧局');
  patchText(ch8,'沈案与蘅地名单碰在同一页',(x)=>x.replace('裴景和核旧军籍时，把两份原本毫无关系的名单并到同一张案上：沈家军令的一名抄送人，后来曾负责蘅地归附户籍。','裴景和核旧军籍时，把两份名单并到同一张案上：沈家军令的一名抄送人，也出现在蘅地归附户籍里。').replace('和妃来认营号，含章来还棋谱，两个人就这样第一次同时看见那个名字。','和妃来认营号时，含章正好来还棋谱。两个人都停在那个名字上。'));
  patchText(ch8,'那晚的棋下得比平时慢',(x)=>x.replace('她抬眼。那大约是她第一次听见我直接承认不知道。窗外风声撞过宫墙，她重新低头，把那枚本来要落的棋子放回罐里。','她抬眼看我。窗外风声撞过宫墙，她把本来要落的棋子放回罐里：“那就先查不知道的那一段。”'));
  patchText(ch8,'双生不是两个人一起出生那么简单',(x)=>x.replace('她没有立刻回答。那一晚第一次出现真正长的沉默。','她没有立刻回答。棋盘中间空了很久。'));

  const ch14=CH('窗开半扇');
  patchText(ch14,'箱笼比人先认得宫门',(x)=>x.replace(/张元照把那张纸看了两遍。后来她在时疫里写第一版交接表时，最下面没有写“经手”，写的是两个空格：<b>交出者、接收者。<\/b>/,'张元照把那张纸看了两遍，在纸边写下两个小字：“谁给？”')); 
  patchText(ch14,'纸边长出一排小方格',(x)=>x.replace('纸一张张叠进匣中，看起来不像宫廷秘档，只像一个人终于能自己安排的一些小事。','纸一张张叠进匣中。月底清匣时，她把已经做完的纸压到最下面。'));
  patchText(ch14,'一双筷子没有落回原处',(x)=>x.replace('宋文秀笑意顿了顿。她大概第一次遇见有人连自己的习惯都不急着推广。','宋文秀笑意顿了顿，把公筷放回盘边：“那我自己用。”'));
  patchText(ch14,'梁氏晒弓弦',(x)=>x.replace('两个人后来偶尔谈弓，却几乎不谈各自父兄。她们都知道，一旦两个军门女人被写成一条线，朝堂就会替她们补出剩下半句话。','霍素英把弓弦递回去：“你家的法子管海边，我家的法子管北地。别混。”梁素贞应了一声。'));
  patchText(ch14,'一场雨把顺王府的名字带进永和宫',(x)=>x.replace('雨声很大。两个人后来很少再谈顺王，却从这一场开始，知道彼此都见过同一种温柔变成门闩的样子。','雨声很大。沈知微把茶续满，只说：“像不像我，都不是锁门的理由。”'));
  patchText(ch14,'宋氏第一次发现“省事”也会吓到人',(x)=>x.replace('那句话让宋文秀第一次意识到，旧垄断者并不等于只会捍卫旧垄断。','宋文秀把原先那张总单收回去，重新画成三家轮换。'));
  patchText(ch14,'七月尽头',(x)=>x.replace('第二天是八月初一。晨起风里第一次有了一点凉意。景阳宫的小方格纸还没写满，储秀宫西院先来了一名说头痛发热的宫女。那一格从此没再写“换窗纸”。','第二天是八月初一。晨起风里有了凉意。景阳宫的小方格纸还没写满，储秀宫西院先来了一名说头痛发热的宫女。'));

  const ch16=CH('凤仪宫最后一冬');
  patchText(ch16,'新规第一次不是为了死人被翻出来',(x)=>x.replace('方小满已经死了。她留下的东西却第一次在另一个人还活着的时候派上用场。','阿芙从听雨轩旧匣里翻出方小满案留下的一张交接单，递给张元照。'));
  patchText(ch16,'张元照要的不是药方',(x)=>x.replace('皇后把三张纸按在掌下，第一次没有先问旧例。','顾明宜把三张纸按在掌下：“先照这个查三日。”').replace('空白那张后来写满了修改。','第三张仍空着，张元照只在顶上写了“改动”二字。'));
  patchText(ch16,'四个空格终于有了名字',(x)=>x.replace('那一夜没人觉得这是大事。外头雨还在下，太医院只催第二批退热药。后来这四个空格却一路从病院走到了粮仓、军械库和御案边。','外头雨还在下，太医院催第二批退热药。四个空格写好以后，纸先夹进当夜的转院册。'));
  patchText(ch16,'一盏亮一点的灯',(x)=>x.replace('张元照第一次在永和宫和沈知微单独说疫务，是为了“为什么有人发热也不肯报”。','张元照去永和宫找沈知微，问的是：“为什么有人发热也不肯报？”'));
  patchText(ch16,'永和宫先发现“没人敢说自己病了”',(x)=>x.replace('两个人第一次在同一张纸上写字。一句让人敢开口，一句让人不能拿宽免当借口。','沈知微写完第一句，把笔推过去。张元照在下面添了第二句。'));
  setText(ch16,'九月初二 · 许淑惠被一张改过的牌子送进西院',s=>[
    `九月初二，许淑惠的调院牌送到咸福宫。原本那一栏墨色发毛，新的红记却很清楚：西院。`,
    `王静娴若在宫中，便站在门边看了许久：“许氏这些日子没有去过西院。”`,
    `送牌的人只认红记。那几日人手已经乱，谁都怕漏掉接触过病人的人。`,
    `许淑惠自己把小包袱抱起来：“别因为我一个人，把这一院都拖着等。”`,
    `阿芙接过那张牌，没有丢。她用指腹摸到被刮薄的地方，夹进当日旧单里。`
  ]);
  patchText(ch16,'凤仪宫最后一页',(x)=>x.replace('她昏睡前忽然又问：“顺谦那回伴读的事……宗人府后来记了没有？”','她昏睡前忽然问：“顺谦那回伴读的事……宗人府记了没有？”'));
  patchText(ch16,'她没有划掉最后一格',(x)=>x.replace('那张纸后来一直夹在疫册最前面。她此后仍画小方格，却再没因为一件事“应该结束了”，就替一个没有结束的格子划勾。','她把那张没有勾完的纸夹进疫册最前面，合上匣子。'));
  const epi=ST(ch16,'疫止以后，张元照第一次真正有了功名'); if(epi)epi.heading='十一月 · 请功折送到御前';
  const sweet=ST(ch16,'腊月初八，终于有人嫌粥太甜'); if(sweet)sweet.heading='腊月初八 · 粥太甜了';

  const ch22=CH('中宫空悬');
  patchText(ch22,'“臣妾不是从哪个州府来的”',(x)=>x.replace('她说完“工作”两个字，自己停了一下，改成“差事”。我没有纠正。那一瞬，她听起来终于不像努力学了十年宫廷话的人。','她说到“工作”两个字时停了一下，改口：“差事。”我没有打断。'));
  patchText(ch22,'同夜 · 最大的秘密说完以后',(x)=>x.replace('她们后来谈了半刻钟别的：','接着她们谈了半刻钟别的：').replace('她们后来谁也没有记这盏茶喝了多久。','那盏茶什么时候凉的，没人留意。'));
  patchText(ch22,'同月 · “你不是她”',(x)=>x.replace('黛拉脸上的笑第一次没来得及换下一层。','黛拉脸上的笑停住了。').replace('她第一次在御前不笑，也没有因此显得少了什么。','她站了一会儿，没有再笑。'));

  const ch24=CH('西华门外');
  patchText(ch24,'二公主的婚帖第一次摆到她自己面前',(x)=>x.replace('名单里第一次出现陆既明。二公主第一次见他，是在宗室女学核冬炭。','名单里有陆既明。二公主早先在宗室女学核冬炭时见过他。').replace('之后半年，两个人又在女学、恤孤院和宗室账目里见过几次。起初都有旁人在。后来，二公主开始记得他每一次什么时候来。','之后半年，两个人又在女学、恤孤院和宗室账目里见过几次。二公主会在他来以前把账桌上的纸理齐。'));

  // keep choice labels clean in every route.
  for(const ch of CHAPTERS||[])for(const st of ch.steps||[])if(Array.isArray(st.choices))st.choices=st.choices.map(c=>{const label=c.label;const cleanLabel=v=>String(v||'').replace(/待封|待选秀女|待选/g,'').replace(/  +/g,' ').trim();return {...c,label:typeof label==='function'?s=>cleanLabel(label(s)):cleanLabel(label)}});
 }
 apply100();
  // Display revision is applied at bootstrap; settlement never rewrites it.

 const pr=render;function direct(){try{stopVoice();$('#app').innerHTML=nav()+(state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView());bind();maybeAutoplayVoice();}catch(e){console.error('v100 direct',e)}}
 render=function(){const o=pr();apply100();direct();document.documentElement.dataset.build='v100';document.title='宫灯未眠 · 全篇语言与剧透终检 v100';return o};
 try{save()}catch(_e){};try{render()}catch(e){console.error('v100 render',e)}
}catch(e){console.error('v100 language spoiler final failed',e)}})();
