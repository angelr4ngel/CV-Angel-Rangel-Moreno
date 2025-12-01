// Paletas vivas y lógica para aplicarlas dinámicamente
const palettes = [
  {name:'Neón', accent:'#00f5a0', accent2:'#00b4ff', bg:'#071423', card:'#081424', text:'#e6f9f1', muted:'#9fd0bf'},
  {name:'Atardecer', accent:'#ff7a59', accent2:'#ffd86b', bg:'#1a0b0f', card:'#210b10', text:'#fff3eb', muted:'#ffc9a8'},
  {name:'Océano', accent:'#00d2ff', accent2:'#0063ff', bg:'#071826', card:'#081a2a', text:'#eaf8ff', muted:'#9fd7ff'},
  {name:'Violeta', accent:'#a84dff', accent2:'#ff5cac', bg:'#0b0712', card:'#120b17', text:'#fff0ff', muted:'#e3c3f0'}
];

let auto = true;
let current = 0;
let rotateInterval = null;

function applyPalette(i){
  if(i < 0 || i >= palettes.length) return;
  current = i;
  const p = palettes[i];
  const r = document.documentElement.style;
  r.setProperty('--accent', p.accent);
  r.setProperty('--accent-2', p.accent2);
  r.setProperty('--bg', p.bg);
  r.setProperty('--card', p.card);
  r.setProperty('--text', p.text);
  r.setProperty('--muted', p.muted);
  // update active button
  document.querySelectorAll('.palette-btn').forEach(b=>b.classList.toggle('active', Number(b.dataset.palette)===i));
}

function startRotate(){
  if(rotateInterval) clearInterval(rotateInterval);
  rotateInterval = setInterval(()=>{
    const next = (current+1) % palettes.length;
    applyPalette(next);
  },5000);
}

function stopRotate(){
  if(rotateInterval) {clearInterval(rotateInterval); rotateInterval=null}
}

function init(){
  // apply initial palette
  applyPalette(0);

  // palette buttons
  document.querySelectorAll('.palette-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const i = Number(btn.dataset.palette);
      applyPalette(i);
    });
  });

  // auto toggle
  const autoBtn = document.getElementById('auto-toggle');
  function updateAutoLabel(){ autoBtn.textContent = auto? 'Auto' : 'Fijo'; }
  autoBtn.addEventListener('click', ()=>{
    auto = !auto;
    if(auto) startRotate(); else stopRotate();
    updateAutoLabel();
  });
  updateAutoLabel();

  // skill bars
  document.querySelectorAll('.skill').forEach(el=>{
    const fill = el.querySelector('.skill-fill');
    const lvl = Number(el.dataset.level) || 0;
    // animate on load, respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduced){
      requestAnimationFrame(()=>{ fill.style.width = lvl + '%'; });
    } else { fill.style.width = lvl + '%'; }
  });

  // start automatic rotation if enabled
  if(auto) startRotate();
}

document.addEventListener('DOMContentLoaded', init);
