import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BlurReveal.css";

gsap.registerPlugin(ScrollTrigger);

interface BlurRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  staggerAmount?: number; // Control the stagger amount for words animation
}

const BlurReveal: React.FC<BlurRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  staggerAmount = 0.05, // Default stagger of 0.05 seconds
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : String(children);
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const rotationTrigger = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: "top bottom",
      end: rotationEnd,
      scrub: true,
    });

    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: rotationTrigger,
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    const opacityTrigger = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: "top bottom-=20%",
      end: wordAnimationEnd,
      scrub: true,
    });

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: staggerAmount,
        scrollTrigger: opacityTrigger,
      }
    );
    let blurTrigger: ScrollTrigger | undefined;
    if (enableBlur) {
      blurTrigger = ScrollTrigger.create({
        trigger: el,
        scroller,
        start: "top bottom-=20%",
        end: wordAnimationEnd,
        scrub: true,
      });

      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: staggerAmount,
          scrollTrigger: blurTrigger,
        }
      );
    }

    return () => {
      rotationTrigger.kill();
      opacityTrigger.kill();
      if (blurTrigger) blurTrigger.kill();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    staggerAmount,
  ]);
  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </div>
  );
};

export default BlurReveal;
