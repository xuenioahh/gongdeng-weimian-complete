function courtTitle(s,k){
 const raw=(s?.ranks&&s.ranks[k])||PEOPLE[k]?.title||'';
 if(/^故|^废/.test(raw))return raw;
 const fixed={wenheng:'蘅嫔'}; if(fixed[k]&&raw.includes('嫔')) return fixed[k];
 const prefix={baopu:'昭',hanzhang:'珍',zhou:'周'}[k];
 if(!prefix) return raw;
 if(raw.startsWith(prefix)) return raw;
 if(['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'].includes(raw)) return prefix+raw;
 return raw;
}
