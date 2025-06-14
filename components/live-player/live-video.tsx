"use client";

import { useRef, useState, useEffect } from "react";
import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import { useEventListener } from "usehooks-ts";

interface LiveVideoProps {
  participant: Participant;
  classes?: string;
}

import { useChat } from "@livekit/components-react";
import { toast } from "sonner";
export const LiveVideoThumbnail = ({
  participant,
  classes,
}: LiveVideoProps) => {
  const { send } = useChat();
  const onSubmit = (value: string) => {
    if (!send) return;
    send(value);
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Ensure muted is set before assigning stream

      // Optional: Prevent autoplay
      videoRef.current.pause();
      videoRef.current.autoplay = false
    }
  }, []);
  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video
        muted
        ref={videoRef}
        width="100%"
        className={classes}
      />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4"></div>
      </div>
    </div>
  );
};
