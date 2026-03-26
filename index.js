window.addEventListener("scroll", function() {
  const title = document.querySelector(".title");
  const content = document.querySelector(".content1");

  const sectionTop = title.parentElement.getBoundingClientRect().top;

  if(sectionTop < 100){  
    title.classList.add("hide");
    content.classList.add("show");
  } else {
    title.classList.remove("hide");
    content.classList.remove("show");
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // 定义所有section的配置
    const sections = [
        {
            sectionSelector: '.home',
            stickySelector: '.content1',
            animateSelector: '.home .animate-on-scroll'
        },
        {
            sectionSelector: '.future1',
            stickySelector: '.content2',
            animateSelector: '.future1 .animate-on-scroll'
        },
        {
            sectionSelector: '.future',
            stickySelector: '.title3',
            animateSelector: '.future .animate-on-scroll'
        },
        {
            sectionSelector: '.about',
            stickySelector: '.about .sticky-element',
            animateSelector: '.about .animate-on-scroll'
        },
        {
            sectionSelector: '.seller',
            stickySelector: '.seller .sticky-element',
            animateSelector: '.seller .animate-on-scroll'
        },
        {
            sectionSelector: '.end',
            stickySelector: '.end .sticky-element',
            animateSelector: '.end .animate-on-scroll'
        },
        {
            sectionSelector: '.author',
            stickySelector: '.author .sticky-element',
            animateSelector: '.author .animate-on-scroll'
        }
    ];

    // 为每个section添加滚动动画逻辑
    sections.forEach(config => {
        const sectionEl = document.querySelector(config.sectionSelector);
        const stickyEl = document.querySelector(config.stickySelector);
        const animateEls = document.querySelectorAll(config.animateSelector);

        if (!sectionEl || !stickyEl) return;

        let sectionTop = sectionEl.offsetTop;
        let sectionHeight = sectionEl.offsetHeight;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop - sectionTop) / sectionHeight;

            // 触发动画元素
            animateEls.forEach((el, index) => {
                const triggerPoint = index / Math.max(animateEls.length - 1, 1);
                if (progress >= triggerPoint) {
                    el.classList.add('animate');
                } else {
                    el.classList.remove('animate');
                }
            });

            // sticky元素动画：从进入就开始动画
            if (progress >= 0) {
                stickyEl.classList.add('animate');
            } else {
                stickyEl.classList.remove('animate');
            }

            // sticky元素消失：在所有动画完成后才开始消失
            const lastAnimateTriggerPoint = animateEls.length > 0 ? 
                (animateEls.length - 1) / Math.max(animateEls.length - 1, 1) : 0;
            const hidePoint = lastAnimateTriggerPoint + 0.4;  // 增加0.4作为消失缓冲

            if (progress >= hidePoint) {
                stickyEl.classList.add('hide');
            } else {
                stickyEl.classList.remove('hide');
            }
        });
    });
});