import React from "react";
import type { AspectRatio, IThumbnail } from "../assets/assets";
import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses: Record<AspectRatio, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank");
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div
        className={`relative overflow-hidden rounded-xl bg-black/40 
        ${aspectClasses[aspectRatio]}`}
      >
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25">
            <Loader2Icon className="size-8 animate-spin text-zinc-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-200">
                AI is creating your thumbnail…
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                This may take 10–20 seconds
              </p>
            </div>
          </div>
        )}

        {/* Image preview */}
        {!isLoading && thumbnail?.image_url && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title}
              className="h-full w-full object-cover"
            />

            <button
              onClick={onDownload}
              type="button"
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md
              bg-black/60 px-3 py-1.5 text-xs text-white
              opacity-0 transition group-hover:opacity-100"
            >
              <DownloadIcon className="size-4" />
              Download
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/25">
            <ImageIcon className="size-10 text-white/50" />
            <div className="px-4 text-center">
              <p className="font-medium text-zinc-200">
                Generate your first thumbnail
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Fill out the form and click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
