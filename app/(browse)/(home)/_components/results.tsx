import { getStreams } from "@/lib/feed-service";
import { Skeleton } from "@/components/ui/skeleton";

import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Video } from "@/components/stream-player/video";
import { StreamPlayer } from "@/components/stream-player";
import { LiveVideoPlayer } from "@/components/live-video";

export const Results = async () => {
  const data = await getStreams();
  console.log(data);
  const lives = data.filter((st) => st.isLive);
  const user = lives[0];
  return (
    <div className="pb-[64px]">
      {user ? (
        <div className="div w-3/4 mx-auto min-h-max max-h-[40vh] flex items-center justify-center mb-12">
          <LiveVideoPlayer user={user?.user} />
        </div>
      ) : (
        ""
      )}
      <h2
        className={`${
          lives.length > 0 ? "mt-6 md:mt-16" : ""
        } text-lg font-semibold mb-4`}
      >
        Streams we think you&apos;ll like
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
