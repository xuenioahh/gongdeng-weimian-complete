// Costume choices are visual preferences, independent of story state and save slots.
const COSTUMES156={
 gu:[['daily','松绿玉兰常服'],['spring','杏粉海棠春衣'],['summer','月白缂丝夏衫'],['banquet','绛金翟纹礼服'],['winter','黛金梅纹冬褂']],
 shen:[['daily','烟青兰影常服'],['spring','藕灰玉兰春衫'],['summer','天水荷影夏衣'],['banquet','青黛银菊宴衣'],['winter','雪灰寒梅冬衣']],
 baopu:[['daily','石榴绣雀常服'],['spring','珊瑚蝶舞春衣'],['summer','蜜金榴花夏衫'],['banquet','绯碧宝相宴服'],['winter','胭脂雪绒冬衣']],
 hanzhang:[['daily','鸦青竹影常服'],['spring','苔绿折枝春衣'],['summer','月青疏竹夏衫'],['banquet','墨蓝银竹宴服'],['winter','玄青霜竹冬衣']],
 zhangyuanzhao:[['daily','豆青素枝常服'],['spring','浅杏迎春春衣'],['summer','雨白青叶夏衫'],['banquet','湖蓝小梅宴衣'],['winter','栗灰暖绒冬衣']]
};
const COSTUME_STORAGE156='gongdeng.costumes.20261021';
let costumePrefs156=(()=>{try{const v=JSON.parse(localStorage.getItem(COSTUME_STORAGE156)||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{}}catch{return {}}})();
const costumeSrc156=(k,id)=>'assets/costumes-20261021/'+k+'-'+id+'.png';
function costumePortrait156(k,small=false){
 const item=COSTUMES156[k]?.find(([id])=>id===costumePrefs156[k]);if(!item)return '';
 return `<div class="portrait v141-portrait costume-portrait156 ${small?'small':''}" data-character="${k}" data-costume="${item[0]}" role="img" aria-label="${esc136(PEOPLE[k].name+' · '+item[1])}" style="--costume-image:url('${costumeSrc156(k,item[0])}')"></div>`;
}
const portraitBeforeCostumes156=portrait;
portrait=function(p,small=false){
 const k=Object.keys(COSTUMES156).find(key=>PEOPLE[key]===p);
 if(k){const look=typeof selectedLook==='function'&&WARDROBE[k]?selectedLook(k):'';if(!['pregnant','penitent'].includes(look)){const custom=costumePortrait156(k,small);if(custom)return custom}}
 return portraitBeforeCostumes156(p,small);
};
function mountCostumeControls156(k,box){
 const items=COSTUMES156[k];if(!items)return;
 const selected=costumePrefs156[k]||'original',section=document.createElement('section');
 section.className='costume-controls156';section.setAttribute('aria-label',PEOPLE[k].name+'的衣橱');
 section.innerHTML=`<div class="costume-heading156"><h3>四时衣橱</h3><span>五套服装 · ${selected==='original'?'原立绘':esc136(items.find(x=>x[0]===selected)?.[1]||'原立绘')}</span></div><p>按场合试穿；剧情中的孕期与受罚造型随故事显示。</p><div class="costume-options156"><button type="button" data-costume-choice="original" aria-pressed="${selected==='original'}"><span class="costume-original156">原</span><b>原立绘</b></button>${items.map(([id,name])=>`<button type="button" data-costume-choice="${id}" aria-pressed="${selected===id}"><img src="${costumeSrc156(k,id)}" alt="${esc136(PEOPLE[k].name+' · '+name)}" loading="lazy" width="1024" height="1536"><b>${esc136(name)}</b></button>`).join('')}</div>`;
 box.append(section);
 section.querySelectorAll('[data-costume-choice]').forEach(button=>button.onclick=()=>{const id=button.dataset.costumeChoice;if(id==='original')delete costumePrefs156[k];else if(items.some(x=>x[0]===id))costumePrefs156[k]=id;else return;try{localStorage.setItem(COSTUME_STORAGE156,JSON.stringify(costumePrefs156))}catch{}box.close();render136();modal138(k)});
}
globalThis.Costumes156={catalog:COSTUMES156,get preferences(){return {...costumePrefs156}}};

