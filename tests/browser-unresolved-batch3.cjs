const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  let page;
  try{
    page=await browser.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    const read=async(chapter,heading,flags={},route='direct')=>page.evaluate(({chapter,heading,flags,route})=>{
      const ci=CHAPTERS.findIndex(c=>c.title===chapter);
      const si=TEST140.scenes(ci,route).findIndex(s=>s.heading.includes(heading));
      if(ci<0||si<0)throw new Error('Missing scene: '+chapter+' / '+heading+'; build='+document.documentElement.dataset.build+'; available='+TEST140.scenes(ci,route).map(x=>x.heading).join(' | '));
      TEST140.jump(ci,si,route,'preset');
      const st=CHAPTERS[ci].steps.find(x=>x.heading.includes(heading));
      const s={...state,flags:{...state.flags,...flags}};
      const lines=typeof st.text==='function'?st.text(s):st.text;
      return (Array.isArray(lines)?lines:[lines]).join('\n');
    },{chapter,heading,flags,route});

    for(const route of ['direct','ning']){
      let t=await read('帘后朱笔','只剩这一张纸',{v65ZhangGatePolicy:'keep',v44NewEmpress:route==='direct'?'zhangyuanzhao':'ning'},route);
      if(route==='direct')assert.ok(t.includes('张元照在空白处分纸旁写下“东角门”三字'));
      else assert.ok(t.includes('没有形成张后与和妃共同参与御前文牍'));
      assert.ok(!t.includes('她也想起'));

      t=await read('西华门外','他自己把西华门那一夜',{},route);
      assert.ok(t.includes('托孤便条')&&t.includes('末尾是常福的押'));
      assert.ok(t.includes('便条只能证明他曾把孩子交出去'));
      assert.ok(t.includes('宗人府又核了自陈与便条的笔迹'));
      assert.ok(!t.includes('私交纸'));

      t=await read('万家灯火','她第一次没有人可以回头问',{v81PrinceOpenEnding:true},route);
      assert.ok(t.includes('新帝杨顺恭尚年轻'));
      assert.ok(!t.includes('新帝杨顺谦已经成年'));
      t=await read('万家灯火','她第一次没有人可以回头问',{v81PrinceOpenEnding:false},route);
      assert.ok(t.includes('新帝杨顺谦已经成年'));

      for(const [fate,expected] of [['death','知微也死了'],['fief','知微在远方的封地'],['religion','知微在宫外女观']]){
        t=await read('万家灯火','她第一次没有人可以回头问',{v75ShenFate:fate},route);
        assert.ok(t.includes(expected),route+' / 沈知微 '+fate);
      }
      for(const [fate,expected] of [['dead','银簪已随她入土'],['return','闻人蘅已经离京'],['west','闻人蘅仍在西苑']]){
        t=await read('万家灯火','城外的灯比宫灯多',{wenhengFate:fate,wenhengDead:false},route);
        assert.ok(t.includes(expected),route+' / 闻人蘅 '+fate);
      }
      t=await read('万家灯火','城外的灯比宫灯多',{wenhengFate:undefined,wenhengDead:false,v46ChildVictims:['fifthPrincess']},route);
      assert.ok(t.includes('闻人蘅扶正银簪时那一点停顿'));
      assert.ok(!t.includes('闻人蘅仍在西苑'));
      if(route==='direct')assert.ok(t.includes('宁矣的名字仍在玉牒上'));
      else assert.ok(!t.includes('宁矣'));
      assert.ok(!t.includes('宁矣不再事事先问可以不可以'));
      t=await read('万家灯火','城外的灯比宫灯多',{v46ChildVictims:[]},route);
      if(route==='direct')assert.ok(t.includes('宁矣不再事事先问可以不可以'));
      else assert.ok(!t.includes('宁矣'));
      t=await read('万家灯火','城外的灯比宫灯多',{v46ChildVictims:['twinGirl']},route);
      assert.ok(t.includes('二公主的名字仍留在玉牒上'));
      assert.ok(!t.includes('女儿后来终于不再替所有人圆场'));
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,routes:['direct','ning'],evidence:true,perspective:true,heirOutcomes:true,shenOutcomes:3,wenhengOutcomes:4,childOutcomes:2,errors}));
  }finally{
    const timeout=()=>new Promise(resolve=>setTimeout(resolve,3000));
    if(page&&!page.isClosed())await Promise.race([page.close(),timeout()]);
    await Promise.race([browser.close(),timeout()]);
  }
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
