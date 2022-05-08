import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function useTwoWayState<T>(initState: T): [T, Dispatch<SetStateAction<T>>] {
  const [ state, setState ] = useState(initState);
  useEffect(() => {
    if (state === initState) return;
    setState(initState);
  }, [ state, initState ]);

  return [ state, setState ];
}