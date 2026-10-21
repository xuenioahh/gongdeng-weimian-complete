document.documentElement.dataset.build='v55';

document.title='宫灯未眠 · 全线脉络与大封六宫 v55';

const CH=t=>CHAPTERS.find(x=>x.title===t);

const ST=(ch,q)=>ch?.steps?.find(x=>(x.heading||'').includes(q));

const safe=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const oldCurrentTitle=CHAPTERS[state.index]?.title;

const isKnownV55=k=>{const p=PEOPLE[k];if(!p)return false;const intro=Number.isFinite(+p.introducedAt)?+p.introducedAt:0;if(intro>(state.index||0))return false;if(state.ranks?.[k]==='待选')return false;return true;};

const selection=CH('御前终选');

const lowStep=ST(selection,'偏殿还有六个人')||ST(selection,'王静娴先留下');

if(lowStep&&!lowStep.v55WangFirst){
    lowStep.heading='第六幕 · 王静娴先留下，余下五人再选';
    const old=lowStep.text;
    lowStep.text=s=>{
      const a=typeof old==='function'?old(s):old;const arr=Array.isArray(a)?a:[a];
      return [...arr,
        `六个人里，我先记住了王静娴。别人答话时，她不抢，也不装得比旁人更谦；有一道茶泼到脚边，她先把裙角让开，等宫女收完，才继续回答，像方才根本没有值得表演的惊慌。`,
        `我挺喜欢王静娴这个性子。不是已经到了要谈恩宠的喜欢，只是觉得她看得明白，又不急着把“看明白”写在脸上。`,
        `我把她的名帖先压到左手边：“王氏留下。其余五人，再看。”王静娴明显怔了一下，谢恩时仍旧规整，起身以后却偷偷把袖口重新折了一次。`
      ];
    };
    const labels={2:'王静娴已留，再留一人',3:'王静娴已留，再留二人',4:'王静娴已留，再留三人',5:'王静娴已留，再留四人'};
    for(const c of lowStep.choices||[]){if(c.v37LowCount&&labels[c.v37LowCount]){c.label=labels[c.v37LowCount];c.result=`王静娴的名帖已经单独放好，其余名额照终选排序补入。总留${c.v37LowCount}人。`;}}
    lowStep.v55WangFirst=true;
  }

state.flags=state.flags||{};

if(state.flags.firstGrandSelectionDone&&!(state.flags.lowConsorts||[]).includes('zhao2')){
    state.flags.lowConsorts=[...(state.flags.lowConsorts||[]),'zhao2'];
    state.ranks.zhao2=state.ranks.zhao2&&state.ranks.zhao2!=='待选'?state.ranks.zhao2:'常在';
    PEOPLE.zhao2.introducedAt=5;PEOPLE.zhao2.title=state.ranks.zhao2;
    if(!HAREM_KEYS.includes('zhao2'))HAREM_KEYS.push('zhao2');
  }

if(state.flags.lowAccompliceKey==='zhao2')state.flags.lowAccompliceKey=(state.flags.lowConsorts||[]).find(k=>k!=='zhao2')||null;

const mother=CH('母至');

if(mother&&!mother.v55DinnerConflict){
    const i=mother.steps.findIndex(x=>(x.heading||'').includes('第一顿饭'));
    if(i>=0){mother.steps.splice(i+1,0,{heading:'第三幕半 · 一碗汤凉在三个人中间',cast:['wenheng','baopu','hanzhang'],fx:'candle',narrative:true,text:s=>[
      `拾遗阁第三日晚膳，蘅嫔把宫人都遣远，只留了一盏近灯。桌上是旧蘅口味的酸汤，昭氏连喝两口，含章只动了半碗。`,
      `蘅嫔先问长女近来御前召见几次，又问“有没有可能再往前一步”。昭氏的筷子停在半空：“母亲是问位分，还是问孩子？”`,
      `“有什么分别？”`,
      `含章一直低头挑鱼刺，到这里才把筷子放下：“有。姐姐是人，不是蘅地最后一张地契。”`,
      `昭氏猛地抬头：“你当然说得轻。你从来不需要让人看见你。你不争，别人还夸你稳。我若不争，第二天就没人记得我坐过哪里。”`,
      `蘅嫔脸色沉下来：“你们以为我愿意算这些？”`,
      `“母亲愿不愿意不重要。”含章声音仍不高，“重要的是算到最后，姐姐会把自己也算进去。”`,
      `昭氏笑了一声，眼眶却先红了：“那至少是我自己的命。别一个个都替我活。”`,
      `桌上那碗汤最后彻底凉了。三个人谁也没有摔碗，没有离席；正因为都坐着，话才更像真的伤到了人。`
    ],choices:[{label:'继续',effects:{trust:{baopu:1,hanzhang:1,wenheng:-1},flags:{v55WenrenDinnerConflict:true}},result:''}]});mother.v55DinnerConflict=true;}
  }

function canPromote(k,s=state){
    if(k==='shen')return !/皇贵妃/.test(s.ranks?.shen||'');
    try{const i=rankIndex(s.ranks?.[k]);return i>=0&&i<RANKS.length-1;}catch(_e){return false}
  }

const sealStep=(k,heading,reason,cast=[k])=>({heading,cast,fx:'seal',keyDecision:true,text:s=>[
    reason(s),
    `尚宫局把${courtTitle(s,k)}的册页单独放到红案上。大封不是把所有人一齐往上抬；每一阶都要有人承担理由。`,
    canPromote(k,s)?`朱笔边留着一个空格。晋，还是不晋，由我写。`:`她的位次已经很高，这一道旨意更重要的是写清功劳与职责，而不是再堆一个名号。`
  ],choices:[
    {get label(){return canPromote(k,state)?`晋${courtTitle(state,k)}一级`:`位分不再进，只加册赏`;},v55Promote:k,effects:{flags:{[`v55Seal_${k}`]:'promote'}},result:''},
    {label:'原位不动，厚赏并明记其功',effects:{flags:{[`v55Seal_${k}`]:'merit'}},result:`位分不动。功劳写入册页，金帛与宫人月例另加。`}
  ]});

if(!CH('雪尽宫门')){
    const winterIndex=CHAPTERS.findIndex(x=>x.title==='凤仪宫最后一冬');
    const snow={date:'承熙十一年·十二月至十二年正月',title:'雪尽宫门',theme:'白诏先收亡者，红诏再安活人；一场大封把时疫后的六宫重新排回人间',place:'奉先殿 / 慈宁宫 / 六宫',cast:['taihou','ning','shen','hanzhang','zhangyuanzhao'],fx:'snow',bridge:s=>`十二月，最后一处疫门解封。宫门重新开了，先抬出去的是旧药炉和烧坏的被褥；再往后，礼部才敢把红绸从库里搬出来。顾明宜死后，六宫第一次要在同一日里同时处理死亡、功劳、家世和活下去这四件事。`,steps:[
      {heading:'第一幕 · 第一沓不是喜旨',cast:['taihou','ning'],fx:'snow',narrative:true,text:s=>[
        `奉先殿前还挂着素幡。礼部把两沓诏书分开放：左边白封，右边红封，中间隔了一只空铜炉。`,
        `白封最上面是顾明宜。追谥议定以后，太后亲自把最后一字看完，只问：“她那支钗呢？”`,
        `“随梓宫封了。”`,
        `太后点头。没有说好，也没有说舍不得。她把纸推回去：“那就别拿旧物给下一位做体面。”`,
        `下面还有疫中薨逝的皇嗣、宫嫔、宫人和内监。名字很多，有的写得满满一行，有的史书最后只会剩一个姓。`,
        `<span class="v55-decree-stage"><b>先收亡者</b><em>顾皇后追谥；疫中死亡者依身份赐祭、恤家；确有照护、运送、守院之功者，另议追晋一级。</em></span>`
      ],choices:[{label:'先把白诏一份份看完',effects:{flags:{v55WhiteEdictsRead:true}},result:''}]},
      {heading:'第二幕 · 方小满的名字又被写了一次',cast:['fang','hanzhang','shen'],fx:'candle',keyDecision:true,text:s=>[
        `方小满死在时疫以前，所以她的名字原本不在这次疫后恤册里。珍妃却把旧案卷一并送了来。`,
        `案卷最后写着“故顺贵人方氏”。阿芙交还的那把小剪子也在封物清单里。`,
        `和妃道：“她不是为国事死，也不是为救驾死。追封不能替我们假装当初没有错。”`,
        `珍妃道：“不追，也不能让她只剩一行‘涉案后卒’。”`,
        `两句话都对，反而更难写。`
      ],choices:[
        {label:'追晋故顺贵人为顺嫔，另恤其家',v55FangPost:'pin',effects:{flags:{v55FangPosthumous:'pin'}},result:'追册不改旧案，只在旧案后补一行：方氏受诬，追晋顺嫔。'},
        {label:'不追位，特赐祭葬并把昭雪文字附入宫册',v55FangPost:'merit',effects:{flags:{v55FangPosthumous:'merit'}},result:'位分停在生前。她的清白与受诬经过另附宫册，不再让一个新名位替代事实。'}
      ]},
      {heading:'第三幕 · 红绸终于从库里拿出来',cast:['taihou','ning','shen','hanzhang','ke','hui','zhou','zhangyuanzhao'],fx:'lantern',narrative:true,text:s=>[
        `正月初六，六宫第一次重新用红。尚衣局只挂了窄绸，没有铺满回廊。太后说：“死过这么多人，别把喜气做得像没死过人。”`,
        `册案从凤仪宫旧库搬到慈宁宫偏殿。正中的位置空着，没有人坐。`,
        `我坐到案后，才发现所谓“大封六宫”并不是一张长长的名单。每翻一页，都是这些年某一个具体的人做过什么、没做过什么。`,
        `<span class="v55-decree-stage"><b>大封六宫</b><em>以下各人逐一裁断。晋封不是自动奖励；也可以原位厚赏、另授职责。</em></span>`
      ],choices:[{label:'逐页看册',effects:{flags:{v55GrandSealOpened:true}},result:''}]},
      sealStep('ning','第四幕 · 邵明贞的册页',s=>`疫中顾皇后病重以后，${courtTitle(s,'ning')}接过了最多没有旧例可循的杂务；皇后薨后，她又把六宫宫务重新分回尚宫局，却一次也没有坐凤仪宫正座。`,['ning','taihou']),
      sealStep('shen','第五幕 · 沈知微的册页',s=>`沈氏旧案已经昭雪。时疫里，${courtTitle(s,'shen')}没有再把所有心力放在死人身上；方小满案时她先救活人，疫中又把永和宫旧药册开放给太医院抄用。`,['shen']),
      sealStep('hanzhang','第六幕 · 闻人含章的册页',s=>`${courtTitle(s,'hanzhang')}救驾、查过产案，也在方氏案里一次次替“先问本人”争出位置。她的功劳很重，却从来不肯把御前信任换成私下亲近。`,['hanzhang']),
      sealStep('zhou','第七幕 · 周清漪的册页',s=>`${courtTitle(s,'zhou')}这些年最少抢第一句话，却把皇嗣、乳母、产房和值夜记录留得最全。双生旧事以后，她不再允许“祥瑞”“异兆”替孩子本人说话。`,['zhou']),
      sealStep('ke','第八幕 · 霍素英的册页',s=>`${courtTitle(s,'ke')}带进宫的北营旧簿曾替沈氏旧案钉住关键缺口；她有皇嗣也好、无皇嗣也好，从不许霍家先借孩子讨兵权体面。`,['ke']),
      sealStep('hui','第九幕 · 崔静仪的册页',s=>`${courtTitle(s,'hui')}的家门与供应旧案始终纠缠。她本人没有被证明亲手下毒，却曾对家族异常选择少问一句。大封时是否给她体面，本身就是一道政治判断。`,['hui']),
      {heading:'第十幕 · 张元照的册页',cast:['zhangyuanzhao','ning'],fx:'seal',keyDecision:true,text:s=>[
        s.flags?.v44PromoteZhang?`张元照已经因办疫晋过一级。这一册不是补发功劳，而是问：刚晋过的人，要不要因为一场大封再往前走。`:`张元照疫中功劳已经写得很清楚，此前若只记功未晋，这一回正好可以单独裁断。`,
        `她本人站在殿下，眼睛却一直盯着案角那三册病籍，像比自己的位分更怕有人把册子收错。`
      ],choices:[
        {get label(){return canPromote('zhangyuanzhao',state)?`晋${courtTitle(state,'zhangyuanzhao')}一级`:`位分不再进，授疫后册务`;},v55Promote:'zhangyuanzhao',effects:{flags:{v55Seal_zhangyuanzhao:'promote'}},result:''},
        {label:'位分到此，改授疫后病籍、往来、复值三册总核',effects:{trust:{zhangyuanzhao:3},flags:{v55Seal_zhangyuanzhao:'office'}},result:'没有再加位分。她接的是三把柜钥匙和一套必须按月复核的册规。'}
      ]},
      {heading:'第十一幕 · 王静娴的册页',cast:['zhao2'],fx:'seal',keyDecision:true,text:s=>[
        `轮到王静娴时，红案上的册页明显薄了一截。她没有显赫母族，也没有救驾之功。她做过的事多半小得很难写进一纸册命：替人把争执圆回来、记住谁真正进过哪一道门、在觉得不对时终于学会先开口。`,
        `我想起终选那天。我确实一直挺喜欢她这个性子。王静娴自己却盯着地砖，像已经在心里猜我会不会突然给她添一件麻烦。`
      ],choices:[
        {get label(){return canPromote('zhao2',state)?`晋${courtTitle(state,'zhao2')}一级`:`位分不动，加年例`;},v55Promote:'zhao2',effects:{flags:{v55Seal_zhao2:'promote'}},result:''},
        {label:'原位不动，赐独立宫室与加年例',effects:{trust:{zhao2:2},flags:{v55Seal_zhao2:'merit'}},result:'她谢恩谢得很稳。回宫路上才小声问宫女：“独立宫室是不是意味着以后连吵架都没人替我分担？”'}
      ]},
      {heading:'第十二幕 · 没有站在殿里的人',cast:['taihou','ning'],fx:'snow',narrative:true,text:s=>{
        const victim=s.flags?.v46LowVictim&&PEOPLE[s.flags.v46LowVictim]?PEOPLE[s.flags.v46LowVictim].name:'疫中亡故的低位宫嫔';
        const kids=((typeof v46ChildNames==='function'?v46ChildNames(s):[])||[]).map(x=>String(x).replace(/([0-9]+)(皇子|公主)/g,(_,n,t)=>`${['零','一','二','三','四','五','六','七','八','九','十'][Number(n)]||n}${t}`));
        return [`宣活人的册旨以前，礼官又念了一遍追恤册。${victim}的名字在其中。${kids.length?kids.join('、')+'的名字也在其中。':''}`,
        `活着的人都跪在红绸下面，死去的人只剩礼官念出的几个字。那一刻殿里没有人再觉得“晋一级”只是一件值得高兴的事。`,
        `太后把手炉换到另一只手：“念完再宣红旨。别让死人给活人让路。”`];
      },choices:[{label:'继续',effects:{flags:{v55DeadHonored:true}},result:''}]},
      {heading:'第十三幕 · 大封六宫',cast:['ning','shen','hanzhang','zhou','ke','hui','zhangyuanzhao','zhao2'],fx:'seal',narrative:true,text:s=>[
        `午后，册旨终于一份份出慈宁宫。宣旨内监沿着宫道分开，红色诏匣去往不同的门。`,
        `有人晋位，有人原位厚赏；有人得到的是宫务权，有人得到的只是一句终于写清的功劳。没有一张旨意完全一样。`,
        `合宫谢恩时，中间仍空着一个位置。礼官下意识朝凤仪宫方向看了一眼，很快又把目光收回。`,
        `我也看见了。大封能把六宫重新排出高低，却不能凭空补出一个皇后。`,
        `<span class="v55-decree-stage"><b>红旨宣毕</b><em>从这一日以后，“后位空悬”不再只是守制中的空缺，而开始成为六宫每天都要绕过去的一张空椅。</em></span>`
      ],choices:[{label:'进入疫后第一个春天',effects:{flags:{v55GrandSealingDone:true}},result:''}]}
    ]};
    CHAPTERS.splice(Math.max(0,winterIndex+1),0,snow);
  }

if(!CH('凤座无人')){
    const snowIndex=CHAPTERS.findIndex(x=>x.title==='雪尽宫门');
    const vacant={date:'承熙十二年·春至夏',title:'凤座无人',theme:'凤仪宫空了一年，六宫仍要照常过日子',place:'慈宁宫 / 六宫 / 凤仪宫',cast:['ning','shen','hanzhang','zhangyuanzhao','taihou'],fx:'petal',bridge:s=>`大封之后，宫里终于像是活过来了。春衣重新量尺寸，花房重新送花，合宫家宴也重新摆桌。可顾明宜从前做过的许多事，直到她不在以后才显出形状：不是惊天动地的大权，而是每一件最后总要有人说“就这样办”的小事。`,steps:[
      {heading:'第一幕 · 第一场家宴，桌子短了一截',cast:['taihou','ning','shen','hanzhang','zhou'],fx:'candle',narrative:true,text:s=>[
        `三月第一场家宴，御膳房照旧摆了长桌。等椅子放完，裴景和才发现桌尾多出半尺。`,
        `不是桌子变长了，是人少了。几张曾经固定有人坐的椅子已经撤走，宫人却仍按旧尺寸铺桌布。`,
        `三皇子进门时先看了一眼凤仪宫旧位。邵明贞正站在那附近安排孩子座次，察觉他的目光，往旁边让了半步。`,
        `太后什么也没说，只叫人把多出来的桌布往里折。那一折很小，整个席面却忽然显得比从前短。`,
        `王静娴坐在后排，难得没有在心里替这一幕找一句好笑的话。`
      ],choices:[{label:'继续',effects:{flags:{v55ShortTable:true}},result:''}]},
      {heading:'第二幕 · 春衣少了几个尺寸',cast:['ning','zhao2'],fx:'petal',narrative:true,text:s=>[
        `尚衣局来量春衣，旧册上有几行尺寸再也用不上。小吏不敢擅划，抱着册子问邵明贞。`,
        `她拿笔，在每个名字旁边只写“停”，没有写“死”。写到顾明宜时，笔尖停得最久，最后仍是同一个字。`,
        `王静娴在旁边核低位宫嫔的衣料，看了一会儿说：“停比删好。删了像这个人从来没占过这三尺布。”`,
        `邵明贞抬头看她。王静娴立刻低头：“臣妾随口。”`,
        `“别随口。”邵明贞把册子推过去，“把这句话写在备注里。”`
      ],choices:[{label:'继续',effects:{trust:{ning:1,zhao2:1},flags:{v55SpringClothes:true}},result:''}]},
      {heading:'第三幕 · 同一个病愈宫女，三个人给出三种答案',cast:['shen','hanzhang','zhangyuanzhao','ning'],fx:'ink',keyDecision:true,text:s=>[
        `四月，一个在疫中从凤仪宫调去病院的宫女病愈后拒绝复值。尚宫局按旧例说她既已无病，应回原差；她跪在廊下，听见“凤仪宫”三个字便开始发抖。`,
        `珍妃先把围观的人赶远：“先问她愿不愿回去。人不是一张缺人的班表。”`,
        `和妃蹲下去，把自己的披风边往她膝前盖了一点：“不愿回，也不等于抗差。换个地方，让她先睡几夜不做梦，再问。”`,
        `张元照站在一边听完，拿出纸：“这次可以靠三位娘娘心软。下次若换了人呢？把‘本人是否愿意、是否适合复值、可否转岗’写进复值册，以后谁来都照着问。”`,
        `<span class="v55-three-answers"><span><b>闻人含章</b><small>先守一个人的边界：她愿不愿意。</small></span><span><b>沈知微</b><small>先让人从旧伤里活回来：今天不必马上给答案。</small></span><span><b>张元照</b><small>把这次善意变成下次也能重复的制度。</small></span></span>`,
        `三个人第一次把差别摆得这么清楚。她们都想救人，却根本不是同一种人。`
      ],choices:[
        {label:'先按含章的意思：当众确认她有权说“不愿回原处”',effects:{trust:{hanzhang:4},flags:{v55RecoveryRule:'agency'}},result:'宫女第一次把“不愿意”三个字完整说出来。尚宫局没有立刻记她抗差。'},
        {label:'先按和妃的意思：给她十日休养，再自行选差',effects:{trust:{shen:4},flags:{v55RecoveryRule:'mercy'}},result:'十日里没有人催她做决定。第八日，她自己提出去花房。'},
        {label:'按张元照的办法：把三项询问正式写进复值册',effects:{trust:{zhangyuanzhao:4},flags:{v55RecoveryRule:'system'}},result:'从这一天起，复值册第一次不只记“能不能回来”，也开始记“愿不愿回来”。'}
      ]},
      {heading:'第四幕 · 一张宫务单送了三遍',cast:['ning','taihou'],fx:'ink',narrative:true,text:s=>[
        `五月，尚宫局为两名低位宫嫔换住处。一张很小的迁宫单先送景仁宫，邵明贞批完又退回：“我可以核，不可以用私印替中宫定。”`,
        `单子第二次送慈宁宫。太后看也没看：“哀家是太后，不是皇后。”`,
        `第三次才到养心殿。纸角已经被三处宫门的夹板磨得起毛。`,
        `我只需要写一个“准”字，却忽然明白顾明宜从前每天替我省掉的，可能正是几百个这样的字。`
      ],choices:[{label:'亲自批下这张小小的迁宫单',effects:{flags:{v55NoEmpressSignature:true}},result:'朱笔只有一个字。第二日却又有两张相似的单子送来。'}]},
      {heading:'第五幕 · 凤仪宫漏雨，册子要不要先搬进去',cast:['ning','zhangyuanzhao','hanzhang'],fx:'rain',narrative:true,text:s=>[
        `六月暴雨，凤仪宫西配殿漏水。顾明宜旧宫务册和疫后新册都暂存在邻库，尚宫局提议把它们搬进已经修好的凤仪宫正殿。`,
        `邵明贞第一句便是：“没有皇后，不把宫务册搬进中宫正殿。”`,
        `张元照看着屋檐落水：“书发霉不认位分。”`,
        `两个人第一次为一件极小的事顶住。邵明贞说：“宫位先定，下面的人才知道听谁的。”张元照把受潮的药包推到她面前：“那先定这批药听谁的。”`,
        `含章听了半晌，伸手拿过最上面一箱：“那先搬册，不搬桌椅。书不需要先当皇后。”`,
        `邵明贞和张元照同时看她。含章已经抱着箱子往干处走。`
      ],choices:[{label:'照含章说的，先救册子，凤仪宫仍不上锁启用',effects:{trust:{hanzhang:2,ning:1,zhangyuanzhao:1},flags:{v55BooksIntoFengyi:true}},result:''}]},
      {heading:'第六幕 · 三皇子第一次问“以后谁住那里”',cast:['ning','taihou'],fx:'candle',narrative:true,text:s=>[
        `雨停以后，三皇子从上书房回来，正撞见宫人往凤仪宫搬湿册。`,
        `他站在门外问：“以后谁住这里？”`,
        `没有人立刻回答。`,
        `他已经不是会被一句“以后再说”哄过去的孩子，却仍把两只袖口各理了一次。这个动作像顾明宜。`,
        `邵明贞只道：“谁住进来，都不会把你母后住过的日子抹掉。”`,
        `三皇子看她：“我没问这个。”`,
        `“臣妾知道。”她答。`,
        `两个人之间第一次有了一个以后一定还会再谈的问题。`
      ],choices:[{label:'继续',effects:{flags:{v55PrinceAsksNewEmpress:true}},result:''}]},
      {heading:'第七幕 · 礼部第一道请立中宫疏',cast:['taihou','ning'],fx:'seal',keyDecision:true,text:s=>[
        `六月末，礼部第一道正式请立中宫疏送到御前。写得很体面：宗庙有序、六宫有主、皇嗣有教。没有提顾明宜，也没有写任何候选人的名字。`,
        `我看完，把折子扣在茶盏下面。`,
        `太后来时正好看见那一角黄纸：“准备压多久？”`,
        `“再议。”`,
        `她笑了一声：“这两个字最省墨。”`,
        `窗外蝉叫得很响。凤仪宫那批刚搬进去的旧册正在晾纸。`
      ],choices:[{label:'暂压此疏，入秋再议',effects:{trust:{taihou:-1},flags:{v55FirstEmpressMemorialDelayed:true}},result:'折子没有退回礼部，也没有批“准”。它留在御案最下面，成为后来一次次重送的第一张。'}]}
    ]};
    CHAPTERS.splice(Math.max(0,snowIndex+1),0,vacant);
  }

const night=CH('长夜未央');

if(night){
    night.date='承熙十二年·秋至十三年正月';
    night.bridge=s=>`大封后的春夏并不坏。清晨请安重新准时，午后御花园有人带孩子放纸鸢，凤仪宫虽然空着，六宫至少知道每天该往哪里去。入秋以后，难熬的反而成了夜。宫门一层层落锁，养心殿只剩翻纸声，我有时会把本该自己看完的东西推给别人，只因为那一刻实在不想再想。`;
    const fast=ST(night,'四个月很快过去');
    if(fast&&!fast.v55Months){
      fast.heading='承熙十二年·七月至十月 · 四个月很快过去';
      const old=fast.text;fast.text=s=>{let a=typeof old==='function'?old(s):old;a=(Array.isArray(a)?a:[a]).map(x=>String(x)
        .replace('<em>二月</em>','<em>七月</em>').replace('<em>三月</em>','<em>八月</em>').replace('<em>四月</em>','<em>九月</em>').replace('<em>五月</em>','<em>十月</em>')
        .replace('顾明宜百日未过，养心殿仍不设大宴。','大封已过半年，养心殿终于恢复小宴。'));
        return a;};fast.v55Months=true;
    }
  }

const growth=CH('长枝渐高');

if(growth)growth.date='承熙十三年·春至六月';

const vacancy=CH('中宫空悬');

if(vacancy)vacancy.date='承熙十三年·六月至十四年春';

function syncLateProfilesV55(){
    if(state.flags?.shenVerdict||state.flags?.shenNewTea){
      PEOPLE.shen.tags=['记旧事','会放下','先顾活人'];
      PEOPLE.shen.bio='沈知微记性仍旧很好，却不再把“记得”当成一生唯一的任务。旧案落定以后，她开始重新喝新茶、管活人的病与日子；她最大的变化不是更会查，而是终于允许自己在真相之外继续生活。';
    }
    if(state.flags?.hanzhangSavedEmperor||state.flags?.threeWomenTable){
      PEOPLE.hanzhang.tags=['边界清楚','自己选择','不替人活'];
      PEOPLE.hanzhang.bio='闻人含章后半段最在意的不是案卷本身，而是谁有资格替谁做决定。她会留证，也会追问，但真正锋利的是“先问本人”与“我自己选”；她不愿再做母亲、姐姐、旧国或御前最好用的影子。';
    }
    if(state.flags?.v46EpidemicEnded||state.flags?.v55GrandSealingDone){
      PEOPLE.zhangyuanzhao.tags=['制度设计','记录成规','不靠临时善意'];
      PEOPLE.zhangyuanzhao.bio='张元照擅长把一次危机拆成可复核的流程。她不满足于“这次有人心软所以救下来”，总要追问下一次换了人怎么办；病籍、路线、复值与谁该负责什么，是她真正想留在宫里的东西。';
    }
  }

const rankIndexV55=rankIndex;

rankIndex=function(v){if(v==='和贵妃')return RANKS.indexOf('贵妃');return rankIndexV55(v);};

const applyV55=applyChoiceEffects;

applyChoiceEffects=function(c){
    const out=applyV55(c);
    if(c.v55FangPost==='pin'){state.ranks.fang='故顺嫔';PEOPLE.fang.title='故顺嫔';out.push('故顺贵人追晋 → 故顺嫔');}
    if(c.v55Promote){
      const k=c.v55Promote;
      let changed=false;
      if(k==='shen'){
        const cur=state.ranks.shen||'和妃';
        if(cur==='和妃'){state.ranks.shen='和贵妃';changed=true;}
        else if(cur==='和贵妃'){state.ranks.shen='皇贵妃';changed=true;}
      }else if(typeof promoteRank==='function')changed=!!promoteRank(k);
      if(changed)out.push(`${PEOPLE[k]?.name||k}晋一级 → ${courtTitle(state,k)}`);else out.push(`${PEOPLE[k]?.name||k}位分不再进，改记册赏`);
    }
    return out;
  };
