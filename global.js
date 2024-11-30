// Configuration for fade-in animations
const fadeInConfigs = [
{
  selector: '[fade-in-chars]', // Selector for fade-in characters
  type: 'chars', // Type to split (characters)
  initialY: '2rem', // Initial Y position for fade-in
  duration: 0.2, // Animation duration
  stagger: 0.02, // Stagger timing for each character
},
{
  selector: '[fade-in-words]', // Selector for fade-in words
  type: 'words', // Type to split (words)
  initialY: '2rem', // Initial Y position for fade-in
  duration: 0.6, // Animation duration
  stagger: 0.1, // Stagger timing for each word
},
{
  selector: '[fade-in-lines]', // Selector for fade-in lines
  type: 'lines', // Type to split (lines)
  initialY: '2rem', // Initial Y position for fade-in
  duration: 0.4, // Animation duration
  stagger: 0.1, // Stagger timing for each line
}];

// Function to create ScrollTrigger animation for fading in elements
const createFadeInAnimation = (config) => {
  const elements = document.querySelectorAll(config.selector); // Select elements

  elements.forEach(element => {
    const splitInstance = new SplitType(element, { types: config.type }); // Split text
    const splitTypeArray = splitInstance[config.type]; // Access chars, words, or lines array

    gsap.set(splitTypeArray, {
      opacity: 0,
      y: config.initialY
    }); // Set initial state

    // Create ScrollTrigger for the fade-in effect
    ScrollTrigger.create({
      trigger: element, // Element that triggers the animation
      start: "top 80%", // Start animation when top hits 80% of viewport
      onEnter: () => {
        gsap.to(splitTypeArray, {
          opacity: 1, // Fade in
          y: 0, // Move to original position
          duration: config.duration, // Animation duration
          stagger: config.stagger, // Stagger timing
          ease: 'power2.out', // Easing function
        });
      },
      once: true // Ensure animation runs only once
    });
  });
};

// Loop through the configurations to create fade-in animations
fadeInConfigs.forEach(createFadeInAnimation); // Create animations for each config

// Marquee
// Define a marquee function with adjustable speed
function createMarquee(selector, duration, speedMultiplier = 1) {
  // Select the marquee element
  const marqueeElement = document.querySelector(selector);

  // Ensure the element exists before proceeding
  if (!marqueeElement) return;

  let controlObject = { value: speedMultiplier }; // Start at defined speed

  // Marquee timeline
  let marqueeTimeline = gsap.timeline({ repeat: -1 });
  marqueeTimeline.fromTo(
    marqueeElement, { xPercent: 0 }, { xPercent: -50, duration: duration, ease: "none" }
  ).timeScale(speedMultiplier); // Set initial speed based on multiplier

  // Function to pause marquee
  const pauseMarquee = () => {
    gsap.fromTo(
      controlObject, { value: speedMultiplier },
      {
        value: 0,
        duration: 1.2,
        onUpdate: () => marqueeTimeline.timeScale(controlObject.value)
      }
    );
  };

  // Function to resume marquee
  const resumeMarquee = () => {
    gsap.fromTo(
      controlObject, { value: 0 },
      {
        value: speedMultiplier,
        duration: 1.2,
        onUpdate: () => marqueeTimeline.timeScale(controlObject.value)
      }
    );
  };

  // Event listeners for hover control
  marqueeElement.addEventListener("mouseenter", pauseMarquee);
  marqueeElement.addEventListener("mouseleave", resumeMarquee);
}

// Initialize marquees with different speeds
createMarquee(".mq_track.is-logos", 40, 1); // Normal speed for clients
createMarquee(".mq_track.is-gallery", 40, 2); // 2x faster speed for gallery
createMarquee(".mq_track.is-product-gallery", 40,
  0.8); // 0.8x slower speed for product gallery

// Initialize marquees with different speeds
createMarquee(".clients_track", 40, 1); // Normal speed for clients
createMarquee(".gallery_track", 40, 2); // [2]]x faster speed for gallery
createMarquee(".clients_track.is-product-gallery", 40,
  0.8); // [0.5]]x faster speed for product gallery

// Testimonials slider
document.querySelectorAll(".testimonials_component").forEach(component => {
  const loopMode = component.getAttribute("loop-mode") !== "false";
  const sliderDuration = parseInt(component.getAttribute("slider-duration")) || 300;

  const swiper = new Swiper(component.querySelector(".swiper.is-testimonials"), {
    speed: sliderDuration,
    loop: loopMode,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: "4%",
    mousewheel: { forceToAxis: true },
    keyboard: { enabled: true, onlyInViewport: true },
    breakpoints: {
      480: { slidesPerView: 1.5, spaceBetween: "4%" },
      768: { slidesPerView: 2, spaceBetween: "4%" },
      992: { slidesPerView: 2, spaceBetween: "2%" }
    },
    pagination: {
      el: component.querySelector(".swiper-bullet-wrapper"),
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true
    },
    navigation: {
      nextEl: component.querySelector(".swiper-next"),
      prevEl: component.querySelector(".swiper-prev"),
      disabledClass: "is-disabled"
    }
  });
});
