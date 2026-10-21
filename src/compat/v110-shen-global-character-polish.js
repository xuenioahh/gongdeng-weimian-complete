(()=>{try{
  if(globalThis.__v110ShenPolish)return;globalThis.__v110ShenPolish=true;
  const A=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c?.title===t);
  const ST=(ch,q)=>(ch?.steps||[]).find(st=>String(st?.heading||'').includes(q));
  const ANY=q=>{for(const c of (CHAPTERS||[])){const s=ST(c,q);if(s)return s}return null};
  const esc=x=>String(x??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
  function wrap(st,key,fn){if(!st)return;if(st.text&&st.text[key])return;const old=st.text;const f=s=>fn(A(old,s),s);f[key]=true;st.text=f;}
  function append(st,key,fn){wrap(st,key,(a,s)=>[...a,...A(fn,s)]);}
  function insertAfterLine(a,needle,lines){if(!Array.isArray(lines))lines=[lines];if(lines.some(l=>a.some(x=>String(x).includes(String(l).slice(0,28)))))return a;const i=a.findIndex(x=>String(x).includes(needle));if(i>=0)a.splice(i+1,0,...lines);else a.push(...lines);return a;}

  // 1) 开篇定根：她不是“单纯记性好”，而是本能地纠正版本差异。
  append(ST(CH('宫门初定'),'永和宫的一壶茶'),'__v110ShenEarlyMemory',s=>[
    `我随口说这味道和潜邸时那只旧茶罐一样。沈知微却摇头：“不是。那只第三年冬天裂了，这是后来重新配的。”`,
    `“差这么一点，也值得记？”`,
    `她把茶盖合上：“小事记错，只是小事。可若连先后都记反了，后来的人就会以为事情本来就是另一个样子。”`,
    `她说完便换了话题。那时我只当她记性太好。`
  ]);

  // 2) 半封信：留下的不是“旧情”，而是可核对的事实；个人问候反而被烧掉。
  wrap(ANY('永和宫只烧了半封信'),'__v110ShenHalfLetter',(a,s)=>{
    if(a.some(x=>String(x).includes('烧掉的那半张写的是问候')))return a;
    const block=[
      `后来我才知道，烧掉的那半张写的是问候和旧事；留下的半张只有三个东西：日期、营号、一个转手人的名字。`,
      `她不是舍不得把整封信烧干净。恰恰相反，最像旧情的部分先没了。她留下的是一件还没法核对、却可能有一天必须核对的事。`
    ];
    const i=a.findIndex(x=>String(x).includes('塞进旧茶罐底'));
    if(i>=0)a.splice(i+1,0,...block);else a.push(...block);return a;
  });

  // 3) 真正启案时，她先声明：要的是准确，不是一个讨她喜欢的结论。
  append(ANY('和妃终于把铜扣放到御案上'),'__v110ShenCaseStandard',s=>[
    `我问她：“若最后查出来，原案没有冤他呢？”`,
    `沈知微看着那枚铜扣：“那也照实写。”`,
    `“你查了这么多年，只求这个？”`,
    `“臣妾求的是别人在纸上写了什么，就得有人能问一句凭什么。不是一定要问出臣妾喜欢的答案。”`
  ]);

  // 4) 平反：错卷与改正后的卷同时留档。她烧的是私人信，不是历史证据。
  wrap(ST(CH('旧茶未凉'),'平反文书上没有爱情'),'__v110ShenArchive',(a,s)=>{
    if(a.some(x=>String(x).includes('旧军籍没有销毁')))return a;
    const block=[
      `她没有叫宗人府把那份旧军籍销掉。原来写着“临阵脱逃”的页仍留在前，平反文书装订在后。`,
      `顾明宜问：“不嫌看着刺眼？”`,
      `沈知微道：“留着。以后才知道这个名字为什么改过。”`,
      `她烧掉的是顺王写来的私人旧信。该进官档的错，没有因为改正了就从纸上消失。`
    ];
    const i=a.findIndex(x=>String(x).includes('火烧得很快'));
    if(i>=0)a.splice(i,0,...block);else a.push(...block);return a;
  });

  // 5) 方氏案：把“死人等十年，活人等不了三天”落实成一个实际取舍。
  append(ST(CH('听雨轩有喜'),'和妃把死人先放下'),'__v110ShenLivingFirst',s=>[
    `宗人府那张约她补签旧案的帖子还在袖里。她把“今日”改成“后日”，这两日先陪珍妃核完轮值，再回去补签。`
  ]);

  // 6) 新茶不是忘记：旧案已经有公共记录，不必再靠她本人每日守着。
  wrap(ST(CH('空宫点灯'),'第一幕 · 新茶'),'__v110ShenNewTeaMeaning',(a,s)=>{
    if(a.some(x=>String(x).includes('案卷已经在宗人府')))return a;
    const block=[
      `我问：“换了茶，算忘了？”`,
      `“不算。”她道，“案卷已经在宗人府，名字也改回去了。以前臣妾总怕自己一松手，沈家的事又会被人写回原样。现在案卷已经改正，不必天天靠臣妾守着。”`,
      `她说完又给自己续了一杯。从那以后，她仍记得沈家旧案，却不再每天靠旧茶和旧信提醒自己。`
    ];
    const i=a.findIndex(x=>String(x).includes('从那天以后'));
    if(i>=0)a.splice(i,0,...block);else a.push(...block);return a;
  });

  // 7) 她为什么擅长“磨文字”：不是天生圆滑，是见过一个词怎样杀人。
  append(ST(CH('帘后朱笔'),'和妃把一句太直的话改了三遍'),'__v110ShenWordingRoot',s=>[
    `张元照看着她改过的那句，忽然问：“娘娘为什么总知道哪个字不能先写？”`,
    `沈知微把笔尖在砚沿轻轻一刮：“因为‘擅离’两个字，曾经够一个人死十年。”`,
    `她没有再解释。她知道，证据没齐以前，问话里不能先写进“擅离”这种已经定罪的字。`
  ]);

  // 8) 私留副稿：这是她自己的错误。她知道边界，只是不断用“留一份原样”说服自己。
  wrap(ST(CH('帘后朱笔'),'一页废稿到了都察院'),'__v110ShenDraftFault',(a,s)=>{
    if(a.some(x=>String(x).includes('第一份副稿是河工问目')))return a;
    const block=[
      `第一份副稿是河工问目。有人回奏时说御前“从未这样问过”，沈知微便把废稿留下。第二份、第三份也都有各自的理由。到第十二份时，“留一张原样”已经从一次防备变成习惯。`,
      `张元照问：“你知不知道这些不能带回永和宫？”`,
      `沈知微答得很快：“知道。”`,
      `“那为什么还留？”`,
      `她沉默很久：“因为我太怕有一天又有人说——原来不是这样写的。”`,
      `我听懂了她为什么留这些副稿，也仍知道这些东西不该带回永和宫。`
    ];
    const i=a.findIndex(x=>String(x).includes('她守证据的老习惯'));
    if(i>=0)a.splice(i,0,...block);else a.push(...block);return a;
  });

  // 9) 处分之前：她先把责任从最亲近的人身上拿开，拒绝用爱情改写经手事实。
  append(ST(CH('帘后朱笔'),'雪落永和宫'),'__v110ShenOwnsDrafts',s=>{
    if(s.flags?.v44NewEmpress!=='zhangyuanzhao')return [];
    return [
      `处分纸送出西暖阁以前，沈知微只托裴景和带来一句话：“十二份都是臣妾自己留的。皇后不知道。”`,
      `张元照听完没有因此轻一点。她知道沈知微不是在替她求情，她只是要把话说清：副稿是她自己留的，张元照没有默许。`
    ];
  });

  // 10) 三种终局的共同底线：处分可以不同，记录不能替她美化。
  const doom=ST(CH('帘后朱笔'),'雪落永和宫');
  if(doom?.choices&&!doom.__v110ChoiceTruth){
    for(const c of doom.choices){
      const old=c.result;
      if(typeof c.label==='string'&&c.label.includes('赐死')){
        c.result=s=>`${typeof old==='function'?old(s):old}<br><br>她最后没有求删罪名，只又确认了一遍：“别写自尽，也别写暴病。是谁下的旨、臣妾为什么死，都照实留。”`;
      }else if(typeof c.label==='string'&&c.label.includes('封地')){
        c.result=s=>`${typeof old==='function'?old(s):old}<br><br>离京文书写的是“褫权后随皇嗣赴封”，没有改成“恩准归养”。沈知微看完才落印：“处分就是处分，不必为了好听换名字。”`;
      }else if(typeof c.label==='string'&&c.label.includes('女观')){
        c.result=s=>`${typeof old==='function'?old(s):old}<br><br>女观名册最初想写“和妃自请清修”。沈知微让人改回“奉处分出宫”。她说：“我可以接受去处，不能接受别人替我把为什么来这里写成另一个故事。”`;
      }
    }
    doom.__v110ChoiceTruth=true;
  }

  // 11) 元照线里，她之所以敢靠近，不是因为找到“懂自己的人”，而是对方肯把问题还给本人。
  append(ANY('册后礼成后的一个夜晚 · 新茶没换手法'),'__v110ShenZhangLove',s=>[
    `沈知微后来真正习惯她，并不是因为张元照懂沈家的旧事。恰恰相反，很多事张元照听完只会问：“那娘娘自己想怎样？”`,
    `这个问题在宫里很少有人问她。皇帝问证据，顺王问安不安全，旁人问旧案有没有结果。只有这句话把答案又推回她自己手里。`
  ]);

  // 12) 人物卡按阶段更新；核心一直是“版本必须准确”，而不是从记旧突然变成另一种人。
  function syncShen(s=state){
    const p=PEOPLE?.shen;if(!p)return;
    p.signature='说到真正不愿解释的地方会把茶盖合上；记日期、原话和谁先动过哪一张纸。';
    const f=s.flags||{};
    if(f.v75ShenFate==='death'){
      p.tags=['故沈氏','罪名照实','名字不改'];
      p.bio='她一生最怕的是别人替事实换一个更方便的版本。兄长旧案让她养成留原件、记先后的习惯；这习惯帮她把沈家的名字改回来，也最终让她私留十二份机务副稿，真正越过内外之界。她没有把过错推给张元照，也没有请求把自己的结局写成暴病。到最后，她仍只要求一件事：为什么死，就怎样记。';return;
    }
    if(f.v75ShenFate==='fief'){
      p.tags=['离宫','处分照实','自己选日子'];
      p.bio='沈知微因私留机务副稿被褫去御前文字权，后来随皇嗣赴封地。她接受这是处分，不把离宫包装成恩典；顺王再想替她安排住处时，她也原样退回。她终于可以带着记忆离开，而不是继续靠留在谁身边证明自己没有忘恩。';return;
    }
    if(f.v75ShenFate==='religion'){
      p.tags=['出宫','不改缘由','新茶仍在'];
      p.bio='沈知微因机务副稿案出宫入女观，此后不再碰机务。名册曾想写成“自请清修”，她坚持保留处分缘由。她和张元照仍可以见面，却不再用官位、旧恩或共同工作证明彼此关系；离开一个位置，也由她自己决定怎样继续活。';return;
    }
    if(f.v66ShenCourtPen||f.v66ShenSacrificed){
      p.tags=['御前掌笔','字句有重量','留原件过界'];
      p.bio='沈家平反后，她把对文字的敏感用到御前：知道什么时候一句“严查”会让人先毁证，什么时候一个动词已经提前替证据判了罪。可她最深的旧习也在这里失控——因为太怕改过的文字被说成从未存在，她私留机务副稿。她的能力与她的过界，来自同一件事：不愿让版本被权力随意改写。';return;
    }
    if(f.shenNewTea||f.shenChoosesLiving||f.shenBrotherCleared){
      p.tags=['旧案已平','先顾活人','新茶'];
      p.bio='兄长名字改回以后，她没有失去记忆，只是不再要求自己每天替旧案活着。方小满案里，她把宗人府的旧案补签推迟两日，只说“死人等了十年，活人等不了三天”。她开始喝新茶，也开始允许自己在真相之外继续有朋友、工作与新的亲近。';return;
    }
    if(f.shenCaseOpened||f.militaryTruth||f.shenLettersBegin){
      p.tags=['记原话','旧案未平','不求好答案'];
      p.bio='旧信、军粮簿和铜扣一点点把沈家旧案重新推到御前。她要查的并不是“谁最对不起她”，而是谁在什么时候改了哪一行；甚至提前说清，若最后证明兄长确有罪，也照实写。对她而言，真相若只能靠一个讨人喜欢的结论成立，就不算真相。';return;
    }
    p.tags=['潜邸旧人','记得准确','不多解释'];
    p.bio='沈知微是潜邸旧人。她记事情很准，尤其在意日期、先后和一句话原来到底怎么说；别人常把这当成好记性，她很少解释。她不爱争第一句话，也不拿恩宠换保证，真正不愿回答的问题会先把茶盖合上。旧茶偏苦，却不代表她只活在过去。';
  }

  syncShen(state);
  const oldApply=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldApply&&!globalThis.__v110Apply){globalThis.__v110Apply=true;applyChoiceEffects=function(c){const r=oldApply(c);syncShen(state);return r;};}

  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople&&!globalThis.__v110People){globalThis.__v110People=true;peopleView=function(){
    syncShen(state);let h=String(oldPeople());syncShen(state);
    try{
      const box=document.createElement('div');box.innerHTML=h;
      const card=box.querySelector('[data-person="shen"]');
      if(card){
        const tags=card.querySelector('.tags');if(tags)tags.innerHTML=(PEOPLE.shen.tags||[]).map(x=>`<span>${esc(x)}</span>`).join('');
        const ps=[...card.querySelectorAll('p')];const bio=ps.find(x=>!x.classList.contains('meta')&&!x.classList.contains('v52-observation'));if(bio)bio.textContent=PEOPLE.shen.bio||'';
      }
      h=box.innerHTML;
    }catch(_e){}
    return h
      .replace('她用了很多年等沈家名字被改回来，也用了很多年摆脱顺王那句“我是为你好”。','她很早就学会：若没人把原话、日期和经手人留下，权力迟早会把一件事改写成更省事的版本。')
      .replace('旧案合卷以后，她第一次主动换新茶；后来她敢爱张元照，也敢在机务案里承认副稿是自己留的。','沈家昭雪后，她第一次不再靠自己每天守着旧案；后来她替御前掌文字，也正因为同样害怕“版本被改掉”而私留副稿，终于让自己的长处走过了边界。')
      .replace('她最后去哪里由本局决定，但她不再让别人替自己解释为什么留下、为什么离开。','无论最后去哪里，她都坚持把缘由写对：爱谁不是罪名，越界就是越界，处分也不必改成更好听的故事。');
  };}

  const oldRender=typeof render==='function'?render:null;
  if(oldRender&&!globalThis.__v110Render){globalThis.__v110Render=true;render=function(){syncShen(state);const r=oldRender();syncShen(state);document.documentElement.dataset.build='v110';document.title='宫灯未眠 · 和妃沈知微全局人设梳理润色 v110';return r;};}

  state.flags=state.flags||{};state.flags.v110ShenPolish=true;
  document.documentElement.dataset.build='v110';document.title='宫灯未眠 · 和妃沈知微全局人设梳理润色 v110';
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v110 shen global character polish failed',e)}})();
