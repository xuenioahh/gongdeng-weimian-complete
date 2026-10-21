function settleHeirs139(c,previous){
    const clone=x=>JSON.parse(JSON.stringify(x||{}));
    const heirs=clone(previous.extraHeirs);
    if(c.v40Heir){
      const {round,key}=c.v40Heir,signature=[round,key,(state.flags.lowConsorts||[]).join(','),state.flags.year3Favor||'',state.flags.twinBoyRegistered?'T':''].join('|');
      const hash=t=>[...t].reduce((n,c)=>(Math.imul(n,31)+c.charCodeAt(0))>>>0,0);
      const gender=hash('sex|'+signature)%100<52?'F':'M';
      const used=new Set(['杨顺谦','杨顺恭','杨顺安','杨令兮','杨昭焉','杨宁矣','杨晏尔',...Object.entries(heirs).filter(([r])=>Number(r)!==Number(round)).map(([,x])=>x.name)]);
      const pool=(gender==='M'?['杨顺昭','杨顺平','杨顺礼','杨顺嘉','杨顺宁','杨顺和']:['杨清而','杨嘉则','杨和乃','杨贞亦','杨安以','杨柔于']).filter(x=>!used.has(x));
      const prior=heirs[round];
      heirs[round]={mother:key,gender,name:prior?.mother===key&&prior.name?prior.name:pool[hash('name|'+signature)%pool.length],order:(['零','一','二','三','四','五','六','七','八','九','十'][(gender==='M'?(state.flags.twinBoyFate==='keep'?6:5):5)+Object.entries(heirs).filter(([r,x])=>Number(r)<round&&!x.skipped&&x.gender===gender).length]||'幼')+(gender==='M'?'皇子':'公主'),born:false,v40:true,v139Stable:true};
    }
    if(c.v40HeirSkip)heirs[c.v40HeirSkip]={skipped:true,v40:true};
    for(const r of [1,2])if(c.effects?.flags?.['extraHeir'+r+'Born']&&heirs[r]&&!heirs[r].skipped)heirs[r].born=true;
    if(Object.keys(heirs).length)state.flags.extraHeirs=heirs;else delete state.flags.extraHeirs;
    for(const r of [1,2]){delete CHILDREN['extraHeir'+r];const x=heirs[r];if(x?.born&&!x.skipped)CHILDREN['extraHeir'+r]={...x,order:'皇嗣',mother:x.mother};}
  }
