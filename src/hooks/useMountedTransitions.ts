import { useEffect, useRef, useState } from 'react';
import { useTwoWayState } from '..';
import { Speeds } from '../styles';

export function useMountedTransitions(initState: boolean, delay: Speeds) {
  const [pre, setPre] = useTwoWayState(initState);
  const [post, setPost] = useState(initState);
  const _delay = useRef(delay);

  useEffect(() => setPre(initState), [initState]);
  useEffect(() => {
    const timer = window.setTimeout(
      () => setPost(pre),
      pre ? 0 : _delay.current,
    );
    return () => window.clearTimeout(timer);
  }, [pre]);

  return {
    setState: setPre,
    shown: pre && post,
    mounted: pre || post,
  };
}
