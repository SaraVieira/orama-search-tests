// @ts-expect-error
import { useSearch as useOramaSearch } from '@oramacloud/client/react';
import { createContext, useContext, useState } from 'react';
import { consoles } from './consoles';
import { debounce } from 'lodash-es';
import { Console, ConsoleSelected } from './types';

type OramaProviderState = {
  onSearchText: any;
  results: any;
  value: string;
  consolesSelected: ConsoleSelected;
  rating: number;
  setRating: (r: number) => void;
  setConsolesSelected: React.Dispatch<React.SetStateAction<ConsoleSelected>>;
};

export const ratings = [1, 1.5, 2, 3, 3.5, 4, 4.5];

const defaultState = {
  onSearchText: (_v: string) => Promise.resolve(),
  results: null,
  value: '',
  consolesSelected: consoles.reduce((acc: ConsoleSelected, curr: Console) => {
    acc[curr.id] = true;

    return acc;
  }, {}),
  rating: 0,
  setRating: (_r: number) => {},
  setConsolesSelected: (_r: object) => {},
};

const OramaProviderContext = createContext<OramaProviderState>(defaultState);

export function OramaProvider({ children, ...props }: { children: React.ReactNode }) {
  const [value, setValue] = useState(defaultState.value);
  const [rating, setRating] = useState(defaultState.rating);
  const [consolesSelected, setConsolesSelected] = useState(defaultState.consolesSelected);

  const { results } = useOramaSearch({
    term: value || '',
    limit: 50,
    mode: 'fulltext',
    where: {
      total_rating: {
        gte: rating * 20,
      },
      console: { in: Object.keys(consolesSelected).filter((k) => consolesSelected[k]) },
    },
  });

  const onSearchText = debounce(setValue, 200);

  onSearchText.cancel();
  onSearchText.flush();

  return (
    <OramaProviderContext.Provider
      {...props}
      value={{
        onSearchText,
        results,
        value,
        consolesSelected,
        rating,
        setRating,
        setConsolesSelected,
      }}
    >
      {children}
    </OramaProviderContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(OramaProviderContext);

  if (context === undefined) throw new Error('useSearch must be used within a OramaProvider');

  return context;
};
