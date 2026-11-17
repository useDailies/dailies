import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './lib/deps';
import './styles.css';

const Home = lazy(() => import('./pages/Home'));
const Studio = lazy(() => import('./pages/Studio'));
const Compare = lazy(() => import('./pages/Compare'));
const Inspect = lazy(() => import('./pages/Inspect'));
const Pitch = lazy(() => import('./pages/Pitch'));
const NewProject = lazy(() => import('./pages/NewProject'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="boot" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewProject />} />
          <Route path="/p/:id" element={<Studio />} />
          <Route path="/p/:id/compare" element={<Compare />} />
          <Route path="/inspect/:id/:v/sheet" element={<Inspect />} />
          <Route path="/pitch" element={<Pitch />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
