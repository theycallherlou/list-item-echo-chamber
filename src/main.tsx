import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import { ListProvider } from './contexts/ListProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </AuthProvider>
  </StrictMode>,
)
