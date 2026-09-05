const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}});
},{threshold:.08});
document.querySelectorAll('.news-card,.team-card,.timeline article,.schedule-row,.value-list article,.quick a,.photo').forEach(el=>{
  el.classList.add('reveal');revealObserver.observe(el);
});

/* ULTRA interactions */
const progress=document.querySelector('.scroll-progress');
const glow=document.querySelector('.cursor-glow');
window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  if(progress) progress.style.width=(max>0?(window.scrollY/max)*100:0)+'%';
},{passive:true});
window.addEventListener('pointermove',e=>{
  if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}
});
document.querySelectorAll('.team-card,.news-card,.photo').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(innerWidth<900)return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(800px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-7px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});
