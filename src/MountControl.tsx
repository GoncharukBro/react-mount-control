import { useState, useEffect, useRef } from 'react';

const MOUNT = 'MOUNT';
const UNMOUNT = 'UNMOUNT';

type TransitionType = typeof MOUNT | typeof UNMOUNT;

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
  const [transition, setTransition] = useState<TransitionType>(UNMOUNT);

  useEffect(() => {
    if (mount) {
      setTransition(MOUNT);
    } else {
      timeoutID.current = setTimeout(() => {
        setTransition(UNMOUNT);
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
    if (mount && transition === UNMOUNT) onMount?.();
    if (!mount && transition === UNMOUNT) onUnmount?.();
    if (mount && transition === MOUNT) onTransitionMount?.();
    if (!mount && transition === MOUNT) onTransitionUnmount?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mount, transition]);

  return (
    <>
      {mount || transition === MOUNT ? <>{children}</> : null}

      <pre>{JSON.stringify({ mount, transition }, null, 2)}</pre>
    </>
  );
}
