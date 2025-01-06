"use client";
import React, { useEffect } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let scrollPosition = 0;

    const isScrollingDown = () => {
      let scrollingDown = false;
      const newScrollPosition = window.scrollY;
      if (newScrollPosition > scrollPosition) {
        scrollingDown = true;
      }
      scrollPosition = newScrollPosition;
      return scrollingDown;
    };
    const handleScroll = () => {
      const scrollToTopButton = document.querySelector(
        "[data-back-to-top-button]"
      );
      if (isScrollingDown() || window.pageYOffset == 0) {
        scrollToTopButton?.classList.add("opacity-0", "invisible");
        scrollToTopButton?.classList.remove("opacity-100", "visible");
      } else {
        scrollToTopButton?.classList.remove("opacity-0", "invisible");
        scrollToTopButton?.classList.add("opacity-100", "visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div
      data-back-to-top-button
      role="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-12 right-12 z-10 bg-indigo-600 group w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-back-to-top opacity-0 invisible"
    >
      <FaArrowUpLong color="white" />
    </div>
  );
}
