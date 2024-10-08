import { NasaGallery } from "@/components/NasaGallery/NasaGallery";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <NasaGallery />
    </Suspense>
  );
}
