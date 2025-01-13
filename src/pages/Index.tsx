import { PineappleTracker } from "@/components/PineappleTracker";
import { PizzaPetsDisplay } from "@/components/PizzaPetsDisplay";

const Index = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <PineappleTracker />
      <PizzaPetsDisplay />
    </div>
  );
};

export default Index;