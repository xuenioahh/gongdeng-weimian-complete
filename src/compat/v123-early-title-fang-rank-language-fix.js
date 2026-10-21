(()=>{try{
  const CH=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const ST=(c,q)=>c?.steps?.find(x=>String(x.heading||'').includes(q));
  const ARR=(v,s)=>{try{const x=typeof v==='function'?v(s):v;return Array.isArray(x)?x:[x]}catch(_e){return[]}};
  const rankN=r=>({答应:0,常在:1,贵人:2,嫔:3,妃:4,贵妃:5,皇贵妃:6}[String(r||'').replace(/^(方|顺|昭|珍|蘅|周|徽|晋|元|文|和)/,'')]??-1);

  function wrap(st,key,fn){
    if(!st||!st.text)return;
    if(st.text.__v123key===key)return;
    const old=st.text;
    const f=s=>ARR(old,s).map(x=>fn(String(x??''),s));
    f.__v123key=key;st.text=f;
  }
  function earlyWenrenText(x){
    return String(x)
      .replace(/昭(?:答应|常在|贵人|嫔|妃|贵妃|皇贵妃)/g,'闻人抱朴')
      .replace(/珍(?:答应|常在|贵人|嫔|妃|贵妃|皇贵妃)/g,'闻人含章');
  }
  function earlyWenhengText(x){return String(x).replace(/蘅(?:答应|常在|贵人|嫔|妃|贵妃|皇贵妃)/g,'闻人蘅')}
  function earlyFangText(x){return String(x).replace(/方(?:答应|常在|贵人)|顺贵人/g,'方小满')}

  function applyV123(){
    // 1) 声音面板只写姓名，不提前泄露以后封号。
    try{
      if(globalThis.VOICE_CAST){
        if(VOICE_CAST.baopu)VOICE_CAST.baopu.label='闻人抱朴';
        if(VOICE_CAST.hanzhang)VOICE_CAST.hanzhang.label='闻人含章';
        if(VOICE_CAST.wenheng)VOICE_CAST.wenheng.label='闻人蘅';
        if(VOICE_CAST.fang)VOICE_CAST.fang.label='方小满';
      }
    }catch(_e){}

    // 2) 方小满最低两级用姓氏称呼；贵人以后沿用已有“顺”封号。
    if(typeof courtTitle==='function'&&!globalThis.__v123CourtTitle){
      globalThis.__v123CourtTitle=true;
      const oldCourt=courtTitle;
      courtTitle=function(s,k){
        const out=oldCourt(s,k);
        if(k==='fang'){
          const r=s?.ranks?.fang||'';
          if(r==='答应'||out==='答应')return '方答应';
          if(r==='常在'||out==='常在')return '方常在';
        }
        return out;
      };
    }

    // 3) 还没正式册封的闻人姐妹，正文永远只用姓名/长女次女，不读未来存档位分。
    const shiyi=CH('拾遗阁开门');
    if(shiyi?.steps){
      const seal=shiyi.steps.findIndex(x=>String(x.heading||'').includes('第一份册封'));
      shiyi.steps.slice(0,seal<0?shiyi.steps.length:seal).forEach((st,i)=>wrap(st,'v123-pre-wenren-'+i,earlyWenrenText));
    }
    // 闻人蘅同理：正式入六宫前不提前叫“蘅嫔”。
    const mother=CH('母至');
    if(mother?.steps){
      const seal=mother.steps.findIndex(x=>String(x.heading||'').includes('册页上那一行不能由皇后替我写'));
      mother.steps.slice(0,seal<0?mother.steps.length:seal).forEach((st,i)=>wrap(st,'v123-pre-wenheng-'+i,earlyWenhengText));
    }

    // 4) 第一章：请安、座次、熟悉规矩改成直接叙述。
    const first=CH('宫门初定');
    const morning=ST(first,'请安不是一天学会的');
    if(morning){
      morning.text=s=>[
        s.flags.firstBedchamber==='gu'
          ?`第二日清早，我从凤仪宫出来。皇后已经梳好头，只送到门内：“陛下慢行。”`
          :s.flags.firstBedchamber==='shen'
            ?`第二日我离开永和宫时，和妃正在镜前挽发。她只提醒一句外头路滑，没有问今晚还来不来。`
            :`天还没亮，裴景和便把合宫请安的名册送来。第一页是皇后，第二页是和妃，后面还有一长串名字。`,
        `第一次合宫请安用了快一个时辰。周嫔来得早，几名低位妃嫔跟在后面，进殿后还要由宫女悄悄提醒各自坐哪一边。`,
        `一个年轻答应叫错了称谓。皇后没有罚，只说：“再说一次。”她红着脸重新行礼，这件事便过去了。`,
        `接下来几天，迟到、坐错位置、忘了称谓的事都发生过。小错当场改，病了便递话，不必为了请安硬撑。`,
        `半个月后，大多数人已经记住进殿先后和自己的位置，请安也比第一天快了许多。皇后不用再天天改名册。`
      ];
    }
    const papers=ST(first,'凤仪宫的一叠册页');
    if(papers){
      papers.text=s=>[
        `第一次请安后的第十六日，我去凤仪宫取内廷账册。皇后穿着常服，桌上却摆着三叠改过的请安名册。`,
        `第一叠到处是朱笔，第二叠只改了几处称谓，第三叠已经很干净。`,
        `我问：“还要每天改？”`,
        `“头几日要。等大家都记住，就不用了。”`,
        `案边另放着两份互相相反的旧例：一份主张新朝初立从宽，一份主张先把规矩立严。她两边都做了记号，没有自己定。`,
        `我问她准备照哪一条。她答：“陛下定一条，臣妾以后就照这一条办，免得今天一个说法、明天又换一个。”`,
        `我定下以后，她写上“奉旨照此”，盖了中宫印。宫女送来梨汤时，桌角还有一只已经凉透的馒头。`,
        `我走时，她已经翻到下一页。`
      ];
    }
    const daily=ST(first,'正月里的人情');
    if(daily){
      daily.text=s=>[
        `正月后半段，宫里终于没那么忙乱了。请安时辰定下来，叫错称谓和坐错位置的事也一天比一天少。`,
        `御花园那株早开的山茶被风折过一次。我经过时，${typeof displayRank==='function'?displayRank('zhou'):'周嫔'}正让人用细竹支着，袖口沾了泥。几日后，那株花还是开了。`,
        `慈宁宫隔三差五送点心，永和宫偶尔送茶，凤仪宫的梨汤总在我咳嗽后的第二天送到。来往多了，许多事不用再特意交代。`,
        `月底，礼部把第一份位分折送进养心殿。`
      ];
    }
    const firstRank=ST(first,'第一笔位分');
    if(firstRank){
      firstRank.text=s=>[
        `月底，礼部把潜邸旧人的位分折送进来。皇后的中宫已定，和妃、${typeof displayRank==='function'?displayRank('zhou'):'周嫔'}以及几名低位旧人的位次还等着落笔。`,
        `位分一动，新衣、月例、宫人数和第二日请安的位置都要跟着改。`,
        `折子在案上放了半日，没有哪一宫来递话。午后我经过御花园，${typeof displayRank==='function'?displayRank('zhou'):'周嫔'}正扶那株被风吹歪的山茶。她只行礼，没有提晋位。`,
        `我回养心殿以后才重新展开那份折子。`
      ];
      for(const c of firstRank.choices||[]){
        if(String(c.label||'').includes('晋周嫔为周妃'))c.hint='晋为妃位；次日起按妃位月例与座次办理';
        if(String(c.label||'').includes('位分与宫务都暂照旧'))c.hint='本月不动位分，也不另加宫务';
      }
    }

    // 5) 闻人姐妹第一次进请安殿：不讲抽象“接纳”，只写她们怎么慢慢熟悉。
    const wenrenSeat=ST(shiyi,'第一次坐进请安殿');
    if(wenrenSeat){
      wenrenSeat.text=s=>[
        `第三日，她们第一次去凤仪宫请安。还没有正式册封，末席旁只临时添了两张椅子，与六宫正式座位分开。`,
        `皇后没有让所有人停下来认识她们，只照常点名、问病、问春衣。有人回头看，她也只当没看见。`,
        `茶送到闻人抱朴手里，她闻了闻：“这壶比昨晚的好。”半殿人都听见了。皇后答：“若不合口味，告诉尚食局。”`,
        `闻人抱朴笑：“合口味。臣只是夸。”闻人含章坐在旁边，一直没插话。`,
        `请安散后，皇后只交代三件事：什么时候必须来，病了让谁递话，迟到怎么算。`,
        `闻人抱朴问：“若只是睡过头呢？”`,
        `皇后看她一眼：“那就是迟到。”`,
        `几日以后，她们已经记住从哪边进殿、在什么地方等候，也没人再一进门就回头看她们。`
      ];
    }

    // 6) 方小满：宫女 -> 答应，先从最低位起。
    const fangCh=CH('一碟杏仁酥');
    const elev=ST(fangCh,'离开宫女籍之前');
    if(elev){
      elev.text=s=>[
        `伤药送到花房以后，我又见过方小满两次。一次她蹲在水渠边刷花盆，一次抱着竹架跟在掌事后面。见到我时，她还是先想自己手里的活做完没有。`,
        `裴景和把花房名册送来：她十六岁入宫，父亲早亡，母亲带着幼弟住城南。`,
        `皇后翻了宫女承幸的旧例，说：“若真要册入后宫，就从答应起。先给她一个住处，也给她几天适应。”`,
        `我让人把方小满叫来，问：“若从宫女籍除名，册入后宫，你愿不愿意？”`,
        `她愣了很久，先问：“以后还能去看那只猫吗？”`,
        `我说能。她又问：“阿芙能不能跟我走？”`,
        `皇后道：“阿芙的差籍可以另办。现在只问你愿不愿意。”`,
        `方小满低头想了一会儿，没有立刻谢恩。`
      ];
      elev.choices=[
        {label:'册方小满为答应，赐听雨轩；阿芙随侍',hint:'从最低位起，不另外越级',effects:{bond:{fang:3},trust:{gu:1,afu:3},flags:{fangElevated:true,fangElevation:'direct',afuFollows:true,v123FangInitialRank:'答应'}},result:'册旨到花房时，方小满还在换海棠盆里的土。听见“答应”两个字，她愣了一下，才跟着众人接旨。'},
        {label:'先让皇后教她两日规矩，再册为答应',hint:'先教请安和受礼，再搬去听雨轩',effects:{bond:{gu:2,fang:2},trust:{fang:2,afu:2},flags:{fangElevated:true,fangElevation:'queen',afuFollows:true,v123FangInitialRank:'答应'}},result:'两日里只学了请安、受礼和宫人如何称呼。第三日册旨送到，她仍有些不习惯，却不至于一进门什么都不知道。'},
        {label:'再问她一次，愿意便册为答应',hint:'让她自己把“愿意”说出口',effects:{trust:{fang:5},bond:{fang:1},flags:{fangElevated:true,fangElevation:'asked',afuFollows:true,v123FangInitialRank:'答应'}},result:'我说若不愿意仍可回花房。她想了很久，最后道：“奴婢愿意试试。”册旨当晚才写。'}
      ];
    }
    const firstKowtow=ST(fangCh,'册旨到花房以后');
    if(firstKowtow){
      firstKowtow.text=s=>[
        `册旨送到花房时，方小满正在换土。传旨内监念完：“册方小满为答应，赐居听雨轩。”院里的人一齐跪下，她自己也跟着跪，过了一息才反应过来这次接旨的人是自己。`,
        `花房掌事从前叫她“小满”，起身后第一次改口：“方答应。”两个人都停了一下。`,
        `她下意识想去扶同铺住过的宫女，对方却不敢借她的手，只自己站起来。`,
        `阿芙同日调去听雨轩。收箱子时，方小满还想抬另一头，掌事拦住：“以后这些让宫人做。”`,
        `顾明宜免了她头两日请安，只让一个老宫女教最常用的几件事。第三日再去凤仪宫，别的一边做一边学。`
      ];
    }
    const fangNight=ST(fangCh,'听雨轩第一夜');
    if(fangNight){
      fangNight.text=s=>[
        `听雨轩比花房值房大得多。方小满进门先问水房在哪。`,
        `阿芙指给她看：“您以后不用自己去提水。”`,
        `“我只是问。”`,
        `“您问路的样子就是想自己去。”`,
        `门外新拨来的宫女请示晚膳，开口叫“方答应”。方小满慢了一拍才答。`,
        `门关上以后，她让阿芙别站那么远。阿芙笑她：“白天得按规矩，晚上再说。”`,
        `第二天一开门，阿芙照样叫“主子”。方小满也没有再纠正。`
      ];
    }

    // 册封前的方小满场景，重走旧章时也不能因为未来存档提前出现位号。
    if(fangCh?.steps){
      const ei=fangCh.steps.findIndex(x=>String(x.heading||'').includes('离开宫女籍之前'));
      fangCh.steps.slice(0,ei<0?0:ei+1).forEach((st,i)=>wrap(st,'v123-pre-fang-'+i,earlyFangText));
      // 册封后到首次晋常在前，固定用当前位分显示，避免旧稿写死“方常在”。
      fangCh.steps.forEach((st,i)=>{
        if(!st?.text)return;
        if(st===elev||st===firstKowtow||st===fangNight)return;
        wrap(st,'v123-fang-dynamic-'+i,(x,s)=>String(x).replace(/方常在/g,typeof courtTitle==='function'?courtTitle(s,'fang'):'方答应'));
      });
    }

    // 7) 五月第一次常例晋位：从答应到常在，后面的喜脉再从常在晋贵人。
    if(fangCh?.steps&&!fangCh.steps.some(x=>String(x.heading||'').includes('方答应第一次晋位'))){
      const at=fangCh.steps.findIndex(x=>String(x.heading||'').includes('恩宠比春风快'));
      if(at>=0){
        fangCh.steps.splice(at+1,0,{
          heading:'五月中旬 · 方答应第一次晋位',cast:['fang','afu','gu'],fx:'seal',narrative:true,
          text:s=>[
            `五月中旬，凤仪宫送来一份常例晋位折。方答应册入后已经满月，请安、承宠都没有出过大错，顾明宜拟她晋常在。`,
            `这次没有大办册礼。旨意只有几行，听雨轩的月例添了一些，凤仪宫也把她的椅子往前挪了一处。`,
            `第二日请安，她还是走到原来的位置旁。阿芙在后面轻轻咳了一声，她才转去新座。`,
            `第三次再来，她自己走对了。`
          ],
          choices:[{label:'照例晋方答应为常在',effects:{flags:{v123FangFirstPromotion:true}},result:'听雨轩开始改称“方常在”。别的日子照旧。'}]
        });
      }
    }

    // 人物资料也不再提前把后来的位分写进简介。
    if(PEOPLE?.fang){
      PEOPLE.fang.bio='原是御花园花房宫女，与阿芙一同当差。承熙元年因救猫被御前注意，后来先册答应、赐居听雨轩，再按常例晋常在。她换了身份以后，仍常忘记自己已经不用亲自提水搬箱。';
    }

    document.documentElement.dataset.build='v123';
    document.title='宫灯未眠 · 前期称号与方小满位分修订 v123';
  }

  applyV123();
  const oldEffects=typeof applyChoiceEffects==='function'?applyChoiceEffects:null;
  if(oldEffects&&!globalThis.__v123Effects){
    globalThis.__v123Effects=true;
    applyChoiceEffects=function(c){
      const out=oldEffects(c);
      if(c?.effects?.flags?.v123FangInitialRank){
        const r=state.ranks?.fang||'宫女';
        if(r==='宫女'||r==='御花园宫女')state.ranks.fang='答应';
      }
      if(c?.effects?.flags?.v123FangFirstPromotion){
        const r=state.ranks?.fang||'';
        if(r==='答应'||r==='方答应')state.ranks.fang='常在';
      }
      if(!globalThis.__canonicalStory155)applyV123();
      return out;
    };
  }
  const oldStory=typeof storyView==='function'?storyView:null;
  if(oldStory&&!globalThis.__v123Story){
    globalThis.__v123Story=true;
    storyView=function(){applyV123();return oldStory.apply(this,arguments)};
  }
  const oldRender=typeof render==='function'?render:null;
  if(oldRender&&!globalThis.__v123Render){
    globalThis.__v123Render=true;
    render=function(){applyV123();const out=oldRender.apply(this,arguments);applyV123();return out};
  }
  try{render()}catch(e){console.error('v123 render failed',e)}
}catch(e){console.error('v123 early title/fang fix failed',e)}})();
