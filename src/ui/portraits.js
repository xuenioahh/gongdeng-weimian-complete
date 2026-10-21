const legacyPortrait141=portrait;

portrait=function(p,small=false){
    const k=ART141_KEYS.find(key=>PEOPLE[key]===p);
    if(!k)return legacyPortrait141(p,small);
    const look=typeof selectedLook==='function'&&typeof WARDROBE!=='undefined'&&WARDROBE[k]?selectedLook(k):'';
    // Pregnancy and punishment still follow the existing story-specific costume artwork.
    if(!person138(k).dead&&(look==='pregnant'||look==='penitent'))return legacyPortrait141(p,small);
    return `<div class="portrait v141-portrait ${small?'small':''}" data-character="${k}" role="img" aria-label="${p.name}高清立绘"></div>`;
  };
