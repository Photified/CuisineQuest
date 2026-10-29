/* Pure game rules, shared by the app and the final validation. */
(function (root) {
  'use strict';
  function shuffle(items) { const a=[...items]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  function pool(meals,prefs) {
    const avoids=(prefs.avoid||'').toLowerCase().split(',').map(x=>x.trim()).filter(Boolean);
    return meals.filter(m=> (prefs.mode==='either'||m.kind===prefs.mode) && !prefs.excluded.includes(m.cat) && !prefs.skipped.includes(m.id)
      && (prefs.source!=='favourites'||prefs.favourites.includes(m.id))
      && (prefs.mood==='all'||m.tags.includes(prefs.mood))
      && !avoids.some(x=>(m.name+' '+(m.ingredients||[]).map(i=>i.name).join(' ')).toLowerCase().includes(x)));
  }
  function candidates(meals,prefs) {
    const cats=[...new Set(meals.map(m=>m.cat))];
    const recent=prefs.recentWinners.slice(-4);
    return shuffle(cats).sort((a,b)=>{
      const ar=recent.includes(a)?1:0,br=recent.includes(b)?1:0;
      return ar-br || (prefs.categorySeen[a]||0)-(prefs.categorySeen[b]||0);
    }).slice(0,4);
  }
  function board(cats){ if(!cats.length)return []; return shuffle(Array.from({length:16},(_,i)=>cats[i%cats.length])); }
  function suggestions(meals,seen,count=3,exclude=[]) {
    return shuffle(meals.filter(m=>!exclude.includes(m.id))).sort((a,b)=>(seen[a.id]||0)-(seen[b.id]||0)).slice(0,count);
  }
  function amount(n){const rounded=Math.round(n*100)/100;return Number.isInteger(rounded)?String(rounded):String(rounded);}
  function ingredient(i,servings){return [amount(i.amount*servings/2),i.unit,i.name].filter(Boolean).join(' ');}
  const api={shuffle,pool,candidates,board,suggestions,ingredient};
  if(typeof module!=='undefined'&&module.exports)module.exports=api; else root.CQ=api;
})(typeof window!=='undefined'?window:globalThis);
