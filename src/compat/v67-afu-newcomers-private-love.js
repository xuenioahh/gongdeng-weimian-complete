(()=>{try{
  document.documentElement.dataset.build='v67';
  document.title='宫灯未眠 · 阿芙余生、新人小传与私情见光 v67';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title===t);
  const ix=(ch,q)=>ch?.steps?.findIndex(x=>(x.heading||'').includes(q))??-1;
  const addAfter=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v67id===obj.v67id))return;const i=ix(ch,q);if(i>=0)ch.steps.splice(i+1,0,obj);else ch.steps.push(obj)};
  const addBefore=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v67id===obj.v67id))return;const i=ix(ch,q);if(i>=0)ch.steps.splice(i,0,obj);else ch.steps.push(obj)};
  const textArr=(v,s)=>{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]};
  const append=(st,tag,fn)=>{if(!st||st[tag])return;const old=st.text;st.text=s=>[...textArr(old,s),...fn(s)];st[tag]=true};
  const ptitle=(s,k)=>{try{return (typeof courtTitle==='function'&&courtTitle(s,k))||s.ranks?.[k]||PEOPLE?.[k]?.title||PEOPLE?.[k]?.name||k}catch(_e){return PEOPLE?.[k]?.title||PEOPLE?.[k]?.name||k}};
  const pname=k=>PEOPLE?.[k]?.name||k;
  function shenChild(s){
    const a=[];
    for(const [key,v] of Object.entries(typeof CHILDREN!=='undefined'?CHILDREN:{}))if(v&&v.mother==='shen'&&!/薨|早夭|亡/.test(String(v.note||'')))a.push({...v,key});
    for(const [key,v] of Object.entries(s.flags?.extraHeirs||{}))if(v&&v.mother==='shen'&&v.born&&!v.skipped&&!a.some(x=>x.name===v.name))a.push({...v,key:'extra-'+key});
    return a[0]||null;
  }
  function childLabel(c){return c?`${c.order||'皇嗣'}${c.name?` ${c.name}`:''}`:'皇嗣'}

  // A. 方小满死后：阿芙不消失，转入尚宫局交接房。她记的是“手与手之间”。
  const fang=CH('听雨轩有喜');
  addAfter(fang,'顺贵人的东西并不多',{v67id:'afu-stays',heading:'听雨轩落锁以后，阿芙还得选自己往哪走',cast:['afu','hanzhang','peiyan'],fx:'snow',narrative:true,text:s=>[
    `听雨轩封存到第八日，尚宫局来问阿芙的去处。她原先是花房出来的人，照旧例可以拨回御花园，也可以跟着空缺补去别宫。`,
    `阿芙把方小满留下的最后一只食盒交完，站在院门口想了很久。小灰蹲在她脚边，尾巴扫着已经结硬的雪。`,
    `“奴婢不回花房。”她说。`,
    `掌事问：“那想去哪一宫？”`,
    `“不去哪一宫。”阿芙抬头，“尚宫局不是缺一个管传簿和交接的人么？”`,
    `闻人含章正来取旧口谕副本，听见以后看了她一眼：“你想查案？”`,
    `“不想。”阿芙答得很快，“奴婢也查不明白。奴婢只是不想以后册上再写‘经手宫人不详’。”`,
    `她顿了一下，声音低下来：“那碗药进听雨轩的时候，纸是对的，印也是对的。最后差的就是——到底谁从谁手里接过去。”`,
    `裴景和把尚宫局送来的调拨纸翻过来，在空白处写了三个字：传簿房。`,
    `“那就从名字写起。”他说。`,
    `<div class="v67-thread"><b>阿芙留下来的不是方小满的案子。</b>她留下的是一件更小的事：东西从一双手递到另一双手时，不许把人写成“某宫人”。</div>`
  ],choices:[{label:'“准。让她去尚宫局传簿房。”',hint:'阿芙：“奴婢还是宫女，只是以后多认几只手。”',v67AfuTransfer:true,result:'听雨轩的钥匙交给裴景和，阿芙带着小灰去了尚宫局。她没有换主子，只换了一张每天都要写满名字的桌子。'}]});

  // B. 新人真正入宫时，让阿芙成为前后两批人的桥；同时把第二批四人各自留下一个可认出的物件/习惯。
  const windowCh=CH('窗开半扇');
  addAfter(windowCh,'新主子进宫第一件事',{v67id:'afu-meets-second',heading:'五月初三，箱笼比人先认得宫门',cast:['afu','zhangyuanzhao','liang2','song2','xu2'],fx:'lantern',narrative:true,text:s=>[
    `第二批新人搬宫那日，西六宫门口堵了半条甬道。箱笼、被卷、妆匣和陪嫁宫女一拨接一拨，最容易错的反而不是人，是东西。`,
    `阿芙坐在门房一张窄桌后，不问“送到了没有”，只问“谁送、谁接”。每交一件，她就让两边各报一次名字。`,
    `梁素贞的箱子最显眼，外面没有漂亮绸结，只缠了一段发黑的桐油绳。掌事嫌不好看，要替她换。她伸手压住：“海上绑东西先求湿了还能解，不求好看。”说完自己把结一抽，整段绳便松开。`,
    `宋文秀的箱笼最少，单子却有三张。她站在旁边看了半天，忍不住问阿芙：“这三张不能并成一张？”`,
    `阿芙头也不抬：“能。并完以后，谁交错了就更难找。”`,
    `宋文秀没再说话，只把三张纸的纸边叠齐。`,
    `许淑惠一路都在心里数礼，走到门房前还差点给阿芙这个宫女也行半礼。阿芙往旁边一躲：“您先记自己住哪儿。礼行错了还能重来，晚上走错宫门更麻烦。”`,
    `张元照最后才到。她看见阿芙那张两边都要留名字的交接纸，停了一会儿：“为什么不写‘已送达’？”`,
    `阿芙终于抬头：“因为‘送达’不会说话。人会。”`,
    `张元照把那张纸看了两遍。后来她在时疫里写第一版交接表时，最下面没有写“经手”，写的是两个空格：<b>交出者、接收者。</b>`
  ],choices:[{label:'让箱笼慢一点进宫',hint:'这一天没有大事，几个人只是第一次站在同一扇门前。',effects:{trust:{afu:2,zhangyuanzhao:1,liang2:1,song2:1,xu2:1}},result:'午后甬道终于空下来。梁氏把那段桐油绳重新卷好，宋氏收起三张单，许氏回头确认了两遍门名，张元照则把那张双签纸的格式记进了自己的小册子。'}]});

  // C. 疫中把阿芙的旧经验真正接到元照的方法里，而不是让元照独占所有“新制度”。
  const winter=CH('凤仪宫最后一冬');
  addAfter(winter,'张元照要的不是药方',{v67id:'afu-epidemic-handoff',heading:'八月二十一，阿芙把“送到”两个字划掉',cast:['afu','zhangyuanzhao','hanzhang'],fx:'rain',narrative:true,text:s=>[
    `病院刚开第三日，张元照把第一版送药表贴在太医院外墙。上面有时辰、药名、病院和“已送到”四个字。`,
    `阿芙从尚宫局抱着一叠交接纸经过，看完以后直接拿笔，把“已送到”划了。`,
    `张元照愣了一下。`,
    `“娘娘别恼。”阿芙说，“听雨轩那时候，什么都写‘已送到’。可最后谁递给谁，没人记。”`,
    `她在那四个字下面添了两栏：<b>交出者、接收者。</b>`,
    `张元照没有把笔拿回来，只问：“两边都要签？”`,
    `“最好。有人病得写不了，就让旁边的人写名字，别只画圈。”`,
    `含章从值房出来，正看见两个人挤在一张湿纸前。她没有夸谁，只伸手把纸角按住：“再加一条。改过时辰的人，也留名字。”`,
    `三个人站在雨廊下，把那张纸改得越来越难看。到最后，它不像谁一个人的办法。`
  ],choices:[{label:'把阿芙的双签格式并进疫册',hint:'张元照：“能用的办法，不必都从臣妾这里长出来。”',effects:{trust:{afu:3,zhangyuanzhao:2,hanzhang:1},flags:{v67AfuHandoffRule:true}},result:'从这天起，送药、换值和转院不再只记“已办”，而记两边的人名。'}]});

  addAfter(winter,'许淑惠这回没有行礼',{v67id:'afu-xu-nameplate',heading:'九月初四，名牌没有送错家',cast:['afu','ning'],fx:'candle',narrative:true,text:s=>[
    `许淑惠死后第二日，尚宫局要封她的名牌、贴身小物和家书。阿芙拿到封套时，忽然想起病里那句“会不会送错家”。`,
    `她没有托人。她自己去礼部核了父名，又去储秀宫旧册核了一遍籍贯，回来以后让经手的两个人分别在封口旁留下名字。`,
    `邵明贞看见她来回跑了三趟，问：“这么怕错？”`,
    `阿芙说：“她临走前就怕这个。”`,
    `那只封套最终没有送错。许家收到的仍然只是一份不完整的死亡解释，可至少名字回到了该回的门里。`
  ],choices:[{label:'让阿芙亲自封最后一道签',effects:{trust:{afu:2,ning:1},flags:{v67XuNameplateSafe:true}},result:'封蜡干透以后，阿芙用指腹按了按边角。她第一次觉得，“没送错”本身也能算一件做成的事。'}]});

  // D. 疫后再给梁、宋、许一个回声：第二批不是三张功能卡。
  const snow=CH('雪尽宫门');
  addAfter(snow,'红旨落定以后，名字要一一念完',{v67id:'second-batch-after',heading:'红毡卷走以后，第二批少了一把椅子',cast:['zhangyuanzhao','liang2','song2','afu'],fx:'wind',narrative:true,text:s=>[
    `大封那日散得很晚。第二批入宫时常坐的那张小桌如今只剩三个人。许淑惠的位置早已撤掉，桌沿却还留着她第一次紧张行礼时碰出来的一点浅痕。`,
    `梁素贞回宫前把那段桐油绳从袖里抽出来，重新系在装冬衣的箱子上。她对宫女说：“别换红绸。风真起来的时候，好看的结未必有用。”`,
    `宋文秀手里多了一张家里递来的供应单。她看完，把原本写好的“统一承办”四字划掉，改成：“两路轮换。”`,
    `宫女问她为什么还要留两条路。`,
    `她道：“一条路走顺了，人就会以为第二条永远用不着。崔家以前也是这么开始的。”`,
    `张元照没有点评，只把许氏旧位旁那只空茶盏推到桌心。几个人分完一壶茶才散。那天谁也没有再提“第二批新人”。她们已经各自成了宫里的人。`
  ],choices:[{label:'喝完这壶茶再散',effects:{trust:{liang2:1,song2:1,zhangyuanzhao:1,afu:1},flags:{v67SecondBatchSettled:true}},result:'红毡已经卷走，桌上只剩三个活人的杯子和一个没有再摆回来的位置。'}]});

  // E. 大封正文名册补“第二批采选”和“不在位分册的人”，让人物真的被点到。
  const roster=snow?.steps?.find(x=>(x.heading||'').includes('红旨落定以后')||(x.heading||'').includes('大封后'));
  append(roster,'v67RosterExtra',s=>{
    const sec=['zhangyuanzhao','liang2','song2','xu2'].filter(k=>PEOPLE?.[k]);
    const secTxt=sec.map(k=>`${ptitle(s,k)} ${pname(k)}${/^故/.test(String(s.ranks?.[k]||''))?'（另册追记）':''}`).join('；');
    const afuTitle=s.flags?.fangDead?'尚宫局传簿女史':'听雨轩宫女';
    return [`<div class="v67-name-list"><h4>第二批采选</h4><p>${secTxt||'—'}</p><h4>不在六宫位分册内、却仍在主线里的人</h4><p>养心殿总管 裴景和；御前侍卫统领 谢绍庭；${afuTitle} 阿芙${s.flags?.fangDead?'；她已从听雨轩调入尚宫局，专管交接与传簿':''}。</p></div>`];
  });

  // F. 和妃×张后：如果本局和妃有皇嗣，由孩子撞见；主控不替张后判，而让她自己承担。
  const late=CH('帘后朱笔');
  addAfter(late,'灯下三个人都知道这件事太好用了',{v67id:'shen-child-discovers',heading:'九月十五，永和宫那声“元照”被孩子听见了',cast:['emperor','zhangyuanzhao','shen'],fx:'candle',narrative:true,text:s=>{
    const c=shenChild(s);
    if(!c)return [
      `这一年永和宫没有年幼皇嗣在夜里来敲门。张元照与沈知微之间那层从来没有写进宫册的亲近，因此又藏过了一个秋天。`,
      `它没有因此更安全，只是暂时没有第三个人必须替她们理解。`
    ];
    const cl=childLabel(c);
    return [
      `九月十五夜，${cl}做完功课后去永和宫找母妃。值门宫女说皇后娘娘在里面，本想让孩子先回，他却已经从侧廊绕到暖阁外。`,
      `窗没有关严。里面没有外朝折子，也没有宫务册。沈知微刚病过一场，披着薄衣坐在榻边。张元照替她把药碗挪远，低声说：“知微，先把这一口喝了。”`,
      `沈知微皱眉：“元照，你今日比太医还烦。”`,
      `${cl}站在门外没有进去。孩子已经懂得一件很简单的宫规：母妃不能这样叫皇后，皇后也很少亲手替一位妃子掖被角。`,
      `第二日，他来养心殿时一路都很安静。等裴景和退下，才问我：“父皇，皇后娘娘是不是……很喜欢母妃？”`,
      `我没有立刻答。`,
      `“母妃也喜欢她。”孩子补了一句，像怕自己只说了一半。`,
      `我这才知道，永和宫灯下还有许多我没见过的日子。可我没有问她们从什么时候开始，也没有问“到底发生过什么”。`,
      `我只问张元照三件事：“有没有逼宫人替你们遮掩？有没有拿中宫的权替永和宫开过不该开的门？有没有叫孩子替你们守秘密？”`,
      `她一项项答：“没有。”`,
      `“那朕不替你判。”我把那张没有写字的纸推过去，“你是皇后。往后怎样相处，怎样同孩子说明，你们自己想清楚。别到最后叫旁人替你们担着。”`,
      `<div class="v67-child"><b>御前没有把这段私情直接写成罪名，也没有一句话说成“无事”。</b>宫礼、宫权和孩子知情后的安排，仍要由张元照自己处理。</div>`
    ];
  },choices:[{label:'“你自己定。定完以后，只告诉朕边界是什么。”',hint:'不是替她们遮掩，也不是替她们定罪。',v67ChildDiscovery:true,result:s=>{
    const c=shenChild(s);if(!c)return '这一局永和宫没有皇嗣撞见。那一层私情仍只存在于她们自己知道的地方。';
    return `张元照当晚没有写宫规。她先去永和宫，同沈知微一起把${childLabel(c)}叫到灯下。她只说三件事：孩子不必替任何大人说谎；在宫礼上称谓照旧；她们的私情不得改变宫务、御前与皇嗣应有的边界。孩子听完只问：“那我还能照旧叫娘娘么？”张元照答：“当然。”`;
  }}]});

  // 东窗事发后的真正痛点：处分的是机务越界，不是她们彼此喜欢；孩子不能背“是不是我害了母妃”的罪。
  const sacrifice=late?.steps?.find(x=>(x.heading||'').includes('新茶停在两个人中间'));
  append(sacrifice,'v67ChildAftermath',s=>{
    const c=shenChild(s);if(!c||!s.flags?.v67ChildFoundLove)return [];
    return [
      `处分宣下以后，${childLabel(c)}在永和宫门外等张元照。孩子脸色发白，第一句便问：“是不是因为那天我告诉父皇？”`,
      `张元照停住脚。`,
      `“不是。”她说，“你看见的那件事，没有写进这道处分里。”`,
      `“那母妃为什么要走？”`,
      `“因为她留了不该留的朝廷机务副稿。那是另一件事。”`,
      `孩子盯着她看了很久，像第一次知道大人的世界里，两件都很痛的事也必须分开。`,
      `张元照没有说“你以后会懂”。她只把永和宫的钥匙交回掌事：“今日先陪你母妃。”`
    ];
  });

  // G. 选择效果：阿芙转岗、孩子发现关系。
  const oldApply=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldApply&&!globalThis.__v67ApplyWrapped){
    globalThis.__v67ApplyWrapped=true;
    applyChoiceEffects=function(c){const out=oldApply(c);
      if(c?.v67AfuTransfer){state.flags=state.flags||{};state.flags.v67AfuTransferred=true;if(PEOPLE?.afu){PEOPLE.afu.title='尚宫局传簿女史';PEOPLE.afu.home='尚宫局值房';PEOPLE.afu.tags=['旧案幸存者','记交接人名','不替人判断'];}}
      if(c?.v67ChildDiscovery&&shenChild(state)){state.flags=state.flags||{};state.flags.v67ChildFoundLove=true;out.push('和妃皇嗣撞见张后与沈知微私情 · 张后自行定界');}
      return out;
    };
  }

  // H. 人物录：阿芙续上；梁宋许的识别点写得更像人而不是功能说明。
  const oldPeople=typeof peopleView==='function'?peopleView:null;
  if(oldPeople)peopleView=function(){
    if(state.flags?.fangDead&&PEOPLE?.afu){PEOPLE.afu.title='尚宫局传簿女史';PEOPLE.afu.home='尚宫局值房';PEOPLE.afu.tags=['从听雨轩留下来','只记经手人','小灰跟着她'];PEOPLE.afu.bio='方小满死后，她没有回花房，也没有投到另一位主子门下，而是进尚宫局传簿房。她不查案、不判人，只坚持所有交接都写清“谁交给谁”。第二批新人入宫、许淑惠身后名牌和秋疫送药册，都因此与她重新相连。';}
    if(PEOPLE?.liang2){PEOPLE.liang2.tags=['东南水师','桐油绳','潮气先于规矩'];PEOPLE.liang2.bio='梁素贞从东南水师家庭进宫，箱笼一直用一段发黑的桐油绳，不爱红绸死结。她摸弓先摸潮气，遇事也一样：先看风往哪里吹，再决定弦该绷多紧。她敬霍素英，却最讨厌别人叫她“第二个霍氏”。';}
    if(PEOPLE?.song2){PEOPLE.song2.tags=['江南漕运','三张单','永远留第二条路'];PEOPLE.song2.bio='宋文秀看见散单就想叠齐、合并，最初真心相信“统一才不容易出错”。冰库与崔氏旧网让她吃过亏以后，她仍爱效率，却开始强迫自己的每一套办法至少留第二条路。';}
    if(PEOPLE?.xu2){PEOPLE.xu2.tags=['礼数数三遍','左脸酒窝','名牌回了家'];PEOPLE.xu2.bio='许淑惠终选时行错过一次礼，此后每进一扇高位宫门都在心里数三遍。真正熟了以后，她却最会拿那次出丑逗自己笑。疫中她没有留下惊天遗言，只问名牌会不会送错家；阿芙后来亲手核了三遍。';}
    return oldPeople();
  };

  // I. 卷终人物志：清掉二批新人和阿芙的占位腔，并把和妃/张后的经典句换成终局真正留下的句子。
  const oldEnding=typeof ending==='function'?ending:null;
  function cardReplace(h,name,fate,quote,newTitle){
    const re=new RegExp(`(<article class="v55-chronicle-card"><h3>)([^<]*·\\s*${name})(<\\/h3><p class="fate">)[\\s\\S]*?(<\\/p><blockquote>)[\\s\\S]*?(<\\/blockquote>)`);
    return h.replace(re,(m,a,b,c,d,e)=>`${a}${newTitle||b}${c}${fate}${d}${quote}${e}`);
  }
  if(oldEnding)ending=function(){
    if(state.flags?.fangDead&&PEOPLE?.afu){PEOPLE.afu.title='尚宫局传簿女史';PEOPLE.afu.home='尚宫局值房';}
    let h=oldEnding();
    h=h.replace('<h1>空宫已点灯</h1>',state.flags?.v44NewEmpress?'<h1>宫灯仍未眠</h1>':'<h1>空宫已点灯</h1>');
    h=h.replace('这十四年真正走过的六段路','这些年真正走过的七段路');
    h=h.replace('</ol></section>',`<li><b>帘后朱笔：</b>继后之后，张元照开始协理章奏，沈知微成为她最信任的掌笔。两个人越常替御前办事，能碰到的机密越多。私情、孩子和公事撞到一起以后，张元照必须亲自处理沈知微的过错。</li></ol></section>`);
    h=cardReplace(h,'阿芙','方小满死后，阿芙没有随听雨轩一起消失。她转入尚宫局传簿房，从第二批新人进宫一直做到秋疫与大封以后；她不负责判断真相，只负责让“谁把东西递给谁”再也不是一句含糊话。','“别写‘经手一人’，写名字。”','尚宫局传簿女史 · 阿芙');
    h=cardReplace(h,'梁素贞','梁素贞从第二批采选留下。她没有成为第二个霍素英，也没有把军门出身变成唯一性格；宫里最后记住的是那段总能一抽就开的桐油绳，和她遇事先摸一摸“潮气”的习惯。','“海边的东西，先得经得住潮。”');
    h=cardReplace(h,'宋文秀','宋文秀从“把三张单并成一张”走到“任何一条好用的路都必须留第二条”。她仍然爱省事，只是不再把省事误认成没有代价。','“省一道手可以，别省掉第二条路。”');
    h=cardReplace(h,'许淑惠','许淑惠没有活过承熙十一年的秋疫。她留下的不是功业，而是一次终于不必再行的礼、一个笑起来才看得见的酒窝，以及一块确实送回自己家门的名牌。','“娘娘说了别行礼，那臣妾这回就不数了。”');
    h=cardReplace(h,'沈知微',state.flags?.v66ShenSacrificed?'沈知微曾是张后最信任的御前掌笔，也是中宫私下唯一不用解释来处的人。私情本身没有成为罪名；真正让她退出御前的，是她为保存原样而私留机务副稿。':'沈知微的旧案已经落卷。她后来最珍贵的关系不是旧情复燃，而是终于有人允许她记得过去，也允许她把茶换新。','“这两件事可以同时是真的。”');
    h=cardReplace(h,'张元照',state.flags?.v44NewEmpress==='zhangyuanzhao'?'张元照受凤印以后开始协理章奏。她的私情被沈氏皇嗣撞见时，主控没有替她定罪，而让她自己划边界；后来机务案真正爆发，她也没有拿这段感情替沈知微开例外。':'张元照没有受凤印，但她仍把“谁能替谁决定”这件事带进了宫里。','“是臣妾下的，就写臣妾下的。”');
    return h;
  };

  // J. 大事录补阿芙与“孩子撞见”的实际回声。
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron)chronicleView=function(){return oldChron();};

  state.flags=state.flags||{};state.flags.v67Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v67 patch failed',e)}})();
