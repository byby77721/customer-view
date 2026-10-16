(() => {
  const text = {
    id:{theEdit:'PILIHAN',personalEdit:'PILIHAN PERSONAL',heroTitle:'Temuan menarik,<br><em>terpilih.</em>',heroDescription:'Kumpulan produk pilihan untuk menemani keseharian Anda. Dipilih dengan cermat dan dibagikan khusus untuk Anda.',exploreEdit:'Lihat pilihan',artCaption:'HAL KECIL, PILIHAN TERBAIK',handpicked:'PILIHAN KHUSUS UNTUK ANDA',theEditHeading:'Pilihan',findSomething:'Cari produk',allCategories:'Semua kategori',emptyTitle:'Belum ada produk',emptyDescription:'Kunjungi kembali nanti untuk melihat pilihan terbaru.',footerNote:'Dipilih dengan cermat. Dibagikan dengan senang hati.',darkMode:'Mode gelap',lightMode:'Mode terang',viewProduct:'Lihat produk',picked:'PILIHAN UNTUK ANDA',loading:'Memuat pilihan…',loadError:'Pilihan tidak dapat dimuat. Silakan coba lagi sebentar.'},
    en:{theEdit:'THE EDIT',personalEdit:'A PERSONAL EDIT',heroTitle:'Good things,<br><em>gathered.</em>',heroDescription:'A considered collection of pieces worth bringing into your everyday. Picked with care, shared with you.',exploreEdit:'Explore the edit',artCaption:'THE LITTLE THINGS, DONE WELL',handpicked:'HANDPICKED FOR YOU',theEditHeading:'The edit',findSomething:'Find something',allCategories:'All categories',emptyTitle:'Nothing here just yet',emptyDescription:'Check back soon for the next edit.',footerNote:'Thoughtfully picked. Happily shared.',darkMode:'Dark mode',lightMode:'Light mode',viewProduct:'View product',picked:'PICKED FOR YOU',loading:'Gathering the edit…',loadError:'The edit could not load. Please try again in a little while.'}
  };
  Object.assign(text.id,{allStatuses:'Semua status',statusFilter:'Filter berdasarkan status',status_available:'Tersedia',status_soldout:'Habis',status_restock:'Dalam proses restock'});
  Object.assign(text.en,{allStatuses:'All statuses',statusFilter:'Filter by status',status_available:'Available',status_soldout:'Sold out',status_restock:'Restocking'});
  let language=localStorage.getItem('fieldnoteLanguage')||'id';
  const t=key=>text[language][key]??text.id[key]??key;
  function apply(){
    document.documentElement.lang=language;
    document.title=language==='id'?'Pilihan Terpilih · Fieldnote':'Good things, gathered · Fieldnote';
    document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});
    document.querySelectorAll('[data-i18n-html]').forEach(el=>{el.innerHTML=t(el.dataset.i18nHtml)});
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder)});
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAriaLabel)));
    document.querySelectorAll('[data-lang]').forEach(el=>el.classList.toggle('active',el.dataset.lang===language));
    document.querySelector('#searchInput').setAttribute('aria-label',t('findSomething'));
    document.querySelector('#categoryFilter').setAttribute('aria-label',t('allCategories'));
    const dark=document.body.classList.contains('dark-mode');
    document.querySelector('#themeToggle').textContent=(dark?'☀ ':'☾ ')+t(dark?'lightMode':'darkMode');
    window.dispatchEvent(new CustomEvent('languagechange'));
  }
  function translateDynamic(){
    const status=document.querySelector('#status');
    if(status){if(['Gathering the edit…','Memuat pilihan…'].includes(status.textContent)){const value=t('loading');if(status.textContent!==value)status.textContent=value}else if(['The edit could not load. Please try again in a little while.','Pilihan tidak dapat dimuat. Silakan coba lagi sebentar.'].includes(status.textContent)){const value=t('loadError');if(status.textContent!==value)status.textContent=value}}
    document.querySelectorAll('#categoryFilter option:first-child').forEach(option=>{const value=t('allCategories');if(option.textContent!==value)option.textContent=value});
    document.querySelectorAll('.product-card').forEach(card=>{
      const featured=card.querySelector('.product-top span:last-child');if(featured&&['✳ PICKED FOR YOU','✳ PILIHAN UNTUK ANDA'].includes(featured.textContent)){const value='✳ '+t('picked');if(featured.textContent!==value)featured.textContent=value}
      const link=card.querySelector('.shop-link');if(link&&link.firstChild){const value=t('viewProduct')+' ';if(link.firstChild.nodeValue!==value)link.firstChild.nodeValue=value}
    });
  }
  const observer=new MutationObserver(translateDynamic);
  observer.observe(document.querySelector('#productGrid'),{childList:true,subtree:true,characterData:true});
  observer.observe(document.querySelector('#status'),{childList:true,characterData:true});
  observer.observe(document.querySelector('#categoryFilter'),{childList:true,subtree:true});
  window.addEventListener('languagechange',translateDynamic);
  window.t=t;
  window.setPageLanguage=next=>{language=next;localStorage.setItem('fieldnoteLanguage',next);apply()};
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>window.setPageLanguage(button.dataset.lang)));
  document.querySelector('#themeToggle').addEventListener('click',()=>{const dark=!document.body.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',dark);localStorage.setItem('fieldnoteTheme',dark?'dark':'light');apply()});
  document.body.classList.toggle('dark-mode',localStorage.getItem('fieldnoteTheme')==='dark');
  apply();
})();
