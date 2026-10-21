(async()=>{
  await TEST140.jump(CHAPTERS.length,0,'direct','preset');
  const entries=state.chronicle||[];
  const promotion=entries.find(e=>e.title==='灯下旧局');
  const rescue=entries.find(e=>e.title==='刃落宫门');
  const failures=[];
  if(!promotion?.decision.includes('珍常在晋珍贵人'))failures.push({title:'灯下旧局',decision:promotion?.decision,expected:'珍常在晋珍贵人'});
  if(promotion?.decision.includes('珍贵人晋珍嫔'))failures.push({title:'灯下旧局',decision:promotion.decision,issue:'rank label was evaluated after the promotion'});
  if(!rescue?.decision.includes('救驾有功，珍贵人晋珍嫔'))failures.push({title:'刃落宫门',decision:rescue?.decision,expected:'the selected one-rank promotion choice'});
  const legacy=JSON.parse(JSON.stringify(state));legacy.runtimeSchema=139;delete legacy.stepDecisions;const priorPosition=legacy.index,priorHistory=legacy.history.length,priorRank=legacy.ranks.hanzhang;state=legacy;render();
  const migrated=state.chronicle.find(e=>e.title==='灯下旧局')?.decision;
  if(state.runtimeSchema!==140||migrated!=='珍常在晋珍贵人，明旨赐册')failures.push({title:'legacy save migration',schema:state.runtimeSchema,decision:migrated,expected:'rebuild dynamic rank wording'});
  if(state.index!==priorPosition||state.history.length!==priorHistory||state.ranks.hanzhang!==priorRank)failures.push({title:'legacy save migration',before:{index:priorPosition,history:priorHistory,rank:priorRank},after:{index:state.index,history:state.history.length,rank:state.ranks.hanzhang}});
  return {promotion:promotion?.decision,rescue:rescue?.decision,legacyMigrated:{schema:state.runtimeSchema,promotion:migrated,index:state.index,history:state.history.length,rank:state.ranks.hanzhang},finalRank:state.ranks.hanzhang,failures};
})()
