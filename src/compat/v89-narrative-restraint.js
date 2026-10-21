(()=>{try{
  const swaps=new Map([
    ['我把朱笔搁在册页上，问礼官：“若入册，她原来的常服还能不能留？”礼官答要另裁嫔服。闻人蘅坐在下首，没有插话，只用拇指碰了一下发间的银簪。','我把朱笔搁在册页上，问礼官：“若入册，她原来的常服还能不能留？”礼官答要另裁嫔服。闻人蘅坐在下首，没有插话，只用拇指碰了一下发间的银簪。'],
    ['我让裴景和把三处院子的图摊开。闻人蘅看了片刻，指着向阳那一处：“这里。”抱朴先问院门朝哪边开，含章去看窗。皇后让尚宫记下。','我让裴景和把三处院子的图摊开。闻人蘅看了片刻，指着向阳那一处：“这里。”抱朴先问院门朝哪边开，含章去看窗。皇后让尚宫记下。'],
    ['邵明贞把册子接过去时，顾明宜的手还压在那一页上。过了一会儿，她才松开：“东所那边，明早再核一遍。”','邵明贞把册子接过去时，顾明宜的手还压在那一页上。过了一会儿，她才松开：“东所那边，明早再核一遍。”'],
    ['她说完以后没有收回那几页纸。我让裴景和封档，她站在一旁，看着封条贴好才走。','她说完以后没有收回那几页纸。我让裴景和封档，她站在一旁，看着封条贴好才走。'],
    ['她照旧穿最亮的衣裳，宴上笑得比从前更响。夜里牌匣来得少了，她就让宫女把灯再添一盏。','她照旧穿最亮的衣裳，宴上笑得比从前更响。夜里牌匣来得少了，她就让宫女把灯再添一盏。'],
    ['顺王离开永和宫时，沈知微没有送到门外。次日她照常请安，回来后让宫女换掉了茶罐。','顺王离开永和宫时，沈知微没有送到门外。次日她照常请安，回来后让宫女换掉了茶罐。']
  ]);
  const arrv=(v,s)=>{const a=typeof v==='function'?v(s):v;return Array.isArray(a)?a:[a]};
  for(const ch of (window.CHAPTERS||CHAPTERS||[]))for(const st of (ch.steps||[])){
    if(!st.text||st.__v89tone)continue;
    const old=st.text;
    st.text=s=>arrv(old,s).flatMap(x=>{
      if(typeof x!=='string')return [x];
      let z=x;
      for(const [a,b] of swaps)if(z.includes(a))z=z.split(a).join(b);
      return z?[z]:[];
    });
    st.__v89tone=true;
  }
  if(window.PEOPLE?.gu||typeof PEOPLE!=='undefined'&&PEOPLE.gu){
    const g=(window.PEOPLE||PEOPLE).gu;
    g.tags=['守规','细谨','护家'];
    g.bio='眉眼端正，发髻总梳得极齐。遇事先翻旧例、问成规；拿不准时会把纸角压齐，再多问一遍。';
  }
  document.documentElement?.setAttribute('data-build','v89');
}catch(e){console.error('v89 tone restraint failed',e)}})();
