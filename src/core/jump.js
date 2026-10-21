async function jump140(ci,si=0,route='direct',mode='keep'){
    if(testBusy140)return false;
    if(finaleReview149)leaveEndingReview149('',false);
    ci=Number(ci);si=Number(si);
    if(!Number.isInteger(ci)||ci<0||ci>CHAPTERS.length||!Number.isInteger(si)||si<0||si>=scenes140(ci,route).length)throw Error('请选择有效的章节和场景。');
    const prior=clone140(state),priorSave=save;
    testUndo140=prior;testBusy140=true;testPrefs140.route=route;testPrefs140.mode=mode;testPrefs140.chapter=ci;testPrefs140.scene=si;
    const intendedHeading=scenes140(ci,route)[si].heading;
    let count=0,usedRecorded=0;
    const surface=document.querySelector('#app'),drawer=document.querySelector('#test140-drawer');
    if(surface){surface.inert=true;surface.setAttribute('aria-busy','true');}
    if(drawer)drawer.open=true;
    bulk140=true;save=()=>{};
    try{
      state=initial136();state.intro=true;state.view='story';prepare139(state);
      const low=mode==='keep'?(prior.flags?.lowConsorts||prior.flags?.v78LowSelected||[]):[];
      while(state.index<CHAPTERS.length){
        prepare139(state);
        const ch=CHAPTERS[state.index],st=ch.steps?.[state.chapterStep||0];
        if(state.index===ci&&st?.heading===intendedHeading)break;
        if(state.index>ci)throw Error('所选路线中找不到这一幕。请改用对应路线重建。');
        if(!st||++count>600)throw Error('前情未能衔接，请返回跳转前检查。');
        if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=low.length?low.slice():['cao2','zhao2','lin2','ye2','du2'];
        let pick=-1,recordedPick=false;
        if(mode==='keep'){
          const oldRecord=state.index<prior.index?prior.history?.[state.index]:state.index===prior.index?prior.stepHistory:null;
          // 切换继后路线时，册后选择和下一章的幕次属于不同的前情，不能沿用旧序号。
          const routeChanged=!!prior.flags?.v74ShaoThenZhang!==(route==='ning');
          const routeDependent=st.choices.some(c=>c.v74ShaoThenZhang)||ch.title==='帘后朱笔';
          if(oldRecord&&!(routeChanged&&routeDependent)){
            const candidate=Array.isArray(oldRecord)?oldRecord[state.chapterStep||0]:(state.chapterStep===0?oldRecord:null);
            if(candidate!=null){if(!allowed136(st.choices[candidate]))throw Error('旧选择与当前路线条件不符，请选择“按所选路线重建”。');pick=candidate;recordedPick=true;usedRecorded++;}
          }
        }
        if(pick<0&&st.choices.some(c=>c.v74ShaoThenZhang))pick=st.choices.findIndex(c=>route==='ning'?c.v74ShaoThenZhang:c.effects?.flags?.v44NewEmpress==='zhangyuanzhao');
        if(pick<0)pick=st.choices.findIndex(allowed136);
        if(pick<0||!allowed136(st.choices[pick]))throw Error(`《${ch.title}》${st.heading}没有可执行的选项。`);
        const before=`${state.index}:${state.chapterStep}`;choose136(pick);
        if(recordedPick&&!prior.flags?.v155SevereArcChosen&&st.choices[pick]?.effects?.flags?.v155SevereArcChosen)delete state.flags.v155SevereArcChosen;
        if(before===`${state.index}:${state.chapterStep}`)throw Error('前情推进停在'+st.heading);
        if(count%16===0){const status=document.querySelector('#test140-status');if(status)status.textContent=`正在补齐前情：第${Math.min(state.index+1,CHAPTERS.length)}章，已结算${count}次选择…`;await new Promise(resolve=>requestAnimationFrame(resolve));}
      }
      if(ci===CHAPTERS.length&&state.index!==ci)throw Error('尚未抵达卷终。');
      state.testOrigin140=`测试前情：${state.flags.v74ShaoThenZhang?'先邵后张':'张元照直接册后'}。沿用此前已作出的${usedRecorded}项选择；其余前情按预设补齐。`;
      state.view=ci===CHAPTERS.length?'people':'story';
      return true;
    }catch(e){state=prior;prepare139(state);throw e;}
    finally{save=priorSave;bulk140=false;testBusy140=false;if(surface){surface.inert=false;surface.setAttribute('aria-busy','false');}save();render136();try{window.scrollTo({top:0,left:0,behavior:'instant'})}catch(_e){}}
  }
