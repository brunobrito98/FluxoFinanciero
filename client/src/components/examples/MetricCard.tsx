import MetricCard from '../MetricCard';
import { DollarSign } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="p-6">
      <MetricCard
        title="Receita Mensal Recorrente"
        value="R$ 12.450,00"
        icon={DollarSign}
        trend="+12% em relação ao mês anterior"
        testId="metric-mrr"
      />
    </div>
  );
}
