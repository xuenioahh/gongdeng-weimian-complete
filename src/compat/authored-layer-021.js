(()=>{try{
  document.documentElement.dataset.build='v46';
  const LOW=['cao2','zhao2','lin2','ye2','du2','su2'];
  const hasLow=(s,k)=>(s?.flags?.lowConsorts||[]).includes(k)&&PEOPLE[k];
  const surnameTitle=(s,k)=>{
    const p=PEOPLE[k]; if(!p)return '';
    let r=s?.ranks?.[k]||'常在';
    if(r==='待选'||r==='待封')r='常在';
    if(/^故/.test(r))return `故${p.name.slice(0,1)}${r.replace(/^故/,'')}`;
    return `${p.name.slice(0,1)}${r}`;
  };
  const allSteps=()=>CHAPTERS.flatMap(ch=>ch.steps||[]);
  const step=(q)=>allSteps().find(st=>(st.heading||'').includes(q));
  const appendOnce=(st,tag,fn)=>{
    if(!st||st[tag])return;
    const old=st.text;
    st.text=s=>{const a=typeof old==='function'?old(s):old;return [...(Array.isArray(a)?a:[a]),...fn(s)];};
    st[tag]=true;
  };
  const cleanOnce=(st,tag)=>{
    if(!st||st[tag])return;
    const old=st.text;
    st.text=s=>{
      const a=typeof old==='function'?old(s):old;
      return (Array.isArray(a)?a:[a]).filter(x=>{
        const z=String(x||'');
        if(/v41-thread/.test(z))return false;
        if(/这条线不会看起来像突然|后来回头看，却会发现|真正的悲剧从这里开始变得讽刺|这张纸此时没有任何阴谋意味/.test(z))return false;
        return true;
      });
    };
    st[tag]=true;
  };

  // 清理旧补丁残留的“作者替读者总结”句子，让物件和人物自己说话。
  ['一场消暑宴，三条线第一次碰在一起','一张换库单','霍家的旧簿没有直接送给和妃','洗三散了，产房的名单留下来','宫里孩子一多，所有人都开始算','同一日，三件小事'].forEach(q=>cleanOnce(step(q),'v46bClean'));

  // 何超英：先是记路，后来才有时疫里的路线图。
  appendOnce(step('分宫不是搬箱子'),'v46bCaoRoute',s=>hasLow(s,'cao2')?[
    `何超英分到配殿的第一日下午，尚宫局的人领错了一回路。她没争，只等人走后把从咸福宫到内务府的三处岔口画在一张旧纸背面。方小满看见，问她记这个做什么。她说：“怕下回又绕。”`,
    `半个月后宫里换炭，她已经能告诉同住的人：送炭小车雨天不走北夹道，要从西库南门绕。那时没人觉得记路算什么本事。`
  ]:[]);

  appendOnce(step('一张换库单'),'v46bCaoDuSupply',s=>{
    const out=[];
    if(hasLow(s,'cao2'))out.push(`换库那日，何超英恰从内务府领冬被回来。她记得西库南门堵了两辆小车，其中一辆车轴断过，后来由两名不认识的杂役换手推走。她只把这事当作下雨天的一次麻烦，回宫还抱怨鞋底沾满了泥。`);
    if(hasLow(s,'du2'))out.push(`张淑华领自己宫里的炭时，在库房门口等了很久。她无聊地数绢袋，发现清单写二十四包，地上却先摆了二十五包；掌事很快解释其中一包封口受潮，要退回重装。她点点头，没有追问，只顺手把“退一包”写在自己的月例小账上。`);
    return out;
  });

  // 陈婉仪：旧案里不是侦探，只是把会消失的细节原样留下。
  appendOnce(step('霍家的旧簿没有直接送给和妃'),'v46bYeCopy',s=>hasLow(s,'ye2')?[
    `皇后不许原件离开凤仪宫，只叫人誊一份给永和宫看。陈婉仪那日正替尚宫局抄祭礼名册，被临时叫来写这三页数字。`,
    `她抄到“初五”时停了一下，问：“这一笔旁边像擦过一个字，要不要也照样留白？”皇后让她照原样描出来。于是那道不起眼的擦痕也跟着进了副本。和妃后来把副本折进茶罐底，六年没有丢。`
  ]:[]);

  // 林淑贞：在闻人蘅孕事中先出现，时疫时“翻译”太医院便有来处。
  appendOnce(step('胎像开始不稳'),'v46bLinPreg',s=>hasLow(s,'lin2')?[
    `太医院几位医官在廊下争了半刻钟，有人主张加补，有人怕她旧疾受不住。林淑贞来送皇后借去的医案样本，站在门边听得脸色发白。`,
    `蘅嫔听不耐烦，隔帘问：“他们到底在争什么？”林淑贞不敢碰方子，只把话拆开说：“一边怕娘娘虚，一边怕补得太急。两边都不是说一定能保住。”`,
    `蘅嫔沉默了一阵：“这句我听懂了。”`
  ]:[]);

  // 刘玉贞：长期在孩子身边出现，时疫中被安排到幼儿暂居处不突兀。
  appendOnce(step('洗三散了，产房的名单留下来'),'v46bSuChildren',s=>hasLow(s,'su2')?[
    `刘玉贞坐在廊下一直替乳母缝松掉的襁褓带。孩子哭起来，她不抢着抱，只先把铜盆挪远、窗缝掩一半，再慢慢唱一段家乡小调。`,
    `阿芙问她怎么这么会哄，她笑：“家里弟妹多。哄不好，晚上全屋都别睡。”`
  ]:[]);

  // 王静娴：早早写出“会看脸色、习惯说没事”的性格，后来延迟报病自然发生。
  appendOnce(step('宫里孩子一多，所有人都开始算'),'v46bZhaoTemper',s=>hasLow(s,'zhao2')?[
    `王静娴替一位新母妃送乳母名册来凤仪宫，正碰上几处月例争执。她谁都不得罪，先替这个添茶，再替那个把掉在地上的纸捡起来。等两边都觉得自己占了理，她才把名册往皇后案上一放：“娘娘，现在总能说正事了吧。”`,
    ``
  ]:[]);

  // 张淑华：供应账的数字习惯在崔氏线里提前留下。
  appendOnce(step('同一日，三件小事'),'v46bDuLedger',s=>hasLow(s,'du2')?[
    `那份被皇后退回的衣料单后来经过张淑华手里。她只是替尚宫局核数量，发现同样的细绢，崔氏旧贡造行报的是整匹，另一家报的是裁后净尺。她重新换成同一个算法，差额一下少了许多。`,
    `皇后看了一眼她的小算纸，没有夸，只吩咐：“以后比价都先把尺数写成一样。”张淑华应声，把算盘珠重新推回起位。`
  ]:[]);

  // 张元照的目标变成看得见、可争执的制度，而非抽象“现代知识”。
  const vacancy=CHAPTERS.find(ch=>ch.title==='中宫空悬');
  if(vacancy?.steps&&!vacancy.steps.some(st=>(st.heading||'').includes('三本册子'))){
    const ri=vacancy.steps.findIndex(st=>(st.heading||'').includes('臣妾不是从哪个州府来的'));
    if(ri>=0)vacancy.steps.splice(ri+1,0,{
      heading:'第四幕半 · 三本册子',cast:['zhangyuanzhao','ning'],fx:'ink',narrative:true,text:s=>[
        `坦白后的第三日，张元照没有再说后世。她送来三本新装订的薄册。`,
        `第一本记病人何时发热、住过哪里；第二本只记各宫送水、送饭、洗衣与换值的人；第三本记病愈以后何时能重新当差。封面没有漂亮名字，只写“病籍”“往来”“复值”。`,
        `“这三本以后不用臣妾写。”她说，“谁当尚宫、谁做太医，都照着留一份。下一次若再有疫，不必等到二十个人倒下才想起问第一个人去了哪里。”`,
        `邵明贞翻到第二本：“宫里每天走动的人何止几百。全记，先累死的是写字的人。”`,
        `张元照道：“所以不全记。平日只记值房和调动，出事再往回查。”`,
        `“若有人故意写错？”`,
        `“两处各留一份。”`,
        `邵明贞抬眼：“纸不会自己说真话。”`,
        `“臣妾知道。”张元照把册子合上，“可没有纸的时候，人更容易只剩一句‘奴婢记得’。”`,
        `两个人谁也没有说服谁。三本册子留在御案上。`
      ],choices:[
        {label:'准三册法先在太医院与尚宫局试行一年',hint:'把张元照的办法变成制度，但只先试行',effects:{trust:{zhangyuanzhao:4,ning:1},flags:{v46ThreeRegisters:'trial'}},result:'太医院留病籍，尚宫局留往来与复值。第一月就有人嫌麻烦，第二月也有人开始拿旧册查漏。'},
        {label:'只留病籍与复值，不设日常往来册',hint:'减少宫务负担，也削弱追溯能力',effects:{trust:{zhangyuanzhao:1,ning:3},flags:{v46ThreeRegisters:'partial'}},result:'邵明贞亲自删掉最繁的一册。张元照看了很久，最后说：“两本也比没有强。”'},
        {label:'暂不立成定制，只把三册封存御前',hint:'你承认她有用，却不愿再添一套规矩',effects:{trust:{zhangyuanzhao:-1},flags:{v46ThreeRegisters:'sealed'}},result:'三本册子收进养心殿东柜。张元照谢恩时没有争，出门以后却在廊下站了很久。'}
      ]
    });
  }

  // 时疫里让张元照的办法带着代价：隔离不是冷冰冰的“正确答案”。
  const winter=CHAPTERS.find(ch=>ch.title==='凤仪宫最后一冬');
  if(winter?.steps&&!winter.steps.some(st=>(st.heading||'').includes('帘子两边'))){
    const wi=winter.steps.findIndex(st=>(st.heading||'').includes('第一次选秀留下的人'));
    if(wi>=0)winter.steps.splice(wi+1,0,{
      heading:'第四幕半 · 帘子两边',cast:['zhangyuanzhao','gu'],fx:'candle',narrative:true,text:s=>[
        `最难执行的不是封门，是不许人见自己想见的人。`,
        `一个乳母先发热，她照看的幼儿却还没有症状。孩子在东暖阁哭得声音发哑，乳母隔着两道门听见，跪在病院里求了一下午。`,
        `张元照没有准她回去。她让人把孩子常抱的旧布偶用沸水烫过、晒干，再送进暖阁。孩子抱着湿了一角的布偶终于睡着。`,
        `当晚那乳母骂她心狠。张元照站在门外听完，只问太医：“她今日烧到多少？”`,
        `第二日皇后知道了，没有夸她。只让尚宫给病院多添两个人手：“规矩若要人守，先别把守规矩的人累死。”`,
        `张元照把这一句也写进册子边上。`
      ],choices:[{label:'继续',effects:{trust:{gu:2,zhangyuanzhao:1},flags:{v46IsolationCostShown:true}},result:''}]
    });
  }

  // 张元照人物卡：把她的“想做什么”写成可延续的目标。
  const renderOld=render;
  render=function(){
    if(PEOPLE.zhangyuanzhao&&state.flags?.zhangRevealed){
      PEOPLE.zhangyuanzhao.tags=['穿越者','疫病调查','制度记录'];
      PEOPLE.zhangyuanzhao.bio='她前世二十六岁，从事疫病调查与记录工作，死于一次意外后在大晟九岁女孩张元照身上醒来。她不以治病自居，擅长的是把人、时辰、去向与缺漏排在一起。她想做的不是靠自己再救一次，而是让病籍、往来与复值记录成为即便换了皇后、太医和掌事也会继续使用的宫中定制。';
    }
    return renderOld();
  };
  save();render();
}catch(e){console.error('v46b low-consort callbacks / Zhang mission patch failed',e)}})();
