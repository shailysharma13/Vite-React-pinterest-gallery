import { useState } from "react";

export default function ImageCard({ photo, onClick }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="mb-4 break-inside-avoid" role="button" tabIndex={0} onClick={() => onClick(photo)} onKeyDown={(e) => e.key === "Enter" && onClick(photo)}>
      <img
        src={photo.urls.small}
        alt={photo.alt_description || "Unsplash image"}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto rounded-md shadow-sm transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      <div className="mt-2 text-xs text-gray-600">
        <div className="font-medium text-sm">{photo.user?.name}</div>
      </div>
    </div>
  );
}