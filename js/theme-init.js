/* theme-init.js — place in js/ folder
   Add this ONE line to the <head> of every page (BEFORE your CSS link):

   <script src="../js/theme-init.js"></script>          ← pages/ folder
   <script src="../../js/theme-init.js"></script>       ← provinces/ folder

   That's ALL you need to add to each page.
   main.js handles the rest: it auto-injects the toggle button itself.
*/
(function () {
  var t = localStorage.getItem('caraga-theme') || 'light';
  document.documentElement.setAttribute('data-theme', t);
})();