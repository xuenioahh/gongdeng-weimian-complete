function alignPicks139(ci,record,partial,old){
    prepare139(state);
    const current=CHAPTERS[ci].steps||[],picks=Array.isArray(record)?record.slice():[record];
    if(old.runtimeSchema===139||!partial&&picks.length===current.length)return picks;
    if(!partial&&ci===13&&picks.length===current.length-1&&current.at(-1)?.v139Required)return [...picks,0];
    if(ci===15&&picks.length<=16){
      const legacyHeads=["请安散后，廊下还挤着新鞋", "冰在谁的宫门前先化", "大公主借走一阵风", "景阳宫的竹叶第一次转起来", "荷风宴，灯从水面一盏盏亮", "一张宴席，几处故乡", "支线 · 景阳宫窗沿那只麻雀", "六月末 · 宋氏第一次发现“省事”也会吓到人", "碎瓷落地以后", "七月初 · 许氏终于敢拿自己那一跪开玩笑", "那本只写自己的小册子", "宫道尽头，两种记法", "那个月，景阳宫的灯亮得比从前多", "七月廿三 · 她第一次把一张表撕了", "三十日以后，留下来的只有两样", "七月尽头，蝉声忽然停了一刻"];
      const normalize=h=>h.replace(/^支线 · /,'').replace('七月尽头，蝉声忽然停了一刻','七月三十 · 蝉声忽然停了一刻');
      const byHead=new Map(legacyHeads.slice(0,picks.length).map((h,i)=>[normalize(h),picks[i]]));
      const stop=partial?current.findIndex(st=>normalize(st.heading)===normalize(legacyHeads[old.chapterStep]||'')):current.length;
      return current.slice(0,stop>=0?stop:old.chapterStep).map(st=>{if(byHead.has(normalize(st.heading)))return byHead.get(normalize(st.heading));if(st.choices?.length===1)return 0;throw Error('旧档缺少分支'+st.heading);});
    }
    if(!partial&&ci===16&&picks.length===current.length+1)return picks.slice(0,current.length);
    let heads=oldStructure139[ci]||[];
    if(ci===23){const routeHeads=new Set((globalThis.v139ShaoScenes?.()||[]).map(x=>x.heading));heads=heads.filter(h=>!routeHeads.has(h));}
    if(ci===23&&old.flags?.v74ShaoThenZhang&&picks.length>heads.length)heads=[...(globalThis.v139ShaoScenes?.()||[]).map(x=>x.heading),...heads];
    const map=new Map(heads.slice(0,picks.length).map((h,i)=>[h,picks[i]]));
    const stop=partial?current.findIndex(x=>x.heading===heads[old.chapterStep]):current.length;
    const target=partial?(stop>=0?stop:old.chapterStep):current.length;
    return current.slice(0,target).map(st=>{if(map.has(st.heading))return map.get(st.heading);if(st.v139Required||st.v106ShaoRoute||st.v74route)return 0;throw Error('旧档缺少'+st.heading);});
  }
