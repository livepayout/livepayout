"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Video, VideoThumbnailSkeleton } from "./video";
import { User } from "@prisma/client";

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
};


interface LiveVideoPlayerProps {
  user: User;
  classes?: string;
}

export const LiveVideoPlayerThumbnail = ({
  user,
  classes,
}: LiveVideoPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  if (!token || !name || !identity) {
    return <LiveVideoPlayerThumbnailSkeleton />;
  }
  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      className={"w-full"}
    >
      <div className="w-full pb-10">
        <Video
          classes={classes}
          hostName={user.username}
          hostIdentity={user.id}
        />
      </div>
    </LiveKitRoom>
  );
};

export const LiveVideoPlayerThumbnailSkeleton = () => {
  return (
    <div className="w-full pb-10">
      <VideoThumbnailSkeleton />
    </div>
  );
};
