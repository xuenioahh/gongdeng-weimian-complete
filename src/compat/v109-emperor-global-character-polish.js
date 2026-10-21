(()=>{try{
  document.documentElement.dataset.build='v109';
  document.title='宫灯未眠 · 主控杨叙全局人设梳理润色 v109';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const ST=(ch,q)=>ch?.steps?.find(x=>String(x.heading||'').includes(q));
  const A=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_){return[]}};
  function append(chTitle,q,tag,fn){const st=ST(CH(chTitle),q);if(!st||st[tag])return;const old=st.text;st.text=s=>[...A(old,s),...A(fn,s)];st[tag]=true;}

  // 1. 开篇：他的核心不是冷，而是受不了“没有可执行答案”。
  append('宫门初定','第三幕 · 第一夜','v109EmperorFirstNight',s=>[
    `裴景和仍在等。我看着凤仪宫、永和宫和养心殿三条不同的宫道，忽然觉得做皇帝大概就是这样：每个人只说自己看见的那一边，裴景和还在旁边等我下令。`,
    `那时我把这件事看得很简单。御前不能永远留着“再看看”。只要最后一笔是我落的，出了结果也由我担。`
  ]);

  // 2. 双生死令：最早的致命盲区——先求一个能执行的答案，再问那个人有没有被答案抹掉。
  append('宫门初定','第二声哭','v109TwinControl',s=>[
    `我没有去抱那个男婴。先看的，是宗人府空着的玉牒页、钦天监的折子和顾明宜那张“候御前裁”的临时单。`,
    `那时我最不愿留下的，是一个谁都不知道明早该怎么办的“暂候”。我以为皇帝的职责就是把这种空白填上：字一落，宫门、名册、值守和所有人的下一步就都有章可循。`
  ]);

  // 3. 沈氏旧案：不是没看见疑点，而是把“算代价”当成最公平的做法。
  append('旧茶未凉','军令不是一张纸，是三次转手','v109ShenCost',s=>[
    `顺王说我到如今还是会先算这个。他没有说错。很长一段时间里，我把这当成最可靠的公平：把每一种代价都摊开，再选伤得最少的那一边。`,
    `只是“最少”落到纸上是一个数，落到沈知微那里，是她兄长一个具体的名字。`
  ]);

  // 4. 方小满：第一次正面承认“把场面控制住”本身也可能先伤人。
  append('听雨轩有喜','顺贵人的东西并不多','v109FangEdict',s=>{
    const first=s.flags?.fangInvestigation==='threeDays'
      ?`阿芙把那道“非朕亲审，不得妄动顺贵人”的旨意也交了回来。字一个没错，封签也是真的。它挡住了陌生人，却没挡住一碗从正常轮值里换过手的药。`
      :`偏院的值簿也送到御前。我翻到第一页就看见自己的旨意——“方氏涉案，暂移偏院禁足”。先换掉她熟悉的宫女和太医，是我下的令；后来那张假口谕能那么容易被人当成真的，也不是从天上掉下来的。`;
    return [first,`我过去总觉得先把人关住、把门封住，再慢慢查也来得及。方小满死后，我再也不敢把这句话想得那么轻松。`];
  });

  // 5. 顾明宜之死：让“倦政”有具体来源，不是突然纵宴。
  append('凤仪宫最后一冬','皇后出殡','v109GuAbsence',s=>[
    `第二日午后，我下意识问：“凤仪宫今日的宫务册呢？”裴景和停了一息，才答：“陛下，凤仪宫今日不再送册了。”`,
    `我这才明白，这些年顾明宜总会先把乱七八糟的宫务理成几页，再送到御前。她死后，那些事原样堆到了我案上。那天我叫人把未结宫务全送到养心殿。案子堆得很高，看到三更也没有看完。`,
    `再后来我越来越常让屋里留着人声。起初是议事，后来是听曲、酒和年轻人的笑。安静下来时，案上那些没看完的东西总显得更多。`
  ]);

  // 6. “照旧”的退化：同一枚扳指，前后意义变了。
  append('长夜未央','三份折子都写了“照旧”','v109RingFatigue',s=>[
    `我低头时才发现自己还在转那枚白玉扳指。年轻时转它，是为了把一件事多想一遍；这两年转它，常常只是等谁先把复杂处说得更短。`,
    `手停下以后，纸上也未必有决定。`
  ]);

  // 7. 三皇子远藩：第一次明确区分“替他算清楚”和“让他自己选”。
  append('西华门外','三皇子来求最远的封地','v109PrinceAgency',s=>[
    `我第一反应仍是替他算：朔川远、冷、兵事重；现存长子一旦离京，储位又要重新排。每一条都是真的。`,
    `可顺谦今天来问的不是哪一种安排最稳。他问的是，自己能不能离开一个连喜欢什么都会被旁人解释成朝局的地方。`,
    `我看着藩图，没有立刻替他把“最合适”三个字写出来。`
  ]);

  // 8. 西华门终局：玩家不同选择，要真正改变杨叙有没有再次把真相锁回去。
  append('西华门外','西华门还在那里','v109WestGateSelf',s=>{
    const f=s.flags||{};
    if(f.v69Final==='public')return [
      `承熙元年的“秘处”旨最终进了公开卷。我没有让史官写“宫人误传”，也没有把死令推给顾明宜那张更早的临时单。那四个字是我的。`,
      `公开它没有让陆既明重新得到十八年，也没有让周清漪活回来。它只是不再让活着的人替我的旧决定背一个更好看的说法。`
    ];
    if(f.v69Final==='princess')return [
      `这一次，我先把全部真相告诉二公主，没有先替她删掉哪一段“免得她受不住”。她最后决定公开到哪一步，我才让礼部照她的话写。`,
      `十八年前我替一个不会说话的孩子把一生写完；这一次，我至少没有再替另一个孩子决定她该知道多少。`
    ];
    return [
      `我最后还是把他的血脉锁进密档。离开前，我在西华门站了很久。年轻时我也做过同样的事：把一个无法安置的人先移出公开秩序，再告诉自己这是为了让更多东西稳下来。`,
      `门最后还是关了。我知道自己并没有因为老了，就自动走出承熙元年那一夜。`
    ];
  });

  // 9. 最后一夜：不替元照安排身后，是整条弧线最小、也最重要的一次收手。
  const end=CH('万家灯火'), last=ST(end,'冬至后第三夜');
  if(last&&!last.v109LastBlank){const old=last.text;last.text=s=>{const xs=A(old,s);const marker=xs.findIndex(x=>String(x).includes('“朕不替你选。”'));if(marker<0)return xs;return [...xs.slice(0,marker),`我想起自己年轻时最习惯做的事，就是见到空白便替人写上答案。后来又有很多年，我反过来把该由自己写的答案推给“照旧”和别人。`,`该由皇帝下的旨，我不能再推给“照旧”。至于别人的人生，不是每一处都该由我填。`,...xs.slice(marker)];};last.v109LastBlank=true;}

  // 10. 人物录标签只写已经走到的阶段，不提前替玩家宣布“成长完成”。
  function syncEmperor(s=state){
    if(!PEOPLE?.emperor)return;
    const f=s.flags||{};
    if(f.v82EmperorDead){PEOPLE.emperor.tags=['故承熙帝','朱笔已停','旧旨留卷'];return;}
    if(f.v69HiddenPrinceRevealed){PEOPLE.emperor.tags=['亲断','旧旨归卷','不替人选'];return;}
    if(f.v46EmperorIndulgenceBegins||f.guDead){PEOPLE.emperor.tags=['旧伤','渐倦','怕安静'];return;}
    if(f.militaryTruth||f.fangDead){PEOPLE.emperor.tags=['多核','仍亲断','开始疑程序'];return;}
    PEOPLE.emperor.tags=['慎断','善察','怕失控'];
  }
  syncEmperor(state);
  const oldApply=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldApply&&!globalThis.__v109Apply){globalThis.__v109Apply=true;applyChoiceEffects=function(c){const r=oldApply(c);syncEmperor(state);return r;};}
  const oldRender=typeof render==='function'?render:null;
  if(oldRender&&!globalThis.__v109Render){globalThis.__v109Render=true;render=function(){syncEmperor(state);const r=oldRender();syncEmperor(state);document.documentElement.dataset.build='v109';document.title='宫灯未眠 · 主控杨叙全局人设梳理润色 v109';return r;};}

  // 大事录额外给出主控弧线，只写行为变化，不评价“好皇帝/坏皇帝”。
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron&&!globalThis.__v109Chron){globalThis.__v109Chron=true;chronicleView=function(){let h=oldChron();const f=state.flags||{};const box=`<section class="v65-emperor-track"><span class="eyebrow">杨叙 · 御前线</span><h2>同一支朱笔，前后不是同一种重量</h2><p><b>早年：</b>先多听一面，再亲自裁断。他把“不给御前留空白”视为职责，也因此能在必须选择时迅速落笔。</p><p><b>代价：</b>双生死令与沈氏旧案证明，一道旨越干脆，也不代表受牵连的人越少。</p><p><b>重阳以后：</b>他开始同时保留互相冲突的记录；方小满之死又让他意识到，手续齐全，也不代表人就一定安全。</p><p><b>顾后之后：</b>失去长期替他整理六宫的人以后，“照旧”“再议”逐渐从谨慎变成逃避。夜宴不是朝政突然荒废，而是他越来越怕独自面对没有看完的东西。</p><p><b>后期：</b>${f.v69HiddenPrinceRevealed?'西华门旧子回来以后，他不得不重新回答自己元年的死令；是否公开、是否先让二公主知道，会决定他有没有再次把真相锁回密档。':'三皇子、继后与皇嗣逐渐长大，他开始碰到一种过去不擅长的决定：有些事不能只替别人算“哪一种最好”，还得先问本人想不想。'}</p></section>`;return h.replace('</main>',box+'</main>');};}

  state.flags=state.flags||{};state.flags.v109EmperorPolish=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v109 emperor global character polish failed',e)}})();
