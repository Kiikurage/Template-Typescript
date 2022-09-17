import { createRoot } from 'react-dom/client';
import { App } from './App';
import { assertNotNullish } from './lib/assert';

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    assertNotNullish(container);
    const root = createRoot(container);
    root.render(<App />);
});
