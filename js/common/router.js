
import {loadPage} from './loader.js';
window.addEventListener('hashchange',()=>{
 const page=location.hash.replace('#','')||'intro';
 loadPage(page);
});
