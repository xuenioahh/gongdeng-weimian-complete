(()=>{try{
  document.documentElement.dataset.build='v113';
  document.title='宫灯未眠 · 闻人蘅、抱朴、含章全局人设梳理润色 v113';
  const CH=t=>(CHAPTERS||[]).find(x=>x.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x?.heading||'').includes(q));
  const ANY=q=>{for(const c of CHAPTERS||[]){const s=ST(c,q);if(s)return s}return null};
  const AS=(v,s)=>{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]};
  const wrap=(st,tag,fn)=>{if(!st||st[tag])return;const old=st.text;st.text=s=>fn(AS(old,s).map(String),s);st[tag]=true};
  const append=(st,tag,fn)=>wrap(st,tag,(a,s)=>[...a,...fn(s)]);
  const prepend=(st,tag,fn)=>wrap(st,tag,(a,s)=>[...fn(s),...a]);
  const insertAfter=(ch,q,obj,tag)=>{if(!ch?.steps||ch.steps.some(x=>x?.[tag]))return;const i=ch.steps.findIndex(x=>String(x?.heading||'').includes(q));if(i<0)return;obj[tag]=true;ch.steps.splice(i+1,0,obj)};

  // 1) 初见：三个女人不是“端庄母亲 / 热烈姐姐 / 冷淡妹妹”的三张功能卡。
  const mother=CH('母至');
  append(ST(mother,'宫门打开'),'__v113WenrenArrival',s=>[
    `闻人蘅后来私下对太后说，进宫那一刻她先看见的其实不是两个女儿长高了多少，而是两个人已经学会了两套完全不同的活法：抱朴还是先往前走，含章还是先站到所有人的视线之外。`,
    `她没有说哪一种更好。亡国以后，她已经不太相信世上有一种活法可以保证不失去。`
  ]);

  // 2) 母女第一次真正吵开：闻人蘅承认“会算”不是天性，而是做王后多年形成的生存方式。
  append(ANY('银簪落在茶盏旁'),'__v113WenhengOwnMethod',s=>[
    `闻人蘅把手从银簪上放下来，过了一会儿才道：“我也一样。做王后久了，看见一件事便先算它能保住谁、会牵出谁。国没了，这毛病没跟着没。”`,
    `抱朴问：“所以母亲看我们，也先算？”`,
    `闻人蘅没有说不是：“有时会。”`,
    `这回答比“母亲都是为你们好”难听得多。三个人却第一次不用猜她心里有没有另一张算盘。`
  ]);

  // 3) 闻人蘅：旧香不是阴谋。她真正教给抱朴的是“别让自己成为最容易被替掉的人”。
  wrap(ANY('那匣香本来只是她母亲教她留住自己的办法'),'__v113WenhengIncense',(a,s)=>{
    const i=a.findIndex(x=>x.includes('我教你别被替掉'));
    if(i>=0)a.splice(i+1,0,
      `她说这句话时没有看御座。蘅国宫破以后，最先被裁掉的不是最有罪的人，而是“暂时用不上”的旧宫人、女官和旁支亲眷。闻人蘅把那几年记得太清楚，于是越来越相信：一个人若没有任何不可替代之处，就会先从名单上消失。`,
      `这套道理曾帮她保住过一些人，也会慢慢把女儿逼进“必须一直有用”的窄路。`
    );
    return a;
  });

  // 4) 抱朴：艳色与热闹首先是她真的喜欢，不是从第一天起就为了取悦谁。
  append(ANY('承熙三年的春帘'),'__v113BaopuRealJoy',s=>[
    `${courtTitle(s,'baopu')}把海棠搬到日头下以后，又叫人把一幅灰青帐子撤掉。宫女问换什么颜色，她想也没想：“红的。”`,
    `${courtTitle(s,'hanzhang')}在窗边道：“又是红的。”`,
    `“蘅都最后那半年到处都是灰。”她把手上的尘拍掉，“我现在看够了。”`,
    `这句话并不是说给谁听。她喜欢亮色、酸味、热闹和别人笑起来的声音，本来都是真的。后来她开始连这些喜好也拿来算：穿什么、说什么，才更容易让别人喜欢她。`
  ]);

  // 5) 《承露录》：不是一个假人学习媚术，而是一个真人开始把自己的真实性也拿去量化。
  append(ANY('《承露录》不是情书'),'__v113BaopuLedger',s=>[
    `册子里其实也夹着几条完全没有用处的东西：“讨厌沉香太闷”“酸汤要多一勺醋”“海棠红比朱红好看”。前几页写得很随意，后面却越来越少。`,
    `到最后，连她自己喜欢什么，都要先在旁边补一句——“陛下是否喜欢”。`,
    `她不是从来没有自己。恰恰相反，她是把原本很鲜明的自己，一点点训练成了可以重复奏效的办法。`
  ]);

  // 6) 含章：马车旧事解释她为什么不等别人选择，也解释她为何总显得“不需要”。
  append(ANY('马车只有一个位置'),'__v113HanzhangCarriage',s=>[
    `我问：“所以后来你什么都不争？”`,
    `${courtTitle(s,'hanzhang')}摇头：“不是不想要。”`,
    `“那是什么？”`,
    `“不等别人先说给不给。”`,
    `她说得很平。那辆马车只够一个人的晚上，她学到的并不是“我不重要”，而是“如果我站着等谁回头，可能真的会被留在那里”。`,
    `这套办法让她活了下来。也让后来很多人理所当然地以为，她总能自己走，不需要谁特意回头。`
  ]);

  // 7) 行刺前：含章的边界第一次显出代价。她问过，却太快接受了姐姐的“没事”。
  const blade=CH('刃落宫门');
  insertAfter(blade,'九月二十七 · 昭氏忽然什么都不要了',{
    heading:'九月二十九 · 含章在姐姐门外多站了一会儿',cast:['baopu','hanzhang'],fx:'candle',narrative:true,text:s=>[
      `九月二十九夜，含章去还一卷旧册，路过昭氏门前时又折回来。`,
      `昭氏正自己缝那件深绛衣裳。针脚很细，桌上没有《承露录》，也没有牌匣。`,
      `含章站在门口问：“姐姐，你是不是要做什么？”`,
      `昭氏没有抬头：“缝衣裳。”`,
      `“我不是问这个。”`,
      `针在布里停了一瞬。昭氏抬眼笑：“没有。”`,
      `含章没有进去搜她的袖子，也没有叫宫人盯着她。她在门边又站了一会儿，只道：“那我走了。”`,
      `“嗯。”`,
      `她走到廊角时其实回过一次头。门还开着，昭氏低头继续缝，像所有事情都只是她多心。`,
      `含章一向相信：别人说“不想说”，便不该强迫；别人说“没有”，便不能因为自己不安就把对方当犯人。她没有错在不搜姐姐的屋子。只是那一夜，她还可以不走，再陪姐姐坐一会儿。`
    ],choices:[{label:'继续',effects:{trust:{hanzhang:1},flags:{v113HanzhangAskedBaopu:true}},result:''}]
  },'__v113HanzhangBeforeBlade');

  // 8) 行刺后：不把含章写成“早该看出来”。她真正改变的是允许自己继续靠近，而非改成控制别人。
  append(ST(blade,'三天里，养心殿闻起来只有药味'),'__v113HanzhangAfterBlade',s=>[
    s.flags?.v113HanzhangAskedBaopu
      ? `第四日，她忽然说：“臣行刺前问过姐姐一次。她说没有。”`
      : `第四日，她忽然说：“臣那几日看见她安静下来，却没有再问。”`,
    `我没有说“你早该知道”。一把藏在袖里的刀，不会因为妹妹足够敏锐就自动变成她的责任。`,
    `${courtTitle(s,'hanzhang')}自己却道：“我总觉得，不替别人决定，就是退到她说够了的地方。”`,
    `她低头看缠着白布的右臂：“以后我还是不会替人搜袖子。可若我想留下，我会直接说我想留下。”`,
    `她没有因此开始逼别人开口。她只是第一次觉得，自己也可以选择留下来。`
  ]);

  // 9) 抱朴最后的选择：解释她为什么走到极端，但不把行刺写成“终于做自己”的浪漫胜利。
  append(ST(blade,'若她还活着，终于有最后一场问话'),'__v113BaopuFinal',s=>[
    s.flags?.baopuPunishment==='prison'
      ? `她说“这是我自己选的”时没有抬头求宽恕。自己选择一件事，只说明责任终于没法再推给母亲、孩子、恩宠或失宠；并不让这把刀因此变得正当。`
      : `昭氏最后半年留下的纸越来越少。能解释她为什么走到这里的线很多，却没有一条能把行刺写成理所当然。她真正夺回来的只有一件事：这一次，责任不能再由别人替她承担。`
  ]);

  // 10) 闻人蘅的终局：死亡是她最终没能卸下“最后牌位”；活着的路线则真的开始练习只做一个人。
  append(ST(blade,'二十三日以后，蘅嫔还要不要继续做蘅嫔'),'__v113WenhengFinalChoice',s=>[
    `她说完以后很久没有碰桌上的银簪。做王后时，她习惯每失去一样东西，立刻算下一样还能保什么；国亡以后也是如此。抱朴死后，她第一次发现桌上没有下一枚可以继续往前推的棋子。`,
    `如果她仍留在原来的身份里，她很可能会把“闻人蘅”与“蘅国最后一块牌位”继续绑死。若让她退开，活下来本身也会成为一件她从前不太会做的事——不代表谁，不保谁，只过自己的下一天。`
  ]);
  append(ST(blade,'余烬'),'__v113WenhengBranchAfter',s=>{
    const f=s.flags||{};
    if(f.wenhengFate==='west')return[
      `三个月后，含章去西苑。闻人蘅没有问御前最近查什么，也没有问蘅地还有谁来信，只嫌院里梨太硬，让她下回带一把小刀。`,
      `含章临走时才发现，桌上那支旧银簪已经三日没擦。不是不要了，只是不再需要每天把它擦得像一面旗。`
    ];
    if(f.wenhengFate==='return')return[
      `闻人蘅回蘅地后的第一封家书很短。写雨下了几日、旧陵边的杏树活了两株，还抱怨当地茶太涩。`,
      `整封信没有一句“你应该”，也没有一个要含章替她打听的人名。含章把信看了两遍，最后折进自己的棋谱。`
    ];
    if(f.wenhengFate==='dead')return[
      `含章后来没有把母亲的死解释成殉国，也没有解释成赎罪。闻人蘅最后仍没能把“自己活着”与“必须代表已经失去的一切”分开。那是她的选择，也是她最终没有走出去的地方。`
    ];
    return[];
  });

  // 11) 含章离开“闻人家功能位”以后，允许自己提出一个没有用途的要求。
  append(ANY('珍妃开始自己吃那包蜜饯'),'__v113HanzhangOrdinaryWant',s=>[
    `那日晚些时候她又来了一趟，没有带案册。`,
    `我问：“有事？”`,
    `她把棋盘摆开：“有。臣今天不想查东西。”`,
    `“那来做什么？”`,
    `“下一盘棋。”`,
    `这大概是她入宫以后第一次把一句“我想要”说得没有任何政治用途。棋下到一半，她甚至嫌我落子太慢。`
  ]);

  // 12) 三人动态人物卡：同一家人，三条不同的人生逻辑。
  function syncWenren(s=state){
    const f=s.flags||{};
    const wh=PEOPLE?.wenheng, bp=PEOPLE?.baopu, hz=PEOPLE?.hanzhang;
    if(wh){
      wh.signature='说话前常先问“这件事能保住谁”；真正累时会摘下银簪，让松掉的白发留一会儿。';
      if(f.wenhengFate==='dead'||f.wenhengDead){
        wh.tags=['故蘅嫔','母亲也是旧后','没能卸下最后牌位'];
        wh.bio='闻人蘅做过一国王后，也一直是两个女儿的母亲。她的爱从来不是假的，只是她太习惯把爱与安全、血缘、名位和旧国余脉一起计算。她曾真心想让女儿活得稳，却也把“必须有用”教给抱朴、把“你最懂事”留给含章。抱朴死后，她最终没能把自己与“蘅国最后的牌位”分开；她的死不是纯粹殉国，也不能替她对女儿造成的伤害结账。';
      }else if(f.wenhengFate==='west'||f.wenhengFate==='return'){
        wh.tags=['亡国旧后','停止替女儿安排','学着只做闻人蘅'];
        wh.bio='她做王后太久，亡国以后仍习惯把每一段关系先算成安全与筹码。抱朴之死让这套办法彻底破产。若她选择退居或返乡，余生最大的变化不是忘掉蘅国，而是第一次允许自己不代表任何人、不替含章安排下一步，只保留银簪、旧书与很普通的一日三餐。';
      }else if(f.baopuDead||f.baopuAttemptedRegicide){
        wh.tags=['蘅嫔','失去长女','算盘第一次失效'];
        wh.bio='她曾把女儿的名位、恩宠和孩子都同时看作母爱与安全的一部分。抱朴走到行刺以后，她终于没有下一步可算：不是再替旧人换一条路，也不是再叫含章接过姐姐的位置。她必须面对自己最不愿承认的事——真心为女儿好，也可能把女儿训练成只能用“有用”证明自己的人。';
      }else if(f.wenhengPushesHeir||f.hengNetworkSeeded){
        wh.tags=['蘅嫔','母爱与政治同算','怕人被替掉'];
        wh.bio='亡国以后，她仍在接旧人名单、算女儿的名位，也真心记得两个女儿怕冷、旧伤和口味。她最大的矛盾是从来不会把“母亲”和“旧后”分开：她希望女儿幸福，也希望女儿的恩宠、孩子与位置能替一家人多留一点安全。她不是没有母爱，而是太习惯把爱也做成一份应急预案。';
      }else{
        wh.tags=['蘅国旧后','母亲','习惯先算后果'];
        wh.bio='亡国后随使团入京。她礼数严整，却不是一尊只会怀念旧国的牌位；她会挑女儿衣色、记旧伤，也会下意识把每件事先换算成“能保住谁”。做王后多年形成的习惯没有随着亡国消失。她爱两个女儿，但已经很难把爱与政治完全分开。';
      }
    }
    if(bp){
      bp.signature='喜欢艳色、酸味和热闹；不安时笑得更响，真正慌时会在袖中抠指甲边缘。';
      if(f.baopuDead||f.baopuAttemptedRegicide){
        bp.tags=['故昭氏','怕被忘记','最后责任归自己'];
        bp.bio='闻人抱朴本来就真心喜欢亮色、热闹和被人看见。亡国、母亲的教导与后宫规则让她逐渐把“被看见”与“被选择、被需要、不会被丢下”绑成一件事；《承露录》甚至把原本真实的喜好也改成了讨好技巧。失子、失宠与妹妹获得另一种信任后，她最终用行刺强迫所有人看见自己。这解释她如何走到那里，却不使那把刀正当；最后能真正属于她的，只剩责任。';
      }else if(f.baopuLostChild||f.baopuBreaks||f.baopuSeesTrustGap){
        bp.tags=['昭氏','越亮越怕被忘','把价值绑在有用上'];
        bp.bio='她的明艳并非全是表演。她爱红衣、酸汤、海棠和满屋子的笑声；只是这些年，她越来越把“我喜欢什么”改写成“什么能让陛下喜欢我”。失子以后，她又把孩子、位分和被需要绑在一起。她越来越相信，若皇帝不再选她、孩子也没留下，自己就什么都不是了。';
      }else if(f.sawChenglu||f.wenhengPushesHeir){
        bp.tags=['昭氏','要被看见','把喜欢练成功课'];
        bp.bio='她从不掩饰自己喜欢艳色、热闹与赞美。《承露录》却让这些天性逐渐变成一门可训练的功课：什么时候说话、穿什么颜色、怎样不被忘记。母亲又教她把恩宠换成孩子与位置。她仍然鲜活，只是越来越难分清“这是我喜欢”与“这样别人会喜欢我”。';
      }else{
        bp.tags=['蘅国长女','明艳','真心爱热闹'];
        bp.bio='闻人抱朴笑声不小、衣色明亮，喜欢酸味、珠钗、灯火和人多的地方。她本来就爱热闹，不是为了讨好谁才穿得鲜亮。亡国以后，她越来越怕被人忘在一边，于是慢慢把“有人看我”当成了“我还有用”。';
      }
    }
    if(hz){
      hz.signature='真正紧张或生气时会把袖口抚平；回答问题时会分清“亲眼看见”“推测”“不知道”。';
      if(f.baopuDead||f.wenhengFate||f.wenhengDead){
        hz.tags=['珍氏','自己选位置','开始允许自己靠近'];
        hz.bio='城破时她曾被留在只够姐姐上车的火场里，从此很少等别人先选自己。她靠边界、事实和“只说自己知道的”活下来，也因此常让人误以为她不需要谁。姐姐行刺以后，她没有把敏锐变成监视别人的理由；真正改变的是，她开始承认自己也可以问第二遍、可以留下、可以提出一个没有用处的愿望。她仍不替别人作主，也开始允许自己开口求陪伴、求帮助。';
      }else if(f.hanzhangAlliance||f.hanzhangChoiceExplicit||f.hanzhangRecordsAccess){
        hz.tags=['珍氏','只说知道的','不替谁活'];
        hz.bio='她不靠侍寝证明亲近，也不把沉默当忠诚。母亲要她替姐姐记路、姐姐要她替自己查人时，她最终把两边的纸都送进御前，只说“陛下自己看”。她最看重本人意愿和知道多少就说多少；她的盲点则是太习惯退到别人说“够了”的地方，容易把自己的需要也一起藏掉。';
      }else if(f.hanzhangPastKnown||f.hanzhangMotiveBuilt){
        hz.tags=['蘅国次女','不等人选择','把需要藏得很深'];
        hz.bio='城破时唯一的马车位置先给了姐姐，她靠自己沿宫墙追出来。那以后，她很少等别人决定给不给，也很少主动要求什么。她并非无欲无求；只是“先自己走”已经成了本能。这个本能使她可靠、清醒，也让母亲和姐姐越来越容易忘记，她同样会害怕、嫉妒、想被留下。';
      }else{
        hz.tags=['蘅国次女','少饰','先听完再答'];
        hz.bio='闻人含章衣饰素、话少，习惯先把一句话听完再答。她不是比姐姐更“懂事”，也不是天然没有欲望；她只是很早学会不等别人替自己安排位置。越是重要的事，她越会把需要收得很小，这让她看起来比实际更不需要被照顾。';
      }
    }
  }
  syncWenren(state);

  // 同步人物志的“早/晚期观察”，避免旧层继续把三人压成三个标签。
  try{
    if(typeof CHARACTER_LAYERS!=='undefined'){
      CHARACTER_LAYERS.wenheng={early:'闻人蘅爱女儿，也算女儿。她做王后多年形成的本能，是看见一件事先问它能保住谁；亡国以后，这份能力既替旧人留过生路，也让她越来越难把母爱与政治分开。',late:'抱朴之死让她第一次没有下一枚棋子可推。若她活下去，真正困难的是学习不代表旧国、不安排含章，只做闻人蘅；若她选择死亡，则说明她最终没能把自己与“最后牌位”分开。'};
      CHARACTER_LAYERS.baopu={early:'抱朴的明艳首先是真的：她爱红衣、酸味、灯火和人多的地方。后来《承露录》才把这些真实喜好一点点训练成“怎样不被忘记”的办法。',late:'失子、失宠与含章获得另一种信任以后，她越来越把“没有被选择”理解成“自己已经没有价值”。行刺是她的责任，不是她终于自由；它只是她把最后一种能强迫所有人看见她的方式推到了极端。'};
      CHARACTER_LAYERS.hanzhang={early:'含章不是无欲无求。城破时没有等到马车回头，使她很早学会“不要等别人先选我”。她因此边界清楚、少求助，也常被误认成永远不需要人。',late:'她后来仍不替别人做不知道后果的决定，却开始明白尊重边界不等于只能退开。她可以问第二遍、可以留下，也可以说自己想下一盘没有用途的棋。'};
    }
  }catch(_e){}

  try{
    if(typeof CLASSIC!=='undefined'){
      CLASSIC.wenheng='“先算一个孩子。等他活下来，再让你们这些人算别的。”';
      CLASSIC.baopu='“臣妾总不能靠天赋吃一辈子。”';
      CLASSIC.hanzhang='“这盘棋，是我自己坐的。”';
    }
  }catch(_e){}

  // 人物页与渲染最终覆盖层。
  if(typeof peopleView==='function'&&!globalThis.__v113People){
    globalThis.__v113People=true;const oldPeople113=peopleView;
    peopleView=function(){
      syncWenren(state);let h=String(oldPeople113());syncWenren(state);
      try{
        const box=document.createElement('div');box.innerHTML=h;
        for(const k of ['wenheng','baopu','hanzhang']){
          const card=box.querySelector(`[data-person="${k}"]`);if(!card)continue;
          const tags=card.querySelector('.tags');if(tags)tags.innerHTML=(PEOPLE[k].tags||[]).map(x=>`<span>${esc(x)}</span>`).join('');
          const ps=[...card.querySelectorAll('p')];const bio=ps.find(x=>!x.classList.contains('meta')&&!x.classList.contains('v52-observation'));if(bio)bio.textContent=PEOPLE[k].bio||'';
        }
        h=box.innerHTML;
      }catch(_e){}
      return h;
    };
  }
  const oldApply113=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldApply113&&!globalThis.__v113Apply){globalThis.__v113Apply=true;applyChoiceEffects=function(c){const r=oldApply113(c);syncWenren(state);return r;};}
  const oldRender113=render;
  render=function(){syncWenren(state);const r=oldRender113();syncWenren(state);try{if(state.view==='people'&&typeof peopleView==='function'){const appEl=document.getElementById('app');if(appEl)appEl.innerHTML=peopleView();}}catch(_e){}document.documentElement.dataset.build='v113';document.title='宫灯未眠 · 闻人蘅、抱朴、含章全局人设梳理润色 v113';return r;};

  state.flags=state.flags||{};state.flags.v113WenrenPolish=true;
  document.documentElement.dataset.build='v113';document.title='宫灯未眠 · 闻人蘅、抱朴、含章全局人设梳理润色 v113';
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v113 wenren family character polish failed',e)}})();
