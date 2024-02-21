import { consoles } from '@/lib/consoles';
import type { Game } from '@/lib/types';
import { Card, CardContent, CardHeader } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Rating } from './Rating';

export function GameCard(props: Game) {
  const {
    cover,
    name,
    summary,
    total_rating,
    genres,
    console,
    developer,
    publisher,
    first_release_date,
    url,
  } = props;

  return (
    <a href={url} target="_blank">
      <Card className="rounded p-0">
        <CardHeader>
          <AspectRatio ratio={1 / 1} className="overflow-hidden">
            <img src={cover} alt={name} className="object-cover" />
          </AspectRatio>
        </CardHeader>

        <CardContent className="mt-4">
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-lg">{name}</span>
            <Rating value={(total_rating / 100) * 5} />
            <span className="font-semibold">{consoles.find((c) => c.id === console)?.name}</span>
          </div>
        </CardContent>
        <CardContent>
          <div className="items-center ">
            {genres?.length
              ? genres.map((genre, i) => (
                  <Badge className="m-1" variant="default" key={i}>
                    {genre}
                  </Badge>
                ))
              : null}
          </div>
        </CardContent>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <span className="mt-2 text-sm">{summary}</span>
          </ScrollArea>
        </CardContent>

        <CardContent>
          <span className="mt-4 text-primary/70">
            Released:{' '}
            {new Date(first_release_date).toLocaleString('PT-pt', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </span>
          {developer && <span className="mt-4 text-primary/70 block">Developer: {developer}</span>}
          {publisher && <span className="mt-4 text-primary/70 block">Publisher: {publisher}</span>}
        </CardContent>
      </Card>
    </a>
  );
}
