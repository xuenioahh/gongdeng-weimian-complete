(()=>{
  try{
    const meta=/这条线|这一幕(?:说明|意味着)|这一场(?:说明|意味着)|作者|硬约束|写作纪律|回扣|呼应|真正合上|这是.*(?:主题|象征)|会成为下一(?:篇|章)|让读者|玩家会|读者会/;
    for(const ch of (CHAPTERS||[])){
      for(const st of (ch.steps||[])){
        if(!st.text||st.__v78b) continue;
        const old=st.text;
        st.text=function(ss){
          const a=typeof old==='function'?old(ss):old;
          return (Array.isArray(a)?a:[a]).filter(function(x){
            const z=String(x||'');
            const plain=z.replace(/<[^>]+>/g,'');
            return !(meta.test(plain)&&!/“|”/.test(plain));
          });
        };
        st.__v78b=true;
      }
    }
    state.flags=state.flags||{};
    state.flags.v78MetaScrub=true;
    try{save()}catch(_e){}
    try{render()}catch(_e){}
  }catch(e){console.error('v78b meta scrub failed',e)}
})();
