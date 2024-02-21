import ReactDOM from 'react-dom/client';
import { OramaProvider } from './lib/orama-context';
import { ThemeProvider } from './lib/theme-context';
import { Router } from './Router';
import { TooltipProvider } from './components/ui/tooltip';
import './index.css';
// @ts-expect-error
import { OramaCloud } from '@oramacloud/client/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <OramaCloud
    endpoint="https://cloud.orama.run/v1/indexes/games-vbh49c"
    apiKey={import.meta.env.VITE_API_KEY}
  >
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark">
        <OramaProvider>
          <Router />
        </OramaProvider>
      </ThemeProvider>
    </TooltipProvider>
  </OramaCloud>
);
