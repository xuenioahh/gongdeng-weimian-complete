(()=>{try{
  const BUILD106='v106';
  const CH=t=>CHAPTERS.find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x?.heading||'').includes(q));
  const patchText=(st,key,fn)=>{if(!st||st[key])return;const old=st.text;st.text=s=>{let v=typeof old==='function'?old(s):old;let a=Array.isArray(v)?v:[v];return a.map(x=>typeof x==='string'?fn(x):x)};st[key]=true};
  const take=(c,q)=>{const i=(c?.steps||[]).findIndex(x=>String(x?.heading||'').includes(q));return i>=0?c.steps.splice(i,1)[0]:null};
  const order=(c,heads)=>{if(!c)return;const old=[...(c.steps||[])],used=new Set(),next=[];for(const q of heads){const st=old.find((x,i)=>!used.has(i)&&String(x?.heading||'').includes(q));if(st){used.add(old.indexOf(st));next.push(st)}}old.forEach((x,i)=>{if(!used.has(i))next.push(x)});c.steps=next};

  const relationChoices=()=>[
    {label:'“因为朕敢在你面前说：这件事朕不知道怎么办。”',effects:{trust:{zhangyuanzhao:5},bond:{zhangyuanzhao:2},flags:{v75EmperorZhangBond:'confidant'}},result:'我说：“别人进养心殿，总等着朕给答案。朕若说不知道，他们会慌。你不会。你会坐下来把能问的先问完；朕若做错，你也会直接说错了。朕把这样的人叫知己。”张元照点头：“那臣妾明白了。知己不是替陛下收拾错事的人。”我道：“本来就不是。”'},
    {label:'“有时候没有事。朕只是想让你坐在那儿。”',effects:{trust:{zhangyuanzhao:4},bond:{zhangyuanzhao:4},flags:{v75EmperorZhangBond:'family'}},result:'我说：“朕批朕的折子，你看你的册子，可以一晚上都不说话。朕累了不用解释，病了也不用听你哭。你想走的时候照样回凤仪宫。朕把这种相处算家人，不算夫妻情爱。”张元照问：“家人可以当面说不么？”我答：“你不说不，朕反而不习惯。”'},
    {label:'“因为难事来了，朕知道你会把你那一份做完。”',effects:{trust:{zhangyuanzhao:5},flags:{v75EmperorZhangBond:'partner'}},result:'我说：“你把问题找出来，把利弊说清。最后准还是驳，朕自己写。事情办完，你回凤仪宫，朕回养心殿。朕不需要你爱朕，也不会拿这份信任换你的别的东西。”张元照笑了一下：“那就是一起做事的人。”我道：“是。”'}
  ];

  function shaoRouteScenes(){return [
    {v74route:true,v106ShaoRoute:true,heading:'承熙十四年四月 · 凤仪宫先有了一位真正的新主人',cast:['ning','emperor','zhangyuanzhao'],fx:'wind',narrative:true,text:s=>[
      `邵明贞受凤印后的头三个月，六宫反而比顾明宜死后任何时候都安静。请安重新有固定时辰，命妇入宫知道该往哪座殿走，皇子女的大礼也终于有人站在最前面。`,
      `她没有照搬顾明宜。顾后喜欢先翻旧册，邵后遇到没有旧例的事，会先定一个办法，再让尚宫月底把结果送回来。`,
      `张元照仍住景阳宫。她没有因为落选就突然远离宫务。宫里有病籍、女学、旧疫恤银的事，邵后照样叫她来。`,
      `有一次两个人为一项宫女复值争了半个时辰。最后邵后说：“你那一半按你说的试，我这一半照旧。月底把结果摆在一起。”`,
      `张元照应下。出凤仪宫时，阿芙问她：“娘娘不难受？”`,
      `她想了一会儿：“当然难受。但她现在是皇后。难受不能当理由。”`
    ],choices:[{label:'继续',effects:{trust:{ning:3,zhangyuanzhao:2},flags:{v74ShaoReignStable:true,v74ShaoRouteSeen:true}},result:''}]},
    {v74route:true,v106ShaoRoute:true,heading:'七月十九 · 第一封借皇后名字送出去的帖子',cast:['ning','emperor','taihou'],fx:'ink',narrative:true,text:s=>[
      `事情不是从一桩大案开始。吏部先送来一封很薄的呈报：邵氏族中两个年轻人拿着一张荐帖，说“中宫素知其才”，想补宗学里的空缺。`,
      `帖子没有凤印，也不是邵明贞的字。可经手官还是收了，因为递帖的人是皇后父家的管事。`,
      `我把帖子送进凤仪宫。邵明贞从头看到尾，脸上没有一点血色。`,
      `“臣妾没见过这两个人。”`, `“朕知道。”`,
      `她没有因此松下来，反而把自己父家这半年递进宫的名帖、寿礼、请安折全叫人搬来，一封一封拆。`,
      `太后来时，她正把一张自己父亲的家书压在最下面。太后说：“你不用因为他们借你的名，就先把自己当罪人。”`,
      `邵明贞答：“姑母，问题是他们借了，别人真的会信。”`
    ],choices:[{label:'先办递帖的人，不动中宫',effects:{trust:{ning:3,taihou:1},flags:{v74ShaoClanFirstCase:true}},result:'两名邵氏族人撤补，管事杖责逐出京。御前没有因为一张假荐帖碰皇后位。'}]},
    {v74route:true,v106ShaoRoute:true,heading:'十月初六 · 四公主的婚帖上也出现了邵家的名字',cast:['ning','emperor','taihou'],fx:'autumn',keyDecision:true,text:s=>[
      `入秋以后，事情变得更难看。四公主还没正式议亲，礼部私下递来的第一批人家里，三家都和邵氏有姻亲。`,
      `四公主自己拿着那几张帖子来找母后：“他们看我，是看我，还是看外祖家？”`,
      `邵明贞没有答出来。`,
      `当天夜里她把三张帖子全送到养心殿，又附了一张邵氏族人近两年在京中结亲、荐官的名单。她没有替任何人求情。`,
      `我说：“有人借你的名，你就退？那以后想逼走一个皇后，只要多写几张假帖就够了。”`,
      `她沉默很久：“臣妾也这样想过。”`,
      `“那就别说退。”`,
      `“可臣妾现在每批一件事，都要先想别人会不会说是替邵家。四公主连挑一个丈夫，也先得证明不是在替外祖家结亲。”`,
      `她抬头看我：“皇后每天若先忙着证明自己没有私心，就会越来越不敢做事。”`
    ],choices:[
      {label:'“先查到底。查完再谈凤印。”',hint:'不因为外戚借名就立刻换后，也不许这件事拖成一团猜测。',effects:{trust:{ning:4},flags:{v74ShaoClanFullProbe:true}},result:'邵后仍掌凤印。吏部、礼部与宗人府开始逐笔清邵氏近两年的荐名与婚帖。'},
      {label:'“四公主的婚事先全部停下。”',hint:'先把孩子从外戚争夺里摘出来，再查邵氏。',effects:{trust:{ning:3,taihou:1},flags:{v74FourthPrincessMarriagePaused:true,v74ShaoClanFullProbe:true}},result:'四公主婚议暂止。邵后第一次不是为礼制，而是为自己的女儿松了一口气。'}
    ]},
    {v74route:true,v106ShaoRoute:true,heading:'承熙十五年正月 · 她第一次把凤印推回御案',cast:['ning','emperor','zhangyuanzhao'],fx:'snow',narrative:true,text:s=>[
      `吏部、礼部与宗人府查了三个月荐帖和婚帖。初核没有查出邵明贞替娘家谋官，也没有查出她从中宫送过关说；三司的复核与正式结案还在后头。`,
      `可查得越清楚，另一件事越明显：她父家的每一封普通家书、四公主每一次露面、太后每一场寿宴，都已经有人拿去猜“皇后想要什么”。`,
      `正月十三，她自己抱着凤印匣来养心殿。`, `“臣妾请解中宫印务。”`,
      `我没有接：“初核才到这一步，三司还没结案。你现在退，倒像是认了他们的疑。”`,
      `“臣妾不是认。”她说，“只是往后每做一件事，都要先等人替我证明不是替邵家做。四公主议亲也得先避外祖家。”`,
      `我把凤印匣推回去：“案未结，你仍是皇后。印带回凤仪宫，未了的宫务照常办。”她带着匣子离开，我让裴景和继续催三司交齐账册。`,
      `次日，我按原定的日子召张元照来议女史院试任名单。她说完名单，我才问：“若邵后结案后仍请解印，朕再议你接印，你肯么？”`,
      `张元照没有立即答：“邵氏案还没结。此时谈臣妾接印，外头会觉得前面的查核都是在替臣妾腾位置。”`,
      `她把名单留在案上：“先把她掌印这一年的账算清楚，再谈下一位。”`
    ],choices:[{label:'让邵后暂掌凤印，等三司结案',effects:{trust:{ning:3,zhangyuanzhao:4},flags:{v74ShaoResignRequested:true}},result:'御前没有立刻换后。凤仪宫又稳稳走了两个月，直到最后一封外戚案卷合上。'}]},
    {v74route:true,v106ShaoRoute:true,heading:'三月二十八 · 凤印第二次离开凤仪宫',cast:['ning','zhangyuanzhao','emperor','taihou'],fx:'seal',keyDecision:true,text:s=>[
      `三司结案那日，邵氏族中六人受罚，两家姻亲退出宗学与礼部差事。案卷最后一句写得很清楚：皇后邵氏无私荐、无受赂、无干预外朝。`,
      `邵明贞看完以后，又把凤印匣带来了。`,
      `这一次我没有再说“有人借你的名”。她已经把能查的都查清，也真的把凤仪宫坐稳过一年。`,
      `她说：“臣妾不是做不了皇后。正因为做过，才知道自己现在每天有一半力气都花在同自己的姓氏解释。”`,
      `我问：“退了以后呢？”`,
      `“回景仁宫。四公主还是臣妾的女儿，六宫有事臣妾也不会装看不见。只是以后再有人拿邵家三个字去敲门，不该再顺手把凤印也算进去。”`,
      `太后一直没说话。直到我把印匣收回，她才叫了一声：“阿宁。”`,
      `尚宫局当场把未了宫务逐项交回御前。我准邵明贞退居景仁宫，让裴景和与尚宫一同封印入库；她这才行了最后一次皇后礼。`,
      `中宫空了四十九日。需中宫落印的宫务由尚宫局列明缘由，逐件送御前裁定；张元照仍以文皇贵妃办她原来那一份，没有代用凤印。`,
      `五月十七，礼部送来继后拟旨。我在御案上看到景仁宫递给张元照的短笺，只有一句：<b>“别把我那一年当成过渡。”</b>`,
      `我让裴景和去库中取印。张元照还没有入殿，这道册旨仍等着我落最后一笔。`
    ],choices:[{label:'“册张氏为皇后，邵氏还皇贵妃位。”',hint:'邵明贞完整掌过一年凤印，三司已正式结案；张元照在四十九日空位后继受中宫。',effects:{ranks:{ning:'皇贵妃',zhangyuanzhao:'皇后'},flags:{v44NewEmpress:'zhangyuanzhao',v74ShaoRelinquished:true,v74ZhangSucceeded:true,v74NingFormerEmpress:true}},result:'五月十七，我落朱笔，礼部宣册。张元照入殿接印，先看了邵明贞的短笺，答：“不会。”邵明贞退居景仁宫，以皇贵妃位保留旧礼遇，不再掌中宫印务。'}]}
  ]}

  globalThis.v139ShaoScenes=shaoRouteScenes;
  function ensureShaoRoute(c24){
    if(!c24||!state.flags?.v74ShaoThenZhang)return;
    const common=(c24.steps||[]).filter(x=>!x?.v74route&&!x?.v106ShaoRoute);
    c24.steps=[...shaoRouteScenes(),...common];
    c24.date='承熙十四年·春至十五年冬';
  }

  function apply106(){
    state.flags=state.flags||{};
    const c22=CH('长枝渐高'),c23=CH('中宫空悬'),c24=CH('帘后朱笔'),c25=CH('西华门外');

    // 22章只留春至五月；原先八、九月两幕移入下一章，避免跨章从九月倒回六月。
    if(c22&&c23){
      const aug=take(c22,'八月十九')||take(c23,'八月十九');
      const sep=take(c22,'九月初六')||take(c23,'九月初六');
      c23.steps=(c23.steps||[]).filter(x=>x!==aug&&x!==sep);
      order(c22,[
        '家宴席间，诸子女渐长','家宴散后','借到最后，他问的已经不是旧册','她把“接住他”的位置还给御前','同夜 · 我第一次没有先问','子时 · 留痕','三皇子已经十八','上书房以后不再只按序齿教','四月初九','四月 · 少了一页以后','五月夜 · 六个字','五月末 · 他开始自己记得母后','同月 · 门闩不一定长在门上'
      ]);
      c22.date='承熙十三年·春至五月';

      order(c23,[
        '一年多以后，六宫仍没有皇后的早晨','张元照的册子里总有些奇怪的空格','臣妾不是从哪个州府来的','同夜 · 最大的秘密说完以后','第二日 · “你想把这里变成你来的地方么？”','三本册子','同一场夏雨','张元照再有一阶可进','凤印之外还有两座宫'
      ]);
      let ix=(c23.steps||[]).findIndex(x=>String(x.heading||'').includes('凤印之外还有两座宫'))+1;
      if(aug)c23.steps.splice(ix++,0,aug);
      if(sep)c23.steps.splice(ix++,0,sep);
      const restHeads=['冬至前三日','承熙十三年腊月','承熙十四年正月','同月 · “你不是她”','二月 · 黛拉自己选','凤仪宫重新开门','她们第一次把话说在凤仪宫里','不是她的错','珂兰文书','东角门开了一刻钟','承熙十四年春 · 纸上没有她真正难的地方','承熙十四年春 · 太后把最后一句话留在御案','同夜 · 他睡着以后','凤印前最后一道旨','承熙十四年春 · 凤印落在谁手里以后','册后礼成后的一个夜晚','册后第三月'];
      order(c23,[
        '一年多以后，六宫仍没有皇后的早晨','张元照的册子里总有些奇怪的空格','臣妾不是从哪个州府来的','同夜 · 最大的秘密说完以后','第二日 · “你想把这里变成你来的地方么？”','三本册子','同一场夏雨','张元照再有一阶可进','凤印之外还有两座宫','八月十九','九月初六',...restHeads
      ]);
      c23.date='承熙十三年·六月至承熙十四年春';
      const seal=ST(c23,'凤印前最后一道旨');
      if(seal?.choices?.[0])seal.choices[0].label='直接册张元照为皇后';
      if(seal?.choices?.[1])seal.choices[1].label='先册邵明贞为皇后，让她真正执掌中宫';
    }

    // “先邵后张”旧补丁会被后续结构恢复覆盖；每次渲染都重新补回五幕真实中宫岁月。
    ensureShaoRoute(c24);

    // 无论后续旧补丁怎样恢复对象，都保证这场关系定义不会再次三项全锁。
    const rel=ST(c24,'陛下为什么总叫我来');
    if(rel){
      const ok=!!(state.flags?.v44NewEmpress==='zhangyuanzhao'||state.flags?.v74ZhangSucceeded||state.ranks?.zhangyuanzhao==='皇后'||state.flags?.v96FreeJump);
      rel.text=s=>ok?[
        `雨停时已经过了三更。沈知微先回永和宫，裴景和也退到外间。西暖阁只剩我和张元照。`,
        `她把最后一本折子合上，没有起身：“陛下，臣妾想问一句私话。”`, `“问。”`,
        `“陛下不爱臣妾。臣妾也不爱陛下。这个我们都知道。”`, `我嗯了一声。`,
        `她看着我：“那为什么有些夜里明明没有宫务，陛下还是会叫臣妾来？”`,
        `这句话比问“宠不宠”难答。她问的不是名分，是我为什么已经习惯在她面前留一个位置。`
      ]:[`本局张元照没有受凤印，这一场话没有发生。`];
      rel.choices=ok?relationChoices():[{label:'这一场私话没有发生，继续往下读',effects:{flags:{v106SkippedZhangRelation:true}},result:''}];
    }

    // 25章五月必须先于六月。
    if(c25){
      order(c25,['承熙十五年五月','承熙十五年七月','承熙十六年八月','承熙十六年冬','承熙十七年三月','承熙十七年四月','百日后','承熙十七年冬','承熙十八年春','承熙十八年五月','六月闷热','承熙十八年秋','承熙十八年腊月','承熙十九年二月','承熙十九年三月初九','三月初十','离宫前后','承熙十九年三月十一','承熙十九年冬']);
    }
  }

  const SAVE106=new Map([
    ['中宫空悬::凤印前最后一道旨','这里会决定中宫的长期路线：张元照直接受凤印，或邵明贞先完整做一段皇后再进入下一阶段。想回看另一条中宫线时，建议在这里留一个手动档。'],
    ['西华门外::承熙十九年三月初九 · 他自己把西华门那一夜送到御前','这一处会决定陆既明、二公主与旧案最后如何收束，后续结局差异较大。想比较不同处理结果时，可以在这里留档。']
  ]);
  function reminder106(){
    document.querySelectorAll('.v106-save-reminder').forEach(x=>x.remove());
    if(state.view!=='story')return;
    const c=CHAPTERS[state.index],st=c?.steps?.[state.chapterStep||0];if(!c||!st)return;
    const reason=SAVE106.get(`${c.title}::${st.heading}`);if(!reason)return;
    const host=document.querySelector('.choices')||document.querySelector('.narrative-turn');if(!host)return;
    const box=document.createElement('div');box.className='v102-save-reminder v106-save-reminder';
    box.innerHTML=`<div><b>关键分岔 · 可考虑存档</b><p>${reason}</p></div><button type="button">打开存档栏</button>`;
    box.querySelector('button').onclick=()=>document.querySelector('#v52-archives')?.click();host.parentNode.insertBefore(box,host);
  }

  function locate(title,heading){
    if(!title)return;
    let ci=CHAPTERS.findIndex(c=>c.title===title);
    if(ci<0)return;
    if(heading){
      let si=(CHAPTERS[ci].steps||[]).findIndex(x=>String(x?.heading||'')===String(heading));
      if(si<0)si=(CHAPTERS[ci].steps||[]).findIndex(x=>String(x?.heading||'').includes(String(heading))||String(heading).includes(String(x?.heading||'')));
      if(si>=0){state.index=ci;state.chapterStep=si;return}
      for(let j=0;j<CHAPTERS.length;j++){
        si=(CHAPTERS[j].steps||[]).findIndex(x=>String(x?.heading||'')===String(heading));
        if(si>=0){state.index=j;state.chapterStep=si;return}
      }
    }
    state.index=ci;
    state.chapterStep=Math.min(state.chapterStep||0,Math.max(0,(CHAPTERS[ci].steps||[]).length-1));
  }
  function preserve(title,heading){
    apply106();
    const c=CHAPTERS[state.index];
    if(c?.title==='帘后朱笔'&&state.flags?.v74ShaoThenZhang&&!state.flags?.v74ZhangSucceeded&&!state.flags?.v74ShaoRouteSeen){
      state.chapterStep=0;return;
    }
    locate(title,heading);
  }

  let t0=CHAPTERS[state.index]?.title||'',h0=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
  preserve(t0,h0);

  const oldEffects106=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const t=CHAPTERS[state.index]?.title||'',h=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
    const out=oldEffects106(c);
    // 第一幕选下去以后，后续不再把玩家强制拉回路线开头。
    if(c?.effects?.flags?.v74ShaoRouteSeen)state.flags.v74ShaoRouteSeen=true;
    if(!globalThis.__canonicalStory155){apply106();locate(t,h);}return out;
  };

  const oldRender106=render;
  render=function(){
    const t=CHAPTERS[state.index]?.title||'',h=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';
    preserve(t,h);
    let out;try{out=oldRender106()}catch(e){console.warn('v106 intercepted legacy render error',e)}
    // v95/v105 等旧恢复器可能刚刚重写 CHAPTERS；最后再应用一次 v106。
    const nowT=CHAPTERS[state.index]?.title||t,nowH=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||h;
    preserve(nowT,nowH);
    try{const app=document.querySelector('#app');if(app){app.innerHTML=nav()+(state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView());bind();}}catch(e){console.error('v106 direct render failed',e)}
    reminder106();document.documentElement.dataset.build=BUILD106;document.title='宫灯未眠 · 第22至26章玩家测试修复 v106';return out;
  };
  try{render()}catch(e){console.error('v106 initial render failed',e)}
}catch(e){console.error('v106 chapter 22-26 player QA patch failed',e)}})();
