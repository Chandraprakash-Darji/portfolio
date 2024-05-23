'use client';

import * as React from 'react';
import { useIsMounted } from 'usehooks-ts';

const Time = ({ time }: { time: Date }) => {
  const [currentTime, setCurrentTime] = React.useState(time);
  const isMounted = useIsMounted();
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>{isMounted() ? currentTime.toLocaleTimeString() : '--:--:--'}</div>
  );
};

export default Time;
