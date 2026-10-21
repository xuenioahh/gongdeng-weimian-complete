(()=>{try{
  document.documentElement.dataset.build='v40';
  const V40_PORTRAITS={};
  Object.entries(V40_PORTRAITS).forEach(([k,src])=>{if(PEOPLE[k]){PEOPLE[k].portraitImage=src;PEOPLE[k].noPortrait=false;}});

  // ---------- 孕事候选：除闻人抱朴、闻人含章、闻人蘅之外，当前仍在宫中且未处于孕期的人都可被主控选择 ----------
  const V40_BASE_PREG=['gu','shen','zhou','fang','ning','ke','hui'];
  const V40_WENREN=new Set(['baopu','hanzhang','wenheng']);
  function v40Title(k,s=state){
    if(k==='gu')return '皇后';if(k==='shen')return '和妃';
    const t=courtTitle(s,k)||s.ranks?.[k]||PEOPLE[k]?.title||'';
    if(['cao2','zhao2','lin2','ye2','du2','su2'].includes(k))return `${PEOPLE[k]?.name||'某氏'}${t?`（${t}）`:''}`;
    return t||PEOPLE[k]?.name||'某氏';
  }
  function v40PregnantNow(k,s=state,round=1){
    if(V40_WENREN.has(k))return true;
    if(k==='ning'&&s.flags?.ningPregnant&&!s.flags?.sixthPrincessBorn)return true;
    if(k==='ke'&&s.flags?.kePregnant&&!s.flags?.fourthPrinceBorn)return true;
    if(k==='fang'&&s.flags?.fangPregnant&&!s.flags?.fangDead)return true;
    const first=s.flags?.extraHeirs?.[1];
    if(round===2&&first?.mother===k&&!first?.born&&!first?.skipped)return true;
    return false;
  }
  function v40PregEligible(k,s=state,round=1){
    if(V40_WENREN.has(k)||!PEOPLE[k])return false;
    const rank=s.ranks?.[k]||PEOPLE[k].title||'';
    if(/^(故|废)/.test(rank)||/待选|待封|未入宫/.test(rank))return false;
    if(['cao2','zhao2','lin2','ye2','du2','su2'].includes(k)&&!(s.flags?.lowConsorts||[]).includes(k))return false;
    return !v40PregnantNow(k,s,round);
  }
  function v40PregKeys(s=state,round=1){
    const all=[...V40_BASE_PREG,...(s.flags?.lowConsorts||[])];
    return all.filter((k,i,a)=>a.indexOf(k)===i&&v40PregEligible(k,s,round));
  }
  function v40PregRoster(s,round){return `<span class="v40-preg-roster">${v40PregKeys(s,round).map(k=>`<span><b>${v40Title(k,s)}</b><em>${k==='gu'?'中宫；已有嫡子':k==='shen'?'永和宫旧人；旧案与恩宠从不混作一件事':k==='zhou'?'已有双生，仍记得那次宫中异闻':k==='fang'?'听雨轩常在；爱串门，各宫都认得她':k==='hui'?'崔氏贡造与内务府关系深':k==='ke'?'北营勋贵；曾有产育':k==='ning'?'太后外戚，与中宫亲近':(PEOPLE[k]?.tags||[]).slice(0,2).join(' · ')}</em></span>`).join('')}</span>`};

  function v40ZhouReaction(k,s=state,round=1){
    const zt=courtTitle(s,'zhou')||'周妃';
    if(k==='zhou'){
      const fate=s.flags?.twinBoyFate;
      if(fate==='send')return `<span class="v40-zhou">御前留宿的旨意送到绮春宫时，她先问的不是自己的脉案，而是西华门今夜几更换锁。那是当年送双生皇子出宫的时辰。她把话咽回去，只道：“若这次真有孩子，臣妾想先听太医说话，不想先听钦天监。”</span>`;
      if(fate==='secret')return `<span class="v40-zhou">她接旨后很久没有叫人添香，只把双生那年的旧产案从箱底取出来，压在枕下。“臣妾不怕生。”她对嬷嬷说，“怕的是孩子一落地，满宫先问他是不是个兆头。”</span>`;
      return `<span class="v40-zhou">她没有借双生旧功邀宠。知道这一季召幸落到自己身上，只把乳母旧册重新翻了一遍：“上回人人看的是天象，这回若真有喜，先让孩子只是孩子。”</span>`;
    }
    if(k==='gu')return `<span class="v40-zhou">听说这一季多宿中宫，她先送了两匹最普通的软绫，不送金锁。宫女问是不是怕显得薄，她笑：“皇后若真有喜，最不缺的就是往凤仪宫堆东西的人。”</span>`;
    if(k==='shen')return `<span class="v40-zhou">永和宫承宠渐多，她在人前只说“旧人情分”，回宫却把贺礼单减了一半：“沈家的案子还压着，她若这时有孩子，人人都会替她算别的。礼送轻些，省得像催她忘旧账。”</span>`;
    if(k==='fang')return `<span class="v40-zhou">她难得没有说俏皮话，亲自让人给听雨轩送去一张自己用过的产房值夜单，只在边角写：“别嫌麻烦，谁进谁出都记。”后来方小满那条线里，这张纸会显得比当时更重。</span>`;
    if(['ning','ke','hui'].includes(k))return `<span class="v40-zhou">她在请安时照旧笑得周全，回绮春宫才把${v40Title(k,s)}的名字写在当月赏单旁。她知道一个世家女的喜脉从来不只是一间宫里的喜事——娘家、宫权和孩子的序齿会在同一天开始被人计算。</span>`;
    return `<span class="v40-zhou">低位宫嫔忽然被连续召幸，她没有轻看，只让人把自己双生时用过的两只软枕送过去一只。宫女笑她如今心软，她道：“位分低才更该有人记得她也会疼。”</span>`;
  }

  function v40MotherDetail(k,s=state,round=1){
    if(k==='gu')return `皇后得知喜脉后没有先笑，第一件事是把三份宫务分出去。她已经有三皇子，所以这一胎不会只被当成“添一个孩子”；顾氏、太后和六宫都会重新看中宫还有多少余力。她却只把手放在尚未显怀的小腹上，说：“先别让他们替孩子想以后。”`;
    if(k==='shen')return `和妃报喜那晚，案上还摊着霍家送来的旧军粮簿。她没有把旧案收起，也没有因为有孕就忽然变得柔软：“孩子是孩子，我兄长的清白是另一件事。”这句话让主控更清楚——恩宠和皇嗣都不能替沈氏旧案结案。`;
    if(k==='zhou')return `周清漪这一次的喜脉与承熙元年的双生旧事重叠在一起。太医院先复核脉案，钦天监却被她挡在宫门外半日。她不是突然胆怯，而是经历过一次所有人盯着孩子身体议论吉凶以后，再也不肯把生产交给“异兆”解释。`;
    if(k==='fang')return `方小满听见“有喜”两个字时先笑，笑到一半又去找阿芙确认自己是不是听错。她没有强大的母族，也不懂把喜脉变成筹码；正因此，她得到的一点偏爱会更容易被别人理解成威胁，也给后来听雨轩的构陷埋下更早的情感重量。`;
    if(k==='ning')return `${v40Title(k,s)}有喜以后，慈宁宫比她自己先热闹。皇后是真高兴，却也看见顾、邵两家的人情一夜之间都往同一处集中。两人仍亲近，只是“太后外戚也有皇嗣”让那份亲近多了一层不能明说的比较。`;
    if(k==='ke')return `${v40Title(k,s)}再次报喜，北营的贺表比内廷赏单到得还快。她当面让人把超例礼退回一半：“孩子还没落地，别先替他借兵。”这句话也让霍家旧军籍与沈氏旧案的那条线继续留在她身上，而不被生育线盖过去。`;
    if(k==='hui')return `${v40Title(k,s)}有喜后，崔家立刻送来一整套“按旧例可进宫”的补品、细布与香料。她亲手退掉一半，却没办法让家族与贡造网络从此消失；后来昭氏慢毒与方氏案追查到供应链时，这一段会成为主控记得的前情。`;
    return `${v40Title(k,s)}从低位名册里忽然被太医写进喜脉簿。她的母族没有资格直接递折，只能托尚宫局送一只小匣子进来。宫里第一次认真记住她的名字，不是因为她争宠，而是因为一个尚未出生的孩子。`;
  }

  function v40Name(g,s){
    const used=new Set(Object.values(CHILDREN||{}).map(x=>x?.name).filter(Boolean));
    Object.values(s.flags?.extraHeirs||{}).forEach(x=>x?.name&&used.add(x.name));
    const boys=['杨顺昭','杨顺安','杨顺平','杨顺礼','杨顺嘉','杨顺宁','杨顺和'];
    const girls=['杨清而','杨嘉则','杨和乃','杨贞亦','杨安以','杨柔于','杨宛然'];
    const pool=(g==='M'?boys:girls).filter(x=>!used.has(x));return pool[0]||(g==='M'?'杨顺康':'杨昭焉');
  }
  function v40Order(round,g,s){
    let n=g==='M'?(s.flags?.twinBoyRegistered?6:5):8;
    for(let r=1;r<round;r++){const x=s.flags?.extraHeirs?.[r];if(x?.gender===g&&!x?.skipped)n++;}
    return `${n}${g==='M'?'皇子':'公主'}`;
  }
  function v40Conceive(round,k,s=state){
    s.flags.extraHeirs=s.flags.extraHeirs||{};
    const g=Math.random()<.52?'F':'M';
    s.flags.extraHeirs[round]={mother:k,gender:g,name:v40Name(g,s),order:v40Order(round,g,s),born:false,v40:true};
  }

  function v40PregChoice(round,k){return {
    get label(){return `这一季，多召${v40Title(k,state)}`; },
    get hint(){return `若报喜，仍维持当前位分；${k==='zhou'?'她经历过双生异闻，对这次孕事会有自己的反应。':'孩子性别与赐名到出生时再定。'}`; },
    requires:s=>v40PregEligible(k,s,round),
    v40Heir:{round,key:k},
    result:s=>`${v40MotherDetail(k,s,round)}${v40ZhouReaction(k,s,round)}`
  }}
  function v40NoPreg(round){return {label:'这一季不特意添皇嗣',hint:'不把承宠册当作生育排班；各宫照常过日子',v40HeirSkip:round,result:s=>`这一季没有人为“添嗣”被刻意推到御前。皇后把空白请脉页折回册中。${v40ZhouReaction(null,s,round)}`}}

  const years40=CHAPTERS.find(ch=>ch.title==='宫灯渐繁');
  if(years40?.steps){
    const r1=years40.steps.find(st=>st.heading?.includes('九月 · 要不要再添一个孩子'));
    const r2=years40.steps.find(st=>st.heading?.includes('十一月 · 第二张空白页'));
    function installRound(st,round){if(!st)return;
      st.cast=['gu','shen','zhou','fang','ning','ke','hui'];
      st.text=s=>[
        round===1
          ? `四皇子满月后的第二日，凤仪宫东暖阁还堆着没收完的红蛋与小儿衣料。皇后先叫人撤去喜幛，才把近半年的承宠册、请脉簿和各宫医案摊开。周清漪双生时那本旧产案被宫女从最底层找出来，纸角已经发脆。她把新册压在旧册上，只问太医：“这半年里，谁的脉案最不稳？”`
          : `九月那一轮过去以后，承宠册再次翻到冬月。若已经有人报喜，她的名字会被从这一轮划去；其余宫嫔仍可能承宠、有孕。没有谁因为出身低、已经生过孩子，或不是新宠，就被系统预先排除。`,
        `<span class="v40-thread"><b>几条线在这里同时经过：</b>皇后要管中宫与嫡子；和妃仍压着沈氏旧案；周清漪记得双生异闻；崔氏背后连着贡造与内务府；方小满的低位身份让她的喜脉更容易被人做文章。主控选择的不是“谁比较适合生”，而是这一季把持续的亲近给谁。</span>`,
        v40PregRoster(s,round),
        `闻人抱朴、闻人含章、闻人蘅不进入这一段通用孕事候选：抱朴和蘅嫔各有独立的生育/失子因果线，含章则始终保持非侍寝的关系设定。`
      ];
      const all=[...V40_BASE_PREG,'cao2','zhao2','lin2','ye2','du2','su2'];
      st.choices=[...all.map(k=>v40PregChoice(round,k)),v40NoPreg(round)];
    }
    installRound(r1,1);installRound(r2,2);

    // 既有承熙三年“偏宠谁”也让周清漪产生可见反应，使选秀—恩宠—孕事不是三张互不相干的表。
    years40.steps.forEach(st=>{(st.choices||[]).forEach(c=>{
      const yf=c.effects?.flags?.year3Favor;if(!yf||c.v40ZhouWrapped)return;
      const old=c.result;c.result=s=>{const base=typeof old==='function'?old(s):(old||'');
        const map={gu:'中宫的灯连续亮了几夜，周清漪请安时一句都没多问，只把座次往后让了半步。她知道皇后得宠与新人得宠，在六宫里是两种完全不同的信号。',shen:'永和宫重新热起来，她当面只笑“旧人总有旧人的情分”，回宫却叫人把沈家那份旧琴谱找出来——她比旁人更早意识到，恩宠一多，旧事也可能更快被翻出来。',hui:`${v40Title('hui',s)}得宠后，她先去道贺，又在回宫路上对贴身宫女说：“江南人会做人，最难看清的从来不是她笑的时候。”`,baopu:`昭氏把承宠写满《承露录》，周清漪却没有与她争艳，只在下一次见她时说：“灯点得太亮，宫里每个人都看得见。”昭氏笑着回：“我就是要人看见。”`};
        return `${base}${map[yf]?`<span class="v40-zhou">${map[yf]}</span>`:''}`;};c.v40ZhouWrapped=true;
    })});
  }

  const applyV40Prev=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=applyV40Prev(c);
    if(c.v40Heir){const {round,key}=c.v40Heir;if(v40PregEligible(key,state,round)){v40Conceive(round,key,state);state.bond[key]=(state.bond[key]||0)+2;out.push(`${PEOPLE[key]?.name||'生母'}（${v40Title(key,state)}）有喜`);}}
    if(c.v40HeirSkip){state.flags.extraHeirs=state.flags.extraHeirs||{};state.flags.extraHeirs[c.v40HeirSkip]={skipped:true,v40:true};out.push('本季不特意添皇嗣');}
    return out;
  };

  // 出生场景增加母妃线与周妃回声；不安排孩子成长。
  if(years40?.steps){
    ['五月 · 玉牒又添一笔','七月 · 又一声婴啼'].forEach((needle,ix)=>{
      const st=years40.steps.find(x=>x.heading?.includes(needle));if(!st)return;
      const old=st.text;st.text=s=>{const base=typeof old==='function'?old(s):old;const x=s.flags?.extraHeirs?.[ix+1];
        if(!x||x.skipped)return base;
        const extra=x.mother==='zhou'?`周清漪听见孩子哭出声以后，没有立刻问男女，只闭眼靠了一会儿。承熙元年的那场异闻终于没有在这一刻重演。`:x.mother==='shen'?`和妃产后醒来第一句仍问旧案那份军粮簿收在哪里。孩子没有替她忘记兄长。`:x.mother==='hui'?`崔家贺礼当日便到宫门，皇后按例退回三成。供应网络与喜脉从这一刻靠得更近，也让后来的旧香案更值得追问。`:x.mother==='fang'?`阿芙把产房出入名单一笔一笔抄完，写到最后一行时甩了甩发酸的手腕。`:`周清漪也来洗三，只看了孩子一会儿便退到后排。她已经知道，孩子出生后最吵的往往不是产房，而是所有替孩子计算未来的大人。`;
        return [...base,`<span class="v40-thread">${extra}</span>`];};
    });
  }

  // 迁移：v39旧存档已生成随机三人候选时，清掉候选缓存，让v40显示完整可选名单；已发生的孕事不重掷。
  if(!state.flags?.v40Migrated){if(state.flags?.extraHeirCandidates)delete state.flags.extraHeirCandidates;state.flags.v40Migrated=true;try{save()}catch(_e){}}
  try{render()}catch(_e){}
}catch(e){console.error('v40 patch failed',e)}})();
