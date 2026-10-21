function ceramic141(k,item){
    const [x,y,w,h,iw,ih]=CERAMIC_CROPS141[k];
    return `<svg class="v141-ceramic" data-ceramic-center="${k}" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc136(PEOPLE[k].name)}｜${esc136(item.vessel)}"><title>${esc136(PEOPLE[k].name)}｜${esc136(item.vessel)}</title><image href="${item.image}" x="0" y="0" width="${iw}" height="${ih}" preserveAspectRatio="xMidYMid meet" /></svg>`;
  }
