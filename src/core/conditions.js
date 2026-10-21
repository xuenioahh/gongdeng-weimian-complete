function allowed136(c){
    if(!c)return false;
    try{if(c.requires&&!c.requires(state))return false}catch(e){console.warn('v136 requirement failed',e);return false}
    return (Number(c.costMind)||0)<=(Number(state.mind)||0);
  }
