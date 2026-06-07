import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const IST_OFFSET_MINUTES = 330; // UTC+5:30

function getOffset(): string {
  const viewerOffset = -new Date().getTimezoneOffset(); // in minutes
  const diff = IST_OFFSET_MINUTES - viewerOffset;
  if (diff === 0) return 'same time';
  const h = Math.floor(Math.abs(diff) / 60);
  const m = Math.abs(diff) % 60;
  const label = m === 0 ? `${h}h` : `${h}h ${m}m`;
  return diff > 0 ? `${label} ahead` : `${label} behind`;
}

export function LiveClock() {
  const [time, setTime] = useState('--:--');
  const [offset, setOffset] = useState('');

  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(t);
    };
    tick();
    setOffset(getOffset());
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div class="flex items-center gap-2.5 px-3 py-2.5 font-mono text-sm text-muted-foreground">
      <Clock size={14} className="shrink-0 text-foreground/50" />
      <span>
        {time}
        {offset && (
          <span class="ml-1.5 text-xs text-muted-foreground/60">// {offset}</span>
        )}
      </span>
    </div>
  );
}
