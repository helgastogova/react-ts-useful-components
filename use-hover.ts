import * as React from "react";

export function useHover(delay = 0): [React.MutableRefObject<any>, boolean] {
  const [value, setValue] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);
  let timer: ReturnType<typeof setTimeout>;

  const handleMouseOver = (): void => {
    if (timer) clearTimeout(timer);
    setValue(true);
  };

  const handleMouseOut = (): void => {
    timer = setTimeout(() => setValue(false), delay);
  };

  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        if (timer) clearTimeout(timer);
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return [ref, value];
}
