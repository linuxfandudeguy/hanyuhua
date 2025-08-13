import React, { useEffect, useRef } from 'react';

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'linuxfandudeguy/hanyuhua');
    script.setAttribute('data-repo-id', 'R_kgDOPcut4Q');
    script.setAttribute('data-mapping', 'number');
    script.setAttribute('data-term', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '1');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    containerRef.current.appendChild(script);

    return () => {
      // Cleanup when component unmounts
      containerRef.current?.removeChild(script);
    };
  }, []);

  return <div ref={containerRef}></div>;
}
