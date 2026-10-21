import csv
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
def read(relative):
    return json.loads((ROOT / relative).read_text())

runtime = read('audit/人物提升_2026-10-11/最终全流程回归.json')
choices = read('audit/剧情质量全面评估_2026-10-12/选择与状态.json')['result']
definitions = read('audit/剧情质量全面评估_2026-10-12/有效定义.json')['result']
previous = read('audit/人物提升_2026-10-11/交付文件哈希.json')
assert hashlib.sha256((ROOT / 'app.js').read_bytes()).hexdigest() == previous['app.js'], '运行稿对应的构建已变化，请重新采集'
texts = {(s['route'], s['ci'], s['si']): s for s in runtime['scenes']}
assert len(texts) == len(choices['scenes']) == 797
assert not runtime['failures'] and not runtime['consoleErrors'] and not choices['failures']
scene_lines = ['# 本次审核对应的完整运行稿', '', '直接读取人物修订后的真实浏览器正文；direct 为直接张后线，ning 为先邵后张线。幕号只用于本轮定位，不作为存档迁移依据。', '']
choice_rows = []
scene_rows = []
stats = {'app_sha256': previous['app.js'], 'scope': '两条默认路径；非默认按钮列出定义，不宣称所有交叉前情已实测', 'routes': {}, 'chapters': [], 'vm_render_limitations': choices['renderLimitations']}
for route in ['direct', 'ning']:
    ss = [s for s in choices['scenes'] if s['route'] == route]
    stats['routes'][route] = {'scenes': len(ss), 'defined_buttons': sum(len(s['choices']) for s in ss), 'single_button_scenes': sum(len(s['choices']) == 1 for s in ss), 'multi_button_scenes': sum(len(s['choices']) > 1 for s in ss), 'narrative_marked_scenes': sum(s['narrative'] for s in ss), 'eligible_buttons_on_prefix': sum(c['eligible'] for s in ss for c in s['choices'])}
    scene_lines += [f'## {route}', '']
    for s in ss:
        t = texts[(route, s['ci'], s['si'])]['text']
        loc = f'{route}:{s["ci"]+1:02d}.{s["si"]+1:02d}'
        scene_lines += [f'### {loc} · {s["title"]} · {s["heading"]}', '', t, '']
        scene_rows.append({'位置': loc, '章节': s['title'], '标题': s['heading'], '正文字符': len(t), '定义按钮数': len(s['choices']), '当前前情可用数': sum(c['eligible'] for c in s['choices']), '默认点击': s['pick'] + 1, '实际标记变化': json.dumps(s['changes']['flags'], ensure_ascii=False), '实际位分变化': json.dumps(s['changes']['ranks'], ensure_ascii=False)})
        for c in s['choices']:
            fx = c['effects']
            relations = {k: fx[k] for k in ['bond', 'trust'] if k in fx}
            special = {k: v for k, v in c['special'].items() if not k.startswith('__') and k not in ['v43ResultFixed', 'v40ZhouWrapped', 'reactionKey', 'reactionCaption']}
            choice_rows.append({'位置': loc, '章节': s['title'], '标题': s['heading'], '选项序号': c['i'] + 1, '选项': c['label'], '当时可用': c['eligible'], '即时结果定义': c['result'], '关系变化定义': json.dumps(relations, ensure_ascii=False), '位分变化定义': json.dumps(fx.get('ranks', {}), ensure_ascii=False), '长期标记定义': json.dumps(fx.get('flags', {}), ensure_ascii=False), '特殊结算或展示字段': json.dumps(special, ensure_ascii=False), '心术消耗': c['costMind'], '可用条件': c['requires'], '验证范围': '默认路径实际点击' if c['i'] == s['pick'] else '该前情下的定义检查；未据此保证交叉分支后文'})
    for ci in range(26):
        group = [s for s in ss if s['ci'] == ci]
        stats['chapters'].append({'route': route, 'chapter': ci + 1, 'title': group[0]['title'], 'scenes': len(group), 'multi_button_scenes': sum(len(s['choices']) > 1 for s in group)})
direct_text = '\n'.join(s['text'] for s in runtime['scenes'] if s['route'] == 'direct')
stats['phrase_counts_direct'] = {k: direct_text.count(k) for k in ['过渡的一年', '没有发生大事', '等待未来', '恢复平静', '第一次', '照旧', '不是', '没有再', '没有立刻', '抚平', '纸角', '规矩', '册']}
stats['static_definition_counts'] = {'chapters': len(definitions['chapters']), 'scenes': sum(len(c['steps']) for c in definitions['chapters']), 'buttons': sum(len(s['choices']) for c in definitions['chapters'] for s in c['steps'])}
for name, rows in [('逐幕运行核对.csv', scene_rows), ('逐项选择核对.csv', choice_rows)]:
    with (OUT / name).open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
(OUT / '完整运行阅读稿.md').write_text('\n'.join(scene_lines))
(OUT / '审核统计与构建核对.json').write_text(json.dumps(stats, ensure_ascii=False, indent=2))
print(json.dumps({'scene_rows': len(scene_rows), 'choice_rows': len(choice_rows), 'routes': stats['routes'], 'app_matches_browser_evidence': True}, ensure_ascii=False))
