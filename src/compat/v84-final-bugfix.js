(()=>{try{
  document.documentElement.dataset.build='v84';
  document.title='宫灯未眠 · 收束主题与序齿修复 v84';
  const A=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_){return[]}};
  const idx=t=>Math.max(0,(CHAPTERS||[]).findIndex(x=>x.title===t));

  // 最终皇女序齿：既有旧变量名不改，只校正对外显示。
  function v84PrincessCanon(){
    if(CHILDREN?.ruoxi)CHILDREN.ruoxi.order='大公主';
    if(CHILDREN?.twinGirl)CHILDREN.twinGirl.order='二公主';
    if(CHILDREN?.fifthPrincess)CHILDREN.fifthPrincess.order='三公主';
    if(CHILDREN?.sixthPrincess)CHILDREN.sixthPrincess.order='四公主';
    const ex=state?.flags?.extraHeirs||{};let n=5;
    [1,2].forEach(r=>{const x=ex[r];if(!x||x.skipped||x.gender!=='F')return;x.order=`${n++}公主`;const ck=`extraHeir${r}`;if(CHILDREN?.[ck])CHILDREN[ck].order=x.order;});
  }
  v84PrincessCanon();

  // v83 重排章节以后，第一批选秀人物的 introducedAt 必须跟着“御前终选”，不能落回第 0 章。
  const first=idx('御前终选'), second=idx('空宫点灯');
  ['ning','ke','hui'].forEach(k=>{if(PEOPLE?.[k])PEOPLE[k].introducedAt=first});
  ['zhangyuanzhao','liang2','song2','xu2'].forEach(k=>{if(PEOPLE?.[k])PEOPLE[k].introducedAt=second});
  const lows=['cao2','zhao2','lin2','ye2','du2','su2'];
  if(state?.flags?.firstGrandSelectionDone){const kept=new Set(state.flags.lowConsorts||[]);lows.forEach(k=>{if(PEOPLE?.[k])PEOPLE[k].introducedAt=kept.has(k)?first:9999})}
  else lows.forEach(k=>{if(PEOPLE?.[k])PEOPLE[k].introducedAt=first});

  // 新增于 v47/v80/v83 的杨晏尔场景晚于旧序齿修订层，逐场校正，不碰真正的其他四/六公主文本。
  for(const ch of (CHAPTERS||[]))for(const st of (ch?.steps||[])){
    const ruoyiScene=st?.v80id==='ruoyi-beloved'||st?.v80id==='taihou-last-days'||st?.v80id==='taihou-funeral-princess'||st?.v80id==='taihou-whistle-return'||st?.v83id==='emperor-life-montage'||String(st?.heading||'').includes('杨晏尔');
    if(!st?.text||st.__v84Ruoyi)continue;
    const old=st.text;
    st.text=s=>A(old,s).map(x=>{
      let z=String(x??'');
      if(ruoyiScene||z.includes('杨晏尔')){
        z=z.replaceAll('六公主杨晏尔','四公主杨晏尔')
           .replaceAll('邵氏所出的六公主','邵氏所出的四公主')
           .replaceAll('第二日六公主回来','第二日四公主回来')
           .replaceAll('六公主抓过我的袖口','四公主抓过我的袖口');
      }
      return z;
    });
    if(ruoyiScene)st.heading=String(st.heading||'').replaceAll('六公主','四公主');
    st.__v84Ruoyi=true;
  }

  // 皇嗣页每次打开前都重校，避免旧存档把序齿写回早期版本。
  if(typeof childrenView==='function'&&!globalThis.__v84Children){globalThis.__v84Children=true;const old=childrenView;childrenView=function(){v84PrincessCanon();let h=old();return String(h).replaceAll('六公主 · 杨晏尔','四公主 · 杨晏尔').replaceAll('六公主杨晏尔','四公主杨晏尔')}}

  // 当前正史固定双生男婴不入玉牒，霍氏之子始终为四皇子。
  if(state?.flags?.v69CruelTwin||state?.flags?.twinBoyFate==='kill'){if(CHILDREN?.fourthPrince)CHILDREN.fourthPrince.order='四皇子'}

  globalThis.V84_QA={
    firstSelectionIndex:first,
    secondSelectionIndex:second,
    ruoyiOrder:CHILDREN?.sixthPrincess?.order||'',
    twinGirlOrder:CHILDREN?.twinGirl?.order||'',
    chapterTitles:(CHAPTERS||[]).map(x=>x.title)
  };
  state.flags=state.flags||{};state.flags.v84Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v84 final bugfix failed',e)}})();
