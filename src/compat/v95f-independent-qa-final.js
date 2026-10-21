(()=>{try{
  globalThis.V95_QA=globalThis.V95_QA||{};
  globalThis.V95_QA.run=function(s=state){
    const issues=[],CH=t=>CHAPTERS.find(c=>c.title===t),AS=v=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return []}};
    const c13=CH('空宫点灯'),c14=CH('窗开半扇'),c6=CH('宫灯渐繁'),c5=CH('御前终选');
    const txt=ch=>(ch?.steps||[]).flatMap(st=>AS(st.text)).join('\n');
    if(/张元照正式入宫的第三日|张元照入宫第五日|终选散后，含章只问张元照一句/.test(txt(c13)))issues.push('第二次采选残留元照旧入宫线');
    if(/待选秀女|四个新人/.test(txt(c14)))issues.push('窗开半扇残留旧身份');
    if(!String((c6?.steps||[]).find(st=>String(st.heading||'').includes('年资册上多了一行'))?.heading||'').includes('五月末'))issues.push('承熙六年标题倒序');
    if(!(c13?.steps||[]).some(st=>String(st.heading||'').includes('终选最后，只剩三张名帖')))issues.push('梁宋许终选缺失');
    const low=(c5?.steps||[]).find(st=>st.v95ManualRoster);if(!low||low.choices?.length!==1)issues.push('第一次低位自由点名未锁定');
    for(const ch of CHAPTERS){if(!ch?.steps?.length)issues.push(`空章节:${ch?.title}`);for(const st of ch.steps||[]){if(!st?.choices?.length)issues.push(`无跳转:${ch.title}/${st.heading}`);for(const k of st.cast||[])if(!PEOPLE[k])issues.push(`未知场景人物:${ch.title}/${st.heading}/${k}`)}}
    return {ok:issues.length===0,issues,chapters:CHAPTERS.length,steps:CHAPTERS.reduce((n,c)=>n+(c.steps?.length||0),0),structureSnapshot:'v95-final'};
  };
}catch(e){console.error('v95f QA failed',e)}})();
