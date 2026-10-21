(()=>{try{
  const BUILD88='v88';
  document.documentElement.dataset.build=BUILD88;
  const CH88=t=>CHAPTERS.find(c=>c.title===t);
  const ST88=(c,q)=>c?.steps?.find(st=>String(st.heading||'').includes(q));
  const AS88=(v,s=state)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x];}catch(_e){return[]}};

  // A. 册后正史：全路线最终都由张元照接过故事。
  // 只保留 ①直接张后 ②先邵后张。永久邵后从可选项移除。
  const succession=CH88('中宫空悬');
  if(succession){
    const seal=(succession.steps||[]).find(st=>(st.choices||[]).some(c=>c?.effects?.flags?.v44NewEmpress||c?.v74ShaoThenZhang));
    if(seal){
      const direct=(seal.choices||[]).find(c=>c?.effects?.flags?.v44NewEmpress==='zhangyuanzhao'&&!c?.v74ShaoThenZhang);
      let two=(seal.choices||[]).find(c=>c?.v74ShaoThenZhang);
      if(!two){
        two={
          label:'先册邵明贞为后，让她真正执掌中宫',
          hint:'邵明贞会做一段真正的皇后；外戚风波查清后，她归还凤印，张元照才继后。',
          v74ShaoThenZhang:true,
          effects:{ranks:{ning:'皇后'},flags:{v44NewEmpress:'ning',v74ShaoThenZhang:true,v74NingInitiallyEmpress:true}},
          result:'邵明贞先受凤印。她不是过渡名号；这一年中宫真正由她作主。'
        };
      }
      if(direct){
        direct.label='直接册张元照为皇后';
        direct.hint='不经过第二位中宫，张元照直接受凤印。';
        seal.choices=[direct,two];
      }else seal.choices=[two];
      seal.v88CanonicalSuccession=true;
    }
  }
  // 旧存档若还停在“永久邵后”，不再允许这条线延伸到终局。
  state.flags=state.flags||{};
  if(state.flags.v44NewEmpress==='ning'&&!state.flags.v74ShaoThenZhang&&!state.flags.v74ZhangSucceeded){
    state.flags.v74ShaoThenZhang=true;
    state.flags.v74NingInitiallyEmpress=true;
    const si=succession?CHAPTERS.indexOf(succession):-1;
    if(si>=0 && state.index>si+1){
      state.flags.v74ShaoRelinquished=true;state.flags.v74ZhangSucceeded=true;state.flags.v74NingFormerEmpress=true;
      state.flags.v44NewEmpress='zhangyuanzhao';
      state.ranks=state.ranks||{};state.ranks.ning='皇贵妃';state.ranks.zhangyuanzhao='皇后';
    }
  }

  // B. 名称最终校正（源码已替换，这里防旧存档/后生成数据继续吐旧名）。
  const princessNames88={
    '杨若兮':'杨令兮','杨若容':'杨昭焉','杨若华':'杨宁矣','杨若仪':'杨晏尔','杨若棠':'杨宜哉','杨若清':'杨清而','杨若嘉':'杨嘉则','杨若宜':'杨和乃','杨若和':'杨贞亦','杨若贞':'杨安以','杨若宁':'杨柔于','杨若柔':'杨宛然'
  };
  const fixName88=x=>princessNames88[x]||x;
  for(const c of Object.values(CHILDREN||{}))if(c?.name)c.name=fixName88(c.name);
  if(state.flags?.v69LatePrincess?.name)state.flags.v69LatePrincess.name=fixName88(state.flags.v69LatePrincess.name);
  for(const x of Object.values(state.flags?.extraHeirs||{}))if(x?.name)x.name=fixName88(x.name);
  // 页面模块用语改成直接、常用的现代中文；剧情里的“玉牒/诏书”等制度词保留。
  const v88UiWords=html=>String(html||'')
    .replaceAll('皇室玉牒','皇室子女').replaceAll('人物谱','人物录').replaceAll('卷终脉络','故事回看').replaceAll('>皇嗣<','>皇子女<')
    .replaceAll('皇后出殡出凤仪宫','皇后出殡');

  // C. 固定篇幅回看：最近 6 幕，每幕固定最多两段、每段最多 240 字；不改选择、不重走存档。
  const RECAP_COUNT88=6, RECAP_PARAS88=2, RECAP_CHARS88=240;
  function strip88(x){const d=document.createElement('div');d.innerHTML=String(x||'');return (d.textContent||'').replace(/\s+/g,' ').trim()}
  function trim88(x,n=RECAP_CHARS88){x=strip88(x);return x.length>n?x.slice(0,n)+'…':x}
  function recapScenes88(){
    const all=[];
    const maxCi=Math.min(state.index,CHAPTERS.length-1);
    for(let ci=0;ci<=maxCi;ci++){
      const c=CHAPTERS[ci];if(!c)continue;
      if(c.steps?.length){
        const maxSi=ci<state.index?c.steps.length-1:Math.min(state.chapterStep||0,c.steps.length-1);
        for(let si=0;si<=maxSi;si++){
          const st=c.steps[si]; if(!st)continue;
          const paras=AS88(st.text,state).filter(Boolean).slice(0,RECAP_PARAS88).map(x=>trim88(x));
          all.push({date:c.date,title:c.title,heading:st.heading||c.title,paras});
        }
      }else if(c.text){
        all.push({date:c.date,title:c.title,heading:c.title,paras:AS88(c.text,state).filter(Boolean).slice(0,RECAP_PARAS88).map(x=>trim88(x))});
      }
    }
    return all.slice(-RECAP_COUNT88);
  }
  function openRecap88(){
    let d=document.getElementById('v88-recap');
    if(!d){d=document.createElement('dialog');d.id='v88-recap';document.body.appendChild(d)}
    const rows=recapScenes88();
    d.innerHTML=`<div class="v88-recap-head"><div><small>固定回看 · 最近 ${RECAP_COUNT88} 幕</small><h2>刚刚发生过的事</h2></div><button class="v88-recap-close" aria-label="关闭">×</button></div>${rows.length?`<div class="v88-recap-list">${rows.map(r=>`<article class="v88-recap-item"><small>${r.date} · ${r.title}</small><h3>${r.heading}</h3>${r.paras.map(p=>`<p>${p}</p>`).join('')}</article>`).join('')}</div>`:`<div class="v88-recap-empty">故事刚刚开始，还没有足够的场景可以回看。</div>`}`;
    d.showModal();d.querySelector('.v88-recap-close').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()};
  }
  const nav88=nav;
  nav=function(){return v88UiWords(nav88()).replace('<button id="restart"',`<button id="v88-recap-open" class="ghost">回看6幕</button><button id="restart"`)};
  const bind88=bind;
  bind=function(){bind88();const b=document.getElementById('v88-recap-open');if(b)b.onclick=openRecap88;};

  // D. 季节特效：保留既有季节层，再增加横风、春日花瓣/新叶和有层次的雪。
  function weatherLayer88(type,count){
    const styles=[];
    for(let i=0;i<count;i++){
      if(type==='wind')styles.push(`--top:${12+(i*17)%76}%;--dur:${4.8+(i%4)*1.2}s;--delay:-${(i*.9).toFixed(1)}s`);
      else if(type==='spring')styles.push(`--left:${(i*29)%97}%;--dur:${8+(i%5)*1.4}s;--delay:-${(i*1.1).toFixed(1)}s;--petal:${['rgba(218,156,166,.58)','rgba(240,207,171,.65)','rgba(161,190,150,.5)','rgba(233,184,207,.56)'][i%4]}`);
      else styles.push(`--left:${(i*31)%98}%;--dur:${7+(i%6)*1.1}s;--delay:-${(i*.8).toFixed(1)}s;--size:${3+(i%4)}px`);
    }
    return `<div class="v88-weather ${type}" aria-hidden="true">${styles.map(x=>`<i style="${x}"></i>`).join('')}</div>`;
  }
  const story88=storyView;
  storyView=function(){
    let html=v88UiWords(story88());
    if((state.index===0&&!state.intro)||state.index>=CHAPTERS.length)return html;
    let cal={season:''};try{cal=sceneCalendar(state.index,state.chapterStep||0)||cal}catch(_e){}
    const c=CHAPTERS[state.index],st=c?.steps?.[state.chapterStep||0];
    const sceneText=strip88(`${st?.heading||''} ${c?.place||''} ${AS88(st?.text,state).join(' ')}`);
    let layer='';
    if(cal.season==='春')layer+=weatherLayer88('spring',18);
    if(cal.season==='冬'&&/雪|宫道|廊|园|门|风/.test(sceneText))layer+=weatherLayer88('deep-snow',15);
    if(/风|宫道|御花园|水榭|廊下|门外|西华门|驿道/.test(sceneText)||cal.season==='秋')layer+=weatherLayer88('wind',9);
    if(layer)html=html.replace(/(<article class="chapter"[^>]*>)/,`$1${layer}`);
    return html;
  };

  // E. 抱朴：从承熙六年怀孕到承熙八年刺杀，关系线真正烧两年多。
  const blade=CH88('刃落宫门');
  if(blade){
    blade.date='承熙八年·春至十月';
    blade.theme='重阳前，拾遗阁忽然安静下来';
    blade.bridge=s=>`承熙八年春，昭氏已经很少再递牌。蘅嫔不再把两个女儿叫到一张桌上吃饭，含章照常送卷。到了九月，昭氏忽然自己改起重阳宴服。`;

    // 先清掉这一段里直接替读者下判断的句子。
    const door=ST88(blade,'她在门外等');
    if(door){door.text=s=>[
      `九月初，昭氏拿着《承露录》新补的一页去养心殿。裴景和让她稍候，说我正在看旧案。`,
      `她从一更等到二更。殿门开时，先出来的是含章。`,
      `含章手里没有香盒，也没有任何侍寝后的东西，只有一卷盖着御前封签的案册。`,
      `昭氏看了那卷案册很久：“妹妹现在也会熬夜了。”`,
      `${courtTitle(s,'hanzhang')}答：“核档。”`,
      `“核到这个时辰？”`,
      `“还差两页。陛下让我明日再送。”`,
      `昭氏笑了一下：“当然不一样。”`,
      `回拾遗阁以后，她把《承露录》摊在灯下。写香、衣色、何时递牌的十几页被她一张张撕下来，最后只剩日期。`,
      `第二天宫人问还要不要把牌子送去，她说：“不送。”`
    ];}
    const family=ST88(blade,'母亲说“够了”');
    if(family){family.text=s=>[
      `几日后，蘅嫔把两个女儿叫来吃饭。桌上只有清粥和蒸蛋。`,
      `她把《承露录》从昭氏袖中抽出来：“够了。”`,
      `昭氏笑：“什么够了？”`,
      `“求子、等牌、算谁来看你。都够了。”`,
      `昭氏把那只旧香匣推到母亲面前：“当年是谁告诉我，喜欢会散，孩子进宗谱才握得住？”`,
      `蘅嫔没有接。`,
      `“又是谁让我记太医、记御前，让妹妹替我看路？”`,
      `蘅嫔的手在碗边停住。`,
      `昭氏转向含章：“你也觉得够了？”`,
      `${courtTitle(s,'hanzhang')}没有躲开：“我觉得你该先把身子养好。但我不替母亲劝你，也不替你去御前问。”`,
      `“你现在当然不用问。”昭氏看了一眼妹妹袖口露出的封签，“门已经给你开了。”`,
      `含章答：“那扇门不是姐姐让给我的。”`,
      `瓷碗被昭氏袖口碰到，沿桌面滚了半圈。她伸手按住，没有让它摔下去。`,
      `“好。”她说，“那以后各走各的。”`,
      `她先离席。蘅嫔没有追。含章坐到粥彻底凉了才起身。`
    ];}

    const banquetIndex=(blade.steps||[]).findIndex(st=>/重阳宴/.test(String(st.heading||'')));
    if(banquetIndex>=0 && !(blade.steps||[]).some(st=>st.v88WhiteHeat)){
      const extra=[
        {v88WhiteHeat:true,heading:'九月十二 · 含章第一次把“不知道”带进御前',cast:['hanzhang','emperor'],fx:'wind',narrative:true,text:s=>[
          `那顿饭以后，含章没有更常来养心殿。反而少了两次。`,
          `九月十二，她送来一页核过的旧值簿。我问其中一名内侍是不是替蘅嫔送过信。`,
          `她看了一遍：“臣不知道。”`,
          `裴景和站在旁边，像等她补一句猜测。她没有补。`,
          `我问：“那你知道什么？”`,
          `“他那夜换过一次值。换值是谁准的，纸上没有。”`,
          `我让人只查这两件事。她收起其余册页，没有趁机替母亲解释，也没有把姐姐再牵进来。`,
          `临走时我说：“以后不知道，就照这样答。”`,
          `她停半步：“陛下不嫌臣没用？”`,
          `“比编一个答案有用。”`,
          `她没有笑，只把袖口抚平了一次。`
        ],choices:[{label:'继续',effects:{trust:{hanzhang:2},flags:{v88HanzhangTrustSlow:true}},result:''}]},
        {v88WhiteHeat:true,heading:'九月十九 · 母女三个人开始分别吃饭',cast:['wenheng','baopu','hanzhang'],fx:'candle',narrative:true,text:s=>[
          `拾遗阁从前只有一个小厨房。九月以后，晚膳却常常分三处送。`,
          `蘅嫔仍让人做昭氏爱吃的辣鱼。第一回送过去，昭氏收了；第二回只动了一筷子；第三回把整盘退回来，说太医不许。`,
          `含章那边收到的是一碗酸酪麦饼。她吃完，把空碗亲自送回母亲门口，没有进去。`,
          `有一晚姐妹在廊下碰见。昭氏先问：“御前今天又让你看什么？”`,
          `“一份旧值簿。”`,
          `“你现在什么都能看。”`,
          `“不能。”含章说，“有些东西陛下不给，有些我自己不看。”`,
          `昭氏盯着她：“你是不是觉得你比我干净？”`,
          `含章半晌才答：“没有。”`,
          `“那你可怜我？”`,
          `“也没有。”`,
          `风从廊角灌进来，两个人袖子一起被吹起来。含章按住袖口：“姐姐，我只是不能替你过。”`,
          `昭氏低头把被风吹歪的发簪扶正：“这句话倒像你。”`,
          `她们各自回房，没有和好，也没有再吵。`
        ],choices:[{label:'继续',effects:{trust:{hanzhang:1},bond:{baopu:-1},flags:{v88WenrenSeparateLives:true}},result:''}]},
        {v88WhiteHeat:true,heading:'九月二十七 · 昭氏忽然什么都不要了',cast:['baopu','wenheng','hanzhang','fang'],fx:'wind',narrative:true,text:s=>[
          `九月底，昭氏忽然安静下来。`,
          `她不再自己递牌，也不再问敬事房哪天轮到谁。尚衣局送来的新首饰，她挑出最轻的一支，其余都退回去。`,
          `方小满来送栗糕，见她坐在窗边拆一件旧红衣的袖口，问：“娘娘要改衣裳？”`,
          `“线松了。”`,
          `“让尚衣局改呀。”`,
          `昭氏咬断线头：“自己的衣裳，自己缝一次。”`,
          `蘅嫔听说她肯吃饭，隔日送来一盅鱼汤。昭氏喝完，没有退碗。含章从宫道经过时，她甚至隔窗叫了一声：“重阳穿什么？”`,
          `“青的。”`,
          `“又是青的。”昭氏笑，“你这辈子也没几种颜色。”`,
          `含章站在窗外，也笑了一下。`,
          `宫人后来都记得那几日很平静。昭氏睡得早，早晨也肯喝药。只有那件深绛衣裳的袖口，是她自己一针一针重新缝过的。`
        ],choices:[{label:'继续',effects:{flags:{v88BaopuCalmBeforeStorm:true}},result:''}]}
      ];
      blade.steps.splice(banquetIndex,0,...extra);
    }
    const banquet=ST88(blade,'重阳宴');
    if(banquet){banquet.heading='十月初九 · 重阳宴散';banquet.text=s=>[
      `重阳宴设在西暖阁。菊花搬进廊下避风，酒温在小炉上。`,
      `昭氏来得很早。她穿的正是九月底亲手改过的深绛衣裳，腰间压金线，袖口没有铃。`,
      `蘅嫔坐得离她不远。两人只在第一巡酒时对视一次。含章仍穿深青，右手边放着一卷尚未送回御前的旧册。`,
      `宴到中段，昭氏亲自替我斟酒，讲起宫里小公主把重阳糕捏成一团的笑话。满桌都笑，她自己笑得最大声。`,
      `散席前她忽然问含章：“妹妹，明日还去养心殿？”`,
      `含章答：“若那两页查完，就去。”`,
      `昭氏点头：“真好。”`,
      `她把最后半杯酒喝完，起身时还替母亲扶了一下椅背。`,
      `蘅嫔低声说：“慢点走。”`,
      `“知道。”`,
      `这是母女最后一句寻常话。`
    ];}
  }

  // F. UI 显示再收一遍：不把“玉牒”等制度词从剧情里硬抹掉，只把页面名改得易懂。
  const people88=peopleView;peopleView=function(){return v88UiWords(people88())};
  const children88=childrenView;childrenView=function(){return v88UiWords(children88()).replace('<h1>皇嗣</h1>','<h1>皇子女</h1>')};
  const chron88=chronicleView;chronicleView=function(){return v88UiWords(chron88()).replace('史官书','史书记载')};
  const ending88=ending;ending=function(){return v88UiWords(ending88())};

  // 最终 render：旧补丁再次渲染时也保持 v88 标记。
  const render88=render;
  render=function(){const r=render88();document.documentElement.dataset.build=BUILD88;document.title='宫灯未眠 · 收束版 v88';return r};
  state.flags.v88Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v88 final canon / replay / weather / baopu failed',e)}})();
