(()=>{
  const failures=[],rankTransitions=[];
  const chIndex=CHAPTERS.findIndex(c=>c.title==='灯下旧局');
  const ch=CHAPTERS[chIndex];
  const si=ch?.steps?.findIndex(s=>String(s.heading||'').includes('这盘棋，是我自己坐的'))??-1;
  const rankNames=['常在','贵人','嫔','妃'];
  const rankOrder=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];
  const title=r=>`珍${r}`;
  for(let i=0;i<rankNames.length;i++)for(let option=0;option<2;option++){
    const before=rankNames[i],expected=option===0?rankOrder[rankOrder.indexOf(before)+1]:before;
    state=JSON.parse(JSON.stringify(INITIAL_STATE));
    state.index=chIndex;state.chapterStep=si;state.view='story';
    state.ranks.hanzhang=before;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];
    const choice=ch?.steps?.[si]?.choices?.[option];
    const debug={raw:state.ranks.hanzhang,current:courtTitle(state,'hanzhang'),next:hanzhangNextTitle08(state)};
    const label=typeof choice?.label==='function'?choice.label(state):choice?.label;
    const result=resolvedResult(choice,state);
    if(!choice||(option===0&&(!label?.includes(title(expected))||!result.includes(title(expected))))||(option===1&&(!label?.includes('不晋位')||!result.includes(title(before)))))failures.push({before,option,label,result,expected:title(expected),debug,issue:'label/result does not match the selected promotion policy'});
    choose(option);
    const actual=state.ranks.hanzhang;
    if(actual!==expected)failures.push({before,option,actual,expected,issue:'state did not advance exactly one rank'});
    rankTransitions.push({before:title(before),option:option+1,label,after:title(actual),resultMatchesState:result.includes(title(expected))});
  }
  const child=CHILDREN.fifthPrincess;
  const opening=CHAPTERS.find(c=>c.title==='拾遗阁开门');
  const seal=opening?.steps?.findIndex(s=>String(s.heading||'').includes('第一份册封'))??-1;
  const entryRanks=['常在','贵人','贵人','常在'];
  const entryBranches=[];
  for(let i=0;i<entryRanks.length;i++){
    const currentOpening=CHAPTERS.find(c=>c.title==='拾遗阁开门');
    state=JSON.parse(JSON.stringify(INITIAL_STATE));state.index=CHAPTERS.indexOf(currentOpening);state.chapterStep=seal;
    choose(i);const actual=state.ranks.hanzhang;
    if(actual!=='珍'+entryRanks[i])failures.push({branch:i+1,actual,expected:'珍'+entryRanks[i],issue:'initial rank choice state mismatch'});
    entryBranches.push({choice:i+1,raw:actual,title:courtTitle(state,'hanzhang'),expected:'珍'+entryRanks[i]});
  }
  const birthChapter=CHAPTERS.find(c=>c.title==='宫灯渐繁');
  const birth=birthChapter?.steps?.find(s=>String(s.heading||'').includes('三公主洗三'));
  state=JSON.parse(JSON.stringify(INITIAL_STATE));
  state.flags.lowConsorts=['lin2'];state.flags.lowPregnancyKey='lin2';state.ranks.lin2='贵人';
  const birthText=Array.isArray(birth?.text?.(state))?birth.text(state).join('\n'):String(birth?.text?.(state)||'');
  if(child?.name!=='杨宁矣'||child?.order!=='三公主')failures.push({child,issue:'CHILDREN record differs from canon'});
  if(!birthText.includes('三公主')||!birthText.includes('杨宁矣')||birthText.includes('若华'))failures.push({birthText,issue:'birth scene name/order differs from CHILDREN'});
  const stale=[];
  for(const c of CHAPTERS)for(const s of c.steps||[]){
    const text=typeof s.text==='function'?s.text(state):s.text;
    const flat=Array.isArray(text)?text.join('\n'):String(text||'');
    if(flat.includes('若华'))stale.push({chapter:c.title,heading:s.heading});
  }
  if(stale.length)failures.push({stale,issue:'unsupported name remains in active chapter text'});
  return {checks:{entryChapter:opening?.title,entryScene:opening?.steps?.[seal]?.heading,chapter:ch?.title,step:ch?.steps?.[si]?.heading,child:child&&{name:child.name,order:child.order},birthHeading:birth?.heading},entryBranches,rankTransitions,activeChapterNameOccurrences:stale.length,failures};
})()
