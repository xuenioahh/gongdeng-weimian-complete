(()=>{try{
  const PAIRS=[
    ['能看见制度漏洞，与能尊重一个具体的人，本来就是两种本事；他前一种一直不差，后一种学得极慢。','他很会看规矩哪里会出问题，却还是常常替别人做主。这一点，他到很晚才改。'],
    ['程序完整和人真正安全仍不是一回事。','手续齐全，也不代表人就一定安全。'],
    ['真正的问题已经不只是“他是不是合适的驸马”，而是：为什么一个要进皇家婚书的人，童年最早六年像被人从纸上剪掉了。','婚书暂时不能落：一个要进皇家婚书的人，六岁以前的经历却是一片空白。'],
    ['后宫真正开始形成阵线，不是因为谁忽然想斗。','这些分歧不是一天冒出来的。'],
    ['真正的悲剧从这里开始变得讽刺。','复验把香丸判成了安全，后来再有人怀疑它，反而更难。'],
    ['真正的磨合这才开始：','从这时起，琐碎的摩擦才多起来：'],
    ['她真正想留下的是可以交接的制度，而不是“后世比古人聪明”的优越感。','她想留下的是别人接手后也能继续用的办法，不是证明后世的人比这里更聪明。'],
    ['她真正危险的不是爱争宠，而是开始相信：如果不再被选择，自己便没有别的价值。','她越来越相信，若皇帝不再选她、孩子也没留下，自己就什么都不是了。'],
    ['看得远，不等于有权替别人走那一步。','他看得再远，也不能替别人决定下一步怎么走。'],
    ['受害者身份不能自动赋予替另一个人决定的权利。','他受过皇室的伤，也不能因此替二公主决定她该承受什么。'],
    ['效率也需要出口','再快的流程也得留一条出错后能补救的路'],
    ['核心：','']
  ];
  const clean=x=>{let z=String(x??'');for(const [a,b] of PAIRS)z=z.split(a).join(b);return z;};
  const arr=v=>Array.isArray(v)?v:[v];
  for(const c of (typeof CHAPTERS!=='undefined'?CHAPTERS:[])){
    if(typeof c.theme==='string')c.theme=clean(c.theme);
    if(typeof c.bridge==='string')c.bridge=clean(c.bridge); else if(typeof c.bridge==='function'&&!c.bridge.__v116){const old=c.bridge;c.bridge=s=>clean(old(s));c.bridge.__v116=true;}
    for(const st of (c.steps||[])){
      if(typeof st.heading==='string')st.heading=clean(st.heading);
      if(st.text&&!st.__v116Text){const old=st.text;st.text=s=>arr(typeof old==='function'?old(s):old).map(clean);st.__v116Text=true;}
      for(const ch of (st.choices||[])){
        if(typeof ch.hint==='string')ch.hint=clean(ch.hint);
        if(typeof ch.result==='string')ch.result=clean(ch.result); else if(typeof ch.result==='function'&&!ch.result.__v116){const old=ch.result;ch.result=s=>clean(old(s));ch.result.__v116=true;}
      }
    }
  }
  for(const p of Object.values(globalThis.PEOPLE||{})){if(p?.bio)p.bio=clean(p.bio);if(Array.isArray(p?.tags))p.tags=p.tags.map(clean);}
  for(const c of Object.values(globalThis.CHILDREN||{})){if(c?.note)c.note=clean(c.note);}
  for(const fn of ['peopleView','childrenView','chronicleView','ending','storyView']){
    const old=globalThis[fn];if(typeof old==='function'&&!old.__v116){const w=function(...args){return clean(old.apply(this,args))};w.__v116=true;globalThis[fn]=w;}
  }
  const oldRender=globalThis.render;if(typeof oldRender==='function'&&!oldRender.__v116){const w=function(...args){const r=oldRender.apply(this,args);document.documentElement.dataset.build='v116';document.title='宫灯未眠 · 全篇语言清稿 v116';return r};w.__v116=true;globalThis.render=w;}
  document.documentElement.dataset.build='v116';document.title='宫灯未眠 · 全篇语言清稿 v116';
  try{render()}catch(_e){}
}catch(e){console.error('v116 plain-language pass failed',e)}})();
