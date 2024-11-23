import { gsap } from 'gsap';

export const getAnimation = (type) => {
    switch (type) {
        case 'rightSlide':
            return (el) => gsap.fromTo(el, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
        case 'leftSlide':
            return (el) => gsap.fromTo(el, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
        case 'pop':
            return (el) => gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 });
        case 'smoothTransition':
            return (el) => gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1 });
        case 'fadeIn':
            return (el) => gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1 });
        case 'fadeOut':
            return (el) => gsap.fromTo(el, { opacity: 1 }, { opacity: 0, duration: 1 });
        case 'zoomIn':
            return (el) => gsap.fromTo(el, { scale: 0 }, { scale: 1, duration: 1 });
        case 'zoomOut':
            return (el) => gsap.fromTo(el, { scale: 1 }, { scale: 0, duration: 1 });
        case 'rotate':
            return (el) => gsap.fromTo(el, { rotation: 0 }, { rotation: 360, duration: 1 });
        case 'bounce':
            return (el) => gsap.fromTo(el, { y: 0 }, { y: -30, yoyo: true, repeat: -1, duration: 0.5 });
        case 'flipX':
            return (el) => gsap.fromTo(el, { rotationX: 0 }, { rotationX: 180, duration: 1 });
        case 'flipY':
            return (el) => gsap.fromTo(el, { rotationY: 0 }, { rotationY: 180, duration: 1 });
        case 'slideUp':
            return (el) => gsap.fromTo(el, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
        case 'slideDown':
            return (el) => gsap.fromTo(el, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
        case 'slideLeft':
            return (el) => gsap.fromTo(el, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
        case 'slideRight':
            return (el) => gsap.fromTo(el, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
        case 'shake':
            return (el) => gsap.fromTo(el, { x: -10 }, { x: 10, yoyo: true, repeat: 5, duration: 0.1 });
        case 'pulse':
            return (el) => gsap.fromTo(el, { scale: 1 }, { scale: 1.1, yoyo: true, repeat: -1, duration: 0.5 });
        case 'swing':
            return (el) => gsap.fromTo(el, { rotation: -15 }, { rotation: 15, yoyo: true, repeat: -1, duration: 0.5 });
        case 'tada':
            return (el) => gsap.fromTo(el, { scale: 1 }, { scale: 1.1, rotation: 3, yoyo: true, repeat: 5, duration: 0.1 });
        case 'wobble':
            return (el) => gsap.fromTo(el, { x: -25, rotation: -5 }, { x: 25, rotation: 5, yoyo: true, repeat: 5, duration: 0.1 });
        default:
            return (el) => gsap.fromTo(el, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
    }
};