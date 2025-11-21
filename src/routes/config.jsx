import { lazy } from 'react';

// Lazy loading hace que cargue las páginas solo cuando se necesitan
const Home = lazy(() => import('../pages/user/Home'));
const Login = lazy(() => import('../pages/auth/login'));
const CreateUser = lazy(() => import('../pages/auth/create-user'));
const HomeAdmin = lazy(() => import('../pages/admin/HomeAdmin'));

// Nuevas rutas de administración
const VehiculosList = lazy(() => import('../pages/admin/Vehiculos/VehiculosList'));
const MarcasList = lazy(() => import('../pages/admin/Marcas/MarcasList'));
const ConcesionariosList = lazy(() => import('../pages/admin/Concesionarios/ConcesionariosList'));

const VehiculoDetalle = lazy(() => import('../pages/user/VehiculoDetalle'));

// Rutas públicas o del usuario, así están mejor organizadas
const publicRoutes = [
  { path: '/', element: <Home />, showNavbar: true },
  { path: '/login', element: <Login />, showNavbar: false },
  { path: '/create-user', element: <CreateUser />, showNavbar: false },
  { path: '/vehiculo/:id', element: <VehiculoDetalle />, showNavbar: true },
];

// Rutas del administrador 
const adminRoutes = [
  { path: '/admin/dashboard', element: <HomeAdmin />, isAdmin: true },
  { path: '/admin/vehiculos', element: <VehiculosList />, isAdmin: true },
  { path: '/admin/marcas', element: <MarcasList />, isAdmin: true },
  { path: '/admin/concesionarios', element: <ConcesionariosList />, isAdmin: true },
];

// Ruta 404 por ahora no hice una página específica, solo un div simple (por ahora (puede cambiar (o eso creo)))
const notFoundRoute = {
  path: '*',
  element: <div className="text-center py-10 text-2xl">404 - Página no encontrada xd</div>,
  showNavbar: false,
};

// Exportar todas las rutas en un solo arreglo, hell yeah
export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];