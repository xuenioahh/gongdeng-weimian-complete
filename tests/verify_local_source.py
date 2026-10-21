#!/usr/bin/env python3
from pathlib import Path
import re, hashlib, json

root=Path(__file__).resolve().parents[1]
html=(root/'index.html').read_text(encoding='utf-8')
assert '<script src="app.js"></script>' in html
assert '<link rel="stylesheet" href="styles.css">' in html
assert not re.search(r'<script(?![^>]*src=)[^>]*>\s*[^<]', html, re.I)
assert not re.search(r'<style\b', html, re.I)
assert not re.search(r'data:image/', html, re.I)
for bad in [r"<script[^>]+src=[\"']https?://", r"<link[^>]+href=[\"']https?://", r'\bfetch\s*\(', r'XMLHttpRequest', r'\bimport\s*\(']:
    assert not re.search(bad, html + (root/'app.js').read_text(encoding='utf-8') + (root/'styles.css').read_text(encoding='utf-8'), re.I), bad
refs=set(re.findall(r'assets/asset-\d+\.(?:webp|png|jpg|svg|ico)', html+(root/'app.js').read_text(encoding='utf-8')+(root/'styles.css').read_text(encoding='utf-8'), re.I))
files=set('assets/'+p.name for p in (root/'assets').glob('asset-*'))
retained_unmounted={'assets/asset-095.webp':'图中人物与凤仪宫双女场景不符，审计批次01取消挂载', 'assets/asset-101.webp':'殿内群像与东角门火场不符，审计批次01取消挂载'}
assert not refs-files, {'missing':sorted(refs-files)}
assert (files-refs)<=set(retained_unmounted), {'unexplained_unused':sorted((files-refs)-set(retained_unmounted))}
manifest=json.loads((root/'assets/manifest.json').read_text(encoding='utf-8'))
for item in manifest['assets']:
    p=root/item['file']; b=p.read_bytes()
    assert len(b)==item['bytes'] and hashlib.sha256(b).hexdigest()==item['sha256'], item['file']
print(json.dumps({'pass':True,'asset_count':len(files),'asset_refs':len(refs),'retained_unmounted':{k:v for k,v in retained_unmounted.items() if k in files-refs},'html_bytes':(root/'index.html').stat().st_size,'app_bytes':(root/'app.js').stat().st_size,'css_bytes':(root/'styles.css').stat().st_size},ensure_ascii=False,indent=2))
