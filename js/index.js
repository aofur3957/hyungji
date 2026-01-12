gsap.registerPlugin(SplitText);


window.addEventListener('load', ()=>{
  /* 레니스 초기화 */
  const lenis = new Lenis({
    autoRaf: true,
  });

  /* visual */
  !(function(){
  const visualSwiper = new Swiper('.visual-swiper', {
    effect: 'fade',
    loop: true,
  })
  const btnPlay = document.querySelector('.btn-play');
  const btnPause = document.querySelector('.btn-pause');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const slideIdx = document.querySelector('.c-page');
  let isPlay = true;
  
  function autoPlay(){
    if(isPlay){
      const tw = fillProgressBar();
      tw.eventCallback('onComplete', ()=>{
        visualSwiper.slideNext(1000);
      })
      tw.play();
    }
  }
  
  function btnEventHandler(){
    btnPlay.addEventListener('click', ()=>{
      isPlay = true;
      btnPlay.style.display = 'none';
      btnPause.style.display = 'block';
      autoPlay();
      console.log(isPlay);
    })

    btnPause.addEventListener('click', function(){
      resetProgressBar();
      isPlay = false;
      btnPlay.style.display = 'block';
      btnPause.style.display = 'none';
      console.log(isPlay);
    })

    btnPrev.addEventListener('click', function(){
      visualSwiper.slidePrev(1000);
    })

    btnNext.addEventListener('click', function(){
      visualSwiper.slideNext(1000);
    })

  }
  
  function fillProgressBar(){
    const tw = gsap.to('.progress-bar .inner', {scaleY: 1, duration: 8});
    tw.pause();
    return tw;
  }

  function resetProgressBar(){
    gsap.set('.progress-bar .inner', {scaleY: 0, overwrite: true});
  }

  function changeIndex(){
    const currentIdx = visualSwiper.realIndex + 1;
    slideIdx.textContent = `0${currentIdx}`;
  }
  
  function visualSlideAni(){
    visualSwiper.on('realIndexChange', function(swiper){
      resetProgressBar();
      changeIndex();
      autoPlay();
      bgTransition();
    })
  }

  function bgTransition(){
    visualSwiper.slides.forEach((slide, idx)=>{
      const bgEl = slide.querySelector('.bg');
      if(visualSwiper.slides[visualSwiper.activeIndex] === slide){
        gsap.to(bgEl, {scale: 1.3, duration: 1.6,});
      }else{
        gsap.set(bgEl, {scale: 1});
      }
    })
  }

  

  function init(){
    autoPlay();
    visualSlideAni();
    btnEventHandler();
    bgTransition();
  }

  init();
  })();

  /* slogun */
  !(function(){
    const split = new SplitText('.slogun .txt-box', {type: 'lines'});
    console.log(split);
  })();
})



