import { useEffect, useRef } from 'react';

const useOutsideClick = (callback) => {
  let nodeRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!nodeRef.current.contains(e.target)) {
        console.log('yes');
        callback();
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return nodeRef;
};

export default useOutsideClick;
