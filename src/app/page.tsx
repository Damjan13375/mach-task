import { fetchHomepageContent } from "@/lib/models/homePage";
import Image from "next/image";

export default async function Home() {
  const data = await fetchHomepageContent();
  if (!data || !data.homePageCollection?.items.length) {
    return <p>Error: Homepage content not found.</p>;
  }

  const homepage = data.homePageCollection.items[0];
  return (
    <main className="relative">
      <div className="absolute inset-0 z-20 bg-[rgba(0,0,0,0.5)] text-white flex flex-col justify-center px-24 h-[calc(100vh-56px)]">
        <h1 className="font-bold text-4xl">{homepage.title}</h1>
        <p className="font-semibold text-lg mt-4">{homepage.description}</p>
      </div>
<div className="h-[calc(100vh-56px)] absolute inset-0 z-10  w-full">
      <Image
        src={homepage.bannerUrl}
        fill
        alt="Banner"
        className="  object-cover"
      />
      </div>
    </main>
  );
}
