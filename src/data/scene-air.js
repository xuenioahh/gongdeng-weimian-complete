const CHAPTER_LAMP = new Set([
  '宫门初定','一碟杏仁酥','灯下弈','母至','宫灯渐繁','灯下旧局',
  '空宫点灯','长夜未央','帘后朱笔','万家灯火'
]);

const SCENE_AIR_OVERRIDES = {
  '香尽胎寒|雪落产房': {weather:'snow',time:'night'},
  '凤仪宫最后一冬|十月二十三，凤仪宫灯灭': {weather:'clear',motif:'lamp',lamps:1,still:true,quietMs:3000,quietLabel:'凤仪宫'},
  '凤仪宫最后一冬|十月二十四 · “母后最后记了什么？”': {weather:'clear',still:true},
  '凤座无人|凤仪宫漏雨，册子要不要先搬进去': {weather:'rain'},
  '中宫空悬|凤仪宫重新开门': {weather:'clear',motif:'lamp',reopen:true},
  '帘后朱笔|雨声把奏折压得更低': {weather:'rain'},
  '帘后朱笔|雨停以后，她问：陛下为什么总叫我来': {weather:'clear'},
  '万家灯火|天亮以前 · 白玉扳指终于不转了': {weather:'clear',motif:'none',still:true,quietMs:3000,quietLabel:'养心殿'},
  '万家灯火|承熙二十二年冬 · 她第一次没有人可以回头问': {weather:'clear'},
  '万家灯火|新朝第一夜 · 城外的灯比宫灯多': {weather:'clear',motif:'lamp',time:'night'}
};
