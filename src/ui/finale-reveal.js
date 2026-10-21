// Keep the entire existing finale before entering its final memories.
let finaleReveal146 = null;

function endingFinale146(){
  if(!state.flags?.v82FinaleComplete)return ending();
  if(state.index===CHAPTERS.length&&state.finalMontage147?.version===147&&state.finalMontage147.status==='playing')return finalMontageView147();
  if(state.finalMontage147?.status==='complete')return endingMenu149();
  const heir=state.flags.v81PrinceOpenEnding?'杨顺恭':'杨顺谦';
  const paragraphs=[
    [
      '承熙二十二年冬，冬至后第四日寅时，杨叙崩于养心殿。',
      `依遗诏，${heir}即位，尊我为皇太后。丧钟停了，我还记得他最后一夜床边那盏不太亮的灯。`
    ],
    [
      '夜风掠过丹陛，我想起他指上不再转动的白玉扳指。',
      '景阳宫窗边那些未填满的小格，还在；阿芙的钥匙声，又从身后的殿门传来。',
      '宫外，卖热饼的摊亮着灯，河边一条迟归的船正靠岸。'
    ],
    [
      '我推开殿门，在灯下坐定，把新朝第一批奏折一页页展开。',
      '第一份上有人的名字。我停了停，先在纸边写下：请呈原卷。',
      '宫灯未眠。'
    ]
  ];
  let index=0;
  const prose=paragraphs.map((lines,p)=>`<div class="finale-stanza">${lines.map(line=>`<p class="finale-line${line==='宫灯未眠。'?' finale-refrain':''}" hidden data-finale-line="${index++}" data-stanza="${p}">${esc136(line)}</p>`).join('')}</div>`).join('');
  return `<main class="ending finale-146" aria-label="承熙朝终章"><span class="eyebrow">承熙朝·终</span><h1>万家灯火</h1><div class="finale-perspective">张元照视角 · 新朝第一夜</div><div class="finale-prose">${prose}</div><button type="button" class="finale-show-all" id="finale-show-all">显示全文</button><div class="finale-entries" id="finale-entries" hidden><button class="primary" data-view="people" data-ending-gallery="people">人物瓷谱</button><button class="ghost" data-view="chronicle">卷终回望</button><button class="ghost" data-ending-action="directory">返回目录</button><button class="ghost" data-ending-action="cover">返回首页</button><button class="ghost" id="finale-memory-start">${state.finalMontage147?.status==='complete'?'重看浮生走马灯':'浮生走马灯'}</button></div></main>`;
}

function stopFinaleReveal146(){
  if(!finaleReveal146)return;
  finaleReveal146.stop();
  finaleReveal146=null;
}

function mountFinaleReveal146(){
  const root=document.querySelector('.finale-146');
  if(!root)return;
  const lines=[...root.querySelectorAll('[data-finale-line]')];
  const actions=root.querySelector('#finale-entries');
  const skip=root.querySelector('#finale-show-all');
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const complete=state.finalMontage147?.status==='complete'||!!finaleReview149||state.finalMontage147?.status==='reading';
  let next=0,timer=null,due=0,remaining=850,stopped=false,finished=false;
  const clear=()=>{if(timer!==null)clearTimeout(timer);timer=null};
  const reveal=()=>{
    timer=null;
    if(stopped||document.hidden)return;
    const line=lines[next++];
    line.hidden=false;
    line.classList.add('is-visible');
    if(next===lines.length){
      remaining=1450;
      schedule(finish);
      return;
    }
    const length=line.textContent.length;
    const nextLine=lines[next];
    remaining=Math.min(3700,Math.max(1450,900+length*55));
    if(nextLine.dataset.stanza!==line.dataset.stanza)remaining+=1100;
    if(line.classList.contains('finale-refrain'))remaining+=900;
    schedule(reveal);
  };
  const finish=()=>{
    if(finished)return;
    clear();finished=true;
    lines.forEach(line=>{line.hidden=false;line.classList.add('is-visible')});
    actions.hidden=false;skip.hidden=true;
    if(!complete){remaining=4000;schedule(startFinalMontage147)}
  };
  const schedule=fn=>{
    if(stopped||document.hidden)return;
    due=performance.now()+remaining;
    timer=setTimeout(fn,remaining);
  };
  const onVisibility=()=>{
    if(document.hidden){
      if(timer!==null){remaining=Math.max(0,due-performance.now());clear();}
    }else if(!stopped){if(!finished)schedule(next===lines.length?finish:reveal);else if(!complete)schedule(startFinalMontage147)}
  };
  const onMotion=()=>{if(reduced.matches)finish()};
  skip.addEventListener('click',finish);
  root.querySelector('#finale-memory-start').onclick=startFinalMontage147;
  document.addEventListener('visibilitychange',onVisibility);
  reduced?.addEventListener?.('change',onMotion);
  finaleReveal146={stop(){stopped=true;clear();document.removeEventListener('visibilitychange',onVisibility);reduced?.removeEventListener?.('change',onMotion)}};
  if(complete||reduced?.matches)finish();else schedule(reveal);
}
