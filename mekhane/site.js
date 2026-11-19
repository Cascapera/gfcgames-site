(function(){
  var KEY='mekhane-sex', sex='masc';
  try{ sex=localStorage.getItem(KEY)||'masc'; }catch(e){}
  function apply(s){
    sex=s;
    document.querySelectorAll('img[data-masc]').forEach(function(i){ i.src=i.getAttribute('data-'+s); });
    document.querySelectorAll('[data-masc-text]').forEach(function(t){ t.textContent=t.getAttribute('data-'+s+'-text'); });
    document.querySelectorAll('.sex button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-sex')===s); });
    try{ localStorage.setItem(KEY,s); }catch(e){}
  }
  document.querySelectorAll('.sex button').forEach(function(b){
    b.addEventListener('click', function(){ apply(b.getAttribute('data-sex')); });
  });
  if(sex!=='masc') apply(sex);
  // Filtros das listas (Itens, Monstros, Mapas): busca + selects, esconde grupos vazios.
  var box=document.querySelector('.filters'); if(!box) return;
  var cards=[].slice.call(document.querySelectorAll('[data-search]'));
  var counter=box.querySelector('[data-count]');
  function run(){
    var q=(box.querySelector('[data-filter=q]').value||'').trim().toLowerCase();
    var sel={}; box.querySelectorAll('select').forEach(function(s){ sel[s.getAttribute('data-filter')]=s.value; });
    var shown=0;
    cards.forEach(function(c){
      var ok=!q||c.getAttribute('data-search').indexOf(q)>=0;
      if(ok&&sel.cat) ok=c.getAttribute('data-cat')===sel.cat;
      if(ok&&sel.cls) ok=c.getAttribute('data-cls')==='all'||c.getAttribute('data-cls')===sel.cls;
      if(ok&&sel.reg) ok=c.getAttribute('data-reg')===sel.reg;
      c.classList.toggle('hidden',!ok); if(ok) shown++;
    });
    document.querySelectorAll('[data-group]').forEach(function(g){
      g.classList.toggle('hidden',!g.querySelector('[data-search]:not(.hidden)'));
    });
    if(counter) counter.textContent=shown+' de '+cards.length;
  }
  box.addEventListener('input',run); box.addEventListener('change',run); run();
})();
