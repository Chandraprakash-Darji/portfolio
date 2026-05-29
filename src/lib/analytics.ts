const EVENT_TYPE = ['link', 'navigate', 'recommend'] as const;
type EventType = (typeof EVENT_TYPE)[number];

type TrackEvent = (
  event_name: string,
  event_data?: { type?: EventType } & { [key: string]: string | number },
) => void;

export const trackEvent: TrackEvent = (...args) => {
  const w = window as Window & { umami?: { track: (...a: unknown[]) => void } };
  if (w.umami && typeof w.umami.track === 'function') {
    w.umami.track(...args);
  }
};
