import { useState } from "react";
import { useParams } from "react-router-dom";
import type { IThumbnail } from "../assets/assets";
import SoftBackdrop from "../components/SoftBackdrop";
const Generate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, SetThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8"></main>
      </div>
    </>
  );
};

export default Generate;
