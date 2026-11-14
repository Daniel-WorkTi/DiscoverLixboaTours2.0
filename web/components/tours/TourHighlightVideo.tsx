"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  loadYouTubeApi,
  type YTPlayer,
} from "@/lib/youtube-iframe-api";

type Props = {
  videoId: string;
  label: string;
  /** Segundo do vídeo usado como início. */
  coverStartSeconds?: number;
};

export function TourHighlightVideo({
  videoId,
  label,
  coverStartSeconds = 5,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const hostId = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;

    async function setup() {
      await loadYouTubeApi();
      if (cancelled || !hostRef.current || !window.YT?.Player) return;

      playerRef.current?.destroy();
      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          mute: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: coverStartSeconds,
          cc_load_policy: 0,
        },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true);
          },
          onStateChange: (e) => {
            if (cancelled || !window.YT) return;
            if (e.data === window.YT.PlayerState.PLAYING) setPlaying(true);
            if (
              e.data === window.YT.PlayerState.PAUSED ||
              e.data === window.YT.PlayerState.ENDED
            ) {
              setPlaying(false);
            }
          },
        },
      });
    }

    void setup();

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      setReady(false);
      setPlaying(false);
    };
  }, [coverStartSeconds, videoId]);

  const toggle = useCallback(() => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  }, [playing, ready]);

  return (
    <div className={`tour-highlight__video${playing ? " is-playing" : ""}`}>
      <div className="tour-highlight__player" id={`yt-${hostId}`} ref={hostRef} />

      <button
        type="button"
        className="tour-highlight__control"
        onClick={toggle}
        aria-label={playing ? `${label} — pausar` : `${label} — reproduzir`}
        disabled={!ready}
      >
        <span className="tour-highlight__control-icon" aria-hidden>
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 6.8v10.4L18 12 8.5 6.8z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
