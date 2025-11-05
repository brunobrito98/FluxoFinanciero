import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  testId?: string;
}

export default function MetricCard({ title, value, icon: Icon, trend, testId }: MetricCardProps) {
  return (
    <Card data-testid={testId}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="font-mono text-2xl font-semibold" data-testid={`${testId}-value`}>
          {value}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1" data-testid={`${testId}-trend`}>
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
