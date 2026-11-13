/* Prototipo de navegación: datos de muestra extraídos de páginas públicas del IAPH.
   No se conecta a Drupal ni verifica plazas, aforos o inscripciones en tiempo real. */
(() => {
  'use strict';
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const mobileToggle = $('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!expanded));
      $('#site-nav')?.classList.toggle('is-open', !expanded);
    });
    $$('#site-nav a').forEach(link => link.addEventListener('click', () => {
      $('#site-nav')?.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // El contenido se ha contrastado a 13 de noviembre de 2026.
  const events = [
    {id:'cofradias',type:'curso',typeLabel:'CURSO',state:'proxima',date:'16–19 nov 2026',place:'Sevilla · 14 horas',title:'La conservación del patrimonio en las hermandades y cofradías',description:'Curso especializado en conservación y gestión del patrimonio devocional, en colaboración con el Consejo General de Hermandades y Cofradías de Sevilla.',detail:'Del 16 al 19 de noviembre, de 18:30 a 21:00 horas. Actividad gratuita con inscripción gestionada por los canales de la entidad colaboradora. La disponibilidad de plazas no se consulta en este prototipo.',url:'https://www.juntadeandalucia.es/sites/default/files/inline-files/2026/10/curso-conservacion-patrimonio-hermandades-cofradias-iaph-2026.pdf',urlText:'Consultar folleto (PDF)'},
    {id:'pnic',type:'jornada',typeLabel:'JORNADA',state:'proxima',date:'20 nov 2026',place:'IAPH, Sevilla · 9:30–14:30',title:'V Workshop del Plan Nacional de Investigación en Conservación (PNIC)',description:'Presentación y debate de proyectos de investigación en conservación del patrimonio cultural.',detail:'20 de noviembre de 2026, de 9:30 a 14:30 horas. Inscripción gratuita hasta completar aforo. El enlace al formulario está publicado en el programa oficial; este prototipo no verifica plazas.',url:'https://www.juntadeandalucia.es/sites/default/files/inline-files/2026/10/workshop-plan-nacional-investigacion-conservacion-pnic-iaph-2026.pdf',urlText:'Consultar programa (PDF)',secondaryUrl:'https://encuestas.juntadeandalucia.es/index.php/962927',secondaryText:'Formulario oficial ↗'},
    {id:'arquitecturas',type:'jornada',typeLabel:'JORNADA',state:'celebrada',date:'16 abr 2026',place:'Actividad celebrada',title:'Arquitecturas modernas en la España del siglo XX',description:'Jornada técnica del Programa de Formación 2026 dedicada a la arquitectura del siglo XX.',detail:'Actividad celebrada el 16 de abril de 2026. Se conserva el folleto para consulta documental.',url:'https://www.juntadeandalucia.es/sites/default/files/inline-files/2026/03/jornada-arquitecturas-modernas-espana-siglo-xx.pdf',urlText:'Consultar folleto (PDF)'},
    {id:'ia',type:'jornada',typeLabel:'DIÁLOGOS',state:'celebrada',date:'10 mar 2026',place:'Actividad celebrada',title:'Uso ético de la IA en patrimonio cultural',description:'Diálogo sobre la aplicación responsable de la inteligencia artificial en el ámbito patrimonial.',detail:'Actividad celebrada el 10 de marzo de 2026. Se conserva el folleto para consulta.',url:'https://www.juntadeandalucia.es/sites/default/files/inline-files/2026/02/Folleto_jornada_uso_etico_IA_2026.pdf',urlText:'Consultar folleto (PDF)'},
    {id:'aniversario',type:'jornada',typeLabel:'JORNADA',state:'celebrada',date:'13 feb 2026',place:'Actividad celebrada',title:'30 años. Escuela de patrimonio cultural (1996–2026): retos de futuro',description:'Encuentro conmemorativo sobre las tres décadas del Programa de Formación del IAPH.',detail:'Actividad celebrada el 13 de febrero de 2026, en el marco del 30.º aniversario del Programa de Formación.',url:'https://www.juntadeandalucia.es/sites/default/files/inline-files/2026/02/Folleto_30_a%C3%B1os_Formacion_IAPH_2026.pdf',urlText:'Consultar folleto (PDF)'},
    {id:'mooc',type:'mooc',typeLabel:'MOOC',state:'celebrada',date:'18 may–29 jun 2026',place:'Formación en línea · Edición finalizada',title:'MOOC Patrimonio Cultural de Andalucía · 6.ª edición',description:'Formación en línea organizada por el IAPH y el Instituto Andaluz de Administración Pública (IAAP).',detail:'Sexta edición del 18 de mayo al 29 de junio de 2026. Las inscripciones se desarrollaron del 8 de abril al 25 de mayo de 2026. La edición está finalizada.',url:'https://www.juntadeandalucia.es/organismos/iaph/areas/formacion-difusion/programa-formacion.html',urlText:'Información oficial'}
  ];

  function initFormation() {
    const results = $('#course-results');
    if (!results) return;
    const search = $('#course-search');
    const type = $('#course-type');
    const state = $('#course-state');
    const dialog = $('#activity-dialog');
    const title = $('#dialog-title'); // The heading is placed on render below.

    function openDetail(event) {
      if (!dialog) return;
      const content = $('#dialog-content');
      content.replaceChildren();
      const h = document.createElement('h2');
      h.id = 'dialog-title';
      h.textContent = event.title;
      const meta = document.createElement('p');
      meta.className = 'dialog-meta';
      meta.textContent = `${event.typeLabel} · ${event.date} · ${event.place}`;
      const desc = document.createElement('p');
      desc.textContent = event.description;
      const detail = document.createElement('p');
      detail.textContent = event.detail;
      const actions = document.createElement('div');
      actions.className = 'dialog-actions';
      const primary = document.createElement('a');
      primary.href = event.url; primary.textContent = `${event.urlText} ↗`;
      primary.className = 'button-primary'; primary.target = '_blank'; primary.rel='noopener';
      actions.append(primary);
      if (event.secondaryUrl) {
        const secondary = document.createElement('a');
        secondary.href = event.secondaryUrl;
        secondary.textContent = event.secondaryText;
        secondary.className = 'button-outline'; secondary.target='_blank'; secondary.rel='noopener';
        actions.append(secondary);
      }
      content.append(h, meta, desc, detail, actions);
      dialog.showModal();
    }
    function buildCard(event) {
      const article = document.createElement('article');
      article.className = 'activity-card';
      const top = document.createElement('div'); top.className='activity-card-top';
      const kind = document.createElement('span'); kind.className='activity-type';kind.textContent=event.typeLabel;
      const badge=document.createElement('span');badge.className='state '+(event.state==='celebrada'?'past':'');badge.textContent=event.state==='celebrada'?'Celebrada':'Próxima';
      top.append(kind,badge);
      const body=document.createElement('div');body.className='activity-card-body';
      const h=document.createElement('h3');h.textContent=event.title;
      const date=document.createElement('p');date.className='metadata';date.textContent=event.date+' · '+event.place;
      const desc=document.createElement('p');desc.textContent=event.description;
      body.append(h,date,desc);
      const footer=document.createElement('div');footer.className='activity-card-footer';
      const btn=document.createElement('button');btn.type='button';btn.className='link-button';btn.textContent='Ver ficha y enlaces →';btn.setAttribute('aria-label','Ver ficha de '+event.title);btn.addEventListener('click',()=>openDetail(event));
      footer.append(btn);article.append(top,body,footer);return article;
    }
    function render() {
      const query=search.value.toLocaleLowerCase('es').trim();
      const filtered=events.filter(e =>
        (type.value==='todos'||e.type===type.value) &&
        (state.value==='todos'||e.state===state.value) &&
        (!query||[e.title,e.description,e.place,e.typeLabel].join(' ').toLocaleLowerCase('es').includes(query))
      );
      results.replaceChildren(...filtered.map(buildCard));
      $('#results-label').textContent=`${filtered.length} actividad${filtered.length===1?'':'es'} disponible${filtered.length===1?'':'s'} en esta demostración`;
      $('#empty-course-results').hidden=filtered.length!==0;
    }
    [search,type,state].forEach(el=>el.addEventListener(el===search?'input':'change',render));
    $('#reset-filters').addEventListener('click',()=>{search.value='';type.value='todos';state.value='todos';render();search.focus();});
    $('#dialog-close')?.addEventListener('click',()=>dialog.close());
    dialog?.addEventListener('click', event=>{if(event.target===dialog)dialog.close();});
    render();
  }

  const editions = {
    '2025': {number:'IV ENCUENTRO', title:'Creatividad, innovación y patrimonio, nuevas miradas',date:'11 y 12 de noviembre de 2025 · Sevilla',description:'El encuentro exploró cómo la creatividad y la innovación contribuyen a la activación del patrimonio y al bienestar de las comunidades locales.',links:[
      ['Programa (PDF)','https://www.juntadeandalucia.es/sites/default/files/inline-files/2025/11/REDACTIVATE_Programa_2025.pdf'],
      ['Convocatoria (PDF)','https://www.juntadeandalucia.es/sites/default/files/inline-files/2025/04/Convocatoria_Proyect_Redactivate_25_v2.pdf'],
      ['Relatoría (PDF)','https://repositorio.iaph.es/bitstream/11532/404355/2/Relatoria_Encuentro_IAPH_Redactivate_2025.pdf'],
      ['Grabaciones ↗','https://www.youtube.com/watch?list=PLPyntzoR9s3ohmPMcOVmtdEM-8GiQFCOP&v=qGU3IZ4kWFw']
    ]},
    '2023': {number:'III ENCUENTRO', title:'Educar desde el patrimonio',date:'2023 · III Encuentro',description:'Edición dedicada a los vínculos entre educación, patrimonio cultural, comunidades y territorio.',links:[
      ['Programa (PDF)','https://www.juntadeandalucia.es/sites/default/files/inline-files/2023/11/Programa_Redactivate_2023_v2.pdf'],
      ['Convocatoria (PDF)','https://www.juntadeandalucia.es/sites/default/files/inline-files/2023/10/CONVOCATORIA_REDACTIVATE_2023.pdf'],
      ['Relatoría (PDF)','https://repositorio.iaph.es/bitstream/11532/374918/2/Relatoria_Encuentro_IAPH_Redactivate_2023.pdf'],
      ['Grabaciones ↗','https://www.youtube.com/watch?list=PLPyntzoR9s3peW-DXpLpVFYP_Gf7JleYH&v=F1pp0DAd4r4']
    ]},
    '2021': {number:'II ENCUENTRO', title:'Los cuidados del patrimonio y su comunidad',date:'2021 · II Encuentro',description:'Reflexión colectiva sobre los cuidados del patrimonio cultural y las comunidades que lo sostienen.',links:[
      ['Programa (PDF)','https://repositorio.iaph.es/bitstream/11532/345977/2/II%20Encuentro%20Patrimonio%20de%20Proximidad_Programa_2021.pdf'],
      ['Archivo de la edición ↗','https://www.juntadeandalucia.es/organismos/iaph/areas/formacion-difusion/reactivate.html']
    ]},
    '2018': {number:'I ENCUENTRO', title:'Buenas prácticas en la activación del patrimonio cultural en el territorio',date:'7 y 8 de mayo de 2018 · Sevilla',description:'Primera convocatoria para reconocer, compartir y conectar experiencias de activación del patrimonio desde lo local.',links:[
      ['Programa (PDF)','https://repositorio.iaph.es/bitstream/11532/327676/2/I%20Encuentro%20Patrimonio%20de%20Proximidad_Programa_2018.pdf'],
      ['Iniciativas seleccionadas ↗','https://www.juntadeandalucia.es/organismos/iaph/areas/formacion-difusion/reactivate/paginas/listado-iniciativas-seleccionadas-iaph-2018.html'],
      ['Reunión de lanzamiento ↗','https://repositorio.iaph.es/handle/11532/327616']
    ]}
  };
  function initRedactivate() {
    const yearButtons = $$('.year-button');
    if(!yearButtons.length)return;
    function showYear(year) {
      const data=editions[year];if(!data)return;
      yearButtons.forEach(btn=>{const active=btn.dataset.year===year;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));});
      $('#edition-year').textContent=year;
      $('#edition-number').textContent=data.number;
      $('#edition-title').textContent=data.title;
      $('#edition-description').textContent=data.description;
      $('#edition-date').textContent=data.date;
      const linkBox=$('#edition-links');linkBox.replaceChildren();
      data.links.forEach(([label,url])=>{
        const link=document.createElement('a');link.href=url;link.textContent=label+' ↗';link.target='_blank';link.rel='noopener';linkBox.append(link);
      });
    }
    yearButtons.forEach(btn=>btn.addEventListener('click',()=>showYear(btn.dataset.year)));
    const search=$('#initiative-search');
    search?.addEventListener('input',()=>{
      const query=search.value.trim().toLocaleLowerCase('es');
      const cards=$$('.initiative-card');let visible=0;
      cards.forEach(card=>{const match=card.dataset.search.includes(query);card.hidden=!match;if(match)visible++;});
      $('#empty-initiatives').hidden=visible!==0;
    });
    showYear('2025');
  }

  // Presentación progresiva de originales oficiales: la ilustración local no desaparece
  // salvo que el navegador haya cargado correctamente la imagen remota.
  document.querySelectorAll('[data-upgrade-image]').forEach(img => {
    const show = () => { if (img.naturalWidth > 0) img.classList.add('is-ready'); };
    img.addEventListener('load', show, { once: true });
    if (img.complete) show();
  });

  if(document.body.dataset.page==='formacion')initFormation();
  if(document.body.dataset.page==='redactivate')initRedactivate();
})();
