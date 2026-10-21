(()=>{try{
  document.documentElement.dataset.build='v114';
  document.title='宫灯未眠 · 皇子女全局人设梳理润色 v114';
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const IDX=(c,q)=>c?.steps?.findIndex(x=>String(x.heading||'').includes(q))??-1;
  const AS=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const F=s=>s?.flags||{};
  const alive=(key,s=state)=>!(Array.isArray(F(s).v46ChildVictims)&&F(s).v46ChildVictims.includes(key));
  const append=(st,tag,fn)=>{if(!st||st[tag])return;const old=st.text;st.text=s=>[...AS(old,s),...fn(s)];st[tag]=true;};
  const insertAfter=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v114id===obj.v114id))return;const i=IDX(ch,q);if(i>=0)ch.steps.splice(i+1,0,obj)};
  const insertBefore=(ch,q,obj)=>{if(!ch?.steps||ch.steps.some(x=>x?.v114id===obj.v114id))return;const i=IDX(ch,q);if(i>=0)ch.steps.splice(i,0,obj);else ch.steps.push(obj)};
  const wrapResult=(c,tag,fn)=>{if(!c||c[tag])return;const old=c.result;c.result=s=>fn(typeof old==='function'?old(s):old,s);c[tag]=true;};

  function syncChildren(s=state){
    if(typeof CHILDREN==='undefined')return;
    if(CHILDREN.shunqian){
      CHILDREN.shunqian.note='现存长子，顾明宜亲生。聪明、反应快，小时候身边人常替他把出错后的场面收好，所以他容易觉得答得快就够了。成年以后，他得学会把第二页也看完，遇到不知道的事就承认不知道，也得想清自己是不是真的想走储君那条路。';
      CHILDREN.shunqian.signature='被问住时先抿住嘴；真正服气以后会把第二页重新拿回来自己看。';
    }
    if(CHILDREN.ruoxi){
      CHILDREN.ruoxi.order='大公主';
      CHILDREN.ruoxi.note='故宁嫔苏氏所生，由顾明宜抚养长大。她太早学会照顾弟妹、记住所有人的需要，“懂事”既是本领也是负担。顾明宜死后，她第一次在张元照那里发现：自己可以做错一片竹叶、喜欢木工和风轮，也可以先问“我想做什么”，而不必永远先做谁的女儿、姐姐。';
      CHILDREN.ruoxi.signature='进门先看弟妹有没有坐好；被问到自己想要什么时，反而会慢半拍。';
    }
    if(CHILDREN.twinGirl){
      CHILDREN.twinGirl.order='二公主';
      CHILDREN.twinGirl.note='周清漪所出的双生女。她很会看场面，也很会在尴尬时替所有人找台阶，这是从母亲身上学来的生存技巧。她真正需要学的是：不必每一次都替别人圆场，也不能因为一个人“说话不绕”就把诚实与可信当成同一件事。陆既明旧案最终逼她第一次把自己的愤怒放在所有人的体面前面。';
      CHILDREN.twinGirl.signature='席间冷下来时最先开口换话题；真正生气时反而一句圆场的话都没有。';
    }
    if(CHILDREN.twinBoy){
      CHILDREN.twinBoy.note='周清漪双生男婴。若御前准其留在玉牒，他从小最厌烦别人先看他的浅色眼睛和右手；比起骑射宴饮，他更愿意拆坏锁、拼铜扣。他不需要向谁证明那只手“也能做什么”。若有一天他不再一进人群就先把右手藏起来，已经够了。';
      CHILDREN.twinBoy.signature='人多时把右手收进袖里；遇到坏掉的器物却会忘记遮。';
    }
    if(CHILDREN.fifthPrincess){
      CHILDREN.fifthPrincess.order='三公主';
      CHILDREN.fifthPrincess.note='低位生母所出的皇女。她小时候最常听见母亲问“可不可以自己养”“可不可以留下”，因此自己拿一块点心也会先看大人的脸。她不是怯弱，只是比别的孩子更早知道位分会改变一句话能不能直接说。长大一点以后，她开始练习不为每件属于自己的小事先请允许。';
      CHILDREN.fifthPrincess.signature='伸手以前常先问一句“可以吗”；得到肯定以后记得很牢。';
    }
    if(CHILDREN.fourthPrince){
      CHILDREN.fourthPrince.note='霍素英所出的皇子。好胜，但输掉以后很少赖账，只会要求“再来一次”；霍素英也从不拿“孩子还小”替他解释。若三皇子远藩，他会第一次发现：从前“可以再来一次”的弟弟，忽然被所有人要求一次都不能错。';
      CHILDREN.fourthPrince.signature='输了先看自己哪里慢，再问能不能重来；最讨厌别人替他说“他还小”。';
    }
    if(CHILDREN.sixthPrincess){
      CHILDREN.sixthPrincess.order='四公主';
      CHILDREN.sixthPrincess.note='邵明贞所出的皇女，从小在慈宁宫听过太多“旧例”“规矩”“照章”。她最大的本事是会问一句所有大人已经懒得问的话：为什么？她总爱追问“为什么”。这能问出旧规矩里的毛病，也会让人难堪。长大以后，她还得学会问一句：这件事最后会落到谁身上。';
      CHILDREN.sixthPrincess.signature='听见“从来如此”会立刻抬头；问完以后常忘了大人为什么突然安静。';
    }
  }
  syncChildren();

  // 1. 家宴：同一桌上的孩子不是“皇嗣群像”，而是几种已经长出来的生活方式。
  const growth=CH('长枝渐高');
  const table=ST(growth,'家宴席间，诸子女渐长');
  append(table,'__v114Table',s=>{
    const out=[];
    if(F(s).fifthPrincessBorn&&alive('fifthPrincess',s))out.push(`三公主杨宁矣伸手去拿橘子，指尖碰到盘沿又停下来：“这个我可以拿吗？”大公主看她一眼，把整盘往她面前推：“你想吃就拿。不是每一盘东西都要先问是谁的份例。”她想了一会儿，才拿了最小的一个。`);
    if(F(s).fourthPrinceBorn&&alive('fourthPrince',s))out.push(`杨顺恭和侍读赌投壶，第一轮输了。他没有闹，只自己去把歪掉的箭捡回来：“再来。”霍素英隔着半桌说：“输了就是输了。再来是下一局。”他点头，第二局果然先重新算距离。`);
    if(F(s).sixthPrincessBorn&&alive('sixthPrincess',s))out.push(`杨晏尔听见宁矣问“可以吗”，忽然插嘴：“她也是父皇的女儿，为什么拿橘子要先问？”桌上静了一息。邵明贞只道：“因为有人从小听见的话不一样。”晏尔还想追问，大公主把剥好的橘子塞给她：“先吃。这个问题别忘，改天再问。”`);
    return out;
  });

  // 2. 三皇子：把聪明、被保护和后来的越界/远藩串成同一条线，不把顾明宜写成唯一原因。
  const prince=ST(growth,'三皇子已经十八');
  append(prince,'__v114PrinceCore',s=>[
    `顺谦小时候不是没挨过训。只是他身份太重，母后、师傅、内侍总会下意识先把最难看的部分收起来：错字重誊，摔坏的东西先撤，外臣面前能不让他丢脸便不让。顾明宜是在护孩子，也是在护中宫的嫡子。久而久之，他真正不熟悉的不是失败，而是失败之后没有人替他把场面变得好看。`,
    `所以我现在要教他的，不只是河工、兵法或礼制。是有人说“不”以后，他能不能坐在那里把后半句听完。`
  ]);
  if(prince){
    for(const c of prince.choices||[]){
      const mode=c?.effects?.flags?.v47PrinceEducation;
      if(mode==='strict')wrapResult(c,'__v114r',base=>`${base}<br><br>三个月后，他第一次在策论末尾写了四个字：“儿臣不知。”太傅没有夸，只把下一册递给他。`);
      if(mode==='public')wrapResult(c,'__v114r',base=>`${base}<br><br>第三次旁听时，他被问到没看过的漕运旧数，停了很久才说“容儿臣看第二页”。这句话没有让满殿人笑，反而让记录官照实写了下来。`);
      if(mode==='indulged')wrapResult(c,'__v114r',base=>`${base}<br><br>他并没有因此立刻变坏。只是东所里越来越少有人愿意做那个让他扫兴的人；连真正不同意的，也开始先把话说成“殿下所见极是，只是……”`);
    }
  }

  // 3. 大公主：她的成年不是“更懂事”，而是终于拥有与照料别人无关的兴趣和选择。
  const fan=ST(CH('荷风满座'),'大公主借走一阵风')||ST(CH('窗开半扇'),'大公主借走一阵风');
  append(fan,'__v114EldestWant',s=>[
    `那年以后，她在自己的书匣里多放了一张很小的纸，写的不是妹妹尺寸、乳母咳嗽或谁该添冬衣，只写“想做的东西”。第一行是风轮，第二行是能自己合上的书架门。纸只写给她自己看。`
  ]);

  const west=CH('西华门外');
  insertBefore(west,'二公主的婚帖第一次摆到她自己面前',{
    v114id:'eldestOwnLife',heading:'承熙十七年秋 · 大公主没有把“懂事”当成婚期',cast:['emperor','zhangyuanzhao'],fx:'wind',narrative:true,text:s=>[
      `大公主二十一岁那年，礼部又送来两张婚帖。她看完以后自己收进抽屉，没有立刻退，也没有叫人准备合八字。`,
      `我问：“都不喜欢？”`,
      `“还不知道。”她答，“可他们都写儿臣持重、孝悌、善理内事。像是在挑一个会替他们把一家人照顾好的长媳。”`,
      `“这不是坏话。”`,
      `“不是。”她点头，“可儿臣不想因为很会照顾人，就嫁去继续照顾另一屋子的人。”`,
      `她随后拿出另一张纸，是宗室女学准备添的木工课与器具清单。风轮、书架、纺车模型，画得比婚帖乱得多。`,
      `“儿臣不是不嫁。”她说，“只是婚事等到儿臣真的想同一个人过日子再说。这个先做。”`,
      `我忽然想起她十五岁时在景阳宫折断的两根竹条。那天没有人夸她懂事。她却笑得比任何一次受夸都响。`
    ],choices:[{label:'“女学的小工房由你自己拟章程。”',effects:{flags:{v114EldestWorkshop:true}},result:'礼部没有因为这句话撤婚帖。大公主也没有因为婚帖停下手里的木工图。两件事第一次不必互相取代。'}]
  });

  // 4. 二公主与陆既明：她最会替所有人圆场，旧血案后第一次拒绝替任何人收拾体面。
  if(west){
    const reveal=ST(west,'他自己把西华门那一夜送到御前');
    if(reveal&&!west.steps.some(x=>x.v114id==='twinSisterAftermath')){
      const i=west.steps.indexOf(reveal);
      const after={v114id:'twinSisterAftermath',heading:'三月初十 · 二公主这一回没有替任何人圆场',cast:['emperor','zhangyuanzhao','yinprince'],fx:'candle',narrative:true,text:s=>{
        const fate=F(s).v69PrincessFate;
        if(fate==='convent')return [
          `二公主只被告知陆氏冒籍、婚议作废。她坐在养心殿里听完，第一句却是：“还有什么没告诉我？”`,
          `没有人立刻答。她看了一圈，忽然笑了一下——正是她从前替别人救场时那种笑。`,
          `“又是这样。”她说，“你们每个人都先想我知道多少比较好，再来问我能不能承受。”`,
          `这一次她没有换话题，也没有替谁把场面圆回去。她起身告退，门关上以后，殿里仍旧难看。`
        ];
        return [
          `真相告诉二公主以后，她很久没有哭。她先问周清漪是什么时候知道，又问陆既明从什么时候知道自己是谁。每一个日期都问得很清楚。`,
          `最后她只要求见陆既明一次。宗人府的人都在，门没有关。`,
          `陆既明说：“我没有真的想娶你。”`,
          `二公主看着他：“你觉得这句话是在让我好受一点？”`,
          `他没答。`,
          `“你最恨的是别人替你写成‘没活过’。”她声音很稳，“可你拿我的婚帖替你写答案。你知道我是谁，知道我会怎么想，还是替我决定了这点伤可以拿来用。”`,
          `陆既明低下眼：“是。”`,
          `她没有骂他，也没有替母亲解释。过了一会儿，只说：“今天谁都别让我懂事。”`,
          `她起身走了。屋里没有一个人敢叫她回来把话说圆。`
        ];
      },choices:[{label:'让她自己离开这一间屋',effects:{flags:{v114TwinPrincessOwnAnger:true}},result:'二公主走出宗人府时没有回头。她第一次不需要确认屋里剩下的人是不是都还体面。'}]};
      west.steps.splice(i+1,0,after);
    }
  }

  // 5. 杨顺恭若在三皇子远藩后成为储君：让“再来一次”的孩子第一次面对没有重来的位置。
  const finalCh=CH('万家灯火');
  const heirStep=ST(finalCh,'储位终于写进密匣');
  if(heirStep&&!heirStep.__v114Heir){
    const old=heirStep.text;
    heirStep.text=s=>{
      const a=AS(old,s).map(String);
      if(F(s).v81PrinceOpenEnding){
        const ix=a.findIndex(x=>x.includes('杨顺恭十六岁'));
        const extra=[
          `顺恭被召来以前还在射圃。他进门时先问：“三哥不回来，所以轮到儿臣？”`,
          `我说：“不是轮到。是朕最后选了你。”`,
          `他沉默一会儿：“从前儿臣输了还能说再来一次。”`,
          `“以后也会输。”`,
          `“可他们会不会不让儿臣再来？”`,
          `我没有骗他：“会有人这样。”`,
          `他低头看着密匣，第一次没有立刻说“那就再来”。`
        ];
        a.splice(ix>=0?ix+1:a.length,0,...extra);
      }
      return a;
    };
    heirStep.__v114Heir=true;
  }

  // 6. 陆既明人物卡：受害者与加害者必须同时成立。
  function syncHiddenPrince(s=state){
    if(typeof PEOPLE==='undefined'||!PEOPLE.yinprince)return;
    if(F(s).v69HiddenPrinceRevealed){
      PEOPLE.yinprince.title='周氏双生旧子 · 无玉牒位分';
      PEOPLE.yinprince.tags=['被抹去的旧子','宫外长大','把婚议当成武器'];
      PEOPLE.yinprince.bio='承熙元年周清漪所生双生男婴。死令之后被内侍违旨救出，改姓陆长大。他最恨别人用四个字替自己写完一生，因此执着于纸证、旧籍与经手痕迹；可复仇时，他又把双生姐姐的婚帖当成逼皇室回头的工具。被人夺走选择是真，他后来夺走姐姐一部分选择也是真。他拒绝补一个迟到的皇子名分。';
      PEOPLE.yinprince.signature='谈自己的身世时几乎不看人；被二公主问“你凭什么替我决定”时第一次答不出第二句。';
    }
  }
  syncHiddenPrince();

  // 7. 皇室子女页追加“成长侧写”，不把随机出生的幼嗣强行写成主角。
  const oldChildren=typeof childrenView==='function'?childrenView:null;
  if(oldChildren&&!globalThis.__v114Children){
    globalThis.__v114Children=true;
    childrenView=function(){
      syncChildren();syncHiddenPrince();
      let h=String(oldChildren());const f=F(state);const cards=[];
      if(alive('shunqian')){
        const mode=f.v81PrinceOpenEnding?'他最终把“别人期待我成为谁”与“我自己想去哪里”分开，自请远藩。':f.v47PrinceEducation==='public'?'开始学会在公开场合承认不知道，不再只靠答得快维持体面。':f.v47PrinceEducation==='strict'?'被迫长期听完反对意见；“儿臣不知”第一次成为可以写在纸上的答案。':f.v47PrinceEducation==='indulged'?'东所越来越少有人直接反驳他，聪明正在变成一种危险的捷径。':'聪明、求快，也还没有真正学会如何面对一个不替他收场的“不”。';
        cards.push(`<div class="v114-child-card"><b>三皇子 · 杨顺谦</b>${mode}<small>他要想清楚，别人想让他做什么，和他自己想过什么日子，并不是一回事。</small></div>`);
      }
      if(alive('ruoxi'))cards.push(`<div class="v114-child-card"><b>大公主 · 杨令兮</b>她很会照顾人，但不想一辈子只因为“懂事”被夸。风轮、木工、女学工房这些与婚姻和孝道无关的东西，第一次成为她自己的兴趣。<small>她开始给自己的兴趣和愿望也留出位置。</small></div>`);
      if(f.twinGirlBorn&&alive('twinGirl')){
        const p=f.v69PrincessFate==='stay'?'旧血案后仍留京；她不因为被欺骗就把自己从原来的生活里撤走。':f.v69PrincessFate==='estate'?'她去自己的封邑，把谁能进门、什么时候再议婚重新握回手里。':f.v69PrincessFate==='convent'?'她住进京郊道观，不削发；真正离开的不是尘世，而是那套所有人都替她决定“知道多少比较好”的婚议秩序。':'她擅长读场面、救场，也还在学“不想圆场时可以不圆”。';
        cards.push(`<div class="v114-child-card"><b>二公主 · 杨昭焉</b>${p}<small>她不再负责替所有人圆场，也允许自己生气。</small></div>`);
      }
      if(f.fifthPrincessBorn&&alive('fifthPrincess'))cards.push(`<div class="v114-child-card"><b>三公主 · 杨宁矣</b>低位生母的谨慎留在她身上：她习惯先问“可以吗”。她还是懂礼，只是慢慢知道，有些属于自己的小事不用先问自己配不配。<small>她慢慢知道，有些属于自己的小事不用先问“我可以吗”。</small></div>`);
      if(f.fourthPrinceBorn&&alive('fourthPrince'))cards.push(`<div class="v114-child-card"><b>${f.twinBoyFate==='keep'?'五皇子':'四皇子'} · 杨顺恭</b>${f.v81PrinceOpenEnding?'三皇子远藩后，他第一次被推到最前面；曾经最相信“输了再来”的孩子，开始面对有些位置不给第二局。':'他喜欢明确的输赢，也肯重来；霍素英从不替他拿年龄当借口。'}<small>他仍好胜，但得学会把劲用在自己身上，不必把每个人都当对手。</small></div>`);
      if(f.sixthPrincessBorn&&alive('sixthPrincess'))cards.push(`<div class="v114-child-card"><b>四公主 · 杨晏尔</b>她会追着“为什么”问到底。有时问得大人下不来台。后来她慢慢学会，除了问规矩为什么这样，还要看这条规矩最后会让谁受苦。<small>她仍会问为什么，也开始注意一句规矩最后落在谁身上。</small></div>`);
      if(f.v69HiddenPrinceRevealed)cards.push(`<div class="v114-child-card"><b>别录 · 陆既明</b>他当年不该被一道死令从玉牒上抹掉。可他长大以后利用二公主的婚议复仇，也确实伤了她。这两件事都要分开算。<small>他受过皇室的伤，也不能因此替二公主决定她该承受什么。</small></div>`);
      if(cards.length){const sec=`<section class="v114-child-arcs"><span class="eyebrow">成长侧写</span><h2>他们不是同一个“皇嗣”</h2><div class="v114-child-grid">${cards.join('')}</div></section>`;h=h.replace('</main>',sec+'</main>');}
      return h;
    };
  }

  // 8. 每次渲染前同步人物资料，防早期补丁重新覆盖 CHILDREN / 陆既明人物卡。
  const oldRender=typeof render==='function'?render:null;
  if(oldRender&&!globalThis.__v114Render){
    globalThis.__v114Render=true;
    render=function(){syncChildren();syncHiddenPrince();return oldRender();};
  }
  state.flags=state.flags||{};state.flags.v114Build=true;
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v114 royal children character patch failed',e)}})();
