(()=>{try{
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const late=CH('帘后朱笔');
  const rel=late?.steps?.find(st=>st?.v75id==='emperor-zhang-define'||String(st?.heading||'').includes('陛下为什么总叫我来'));
  if(rel){
    const routeOK=s=>!!(
      s?.flags?.v44NewEmpress==='zhangyuanzhao' ||
      s?.flags?.v74ZhangSucceeded ||
      s?.ranks?.zhangyuanzhao==='皇后' ||
      s?.flags?.v96FreeJump
    );
    const relationChoices=[
      {label:'“因为朕敢在你面前说：这件事朕不知道怎么办。”',effects:{trust:{zhangyuanzhao:5},bond:{zhangyuanzhao:2},flags:{v75EmperorZhangBond:'confidant'}},result:'我说：“别人进养心殿，总等着朕给答案。朕若说不知道，他们会慌。你不会。你会坐下来把能问的先问完；朕若做错，你也会直接说错了。朕把这样的人叫知己。”张元照点头：“那臣妾明白了。知己不是替陛下收拾错事的人。”我道：“本来就不是。”'},
      {label:'“有时候没有事。朕只是想让你坐在那儿。”',effects:{trust:{zhangyuanzhao:4},bond:{zhangyuanzhao:4},flags:{v75EmperorZhangBond:'family'}},result:'我说：“朕批朕的折子，你看你的册子，可以一晚上都不说话。朕累了不用解释，病了也不用听你哭。你想走的时候照样回凤仪宫。朕把这种相处算家人，不算夫妻情爱。”张元照问：“家人可以当面说不么？”我答：“你不说不，朕反而不习惯。”'},
      {label:'“因为难事来了，朕知道你会把你那一份做完。”',effects:{trust:{zhangyuanzhao:5},flags:{v75EmperorZhangBond:'partner'}},result:'我说：“你把问题找出来，把利弊说清。最后准还是驳，朕自己写。事情办完，你回凤仪宫，朕回养心殿。朕不需要你爱朕，也不会拿这份信任换你的别的东西。”张元照笑了一下：“那就是一起做事的人。”我道：“是。”'}
    ];
    const skipChoice={label:'这一场私话没有发生，继续往下读',effects:{flags:{v101SkippedZhangRelation:true}},result:''};
    rel.heading='雨停以后，她问：陛下为什么总叫我来';
    rel.keyDecision=true;
    rel.narrative=false;
    rel.text=s=>{
      if(routeOK(s)){
        rel.choices=relationChoices;
        return [
          `雨停时已经过了三更。沈知微先回永和宫，裴景和也退到外间。西暖阁只剩我和张元照。`,
          `她把最后一本折子合上，没有起身：“陛下，臣妾想问一句私话。”`,
          `“问。”`,
          `“陛下不爱臣妾。臣妾也不爱陛下。这个我们都知道。”`,
          `我嗯了一声。`,
          `她看着我：“那为什么有些夜里明明没有宫务，陛下还是会叫臣妾来？”`,
          `这句话比问“宠不宠”难答。她问的不是名分，是我为什么已经习惯在她面前留一个位置。`
        ];
      }
      rel.choices=[skipChoice];
      return [`本局张元照没有受凤印，这一场私话没有发生。`];
    };
  }
  const previousRender=render;
  render=function(){
    const out=previousRender();
    document.documentElement.dataset.build='v101';
    document.title='宫灯未眠 · 张元照落子死路修复 v101';
    return out;
  };
  try{save()}catch(_e){}
  try{render()}catch(e){console.error('v101 deadlock fix render',e)}
}catch(e){console.error('v101 Zhang relation deadlock fix failed',e)}})();
