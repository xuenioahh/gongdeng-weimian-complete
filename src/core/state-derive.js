const childRecordsBefore138=globalThis.v52ChildRecords;

const childrenViewBefore138=childrenView;

const oldTitle138=typeof courtTitle==='function'?courtTitle:null;

const baseRank138=r=>rankOrder138.find(x=>String(r||'').endsWith(x))||'';

function person138(k,s=state){
    const f=s.flags||{},p=PEOPLE[k]||{},raw=String(s.ranks?.[k]||''),base=baseRank138(raw);
    const selected=f.lowConsorts||f.v78LowSelected||[];
    const dead=!!(/^故/.test(raw)||(k==='gu'&&f.guDead)||(k==='fang'&&f.fangDead)||(k==='baopu'&&f.baopuDead)||(k==='wenheng'&&(f.wenhengDead||f.wenhengFate==='dead'))||(k==='shen'&&f.v75ShenFate==='death')||(k==='xu2'&&(f.v46XuDead||f.v70XuSuspiciousDeath))||(k===f.v46LowVictim)||(k==='taihou'&&f.v80TaihouDead)||(k==='emperor'&&(f.v82EmperorDead||s.index>=CHAPTERS.length||s.index===25&&s.chapterStep>=4)));
    let status=dead?'已故':/^废/.test(raw)?'已废':/[待未]/.test(raw)?'未入宫':'在宫';
    if(!dead&&k==='wenheng'&&f.wenhengFate==='west')status='西苑退居';
    if(!dead&&k==='wenheng'&&f.wenhengFate==='return')status='离京归乡';
    if(!dead&&k==='shen'&&f.v75ShenFate==='fief')status='赴封地';
    if(!dead&&k==='shen'&&f.v75ShenFate==='religion')status='出宫修行';
    if(!dead&&k==='zhou'&&f.v74ZhouLeavesWithDaughter)status='随女出宫';
    if(!dead&&k==='daila'&&f.v56DailaFate==='return')status='离京归国';
    if(!dead&&k==='daila'&&f.v56DailaFate==='hold')status='暂留承露馆';
    if(k==='xulingyi'&&f.v70XuOfficialFate==='dismiss')status='已撤职';
    const prefix={shen:'和',zhou:'周',baopu:'昭',hanzhang:'珍',wenheng:'蘅',ning:'徽',ke:'晋',hui:'元',zhangyuanzhao:['答应','常在','贵人'].includes(base)?'张':'文',fang:['答应','常在'].includes(base)?'方':'顺',cao2:'何',zhao2:'王',lin2:'林',ye2:'陈',du2:'张',su2:'刘',liang2:'梁',song2:'宋',xu2:'许',daila:'黛'};
    let title=base?(['皇后','皇太后'].includes(base)?base:(f.titlePrefixes?.[k]||prefix[k]||'')+base):raw;
    if(/^(故)?废/.test(raw))title=raw.replace(/^故/,'');
    if(k==='zhangyuanzhao'&&f.v82SecondController)title='皇太后';
    if(k==='emperor')title='皇帝';if(k==='taihou')title='太后';
    if(!title)try{title=oldTitle138?.(s,k)||p.role||''}catch(_e){}
    if(dead&&!/^故/.test(title))title='故'+title;
    const homes={gu:'凤仪宫',shen:'永和宫',zhou:'绮春宫',ning:'景仁宫',ke:'翊坤宫',hui:'长春宫',zhangyuanzhao:'景阳宫东配殿',fang:base?'听雨轩':'御花园花房值房',baopu:'拾遗阁',hanzhang:f.sistersResidence==='separate'?'听竹馆':'拾遗阁',wenheng:base?'拾遗阁':'京中驿馆'};
    let home=homes[k]||p.home||'';
    if(low138.includes(k)&&selected.includes(k))home=['咸福宫西配殿','钟粹宫东配殿','景阳宫后殿','咸福宫东配殿','钟粹宫西配殿'][selected.indexOf(k)]||home;
    if(k==='zhangyuanzhao'&&f.v82SecondController)home='慈宁宫';
    else if(base==='皇后')home='凤仪宫';if(base==='皇太后')home='慈宁宫';
    if(status==='西苑退居')home='西苑';if(status==='离京归乡')home='蘅地旧陵别院';
    if(status==='赴封地')home='皇嗣封地';if(status==='出宫修行')home='皇家女观';
    if(status==='随女出宫')home=f.v69PrincessFate==='convent'?'宫外女观':'公主别业';
    if(status==='未入宫')home='尚未入宫';
    if(k==='daila'&&f.v56DailaFate==='return')home='珂兰';
    if(k==='daila'&&f.v56DailaFate==='hold')home='承露馆';
    if(k==='xulingyi'&&status==='已撤职')home='已离女史院';
    if(k==='afu'){title=f.v68AfuPersonal?'张氏掌事宫女':'御花园宫女';home=f.v68AfuPersonal?(s.ranks?.zhangyuanzhao==='皇后'?'凤仪宫':'景阳宫'):'御花园花房值房';}
    if(k==='wenheng'&&!base){title='蘅国旧后';status=dead?'已故':'留京客居';home='京中驿馆';}
    const admitted=!!base&&!/[待未]/.test(raw)&&(!low138.includes(k)||selected.includes(k));
    return {key:k,name:p.name||k,raw,base,title,status,home,dead,admitted,active:admitted&&(status==='在宫'||status==='暂留承露馆')};
  }

function title138(s,k){return person138(k,s||state).title}

function children138(s=state){
    let list=[];try{list=(childRecordsBefore138?.(JSON.parse(JSON.stringify(s)))||[]).map(x=>({...x}))}catch(_e){}
    const f=s.flags||{};
    const cn=n=>['零','一','二','三','四','五','六','七','八','九','十'][n]||String(n);
    const number=x=>{const t=String(x.order||'').match(/([大一二三四五六七八九十\d]+)(?:皇子|公主)/)?.[1];return t==='大'?1:Number(t)||'零一二三四五六七八九十'.indexOf(t);};
    for(const x of list)x.order=String(x.order).replace(/(\d+)(皇子|公主)/,(_,n,t)=>cn(Number(n))+t);
    for(const [key,value] of [['latePrincess',f.v69LatePrincess],['latePrince',f.v69LatePrince]]){
      if(value&&typeof value==='object'&&!list.some(x=>x.name===value.name)){const sex=key==='latePrincess'?'F':'M',n=Math.max(sex==='F'?0:2,...list.filter(x=>x.sex===sex).map(number))+1;list.push({key,...value,sex,order:cn(n)+(sex==='F'?'公主':'皇子')});}
    }
    return list.map(x=>({...x,dead:!!(x.dead||(f.v46ChildVictims||[]).includes(x.key)),foster:x.foster||(x.key==='latePrincess'&&f.v72FosterPrincess?'zhangyuanzhao':x.key==='latePrince'&&f.v72FosterPrince?'zhangyuanzhao':null)}));
  }
