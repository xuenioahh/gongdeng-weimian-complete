// Existing index.html keeps the user's test saves. ?mode=story uses separate saves.
const GAME_CONFIG = (()=>{
  let testMode=true;
  try{testMode=new URLSearchParams(location.search||'').get('mode')!=='story'}catch(_e){}
  const prefix=testMode?'gongdeng-test140':'gongdeng';
  return Object.freeze({version:'v147',testMode,storage:{
    progress:testMode?'chengxi-test140-v49':'chengxi-v49',
    archives:prefix+'-v52-archives',wardrobe:prefix+'-wardrobe',
    effects:testMode?'chengxi_test140_effects':'chengxi_effects'
  }});
})();
