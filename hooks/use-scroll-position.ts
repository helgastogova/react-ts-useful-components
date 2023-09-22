import * as React from "react";

export function useScrollPosition(): [React.MutableRefObject<any>, string] {
  const [position, setPosition] = React.useState<"fixed" | "relative">("fixed");
  const ref = React.useRef<HTMLDivElement>(null);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setPosition(currentScrollY < lastScrollY.current ? "fixed" : "relative");
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [ref, position];
}
