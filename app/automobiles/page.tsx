import { CarsDriven } from "@/components/cars-driven";
import cars from "@/components/cars-driven/cars_driven.json";
import Link from "next/link";

export const metadata = {
  title: "Automobiles",
  description:
    "I'm an automobile enthusiast. I love to read about the latest trends in the automotive industry, enjoy catching the new launches and always up for a drive as long as I'm behind the wheels."
};

export default function Page() {
  const totalBrands = new Set(cars.map(c => c.make)).size;
  const totalCars = cars.length;

  return (
    <section>
      <div className="mb-8">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Automobiles</h1>
        <p>
          I'm an automobile enthusiast. I love to read about the latest trends in the automotive
          industry, enjoy catching the new launches and always up for a drive as long as I'm behind
          the wheels. I would own a{" "}
          <Link
            href="https://www.google.com/search?q=google+mini+cooper+s"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <i className="underline">Mini Cooper S</i>
          </Link>{" "}
          before I leave this world.
        </p>
      </div>
      <div className="mb-8">
        <h3 className="mb-8 text-xl font-semibold tracking-tighter">Cars I've Driven</h3>
        <p>
          So far, I've driven {totalCars} cars across {totalBrands} different brands —
        </p>
      </div>
      <CarsDriven />
    </section>
  );
}
