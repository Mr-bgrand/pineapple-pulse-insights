import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PizzaPet } from "@/lib/pizza-pets-utils";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Clock, Heart, Poop } from "lucide-react";

interface PizzaPetCardProps {
  pet: PizzaPet;
}

export function PizzaPetCard({ pet }: PizzaPetCardProps) {
  return (
    <Card className="bg-dashboard-card hover:bg-dashboard-card/90 transition-colors">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>{pet.meta.name}</span>
          <Badge variant="secondary">{pet.stats.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="aspect-square rounded-lg overflow-hidden mb-4">
          <img 
            src={pet.meta.imageUrl} 
            alt={pet.meta.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{pet.stats.diesIn}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              Dies in {pet.stats.diesIn}
            </HoverCardContent>
          </HoverCard>

          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>{pet.stats.healthRate}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Poop className="w-4 h-4" />
            <span>{pet.stats.poopRate}</span>
          </div>

          <Badge variant="outline">{pet.stats.stage}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}