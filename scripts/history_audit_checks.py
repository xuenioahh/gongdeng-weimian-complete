"""Preserve fresh results of existing historical acceptance suites."""
import subprocess,json,time,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
out=root/'audit/历史Prompt总审计_2026-10-11';out.mkdir(exist_ok=True)
suites=['biography-pilot.cjs','browser-history-followups.cjs','browser-low-birth-rank.cjs','browser-fang-investigation.cjs','browser-heavy-batch4.cjs','browser-heavy-batch9.cjs','browser-ch23-audit.cjs','browser-ch24-handover.cjs','browser-unresolved-batch3.cjs','browser-epidemic.cjs','browser-culture.cjs','browser-cover.cjs','browser-palace-atlas.cjs','browser-route-switch.cjs','browser-ending-revisit.cjs','browser-ending-production.cjs','browser-final-montage.cjs','browser-finale-reveal.cjs','browser-rescue-and-leaves.cjs','browser-focused-audits.cjs','browser.mjs']
results=[]
for suite in suites:
 start=time.monotonic()
 try:
  r=subprocess.run(['node',str(root/'tests'/suite)],cwd=root,capture_output=True,text=True,timeout=420)
  code=r.returncode;log=r.stdout+'\n'+r.stderr
 except subprocess.TimeoutExpired as e:
  code=124;log=str(e.stdout or '')+'\n'+str(e.stderr or '')+'\nTimeout after 420 seconds'
 (out/(suite+'.log')).write_text(log)
 results.append({'suite':suite,'exit_code':code,'seconds':round(time.monotonic()-start,2),'log':suite+'.log','finished_at':time.strftime('%Y-%m-%d %H:%M:%S')})
 (out/'历史专项复验.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
 print(json.dumps(results[-1],ensure_ascii=False),flush=True)
print('ALL COMPLETE',len(results),'FAILED',sum(r['exit_code']!=0 for r in results),flush=True)
