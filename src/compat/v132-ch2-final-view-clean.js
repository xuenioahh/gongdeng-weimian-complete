(()=>{try{
  function install(){
    const sv=globalThis.storyView;
    if(typeof sv==='function'&&!sv.__v132clean){
      const w=function(){
        let h=String(sv.apply(this,arguments));
        try{
          if(CHAPTERS?.[state?.index]?.title==='拾遗阁开门'){
            h=h.replace('绮春宫撤掉第二张小床以后，宫里没有停下来。二月过去，三月礼部又送来新的名单：蘅国两位王女已经到京。','');
            h=h.replace(/<span class="annal-fragment"><b>她们为什么住进宫里<\/b>蘅国已亡，旧地改设三州。两姐妹住进大晟宫里，一方面是安置，另一方面也是大晟扣在手里的两名人质。礼部文书当然不会写“人质”，只写“归附”。<\/span>/g,'');
          }
        }catch(_e){}
        return h;
      };
      w.__v132clean=true; globalThis.storyView=w;
    }
    document.documentElement.dataset.build='v132';document.title='宫灯未眠 · 第二章精修 v132';
  }
  window.addEventListener('load',()=>setTimeout(install,60));
  setTimeout(install,60);
}catch(e){console.error('v132 final view clean failed',e)}})();
