(()=>{try{
  const previousStoryView=storyView;
  const F=s=>s?.flags||{};
  const childAlive=(key,s=state)=>!(Array.isArray(F(s).v46ChildVictims)&&F(s).v46ChildVictims.includes(key));
  const esc=s=>String(s??'');
  const prose=lines=>`<div class="prose v114-story-extra" data-v114-story-extra="1">${lines.map(x=>`<div class="v52-paragraph">${x}</div>`).join('')}</div>`;
  function inject(h,lines){
    if(!lines?.length||h.includes('data-v114-story-extra="1"'))return h;
    const block=prose(lines);
    for(const anchor of ['<div class="key-decision-note"','<section class="narrative-turn"','<section class="choices"']){
      const i=h.indexOf(anchor);if(i>=0)return h.slice(0,i)+block+h.slice(i);
    }
    return h;
  }
  storyView=function(){
    let h=previousStoryView();
    if(state.view!=='story'||state.index>=CHAPTERS.length)return h;
    const step=CHAPTERS[state.index]?.steps?.[state.chapterStep||0];
    const heading=String(step?.heading||'');
    const f=F(state);let lines=[];
    if(heading.includes('家宴席间，诸子女渐长')){
      if(f.fifthPrincessBorn&&childAlive('fifthPrincess'))lines.push(`三公主杨宁矣伸手去拿橘子，指尖碰到盘沿又停下来：“这个我可以拿吗？”大公主把整盘往她面前推：“你想吃就拿。不是每一盘东西都要先问是谁的份例。”她想了一会儿，才拿了最小的一个。`);
      if(f.fourthPrinceBorn&&childAlive('fourthPrince'))lines.push(`杨顺恭和侍读赌投壶，第一轮输了。他没有闹，只自己去把歪掉的箭捡回来：“再来。”霍素英隔着半桌说：“输了就是输了。再来是下一局。”他点头，第二局果然先重新算距离。`);
      if(f.sixthPrincessBorn&&childAlive('sixthPrincess'))lines.push(`杨晏尔听见宁矣问“可以吗”，忽然插嘴：“她也是父皇的女儿，为什么拿橘子要先问？”桌上静了一息。邵明贞只道：“因为有人从小听见的话不一样。”晏尔还想追问，大公主把剥好的橘子塞给她：“先吃。这个问题别忘，改天再问。”`);
    }else if(heading.includes('三皇子已经十八')){
      lines=[`顺谦小时候不是没挨过训。只是他身份太重，母后、师傅、内侍总会下意识先把最难看的部分收起来：错字重誊，摔坏的东西先撤，外臣面前能不让他丢脸便不让。顾明宜是在护孩子，也是在护中宫的嫡子。久而久之，他真正不熟悉的不是失败，而是失败之后没有人替他把场面变得好看。`,`所以我现在要教他的，不只是河工、兵法或礼制。是有人说“不”以后，他能不能坐在那里把后半句听完。`];
    }else if(heading.includes('大公主借走一阵风')){
      lines=[`那年以后，她在自己的书匣里多放了一张很小的纸，写的不是妹妹尺寸、乳母咳嗽或谁该添冬衣，只写“想做的东西”。第一行是风轮，第二行是能自己合上的书架门。纸只写给她自己看。`];
    }else if(heading.includes('储位终于写进密匣')&&f.v81PrinceOpenEnding){
      lines=[`顺恭被召来以前还在射圃。他进门时先问：“三哥不回来，所以轮到儿臣？”`,`我说：“不是轮到。是朕最后选了你。”`,`他沉默一会儿：“从前儿臣输了还能说再来一次。”`,`“以后也会输。”`,`“可他们会不会不让儿臣再来？”`,`我没有骗他：“会有人这样。”`,`他低头看着密匣，第一次没有立刻说“那就再来”。`];
    }
    return inject(h,lines);
  };
  // render() 的 v114 最终层会在运行时调用全局 storyView，因此无需再套一层 render。
  document.documentElement.dataset.build='v114';
  document.title='宫灯未眠 · 皇子女全局人设梳理润色 v114';
  try{render()}catch(_e){}
}catch(e){console.error('v114 story display finalizer failed',e)}})();
