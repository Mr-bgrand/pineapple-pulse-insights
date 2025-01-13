import { useQuery } from "@tanstack/react-query";
import { fetchPizzaPets } from "@/lib/pizza-pets-utils";
import { PizzaPetCard } from "./PizzaPetCard";

export function PizzaPetsDisplay() {
  const { data: pets = [], isLoading, error } = useQuery({
    queryKey: ["pizzaPets"],
    queryFn: fetchPizzaPets,
    refetchInterval: 60000, // Refetch every minute
  });

  console.log("Pizza Pets Display - Component Render");
  console.log("Pizza Pets Display - Raw Data:", JSON.stringify(pets, null, 2));
  console.log("Pizza Pets Display - Loading State:", isLoading);
  console.log("Pizza Pets Display - Error State:", error);

  if (isLoading) {
    console.log("Pizza Pets Display - Showing loading state");
    return (
      <div className="space-y-4">
        <div className="h-48 bg-dashboard-card animate-pulse rounded-lg" />
        <div className="h-48 bg-dashboard-card animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching Pizza Pets:", error);
    return <div>Error loading Pizza Pets</div>;
  }

  console.log("Pizza Pets Display - Rendering pets list, count:", pets.length);
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">My Pizza Pets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pets.map((pet, index) => {
          console.log(`Rendering pet ${index}:`, pet);
          return <PizzaPetCard key={`${pet.meta.inscriptionId}-${index}`} pet={pet} />;
        })}
      </div>
    </div>
  );
}