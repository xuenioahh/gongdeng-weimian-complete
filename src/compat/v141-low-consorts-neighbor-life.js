(()=>{try{
  if(globalThis.__v141LowConsortNeighbors)return;globalThis.__v141LowConsortNeighbors=true;
  const CH=t=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c?.title===t);
  const alive=(s,k)=>{
    const first=['cao2','zhao2','lin2','ye2','du2','su2'].includes(k);
    if(first&&!(s?.flags?.lowConsorts||[]).includes(k))return false;
    if(first&&s?.flags?.v46LowVictim===k)return false;
    const rank=String(s?.ranks?.[k]||PEOPLE?.[k]?.title||'');
    return !/^(故|废|未入宫|待选|待封)/.test(rank);
  };
  const home=(s,k)=>{
    const keys=['cao2','zhao2','lin2','ye2','du2','su2'];
    const homes=['咸福宫西配殿','钟粹宫东配殿','景阳宫后殿','咸福宫东配殿','钟粹宫西配殿'];
    const i=(s?.flags?.lowConsorts||[]).indexOf(k);
    if(i>=0&&keys.includes(k))return homes[i]||'景阳宫后殿';
    return PEOPLE?.[k]?.home||'';
  };
  const append=(st,key,extra)=>{
    if(!st||st[key])return;
    const old=st.text;
    st.text=s=>{
      const value=typeof old==='function'?old(s):old;
      return [...(Array.isArray(value)?value:[value]),...extra(s)];
    };
    st[key]=true;
  };

  // 三年骤雨里，何超英和王静娴已有各自的本事；补一笔让她们开始看见对方。
  const rain=(CH('宫灯渐繁')?.steps||[]).find(x=>String(x?.heading||'').includes('骤雨，低位宫里'));
  append(rain,'__v141HeWangRain',s=>alive(s,'cao2')&&alive(s,'zhao2')?[
    `西廊积水漫过鞋面，何超英脱了鞋，正要把药包往干处搬。王静娴从后头叫住她，递来一双备用布鞋：“你刚才给别人挑了三条路，没看自己脚下。”`,
    `何超英低头看了看湿透的袜子：“这双要还你。”`,
    `“等你记得还的时候再说。”王静娴把鞋放下，转身去扶廊边快倒的药架。`
  ]:[]);

  // 新人夜膳不只留下笑声，也给宋、梁一个可以继续往来的小习惯。
  const supper=(CH('窗开半扇')?.steps||[]).find(x=>String(x?.heading||'').includes('五月初八'));
  append(supper,'__v141SecondBatchTable',s=>alive(s,'liang2')&&alive(s,'song2')?[
    `散席时，宋文秀把食盒底的小签收进袖袋，梁素贞却把两份没动过的菜分别推回原来的盒里。宋文秀伸手又核了一遍：“我知道你没拿错，我只是怕明日还送错。”`,
    `梁素贞把盒盖扣好：“那你记签，我记哪个菜不难吃。下回别再让它们白跑一趟。”`
  ]:[]);

  // 大封后的冬日回看两组邻里关系；只有玩家实际留下两人且当前居所相合时才出现。
  const afterSeal=(CH('雪尽宫门')?.steps||[]).find(x=>String(x?.heading||'').includes('新封号叫错的第一天'));
  append(afterSeal,'__v141NeighborReturns',s=>{
    const out=[];
    const duHome=home(s,'du2'),liangHome=home(s,'liang2');
    if(alive(s,'du2')&&alive(s,'liang2')&&duHome==='钟粹宫西配殿'&&liangHome==='钟粹宫西配殿')out.push(
      `钟粹宫西配殿的炭单送来时，张淑华把数目从头核了一遍，发现比册上少半篓。梁素贞已经披衣要去问掌事，她叫住她：“先等等，两间屋的份额是不是合记了？”`,
      `果然有半篓拨给了值夜的宫人，只是没人回话。梁素贞把披风解下来：“你算得快。”张淑华把炭盆往她那边推了推：“你走得也快。下回先把话说清。”`
    );
    const linHome=home(s,'lin2'),songHome=home(s,'song2');
    if(alive(s,'lin2')&&alive(s,'song2')&&linHome.startsWith('景阳宫')&&songHome.startsWith('景阳宫'))out.push(
      `景阳宫后殿收晚膳时，宋文秀还在对领物签，桌边那盏温水已经凉了。林淑贞把壶换到她手边：“嗓子干先喝水，别一开口就叫人去找药。”`,
      `宋文秀喝了两口，才把纸收好：“你每次都先问有没有必要用药。”`,
      `“省下一趟跑腿，不也算省事？”林淑贞说。宋文秀笑了一下，没有把那张签带回去重算。`
    );
    return out;
  });
  document.documentElement.dataset.lowConsorts='v141';
}catch(e){console.error('v141 low consort neighbor life failed',e)}})();
