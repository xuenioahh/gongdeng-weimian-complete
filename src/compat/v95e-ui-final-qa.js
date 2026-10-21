(()=>{try{
  // 王静娴未留牌时，下一幕不再显示她的专属初封方案；保留原 data-choice 索引，跳转逻辑不改。
  const sv=storyView;storyView=function(){let h=sv();try{const ch=CHAPTERS[state.index],st=ch?.steps?.[state.chapterStep||0];if(ch?.title==='御前终选'&&String(st?.heading||'').includes('留了谁，再定她们从哪里起步')&&!(state.flags?.lowConsorts||[]).includes('zhao2')){h=h.replace(/<button[^>]*data-choice="1"[^>]*>[\s\S]*?<\/button>/,'');h=h.replace(/<div class="prose">([\s\S]*?)<\/div>/,(m,inner)=>`<div class="prose">${inner.replace(/<div class="v52-paragraph[^>]*>[\s\S]*?王静娴[\s\S]*?<\/div>/g,'')}</div>`);} }catch(_e){}return h};
  const prevRun=globalThis.V95_QA?.run;globalThis.V95_QA.run=function(s=state){const base=prevRun?prevRun(s):{ok:true,issues:[]};const issues=[...(base.issues||[])];for(const ch of CHAPTERS)for(const st of ch.steps||[])for(const k of st.cast||[])if(!PEOPLE[k])issues.push(`未知场景人物:${ch.title}/${st.heading}/${k}`);return {...base,ok:issues.length===0,issues};};
  document.documentElement.dataset.build='v95';
}catch(e){console.error('v95e ui/qa failed',e)}})();
