(()=>{try{
  function v58ZhangProfile(){
    if(!PEOPLE.zhangyuanzhao||state.flags?.zhangRevealed)return;
    const at=CHAPTERS.findIndex(x=>x.title==='窗开半扇');
    if((state.index??0)<at)return;
    PEOPLE.zhangyuanzhao.tags=['承熙三年入宫','生活习惯古怪','爱写清单'];
    PEOPLE.zhangyuanzhao.bio='承熙三年第一次大选入宫，居景阳宫东配殿。她不爱浓香，睡觉总留半扇窗；洗脸、净手的巾盆分开，梳篦口脂从不混用；每天把要做的事画成小方格，做完便划掉。她偶尔会脱口而出一个谁也听不懂的词，再若无其事换成宫里听得懂的说法。';
  }
  const oldRenderV58=render;
  render=function(){v58ZhangProfile();return oldRenderV58();};
  v58ZhangProfile();
}catch(e){console.error('v58 profile sync failed',e)}})();
