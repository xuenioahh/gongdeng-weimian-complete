(()=>{try{
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const TARGET=new Set(['旧茶未凉','听雨轩有喜','王府旧笼','空宫点灯','窗开半扇','荷风满座']);
  const RANKS120=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'];
  const PREFIX120={shen:'和',zhou:'周',baopu:'昭',hanzhang:'珍',wenheng:'蘅',ning:'徽',ke:'晋',hui:'元'};
  const coreKeys120=new Set(Object.keys(PREFIX120));
  const esc120=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function baseRank120(v){v=String(v||'');if(/^故|^废|^未入宫|^待选|^待封|^皇后/.test(v))return null;for(const r of [...RANKS120].reverse())if(v===r||v.endsWith(r))return r;return null}
  function titleByRank120(k,r){if(!r)return '';if(k==='zhangyuanzhao')return ['嫔','妃','贵妃','皇贵妃'].includes(r)?'文'+r:'张'+r;const p=PREFIX120[k];return p?p+r:r}
  const courtBefore120=typeof courtTitle==='function'?courtTitle:null;
  courtTitle=function(s,k){
    const raw=(s?.ranks&&s.ranks[k])||PEOPLE?.[k]?.title||'';
    if(/^故|^废|^未入宫|^待选|^待封/.test(String(raw)))return String(raw);
    if(k==='gu'||k==='taihou'||k==='emperor')return courtBefore120?courtBefore120(s,k):String(raw);
    const br=baseRank120(raw);
    if(br&&(coreKeys120.has(k)||k==='zhangyuanzhao'))return titleByRank120(k,br);
    return courtBefore120?courtBefore120(s,k):String(raw);
  };
  displayRank=(k,s=state)=>courtTitle(s,k);
  function syncTitles120(s=state){
    for(const k of [...coreKeys120,'zhangyuanzhao']){const p=PEOPLE?.[k],r=baseRank120(s?.ranks?.[k]);if(p&&r)p.title=titleByRank120(k,r)}
    if(PEOPLE?.hanzhang)PEOPLE.hanzhang.home=s.flags?.sistersResidence==='separate'?'听竹馆':'拾遗阁';
    if(PEOPLE?.baopu&&(!PEOPLE.baopu.home||PEOPLE.baopu.home==='待定'))PEOPLE.baopu.home='拾遗阁';
  }
  function nextRank120(k,s=state){const r=baseRank120(s?.ranks?.[k]);const i=RANKS120.indexOf(r);return i>=0&&i<RANKS120.length-1?RANKS120[i+1]:null}
  function canAdvance120(k,s=state){const nr=nextRank120(k,s);if(!nr)return false;const caps=globalThis.V63_RANK_CAPS||{};if(!caps[nr]||typeof globalThis.v63RankCount!=='function')return true;return globalThis.v63RankCount(nr,s)<caps[nr]}
  function nextTitle120(k,s=state){const nr=nextRank120(k,s);return nr?titleByRank120(k,nr):courtTitle(s,k)}

  // ---------- 11–16章语言清稿 ----------
  const R=[
    ['没有谁说“好久不见”。沈知微与顺王隔着茶案坐下，谁都没有先说“好久不见”。','沈知微与顺王隔着茶案坐下。谁也没有提旧日，只各自端起面前的茶。'],
    ['三句话已经够了。因为承熙四年的半封信、五年的铜扣、七年的军籍都已经替这一刻说过前半段。','偏廊里没有再说第四句。承熙四年的半封信、五年的铜扣、七年的军籍，已经把剩下的话压在两个人中间。'],
    ['十年前我选择让案子结束。现在旧案重新回到手里。你要怎么开它？','十年前我让这桩案子停了。如今旧卷又回到御前，这一次，要不要查到底？'],
    ['明旨一出，朝堂马上有人反对。因为重审的不只是一个死人，而是十年前整个夺嫡余波中的军令系统。','明旨一出，朝堂马上有人反对。因为一旦重审，十年前改过的军令、经手的人和当时的御批都要重新拿出来查。'],
    ['顺王说完便低头拨了一下桌沿。我没有接话，只让人把那份旧档重新摊开。','他低头拨了一下桌沿。我没有接话，只让人把那份旧档重新摊开。'],
    ['年轻时那不是懒。我确实衡量过，确实选择了稳定。也正因为如此，十年后不能把错误全推给下面的人。','那时我不是没想过后果。我看见了疑点，也知道翻案会牵动刚换过的人和营，最后还是选了不翻。所以十年后，也不能说都是下面的人办错了。'],
    ['她仍在找旧例替自己承担判断。','她问了一圈，还是没找到可以照着办的旧例。'],
    ['这一次，答案只能由我写。','三份稿子最后都摆回御案，还是得我自己选。'],
    ['只是下一轮故事开始之前，方常在还会先把几条已经散开的线重新串到一起。','几个月后礼部重提采选之前，听雨轩先出了事。'],
    ['那大概是这些年我在后宫里少有的、没有先计算一句话会带来什么后果的时刻。','我也笑了。那一刻我没有先想这句话明日会被谁听见，只觉得她笑起来比刚才揪衣角时轻松。'],
    ['两个句子合在一起，便像是在说她天然有能力接触香、药、盒子与传话的人。','两句并在一起，读起来便像她早就能随意接触香、药、盒子和传话的人。'],
    ['昭氏旧香以后，我已经不肯再把“手续齐全”当作结论。','昭氏旧香以后，我已经不肯只看册子齐不齐。'],
    ['可我能拆慢调查，拆不慢所有人心里的先入为主。','册子能一条条拆开，人心里的猜疑却没那么快。'],
    ['到这一步，方案已经不再只是“构陷她毒害太后”，而是有人借调查中的混乱，把一个本就不稳的孕体彻底推到绝路。','到这里已经很清楚：对方不只想把毒害太后的罪名扣在她头上，还趁她被隔开照护的几天，把安胎药直接送到了她手里。'],
    ['采选本身不会改变已经发生的事。它只是决定下一批人以什么规模进入同一座宫城。','采选救不回已经死的人，也填不了旧案。它只决定这一回让多少新人进宫。'],
    ['把错误真正落回他自己身上','让顺谦自己赔礼，不能再由皇后替他收尾'],
    ['这一天没有大事，几个人只是第一次站在同一扇门前。','箱笼一件件交清楚，不必赶。'],
    ['雨声很大。沈知微把茶续满，只说：“像不像我，都不是锁门的理由。”','雨声很大。沈知微把茶续满，没有再替顺王说一句话。'],
    ['凤仪宫 · 辰初晨光刚越过东廊','凤仪宫 · 辰初。晨光刚越过东廊'],
    ['半年以后，她已经敢拿这件事自己逗人笑。','过了几日，她已经敢拿这件事自己逗人笑。'],
    ['摊开一张账，也可能只是把所有人的眼睛都引到同一个地方。','账摊开了，也不代表账里写全了。'],
    ['她忽然想：原来和一个大人相处，也可以不先做谁的女儿。','她忽然觉得，张元照和别人不一样：不会因为她是公主，也不会因为顾明宜不在了，就处处让着她。'],
    ['那一晚没有人立功，也没有人翻案。灯从水面一盏盏亮起来，新人和旧人第一次在同一场宴上不必时时想着自己是哪一批进宫的。','这一晚没人提案卷，也没人争谁离御前更近。灯从水面一盏盏亮起来，新人和旧人坐到散席，谈得最多的只是吃食、风轮和孩子。'],
    ['尚宫局没有得到一套“张氏新法”。只多了几样已经证明能用的小习惯。','尚宫局最后只留下公筷和交班重叠半刻两条；其余试行都撤了。']
  ];
  function clean120(v,s=state){
    if(typeof v!=='string')return v;let z=v;
    for(const [a,b] of R)z=z.split(a).join(b);
    // 11–16章里几处旧称谓写死，按本局当前位分显示。
    if(TARGET.has(CHAPTERS?.[s?.index||0]?.title)){
      const hz=(()=>{try{return courtTitle(s,'hanzhang')}catch(_e){return''}})();
      const zz=(()=>{try{return courtTitle(s,'zhou')}catch(_e){return''}})();
      if(hz)z=z.replaceAll('珍妃',hz);
      if(zz)z=z.replaceAll('周嫔',zz);
    }
    return z;
  }
  function wrap120(o,k){if(!o)return;const d=Object.getOwnPropertyDescriptor(o,k);if(d?.get&&d.configurable!==false){if(d.get.__v120Wrapped)return;const g=d.get;const ng=function(){return clean120(g.call(this),state)};ng.__v120Wrapped=true;Object.defineProperty(o,k,{configurable:true,enumerable:d.enumerable,get:ng});return}const v=o[k];if(typeof v==='function'){if(v.__v120Wrapped)return;const nv=function(...a){const x=v.apply(this,a);return Array.isArray(x)?x.map(y=>clean120(y,a[0]||state)).filter(y=>String(y??'').trim()!==''):clean120(x,a[0]||state)};nv.__v120Wrapped=true;o[k]=nv}else if(typeof v==='string')o[k]=clean120(v,state)}
  function applyLanguage120(){
    for(const c of (CHAPTERS||[])){if(!TARGET.has(c?.title))continue;c.theme=clean120(c.theme,state);for(const st of c.steps||[]){wrap120(st,'text');wrap120(st,'result');for(const ch of st.choices||[]){wrap120(ch,'label');wrap120(ch,'hint');wrap120(ch,'result')}}}
    const empty=CH('空宫点灯');
    if(empty){const a=ST(empty,'太后先说');if(a)wrap120(a,'text');const b=ST(empty,'礼部的奏折');if(b)wrap120(b,'text');const c=ST(empty,'储秀宫先亮灯');if(c)wrap120(c,'text')}
    const lotus=CH('荷风满座');if(lotus){const a=ST(lotus,'窗仍开着半扇');if(a)a.heading='七月二十九 · 窗仍开着半扇';const b=ST(lotus,'蝉声忽然停了一刻');if(b)b.heading='七月三十 · 蝉声忽然停了一刻'}
  }
  // 三处日期按实际推进顺序写清。
  function fixDates120(){
    const c=CH('空宫点灯');if(!c)return;
    const a=ST(c,'太后先说');if(a&&!a.__v120date){const old=a.text;a.text=s=>(typeof old==='function'?old(s):old).map(x=>String(x).replace('三月初，皇后把修缮图册','二月下旬，皇后把修缮图册'));a.__v120date=1}
    const b=ST(c,'礼部的奏折');if(b&&!b.__v120date){const old=b.text;b.text=s=>(typeof old==='function'?old(s):old).map(x=>String(x).replace('二月末，礼部把采选奏折','三月初，礼部把采选奏折').replace('三月初第一批秀女进宫','三月中旬第一批秀女进宫'));b.__v120date=1}
    const d=ST(c,'储秀宫先亮灯');if(d&&!d.__v120date){const old=d.text;d.text=s=>(typeof old==='function'?old(s):old).map(x=>String(x).replace('三月初，储秀宫重新点灯','三月中旬，储秀宫重新点灯'));d.__v120date=1}
  }

  // ---------- 重阳行刺：把三个处置的直接后果写清 ----------
  function fixBaopuDecision120(){
    const c=CH('刃落宫门'),st=ST(c,'你还在流血');if(!st||!st.choices?.length)return;
    const [kill,trial,law]=st.choices;
    if(kill){kill.label='当场处死';kill.hint='昭氏不经亲审，当场处死；不再有最后口供或母女诀别。';kill.result='我按着伤口：“当场处死。”谢绍庭领旨而去。昭氏没有留下最后口供，蘅嫔也未能见她最后一面；后续只能从《承露录》、短刃和宫人口供继续查。';}
    if(trial){trial.label='押下，朕亲审';trial.hint='先留活口。三日后可亲审、留下口供，也可准蘅嫔见她最后一面。';trial.result='“押下，朕亲审。”昭氏被带去偏殿看守。她会活到三日后的问话，供词由御前亲自核；若准蘅嫔相见，母女还能有最后一次见面。定案以后，她仍要为行刺偿命。';}
    if(law){law.label='交刑部，按大逆论';law.hint='交外廷按谋逆定罪。你不再亲审；刑罚最重，闻人旧人也会被重新查一遍。';law.result='“交刑部，按大逆论。”裴景和伏身领旨。昭氏当夜交刑部、宗人府会审，我不再亲审。案卷按大逆定罪，刑罚最重；与闻人旧国有关的宫人、旧属也会被重新筛查。';}
  }

  // ---------- 含章：晋位按钮显示晋位后的实际称号，不再拿晋位前称号拼“一级” ----------
  function fixHanzhangPromotion120(){
    const c=CH('刃落宫门'),st=ST(c,'救驾有功，要不要写进位分');if(!st||!st.choices?.length)return;const a=st.choices[0],b=st.choices[1];
    if(a){try{Object.defineProperty(a,'label',{configurable:true,enumerable:true,writable:true,value:s=>{const cur=courtTitle(s,'hanzhang'),nt=nextTitle120('hanzhang',s);return canAdvance120('hanzhang',s)?`救驾有功，${cur}晋${nt}`:`救驾有功，${nt}位额已满，改记功厚赏`}})}catch(_e){};try{Object.defineProperty(a,'hint',{configurable:true,enumerable:true,writable:true,value:s=>{const cur=courtTitle(s,'hanzhang'),nt=nextTitle120('hanzhang',s);return canAdvance120('hanzhang',s)?`位分正式进一级：${cur} → ${nt}。六宫座次与册页随之调整。`:`不晋位；救驾功照样记入功册。`}})}catch(_e){};a.result=s=>{const cur=courtTitle(s,'hanzhang'),nt=nextTitle120('hanzhang',s);return canAdvance120('hanzhang',s)?`册旨下时，${cur}右臂还不能抬高。新册写作“${nt}”。她用左手接册；从第二日起，请安座次、月例和宫人数都按${nt}重新排。`:`救驾功照常记入功册，位分暂不动。金银、田庄和宫人按赏格另给。`}}
    if(b){b.hint='位分不动；救驾功单独记入功册，金银田庄照例厚赏。';b.result='含章只受救驾厚赏，位分不改。第二日请安，她仍坐原来的位置；功册则另记她挡下第二刀。';}
  }

  // ---------- 皇子女页：生母写“位号 + 姓名”，并保留抚养人 ----------
  function fullPerson120(k,s=state){const p=PEOPLE?.[k];if(!p)return String(k||'未录');let t='';try{t=courtTitle(s,k)||p.title||''}catch(_e){t=p.title||''}return `${t} ${p.name||''}`.replace(/\s+/g,' ').trim()}
  function motherName120(x){return String(x||'未录').replace(/^故([^\s]+)([赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯管卢莫经房裘缪干解应宗丁宣邓郁单杭洪包诸左石崔吉龚程嵇邢裴陆荣翁荀羊於惠甄曲封芮羿储靳汲松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全班仰秋仲伊宫宁仇栾甘钭厉戎祖武符刘景詹束龙叶幸司郜黎蓟薄印宿白怀蒲台从鄂索咸籍赖卓蔺蒙池乔阴郁胥苍闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍郤璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公][氏]?)/,'故$1 $2')}
  const childBefore120=typeof childrenView==='function'?childrenView:null;
  if(childBefore120&&!globalThis.__v120Children){globalThis.__v120Children=true;childrenView=function(...a){syncTitles120(state);let h=String(childBefore120.apply(this,a));try{const box=document.createElement('div');box.innerHTML=h;let rows=[];if(typeof globalThis.v52ChildRecords==='function')rows=globalThis.v52ChildRecords(state)||[];const byName=new Map(rows.map(r=>[String(r.name||''),r]));box.querySelectorAll('.v117-child-card').forEach(card=>{const name=card.querySelector('h2')?.textContent?.trim()||'',r=byName.get(name);if(!r)return;const dt=[...card.querySelectorAll('dt')].find(x=>x.textContent.trim()==='生母');const dd=dt?.nextElementSibling;if(!dd)return;let m=r.mother?fullPerson120(r.mother,state):motherName120(r.motherName);if(r.foster)m+=` · 抚养：${fullPerson120(r.foster,state)}`;dd.textContent=m;});h=box.innerHTML}catch(_e){}return h}}

  // ---------- 大封名单：完全按当前 state 重算，不再读旧静态名单 ----------
  const LOW_KEYS120=['cao2','zhao2','lin2','ye2','du2','su2'];const LOW_HOMES120=['咸福宫西配殿','钟粹宫东配殿','景阳宫后殿','咸福宫东配殿','钟粹宫西配殿'];
  function home120(k,s=state){const p=PEOPLE?.[k];if(LOW_KEYS120.includes(k)){const i=(s.flags?.lowConsorts||[]).indexOf(k);if(i>=0)return LOW_HOMES120[i]||'景阳宫后殿'}if(k==='hanzhang')return s.flags?.sistersResidence==='separate'?'听竹馆':'拾遗阁';if(k==='baopu'&&(!p?.home||p.home==='待定'))return'拾遗阁';return p?.home&&p.home!=='待定'?p.home:'未定'}
  function activeConsorts120(s=state){return Object.keys(s.ranks||{}).filter(k=>{if(!PEOPLE?.[k]||['emperor','taihou','gu','daila','chen'].includes(k))return false;if(LOW_KEYS120.includes(k)&&!(s.flags?.lowConsorts||[]).includes(k))return false;const raw=String(s.ranks[k]||'');if(/^故|^废|^未入宫|^待选|^待封/.test(raw))return false;if(k==='wenheng'&&s.flags?.wenhengFate==='return')return false;return !!baseRank120(raw)});}
  function childRows120(s=state){try{if(typeof globalThis.v52ChildRecords==='function')return (globalThis.v52ChildRecords(s)||[]).filter(x=>!x.dead)}catch(_e){}const out=[];for(const v of Object.values(CHILDREN||{})){if(!v?.name||/未取名/.test(v.name)||/薨|早夭|亡/.test(String(v.note||'')))continue;out.push(v)}return out}
  function rosterHTML120(s=state){syncTitles120(s);const groups={};for(const r of ['皇贵妃','贵妃','妃','嫔','贵人','常在','答应'])groups[r]=[];for(const k of activeConsorts120(s)){const r=baseRank120(s.ranks[k]);if(!r||!groups[r])continue;groups[r].push(`${courtTitle(s,k)} ${PEOPLE[k].name}（${home120(k,s)}）`)}const lines=[];const tai=PEOPLE?.taihou?`太后 ${PEOPLE.taihou.name}`:'太后';let mid='凤仪宫暂空';if(!s.flags?.guDead&&String(s.ranks?.gu||'').startsWith('皇后'))mid=`皇后 ${PEOPLE.gu?.name||''}（凤仪宫）`;lines.push(`<p><b>慈宁宫：</b>${esc120(tai)}。　<b>中宫：</b>${esc120(mid)}。</p>`);for(const r of ['皇贵妃','贵妃','妃','嫔','贵人','常在','答应'])if(groups[r].length)lines.push(`<p><b>${r}：</b>${groups[r].map(esc120).join('　')}</p>`);const kids=childRows120(s).map(x=>`${String(x.order||'').replace(/\s*·.*$/,'')} ${x.name}`.trim());lines.push(`<p><b>皇子女：</b>${kids.length?kids.map(esc120).join('；'):'当前无在册皇子女'}。</p>`);return `<div class="v120-roster">${lines.join('')}<p><small>这一页只列当前仍在册、仍在宫中的人；位分、住处与皇子女名单都按本局此刻状态重算。</small></p></div>`}
  function fixGrandRoster120(){const c=CH('雪尽宫门'),st=ST(c,'红旨落定以后，名字要一一念完');if(!st)return;st.text=s=>[
    `红旨宣完，慈宁宫正殿没有立刻散。我让人把刚才念过的名字重新誊成一页，不按功劳，只按此刻的位分和住处排列。`,
    rosterHTML120(s),
    `我从第一行看到最后一行。太后也看完，才让人收纸。`,
    `“封赏到这里才算落地。”她道，“谁住哪儿、谁还在册，都别念漏了。”`,
    `殿外开始收宣旨时铺的红毡。`
  ];}

  function applyAll120(){syncTitles120(state);applyLanguage120();fixDates120();fixBaopuDecision120();fixHanzhangPromotion120();fixGrandRoster120()}
  globalThis.v120Apply=applyAll120;
  applyAll120();

  // storyView 最后一层：即使旧补丁重写数据，输出前也重新落定本版。
  if(typeof storyView==='function'&&!globalThis.__v120Story){globalThis.__v120Story=true;const old=storyView;storyView=function(...a){applyAll120();let h=old.apply(this,a);applyAll120();const c=CHAPTERS?.[state?.index||0];return c&&TARGET.has(c.title)?clean120(h,state):h}}

  function ensureNav120(){try{const app=document.getElementById('app');if(!app||state?.view==='cover')return;if(!app.querySelector('header')){app.insertAdjacentHTML('afterbegin',nav());if(typeof bind==='function')bind()}}catch(_e){}}
  function fixVisible120(){try{
    ensureNav120();syncTitles120(state);
    const title=document.querySelector('.scene-title')?.textContent||'';
    if(title.includes('你还在流血')){document.querySelectorAll('.choices .key-choice').forEach(b=>{const it=b.querySelector('i');if(it)it.textContent='定旨';b.querySelectorAll('.v120-impact').forEach(x=>x.remove())});}
    if(title.includes('救驾有功，要不要写进位分')){document.querySelectorAll('.choices .key-choice').forEach(b=>{const it=b.querySelector('i');if(it)it.textContent='定旨';b.querySelectorAll('.v120-impact').forEach(x=>x.remove())});}
    // 当前场景旧称谓若被历史渲染层写死，再按当前位分改一次。
    if(state?.view==='story'&&TARGET.has(CHAPTERS?.[state.index]?.title)){const root=document.querySelector('#app');const hz=courtTitle(state,'hanzhang'),zz=courtTitle(state,'zhou');const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const ns=[];while(walker.nextNode())ns.push(walker.currentNode);for(const n of ns){let z=clean120(n.nodeValue,state);if(hz)z=z.replaceAll('珍妃',hz);if(zz)z=z.replaceAll('周嫔',zz);if(z!==n.nodeValue)n.nodeValue=z}}
  }catch(_e){}}
  if(typeof render==='function'&&!globalThis.__v120Render){globalThis.__v120Render=true;const old=render;render=function(...a){applyAll120();const r=old.apply(this,a);applyAll120();fixVisible120();document.documentElement.dataset.build='v120';document.title='宫灯未眠 · 第11–16章语言润色与状态修复 v120';return r}}
  try{render();fixVisible120()}catch(_e){}
}catch(e){console.error('v120 ch11-16 language/state fixes failed',e)}})();
