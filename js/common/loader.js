
async function loadFragment(path){
 const res=await fetch(path);
 return await res.text();
}

async function init(){
 const sidebar=await loadFragment('./components/sidebar.html');
 document.getElementById('sidebar-container').innerHTML=sidebar;

 const pages=[
 'intro.html',
 'education.html',
 'experience.html',
 'skills.html',
 'contact.html'
 ];

 let html='';
 for(const p of pages){
   try{
     html += await loadFragment('./pages/'+p);
   }catch(e){console.error(e)}
 }
 document.getElementById('content').innerHTML=html;

 document.querySelectorAll('.nav-item').forEach(item=>{
   item.addEventListener('click',e=>{
      const target=item.dataset.target || item.getAttribute('href')?.replace('#','');
      const el=document.getElementById(target);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth'});
      }
   });
 });
}
document.addEventListener('DOMContentLoaded',init);
