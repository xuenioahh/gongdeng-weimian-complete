(()=>{try{
  if(globalThis.__v108GuPolish)return;globalThis.__v108GuPolish=true;
  const A=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const CH=t=>(CHAPTERS||[]).find(c=>c?.title===t);
  const ST=(c,q)=>(c?.steps||[]).find(s=>String(s?.heading||'').includes(q));
  function wrap(st,key,fn){
    if(!st)return;
    if(st.text&&st.text[key])return;
    const old=st.text;
    const f=s=>fn(A(old,s),s);f[key]=true;st.text=f;
  }
  function insertAfter(a,needle,line){if(a.some(x=>String(x).includes(line)))return a;const i=a.findIndex(x=>String(x).includes(needle));if(i>=0)a.splice(i+1,0,line);else a.push(line);return a;}

  function applyGuScenes(){
    // 1) 开篇定根：旧例不是天然正确，而是防止权力每天换一把尺。
    const first=CH('宫门初定'), pages=ST(first,'凤仪宫的一叠册页');
    wrap(pages,'__v108GuRuleRoot',(a,s)=>{
      if(a.some(x=>String(x).includes('旧例至少有一个好处')))return a;
      const block=[
        `我问她：“你每回都先找旧例，是因为旧例一定对？”`,
        `顾明宜把那两份互相矛盾的旧例并在一处：“不是。旧例至少有一个好处——今日换一个人来，不能因为喜欢她，就说这条不算；明日厌了另一个，也不能忽然说必须严办。”`,
        `“若旧例本身就错呢？”`,
        `她的手指停在纸角：“那就改。只是改的时候，总得知道自己是在改规矩，还是在替某一个人找借口。”`,
        `她说这话时很平静。后来我才知道，她一生最难防住的，恰恰就是后一样。`
      ];
      const i=a.findIndex(x=>String(x).includes('我问：“累不累？”'));
      if(i>=0)a.splice(i,0,...block);else a.push(...block);return a;
    });

    // 2) 护三皇子不洗白：她知道自己偏心，只总觉得“先挡住这一笔，以后再教”。
    const second=CH('空宫点灯'), child=ST(second,'孩子还小');
    wrap(child,'__v108GuSonBias',(a,s)=>{
      if(a.some(x=>String(x).includes('臣妾知道自己在护他')))return a;
      return insertAfter(a,'孩子还小',`我没有立刻接。顾明宜垂眼看着那张本该送宗人府的纸，过了一会儿自己补了一句：“臣妾知道自己在护他。只是臣妾总觉得，孩子犯一次错，不该先让外头替他写成一辈子。”`);
    });

    const winter=CH('凤仪宫最后一冬');

    // 3) 邵明贞是她的镜子：一个太快，一个太慢。
    const earlyIll=ST(winter,'八月初，皇后先病了一场');
    wrap(earlyIll,'__v108GuNingMirror',(a,s)=>{
      if(a.some(x=>String(x).includes('知道和改得掉是两回事')))return a;
      const block=[
        `邵明贞把印盒抱稳，忽然道：“娘娘总说臣妾下判断太快。”`,
        `顾明宜咳过那一阵才道：“你是快。我是慢。”`,
        `“那哪一个好？”`,
        `她看着桌上几本已经翻旧的册子：“都不好。你得防自己把一时觉得对的事定成永例；我得防自己把不肯决定说成慎重。”`,
        `邵明贞笑了一下：“娘娘现在倒知道。”`,
        `“知道和改得掉是两回事。”顾明宜也笑了一下。`
      ];
      const i=a.findIndex(x=>String(x).includes('手松开以后，她低头咳了很久'));
      if(i>=0)a.splice(i+1,0,...block);else a.push(...block);return a;
    });

    // 4) 疫中真正长一步：用“短期试行、能收回再改”代替非黑即白的旧例。
    const method=ST(winter,'张元照要的不是药方');
    wrap(method,'__v108GuReversibleDecision',(a,s)=>{
      if(a.some(x=>String(x).includes('三日不是新规')))return a;
      const line=`“先照这个查三日。”顾明宜说完自己也停了一息。三日不是新规，也不是认定张元照一定对，只是一个还能收回、还能改的期限。她第一次发现，没有旧例时也未必要么拖着不动，要么一次定死。`;
      const i=a.findIndex(x=>String(x).includes('先照这个查三日'));
      if(i>=0)a.splice(i+1,0,line);else a.push(line);return a;
    });

    // 5) 临终交册：她没有反过来否定规矩，只允许后来的人删掉她写过的东西。
    const fever=ST(winter,'皇后也开始发热');
    wrap(fever,'__v108GuHandsOver',(a,s)=>{
      if(a.some(x=>String(x).includes('别因为是本宫写的就留')))return a;
      const block=[
        `过了一会儿，她又叫住邵明贞：“阿宁。”`,
        `“臣妾在。”`,
        `“旧册能用就用。不能用的，别因为是本宫写的就留。”`,
        `邵明贞没有说“娘娘会好起来”，只答：“臣妾知道。”`,
        `顾明宜说完便闭上眼，没有再补一句“以后照旧办”。`
      ];
      const i=a.findIndex(x=>String(x).includes('皇后没有再把它要回来'));
      if(i>=0)a.splice(i+1,0,...block);else a.push(...block);return a;
    });

    // 6) 给张元照的最后一句收回“圣人感”，仍是顾明宜熟悉的具体做法。
    const saveNext=ST(winter,'你救不了所有人');
    wrap(saveNext,'__v108GuLastAdvice',(a,s)=>a.map(x=>String(x).replace('“那就记着。你救不了所有人，不等于可以不救下一个。”','“那就别一直算没救下来的。眼前还有一个，就先把这一个的名字写清楚。”')));

    // 7) 对儿子的最后变化：错误要记，但一个人不能只剩这一笔。
    const last=ST(winter,'凤仪宫最后一页');
    wrap(last,'__v108GuFinalMother',(a,s)=>{
      const out=[];let skipping=false;
      for(const x0 of a){const x=String(x0);
        if(x.includes('她昏睡前忽然问：“顺谦那回伴读的事')){skipping=true;continue;}
        if(skipping&&x.includes('到最后，她仍在替自己的儿子留一扇可以关上的门')){skipping=false;continue;}
        if(skipping)continue;
        out.push(x0);
      }
      if(!out.some(x=>String(x).includes('别把那一笔抹掉'))){
        const block=[
          `她昏睡前忽然又问：“顺谦那回伴读的事……宗人府后来到底记了没有？”`,
          `我没有立刻答。`,
          `“若没记，补一笔。”她声音已经很轻，“该赔礼的、后来怎么处置的，也一起写。别把那一笔抹掉，也别让人以后只看那一笔。”`,
          `太后看了她很久，没有说话。`,
          `顾明宜这一生替儿子挡过不止一次。到最后，她仍怕别人太快给孩子定性，却终于不再觉得“没有记录”就是保护。`
        ];
        const i=out.findIndex(x=>String(x).includes('金凤钗尾羽那道旧划痕'));
        if(i>=0)out.splice(i+1,0,...block);else out.push(...block);
      }
      return out;
    });

    // 8) 凤钗只属于她；下一任中宫不必成为“顾明宜第二”。
    wrap(last,'__v108GuPinMeaning',(a,s)=>{
      if(a.some(x=>String(x).includes('下一位有下一位自己的东西')))return a;
      const i=a.findIndex(x=>String(x).includes('太后道：“不给。”'));
      if(i>=0)a.splice(i+1,0,
        `顾明宜像是放心了一点：“下一位有下一位自己的东西。”`,
        `太后替她把散到颊边的一缕头发拢回去：“这会儿倒想得开。”`,
        `她没力气笑，只轻轻动了一下嘴角。`);
      return a;
    });

    // 9) 旧子案保留真实污点，同时清理旧稿重复句。
    const west=CH('西华门外'), oldChild=ST(west,'他自己把西华门那一夜送到御前');
    wrap(oldChild,'__v108GuOldChild',(a,s)=>a.map(x=>{
      let z=String(x);const dup='我把木匣盖得太重，案角的茶盏震了一下。裴景和没有抬头。我把木匣盖得太重，案角的茶盏震了一下。裴景和没有抬头。';
      if(z.includes(dup))z=z.replace(dup,'我把木匣盖得太重，案角的茶盏震了一下。裴景和没有抬头。');return z;
    }));
    const reckoning=ST(west,'已故皇后的名字也被重新翻出来');
    wrap(reckoning,'__v108GuPosthumous',(a,s)=>{
      if(a.some(x=>String(x).includes('她最擅长用规矩保护人')))return a;
      const line=`她会用旧例替人挡麻烦。碰上旧例没写过的事，她又容易先把人移出去，等御前再定。那个男婴就是这样先被移出产殿，随后才等到“秘处”的死令。`;
      const i=a.findIndex(x=>String(x).includes('这不是给顾明宜翻案'));
      if(i>=0)a.splice(i,0,line);else a.push(line);return a;
    });
  }

  function syncGu(s=state){
    const p=PEOPLE?.gu;if(!p)return;
    p.age='承熙元年29岁';
    p.signature='习惯把纸角压齐；遇到小错先问缘由，再问该不该罚。金凤钗尾羽那道旧划痕从潜邸一直留到梓宫。';
    let y=1;try{y=typeof yearNow==='function'?yearNow():1}catch(_e){}
    if(s.flags?.guDead||/^故/.test(String(s.ranks?.gu||''))){
      p.tags=['故皇后','规矩护人','偏爱也会伤人'];
      p.bio='顾明宜把规矩当成挡住任性的一道堤：同一件事不能因为今日喜欢谁、明日厌谁，就换一把尺。她也最容易在自己真正爱的人面前偷偷开口子——护三皇子、替熟人留余地；面对无法归类的异常，她又会本能地先把人移出正常秩序。疫中她终于学会用“先试三日、能改再改”代替非黑即白的旧例，临终也承认后来的人可以删掉她写过的规矩。她并不完美。她想让同一件事用同一把尺，这让很多人受过她的保护，也让她在遇到例外时做过伤人的决定。';return;
    }
    if(y<=2){p.tags=['细谨','规矩护人','护熟人'];p.bio='新朝初立时，她最习惯做的事是翻旧例、压平纸角、把每个人放到不会互相撞上的位置。她并不认为旧例天然正确；她只是相信，写在纸上的尺至少不能因为掌权者今天喜欢谁就突然变长变短。她很护熟人，也因此很早埋下一个矛盾：越想防止任性，越可能在自己真正偏爱的人身上亲手开例外。';return;}
    if(y<=8){p.tags=['中宫','守尺度','护短'];p.bio='她已经能把庞杂六宫整理得近乎本能：新人、皇嗣、异国旧眷和几家世族都被她放进可执行的章程里。她对小人物常比礼制本身宽——先问有没有受伤、有没有苦衷，再找旧例容人的缝；可轮到三皇子，她会把同样的缝开得过大。她最怕自己因为护着顺谦，就把原本只为他开的口子变成人人都得认的规矩。';return;}
    p.tags=['中宫','规则可修','学会交手'];p.bio='后期的顾明宜仍然先看旧册，却不再把“没有旧例”当成只能等待的理由。她开始接受小范围试行、期限复核，也越来越肯把册子交给邵明贞和别人。她没有变成另一个张元照，更没有放弃规矩；她后来终于肯承认：规矩有用，也会写错。写错了就改，不必为了保住自己的脸面硬撑。';
  }

  applyGuScenes();syncGu(state);
  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople)peopleView=function(){syncGu(state);return oldPeople();};

  function directRefresh(){try{
    if(typeof stopVoice==='function')stopVoice();
    const app=typeof $==='function'?$('#app'):document.querySelector('#app');if(!app)return;
    const body=state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView();
    app.innerHTML=nav()+body;if(typeof bind==='function')bind();if(typeof maybeAutoplayVoice==='function')maybeAutoplayVoice();
  }catch(_e){}}

  const baseRender=typeof render==='function'?render:null;
  if(baseRender)render=function(){
    const r=baseRender();applyGuScenes();syncGu(state);directRefresh();
    document.documentElement.dataset.build='v108';document.title='宫灯未眠 · 顾明宜全局人设梳理润色 v108';return r;
  };

  document.documentElement.dataset.build='v108';document.title='宫灯未眠 · 顾明宜全局人设梳理润色 v108';
  state.flags=state.flags||{};state.flags.v108GuPolish=true;
  try{save()}catch(_e){};try{render()}catch(_e){applyGuScenes();syncGu(state);directRefresh();}
}catch(e){console.error('v108 gu global character polish failed',e)}})();
