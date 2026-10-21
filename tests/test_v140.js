const fs=require('fs');
const vm=require('vm');

const path=require('path');
const file=process.argv[2]||path.join(__dirname,'..','index.html');
const html=fs.readFileSync(file,'utf8');

class VElement{
  constructor(tag='div',attrs={}){this.tagName=tag.toUpperCase();this.attrs=attrs;this.dataset={};this.style={};this._classes=new Set(String(attrs.class||'').split(/\s+/));this.classList={add:k=>this._classes.add(k),remove:k=>this._classes.delete(k),contains:k=>this._classes.has(k),toggle:k=>{if(this._classes.has(k)){this._classes.delete(k);return false;}this._classes.add(k);return true;}};this.onclick=null;this.disabled='disabled' in attrs;this.textContent='';this._html='';for(const [k,v] of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=v;}
  setAttribute(k,v){this.attrs[k]=String(v)}
  getAttribute(k){return this.attrs[k]??null}
  set innerHTML(v){this._html=String(v??'');if(this===app)parseApp(this._html)}
  get innerHTML(){return this._html}
  querySelectorAll(){return[]}
  querySelector(){return null}
  insertAdjacentHTML(_p,v){this._html+=String(v??'')}
  appendChild(){return null}
  remove(){}
  close(){}
  showModal(){}
  addEventListener(type,fn){this['on'+type]=fn}
  getBoundingClientRect(){return{top:0,left:0,width:100,height:100}}
  closest(){return null}
  cloneNode(){return new VElement(this.tagName.toLowerCase(),this.attrs)}
}

const app=new VElement('div',{id:'app'}),modal=new VElement('dialog',{id:'modal'}),body=new VElement('body'),head=new VElement('head');
let virtual=[];
function parseAttrs(raw){const a={};raw.replace(/([:\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g,(_m,k,v1,v2,v3)=>{a[k]=v1??v2??v3??'';return''});return a}
function parseApp(s){virtual=[];const re=/<(button|div|main|article|aside|section|span|dialog|select|option|details|summary|p|pre)\b([^>]*)>/gi;let m;while((m=re.exec(s)))virtual.push(new VElement(m[1],parseAttrs(m[2])))}
function match(el,sel){
  if(sel.startsWith('#'))return el.attrs.id===sel.slice(1);
  const d=sel.match(/^\[data-([\w-]+)\]$/);if(d)return Object.prototype.hasOwnProperty.call(el.attrs,'data-'+d[1]);
  if(sel.startsWith('.'))return String(el.attrs.class||'').split(/\s+/).includes(sel.slice(1));
  return el.tagName.toLowerCase()===sel.toLowerCase();
}
function queryAll(sel){if(sel==='[data-view]'||sel==='[data-choice]'||sel==='[data-person]'||sel==='[data-replay]'||sel==='[data-scene-image]'||sel==='[data-spot]'||sel==='[data-speak-line]')return virtual.filter(x=>match(x,sel));return virtual.filter(x=>match(x,sel))}
function query(sel){if(sel==='#app')return app;if(sel==='#modal')return modal;return queryAll(sel)[0]||null}

const errors=[],warnings=[],storage=new Map(),listeners={};
const document={
  documentElement:{dataset:{},setAttribute(k,v){this[k]=String(v)},removeAttribute(k){delete this[k]},getAttribute(k){return this[k]??null}},body,head,
  querySelector:query,querySelectorAll:queryAll,getElementById:id=>query('#'+id),
  createElement:tag=>new VElement(tag),
  addEventListener:(t,f)=>{(listeners[t]||(listeners[t]=[])).push(f)},
};
const sandbox={
  __storedKeys:()=>Array.from(storage.keys()),
  TEST_ROUTE:process.env.TEST_ROUTE||'default',
  START_STATE:process.env.STATE_FIXTURE?JSON.parse(fs.readFileSync(process.env.STATE_FIXTURE,'utf8')):null,
  console:{log(){},warn:(...a)=>warnings.push(a.map(String).join(' ')),error:(...a)=>errors.push(a.map(String).join(' '))},
  document,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
  location:{reload(){}},navigator:{},history:{},Image:class{},Audio:class{},
  confirm:()=>true,alert(){},requestAnimationFrame:fn=>{if(typeof fn==='function')fn()},cancelAnimationFrame(){},
  setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},
  innerWidth:1200,innerHeight:900,scrollY:0,scrollTo(){},
  speechSynthesis:{cancel(){},getVoices(){return[]},speak(){},addEventListener(){}},SpeechSynthesisUtterance:function(){},
};
sandbox.window=sandbox;sandbox.globalThis=sandbox;sandbox.addEventListener=(t,f)=>{(listeners[t]||(listeners[t]=[])).push(f)};
vm.createContext(sandbox);

const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].map(m=>{
  const src=m[1].match(/\bsrc=["']([^"']+)["']/);
  return src?fs.readFileSync(path.resolve(path.dirname(file),src[1]),'utf8'):m[2];
});
scripts.forEach((code,i)=>{if(!code.trim())return;try{vm.runInContext(code,sandbox,{filename:`script-${i+1}.js`,timeout:60000})}catch(e){errors.push(`script-${i+1}: ${e.stack||e}`)}});

const initialErrors=errors.length,initialErrorDetails=errors.slice();errors.length=0;warnings.length=0;
function run(code){return vm.runInContext(code,sandbox,{timeout:60000})}
if(process.env.AUDIT_FILE){Promise.resolve(run(fs.readFileSync(process.env.AUDIT_FILE,'utf8'))).then(result=>{console.log(JSON.stringify({result,initialErrorDetails,errors,warnings},null,2));process.exit(initialErrorDetails.length||errors.length||result?.failures?.length?1:0);}).catch(e=>{console.log(JSON.stringify({error:e.stack,initialErrorDetails,errors,warnings}));process.exit(1)});}else {

const meta=run(`CHAPTERS.slice(0,11).map((c,i)=>({chapter:i+1,title:c.title,steps:c.steps?.length||1}))`);
if(process.env.INSPECT_CHAPTER){
  const ci=Number(process.env.INSPECT_CHAPTER)-1;
  console.log(JSON.stringify(run(`CHAPTERS[${ci}].steps?.map((s,i)=>({step:i+1,heading:s.heading,narrative:!!s.narrative,choices:s.choices?.map(c=>({label:typeof c.label==='function'?String(c.label):c.label,effects:c.effects||{},costMind:c.costMind||0,requires:c.requires?String(c.requires):''}))}))||[]`),null,2));
  process.exit(0);
}
if(process.env.INSPECT_KEYS){
  console.log(JSON.stringify(run(`(()=>{const out={};CHAPTERS.slice(0,11).forEach((ch,ci)=>(ch.steps||[{choices:ch.choices||[]}]).forEach((st,si)=>(st.choices||[]).forEach((c,oi)=>{const extra=Object.keys(c).filter(k=>!['label','hint','effects','result','requires','costMind'].includes(k));if(extra.length)out[(ci+1)+'-'+(si+1)+'-'+(oi+1)]=extra.reduce((a,k)=>(a[k]=c[k],a),{});})));return out})()`),null,2));
  process.exit(0);
}
if(process.env.INSPECT_SPECIAL){
  console.log(JSON.stringify(run(`(()=>{const out=[];CHAPTERS.slice(0,11).forEach((ch,ci)=>(ch.steps||[{choices:ch.choices||[]}]).forEach((st,si)=>(st.choices||[]).forEach((c,oi)=>{const f=c.effects?.flags||{};if(c.v38TwinFate||c.v69CruelTwin||c.v70TwinDeathOrder||f.v123FangInitialRank||f.v123FangFirstPromotion)out.push({chapter:ci+1,step:si+1,choice:oi+1,label:typeof c.label==='function'?String(c.label):c.label,twin:c.v38TwinFate||null,cruel:!!c.v69CruelTwin,deathOrder:!!c.v70TwinDeathOrder,initialRank:f.v123FangInitialRank||null,firstPromotion:!!f.v123FangFirstPromotion});})));return out})()`),null,2));
  console.log('INITIAL_ERRORS '+JSON.stringify(initialErrorDetails));
  process.exit(0);
}
if(process.env.VERIFY_EFFECTS){
  const checks=JSON.parse(run(`JSON.stringify((()=>{
    const out=[];
    function reset(ci,si,rank){state=JSON.parse(JSON.stringify(INITIAL_STATE));state.index=ci;state.chapterStep=si;state.intro=true;state.view='story';state.stepHistory=Array(si).fill(0);state.stepResults=Array(si).fill('');state.stepChanges=[];if(rank)state.ranks.fang=rank;}
    CHAPTERS.slice(0,11).forEach((ch,ci)=>(ch.steps||[]).forEach((st,si)=>(st.choices||[]).forEach((c,oi)=>{
      const f=c.effects?.flags||{};
      if(c.v38TwinFate||f.v123FangInitialRank||f.v123FangFirstPromotion){
        reset(ci,si,f.v123FangFirstPromotion?'答应':null);choose(oi);
        const twin=!!c.v38TwinFate;
        const pass=twin
          ?state.flags.twinBoyFate===c.v38TwinFate&&state.flags.twinGirlBorn===true&&state.flags.twinBoyRegistered===(c.v38TwinFate==='keep')&&(!c.v69CruelTwin||state.flags.v69TwinOrderedDead===true)&&(!c.v70TwinDeathOrder||state.flags.v70TwinDeathOrder===true)&&!!CHILDREN.twinGirl
          :f.v123FangInitialRank?state.ranks.fang===f.v123FangInitialRank:state.ranks.fang==='常在';
        out.push({chapter:ci+1,step:si+1,choice:oi+1,kind:twin?'twin':f.v123FangInitialRank?'fang-initial':'fang-promotion',rank:state.ranks.fang||null,fate:state.flags.twinBoyFate||null,registered:state.flags.twinBoyRegistered,girlBorn:state.flags.twinGirlBorn,girlCard:!!CHILDREN.twinGirl,boyCard:!!CHILDREN.twinBoy,syncType:typeof syncTwinChildrenV38,cruel:!!state.flags.v69TwinOrderedDead,deathOrder:!!state.flags.v70TwinDeathOrder,pass});
      }
    })));
    return out;
  })())`));
  console.log(JSON.stringify(checks,null,2));
  if(!checks.length||checks.some(x=>!x.pass))process.exitCode=1;
  process.exit();
}
run(`state=JSON.parse(JSON.stringify(INITIAL_STATE));state.intro=true;state.view='story';render()`);

const chapters=[];let clickCount=0,branchCount=0;
while(run('state.index')<11){
  const idx=run('state.index'),human=idx+1;
  const report={chapter:human,title:run('CHAPTERS[state.index].title'),steps:0,buttons:0,branches:0,disabled:0};
  while(run('state.index')===idx){
    report.steps++;
    run('render()');
    const buttons=queryAll('[data-choice]');
    if(!buttons.length)throw new Error(`第${human}章第${report.steps}幕没有选项按钮`);
    report.buttons+=buttons.length;
    const before=run('JSON.stringify(state)');
    for(const b of buttons){
      if(typeof b.onclick!=='function')throw new Error(`第${human}章第${report.steps}幕选项${b.dataset.choice}未绑定`);
      if(b.disabled){report.disabled++;continue}
      run(`state=JSON.parse(${JSON.stringify(before)});render()`);
      const live=queryAll('[data-choice]').find(x=>x.dataset.choice===b.dataset.choice);
      if(!live||typeof live.onclick!=='function')throw new Error(`第${human}章第${report.steps}幕选项${b.dataset.choice}重绘后失联`);
      const pos=run('[state.index,state.chapterStep]');live.onclick();const next=run('[state.index,state.chapterStep]');
      if(next[0]===pos[0]&&next[1]===pos[1])throw new Error(`第${human}章第${report.steps}幕选项${b.dataset.choice}点击未推进`);
      clickCount++;report.branches++;branchCount++;
    }
    run(`state=JSON.parse(${JSON.stringify(before)});render()`);
    let canonical=queryAll('[data-choice]').find(x=>!x.disabled);
    if(!canonical){
      const lows=[...queryAll('[data-v78-low]'),...queryAll('[data-v95-low]')];
      if(lows.length){
        for(const item of lows.slice(0,2).map(x=>({key:x.dataset.v78Low||x.dataset.v95Low,attr:x.dataset.v78Low?'v78Low':'v95Low'}))){
          const liveLow=[...queryAll('[data-v78-low]'),...queryAll('[data-v95-low]')].find(x=>(x.dataset.v78Low||x.dataset.v95Low)===item.key);
          if(!liveLow||typeof liveLow.onclick!=='function')throw new Error(`第${human}章第${report.steps}幕低位候选${item.key}未绑定`);
          liveLow.onclick();
        }
        canonical=queryAll('[data-choice]').find(x=>!x.disabled);
      }
    }
    if(!canonical){
      const detail=run(`JSON.stringify({heading:CHAPTERS[state.index].steps?.[state.chapterStep]?.heading,mind:state.mind,flags:state.flags,choices:CHAPTERS[state.index].steps?.[state.chapterStep]?.choices?.map(c=>({label:typeof c.label==='function'?c.label(state):c.label,costMind:c.costMind||0,requires:c.requires?String(c.requires):''}))})`);
      throw new Error(`第${human}章第${report.steps}幕无可用选项 ${detail}`);
    }
    canonical.onclick();
    if(report.steps>200)throw new Error(`第${human}章疑似循环`);
  }
  chapters.push(report);
}

const completed=run('JSON.stringify(state)');
const replay=[];
for(let to=5;to<=10;to++){
  run(`state=JSON.parse(${JSON.stringify(completed)});render();replay(${to})`);
  const buttons=queryAll('[data-choice]');
  replay.push({chapter:to+1,index:run('state.index'),step:run('state.chapterStep'),buttons:buttons.length,bound:buttons.every(x=>typeof x.onclick==='function')});
}
const legacyReplay=[];
for(let to=1;to<=11;to++){
  run(`state=JSON.parse(${JSON.stringify(completed)});state.chapterSnapshots=[];state.view='story';render();replay(${to})`);
  legacyReplay.push({chapter:to,index:run('state.index'),twinFate:run('state.flags.twinBoyFate||null'),twinDeathRecorded:run('!!state.flags.v69TwinOrderedDead'),fangRank:run('state.ranks.fang||null'),buttons:queryAll('[data-choice]').length});
}

run(`state=JSON.parse(${JSON.stringify(completed)});state.view='story';render()`);
const menu={};
for(const view of ['people','children','chronicle','map','story']){
  run(`state.view=${JSON.stringify(view)};render()`);
  const nav=queryAll('[data-view]');
  menu[view]={count:nav.length,bound:nav.every(x=>typeof x.onclick==='function'),hasContent:app.innerHTML.length>100};
}

const result={file,build:document.documentElement.dataset.build,title:sandbox.document.title,initialLegacyErrors:initialErrors,initialErrorDetails,meta,chapters,clickCount,branchCount,replay,legacyReplay,menu,errors,warnings:warnings.slice(0,10),finalIndex:run('state.index'),historyLength:run('state.history.length'),chronicleLength:run('state.chronicle.length')};
console.log(JSON.stringify(result,null,2));
if(errors.length||chapters.length!==11||!replay.every(x=>x.index===x.chapter-1&&x.step===0&&x.buttons>0&&x.bound)||!legacyReplay.every(x=>x.index===x.chapter&&x.buttons>0)||!Object.values(menu).every(x=>x.count===5&&x.bound&&x.hasContent))process.exitCode=1;

}
