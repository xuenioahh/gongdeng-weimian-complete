const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'tests/results'),report={checks:[],errors:[],screenshots:[]};
const note=(name,value=true)=>{report.checks.push({name,value});console.log(name)};
const expected=vm.runInNewContext(fs.readFileSync(path.join(root,'src/data/palace-coordinates.js'),'utf8')+';JSON.stringify(V145_MAP_COORDS)');
const layout=async page=>{const a=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,viewport:document.querySelector('.atlas-viewport').clientWidth,world:document.querySelector('.atlas-world').clientWidth,labels:[...document.querySelectorAll('.atlas-point')].map(b=>({name:b.textContent.trim(),font:parseFloat(getComputedStyle(b).fontSize),x:b.style.left,y:b.style.top})),overlap:[]}));assert.ok(a.scrollWidth<=a.width+1);return a};
async function main(){
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1050}});page.on('pageerror',e=>report.errors.push(e.message));page.on('dialog',d=>d.accept());
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.waitForTimeout(600);
  await page.evaluate(()=>{state.intro=true;state.view='map';render()});await page.locator('.palace-atlas-148').waitFor();
  const data=await page.evaluate(()=>V55_MAP_SPOTS.map(s=>[s.name,[s.x,s.y]]));assert.deepEqual(Object.fromEntries(data),JSON.parse(expected));assert.equal(await page.locator('.atlas-point').count(),17);note('all 17 geographical coordinates preserved');
  const untouched=await page.evaluate(()=>JSON.stringify(state));
  const gu=data.findIndex(x=>x[0]==='凤仪宫'),shun=data.findIndex(x=>x[0]==='顺王府'),zhang=data.findIndex(x=>x[0]==='景阳宫');
  await page.locator(`[data-v55spot="${gu}"]`).hover();assert.equal(await page.locator('#map-info h2').textContent(),'凤仪宫');assert.match(await page.locator('#map-info').textContent(),/顾明宜/);assert.equal(await page.locator('.atlas-site.is-selected').count(),1);
  await page.locator(`[data-atlas-seek="${zhang}"]`).click();assert.ok(!(await page.locator('#map-info').textContent()).includes('张元照'));assert.ok(!/病逝|崩|封院|毒药|薨/.test(await page.locator('#map-info').textContent()));note('hover highlights correct building; early residence cards reveal no future residents or fates');
  await page.locator('[data-atlas-zoom="in"]').click();const large=await page.locator('.atlas-world').evaluate(e=>e.clientWidth);await page.locator('[data-atlas-zoom="out"]').click();assert.ok(await page.locator('.atlas-world').evaluate(e=>e.clientWidth)<large);
  await page.locator(`[data-atlas-seek="${shun}"]`).click();await page.waitForTimeout(600);assert.match(await page.locator('#map-info').textContent(),/城外/);assert.equal(await page.locator('.atlas-west-selected').count(),1);
  await page.locator('[data-atlas-zoom="fit"]').click();assert.equal(await page.locator('.palace-atlas-148').getAttribute('data-overview'),'true');assert.ok(await page.locator('.atlas-world').evaluate(e=>e.clientWidth)<=await page.locator('.atlas-viewport').evaluate(e=>e.clientWidth));
  await page.locator('[data-atlas-zoom="read"]').click();const l=await layout(page);note('zoom, overview and seeking outside palace',l);
  assert.equal(await page.evaluate(()=>JSON.stringify(state)),untouched);note('all map interactions leave story / saves unchanged');
  const shot=async name=>{await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(200);await page.screenshot({path:path.join(out,name),fullPage:true});report.screenshots.push(name)};
  await page.locator(`[data-atlas-seek="${gu}"]`).click();await shot('palace-atlas-desktop.png');
  for(const size of [{width:390,height:844},{width:320,height:568},{width:667,height:375}]){
   await page.setViewportSize(size);await page.waitForTimeout(100);note('responsive '+size.width+'×'+size.height,await layout(page));
   await page.locator('[data-atlas-zoom="fit"]').click();const overview=await layout(page);assert.ok(overview.world<=overview.viewport+1);
   if(size.width===390)await shot('palace-atlas-mobile-overview.png');
   await page.locator(`[data-atlas-seek="${shun}"]`).click();await page.waitForTimeout(650);assert.equal(await page.locator('#map-info h2').textContent(),'顺王府');
   const b=await page.locator(`[data-v55spot="${shun}"]`).boundingBox(),v=await page.locator('.atlas-viewport').boundingBox();assert.ok(b.x+b.width>v.x&&b.x<v.x+v.width);assert.ok(b.y+b.height>v.y&&b.y<v.y+v.height);
   assert.ok(await page.locator(`[data-v55spot="${shun}"]`).evaluate(e=>parseFloat(getComputedStyle(e).fontSize))>=14);
   if(size.width===390)await shot('palace-atlas-mobile-detail.png');
  }
  await page.locator('.atlas-viewport').focus();const beforeKey=await page.locator('.atlas-viewport').evaluate(e=>e.scrollLeft);await page.keyboard.press('ArrowRight');assert.ok(await page.locator('.atlas-viewport').evaluate(e=>e.scrollLeft)>beforeKey);note('keyboard pan and mobile name registry reach outside palace');
  await page.setViewportSize({width:1440,height:1050});await page.locator('[data-atlas-zoom="in"]').click();
  const v=await page.locator('.atlas-viewport').boundingBox(),beforeDrag=await page.locator('.atlas-viewport').evaluate(e=>e.scrollLeft);await page.mouse.move(v.x+v.width*.8,v.y+45);await page.mouse.down();await page.mouse.move(v.x+v.width*.8-120,v.y+45,{steps:6});await page.mouse.up();assert.ok(await page.locator('.atlas-viewport').evaluate(e=>e.scrollLeft)>beforeDrag);note('mouse drag pans map');
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);assert.equal(await page.locator('.atlas-ripples').evaluate(e=>getComputedStyle(e).animationName),'none');note('reduced motion stops water animation');
  await page.locator('[data-view="story"]').first().click();assert.equal(await page.locator('.palace-atlas-148').count(),0);await page.locator('[data-view="map"]').first().click();assert.equal(await page.locator('.palace-atlas-148').count(),1);note('navigation away and return mount cleanly');
  await page.evaluate(async()=>{const si=TEST140.scenes(11,'direct').findIndex(s=>s.heading.includes('三张新规'));if(si<0)throw Error('rules not found');await TEST140.jump(11,si,'direct','preset')});
  const prose=await page.locator('.prose').textContent();assert.match(prose,/第一张：旧物要复查/);assert.match(prose,/第二张：药送到病人手里之前/);assert.match(prose,/第三张：妃嫔牵涉案子/);assert.match(prose,/谁在场，也得记下来/);assert.ok(!/复验至少两处|问询时在场者|主动报病、求医不得先行问罪/.test(prose));
  const storyBefore=await page.evaluate(()=>({index:state.index,step:state.chapterStep,flags:{...state.flags},choices:CHAPTERS[state.index].steps[state.chapterStep].choices.map(c=>({label:c.label,effects:c.effects,result:c.result}))}));
  const old=await browser.newPage();await old.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body:fs.readFileSync(path.join(root,'backups/2026-10-09-before-palace-atlas/app.js'),'utf8')}));await old.goto(pathToFileURL(path.join(root,'index.html')).href);await old.waitForTimeout(600);await old.evaluate(async()=>{const si=TEST140.scenes(11,'direct').findIndex(s=>s.heading.includes('三张新规'));await TEST140.jump(11,si,'direct','preset')});
  const oldBefore=await old.evaluate(()=>({index:state.index,step:state.chapterStep,flags:{...state.flags},choices:CHAPTERS[state.index].steps[state.chapterStep].choices.map(c=>({label:c.label,effects:c.effects,result:c.result}))}));assert.deepEqual(storyBefore,oldBefore);await old.close();note('plain-language rules render in actual chapter; original choices / effects / flags unchanged');
  await page.setViewportSize({width:390,height:844});await shot('three-rules-mobile.png');await page.locator('[data-choice="0"]').click();assert.equal(await page.evaluate(()=>state.flags.v59FangRulesPosted),true);note('rules continue normally and retain original story effect');
  await page.evaluate(()=>{state.view='map';render()});await page.locator(`[data-atlas-seek="${zhang}"]`).click();assert.match(await page.locator('#map-info').textContent(),/张元照/);note('later card uses actually known current resident');
  const preview=await browser.newPage({viewport:{width:1440,height:1050},reducedMotion:'reduce'});preview.on('pageerror',e=>report.errors.push(e.message));await preview.goto(pathToFileURL(path.join(root,'index.html')).href+'?mode=story');await preview.waitForTimeout(600);await preview.evaluate(()=>{state.intro=true;state.view='map';render()});await preview.waitForTimeout(100);await preview.screenshot({path:path.join(out,'palace-atlas-desktop.png'),fullPage:true});
  await preview.setViewportSize({width:390,height:844});await preview.locator('[data-atlas-zoom="fit"]').click();await preview.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await preview.waitForTimeout(150);await preview.screenshot({path:path.join(out,'palace-atlas-mobile-overview.png'),fullPage:true});await preview.locator(`[data-atlas-seek="${shun}"]`).click();await preview.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await preview.waitForTimeout(650);await preview.screenshot({path:path.join(out,'palace-atlas-mobile-detail.png'),fullPage:true});await preview.close();note('normal story mode desktop and mobile previews');
  assert.deepEqual(report.errors,[]);report.pass=true;fs.writeFileSync(path.join(out,'palace-atlas-v148.json'),JSON.stringify(report,null,2));console.log('PALACE ATLAS PASS');
 }catch(e){report.failure=e.stack;fs.writeFileSync(path.join(out,'palace-atlas-v148.json'),JSON.stringify(report,null,2));throw e}finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
