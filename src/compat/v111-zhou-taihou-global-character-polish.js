(()=>{try{
  if(globalThis.__v111ZhouTaihouPolish)return;globalThis.__v111ZhouTaihouPolish=true;
  const A=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c?.title===t);
  const ST=(ch,q)=>(ch?.steps||[]).find(st=>String(st?.heading||'').includes(q));
  const ANY=q=>{for(const c of (CHAPTERS||[])){const st=ST(c,q);if(st)return st}return null};
  const esc=x=>String(x??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
  function wrap(st,key,fn){if(!st)return;if(st.text&&st.text[key])return;const old=st.text;const f=s=>fn(A(old,s),s);f[key]=true;st.text=f;}
  function append(st,key,fn){wrap(st,key,(a,s)=>[...a,...A(fn,s)]);}
  function beforeNeedle(st,key,needle,fn){wrap(st,key,(a,s)=>{if(a.some(x=>String(x).includes('__never__')))return a;const add=A(fn,s);if(add.some(l=>a.some(x=>String(x).includes(String(l).slice(0,34)))))return a;const i=a.findIndex(x=>String(x).includes(needle));if(i>=0)a.splice(i,0,...add);else a.push(...add);return a;});}

  // ===== 周清漪：懂得何时开口；一生最大的错，也来自把“再等等”用得太熟 =====
  append(ST(CH('宫门初定'),'正月里的人情'),'__v111ZhouTiming',s=>[
    `席上有人夸周清漪最会说话。她回去以后却对宫女道：“会说不难。难的是知道哪一句现在说，只会让人更想反着做。”`,
    `她在潜邸就习惯先看一圈再开口：谁正在气头上，谁其实只想要个台阶，谁已经决定了却还要别人先说。久而久之，旁人都觉得她圆融。只有她自己知道，很多时候她不是没意见，只是在等一句话最有用的时辰。`
  ]);

  append(ANY('绮春宫报双生'),'__v111ZhouMotherBeforeSymbol',s=>[
    `周清漪醒过来以后第一句没有问吉凶，也没有问男女，只问两个孩子是不是都在喘气。`,
    `等钦天监的人在外头说起“异相”，她才第一次真正发了脾气：“孩子刚学会哭，你们倒已经替他把一辈子说完了。”`
  ]);

  append(ANY('绮春宫先改掉两个字'),'__v111ZhouRecordMotive',s=>[
    `她从此越来越在意“最后留下来的那句话”，不是因为她相信纸比人重要，而是因为她亲眼看见过：一个孩子甚至还不会抬头，纸上已经先有了“不祥”“异相”“未育”。`,
    `她学会把能删的恶意先删掉，也因此越来越相信——有些话若再等等，等到更稳、更准的时候说，也许就能少伤一个人。`
  ]);

  // 五月看见陆既明：此时沉默仍有合理性——她怕自己重复十八年前“凭异相先定人”的错误。
  append(ANY('周清漪在慈宁宫外多看了一眼'),'__v111ZhouMayReason',s=>[
    `回宫以后，她几次走到门边，又折回来。十八年前所有人都因为一只眼睛、一只手替一个孩子定过命；如今若只因为眉尾、手套和一种熟悉感便去御前说“像”，她又会成为同一种人。`,
    `她告诉自己：等证据。这个念头在五月并不卑劣，甚至很像她一贯的谨慎。真正危险的是，后来证据真的来了，她仍然沿用了同一句“再等等”。`
  ]);

  append(ANY('那块旧布把五月的疑心压实了'),'__v111ZhouClothChoice',s=>[
    `这一夜她已经不是没有证据。她真正怕的是另一件事：一旦把布送进养心殿，十八年前那道死令、二公主的身世、皇帝的旧旨和整座绮春宫都会重新被打开。`,
    `她坐在箱前想了很久，最后仍对自己说：“再查清一点。”这句话过去救过她许多次——让她免于冲动、免于站错边、免于把猜测当事实。也是从这一夜起，它第一次变成了逃避。`
  ]);

  append(ANY('二公主把终身先许了出去'),'__v111ZhouDaughterThreshold',s=>[
    `等女儿亲口说“我想嫁他”，周清漪已经没有资格再把沉默叫谨慎。`,
    `她那晚几乎开口。可她看见二公主难得真正高兴，又想起自己刚生产时满屋人只顾讨论另一个孩子“该不该活”。她忽然生出一种极软弱的愿望：至少让女儿再高兴一夜。`,
    `一夜之后还有下一夜。她最擅长等待合适时机，到这里终于等成了没有时机。`
  ]);

  // 自尽纸条不只写“我没说”，而是承认自己的方法论在最后三次全错了。
  wrap(ANY('他自己把西华门那一夜送到御前'),'__v111ZhouFinalNote',(a,s)=>{
    return a.map(line=>{
      let z=String(line);
      z=z.replace(/纸上写着：<b>“五月我见过他。秋天又收到那块布。我没有说。”<\/b>/,
        '纸上写着：<b>“五月我见过他，秋天收到旧布，腊月她告诉我想嫁他。我总想着等更确定、等更稳妥，再说便能少伤一个人。最后三次，都等错了。”</b>');
      z=z.replace(/周清漪留下了一张纸后自尽：<b>“五月我见过他。秋天收到旧布。腊月她告诉我想嫁他。我还是没有说。”<\/b>/,
        '周清漪留下了一张纸后自尽：<b>“五月我见过他，秋天收到旧布，腊月她告诉我想嫁他。我总想着等更确定、等更稳妥，再说便能少伤一个人。最后三次，都等错了。”</b>');
      return z;
    });
  });

  append(ANY('西华门还在那里'),'__v111ZhouNoMartyr',s=>[
    `后来礼部有人想在周清漪身后用“慈母痛悔”四个字收束。我没有准。她前半生护孩子是真的，最后隐瞒线索也是真的；她不是用一死把前一件事证明得更真，也不能用一死把后一件事抵掉。`,
    `绮春宫那只青豆后来仍会叫“都好”。宫人第一次听见时都沉默了一下。真正活过十九年以后，谁都知道很多事从来没有“都好”。`
  ]);

  // ===== 邵令仪：承认偏爱，并不断约束“偏爱变成权力”；盲点是有时收手太早 =====
  append(ST(CH('宫门初定'),'家宴散后'),'__v111TaihouConcreteCare',s=>[
    `太后很少问“你们相处得如何”这种大话。她更常问顾明宜脚疼不疼，问沈知微夜里还喝不喝浓茶，问周清漪产后腰痛有没有好。她关心一个人，先记的是身体和日常。`,
    `可她也从不假装自己一视同仁。顾明宜是她看着长大的儿媳，邵明贞是亲侄女，自己的儿子与孙辈更不必说。她真正谨慎的从来不是“不能偏心”，而是不能让这份偏心自动变成一道旨意。`
  ]);

  append(ANY('两位母亲看梅'),'__v111TaihouMotherMirror',s=>[
    `闻人蘅走后，太后看着空了的梅树下座位，忽然道：“做母亲最容易犯的毛病，是觉得自己多活二十年，就替孩子多懂二十年。”`,
    `我问：“母后也会？”`,
    `她把手炉往怀里拢了拢：“哀家会。所以有些话说到一半，得记得停。”`,
    `很多年以后我才知道，停得住是一种本事；停得太早，也一样会留下事。`
  ]);

  // 顾后死时：她的克制不是无情，是不愿用自己的悲恸占掉死者最后的空间。
  append(ANY('凤仪宫最后一页'),'__v111TaihouGuLove',s=>[
    `太后坐在床边一直没有哭。顾明宜年轻时第一次进潜邸，她替她扶过一次太重的发冠；后来做了皇后，太后便很少再碰她的头发。那天她又伸手，把额边一缕汗湿的碎发慢慢理开。`,
    `她没有说“你放心”，也没有说“还有阿宁”。顾明宜这一生最累的就是别人总把下一件事提前放到她面前。太后到最后只问：“还疼不疼？”`
  ]);

  // 偏心自律已有好场景，再补一句使它落到她自己的经验，而不是作者判断。
  append(ANY('太后亲手删掉侄女册页上的一个理由'),'__v111TaihouBiasOwns',s=>[
    `邵明贞等人都退下以后，她自己又看了一遍被删掉的那行。`,
    `“哀家疼她，当然算一件真的事。”她对贴身嬷嬷道，“可真的事，不是什么时候都能拿来当理由。”`
  ]);

  // 她看出皇帝衰退，却只点到为止：把这个也记成她自己的局限。
  append(ANY('太后问我今年到底睡过几个整夜'),'__v111TaihouStepsBack',s=>[
    `我走以后，邵明贞问她：“姑母既看出来了，为什么不再劝一句？”`,
    `太后把已经凉掉的鱼汤推开：“他做皇帝以后，哀家最怕的就是仗着母亲两个字，把每一句担心都说成他必须听的道理。”`,
    `她停了一会儿：“只是有时候，退一步也会退早了。”`,
    `那天她没有追到养心殿。晚上的乐声仍响到了很迟。`
  ]);

  append(ANY('凤仪宫重新开门'),'__v111TaihouEmpressChoice',s=>[
    `她那句“余下的，皇帝自己定”并不等于她心里没有人选。邵明贞是亲侄女，也是她最熟悉、最放心的人之一；张元照身上则有太多她不懂的东西。`,
    `正因为如此，她没有说“哀家不偏谁”。她只是把自己的偏心留在慈宁宫，没有把它送到御案上。`
  ]);

  append(ANY('太后把最后一句话留在御案'),'__v111TaihouLastPoliticalLesson',s=>[
    `临走前她又回头看了一眼那两份拟册：“哀家不是没有想选的人。就是因为有，才不能替你写。”`,
    `“做母亲可以盼儿子选一个自己放心的。做太后若把这个盼写成旨意，往后所有人都会说那是天下最稳妥的答案。”`,
    `她说完才真正出了门。`
  ]);

  // 临终不写成完美遗训，只承认自己“有几次退早了”。
  wrap(ANY('慈宁宫的手炉没有再添炭'),'__v111TaihouDeath',(a,s)=>{
    if(a.some(x=>String(x).includes('有几次，哀家其实退早了')))return a;
    const block=[
      `前一日下午她难得醒得久。我替她把手炉往近处挪，她忽然道：“你小时候摔了，哀家总叫你自己起来。”`,
      `“儿子记得。”`,
      `“那时觉得这是教你。后来才知道，有几次你只是想让母亲伸一下手。”`,
      `我没有接话。`,
      `她也没有把这句话说成遗训，只闭了一会儿眼：“哀家这一辈子最得意的是知道什么时候不替你做主。有几次，哀家其实退早了。”`,
      `“哪些？”`,
      `她摇头：“都到这个时候了，还让哀家替你列单子？”`
    ];
    const i=a.findIndex(x=>String(x).includes('那天傍晚我临走'));
    if(i>=0)a.splice(i,0,...block);else a.push(...block);return a;
  });

  // ===== 人物卡阶段同步 =====
  function syncZhou(s=state){
    const p=PEOPLE?.zhou;if(!p)return;const f=s.flags||{};
    p.signature='先看一圈再开口；紧张时会把帕子多折一遍，真正拿不准时反而笑得更周全。';
    if(f.v69HiddenPrinceRevealed||f.v69LateArcComplete){
      p.tags=['故周氏','识势一生','最后等错'];
      p.bio='周清漪最擅长判断一句话什么时候说才有用。承熙元年双生以后，她尤其警惕别人用“异相”“不祥”先替孩子定义一生；这种谨慎让她多年少站错一步，也让她越来越相信“再等证据、再等更稳的时候”可以少伤人。十八年后她见到陆既明、收到旧襁褓，又听见女儿说想嫁他，仍一次次选择再等。她当年救不了男婴，十八年后却已经有机会开口。她看见陆既明、收到旧襁褓，还是一次次把话压了下去，最后连二公主也被瞒在里面。';return;
    }
    if(f.v71ZhouNearlyCertain||f.v69ZhouHidClue){
      p.tags=['识势','母亲','沉默已成代价'];
      p.bio='她一生靠识势与等待合适时机活得很稳。五月的熟悉感不足为证，她选择不报仍有理由；秋天旧布到手以后，沉默却开始从谨慎变成逃避。她知道一旦开口，十八年前的双生、皇帝旧旨与女儿婚事都会一起被掀开，于是仍想“再确认一点”。';return;
    }
    if(f.v59ZhouControlsNarrative||f.twinGirlBorn){
      p.tags=['双生之母','不信吉凶话','在意最后留下的字'];
      p.bio='双生生产以后，她亲眼看着钦天监、宗室和宫人先于孩子开口，用“异相”“不祥”替一个不会说话的婴儿写命。她从此越来越少争第一句话，却越来越在意最终留进值簿、玉牒和别人记忆里的那句话。她圆融，并不是没有判断，而是相信时机本身也是判断的一部分。';return;
    }
    p.tags=['潜邸旧人','识场面','等时机'];
    p.bio='周清漪很会看场面：谁正生气、谁只是要台阶、哪句话现在说只会让人更反感。她因此显得温和圆融，也很少抢第一句话。她真正依赖的不是讨好，而是“等到一句话最有用的时候再说”；这个本领后来既护过她，也会伤到她。';
  }

  function syncTaihou(s=state){
    const p=PEOPLE?.taihou;if(!p)return;const f=s.flags||{};
    p.signature='问人先问饭食、睡眠与腿冷不冷；真正偏心时反而会停一下，不急着把那句话说完。';
    if(f.v80TaihouDead){
      p.tags=['故皇太后','偏爱不讳','有时退得太早'];
      p.bio='邵令仪一生并不以“中立”自许。她偏顾明宜，疼亲侄女邵明贞，也把儿孙看得比旁人重；她知道自己偏心，也一直提醒自己：喜欢谁是一回事，不能因此逼别人都照她的意思办。她常把最后决定留给皇帝，这让她守住了不能越过的分寸，也让她有几次在明知儿子正在下沉时只提醒一句便退。临终前她承认：她临终前承认，自己有几次怕干涉太多，反而退得太早。';return;
    }
    if(f.v59TaihouBiasDisciplined||f.empressChoiceOpened){
      p.tags=['知自己偏','不替落印','护家有边界'];
      p.bio='她从不否认自己偏爱顾明宜与邵明贞。顾后死后，亲侄女又成为最自然的继后人选，她反而更谨慎：家世可以写进家谱，不能写成功劳；她可以盼皇帝选一个自己放心的人，却不肯把这个盼变成太后的旨意。她的“知进退”不是没有立场，而是知道自己的立场一旦从慈宁宫出去，会变成权力。';return;
    }
    if(f.v46TaihouSeesDecline||f.guDead){
      p.tags=['护家','看得出衰败','提醒到门口'];
      p.bio='顾明宜死后，她仍把慈宁宫守成孩子们最常来的地方，也最早看出皇帝开始怕安静、用酒与人声拖延独处。她会直问一句，却很少追着逼第二句，因为做太后多年，她太怕把母亲的担忧变成皇帝必须服从的命令。这个自律也成为她的盲点：有时她退得太早。';return;
    }
    p.tags=['护家','有偏爱','不把偏爱写成旨意'];
    p.bio='邵令仪关心人先问饭食、药、功课和冷暖。她明显偏爱自己熟悉的人：顾明宜、亲侄女邵明贞、自己的儿孙都在其中；她并不假装公允无私。她真正自律的是，不把“哀家心疼谁”直接写成别人应该得到什么。很多关键时刻，她会把话说到门口，再把最后一笔留给皇帝。';
  }

  function syncBoth(s=state){syncZhou(s);syncTaihou(s);}
  syncBoth(state);
  const oldApply=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldApply&&!globalThis.__v111Apply){globalThis.__v111Apply=true;applyChoiceEffects=function(c){const r=oldApply(c);syncBoth(state);return r;};}

  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople&&!globalThis.__v111People){globalThis.__v111People=true;peopleView=function(){
    syncBoth(state);let h=String(oldPeople());syncBoth(state);
    try{
      const box=document.createElement('div');box.innerHTML=h;
      for(const k of ['zhou','taihou']){
        const card=box.querySelector(`[data-person="${k}"]`);if(!card)continue;
        const tags=card.querySelector('.tags');if(tags)tags.innerHTML=(PEOPLE[k].tags||[]).map(x=>`<span>${esc(x)}</span>`).join('');
        const ps=[...card.querySelectorAll('p')];const bio=ps.find(x=>!x.classList.contains('meta')&&!x.classList.contains('v52-observation'));if(bio)bio.textContent=PEOPLE[k].bio||'';
      }
      h=box.innerHTML;
    }catch(_e){}
    return h;
  };}

  const oldRender=typeof render==='function'?render:null;
  if(oldRender&&!globalThis.__v111Render){globalThis.__v111Render=true;render=function(){syncBoth(state);const r=oldRender();syncBoth(state);document.documentElement.dataset.build='v111';document.title='宫灯未眠 · 周清漪与邵令仪全局人设梳理润色 v111';return r;};}

  state.flags=state.flags||{};state.flags.v111ZhouTaihouPolish=true;
  document.documentElement.dataset.build='v111';document.title='宫灯未眠 · 周清漪与邵令仪全局人设梳理润色 v111';
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v111 zhou/taihou global character polish failed',e)}})();
