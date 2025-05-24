"use client";

import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";

import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideoThumbnail } from "./live-video";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
  classes?: string;
}

export const Video = ({ classes, hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = (
      <LiveVideoThumbnail classes={classes} participant={participant} />
    );
  }

  return <div className="aspect-video group relative">{content}</div>;
};

export const VideoThumbnailSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="w-1/2 rounded-sm" />
    </div>
  );
};
