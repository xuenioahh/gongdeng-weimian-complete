(()=>{try{
 const CH=t=>(CHAPTERS||[]).find(c=>c.title===t), ST=(ch,q)=>(ch?.steps||[]).find(st=>String(st.heading||'').includes(q)), arr=v=>Array.isArray(v)?v:[v];
 function patchText(ch,q,fn){const st=ST(ch,q);if(!st)return;const old=st.text;st.text=s=>arr(typeof old==='function'?old(s):old).map(x=>fn(String(x),s)).filter(x=>String(x).trim());}
 function setText(ch,q,val){const st=ST(ch,q);if(st)st.text=val;return st}
 // placeholder titles: preview/jump states use names rather than “待封/待选”.
 if(!globalThis.__v99CourtTitle){globalThis.__v99CourtTitle=true;const oldCT=courtTitle;courtTitle=function(s,k){const r=oldCT(s,k);return /^(待封|待选|待选秀女)$/.test(String(r))?(PEOPLE?.[k]?.name||r):r};}

 function apply99(){
  const ch3=CH('灯下弈');
  patchText(ch3,'换灯的时候',(x)=>x.replace('我把酒盏放下。宴到这里已经不像一场安排好的节目，更像一群人真的在同一个晚上待得久了，开始露出各自不准备给人看的那一面。','我把酒盏放下。抱朴还在解缠住银簪的头发，方小满低头检查巧果，含章把掰开的那一半放回盘里。'));
  patchText(ch3,'七夕前一日',(x)=>x.replace(/我在园里只待了一刻钟。真正的宴还没开始，几个人已经各自把明晚当成了不同的事：有人要把事情办妥，有人要被看见，有人只是陪着，还有人只希望巧果别再烤焦。/,'我在园里只待了一刻钟。走时，顾明宜还在挪椅子，抱朴继续试舞，含章继续数拍子，方小满端着新一炉巧果往外跑。'));
  patchText(ch3,'第二日早晨',(x)=>x.replace('可第二日后宫真正开始议论的，恰恰是这些史官不会写的东西。','第二日请安前，昨夜掉过的银扣、少掉的半壶酒和谁最后离园，都已经有人在低声说。'));

  const ch6=CH('宫灯渐繁');
  const s0=ST(ch6,'分宫不是搬箱子'); if(s0)s0.heading='承熙三年三月 · 九日搬宫';
  patchText(ch6,'霍氏生产',(x)=>x.replace('四皇子没有立刻改变储位。可从这一日开始，“皇子”不再只是皇后宫里那一个孩子。','洗三那日，三皇子站在摇篮边看了许久。')); 

  const ch7=CH('香尽胎寒');
  patchText(ch7,'孕期不是一条直线',(x)=>x.replace('她因此更不敢停下笑。每次我去，她都先问：“臣妾今日看起来是不是很好？”','我每次去，她总先照一遍镜子，再问：“臣妾今日看起来是不是很好？”'));

  const ch8=CH('灯下旧局');
  patchText(ch8,'“这盘棋，是我自己坐的”',(x)=>x.replace('那一夜我第一次发现，谨慎并不只是不信人，也可以是不替一个人把她没说过的话说完。','她说“亲眼看见”的，我记一栏；她说“猜的”，另记一栏。'));

  const ch9=CH('刃落宫门');
  patchText(ch9,'她忽然比从前更艳',(x)=>x.replace(/太医院后来把这两次早失归在上一次重创之后的余损里，没有发现新的外来毒物。对昭氏来说，这个结论并没有让她安心——它只意味着承熙六年的那一匣香，即使已经烧掉，后果还留在她身体里。/,'太医院把两次早失都记在上一次重创后的余损里，没有查到新的外来毒物。抱朴看完脉案，把纸折回去：“所以还是那一次。”'));
  patchText(ch9,'若她还活着，终于有最后一场问话',(x)=>x.replace('她到最后才第一次替家里划出一道界线。','供词最后一行写着：“此事一人所为，与母妹无涉。”'));
  patchText(ch9,'二十三日以后，蘅嫔还要不要继续做蘅嫔',(x)=>x.replace('“所以才是陛下赢。”','蘅嫔低下头，没有再说。'));
  patchText(ch9,'余烬',(x)=>x.replace(/皇后则第一次遇到一个旧例完全解决不了的问题：活着退居、离宫终老或丧仪善后，每一种都需要她自己判断。/,'顾明宜把退居、离宫与丧仪三份旧例摊开，最后一份也没有立刻合上。'));

  const ch10=CH('旧茶未凉');
  patchText(ch10,'三次转手的军令',(x)=>x
    .replace('沈家兄长并非真正“临阵脱逃”，而是在撤军命令被改写后，背了一个必须有人承担的罪名。','旧军令与判词对不上：撤军时辰被改过，沈家兄长却按“临阵脱逃”定了罪。')
    .replace('真正让我沉默的是另一份旧档。那份复核曾经到过我的案前。','另一份复核底稿上有养心殿旧收讫印。')
    .replace('但我当年知道有疑点，选择不查。因为夺嫡刚结束，军权正在重排，我需要一个已经结束的案子比需要一个真正的答案更多。','那一年夺嫡刚结束，军权正在重排。我看见疑点，却在折尾写了“照原判”。'));
  patchText(ch10,'平反文书怎么写',(x)=>x.replace('证据够了以后，真正难的是文书。','证据齐了，礼部送来三份不同写法。'));
  patchText(ch10,'新茶第一次被人嫌难喝',(x)=>x.replace('几个月后，听雨轩报喜。沈知微再想起这场雨时，记住的已经不是旧案，而是方小满嫌茶淡时那张毫不设防的脸。','雨停以后，方小满把剩下半碗茶推远：“下次给我甜一点的。”沈知微叫宫女真往茶盒旁添了一小罐糖。'));

  const ch11=CH('听雨轩有喜');
  patchText(ch11,'小灰蹲在窗下',(x)=>x.replace(/它什么也没有预示，只是证明这间屋子[^。]*。/g,''));
  patchText(ch11,'药还是进来了',(x)=>x.replace('方案已经不再只是“有人害她”，而是有人借一条看起来最稳妥的路把药送进来。','药碗经过御前名义、香药局封签和听雨轩验收，三处都留了痕。'));

  const ch14=CH('窗开半扇');
  patchText(ch14,'七月尽头',(x)=>x.replace('灾难真正来时，人的生活从来不会先腾空位置等它。','八月第一张发热名单送来时，“换窗纸”还留在纸角，没有人顾得上划掉。'));

  const ch16=CH('凤仪宫最后一冬');
  patchText(ch16,'第一张告示先写“不追责”',(x)=>x.replace('两个人第一次不是在查同一件事，而是在同一张纸上补彼此看漏的那一边。','沈知微把轮值表压在告示下面，张元照提笔添上那一句。'));
  patchText(ch16,'城南 · 药铺',(x)=>x.replace('城里的疫不是从诏书那天开始，也不会在诏书说“平稳”时结束。','关铺前，小学徒把价牌翻到背面。去年冬天的旧价还压在木板底下。'));
  patchText(ch16,'第一次选秀留下的人，没有谁只站在请安队伍里',(x)=>x.replace('她们没有谁因此突然成了主角。只是宫里一旦乱起来，原先看着无用的小本事都开始有重量。','夜里尚宫来收册子时，几个人各把手里的东西交上去，又回原处。'));
  patchText(ch16,'秋疫第五日 · 太医院廊下的一处刮痕',(x)=>x.replace(/张元照低头摸了一下被刮薄的纸纤维。她原先做病册时，刻意把步骤压得很少。宫里人已经够累，一套办法若每走一步都要盖章签字，最后只会被人绕过去。她知道这一点，所以一直在删。/,'张元照摸了摸被刮薄的纸纤维，把自己原先拟的六道签名划掉两道：“四处够了。再多夜里没人肯走。”'));

  const ch17=CH('雪尽宫门');
  patchText(ch17,'两封信出了宫门',(x)=>x.replace('宫里能给死者名位、祭葬、抚恤。那一晚，真正进了方家门的却只是一股有点焦的杏仁甜味。','方家接到追赠文书那晚，随恤银一起送去的还有一盒杏仁酥。路远，打开时边角已经有些碎。'));
  patchText(ch17,'王静娴的册页',(x)=>x.replace('她做过的事多半小得很难写进一纸册命：替人把争执圆回来、记住谁真正进过哪一道门、在觉得不对时终于学会先开口。','功册上只列了几件小事：替值夜人对过门册、在疫中指认过错路、几次当场报出不合的口供。'));
  patchText(ch17,'大封六宫',(x)=>x.replace('有人晋位，有人原位厚赏；有人得到的是宫务权，有人得到的只是一句终于写清的功劳。没有一张旨意完全一样。','红匣分别往各宫去。有人接册，有人接赏单，也有人只领了额外月例。').replace('只有凤仪宫那扇门没有因此多一盏灯——大封填满了许多位置，正中间那个位置反而更显眼。','凤仪宫正门仍关着。宣旨内监从门前经过，没有停。'));

  const ch20=CH('长夜未央');
  patchText(ch20,'六月初 · 守制结束以后',(x)=>x.replace('变的是另一件更不起眼的事：从前我会问她为什么沉默、为什么忽然想回宫；后来往往只赏一件东西，便让她退下。','有两回人坐了半刻钟没说话，我只赏了东西，便叫人送她回去。'));

  const ch22=CH('中宫空悬');
  patchText(ch22,'“臣妾不是从哪个州府来的”',(x)=>x.replace('她前世活到二十六岁，做的工作不是治病，而是在疫病发生以后追人、追时间、追住处：第一个人什么时候病，后来见过谁，哪一班人换过岗。','她说前世活到二十六岁，做的是疫病调查：“有人病了以后，臣妾去问什么时候开始不舒服、去过哪里、见过谁、哪一班换过岗。”'));
  patchText(ch22,'同夜 · 他睡着以后',(x)=>x.replace('我没有补记。第一次，我不想把自己也整理成一份可追溯的记录。','我摊开夜记，笔尖停了一会儿，那一格最终空着。'));

  const ch23=CH('帘后朱笔');
  patchText(ch23,'顺王从封地递来一封很长的折子',(x)=>x.replace('前半篇并不胡闹：','前半篇问了两件事：'));

  const ch24=CH('西华门外');
  patchText(ch24,'宗室清议多了一个总戴右手薄套的人',(x)=>x.replace('他专挑《经手留名令》真正会卡住人的地方：','他在《经手留名令》上连问两处：'));

  // three stale choice labels after Zhang entered in Year 3.
  const c16=ST(CH('凤仪宫最后一冬'),'疫止以后，张元照第一次真正有了功名');
  if(c16&&Array.isArray(c16.choices))c16.choices=c16.choices.map(c=>({...c,label:String(c.label||'').replace('办疫有功，晋待选秀女一级','办疫有功，张元照晋一级')}));
  const c22=ST(CH('中宫空悬'),'张元照再有一阶可进');
  if(c22&&Array.isArray(c22.choices))c22.choices=c22.choices.map(c=>({...c,label:String(c.label||'').replace('准待选秀女再晋一级','准张元照再晋一级')}));
  const seal=ST(CH('中宫空悬'),'凤印前最后一道旨');
  if(seal&&Array.isArray(seal.choices))seal.choices=seal.choices.map(c=>({...c,label:String(c.label||'').replace('册待选秀女张元照为皇后','册张元照为皇后')}));
 }
 apply99();
  // Display revision is applied at bootstrap; settlement never rewrites it.

 const pr=render;
 function direct(){try{stopVoice();$('#app').innerHTML=nav()+(state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView());bind();maybeAutoplayVoice();}catch(e){console.error('v99 direct render',e)}}
 render=function(){const o=pr();apply99();direct();document.documentElement.dataset.build='v99';document.title='宫灯未眠 · 全篇语言留白终检 v99';return o};
 try{save()}catch(_e){};try{render()}catch(e){console.error('v99 render',e)}
}catch(e){console.error('v99 language restraint pass failed',e)}})();
