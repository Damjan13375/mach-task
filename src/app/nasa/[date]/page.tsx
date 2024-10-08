import { fetchNasaImage } from "@/lib/nasa";
import Image from "next/image";

export default async function NasaImageDetails({ params }: { params: { date: string } }) {
  // Ensure 'date' is provided
  if (!params?.date) {
    return <p>Error: Date not provided!</p>;
  }

  // const image = await fetchNasaImage(params.date);  // Fetch based on the date
  if (!true) {
    return <p>Error: No image found for this date!</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-96">
          {/* <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-cover w-full h-full"
            style={{ maxHeight: '100vh' }}
          />
        </div>
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{image.title}</h1>
          <p className="text-gray-700 mb-4">{image.explanation}</p>
          <p className="text-gray-500 text-sm">{image.date}</p> */}
          123
        </div>
      </div>
    </div>
  );
}
