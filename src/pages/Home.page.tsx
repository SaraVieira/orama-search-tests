import { GameCard } from '@/components/GameCard';
import { Filters } from '@/components/Filters';
import { useSearch } from '@/lib/orama-context';
import type { Game } from '@/lib/types';
import { Card, CardHeader } from '@/components/ui/card';

export function HomePage() {
  const { results } = useSearch();
  return (
    <div className="container mt-16">
      <div className="flex gap-4 items-start">
        <Filters />
        {results ? (
          results?.hits.length ? (
            <div className="grid gap-4 grid-cols-3">
              {results?.hits.map((game: { document: Game; id: string }) => (
                <GameCard key={game.id} {...game.document} />
              ))}
            </div>
          ) : (
            <Card className="w-auto h-auto p-4 mx-auto mt-24">
              <CardHeader>no games found</CardHeader>
            </Card>
          )
        ) : (
          <div className="flex items-center justify-center w-full h-full mt-60">
            <svg className="w-8 h-8 fill-primary" viewBox="0 0 24 24">
              <ellipse cx="12" cy="5" rx="4" ry="4">
                <animate
                  id="spinner_jbYs"
                  begin="0;spinner_JZdr.end"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.375s"
                  values="5;20"
                  keySplines=".33,0,.66,.33"
                  fill="freeze"
                />
                <animate
                  begin="spinner_jbYs.end"
                  attributeName="rx"
                  calcMode="spline"
                  dur="0.05s"
                  values="4;4.8;4"
                  keySplines=".33,0,.66,.33;.33,.66,.66,1"
                />
                <animate
                  begin="spinner_jbYs.end"
                  attributeName="ry"
                  calcMode="spline"
                  dur="0.05s"
                  values="4;3;4"
                  keySplines=".33,0,.66,.33;.33,.66,.66,1"
                />
                <animate
                  id="spinner_ADF4"
                  begin="spinner_jbYs.end"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.025s"
                  values="20;20.5"
                  keySplines=".33,0,.66,.33"
                />
                <animate
                  id="spinner_JZdr"
                  begin="spinner_ADF4.end"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.4s"
                  values="20.5;5"
                  keySplines=".33,.66,.66,1"
                />
              </ellipse>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
