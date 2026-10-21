(()=>{try{
  document.documentElement.dataset.build='v37';

  const LOW_KEYS_V37=['cao2','zhao2','lin2','ye2','du2','su2'];
  const HIGH_KEYS_V37=['ning','ke','hui'];
  const DEFAULT_PREFIX_V37={ning:'徽',ke:'晋',hui:'元'};

  // ---------- 1. 让封号真正由主控决定 ----------
  const courtTitleV36=courtTitle;
  courtTitle=function(s,k){
    if(HIGH_KEYS_V37.includes(k)){
      const raw=(s?.ranks&&s.ranks[k])||PEOPLE[k]?.title||'';
      if(/^故|^废/.test(raw))return raw;
      const pref=s?.flags?.titlePrefixes?.[k]||DEFAULT_PREFIX_V37[k];
      if(['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'].includes(raw))return pref+raw;
      if(/^[徽纯端和晋毅元贞](贵人|嫔|妃|贵妃|皇贵妃)$/.test(raw))return pref+raw.replace(/^[徽纯端和晋毅元贞]/,'');
      return raw;
    }
    return courtTitleV36(s,k);
  };
  displayRank=function(k,s=state){return courtTitle(s,k)};

  function ensureLowOrderV37(s=state){
    if(!s.flags.v37LowOrder){
      const a=LOW_KEYS_V37.filter(k=>k!=='zhao2');
      for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
      // v54：王静娴固定进入第一批低位留牌。她承担“表面恭顺、内心清醒”的长期侧线，不再靠随机抽中。
      s.flags.v37LowOrder=['zhao2',...a];try{save()}catch(_e){}
    }
    return s.flags.v37LowOrder;
  }
  function lowTraitsV37(k){
    return {
      cao2:'地方官女 · 稳，记性好，不抢话',zhao2:'京官女 · 表面周全，内心清醒',lin2:'太医旁支 · 懂一点常见药名',ye2:'翰林旁支 · 小楷好，声音轻',du2:'漕运官女 · 做事爽利，家务熟',su2:'京畿官女 · 性情平和，会针线与小调'
    }[k]||'家世清白';
  }
  function grantTitleV37(g){
    state.flags.titlePrefixes=state.flags.titlePrefixes||{};
    state.flags.titlePrefixes[g.k]=g.prefix;
    state.ranks[g.k]=g.rank;
    PEOPLE[g.k].title=g.prefix+g.rank;PEOPLE[g.k].glyph=g.prefix;PEOPLE[g.k].introducedAt=5;
    if(!HAREM_KEYS.includes(g.k))HAREM_KEYS.push(g.k);
    state.flags.v37HighSelected=state.flags.v37HighSelected||{};state.flags.v37HighSelected[g.k]=true;
  }
  function selectLowV37(count){
    const chosen=ensureLowOrderV37(state).slice(0,count);
    state.flags.lowConsorts=chosen;state.flags.v37LowCount=count;
    state.flags.lowPregnancyKey=chosen[Math.floor(Math.random()*chosen.length)];
    state.flags.lowAccompliceKey=[...chosen].reverse().find(k=>k!=='zhao2')||null;
    LOW_KEYS_V37.forEach(k=>{if(chosen.includes(k)){const i=chosen.indexOf(k);state.ranks[k]='待封';PEOPLE[k].introducedAt=5;PEOPLE[k].home=i%2===0?'延禧馆':'储秀宫西院';if(!HAREM_KEYS.includes(k))HAREM_KEYS.push(k)}else{state.ranks[k]='待选';PEOPLE[k].introducedAt=99}});
  }
  function rankLowV37(policy){
    const chosen=state.flags.lowConsorts||[];
    chosen.forEach((k,i)=>{
      if(policy==='allYing')state.ranks[k]='答应';
      else if(policy==='threeChang')state.ranks[k]=i<Math.min(3,chosen.length)?'常在':'答应';
      else state.ranks[k]=i<Math.min(2,chosen.length)?'常在':'答应';
      PEOPLE[k].title=state.ranks[k];
    });
    state.flags.firstGrandSelectionDone=true;state.flags.v37LowRankPolicy=policy;
  }

  const applyChoiceEffectsV36=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=applyChoiceEffectsV36(c);
    if(c.v37Grant){grantTitleV37(c.v37Grant);out.push(`${PEOPLE[c.v37Grant.k].name}初封 ${courtTitle(state,c.v37Grant.k)}`)}
    if(c.v37LowCount){selectLowV37(c.v37LowCount);out.push(`低位留牌 ${c.v37LowCount} 人`)}
    if(c.v37LowPolicy){rankLowV37(c.v37LowPolicy);out.push('低位新人初封位分已定')}
    if(c.v37WenhengPreg==='conceive'){state.flags.wenhengPregnant=true;state.flags.wenhengPregHistory=true;out.push('蘅嫔有喜')}
    if(c.v37WenhengPreg==='none'){state.flags.wenhengPregnant=false;state.flags.wenhengPregDeclined=true;out.push('蘅嫔不入承宠册')}
    if(c.v37WenhengLoss){state.flags.wenhengLossCare=c.v37WenhengLoss;out.push('蘅嫔孕事进入高风险静养')}
    if(c.v37WenhengMiscarry){state.flags.wenhengPregnant=false;state.flags.wenhengMiscarried=true;out.push('蘅嫔小产')}
    if(c.v37WenhengFate){
      state.flags.wenhengFate=c.v37WenhengFate;
      if(c.v37WenhengFate==='dead'){state.flags.wenhengDead=true;state.ranks.wenheng='故蘅嫔';PEOPLE.wenheng.home='拾遗阁旧居'}
      if(c.v37WenhengFate==='west'){state.flags.wenhengDead=false;state.ranks.wenheng='蘅嫔';PEOPLE.wenheng.home='西苑静居'}
      if(c.v37WenhengFate==='return'){state.flags.wenhengDead=false;state.ranks.wenheng='蘅嫔';PEOPLE.wenheng.home='蘅地旧陵别院'}
      out.push(c.v37WenhengFate==='dead'?'蘅嫔饮毒而亡':c.v37WenhengFate==='west'?'蘅嫔退居西苑':'蘅嫔离京返蘅地');
    }
    return out;
  };

  // ---------- 2. 把终选从“三年至六年大章”里独立出来 ----------
  const combined=CHAPTERS[5];
  if(combined && !CHAPTERS.some(x=>x.title==='御前终选')){
    const yearSteps=combined.steps.slice(3);

    const selectionChapter={
      date:'承熙三年·二月',title:'御前终选',theme:'留谁、给什么位分、赐什么封号，都由坐在御座上的人亲自承担',place:'体元殿',cast:['gu','taihou','ning','ke','hui'],fx:'lantern',
      bridge:s=>`登基后的第一次正式采选终于开到御前。礼部已经筛掉家世、年岁与礼法不合者，真正站进体元殿的每一个人都足够体面。到这一步，朝臣只能递名单；留不留、初封高低、封号写什么字，必须由我亲自落笔。`,steps:[
        {heading:'第一幕 · 三份家谱先于三张脸到御前',cast:['gu','taihou'],fx:'ink',narrative:true,text:s=>[
          `终选前一夜，皇后把三份最重的家谱送进养心殿。邵氏连着太后母族与顾氏姻亲；霍氏父兄仍在北营；崔氏几代插手漕粮、织造与贡造。`,
          `“三个人都不只是三个人。”和妃在旁边看了一眼。`,
          `皇后点头。她能替我把旧例翻到最细，却不能替我决定给谁嫔位、给谁贵人，更不能替我决定一个封号要向朝堂释放什么信号。`,
          `<span class="motive-note"><b>终选规则</b>高位三人因朝局平衡都会入宫，但初封高低与封号由你定。低位候选由终选表现随机排出顺序，你决定最终留二至五人以及初封尺度。</span>`
        ],choices:[{label:'亲临体元殿',effects:{flags:{v37FinalSelectionOpened:true}},result:''}]},

        {heading:'第二幕 · 我亲自问最后一题',cast:['ning','ke','hui','gu','taihou'],fx:'lantern',keyDecision:true,text:s=>[
          `体元殿没有鼓乐。太后坐帘后，皇后执名册，我坐在正中。`,
          `<span class="v37-candidate-list"><span><b>邵明贞</b><em>太后亲侄女 · 顾氏姻亲</em>规矩熟，却敢在无例时自己拿主意。</span><span><b>霍素英</b><em>北营勋贵</em>不善讨巧，谈起军粮与边地比谈首饰自然。</span><span><b>崔静仪</b><em>江南财赋世家</em>最懂分寸，也最懂怎样让家族关系藏在“正常办事”里。</span></span>`,
          `她们都已经过了礼部那一关。现在我真正想知道什么，只能自己问。`
        ],choices:[
          {label:'问：“进宫以后，你最怕失去什么？”',hint:'先看她们本人，而不是背后的三家',effects:{trust:{ning:2,ke:1,hui:1},flags:{selectionQuestion:'self'}},result:'邵明贞答“判断”，霍素英答“家书”，崔静仪停了一息，答“分寸”。太后没有点评。最后怎么册封，才是我的回答。'},
          {label:'问：“你们各自能替六宫做什么？”',hint:'从第一天就把政治功能摆到台面上',effects:{trust:{gu:1,ning:1,ke:1,hui:1},flags:{selectionQuestion:'function'}},result:'邵氏说可协祭礼与女学，霍氏说愿整骑射与北地冬例，崔氏说自己擅细账与人情。没有一句是情话。'},
          {label:'不问，静看一炷香',hint:'漂亮话人人会说，先看她们如何待在沉默里',effects:{trust:{hanzhang:1},flags:{selectionQuestion:'silence'}},result:'邵氏目不斜视，霍氏肩背始终不松，崔氏替一个失手的宫女让开半步。沉默也会泄露习惯。'}
        ]},

        {heading:'第三幕 · 邵明贞的册页',cast:['ning','gu','taihou'],fx:'seal',keyDecision:true,text:s=>[
          `邵明贞是太后的亲侄女，母亲又出顾氏旁支。给她太高，是把外戚与中宫同盟再加一层；给得太低，则像我在公开防太后。`,
          `皇后把空白册页放到我手边。太后没有说话。`,
          `封号也不是装饰。一个字会被六宫叫很多年，也会被朝臣反复揣测。`
        ],choices:[
          {label:'初封嫔位，赐号“徽”',hint:'徽：端正、美善。给足太后母族体面，也让她从第一天就站在高位',v37Grant:{k:'ning',prefix:'徽',rank:'嫔'},effects:{trust:{taihou:2,gu:-1,ning:2},flags:{ningInitial:'high'}},result:'朱笔写下“徽”。皇后接过册页时手很稳。太后只道：“谢恩吧。”'},
          {label:'初封嫔位，赐号“纯”',hint:'纯：清正、和缓。仍是嫔位，但弱化“外戚代表”的公开意味',v37Grant:{k:'ning',prefix:'纯',rank:'嫔'},effects:{trust:{gu:1,ning:2},flags:{ningInitial:'soft'}},result:'“纯”字比“徽”少一层家门意味。太后看了一眼，没有反对。皇后反而明显松了一点。'},
          {label:'初封贵人，赐号“徽”',hint:'政治上最谨慎：认太后体面，但不直接给嫔位',v37Grant:{k:'ning',prefix:'徽',rank:'贵人'},effects:{trust:{gu:2,taihou:-1,ning:-1},flags:{ningInitial:'cautious'}},result:'太后端茶的手停了一瞬。邵明贞仍完整行礼，没有替自己多说一句。'}
        ]},

        {heading:'第四幕 · 霍素英的册页',cast:['ke','gu'],fx:'seal',keyDecision:true,text:s=>[
          `霍家握着北营人脉。她本人并不张扬，真正重的是她背后的军功旧部。`,
          `给她高位可以安勋贵，也可能让中宫第一次真正感到“另一个皇子母族”随时会长出来。`,
          `我需要决定，是先奖家门，还是先留一阶余地。`
        ],choices:[
          {label:'初封嫔位，赐号“晋”',hint:'晋：进、升。字利落，给勋贵明确体面',v37Grant:{k:'ke',prefix:'晋',rank:'嫔'},effects:{trust:{ke:2},flags:{keInitial:'high'}},result:'霍素英接册时没有抬头。出殿后第一件事，是问随身那张旧弓能不能带进宫。'},
          {label:'初封嫔位，赐号“毅”',hint:'毅：坚决。更贴她本人，不直接把“进位”意味写在封号上',v37Grant:{k:'ke',prefix:'毅',rank:'嫔'},effects:{trust:{ke:3,gu:1},flags:{keInitial:'personal'}},result:'“毅”字落下以后，霍素英第一次明显怔了一下。这个封号更像给她，不像给霍家。'},
          {label:'初封贵人，赐号“晋”',hint:'压低初位，避免北营家族一入宫就占嫔位',v37Grant:{k:'ke',prefix:'晋',rank:'贵人'},effects:{trust:{ke:-1,gu:2},flags:{keInitial:'cautious'}},result:'霍氏没有失礼，只在退下时把背挺得更直。北营会看懂这一级之差。'}
        ]},

        {heading:'第五幕 · 崔静仪的册页',cast:['hui','gu','shen'],fx:'seal',keyDecision:true,text:s=>[
          `崔家没有兵，却握着更难看见的东西：漕运、织造、贡造，以及许多“谁都要用”的供应关系。`,
          `崔静仪本人最不容易让人讨厌。正因为如此，给她多少体面更需要想清楚。`,
          `和妃看过她的家谱，只说：“这种家族不怕位分低，怕的是手伸不到日常里。”`
        ],choices:[
          {label:'初封嫔位，赐号“元”',hint:'元：始、首、正。体面中正，也最容易被解读为对江南财赋世家的安抚',v37Grant:{k:'hui',prefix:'元',rank:'嫔'},effects:{trust:{hui:2},flags:{huiInitial:'high'}},result:'崔静仪谢恩时声音不高。她得到的是三人里最“看不出攻击性”的一个字。'},
          {label:'初封嫔位，赐号“贞”',hint:'贞：正、守。把评价落在品行上，而非家门',v37Grant:{k:'hui',prefix:'贞',rank:'嫔'},effects:{trust:{hui:1,gu:1},flags:{huiInitial:'personal'}},result:'她抬眼看了一瞬，又很快伏下去。接册时手指在“贞”字上停了一息。'},
          {label:'初封贵人，赐号“元”',hint:'对崔氏供应网络保留明显防备',v37Grant:{k:'hui',prefix:'元',rank:'贵人'},effects:{trust:{hui:-2,shen:1},flags:{huiInitial:'cautious'}},result:'崔静仪依旧笑得很妥帖。她越没有反应，和妃越多看了她一眼。'}
        ]},

        {heading:'第六幕 · 偏殿还有六个人',cast:['gu'],fx:'ink',keyDecision:true,text:s=>{
          const a=ensureLowOrderV37(s);return [
            `高位三册定下以后，偏殿还有六名家世清白、却不足以单独代表一派朝臣的候选。礼部建议“酌留二至五”。`,
            `<span class="v37-candidate-list">${a.map(k=>`<span><b>${PEOPLE[k].name}</b><em>${lowTraitsV37(k)}</em></span>`).join('')}</span>`,
            `她们的次序来自这一日的终选表现，每局会不同。我要决定的不是谁有资格活得更好，只是后宫究竟要充到什么程度。`
          ];
        },choices:[
          {label:'留二人',hint:'最克制；后宫规模增长慢，随机留下当前排序最前两人',v37LowCount:2,effects:{flags:{v37LowNumber:2}},result:'名额定为两人。下一步由终选排序落位。'},
          {label:'留三人',hint:'常规尺度；随机留下当前排序前三人',v37LowCount:3,effects:{flags:{v37LowNumber:3}},result:'名额定为三人。下一步由终选排序落位。'},
          {label:'留四人',hint:'六宫更快充实，也会更快出现新的承宠与生育变量',v37LowCount:4,effects:{flags:{v37LowNumber:4}},result:'名额定为四人。下一步由终选排序落位。'},
          {label:'留五人',hint:'最宽；后宫生态最复杂，低位人物出现概率最高',v37LowCount:5,effects:{flags:{v37LowNumber:5}},result:'名额定为五人。下一步由终选排序落位。'}
        ]},

        {heading:'第七幕 · 低位初封也不能由尚宫局替我写',cast:['gu'],fx:'seal',keyDecision:true,text:s=>[
          `留牌名单送回来以后，尚宫局照惯例拟了两套位分。低位新人不赐单字封号，只写本姓与位分。`,
          `<span class="selection-decree"><b>已留牌</b><small>${(s.flags.lowConsorts||[]).map(k=>PEOPLE[k].name).join(' · ')}</small></span>`,
          `她们背后没有必须安抚的三股大势力，所以这一次高低更多代表我想把第一次大选办得多宽。`
        ],choices:[
          {label:'前两名封常在，其余答应',hint:'最常规；终选表现较好的两人高一阶',v37LowPolicy:'twoChang',effects:{flags:{}},result:'位分按此落册。具体名单会在宣旨前再呈一次。'},
          {label:'全部封答应',hint:'最谨慎；不给低位新人额外政治分量',v37LowPolicy:'allYing',effects:{trust:{gu:1}},result:'位分按此落册。具体名单会在宣旨前再呈一次。'},
          {label:'前三名封常在，其余答应',hint:'较宽；让更多新人从一开始就有被看见的机会',v37LowPolicy:'threeChang',effects:{bond:{taihou:1}},result:'位分按此落册。具体名单会在宣旨前再呈一次。'}
        ]},

        {heading:'第八幕 · 册书送出体元殿',cast:['gu','taihou'],fx:'seal',narrative:true,text:s=>[
          `<span class="selection-decree"><b>御前亲定</b><small>${PEOPLE.ning.name}：${courtTitle(s,'ning')} · ${PEOPLE.ke.name}：${courtTitle(s,'ke')} · ${PEOPLE.hui.name}：${courtTitle(s,'hui')}</small><small>低位：${(s.flags.lowConsorts||[]).map(k=>`${PEOPLE[k].name}·${s.ranks[k]}`).join(' · ')}</small></span>`,
          `我落完最后一笔，皇后才把三册合上。她没有替我选任何一个字。`,
          `太后起身以前看了邵明贞的册页一眼。无论我给她的是徽、纯，是嫔还是贵人，她都只说：“既是你定的，往后就按你定的过。”`,
          `这句话听起来像放手，也像提醒：从今天开始，她们每个人后来走成什么样，都不能再推回给礼部。`
        ],choices:[{label:'宣旨',effects:{flags:{v37SelectionCompleted:true}},result:''}]}
      ]
    };

    const yearsChapter={...combined,date:'承熙三年·三月至六年七月',title:'宫灯渐繁',theme:'终选只是把人送进来；三年里真正改变她们的是恩宠、孩子、旧案与彼此留下的痕迹',place:'六宫',cast:['gu','shen','baopu','wenheng'],steps:yearSteps};
    CHAPTERS.splice(5,1,selectionChapter,yearsChapter);

    // 原来第六章以后人物登场索引整体后移一章，避免人物页提前剧透。
    Object.values(PEOPLE).forEach(p=>{if((p.introducedAt??0)>=6&&p.introducedAt<90)p.introducedAt+=1});
    HIGH_KEYS_V37.forEach(k=>PEOPLE[k].introducedAt=5);
  }

  const years=CHAPTERS.find(x=>x.title==='宫灯渐繁');
  if(years){
    const idx=years.steps.findIndex(x=>x.heading?.includes('那匣香本来只是'));
    if(idx>=0 && !years.steps.some(x=>x.heading?.includes('蘅嫔是不是只剩一个名位'))){
      const w1={heading:'承熙四年二月 · 蘅嫔是不是只剩一个名位',cast:['wenheng','taihou'],fx:'candle',keyDecision:true,text:s=>[
        `蘅嫔入六宫已经两年。她有嫔位、有月例，也照常请安，却一直没有真正进入承宠册。`,
        `这件事起初像是双方默认：我防她旧国人脉，她也不主动靠近。可名位挂得越久，“她究竟算不算真正的妃嫔”就越无法一直回避。`,
        `太后问得很直接：“你若只想把人当质子，当初就不该册进六宫。既册了，便要决定按什么身份待她。”`,
        `蘅嫔本人没有求召。她最常问的是女儿的住处和旧国来信能否照送；是否愿意承宠，我还没有听她亲口说。`
      ],choices:[
        {label:'按六宫例召蘅嫔侍寝',hint:'承认她的妃嫔身份；她有机会怀孕，但年岁与旧疾使孕事风险很高',v37WenhengPreg:'conceive',effects:{bond:{wenheng:2},trust:{wenheng:1},flags:{wenhengBedchamber:'direct'}},result:'那一夜没有和解。蘅嫔行完礼，只问了一句：“陛下今日召的是蘅嫔，还是蘅国旧后？”我答：“今晚册上写的是蘅嫔。”她没有再问。两个月后，太医报了喜脉。'},
        {label:'先问她本人愿不愿意，再决定召幸',hint:'先问她自己愿不愿意；她多半会答应，因为有孩子也能让她和旧蘅人多一层保障',v37WenhengPreg:'conceive',effects:{trust:{wenheng:4},flags:{wenhengBedchamber:'asked'}},result:'她听完沉默很久：“臣妾若说愿意，陛下会不会觉得臣妾又在算？”我说“会”。她反而笑了：“那便算着来吧。”两个月后，她有了喜脉。'},
        {label:'只留名位，不召幸',hint:'最安全的政治距离；蘅嫔不会有这一胎',v37WenhengPreg:'none',effects:{trust:{wenheng:-1,taihou:1},flags:{wenhengBedchamber:'none'}},result:'她仍是蘅嫔，却继续不入承宠册。她对此没有争，只把更多心思放回两个女儿与旧国来信。'}
      ]};
      const w2={heading:'承熙四年四月 · 一份不太像喜报的喜脉',cast:['wenheng','baopu','hanzhang'],fx:'ink',narrative:true,text:s=>s.flags.wenhengPregnant?[
        `<b>据含章后来所述</b>`,
        `太医说“有喜”时，蘅嫔没有笑。她第一反应是问脉象稳不稳。`,
        `她已经四十岁，旧年奔波和冬咳都伤过身。太医只肯说一句：“较寻常孕事更需谨慎。”`,
        `${courtTitle(s,'baopu')}却真的高兴。她蹲到母亲膝边问：“若是弟弟呢？”`,
        `${courtTitle(s,'hanzhang')}坐在另一侧，没有接“弟弟”两个字，只问：“这孩子生下来，算谁的人？”`,
        `屋里一下静了。`,
        `蘅嫔最后道：“先算一个孩子。等他活下来，再让你们这些人算别的。”`,
        `入夜后，含章看见母亲把旧国来信重新锁进箱底。铜锁扣上时，蘅嫔没有再提那孩子将来“算谁的人”。`
      ]:[
        `<b>据含章后来所述</b>`,
        `这一年春天，蘅嫔没有孕事。她仍按旧例请安、写家书、看两个女儿。`,
        `宫里偶尔有人私下议论她“有名无宠”。她听见时没有辩，只问含章旧国寄来的家书到了没有。`
      ],choices:[{label:'继续',effects:{flags:{wenhengPregSeen:true}},result:''}]};
      const w3={heading:'承熙四年七月 · 胎像开始不稳',cast:['wenheng','gu','taihou'],fx:'mist',keyDecision:true,text:s=>s.flags.wenhengPregnant?[
        `入夏以后，蘅嫔两次见红。太医没有把原因归到任何一件具体东西上，只说她这一胎本就比年轻妃嫔更险。`,
        `皇后翻出三份安胎旧例，太后却按住册子：“旧例只能告诉你怎么照料，不能保证一个孩子一定留得住。”`,
        `蘅嫔靠在榻上听完，忽然问我：“若这孩子没了，陛下会不会觉得省事？”`,
        `她没有再问第二遍，只看着我，等我回答。`
      ]:[`蘅嫔没有这一胎。七月的诊案只记旧咳复发，太医开了最普通的调养方。`],choices:[
        {label:'封宫静养，太医院专守',hint:'尽力护胎；不能把结果写成“照料得好就一定保住”',requires:s=>!!s.flags.wenhengPregnant,v37WenhengLoss:'protect',effects:{trust:{wenheng:3,gu:1}},result:'我只答：“先保你。”蘅嫔看了我很久。她没有说谢恩。'},
        {label:'准她迁西苑静养，暂断宫中应酬',hint:'减少政治噪声，也会让她觉得自己又被移开',requires:s=>!!s.flags.wenhengPregnant,v37WenhengLoss:'west',effects:{trust:{wenheng:1},flags:{wenhengPregWest:true}},result:'她搬去西苑时只带了两个箱子。抱朴一路送到门口，含章却没有去。'},
        {label:'仍照旧例，不因有孕撤掉对旧国往来的复验',hint:'政治防备不松；她会把这种选择记很久',requires:s=>!!s.flags.wenhengPregnant,v37WenhengLoss:'strict',effects:{trust:{wenheng:-4}},result:'复验照旧。她没有争，只让宫女把每一封拆过的信重新按原折痕叠好。'},
        {label:'没有孕事，继续往下',requires:s=>!s.flags.wenhengPregnant,effects:{},result:''}
      ]};
      const w4={heading:'承熙四年八月 · 那个没有进玉牒的孩子',cast:['wenheng','baopu','hanzhang'],fx:'rain',narrative:true,text:s=>s.flags.wenhengPregnant?[
        `八月一场闷雨后，蘅嫔小产。`,
        `太医院的记录很短：胎元不固，母体失血，后续调养。没有人能从一张纸上找到一个足以怪罪的单一原因。`,
        `${courtTitle(s,'baopu')}守了一夜。第二日清晨，她把母亲喝空的药碗拿出去，回来时忽然问：“如果孩子进了宗谱，是不是就不会这么容易没？”`,
        `蘅嫔闭着眼：“不是。”`,
        `停了很久，她又说：“可人总会以为，握得更紧一点，就不会丢。”`,
        `${courtTitle(s,'hanzhang')}站在窗边。她把母亲那句话听完，手指在袖口停了一下，没有接话。`,
        `蘅嫔一直到傍晚才睁眼。床边那只原本备给孩子的小银铃被人收进匣子，她听见声音，叫人把匣子放回原处。`
      ]:[`八月没有产房，也没有小产。蘅嫔仍照旧请安、写信，只是去两个女儿住处的次数多了一些。`],choices:[
        {label:'继续',v37WenhengMiscarry:true,requires:s=>!!s.flags.wenhengPregHistory,effects:{flags:{wenhengPregArcClosed:true}},result:''},
        {label:'继续',requires:s=>!s.flags.wenhengPregHistory,effects:{flags:{wenhengPregArcClosed:true}},result:''}
      ]};
      years.steps.splice(idx,0,w1,w2,w3,w4);
      const incenseStep=years.steps.find(x=>x.heading?.includes('那匣香本来只是'));
      if(incenseStep&&typeof incenseStep.text==='function'){const oldInc=incenseStep.text;incenseStep.text=s=>{const arr=oldInc(s);if(s.flags.wenhengMiscarried)arr.unshift('小产后的第一个月，蘅嫔第一次把两个女儿一同叫来吃饭。她走路已经看不出虚弱，只是比从前更少浪费一句话。那只旧香匣，就是这顿饭以后被她推到抱朴手边的。');return arr}}
    }

    // 初封可为贵人，后续有孕晋位必须依据真实当前位分，而不是假定“嫔→妃”。
    const patchPreg=(key,nameNeedle)=>{
      const st=years.steps.find(x=>x.cast?.includes(key)&&x.heading?.includes(nameNeedle));if(!st)return;
      const p=()=>state.flags.titlePrefixes?.[key]||DEFAULT_PREFIX_V37[key];
      st.text=s=>{
        const who=courtTitle(s,key);return key==='ke'?
          [`入冬以后，${who}报了喜脉。她前一晚还在射圃收弓，第二日太医便让人把弓架整个搬走。`,`皇后免了她半月请安。和妃来看她时带的不是补品，是北营旧账。沈氏旧案仍在这些日常里往前挪。`,`有孕可以成为晋位理由，却不是自动晋位。她现在是${who}，若晋，也只能照常例进一级。`]:
          [`四皇子满月后的第二个月，${who}也报了喜。太后没有替侄女开口，皇后却亲自去看了一趟。`,`她与皇后从小相识，如今有孕，这份亲近里又多了一层“太后还有另一个能干侄女”的压力。`,`她现在是${who}。有孕是否进一级，仍由我亲自落旨。`];
      };
      if(st.choices?.[0]){st.choices[0].label=`有喜，晋一级`;st.choices[0].hint='只按当前位分进一阶；贵人→嫔，嫔→妃';}
      if(st.choices?.[1])st.choices[1].result=s=>`位分未动。${courtTitle(s,key)}照孕例优待，宫里没有把“有孩子”自动等同于“升一级”。`;
    };
    patchPreg('ke','有喜');
    const nst=years.steps.find(x=>x.cast?.includes('ning')&&x.heading?.includes('喜脉'));if(nst){
      nst.text=s=>[`四皇子满月后的第二个月，${courtTitle(s,'ning')}也报了喜。`,`太后没有替侄女开口。皇后亲自去看她，两个人仍能坐在窗边一起拆缠住的旧线，可“亲近”已经不再简单。`,`她现在是${courtTitle(s,'ning')}。若晋，只能照当前位分进一级；是否晋仍由我定。`];
      if(nst.choices?.[0]){nst.choices[0].label='有喜，晋一级';nst.choices[0].hint='只进一阶，不越级';}
      if(nst.choices?.[1])nst.choices[1].result=s=>`位分未动。${courtTitle(s,'ning')}把册书样稿退回尚宫局，太后没有追问。`;
    }

    // 所有后续正文用真实玩家封号，不再硬写“徽/晋/元”。
    const repl=(x,s)=>typeof x==='string'?x.replaceAll('徽嫔',courtTitle(s,'ning')).replaceAll('徽妃',courtTitle(s,'ning')).replaceAll('晋嫔',courtTitle(s,'ke')).replaceAll('晋妃',courtTitle(s,'ke')).replaceAll('元嫔',courtTitle(s,'hui')).replaceAll('元妃',courtTitle(s,'hui')):x;
    CHAPTERS.slice(6).forEach(ch=>{
      if(typeof ch.bridge==='function'){const old=ch.bridge;ch.bridge=s=>repl(old(s),s)}
      (ch.steps||[]).forEach(st=>{
        st.heading=(st.heading||'').replace(/徽嫔|徽妃/g,'邵氏').replace(/晋嫔|晋妃/g,'霍氏').replace(/元嫔|元妃/g,'崔氏');
        if(typeof st.text==='function'){const old=st.text;st.text=s=>{const r=old(s);return Array.isArray(r)?r.map(x=>repl(x,s)):repl(r,s)}}
        else if(Array.isArray(st.text))st.text=st.text.map(x=>typeof x==='string'?x.replace(/徽嫔|徽妃/g,'邵氏').replace(/晋嫔|晋妃/g,'霍氏').replace(/元嫔|元妃/g,'崔氏'):x);
      });
    });
  }

  // ---------- 3. 蘅嫔的最终命运不再只有“必死” ----------
  const blade=CHAPTERS.find(x=>x.title==='刃落宫门');
  if(blade){
    const wi=blade.steps.findIndex(x=>x.heading?.includes('二十三日'));
    if(wi>=0){
      blade.steps[wi]={heading:'第十四幕 · 二十三日以后，蘅嫔还要不要继续做蘅嫔',cast:['wenheng','hanzhang','taihou'],fx:'ash',keyDecision:true,text:s=>[
        `昭氏死后二十三日，蘅嫔仍每天起身、梳头、请安。她烧掉御前换值、太医院名册和旧人地址，也给蘅地送出最后一封家书：“往后各自过日子，不必等宫里。”`,
        s.flags.wenhengMiscarried?`很多年前她也在这座宫里失去过一个没有进玉牒的孩子。那夜她把旧产衣翻出来看了一遍，第二日又去拾遗阁坐到很晚。`:`她没有自己的孩子留在大晟。到这一夜，她能称作“自己的”东西几乎只剩一个还活着的女儿和那支旧银簪。`,
        `她来见我，把银簪放在桌上：“陛下赢了。”`,
        `“朕从未与你赌这个。”`,
        `“所以才是陛下赢。”`,
        `如果我什么都不改变，她仍可能选择用死结束“大晟蘅嫔”这个身份。但这一次，我也可以把她从原来的棋局里移出去。她活不活，不必再只有一个答案。`
      ],choices:[
        {label:'准她退居西苑，从此免请安、免承宠',hint:'人仍在宫里，但闻人线退出主线；她可以活成一个不再参与争斗的人',v37WenhengFate:'west',effects:{trust:{wenheng:4,hanzhang:2}},result:'蘅嫔没有谢恩。第二日她搬去西苑，只带旧银簪和三箱书。此后宫宴不再列她的牌，含章偶尔去看她。闻人家的主线结束了，但她本人没有死。'},
        {label:'准她离京返蘅地，在旧陵别院终老',hint:'政治风险更高，却真正把“蘅嫔”身份从她身上卸下一半',v37WenhengFate:'return',effects:{trust:{wenheng:6,hanzhang:2,taihou:-1}},result:'宗人府为这道旨意争了三日。最后她以本朝嫔位保留俸给，却不再居宫。出京那天含章没有送到城门，只在宫墙上站了很久。'},
        {label:'仍按宫规留在拾遗阁，不另作处置',hint:'不主动救，也不主动逼；她会照原来的性格完成最后选择',v37WenhengFate:'dead',effects:{trust:{wenheng:-2}},result:'那夜她没有再求第二道旨。回宫后饮毒而亡。她死于女儿之死、复仇失败、国格耗尽，也死于不愿再继续扮演“大晟蘅嫔”。'}
      ]};
      const next=blade.steps[wi+1];
      if(next){next.text=s=>[
        s.flags.wenhengFate==='dead'?`闻人一家从此只剩含章。她亲自封了母亲房门，没有搬进去。`:s.flags.wenhengFate==='west'?`拾遗阁从此只剩含章。蘅嫔还活着，却住进西苑，主动退出所有请安与宫宴。`:s.flags.wenhengFate==='return'?`闻人蘅离京后，拾遗阁第一次真正只属于含章。母亲还活着，只是不再隔一条宫道。`:`闻人家的旧局已经散了。`,
        `含章没有请求改姓，也没有替母亲或姐姐解释。她把旧香匣送去烧掉，把能证明旧国联络的一半名册交御前封存。`,
        `和妃来时没有安慰，只放下一盏茶。皇后则第一次遇到一个旧例完全解决不了的问题：活着退居、离宫终老或丧仪善后，每一种都需要她自己判断。`,
        `闻人线到这里退出主线。死亡与否不同，但含章必须开始只为自己的选择负责，这一点不会改变。`
      ];}
    }
  }
  const tea=CHAPTERS.find(x=>x.title==='旧茶未凉');
  if(tea)tea.bridge=s=>s.flags.wenhengFate==='dead'?`重阳行刺让我养伤数月。闻人母女的旧局以两场死亡收束，沈家十年前的军令却已经沿着无名信、铜扣、旧军籍和顺王府的断弦走到御案前。`:`重阳行刺让我养伤数月。昭氏已死，蘅嫔也退出宫中权力中心；闻人线散去以后，沈家十年前的军令终于有空间走到御案前。`;

  // ---------- 4. 人物页直接显示“所求→行为→当前走向”，方便检查前因后果 ----------
  function arcV37(k,s=state){
    const map={
      gu:['让六宫不失控','遇事先找旧例、把第一判断交给规矩；新人越多，她越被迫自己裁量',s.flags.fangDead?'方氏案让她第一次承认：照规矩也可能害死人。后续可走向更独立，或更依赖程序。':'仍处在“用规矩保护所有人，也保护自己”的阶段。'],
      shen:['替兄长拿回清白，也确认皇帝是否肯承认当年选择','不拿恩宠代替旧案；只在证据够时往前推',s.flags.shenVerdict==='full'?'完整平反，连御批也入档；她与主控之间有可能真正换掉旧茶。':s.flags.shenVerdict==='limited'?'兄长清白已复，但一部分真相仍封在御前；她会留下，却不等于完全和解。':'旧案仍在推进，她不会因为得宠就提前原谅。'],
      baopu:['证明自己不可被替代','把漂亮、承宠、位分、孩子都当成“我值得被选”的证据',s.flags.baopuPunishment==='onsite'?'行刺后当场处死；未留口供。':s.flags.baopuPunishment==='prison'?'行刺后受审，留下最后陈述，再被赐死。':s.flags.baopuPunishment==='extreme'?'行刺被定大逆，结局成为公开政治惩罚。':'焦虑仍在累积；失子与含章得到的另一种信任会把她推向极端。'],
      hanzhang:['从母亲、姐姐和旧国的安排里夺回自己的选择','先观察、留证，不轻易表忠；真正越线时才主动向主控说明',s.flags.hanzhangSavedEmperor?'她已经公开选择了自己站的位置；是否晋位可以不同，但她不再是谁的影子。':s.flags.hanzhangConfessed?'她已经把知道的事交出来，但仍不靠侍寝换信任。':'她还在判断主控值不值得她主动开口。'],
      wenheng:['保两个女儿、保旧国最后一点余地，也保住自己不被彻底改写','利用名位、人脉、孩子与旧国来信争取安全；她不是单纯慈母，也不是纯粹复国者',s.flags.wenhengFate==='west'?'没有死，退居西苑；旧国政治线退出，但母女关系仍可能继续。':s.flags.wenhengFate==='return'?'离京返蘅地终老；保留本朝名位，却退出宫廷。':s.flags.wenhengFate==='dead'?'最终饮毒，以死亡拒绝继续作为“大晟蘅嫔”活着。':s.flags.wenhengMiscarried?'曾有孕后小产；这次失去加深了她后来把“孩子”当安全锚点的执念。':'她仍在女儿与旧国之间寻找能握住的东西。'],
      ning:['既不辜负太后与顾氏，也不愿只做皇后的影子','帮中宫办事，但无旧例时敢自己判断，因此越亲近越给皇后压力',`初封由你定为${courtTitle(s,'ning')||'待定'}；以后可因有孕晋一级，也可原位不动。`],
      ke:['保霍家军功体面，也保留自己不靠讨好立足的方式','把北营旧账、骑射与军中常识带进内廷，意外成为沈氏旧案的证据入口',`初封由你定为${courtTitle(s,'ke')||'待定'}；是否因有孕晋位、是否成为皇子母族，都由后续选择决定。`],
      hui:['护住崔氏供应网络与家族利益','不直接树敌，优先让家族关系藏在贡造、香药、账目等“正常流程”中',`初封由你定为${courtTitle(s,'hui')||'待定'}；她最终可能只是谨慎世家女，也可能因家族暗线被牵连。`],
      fang:['想在宫里把日子过明白，也真心相信别人对她的好意','爱串门、帮忙、替人送东西，因此最容易被一条精心设计的证据链利用',s.flags.fangDead?'她的死固定成为制度悲剧，但主控此前如何信她、查她，会改变留下来的责任与关系。':'她还只是把各宫连起来的人，并不知道“顺手帮忙”也能被做成证据。'],
      taihou:['让新朝像一个能过日子的家，而不只是刚打完仗的政权','少直接夺权，更多用一句家常话把皇帝和皇后推回必须自己判断的位置','她不会替主控决定结局，但会记住主控怎样对待亲族、旧国女人与孩子。']
    };return map[k];
  }
  const peopleViewV36=peopleView;
  peopleView=function(){
    const visible=Object.entries(PEOPLE).filter(([k,p])=>(p.introducedAt??0)<=state.index);
    return `<main class="page"><div class="page-title"><span class="eyebrow">人物录</span><h1>宫中人物</h1><p>这里不只记身份，也记人物此刻真正想要什么。不同裁断会改变她们的走向，但不会为了分支强行抹掉已经发生的主线因果。</p></div><div class="people-grid">${visible.map(([k,p])=>{const a=arcV37(k,state);return `<article class="person-card" data-person="${k}">${portrait(p)}<div><span class="rank">${displayRank(k)}</span><h2>${p.name}</h2><p class="meta">${p.age} · ${p.home}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${p.bio}</p>${a?`<div class="arc-box"><b>此刻所求</b><em>${a[0]}</em><b>因此会做</b><em>${a[1]}</em><div class="arc-fate"><b>当前走向</b>${a[2]}</div></div>`:''}${meters(k)}</div></article>`}).join('')}</div></main>`;
  };

  // 玉牒注释不锁死高位新人初封封号。
  if(CHILDREN.fourthPrince)CHILDREN.fourthPrince.note='霍素英所出。出生时北营数家同时送来贺礼；母妃当时具体位分取决于你的册封与晋位选择。暂不安排其成长线。';
  if(CHILDREN.sixthPrincess)CHILDREN.sixthPrincess.note='邵明贞所出。她与太后、皇后的亲族关系使这一胎格外受关注；母妃当时具体位分取决于你的选择。暂不安排其成长线。';

  // 大事录索引因独立终选章整体后移一格。
  const annalV36Final=annalFor;
  annalFor=function(i){
    if(i<5)return annalV36Final(i);
    if(i===5)return '承熙三年二月，上亲临体元殿终选，亲定三家女初封、封号及低位留牌。';
    if(i===6)return '承熙三年至六年，六宫渐备，皇嗣屡添，旧案与诸家势力并行而起。';
    return annalV36Final(i-1);
  };

  // 新章节结构需要旧档回到终选前；保留前五章选择。
  HIGH_KEYS_V37.concat(LOW_KEYS_V37).forEach(k=>{INITIAL_STATE.ranks[k]='待选';INITIAL_STATE.bond[k]=INITIAL_STATE.bond[k]??28;INITIAL_STATE.trust[k]=INITIAL_STATE.trust[k]??35});
  if(!state.flags?.v37Migrated){
    const had=(state.index||0)>=5;const first5=(state.history||[]).slice(0,5),intro=state.intro;
    if(had){
      state=clone(INITIAL_STATE);state.intro=intro;
      first5.forEach((p,idx)=>{state.index=idx;applyRecordedChapter(idx,p);state.index=idx+1});
      state.index=5;state.chapterStep=0;state.stepHistory=[];state.stepResults=[];state.stepChanges=[];
    }else{
      HIGH_KEYS_V37.concat(LOW_KEYS_V37).forEach(k=>state.ranks[k]='待选');
    }
    state.flags.v37Migrated=true;
  }

  save();render();
}catch(e){console.error('v37 causality/selection patch failed',e)}})();
