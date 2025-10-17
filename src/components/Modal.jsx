import React, { useEffect, useRef } from "react";

export default function Modal({ photo, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!photo) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [photo, onClose]);

  if (!photo) return null;

  const onBackdropClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      onClose();
    }
  };

return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      onMouseDown={onBackdropClick}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div
        ref={containerRef}
        className="
          relative z-10 
          bg-white rounded-xl shadow-2xl overflow-hidden 
          w-[92%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[40%]
          max-h-[90vh] flex flex-col
          transition-all duration-300
        "
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute right-3 top-3 
            bg-white/90 hover:bg-white 
            rounded-full p-2 shadow 
            text-gray-700 hover:text-black transition
          "
        >
          ✕
        </button>

        <div className="flex justify-center items-center bg-gray-100">
          <img
            src={photo.urls.regular}
            alt={photo.alt_description || 'Image'}
            className="w-full h-auto max-h-[55vh] object-contain"
          />
        </div>

        <div className="p-4 overflow-y-auto">
          {photo.alt_description && (
            <p className="text-gray-800 text-sm sm:text-base mb-1">
              {photo.alt_description}
            </p>
          )}
          <p className="text-xs sm:text-sm text-gray-500">
            Photo by{" "}
            <span className="font-medium">{photo.user?.name}</span> on{" "}
            <a
              href={photo.links.html}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}