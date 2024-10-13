"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Cross1Icon } from "@radix-ui/react-icons";

interface AboutProps {
  show: boolean;
  handleCLick: () => void;
}
export default function About({ show, handleCLick }: AboutProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (container.current && show) {
      const elements = container.current.querySelectorAll(".staggerNation");
      gsap.fromTo(
        elements,
        { opacity: 0, x: -10 },
        {
          opacity: 0.8,
          x: 16,
          duration: 0.4,
          ease: "sine.inOut",
          stagger: 0.1,
        }
      );
    }
    if (container.current && !show) {
      const elements = container.current.querySelectorAll(".staggerNation");
      gsap.to(elements, {
        opacity: 0,
        x: -10,
        stagger: 0.1,
        duration: 0.4,
      });
    }
  }, [show]);

  return (
    <article
      className="absolute top-[50%] translate-y-[-50%] z-20  flex flex-col gap-2 custom"
      ref={container}
    >
      <button className="staggerNation opacity-0" onClick={handleCLick}>
        <Cross1Icon />
      </button>

      <h2 className="text-2xl staggerNation opacity-0" ref={container}>
        Hello there!
      </h2>
      <p ref={container} className="staggerNation opacity-0">
        I used to be a social worker, but now I work as a web developer with a
        passion for frontend development.
      </p>
      <p className="staggerNation">
        You can find some of my work{" "}
        <Link
          href="https://www.github.com/Jean-Christoffer"
          target="_blank"
          className="md:hover:underline"
        >
          <em>
            <strong>here.</strong>
          </em>
        </Link>
      </p>
      <p className="staggerNation">
        Feel free to{" "}
        <Link
          href="https://www.linkedin.com/in/jean-christoffer-d-7b7552260"
          target="_blank"
          className="md:hover:underline"
        >
          <em>
            <strong>contact me</strong>{" "}
          </em>
        </Link>
        if you&apos;d like to have a chat.
      </p>
    </article>
  );
}
