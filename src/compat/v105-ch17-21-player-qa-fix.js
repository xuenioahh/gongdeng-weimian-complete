(()=>{try{
  const BUILD105='v105';
  const CH=t=>CHAPTERS.find(c=>c.title===t);
  const ST=(ch,q)=>ch?.steps?.find(st=>String(st.heading||'').includes(q));
  const arr=v=>Array.isArray(v)?v:[v];
  function patchText(st,key,fn){
    if(!st||!st.text)return; const old=st.text;if(old?.__v105===key)return;
    const w=s=>{const raw=typeof old==='function'?old(s):old;const a=arr(raw).map(x=>fn(String(x),s)).filter(x=>x.trim());return Array.isArray(raw)?a:a[0]};
    w.__v105=key;st.text=w;
  }
  function order(ch,heads){
    if(!ch)return;const old=[...(ch.steps||[])];const used=new Set(),next=[];
    for(const q of heads){const st=old.find(x=>!used.has(x)&&String(x.heading||'').includes(q));if(st){used.add(st);next.push(st)}}
    ch.steps=[...next,...old.filter(x=>!used.has(x))];
  }
  function anchor(title,heading){
    const i=CHAPTERS.findIndex(c=>c.title===title);if(i<0)return;
    const ch=CHAPTERS[i],j=(ch.steps||[]).findIndex(s=>s.heading===heading);state.index=i;state.chapterStep=j>=0?j:Math.min(state.chapterStep||0,Math.max(0,(ch.steps||[]).length-1));
  }
  function apply105(){
    const c17=CH('凤仪宫最后一冬');
    if(c17){
      order(c17,[
        '八月初，皇后先病了一场','第一扇关上的门','八月初六','张元照要的不是药方','八月二十一','八月二十二','第一张告示','城南 · 药铺','城南 · 米行','一盏亮一点的灯','秋疫第三日','秋疫第五日','秋疫第七日','第一次选秀留下的人','九月初 · 水车','帘子两边','三皇子的太医','皇嗣院第一次不按母妃分房','九月初二','白幡不是从凤仪宫先挂起来的','九月初四','还是有人没有熬过去','同一夜 · 玉牒','皇后也开始发热','十月十九','你救不了所有人','凤仪宫最后一页','十月二十三','同日夜 · 她没有划掉','十月二十四','十一月 · 请功折','活下来的人重新开门','腊月初八'
      ]);
      const reopen=ST(c17,'活下来的人重新开门');if(reopen?.choices?.[0])reopen.choices[0].label='继续';
    }

    const c18=CH('雪尽宫门'),c19=CH('凤座无人');
    if(c18){
      order(c18,[
        '第一沓不是喜旨','方小满的名字又被写了一次','两封信出了宫门','大封前夜','红绸终于从库里拿出来','邵明贞的册页','沈知微的册页','闻人含章的册页','周清漪的册页','霍素英的册页','崔静仪的册页','张元照的册页','王静娴的册页','没有站在殿里的人','大封六宫','红旨落定以后','红毡卷走以后','正月十一','正月十二','正月十六'
      ]);
      c18.date='承熙十一年·十二月至承熙十二年正月';
      patchText(ST(c18,'正月十二'),'v105-seal-day-zhang',x=>x.replace('大封第二日，张元照自己去了尚宫局。','大封数日后，张元照自己去了尚宫局。'));
      patchText(ST(c18,'正月十六'),'v105-seal-day-title',x=>x.replace('大封后的第二天，最先乱的是嘴。','大封十日后，最先乱的仍是嘴。'));
    }
    if(c18&&c19){
      const feb=ST(c18,'二月初三')||ST(c19,'二月初三');
      c18.steps=(c18.steps||[]).filter(x=>x!==feb);
      c19.steps=(c19.steps||[]).filter(x=>x!==feb);
      if(feb)c19.steps=[feb,...c19.steps];
    }

    const c20=CH('极西来客');
    if(c20){
      c20.date='承熙十二年·六月末至七月';
      order(c20,['笑声先过门槛','她先问自己是不是一件贡品','第二夜 · 她把御赐香料倒了一半','七月初四','蓝带系在腕上','裴景和问','珂兰话里','那一年，珂兰也埋过人']);
      patchText(ST(c20,'笑声先过门槛'),'v105-kelan-season',x=>x
        .replace('承熙十二年深秋，北风第一次把宫门外的旗吹得绷直。','承熙十二年六月末，长风把宫门外的旗吹得绷直。')
        .replace('颜色都比大晟冬衣亮','颜色都比大晟宫装亮'));
    }

    const c21=CH('长夜未央');
    if(c21){
      c21.date='承熙十二年·七月至十三年正月';
      const three=ST(c21,'三份折子都写了“照旧”');if(three)three.heading='七月上旬 · 三份折子都写了“照旧”';
      patchText(three,'v105-three-memorial-date',x=>x.replace('六月雨多，','七月初仍多雨，').replace('六月的一天，','七月上旬的一天，'));
      const wine=ST(c21,'守制结束以后');if(wine)wine.heading='八月末 · 守制结束以后，酒先回到案上';
      order(c21,['三份折子都写了“照旧”','永和宫的茶凉了两回','七月 · 太后问我','七月中旬','八月夜','八月末 · 守制结束以后','九月 · 裴景和第一次','承熙十二年九月 · 珍妃','九月中旬','九月末','凤印为什么忽然不能再空太久','十月初九','十月 · 夜宴里的人越来越年轻','十月末 · 四个月很快过去','凤印在库里过了第二个冬天']);
      const empress=ST(c21,'凤印为什么忽然不能再空太久');if(empress?.choices?.[0])empress.choices[0].label='继续';
    }
  }

  const SAVE105=new Map([
    ['雪尽宫门::邵明贞的册页','接下来会连续裁定疫后大封的位分与职责。一份存档就足够覆盖这一整组封赏，不必逐人重复存。'],
    ['长夜未央::七月中旬 · 第一次有人把传召退回来','这是张元照第一次明确拒绝私人意义上的传召；你的回应会长期改变这段关系的边界。']
  ]);
  function reminder(){
    document.querySelectorAll('.v105-save-reminder').forEach(x=>x.remove());if(state.view!=='story')return;
    const c=CHAPTERS[state.index],st=c?.steps?.[state.chapterStep||0];if(!c||!st)return;
    const reason=SAVE105.get(`${c.title}::${st.heading}`);if(!reason)return;
    const choices=document.querySelector('.choices')||document.querySelector('.narrative-turn');if(!choices)return;
    const box=document.createElement('div');box.className='v102-save-reminder v105-save-reminder';
    box.innerHTML=`<div><b>关键分岔 · 可考虑存档</b><p>${reason}</p></div><button type="button">打开存档栏</button>`;
    box.querySelector('button').onclick=()=>document.querySelector('#v52-archives')?.click();choices.parentNode.insertBefore(box,choices);
  }

  const t0=CHAPTERS[state.index]?.title||'',h0=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';apply105();anchor(t0,h0);
  const oldEffects=applyChoiceEffects;
  applyChoiceEffects=function(c){const t=CHAPTERS[state.index]?.title||'',h=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';const out=oldEffects(c);if(!globalThis.__canonicalStory155){apply105();anchor(t,h);}return out;};
  const oldRender=render;
  render=function(){apply105();const t=CHAPTERS[state.index]?.title||'',h=CHAPTERS[state.index]?.steps?.[state.chapterStep||0]?.heading||'';let out;try{out=oldRender()}catch(e){console.warn('v105 intercepted legacy render error',e)}apply105();anchor(t,h);try{const app=document.querySelector('#app');if(app){app.innerHTML=nav()+(state.view==='story'?storyView():state.view==='people'?peopleView():state.view==='children'?childrenView():state.view==='chronicle'?chronicleView():mapView());bind();}}catch(e){console.error('v105 direct render failed',e)}reminder();document.documentElement.dataset.build=BUILD105;document.title='宫灯未眠 · 第17至21章玩家测试修复 v105';return out;};
  try{render()}catch(e){console.error('v105 initial render failed',e)}
}catch(e){console.error('v105 chapter 17-21 player QA patch failed',e)}})();
