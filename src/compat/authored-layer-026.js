(()=>{try{
  document.documentElement.dataset.build='v50';
  state.flags=state.flags||{};
  const CH=t=>CHAPTERS.find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>(x.heading||'').includes(q));
  const IX=(c,q)=>c?.steps?.findIndex(x=>(x.heading||'').includes(q))??-1;
  const arr=(v,s)=>{const r=typeof v==='function'?v(s):v;return Array.isArray(r)?r:[r]};
  const insertBefore=(c,q,items,mark)=>{if(!c||c[mark])return;const i=IX(c,q);if(i<0)return;c.steps.splice(i,0,...items);c[mark]=true};
  const insertAfter=(c,q,items,mark)=>{if(!c||c[mark])return;const i=IX(c,q);if(i<0)return;c.steps.splice(i+1,0,...items);c[mark]=true};
  const append=(c,q,mark,fn)=>{const st=ST(c,q);if(!st||st[mark])return;const old=st.text;st.text=s=>[...arr(old,s),...fn(s)];st[mark]=true};

  // v50 独立存档：第一次打开时保留旧状态，但若已经越过三年篇，回到三年篇重看新增重场。
  const V50KEY='chengxi-test140-v50';
  try{
    const raw=localStorage.getItem(V50KEY);
    if(raw){const got=JSON.parse(raw);if(got?.version===26)state=got;}
    else{
      const yi=CHAPTERS.findIndex(c=>c.title==='宫灯渐繁');
      if(yi>=0 && (state.index||0)>yi){state.index=yi;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.lastChoice=null;}
      state.flags.v50Migrated=true;
    }
    save=function(){try{localStorage.setItem(V50KEY,JSON.stringify(state))}catch(_e){}};
  }catch(_e){}

  // ---------- 一、承熙三年：先快后慢。新人入宫的半年，用几张小纸过去；中秋第一次真正撞到旧伤口。 ----------
  const years=CH('宫灯渐繁');
  if(years){
    const anchor=years.steps.findIndex(st=>(st.heading||'').includes('承熙四年二月'));
    if(anchor>=0 && !years.v50AutumnSetpiece){
      const fast={heading:'承熙三年三月至七月 · 六张小纸',cast:['gu','ning','ke','hui','zhou','fang'],fx:'ink',narrative:true,text:s=>[
        `<div class="v50-fast"><em>三月二十七</em>　储秀宫撤去最后一排临时床铺。新人各自搬进宫苑，几只食盒送错了门，两个新人在回廊里互相问路，漏掉请安名帖的人被尚宫局记了名。</div>`,
        `四月，凤仪宫收到六份“初次承宠以后是否加例”的请示。顾明宜一份份翻旧例，遇到没有旧例的地方便先压在最下面。邵明贞来帮她对名册，看到压着的三份没有问，只把已经能答的先分出来。`,
        `五月，霍素英第一次去射圃。她没有穿宫里给新人裁的轻软春装，袖口束得很紧。北营送来的家书里夹着一张旧军粮名目，她看完没有烧，压进妆匣。`,
        `六月，崔静仪收到家中第一批贡造新样。她没有全收，挑了两匹最普通的夏纱送凤仪宫验看。掌事说“崔家东西一向稳妥”，她笑着回：“稳妥也要验。”`,
        `七月，低位新人已经学会请安时坐哪里、哪一句话不能抢在高位前头。方小满却常常还会在宫道上先替她们指出“哪一扇门其实不通”，因为那些规矩图上不画的小路，她做宫女时都走过。`,
        `七月末，方小满替新人把错送的食盒名单送回凤仪宫，又在纸背画了几条自己熟悉的近路，塞给那几个仍会走错门的人。`
      ],choices:[{label:'继续',effects:{flags:{v50FastSpringShown:true}},result:''}]};

      const feast={heading:'承熙三年八月十五 · 中秋席上有人提起绮春宫那一胎',cast:['zhou','gu','taihou','shen','ning','ke','hui'],fx:'lantern',keyDecision:true,text:s=>{
        const fate=s.flags?.twinBoyFate;
        const middle=fate==='keep'
          ?`周清漪带着二公主来得稍晚。四皇子年纪太小，没有久坐，只在乳母怀里露过一次脸。孩子右手多出的手指藏在袖里，左眼在灯下颜色比旁人浅。一个宗室老夫人看见，笑着说“龙凤双生，又有异征，怕是天家自有天意”。她原本想说吉话，席上却静了一瞬。`
          :fate==='send'
          ?`周清漪带着二公主来。有人看着孩子忽然提起“当年双生”，又很快把后半句话咽回去。另一位宗亲女眷却顺口问：“西华门那年送出去的孩子，如今可还好？”问完才意识到不该问。周清漪手里的酒盏没有动。`
          :`周清漪带着二公主来。席间一个年纪很小的宗室女孩忽然问母亲：“不是说周娘娘当年生了两个吗，为什么玉牒上只有一个？”她母亲脸色当场白了。孩子不知道自己说错了什么，还在等答案。`;
        return [
          `这是第一次把第一次选秀的新人、潜邸旧人、太后和已经会跑会说话的孩子都放在同一张中秋长席上。月饼切得整齐，宫灯照得每个人脸上都没有阴影。越是这样，谁先移开目光便越明显。`,
          middle,
          `顾明宜下意识去看太后，又去看我。她已经拿起手边的宴仪册，像想从里面找一句可以让这件事过去的话。沈知微没动，只把茶盖轻轻扣上。邵明贞第一次看见中宫遇到“没有旧例”的尴尬；霍素英则看着周清漪，没有看说话的人。崔静仪最先察觉到的是席间哪几个宗亲已经互相交换过眼色。`,
          `周清漪最终抬起脸，笑得和平日一样：“孩子吃月饼呢，别把天意压到他头上。”她把话说得很轻，却没有替任何人圆场。`,
          `整张席都在等我接下一句。`
        ];
      },choices:[
        {label:'当席止议：皇嗣只论安康，不以形貌议祥祸',hint:'把界线说清楚，宗亲会觉得你护内廷太重',effects:{trust:{zhou:6,gu:2},flags:{v50MidAutumnPolicy:'public'}},result:'我让人撤掉那杯还没动的酒，只说了一句：“孩子是孩子，不是卦。”礼官当晚把“宗宴不得以皇嗣形貌议祥妖”补进宴仪。周清漪没有谢恩，散席时却第一次把二公主直接交给我抱了一会儿。'},
        {label:'让皇后依宴仪止话，不亲自接这句',hint:'把场面交给中宫；顾明宜会硬着头皮承担一次没有现成旧例的判断',effects:{trust:{gu:4},bond:{zhou:-1},flags:{v50MidAutumnPolicy:'queen'}},result:'顾明宜翻了两页，最后把册子合上：“中秋家宴，只论团圆，不论祥妖。”她说完耳根都有些白。席面继续，周清漪没有再笑。散席后顾明宜把整套宴仪翻到半夜，想找一条能证明自己刚才没说错的旧例，最终也没找到。'},
        {label:'不在席上发作；记下是谁起头，宴后再处理',hint:'维持表面平静，也让周清漪知道你听见了',effects:{trust:{zhou:1,shen:2},flags:{v50MidAutumnPolicy:'observe'}},result:'我只叫乐工继续。那句话像掉进水里的针，看不见，却还在那里。宴散以后，裴景和把最先起头、跟着附和、立刻止话的人名分别写了三行。周清漪接到我的口信，只回：“臣妾知道陛下听见了。”'}
      ]};

      const after={heading:'中秋宴散 · 三座宫门各自亮到很晚',cast:['zhou','gu','shen','ning'],fx:'candle',narrative:true,text:s=>[
        `绮春宫最晚才熄灯。周清漪先替孩子拆发饰，再把宴上那只没喝完的酒盏叫人拿去洗。宫女说宗亲夫人只是说错一句，她答：“宫里最麻烦的就是一句话永远可以说成‘只是’。”`,
        s.flags?.v50MidAutumnPolicy==='queen'?`凤仪宫也亮着。顾明宜把先帝朝宗宴、皇嗣洗三、宗室女眷请安三套旧例全摊开，找不到自己那句话的出处。邵明贞坐在一旁，等她翻到第三遍才说：“娘娘已经说完了。”顾明宜道：“可总得有个来处。”邵明贞没有再劝。`:`凤仪宫里，顾明宜仍把宴仪翻过一遍。她并不完全赞成任何人在席上谈异相，只是庆幸最后那一句不是由自己独自承担。`,
        `永和宫没有谈双生。沈知微只让人换了新茶。宫女问她为什么没替周氏说话，她道：“当着满殿人替她解释，也是在把她孩子再说一次。”`,
        `景仁宫的邵明贞第一次在家书里写：“中宫难做，不在坐得最高，在所有人都等你先说的时候。”她写完又划掉，没有寄出去。`,
        `中秋过去以后，宫里重新回到请安、月例、值房和孩子的哭声。可周清漪从那夜开始，再不允许任何人当着双生孩子的面说“祥瑞”或“异兆”。`
      ],choices:[{label:'继续',effects:{flags:{v50MidAutumnAftershock:true}},result:''}]};
      years.steps.splice(anchor,0,fast,feast,after);
      years.v50AutumnSetpiece=true;
    }

    // ---------- 二、承熙四年：把低位宫嫔生产从一句“生了”写成一夜。 ----------
    const birthIdx=years.steps.findIndex(st=>(st.heading||'').includes('五公主洗三'));
    if(birthIdx>=0 && !years.v50StormBirth){
      const storm1={heading:'承熙四年八月二十七 · 暴雨把产婆堵在西夹道',cast:['gu','fang','afu','xielin'],fx:'rain',narrative:true,text:s=>{
        const k=typeof lowPregKey==='function'?lowPregKey(s):null, mother=PEOPLE[k]?.name||'一名低位宫嫔';
        return [
          `那一胎发动在酉时。${mother}住的院子偏，平日从凤仪宫走过去不过半刻钟，那天却从午后开始落暴雨，宫墙根的水一路漫到鞋面。`,
          `第一名稳婆已经在宫里，第二名却被堵在西夹道外。正门前一棵老槐折了半边，侍卫正在清路；另一条按规矩能走的路要绕过内务府，再过两道锁门。`,
          `凤仪宫收到报信时，顾明宜先问：“旧例里有没有暴雨夜临时开便门的条目？”尚宫答没有。她又问：“先帝朝呢？”仍然没有。`,
          `方小满和阿芙刚好在凤仪宫送花房新剪的桂枝。阿芙听完说：“御花园西便门能过去，宫女送炭一直走那边。”`,
          `谢绍庭却提醒：西便门夜间只走杂役，没有给外来的稳婆开过。`,
          `产院第二次来报，说阵痛已经连起来。顾明宜手里的笔一直没有落。门要不要开，只能现在定。`
        ];
      },choices:[{label:'继续',effects:{flags:{v50StormLaborBegins:true}},result:''}]};

      const storm2={heading:'同夜 · 这一扇门先为谁开',cast:['gu','fang','afu','xielin'],fx:'rain',keyDecision:true,text:s=>[
        `雨敲在凤仪宫檐上，连说话都要比平日大声。顾明宜把空白手令推到我面前，又很快拉回来：“若开西便门，得有人担这个例外。”`,
        `她没有说“不救”。她只是仍然本能地想先知道，出了错应该按哪一条追。`,
        `产院第三次来人时，衣摆全是泥。`,
        `“娘娘已经见红。”`,
        `这一夜没有一条旧例能替我把路走完。`
      ],choices:[
        {label:'开西便门。先让稳婆进来，手令朕来签',hint:'最快；从这一刻起，便门临时开启有了第一份成例',effects:{trust:{gu:2,fang:2},flags:{v50StormRoute:'gate'}},result:'朱印落下，谢绍庭亲自带人开锁。顾明宜接过手令又看一遍，最后自己添了一句：“只限今夜产事，天明复锁。”她终于不是找到旧例，而是替以后留下一条例。'},
        {label:'不破门禁；命谢绍庭搭板清正道，御前加派人手接稳婆',hint:'规矩不破，但要赌清路的速度',effects:{trust:{xielin:4,gu:1},flags:{v50StormRoute:'formal'}},result:'侍卫把断枝锯开，又用门板铺过最深的水。稳婆到产房时比走西便门晚了两刻。顾明宜从报时里听见这两刻，后半夜一直没有再问“是不是合例”。'},
        {label:'让方小满与阿芙从花房旧路引稳婆进来，谢绍庭沿途封口',hint:'使用宫女真正走过的路；这条路从来没有写在宫图上',effects:{trust:{fang:5,afu:4,xielin:2},flags:{v50StormRoute:'servant'}},result:'方小满脱了绣鞋换回宫女常穿的软底鞋，提灯走在最前。阿芙一边骂雨一边认门。两个人从花房后墙、旧炭道和一条只够两人并肩的夹巷把稳婆带进产院。顾明宜后来让尚宫把这条路第一次补进宫务图。'}
      ]};

      const storm3={heading:'子时至卯时 · 宫里很久没有这么慢的一夜',cast:['gu','fang','afu','baopu','shen'],fx:'candle',narrative:true,text:s=>{
        const k=typeof lowPregKey==='function'?lowPregKey(s):null, mother=PEOPLE[k]?.name||'那名低位宫嫔';
        return [
          `稳婆进去以后，事情反而慢下来。产房门一关，外面的人什么也做不了。`,
          `顾明宜坐在耳房，手边放着乳母册、药材册和一份她已经看过两遍的产事旧例。每次里面有人提高声音，她都会抬头；每次门没开，又把眼睛落回纸上。`,
          `方小满本来只是来送桂枝，最后却和阿芙一起留下。阿芙记谁送热水、谁换药布；方小满则一次次跑到廊口看雨有没有小。她还是会下意识替端盆的宫女让路。`,
          `${courtTitle(s,'baopu')}半夜也来了。她没有进耳房，只站在廊下问一句“还没生？”得到“还没有”，便又回去了。第二更她又来一次。没有人叫她。`,
          `和妃来得最晚，手里只带了一壶热茶。她把茶放到顾明宜手边：“你今晚若还翻那一页，字也不会变。”顾明宜没有回嘴，终于把册子合上。`,
          `寅末，里面忽然静了片刻。那片刻比前面所有喊声都吓人。紧接着，一声很细的婴啼穿过门板。`,
          `${mother}先问的是：“孩子呢？”稳婆答“公主，平安”。她又问：“我能自己抱吗？”`,
          `天快亮时雨才小。宫里很多人一夜没睡，却没有谁觉得自己做成了什么大事。只是又有一个孩子活着哭出了第一声。`
        ];
      },choices:[{label:'等天亮再走',effects:{trust:{gu:2,fang:2,shen:1,baopu:1},flags:{v50StormBirthComplete:true}},result:'卯时以后，产房门终于打开。顾明宜站起来太快，扶了一下桌角。她先看母亲，再看孩子，最后才叫人拟洗三和月例。'}]};
      years.steps.splice(birthIdx,0,storm1,storm2,storm3);
      years.v50StormBirth=true;
    }
  }

  // ---------- 三、承熙九年：沈氏旧案不只“查清”，而要让皇帝决定真相写到哪里。 ----------
  const oldcase=CH('旧茶未凉');
  if(oldcase && !oldcase.v50ArchiveSetpiece){
    const i=IX(oldcase,'军令不是一张纸');
    if(i>=0){
      const hearing={heading:'第四幕半 · 三份纸摊开以后，没有人先走',cast:['shen','shunwang','hanzhang'],fx:'ink',narrative:true,text:s=>[
        `珍妃把三份军令按日期排好，又把我当年的批红单独放在最下。她做完便退到一旁，没有替任何人问话。`,
        `沈知微没有哭，也没有先看顺王。她把那张“照例结案”推到我面前：“臣妾只问两件事。”`,
        `“第一，当年陛下看见日期不对，是不是仍觉得先稳住换防更重要？”`,
        `“是。”`,
        `“第二，今日若把臣妾兄长的名字改回来，陛下愿不愿意让后来的人知道，这四个字也在案卷里？”`,
        `顺王第一次抬头。这个问题和爱情、旧情都没有关系。它只问一件事：沈家得到清白以后，皇帝自己的错误要不要留下。`,
        `殿外已经备好平反文书。空着的，不是沈氏那一行，是“原案如何错成这样”的最后一段。`
      ],keyDecision:true,choices:[
        {label:'把朕当年的批红一并收入平反案卷，准都察院追查经手',hint:'沈氏昭雪之外，也留下皇帝本人曾选择“稳定优先”的记录',effects:{trust:{shen:7,hanzhang:3},flags:{v50ShenArchive:'public'}},result:'我在平反文书后另加一页，亲笔写明“昔年朕见日期有疑，仍批照例结案”。顺王看完没有说话。沈知微把那一页看了两遍，最后只道：“够了。”'},
        {label:'昭雪沈氏；朕的批红另封内阁密档，限御史与军机调阅',hint:'承认责任，但不让它成为朝堂公开争论的中心',effects:{trust:{shen:4,hanzhang:2},flags:{v50ShenArchive:'sealed'}},result:'沈家的平反文书写清军令转递有误，御批原件则另封一匣。沈知微问“以后能查？”我说能。她没有再逼我把自己的错写在最显眼的地方。'},
        {label:'只恢复沈氏军籍与战功，不再追查旧年经手官',hint:'仍把十年前的稳定放在追责之前；这是最接近当年选择的一条路',effects:{trust:{shen:-5,hanzhang:-2},flags:{v50ShenArchive:'closed'}},result:'沈知微的兄长得到清白，却没有人再追问是谁改了日期、谁看见后沉默。她接旨时礼数无错，回永和宫以后却把新茶重新换成了很苦的旧茶。'}
      ]};
      oldcase.steps.splice(i+1,0,hearing);
      oldcase.v50ArchiveSetpiece=true;
      append(oldcase,'平反文书上没有爱情','v50ArchiveEcho',s=>[
        s.flags?.v50ShenArchive==='public'?`这一次平反卷宗最后多了一页不常见的东西：皇帝自己的错误。没有人替那四个字找借口。`:
        s.flags?.v50ShenArchive==='sealed'?`平反文书送出以后，另一只封匣被送进内阁。沈知微知道那一页还在，只是不在所有人都能看见的地方。`:
        `平反文书很干净。正因为太干净，沈知微知道有些东西又一次被留在纸外。`
      ]);
    }
  }

  // ---------- 四、承熙十三年：三皇子越界之后，真正重的是父子关门谈的这一夜。 ----------
  const growth=CH('长枝渐高');
  if(growth && !growth.v50EastPalaceSetpiece){
    const i=IX(growth,'她把这件事告诉御前');
    if(i>=0){
      const door={heading:'同夜 · 东所封门',cast:['ning','zhangyuanzhao'],fx:'candle',narrative:true,text:s=>[
        `戌末，我去了东所，没有让人提前通传。`,
        `三皇子正在看弓。他看见我进来，先把弓放下，行礼没有错。只有站起时太快，凳脚在地上刮出一声。`,
        s.flags?.v47PrinceBoundary==='disciplined'?`他已经接到撤去私下递送物件权限的旨意。第一句话便是：“父皇为了一个张氏，要让东所的人都看儿臣笑话？”`:
        s.flags?.v47PrinceBoundary==='shielded'?`他知道张元照被要求绕路以后，反而显得更镇定：“既然她自己避开，事情不是已经完了吗？”`:
        `白日里我只私下警告过他。他显然以为这就意味着事情已经关在门里：“儿臣已经知道错了，何必再说？”`,
        `我问：“你母后从前是不是也常说，门关上就好？”`,
        `他脸色变了。`,
        `“母后只是护儿臣。”`,
        `“是。”我说，“她护你，是她的软处。你拿她的软处当成自己可以越界的规矩，是你的错。”`,
        `三皇子很久没有说话。最后只低声道：“若母后还在，她不会让这件事进宗人府。”`,
        `“所以她不在以后，朕才第一次看见你已经习惯到什么地步。”`,
        `门外，大公主带着两个年幼皇妹从廊下经过。她听见里面声音不对，没有停，只把妹妹们带去了另一条路。她没有替三皇子问一句。`,
        `邵明贞站在东所外院等。她既没有进来替顾明宜的儿子说情，也没有先去安慰张元照。她只问裴景和：“今晚的话，记不记？”`,
        `这个问题最后又落回我手里。`
      ],choices:[{label:'继续',effects:{flags:{v50EastPalaceTalk:true}},result:''}]};

      const record={heading:'子时 · 这一次，门关上以后还留不留字',cast:['ning','zhangyuanzhao','hanzhang'],fx:'ink',keyDecision:true,text:s=>[
        `东所日记已经摊开。掌笔内侍不敢写第一行。`,
        `顾明宜过去最常做的，就是把儿子的难看留在门内。三皇子的错她会罚，却常把记过留在东所里，不让那一页送去宗人府。`,
        `张元照没有来催。珍妃也没有。两个人都知道，记录本身不是公正；可没有记录，下一次就只剩谁记得。`,
        `三皇子仍跪在内殿。十八岁的人第一次真正等着我决定：这件事是一次被父亲骂过的私事，还是他人生里要留下的一笔。`
      ],choices:[
        {label:'写入东所日记：失仪、越界、已责令止步',hint:'不给细节添油，只让“发生过”无法再被抹掉',effects:{trust:{zhangyuanzhao:5,hanzhang:3,ning:2},flags:{v50PrinceRecord:'formal'}},result:'掌笔内侍写到“失仪”二字时手抖了一下。我没有让他换词。三皇子第二日看到副本，第一次没有摔东西，只把纸折起来收进书匣。'},
        {label:'另立御前封记，不进公开东所日记',hint:'留下证据，也给皇室体面留一层门',effects:{trust:{zhangyuanzhao:2,hanzhang:2},flags:{v50PrinceRecord:'sealed'}},result:'一页薄纸封进御前档。张元照知道有记录，没有再问放在哪里；邵明贞则说：“至少不是一句‘大家都记得’。”'},
        {label:'不留书面记录，只让三皇子亲自向张元照致歉',hint:'最接近顾明宜过去的处理方式；人可以道歉，但制度仍然没有记忆',effects:{trust:{zhangyuanzhao:-3,hanzhang:-2},flags:{v50PrinceRecord:'none'}},result:'三皇子第二日当面致歉，礼数完整。张元照受了礼，只问一句：“这件事以后是谁记得？”没人回答。'}
      ]};
      growth.steps.splice(i+1,0,door,record);
      growth.v50EastPalaceSetpiece=true;
    }
  }

  // ---------- 五、十四年：册后不是按钮结果，凤仪宫要真正重新有人走进去。 ----------
  const vacancy=CH('中宫空悬');
  if(vacancy && !vacancy.v50Coronation){
    const i=IX(vacancy,'凤印前最后一道旨');
    if(i>=0){
      const coronation={heading:'承熙十四年二月 · 凤印落在谁手里以后',cast:['taihou','shen','hanzhang','ning','zhangyuanzhao'],fx:'lantern',narrative:true,text:s=>{
        const z=s.flags?.v44NewEmpress==='zhangyuanzhao';
        return z?[
          `册后大典那日没有下雪。张元照从景阳宫一路走到凤仪宫，礼服比她平日穿的重得多。她走到丹陛前时停了一息，不是紧张，是在重新确认礼官刚刚教过的步数。`,
          `太后受她大礼，没有立刻叫起。等礼官唱完最后一句，才伸手扶了一下她的手腕：“今日以后，不懂就问，问完要自己担。”`,
          `和妃送的是一壶新茶。珍妃送三册疫制副本。霍素英没有送弓，只送一张北营女眷请安名册；崔静仪送来的是重新核过供应来源的凤仪宫年度物料表。`,
          `三皇子必须以皇子礼向新后行礼。他跪下时，张元照没有退，也没有多看他。礼成以后只说：“殿下起。”这四个字比任何旧账都更公开。`,
          `大公主最后来。她行完礼，问：“娘娘，凤仪宫窗子以后都开这么大吗？”张元照看向那扇多年只开一半的窗：“冷的时候关。不是因为以前只开一半，所以永远只开一半。”`,
          `当夜凤仪宫第一次重新亮到子时。桌上摊着顾明宜留下的旧册、张元照的三册法和一叠还没写字的纸。`
        ]:[
          `册后大典那日，邵明贞没有戴顾明宜旧日的凤钗。她用的是新制冠饰，只有太后看见时停了一眼。`,
          `受凤印以后，她先向太后行礼，再回身受六宫礼。张元照站在后列，礼数没有少一分。轮到她时，邵明贞没有说“免礼”，等完整一礼做完才叫起。`,
          `和妃送一壶新茶。珍妃送一套空白双册。张元照送的是时疫后整理好的病籍、往来、复值三册副本，封面没有写自己的名字。`,
          `三皇子行礼最重。他从小认识邵明贞，小时候甚至叫过她“姨母”。如今礼官唱的是“皇后娘娘”。他伏下去时明显停了一息。邵明贞没有替他减礼。`,
          `大公主来得最晚。她站在顾明宜从前常站的位置旁边，看了一会儿才行礼。邵明贞没有去拉她，只等她把礼做完。`,
          `礼散以后，邵明贞把凤仪宫库房重新点了一遍。顾明宜留下的旧册仍归原架，张元照那三册另开一格。她没有烧任何旧东西，也没有把所有新东西都收进来。`
        ];
      },choices:[{label:'看凤仪宫重新点灯',effects:{flags:{v50CoronationSeen:true}},result:'凤仪宫的门重新关上。尚宫捧着新册进去，旧册仍放在西侧书架上。'}]};
      vacancy.steps.splice(i+1,0,coronation);
      vacancy.v50Coronation=true;
    }
  }

  // ---------- 六、把十二年的衰败写成快叙：几个月很快过去，但每个月都少一点“追问”。 ----------
  const night=CH('长夜未央');
  if(night && !night.v50FastDecay){
    const anchor=night.steps.findIndex(st=>(st.heading||'').includes('夜宴里的人越来越年轻'));
    if(anchor>=0){
      night.steps.splice(anchor,0,{heading:'承熙十二年二月至五月 · 四个月很快过去',cast:['peiyan','taihou','shen'],fx:'candle',narrative:true,text:s=>[
        `<div class="v50-fast"><em>二月</em>　顾明宜百日未过，养心殿仍不设大宴。夜里最常听见的是翻折子的声音。裴景和说旧伤阴雨天又疼，我只叫人多添一壶热酒。</div>`,
        `<div class="v50-fast"><em>三月</em>　第一次小宴恢复。原定二更散，最后拖到子时。席上有人弹错一个音，我听见了，没有像年轻时那样抬头，只说“继续”。</div>`,
        `<div class="v50-fast"><em>四月</em>　召幸次数开始增加。不是因为突然爱上谁，只因为夜里有人说话，屋子便不会像凤仪宫停灵那几日那么静。</div>`,
        `<div class="v50-fast"><em>五月</em>　一份河工折子写得很长。我看到第三页便批“照旧”。朱笔落下时，我其实想起了沈氏旧案，却仍没有把第三页翻回去。</div>`,
        `变化没有发生在某一夜。它只是一次比一次更容易：少看一页、少问一句、晚散一更、再添一杯。到了夏天，身边的人才慢慢意识到，这些小事已经连成了一种新的日子。`
      ],choices:[{label:'继续',effects:{flags:{v50DecayMontage:true}},result:''}]});
      night.v50FastDecay=true;
    }
  }

  // 大事录只记重场的史书层，不记“节奏设计”。
  try{
    if(typeof historyRecordV38==='function'){
      const oldHist50=historyRecordV38;
      historyRecordV38=function(e,i){
        const t=e?.title||'';
        if(t==='宫灯渐繁'&&state.flags?.v50MidAutumnPolicy)return '承熙三年，中秋宗宴，上申禁以皇嗣形貌议祥妖；四年后宫有皇女诞。';
        if(t==='旧茶未凉'&&state.flags?.v50ShenArchive==='public')return '承熙九年，昭雪沈氏旧案。上自书昔年批红之失，附卷存之。';
        if(t==='长枝渐高'&&state.flags?.v50PrinceRecord==='formal')return '承熙十三年，三皇子失仪，诫之，事入东所日记。';
        return oldHist50(e,i);
      };
    }
  }catch(_e){}

  state.flags.v50Build=true;
  try{save()}catch(_e){}
  try{render()}catch(_e){}
}catch(e){console.error('v50 pacing/setpieces patch failed',e)}})();
