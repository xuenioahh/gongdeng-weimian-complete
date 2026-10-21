const esc136=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));

const val136=(v,fallback='')=>{try{return edit140(typeof v==='function'?v(JSON.parse(JSON.stringify(state))):v??fallback)}catch(_e){return fallback}};

const html136=(fn,...args)=>{try{return typeof fn==='function'?String(fn(...args)??''):''}catch(e){console.warn('v136 optional view skipped',e);return''}};
