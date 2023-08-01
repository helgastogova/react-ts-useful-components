import * as React from "react";

export const getMobileDetect = (userAgent: string) => {
  const isAndroid = (): boolean => Boolean(/Android/i.exec(userAgent));
  const isIos = (): boolean => Boolean(/iPhone|iPad|iPod/i.exec(userAgent));
  const isOpera = (): boolean => Boolean(/Opera Mini/i.exec(userAgent));
  const isWindows = (): boolean => Boolean(/IEMobile/i.exec(userAgent));
  const isSSR = (): boolean => Boolean(/SSR/i.exec(userAgent));

  const isMobile = (): boolean => Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = (): boolean => Boolean(!isMobile() && !isSSR());
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  };
};
export const useMobileDetect = () => {
  const userAgent =
    typeof window === "undefined" || typeof window.navigator === "undefined" ? "SSR" : window.navigator.userAgent;
  return getMobileDetect(userAgent);
};
