(()=>{try{
  if(globalThis.__v140ZhangShenRomance)return;globalThis.__v140ZhangShenRomance=true;
  const chapter=title=>(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(c=>c?.title===title);
  const step=(ch,needle)=>(ch?.steps||[]).find(s=>String(s?.heading||'').includes(needle));
  const appendText=(st,key,extra)=>{
    if(!st||st[key])return;
    const old=st.text;
    st.text=s=>{
      const value=typeof old==='function'?old(s):old;
      return [...(Array.isArray(value)?value:[value]),...extra(s)];
    };
    st[key]=true;
  };
  const vacancy=chapter('中宫空悬');
  // Keep the existing scene count and save positions stable; this is a few days later within the same beat.
  appendText(step(vacancy,'最大的秘密说完以后'),'__v140MutualChoice',()=>[
    `几日后，张元照又到了永和宫。她带来的不是册子，只把一小包新炒的松子放在桌上：“路过御膳房，闻见香，拿了些。”`,
    `沈知微剥开一粒，皱眉：“炒过头了。”`,
    `“我也觉得。可已经拿来了。”`,
    `“那就慢慢吃，别浪费。”她把小碟推到两人中间。`,
    `她们说了些不急着办的事：窗纸漏风，花房送错了两回水仙，张元照还是不爱吃太甜的糕。说到一半，外间宫女进来换水，谁也没有急着把话收住。`,
    `宫女退下后，沈知微才问：“你最近总来，是怕我一个人闷？”`,
    `张元照剥松子的手停住：“起初是。后来不是。”`,
    `“那后来是什么？”`,
    `张元照把剥好的松仁放在碟里，没有看她：“我想见你。不是为了沈家的旧案，也不是来问你哪句话该怎么写。”`,
    `沈知微低头看那几粒松仁，隔了一会儿才说：“我也会等你来。有时听见宫门响，还会先想是不是你。”`,
    `张元照抬起眼。沈知微没有躲开。`,
    `“这话说出来，会不会叫你为难？”她问。`,
    `“会。”张元照答得很实在，“可我不想因此假装没有。”`,
    `沈知微伸手，指尖碰了碰她搁在桌边的手。张元照没有抽开，反手轻轻握住她。她们没有再说什么，也没有把这件事交给皇帝替她们命名。`,
    `临走前，张元照把剩下的松子包好，约定下回带些没炒焦的来。沈知微说：“下回只许带松子，不许带折子。”她答应了。`
  ]);

  const late=chapter('帘后朱笔');
  // Add ordinary shared life after the child notices them and before the state case, without changing step IDs or choices.
  appendText(step(late,'永和宫那声“元照”被孩子听见了'),'__v140SharedDays',()=>[
    `入冬以前，她们又见过几回。一次下雨，张元照的轿子停在永和宫外，等雨小些才走。沈知微拿出一盘桂花糕，她嫌甜，只吃了半块；沈知微便把剩下半块收回自己那边。`,
    `另一次，张元照带来一册刚改好的宫务条目，放到门边就被沈知微指了指：“说好不带折子。”`,
    `“这是宫务册，不是折子。”`,
    `“你每回都能给它换个名字。”沈知微把册子合上，放到够不着的高案上。`,
    `张元照看着她，笑出了声。她们后来谈了半晌窗下那盆水仙，谁也没去取册子。`,
    `有时张元照只是坐一刻钟，临走前替沈知微把茶盏挪离窗缝；有时沈知微会留她吃完一碟点心再走。她们在人前仍按位分称呼，独处时却渐渐少了“娘娘”和“臣妾”。`,
    `这些时候没有替她们挡住后来那场处分，也没有让谁欠谁一生。它们只是几段过完了的日子：雨停，茶凉，下一回仍有人记得带上松子。`
  ]);

  // The first private touch is in the later, revised account of the emperor's night audience.
  // Keep it grounded in choice and mutual consent rather than making consent implicit.
  const touch=step(vacancy,'他睡着以后');
  if(touch&&!touch.__v140RomanceTouch){
    const old=touch.text;
    touch.text=s=>{
      const value=typeof old==='function'?old(s):old;
      const lines=Array.isArray(value)?value:[value];
      return lines.map(line=>String(line)
        .replace('她把茶放下，走到我面前。墙上的两道影子因为她走近，慢慢叠到一处。','她把茶放下，走到我面前，在半臂外停住，先问：“我能替你把鬓边的头发拢好吗？”')
        .replace('我应该后退。这个判断很清楚，甚至不需要写进任何册子。可我没有动。','我点了点头。')
        .replace('她走近时，我知道自己该退一步，可我没有动。','我点了点头。')
        .replace('她的指尖最后只碰到我鬓边，把一缕不知什么时候散下来的头发拢到耳后。很轻。','她这才伸手，把一缕散下来的头发拢到我耳后。指尖很轻，很快便收回去。')
        .replace('这件事最不应该发生在我身上。可我没有去回想。','我没有躲，也没有把这件事说成无意。')
      );
    };
    touch.__v140RomanceTouch=true;
  }
  document.documentElement.dataset.romance='v140';
}catch(e){console.error('v140 Zhang-Shen romance line failed',e)}})();
