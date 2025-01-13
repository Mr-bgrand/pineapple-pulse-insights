import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PizzaPet } from "@/lib/pizza-pets-utils";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Clock, Heart, Activity, ExternalLink } from "lucide-react";

interface PizzaPetCardProps {
  pet: PizzaPet;
}

export function PizzaPetCard({ pet }: PizzaPetCardProps) {
  const ordiscanUrl = `https://ordiscan.com/inscription/${pet.meta.inscriptionId}`;

  return (
    <Card className="bg-dashboard-card hover:bg-dashboard-card/90 transition-colors">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <a 
            href={ordiscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-dashboard-accent flex items-center gap-2"
          >
            {pet.meta.name}
            <ExternalLink className="w-4 h-4" />
          </a>
          <Badge variant="secondary">{pet.stats.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="aspect-square rounded-lg overflow-hidden">
          <img 
            src={pet.meta.imageUrl} 
            alt={pet.meta.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex items-center space-x-2 hover:text-dashboard-accent">
                <Clock className="w-4 h-4" />
                <span>{pet.stats.diesIn}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              Time until pet dies: {pet.stats.diesIn}
            </HoverCardContent>
          </HoverCard>

          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>{pet.stats.healthRate}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>{pet.stats.poopRate}</span>
          </div>

          <Badge variant="outline">{pet.stats.stage}</Badge>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm border-t border-dashboard-card/20 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Evolution Rate:</span>
            <span>{pet.stats.evolutionRate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Weakness:</span>
            <span>{pet.stats.weakness}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Poop Incoming:</span>
            <span>{pet.stats.poopIncoming}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}