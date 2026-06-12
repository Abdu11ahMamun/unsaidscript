import { useState, useEffect } from "react";
export function ScrollProgress({ accent }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setW(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div style={{ position:"fixed", top:60, left:0, height:3, width:`${w}%`, background:`linear-gradient(90deg,${accent},${accent}AA)`, zIndex:1500, transition:"width .1s linear" }}/>;
}
