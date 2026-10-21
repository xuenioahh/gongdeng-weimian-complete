function roster138(heading){
    const people=consorts138.map(k=>person138(k)),active=people.filter(x=>x.active),queen=active.find(x=>x.base==='皇后'),taihou=person138('taihou');
    const line=(label,items)=>items.length?`<p><b>${esc136(label)}：</b>${items.join('　')}</p>`:'';
    const item=p=>`${esc136(p.title)} ${esc136(p.name)}（${esc136(p.home)}）`;
    const rows=[line('慈宁宫',[taihou.dead?'太后邵令仪已故':`${esc136(taihou.title)} ${esc136(taihou.name)}`]),line('中宫',[queen?item(queen):'凤仪宫暂空'])];
    for(const rank of rankOrder138.filter(x=>!['皇后','皇太后'].includes(x)))rows.push(line(rank,active.filter(x=>x.base===rank).map(item)));
    rows.push(line('皇子女',children138().filter(x=>!x.dead).map(x=>esc136(`${x.order||''} ${x.name}`))));
    rows.push(line('退居与宫外',people.filter(x=>x.admitted&&!x.active&&!x.dead&&!['已废','未入宫'].includes(x.status)).map(x=>`${esc136(x.title)} ${esc136(x.name)}（${esc136(x.status)}）`)));
    rows.push(line('故人',people.filter(x=>x.dead&&x.admitted).map(x=>`${esc136(x.title)} ${esc136(x.name)}`)));
    return `<section class="roster138" data-roster-state="${state.index}-${state.chapterStep}"><h3>${esc136(heading)}</h3>${rows.join('')}</section>`;
  }
