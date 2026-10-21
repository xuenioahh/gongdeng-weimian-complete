function snapshot136(){return JSON.parse(JSON.stringify({mind:state.mind,ranks:state.ranks,bond:state.bond,trust:state.trust,flags:state.flags}))}

function restoreSnapshot136(s){if(!s)return false;state.mind=s.mind;state.ranks={...(s.ranks||{})};state.bond={...(s.bond||{})};state.trust={...(s.trust||{})};state.flags={...(s.flags||{})};return true}
