const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const chapter=await page.evaluate(()=>CHAPTERS.findIndex(ch=>ch.title==='中宫空悬'));
    const scene=async(name,route)=>{
      const si=await page.evaluate(({chapter,name})=>CHAPTERS[chapter].steps.findIndex(st=>st.heading.includes(name)),{chapter,name});
      assert.ok(si>=0,name);
      await page.evaluate(({chapter,si,route})=>TEST140.jump(chapter,si,route,'preset'),{chapter,si,route});
      return page.locator('.prose').innerText();
    };
    for(const route of ['direct','ning']){
      let text=await scene('一年多以后',route);
      assert.ok(text.includes('礼部请立中宫疏')&&text.includes('传话的宫人'));
      assert.ok(!text.includes('像站队了'));
      text=await scene('不是她的错',route);
      assert.ok(text.includes('紫檀')||text.includes('书匣'));
      assert.ok(text.includes('三皇子')&&text.includes('两份都送'));
      const variants=await page.evaluate(()=>{
        const st=CHAPTERS[state.index].steps[state.chapterStep];
        return ['disciplined','shielded','private'].map(value=>st.text({...state,flags:{...state.flags,v47PrinceBoundary:value}}).join('\n'));
      });
      assert.ok(variants[0].includes('东所私传内廷物件的路也断了'));
      assert.ok(variants[1].includes('东所却没有受罚'));
      assert.ok(variants[2].includes('宗人府没有立案'));
      text=await scene('东角门开了一刻钟',route);
      assert.ok(text.includes('谢绍庭指给我看')&&text.includes('西门那条窄道'));
      assert.equal(await page.locator('.moment-figure[data-scene-asset="101"]').count(),0);
      const detail=page.locator('.scene-site-map');
      assert.equal(await detail.count(),1);
      await detail.locator('summary').focus();await page.keyboard.press('Enter');
      assert.equal(await detail.evaluate(e=>e.open),true);
      assert.ok((await detail.innerText()).includes('我到场所见'));
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,chapter:chapter+1,routes:['direct','ning'],variants:3,fireMap:'keyboard and mobile checked',removedArt:'095,101',errors}));
  }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
