(()=>{try{
  if(globalThis.__v107ZhangPolish)return;globalThis.__v107ZhangPolish=true;
  const CH=t=>(CHAPTERS||[]).find(c=>c?.title===t);
  const ST=(c,q)=>(c?.steps||[]).find(s=>String(s?.heading||'').includes(q));
  const IX=(c,q)=>(c?.steps||[]).findIndex(s=>String(s?.heading||'').includes(q));
  const A=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const z='zhangyuanzhao';
  const zQueen=s=>!!(s?.flags?.v44NewEmpress==='zhangyuanzhao'||s?.flags?.v74ZhangSucceeded||s?.ranks?.[z]==='皇后'||s?.flags?.v82SecondController);
  const esc=s=>String(s??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]||m));

  function wrap(st,key,fn){
    if(!st||st[key])return;const old=st.text;
    st.text=s=>fn(A(old,s),s);st[key]=true;
  }
  function addAfter(ch,q,obj){
    if(!ch?.steps||ch.steps.some(x=>x?.v107id===obj.v107id))return;
    const i=IX(ch,q);ch.steps.splice(i>=0?i+1:ch.steps.length,0,obj);
  }
  function addBefore(ch,q,obj){
    if(!ch?.steps||ch.steps.some(x=>x?.v107id===obj.v107id))return;
    const i=IX(ch,q);ch.steps.splice(i>=0?i:ch.steps.length,0,obj);
  }
  function insertOnce(a,afterNeedle,line){
    if(a.some(x=>String(x).includes(line)))return a;
    const i=a.findIndex(x=>String(x).includes(afterNeedle));
    if(i>=0)a.splice(i+1,0,line);else a.push(line);return a;
  }

  // 1) 第一次大选：她不是“被剧情挑中”的后期工具人。最早的主动选择只是——不请求退出。
  const first=CH('御前终选');
  const decree=ST(first,'册书送出体元殿');
  wrap(decree,'v107ZhangFirstAgency',(a,s)=>insertOnce(a,'张元照的册页夹在低位册书中',
    `礼官最后照例核问“有无旧婚约、重疾或应避之故”。张元照答“无”。顺王府没有递免选帖，她自己也没有求退。那时这只是一句很轻的回答；很多年以后我才知道，她第一次替自己选的并不是凤印，只是一扇能离开王府的门。`));

  // 2) 初入宫：她不是爱整齐，她只是讨厌“会混在一起的东西”失去边界。
  const years=CH('宫灯渐繁');
  const room=ST(years,'景阳宫东配殿');
  wrap(room,'v107ZhangEarlyVoice',(a,s)=>{
    const line=`王静娴问：“你什么都要分这么清？”张元照低头看了一眼还没收完的衣箱。衣裳、旧书、线团其实乱得很。她说：“不是。会拿错的东西才分开。”`;
    return insertOnce(a,'一个喝水，一个漱口',line);
  });

  // 3) 王府前史：把核心创伤说清——真正可怕的是“替你决定，还要你感恩”。
  const cage=CH('王府旧笼');
  const pass=ST(cage,'那张没有带出王府的路引');
  wrap(pass,'v107ZhangRoadPass',(a,s)=>{
    const line=`后来我问她：“你最恨的是他烧了路引？”张元照想了一会儿：“不是。臣妾最怕的是，他烧完以后还真心觉得臣妾有一天会明白，这是为臣妾好。”`;
    return insertOnce(a,'第二年春礼部登记大选',line);
  });

  // 4) 时疫：必须让她自己的方法真正伤到过一个无辜的人。她不是天生正确，而是学会为错误留名。
  const winter=CH('凤仪宫最后一冬');
  if(winter){
    const anchor=ST(winter,'第一张告示先写')?'第一张告示先写':'张元照要的不是药方';
    addAfter(winter,anchor,{
      v107id:'zhang-first-record-error',heading:'第六日 · 她第一次因为一张表向人道歉',cast:['zhangyuanzhao','gu'],fx:'ink',narrative:true,text:s=>[
        `第六日，接触名单里多了尚衣局一个叫春桃的宫女。送水册上写着她的名字，张元照照单把人移去侧院。春桃一路都在哭，说自己从没进过西院。`,
        `张元照起初只回了一句：“册上这样写。”`,
        `半日后，井房送来另一册。西院那天确实有个“春桃”送过水，却是井房另一个同名宫女。两个名字被前一夜抄到了一处。`,
        `掌事嬷嬷低声劝：“疫中宁可多关一个，也不能漏一个。”`,
        `张元照看着两张纸，没有顺着这句话下台阶：“多关的那个也是人。”`,
        `她亲自去侧院放人。春桃见她进门便跪，先说自己不敢怪主子。`,
        `“你可以怪。”张元照道，“是我写错了。”`,
        `她问清这一日有没有扣月例、有没有耽误差事，又回去把所有名单加上“宫所”“差事”两栏；同名者必须拿第二本册子复核。`,
        `原来那一行她没有涂掉，只在旁边补了四个字：<b>错列一人。</b>`,
        `顾明宜后来看到，问她为什么不重新誊一张干净的。`,
        `张元照说：“干净了，就像没错过。”`
      ],choices:[{label:'把这一行留下',effects:{trust:{zhangyuanzhao:3,gu:2},flags:{v107ZhangOwnedError:true}},result:'从这天起，她的册子不只记别人做过什么，也开始记自己改过什么。'}]
    });
  }

  // 5) 坦白来处：进宫是逃离，留下则是她后来重新作出的选择。
  const vacancy=CH('中宫空悬');
  const reveal=ST(vacancy,'臣妾不是从哪个州府来的');
  wrap(reveal,'v107ZhangRevealCore',(a,s)=>{
    const line=`“臣妾那时想的不是进宫能得到什么。”她说，“只是礼官问到臣妾时，那一句话终于只能由臣妾自己答。”`;
    return insertOnce(a,'也因为臣妾没有更好的门',line);
  });

  // 6) 受凤印之后先给她一晚“只是一个人”的戏，不立刻继续让她解决问题。
  const late=CH('帘后朱笔');
  if(late){
    addBefore(late,'雨声把奏折压得更低',{
      v107id:'zhang-first-night-empress',heading:'受册第七夜 · 凤仪宫的窗仍开半扇',cast:['zhangyuanzhao'],fx:'candle',narrative:true,text:s=>zQueen(s)?[
        `受册后的第七夜，六宫请安、命妇贺礼和礼部回奏终于都散了。张元照回到内殿，第一件事是把凤冠摘下来。额角被压出一道红痕，她对着铜镜看了半天，先笑了一声。`,
        `新拨来的掌事嬷嬷见她伸手推窗，忙道：“娘娘，凤仪宫夜里风重。”`,
        `“冷了再关。”`,
        `嬷嬷迟疑：“中宫起居总要有个规矩。”`,
        `张元照的手停在窗栓上。以前在景阳宫，开半扇窗从来不值得任何人解释。`,
        `她最后还是把窗推开了。风进来，吹动妆台旁一张尚未收走的礼单。`,
        `夜膳只动了半碗粥。她没看折子，也没叫尚宫来回话，只坐在窗边把额角那道红印慢慢揉散。`,
        `过了一会儿，她说：“原来真坐到一个位置上，连开一扇窗都会有人问是不是规矩。”`,
        `嬷嬷不知道该怎么答。`,
        `张元照也没要答案。她往后靠了一点：“那就先住一晚。”`,
        `凤仪宫这一夜没有改旧章，也没有立新制。窗只开了半扇。`
      ]:[`张元照没有受凤印，这一夜没有发生。`],choices:[{label:'让这一夜只过去',effects:{bond:{zhangyuanzhao:1},flags:{v107ZhangFirstEmpressNight:true}},result:''}]
    });
  }

  // 7) “喜欢权力”不是宣言式反转；把早年那次误伤接回来。
  const power=ST(late,'她把凤印压在弹章上');
  wrap(power,'v107ZhangPowerMemory',(a,s)=>{
    const line=`“臣妾在疫年就因为一张表关错过人。后来做皇后，也不是每一道规矩都只救人。”`;
    return insertOnce(a,'臣妾也伤过人',line);
  });

  // 8) 终局：她最怕的不是失去权，而是有一天自己也觉得“替别人决定就是为别人好”。
  const finale=CH('万家灯火');
  const alone=ST(finale,'她第一次没有人可以回头问');
  wrap(alone,'v107ZhangFinalFear',(a,s)=>{
    if(!zQueen(s))return a;
    const l1=`做了皇后以后，我才明白，顺王最可怕的不只是烧过那张路引，而是他一直觉得自己比别人更知道什么叫“为她好”。如今我也能一句话定很多人的事，我也可能犯同样的错。`;
    const l2=`所以后来我反而怕没人反对。若满殿只剩一句“娘娘说得对”，我就得先想一想：是不是我又替别人把路堵死了。`;
    if(a.some(x=>String(x).includes('门是不是又被我从里面关上了')))return a;
    const i=a.findIndex(x=>String(x).includes('桌上的凤印没有因此变轻'));
    if(i>=0)a.splice(i+1,0,l1,l2);else a.push(l1,l2);return a;
  });

  // 9) 人物录最终口径：阶段信息服从当前进度，不再回到“第二批新人/万能制度人”。
  function syncZhang(s=state){
    const p=PEOPLE?.[z];if(!p)return;
    const firstIdx=(CHAPTERS||[]).findIndex(c=>c?.title==='御前终选');if(firstIdx>=0)p.introducedAt=firstIdx;
    p.signature='爱在纸边画小方格；没解决的事宁可空着，不为了好看硬划掉。真正不愿意的事，她会直接说“不”。';
    if(s.flags?.v82SecondController){
      p.home='慈宁宫 / 西暖阁';p.tags=['皇太后','自己选择继续','警惕替人作主'];
      p.bio='承熙帝崩后，她没有说“先帝要我继续掌权”，也没有靠退下来证明自己无私。她年轻时最恨别人替她作主，后来自己却成了下令的人，所以最怕有一天也把“为你好”当成替别人决定的理由。';return;
    }
    if(zQueen(s)){
      p.home='凤仪宫';p.tags=s.flags?.v81ZhangPowerAccepted?['中宫','承认喜欢权力','经手留名']:['中宫','本人意愿','权力留痕'];
      p.bio=s.flags?.v81ZhangPowerAccepted
        ?'她从景阳宫低位旧人走到中宫，并不把掌权包装成牺牲：她承认自己喜欢有资格说“改”的位置。她也越来越清楚，规则、记录和好意都可能伤人，因此坚持经手留名、允许退出，也让自己的错误留在册上。她与皇帝并非爱情；真正维系两人的，是可以拒绝、可以说不知道、也可以当面说“你错了”的信任。'
        :'她受凤印后开始从六宫宫务走到御前章奏旁。她擅长把事实、时辰和责任拆开，却并不相信自己永远正确；早年的王府经历让她对“替别人决定”异常敏感，而中宫真正考验她的，是拥有决定权以后还能不能记得这一点。';return;
    }
    if(s.flags?.zhangRevealed){
      p.home='景阳宫东配殿';p.tags=['来自后世','本人意愿','规则可改'];
      p.bio='她前世二十六岁，从事疫病调查与记录工作，九岁时在大晟醒来。她带来的不是现成答案，只是知道很多事还可以换一种办法做；顺王府九年又让她格外厌恶别人以恩情替她决定。她会用记录追问题，也亲手撕过过度监控的表，并因错列一个无辜宫女留下自己的第一笔错误记录。';return;
    }
    if(s.flags?.v46EpidemicBegins||s.flags?.v107ZhangOwnedError){
      p.home='景阳宫东配殿';p.tags=['疫务记录','会认错','本人意愿'];
      p.bio='时疫把她原本琐碎的生活习惯推到宫务中央：记先后、减往返、鼓励主动报病。她不是医者，也并非每次都对；一次错列宫女以后，她开始坚持同名复核、改痕留存。别人逐渐信她，不是因为她从不犯错，而是她不肯把错误誊成一张干净的新纸。';return;
    }
    if(s.flags?.v94WangPastTold||s.flags?.v94OldBoxOpened||s.flags?.v47WangLetterSeen){
      p.home='景阳宫东配殿';p.tags=['景阳宫旧人','不受恩控制','纸边方格'];
      p.bio='承熙三年第一次大选入宫，初封低位。此前她寄居顺王府多年，受过照拂，也被以同一份“为你好”阻断过离开的路。她因此很少把赏赐、照顾和服从混成一件事；在宫里多年不算显眼，却一直保留开半扇窗、分开私人物件和在纸边留空格的习惯。';return;
    }
    p.home='景阳宫东配殿';p.tags=['承熙三年入宫','低位旧人','纸边方格'];
    p.bio='承熙三年第一次大选入宫，初封答应。她家世与应答都不算最显眼，前几年承宠也不多；宫人更早记住的是她总开半扇窗、把容易混用的东西分开、在纸边画小方格。她并不爱把一切整理得整齐，只是不喜欢别人替她把答案填满。';
  }

  const oldPeople107=typeof peopleView==='function'?peopleView:null;
  if(oldPeople107){
    peopleView=function(){
      syncZhang(state);let h=String(oldPeople107());syncZhang(state);
      try{
        const box=document.createElement('div');box.innerHTML=h;
        const card=box.querySelector('[data-person="zhangyuanzhao"]');
        if(card){
          const tags=card.querySelector('.tags');if(tags)tags.innerHTML=(PEOPLE[z].tags||[]).map(x=>`<span>${esc(x)}</span>`).join('');
          const ps=[...card.querySelectorAll('p')];const bio=ps.find(x=>!x.classList.contains('meta')&&!x.classList.contains('v52-observation'));if(bio)bio.textContent=PEOPLE[z].bio||'';
        }
        h=box.innerHTML;
      }catch(_e){}
      return h;
    };
  }

  // 10) 大事录里清掉 v83 留下的旧时间口径：她不是承熙十年才离开顺王府。
  const oldChron107=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron107){chronicleView=function(){let h=String(oldChron107());return h
    .replace('张元照离开顺王府、承熙三年入宫、宫中日常、秋疫与顾后之死','张元照的顺王府旧事重新被揭开、承熙三年初入宫、宫中日常、秋疫与顾后之死')
    .replace('一个来自后世的人不再只想活下去，开始试着把自己记得的办法放进这个时代','那个承熙三年便已入宫的低位旧人，终于把自己为何总要“先问一句”的来处说清，也开始把个人习惯变成可以被别人接手、质疑和修订的办法');};}

  syncZhang(state);
  state.flags=state.flags||{};state.flags.v107ZhangPolish=true;
  document.documentElement.dataset.build='v107';
  document.title='宫灯未眠 · 张元照全局人设梳理润色 v107';
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v107 zhang global character polish failed',e)}})();
