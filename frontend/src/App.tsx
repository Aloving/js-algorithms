import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { HomePage } from '@/pages/HomePage';
import { AlgorithmPage } from '@/pages/AlgorithmPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<AlgorithmPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
