// Restore verified literary work that had been written to a separate project copy.
// Extend existing scenes only: choice order, effects, timeline, and save indexes are unchanged.
function historyText150(chapter,step,paragraphs,s=state){
  const heading=String(step?.heading||''), title=chapter?.title;
  let out=paragraphs.slice();
  if(title==='御前终选'&&heading==='我亲自问最后一题')out.push(
    '终选散场，张元照在门外等礼官核名帖。走到门槛前，她低头看了看鞋尖。',
    '我问她方才答话为何停了一下。她以为我问的是门槛，答：“怕摔。”我提醒她问的是答话，她才说没听清礼官唱的名字。',
    '礼官把名字重念一遍。她补了一礼，跟着队伍退到檐下。我没有再问，后来只记得她在门槛前停过那么一下。'
  );
  if(title==='宫灯渐繁'&&heading==='承熙三年三月 · 景阳宫东配殿')out.push(
    '四月，我去景阳宫看新人的住处，见张元照把两只旧杯收在窗边。',
    '“怎么留两只一模一样的？”',
    '“一个喝水，一个漱口。少一只也能过，只是每日要洗得勤些。”',
    '她把杯子分开放好。那天我们没谈宫务；我离开时，窗缝里还有风，杯沿碰在一起响了一声。'
  );
  if(title==='窗开半扇'&&heading.includes('五月初八'))out.push(
    '第二日，那张送错的膳单到了御前。尚宫局原想记“已补齐”，张元照却把错送的宫室和补送时辰写在旁边。',
    '“昨夜汤凉了。”她来回话，“阿芙去借火，耽误半刻。臣妾没拦住她。”',
    '我问怎么不叫膳房重做。她说已经重做，只是那半刻不能从单子上抹掉。我让她把原单也交回尚宫局。'
  );
  if(title==='荷风满座'&&heading.includes('七月廿三'))out.push(
    '几日后，她送来一份值房记录，两处时辰仍对不上。我叫她先照旧册补齐，她没有应。',
    '“旧册也错了。照着补，只会把错处抄得更齐。”',
    '我问她是否问过当日换值的人。她说只问了一半。我让她先补查，话比平日重；她行礼离开，仍没把空格填上。此后几次请安，她只递公事，没有在御前多留。'
  );
  if(title==='凤座无人'&&heading.includes('四月夜 · 新茶不是为了翻旧案'))out.push(
    '四月末，沈知微留张元照吃晚膳，我也在。桌上有蒸笋和鱼羹，谁都没提中宫。',
    '沈知微嫌鱼羹淡。张元照说入宫前吃得咸些，我顺口问是谁做饭，她想了半天，先说母亲，又说许久没吃，记不清了。',
    '我们谈了几句南方的雨，话题便断了。她走时把剩下的蒸笋带回去，说阿芙喜欢。'
  );
  if(title==='帘后朱笔'&&heading.includes('顺王从封地递来')&&s.flags?.shunwangFinalFate==='capital')out=out.map(p=>String(p).replaceAll('顺王从封地递来','顺王从京中王府递来').replaceAll('折子退回封地以后','折子退回京中王府以后'));
  return out;
}
function historyHeading150(chapter,step,s=state){
  const heading=String(step?.heading||'');
  if(chapter?.title==='空宫点灯'&&heading==='九月 · 迁宫册最后一页，写的是张元照')return heading.replace(/^九月/,'暮春');
  return chapter?.title==='帘后朱笔'&&s.flags?.shunwangFinalFate==='capital'?heading.replace('顺王从封地递来','顺王从京中王府递来'):heading;
}
