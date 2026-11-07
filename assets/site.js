/* DSPDN public research page · lightweight accessible enhancement · no external dependencies */
(function(){
 'use strict';
 const I=window.DSPDN_I18N;
 const langSelect=document.getElementById('site-language');
 const langs=['zh','en','ru','fr','ar'];
 const langTag={zh:'zh-CN',en:'en',ru:'ru',fr:'fr',ar:'ar'};
 const ui={
  zh:{close:'关闭大图',open:'查看原始图片 ↗',hint:'按 Esc 关闭',copyOk:'论文题名已复制。',copyFail:'无法自动复制，请手动选择论文题名。',nav:'主导航',preview:'查看大图',modal:'图片放大预览',region:'步预测结果',select:'选择语言'},
  en:{close:'Close image',open:'Open original image ↗',hint:'Press Esc to close',copyOk:'Paper title copied.',copyFail:'Copy unavailable; please select the title manually.',nav:'Main navigation',preview:'Enlarge figure',modal:'Figure preview',region:'-step forecast results',select:'Select language'},
  ru:{close:'Закрыть изображение',open:'Открыть оригинал ↗',hint:'Esc — закрыть',copyOk:'Название статьи скопировано.',copyFail:'Не удалось скопировать. Выделите название вручную.',nav:'Основная навигация',preview:'Увеличить рисунок',modal:'Просмотр рисунка',region:' шагов: результаты',select:'Выбрать язык'},
  fr:{close:'Fermer l’image',open:'Ouvrir l’image originale ↗',hint:'Échap pour fermer',copyOk:'Titre de l’article copié.',copyFail:'Copie indisponible : sélectionnez le titre manuellement.',nav:'Navigation principale',preview:'Agrandir la figure',modal:'Agrandissement de la figure',region:' pas : résultats',select:'Choisir la langue'},
  ar:{close:'إغلاق الصورة',open:'فتح الصورة الأصلية ↗',hint:'اضغط Esc للإغلاق',copyOk:'تم نسخ عنوان البحث.',copyFail:'تعذر النسخ تلقائياً؛ يرجى تحديد العنوان يدوياً.',nav:'التنقل الرئيسي',preview:'تكبير الشكل',modal:'معاينة الصورة المكبرة',region:' خطوة: نتائج التنبؤ',select:'اختر اللغة'}
 };
 const desc={
  zh:'DSPDN 航空发动机性能退化趋势预测论文项目页：研究方法、原始图表、实验数据与研究边界。',
  en:'DSPDN research page: aero-engine performance degradation forecasting, method, source figures, benchmark results and limitations.',
  ru:'DSPDN: прогнозирование деградации авиадвигателей, методология, исходные рисунки, эксперименты и ограничения.',
  fr:'DSPDN : prévision de dégradation des turboréacteurs, méthode, figures originales, résultats et limites.',
  ar:'صفحة DSPDN البحثية: التنبؤ بتدهور أداء محركات الطائرات والمنهجية والأشكال والنتائج والقيود.'
 };
 function savedLang(){
  let choice='zh';
  try {const u=new URL(window.location.href);const q=u.searchParams.get('lang');if(langs.includes(q))return q;}catch(_e){}
  try {choice=localStorage.getItem('dspdn-language')||'zh';}catch(_e){}
  return langs.includes(choice)?choice:'zh';
 }
 let activeLang=savedLang();
 function applyLanguage(code){
  if(!langs.includes(code))code='zh';
  activeLang=code;const ar=(code==='ar');
  document.documentElement.lang=langTag[code];
  document.documentElement.dir=ar?'rtl':'ltr';
  document.body.dataset.language=code;
  langSelect.value=code;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
   const k=el.dataset.i18n;
   const text=I.text[code][k]||I.text.zh[k];
   if(text!=null)el.textContent=text;
  });
  const ab=document.querySelector('[data-abstract]');
  if(ab){ab.textContent=I.abstract[code];ab.lang=langTag[code];ab.dir=ar?'rtl':'ltr';}
  document.querySelectorAll('[data-alt-key]').forEach(function(img){
   const al=I.imageAlts[img.dataset.altKey];if(al)img.alt=al[code];
  });
  document.querySelectorAll('[data-aria-img]').forEach(function(a){
   const al=I.imageAlts[a.dataset.ariaImg];if(al)a.setAttribute('aria-label',ui[code].preview+': '+al[code]);
  });
  const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=desc[code];
  document.title='DSPDN · '+(code==='zh'?'航空发动机性能趋势预测':code==='en'?'Aero-engine performance prediction':code==='ru'?'Прогнозирование состояния авиадвигателей':code==='fr'?'Prévision des performances des turboréacteurs':'التنبؤ بأداء محركات الطائرات');
  const nav=document.querySelector('nav.nav-inner');if(nav)nav.setAttribute('aria-label',ui[code].nav);
  const brand=document.querySelector('.wordmark');if(brand)brand.setAttribute('aria-label','DSPDN · '+(code==='zh'?'返回顶部':code==='en'?'Back to top':code==='ru'?'Наверх':code==='fr'?'Retour en haut':'العودة إلى الأعلى'));
  const formula=document.querySelector('.formula[aria-label]');if(formula)formula.setAttribute('aria-label',code==='zh'?'预测为历史样本未来轨迹的相似性加权和':code==='en'?'Prediction is the similarity-weighted sum of historical future sequences':code==='ru'?'Прогноз как взвешенная сумма исторических будущих траекторий':code==='fr'?'Prévision par somme pondérée des trajectoires historiques futures':'التنبؤ هو مجموع موزون بالتشابه لمسارات العينات المرجعية المستقبلية');
  const hz=document.querySelector('.horizons[aria-label]');if(hz)hz.setAttribute('aria-label',code==='zh'?'选择预测长度':code==='en'?'Select forecast horizon':code==='ru'?'Выбрать горизонт прогноза':code==='fr'?'Choisir l’horizon de prévision':'اختر أفق التنبؤ');
  langSelect.setAttribute('aria-label',ui[code].select);
  const m=document.getElementById('image-modal');if(m)m.setAttribute('aria-label',ui[code].modal);
  const close=document.getElementById('modal-close');if(close)close.setAttribute('aria-label',ui[code].close);
  const orig=document.getElementById('modal-original');if(orig)orig.textContent=ui[code].open;
  const hint=document.getElementById('modal-hint');if(hint)hint.textContent=ui[code].hint;
  const status=document.getElementById('copy-status');if(status)status.textContent='';
  document.querySelectorAll('.result-panel .table-scroll').forEach(function(region){
   const p=region.closest('.result-panel');const h=p?p.id.replace('results-',''):'';
   region.setAttribute('aria-label',code==='en'?h+ui[code].region:code==='ar'?h+ui[code].region:code==='ru'?h+ui[code].region:code==='fr'?h+ui[code].region:h+'步预测结果');
  });
  if(m && !m.hidden){const a=lastFigure;if(a)updateModal(a);}
  try{localStorage.setItem('dspdn-language',code);}catch(_e){}
 }
 langSelect.addEventListener('change',function(){applyLanguage(langSelect.value);});
 // Forecast horizon switch: preserve provided source values exactly.
 document.querySelectorAll('[data-horizon]').forEach(function(btn){
  btn.addEventListener('click',function(){
   const h=btn.dataset.horizon;
   document.querySelectorAll('[data-horizon]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
   document.querySelectorAll('.result-panel').forEach(p=>{p.hidden=p.id!=='results-'+h;});
  });
 });
 // Citation copying with modern API and a robust fallback on local file:// pages.
 document.getElementById('copy-title').addEventListener('click',async function(){
  const title=document.getElementById('citation-title').textContent.trim();
  let ok=false;
  try{if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(title);ok=true;}}catch(_e){}
  if(!ok){const ta=document.createElement('textarea');ta.value=title;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();try{ok=document.execCommand('copy');}catch(_e){}ta.remove();}
  document.getElementById('copy-status').textContent=ok?ui[activeLang].copyOk:ui[activeLang].copyFail;
 });
 const modal=document.getElementById('image-modal');const modalImg=document.getElementById('modal-img');
 const modalCaption=document.getElementById('modal-caption');const modalOriginal=document.getElementById('modal-original');
 const modalClose=document.getElementById('modal-close');
 let returnFocus=null,lastFigure=null;
 function updateModal(a){
  const img=a.querySelector('img');if(!img)return;
  modalImg.src=img.getAttribute('src');modalImg.alt=img.alt;
  const fig=a.closest('figure');const cap=fig&&fig.querySelector('figcaption');
  modalCaption.textContent=cap?cap.textContent.trim().replace(/点击查看大图 ↗|Click to enlarge ↗|Cliquer pour agrandir ↗|Нажмите для увеличения ↗|انقر للتكبير ↗/g,'').trim():img.alt;
  modalOriginal.href=a.href;
 }
 function openModal(a){returnFocus=document.activeElement;lastFigure=a;updateModal(a);modal.hidden=false;document.body.classList.add('modal-open');modalClose.focus();}
 function closeModal(){if(modal.hidden)return;modal.hidden=true;document.body.classList.remove('modal-open');modalImg.removeAttribute('src');if(returnFocus&&returnFocus.focus)returnFocus.focus();}
 document.querySelectorAll('a.image-link').forEach(function(a){
  a.addEventListener('click',function(event){if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();openModal(a);});
 });
 modalClose.addEventListener('click',closeModal);
 modal.addEventListener('click',e=>{if(e.target.dataset.closeModal==='true')closeModal();});
 document.addEventListener('keydown',function(e){if(!modal.hidden){if(e.key==='Escape'){e.preventDefault();closeModal();}if(e.key==='Tab'){const active=document.activeElement;if(e.shiftKey && active===modalClose){e.preventDefault();document.getElementById('modal-original').focus();}else if(!e.shiftKey && active===document.getElementById('modal-original')){e.preventDefault();modalClose.focus();}}}});
 applyLanguage(activeLang);
})();
