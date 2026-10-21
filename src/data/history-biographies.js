// Route-aware pilot biographies for the人物志详情. Each later sentence is gated
// by a completed chronicle entry or a settled route flag; no ending is previewed.
function historyBiography138(key, s=state) {
  const f=s.flags||{}, titles=new Set((s.chronicle||[]).map(x=>String(x.title||'')));
  const done=(...names)=>names.some(name=>titles.has(name));
  const extra=(chapter,ids)=>typeof characterLife153==='function'?characterLife153(key,s,chapter,ids):'';
  const parts={
    gu:[
      '顾明宜，潜邸嫡福晋。杨叙即位后立为皇后，居凤仪宫。她常先翻旧例、核宫中名册，再安排六宫事务；遇到旧例未载之事，仍须由御前裁定。',
      done('宫门初定')?'承熙元年，她在新朝初立时接过中宫日常，既维持旧有礼序，也要与太后、和妃共同处理宫中诸事。':'',
      done('宫门初定')?'绮春宫报双生，她先下临时单，令男婴移出产殿，暂不入皇嗣院、不报玉牒，候御前裁断。杨叙随后另下秘处死令，两道命令各有经手。':'',
      extra('宫灯渐繁'),
      done('听雨轩有喜')?'方小满有孕后，顾明宜为听雨轩添炭例与夜值太医；册封时将座次前移，并照看她的日常起居。':'' ,
      done('听雨轩有喜')&&f.fangDead?'顺贵人死后，她亲自查看听雨轩封存清单，命人留下小鞋，不作杂物焚毁。':'' ,
      extra('凤仪宫最后一冬'),
      f.guDead?'承熙十一年十月二十三日，顾明宜薨。凤仪宫正殿闭，中宫暂虚。':''
    ],
    fang:[
      '方小满，初为御花园花房宫女，与阿芙同房当差。她抱花盆走错过门，为救受伤的猫划破手；见御前时，说起花草便多起来。她进宫并非由采选留牌。',
      done('拾遗阁开门')?'承熙元年入宫后居听雨轩。她做杏仁酥回谢皇后，把点心分给来客；阿芙则在门后记下礼盒落款与来往日期。':'' ,
      done('听雨轩有喜')?'承熙十年有孕，晋顺贵人。她仍惦记旧日出入单、袖口针脚和院中猫，也替太后换过香囊内袋。':'' ,
      extra('听雨轩有喜',['fang-evening']),
      done('听雨轩有喜')&&f.fangDead?(f.fangInvestigation==='threeDays'?'安胎汤在煎药房最后一次换手时遭人动了手脚；轮值簿漏记替班者。她服药后身故，替班者被追查。':f.fangInvestigation==='falseOrder'?'她在被移居偏院后，服下持假口谕送来的毒药而死；随后追查并扣押送药人。':'她服药后身故，案中送药与经手记录仍须核对。'):'',
      extra('听雨轩有喜',['fang-food'])
    ],
    afu:[
      '阿芙，御花园花房宫女，后随方小满在听雨轩当差。她记路快，替方小满处理猫伤、拆换纱布，也把往来礼物逐件记下；方小满不擅察觉的宫中风向，多由她先看出来。',
      done('听雨轩有喜')?'方小满有孕后，她守产房并逐更登记出入；安胎药送到时，她核过封签与药方，却无法查出煎药房内部的换手。':'' ,
      done('听雨轩有喜')&&f.fangDead?'方小满死后第三日，她整理听雨轩遗物与封存清单。此后离开原差事，在尚宫局传簿房任职。':'' ,
      extra('听雨轩有喜'),
      f.v68AfuPersonal?'后来张元照请她转入景阳宫，阿芙答应随行，成为张氏掌事宫女。她参与厘定交接、改动与复核留名，直到中宫处分也要求记明经手人。':'',
      extra('雪尽宫门'),
      extra('帘后朱笔')
    ]
  };
  const selected=parts[key];
  if(!selected)return settledLife151(key,s);
  return selected.filter(Boolean).join('')+(typeof historyRankFacts151==='function'?historyRankFacts151(key,s):'');
}
