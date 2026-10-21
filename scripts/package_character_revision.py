"""Export the complete offline game, editable sources and current review evidence."""
from pathlib import Path
import json
import subprocess
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'dist' / '宫灯未眠_人物提升_20261012.zip'
PREFIX = '宫灯未眠_人物提升版'


def main():
    review = ROOT / 'audit/人物提升_2026-10-11'
    result = json.loads((review / '人物专项验收.json').read_text())
    if not result.get('pass'):
        raise SystemExit('Character verification must pass before packaging.')
    subprocess.run(['python3', 'scripts/build.py', '--check'], cwd=ROOT, check=True)
    files = set()
    for folder in ['src', 'styles', 'assets', 'scripts', 'docs']:
        files.update(p for p in (ROOT / folder).rglob('*') if p.is_file() and not p.name.startswith('.'))
    files.update(p for p in (ROOT / 'tests').rglob('*') if p.is_file() and p.suffix in {'.js', '.cjs', '.mjs', '.py', '.json'})
    files.update(p for p in ROOT.glob('*.md') if p.is_file())
    for name in ['index.html', 'app.js', 'styles.css', 'SOURCE_MANIFEST.json']:
        files.add(ROOT / name)
    files.update(p for p in review.rglob('*') if p.is_file() and p.name not in {'baseline.html', '项目包验收.json'})
    files.update(p for p in (ROOT / 'backups/人物提升_2026-10-11').rglob('*') if p.is_file())
    files.add(ROOT / 'audit/历史Prompt总审计_2026-10-11/当前运行场景.json')
    files.add(ROOT / 'audit/历史遗留问题整改台账.md')
    DEST.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(DEST, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        for file in sorted(files):
            archive.write(file, PREFIX + '/' + file.relative_to(ROOT).as_posix())
    with zipfile.ZipFile(DEST) as archive:
        if archive.testzip() is not None:
            raise SystemExit('Archive checksum failed.')
        with tempfile.TemporaryDirectory(prefix='gongdeng-character-package-') as temp:
            archive.extractall(temp)
            project = Path(temp) / PREFIX
            subprocess.run(['python3', 'scripts/build.py', '--check'], cwd=project, check=True)
            for file in (ROOT / 'assets').rglob('*'):
                if file.is_file() and not file.name.startswith('.'):
                    if (project / file.relative_to(ROOT)).read_bytes() != file.read_bytes():
                        raise SystemExit('Packaged asset mismatch: ' + file.name)
    (review / '项目包验收.json').write_text(json.dumps({
        'pass': True, 'archive': str(DEST), 'files': len(files),
        'bytes': DEST.stat().st_size, 'buildMatches': True,
        'allLocalAssetsMatch': True
    }, ensure_ascii=False, indent=2))
    print(DEST)


if __name__ == '__main__':
    main()
