import { useState, useEffect, useRef } from 'react';

export interface MountControlProps {
  children?: React.ReactNode;
  mount?: boolean;
  timeout?: number;
  onMount?: () => void;
  onUnmount?: () => void;
  onTransitionMount?: () => void;
  onTransitionUnmount?: () => void;
}

export default function MountControl({
  children,
  mount = false,
  timeout = 0,
  onMount,
  onUnmount,
  onTransitionMount,
  onTransitionUnmount,
}: MountControlProps) {
  console.warn('RENDER');
  const timeoutID = useRef<NodeJS.Timeout | null>(null);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    if (mount) {
      setTransition(false);
    } else {
      timeoutID.current = setTimeout(() => {
        setTransition(true);
      }, timeout);
    }

    return () => {
      if (timeoutID.current !== null) {
        clearTimeout(timeoutID.current);
        timeoutID.current = null;
      }
    };
  }, [mount, timeout]);

  useEffect(() => {
    if (mount && transition) onMount?.();
    if (!mount && transition) onUnmount?.();
    if (mount && !transition) onTransitionMount?.();
    if (!mount && !transition) onTransitionUnmount?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mount, transition]);

  return (
    <>
      {mount || !transition ? <>{children}</> : null}

      <pre>{JSON.stringify({ mount, transition }, null, 2)}</pre>
    </>
  );
}
