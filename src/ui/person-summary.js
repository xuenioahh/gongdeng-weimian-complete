function personPortrait136(k,small=true){const p=PEOPLE?.[k];return p?html136(portrait,p,small):''}

function personRank136(k){try{return displayRank(k)||''}catch(_e){return state.ranks?.[k]||''}}
