'use client';

import * as React from 'react';

const Time = ({ time }: { time: Date }) => {
  const [currentTime, setCurrentTime] = React.useState(time);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{currentTime.toLocaleTimeString()}</div>;
};

export default Time;
