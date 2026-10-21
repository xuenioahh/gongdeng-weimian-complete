(()=>{try{
  document.documentElement.dataset.build='v35';
  Object.assign(PEOPLE.ning,{name:'邵明贞',title:'徽嫔',glyph:'徽'});
  Object.assign(PEOPLE.ke,{name:'霍素英',title:'晋嫔',glyph:'晋'});
  Object.assign(PEOPLE.hui,{name:'崔静仪',title:'元嫔',glyph:'元'});
  Object.assign(PEOPLE.cao2,{name:'王淑惠',glyph:'王'});
  Object.assign(PEOPLE.zhao2,{name:'张素英',glyph:'张'});
  Object.assign(PEOPLE.lin2,{name:'林淑贞',glyph:'林'});
  Object.assign(PEOPLE.ye2,{name:'陈婉仪',glyph:'陈'});
  Object.assign(PEOPLE.du2,{name:'李秀贞',glyph:'李'});
  Object.assign(PEOPLE.su2,{name:'刘素华',glyph:'刘'});

  const prevCourtTitleV35=courtTitle;
  courtTitle=function(s,k){
    const raw=(s?.ranks&&s.ranks[k])||PEOPLE[k]?.title||'';
    const prefix={ning:'徽',ke:'晋',hui:'元'}[k];
    if(prefix){
      if(/^故|^废/.test(raw))return raw;
      if(['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'].includes(raw))return prefix+raw;
      if(/^[祺宁恪惠徽晋元](嫔|妃|贵妃|皇贵妃)$/.test(raw))return raw.replace(/^[祺宁恪惠徽晋元]/,prefix);
    }
    return prevCourtTitleV35(s,k);
  };
  displayRank=function(k,s=state){return courtTitle(s,k)};
  save();render();
}catch(e){console.error('v35 title/name patch failed',e)}})();
