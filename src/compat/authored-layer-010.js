(()=>{try{
  document.documentElement.dataset.build='v36';

  /* 低位秀女姓名：保留用户选定的何超英、林淑贞、陈婉仪，其余使用常见大姓。 */
  Object.assign(PEOPLE.cao2,{name:'何超英',glyph:'何',bio:'地方知府之女。说话不快，站在人群里不抢眼，却很少把该记的事情忘掉。'});
  Object.assign(PEOPLE.zhao2,{name:'王静娴',glyph:'王',bio:'京中四品官员之女。懂看场面，但不急着接每一句话；真正紧张时反而会把袖口折得很整齐。'});
  Object.assign(PEOPLE.lin2,{name:'林淑贞',glyph:'林',bio:'太医旁支之女。认得一些宫中常见药名，却从不拿这点见识卖弄。'});
  Object.assign(PEOPLE.ye2,{name:'陈婉仪',glyph:'陈',bio:'翰林旁支之女。声音轻，写字比说话稳，入宫后最先被尚宫局记住的是一手小楷。'});
  Object.assign(PEOPLE.du2,{name:'张淑华',glyph:'张',bio:'漕运官员之女。家里人口多，做事爽利，进宫以后最先学会的是把自己的东西收得很紧。'});
  Object.assign(PEOPLE.su2,{name:'刘玉贞',glyph:'刘',bio:'京畿小官之女。性情平和，熟悉家常针线与南边小调，在储秀宫时很少和人争先。'});

  const css=document.createElement('style');css.textContent=`
    .heir-pending{display:block;margin:17px 0;padding:15px 17px;border:1px solid #bca77d;background:linear-gradient(135deg,#faf5e9,#eee3ce);color:#5b4e3c;line-height:1.9}
    .heir-pending b{display:block;color:#7b513f;letter-spacing:.1em;margin-bottom:4px}.heir-pending em{font-style:normal;color:#987248}
  `;document.head.appendChild(css);

  function heirMotherLabel(k,s=state){
    if(!k)return '无人';
    const p=PEOPLE[k];
    const rank=courtTitle(s,k)||s.ranks?.[k]||p?.title||'';
    const name=p?.name||'某氏';
    return rank?`${name}（${rank}）`:name;
  }
  function heirEligible(round,s=state){
    const low=(s.flags.lowConsorts||[]).filter(k=>s.ranks?.[k]&&s.ranks[k]!=='待选');
    let pool=['gu','shen','hui',...low];
    // 第一轮发生在四皇子出生后不久，晋妃仍在调养；徽嫔已有身孕，二人暂不列入。
    if(round===2) pool.push('ke');
    const first=s.flags.extraHeirs?.[1]?.mother;
    pool=pool.filter((k,i,a)=>a.indexOf(k)===i && k!==first && k!=='ning');
    return pool;
  }
  function ensureHeirCandidates(round,s=state){
    s.flags.extraHeirCandidates=s.flags.extraHeirCandidates||{};
    if(!s.flags.extraHeirCandidates[round]){
      const pool=heirEligible(round,s);
      // 至少让一位随机低位宫嫔有机会出现在候选里，其余从全池补齐。
      const lows=pool.filter(k=>(s.flags.lowConsorts||[]).includes(k));
      const picks=[];
      if(lows.length)picks.push(lows[Math.floor(Math.random()*lows.length)]);
      const rest=pool.filter(k=>!picks.includes(k));
      for(let i=rest.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[rest[i],rest[j]]=[rest[j],rest[i]]}
      picks.push(...rest.slice(0,Math.max(0,3-picks.length)));
      s.flags.extraHeirCandidates[round]=picks.slice(0,3);
      try{save()}catch(_e){}
    }
    return s.flags.extraHeirCandidates[round]||[];
  }
  function heirCandidate(s,round,slot){return ensureHeirCandidates(round,s)[slot]}
  function nextExtraOrder(round,gender,s=state){
    let n=gender==='M'?5:7; // 六公主与四皇子出生以后，额外皇嗣从五皇子/七公主起序。
    for(let r=1;r<round;r++){const x=s.flags.extraHeirs?.[r];if(x?.gender===gender)n++}
    return `${n}${gender==='M'?'皇子':'公主'}`;
  }
  const BOY_NAMES=['杨顺平','杨顺礼','杨顺宁','杨顺嘉','杨顺谦'];
  const GIRL_NAMES=['杨清而','杨嘉则','杨和乃','杨贞亦','杨安以'];
  function chooseUnusedName(gender,s=state){
    const used=new Set(Object.values(s.flags.extraHeirs||{}).map(x=>x?.name).filter(Boolean));
    const pool=(gender==='M'?BOY_NAMES:GIRL_NAMES).filter(x=>!used.has(x));
    return pool.length?pool[Math.floor(Math.random()*pool.length)]:(gender==='M'?'杨顺安':'杨若安');
  }
  function conceiveExtraHeir(round,mother,s=state){
    s.flags.extraHeirs=s.flags.extraHeirs||{};
    if(s.flags.extraHeirs[round])return s.flags.extraHeirs[round];
    const gender=Math.random()<0.52?'F':'M';
    const x={mother,gender,name:chooseUnusedName(gender,s),order:nextExtraOrder(round,gender,s),born:false};
    s.flags.extraHeirs[round]=x;
    return x;
  }
  function registerExtraHeir(round,s=state){
    const x=s.flags.extraHeirs?.[round];if(!x||x.born)return x;
    x.born=true;
    const key=`extraHeir${round}`;
    CHILDREN[key]={name:x.name,order:x.order,age:round===1?'承熙六年五月生':'承熙六年七月生',mother:x.mother,
      motherName:`${PEOPLE[x.mother]?.name||''}${heirMotherLabel(x.mother,s)?`（${heirMotherLabel(x.mother,s)}）`:''}`,
      note:'承熙六年生，随生母居住，乳母与日常教养另入内廷册。'};
    return x;
  }
  function syncExtraHeirs(s=state){
    [1,2].forEach(r=>{const x=s.flags.extraHeirs?.[r];if(x?.born){
      const key=`extraHeir${r}`;
      CHILDREN[key]={name:x.name,order:x.order,age:r===1?'承熙六年五月生':'承熙六年七月生',mother:x.mother,
        motherName:`${PEOPLE[x.mother]?.name||''}（${heirMotherLabel(x.mother,s)}）`,
        note:'承熙六年生，随生母居住，乳母与日常教养另入内廷册。'};
    }})
  }
  syncExtraHeirs();

  function heirPickChoice(round,slot){return {
    get label(){const k=heirCandidate(state,round,slot);return k?`这一季，多召${heirMotherLabel(k,state)}`:'无人可选';},
    hint:'你决定这一季更常召见谁；若平安生产，生母另有产育晋位。',
    requires:s=>!!heirCandidate(s,round,slot),
    heirPick:{round,slot},
    result:s=>{const k=heirCandidate(s,round,slot);return k?`${heirMotherLabel(k,s)}这一季承宠明显多了。两个月后太医报喜。宫里开始猜是皇子还是公主，我没有让任何人提前拿孩子换位分。`:''}
  }}
  function noHeirChoice(round){return {
    label:'这一季不特意添皇嗣',hint:'不把每一段恩宠都变成生育安排',heirSkip:{round},
    result:'这一季没有人为“添一个孩子”被特别推到御前。六宫照常过日子。'
  }}

  const applyChoiceEffectsV35Heir=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=applyChoiceEffectsV35Heir(c);
    if(c.heirPick){
      const k=heirCandidate(state,c.heirPick.round,c.heirPick.slot);
      if(k){const x=conceiveExtraHeir(c.heirPick.round,k,state);state.bond[k]=(state.bond[k]||0)+2;out.push(`${heirMotherLabel(k,state)}有喜`);}
    }
    if(c.heirSkip){state.flags.extraHeirs=state.flags.extraHeirs||{};state.flags.extraHeirs[c.heirSkip.round]={skipped:true};out.push('本季不特意添皇嗣')}
    return out;
  };

  const ch=CHAPTERS[5];
  if(ch?.steps && !ch.steps.some(x=>x.heading?.includes('九月 · 要不要再添一个孩子'))){
    ch.date='承熙三年春至六年七月';
    ch.theme='选秀以后，世家、旧案、子嗣与恩宠一起进入六宫；孩子可以出生，但命运暂不替他们写好';

    const round1={heading:'承熙五年九月 · 要不要再添一个孩子',cast:['gu','shen','hui'],fx:'candle',keyDecision:true,text:s=>{
      const cand=ensureHeirCandidates(1,s);
      return [
        `四皇子满月已经过去，徽嫔仍在养胎。尚宫局重新送来承宠册时，皇后在册尾多夹了一张空白纸。`,
        `她没有写“劝陛下广嗣”。只是把近半年的请脉、留宿和各宫身体状况抄在一处。和妃看过以后，把纸推回来：“孩子不是排值排出来的。”`,
        `皇后低声道：“本宫知道。可玉牒总不能永远只靠碰巧。”`,
        `<span class="heir-pending"><b>这一季可由你决定恩宠落点</b><em>${cand.map(k=>heirMotherLabel(k,s)).join(' · ')}</em><br>你只决定谁得到更持续的承宠。若因此有喜，孩子性别、序齿与赐名不会由你提前指定。</span>`,
        `这一次不是朝堂大事，也不是谁的生死。可在后宫里，皇帝把一个月的夜晚给谁，往往就是许多事情真正的开头。`
      ];
    },choices:[heirPickChoice(1,0),heirPickChoice(1,1),heirPickChoice(1,2),noHeirChoice(1)]};

    const round2={heading:'承熙五年十一月 · 第二张空白页',cast:['gu','shen'],fx:'ink',keyDecision:true,text:s=>{
      const cand=ensureHeirCandidates(2,s);const r1=s.flags.extraHeirs?.[1];
      return [
        r1?.mother?`九月那次以后，${heirMotherLabel(r1.mother,s)}已经报了喜。皇后把她从承宠册上轻轻划去，旁边只写“安胎”。`:`九月没有特意添皇嗣。承宠册翻到冬月时，皇后仍留着那张空白纸。`,
        `宫里并没有因此安静下来。有人怕孩子太多分薄母族的位置，也有人怕孩子太少，让每一个皇子的出生都显得过重。太后听完这些议论，只说：“孩子还没来，算盘倒先打响了。”`,
        `<span class="heir-pending"><b>冬月再看一次</b><em>${cand.map(k=>heirMotherLabel(k,s)).join(' · ')}</em><br>仍然可以选择不特意添嗣。平安生产后另发产育册旨。</span>`,
        `我看着名册。几年以前，这些名字还只是礼部送进来的家谱；如今每一个名字后面都已经有一间宫室、一群宫人、一个母族，或者一段没有说完的旧事。`
      ];
    },choices:[heirPickChoice(2,0),heirPickChoice(2,1),heirPickChoice(2,2),noHeirChoice(2)]};

    const birth1={heading:'承熙六年五月 · 玉牒又添一笔',cast:['gu','taihou'],fx:'lantern',narrative:true,text:s=>{
      const x=s.flags.extraHeirs?.[1];
      if(!x||x.skipped)return [`五月过去得很平。太医院没有新的产报，尚宫局把空着的乳母名册重新收回柜里。`,`皇后把那一页折好，没有补一句“可惜”。后宫不是每一年都必须有人出生。`];
      registerExtraHeir(1,s);try{save()}catch(_e){}
      return [
        `五月天刚亮，${heirMotherLabel(x.mother,s)}宫里传出婴啼。产房里先报母体平安，过了片刻，第二句话才送到御前：是${x.gender==='M'?'皇子':'公主'}。`,
        `玉牒按当时已经出生的皇嗣重新序齿，记作${x.order}，赐名${x.name.replace(/^杨/,'')}。`,
        `皇后亲自看了一遍乳母名册，又把孩子腕上的小红绳松了半指。她没有替这个孩子安排将来。太后也只说：“先养活，再说别的。”`,
        `洗三与满月照例办过。太后另送了一床薄绫小被，乳母名册压在孩子床头。`
      ];
    },choices:[{label:'继续',effects:{flags:{extraHeir1Born:true}},result:''}]};

    const birth2={heading:'承熙六年七月 · 又一声婴啼',cast:['gu','taihou'],fx:'lantern',narrative:true,text:s=>{
      const x=s.flags.extraHeirs?.[2];
      if(!x||x.skipped)return [`入夏以后没有新的产信。六月的雨把宫墙洗得发亮，皇后把第二张空白乳母名册也收了起来。`,`“今年已经够热闹了。”她说。没人反驳。`];
      registerExtraHeir(2,s);try{save()}catch(_e){}
      return [
        `七月午后雷雨刚停，${heirMotherLabel(x.mother,s)}宫里报产。孩子哭声很响，隔着两重院墙都听得见。`,
        `玉牒房来核名字时，皇后正把襁褓往孩子颈下掖。她只说：“窗关一半，别让风直吹。”随后才接过那张写着序齿与名字的纸。`,
        `午后，册旨另送到产房外。孩子的洗三归孩子，母妃的晋位另走一道礼。`,
        `夜里雷又响了一阵。孩子吃饱以后睡得很沉，母妃也终于合眼。廊下只剩乳母换水的脚步声。`
      ];
    },choices:[{label:'继续',effects:{flags:{extraHeir2Born:true}},result:''}]};

    const find=(needle)=>ch.steps.findIndex(x=>x.heading?.includes(needle));
    let idx=find('徽嫔也有了喜脉');if(idx<0)idx=find('徽妃也有了喜脉');
    if(idx>=0)ch.steps.splice(idx+1,0,round1,round2);
    let six=find('六公主满月');if(six>=0)ch.steps.splice(six+1,0,birth1);
    let june=find('六月终于有喜');if(june>=0)ch.steps.splice(june+1,0,birth2);
  }

  // 皇嗣页：动态孩子只在真正出生以后显示；旧档刷新时从 flags 重建。
  syncExtraHeirs();

  if(typeof annalFor==='function'){
    const annalV36=annalFor;
    annalFor=function(i){
      if(i===5){
        const extra=[state.flags.extraHeirs?.[1],state.flags.extraHeirs?.[2]].filter(x=>x?.born).length;
        return `承熙三年，诏行大选。徽、晋、元三嫔与低位宫嫔入内。四年至六年，皇嗣屡添${extra?`，另增${extra}人`:''}。六宫渐备。——《大晟史·后妃传》`;
      }
      return annalV36(i);
    };
  }

  // 章节六结构发生变化：旧档若已经走到选秀以后，保留前五章选择，退回承熙三年重新体验添嗣分支。
  if(!state.flags?.v36Migrated){
    const hadProgress=(state.index||0)>=5;
    if(hadProgress){
      const first5=(state.history||[]).slice(0,5),intro=state.intro;
      state=clone(INITIAL_STATE);state.intro=intro;
      ['ning','ke','hui','cao2','zhao2','lin2','ye2','du2','su2'].forEach(k=>{state.ranks[k]='待选';state.bond[k]=28;state.trust[k]=35});
      first5.forEach((p,idx)=>{state.index=idx;applyRecordedChapter(idx,p);state.index=idx+1});
      state.index=5;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];
    }
    state.flags.v36Migrated=true;
  }

  // 既有随机低位留牌继续使用；只调整姓名，不强制三人都入宫，保持每局组合差异。
  save();render();
}catch(e){console.error('v36 extra-heirs patch failed',e)}})();
