import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../configs/api";
import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Generate = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState(colorSchemes[0].id);
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  // ---------------- Generate Thumbnail ----------------
  const handleGenerate = async () => {
    if (!isLoggedIn) return toast.error("Please login");
    if (!title.trim()) return toast.error("Title is required");

    try {
      const payload = {
        title,
        prompt: additionalDetails,
        style,
        aspect_ratio: aspectRatio,
        color_scheme: colorSchemeId,
        text_overlay: true,
      };

      const { data } = await api.post("/api/thumbnail/generate", payload);

      if (data?.thumbnail?._id) {
        navigate("/generate/" + data.thumbnail._id);
        toast.success("Thumbnail generation started");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---------------- Fetch Thumbnail ----------------
  const fetchThumbnail = async () => {
    try {
      const { data } = await api.get(`/api/user/thumbnails/${id}`);
      const thumb = data?.thumbnail as IThumbnail | undefined;
      if (!thumb) return;

      setThumbnail(thumb);
      setTitle(thumb.title || "");
      setAdditionalDetails(thumb.user_prompt || "");
      setColorSchemeId(thumb.color_scheme!);
      setAspectRatio(thumb.aspect_ratio!);
      setStyle(thumb.style);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (id && isLoggedIn) {
      fetchThumbnail();
    }
  }, [id, isLoggedIn]);

  // Poll ONLY while generating
  useEffect(() => {
    if (!id || !isLoggedIn) return;
    if (!thumbnail?.isGenerating) return;

    const interval = setInterval(fetchThumbnail, 4000);
    return () => clearInterval(interval);
  }, [id, isLoggedIn, thumbnail?.isGenerating]);

  // Reset on route change
  useEffect(() => {
    if (!id) {
      setThumbnail(null);
    }
  }, [pathname, id]);

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* LEFT */}
            <div className={`${id ? "pointer-events-none opacity-70" : ""}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 space-y-6">
                <h2 className="text-xl font-bold text-white">
                  Create Thumbnail
                </h2>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Video title"
                  className="w-full px-4 py-3 rounded-lg bg-black/20"
                />

                <AspectRatioSelector
                  value={aspectRatio}
                  onChange={setAspectRatio}
                />

                <StyleSelector
                  value={style}
                  onChange={setStyle}
                  isOpen={styleDropdownOpen}
                  setIsOpen={setStyleDropdownOpen}
                />

                <ColorSchemeSelector
                  value={colorSchemeId}
                  onChange={setColorSchemeId}
                />

                <textarea
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Additional details"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-black/20"
                />

                {!id && (
                  <button
                    onClick={handleGenerate}
                    className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700"
                  >
                    Generate Thumbnail
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <PreviewPanel thumbnail={thumbnail} aspectRatio={aspectRatio} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
