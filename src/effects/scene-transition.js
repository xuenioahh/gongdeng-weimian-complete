// Navigation is immediate and stable; only the surrounding light may move.
// Scrolling must not race a reader's next click or a newly loaded illustration.
scrollAfterChoice=function(showResult=false,newChapter=false){
  const target=newChapter?(document.querySelector('.bridge')||document.querySelector('.scene-title')||document.querySelector('.chapter-head')):
    (showResult?(document.querySelector('.recent-result')||document.querySelector('.scene-title')):document.querySelector('.scene-title'));
  if(!target)return;
  const header=document.querySelector('header');
  const offset=(header?header.getBoundingClientRect().height:0)+18;
  window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+window.scrollY-offset),left:0,behavior:'instant'});
};
