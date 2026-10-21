const clone=x=>JSON.parse(JSON.stringify(x));

const KEY=GAME_CONFIG.storage.archives;

let archive={schema:1,slots:{}};

let storageProblem='';

try{const a=JSON.parse(localStorage.getItem(KEY)||'null');if(a?.schema===1&&a.slots&&typeof a.slots==='object')archive=a;}catch{storageProblem='无法读取本机存档，请先导出当前进度。';}

const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(archive));storageProblem='';return true;}catch{storageProblem='浏览器未能保存，请使用“导出当前进度”下载备份。';return false;}};

function pack(){if(globalThis.FinaleReview149?.active)return clone(globalThis.FinaleReview149.original);return {...(globalThis.SceneHistory151?.position(state)||{}),game:'gongdeng',schema:1,build:52,savedAt:new Date().toISOString(),chapter:CHAPTERS[state.index]?.title||'卷终',heading:CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'',state:clone(state),people:Object.fromEntries(Object.entries(PEOPLE).map(([k,p])=>[k,{introducedAt:p.introducedAt,title:p.title,home:p.home,glyph:p.glyph}])),harem:typeof HAREM_KEYS!=='undefined'?[...HAREM_KEYS]:[],wardrobe:clone(wardrobePrefs)};}

function validate(a){
 if(a?.state&&globalThis.v139PrepareChapters)globalThis.v139PrepareChapters(a.state);
 if(!a||a.game!=='gongdeng'||a.schema!==1||a.build!==52||!a.state)throw Error('请选择本版导出的《宫灯未眠》存档。');
 const s=a.state;
 if(a.sceneId&&globalThis.SceneHistory151){
  const at=globalThis.SceneHistory151.resolve(a.sceneId);
  if(!at)throw Error('存档场景标识无法对应当前剧情，未覆盖当前进度。');
  s.index=at.ci;s.chapterStep=at.si;a.chapter=CHAPTERS[at.ci].title;a.heading=CHAPTERS[at.ci].steps[at.si].heading;
 }
 if(s.version!==26||!Number.isInteger(s.index)||s.index<0||s.index>CHAPTERS.length||!Number.isInteger(s.chapterStep)||s.chapterStep<0||(s.index<CHAPTERS.length&&s.chapterStep>=CHAPTERS[s.index].steps.length))throw Error('存档的章节位置无效。');
 for(const k of ['flags','ranks','bond','trust'])if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k]))throw Error('存档数据不完整。');
 for(const k of ['history','chronicle','stepHistory','stepResults','stepChanges'])if(!Array.isArray(s[k]))throw Error('存档记录不完整。');
 if(s.index<CHAPTERS.length&&(a.chapter!==CHAPTERS[s.index].title||a.heading!==CHAPTERS[s.index].steps[s.chapterStep].heading))throw Error('存档与当前章节结构不一致，未覆盖当前进度。');
 return a;
}

function restore(a,backup=true){validate(a);if(globalThis.FinaleReview149?.active)globalThis.FinaleReview149.leave('',false);if(backup){archive.slots.backup=pack();if(!persist())throw Error(storageProblem);}state=clone(a.state);state.view='story';coverPreview=false;
 for(const [k,p] of Object.entries(a.people||{}))if(PEOPLE[k])for(const key of ['introducedAt','title','home','glyph'])if(p[key]!==undefined)PEOPLE[k][key]=p[key];
 if(typeof HAREM_KEYS!=='undefined'&&Array.isArray(a.harem)){HAREM_KEYS.splice(0,HAREM_KEYS.length,...a.harem.filter(k=>PEOPLE[k]));}
 wardrobePrefs=clone(a.wardrobe||{});if(backup)save();return true;
}

if(archive.slots.auto){try{restore(archive.slots.auto,false);}catch(e){storageProblem=e.message;}}

save=function(){if(globalThis.FinaleReview149?.active)return;archive.slots.auto=pack();persist();};

function endingRecords149(){return Object.entries(archive.endings||{}).filter(([_k,a])=>globalThis.FinaleReview149?.isComplete(a)).map(([key,pack])=>({key,pack:clone(pack)}));}
function rememberEnding149(force=false){
 if(globalThis.FinaleReview149?.active||state.index!==CHAPTERS.length||!state.flags?.v82FinaleComplete)return;
 const f=state.flags,key=[f.v74ShaoThenZhang?'ning':'direct',f.v81PrinceOpenEnding?'shungong':'shunqian',f.v75ShenFate||'unset'].join('_');
 archive.endings??={};
 if(force||!archive.endings[key]){archive.endings[key]=pack();persist();}
}
