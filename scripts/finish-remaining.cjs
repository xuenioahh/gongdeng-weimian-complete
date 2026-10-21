const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {pathToFileURL}=require('node:url');
const {chromium}=require('/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/四项收尾_2026-10-13');
fs.mkdirSync(out,{recursive:true});
const mode=process.argv[2]||'capture',label=process.argv[3]||'before';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const page=await browser.newPage({reducedMotion:'reduce',viewport:{width:1600,height:1200}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const raw=fs.readFileSync(process.argv[4]?path.resolve(root,process.argv[4]):path.join(root,'app.js'),'utf8');
  const body=raw.replace('/* Source: src/boot-2.js */',`globalThis.F155={story:story136,initial:initial136,prepare:prepare139,normalize:normalize136,allowed:allowed136,val:val136,bulk:x=>bulk140=x,person:person138,children:children138,biography:historyBiography138,effects:effects136,seals:settleSeals154,yearbook:settleYearbook155,endingBegin:beginEndingReview149,endingLeave:leaveEndingReview149,snapshot:snapshot136};\n/* Source: src/boot-2.js */`);
  await page.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body}));await page.goto(pathToFileURL(path.join(root,'index.html')).href);
  if(mode==='capture'){
   const result=await page.evaluate(async()=>{
    const routes=[],saveBefore=save;save=()=>{};F155.bulk(true);
    try{for(const route of ['direct','ning']){
     state=F155.initial();state.intro=true;state.view='story';F155.prepare(state);const scenes=[];const start=performance.now();
     while(state.index<26){
      F155.normalize();const ch=CHAPTERS[state.index],st=ch.steps[state.chapterStep];
      if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];
      let pick=st.choices.some(c=>c.v74ShaoThenZhang)?st.choices.findIndex(c=>route==='ning'?c.v74ShaoThenZhang:c.effects?.flags?.v44NewEmpress==='zhangyuanzhao'):st.choices.findIndex(F155.allowed);
      const markup=F155.story(),holder=document.createElement('template');holder.innerHTML=markup;
      const text=holder.content.querySelector('.prose')?.textContent||'';
      const before={ci:state.index,si:state.chapterStep,heading:st.heading,text,choices:st.choices.map(c=>({label:F155.val(c.label,''),effects:c.effects,allowed:F155.allowed(c),special:Object.fromEntries(Object.entries(c).filter(([k,v])=>/^v\d+/.test(k)&&typeof v!=='function'))})),pick};
      choose(pick);before.after=F155.snapshot();scenes.push(before);if(scenes.length>600)throw Error('Loop');
      if(scenes.length%32===0)await new Promise(r=>setTimeout(r,0));
     }
     routes.push({route,scenes,final:F155.snapshot(),seconds:(performance.now()-start)/1000});
    }}finally{save=saveBefore;F155.bulk(false);}
    return routes;
   });
   fs.writeFileSync(path.join(out,`运行基线-${label}.json`),JSON.stringify({sha256:crypto.createHash('sha256').update(raw).digest('hex'),routes:result,errors},null,2));
   console.log(JSON.stringify({label,routes:result.map(r=>({route:r.route,count:r.scenes.length,seconds:r.seconds})),errors}));
  }else if(mode==='seal-continuations'){await require('../tests/seal-combinations-155.cjs')({page,root,out,continuationsOnly:true});
  }else if(mode==='seals'){await require('../tests/seal-combinations-155.cjs')({page,root,out});
  }else if(mode==='severe-save'){await require('../tests/severe-arc-save155.cjs')({page,root,out});
  }else if(mode==='visual'){await require('../tests/visual-final-155.cjs')({page,root,out});
  }else if(mode==='ui'){await require('../tests/final-ui-155.cjs')({page,root,out});
  }else if(mode==='heirs'){await require('../tests/heir-combinations-155.cjs')({page,root,out});
  }else if(mode==='cross'){await require('../tests/cross-combinations-155.cjs')({page,root,out,cohort:['male','female','no-shen','shen-loss','public','indulged'].includes(label)?label:'male'});
  }else if(mode==='art'){
   const files=[];function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,ent.name);if(ent.isDirectory())walk(p);else if(/\.(png|webp|jpe?g)$/i.test(p))files.push(p)}}walk(path.join(root,'assets'));files.sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
   const placements=await page.evaluate(()=>TEST140.artPlacements());const rows=files.map((file,i)=>({index:i+1,file:path.relative(root,file),sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),placements:placements.filter(p=>p.src===path.relative(root,file))}));
   for(let start=0;start<rows.length;start+=12){
    await page.setContent(`<html><body style="margin:0;background:#f3eee2;font-family:sans-serif"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:12px">${rows.slice(start,start+12).map(r=>`<div style="height:300px;overflow:hidden;background:white;border:1px solid #cab"><img src="${pathToFileURL(path.join(root,r.file)).href}" style="width:100%;height:252px;object-fit:contain"><div style="padding:4px;font-size:13px">${r.index}: ${r.file}<br>${r.placements.map(p=>p.caption).join(' / ')||'未挂叙事图'}</div></div>`).join('')}</div></body></html>`);
    await page.locator('img').evaluateAll(async imgs=>Promise.all(imgs.map(img=>img.decode())));
    await page.screenshot({path:path.join(out,`图片目视-${String(Math.floor(start/12)+1).padStart(2,'0')}.png`),fullPage:true});
   }
   fs.writeFileSync(path.join(out,'图片清单.json'),JSON.stringify(rows,null,2));console.log(JSON.stringify({files:rows.length,sheets:Math.ceil(rows.length/12)}));
  }
 }finally{await browser.close();}
})().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
