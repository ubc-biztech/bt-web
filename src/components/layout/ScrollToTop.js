import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Helper component to scroll to top
// React router doesn't automatically scroll to top when navigating to a different route
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
