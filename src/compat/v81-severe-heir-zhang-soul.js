(()=>{try{
  document.documentElement.dataset.build='v81';
  document.title='宫灯未眠 · 严教远藩与元照权力主题 v81';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const IDX=(c,q)=>c?.steps?.findIndex(x=>String(x.heading||'').includes(q))??-1;
  const A=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const flags=()=>state.flags||(state.flags={});

  // 1) 现有“三皇子严教”选择改成真正的长期后果入口。
  const growth=CH('长枝渐高');
  const princeStep=ST(growth,'三皇子已经十八');
  if(princeStep){
    const strict=(princeStep.choices||[]).find(c=>c?.effects?.flags?.v47PrinceEducation==='strict'||String(c.label||'').includes('两名不同路数的师傅'));
    if(strict){
      strict.label='照最严宗室教法：两师同教，半年内不准自行停课换师';
      strict.hint='太傅：“殿下聪明，才更不能只读自己愿意读的那一页。”';
      strict.effects=strict.effects||{};strict.effects.flags=strict.effects.flags||{};
      strict.effects.flags.v47PrinceEducation='strict';strict.effects.flags.v81SevereEducation=true;strict.effects.flags.v155SevereArcChosen=true;
      strict.v81SevereEducation=true;
      strict.result='旨意定的是半年。三皇子接旨，只问了一句：“半年以后呢？”我答：“半年以后再看。”';
    }
  }

  function severePrinceScenes155(){
    const first={v81SeverePrince:true,heading:'承熙十四年冬 · 半年早就到了',cast:['emperor'],fx:'snow',narrative:true,text:s=>[
      `东所的灯每天卯初以前就亮。冬天窗纸还是黑的，廊下已经能听见顺谦背书。`,
      `两名师傅一文一武。策论漏一条旁证，晚饭后重写；骑射失手，第二日文课照旧不减。原先的旨意只说半年不得换师。九月期限到了，太傅把课簿送来：策论甲等，骑射甲等，迟课一次也没有。`,
      `我看完，在末页写了四个字：“再行半年。”`,
      `顺谦来谢旨，站得比从前更直。`,
      `“累不累？”我问。`,
      `“儿臣尚可。”`,
      `“晚膳想吃什么？”`,
      `他停了一下：“照膳房的例。”`,
      `以前他最讨厌羊乳羹。那天桌上正好有一碗，他也一口没剩。`,
      `第二年开春，太傅又送来一册更漂亮的功课。我又写了一次“再行半年”。`
    ],choices:[{label:'继续',effects:{flags:{v81StrictExtended:true}},result:''}]};

    const warm={v81SeverePrince:true,heading:'承熙十五年九月 · 四公主把蓝鸟哨塞进他书里',cast:['emperor'],fx:'wind',narrative:true,text:s=>[
      `太后午睡时，四公主抱着书跑到东所。顺谦正在抄第三遍《河渠问》，桌角放着冷掉的饭。`,
      `她从袖里摸出一只<span class="v81-bluebird">蓝玻璃海鸟哨</span>，是黛拉教孩子们喊“维拉”那年留下的。`,
      `“哥哥，给你。”`,
      `顺谦没接：“先生说玩物乱心。”`,
      `“这不是玩物。风来了才吹。”四公主一本正经，“珂兰人说的。”`,
      `“珂兰人还说过什么？”`,
      `“说你太不会玩。”`,
      `顺谦终于笑了一下。他把鸟哨接过去，藏在厚厚的策论底下。`,
      `窗外真起了一阵风。四公主催他：“吹一下。”`,
      `他看了看门口，极轻地吹了一声。声音很短，像一只鸟从窗纸后飞过去。`,
      `师傅回来以前，他已经重新低头写字。四公主走时把门带得很慢，没有告状。`
    ],choices:[{label:'继续',effects:{bond:{emperor:1},flags:{v81BlueBirdWithPrince:true}},result:''}]};

    const leave={v81SeverePrince:true,heading:'承熙十六年三月 · 三皇子来求最远的封地',cast:['emperor'],fx:'rain',keyDecision:true,text:s=>[
      `三月初七，顺谦没有带课簿来养心殿。他带的是宗人府藩图。`,
      `他把最西边的朔川点给我看：“儿臣想去这里。”`,
      `“你是现存长子。”`,
      `“儿臣知道。”`,
      `“你从前一直想旁听朝议。”`,
      `“从前想。”`,
      `“现在为什么不想？”`,
      `他沉默很久，才说：“在京城，儿臣说喜欢马，别人记儿臣尚武；说喜欢书，别人说像母后；多问一句河工，他们猜储位；不说话，又有人说儿臣有城府。”`,
      `“你要朕把这些人都赶走？”`,
      `“不要。”他摇头，“儿臣想把自己挪远一点。”`,
      `“朔川也会有人叫你皇子。”`,
      `“那至少没人认识儿臣小时候吃不吃羊乳羹，也没人知道儿臣答错第一道策问时看了谁一眼。”`,
      `他把藩图往前推了一寸：“儿臣不带东所旧人，不带两位师傅。藩府该有的属官照例给，别的都不要。”`,
      `我看着那张图。半年前、再半年、再半年——每一次续下去的旨意都有我的字。`
    ],choices:[
      {label:'“准。朔川给你。三年内非大丧，不必回京。”',effects:{trust:{emperor:1},flags:{v81PrinceLeaves:true,v81PrinceLeaveMode:'clean'}},result:'顺谦叩首。这一次他说的是“谢父皇”，不是“儿臣遵旨”。'},
      {label:'“等到秋天。陪朕过完你母后的忌辰，再走。”',effects:{bond:{emperor:2},flags:{v81PrinceLeaves:true,v81PrinceLeaveMode:'autumn'}},result:'顺谦想了很久，答：“好。秋天以后，父皇别再留儿臣。”'},
      {label:'“顺谦，你怨朕么？”',effects:{trust:{emperor:2},flags:{v81PrinceLeaves:true,v81PrinceLeaveMode:'asked'}},result:'他答：“怨过。后来每天都有人问儿臣该怎么做，连怨也像一道功课。儿臣不想再靠它过日子。”我把藩图合上：“去吧。”'}
    ]};

    const gate={v81SeverePrince:true,heading:'承熙十六年九月至十七年正月 · 他把蓝鸟哨留在了宫里',cast:['emperor'],fx:'wind',narrative:true,text:s=>[
      `顺谦离京那日没有大宴。朔川太远，车马从西华门出去以后，要走很久。`,
      `他按自己的请求，一个东所旧内侍也没有带。两位教了他三年的师傅站在门内，他依礼行完学生礼，没有请他们同行。`,
      `四公主追到最后一道宫门，把那只蓝玻璃鸟哨塞回他手里：“带着。朔川也有风。”`,
      `顺谦低头看了一会儿，又放回她掌心。`,
      `“你留着。”`,
      `“为什么？”`,
      `“你在宫里还会遇到风。”`,
      `他说完上车，没有再回东所取东西。顾明宜留下的旧名册、少年时的弓、那张第一次旁听河工的座椅，全留在京里。`,
      `第二年正月，朔川送来第一封平安折。没有谈朝政，也没有请恩，只写：“朔川风大。儿臣无恙。”`,
      `纸到这里就没有下一页。`
    ],choices:[{label:'收起平安折',effects:{flags:{v81PrinceOpenEnding:true}},result:''}]};

    return [first,warm,leave,gate].map(st=>({...st,heading:st.heading.replace(' · ','回望 · '),v155SeverePrince:true}));
  }
  globalThis.v155SeverePrinceScenes=severePrinceScenes155;

  // 2) 张元照后期：她不再被写成“不得不掌权”的道德化强人，她明确承认自己喜欢权力。
  function installZhangSoul(){
    const late=CH('帘后朱笔'); if(!late||late.steps?.some(x=>x.v81ZhangSoul))return;
    late.steps.push({v81ZhangSoul:true,heading:'承熙十六年春 · 她把凤印压在弹章上',cast:['emperor','zhangyuanzhao'],fx:'candle',keyDecision:true,text:s=>{
      if(flags().v44NewEmpress!=='zhangyuanzhao')return [`这一局张元照没有受凤印。养心殿也没有这场夜谈。`];
      const sh=flags().v75ShenFate;
      return [
        `都察院那天递来一封很长的弹章。没有新的罪证，只把这些年的旧事串在一起：顾皇后薨、邵氏退印、女史新制、沈知微获罪、皇后分折章奏。`,
        `其中一句写得最难听：“张后起于新选，终据中宫，所经变故皆为进身之阶。”`,
        `我问她：“留中不发？”`,
        `张元照把折子从头看到尾，把凤印压在纸角：“不用。让他写。”`,
        `“不生气？”`,
        `“生气。”`,
        `“那你怎么想？”`,
        `她抬头：“他们总觉得一个女人站得高了，就该多失去几个人、多吃几场苦，才算把这位置付清。”`,
        `“你觉得不是？”`,
        `“不是。”`,
        sh==='death'?`她停了一下：“知微那杯茶，臣妾会记一辈子。”`:sh==='fief'?`她停了一下：“知微走西华门那天，臣妾也没有觉得自己赢了什么。”`:sh==='religion'?`她停了一下：“知微进女观那天，臣妾在门外站了很久。”`:`她停了一下，没有拿任何人的名字替自己辩。`,
        `“可那些人的死、离开、受罚，不是拿来买凤印的银子。”`,
        `我问：“你喜欢手里的权？”`,
        `“喜欢。”她答得很快。`,
        `“喜欢什么？”`,
        `“喜欢一张旧例摆到面前时，臣妾有资格说‘改’。喜欢一个姑娘说‘我不愿意’，这句话不用先找个男人替她作证。也喜欢那些拿‘祖宗一直这样’堵人的人，被叫回来再把理由说一遍。”`,
        `“权也会伤人。”`,
        `“臣妾知道。臣妾也伤过人。”`,
        `“还要？”`,
        `“要。”`,
        `她把凤印从弹章上拿起来：“臣妾有后悔的事。坐到这里，不是其中一件。”`,
        `我伸手去拿御案边那碟蜜枣。她顺手把碟子往自己那边挪了一尺。`,
        `“朕现在知道你说喜欢权是什么意思了。”`,
        `“陛下知道得不晚。”`
      ];
    },choices:[
      {label:'“朕从没要你装作不喜欢。”',effects:{bond:{zhangyuanzhao:2},flags:{v81ZhangPowerAccepted:true,v81EmperorReply:'accept'}},result:'张元照把那封弹章重新折好，第二日照常送进史馆副档。'},
      {label:'“喜欢权可以。别喜欢别人怕你。”',effects:{trust:{zhangyuanzhao:3},flags:{v81ZhangPowerAccepted:true,v81EmperorReply:'fear'}},result:'她看我一眼：“臣妾若哪天开始只喜欢别人闭嘴，陛下记得先说。”'},
      {label:'“那就继续做。做错了，别躲。”',effects:{trust:{zhangyuanzhao:4},flags:{v81ZhangPowerAccepted:true,v81EmperorReply:'own'}},result:'她点头：“好。”没有再说漂亮话。'}
    ]});
  }

  // 3) 选择发生时安装后续，不让未走到该分支的玩家看到无关场景。
  const oldApply=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const out=oldApply(c);
    if(c?.v81SevereEducation||c?.effects?.flags?.v81SevereEducation||flags().v81SevereEducation){flags().v81SevereEducation=true;}
    if(!globalThis.__canonicalStory155&&(flags().v44NewEmpress==='zhangyuanzhao'||c?.effects?.flags?.v44NewEmpress==='zhangyuanzhao'||c?.effects?.ranks?.zhangyuanzhao==='皇后'))installZhangSoul();
    return out;
  };
  if(flags().v44NewEmpress==='zhangyuanzhao')installZhangSoul();

  // 4) 皇嗣页与大事录只记已经发生的后果。
  const oldChildren=typeof childrenView==='function'?childrenView:null;
  if(oldChildren&&!globalThis.__v81Children){globalThis.__v81Children=true;childrenView=function(){let h=oldChildren();if(flags().v81PrinceOpenEnding){h=h.replace('</main>',`<section class="v81-prince-note"><b>三皇子杨顺谦</b><br>承熙十六年自请远藩朔川。此后不再参与京中朝议；次年只递回一封平安折：“朔川风大。儿臣无恙。”</section></main>`);}return h;}}
  const oldChron=typeof chronicleView==='function'?chronicleView:null;
  if(oldChron&&!globalThis.__v81Chron){globalThis.__v81Chron=true;chronicleView=function(){let h=oldChron();if(flags().v81PrinceOpenEnding)h=h.replace('</main>',`<section class="v81-prince-note"><span class="eyebrow">承熙十六年 · 远藩</span><p>三皇子顺谦在多年严教以后自请离京，就藩朔川。御前准其远行。此后本卷不再有他的朝议记录。</p></section></main>`);return h;}}

  // 5) 张元照人物志最后一句改成她自己真正说过的话。
  const oldEnd=typeof ending==='function'?ending:null;
  if(oldEnd&&!globalThis.__v81Ending){globalThis.__v81Ending=true;ending=function(){let h=oldEnd();if(flags().v81ZhangPowerAccepted){
    h=h.replace(/(<article class="v55-chronicle-card"><h3>[^<]*张元照<\/h3>[\s\S]*?<blockquote>)[\s\S]*?(<\/blockquote>)/,`$1“臣妾有后悔的事。坐到这里，不是其中一件。”$2`);
  }return h;}}

  // 6) 最后一层正文去“作者解释”。人物录、大事录不动；角色对白不动。
  const metaBlock=/<div class="(?:v66-power|v66-crisis|v66-after|v75-kneel)[^"]*">[\s\S]*?<\/div>/g;
  const metaWords=/(?:这|那)(?:一|条|场|幕|段)?(?:线|戏|关系|设定)[^“”]{0,30}(?:意味着|说明|证明|回收|呼应)|真正证明|真正合上|让读者|主题落点|叙事功能|人物功能|作者替|人设弧线/;
  for(const ch of (CHAPTERS||[]))for(const st of (ch?.steps||[])){
    if(!st?.text||st.__v81Scrub)continue;
    const old=st.text;st.text=s=>A(old,s).flatMap(x=>{
      let z=String(x??'').replace(metaBlock,'').trim();
      if(!z)return[];
      if(!/[“”]/.test(z)&&metaWords.test(z))return[];
      return [z];
    });st.__v81Scrub=true;
  }

  state.flags=state.flags||{};state.flags.v81Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v81 severe-heir/zhang-soul patch failed',e)}})();
