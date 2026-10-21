(()=>{try{
  const BUILD91='v91';
  document.documentElement.dataset.build=BUILD91;
  const CH=t=>(CHAPTERS||[]).find(x=>x.title===t);
  const ST=(ch,needle)=>(ch?.steps||[]).find(x=>String(x.heading||'').includes(needle));
  const cnNums=['零','一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十'];
  const cnOrder=n=>cnNums[Number(n)]||String(n);
  const orderText=x=>String(x||'').replace(/^(\d{1,2})(皇子|公主)$/,(_m,n,t)=>`${cnOrder(n)}${t}`);
  function normalizeOrders(s=state){
    for(const x of Object.values(s?.flags?.extraHeirs||{}))if(x?.order)x.order=orderText(x.order);
    for(const x of Object.values(typeof CHILDREN!=='undefined'?CHILDREN:{}))if(x?.order)x.order=orderText(x.order);
  }
  normalizeOrders();

  const rankBase=r=>{r=String(r||'');for(const x of ['皇贵妃','贵妃','妃','嫔','贵人','常在','答应'])if(r===x||r.endsWith(x))return x;return r};
  const nextLowRank=r=>({答应:'常在',常在:'贵人',贵人:'嫔'}[rankBase(r)]||null);
  function promoteLowMother(k,s=state){
    if(!k||!s?.ranks?.[k])return null;
    const from=rankBase(s.ranks[k]),to=nextLowRank(from);if(!to)return null;
    if(to==='嫔'){
      const n=Object.entries(s.ranks||{}).filter(([key,r])=>key!==k&&rankBase(r)==='嫔'&&!String(r).startsWith('故')&&!String(r).startsWith('废')).length;
      if(n>=6)return null;
    }
    const old=s.ranks[k];
    if(typeof promoteRank==='function'&&promoteRank(k))return {from:old,to:s.ranks[k]};
    return null;
  }
  const predictedLowRank=(k,s=state)=>nextLowRank(s?.ranks?.[k]);

  // 一、低位母妃平安生产后必晋一级。孕期是否提前晋仍由此前选择决定。
  const years=CH('宫灯渐繁');
  const five=ST(years,'三公主洗三')||ST(years,'五公主洗三');
  if(five){
    five.heading='承熙四年八月 · 三公主洗三';
    five.text=s=>{
      const k=typeof lowPregKey==='function'?lowPregKey(s):(s.flags?.lowConsorts||[])[0];
      const mother=PEOPLE[k]?.name||'一名低位宫嫔';
      const rank=s.ranks?.[k]||'常在',next=predictedLowRank(k,s);
      return [
        `八月末，${mother}发动。她住的配殿窄，产房外连热水桶都摆不开，皇后让人把隔壁耳房腾出来。`,
        `天快亮时孩子哭了。女医先报“母女平安”。${mother}浑身是汗，接孩子时手一直抖，先问：“她手脚都好么？”女医答都好。`,
        `她又问皇后：“娘娘，臣妾能自己养吗？”顾明宜道：“先养着。你身子若撑不住，再说。”`,
        `洗三那日，玉牒记作三公主，赐名杨宁矣。太后坐了半刻钟，嫌银盆太凉，叫乳母先把孩子抱回去。`,
        next?`午后另有一道产育册旨送来：${mother}由${rank}晋${next}。她问尚宫：“晋位以后，孩子还住这里么？”尚宫答仍随生母，她才把册书接过去。`:`午后赏赐送到，月例与产育用物都添了一份。`,
        `${courtTitle(s,'baopu')}送来一只小金铃。三公主抓不到，只攥住她一根手指。昭妃笑着逗了两声，孩子一松手，她的笑也停了。`,
        `回拾遗阁的路上，她把那只没送出去的金铃攥了一路。宫女问要不要收进匣子，她说：“先放我这里。”`
      ];
    };
    five.choices=[{label:'继续',effects:{flags:{fifthPrincessBorn:true,v91PromoteFirstLowBirth:true}},result:''}];
  }

  // 霍氏生皇子：先是产房与家人，再让政治从门外慢慢进来。
  const fourth=ST(years,'四皇子出生');
  if(fourth){fourth.text=s=>[
    `承熙五年六月，霍素英生下四皇子。孩子哭声很大，女医抱出来时，她还隔着帘子问：“鼻子通不通？手脚呢？”`,
    `三皇子被带来看弟弟。他站在摇篮边看了很久，伸手碰了一下孩子握紧的拳头：“这么小。”`,
    `霍素英在榻上笑：“你小时候也这么小。”三皇子回头看她，像没想到有人会把自己也说成这样。`,
    `到第三日，北营的贺礼才一批批送到宫门。皇后退了两份超例礼单，只留下给孩子的羊毛毯和一把尚未开锋的小弓。`,
    `昭妃来时带了一套自己挑的小衣。她站在摇篮边，先问孩子夜里闹不闹，又问霍素英产后伤口疼不疼。`,
    `霍素英答完，她摸了摸四皇子的脸。回拾遗阁以后，《承露录》里“请脉”那一页被她重新抄了一遍。`
  ]}

  const six=ST(years,'六公主满月');
  if(six){six.heading='承熙六年二月 · 四公主满月';six.text=s=>[
    `年后不久，邵明贞生下四公主杨晏尔。孩子安静，洗三时脚背碰到铜钱，只皱了皱鼻子。`,
    `太后喜欢，隔几日便叫人抱去慈宁宫。邵明贞起初还跟着去，后来伤口未好，走到半路便被皇后劝了回去。`,
    `有一日我到慈宁宫，皇后抱着孩子，邵明贞坐在脚踏上系袜带。太后闭着眼说：“你们小时候也这样坐过。”`,
    `皇后笑：“臣妾不记得。”邵明贞把袜带打好：“我记得。娘娘那时就嫌我把针线筐弄乱。”`,
    `昭妃来贺时没穿最艳的衣裳。四公主在她怀里睡着，她低头看了很久，直到蘅嫔叫她名字，才把孩子递回去。`
  ]}

  // 二、动态添嗣：序齿用中文；低位母妃平安生产后在产育旨中晋一级。
  function rewriteExtra(round,needle){
    const st=ST(years,needle);if(!st)return;
    st.text=s=>{
      const x=s.flags?.extraHeirs?.[round];
      if(!x||x.skipped)return round===1
        ?[`五月没有新的产报。尚宫局把预备的乳母牌收回柜里，皇后只叫太医院照旧请平安脉。`]
        :[`入夏以后没有新的产信。六月雨多，几处产房预备的炭和热水仍照旧留着。`];
      if(typeof registerExtraHeir==='function')registerExtraHeir(round,s);normalizeOrders(s);
      const ord=orderText(x.order),mother=heirMotherLabel(x.mother,s),next=predictedLowRank(x.mother,s);
      if(round===1)return [
        `五月天刚亮，${mother}宫里传出婴啼。女医先报母体平安，过了一会儿才把孩子抱到灯下细看。`,
        `${mother}累得睁不开眼，仍撑着问了一句：“哭得响不响？”乳母说响，她才松开一直攥着的床单。`,
        `玉牒房午后来核名，纸上写着“${ord}·${x.name.replace(/^杨/,'')}”。皇后看过乳母与夜值名单，叫人把孩子腕上的红绳松半指。`,
        next?`同日另下产育册旨，${mother}晋一级。传旨时她没起身，只在枕上谢恩，随后问孩子什么时候抱回来吃奶。`:`洗三与满月仍照常预备。太后另送来一床薄绫小被。`
      ];
      return [
        `七月午后雷雨刚停，${mother}宫里报产。孩子哭得很响，隔着院墙都听得见。`,
        `皇后进门时先把半开的窗掩了一扇：“别让风直吹。”随后才接过玉牒房送来的纸，上面记着“${ord}·${x.name.replace(/^杨/,'')}”。`,
        `${mother}问能不能自己抱一会儿。乳母把孩子放到她臂弯里，她只看了一眼便红了眼眶，又怕汗沾到孩子脸上，偏过头去擦。`,
        next?`傍晚另有一道册旨：平安产育，晋一级。宫女念完，她半晌才道：“先把孩子的奶喂了，册书明早再收。”`:`夜里雷又响了一阵。孩子吃饱以后睡得很沉，母妃也终于合眼。`
      ];
    };
  }
  rewriteExtra(1,'玉牒又添一笔');
  rewriteExtra(2,'又一声婴啼');

  const apply91=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=apply91(c)||[];
    if(c.effects?.flags?.v91PromoteFirstLowBirth&&!state.flags?.v91FirstLowBirthPromoted){
      const k=typeof lowPregKey==='function'?lowPregKey(state):(state.flags?.lowConsorts||[])[0];
      const r=promoteLowMother(k,state);state.flags.v91FirstLowBirthPromoted=true;
      if(r)out.push(`${PEOPLE[k]?.name||'生母'}平安产育，${rankBase(r.from)}晋${rankBase(r.to)}`);
    }
    for(const round of [1,2])if(c.effects?.flags?.[`extraHeir${round}Born`]&&!state.flags?.[`v91ExtraBirthPromoted${round}`]){
      const x=state.flags?.extraHeirs?.[round];const r=x?.mother?promoteLowMother(x.mother,state):null;
      state.flags[`v91ExtraBirthPromoted${round}`]=true;
      if(r)out.push(`${PEOPLE[x.mother]?.name||'生母'}平安产育，${rankBase(r.from)}晋${rankBase(r.to)}`);
    }
    normalizeOrders(state);return out;
  };

  // 三、昭氏不是只在最后一句怨妹妹。珍嫔得御前牌以后，她用一件真事反击。
  const blade=CH('刃落宫门');
  if(blade&&!ST(blade,'她拿妹妹藏过的香丸去告妹妹')){
    const idx=(blade.steps||[]).findIndex(x=>String(x.heading||'').includes('她在门外等，妹妹从里面出来'));
    const revenge={heading:'第五幕 · 她拿妹妹藏过的香丸去告妹妹',cast:['baopu','hanzhang','gu'],fx:'rain',narrative:true,text:s=>[
      `第二日一早，昭妃没有去养心殿。她去了凤仪宫。`,
      `她带的不是《承露录》，而是一张从旧案里抄下来的值簿：当年含章发现旧香尾味不对以后，曾私自留下一颗香丸，藏在自己的棋罐里，过了很久才交出来。`,
      `皇后看完，让人把${courtTitle(s,'hanzhang')}叫来。昭妃坐在一旁，手里慢慢转着茶盏：“妹妹最讲证据。那这件也该写进去。”`,
      `${courtTitle(s,'hanzhang')}看了一眼那张纸：“是我留的。”`,
      `“没报给中宫，也没报御前。”`,
      `“没有。”`,
      `昭妃笑了：“若换成别人私藏案物，妹妹会怎么写？”`,
      `${courtTitle(s,'hanzhang')}把御前牌从袖中取出来，放到皇后案上：“照规矩写。”`,
      `皇后停了片刻，命她七日不得调卷，私留案物一事另记。含章应了，没有求情。`,
      `昭妃起身时终于看了妹妹一眼：“原来你也会犯错。”`,
      `含章把那张记过纸折好：“会。”`
    ],choices:[{label:'继续',effects:{trust:{hanzhang:1,baopu:-1},flags:{v91BaopuRetaliatedHanzhang:true,v91HanzhangRecordSuspended:true}},result:s=>`${courtTitle(s,'hanzhang')}七日后重新拿回御前牌。她回来调的第一卷，仍是昭妃旧香案。`}]};
    if(idx>=0)blade.steps.splice(idx+1,0,revenge);
  }
  // 后续幕次顺延，避免两个“第五幕”。
  if(blade?.steps){let n=1;for(const st of blade.steps){st.heading=String(st.heading||'').replace(/^第[一二三四五六七八九十]+幕\s*·\s*/,()=>`第${cnOrder(n++)}幕 · `)}}

  // 四、再清一遍正文里明显的策划口吻。
  for(const ch of CHAPTERS||[])for(const st of ch.steps||[]){
    const old=st.text;
    if(typeof old==='function')st.text=s=>{const a=old(s);return (Array.isArray(a)?a:[a]).filter(Boolean).map(line=>{
      if(typeof line!=='string')return line;
      return line
        .replace(/孩子们没有一齐卷入故事[^。]*。?/g,'')
        .replace(/这不是大事。?/g,'');
    }).filter(x=>String(x).trim())};
  }

  globalThis.V91_QA={
    lowBirthPromotes:true,
    orderChinese:true,
    baopuRetaliatesHanzhang:!!ST(blade,'她拿妹妹藏过的香丸去告妹妹')
  };
  const render91=render;
  render=function(){normalizeOrders(state);const r=render91();document.documentElement.dataset.build=BUILD91;document.title='宫灯未眠 · 产育晋位与昭珍裂痕 v91';return r};
  document.documentElement.dataset.build=BUILD91;
  try{save();render()}catch(_e){}
}catch(e){console.error('v91 birth/rank/baopu-hanzhang patch failed',e)}})();
