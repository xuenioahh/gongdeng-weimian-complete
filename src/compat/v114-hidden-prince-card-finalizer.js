(()=>{try{
  const previousPeopleView=peopleView;
  function sync114Lu(){
    if(!state.flags?.v69HiddenPrinceRevealed||!PEOPLE?.yinprince)return;
    Object.assign(PEOPLE.yinprince,{
      title:'周氏双生旧子 · 无玉牒位分',
      tags:['被抹去的旧子','宫外长大','把婚议当成武器'],
      bio:'承熙元年周清漪所生双生男婴。死令之后被内侍违旨救出，改姓陆长大。他最恨别人用四个字替自己写完一生，因此执着于纸证、旧籍与经手痕迹；可复仇时，他又把双生姐姐的婚帖当成逼皇室回头的工具。被人夺走选择是真，他后来夺走姐姐一部分选择也是真。他拒绝补一个迟到的皇子名分。',
      signature:'谈自己的身世时几乎不看人；被二公主问“你凭什么替我决定”时第一次答不出第二句。'
    });
  }
  peopleView=function(){sync114Lu();return previousPeopleView();};
  document.documentElement.dataset.build='v114';
  document.title='宫灯未眠 · 皇子女全局人设梳理润色 v114';
}catch(e){console.error('v114 hidden prince card finalizer failed',e)}})();
