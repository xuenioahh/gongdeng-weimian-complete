function edit140(value){
    if(Array.isArray(value))return value.map(edit140);
    if(typeof value!=='string')return value;
    let out=value;for(const [from,to] of edits140)out=out.split(from).join(to);
    return out;
  }
