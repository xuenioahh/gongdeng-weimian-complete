(()=>{try{
  document.documentElement.dataset.build='v85';
  document.title='宫灯未眠 · 年龄与称谓动态校准 v85';

  const CN_DIGIT={零:0,'〇':0,一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};
  function cnNum85(raw){
    const s=String(raw||'').trim();
    if(/^\d+$/.test(s))return Number(s);
    if(s==='十')return 10;
    if(s.includes('十')){
      const [a,b]=s.split('十');
      const tens=a?CN_DIGIT[a]||0:1;
      const ones=b?CN_DIGIT[b]||0:0;
      return tens*10+ones;
    }
    return CN_DIGIT[s]??NaN;
  }
  function yearIn85(txt){
    const m=String(txt||'').match(/承熙([零〇一二三四五六七八九十\d]+)年/);
    return m?cnNum85(m[1]):NaN;
  }
  function storyYear85(s=state){
    if(!s)return 1;
    if((s.index??0)>=(CHAPTERS?.length||0)){
      if(s.flags?.v82EmperorDead||s.flags?.v82FinaleComplete||s.flags?.v82SecondController)return 22;
      const last=(s.chronicle||[]).at?.(-1);const ly=yearIn85(last?.date);return Number.isFinite(ly)?ly:22;
    }
    const ch=CHAPTERS?.[s.index]||CHAPTERS?.[0];
    const steps=ch?.steps||[];const cur=Math.min(s.chapterStep||0,Math.max(0,steps.length-1));
    for(let i=cur;i>=0;i--){const y=yearIn85(steps[i]?.heading);if(Number.isFinite(y))return y;}
    const cy=yearIn85(ch?.date);if(Number.isFinite(cy))return cy;
    const last=(s.chronicle||[]).at?.(-1);const ly=yearIn85(last?.date);return Number.isFinite(ly)?ly:1;
  }
  globalThis.yearNow=storyYear85;
  globalThis.storyYearV85=storyYear85;

  // 最终正史姓名：只校显示姓名，不改剧情分支。
  const canonicalNames85={
    emperor:'杨叙',taihou:'邵令仪',gu:'顾明宜',shen:'沈知微',zhou:'周清漪',wenheng:'闻人蘅',baopu:'闻人抱朴',hanzhang:'闻人含章',fang:'方小满',peiyan:'裴景和',xielin:'谢绍庭',afu:'阿芙',shunwang:'杨承晏',
    ning:'邵明贞',ke:'霍素英',hui:'崔静仪',cao2:'何超英',zhao2:'王静娴',lin2:'林淑贞',ye2:'陈婉仪',du2:'张淑华',su2:'刘玉贞',
    zhangyuanzhao:'张元照',liang2:'梁素贞',song2:'宋文秀',xu2:'许淑惠',daila:'黛拉',xulingyi:'许令宜',yinprince:'陆既明'
  };
  for(const [k,n] of Object.entries(canonicalNames85))if(PEOPLE?.[k])PEOPLE[k].name=n;

  // [基准承熙年, 当年年龄]。以后统一由故事年份计算，不再靠各版本写死字符串。
  const ageBase85={
    emperor:[1,30],taihou:[1,50],gu:[1,29],shen:[1,28],zhou:[1,27],wenheng:[2,37],baopu:[1,20],hanzhang:[1,20],fang:[1,17],peiyan:[1,31],xielin:[1,29],afu:[1,19],shunwang:[1,27],
    ning:[3,19],ke:[3,21],hui:[3,19],cao2:[3,18],zhao2:[3,19],lin2:[3,18],ye2:[3,17],du2:[3,20],su2:[3,18],
    zhangyuanzhao:[11,18],liang2:[11,18],song2:[11,18],xu2:[11,17],daila:[12,19],xulingyi:[15,26],yinprince:[18,17]
  };
  function isDead85(k,s=state){
    const rank=String(s?.ranks?.[k]||PEOPLE?.[k]?.title||'');
    if(/^故/.test(rank))return true;
    if(k==='emperor')return !!s?.flags?.v82EmperorDead;
    if(k==='taihou')return !!s?.flags?.v80TaihouDead;
    if(k==='gu')return !!s?.flags?.guDead;
    if(k==='shen')return s?.flags?.v75ShenFate==='death';
    if(k==='xu2')return !!(s?.flags?.v46XuDead||s?.flags?.v70XuSuspiciousDeath);
    if(k===s?.flags?.v46LowVictim)return true;
    return false;
  }
  function deathYear85(k,s=state){
    if(k==='emperor'&&s?.flags?.v82EmperorDead)return 22;
    if(k==='taihou'&&s?.flags?.v80TaihouDead)return 17;
    if(k==='gu')return 11;
    if(k==='baopu')return 8;
    if(k==='wenheng')return 8;
    if(k==='fang')return 10;
    if(k==='shen'&&s?.flags?.v75ShenFate==='death')return 15;
    if(k==='xu2')return 11;
    if(k===s?.flags?.v46LowVictim)return 11;
    return storyYear85(s);
  }
  function personAge85(k,s=state){
    const b=ageBase85[k];if(!b)return PEOPLE?.[k]?.age||'';
    let y=storyYear85(s);const dead=isDead85(k,s);
    if(dead)y=Math.min(y,deathYear85(k,s));
    const age=b[1]+Math.max(0,y-b[0]);
    return `${dead?'终年':''}${age}岁`;
  }
  globalThis.personAgeV85=personAge85;
  for(const k of Object.keys(ageBase85)){
    if(!PEOPLE?.[k])continue;
    try{Object.defineProperty(PEOPLE[k],'age',{configurable:true,enumerable:true,get(){return personAge85(k,state)},set(_v){}})}catch(_e){}
  }

  // 终局称谓优先于旧 ranks；普通晋封仍走原 courtTitle。
  const oldCourt85=typeof courtTitle==='function'?courtTitle:null;
  if(oldCourt85&&!globalThis.__v85CourtTitle){globalThis.__v85CourtTitle=true;courtTitle=function(s,k){
    if(k==='emperor'&&s?.flags?.v82EmperorDead)return '故承熙帝';
    if(k==='taihou'&&s?.flags?.v80TaihouDead)return '故昭懿慈宁圣母皇太后';
    if(k==='zhangyuanzhao'&&s?.flags?.v82SecondController)return '皇太后';
    if(k==='shen'&&s?.flags?.v75ShenFate==='death'){
      const raw=String(oldCourt85(s,k)||'和妃').replace(/^故/,'');return '故'+raw;
    }
    return oldCourt85(s,k);
  }}
  displayRank=function(k,s=state){return courtTitle(s,k)};

  // 数字序齿统一使用中文。
  const cnOrder85=n=>{const x=Number(n);if(!Number.isFinite(x))return String(n);if(x<10)return '一二三四五六七八九'[x-1]||String(x);if(x===10)return'十';if(x<20)return'十'+'一二三四五六七八九'[x-11];const a=Math.floor(x/10),b=x%10;return('一二三四五六七八九'[a-1]||a)+'十'+(b?('一二三四五六七八九'[b-1]||b):'')};
  function fixOrderText85(x){return String(x||'').replace(/(\d{1,2})(皇子|公主)/g,(_m,n,t)=>`${cnOrder85(n)}${t}`)}

  // 皇嗣年龄单独校正。原 v47 的年份解析只到十五年，这里覆盖到二十二年。
  const childBirth85={
    '杨顺谦':[-5,0], // 承熙元年六岁
    '杨令兮':[-4,0], // 承熙元年五岁
    '杨昭焉':[1,0],
    '杨顺安':[1,0],
    '杨宁矣':[4,0],
    '杨顺恭':[5,0],
    '杨晏尔':[6,0]
  };
  function childAge85(name,s=state){
    const y=storyYear85(s);const b=childBirth85[name];
    if(b){
      let a=(name==='杨顺谦'?y+5:name==='杨令兮'?y+4:y-b[0]);
      const keyMap={'杨顺谦':'shunqian','杨令兮':'ruoxi','杨昭焉':'twinGirl','杨顺安':'twinBoy','杨宁矣':'fifthPrincess','杨顺恭':'fourthPrince','杨晏尔':'sixthPrincess'};
      const key=keyMap[name];if(key&&Array.isArray(s?.flags?.v46ChildVictims)&&s.flags.v46ChildVictims.includes(key)){a=(name==='杨顺谦'?16:name==='杨令兮'?15:11-b[0]);return `终年${Math.max(0,a)}岁`;}
      return a<=0?'未满周岁':`${a}岁`;
    }
    if(s?.flags?.v69LatePrincess?.name===name){const a=y-(s.flags.v69LatePrincess.birth||15);return a<=0?'未满周岁':`${a}岁`;}
    if(s?.flags?.v69LatePrince?.name===name){const a=y-(s.flags.v69LatePrince.birth||16);return a<=0?'未满周岁':`${a}岁`;}
    for(const x of Object.values(s?.flags?.extraHeirs||{}))if(x?.name===name){const birth=x.birth||6;const a=y-birth;return a<=0?'未满周岁':`${a}岁`;}
    return '';
  }
  const oldChildren85=typeof childrenView==='function'?childrenView:null;
  if(oldChildren85&&!globalThis.__v85Children){globalThis.__v85Children=true;childrenView=function(){
    let h=String(oldChildren85());const y=storyYear85(state);
    h=h.replace(/皇室子女 · 承熙(?:\d+|[零〇一二三四五六七八九十]+)年/g,`皇室子女 · 承熙${cnOrder85(y)}年`);
    const names=new Set(Object.keys(childBirth85));
    if(state.flags?.v69LatePrincess?.name)names.add(state.flags.v69LatePrincess.name);
    if(state.flags?.v69LatePrince?.name)names.add(state.flags.v69LatePrince.name);
    for(const x of Object.values(state.flags?.extraHeirs||{}))if(x?.name)names.add(x.name);
    for(const name of names){const age=childAge85(name,state);if(!age)continue;const esc=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const re=new RegExp(`<span class="heir-age">[^<]*<\\/span><h2>${esc}<\\/h2>`,'g');h=h.replace(re,`<span class="heir-age">${age}</span><h2>${name}</h2>`);}
    h=fixOrderText85(h);
    h=h.replaceAll('六公主 · 杨晏尔','四公主 · 杨晏尔').replaceAll('六公主杨晏尔','四公主杨晏尔');
    return h;
  }}

  // 人物页打开前再校一次姓名，防旧存档/旧补丁把显示名带回来。
  const oldPeople85=typeof peopleView==='function'?peopleView:null;
  if(oldPeople85&&!globalThis.__v85People){globalThis.__v85People=true;peopleView=function(){
    for(const [k,n] of Object.entries(canonicalNames85))if(PEOPLE?.[k])PEOPLE[k].name=n;
    let h=String(oldPeople85());
    if(state.flags?.v82SecondController)h=h.replace(/皇后\s*·\s*张元照/g,'皇太后 · 张元照');
    return h;
  }}

  globalThis.V85_QA={storyYear:()=>storyYear85(state),personAge:personAge85,canonicalNames:canonicalNames85};
  state.flags=state.flags||{};state.flags.v85Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v85 dynamic age/title patch failed',e)}})();
