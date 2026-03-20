import cars from "./cars_driven.json";

interface Car {
  make: string;
  model: string;
}

function groupByMake(cars: Car[]): Record<string, Car[]> {
  const grouped: Record<string, Car[]> = {};

  for (const car of cars) {
    if (!grouped[car.make]) grouped[car.make] = [];
    grouped[car.make].push(car);
  }

  return Object.fromEntries(Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)));
}

export function CarsDriven() {
  const grouped = groupByMake(cars as Car[]);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([make, cars]) => (
        <div key={make}>
          <h4 className="mb-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {make}
          </h4>
          <div className="flex flex-wrap gap-2">
            {[...cars]
              .sort((a, b) => a.model.localeCompare(b.model))
              .map(car => (
                <span
                  key={`${car.make}-${car.model}`}
                  className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 py-1 px-3 text-sm text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {car.model}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
