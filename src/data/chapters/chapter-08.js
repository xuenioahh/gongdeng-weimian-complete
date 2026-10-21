const hanzhangNextTitle08=(s=state)=>{
 const ranks=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];
 const raw=String(s?.ranks?.hanzhang||'');
 const rank=raw.replace(/^珍/,'');
 const next=ranks[ranks.indexOf(rank)+1];
 if(!next)return null;
 const cap=globalThis.V63_RANK_CAPS?.[next];
 if(cap&&typeof globalThis.v63RankCount==='function'&&globalThis.v63RankCount(next,s)>=cap)return null;
 return `珍${next}`;
};

const CHAPTER_BASE_08 = {date:'承熙七年·冬',title:'灯下旧局',theme:'一条线靠说出来推进，另一条线靠多年不说才变得沉',place:'养心殿',cast:['hanzhang','shen','fang'],fx:'candle',
 bridge:s=>`昭妃失子后病了几个月。${courtTitle(s,'hanzhang')}没有权限翻内廷案册，只把产房那夜记住的名字一一交给御前核值；几处被改过的记录因此浮出来，却还拼不成真相。和妃手里的旧铜扣，也终于从茶罐底拿了出来。`,steps:[
  {heading:'第一幕 · 一年里，她只多说了几句话',cast:['hanzhang'],fx:'mist',narrative:true,text:s=>[
`承熙七年，${courtTitle(s,'hanzhang')}仍很少进养心殿。她来时多半下棋，偶尔替裴景和看一眼太医院抄来的名单。`,
`宫里反而因为她不争宠，更爱猜她。有人说她在等姐姐失势，有人说她天生寡淡，也有人说她其实最会藏。`,
`她本人对此毫无反应。请安时站在原位，宫宴时坐到自己的席，散席后自己回去。`,
`有一回方常在送来一盘栗糕。${courtTitle(s,'hanzhang')}吃半块，把剩下半块包进帕子。`,
`“给谁？”方常在问。`,
`“有人爱吃。”`,
`“谁呀？”`,
`${courtTitle(s,'hanzhang')}看她一眼。方常在立刻改口：“我不问了。”`,
`她的存在一直这样。没有一句话把她推到台前，可只要她站在那里，别人便会开始猜沉默里有什么。`
 ],choices:[{label:'继续',effects:{},result:''}]},
  {heading:'第二幕 · 和妃终于把铜扣放到御案上',cast:['shen'],fx:'ink',narrative:true,text:s=>[
`十一月，和妃来养心殿。那天她没有带茶。`,
`她把旧铜扣放到御案正中，又把一张发黄军籍摊开。两样东西并在一起，才看得出营号一致。`,
`“臣妾想查一桩旧案。”`,
`她很少这样直说。以往提到旧事，总隔着一层茶、一句讥讽，像谁先说破谁就输了。`,
`她兄长当年死于“临阵脱逃”的军法判决。主将是顺王，军令上却有一处后来补写的日期。`,
`“你想查顺王？”`,
`和妃拨了一下空茶盏的沿口：“臣妾先想知道，一个死人十年以后，为什么还有人把他的营扣送进宫。”`,
`我让裴景和封起铜扣，没有准，也没有驳。和妃离开时停在门边，似乎在等我补一句。`,
`我没有。她也第一次没有说“陛下圣明”。`
 ],choices:[{label:'继续',effects:{flags:{shenCaseOpened:true}},result:''}]},
  {heading:'第三幕 · 那晚的棋下得比平时慢',cast:['hanzhang'],fx:'candle',narrative:true,text:s=>[
`同月十七，${courtTitle(s,'hanzhang')}照常来下棋。外头风大，宫人把窗缝封了两层，屋里只剩棋子落在木盘上的轻响。`,
`棋局过半，她抬手落子，袖口滑上去一点，露出侧腕一道很淡的旧疤。`,
`我看见了，没有问。`,
`她也看见我看见了。手停在棋罐上方，比平日久了几息。`,
`“陛下有没有想过，我为什么从来不和姐姐争？”`,
`“想过。”`,
`“答案呢？”`,
`我转了半圈扳指，停住：“不知道。”`,
`她抬眼。那大约是她第一次听见我直接承认不知道。窗外风声撞过宫墙，她重新低头，把那枚本来要落的棋子放回罐里。`
 ],choices:[{label:'继续',effects:{trust:{hanzhang:2}},result:''}]},
  {heading:'第四幕 · 双生不是两个人一起出生那么简单',cast:['hanzhang'],fx:'mist',narrative:true,text:s=>[
`她先说蘅国王室忌双生。不是民间那种随口的“不吉”，而是写进王室旧规：长者为正，次者为影。她与姐姐只差一刻钟，年岁相同，旧规却从出生那一刻起把她们分成了两种人。`,
`姐姐先出生，便有名字、有衣冠、有老师。她晚一刻，被养在同一座宫里，却只在姐姐需要时出现。`,
`“姐姐读书，我站在后面；姐姐习武，我记她招式。她病了，我替她背第二日要答的书。”`,
`她语气平稳，像在背一份旧宫规。`,
`“父王单独叫过你名字吗？”`,
`她真的想了一会儿。`,
`“没有。”`,
`灯芯发出一声轻爆。她把棋盘边一枚歪着的黑子扶正。`,
`“母亲呢？”`,
`她没有立刻回答。那一晚第一次出现真正长的沉默。`
 ],choices:[{label:'继续',effects:{trust:{hanzhang:3}},result:''}]},
  {heading:'第五幕 · 马车只有一个位置',cast:['hanzhang','wenheng'],fx:'ember',narrative:true,text:s=>[
`城破那日，王宫起火。宫门外只剩一辆能走的马车，车上原本只留了一个位置。`,
`“给姐姐的。”她说。`,
`蘅嫔当时已经把昭妃推上车。${courtTitle(s,'hanzhang')}留在火场里，没有人回头叫她。她是自己沿着宫墙追出来的。`,
`“追了多久？”`,
`“不记得。鞋掉了一只。”`,
`她说到这里，抬手碰了一下腕上的旧疤。不是刻意解释，那道疤就是那晚翻过断墙时留下的。`,
`“后来呢？”`,
`“母亲看见我，才把我拉上去。”`,
`她没有说“母亲不要我”，也没有说“我恨她”。只把事实一件件放到棋盘上。越不评价，越没人能替她把这些事实说轻。`
 ],choices:[{label:'继续',effects:{trust:{hanzhang:4},flags:{hanzhangPastKnown:true}},result:''}]},
  {heading:'第六幕 · “这盘棋，是我自己坐的”',cast:['hanzhang'],fx:'candle',text:s=>[
`她说完过去，棋局还没有结束。`,
`我问：“你告诉朕这些，是要朕替你做什么？”`,
`“不做什么。”`,
`“那为何说？”`,
`她垂眼看棋盘。白棋被围在中央，外面仍有一条很窄的活路。`,
`“因为从前别人替我决定叫什么、站哪里、该替谁活。”`,
`她落下一子，把白棋救活。`,
`“这盘棋，是我自己坐的。”`,
`她没有求位分。也正因为没有求，我反而必须决定：从今以后，六宫要用什么身份看她。那不是奖赏一句忠诚，而是我是否愿意公开承认，这个一直站在姐姐影子里的人已经有自己的位置。`
 ],choices:[
  {label:s=>{const next=hanzhangNextTitle08(s);return next?`${courtTitle(s,'hanzhang')}晋${next}，明旨赐册`:`${courtTitle(s,'hanzhang')}位分已满，赐册并记查卷之权`;},hint:'只进一阶，把她独立办案的身份写进六宫册。',effects:{trust:{hanzhang:6},flags:{hanzhangAlliance:true,hanzhangPromotion:'one_rank',promoteHanzhang:true,hanzhangRecordsAccess:true}},result:s=>{const next=hanzhangNextTitle08(s),cur=courtTitle(s,'hanzhang');return next?`册旨到拾遗阁时，她正在收棋。新册依例由${cur}进为${next}。她没有露喜色，只问：“册礼哪日？”昭妃从里间出来，比她先笑：“总算轮到你让尚衣局头疼。”蘅嫔没有笑。册后另有一道御前手令：准她因产房旧案查阅指定内廷值簿，不得越界调卷。次日请安，她第一次坐到姐姐斜后方，不再是任何人的陪席。`:`册旨到拾遗阁时，她正在收棋。位分已至上限，不再晋封；御前仍准她因产房旧案查阅指定内廷值簿，不得越界调卷。她没有露喜色，只问：“册礼哪日？”昭妃从里间出来，比她先笑：“总算轮到你让尚衣局头疼。”`},reactionKey:'7-2',reactionCaption:'灯下旧局 · 独立身份写入六宫册'},
  {label:s=>{const next=hanzhangNextTitle08(s);return next?`${courtTitle(s,'hanzhang')}晋${next}，免繁册礼并赐御前牌`:`${courtTitle(s,'hanzhang')}不晋位，免繁册礼并赐御前牌`;},hint:'只进一阶，不行繁册礼，另赐御前牌与指定案册查阅权。',effects:{trust:{hanzhang:7},flags:{hanzhangAlliance:true,hanzhangPromotion:'one_rank',promoteHanzhang:true,hanzhangRecordsAccess:true}},result:s=>{const next=hanzhangNextTitle08(s),cur=courtTitle(s,'hanzhang');return next?`位分按常例由${cur}进为${next}，不行繁册礼，另赐一面御前牌与指定案册查阅权。昭妃听完笑道：“妹妹这回得了个最不像恩宠的恩宠。”蘅嫔没有评论。含章接牌时用拇指摩挲了一下木边，随即收入袖中。`:`位分已至上限，暂不晋封；仍赐御前牌与指定案册查阅权。昭妃听完笑道：“妹妹这回得了个最不像恩宠的恩宠。”蘅嫔没有评论。含章接牌时用拇指摩挲了一下木边，随即收入袖中。`},reactionKey:'7-2',reactionCaption:'养心殿 · 位分按常例递进，御前牌另记查卷之权'}
 ]},
  {heading:'第七幕 · 一盘栗糕放在两条旧线之间',cast:['fang','shen','hanzhang'],fx:'petal',narrative:true,text:s=>[
`册封那晚，蘅嫔在拾遗阁等到很迟。${courtTitle(s,'hanzhang')}回去时，御前牌还在袖中。母亲没有问她得了多少赏，只问：“你给了他什么？”`,
`${courtTitle(s,'hanzhang')}把外衣搭到椅背：“我能给的。”`,
`“是什么？”`,
`“我自己选的事。”`,
`蘅嫔看着她，像第一次发现这个女儿有一部分已经不再归自己安排。她没有再问，只把桌上的灯芯剪短。屋里暗了一点。`,
`两日后，方常在抱着一盘栗糕来养心殿，正撞见和妃与${courtTitle(s,'hanzhang')}一前一后从偏殿出来。`,
`她完全没意识到气氛不对，把盘子往桌上一放：“刚蒸的，谁先吃谁热。”`,
`和妃看了${courtTitle(s,'hanzhang')}一眼：“${courtTitle(s,'hanzhang')}先？”`,
`这是册封后她第一次这样叫。`,
`${courtTitle(s,'hanzhang')}只拿半块。`,
`方常在又把盘子推向和妃。和妃本来说不吃甜，最后还是拿了一块。`,
`三个人站在同一张桌边，一个不知道另外两个各自握着什么秘密，另外两个也没有互相坦白。`,
`盘里最后还剩两块栗糕。方小满临走前又拿走一块，桌边总算空了。`
 ],choices:[{label:'继续',effects:{trust:{shen:1,hanzhang:1,fang:1}},result:''}]},
  {heading:'第八幕 · 顺王的名字第一次进养心殿',cast:['shen','shunwang'],fx:'ink',narrative:true,text:s=>[
`腊月，宗人府送来一份旧档。顺王的名字第一次正式出现在沈家案卷里。`,
`他当年是主将，却不是最终下令处死沈家兄长的人；军令从前线送回京中后，被人改过一次日期。`,
`和妃站在御案前，把那行字看了两遍。`,
`“要召他吗？”我问。`,
`她手指在袖中蜷了一下。`,
`“臣妾不知道。”`,
`她很少说不知道。`,
`窗外正有人清理积雪，铁铲刮过青砖，一声一声。闻人家的旧事刚被${courtTitle(s,'hanzhang')}亲口说完，沈家的旧事却才刚刚找到能开门的人。`
 ],choices:[{label:'翻到下一章',effects:{flags:{shunwangNamed:true}},result:''}]}
 ]};
