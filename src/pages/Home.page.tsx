import { Game as GameCard } from '@/components/Card';
import { Filters } from '@/components/Filters';
import { useSearch } from '@/lib/orama-context';
import type { Game } from '@/lib/types';

export function HomePage() {
  const { results, isLoading } = useSearch();

  return (
    <div className="container mt-8">
      <div>
        <div className="flex gap-4">
          <Filters />
          {!isLoading ? (
            <div className="grid gap-4 grid-cols-3">
              {results?.hits.length
                ? results?.hits.map((game: { document: Game; id: string }) => (
                    <GameCard key={game.id} {...game.document} />
                  ))
                : 'no games found'}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">loading</div>
          )}
        </div>
      </div>
    </div>
  );
}
