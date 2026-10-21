from pathlib import Path
import json,hashlib,difflib,shutil
root=Path(__file__).resolve().parent.parent
out=root/'audit/四项收尾_2026-10-13'
def read(name):return json.loads((out/name).read_text())
cohorts=['male','female','no-shen','shen-loss','public','indulged']
cross=[read('后期全交叉矩阵-'+c+'.json') for c in cohorts]
heirs=read('皇嗣与留牌全组合.json');seals=read('八项大封全组合.json');single=read('当前单项与初封矩阵.json');ui=read('最终界面与旧档验收.json');visual=read('正文裁切与未入宫册页验收.json');browser=read('最终全流程回归.json');images=read('图片逐张目视验收.json');baseline=read('交付构建对照.json');template=read('模板清理最终对照.json');density=read('最终状态与密度对照.json')
for r in cross+[heirs,seals,single,ui,visual]:assert r['pass']
assert all(not r.get('failures') for r in cross+[heirs,seals])
assert not browser['failures'] and not browser['consoleErrors']
assert all(r['reviewed'] for r in images) and len(images)==167
assert all(hashlib.sha256((root/r['file']).read_bytes()).hexdigest()==r['sha256'] for r in images)
assert not baseline['differences'] and not template['differences'] and not density['state_differences']
assert seals['combinations']==43008 and seals['continuations']==672
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(root/'app.js')==baseline['sha256']
backup=root/'backups/four-remaining-20261013'
changes=[];diff=[]
for old in sorted(backup.rglob('*')):
 if not old.is_file():continue
 rel=old.relative_to(backup);now=root/rel
 if not now.exists():changes.append({'file':str(rel),'status':'retired-to-Archive','before_sha256':sha(old)});continue
 if sha(old)==sha(now):continue
 changes.append({'file':str(rel),'status':'changed','before_sha256':sha(old),'after_sha256':sha(now)})
 if rel.suffix in ['.js','.css','.json','.cjs','.mjs'] and str(rel) not in ['app.js','styles.css']:
  diff.extend(difflib.unified_diff(old.read_text().splitlines(True),now.read_text().splitlines(True),fromfile='before/'+str(rel),tofile='after/'+str(rel)))
for rel in ['scripts/finish-remaining.cjs','scripts/visual-audit155.py','scripts/finalize-audit155.py','tests/browser-history-matrix-current.cjs','tests/heir-combinations-155.cjs','tests/cross-combinations-155.cjs','tests/seal-combinations-155.cjs','tests/final-ui-155.cjs','tests/visual-final-155.cjs']:
 changes.append({'file':rel,'status':'new-audit-tool','after_sha256':sha(root/rel)})
(out/'实际修改.diff').write_text(''.join(diff))
(out/'修改文件与哈希.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2))
summary={'date':'2026-10-13至14','pass':True,'completed':['晚期模板与显示钩子清理','第7/18/24章密度收尾','167张图片目视与正文裁切核对','下列有限域组合矩阵验收'],'app_sha256':sha(root/'app.js'),'css_sha256':sha(root/'styles.css'),'template_scenes':797,'template_differences':0,'density_changed_scenes':density['density_changes'],'single_branches':len(single['branches']),'roster_sets_and_rank_modes':len(single['rosters']),'roster_click_orders':heirs['rosterOrders'],'pregnancy_pairs':heirs['pregnancies'],'saved_death_fixture_displays':heirs['deathDisplays'],'grand_seal_masks':seals['combinations'],'grand_seal_cap_transitions':seals['capTransitions'],'grand_seal_representative_route_continuations':seals['continuations'],'late_cross_paths':sum(len(r['rows']) for r in cross),'ending_review_preservation_checks':sum(r['reviewChecks'] for r in cross),'cross_cohorts':[{ 'cohort':r['cohort'],'paths':len(r['rows']),'excluded_requires':len(r['excluded']),'failures':len(r['failures'])} for r in cross],'image_reviews':len(images),'browser_checks':len(browser['checks']),'browser_console_errors':browser['consoleErrors'],'scope':'按依赖域分矩阵验收；并未将全部游戏按钮、全部关系数值与所有旧档的笛卡尔积逐局重放。死亡兼容夹具与新局真实选择链分开记录。'}
(out/'完成与验收汇总.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2))
report='''# 《宫灯未眠》四项收尾完成报告

日期：2026-10-13至14。正式工程：`/Users/zhangzhuoru/Desktop/宫灯`。四项工作已落地，下面列明实际修改、组合域和验收边界。本报告接续10月13日的遗留续修，不把历史测试恢复或阶段性结果当成本次通过。

## 模板清理

移除三项已失效的最终显示/标题钩子，源码保存在 `Archive/compat-retired-155/`；删除v129的旧晚期整章覆盖和v74的重复继后五幕工厂。继后五幕保留一份权威工厂，由当前状态准备函数安装。

语言修订保留启动时执行；旧选择结算不再反复恢复v86/v95章节、重装v81显示幕、重写v97—106及v123文字。保留留牌、位额、皇嗣、处分、关系和历史兼容的状态规则。v130从带重写副作用的steps属性改为一次转换，并按标题核准第八章场序。核心结算现在只私有复制当前选择，不再每次复制、替换整套章节。

对清理前后两条真实默认路线逐幕比较：797幕的标题、实际显示文字、按钮定义、可用条件、所选选项及完整核心状态均一致。密度修改后重新捕获交付基线，状态与按钮仍一致；正文仅有下节明确的四处改动。证据：`模板清理最终对照.json`、`最终状态与密度对照.json`、`交付构建对照.json`。仍供旧档结算使用的兼容规则保留；本次清理的是失效模板和选择时的重复显示改写。

## 场景密度

- 第7章九月、冬月提供可选合阅表单。两个原场景和月份保留，先九月后冬月执行两次原结算；第一轮选择的孕妇会在第二轮禁选。预览不提交进度。全部64,536对可用配置与逐页执行比较一致。
- 第18章仍可逐页裁断，也可合阅余下八项册封；功绩可展开，晋位按顺序使用实时位额。所有43,008个大封选择组合已对照逐页执行。
- 第24章缩短“和妃把一句太直的话改了三遍”（353→308字）、“灯下三个人都知道这件事太好用了”（331→248字）及永和宫称名幕末尾（820→779字）的解释性收束。“女史院开始招人”的完整规章进入默认折叠附诏，保留旧差事如何交接、迟延和现场异议；全部文字仍可展开，未用删掉制度内容冒充减密度。
- 手机章目录改为有高度上限的横向条。复验发现较早的 `max-height:none!important` 覆盖新样式，已去掉冲突规则。390px下无横向溢出，合阅表单和原按钮可操作。

验收中发现王静娴未留牌时仍出现正式册封对白。已改为空页说明及略过，隐藏未入宫者的立绘，不授予晋位、功赏或关系变化。保留原场景身份 `scene-0269` 和索引供旧档定位，两种旧按钮均验证不会生成册封状态。

## 图片目视

167张本地图片逐张记录观察、用途、结论、边界和哈希，包含未挂载候选图和历史存图。证据：`图片逐张目视验收.json` / `.csv`、14张带文件名的目视拼图。对两张缩略图容易误判的立绘另看原尺寸后确认人物均为女性，没有据误判替换素材。

64张叙事图加载并保持唯一场景位置。原图里旧章节题字采用正文裁切；桌面1440px与手机390px实际截图已目视核对，旧题字没有进入可见画面。瓷器图原有字样的展示遵循既有器身裁切和动态人物标签。095（不符双女场景）和101（不符火场）继续不挂载；20张候选与26张历史插图没有擅自加入正文。原图片文件未改动。

固定立绘承担人物识别，未绘制每个年份的年龄变化；目视清单明确此界限，不以成功加载代替年龄、服饰或季节核对。

## 组合验收

| 验收域 | 本次结果 | 证据 |
|---|---|---|
| 单项长期后果 | 458个可用单项从真实默认前缀执行至终局，全部通过 | 当前单项与初封矩阵.json |
| 低位留牌与初封 | 56个2—5人集合×3初封，168组；全部点选顺序合计3,690组，均通过 | 当前单项与初封矩阵.json；皇嗣与留牌全组合.json |
| 两轮孕育 | 全留牌/初封×4年三偏好×各轮全部可用生母或跳过，64,536对；出生、母亲、姓名唯一、孕妇禁选及合阅等价通过；覆盖12位生母和FF/FM/MF/MM及跳过 | 皇嗣与留牌全组合.json |
| 皇嗣死亡显示兼容 | 每对出生状态×4死亡标记，258,144次显示检查通过；这是旧档状态夹具，不冒称四种死伤均可从新局选择触发 | 同上 |
| 八项大封 | 56集合×3初封×256八位选择，43,008组；344,064次位额转换检查、逐页/合阅状态比较通过；每集合/初封的全晋与全赏各续两路线，672次衔接至结局通过 | 八项大封全组合.json |
| 后期九项交叉 | 六种真实前情×7,776条可用路径，46,656条通过；收卷读本、菜单和走马灯回访保存进度139,968次检查通过 | 后期全交叉矩阵-{各前情}.json |
| 最终界面/旧档 | 两路线表单实点、预览、母亲禁选、存读档、永久ID修正旧数值位置、刷新、附诏展开、手机布局通过 | 最终界面与旧档验收.json |
| 全流程 | direct 396幕、ning 401幕，26章跳转撤销、存档导入导出、人物/皇嗣/地图/大事录、瓷谱及64图加载；17组功能检查通过，浏览器错误0 | 最终全流程回归.json |

后期九项为：顺王去留、黛拉去留、继后、沈氏处分、两名晚出皇嗣抚养、陆氏公开策略、临终回应、新朝先行、留任意愿。六种真实前情为沈氏有在世儿子、有在世女儿、未有动态子女、动态子女疫亡，以及三皇子的朝议教育和宽教两路线。前四种默认严教最终导向四皇子继位；后两种保留成年三皇子继位。每一步均使用实际选择结算，未直接注入命运标记。沈氏三种定义选项由实时requires限制为两项，不能将禁用选择计为通过；各前情均记录12条上层门控排除。

矩阵按依赖域完整枚举：孕育域、大封域、后期九项域分别列明。后期九项在六类前情中穷举；并未声称把全游戏全部按钮、所有亲近/信任数值、任意旧档和六万余孕育配置再乘以全部后期路径逐局重放。单项矩阵补查较早的刺杀、调查、三皇子处分及其他选择长期回收。对旧档才存在的死亡配置和储君状态与新局真实可达路径明确分开。

## 构建与交付证据

`python3 scripts/build.py --check`、`node --check app.js`、`python3 tests/verify_local_source.py`通过。最终构建已复跑全流程与遗留修复专项，专项34项通过。当前发行文件与模块源一致，所有资源本地可读。完整统计、哈希在 `完成与验收汇总.json`，实际源修改对照在 `实际修改.diff`、`修改文件与哈希.json`。备份位于 `backups/four-remaining-20261013/`。

重跑入口：`node scripts/finish-remaining.cjs heirs`、`seals`、`ui`、`visual`；后期矩阵以 `cross male/female/no-shen/shen-loss/public/indulged` 分别运行，单项矩阵运行 `node tests/browser-history-matrix-current.cjs`。这些浏览器检查使用本机Playwright与Chrome。阶段性基线或初次计数失败文件只作过程留存，最终通过证据为本报告列出的文件及汇总。
'''
(out/'四项完成报告.md').write_text(report)
print(json.dumps(summary,ensure_ascii=False,indent=2))
