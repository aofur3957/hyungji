gsap.registerPlugin(SplitText, ScrollTrigger);


window.addEventListener('load', ()=>{
  /* 레니스 초기화 */
  const lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
  })

  gsap.ticker.lagSmoothing(0);

  /* header */
  !(function(){
    window.addEventListener('wheel', (e)=>{
      if(e.deltaY > 0){
        gsap.to('.header', {transform: 'translateY(-100%)', duration: 0.3});
      }else {
        gsap.to('.header', {transform: 'translateY(0)', duration: 0.3});
      }
    })
  })();

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
    const txtBox = document.querySelector('.slogun .txt-box');
    const slogunSec = document.querySelector('.slogun');
    const cloneEl = txtBox.cloneNode(true);
    cloneEl.classList.add('clone');
    slogunSec.appendChild(cloneEl);

    const split = new SplitText('.slogun .clone', {type: 'lines'});

    split.lines.map((line, idx)=>{
      const spanEl = document.createElement('span');
      spanEl.append(line.innerText);
      line.replaceChildren(spanEl);
    })


    ScrollTrigger.create({
      trigger: '.slogun',
      start: 'top+=50px 50%',
      end: 'bottom-=150px 50%',
      markers: true,
      scrub: true,
      onUpdate: (st)=>{
        const percentage = 1 / split.lines.length;
        split.lines.forEach((line, idx)=>{
          const startVal = percentage * idx;
          const endVal = percentage * (idx + 1);
          const changeBound = gsap.utils.mapRange(startVal, endVal, 100, 0);

          [...line.children][0].style.setProperty('--size', `${changeBound(st.progress)}%`);
        })
        
      }
    })


  })();

  /* business */
  !(function(){
    const businessSwiper = new Swiper('.business-swiper', {
      loop: true,
      loopAdditionalSlides: 1,
      speed: 1500,
      spaceBetween: 60,
    });

    function navigationHandle(){
      const btnPrev = document.querySelector('.business-swiper-btns .btn-prev');
      const btnNext = document.querySelector('.business-swiper-btns .btn-next');

      btnPrev.addEventListener('click', ()=>{
        businessSwiper.slidePrev(1500);
      })

      btnNext.addEventListener('click', ()=>{
        businessSwiper.slideNext(1500);
      })
    }
    

    function init(){
      navigationHandle();
    }

    init();
    
  })();

  /* worth */
  !(function(){
    ScrollTrigger.create({
      trigger: '.worth .video',
      start: 'top top',
      end: '+=100%',
      scrub: 1,
      pin: true,
      animation: gsap.to('.video-inner', {width: '100%', paddingTop: '100vh'}),
      markers: true,
    })
  })();

})


