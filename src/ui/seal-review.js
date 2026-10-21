// Optional combined reading of the existing eight seals. All settlements still
// pass through choose136, in the original order, with current rank caps.
function remainingSeals154(chapter,step){
 if(chapter?.title!=='雪尽宫门'||!/^大封 [1-8]\/8/.test(step?.heading||''))return [];
 const start=chapter.steps.indexOf(step),rows=[];
 for(let i=start;i<chapter.steps.length&&/^大封 [1-8]\/8/.test(chapter.steps[i].heading||'');i++)rows.push({step:chapter.steps[i],index:i,id:sceneIdentity151(chapter,chapter.steps[i])?.id});
 return rows;
}
function sealReview154(chapter,step){
 const rows=remainingSeals154(chapter,step);if(rows.length<2)return '';
 return `<details class="seal-review"><summary>合阅余下${rows.length}页册书</summary><p>各人功绩仍可展开细读。选好后按原册序落旨；晋封遇位额已满时，仍依原例记功加赏。也可收起，继续逐页裁断。</p><form id="seal-review-form" data-start="${state.chapterStep}" data-chapter="${state.index}">${rows.map(({step,index})=>{
  const sealKey=step.choices.find(c=>c.v55Promote)?.v55Promote;
  if(sealKey&&!person138(sealKey).admitted)return `<div class="seal-review-row"><p>${esc136(PEOPLE[sealKey].name)}未入宫，此页略过。</p><input type="hidden" data-seal-step="${index}" value="0"></div>`;
  let text=val136(step.text,[]);text=Array.isArray(text)?text:[text];
  text=cultureText147(chapter,step,text,state);text=historyText150(chapter,step,text,state);text=restoredText151(chapter,step,text,state);text=lowLifeText151(chapter,step,text,state);text=characterText153(chapter,step,text,state);text=literaryText148(chapter,step,text);
  return `<div class="seal-review-row"><label for="seal-pick-${index}">${esc136(step.heading.replace(/^大封 \d\/8 · /,''))} · ${esc136(person138(step.cast[0],state).title)}</label><details><summary>功绩与接册</summary>${text.map(p=>`<p>${p}</p>`).join('')}</details><select id="seal-pick-${index}" data-seal-step="${index}" required><option value="">请选择此人的册旨</option>${step.choices.map((choice,pick)=>`<option value="${pick}" ${allowed136(choice)?'':'disabled'}>${esc136(choice.v55Promote?'依位额晋一级；额满则记功加赏':val136(choice.label,''))}</option>`).join('')}</select></div>`;
 }).join('')}<p role="status" id="seal-review-status"></p><button type="submit" class="primary">按册序落定这些旨意</button></form></details>`;
}
function settleSeals154(picks,chapterIndex,start){
 if(state.index!==chapterIndex||state.chapterStep!==start)throw new Error('册页位置已变，请重新审阅。');
 const rows=remainingSeals154(CHAPTERS[state.index],CHAPTERS[state.index]?.steps[state.chapterStep]);
 if(rows.length!==picks.length||!picks.every((pick,i)=>Number.isInteger(pick)&&!!rows[i].step.choices[pick]))throw new Error('请为每一页选择册旨。');
 const wasBulk=bulk140;bulk140=true;
 try{
  for(let i=0;i<picks.length;i++){
   const current=CHAPTERS[state.index]?.steps[state.chapterStep];
   if(state.index!==chapterIndex||sceneIdentity151(CHAPTERS[state.index],current)?.id!==rows[i].id||state.chapterStep!==rows[i].index)throw new Error('册序已变，请从当前册页继续。');
   if(!allowed136(current.choices[picks[i]]))throw new Error('当前册旨条件已变，请从当前册页继续选择。');
   choose136(picks[i]);
  }
 }finally{bulk140=wasBulk;if(!bulk140)render136();}
}
function bindSealReview154(){
 const form=document.querySelector('#seal-review-form');if(!form)return;
 form.onsubmit=e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const picks=[...form.querySelectorAll('[data-seal-step]')].map(s=>Number(s.value));
  try{settleSeals154(picks,Number(form.dataset.chapter),Number(form.dataset.start));scrollAfterChoice(true,false);}
  catch(error){const status=document.querySelector('#seal-review-status');if(status)status.textContent=error.message;}
 };
}
function readabilityText154(chapter,step,paragraphs){
 if(chapter?.title==='宫灯渐繁'&&String(step?.heading).includes('承熙五年九月'))return paragraphs.map(p=>String(p).replace('四皇子满月后的第二日，','九月初，'));
 if(chapter?.title!=='帘后朱笔'||!String(step?.heading).includes('张后四签'))return paragraphs;
 return paragraphs.map(p=>{
  const text=String(p);
  if(text.includes('源自宫疫中的')&&text.includes('双簿四签法'))return `<details class="decree-attachment"><summary>附诏 · 经手留名令条文</summary>${text}</details>`;
  if(text.startsWith('诏书一下，外朝的分歧也摆到了明面上'))return '';
  return p;
 }).filter(Boolean);
}

// The two adjacent seasonal decisions stay at their old save positions. A reader
// may review them together; November's candidates are recalculated from September.
function yearbookRows155(chapter,step){
 if(chapter?.title!=='宫灯渐繁'||!String(step?.heading).includes('承熙五年九月'))return [];
 const si=chapter.steps.indexOf(step),next=chapter.steps[si+1];
 return next?.choices?.some(c=>c.v40Heir?.round===2)?[step,next]:[];
}
function predictedPregnancy155(choice,s=state){
 const predicted=JSON.parse(JSON.stringify(s));predicted.flags.extraHeirs??={};
 if(choice?.v40Heir)predicted.flags.extraHeirs[1]={mother:choice.v40Heir.key,born:false};
 else predicted.flags.extraHeirs[1]={skipped:true};
 return predicted;
}
function yearbook155(chapter,step){
 const rows=yearbookRows155(chapter,step);if(!rows.length)return '';
 return `<details class="seal-review yearbook-review"><summary>合阅九月与冬月两页承宠册</summary><p>先定九月，冬月会剔除已有孕者。两个时点各自结算，出生和后续晋位仍按原来的月份发生。</p><form id="yearbook-form" data-start="${state.chapterStep}" data-chapter="${state.index}"><label for="yearbook-september">承熙五年九月</label><select id="yearbook-september" required><option value="">请选择九月安排</option>${rows[0].choices.map((c,i)=>`<option value="${i}" ${allowed136(c)?'':'disabled'}>${esc136(val136(c.label,''))}</option>`).join('')}</select><label for="yearbook-november">承熙五年冬月</label><select id="yearbook-november" required disabled><option value="">先选九月，再核冬月名单</option></select><details><summary>冬月册页</summary><div id="yearbook-preview"></div></details><p id="yearbook-status" role="status"></p><button type="submit" class="primary">按月份落定两页安排</button></form></details>`;
}
function settleYearbook155(picks,chapterIndex,start){
 const chapter=CHAPTERS[state.index],rows=yearbookRows155(chapter,chapter?.steps[state.chapterStep]);
 if(state.index!==chapterIndex||state.chapterStep!==start||rows.length!==2||picks.length!==2||!picks.every((p,i)=>Number.isInteger(p)&&rows[i].choices[p]))throw Error('册页位置或选择已变，请重新审阅。');
 const first=rows[0].choices[picks[0]],second=rows[1].choices[picks[1]],pred=predictedPregnancy155(first);
 if(!allowed136(first)||second.requires&&!second.requires(pred))throw Error('冬月应避开已有孕者，请重选。');
 const wasBulk=bulk140;bulk140=true;
 try{choose136(picks[0]);if(!allowed136(CHAPTERS[state.index].steps[state.chapterStep].choices[picks[1]]))throw Error('冬月名单已变，请从当前册页继续。');choose136(picks[1]);}
 finally{bulk140=wasBulk;if(!bulk140)render136();}
}
function bindYearbook155(){
 const form=document.querySelector('#yearbook-form');if(!form)return;
 const september=form.querySelector('#yearbook-september'),november=form.querySelector('#yearbook-november');
 september.onchange=()=>{
  const rows=yearbookRows155(CHAPTERS[state.index],CHAPTERS[state.index]?.steps[state.chapterStep]);if(!rows.length||september.value===''){november.disabled=true;return;}
  const predicted=predictedPregnancy155(rows[0].choices[Number(september.value)]),step=rows[1];
  november.disabled=false;november.innerHTML='<option value="">请选择冬月安排</option>'+step.choices.map((c,i)=>`<option value="${i}" ${c.requires&&!c.requires(predicted)?'disabled':''}>${esc136(val136(c.label,''))}</option>`).join('');
  let text=typeof step.text==='function'?step.text(predicted):step.text;text=Array.isArray(text)?text:[text];
  document.querySelector('#yearbook-preview').innerHTML=text.map(p=>`<p>${p}</p>`).join('');
 };
 form.onsubmit=e=>{e.preventDefault();if(!form.reportValidity())return;try{settleYearbook155([Number(september.value),Number(november.value)],Number(form.dataset.chapter),Number(form.dataset.start));scrollAfterChoice(true,false);}catch(error){const status=document.querySelector('#yearbook-status');if(status)status.textContent=error.message;}};
}

function sceneDensity155(chapter,step,paragraphs){
 if(chapter?.title!=='帘后朱笔')return paragraphs;
 const heading=String(step?.heading||'');
 const edits=[
  ['和妃把一句太直的话改了三遍','后来很多夜里，张元照先圈出问题，沈知微把它们整理成问目和谕旨初稿，我在最后一页改字、删句、落朱批。三个人分工越来越熟，熟到养心殿的小太监只看纸张叠放的顺序，就知道哪一摞还没过和妃的手。','后来，元照圈问目，知微改初稿，我落朱批。小太监认得纸张叠放的顺序，知道哪一摞还没过永和宫的手。'],
  ['灯下三个人都知道这件事太好用了','入秋以后，这套办法越来越快。张元照能在一堆折子里先挑出彼此矛盾的数字；沈知微记得哪个官员上一次在同一件事上用了什么措辞，也知道什么时候一句“严查”会逼下面先毁证据。','入秋，折子过她们的手越来越快，送到我面前时，疑处已经圈好。'],
  ['灯下三个人都知道这件事太好用了','张元照说：“臣妾能核数字、指出疑处。可这份折子最后怎么批，得由陛下定。”','张元照说：“这一份得陛下自己看。”'],
  ['灯下三个人都知道这件事太好用了','“若臣妾连处置也拟好了，陛下只落朱批，这事就成了臣妾在定。”','“臣妾连处置都拟好，陛下还要看什么？”'],
  ['九月十五，永和宫那声“元照”被孩子听见了','这些时候没有替她们挡住后来那场处分，也没有让谁欠谁一生。它们只是几段过完了的日子：雨停，茶凉，下一回仍有人记得带上松子。','雨停，茶凉，下一回仍有人记得带上松子。']
 ];
 return paragraphs.map(p=>{
  let text=String(p);for(const [scene,from,to] of edits)if(heading===scene)text=text.replace(from,to);
  if(heading==='女史院 · 正月十二 · 女史院开始招人'&&text.startsWith('女史试任三年'))return `<details class="decree-attachment"><summary>附章程 · 任期、俸银与职掌</summary><p>${text}</p></details>`;
  return text;
 });
}
