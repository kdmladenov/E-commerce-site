import { useEffect, useState } from 'react';
import { uniqueId } from '../constants/utility-functions';

const useCreateDiv = () => {
  const [loaded, setLoaded] = useState(false);
  const [divId] = useState(`${uniqueId()}`);

  useEffect(() => {
    const newDiv = document.createElement('div');
    newDiv.id = divId;
    newDiv.style = 'position: fixed; top: 70px; right: 10px; z-index: 10000;';

    document.getElementsByTagName('body')[0].prepend(newDiv);

    setLoaded(true);

    return () => document.getElementsByTagName('body')[0].removeChild(newDiv);
  }, [divId]);

  return { loaded, divId };
};

export default useCreateDiv;
