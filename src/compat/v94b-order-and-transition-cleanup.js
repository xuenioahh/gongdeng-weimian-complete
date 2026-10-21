(()=>{try{
  const C=t=>(CHAPTERS||[]).find(x=>x?.title===t), S=(ch,q)=>(ch?.steps||[]).find(x=>String(x?.heading||'').includes(q));
  const years=C('宫灯渐繁');
  if(years?.steps){
    const move=(q,to)=>{const i=years.steps.findIndex(st=>String(st?.heading||'').includes(q));if(i<0)return;const [st]=years.steps.splice(i,1);const j=Math.max(0,Math.min(typeof to==='function'?to(years.steps):to,years.steps.length));years.steps.splice(j,0,st)};
    // 第一次大选后立刻出现一次极轻的景阳宫生活；年资晋位靠近本章末端。
    move('景阳宫东配殿',1);
    move('年资册上多了一行',a=>Math.max(0,a.length-1));
  }
  const first=C('御前终选');
  const low=S(first,'偏殿六张脸')||S(first,'偏殿还有六个人');
  if(low&&low.__v94wrap){
    const old=low.text;low.text=s=>{const a=old(s);return (Array.isArray(a)?a:[a]).filter(x=>!String(x).includes('张元照不在这六张可增减的名额里'))};
  }
  const second=C('空宫点灯');
  const tea=S(second,'新茶');
  if(tea){tea.text=s=>[
    `开春后，沈知微第一次主动给我沏新茶。`,
    `茶汤颜色很浅，入口也没有旧茶的涩。`,
    `我喝了一口：“不苦了。”`,
    `她把茶盖扣上：“旧茶放太久，也该换。”`,
    `“顺王的琴呢？”`,
    `“带走了。”`,
    `“舍得？”`,
    `她笑了一下：“又不是臣妾的。”`,
    `那天以后，永和宫只泡新茶。`
  ]}
  const hz=S(second,'珍妃开始自己吃那包蜜饯');
  if(hz){hz.text=s=>[
    `含章仍然不侍寝。她来养心殿时，有时带棋谱，有时带一小包蜜饯。`,
    `那是方小满从前爱买的味道。方小满死后，她第一次自己拆开，吃了一颗。`,
    `“太甜？”`,
    `“还好。”`,
    `她把剩下的放在窗边。走时又回头，让宫女把空了很久的旧蜜饯罐拿去洗。`
  ]}
  const empty=S(second,'空宫先被灰尘占满');
  if(empty){empty.text=s=>[
    `开春以后，内务府报了三处修缮：拾遗阁东厢瓦松，听雨轩封院后墙皮返潮，西六宫两座空院窗纸全坏。`,
    `顾明宜拿着图册一处处核。掌事说听雨轩若不补瓦，梅雨一到梁木也要坏。`,
    `我路过凤仪宫时，她正和人量窗纸。`,
    `“都修？”`,
    `她翻到听雨轩那页：“先补瓦，门仍封着。”`,
    `第二天，匠人扛着木梯进了西六宫。听雨轩门上的封条没有动。`
  ]}
  globalThis.V94_QA=globalThis.V94_QA||{};
  globalThis.V94_QA.yearsFirstHeadings=years?.steps?.slice(0,4).map(x=>x.heading)||[];
  globalThis.V94_QA.yearsLastHeadings=years?.steps?.slice(-4).map(x=>x.heading)||[];
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v94b order cleanup failed',e)}})();
