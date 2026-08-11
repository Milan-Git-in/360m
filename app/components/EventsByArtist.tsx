import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventsByArtist() {
  const artists = [
    { name: "Aishwarya M...", role: "Singer · Songwri...", img: "https://images.unsplash.com/photo-1516280440502-60292b027d78?q=80&w=200&auto=format&fit=crop" },
    { name: "Aghori Muzik", role: "Singer · Songwri...", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop" },
    { name: "Jigardan Gad...", role: "Singer · Songwri...", img: "https://images.unsplash.com/photo-1520626338573-049eef3ec04d?q=80&w=200&auto=format&fit=crop" },
    { name: "Hariom Gadh...", role: "Singer", img: "https://images.unsplash.com/photo-1493225457124-b0404097f4fa?q=80&w=200&auto=format&fit=crop" },
  ];

  return (
    <section className="px-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-playfair text-xl font-bold text-on-surface">Events by Artist</h2>
          <p className="text-sm text-on-surface-variant">Discover events by your favourite artists</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-4">
        {artists.map((artist, idx) => (
          <div key={idx} className="flex flex-col items-center flex-shrink-0 snap-start w-28">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-variant mb-3 border border-outline-variant">
              <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-poppins text-sm font-bold text-on-surface text-center line-clamp-1">{artist.name}</h3>
            <p className="text-[10px] text-on-surface-variant text-center mt-1">{artist.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
