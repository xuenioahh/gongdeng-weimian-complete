(()=>{try{
  document.documentElement.dataset.build='v54';
  document.title='宫灯未眠 · 王静娴人间清醒与方氏案修订 v54';
  const hasW=s=>(s?.flags?.lowConsorts||[]).includes('zhao2')&&PEOPLE.zhao2;
  const titleW=s=>{let r=s?.ranks?.zhao2||'常在';if(r==='待选'||r==='待封')r='常在';return `王${String(r).replace(/^故/,'')}`;};
  const steps=()=>CHAPTERS.flatMap(ch=>ch.steps||[]);
  const st=q=>steps().find(x=>(x.heading||'').includes(q));
  const append=(x,tag,fn)=>{if(!x||x[tag])return;const old=x.text;x.text=s=>{const a=typeof old==='function'?old(s):old;const base=Array.isArray(a)?a:[a];return [...base,...fn(s)];};x[tag]=true;};

  // 人物卡：不剧透方氏案结局，只给当前可观察性格。
  if(PEOPLE.zhao2){
    PEOPLE.zhao2.tags=['懂场面','表面恭顺','内心毒舌'];
    PEOPLE.zhao2.bio='京中四品官员之女。王静娴说话前总先把一圈人的神色看完，脸上礼数无可挑剔，心里却很少跟着场面走。她最大的本事不是忍，而是知道哪句话是真客气、哪句话只是想让所有人赶紧散席。';
  }

  // 第一阶段：先让读者喜欢她。她的吐槽只针对当下，不给未来剧情提示。
  append(st('一场消暑宴，三条线第一次碰在一起'),'v54WangLight',s=>hasW(s)?[
    ``,
    `散席时方小满替她把松掉的香囊重新系好，只打了一个很松的活结。王静娴低头看：“不怕散？”方小满道：“死结难拆，指甲疼。”王静娴想了想：“你在宫里倒很相信东西以后还要再打开。”方小满没听出别的意思，只笑她说话怪。`
  ]:[]);

  // 方小满案：她不是侦探，也没有上帝视角；她只是熟悉一个人的小习惯，所以敢说一句“不像”。
  append(st('三份密报没有一份完整'),'v54WangFangClue',s=>hasW(s)?[
    `下午，王静娴被叫来认一只从听雨轩收走的绢袋。她不懂药，也不懂印，只把袋口翻过来看了两次。`,
    `“不是她系的。”`,
    `珍妃抬眼。王静娴把袋子放回去：“方小满最烦死结。连鞋带都打活扣，说拆的时候省指甲。这一个勒得像怕人下辈子还拆得开。”`,
    `她没有说这就能证明谁无罪，只补了一句：“臣妾知道习惯不能当供词。可若所有人都只认纸，总得有人先说一句——这不像她。”`,
    ``
  ]:[]);

  // 方小满死后：不把她写成另一位沉默悲剧人物。她的变化是以后先开口。
  append(st('顺贵人的东西并不多'),'v54WangAfterFang',s=>hasW(s)?[
    `封存听雨轩那日，王静娴来还一把借了很久的小剪子。阿芙接过去，她站在门口，没有进。`,
    `平日她总能在心里替每个场面配一句话。那天一句也没有。`,
    `珍妃从屋里出来时，她才说：“娘娘，以后臣妾若再觉得哪里不对，先说。说错了最多丢脸。”`,
    `珍妃问：“那说对了呢？”`,
    `王静娴看了一眼封起来的门：“至少别再晚。”`
  ]:[]);

  // 疫后/立后前：她恢复吐槽，但已经从“只看懂”变成“看懂就说”。不替任何继后候选站队。
  append(st('一年多以后，六宫仍没有皇后的早晨'),'v54WangVacancy',s=>hasW(s)?[
    ``,
    `散了请安，几个宫人又在廊下猜谁最像下一任皇后。王静娴听了一路，到了拐角才对珍妃低声道：“臣妾听着不像在选谁最尊贵。”`,
    `“像什么？”`,
    `“像在选以后出了乱子，大家第一时间该去敲谁的门。”`,
    `珍妃看她一眼。王静娴也望见廊下还站着传话的宫人，声音低了些：“我是在说宫务，不是替哪一宫递请立的话。再说下去，明日就该有人拿我的话去问两位娘娘了。”`
  ]:[]);

  // 老存档迁移：如果旧版本把王静娴写成递口信者或疫亡者，尽量把她从这两个默认坑里移出来。
  state.flags=state.flags||{};
  if(state.flags.lowAccompliceKey==='zhao2'){
    const alt=[...(state.flags.lowConsorts||[])].reverse().find(k=>k!=='zhao2');
    state.flags.lowAccompliceKey=alt||null;
  }
  if(state.flags.v46LowVictim==='zhao2'){
    const alt=(state.flags.lowConsorts||[]).find(k=>k!=='zhao2'&&PEOPLE[k]);
    if(alt){
      state.flags.v46LowVictim=alt;
      if(state.ranks?.zhao2&&/^故/.test(state.ranks.zhao2))state.ranks.zhao2=state.ranks.zhao2.replace(/^故/,'');
      if(state.ranks?.[alt]&&!/^故/.test(state.ranks[alt]))state.ranks[alt]='故'+state.ranks[alt];
    }
  }
  state.flags.v54WangJingxian=true;
  try{save();render()}catch(_e){}
}catch(e){console.error('v54 Wang Jingxian patch failed',e)}})();
