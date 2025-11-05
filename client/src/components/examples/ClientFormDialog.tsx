import { useState } from 'react';
import ClientFormDialog from '../ClientFormDialog';
import { Button } from '@/components/ui/button';

export default function ClientFormDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)} data-testid="button-open-dialog">
        Abrir Formulário
      </Button>
      <ClientFormDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(data) => {
          console.log('Form submitted:', data);
          setOpen(false);
        }}
      />
    </div>
  );
}
