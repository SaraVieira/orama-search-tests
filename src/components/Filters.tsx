import { useSearch } from '@/lib/orama-context';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ConsoleFilter } from './ConsolesFilter';
import { RatingsFilter } from './RatingsFilter';

export function Filters() {
  const { onSearchText, results } = useSearch();
  return (
    <div className="w-[300] min-w-[300px]">
      <Input
        type="search"
        placeholder="Search for a game"
        onChange={(e) => onSearchText(e.currentTarget.value)}
      />
      <span className="mt-4 block"> Results: {results?.count && results.count}</span>
      <Accordion type="multiple" defaultValue={['consoles']}>
        <AccordionItem value="consoles">
          <AccordionTrigger>Consoles</AccordionTrigger>
          <AccordionContent>
            <ConsoleFilter />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger>Min Rating</AccordionTrigger>
          <AccordionContent>
            <RatingsFilter />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
