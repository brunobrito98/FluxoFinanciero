import RevenueChart from '../RevenueChart';

export default function RevenueChartExample() {
  const mockData = [
    { month: 'Jan', value: 12450 },
    { month: 'Fev', value: 13200 },
    { month: 'Mar', value: 14100 },
    { month: 'Abr', value: 14100 },
    { month: 'Mai', value: 15300 },
    { month: 'Jun', value: 16200 },
    { month: 'Jul', value: 16200 },
    { month: 'Ago', value: 17100 },
    { month: 'Set', value: 18000 },
    { month: 'Out', value: 18000 },
    { month: 'Nov', value: 19500 },
    { month: 'Dez', value: 20400 },
  ];

  return (
    <div className="p-6">
      <RevenueChart data={mockData} />
    </div>
  );
}
