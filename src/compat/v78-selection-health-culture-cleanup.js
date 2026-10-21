(()=>{try{
 document.documentElement.dataset.build='v78';
 document.title='宫灯未眠 · 御前点选、消渴日常与风俗织入 v78';
 const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
 const STEP=(ch,q)=>ch?.steps?.find(x=>(x.heading||'').includes(q));
 const LOW=['cao2','zhao2','lin2','ye2','du2','su2'];
 const lowExtra={
  cao2:'何超英 · 看见人多先记出口和近路',
  zhao2:'王静娴 · 笑得周全，眼睛却总先看别人手上小动作',
  lin2:'林淑贞 · 听见生僻医名会先换成一句白话',
  ye2:'陈婉仪 · 写字极稳，越紧张越要把纸边压平',
  du2:'张淑华 · 听见数目会下意识在桌沿拨指头',
  su2:'刘玉贞 · 会南曲，先哄孩子再问是谁家的'
 };
 function selectedLow(s=state){s.flags=s.flags||{};return s.flags.v78LowSelected||(s.flags.v78LowSelected=[])}
 globalThis.v78ToggleLow=function(k){
   if(!LOW.includes(k))return;
   const a=selectedLow(state),i=a.indexOf(k);
   if(i>=0)a.splice(i,1);else if(a.length<5)a.push(k);
   try{save()}catch(_e){};try{render()}catch(_e){}
 };
 if(!globalThis.__v78LowClick){globalThis.__v78LowClick=true;document.addEventListener('click',e=>{const b=e.target.closest?.('[data-v78-low]');if(!b)return;e.preventDefault();v78ToggleLow(b.dataset.v78Low);});}
 function v78SetLowChosen(){
   const chosen=[...selectedLow(state)];
   state.flags.lowConsorts=chosen;state.flags.v37LowCount=chosen.length;state.flags.v37LowNumber=chosen.length;
   state.flags.lowPregnancyKey=chosen.length?chosen[Math.floor(Math.random()*chosen.length)]:null;
   state.flags.lowAccompliceKey=[...chosen].reverse().find(k=>k!=='zhao2')||null;
   LOW.forEach((k,i)=>{if(chosen.includes(k)){state.ranks[k]='待封';PEOPLE[k].introducedAt=Math.max(0,(CHAPTERS||[]).findIndex(x=>x.title==='御前终选'));PEOPLE[k].home=(chosen.indexOf(k)%2===0?'延禧馆':'储秀宫西院');if(typeof HAREM_KEYS!=='undefined'&&!HAREM_KEYS.includes(k))HAREM_KEYS.push(k)}else{state.ranks[k]='待选';PEOPLE[k].introducedAt=9999;}});
 }
 function v78RankLows(mode){
   const a=state.flags?.lowConsorts||[];
   a.forEach(k=>{state.ranks[k]=mode==='allChang'?'常在':mode==='wangChang'?(k==='zhao2'?'常在':'答应'):'答应';if(PEOPLE[k])PEOPLE[k].title=state.ranks[k]});
   state.flags.firstGrandSelectionDone=true;state.flags.v78LowRankMode=mode;
 }
 const oldApply=applyChoiceEffects;
 applyChoiceEffects=function(c){const r=oldApply(c);if(c?.v78ConfirmLow){v78SetLowChosen();r.push(`御前亲点低位留牌 ${(state.flags.lowConsorts||[]).map(k=>PEOPLE[k].name).join('、')}`)}if(c?.v78LowRank){v78RankLows(c.v78LowRank);r.push('低位新人初封位分已定')}return r};
 const sel=CH('御前终选');
 const lowStep=STEP(sel,'偏殿还有六个人');
 if(lowStep){lowStep.heading='偏殿六张脸，我自己点名字';lowStep.keyDecision=true;lowStep.narrative=false;lowStep.text=s=>{
   const picked=selectedLow(s);return [
    `高位三册落定以后，六名低位候选一同进偏殿。她们没有先后名次，也没有一张“取前几名”的排序纸。`,
    `王静娴答话时并不最抢眼。旁边有人袖口挂住案角，她先伸手替人压住，再若无其事退回原位。我多看了她一眼。喜欢归喜欢，留不留仍由我自己点名。`,
    `<div class="v78-low-grid">${LOW.map(k=>`<button type="button" class="v78-low-card ${picked.includes(k)?'selected':''}" data-v78-low="${k}">${portrait(PEOPLE[k])}<span><b>${PEOPLE[k].name}</b><em>${typeof lowTraitsV37==='function'?lowTraitsV37(k):''}</em><small>${lowExtra[k]}</small></span></button>`).join('')}</div>`,
    `<div class="v78-count"><b>已点 ${picked.length} 人：</b>${picked.length?picked.map(k=>PEOPLE[k].name).join('、'):'尚未点名'}。可留二至五人，再落旨。</div>`
   ];};lowStep.choices=[{label:'就按我点中的名字留牌',hint:'直接按立绘与现场印象亲自选人，不看随机顺序',requires:s=>{const n=selectedLow(s).length;return n>=2&&n<=5},v78ConfirmLow:true,effects:{flags:{v78ManualLowSelection:true}},result:s=>`留牌的是${(s.flags.lowConsorts||[]).map(k=>PEOPLE[k].name).join('、')}。没有人因为排在“前几位”自动留下。`}];}
 const rankStep=STEP(sel,'低位初封');
 if(rankStep){rankStep.heading='留了谁，再定她们从哪里起步';rankStep.text=s=>[
   `名帖已经是我亲手点的，初封不再拿“点击先后”冒充终选名次。`,
   `<span class="selection-decree"><b>已留牌</b><small>${(s.flags.lowConsorts||[]).map(k=>PEOPLE[k].name).join(' · ')}</small></span>`,
   `王静娴若在其中，我确实对她多留了一分印象；但这只是我的偏爱，不是必须写进位分的理由。`
 ];rankStep.choices=[
   {label:'都从常在起',hint:'这一届人数不多，统一给同一阶',v78LowRank:'allChang',effects:{flags:{}},result:'所有留牌者同从常在起，不按点名次序分高低。'},
   {label:'王静娴若留牌，封常在；其余答应',hint:'把御前那一点偏爱公开写进初封，其余不排序',v78LowRank:'wangChang',effects:{flags:{}},result:'王静娴若在留牌名单中单独高一阶，其余同为答应。'},
   {label:'全部从答应起',hint:'最谨慎；入宫以后再看各自怎么活',v78LowRank:'allYing',effects:{trust:{gu:1}},result:'所有留牌者从答应起，不按点击顺序划高低。'}
 ];}
 // 人物录文字也改为“亲点”，不再暗示系统随机排序。
 const oldPeople=typeof peopleView==='function'?peopleView:null;
 if(oldPeople&&!globalThis.__v78PeopleWrap){globalThis.__v78PeopleWrap=true;peopleView=function(){let h=oldPeople();h=h.replace(/另有六名低位候选并列待选，由御前逐人点名；没有“按顺序留下前几位”的规则。/g,'另有六名低位候选。御前会同时看她们的立绘与现场表现，再逐人点名留牌；没有“排在前几位自动留下”的规则。');return h;}}

 // ---------- 主控晚年“消渴”：先写生活，再写病名 ----------
 const curtain=CH('帘后朱笔')||CH('西华门外');
 if(curtain?.steps&&!curtain.steps.some(x=>x.v78id==='emperor-xiaoke')){
   const at=Math.max(1,Math.floor(curtain.steps.length/2));
   curtain.steps.splice(at,0,{v78id:'emperor-xiaoke',heading:'蜜饯从养心殿撤了下去',cast:['emperor','zhangyuanzhao','peiyan'],fx:'candle',narrative:true,text:s=>[
    `承熙十七年入冬以后，我夜里起身喝水的次数越来越多。起初裴景和只当暖阁炭火太旺，后来连白日也常觉得口渴，一壶茶不知不觉便见底。`,
    `太医连看数日，终于在脉案上写下“消渴”二字。张元照看见时没有立刻说她前世那个病名，只把脉案又递回去：“先按太医说的治。臣妾知道一个很像的病，可这里没有臣妾从前那些验法，不能只凭像就把名字写死。”`,
    `第二天起，养心殿案上的蜜枣、糖渍金橘和夜间温酒一起少了。晚膳的甜羹换成不加糖的豆羹，米面没有全撤，只盛得比从前小一碗。`,
    `第三日晚，我从折子后摸出裴景和藏的一小碟桂花糖藕。张元照正好进门。她先看我，再看裴景和。裴景和低头：“奴才什么也没看见。”`,
    `“朕只吃一块。”`,
    `“上个月的酒，陛下也是这么说的。”张元照把碟子端走，又放回一小块，“这一块吃完。晚膳后陪臣妾从养心殿走到乾清门，再回来。”`,
    `我皱眉：“到底谁是皇帝？”`,
    `“走到门口以前，还是陛下。”`,
    `裴景和没忍住笑了一声，很快又把脸低下去。`
   ],choices:[{label:'吃这一块，晚膳后去走一圈',effects:{trust:{zhangyuanzhao:2,peiyan:1},flags:{v78EmperorXiaoke:true}},result:'从那以后，养心殿仍有甜食，只是不再整碟摆在御案旁。'}]});
 }
 if(PEOPLE?.emperor){const old=PEOPLE.emperor.bio||'';PEOPLE.emperor.bio=old.replace(/。?$/,'')+'。晚年出现明显消渴症状：口渴、夜间频起、疲倦。太医按消渴调治，张元照则盯着他少酒少甜、饭后多走几步。';}

 // ---------- 风俗织入：不单列说明卡，直接让人物过节、吃饭、穿衣 ----------
 function insertAfter(ch,needle,obj){if(!ch?.steps||ch.steps.some(x=>x.v78id===obj.v78id))return;let i=ch.steps.findIndex(x=>(x.heading||'').includes(needle));if(i<0)i=ch.steps.length-1;ch.steps.splice(i+1,0,obj)}
 const shrine=CH('拾遗阁开门');
 insertAfter(shrine,'家书',{v78id:'heng-snowlamp',heading:'蘅国的回雪灯只有一盏',cast:['baopu','hanzhang'],fx:'snow',narrative:true,text:s=>[
   `那年入冬后的第一场雪，拾遗阁没有按大晟规矩挂红灯。抱朴让宫女找来一小盏旧铜灯，放在窗下，灯芯压得很低。`,
   `含章换了深青高领旧式衣裳，袖口只缀一线银边。抱朴嫌她穿得像“蘅都学堂里最不讨喜的女先生”，自己却也把新赐珠花摘掉，只留旧银簪。`,
   `蘅国旧俗把这一天叫“回雪”。家中有人远行，就在窗边留一盏低灯，不照院子，只照门槛。桌上吃酸酪麦饼，蘸一点松蜜。抱朴咬第一口便皱眉：“尚食局做得太甜。”`,
   `含章道：“你以前也嫌母亲做得酸。”`,
   `抱朴把饼掰给她一半：“以前嫌它难吃。现在想吃，也没人做得出原来的味道了。”`,
   `<span class="v78-verse">雪落旧山白，灯低照夜门。<br>若问归人处，风里有乡音。</span>`,
   `这是她们小时候都会背的四句。念完以后谁也没说“回去”。灯一直烧到半夜。`
 ],choices:[{label:'让这盏灯烧完',effects:{bond:{baopu:1,hanzhang:1},flags:{v78HengSnowLamp:true}},result:'第二天换回大晟宫装，窗台上仍留着一点灯油。'}]});
 const kelan=CH('极西来客');
 insertAfter(kelan,'笑声先过门槛',{v78id:'kelan-windfest',heading:'蓝带系在腕上，不系在宫门上',cast:['daila','emperor','peiyan'],fx:'wind',narrative:true,text:s=>[
   `珂兰使团入京后的第七日恰逢他们的逐风节。黛拉一早便把礼部送来的宽袖宫装换下，穿回珂兰窄袖长袍，领口压着一枚蓝石，发辫末端缀着很小的铜铃。`,
   `礼部嫌铃响，她当着来人的面把铃解下来，转手系在自己的靴带上：“这样走路还是响。你们若连声音也要管，干脆把我绑椅子上。”`,
   `承露馆那天烤了盐羊肉和薄麦饼，还做了一壶酸杏汤。她把第一张饼撕成两半，一半留给自己，一半递给陪她从珂兰来的老女官。`,
   `我去时，她正把一条蓝色细带系在腕上。她说珂兰人逐风节不许替别人系，谁的愿望谁自己打结。`,
   `“陛下要不要？”`,
   `“朕没有蓝带。”`,
   `她从袖中抽出一根，放在桌上：“那自己系。”`,
   `<span class="v78-verse">风过长沙不留痕，马铃还认旧归程。<br>人若记得来时路，蓝带不必问谁名。</span>`,
   `裴景和听不懂珂兰原词，只记得黛拉唱第二句时没有笑。`
 ],choices:[{label:'自己把蓝带系上',effects:{trust:{daila:2},flags:{v78KelanWindFestival:true}},result:'蓝带第二日便收进御案抽屉，没有进入任何正式赏赐册。'}]});
 const summer=CH('荷风满座');
 insertAfter(summer,'荷风宴',{v78id:'regions-at-table',heading:'一张宴席，几处故乡',cast:['ke','liang2','song2','zhangyuanzhao'],fx:'lantern',narrative:true,text:s=>[
   `荷风宴散到一半，尚食局又送来几碟各宫自己点的东西。霍素英要的是北地胡椒羊汤，梁素贞嫌热，叫人端东南盐渍青梅和冷鱼羹；宋文秀带来江南新做的荷叶米糕。`,
   `张元照夹了一口青梅，酸得眼睛都眯起来。梁素贞终于笑：“娘娘不是说什么都先试？”`,
   `“试和喜欢是两回事。”`,
   `霍素英把羊汤推过去：“喝一口这个压酸。”`,
   `宋文秀立刻拦：“那更奇怪。”`,
   `几个人在御花园水榭为一口吃食争了半天，最后每样都剩一点。尚食局的人来收盘时，四只碟子的摆法已经乱得看不出谁原先坐哪。`
 ],choices:[{label:'让尚食局都记进明年夏宴菜单',effects:{bond:{ke:1,liang2:1,song2:1,zhangyuanzhao:1},flags:{v78RegionalFoodTable:true}},result:'第二年菜单真的多了四样东西，也真的有人继续嫌酸、嫌辣、嫌甜。'}]});
 const years=CH('宫灯渐繁');
 insertAfter(years,'消暑宴',{v78id:'shangsi-poem',heading:'上巳的杯子沿水渠转了一圈',cast:['zhou','fang','ning','ke'],fx:'petal',narrative:true,text:s=>[
   `承熙四年三月上巳，御花园把一段浅渠清出来做曲水。宫里不许真喝醉，杯中只盛薄酒和梅饮，谁接到杯子便要说一句诗。`,
   `周清漪抽到第一杯，低头看水面飘过一片海棠：“水转花还在，春深人未闲。”`,
   `方小满接第二杯，想了半天：“臣妾不会。”`,
   `霍素英在对面说：“说不会也算一句。”`,
   `方小满立刻接：“那就——杯随花转人随影，不问明朝第几杯。”`,
   `邵明贞笑她最后一个字只为了押上“杯”。她也不恼，反而把梅饮喝完：“押上了就行。”`,
   `那日下午没有人因为诗写得不好受罚。傍晚渠水放干，几片花瓣粘在青石缝里，第二天扫地宫人才把它们扫走。`
 ],choices:[{label:'记住这场不必写得好的诗会',effects:{bond:{zhou:1,fang:1,ning:1,ke:1},flags:{v78ShangsiPoem:true}},result:'后来有人还能背出方小满那句不太工整的诗。'}]});

 // ---------- 作者分析清理：删说明卡，改掉仍在正文中直接替人物解释的几类旧句 ----------
 function cleanV78(p){
   let x=String(p??'');
   if(/class=["'](?:motive-note|v42-callback|v41-thread)["']/.test(x))return '';
   const pairs=[
    ['这句话不是慈母劝女儿生子。是一个亡国之后仍在算未来的人在教女儿：恩宠可以变成血缘，血缘可以变成位置，位置或许能替旧人多留一点活路。','闻人蘅把香匣往抱朴面前又推了一寸：“宠会换人。孩子若进宗谱，别人想抹掉，就没那么容易。”'],
    ['昭氏听懂了政治，却只记住了“握得住”三个字。','抱朴没有去碰香匣，只低声重复了一遍：“握得住。”'],
    ['她开始意识到：母亲确实利用了姐姐，但利用不等于下毒。若她再不自己找答案，所有人都会只挑自己最愿意相信的那一半。','含章把母亲那页口供单独折了角：“这一页先不和香案并在一起。下毒是谁做的，另查。”'],
    ['这句话后来一直留在她心里。宫里许多真相不是没有写下来，只是写成“待核”以后，再也没人往下翻。','含章把“来源待核”四个字抄在自己的纸上，第二日又去问了一次。'],
    ['崔家旧贡造行的账册另封，继续查验。','皇后合上册页：“祁嬷嬷、贡造行、内务府，分开问。没有实证，不动崔氏；有实证，也别因为她家大就停。”'],
    ['她不太怕失宠，更怕别人只把她当成一件新鲜玩意儿。','她最不耐烦别人隔着贡单谈她，好像她本人不在屋里。'],
    ['后来很多证词之所以会落到她身上，正因为她从这时起就成了那个“哪里都去过一点”的人。','当晚阿芙替方小满挑脚底水泡，方小满疼得直吸气，仍能把三处配殿缺什么被褥一一说完。'],
    ['皇后把图册合上：“母后想开采选？”太后道：“哀家只说宫里太静。要不要选，是你们的事。”','皇后把图册合上：“母后想开采选？”太后道：“哀家只说宫里太静。要不要选，是你们的事。”']
   ];
   for(const [a,b] of pairs)x=x.split(a).join(b);
   return x;
 }
 for(const ch of (CHAPTERS||[])){
   if(ch.bridge&&!ch.__v78bridge){const b=ch.bridge;ch.bridge=s=>cleanV78(typeof b==='function'?b(s):b);ch.__v78bridge=true;}
   for(const st of (ch.steps||[]))if(st.text&&!st.__v78clean){const t=st.text;st.text=s=>{const a=typeof t==='function'?t(s):t;return (Array.isArray(a)?a:[a]).map(cleanV78).filter(x=>String(x).trim())};st.__v78clean=true;}
 }
 // 结果文本也尽量不写作者总结。
 const oldResolved=typeof resolvedResult==='function'?resolvedResult:null;
 if(oldResolved&&!globalThis.__v78ResultClean){globalThis.__v78ResultClean=true;resolvedResult=function(c,st=state){return cleanV78(oldResolved(c,st));}}

 // 保留含章承熙十八年那段冷热、月信与旧伤家常戏，不让后续整理器移除。
 state.flags=state.flags||{};state.flags.v78KeepHanzhangDomestic=true;state.flags.v78Build=true;
 try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v78 patch failed',e)}})();
