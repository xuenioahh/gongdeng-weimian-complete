(()=>{try{
 document.documentElement.dataset.build='v77';
 document.title='宫灯未眠 · 众生弧光与和妃终局回收 v77';
 const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
 const ST=(ch,q)=>ch?.steps?.find(x=>(x.heading||'').includes(q));
 const fstate=s=>s?.flags||{};
 function shenKid(s){
   if(globalThis.v138Children)return globalThis.v138Children(s).find(x=>x.mother==='shen'&&!x.dead)||null;
   const dead=new Set(s?.flags?.v46ChildVictims||[]);
   for(const [k,v] of Object.entries(typeof CHILDREN==='object'?CHILDREN:{})){
     if(v?.mother==='shen'&&!dead.has(k)&&!/薨|早夭|亡/.test(String(v.note||'')))return {...v,key:k};
   }
   for(const [k,v] of Object.entries(s?.flags?.extraHeirs||{})){
     if(v?.mother==='shen'&&v.born&&!v.skipped&&!v.dead)return {...v,key:'extra-'+k};
   }
   return null;
 }
 const kidLabel=c=>c?`${c.order||'皇嗣'}${c.name?' '+c.name:''}`:'皇嗣';
 function fateScores(s){
   const f=fstate(s); let death=0,fief=0,religion=0;
   if(f.v65ZhangGatePolicy)death+=2;
   if(f.v66ZhangMustAnswer)death+=2;
   if(f.v66RedInkBoundary)death+=1;
   if(f.v68HandlingNameEdict)death+=1;
   if(f.v75EmperorZhangBond==='partner')death+=1;
   if(f.v60DataBoundary)religion+=2;
   if(f.v64FanTrial)religion+=1;
   if(f.v70FemaleOffice)religion+=1;
   if(f.v75EmperorZhangBond==='confidant')religion+=1;
   if(f.v66EmperorOwnsAuthorization){religion+=1;fief+=1;}
   const c=shenKid(s);
   if(c)fief+=3;
   if(f.v67ChildFoundLove)fief+=2;
   if(f.v75EmperorZhangBond==='family')fief+=1;
   return {death,fief,religion,hasChild:!!c};
 }
 function allowedFates(s){
   const z=fateScores(s); const a=[['death',z.death],['religion',z.religion]];
   if(z.hasChild)a.push(['fief',z.fief]);
   a.sort((x,y)=>y[1]-x[1]);
   const keep=new Set(a.slice(0,2).map(x=>x[0]));
   if(!keep.size)keep.add('religion');
   return keep;
 }
 function echoes(s){
   const f=fstate(s),a=[];
   if(f.v60DataBoundary)a.push(`她想起景阳宫那张自己撕掉的名单。那一次她说：“平日没出事，没必要知道每个人每一步去了哪里。”`);
   if(f.v65ZhangGatePolicy)a.push(`张元照在空白处分纸旁写下“东角门”三字。那夜门是她下令开的，第二天事故簿上“张氏下令”四个字也是她自己添回去的。`);
   if(f.v67ChildFoundLove)a.push(`永和宫里还有一个孩子知道她们彼此喜欢。那孩子曾经问过：“是不是因为我告诉父皇，母妃才要走？”`);
   if(shenKid(s))a.push(`${kidLabel(shenKid(s))}的名字就在皇嗣册上。若沈知微离京，孩子是否同行，也要随处分一并定下。`);
   if(f.v66EmperorOwnsAuthorization)a.push(`御前案卷第一行已经写明：皇后分折、和妃拟稿，曾奉皇帝口谕。沈知微的错不在看过折子，而在把十二份副稿带回永和宫。`);
   return a;
 }
 // 含章后期降回“仍在宫中”的存在感：删去两场过重的政策主戏，只保留选秀问话与晚年家常。
 for(const ch of (CHAPTERS||[]))if(ch?.steps){
   ch.steps=ch.steps.filter(st=>!['hanzhang-cannot-leave','hanzhang-female-office'].includes(st?.v76id));
 }
 const late=CH('帘后朱笔');
 const office=ST(late,'宫门里多了一种身份');
 if(office&&!office.v77hznote){
   const old=office.text; office.text=s=>{const a=typeof old==='function'?old(s):old;const arr=Array.isArray(a)?a:[a];return [...arr,
     `章程传到珍妃处，第二日退回来。她没有进凤仪宫，只在“任满三年”后添了四个小字：“本人可辞。”旁边没有解释。张元照看了一会儿，把这四个字留了下来。`
   ]}; office.v77hznote=true;
 }
 // 彻底重做沈知微终局：前面的选择决定哪两条路真正出现。
 const sd=ST(late,'雪落永和宫以前');
 if(sd){
   sd.heading='雪落永和宫，张元照只剩这一张纸没写';
   sd.text=s=>fstate(s).v44NewEmpress==='zhangyuanzhao'?[
     `十二份副稿已经封进养心殿。都察院还在催处置，永和宫却安静得像什么都没有发生。`,
     `我把空白处分纸推给张元照：“朕最后落朱批。你先写。”`,
     `她没有接，先问：“陛下若不同意呢？”`,
     `“朕会驳你。”`,
     `“好。”她这才把纸拿过去。`,
     ...echoes(s),
     `她在西暖阁坐到天亮。纸上先后写过三个开头，又全被划掉。阿芙进来换灯油时，只看见最后还剩一句：“沈氏私留机务副稿十二份。”`,
     `张元照把笔搁下：“罪就是这一件。别再往上添，也别替她减。”`
   ]:[`这一条线里没有形成张后与和妃共同参与御前文牍的局面。`];
   sd.choices=[
     {label:'“赐死。罪名照实写，不改作病亡。”',requires:s=>fstate(s).v44NewEmpress==='zhangyuanzhao'&&allowedFates(s).has('death'),effects:{trust:{zhangyuanzhao:-2,shen:-5},flags:{v75ShenFate:'death',v77ShenTeaDeath:true,v66ShenSacrificed:true,v66ZhangCourtScandal:true}},result:s=>`旨意没有先送永和宫。傍晚，张元照自己去了。沈知微已经把茶具摆好，看见托盘上另盖着一只白瓷盏，便知道了。她没有问能不能改，只问：“还是新茶？”张元照说：“是。”沈知微笑了一下：“那就好。旧茶喝够了。”张元照亲手替她斟了最后一盏。两个人说了很久以前的沈家旧案，说顺王，说那年秋疫，说第一次把茶换新的早晨。最后沈知微端起那盏御赐的茶，只说：“元照，别把我写成病死。”张元照答：“不会。”杯子放回桌面时声音很轻。张元照坐到天完全黑，才一个人离开永和宫。`},
     {label:'“褫去宫权；准随皇嗣赴封地，永不再掌御前文字。”',requires:s=>fstate(s).v44NewEmpress==='zhangyuanzhao'&&!!shenKid(s)&&allowedFates(s).has('fief'),effects:{trust:{zhangyuanzhao:2,shen:2},flags:{v75ShenFate:'fief',v77ShenLeavesWithChild:true,v66ShenSacrificed:true,v66ZhangCourtScandal:true}},result:s=>{const c=shenKid(s);return `旨意落下以后，沈知微没有再进养心殿。${kidLabel(c)}启程赴封地那日，她只带走两箱书、一只茶炉和孩子小时候用过的旧毯。张元照送到西华门。沈知微回头问：“这是处分，还是你放我走？”张元照答：“都是。你越了线，我撤你的权；你还有孩子，我不把你们拆开。”沈知微点头：“这句话我认。”城门开时，她把一小罐新茶塞给张元照：“喝完再换，别守着一种味道。”`}},
     {label:'“降位，出宫入女观。终身不得再碰机务。”',requires:s=>fstate(s).v44NewEmpress==='zhangyuanzhao'&&allowedFates(s).has('religion'),effects:{trust:{zhangyuanzhao:1,shen:1},flags:{v75ShenFate:'religion',v77ShenReligious:true,v66ShenSacrificed:true,v66ZhangCourtScandal:true}},result:`沈知微离宫那日没有穿妃服。她把永和宫用了多年的茶罐分成两只：旧茶那只留下，新茶那只带走。张元照送她到女观门口。沈知微问：“以后来不来？”张元照说：“来。只喝茶，不带折子。”沈知微笑：“那就来。”她进门以后没有回头。张元照在石阶下站了一会儿，才把车帘放下。`}
   ];
   sd.v77rewrite=true;
 }
 // 处置后的性格变化用下一件真实小事表现，不写“她学会了什么”。
 const rb=ST(late,'朱笔重新落回我手里');
 if(rb){
   rb.text=s=>fstate(s).v44NewEmpress==='zhangyuanzhao'?[
     fstate(s).v75ShenFate==='death'?`永和宫封门后的第六日，刑部送来另一桩死罪复核。张元照把折子看完，没有说“照例”。她问：“人还活着么？”裴景和答活着。她把折子压到第二日：“那就把主审和最后一个见过他的人都叫来。我想听一遍。”第二日她仍然准了死罪，没有改判。`:
     fstate(s).v75ShenFate==='fief'?`入冬后，梁家一封军报牵到凤仪宫抚养的皇子。有人劝张元照别碰，免得落人口实。她却把皇嗣册摊到御案旁：“先写清他养在凤仪宫，再审。别人知道我和这件事有什么关系，比装作没有关系好。”那桩案子最后照常办完。`:
     fstate(s).v75ShenFate==='religion'?`次年春，女史院第一名任满女官递了辞呈。尚宫局在考成后添了一句“无过而退”。张元照拿笔划掉“无过”两个字：“她要走就准她走，不必先证明自己没犯错。”辞呈当天批下。`:
     `沈知微的处置尚未落定，养心殿仍压着那张空白处分纸。`,
     `我仍自己看原折、自己落最后的字。张元照坐在西案边，有时开口，有时不说。沈知微原来的位置一直空着，没有立刻换人。`
   ]:[`本局张元照没有受凤印，御前没有形成这一套后续。`];
   rb.v77rewrite=true;
 }
 // 移除几处直接替读者总结的正文框，改成场景本身。
 for(const ch of (CHAPTERS||[]))for(const st of (ch?.steps||[])){
   if(!st?.text||st.v77metaClean)continue;
   const old=st.text;
   st.text=s=>{let a=typeof old==='function'?old(s):old;a=Array.isArray(a)?a:[a];return a.filter(x=>{
     const z=String(x||'');
     if(/class="v67-child"|class="v66-crisis"|class="v75-kneel"/.test(z))return false;
     if(z.includes('不管选哪一种，昭氏都死了'))return false;
     if(z.includes('她已经看清：顾明宜会修规矩'))return false;
     return true;
   })};st.v77metaClean=true;
 }
 // 每个人的人生变化只放人物录，不塞进正文。
 const ARC={
  emperor:['夺嫡以后，他习惯先把人当局势看；后来最怕的反而是自己一句“照旧”把事情推给别人。','重阳受伤、方氏冤案、顾后之死和三皇子丧母，都没有把他变成另一个人，只让他越来越少假装自己什么都懂。','到后期，他仍会算利害，也仍会冷；只是该由自己落的字，不再轻易让别人替。'],
  taihou:['她看着儿媳、孙辈和娘家一个个卷进宫里，最难的是明明有偏爱，却不能把偏爱当成旨意。','她会护短，也会当着侄女的功册删掉“素承慈眷”；孩子真正需要她时，她又总在。','年纪越大，她越少替皇帝选答案，却更敢问一句别人不敢问的话。'],
  gu:['她最怕出错，所以一辈子把衣襟、账册和六宫都理得很齐。','她没有在冤案后突然变成另一个人；遇到漏洞，她仍认真补规矩，也会在病中把最后一份册子改完。','她的好与她的局限一直是同一件事：太相信只要再认真一点，秩序就能护住所有人。'],
  shen:['她用了很多年等沈家名字被改回来，也用了很多年摆脱顺王那句“我是为你好”。','旧案合卷以后，她第一次主动换新茶；后来她敢爱张元照，也敢在机务案里承认副稿是自己留的。','她最后去哪里由本局决定，但她不再让别人替自己解释为什么留下、为什么离开。'],
  zhou:['她少年时是主控第一个真正喜欢的人，后来最会做的却是把一句话咽回去。','做母亲以后，她为了孩子学会争解释权，也因为沉默把自己逼到陆既明的旧案里。','最好的一条路里，她终于随女儿离开宫墙；最坏的一条路里，她仍必须承认有些沉默会伤到最亲的人。'],
  wenheng:['她失了国，也失了两个女儿原本可以拥有的人生。','她最初只会把旧国礼数抓得更紧，后来终于能当面告诉两个女儿：你们都在拿自己最会的东西活命。','她没有来得及把一家人重新缝好，但临终前至少不再只把女儿看成旧国剩下的筹码。'],
  baopu:['她最怕的不是失宠，是没人再需要她。','她明亮、敢要、敢问，也真的爱过那个没能出生的孩子；失去以后，她把所有价值都压回“被选择”上。','她的路最终走坏了。可在走坏以前，那些笑、那本《承露录》和她对孩子的期待都是真的。'],
  hanzhang:['她从小看着母亲和姐姐用不同办法活下来，自己选择少说、先看证据。','她救过驾，也守过很多人的选择；她并没有因此得到自由，蘅国归附的身份让她一直留在宫里。','后期她不再处处站在案前。她会手臂酸、怕热又怕冷，也会在女史章程边只添四个字，然后继续过自己的日子。'],
  fang:['她从花房进六宫以后，仍然会救瘸腿猫、系活结、记得家里爱吃什么。','她被冤时没有能力看清整张网，只能在自己知道的小事上一次次说“这不对”。','她没有活到看见后来的改变。可阿芙、听雨轩和那些被重新问清的名字都证明她不是死后才有意义。'],
  peiyan:['他年轻时最稳的本事是记住所有人的小习惯。','年纪渐长以后，他第一次发现自己会忘，开始把一些只能靠人的记忆教给徒弟。','他没有被制度淘汰；他只是承认再可靠的人也会老，然后把自己知道的交出去。'],
  xielin:['他把守门看得比说话重要，重阳以后更是每进一间屋先看窗和退路。','他曾把“护住”理解成不许任何危险靠近，后来慢慢知道门关得太死也会困住里面的人。','他仍旧话少，但遇到该拦的旨意、该放的路，不再只问“有没有旧例”。'],
  afu:['方小满死前，她只是一个嘴快、会收拾东西的贴身宫女。','主子死后她没有殉主，去尚宫局学了一份新差事，后来又自己选择跟张元照。','她最亮的一点不是会查案，而是经历过一次无能为力以后，仍肯继续相信把事情做清楚有用。'],
  shunwang:['他真的救过沈知微，也真的养过张元照；他的痛处是受不了自己付出的恩最后留不住人。','他把“我为你好”越说越像命令，甚至把张元照当成年轻时没留住的沈知微。','到了最后，他仍不是好人式的大彻大悟；但当沈知微再次拒绝他的安排时，他终于有一次没有送第二封信。'],
  zhangyuanzhao:['九岁以后，她最怕的是别人替自己决定：住哪里、走不走、什么该被记住。','她会犯错、会撤回办法，也会因为沈知微付出很重的代价；她的长处不是总正确，而是出错以后肯说“那就改”。','受凤印以后，她越来越有权，也越来越难。她最终成为什么样的皇后，要看玩家前面一次次让她怎么面对“例外”。'],
  ning:['她真心相信名分和秩序能保护人，也因此最容易在“正确”里伤到别人。','做过皇后以后，她发现自己的姓氏本身会成为别人办事的门票。','她最后主动解印，不是因为做不好，而是不愿一生都先替邵家辩白。'],
  ke:['她从北营来，最怕别人把自己和孩子都只看成军门筹码。','生子以后她反而更警惕娘家借皇嗣说话；军械案里也肯让霍家该罚的人照样受罚。','她没有变得柔软，只是把“护家”慢慢改成“别让家拿我和孩子当旗”。'],
  hui:['她从小就知道家里的关系网能办事，后来才肯承认，这张网也会把麻烦遮住。','方氏案和澧河案一次次把崔家旧路翻出来，她后来要做的很简单：遇到家里一句“已经处理了”，还要不要继续问下去。','她可能失位、失家门便利，也可能保住一部分体面；无论哪条路，都不能再假装自己什么都不知道。'],
  cao2:['她最怕绕路和混乱，所以总先在掌心把路线画一遍。','疫中她把这点小本事拿来替送水送炭的人重新排路。','后来她不一定成大人物，但遇到乱局时已经知道自己能先做哪一件事。'],
  zhao2:['她很早就看得懂场面，所以也很早学会什么时候别说。','方氏案以后，她第一次承认“看懂了却没开口”也会留下遗憾。','后来她仍会先看人的手和眼神，只是发现不对时不再总等到最安全的时候。'],
  lin2:['她怕自己听不懂，所以每个陌生药名都要先翻成一句白话。','疫中她站在太医和宫人中间，把两边的话真正说通。','后来她最自信的不是懂药，而是敢在不懂时先问一句“这是什么意思”。'],
  ye2:['她字写得漂亮，最初只是因为怕抄错挨罚。','疫情最乱时，她一页页把口述写成能追下去的名单。','她没有变成查案人；只是从“把字写好”走到了“知道哪些字会影响一个人的去处”。'],
  du2:['她最安心的时候是数字能对上，最怕别人说“大概差不多”。','疫中她管米、炭和布巾，第一次知道算清楚也可以救人。','后来面对供应案，她不再只问少了多少，还会问为什么总从同一处少。'],
  su2:['她的本事都是很小的事：针线、哄孩子、记乳母脾气。','时疫里孩子们最怕的时候，她让皇嗣院还有人肯睡觉、肯吃饭。','她没有进入大政治，却证明六宫不是只有能写进奏折的事才重要。'],
  liang2:['她从海边军门进宫，最怕被叫成“第二个霍素英”。','她会冒进，也会因为潮气、风向这些别人嫌细的小事发现问题。','后来她仍保留那根旧桐油绳，也终于不需要靠反对霍氏来证明自己是谁。'],
  song2:['她相信把三张单并成一张能让事情更快。','冰库和漕粮案让她看到：快也会让一个人握住太多。','她没有放弃效率，只学会每套好用的办法都留第二条路。'],
  xu2:['她一进高位宫门就怕行错礼，总在嘴里默数步骤。','熟了以后，她会拿自己当年的错礼逗人笑；疫情里最后一次病重，她终于不用再数。','她没能活到后面，但许家最终知道她不是因为“自己不小心”才进病区。'],
  daila:['她越害怕别人把自己当玩意儿，笑得越响。','到了大晟，她被所有人拿来和抱朴比较，也第一次有人告诉她“不必学她笑”。','她最后能不能回珂兰由本局决定；重要的是她终于有一段日子不需要先用笑声堵住别人。']
 };
 function arcBook(){
   const vis=Object.entries(typeof PEOPLE==='object'?PEOPLE:{}).filter(([k,p])=>(p?.introducedAt??0)<=state.index&&ARC[k]);
   if(!vis.length)return '';
   return `<section class="v77-arcbook"><span class="eyebrow">人物人生录</span><h2>每个人都不是只为一场案子活着</h2><div class="v77-arcs">${vis.map(([k,p])=>{const a=ARC[k];return `<details><summary>${p.name} · ${typeof displayRank==='function'?displayRank(k):(p.title||'')}</summary><p><b>最难的一段：</b>${a[0]}</p><p><b>她/他做对过的事：</b>${a[1]}</p><p><b>后来：</b>${a[2]}</p></details>`}).join('')}</div></section>`;
 }
 const oldPeople=typeof peopleView==='function'?peopleView:null;
 if(oldPeople&&!globalThis.__v77People){globalThis.__v77People=true;peopleView=function(){let h=oldPeople();return h.replace('</main>',arcBook()+'</main>')}}
 // 卷终人物志：沈氏不同终局用真正发生过的句子，不用作者结论。
 const oldEnd=typeof ending==='function'?ending:null;
 if(oldEnd&&!globalThis.__v77End){globalThis.__v77End=true;ending=function(){let h=oldEnd();const f=fstate(state);
   if(f.v75ShenFate==='death')h=h.replace(/(<article class="v55-chronicle-card"><h3>[^<]*沈知微<\/h3><p class="fate">)[\s\S]*?(<\/p><blockquote>)[\s\S]*?(<\/blockquote>)/,`$1沈知微因私留机务副稿被赐死。最后一夜仍在永和宫，张元照亲自送去御赐茶。$2“还是新茶？”$3`);
   if(f.v75ShenFate==='fief')h=h.replace(/(<article class="v55-chronicle-card"><h3>[^<]*沈知微<\/h3><p class="fate">)[\s\S]*?(<\/p><blockquote>)[\s\S]*?(<\/blockquote>)/,`$1沈知微被褫去宫权与御前文字权，随后随自己的皇嗣离京赴封地。$2“这次门是开着的。”$3`);
   if(f.v75ShenFate==='religion')h=h.replace(/(<article class="v55-chronicle-card"><h3>[^<]*沈知微<\/h3><p class="fate">)[\s\S]*?(<\/p><blockquote>)[\s\S]*?(<\/blockquote>)/,`$1沈知微离开永和宫，入皇家女观修行，此后不再碰机务。$2“以后来喝茶。”$3`);
   const ep=`<section class="v77-epilogue"><p>十九年里，有人失了孩子，有人失了故国，有人失了位置，也有人把自己走进了回不了头的地方。可宫里并不只有这些。新茶换过一罐又一罐，孩子从摇篮长到婚议，阿芙换过差事，雪团会趴在窗下晒太阳，含章也会为一扇窗该开还是该关同人争半天。日子没有因为谁受过苦就停下来。第二天到了，活着的人还是要起身、吃饭、说话，再做一次选择。</p></section>`;
   return h.replace('</main>',ep+'</main>');
 }}
 // 人物卡含章后期不过度拔高，只说明她仍在宫中。
 const oldPV=typeof peopleView==='function'?peopleView:null;
 // 轻量清理旧的“终局性格作者分析”字符串（若被其他补丁写入结局/人物页）。
 const oldChron=typeof chronicleView==='function'?chronicleView:null;
 if(oldChron&&!globalThis.__v77Chron){globalThis.__v77Chron=true;chronicleView=function(){let h=oldChron();return h
   .replace(/此后凡是不可追回的重罚[^<。]*。?/g,'')
   .replace(/从此张元照在新制度里加了一条很具体的回避办法[^<。]*。?/g,'')
   .replace(/她终于承认[^<。]*。?/g,'');}}
 state.flags=state.flags||{};state.flags.v77Build=true;
 try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v77 ensemble/fate patch failed',e)}})();
