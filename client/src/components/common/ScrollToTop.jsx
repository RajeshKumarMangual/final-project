import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Change to "auto" if you want instant scrolling without animation
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;