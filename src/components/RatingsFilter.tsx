import { ratings, useSearch } from '@/lib/orama-context';
import { Button, buttonVariants } from './ui/button';
import { Rating } from './Rating';
import { cn } from '@/lib/utils';

export const RatingsFilter = () => {
  const { setRating, rating } = useSearch();
  return ratings.map((r) => (
    <div key={r}>
      <Button
        className={cn(
          'mt-0 m-2 bg-transparent',
          buttonVariants({ variant: rating == r ? 'outline' : null })
        )}
        onClick={() => setRating(r)}
      >
        <Rating value={r} noText />
      </Button>
    </div>
  ));
};
