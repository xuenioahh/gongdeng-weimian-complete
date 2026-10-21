(()=>{try{
  const priorRender=render;
  function patchLuCard(){
    if(state.view!=='people'||!state.flags?.v69HiddenPrinceRevealed)return;
    const card=document.querySelector('[data-person="yinprince"]');if(!card)return;
    const rank=card.querySelector('.rank');if(rank)rank.textContent='周氏双生旧子 · 无玉牒位分';
    const tags=card.querySelector('.tags');if(tags)tags.innerHTML=['被抹去的旧子','宫外长大','把婚议当成武器'].map(x=>`<span>${x}</span>`).join('');
    const ps=[...card.querySelectorAll('p')].filter(x=>!x.classList.contains('meta'));
    if(ps[0])ps[0].textContent='承熙元年周清漪所生双生男婴。死令之后被内侍违旨救出，改姓陆长大。他最恨别人用四个字替自己写完一生，因此执着于纸证、旧籍与经手痕迹；可复仇时，他又把双生姐姐的婚帖当成逼皇室回头的工具。被人夺走选择是真，他后来夺走姐姐一部分选择也是真。他拒绝补一个迟到的皇子名分。';
  }
  render=function(){const out=priorRender();patchLuCard();document.documentElement.dataset.build='v114';return out;};
  patchLuCard();
}catch(e){console.error('v114 Lu card DOM finalizer failed',e)}})();
