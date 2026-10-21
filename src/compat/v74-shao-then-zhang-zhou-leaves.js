(()=>{try{
  document.documentElement.dataset.build='v74';
  const CH=t=>CHAPTERS.find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const arr=(v,s)=>{try{return typeof v==='function'?v(s):(Array.isArray(v)?v:[v])}catch(_e){return[]}};

  // A. 继后增加第三条：邵明贞先受凤印，经过一段真正的中宫岁月，最终张元照继后。
  const vacant=CH('中宫空悬');
  const seal=ST(vacant,'凤印前最后一道旨');
  if(seal && !(seal.choices||[]).some(c=>c.v74ShaoThenZhang)){
    seal.choices.push({
      label:'“先册邵氏。朕要先看这条最稳的路能走到哪里。”',
      hint:'不是把张元照判出局。邵明贞先受凤印；她真正成为皇后以后，旧门与外戚也会一起长到中宫门前。',
      v74ShaoThenZhang:true,
      effects:{ranks:{ning:'皇后'},flags:{v44NewEmpress:'ning',v74ShaoThenZhang:true,v74ShaoFirstEnthroned:true}},
      result:'承熙十四年春，邵明贞先受凤印。她没有穿顾明宜旧衣，也没有把景仁宫的人全搬进凤仪宫。六宫最初甚至比预想中更快安静下来。'
    });
  }

  // The five-scene intermediate reign is authored once in v106 and installed
  // by prepare139. The earlier duplicate factory and its story-view insertion
  // hook are retired; the seal choice and Zhou state rules below stay compatible.
  // B. 周清漪不再固定自尽。真相揭开后，她活着来御前认自己隐瞒的三次，并请求如果女儿离京，让她跟着走。
  const west=CH('西华门外');
  const reveal=ST(west,'他自己把西华门那一夜送到御前');
  if(reveal){
    reveal.text=s=>[
      `陆既明没有等宗人府查完。三月初九，他自己请入养心殿，带来旧木匣。`,
      `匣里有双生襁褓旧布、常福临死前留下的自陈，还有半张写给守寡姐姐的托孤便条。便条记着承熙元年西华门外交婴的日期、时辰，末尾是常福的押。`,
      `旧产案只记男婴被抱出小院，没写交给谁；襁褓旧布的纹样同周清漪留下的女婴小衣相合。常福的自陈写明交婴经过，宗人府又核了自陈与便条的笔迹。便条只能证明他曾把孩子交出去，陆既明六岁起的户籍则接上了这个孩子后来的去处；几件证物合看，才足以认定身世。`,
      `常福奉的是“秘处”死令，却在西华门外违旨，把男婴交给自己守寡的姐姐，对内回报“已毕”。那个孩子后来改姓陆，六岁以前没有正式户籍。`,
      `我问：“为什么偏偏走近二公主？”`,
      `陆既明答：“因为她是我姐姐。”`,
      `我压着声音：“你从一开始就知道？”`,
      `“知道。”`,
      `“她不知道。”`,
      `“所以她才会真的选我。”`,
      `他把那枚白玉书扣放到御案上：“她腊月给我的。她说婚书下来以后让我还她。”`,
      `我看着那枚东西，第一次不是因为冒籍，也不是因为旧血，而是真正想把眼前这个人拖下去问一句：你凭什么拿她的真心替十八年前的你讨债。`,
      `张元照没有劝我消气，只说：“先把二公主接到慈宁宫。别让她从别人的嘴里听见。”`,
      `这时绮春宫也来人。不是报丧。`,
      `周清漪自己来了。她进门以后没有先看陆既明，只跪在御案前：“五月臣妾见过他。秋天收到旧布。腊月，女儿告诉臣妾她想嫁他。”`,
      `她停了一会儿：“臣妾三次都没有说。”`,
      `陆既明终于看了她一眼。周清漪却没有叫他儿子。`,
      `她只说：“先让臣妾把该认的错认完。女儿的事，再由女儿自己知道。”`
    ];
  }

  if(west && reveal && !west.steps.some(s=>s.v74ZhouChoice)){
    const ri=west.steps.indexOf(reveal);
    west.steps.splice(ri+1,0,{
      v74ZhouChoice:true,
      heading:'三月初十 · 周清漪第一次没有把那句话咽回去',
      cast:['zhou','emperor'],fx:'candle',keyDecision:true,text:s=>{
        const fate=s.flags?.v69PrincessFate;
        const where=fate==='estate'?'封邑':fate==='convent'?'京郊道观':'京中';
        return [
          s.flags?.v69HiddenPrinceFinal==='hide'?`二公主听说冒籍与撤婚以后，整整一夜没有见母亲。她尚未获知双生血缘。第二日午后，周清漪又来养心殿。`:`二公主知道真相以后，整整一夜没有见母亲。第二日午后，周清漪又来养心殿。`,
          `她没有再替自己解释为什么五月不说、秋天不说、腊月还是不说。`,
          `“臣妾知道自己该受罚。”`,
          `我问：“你想求什么？”`,
          `她看向窗外：“若她要离京，让臣妾跟她走。”`,
          `“你以为她现在还愿意见你？”`,
          `“不知道。”周清漪这一次答得很快，“所以先问她。她不愿意，臣妾就不去。”`,
          fate==='estate'?`二公主已经决定去自己的封邑。她没有说永远不见母亲，只说：“让她别替我收婚帖，别替我回答别人问我还嫁不嫁。”`:
          fate==='convent'?`二公主已经决定去京郊清修。她仍不知道全部血统真相，却知道母亲早就发现陆氏有问题而没有告诉她。她说：“她若来，只能以母亲身份来，别再替我瞒任何事。”`:
          `二公主暂时留在京中。她没有赶周清漪走，也没有像从前一样当天就去绮春宫。`,
          `周清漪最后说：“臣妾以前总觉得少说一句，事情就能缓一点。现在不敢这样想了。”`
        ];
      },choices:[
        {label:'让二公主自己决定要不要母亲同行',hint:'这一次不由皇帝替她们母女决定是否继续住在一起。',effects:{trust:{zhou:1},flags:{v74ZhouAskPrincess:true,v74ZhouLeavesWithDaughter:true}},result:s=>s.flags?.v69PrincessFate==='estate'?'二公主同意周清漪随去封邑，但两人分院居住。周妃保妃号，停一切宫权，非诏不返京。':s.flags?.v69PrincessFate==='convent'?'二公主同意母亲陪她离宫清修。周妃保妃号，不再参与六宫事务。':'二公主的去处改由后续终局分支决定。'},
        {label:'周妃留宫受罚，二公主的去留与她分开',hint:'她隐瞒线索的责任由她自己承担，不把惩罚继续压在女儿身上。',effects:{trust:{zhou:-2},flags:{v74ZhouStayedPunished:true}},result:'周清漪停宫权一年，仍居绮春宫。二公主按自己的分支离京或留京，不再由母亲跟随。'}
      ]
    });
  }

  // 旧版终局选择会自动把周妃写死；最终补丁把这一副作用撤掉。
  if(typeof applyChoiceEffects==='function'&&!globalThis.__v74Apply){
    globalThis.__v74Apply=true;
    const oldApply74=applyChoiceEffects;
    applyChoiceEffects=function(c){const out=oldApply74(c);if(c?.v69Final){state.flags=state.flags||{};state.flags.v69ZhouDead=false;state.flags.v74ZhouAliveAfterReveal=true;if(state.ranks?.zhou&&String(state.ranks.zhou).startsWith('故'))state.ranks.zhou=String(state.ranks.zhou).replace(/^故/,'');if(PEOPLE?.zhou)PEOPLE.zhou.title=state.ranks?.zhou||'周妃';}return out;};
  }

  // C. 史笔与人物志同步“先邵后张”和周妃离宫，不让旧总结把周清漪重新写死。
  if(typeof historyRecordV38==='function'&&!globalThis.__v74Hist){
    globalThis.__v74Hist=true;const oldHist74=historyRecordV38;
    historyRecordV38=function(e,i){
      if(e?.title==='中宫空悬'&&state.flags?.v74ShaoThenZhang){
        return state.flags?.v74ZhangSucceeded
          ?'承熙十四年春，先册邵氏为皇后。十五年，外戚借中宫名义荐官议亲；三司查无邵氏本人私荐，她请解印务，退居皇贵妃位。五月，张氏继受凤印。'
          :'承熙十四年春，册邵氏为皇后。';
      }
      if(e?.title==='西华门外'&&state.flags?.v69HiddenPrinceRevealed){
        const tail=state.flags?.v74ZhouLeavesWithDaughter?'周妃未死，停宫权后随二公主离宫。':state.flags?.v74ZhouStayedPunished?'周妃留宫受罚。':'周妃仍待处分。';
        return `承熙十九年，周氏双生旧子陆既明自陈血脉，二公主婚议撤。${tail}`;
      }
      return oldHist74(e,i);
    };
  }

  if(PEOPLE?.ning && state.flags?.v74NingFormerEmpress){
    PEOPLE.ning.bio='邵明贞曾在顾皇后之后先受凤印，把六宫真正重新坐稳过一年。外戚却不断借“皇后邵氏”的名义荐官、结亲，连四公主婚事也被卷入。三司最终查明她本人没有私荐受赂，她仍主动解去中宫印务，退居皇贵妃。她不是做不了皇后，而是不愿余生每落一笔都先替自己的姓氏辩白。';
  }
  if(PEOPLE?.zhou && state.flags?.v74ZhouLeavesWithDaughter){
    PEOPLE.zhou.bio='周清漪先在慈宁宫外认出陆既明与二公主相似，后来又收到双生旧布，却连续数月没有上报。真相揭开后，她没有以死结束，而是停去宫权。若二公主同意，她随女儿离京，在封邑或清修之地重新学习一件她过去最不擅长的事：该说的时候把话说出来。';
  }

  const oldChron74=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron74&&!globalThis.__v74Chron){globalThis.__v74Chron=true;chronicleView=function(){let h=oldChron74();const f=state.flags||{};
    h=h.replace(/周妃在事发后自尽；她十八年秋隐瞒线索的责任另记，不以死亡抵销。/g,f.v74ZhouLeavesWithDaughter?'周妃未以死收束。她承认自己三次隐瞒线索，停宫权后随二公主离宫。':f.v74ZhouStayedPunished?'周妃未死，留宫停权受罚；她隐瞒线索的责任另记。':'周妃活着面对自己隐瞒线索的后果。');
    h=h.replace(/周妃后自尽，皇女婚议撤。/g,`${f.v74ZhouLeavesWithDaughter?'周妃后随二公主离宫':'周妃另受处分'}，二公主婚议撤。`);
    const extra=f.v74ShaoThenZhang?`<section class="v69-factions"><span class="eyebrow">承熙十四—十五年 · 两次受印</span><h4>凤印先后落在两个人手里</h4><p><b>邵明贞：</b>先受凤印，把六宫真正重新坐稳。她本人没有替邵氏谋官，但外戚不断拿皇后父家的名义荐人、结亲。三司查清她无私荐以后，她仍主动解印，退还皇贵妃位。</p><p><b>张元照：</b>没有趁邵氏案未结立刻接位。中宫空了四十九日，旧案结清以后才继受凤印。两次册后是两次独立的决定。</p></section>`:'';
    return extra?h.replace('</main>',extra+'</main>'):h;
  };}

  const oldEnd74=typeof ending==='function'?ending:null;
  if(oldEnd74&&!globalThis.__v74End){globalThis.__v74End=true;ending=function(){let h=oldEnd74();const f=state.flags||{};
    if(f.v74ShaoThenZhang&&f.v74ZhangSucceeded){
      h=h.replace(/邵明贞以[^。]*留在六宫，实际承担的宫务往往比名位更重。/g,'邵明贞曾先受凤印，完整做过一年皇后。邵氏外戚借中宫名义结党以后，她在三司查明本人无私荐的情况下主动解印，退居皇贵妃。');
      h=h.replace(/张元照最终受凤印。/g,'张元照在邵后解印、邵氏案结清四十九日后继受凤印。');
    }
    h=h.replace(/周清漪的牌位没有因为她最后的自尽被写成“殉母”。[\s\S]*?也都是真的。/g,f.v74ZhouLeavesWithDaughter?'周清漪没有用死亡结束这件事。她承认自己五月、秋天、腊月三次没有开口；停去宫权以后，若二公主愿意，她随女儿离开宫城。母女没有立刻和好，只不再隔着宫墙继续沉默。':f.v74ZhouStayedPunished?'周清漪没有自尽。她留在绮春宫停权受罚，二公主的去留不再由她决定。':'周清漪仍活着面对自己隐瞒线索的后果。');
    return h;
  };}

  state.flags=state.flags||{};state.flags.v74Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v74 patch failed',e)}})();
