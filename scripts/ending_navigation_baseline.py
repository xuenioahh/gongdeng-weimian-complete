"""Freeze the same compiled literary source, replacing only repaired navigation."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BACKUP=ROOT/'backups/finale-20261010'
body=(ROOT/'app.js').read_text()
units=['src/core/save.js','src/compat/archives-adapters-4.js','src/core/choice-engine.js','src/boot-2.js','src/ui/app.js','src/ui/bindings.js','src/ui/cover-view.js','src/ui/finale-reveal.js','src/ui/final-montage.js','src/core/jump.js','src/core/finale-review.js']
for file in units:
    marker='\n/* Source: '+file+' */\n'
    current=marker+(ROOT/file).read_text()+'\n'
    if current not in body:raise SystemExit('Rebuild first: source changed during capture: '+file)
    before='' if file=='src/core/finale-review.js' else marker+(BACKUP/file).read_text()+'\n'
    body=body.replace(current,before,1)
path=ROOT/'audit/结局回访修复/baseline-app.js'
path.write_text(body)
print(path)
