import type { AspectRatio, IThumbnail } from "../assets/assets";
import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";

const getHeight = (ratio: AspectRatio) => {
  if (ratio === "16:9") return "56.25%";
  if (ratio === "1:1") return "100%";
  return "177.77%"; // 9:16
};

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading?: boolean;
  aspectRatio: AspectRatio;
}) => {
  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative w-full rounded-xl bg-black/40 overflow-hidden">
        {/* Aspect-ratio replacement */}
        <div style={{ paddingTop: getHeight(aspectRatio) }} />

        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
            <Loader2Icon className="animate-spin text-white size-8" />
            <p className="text-sm text-white mt-2">Generating thumbnail…</p>
          </div>
        )}

        {/* Image */}
        {!isLoading && thumbnail?.image_url && (
          <img
            src={thumbnail.image_url}
            alt={thumbnail.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Download */}
        {!isLoading && thumbnail?.image_url && (
          <button
            onClick={onDownload}
            className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-md text-white text-xs"
          >
            <DownloadIcon className="size-4" />
            Download
          </button>
        )}

        {/* Empty */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
            <ImageIcon className="size-10" />
            <p className="text-sm mt-2">Generate a thumbnail</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
