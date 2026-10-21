(async()=>{
 const checks=[],ck=(pass,name)=>checks.push({name,pass:!!pass});
 const keys=['emperor','gu','wenheng','baopu','hanzhang','shen','taihou'];
 ck(keys.every(k=>portrait(PEOPLE[k]).includes('v141-portrait')),'七位常规主立绘均为独立高清图');
 ck(keys.every(k=>portrait(PEOPLE[k],true).includes('v141-portrait small')),'七位正文缩略图同步替换');
 const prev=state.flags.baopuPregnant;state.flags.baopuPregnant=true;
 ck(!portrait(PEOPLE.baopu).includes('v141-portrait'),'怀孕剧情造型仍可切换');state.flags.baopuPregnant=prev;
 state.view='people';render();ck(!document.querySelectorAll('[data-porcelain-key]').length,'开篇瓷谱仍未解锁');
 await TEST140.jump(26,0,'direct','preset');
 const cards=document.querySelectorAll('[data-porcelain-key]');
 ck(cards.length===14,'结局14件瓷谱可翻面');
 const html=document.querySelector('#app').innerHTML;
 ck((html.match(/class="v141-ceramic"/g)||[]).length===14,'14件瓷器使用独立居中视窗');
 ck(keys.every(k=>portrait(PEOPLE[k]).includes('v141-portrait')),'跳转与旧补丁未覆盖新版立绘');
 cards[0].onclick({preventDefault(){},stopPropagation(){}});
 ck(cards[0].classList.contains('is-flipped')&&cards[0].getAttribute('aria-pressed')==='true','点击翻面');
 cards[0].onkeydown({key:'Enter',preventDefault(){},stopPropagation(){}});
 ck(!cards[0].classList.contains('is-flipped'),'键盘翻回');
 const gu=document.querySelectorAll('[data-person]').find(x=>x.dataset.person==='gu');gu.onclick();
 ck(document.querySelector('#modal').innerHTML.includes('v141-portrait')&&document.querySelector('#modal').innerHTML.includes('data-ceramic-center="gu"'),'人物弹窗新图及居中瓷谱');
 return {checks,failures:checks.filter(x=>!x.pass),build:document.documentElement.dataset.build};
})()
