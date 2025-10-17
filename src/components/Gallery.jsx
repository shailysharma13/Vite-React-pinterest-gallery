import React, { useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPhotosPage } from "../hooks/useUnsplash";
import ImageCard from "./ImageCard";
import Spinner from "./Spinner";

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [visiblePage, setVisiblePage] = useState(null); 
  const sentinelRef = useRef(null);

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    status,
    refetch,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotosPage,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || !lastPage.photos || lastPage.photos.length < 20)
        return undefined;
      return pages.length + 1;
    },
    retry: 1,
  });

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      { rootMargin: "400px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const totalPages = data?.pages?.length || 0;

  const flattened = data ? data.pages.flatMap((p) => p.photos) : [];

  const photosToRender =
    visiblePage && visiblePage >= 1 && visiblePage <= totalPages
      ? data.pages[visiblePage - 1].photos 
      : flattened.length > 0
      ? flattened 
      : data?.pages?.[0]?.photos || []; 

  const handlePrev = () => {
    if (!visiblePage) setVisiblePage(totalPages || 1);
    else if (visiblePage > 1) setVisiblePage((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async () => {
    if (!visiblePage) setVisiblePage(1);
    else if (visiblePage < totalPages) setVisiblePage((p) => p + 1);
    else if (hasNextPage) {
      await fetchNextPage();
      setVisiblePage(totalPages + 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "loading")
    return (
      <div className="py-16 flex justify-center">
        <Spinner />
      </div>
    );

  if (status === "error")
    return (
      <div className="p-4 text-center">
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded inline-block">
          Error loading images: {error?.message || "Unknown error"}
        </div>
        <div className="mt-4">
          <button
            onClick={() => refetch()}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4">
      <div className="mb-6 mt-6 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Pinterest-Style Gallery
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setVisiblePage(null)}
            className={`px-4 py-2 text-sm rounded ${
              visiblePage === null
                ? "bg-gray-800 text-white"
                : "bg-gray-100 border"
            }`}
          >
            Show All
          </button>

          <button
            onClick={handlePrev}
            disabled={visiblePage === 1 || totalPages === 0}
            className="px-4 py-2 text-sm bg-white border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <div className="px-4 py-2 text-sm border rounded bg-white font-medium text-gray-700">
            Page {(visiblePage ?? totalPages) || 1}
          </div>

          <button
            onClick={handleNext}
            disabled={!hasNextPage && visiblePage === totalPages}
            className="px-4 py-2 text-sm bg-white border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
{        console.log("Unsplash key:", import.meta.env.VITE_UNSPLASH_ACCESS_KEY)
}
        {photosToRender.map((photo) => (
          <ImageCard key={photo.id} photo={photo} onClick={setSelected} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-8"></div>

      {isFetchingNextPage && (
        <div className="mt-6 flex justify-center">
          <Spinner />
        </div>
      )}

      {!hasNextPage && !isFetchingNextPage && (
        <div className="text-center text-sm text-gray-500 py-6">
          No more images.
        </div>
      )}

    </section>
  );
}