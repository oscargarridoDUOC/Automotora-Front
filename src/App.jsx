import { Routes, Route, useLocation, matchPath } from 'react-router-dom';
import { Suspense } from 'react';
import { publicLinks } from './data/navbarPublicLinks';
import { adminLinks } from './data/navbarAdminLinks';
import Navbar from './components/organisms/Navbar';
import { appRoutes } from './routes/config';
import ProtectedRoute from './routes/ProtectedRoute';

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const currentRoute = appRoutes.find(route => matchPath(route.path, location.pathname));
  const showNavbar = isAdminRoute || currentRoute?.showNavbar;

  const navbarLinks = isAdminRoute ? adminLinks : publicLinks;
  const navbarTitle = isAdminRoute ? 'Admin Automotora' : 'Automotora Front';

  return (
    <>
      {showNavbar && <Navbar links={navbarLinks} title={navbarTitle} />}

      <main>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          }
        >
          <Routes>
            {appRoutes.map(({ path, element, isAdmin }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;