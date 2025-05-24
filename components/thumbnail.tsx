import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar } from "@/components/user-avatar";
import { LiveVideoPlayer } from "./live-video";
import { User } from "@prisma/client";

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
  user: User;
}

export const Thumbnail = ({
  src,
  fallback,
  isLive,
  username,
  user
}: ThumbnailProps) => {
  let content;

  if (!src) {
    content = (
      <div className=" flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform rounded-md">
        <LiveVideoPlayer
          user={user}
          classes="w-1/2 object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
        />
        {/* <Image
          src={fallback}
          width={5000}
          height={5000}
          alt="Thumbnail"
          className="w-1/2 object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
        /> */}
        {/* <UserAvatar
          size="lg"
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        /> */}
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    );
  }
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && (
        <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
