const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'audit/历史Prompt总审计_2026-10-11');
const scenes=JSON.parse(fs.readFileSync(path.join(dir,'当前运行场景.json')));
const titles=[...new Set(scenes.filter(x=>x.route==='direct').map(x=>x.title))];
const context={CHAPTERS:titles.map(title=>({title}))};
vm.runInNewContext(fs.readFileSync(path.join(root,'src/data/history-biographies-complete.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'src/data/history-biographies.js'),'utf8')+'\nthis.get=historyBiography138;this.keys=Object.keys(HISTORY_LIVES_151);',context);
const full=()=>({flags:{lowConsorts:['cao2','zhao2','lin2','du2','ye2','su2']},ranks:{},chronicle:titles.map(title=>({title}))});
const report={pass:false,checks:[],people:context.keys.length+3};
const check=(name,fn)=>{fn();report.checks.push(name)};
try{
 check('all 30 current named people have a life',()=>{for(const k of [...context.keys,'gu','fang','afu'])assert.ok(context.get(k,full()).length>=45,k)});
 check('early lives do not unlock future chapters',()=>{for(const k of ['shen','shunwang','zhangyuanzhao','ning','yinprince','daila']){const s=full();s.chronicle=[];const text=context.get(k,s);assert.doesNotMatch(text,/赐死|私留机务|冒籍处置|皇后。|血脉只留|封地。|三月初九/);}});
 check('reloading early progress removes later life',()=>{const s=full();assert.match(context.get('zhangyuanzhao',s),/秋疫/);s.chronicle=[];assert.doesNotMatch(context.get('zhangyuanzhao',s),/秋疫|凤印议决/)});
 check('three Shen outcomes remain distinct',()=>{for(const [flag,yes,no] of [['death','赐死','女观清修'],['fief','随皇嗣赴封地','赐死'],['religion','女观清修','被赐死']]){const s=full();s.flags.v75ShenFate=flag;const text=context.get('shen',s);assert.ok(text.includes(yes));assert.ok(!text.includes(no));}});
 check('three Daila decisions distinguish hold from consent',()=>{for(const [flag,expected] of [['return','自请归国'],['stay','不入侍寝册'],['hold','暂留未记为她已选择续留']]){const s=full();s.flags.v56DailaFate=flag;assert.ok(context.get('daila',s).includes(expected));}});
 check('unadmitted first-batch women have no invented life',()=>{const s=full();s.flags.lowConsorts=[];for(const k of ['cao2','zhao2','lin2','du2','ye2','su2'])assert.equal(context.get(k,s),'')});
 check('epidemic victims cannot perform later living scenes',()=>{for(const [k,late] of [['cao2','向新人同时讲明'],['zhao2','后遇领错份例'],['lin2','多年后仍补'],['du2','借人的约定沿用多年']]){const s=full();s.flags.v46LowVictim=k;s.ranks[k]='故常在';assert.ok(!context.get(k,s).includes(late));assert.ok(context.get(k,s).length>45);}});
 check('read-only biography queries do not mutate saved state',()=>{const s=full(),before=JSON.stringify(s);for(const k of context.keys)context.get(k,s);assert.equal(JSON.stringify(s),before)});
 check('career uses each historical title rather than final rank',()=>{const s=full();s.ranks.zhangyuanzhao='皇后';s.chronicle=[{title:'宫灯渐繁',date:'承熙六年'},{title:'荷风满座',date:'承熙十一年'},{title:'雪尽宫门',date:'承熙十二年'}];s.chapterSnapshots=[{ranks:{zhangyuanzhao:'常在'}},{ranks:{zhangyuanzhao:'贵人'}},{ranks:{zhangyuanzhao:'文妃'}}];const text=context.get('zhangyuanzhao',s);assert.match(text,/承熙六年，授常在/);assert.match(text,/承熙十一年，晋为贵人/);assert.match(text,/承熙十二年，晋为文妃/);assert.doesNotMatch(text,/承熙六年，.*皇后/)});
 report.pass=true;
}finally{fs.writeFileSync(path.join(dir,'人物志补齐验收.json'),JSON.stringify(report,null,2));}
console.log(JSON.stringify(report));
