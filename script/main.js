gsap.set('.animatedCursor', {
    xPercent: -50,
    yPercent: -50
});

gsap.set('.followCursor', {
    xPercent: -50,
    yPercent: -50
});

const cur = document.querySelector('.animatedCursor');
const curFollow = document.querySelector('.followCursor');

window.addEventListener('mousemove', e =>{
   gsap.to(cur, .4, {x: e.clientX, y: e.clientY, ease: "easeIn"});
   gsap.to(curFollow, .6, {x: e.clientX, y: e.clientY, ease: "easeIn"});
});

const section = document.querySelector('section');
const gridLines = document.querySelector('.n2');




let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -900);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
  }
});

gsap.from('#about .container', {
    y: 500,
    duration: 2,
    ease: "easeIn"
})