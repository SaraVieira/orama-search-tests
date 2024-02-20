import { useSearch as useOramaSearch } from '@oramacloud/client/react';
import { createContext, useContext, useState } from 'react';
import { consoles } from './consoles';

type OramaProviderProps = {
  children: React.ReactNode;
};

type OramaProviderState = {
  isLoading: boolean;
  onSearchText: (value: string) => Promise<void>;
  results: any;
  value: string;
  consolesForm: any;
  rating: number;
  setRating: (r: number) => void;
  setConsolesForm: (r: any) => void;
};

export const ratings = [1, 1.5, 2, 3, 3.5, 4, 4.5];

const OramaProviderContext = createContext<OramaProviderState>({
  isLoading: true,
  onSearchText: () => Promise.resolve(),
  results: null,
  value: '',
  consolesForm: {} as any,
  rating: 0,
  setRating: (_r: number) => {},
  setConsolesForm: (_r: object) => {},
});

export function OramaProvider({ children, ...props }: OramaProviderProps) {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const [consolesForm, setConsolesForm] = useState(
    consoles.reduce((acc: { [a: string]: boolean }, curr: { name: string; id: string }) => {
      acc[curr.id] = true;

      return acc;
    }, {})
  );

  const { results, ready } = useOramaSearch({
    term: value || '',
    limit: 50,
    mode: 'fulltext',
    where: {
      total_rating: {
        gte: rating * 20,
      },
      console: { in: Object.keys(consolesForm).filter((k) => consolesForm[k]) },
    },
  });

  const onSearchText = async (value: string) => {
    console.log(value);
    setValue(value);
  };

  return (
    <OramaProviderContext.Provider
      {...props}
      value={{
        isLoading: !ready,
        onSearchText,
        results,
        value,
        consolesForm,
        rating,
        setRating,
        setConsolesForm,
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
