(()=>{try{
  function lateInstall(){
    try{if(typeof applyV132==='function')applyV132()}catch(_e){}
    const r=globalThis.render;
    if(typeof r==='function'&&!r.__v132late){
      const w=function(){try{if(typeof applyV132==='function')applyV132()}catch(_e){};const out=r.apply(this,arguments);try{if(typeof applyV132==='function')applyV132()}catch(_e){};document.documentElement.dataset.build='v132';document.title='宫灯未眠 · 第二章精修 v132';return out;};
      w.__v132late=true; globalThis.render=w;
    }
    const sv=globalThis.storyView;
    if(typeof sv==='function'&&!sv.__v132late){
      const sw=function(){try{if(typeof applyV132==='function')applyV132()}catch(_e){};return sv.apply(this,arguments);};
      sw.__v132late=true; globalThis.storyView=sw;
    }
    document.documentElement.dataset.build='v132'; document.title='宫灯未眠 · 第二章精修 v132';
  }
  window.addEventListener('load',()=>setTimeout(lateInstall,20));
  setTimeout(lateInstall,0);
}catch(e){console.error('v132 late hook failed',e)}})();
