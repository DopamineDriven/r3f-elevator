"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useIos() {
  const [isIos, setIsIos] = useState<boolean>(false);

  useEffect(() => {
    // ios cookie is of type `${boolean}`
    const iosCookie = Cookies.get("ios");
    setIsIos(iosCookie === "true");
  }, []);

  return isIos;
}
