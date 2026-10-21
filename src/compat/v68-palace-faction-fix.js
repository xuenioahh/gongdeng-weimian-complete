(()=>{try{
  // Named ranks such as 元嫔/元妃 also need to demote correctly.
  if(typeof demoteRank==='function'&&!globalThis.__v68NamedDemote){
    globalThis.__v68NamedDemote=true;const oldDemote=demoteRank;
    demoteRank=function(k){const cur=String(state?.ranks?.[k]||'');if(k==='hui'&&cur.startsWith('元')){const bases=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];const base=bases.find(x=>cur.endsWith(x));const i=bases.indexOf(base);if(i>0){state.ranks[k]='元'+bases[i-1];return true;}}return oldDemote(k)};
  }
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const addAfter=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v68id===obj.v68id))return;const i=ch.steps.findIndex(x=>(x.heading||'').includes(q));if(i>=0)ch.steps.splice(i+1,0,obj);else ch.steps.push(obj)};
  const vacancy=CH('中宫空悬');
  addAfter(vacancy,'她们第一次把话说在凤仪宫里',{v68id:'palace-petitions',heading:'冬至前三日 · 两份帖子都没有写谁想做皇后',cast:['emperor','ning','zhangyuanzhao','zhou','hanzhang','ke','song2'],fx:'snow',narrative:true,text:s=>[
    `冬至前三日，六宫同时递来两份联名帖。两张纸都写得很谨慎，谁也没有写“请立某人为后”。`,
    `第一份主张：中宫未定以前，祭礼、命妇朝见、皇嗣大礼都应由六宫中位次最高、资序最稳的人统一承接。落款多是旧人和礼法出身的宫眷。人人看得懂，这条路最后会把越来越多事情送到邵明贞手里。`,
    `第二份却说：后位既空，便把祭礼、病籍、皇嗣、尚宫四项暂时分开，各由熟悉的人负责，不另设“代中宫”。宋文秀在末尾签了名，几个受过张元照疫后册务影响的低位宫嫔也跟着签。`,
    `周清漪两份都没签。她把帖子推回去时只说：“我要是今天签哪一张，明天别人就会说我两个孩子替谁站了队。”`,
    `霍素英也没签。她更直接：“北营已经被人画过一次圈了，臣妾不想再被画第二次。”`,
    `含章看完两张，只问传帖宫女：“谁先起的头？”宫女答不上来。`,
    `我让邵明贞与张元照都进来，把两张帖摆在她们面前。`,
    `邵明贞先道：“第一份若照做，确实会把许多事送到臣妾这里。但有人统一承担，总比四处找人强。”`,
    `张元照看的是第二份：“拆开能减少一人独断，也会让每件事都多一道交接。若没人最后收口，照样会乱。”`,
    `我问：“所以你们都不认自己那一张？”`,
    `两个人同时沉默了一瞬。邵明贞先说：“臣妾认它的好处，也认它偏向臣妾。”`,
    `张元照随后道：“臣妾也一样。”`,
    `<div class="v68-courtcase"><strong>后宫真正开始形成阵线，不是因为谁忽然想斗。</strong>空着的凤印、外朝的家门、已经试行的新办法，把每个人日常做事的方式慢慢推成了政治立场。</div>`
  ],choices:[
    {label:'“帖子都留下。以后谁再递，就把发起人的名字一起写上。”',hint:'不禁站队，但不许用“六宫公议”藏掉是谁起头。',effects:{trust:{ning:1,zhangyuanzhao:1,hanzhang:1},flags:{v68PalaceFactionsOpen:true}},result:'两份帖子没有被定成罪证。此后宫里仍有人联名，但第一行必须写清谁先提出。'},
    {label:'直接问她们：“若今日让你们各退一步，最不肯退的是哪一件？”',hint:'把派别从纸上拉回当事人的真实底线。',effects:{trust:{ning:2,zhangyuanzhao:2,zhou:1,ke:1},flags:{v68PalaceFactionsTalked:true}},result:'那天谈到很晚。没人放弃自己的路，却至少不再假装两张帖子只是“为了六宫方便”。'}
  ]});
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v68 palace faction fix failed',e)}})();
