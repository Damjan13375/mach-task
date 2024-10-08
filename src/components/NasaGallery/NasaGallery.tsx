"use client";
import { fetchNasaImages, NasaImage } from "@/lib/nasa";
import { getLastWeekRange } from "@/utils/dates";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const NasaGallery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const weeksBack = searchParams.get("weeksBack") || "0";
  const { startDate, endDate } = getLastWeekRange(Number(weeksBack));

  const [images, setImages] = useState<NasaImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        setIsLoading(true);
        const fetchedImages = await fetchNasaImages(startDate, endDate);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching NASA images:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, [startDate, endDate]);

  const handlePagination = (direction: "prev" | "next") => {
    const newWeeksBack =
      direction === "prev"
        ? Number(weeksBack) + 1
        : Math.max(0, Number(weeksBack) - 1);
    router.push(`/nasa?weeksBack=${newWeeksBack}`);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center text-2xl">
        Loading...
      </div>
    );

  return (
    <main className="px-4 md:px-24">
      <h1 className="font-bold text-lg my-12">
        NASA Gallery for {startDate} to {endDate}
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {images.slice(0, 4).map((image) => (
          <div key={image.url} className="relative h-[350px] w-full">
            <Link href={`/nasa/${image.date}`} className="block h-full w-full">
              <Image
                src={image.url}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 100vw, 
                       (max-width: 1024px) 50vw, 
                       25vw"
                className="object-cover rounded-lg"
                style={{ borderRadius: '0.5rem' }}
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black text-white p-4 rounded-b-lg w-full">
                <p className="text-sm">{image.title} {image.date}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        {images.slice(4, 7).map((image) => (
          <div key={image.url} className="relative h-[350px] w-full">
            <Link href={`/nasa/${image.date}`} className="block h-full w-full">
              <Image
                src={image.url}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 100vw, 
                       (max-width: 1024px) 33vw, 
                       33vw"
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black text-white p-4 rounded-b-lg w-full">
                <p className="text-sm">{image.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={() => handlePagination("prev")}
          className="px-6 py-4 border rounded-md font-bold bg-gray-800 text-white hover:bg-gray-700"
        >
          Previous Week
        </button>
        {Number(weeksBack) > 0 && (
          <button
            onClick={() => handlePagination("next")}
            className="px-6 py-4 border rounded-md font-bold bg-gray-800 text-white hover:bg-gray-700"
          >
            Next Week
          </button>
        )}
      </div>
    </main>
  );
};
