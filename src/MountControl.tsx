import { useState, useEffect, useRef } from 'react';

const MOUNT = 'mount';
const UNMOUNT = 'unmount';

type TransitionType = typeof MOUNT | typeof UNMOUNT;

interface MountControlProps {
  children: React.ReactNode;
  mount: boolean;
  duration: number;
  onMount?: () => void;
  onUnmount?: () => void;
  onTransition?: (transitionType: TransitionType) => void;
}

export default function MountControl({
  children,
  mount,
  duration,
  onMount,
  onUnmount,
  onTransition,
}: MountControlProps) {
  const timeoutID = useRef<NodeJS.Timeout | null>(null);
  const [transition, setTransition] = useState<TransitionType>(UNMOUNT);

  useEffect(() => {
    if (mount) {
      setTransition(MOUNT);
    } else {
      timeoutID.current = setTimeout(() => {
        setTransition(UNMOUNT);
      }, duration);
    }

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
      }
    };
  }, [duration, mount]);

  useEffect(() => {
    // При монтировании компонента
    if (mount || transition === MOUNT) onMount?.();
    // При размонтировании компонента
    if (!mount && transition === UNMOUNT) onUnmount?.();
    // При запуске перехода (при монтировании или размонтировании компонента)
    if (transition === MOUNT) onTransition?.(mount ? MOUNT : UNMOUNT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mount, transition]);

  return mount || transition === MOUNT ? <>{children}</> : null;
}
