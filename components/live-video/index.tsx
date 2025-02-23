"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Video, VideoSkeleton } from "./video";

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
};

type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  imageUrl: string;
};

interface LiveVideoPlayerProps {
  user: CustomUser;
}

export const LiveVideoPlayer = ({ user }: LiveVideoPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  if (!token || !name || !identity) {
    return <LiveVideoPlayerSkeleton />;
  }
  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      className={"w-full"}
    >
      <div className="w-full pb-10">
        <Video hostName={user.username} hostIdentity={user.id} />
      </div>
    </LiveKitRoom>
  );
};

export const LiveVideoPlayerSkeleton = () => {
  return (
    <div className="w-full pb-10">
      <VideoSkeleton />
    </div>
  );
};
