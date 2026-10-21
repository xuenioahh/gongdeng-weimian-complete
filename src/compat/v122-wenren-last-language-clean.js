(()=>{try{
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const ARR=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const pairs=[
    ['至少你是从宫女升成了主子。我们不是，我们是从原来的地方被送进宫。','至少你是从宫女升成了主子。我们不是，我们是从原来的地方被送进宫。'],
    ['多谢陛下让她们在宫里安稳住下。','多谢陛下让她们在宫里安稳住下。'],
    ['所以臣妾没有替陛下选。','所以臣妾没有替陛下选。'],
    ['人都在京里，见一面却这么难。','人都在京里，见一面却这么难。'],
    ['以前嫌它难吃。现在想吃，也没人做得出原来的味道了。','以前嫌它难吃。现在想吃，也没人做得出原来的味道了。']
  ];
  const clean=x=>{let z=String(x??'');for(const [a,b] of pairs)z=z.replaceAll(a,b);return z};
  function apply(){
    for(const ch of (CHAPTERS||[]).slice(0,5)){
      if(typeof ch.bridge==='string')ch.bridge=clean(ch.bridge);
      else if(typeof ch.bridge==='function'&&!ch.__v122LastBridge){const b=ch.bridge;ch.bridge=s=>clean(b(s));ch.__v122LastBridge=true}
      for(const st of ch.steps||[]){
        if(st.text&&!st.__v122Last){const o=st.text;st.text=s=>ARR(o,s).map(clean);st.__v122Last=true}
        for(const c of st.choices||[]){
          if(typeof c.hint==='string')c.hint=clean(c.hint);
          if(typeof c.result==='string')c.result=clean(c.result);
          else if(typeof c.result==='function'&&!c.__v122Last){const r=c.result;c.result=s=>clean(r(s));c.__v122Last=true}
        }
      }
    }
    document.documentElement.dataset.build='v122';document.title='宫灯未眠 · 前五章闻人线对白重写 v122';
  }
  apply();
  const sv=typeof storyView==='function'?storyView:null;if(sv&&!globalThis.__v122LastStory){globalThis.__v122LastStory=true;storyView=function(){apply();return clean(sv.apply(this,arguments))}}
  const rr=typeof render==='function'?render:null;if(rr&&!globalThis.__v122LastRender){globalThis.__v122LastRender=true;render=function(){apply();const x=rr.apply(this,arguments);apply();return x}}
  try{render()}catch(e){console.error('v122 last clean render',e)}
}catch(e){console.error('v122 last clean failed',e)}})();
