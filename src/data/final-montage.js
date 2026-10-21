// Every excerpt is a contiguous quotation from the effective, revised story.
// Objects stand in for scenes without an illustration; they add no story facts.
const FINAL_MEMORIES147 = [
  {poem:'红颜总是薄命。',scenes:[
    {id:'gu-cup',chapter:'宫门初定',heading:'正月初一 · 家宴散后',quote:'她顺手把凉掉的银盏往炭炉边推了半寸',art:'128',people:['gu','emperor','shen','taihou'],motif:'lamp'},
    {id:'gu-pin',chapter:'凤仪宫最后一冬',heading:'十月二十三，凤仪宫灯灭',quote:'那支金凤钗随梓宫封入。',people:['gu'],motif:'pin'},
    {id:'gu-empty',chapter:'凤座无人',heading:'三皇子第一次问“以后谁住那里”',quote:'谁住进来，都不会把你母后住过的日子抹掉。',art:'118',people:['ning','thirdPrince'],motif:'empty'}
  ]},
  {poem:'书生几番多情。',scenes:[
    {id:'shen-umbrella',chapter:'旧茶未凉',heading:'小传 · 和妃眼中的顺王',quote:'她那时觉得，他总能在别人开口以前看见难处。',people:['shen','shunwang'],motif:'umbrella'},
    {id:'shen-string',chapter:'旧茶未凉',heading:'偏廊只说三句话',quote:'弦断了。',people:['shen','shunwang'],motif:'string'}
  ]},
  {poem:'帝王身不由己。',scenes:[
    {id:'zhou-question',chapter:'宫门初定',heading:'二月初七 · 第二声哭没有名字',quote:'陛下是要他死，还是要所有人以后都当他没有活过？',art:'136',people:['emperor','zhou','gu'],motif:'lamp'},
    {id:'emperor-seal',chapter:'中宫空悬',heading:'承熙十四年春 · 太后把最后一句话留在御案',quote:'凤印不能无限空置。',people:['emperor','taihou'],motif:'seal'},
    {id:'emperor-last',chapter:'万家灯火',heading:'承熙二十二年冬至后第三夜 · 养心殿没有熄灯',quote:'这一回，我能留给她的话已经很少。',art:'105',people:['emperor','zhangyuanzhao'],motif:'empty'}
  ]},
  {poem:'唯有那看客清醒。',scenes:[
    {id:'heng-incense',chapter:'宫灯渐繁',heading:'母亲又把蘅国旧香给了她',quote:'我教你别被替掉。',art:'066',people:['wenheng','baopu','hanzhang'],motif:'incense'},
    {id:'heng-regret',chapter:'香尽胎寒',heading:'蘅嫔终于知道自己那句话害了女儿多久',quote:'我把你能不能有孩子，当成了你有没有未来。',people:['wenheng','baopu','hanzhang'],motif:'incense'},
    {id:'xu-page',chapter:'帘后朱笔',heading:'女史院 · 四月初四 · 许令宜把少了一页的案卷递给都察院',quote:'所以你挑一个还活着的人？',people:['xulingyi','afu','zhangyuanzhao'],motif:'paper'}
  ]},
  {poem:'相逢难逃别离。',scenes:[
    {id:'fang-pastry',chapter:'一碟杏仁酥',heading:'杏仁酥送错了门',quote:'走错了也是缘分。',art:'131',people:['fang','baopu','hanzhang','emperor'],motif:'lamp'},
    {id:'fang-evening',chapter:'听雨轩有喜',heading:'听雨轩难得安静的一夜',quote:'她愣了一下，笑出声。',art:'113',people:['fang','emperor','afu'],motif:'lamp'},
    {id:'fang-door',chapter:'听雨轩有喜',heading:'方小满死后第三日 · 听雨轩封存',quote:'阿芙抱着小灰最后一个出来。',people:['afu','gu'],motif:'door'}
  ]},
  {poem:'缘起终归缘尽。',scenes:[
    {id:'sisters-arrive',chapter:'拾遗阁开门',heading:'三月初 · 人先吃饭',quote:'你一路怎么不说？',art:'129',people:['baopu','hanzhang'],motif:'twin'},
    {id:'sisters-separate',chapter:'刃落宫门',heading:'九月十九 · 母女三个人开始分别吃饭',quote:'姐姐，我只是不能替你过。',people:['baopu','hanzhang'],motif:'twin-away'}
  ]},
  {poem:'姻缘断，情难续。',scenes:[
    {id:'shen-farewell',chapter:'帘后朱笔',heading:'雪落永和宫，张元照只剩这一张纸没写',fromResult:true,quotes:['元照，别把我写成病死。','喝完再换，别守着一种味道。','来。只喝茶，不带折子。'],fateQuotes:{death:'元照，别把我写成病死。',fief:'喝完再换，别守着一种味道。',religion:'来。只喝茶，不带折子。'},people:['shen','zhangyuanzhao'],motif:'tea'},
    {id:'shen-unsaid',chapter:'中宫空悬',heading:'同夜 · 他睡着以后',quote:'是想叫一个人来看看。',portraits:['shen','zhangyuanzhao'],people:['shen','zhangyuanzhao'],motif:'tea'},
    {id:'shen-everyday',chapter:'帘后朱笔',heading:'九月十五，永和宫那声“元照”被孩子听见了',quote:'元照，你今日比太医还烦。',portraits:['shen','zhangyuanzhao'],people:['shen','zhangyuanzhao'],motif:'tea'}
  ]}
];

// The same canonical portraits used by the current character view. Early
// memories use their chapter illustrations rather than these later costumes.
const MEMORY_PORTRAITS147={shen:'assets/asset-036.webp',zhangyuanzhao:'assets/asset-050.webp'};

function plainMemory147(value){
  const box=document.createElement('div');
  box.innerHTML=(Array.isArray(value)?value.join('\n'):String(value??''));
  return box.textContent||'';
}

function observedMemory147(scene,step,choice){
  const text=plainMemory147(scene.fromResult?result136(choice):val136(step.text,[]));
  const quote=(scene.quotes||[scene.quote]).find(q=>text.includes(q));
  return quote?{quote}:null;
}

// Capture before effects: a later rank, death or route cannot rewrite a memory.
function rememberFinalScene147(chapter,step,choice){
  for(const act of FINAL_MEMORIES147)for(const scene of act.scenes){
    if(scene.chapter!==chapter.title||scene.heading!==step.heading)continue;
    state.finalMemories147??={};
    state.finalMemories147[scene.id]=observedMemory147(scene,step,choice);
  }
}

function finalMemoryScenes147(){
  return FINAL_MEMORIES147.map(act=>({...act,scenes:act.scenes.flatMap(scene=>{
    const ci=CHAPTERS.findIndex(c=>c.title===scene.chapter),ch=CHAPTERS[ci];
    const si=ch?.steps.findIndex(st=>st.heading===scene.heading);
    const pick=state.history?.[ci]?.[si];
    // A chronicle alone is insufficient: the exact scene must have been passed.
    if(ci<0||si<0||!Number.isInteger(pick)||!ch.steps[si].choices?.[pick])return [];
    let memory;
    if(Object.hasOwn(state.finalMemories147||{},scene.id))memory=state.finalMemories147[scene.id];
    else {
      // Legacy saves: only include an exact, still-verifiable excerpt. The
      // chosen result is evaluated independently of all unchosen outcomes.
      memory=observedMemory147(scene,ch.steps[si],ch.steps[si].choices[pick]);
    }
    if(!memory||(scene.quotes||[scene.quote]).includes(memory.quote)===false)return [];
    if(scene.fateQuotes&&scene.fateQuotes[state.flags?.v75ShenFate]!==memory.quote)return [];
    return [{...scene,quote:memory.quote,date:ch.date}];
  })}));
}

function finalMontageBeats147(){
  const beats=[{id:'first-lamp',duration:2800,motif:'lamp',opening:true}];
  finalMemoryScenes147().forEach((act,ai)=>{
    const scenes=act.scenes.length?act.scenes:[{id:`quiet-${ai}`,motif:'lamp',quote:''}];
    const duration=ai===6?9000:8100;
    scenes.forEach((s,i)=>beats.push({...s,act:ai,poem:act.poem,
      duration:duration/scenes.length,poemVisible:i===scenes.length-1,
      actFirst:i===0,actLast:i===scenes.length-1}));
  });
  return beats.concat([
    {id:'after-memory',duration:1700,motif:'dark'},
    {id:'lamp-again',duration:2200,motif:'lamp',coda:true},
    {id:'old-corridor',duration:2800,art:'104',motif:'empty',coda:true},
    {id:'old-gate',duration:3300,art:'127',motif:'door',coda:true},
    {id:'zhang-night',duration:3900,art:'107',portraits:['zhangyuanzhao'],motif:'city',coda:true},
    {id:'palace-dark',duration:3100,art:'107',motif:'city',line:'养心殿的灯熄了。',coda:true},
    {id:'city-awake',duration:3500,art:'107',motif:'city',line:'城里的灯还亮着。',coda:true},
    {id:'title',duration:5200,art:'107',motif:'city',title:true,coda:true},
    {id:'last-fade',duration:1900,motif:'dark',coda:true}
  ]);
}
