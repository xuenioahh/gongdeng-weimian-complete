(()=>{try{
  const BUILD87='v87';
  const TITLE87='宫灯未眠 · 正文节奏、关系与主题总检 v87';
  const CH87=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const A87=(v,s=state)=>{try{const r=typeof v==='function'?v(s):v;return Array.isArray(r)?r:[r]}catch(e){return [`〔文本读取失败：${e.message}〕`]}};
  const LOW87=['cao2','zhao2','lin2','ye2','du2','su2'];
  const LOWNAME87={cao2:'何超英',zhao2:'王静娴',lin2:'林淑贞',ye2:'陈婉仪',du2:'张淑华',su2:'刘玉贞'};
  const firstSel87=Math.max(0,(CHAPTERS||[]).findIndex(c=>c.title==='御前终选'));
  const selectedLow87=s=>(s?.flags?.lowConsorts||[]).filter(k=>LOW87.includes(k));
  const lowMother87=s=>{
    const chosen=selectedLow87(s);
    let k=s?.flags?.lowPregnancyKey;
    if(!chosen.includes(k))k=chosen[0]||null;
    if(k&&s?.flags)s.flags.lowPregnancyKey=k;
    return k;
  };
  // 最终覆盖旧版本的随机/失效怀孕母亲选择。
  try{lowPregKey=function(s=state){return lowMother87(s)||selectedLow87(s)[0]||null}}catch(_e){}
  globalThis.lowPregKey=function(s=state){return lowMother87(s)||selectedLow87(s)[0]||null};

  // ---------- A. 承熙三年至六年：按真实年月重排，不再来回跳年 ----------
  const bloom=CH87('宫灯渐繁');
  const windowCh=CH87('窗开半扇');
  if(bloom?.steps){
    // 梁素贞承熙十一年才入宫。旧补丁把她和霍素英的可选场误插到承熙三年，移到真正入宫以后。
    const misplaced=bloom.steps.find(st=>String(st.heading||'').includes('翊坤宫收隼'));
    if(misplaced){
      bloom.steps=bloom.steps.filter(st=>st!==misplaced);
      misplaced.heading='骤雨后，翊坤宫收隼';
      if(windowCh?.steps&&!windowCh.steps.includes(misplaced)){
        const pos=windowCh.steps.findIndex(st=>String(st.heading||'').includes('梁氏晒弓弦'));
        windowCh.steps.splice(pos>=0?pos+1:windowCh.steps.length,0,misplaced);
      }
    }
    // 重复的沈氏旧案种子只留信息更完整的一场。
    const hasDetailed=bloom.steps.some(st=>String(st.heading||'').includes('霍家的旧簿没有直接送给和妃'));
    bloom.steps=bloom.steps.filter(st=>!(hasDetailed&&String(st.heading||'').includes('和妃的旧案从霍氏家的一本军粮簿开始')));
    // 这场只有一句、且误把另一条隐藏皇子线塞进承熙四年，删除空壳场。
    bloom.steps=bloom.steps.filter(st=>!String(st.heading||'').includes('那个没有进玉牒的孩子'));
    const cough=bloom.steps.find(st=>String(st.heading||'').includes('胎像开始不稳'));
    if(cough)cough.heading='承熙四年七月 · 蘅嫔旧咳又犯';
    const montage=bloom.steps.find(st=>String(st.heading||'').includes('承熙四年的后宫并不只围着一个人转'));
    if(montage)montage.heading='承熙四年秋 · 各宫的灯有各自的时辰';
    const order87=[
      ['分宫不是搬箱子',301],['新人入宫后的第一个月',302],['三个世家女开始长出',303],
      ['一场消暑宴',306],['一场骤雨，低位宫里',307],['六张小纸',308],['八月十五',309],['中秋宴散',310],['换库单',311],['那匣香本来',312],
      ['一位低位新人先有了孩子',401],['蘅嫔是不是只剩一个名位',402],['霍家的旧簿',403],['上巳的杯子',404],['一份不太像喜报',405],['蘅嫔旧咳又犯',407],['三公主洗三',408],['各宫的灯有各自的时辰',409],['慢性暗害',410],['霍氏有喜',411],
      ['霍氏生产',506],['邵氏有喜',507],['昭氏开始把',508],['宫里孩子一多',509],['九月 · 要不要再添',510],['十一月 · 第二张空白页',511],
      ['邵氏公主满月',602],['五月 · 玉牒又添一笔',605],['六月终于有喜',606]
    ];
    const key=st=>{const h=String(st.heading||'');for(const [n,k] of order87)if(h.includes(n))return k;return 999};
    bloom.steps=bloom.steps.map((st,i)=>({st,i,k:key(st)})).sort((a,b)=>a.k-b.k||a.i-b.i).map(x=>x.st);

    // 低位妃孕产必须服从本局真实留牌，不再硬写何超英。
    const preg=bloom.steps.find(st=>String(st.heading||'').includes('一位低位新人先有了孩子'));
    if(preg){
      const promotion=preg.choices?.find(c=>c.effects?.flags?.promoteLowPregnant);
      if(promotion)promotion.result=()=>{const k=lowMother87(state),p=k&&PEOPLE?.[k];return p?`${p.name}接旨时紧张得把册书拿反。宫里笑了半日，第二天便把注意力重新移开。昭氏却记住了这件事。`:'低位妃嫔接旨，依例晋一阶。'};
      preg.text=s=>{
        const k=lowMother87(s),p=k&&PEOPLE?.[k];
        if(!p)return ['承熙四年正月，太医院没有从低位新人里报来喜脉。'];
        const who=`${p.name}${s.ranks?.[k]?`（${s.ranks[k]}）`:''}`;
        return [
          `承熙四年正月，新入宫的低位嫔妃里先有人报了喜脉。`,
          `有孕的是${who}。她不是最常被召的那一个，前几个月也仍在学宫里的路和礼数。`,
          `皇后把喜脉折送来时说：“有孕可酌晋一级。按常例，不必越序。”`,
          `${courtTitle(s,'baopu')}那日正好在凤仪宫。她听见“喜脉”两个字，先笑着恭喜，后来低头剥了一颗橘子，剥到一半却没吃。`,
          `我把晋位册留在御案上，没有因为孩子还没落地就替她先写完后半生。`
        ];
      };
    }
    const birth=bloom.steps.find(st=>String(st.heading||'').includes('三公主洗三'));
    if(birth){
      birth.text=s=>{
        const k=lowMother87(s),p=k&&PEOPLE?.[k];
        if(!p)return ['承熙四年八月，低位宫嫔这一胎没有走到洗三。'];
        const rank=s.ranks?.[k]||'常在';
        return [
          `八月末，${p.name}发动。她住的院子小，产房外连候着的宫人都排不开，皇后索性把隔壁两间耳房一并腾出来。`,
          `天快亮时，孩子哭了。是个公主。皇后听见女医报“母女平安”，先问乳母名册有没有复核第二遍，册子合上以后才进去。`,
          `${p.name}不过${rank}，抱孩子时两只手一直发抖。她问皇后：“娘娘，臣妾能自己养吗？”`,
          `顾明宜伸向旧例的手停在半空，最后只道：“先养着。你身子若撑不住，再说。”`,
          `洗三那日，玉牒记作三公主，赐名杨宁矣。银盆里浮着艾叶和小铜钱，太后只坐了半刻钟便说：“别折腾孩子。”`,
          `${courtTitle(s,'baopu')}送来一只做得过分精细的小金铃。三公主抓不到，只把她一根手指攥住。她笑得很响，等孩子松手以后却在廊下站了许久。`
        ];
      };
    }
  }

  // ---------- B. 第二次采选前后：把“谁何时认识谁”排顺 ----------
  const empty=CH87('空宫点灯');
  if(empty?.steps){
    const ranks=[
      ['新茶',1],['珍妃开始自己吃',2],['空宫先被灰尘',3],['修缮的人',4],['太后先说',5],['礼部的奏折',6],['开多大的',7],['储秀宫先亮灯',8],
      ['终选散后，含章',9],['第一夜没有传召',10],['入宫第五日',11],['射圃里多了一张新弓',12],['贡造单第一次',13],['孩子还小',14]
    ];
    const key=st=>{const h=String(st.heading||'');for(const [n,k] of ranks)if(h.includes(n))return k;return 99};
    empty.steps=empty.steps.map((st,i)=>({st,i,k:key(st)})).sort((a,b)=>a.k-b.k||a.i-b.i).map(x=>x.st);
  }
  if(windowCh?.steps){
    const ranks=[
      ['景阳宫的窗先开',1],['五月初三',2],['纸边长出',3],['五月初八',4],
      ['一双筷子',5],['梁氏晒弓弦',6],['翊坤宫收隼',7],['一场雨把顺王府',8],['宋氏第一次发现',9],['碎瓷落地',10],['许氏终于敢',11],['那本只写自己',12],['宫道尽头',13],['七月廿三',14],['窗仍开着半扇',15]
    ];
    const last=windowCh.steps.find(st=>String(st.heading||'').includes('六月将尽，窗仍开着半扇'));
    if(last)last.heading='七月尽头，窗仍开着半扇';
    const key=st=>{const h=String(st.heading||'');for(const [n,k] of ranks)if(h.includes(n))return k;return 99};
    windowCh.steps=windowCh.steps.map((st,i)=>({st,i,k:key(st)})).sort((a,b)=>a.k-b.k||a.i-b.i).map(x=>x.st);
  }

  // ---------- C. 正文去策划腔：只留人物行动、对白、可见后果 ----------
  const transform87=z=>{
    let x=String(z??'');
    if(/人物小传\s*·\s*可选/.test(x))return null;
    // 纯作者说明句直接撤掉；事实与动作保留。
    const plain=x.replace(/<[^>]+>/g,'').trim();
    if(plain==='皇后把名额表收回去，第二日重新送来一版。')return null;
    if(plain.includes('到这里，闻人篇、沈顺旧案与顺贵人的雪夜才真正退到身后'))return '顾明宜把名册翻开，第一页墨迹还新。';
    if(plain.includes('这不是我忽然变得更懂人'))return '那天以后，我让裴景和把同一件事的两份原件都留在御案右侧。再有人说“这一份已经够完整”，我会先问另一份在哪里。';
    if(plain.includes('宫里大多数人都不会理解旧物为什么值得留'))return '方小满把断弦的事讲给阿芙以后便忘了。顺王却一直把那截弦收在袖袋里。';
    if(plain.startsWith('__v89_removed_shen_summary__'))return '顺王离京那日，沈知微没有追出第二道门。三日后，永和宫换了新茶。';
    if(plain.startsWith('她们不是排着队“关心”她'))return null;
    if(plain.startsWith('有些人活得太久像制度'))return null;
    if(plain.includes('她终于第一次意识到，善意和证据是两回事'))return '阿芙问：“连皇后赏的也登记？”方小满把礼盒翻过来：“都记。”';
    if(plain.includes('她这些年一直在别人的故事边缘递点心'))return null;
    if(plain.includes('后来四个人在秋疫里各走各的路时'))return '四个人把那顿送错的夜膳吃完，临走时谁也没记得重新排座次。';
    if(plain.includes('后来许淑惠病重时'))return null;
    if(plain.startsWith('这不是后宫里最恶的一次争夺'))return null;
    if(plain.startsWith('恰恰因为只是一点冰'))return null;
    if(plain.startsWith('这时没人会把一枚银扣和几个月后的秋疫联系起来'))return null;
    if(/女史院试任制/.test(plain)&&plain.includes('它最特别的地方不是'))return null;
    if(plain.includes('剩下最难的问题不是“有没有凶手”'))return '<div class="v70-revenge"><b>许淑惠确实是被人故意送进病区的。</b>真正下手的春屏已经死在同一场疫里。</div>';
    if(plain.includes('几十年的旧情到这里真正断了'))return '从那以后，绮春宫再没递过私下请见牌，养心殿也没有再单独召她。';
    if(plain==='中宫另有其人。张元照仍按旧例送疫后册，不阅外朝章奏。')return '邵明贞仍掌凤印。张元照照旧从景阳宫送来疫后册，却没有越过中宫去碰外朝章奏。';
    if(plain==='张元照没有受凤印，略过这一条终章支线。')return '凤仪宫仍由邵后主持。储位密匣送进养心殿时，张元照只收到一份抄录，没有越过中宫置喙。';
    if(plain==='本局略过。')return '这一夜张元照不在御前。凤仪宫与养心殿依旧照旧例轮值，太医的灯一直亮到天明。';
    if(plain==='本局略过张元照终章。')return '冬至后第三夜，凤仪宫守在外殿。太医换过三次方，养心殿直到天亮都没有熄灯。';
    // HTML 内残留的视角/策划标签只去标签，不删内容。
    x=x.replace(/<b>[^<]{0,16}视角<\/b><br\s*\/?>/g,'');
    x=x.replace(/<div class="v70-office"><b>女史院试任制<\/b><br>[\s\S]*?<\/div>/g,'');
    x=x.replace(/<div class="v70-revenge"><b>许淑惠确实是被人故意送进病区的。<\/b>可真正下手的人已经死在同一场疫里。剩下最难的问题不是“有没有凶手”，而是一个亲人能不能把还活着的主子一起算成凶手。<\/div>/g,'<div class="v70-revenge"><b>许淑惠确实是被人故意送进病区的。</b>真正下手的春屏已经死在同一场疫里。</div>');
    return x;
  };
  for(const ch of (CHAPTERS||[]))for(const st of (ch?.steps||[])){
    if(typeof st.heading==='string')st.heading=st.heading.replace(/^支线\s*·\s*/,'').replace(/^第[一二三四五六七八九十]+幕(?:前|后)?\s*·\s*/,'');
    if(st.text&&!st.__v87Immersion){
      const old=st.text;st.text=s=>A87(old,s).map(transform87).filter(x=>x!==null&&x!==undefined&&String(x).trim()!=='');st.__v87Immersion=true;
    }
    if(Array.isArray(st.choices))for(const c of st.choices){
      if(typeof c.label==='string'){
        if(c.label==='不进去，继续主线')c.label='让御辇继续往前';
        if(c.label==='卷一至此')c.label='继续';
      }
      if(typeof c.result==='string')c.result=transform87(c.result)??'';
      else if(typeof c.result==='function'&&!c.__v87Result){const old=c.result;c.result=s=>{const r=old(s);if(Array.isArray(r))return r.map(transform87).filter(Boolean);return transform87(r)??''};c.__v87Result=true;}
    }
  }

  // 选秀关系卡/正文再锁一层：没有入宫的人不参与后续关系与选择。
  function lockLow87(s=state){
    if(!(s?.flags?.v78ManualLowSelection||s?.flags?.firstGrandSelectionDone||(s?.flags?.lowConsorts||[]).length))return;
    const keep=new Set(selectedLow87(s));
    for(const k of LOW87){
      if(keep.has(k))continue;
      if(PEOPLE?.[k]){PEOPLE[k].introducedAt=9999;PEOPLE[k].home='未入宫';}
      if(s.ranks)s.ranks[k]='未入宫';
      if(typeof HAREM_KEYS!=='undefined'){let i;while((i=HAREM_KEYS.indexOf(k))>=0)HAREM_KEYS.splice(i,1)}
    }
    if(!keep.has(s.flags?.lowPregnancyKey))s.flags.lowPregnancyKey=[...keep][0]||null;
  }
  lockLow87(state);

  // ---------- D. 关系与主题：只做结构检查标记，不把总结塞回正文 ----------
  // 这些场景承担主轴：顾氏规矩、方氏/阿芙、顺王、秋疫、继后、女史院、陆既明、严教皇子、终章。
  const thematicNeed87=[
    ['刃落宫门','伤口愈合得比疑心快'],['听雨轩有喜','听雨轩落锁以后'],['王府旧笼','她说“臣女愿意入宫”'],
    ['凤仪宫最后一冬','第一扇关上的门'],['中宫空悬','东角门开了一刻钟'],['帘后朱笔','女史院'],
    ['西华门外','他自己把西华门那一夜送到御前'],['万家灯火','白玉扳指终于不转了']
  ];

  // ---------- E. 最终 build/title 必须压过 v61 的旧 render 包装 ----------
  const render87=typeof render==='function'?render:null;
  if(render87&&!globalThis.__v87Render){
    globalThis.__v87Render=true;
    render=function(){const out=render87();document.title=TITLE87;document.documentElement.dataset.build=BUILD87;return out;};
  }
  document.title=TITLE87;document.documentElement.dataset.build=BUILD87;

  globalThis.V87_QA={
    checklist:[
      '章节按承熙年份推进，章内不明显倒序','人物只在实际登场以后进入关系和正文','未留牌低位候选不进入后续正文/选项/人物录/皇嗣','第二次采选四人只在承熙十一年后出现',
      '年龄随年份变化，死亡人物停在卒年','当前位分与终局称谓一致','皇子女序齿统一中文且同一人物不冲突','重场之后保留日常/温情喘息','关系有前因与后果，不靠人物录解释',
      '顾明宜/方小满-阿芙/沈知微/顺王/秋疫/继后/女史院/陆既明/严教皇子均回到双主控主题','张元照的现代意识通过失败、试行、选择与权力后果表现，不用价值清单',
      '正文无“支线/人物小传/主线/卷一至此/这一幕说明”等策划腔','含章后期仍有生活痕迹但不抢主线','杨叙死后才切换张元照第二主控','终章保留万家灯火意象而不复制完整歌词'
    ],
    run(s=state){
      const issues=[];
      if(document.documentElement.dataset.build!==BUILD87)issues.push('最终 build 被旧 render 覆盖');
      const b=CH87('宫灯渐繁');if(b){let last=-Infinity;const get=h=>{const m=String(h).match(/承熙([三四五六])年/);return m?({三:3,四:4,五:5,六:6}[m[1]]):null};for(const st of b.steps){const y=get(st.heading);if(y!==null&&y<last)issues.push(`宫灯渐繁时间倒序：${st.heading}`);if(y!==null)last=y;}}
      const badHead=[];for(const ch of CHAPTERS)for(const st of ch.steps||[])if(/^(支线|第[一二三四五六七八九十]+幕(?:前|后)?\s*·)|卷一至此/.test(String(st.heading||'')))badHead.push(st.heading);
      if(badHead.length)issues.push(`仍有策划式标题 ${badHead.length} 处`);
      const chosen=new Set(selectedLow87(s));if(s.flags?.v78ManualLowSelection||s.flags?.firstGrandSelectionDone){for(const k of LOW87)if(!chosen.has(k)&&((PEOPLE?.[k]?.introducedAt||0)<9999||HAREM_KEYS?.includes?.(k)))issues.push(`${LOWNAME87[k]}未入宫但仍在后宫数据`)}
      for(const [ct,needle] of thematicNeed87){if(!CH87(ct)?.steps?.some(st=>String(st.heading||'').includes(needle)))issues.push(`主轴场景缺失：${ct}/${needle}`)}
      return {ok:issues.length===0,issues,chapters:CHAPTERS.length,chosen:[...chosen].map(k=>LOWNAME87[k])};
    }
  };

  state.flags=state.flags||{};state.flags.v87Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v87 storyflow / immersion final failed',e)}})();
