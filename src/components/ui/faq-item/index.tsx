"use client";

import { useState, useRef, useEffect } from "react";
import type { FaqItemProps } from "./faq-item.types";
import { faqItemStyles } from "./faq-item.styles";
import { KeyboardArrowDown } from "@mui/icons-material";

export function FaqItem({
  question,
  answer,
  defaultOpen = false,
  className = "",
  style,
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current && isOpen) {
        setHeight(contentRef.current.scrollHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <article
      className={`${faqItemStyles.container} ${className}`}
      style={style}
    >
      <div
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question}`}
        className={faqItemStyles.button}
      >
        <h3 className={faqItemStyles.question}>{question}</h3>

        <KeyboardArrowDown
          className={faqItemStyles.icon}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
          aria-hidden="true"
        />
      </div>

      <div
        id={`faq-answer-${question}`}
        className={faqItemStyles.content}
        style={{
          height: `${height}px`,
          opacity: isOpen ? 1 : 0,
        }}
        ref={contentRef}
      >
        <p className={faqItemStyles.answer}>{answer}</p>
      </div>
    </article>
  );
}
