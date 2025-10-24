import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Organizations from './pages/Organisations';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Organizations />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
