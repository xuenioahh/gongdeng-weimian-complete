function childrenView138(){
    const rows=children138(),princess=rows.find(x=>x.key==='twinGirl');
    const html=html136(childrenViewBefore138);
    if(!princess)return html;
    return html.replace(/(<article class="v117-child-card[^"]*">)([\s\S]*?)(<\/article>)/g,(all,open,body,close)=>{
      const name=body.match(/<h2>([^<]+)<\/h2>/)?.[1],age=Number(body.match(/<small>(\d+)岁<\/small>/)?.[1]);
      if(name!==princess.name||!Number.isFinite(age)||age<18)return all;
      return open+artPortrait142('child_twinGirl_grown',princess.name+'成年')+body+close;
    });
  }
