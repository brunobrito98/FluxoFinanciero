import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RenewalEvent {
  clientName: string;
  date: string;
}

interface RenewalCalendarProps {
  events: RenewalEvent[];
  currentMonth?: Date;
}

export default function RenewalCalendar({ events, currentMonth = new Date() }: RenewalCalendarProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.date), day));
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const startDayOfWeek = monthStart.getDay();

  return (
    <Card data-testid="calendar-renewals">
      <CardHeader>
        <CardTitle>
          {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: startDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}
          {daysInMonth.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toString()}
                className={`min-h-20 border rounded-md p-2 ${
                  isToday ? 'border-primary bg-primary/5' : ''
                }`}
                data-testid={`calendar-day-${format(day, 'yyyy-MM-dd')}`}
              >
                <div className="text-sm font-medium mb-1">
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.map((event, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-xs w-full justify-start"
                      data-testid={`badge-event-${event.clientName}`}
                    >
                      {event.clientName}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
