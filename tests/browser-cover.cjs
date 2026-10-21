const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const url=pathToFileURL(path.join(root,'index.html')).href;
const output=process.env.COVER_OUTPUT||'/private/tmp/gongdeng-opening-preview';
fs.mkdirSync(output,{recursive:true});

async function geometry(page,label){
  const layout=await page.evaluate(()=>{
    const bounds=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
    return {viewport:{width:innerWidth,height:innerHeight},scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,title:bounds('#opening-title'),verse:bounds('.opening-verse'),entry:bounds('#enter-story'),topline:bounds('.opening-topline'),bottomline:bounds('.opening-bottomline'),copy:bounds('.opening-copy'),opening:bounds('.palace-opening'),lines:[...document.querySelectorAll('.opening-verse span')].map(el=>el.textContent),fonts:getComputedStyle(document.querySelector('#opening-title')).fontFamily};
  });
  assert.ok(layout.scrollWidth<=layout.viewport.width+1,label+': horizontal overflow');
  for(const key of ['title','verse','entry'])assert.ok(layout[key].left>=0&&layout[key].right<=layout.viewport.width+1,label+': '+key+' outside viewport');
  assert.ok(layout.title.bottom<layout.verse.top,label+': overlapping title and verse');
  assert.ok(layout.verse.bottom<layout.entry.top,label+': overlapping verse and entry');
  assert.ok(layout.entry.bottom<layout.bottomline.top,label+': entry collides with footer');
  assert.ok(layout.copy.top>layout.topline.bottom,label+': content collides with controls');
  if(layout.viewport.height>=700)assert.ok(layout.scrollHeight<=layout.viewport.height+2,label+': opening does not fit screen');
  assert.deepEqual(layout.lines,['红颜总是薄命','书生几番多情','帝王身不由己','唯有那看客清醒','相逢难逃别离','姻缘断，情难续']);
  assert.equal(await page.locator('#app > header,#app > .test140').count(),0,label+': navigation interrupts opening');
  return layout;
}

(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const reports=[],errors=[];
  try{
    const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
    const page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
    await page.addInitScript(()=>{const Native=window.AudioContext;if(Native){window.__audioStarts=0;window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audioStarts++;}}}});
    await page.goto(url);
    await page.locator('.palace-opening').waitFor();
    assert.equal(await page.evaluate(()=>window.__audioStarts),0,'audio started before interaction');
    assert.equal(await page.locator('.opening-entry').evaluate(el=>el.inert),true,'entry available during its invisible phase');
    await page.screenshot({path:path.join(output,'desktop-night.png')});
    await page.waitForTimeout(2200);
    const stagger=await page.locator('.opening-verse span').evaluateAll(elements=>elements.map(el=>Number(getComputedStyle(el).opacity)));
    assert.ok(stagger[0]>stagger[5],'verse did not reveal in order');
    assert.ok(stagger.every((value,i)=>!i||stagger[i-1]>=value-.03),'verse order reversed');
    await page.screenshot({path:path.join(output,'desktop-verse.png')});
    await page.waitForFunction(()=>!document.querySelector('.opening-entry')?.inert,{},{timeout:6000});
    reports.push({name:'Timed opening',stagger,geometry:await geometry(page,'desktop motion')});
    await page.screenshot({path:path.join(output,'desktop.png')});
    await page.locator('#opening-sound').click();
    await page.waitForFunction(()=>document.querySelector('#opening-sound').getAttribute('aria-pressed')==='true');
    assert.equal(await page.evaluate(()=>window.__audioStarts),1,'night sound did not share one audio context');
    await page.locator('#opening-sound').click();
    await page.waitForFunction(()=>document.querySelector('#opening-sound').getAttribute('aria-pressed')==='false');
    await page.locator('#opening-motion').click();
    assert.equal(await page.locator('html').getAttribute('data-motion'),'off');
    assert.ok(await page.locator('.opening-world *').evaluateAll(elements=>elements.every(el=>getComputedStyle(el).animationName==='none')),'motion toggle left decorative animation running');
    await page.locator('#opening-motion').click();
    await page.locator('#enter-story').click();
    assert.equal(await page.locator('.opening--departing').count(),1,'missing entry transition');
    await page.locator('.chapter').waitFor();
    assert.equal(await page.locator('.test140').count(),1,'test tools did not return in story');
    const before=await page.evaluate(()=>({index:state.index,step:state.chapterStep,progress:localStorage.getItem(GAME_CONFIG.storage.progress)}));
    await page.locator('#show-cover').click();
    assert.equal(await page.locator('#enter-story span').innerText(),'续上灯火');
    assert.equal(await page.evaluate(()=>localStorage.getItem(GAME_CONFIG.storage.progress)),before.progress,'returning to cover changed saved progress');
    await page.locator('#v52-archives').click();
    await page.locator('[data-save-slot="1"]').click();
    await page.locator('#modal .close').click();
    await page.locator('#enter-story').click();
    await page.locator('.chapter').waitFor();
    await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});
    await page.locator('[data-choice]:not(:disabled)').first().click();
    await page.waitForFunction(step=>state.chapterStep!==step||state.index!==0,before.step);
    await page.locator('#show-cover').click();
    await page.locator('#v52-archives').click();
    await page.locator('[data-load-slot="1"]').click();
    await page.locator('.chapter').waitFor();
    assert.deepEqual(await page.evaluate(()=>({index:state.index,step:state.chapterStep})),{index:before.index,step:before.step},'load from cover did not restore saved position');
    await page.reload();await page.locator('.chapter').waitFor();
    assert.deepEqual(await page.evaluate(()=>({index:state.index,step:state.chapterStep})),{index:before.index,step:before.step},'cover altered story position');
    await page.locator('#show-cover').click();await page.locator('#v52-background').click();
    await page.locator('#v52-background-enter').click();await page.locator('.chapter').waitFor();
    reports.push({name:'Night sound, motion setting, transition, save/load from cover, saved progress and background return',passed:true});
    await context.close();

    for(const viewport of [{width:390,height:844},{width:320,height:740},{width:844,height:390}]){
      const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage();
      page.on('pageerror',error=>errors.push(error.message));
      await page.goto(url+'?mode=story');await page.locator('.palace-opening').waitFor();
      assert.equal(await page.locator('.opening-entry').evaluate(el=>el.inert),false,'reduced motion delayed entry');
      assert.ok(await page.locator('.palace-opening *').evaluateAll(elements=>elements.every(el=>getComputedStyle(el).animationName==='none')),'reduced motion has animation');
      reports.push({name:'Reduced motion '+viewport.width,geometry:await geometry(page,'reduced '+viewport.width)});
      await page.screenshot({path:path.join(output,'mobile-'+viewport.width+'.png'),fullPage:true});
      await page.locator('#enter-story').click();await page.locator('.chapter').waitFor();
      assert.equal(await page.locator('.test140').count(),0,'reading mode has test panel');
      await context.close();
    }
    const skipContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'no-preference'}),skipPage=await skipContext.newPage();
    skipPage.on('pageerror',error=>errors.push(error.message));
    await skipPage.goto(url);await skipPage.locator('#opening-skip').click();
    assert.equal(await skipPage.locator('.opening-entry').evaluate(el=>el.inert),false,'skip did not make entry available');
    await skipPage.locator('#enter-story').click();await skipPage.locator('.chapter').waitFor();
    await skipContext.close();
    assert.deepEqual(errors,[],'browser errors');
    reports.push({name:'Skip opening and browser errors',passed:true});
    fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(reports,null,2));
    console.log(JSON.stringify(reports,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
