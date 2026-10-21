(()=>{try{
  if(!PEOPLE.ruoxi&&CHILDREN?.ruoxi){PEOPLE.ruoxi={name:CHILDREN.ruoxi.name,title:CHILDREN.ruoxi.order,age:CHILDREN.ruoxi.age,home:'凤仪宫',noPortrait:true,portraitKind:'youngwoman',glyph:'长',introducedAt:9999,tags:['皇女','皇后抚养'],bio:''};}
  if(PEOPLE.ruoxi&&CHILDREN?.ruoxi){PEOPLE.ruoxi.name=CHILDREN.ruoxi.name;PEOPLE.ruoxi.title=CHILDREN.ruoxi.order;PEOPLE.ruoxi.age=CHILDREN.ruoxi.age;}
  // 皇子女页只留人物事实，不出现“本卷安排/未来故事”类后台说明。
  if(CHILDREN?.ruoxi)CHILDREN.ruoxi.note='皇女中居长。生母已故宁嫔，由皇后抚养，自幼常在凤仪宫与上书房之间往来。';
  if(CHILDREN?.fourthPrince)CHILDREN.fourthPrince.note='霍素英所出。承熙五年六月生，幼时多随乳母居翊坤宫。';
  if(CHILDREN?.sixthPrincess)CHILDREN.sixthPrincess.note='邵明贞所出。承熙六年生，幼时常被抱去慈宁宫。';
  if(CHILDREN?.twinGirl)CHILDREN.twinGirl.note='与一名皇子同胎而生，出生时身体康健。';
  if(CHILDREN?.twinBoy)CHILDREN.twinBoy.note='与同胞姐姐同胎而生，出生时左眼瞳色极浅、右手六指。';
  const qa=globalThis.V95_QA?.run;globalThis.V95_QA.run=function(s=state){const q=qa?q(s):{ok:true,issues:[]};const issues=[...(q.issues||[])];for(const ch of CHAPTERS)for(const st of ch.steps||[])for(const k of st.cast||[])if(!PEOPLE[k])issues.push(`未知场景人物:${ch.title}/${st.heading}/${k}`);return {...q,ok:issues.length===0,issues};};
  try{render()}catch(_e){}
}catch(e){console.error('v95d child cast guard failed',e)}})();
