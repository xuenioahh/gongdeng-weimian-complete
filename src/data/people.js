const PEOPLE={
 emperor:{introducedAt:0,name:'杨叙',title:'大晟皇帝',age:'30岁',home:'养心殿',portrait:0,tags:['慎断','善察','怕失控'],bio:'三十岁登基。遇事习惯把同一件事从两处听完，再亲自落朱笔；他最怕议了半天，最后仍没人知道下一步该怎么办。他擅长看局势，也容易把“知道得够多”误当成“已经理解了一个人”。想得久时会转白玉扳指，一旦下定主意，手反而会停。'},
 taihou:{introducedAt:0,name:'邵令仪',title:'昭懿慈宁圣母皇太后',age:'50岁',home:'慈宁宫',portrait:1,tags:['护家','有偏爱','知进退'],bio:'鬓边有一缕始终没有染黑的白发，手上常沾着淡淡的沉香气。她关心皇室日常与孩子成长，偏爱稳妥，也偏爱顾明宜，却很少替你把决定说出口。'},
 gu:{introducedAt:0,name:'顾明宜',title:'皇后',age:'29岁',home:'凤仪宫',portrait:2,tags:['守规','细谨','护家'],bio:'眉眼端正，发髻总梳得极齐，常用的金凤钗尾羽留着一道潜邸时便有的细小划痕。遇事先翻旧例、问成规；拿不准时会把纸角压齐，再多问一遍。'},
 shen:{introducedAt:0,name:'沈知微',title:'和妃',age:'28岁',home:'永和宫',portrait:3,tags:['寡言','记性好','旧人'],bio:'眼型清长，眼尾天生微垂，静下来时总像带着一点没散尽的倦色；笑起来那层倦意又会短暂消失。她对旧事尤其记得清楚，却很少解释自己为何记得；越是被人问到过去，话反而越少。'},
 zhou:{introducedAt:0,name:'周清漪',title:'周嫔',age:'27岁',home:'绮春宫',portrait:7,tags:['潜邸旧人','善看场面','喜浅色'],bio:'眉眼柔和，常穿月白、藕荷一类浅色宫装，耳边多用小粒珍珠。她很少抢第一句话，当面说话总留三分余地；尖刻的话往往要等人散了才说。她记得谁被冷落、谁新得了一件赏，也记得什么时候该把一句话咽回去。'},
 wenheng:{introducedAt:4,name:'闻人蘅',title:'蘅国旧后',age:'37岁',home:'京中驿馆',portrait:4,tags:['旧国王后','尚未入宫','礼数严整'],bio:'蘅国旧后。国破后随使团抵京，暂居驿馆。她仍沿用旧国妇人的高领深衣，发间只留一支素银长簪；在正式文书中，她的去留与称谓尚未最后定下。'},
 baopu:{introducedAt:1,name:'闻人抱朴',title:'待封',age:'20岁',home:'待定',portrait:5,tags:['蘅国长女','明艳','不肯收声'],bio:'蘅国旧王室长女。眉目明艳，笑声从不刻意压低，衣色也总比同席的人亮半分；她喜欢当众夸人、当众嫌东西不好，也敢直接问自己想知道的事。身上常有一缕极淡的天然香气，发间那枚旧国银簪常与新赐珠钗一起戴。'},
 hanzhang:{introducedAt:1,name:'闻人含章',title:'待封',age:'20岁',home:'待定',portrait:6,tags:['蘅国次女','少饰','寡言'],bio:'蘅国旧王室次女，与长姐为双生，晚出生一刻。衣饰比长姐素得多，常穿深青或鸦蓝，发间几乎不用珠花。她行礼、走路都比旁人慢半步，问到她时才答，声音不高。'},
 fang:{name:'方小满',title:'方常在',age:'17岁',home:'听雨轩',portrait:7,portraitVariant:'fang',introducedAt:2,tags:['低位宫嫔','爱笑','手巧'],bio:'年初采选入宫，位分不高。圆脸杏眼，笑起来很快，衣裳多是宫里统一发下的浅色料子；袖口常被她自己重新缝过，针脚细而密。'},
 peiyan:{name:'裴景和',title:'养心殿总管',age:'31岁',home:'养心殿偏值房',noPortrait:true,portraitKind:'eunuch',glyph:'裴',introducedAt:3,tags:['潜邸旧人','熟宫里规矩','记性好'],bio:'身形瘦长，面色偏白，说话不快。潜邸时便跟在御前，如今照看养心殿日常。记得谁怕冷、谁爱迟到，也记得哪些话说到门口就该停。'},
 xielin:{name:'谢绍庭',title:'御前侍卫统领',age:'29岁',home:'侍卫值房',noPortrait:true,portraitKind:'guard',glyph:'谢',introducedAt:3,tags:['御前侍卫','骑射好','不爱闲谈'],bio:'身量高，常着玄色值服，眉骨近鼻梁处有一道很淡的旧疤。进内廷时总把刀留在规矩允许的位置，见了皇子会让半步，遇到宫人问路也会答。'},
 afu:{name:'阿芙',title:'听雨轩宫女',age:'19岁',home:'听雨轩耳房',noPortrait:true,portraitKind:'maid',glyph:'芙',introducedAt:2,tags:['听雨轩宫女','手脚利落','嘴快'],bio:'个子不高，走路很快，袖口总收得利落。她比方常在记路，也比方常在更会记哪宫今日心情不好；嘴上常嫌主子添乱，手里却总替她把东西收拾妥当。'},

 shunwang:{name:'杨承晏',title:'顺王',age:'27岁',home:'顺王府',noPortrait:true,portraitKind:'prince',glyph:'顺',introducedAt:9,tags:['宗室亲王','旧案知情人','久居府中'],bio:'先帝诸子之一，曾长期远离内廷。宫中公开只知道他少入宫、话少，年轻时善琴。与和妃旧族的一桩军中旧案有牵连，但内情尚未公开。'},
 zhangyuanzhao:{name:'张元照',title:'待选秀女',age:'18岁',home:'储秀宫',noPortrait:true,portraitKind:'youngwoman',glyph:'照',introducedAt:13,tags:['新选秀女','言语平实','善记人名'],bio:'新一轮采选入宫的秀女之一。衣饰并不抢眼，行礼时很少抬头，却能在第二次见面时准确叫出宫人的名字。她在承熙三年第一次大选入宫。'},
};
