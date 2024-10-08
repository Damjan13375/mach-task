import AboutNASA from "@/components/AboutNasa/AboutNasa";
import { fetchAboutPage } from "@/lib/models/aboutPage";
import Image from "next/image";

export default async function About() {
  const data = await fetchAboutPage();
  if (!data || !data.aboutCollection?.items.length) {
    return <p>Error: About page content not found.</p>;
  }

  const aboutPage = data.aboutCollection.items[0];
  return (
    <main className="relative">
      <div className="relative h-[calc(100vh-56px)]">
        <div className="absolute inset-0 z-20 bg-[rgba(0,0,0,0.5)] text-white flex flex-col justify-center px-24">
          <h1 className="font-bold text-4xl">{aboutPage.title}</h1>
          <p className="font-semibold text-lg mt-4">{aboutPage.desc}</p>
        </div>
        <div className="absolute inset-0 z-10 h-full w-ful">
          <Image
            src={aboutPage.banner}
            alt="Banner"
            fill
            className=" object-cover"
          />
        </div>
      </div>

      <div className="relative z-30 mt-16 px-4 md:px-24">
        <AboutNASA data={data} />
      </div>
    </main>
  );
}
