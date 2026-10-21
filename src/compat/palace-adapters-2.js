try{voicePrefs.enabled=false;voicePrefs.autoplay=false;if(typeof stopVoice==='function')stopVoice();if(typeof saveVoicePrefs==='function')saveVoicePrefs();}catch(_e){}

const storyV55=storyView;

storyView=function(){let h=storyV55();h=h.replace(/<div class="voice-head-actions">[\s\S]*?<\/div>/g,'').replace(/<button class="voice-mini"[\s\S]*?<\/button>/g,'').replace(/\sdata-voice-line="\d+"/g,'');return h;};

const CLASSIC={
    emperor:'“先听你说。”',taihou:'“你到底是在享福，还是不敢让屋里安静。”',gu:'“钗别给下一位。”',
    shen:'“死人已经等了十年。活人等不了三天。”',zhou:'“宠爱会变，人情走过的路，变得慢一点。”',
    wenheng:'“喜欢会散，赏赐会换人。”',baopu:'“若没有孩子，也没有那一点香，陛下还会记得臣妾么？”',
    hanzhang:'“我只是不想替别人做自己不知道后果的事。”',fang:'“陛下，别皱眉……”',
    shunwang:'“有些恩，收了也不等于把自己交出去。”',zhangyuanzhao:'“若只是今夜不愿独处，臣妾不来。”',
    ning:'“不简单。只是总得有人先说怎么办。”',ke:'“孩子还没落地，别先替他借兵。”',hui:'“所以最不容易出错。”',
    zhao2:'“至少别再晚。”',cao2:'“怕下回又绕。”',lin2:'“我只把他们说的话翻成大家听得懂的。”',
    ye2:'“字写清楚，谁来过就不会变成大概。”',du2:'“先把尺数写成一样，再谈差多少。”',su2:'“孩子先别哭，别的事一会儿再说。”',
    peiyan:'“奴才手滑。”',xielin:'“臣只认值簿、门禁和活口。”',afu:'“我记着，谁进谁出都记一笔。”',chen:'“臣妾只是想把孩子平安生下来。”'
  };

function fateV55(k,s=state){
    const rank=courtTitle(s,k)||PEOPLE[k]?.title||'';
    if(k==='emperor')return `承熙朝天子。到卷终，他留下的不只是裁断，也包括那些曾经选择不再追问的时刻。${s.flags?.final?'结局：'+s.flags.final+'。':''}`;
    if(k==='taihou')return '太后始终没有替皇帝做最后的决定。她护家、有偏爱，也一次次把决定推回该承担的人手里。';
    if(k==='gu')return s.flags?.guDead?'顾明宜以中宫身份终其一生。她一直相信规矩值得修补：出了漏洞便补一条，出了错便再多一道复验。她的可靠正在这里，她的边界也正在这里。':'顾明宜仍居中宫。她会把旧例修得越来越细，却仍习惯先问“有没有成规”，再问自己到底想怎么做。';
    if(k==='shen')return s.flags?.shenVerdict?'沈氏旧案终于落卷。沈知微没有把余生继续献给那一卷纸，而是开始重新过自己的日子。':'沈知微仍在等旧案真正落定。';
    if(k==='zhou')return `周清漪仍以${rank}留在六宫。她最擅长的从来不是夺第一，而是记住人情、孩子与每一次被忽略的细节。`;
    if(k==='wenheng')return s.flags?.wenhengFate==='dead'?'闻人蘅最终以死亡拒绝继续被改写。':s.flags?.wenhengFate==='return'?'闻人蘅离京返蘅地，退出六宫。':s.flags?.wenhengFate==='west'?'闻人蘅退居西苑，不再参与六宫权力中心。':`闻人蘅仍以${rank}留在宫中，在母亲、旧后与政治人质三种身份之间求生。`;
    if(k==='baopu')return s.flags?.baopuDead||s.flags?.baopuPunishment?'闻人抱朴最终为自己一生“必须被看见”的执念付出代价；她不是一夜疯掉，而是一年年把价值都系在被选择上。':`闻人抱朴仍以${rank}留在宫中，她对被看见的渴望仍没有真正停下。`;
    if(k==='hanzhang')return `闻人含章以${rank}留下。她后来并没有变成更厉害的查案人，只是越来越敢先问当事人自己愿不愿意。`;
    if(k==='fang')return s.flags?.fangDead?'方小满死后，听雨轩留下了一个所有人都无法用“照规矩办”解释过去的缺口。':'方小满仍在听雨轩过她具体、热闹又不设防的日子。';
    if(k==='shunwang')return '顺王没有重新回到旧情里。他与沈知微真正的结局，是各自承认过去存在过，却不必重新开始。';
    if(k==='zhangyuanzhao')return s.flags?.v44NewEmpress==='zhangyuanzhao'?'张元照最终受凤印。真正把她送到这里的，不只是疫册，而是她在没有旧例时敢先作决定，事后又肯把自己的名字留下来，让别人知道该向谁追问。':`张元照以${rank}留在六宫。她留下的不只有册子，还有一种很少见的习惯：做决定时不躲，做完以后也不躲。`;
    if(k==='ning')return s.flags?.v44NewEmpress==='ning'?'邵明贞最终受凤印。她接下的是每天必须有人作最后判断的位置，而不是顾明宜的影子。':`邵明贞以${rank}留在六宫，实际承担的宫务往往比名位更重。`;
    if(k==='ke')return `霍素英以${rank}留在宫中。她始终把霍家的军功与自己的日子分开，不愿让皇嗣成为借兵的理由。`;
    if(k==='hui')return `崔静仪以${rank}留在宫中。她真正的代价不在一碗毒，而在那些一次次“少问一句”的选择终于被写成责任。`;
    if(k==='zhao2')return `王静娴以${rank}留在宫中。她从“看懂但挑时候说”走到“看见不对先开口”，终于不再把清醒只留给自己的心里。`;
    if(/^故/.test(s.ranks?.[k]||''))return `${PEOPLE[k]?.name||k}最终止于${rank}。宫册留下位分，身边人记得的却是更具体的小事。`;
    return `${PEOPLE[k]?.name||k}以${rank}留在承熙宫中。她/他的结局没有被一条大事录完全概括。`;
  }

function characterChronicleV55(){
    const keys=Object.keys(PEOPLE).filter(k=>isKnownV55(k));
    return `<section class="v55-character-chronicle"><span class="eyebrow">卷终人物志</span><h2>人散以后，各留一句</h2><p>这里在卷终才打开。每个人只留一句最能代表自己的话，其余交给已经发生过的场景。</p><div class="v55-chronicle-grid">${keys.map(k=>`<article class="v55-chronicle-card"><h3>${safe(courtTitle(state,k)||PEOPLE[k].title)} · ${safe(PEOPLE[k].name)}</h3><p class="fate">${safe(fateV55(k))}</p><blockquote>${safe(CLASSIC[k]||'“这一页已经翻过去了。”')}</blockquote></article>`).join('')}</div></section>`;
  }

function spineV55(){return `<section class="v55-spine"><span class="eyebrow">故事回看</span><h2>这十四年真正走过的六段路</h2><ol><li><b>新朝定宫：</b>潜邸旧人被重新安置，皇后、和妃、太后与主控先学会以新身份相处。</li><li><b>旧国入宫：</b>闻人母女进入宫墙，抱朴、含章、闻人蘅对“留下来”的理解逐渐分裂。</li><li><b>宫灯渐繁：</b>大选、皇嗣、世家与供应网络进入六宫；沈氏旧案和昭氏失子把“真证据也能拼出假结论”推到台前。</li><li><b>两场重创：</b>行刺与方小满案以后，中宫没有放弃规矩，反而把复验、留名与口谕核查织得更密；含章开始盯“证据能不能被改”，和妃更在意“人为什么不敢开口”。三条路从这里真正分开。</li><li><b>时疫与空后：</b>顾明宜薨逝，大封六宫重新安排活人的位置；凤座空着以后，日常里每一个“谁来最后决定”都开始变重。</li><li><b>继后之争：</b>皇嗣成年、皇帝倦怠以后，邵明贞证明自己能在没有旧例时承担最后判断；张元照则多走了一步——她敢先作决定，也肯让自己的决定留下名字、接受追问。凤印最后落向哪一种中宫，由御前裁断。</li></ol></section>`;}

const endingV55=ending;

ending=function(){let h=endingV55();return h.replace('</main>',`${spineV55()}${characterChronicleV55()}</main>`);};

if(typeof historyRecordV38==='function'){
    const histV55=historyRecordV38;historyRecordV38=function(e,i){
      if(e?.title==='雪尽宫门')return '承熙十二年正月，疫后议恤，追录死者；上大封六宫，诸嫔妃各以功、资序、皇嗣与宫务分别进退。';
      if(e?.title==='凤座无人')return '承熙十二年春夏，中宫久虚，宫务多归御前、尚宫及诸高位分理。礼部始正式请立中宫。';
      return histV55(e,i);
    };
  }

if(oldCurrentTitle){const ni=CHAPTERS.findIndex(x=>x.title===oldCurrentTitle);if(ni>=0)state.index=ni;}

syncLateProfilesV55();

const renderV55=render;

render=function(){syncLateProfilesV55();renderV55();document.title='宫灯未眠 · 全线脉络与大封六宫 v55';document.querySelectorAll('.voice-head-actions,.voice-mini,#voice-open').forEach(e=>e.remove());};

const bindV55=bind;

bind=function(){bindV55();document.querySelectorAll('[data-v55spot]').forEach(b=>b.onclick=()=>{const s=globalThis.V55_MAP_SPOTS?.[+b.dataset.v55spot];const info=document.querySelector('#map-info');if(s&&info)info.innerHTML=`<b>${safe(s.name)}</b><p>${safe(s.desc)}</p>`;});};

state.flags.v55Build=true;

try{save()}catch(_e){}

try{render()}catch(_e){}
