import { useSearch } from '@/lib/orama-context';
import { Checkbox } from './ui/checkbox';
import { consoles } from '@/lib/consoles';
import { ConsoleSelected } from '@/lib/types';
import { Button } from './ui/button';

export const ConsoleFilter = () => {
  const { consolesSelected, setConsolesSelected } = useSearch();

  const bulkSelect = (type: 'all' | 'none') => {
    setConsolesSelected((consolesS) =>
      Object.keys(consolesS).reduce((acc: ConsoleSelected, curr: keyof ConsoleSelected) => {
        acc[curr] = type === 'all' ? true : false;
        return acc;
      }, {})
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end gap-2">
        <Button size={'sm'} variant={'ghost'} onClick={() => bulkSelect('all')}>
          All
        </Button>
        <Button size={'sm'} variant={'ghost'} onClick={() => bulkSelect('none')}>
          None
        </Button>
      </div>
      {consoles.map((console) => (
        <div className="flex items-center space-x-2" key={console.id}>
          <Checkbox
            id={console.id}
            checked={consolesSelected[console.id]}
            onCheckedChange={(value) =>
              setConsolesSelected((c: ConsoleSelected) => ({
                ...c,
                [console.id]: !!value,
              }))
            }
          />
          <label
            htmlFor={console.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {console.name}
          </label>
        </div>
      ))}
    </div>
  );
};
