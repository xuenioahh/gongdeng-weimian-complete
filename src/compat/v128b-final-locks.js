(()=>{try{
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t), ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const first=CH('宫门初定'), twin=ST(first,'第二声哭没有名字');
  if(twin&&twin.choices?.[0]){
    twin.choices[0].hint='你怕的不是孩子活不成，而是他的身份永远说不清。为了让这件事今晚就结束，你决定直接抹掉这个“以后可能成为麻烦”的人。';
    twin.choices[0].result='我下的是死令，不是钦天监，也不是顾明宜。奉差内侍把孩子带出西华门，内务府随后回报“已毕”。宫史只留“一子不育”。那一夜，我以为事情到这里就结束了。';
    try{Object.defineProperty(twin,'choices',{value:twin.choices,writable:false,configurable:true,enumerable:true})}catch(_e){}
  }
  const mother=CH('母至');
  const reg=ST(mother,'顾明宜把两份仪注都留了空');
  if(reg){
    reg.heading='第七日 · 闻人蘅先把自己的答案说了';
    if(reg.choices?.[0]){reg.choices[0].label='册为蘅嫔，准留旧银簪与常服';reg.choices[0].hint='她已经自己决定入六宫；这一笔只决定她还能不能保留日常旧物。'}
    if(reg.choices?.[1]){reg.choices[1].label='册为蘅嫔，礼服与日常衣冠都改用大晟宫制';reg.choices[1].hint='她仍按自己的决定进入六宫，但旧国衣饰不再作为正式例外保留。'}
    try{Object.defineProperty(reg,'heading',{value:reg.heading,writable:false,configurable:true,enumerable:true});Object.defineProperty(reg,'choices',{value:reg.choices,writable:false,configurable:true,enumerable:true})}catch(_e){}
  }
  const aud=ST(mother,'第一次以蘅嫔请安');
  if(aud){aud.heading='册封后第一日 · 第一次以蘅嫔请安';try{Object.defineProperty(aud,'heading',{value:aud.heading,writable:false,configurable:true,enumerable:true})}catch(_e){}}
  document.documentElement.dataset.build='v128';document.title='宫灯未眠 · 前五场结构润色 v128';
}catch(e){console.error('v128 final locks failed',e)}})();
