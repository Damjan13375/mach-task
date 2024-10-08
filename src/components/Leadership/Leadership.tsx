import Image from "next/image";
import { Leader } from "./Leadership.types";

export const LeadershipSection = ({ leaders }: { leaders: Leader[] }) => (
  <section className="mt-12 px-4 md:px-8">
    <h3 className="text-2xl font-bold mb-6">Leadership Team</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {leaders.map((leader, index) => (
        <div
          key={index}
          className="border border-gray-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <div className="relative w-full h-[400px] mb-4">
            <Image
              src={leader.image}
              alt={leader.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h4 className="text-lg font-semibold mb-2">{leader.name}</h4>
          <p className="text-gray-600">{leader.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
