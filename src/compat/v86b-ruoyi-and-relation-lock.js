(()=>{try{
  document.documentElement.dataset.build='v86';

  // 杨晏尔最终玉牒序齿固定为四公主。只修她自己的后期场景，避免误伤别的皇女。
  if(typeof CHILDREN!=='undefined'&&CHILDREN.sixthPrincess?.name==='杨晏尔')CHILDREN.sixthPrincess.order='四公主';
  const fixRuoyi86=v=>String(v??'').replaceAll('六公主','四公主');
  const ruoyiScene86=st=>!!st&&(
    ['ruoyi-beloved','daila-whistle','taihou-last-days','taihou-funeral-princess','taihou-whistle-return'].includes(st.v80id)
    || !!st.v81SeverePrince
    || (st.v82&&String(st.heading||'').includes('白玉扳指终于不转了'))
    || st.v83id==='emperor-life-montage'
    || String(st.heading||'').includes('杨晏尔')
  );
  const wrapText86=(fn,fix)=>{
    if(typeof fn!=='function')return fn;
    return function(s){
      const out=fn(s);
      return Array.isArray(out)?out.map(x=>typeof x==='string'?fix(x):x):(typeof out==='string'?fix(out):out);
    };
  };
  for(const ch of (CHAPTERS||[]))for(const st of (ch?.steps||[])){
    if(!ruoyiScene86(st))continue;
    if(typeof st.heading==='string')st.heading=fixRuoyi86(st.heading);
    if(typeof st.text==='function')st.text=wrapText86(st.text,fixRuoyi86);
    else if(Array.isArray(st.text))st.text=st.text.map(x=>typeof x==='string'?fixRuoyi86(x):x);
    else if(typeof st.text==='string')st.text=fixRuoyi86(st.text);
    if(Array.isArray(st.choices))for(const c of st.choices){
      if(typeof c.label==='string')c.label=fixRuoyi86(c.label);
      if(typeof c.hint==='string')c.hint=fixRuoyi86(c.hint);
      if(typeof c.result==='string')c.result=fixRuoyi86(c.result);
      else if(typeof c.result==='function')c.result=wrapText86(c.result,fixRuoyi86);
    }
  }

  // 太后人物卡若仍被旧补丁写入“六公主”，最终显示统一为四公主。
  if(typeof PEOPLE!=='undefined'&&PEOPLE.taihou?.bio)PEOPLE.taihou.bio=fixRuoyi86(PEOPLE.taihou.bio);

  // 人物关系网也必须服从第一次殿选：没被点进宫的人不能在后期关系卡中出现。
  const LOW86B=['cao2','zhao2','lin2','ye2','du2','su2'];
  const LOW_NAMES86B={cao2:'何超英',zhao2:'王静娴',lin2:'林淑贞',ye2:'陈婉仪',du2:'张淑华',su2:'刘玉贞'};
  const selectionDone86B=s=>!!(s?.flags?.v78ManualLowSelection||s?.flags?.firstGrandSelectionDone||(s?.flags?.lowConsorts||[]).length);
  const pv86b=typeof peopleView==='function'?peopleView:null;
  if(pv86b&&!globalThis.__v86bPeople){
    globalThis.__v86bPeople=true;
    peopleView=function(){
      let h=pv86b();
      if(!selectionDone86B(state))return h;
      const chosen=new Set((state.flags?.lowConsorts||[]).filter(k=>LOW86B.includes(k)));
      for(const k of LOW86B){
        if(chosen.has(k))continue;
        const name=LOW_NAMES86B[k];
        const esc=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        // v79 关系卡：只删除明确点名该未入宫人物的整张卡。
        h=h.replace(new RegExp(`<div class="v79-rel-card"><b>[^<]*${esc}[^<]*<\\/b><small>[\\s\\S]*?<\\/small><\\/div>`,'g'),'');
      }
      return h;
    };
  }

  // 公开给检查用的运行态 QA 信息，不进入正文。
  globalThis.V86_QA=globalThis.V86_QA||{};
  globalThis.V86_QA.ruoyiOrder='四公主';
  globalThis.V86_QA.relationCardsRespectLowSelection=true;

  if(typeof save==='function')save();
  if(typeof render==='function')render();
}catch(e){console.error('v86b final lock failed',e)}})();
