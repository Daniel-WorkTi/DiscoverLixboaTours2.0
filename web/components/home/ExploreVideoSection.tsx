"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useMessages } from "@/lib/i18n/LocaleProvider";
import {
  loadYouTubeApi,
  type YTPlayer,
} from "@/lib/youtube-iframe-api";

const VIDEO_ID = "O1dgtYkfQZU";
const START_AT = 6;
/** Pedido nativo grande → YouTube entrega HD/4K; o CSS faz o cover. */
const PLAYER_W = 3840;
const PLAYER_H = 2160;

function forceHighQuality(player: YTPlayer) {
  try {
    player.setPlaybackQualityRange?.("hd1080", "highres");
    player.setPlaybackQuality?.("highres");
  } catch {
    try {
      player.setPlaybackQuality?.("hd1080");
    } catch {
      /* ignore */
    }
  }
}

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

export function ExploreVideoSection() {
  const m = useMessages();
  const v = m.home.exploreVideo;
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const qualityTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reactId = useId().replace(/:/g, "");
  const playerId = `explore-yt-${reactId}`;

  useEffect(() => {
    if (!playing) return;

    let cancelled = false;

    const boot = async () => {
      await loadYouTubeApi();
      if (cancelled || !window.YT?.Player) return;
      if (!document.getElementById(playerId)) return;

      playerRef.current = new window.YT.Player(playerId, {
        videoId: VIDEO_ID,
        width: PLAYER_W,
        height: PLAYER_H,
        playerVars: {
          autoplay: 1,
          mute: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          cc_load_policy: 0,
          autohide: 1,
          start: START_AT,
          loop: 1,
          playlist: VIDEO_ID,
          vq: "hd2160",
        },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            fitIframe(e.target);
            forceHighQuality(e.target);
            e.target.unMute();
            e.target.seekTo(START_AT, true);
            e.target.playVideo();
            qualityTimer.current = setInterval(() => {
              fitIframe(e.target);
              forceHighQuality(e.target);
            }, 1500);
          },
          onStateChange: (e) => {
            if (cancelled || !window.YT) return;
            fitIframe(e.target);
            if (e.data === window.YT.PlayerState.PLAYING) {
              forceHighQuality(e.target);
            }
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(START_AT, true);
              e.target.playVideo();
            }
          },
        },
      });
    };

    void boot();

    return () => {
      cancelled = true;
      if (qualityTimer.current) clearInterval(qualityTimer.current);
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [playing, playerId]);

  return (
    <section
      className={`explore-video-section${playing ? " is-playing" : ""}`}
      aria-label={v.title}
    >
      <div className="explore-video-media" aria-hidden={!playing}>
        <Image
          src="/assets/images/bgvideo.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className={`explore-video-poster${playing ? " is-hidden" : ""}`}
        />

        {playing ? (
          <div className="explore-video-shell">
            <div className="explore-video-mount">
              <div id={playerId} />
            </div>
          </div>
        ) : null}

        <div className="explore-video-shade" />
      </div>

      <div className="explore-video-container">
        <button
          type="button"
          className="explore-video-play"
          aria-label={v.playLabel}
          aria-pressed={playing}
          onClick={() => setPlaying(true)}
          disabled={playing}
        >
          <span className="explore-video-play__icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 6.8v10.4L18 12 8.5 6.8z" />
            </svg>
          </span>
        </button>
        <div className="explore-video-copy">
          <p className="explore-video-title">{v.title}</p>
          <p className="explore-video-desc">{v.description}</p>
        </div>
      </div>
    </section>
  );
}
