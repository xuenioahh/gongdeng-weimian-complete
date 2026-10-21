(()=>{try{
  // ---------- G. 修正后期页面中“大公主/二公主”旧残留 ----------
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron&&!globalThis.__v129ChronWrapped){globalThis.__v129ChronWrapped=true;chronicleView=function(){let h=oldChron();return String(h)
    .replaceAll('大公主婚议','二公主婚议')
    .replaceAll('大公主成年以后，驸马人选','二公主成年以后，驸马人选')
    .replaceAll('大公主移居封邑','二公主移居封邑')
    .replaceAll('大公主自请入道观','二公主自请入道观');};}
  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople&&!globalThis.__v129PeopleWrapped){globalThis.__v129PeopleWrapped=true;peopleView=function(){let h=oldPeople();return String(h)
    .replaceAll('再把大公主婚议变成逼皇帝直面旧罪的武器','再把二公主婚议变成逼皇帝直面旧罪的武器')
    .replaceAll('在大公主后期婚议中','在二公主后期婚议中');};}

  // 老状态若曾被旧v69包装错误写死周妃，而本局尚未真正走完西华门，恢复为活人。
  try{
    const wi=CHAPTERS.findIndex(ch=>ch.title==='西华门外');
    if((state.index??0)<=wi && state.flags?.v69ZhouDead){state.flags.v69ZhouDead=false;if(state.ranks?.zhou&&String(state.ranks.zhou).startsWith('故'))state.ranks.zhou=String(state.ranks.zhou).replace(/^故/,'');}
  }catch(_e){}

  // 标题版本
  document.title='宫灯未眠 · 后半卷结构修订 v129';
  save?.();
  render?.();
}catch(e){console.error('v129 late arc structure revision failed',e);}})();
