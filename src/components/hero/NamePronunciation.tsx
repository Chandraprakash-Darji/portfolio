import { useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';

interface Props {
  /** Full name spoken by the fallback text-to-speech voice. */
  name: string;
  /** Human-readable respelling shown next to the button, e.g. "chun-druh-pruh-KAASH". */
  phonetic: string;
  /** Optional recording in /public, e.g. "/name.mp3". Falls back to speech synthesis if missing. */
  audioSrc?: string;
}

export function NamePronunciation({ name, phonetic, audioSrc }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const speak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.rate = 0.85;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const play = () => {
    (window as unknown as { umami?: { track?: (e: string) => void } }).umami?.track?.(
      'name-pronunciation',
    );
    setPlaying(true);

    if (audioSrc) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.addEventListener('ended', () => setPlaying(false));
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(speak);
      return;
    }

    speak();
  };

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`Hear how to pronounce ${name}`}
      title={`Pronounced ${phonetic}`}
      className="group mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <Volume2
        size={13}
        className={`shrink-0 transition-transform group-hover:text-foreground ${playing ? 'animate-pulse text-primary' : ''}`}
      />
      <span>{phonetic}</span>
    </button>
  );
}
