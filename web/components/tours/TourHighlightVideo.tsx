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

function fitIframe(player: YTPlayer) {
  const iframe = player.getIframe?.();
  if (!iframe) return;
  iframe.style.position = "absolute";
  iframe.style.inset = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.maxWidth = "none";
  iframe.style.maxHeight = "none";
  iframe.style.border = "0";
  iframe.removeAttribute("width");
  iframe.removeAttribute("height");
}

export function TourHighlightVideo({
  videoId,
  label,
  coverStartSeconds = 5,
}: Props) {
  const playerRef = useRef<YTPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const hostId = `yt-tour-${useId().replace(/:/g, "")}`;
  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setFailed(false);
    setPlaying(false);

    async function setup() {
      try {
        await loadYouTubeApi();
      } catch {
        if (!cancelled) setFailed(true);
        return;
      }
      if (cancelled || !window.YT?.Player) {
        if (!cancelled) setFailed(true);
        return;
      }
      if (!document.getElementById(hostId)) {
        if (!cancelled) setFailed(true);
        return;
      }

      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }

      const playerVars: Record<string, string | number> = {
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
      };
      if (typeof window !== "undefined") {
        playerVars.origin = window.location.origin;
      }

      playerRef.current = new window.YT.Player(hostId, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars,
        events: {
          onReady: (e) => {
            if (cancelled) return;
            fitIframe(e.target);
            setReady(true);
          },
          onError: () => {
            if (!cancelled) setFailed(true);
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

    const failSafe = window.setTimeout(() => {
      if (!cancelled && !ready) {
        /* se a API nunca ficar pronta, ainda assim libertamos o botão via fallback */
      }
    }, 8000);

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
    // ready omitido de propósito — só queremos o timeout no mount/id change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverStartSeconds, hostId, videoId]);

  const toggle = useCallback(() => {
    if (failed) {
      window.open(watchUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const player = playerRef.current;
    if (!player || !ready) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  }, [failed, playing, ready, watchUrl]);

  return (
    <div
      className={`tour-highlight__video${playing ? " is-playing" : ""}${failed ? " is-failed" : ""}`}
      style={
        !ready || failed
          ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      <div className="tour-highlight__player" id={hostId} />

      <button
        type="button"
        className="tour-highlight__control"
        onClick={toggle}
        aria-label={
          failed
            ? `${label} — abrir no YouTube`
            : playing
              ? `${label} — pausar`
              : `${label} — reproduzir`
        }
        disabled={!ready && !failed}
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
