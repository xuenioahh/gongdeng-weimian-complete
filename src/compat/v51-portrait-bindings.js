(()=>{
const cast={"ning": {"group": "a", "x": 0, "y": 0}, "ke": {"group": "a", "x": 50, "y": 0}, "hui": {"group": "a", "x": 100, "y": 0}, "zhangyuanzhao": {"group": "a", "x": 0, "y": 100}, "shunwang": {"group": "a", "x": 50, "y": 100}, "zhou": {"group": "a", "x": 100, "y": 100}, "cao2": {"group": "b", "x": 0, "y": 0}, "zhao2": {"group": "b", "x": 50, "y": 0}, "lin2": {"group": "b", "x": 100, "y": 0}, "ye2": {"group": "b", "x": 0, "y": 100}, "du2": {"group": "b", "x": 50, "y": 100}, "su2": {"group": "b", "x": 100, "y": 100}, "peiyan": {"group": "c", "x": 0, "y": 0}, "xielin": {"group": "c", "x": 50, "y": 0}, "afu": {"group": "c", "x": 100, "y": 0}};
const previous=portrait;
const safe=t=>String(t||'人物').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
portrait=function(p,small=false){
 const k=Object.keys(cast).find(k=>PEOPLE[k]===p||PEOPLE[k]?.name===p?.name);
 if(!k)return previous(p,small);
 const a=cast[k];
 return `<div class="portrait v51-character v51-art-${a.group} ${small?'small':''}" data-character="${k}" role="img" aria-label="${safe(p.name)}立绘" style="--v51-x:${a.x}%;--v51-y:${a.y}%"><span class="v51-sprite" aria-hidden="true"></span></div>`;
};
globalThis.V51_PORTRAIT_CAST=cast;
document.documentElement.dataset.build='v51-portraits';
render();
})();
