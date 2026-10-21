const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  let page;
  try{
    page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const read=async(chapterTitle,heading,route='direct')=>{
      const pos=await page.evaluate(({chapterTitle,heading,route})=>{
        const ci=CHAPTERS.findIndex(c=>c.title===chapterTitle);
        const si=TEST140.scenes(ci,route).findIndex(s=>s.heading.includes(heading));
        return {ci,si};
      },{chapterTitle,heading,route});
      assert.ok(pos.ci>=0&&pos.si>=0,chapterTitle+' / '+heading+' / '+route);
      await page.evaluate(({ci,si,route})=>TEST140.jump(ci,si,route,'preset'),{...pos,route});
      return page.locator('.prose').innerText();
    };
    for(const route of ['direct','ning']){
      let t=await read('帘后朱笔','张后四签',route);
      assert.ok(t.includes('外朝的分歧也摆到了明面上'));
      assert.ok(!t.includes('风向终于更像派别'));
      t=await read('帘后朱笔','永和宫那声',route);
      assert.ok(t.includes('永和宫灯下还有许多我没见过的日子'));
      assert.ok(t.includes('往后怎样相处，怎样同孩子说明'));
      t=await read('帘后朱笔','一枚银扣',route);
      assert.ok(t.includes('旧簿只记了几行')&&t.includes('已经无从问话'));
      assert.ok(!t.includes('事情终于能接起来'));
      t=await read('帘后朱笔','只剩这一张纸',route);
      assert.ok(t.includes('孩子是否同行，也要随处分一并定下'));
      assert.ok(t.includes('错不在看过折子，而在把十二份副稿带回永和宫'));
      t=await read('西华门外','蓝玻璃鸟又响',route);
      assert.ok(t.includes('旧海棠的枝叶响了许久')&&t.includes('听见，齐声喊'));
      assert.ok(!t.includes('条件反射似的'));
      t=await read('西华门外','二公主已经只认',route);
      assert.ok(t.includes('礼部仍按寻常婚议往下办'));
      assert.ok(!t.includes('礼部还在装作'));
      t=await read('西华门外','绮春宫最后一次',route);
      assert.ok(t.includes('眼下的细纹和鬓边的白发'));
      assert.ok(!t.includes('这就够了'));
      t=await read('万家灯火','她第一次没有人可以回头问',route);
      assert.ok(t.includes('从顺王府到凤仪宫')&&t.includes('这支笔是我自己接的'));
      t=await read('万家灯火','城外的灯比宫灯多',route);
      assert.ok(t.includes('阿芙把缺页补回来时'));
      assert.ok(t.includes('景阳宫窗边那些一直没有填满的小格'));
      assert.ok(!t.includes('像当年景阳宫窗外那些没有写完的纸'));
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,routes:['direct','ning'],chapters:[24,25,26],scenesChecked:18,errors}));
  }finally{
    const timeout=()=>new Promise(resolve=>setTimeout(resolve,3000));
    if(page&&!page.isClosed())await Promise.race([page.close(),timeout()]);
    await Promise.race([browser.close(),timeout()]);
  }
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
