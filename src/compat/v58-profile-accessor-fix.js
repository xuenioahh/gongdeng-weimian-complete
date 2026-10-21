(()=>{try{
  if(PEOPLE.zhangyuanzhao){
    const earlyBio='从顺王府走进承熙三年大选的张元照，答问不爱绕弯，也很少把恩宠当目标。她遇事总先拆成“谁、什么时候、经过哪一步”，说话偶尔会冒出一个宫里人没听过的词。';
    const palaceBio='承熙三年第一次大选入宫，居景阳宫东配殿。她不爱浓香，睡觉总留半扇窗；洗脸、净手的巾盆分开，梳篦口脂从不混用；每天把要做的事画成小方格，做完便划掉。她偶尔会脱口而出一个谁也听不懂的词，再若无其事换成宫里听得懂的说法。';
    const revealedBio='她来自遥远后世，前世做疫病调查。遇到乱局时，她会下意识问“谁、什么时候、经过哪一步”，偶尔脱口而出“工作、备份、同事”再自己改口。她习惯留下可交接的痕迹，也坚持恩情、依赖与服从从来不是一回事。';
    const idx=()=>CHAPTERS.findIndex(x=>x.title==='窗开半扇');
    try{Object.defineProperty(PEOPLE.zhangyuanzhao,'bio',{configurable:true,enumerable:true,get(){return state.flags?.zhangRevealed?revealedBio:((state.index??0)>=idx()?palaceBio:earlyBio)},set(_v){}})}catch(_e){}
    try{Object.defineProperty(PEOPLE.zhangyuanzhao,'tags',{configurable:true,enumerable:true,get(){return state.flags?.zhangRevealed?['来自后世','拆问题','把经验做成制度']:((state.index??0)>=idx()?['承熙三年入宫','生活习惯古怪','爱写清单']:['说话直','先拆问题','拒绝恩情换服从'])},set(_v){}})}catch(_e){}
  }
}catch(e){console.error('v58 profile accessor fix failed',e)}})();
