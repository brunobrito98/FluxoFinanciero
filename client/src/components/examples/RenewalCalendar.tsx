import RenewalCalendar from '../RenewalCalendar';

export default function RenewalCalendarExample() {
  const mockEvents = [
    { clientName: 'João Silva', date: '2025-11-15' },
    { clientName: 'Maria Santos', date: '2025-11-20' },
    { clientName: 'Pedro Costa', date: '2025-11-20' },
    { clientName: 'Ana Oliveira', date: '2025-11-25' },
  ];

  return (
    <div className="p-6">
      <RenewalCalendar events={mockEvents} currentMonth={new Date(2025, 10, 1)} />
    </div>
  );
}
