(function(){
  var b=document.getElementById('toggle-otros'), l=document.getElementById('otros-list');
  if(b&&l){b.addEventListener('click',function(){
    if(l.hasAttribute('hidden')){l.removeAttribute('hidden');b.textContent='Ocultar';b.setAttribute('aria-expanded','true');}
    else{l.setAttribute('hidden','');b.textContent='Ver otros trabajos';b.setAttribute('aria-expanded','false');}
  });}
})();
