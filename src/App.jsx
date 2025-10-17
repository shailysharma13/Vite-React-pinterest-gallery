import Gallery from "./components/Gallery";

export default function App() {
  return (
    <div className="min-h-screen bg-brandGray text-Gray">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Pinterest-style Gallery</h1>
        </div>
      </header>
      <main className="max-w-[1520px] mx-auto px-4 py-6">    
        <Gallery />
      </main>
    </div>
  );
}