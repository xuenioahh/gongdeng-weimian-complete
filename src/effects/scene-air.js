function atmosphereConfig146(c, step, paragraphs, calendar) {
  // Read the scene's opening, not a recollection of weather in a later speech.
  const heading=String(step?.heading||'');
  const cue=(heading+' '+String(paragraphs[0]||'')).replace(/<[^>]*>/g,'');
  let season=calendar?.season||'春';
  const month=cue.match(/(?:年|·|^|\s)(正|二|三|四|五|六|七|八|九|十|十一|十二|腊)月/);
  if(month){const n=['正','二','三','四','五','六','七','八','九','十','十一','十二'].indexOf(month[1])+1;season=month[1]==='腊'||n>=10?'冬':n>=7?'秋':n>=4?'夏':'春';}
  else if(/入冬|冬至|冬夜/.test(cue))season='冬';
  else if(/入秋|秋夜|秋天/.test(cue))season='秋';
  else if(/盛夏|夏夜|夏雨/.test(cue))season='夏';
  const fx=String(step?.fx||c.fx||'');
  let weather=/^(rain|snow|wind|petal)$/.test(fx)?fx:'clear';
  if(/没有下雪|未下雪|并未落雪|无雪|雨停|雨后|雪停|雪水|融雪|雪尽/.test(cue))weather='clear';
  else if(/雪落|落雪|下雪|雪还在下|雪压|白沟/.test(cue)&&!/没有.*雪|未.*雪/.test(cue))weather='snow';
  else if(/暴雨|骤雨|雨声|春雨|雨打|雨夜|多雨/.test(cue)&&!/要下雨|像要.*雨/.test(cue))weather='rain';
  else if(/花瓣|落花|花谢|海棠谢/.test(cue))weather='petal';
  else if(/风起|风吹|大风|风沙|夜风|疾风|风过/.test(cue))weather='wind';
  const motif=CHAPTER_LAMP.has(c.title)||/灯|烛|火光/.test(cue)?'lamp':'none';
  const override=Object.entries(SCENE_AIR_OVERRIDES).find(([key])=>{
    const divider=key.indexOf('|');
    return key.slice(0,divider)===c.title&&heading.includes(key.slice(divider+1));
  })?.[1]||{};
  return {season,weather,motif,time:/夜|戌|子时|三更|寅时|灯下/.test(cue)?'night':'day',still:false,quietMs:0,reopen:false,...override};
}

function atmosphere146(air) {
  return `<div class="story-atmosphere" data-weather="${air.weather}" data-motif="${air.motif}" data-time="${air.time}" data-still="${air.still}" data-lamps="${air.lamps||0}" data-scene="${air.reopen?'reopen':'ordinary'}" aria-hidden="true"><i class="air-lamp"></i><div class="air-lamp-row">${Array.from({length:5},()=>'<span></span>').join('')}</div><div class="air-weather">${Array.from({length:14},(_,i)=>`<i style="--drop:${(i*9)%14};--drift-delay:-${((i*17)%29)/2}s"></i>`).join('')}</div></div>`;
}

function bindMotion146() {
  const button=document.querySelector('#scene-motion');
  const reduced=!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.dataset.motion=effectsEnabled?'on':'off';
  if(button&&reduced)button.textContent=effectsEnabled?'环境：流动（系统静止）':'环境：静止';
  if(button)button.onclick=()=>{
    effectsEnabled=!effectsEnabled;
    try{localStorage.setItem(GAME_CONFIG.storage.effects,effectsEnabled?'on':'off')}catch(_e){}
    document.documentElement.dataset.motion=effectsEnabled?'on':'off';
    button.textContent=effectsEnabled?(reduced?'环境：流动（系统静止）':'环境：流动'):'环境：静止';
    button.setAttribute('aria-pressed',String(effectsEnabled));
  };
}
