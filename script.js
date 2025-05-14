function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotive();
function videoConAnimation() {
  let videoCon = document.querySelector(".video-container");
  let playBtn = document.querySelector(".play");

  videoCon.addEventListener("mouseenter", function () {
    gsap.to(playBtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videoCon.addEventListener("mouseleave", function () {
    gsap.to(playBtn, {
      scale: 0,
      opacity: 0,
    });
  });
  videoCon.addEventListener("mousemove", function (dets) {
    gsap.to(playBtn, {
      left: dets.x - 50,
      top: dets.y - 50,
    });
  });
}
videoConAnimation();

function loadingAnimation() {
  gsap.from(".page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.4,
    stagger: 0.4,
  });
  gsap.from(".page1 .video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.4,
  });
}
loadingAnimation();

function navbarAnimation() {
  gsap.to(".navPart1 svg", {
    transform: "translateY(-110%)",
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      //   markers: true,
      start: "top 0",
      end: "top -5%",
      scrub: 1,
    },
  });
  gsap.to(".navPart2 .links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      //   markers: true,
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}
navbarAnimation();

function CursorAnimation() {
  var cursor = document.querySelector(".cursor");
  document.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      left: dets.x,
      top: dets.y,
    });
  });

  // document.querySelector("#child1").addEventListener("mousemove", function () {
  //   gsap.to(".cursor", {
  //     transform: "translate(-50%,-50%) scale(1)",
  //   });
  // });
  // document.querySelector("#child1").addEventListener("mouseleave", function () {
  //   gsap.to(".cursor", {
  //     transform: "translate(-50%,-50%) scale(0)",
  //   });
  // });

  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        display: "block",
        transform: "translate(-50%,-50%) scale(1)",
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}
CursorAnimation();
function ImgAnimation() {
  let tl = gsap.timeline();
  tl.from(".page3Text-left h3", {
    y: 50,
    opacity: 0,
    // delay: 0.3,
    duration: 0.5,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "end end",
      scrub: true,
    },
  });
  tl.from(".page3Text-rigth", {
    y: 50,
    opacity: 0,
    delay: 0.9,
    duration: 0.5,
    stagger: 0.7,
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "end end",
      scrub: true,
    },
  });
  tl.from(".child", {
    y: 100,
    opacity: 0,
    // delay: 1,
    duration: 0.4,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".childContainer",
      scroller: ".main",
      // markers: true,
      start: "top 50%",
      end: "bottom 90% ",
      scrub: true,
    },
  });

  // gsap.from(".page1 .video-container", {
  //   scale: 0.9,
  //   opacity: 0,
  //   delay: 1.3,
  //   duration: 0.4,
  // });
}
ImgAnimation();
