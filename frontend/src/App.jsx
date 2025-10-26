  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import RootLayout from './layouts/RootLayout';
  import Organizations from './pages/Organisations';
  import OrgDetailsPage from './pages/OrgDetailsPage';
  import Notifications from './pages/Notifications';
  import Profile from './pages/Profile';
  import Support from './pages/Support';
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    );
  }

  export default App;
