import { PineappleTracker } from "@/components/PineappleTracker";
import { PizzaPetsDisplay } from "@/components/PizzaPetsDisplay";
import { DebugPanel } from "@/components/DebugPanel";

const Index = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <PineappleTracker />
      <PizzaPetsDisplay />
      <DebugPanel />
    </div>
  );
};

export default Index;