(async()=>{
  const result={chapterCount:CHAPTERS.length,chapters:CHAPTERS.map(c=>({title:c.title,steps:c.steps.map(s=>s.heading)})),routes:{}};
  for(const route of ['direct','ning']){
    await TEST140.jump(CHAPTERS.length,0,route,'preset');
    result.routes[route]={index:state.index,step:state.chapterStep,ranks:state.ranks,flags:state.flags,bond:state.bond,trust:state.trust,history:state.history,chronicle:state.chronicle,people:Object.keys(PEOPLE).map(k=>v138Person(k)),children:v138Children()};
  }
  return JSON.parse(JSON.stringify(result));
})()
