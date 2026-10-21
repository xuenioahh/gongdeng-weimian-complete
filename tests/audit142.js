(async()=>{
 const checks=[],ck=(pass,name)=>checks.push({name,pass:!!pass});
 const keys=['emperor','gu','wenheng','baopu','hanzhang','shen','taihou','daila','liang2','song2','xu2','yinprince','xulingyi','zhou','fang','peiyan','xielin','afu','shunwang','zhangyuanzhao','ning','ke','hui','cao2','zhao2','lin2','ye2'];
 ck(keys.every(k=>portrait(PEOPLE[k]).includes('v141-portrait')),'27位主要人物独立立绘及默认状态');
 ck(keys.every(k=>portrait(PEOPLE[k],true).includes('v141-portrait small')),'正文小头像同步更新');
 ck(['du2','su2'].every(k=>portrait(PEOPLE[k]).length>100),'未重绘人物保留现有立绘');
 const prev=state.flags.baopuPregnant;state.flags.baopuPregnant=true;
 ck(!portrait(PEOPLE.baopu).includes('v141-portrait'),'在世怀孕状态保留专用造型');state.flags.baopuPregnant=prev;
 state.view='people';render();ck(!document.querySelectorAll('[data-porcelain-key]').length,'开篇不解锁瓷谱');
 const progress=JSON.stringify([state.index,state.chapterStep,state.ranks,state.flags]);
 const open=document.querySelector('#test142-gallery');ck(typeof open?.onclick==='function','立绘总览入口绑定');open?.onclick();
 ck((document.querySelector('#app').innerHTML.match(/<figure class="v142-art-card">/g)||[]).length===28,'立绘总览28张成图且不含幼年图');
 ck(!document.querySelector('#app').innerHTML.includes('v141-ceramic'),'立绘总览不提前公开瓷器');
 document.querySelector('#art142-return')?.onclick();
 ck(state.view==='story'&&JSON.stringify([state.index,state.chapterStep,state.ranks,state.flags])===progress,'总览返回不改变剧情进度');
 for(const ci of [5,10,17,18,22,26]){
   await TEST140.jump(ci,0,'direct','preset');
   ck(state.index===ci,'跳转第'+(ci+1)+'章状态正确');
   if(ci<26)ck(document.querySelectorAll('[data-choice]').some(x=>!x.disabled&&typeof x.onclick==='function'),'跳转第'+(ci+1)+'章仍有可点击选项');
 }
 const cards=document.querySelectorAll('[data-porcelain-key]');
 ck(cards.length===14,'结局14件瓷谱解锁');
 ck((document.querySelector('#app').innerHTML.match(/class="v141-ceramic"/g)||[]).length===14,'14件瓷器独立居中视窗');
 ck(portrait(PEOPLE.baopu).includes('v141-portrait')&&v138Person('baopu').dead,'已故抱朴不再因孕事残留切换旧图');
 cards[0].onclick({preventDefault(){},stopPropagation(){}});
 ck(cards[0].classList.contains('is-flipped'),'点击翻面');
 cards[0].onkeydown({key:'Enter',preventDefault(){},stopPropagation(){}});
 ck(!cards[0].classList.contains('is-flipped'),'键盘翻回');
 const gu=document.querySelectorAll('[data-person]').find(x=>x.dataset.person==='gu');gu?.onclick();
 ck(document.querySelector('#modal').innerHTML.includes('v141-portrait')&&document.querySelector('#modal').innerHTML.includes('data-ceramic-center="gu"'),'人物弹窗立绘及瓷器');
 const kids=childrenView();
 ck((kids.match(/data-character="child_twinGirl_grown"/g)||[]).length===1,'结局皇嗣页面只加二公主成年图');
 ck(!/child_\w+_young|child_infant/.test(kids),'无新幼年图');
 await TEST140.jump(5,0,'direct','preset');
 ck(!childrenView().includes('child_twinGirl_grown'),'幼年二公主不显示成年图');
 await TEST140.jump(26,0,'ning','preset');
 ck(state.index===26&&state.flags.v82SecondController,'先邵后张路线可到元照结局');
 ck(document.querySelectorAll('[data-porcelain-key]').length===14,'另一继后路线瓷谱正常解锁');
 return {checks,failures:checks.filter(x=>!x.pass),build:document.documentElement.dataset.build};
})()
