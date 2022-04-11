import { useEffect, useRef, useState } from 'react';
import { Speeds } from '../styles';

export function useMountedTransitions(initState: boolean, delay: Speeds) {
  const [pre, setPre] = useState(initState);
  const [post, setPost] = useState(initState);
  const _delay = useRef(delay);

  useEffect(() => {
    const timer = window.setTimeout(() => setPost(pre), _delay.current);
    return () => window.clearTimeout(timer);
  }, [pre]);

  return {
    setState: setPre,
    shown: pre || post,
    mounted: pre && post,
  };
}
