(()=>{
  const failures=[];
  const ci=CHAPTERS.findIndex(c=>c.title==='刃落宫门');
  const si=CHAPTERS[ci]?.steps?.findIndex(s=>String(s.heading).includes('救驾有功，要不要写进位分'))??-1;
  if(ci<0||si<0)return {failures:['救驾晋位场景不存在']};
  for(const option of [0,1]){
    state=JSON.parse(JSON.stringify(INITIAL_STATE));
    state.index=ci;state.chapterStep=si;state.intro=true;state.view='story';
    state.ranks.hanzhang='贵人';
    const choice=CHAPTERS[ci].steps[si].choices[option];
    const label=typeof choice.label==='function'?choice.label(state):choice.label;
    const result=resolvedResult(choice,state);
    if(option===0&&(!label.includes('晋珍嫔')||!result.includes('新册写作“珍嫔”')))
      failures.push({option,label,result,issue:'晋位选项文字与结果不符'});
    if(option===1&&(!label.includes('不晋位')||!result.includes('位分不改')))
      failures.push({option,label,result,issue:'不晋位选项文字与结果不符'});
    choose(option);
    const expected=option===0?'嫔':'贵人';
    if(state.ranks.hanzhang!==expected)
      failures.push({option,rank:state.ranks.hanzhang,expected,issue:'晋位状态与所选选项不符'});
  }
  const weather=seasonWeather(ci,si,'秋');
  const positions=[...weather.matchAll(/--left:(\d+)%/g)].map(x=>Number(x[1]));
  if(positions.length!==10||new Set(positions).size!==10||Math.min(...positions)<3||Math.max(...positions)>96)
    failures.push({positions,issue:'落叶位置未分散'});
  return {scene:CHAPTERS[ci].steps[si].heading,positions,failures};
})()
