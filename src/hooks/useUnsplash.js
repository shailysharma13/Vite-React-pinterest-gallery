import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.warn("VITE_UNSPLASH_ACCESS_KEY is not set! Add it to .env");
}

export const fetchPhotosPage = async ({ pageParam = 1 }) => {
  const per_page = 20;
  const url = `https://api.unsplash.com/photos?page=${pageParam}&per_page=${per_page}`;
  try {
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });
    return { photos: resp.data, nextPage: pageParam + 1, resultsOnPage: resp.data.length };
  } catch (err) {
    const message =
      err?.response?.data?.errors?.[0] ||
      err?.response?.data?.error ||
      err?.response?.statusText ||
      err.message;
    throw new Error(message || "Failed to fetch photos from Unsplash");
  }
};

