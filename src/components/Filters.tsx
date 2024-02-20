import { consoles } from '@/lib/consoles';
import { ratings, useSearch } from '@/lib/orama-context';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { buttonVariants } from '@/components/ui/button';
import { Rating } from './Rating';

export function Filters() {
  const { consolesForm, value, onSearchText, results, setRating, rating, setConsolesForm } =
    useSearch();
  return (
    <div className="w-[300] min-w-[300px]">
      <Input
        type="search"
        className="mt-8"
        placeholder="Search for a game"
        value={value}
        onChange={(e) => onSearchText(e.currentTarget.value)}
      />
      {results?.count && <span className="mt-4 block"> Results: {results.count}</span>}
      <Accordion type="multiple" defaultValue={['consoles']}>
        <AccordionItem value="consoles">
          <AccordionTrigger>Consoles</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {consoles.map((console) => (
                <div className="flex items-center space-x-2" key={console.id}>
                  <Checkbox
                    id="terms"
                    checked={consolesForm[console.id]}
                    onCheckedChange={(value) =>
                      setConsolesForm((c: { name: string; id: string }) => ({
                        ...c,
                        [console.id]: value,
                      }))
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {console.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger>Min Rating</AccordionTrigger>
          <AccordionContent>
            <div>
              {ratings.map((r) => (
                <div key={r}>
                  <Button
                    className={
                      'mt-0 m-2 bg-transparent' +
                      buttonVariants({ variant: rating == r ? 'outline' : null })
                    }
                    onClick={() => setRating(r)}
                  >
                    <Rating value={r} noText />
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
