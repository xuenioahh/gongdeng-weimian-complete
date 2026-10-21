function coverView147(){
  const chapter=CHAPTERS[state.index];
  const resumed=!!state.intro;
  const progress=resumed&&chapter?`${esc136(chapter.date)} · ${esc136(chapter.title)}`:resumed?'灯火未熄，旧事待续':'大晟 · 承熙元年正月';
  const verse=['红颜总是薄命','书生几番多情','帝王身不由己','唯有那看客清醒','相逢难逃别离','姻缘断，情难续'];
  return `<main class="palace-opening" aria-labelledby="opening-title">
    <div class="opening-world" aria-hidden="true">
      <div class="opening-art"></div><div class="opening-shade"></div>
      <div class="opening-distant-lights"><i></i><i></i><i></i></div>
      <div class="opening-mist opening-mist-far"></div><div class="opening-mist opening-mist-near"></div>
      <div class="opening-curtain"></div><div class="opening-pillar"></div>
      <div class="opening-lantern-stage"><div class="opening-lantern">
        <svg viewBox="0 0 180 420" focusable="false">
          <defs><radialGradient id="opening-lantern-light"><stop offset="0" stop-color="#ffd48e"/><stop offset=".32" stop-color="#d98244"/><stop offset="1" stop-color="#701e21"/></radialGradient><linearGradient id="opening-lantern-metal" x2="0" y2="1"><stop stop-color="#b99860"/><stop offset=".5" stop-color="#6d4b2d"/><stop offset="1" stop-color="#bd9660"/></linearGradient></defs>
          <path class="lantern-cord" d="M90 0V72"/>
          <path class="lantern-roof" d="M41 88Q90 68 139 88L126 96H54Z"/>
          <path class="lantern-body" d="M55 97Q24 130 36 180Q46 206 61 214H119Q142 196 146 166Q151 128 125 97Z"/>
          <g class="lantern-ribs"><path d="M55 97Q49 157 61 214M75 97Q68 157 78 214M105 97Q112 157 102 214M125 97Q133 157 119 214"/><path d="M36 128Q91 139 145 128M35 178Q90 169 143 178"/></g>
          <path class="lantern-metal" d="M53 95H127M60 214H120M66 221H114M90 221V247"/>
          <circle class="lantern-bead" cx="90" cy="245" r="4"/>
          <g class="lantern-tassel"><path d="M82 252Q83 292 75 333M86 253Q88 298 83 341M90 253Q93 297 91 344M94 253Q99 295 100 337M98 252Q105 291 109 330"/></g>
        </svg>
        <div class="opening-lantern-halo"></div>
      </div></div>
      <div class="opening-petals"><i></i><i></i><i></i></div>
      <div class="opening-grain"></div>
    </div>
    <div class="opening-topline"><span class="opening-era">承熙纪事</span><div class="opening-tools">
      <button id="opening-motion" type="button" aria-pressed="${effectsEnabled}">${effectsEnabled?'灯影流动':'灯影静止'}</button>
      <button id="opening-sound" type="button" aria-pressed="${EnvironmentDirector.soundEnabled}">夜声${EnvironmentDirector.soundEnabled?'开':'关'}</button>
      <button id="opening-skip" type="button">略过序幕</button>
    </div></div>
    <section class="opening-copy">
      <div class="opening-heading"><span class="opening-kicker">灯火照深宫 · 旧事待君启</span><div class="opening-title-row"><h1 id="opening-title">宫灯未眠</h1><span class="opening-seal" aria-hidden="true">承<br>熙</span></div></div>
      <blockquote class="opening-verse" aria-label="题辞">${verse.map((line,i)=>`<span style="--at:${1800+i*360}ms">${line}</span>`).join('')}</blockquote>
      <div class="opening-entry" inert>
        <p class="opening-scope">一部跨越二十余年的宫廷互动小说。重大往事沿既定脉络展开；你可裁断调查、位分与人物去留，经历不同关系和两条继后路线。部分章节是见证既定事件。</p>
        <p class="opening-whisper">“陛下，今夜往哪一宫？”</p>
        <button id="enter-story" class="opening-enter" type="button"><span>${resumed?'续上灯火':'步入承熙'}</span><i aria-hidden="true">⟶</i></button>
        <div class="opening-secondary"><button id="v52-background" type="button">宫门旧事</button>${resumed?'<button id="v52-archives" type="button">存档 · 读档</button>':''}${endingAvailable149()?'<button data-ending-action="menu" type="button">卷终回访</button>':''}</div>
        <small class="opening-progress">${progress}</small>
      </div>
    </section>
    <div class="opening-bottomline"><span>皇帝视角 · 宫廷群像</span><span class="opening-night-note">长夜未尽，宫灯未眠。</span></div>
    <div class="opening-exit-veil" aria-hidden="true"></div>
  </main>`;
}
