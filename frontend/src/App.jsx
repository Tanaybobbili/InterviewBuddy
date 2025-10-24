  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import RootLayout from './layouts/RootLayout';
  import Organizations from './pages/Organisations';
  import OrgDetailsPage from './pages/OrgDetailsPage';
  import './App.css'

  function App() {
    return (
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Organizations />} />
            <Route
              path="/organizations/:id"
              element={<OrgDetailsPage />}
            />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    );
  }

  export default App;
