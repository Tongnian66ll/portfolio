const area=document.querySelector('.window-area');
const curtain=document.querySelector('#curtain');
const toggle=document.querySelector('#curtain-toggle');
function toggleCurtain(){const open=area.classList.toggle('open');curtain.setAttribute('aria-expanded',String(open));curtain.setAttribute('aria-label',open?'合上窗帘':'拉开窗帘');toggle.innerHTML=(open?'合上窗帘':'拉开窗帘')+' <span>↔</span>';}
curtain.addEventListener('click',toggleCurtain);toggle.addEventListener('click',toggleCurtain);
const detail=document.querySelector('#detail-dialog'),landscape=document.querySelector('#landscape-dialog');
const projectData={gold:['FILM PRODUCTION / 2025.03','赏金游戏','短剧 · 导演助理','参与 3 天拍摄，精准记录 300+ 镜头场次、演员走位及道具细节，确保场景连续性。','将拍摄数据同步至导演、摄影与服化道部门，协助保障每日拍摄进度。'],blue:['FILM PRODUCTION / 2024.02','星期三是蓝色的','毕业设计 · 外联制片','独立统筹全片外联资源，完成 12+ 拍摄场地洽谈。','建立合作方资源库并落实器材租赁，策划现场应急预案，保障拍摄执行。'],western:['FILM PRODUCTION / 2024.09 — 10','西施笑','网络院线电影 · 导演助理','参与 25 天商业电影拍摄，与导演、演员及拍摄团队协作。','精准记录拍摄内容与场景连续性，支持现场制作流程。'],ai:['AI VISUALS / 2025 — 2026','Seedance 系列数据标注','AI 影像文本标注 · AI 视频标注','2026.03—2026.04，参与字节跳动子公司的影视视频拆解专项培训，为 Seedance 系列模型提供高质量训练数据。','2025.09—2025.10，在南京某科技公司完成超过 2000 条视频数据的标注与优化，协助 AI 视频生成模型建立。'],edit:['EDITING / 2025 — 2026','把日常，剪成故事','养成系减肥博主 · 珠宝 IP 店铺 / 剪辑师','根据账号成长定位与平台特点优化剪辑节奏：单条视频播放 4万+，单条视频涨粉 1.5万+，累计涨粉 1.9万+。','为珠宝 IP 店铺复盘播放与互动表现，优化剪辑节奏与选题，注重字体和画面质感，强化珠宝的视觉调性。']};
const modalFocus = new Map();
function openModal(modal){modalFocus.set(modal,document.activeElement);modal.showModal();document.body.style.overflow='hidden';}
function closeModal(modal){modal.close();}
document.querySelectorAll('dialog').forEach(modal=>{modal.addEventListener('close',()=>{document.body.style.overflow=document.querySelector('dialog[open]')?'hidden':'';const target=modalFocus.get(modal);if(target?.isConnected)target.focus({preventScroll:true});});modal.addEventListener('click',e=>{if(e.target===modal && !['library-dialog','landscape-dialog','media-dialog'].includes(modal.id)){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal(modal);}})});
function showDetail(data,projectKey){document.querySelector('#detail-eyebrow').textContent=data[0];document.querySelector('#detail-title').textContent=data[1];document.querySelector('#detail-role').textContent=data[2];const body=document.querySelector('#detail-body');body.replaceChildren();data.slice(3).forEach(text=>{const p=document.createElement('p');p.textContent=text;body.append(p)});const related={gold:'film-01',blue:'film-05',edit:'edit-08'};const item=allMedia.find(x=>x.id===related[projectKey]);if(item){const link=document.createElement('button');link.className='related-work';link.textContent='观看作品 · '+cleanTitle(item.title)+' ↗';link.addEventListener('click',()=>{openLibrary(item.category);openMedia(currentItems.findIndex(x=>x.id===item.id));});body.append(link);}openModal(detail)}
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>showDetail(projectData[b.dataset.project],b.dataset.project)));
document.querySelectorAll('[data-work]').forEach(b=>{b.addEventListener('click',()=>openLibrary(b.dataset.work));b.addEventListener('pointerenter',()=>{document.querySelectorAll('.work-card').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')});b.addEventListener('focus',()=>{document.querySelectorAll('.work-card').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')})});
document.querySelector('.close-dialog').onclick=()=>closeModal(detail);document.querySelector('.dialog-done').onclick=()=>closeModal(detail);
document.querySelector('#enter-window').onclick=()=>{openModal(landscape);startJourney();};document.querySelector('.close-landscape').onclick=()=>closeModal(landscape);document.querySelector('.return-window').onclick=()=>closeModal(landscape);
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.rail a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-25% 0px -45% 0px',threshold:0});document.querySelectorAll('main>section[id]').forEach(s=>observer.observe(s));

const photo=document.querySelector('#photo-dialog');
document.querySelector('#portrait-open').addEventListener('click',()=>openPhoto('assets/portrait-travel.jpg','张羽彤在山野旅行的个人照片'));
document.querySelector('.close-photo').addEventListener('click',()=>closeModal(photo));

photo.addEventListener('click',e=>{if(e.target===photo)closeModal(photo)});
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(!reduceMotion.matches){
 const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('is-pending');e.target.classList.add('is-visible');reveal.unobserve(e.target)}}),{threshold:.15});
 document.querySelectorAll('.slide-reveal').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.9)el.classList.add('is-pending');reveal.observe(el)});
 const card=document.querySelector('#portrait-open');
 card.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=card.getBoundingClientRect();card.style.setProperty('--shine-x',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--shine-y',((e.clientY-r.top)/r.height*100)+'%')});
 card.addEventListener('pointerleave',()=>{card.style.removeProperty('--shine-x');card.style.removeProperty('--shine-y')});
}

function openPhoto(src,alt){const img=photo.querySelector('img');img.src=src;img.alt=alt;photo.setAttribute('aria-label',alt);openModal(photo);}
document.querySelector('#contact-photo-open').addEventListener('click',()=>openPhoto('assets/contact-dusk.jpg','夕阳下的张羽彤'));
const allMedia=window.PORTFOLIO_MEDIA.filter(x=>!x.hero);
const categories={film:'影视制作',ai:'AI 影像创作',edit:'短视频剪辑'};
const library=document.querySelector('#library-dialog'), viewer=document.querySelector('#media-dialog');
const grid=document.querySelector('#media-grid'),demoVideo=document.querySelector('#demo-video'),demoImage=document.querySelector('#demo-image');
let currentCategory='film',currentItems=[],currentIndex=0;
const durationLabel=n=>Math.floor(n/60)+':'+String(Math.floor(n%60)).padStart(2,'0');
const cleanTitle=s=>s.replace(/[-—]?(demo|DEMO)$/i,'').replace(/^AI-/,'AI · ');
function setCategory(category){currentCategory=category;currentItems=allMedia.filter(x=>x.category===category);document.querySelector('#library-title').textContent=categories[category];const v=currentItems.filter(x=>x.type==='video').length,p=currentItems.length-v;document.querySelector('#library-count').textContent=v+' 条视频'+(p?' · '+p+' 张海报':'');document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));grid.replaceChildren();currentItems.forEach((item,index)=>{const button=document.createElement('button');button.className='demo-card';button.setAttribute('aria-label',(item.type==='video'?'播放：':'查看海报：')+cleanTitle(item.title));const visual=document.createElement('div');visual.className='demo-thumb';const img=document.createElement('img');img.src=item.poster;img.alt=cleanTitle(item.title);img.loading=index<6?'eager':'lazy';visual.append(img);const icon=document.createElement('span');icon.className='demo-play';icon.textContent=item.type==='video'?'▶':'↗';icon.setAttribute('aria-hidden','true');visual.append(icon);const badge=document.createElement('span');badge.className='demo-badge';badge.textContent=item.type==='video'?durationLabel(item.duration):'海报';visual.append(badge);const title=document.createElement('h3');title.textContent=cleanTitle(item.title);button.append(visual,title);button.addEventListener('click',()=>openMedia(index));grid.append(button)});library.scrollTop=0;}
function openLibrary(category){setCategory(category);openModal(library);library.scrollTop=0;}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>setCategory(b.dataset.category)));
document.querySelector('.library-close').onclick=()=>closeModal(library);document.querySelector('.library-back').onclick=()=>closeModal(library);
function stopDemo(){demoVideo.pause();demoVideo.removeAttribute('src');demoVideo.load();}
function renderMedia(index){stopDemo();currentIndex=index;const item=currentItems[index];document.querySelector('#media-error').hidden=true;document.querySelector('#media-title').textContent=cleanTitle(item.title);document.querySelector('#media-category').textContent=categories[currentCategory];document.querySelector('#media-position').textContent=(index+1)+' / '+currentItems.length;document.querySelector('#media-prev').disabled=index===0;document.querySelector('#media-next').disabled=index===currentItems.length-1;demoVideo.hidden=item.type!=='video';demoImage.hidden=item.type!=='image';if(item.type==='video'){demoVideo.poster=item.poster;demoVideo.src=item.src;demoVideo.play().catch(()=>{});}else{demoImage.src=item.src;demoImage.alt=cleanTitle(item.title);}}
function openMedia(index){openModal(viewer);renderMedia(index);}
document.querySelector('.media-close').onclick=()=>closeModal(viewer);viewer.addEventListener('close',stopDemo);
document.querySelector('#media-prev').onclick=()=>{if(currentIndex>0)renderMedia(currentIndex-1)};document.querySelector('#media-next').onclick=()=>{if(currentIndex<currentItems.length-1)renderMedia(currentIndex+1)};
demoVideo.addEventListener('error',()=>{if(demoVideo.getAttribute('src'))document.querySelector('#media-error').hidden=false;});document.querySelector('#media-retry').onclick=()=>renderMedia(currentIndex);
const featured={film:'film-05',ai:'ai-04',edit:'edit-08'};
document.querySelectorAll('[data-work]').forEach(b=>{const cat=b.dataset.work,item=allMedia.find(x=>x.id===featured[cat])||allMedia.find(x=>x.category===cat);b.querySelector('img').src=item.poster;b.querySelector('img').alt=cleanTitle(item.title)+'作品封面';const count=allMedia.filter(x=>x.category===cat);b.querySelector('.work-label p').textContent=count.filter(x=>x.type==='video').length+' 条视频'+(cat==='ai'?' · 5 张海报':'');});
const journey=document.querySelector('#window-video'),journeyPause=document.querySelector('#journey-pause');
function startJourney(){document.querySelector('#journey-error').hidden=true;journey.currentTime=0;document.querySelector('#journey-ending').classList.remove('visible');journey.play().catch(()=>{journeyPause.textContent='播放画面 ▶';journeyPause.setAttribute('aria-label','播放背景视频');});}
journeyPause.onclick=()=>{if(journey.ended)startJourney();else if(journey.paused)journey.play().catch(()=>{});else journey.pause();};
function syncJourney(){journeyPause.textContent=journey.ended?'再看一次 ↻':journey.paused?'播放画面 ▶':'暂停画面 Ⅱ';journeyPause.setAttribute('aria-label',journey.ended?'重新播放背景视频':journey.paused?'播放背景视频':'暂停背景视频');}
journey.addEventListener('play',syncJourney);journey.addEventListener('pause',syncJourney);landscape.addEventListener('close',()=>journey.pause());journey.addEventListener('error',()=>{document.querySelector('#journey-error').hidden=false;});
document.addEventListener('visibilitychange',()=>{if(document.hidden){journey.pause();demoVideo.pause();}});
const closing=document.querySelector('#contact-photo-open');
if(!reduceMotion.matches){const contactObserver=new IntersectionObserver(entries=>entries.forEach(e=>closing.classList.toggle('in-view',e.isIntersecting)),{threshold:.2});contactObserver.observe(closing);closing.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=closing.getBoundingClientRect();closing.style.setProperty('--glow-x',((e.clientX-r.left)/r.width*100)+'%');closing.style.setProperty('--glow-y',((e.clientY-r.top)/r.height*100)+'%');});}

function syncJourneyEnding(){document.querySelector('#journey-ending').classList.toggle('visible',Number.isFinite(journey.duration)&&journey.currentTime>=journey.duration-1.2);}
journey.addEventListener('timeupdate',syncJourneyEnding);journey.addEventListener('ended',()=>{syncJourneyEnding();syncJourney();});
