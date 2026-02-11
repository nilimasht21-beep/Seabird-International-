(function(){
  const imgs = Array.from(document.querySelectorAll('.gallery-item img'));
  const lightbox = document.getElementById('lightbox');
  if(!lightbox || imgs.length===0) return;
  const lbImage = lightbox.querySelector('.lb-image');
  const lbCaption = lightbox.querySelector('.lb-caption');
  const btnClose = lightbox.querySelector('.lb-close');
  const btnNext = lightbox.querySelector('.lb-next');
  const btnPrev = lightbox.querySelector('.lb-prev');
  let current = 0;

  function openAt(i){
    const img = imgs[i];
    lbImage.src = img.src;
    lbCaption.textContent = img.alt || '';
    lightbox.style.display = 'flex';
    current = i;
  }

  imgs.forEach((img, i)=> img.addEventListener('click', ()=> openAt(i)));

  btnClose.addEventListener('click', ()=> lightbox.style.display = 'none');
  btnNext.addEventListener('click', (e)=> { e.stopPropagation(); openAt((current+1)%imgs.length); });
  btnPrev.addEventListener('click', (e)=> { e.stopPropagation(); openAt((current-1+imgs.length)%imgs.length); });

  lightbox.addEventListener('click', (e)=> { if(e.target === lightbox) lightbox.style.display = 'none'; });

  document.addEventListener('keydown', (e)=>{
    if(lightbox.style.display === 'flex'){
      if(e.key === 'Escape') btnClose.click();
      if(e.key === 'ArrowRight') btnNext.click();
      if(e.key === 'ArrowLeft') btnPrev.click();
    }
  });
})();
