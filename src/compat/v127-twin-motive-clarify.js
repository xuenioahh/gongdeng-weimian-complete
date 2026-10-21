(()=>{try{
  if(globalThis.__v127TwinMotive)return;globalThis.__v127TwinMotive=true;
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const first=CH('宫门初定');
  const twin=ST(first,'第二声哭没有名字')||ST(first,'双生异闻');
  if(twin){
    twin.text=s=>[
      `男婴会哭，也会吃奶。太医看过以后，只能写下左眼瞳色浅、右手六指，没有人能说他活不成。可第二声哭刚落，钦天监便送来“异相宜秘”的折子，宗人府也来问：这个孩子，到底要不要记进玉牒。`,
      `顾明宜没有说杀。她先下了一道临时处置：把男婴移出产殿，暂不入皇嗣院，也不上玉牒，等我裁决。她亲手写下：<b>“男婴先移出产殿，不入皇嗣院，不报玉牒，候御前裁。”</b>`,
      `我赶到绮春宫时，孩子已经被送到西华门内一处空院。桌上摆着顾明宜的小印、钦天监的折子，还有宗人府那张没有写名字的玉牒页。`,
      `我先问：“若照常入玉牒呢？”宗人府的人答，一旦记进去，他就是皇子。往后的序齿、封爵、祭礼，都绕不开这个名字。钦天监那张折子也不会消失，今后但凡宫里出了灾病，总会有人重新把这孩子翻出来说。`,
      `我又问：“若先不入册，留在宫里呢？”没人敢说这件事能瞒多久。一个没有名字、却确实活在宫里的皇子，一旦传出去，只会让传言更多。送出宫也一样：孩子还活着，身份却说不清，出了宫墙以后更不在我眼前。`,
      `我刚登基不久。三皇子是现存长子，也是皇后所出的嫡子，宗室和朝臣都盯着皇嗣。我怕的其实不是六指，也不是那只浅色眼睛。我怕的是这个孩子以后变成人人都能拿来做文章的一件事——有人拿他说天意，有人拿他说储位，也有人拿他来质问新朝为什么留下一个“异相皇子”。`,
      `现在回头看，这些都只是“以后可能发生”的事。可那一夜，我不肯让这个问题一直悬着。我想要一个今晚就能执行、明早便能交代的答案。`,
      `周清漪抱着女婴，只问我：“陛下是要他死，还是要所有人以后都当他没有活过？”`,
      `我没有再问第三种办法。顾明宜的临时单送出不到一个时辰，我的第二道旨也到了西华门。`
    ];
    twin.choices=[{
      label:'秘处异子：玉牒只留公主',
      hint:'你并不认为孩子活不成。你只是认定，只要他继续作为“一个说不清身份的皇子”活着，迟早会成为新的麻烦。你决定现在就把这个麻烦从皇室里抹掉。',
      v38TwinFate:'kill',v69CruelTwin:true,v70TwinDeathOrder:true,
      effects:{bond:{zhou:-16},trust:{zhou:-18,taihou:-5,gu:-4},flags:{twinGirlBorn:true}},
      result:'我下的是死令，不是钦天监，也不是顾明宜。奉差内侍把孩子带出西华门，内务府随后回报“已毕”。宫史只留“一子不育”。那一夜，我以为事情到这里就结束了。'
    }];
    twin.v127Motive=true;
  }
  const follow=ST(first,'绮春宫先改掉两个字');
  if(follow&&!follow.v127Motive){
    const old=follow.text;
    follow.text=s=>{
      const x=typeof old==='function'?old(s):old;
      const a=Array.isArray(x)?x:[x];
      return [...a,`很多年以后我再看这两张纸，才发现当时最急着把事情结束的人其实是我。顾明宜只写了“候御前裁”，真正把“暂不入册”变成死令的是我自己的朱笔。`];
    };
    follow.v127Motive=true;
  }
  const oldRender=typeof render==='function'?render:null;
  if(oldRender){render=function(){const r=oldRender.apply(this,arguments);document.documentElement.dataset.build='v127';document.title='宫灯未眠 · 双生死令动机补强 v127';return r}}
  document.documentElement.dataset.build='v127';document.title='宫灯未眠 · 双生死令动机补强 v127';
  try{render()}catch(_e){}
}catch(e){console.error('v127 twin motive patch failed',e)}})();
