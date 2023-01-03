import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { paths } from 'utils/constants/index'
import Home from "pages/Home";
import DefaultLayout from "common/layouts/default"; 
import Custom1Layout from "common/layouts/customs/custom1";
import Catalog from "pages/Catalog";
import Checkout from "pages/Checkout";
import CheckoutDetail from "pages/Checkout/components/CheckoutDetail";
import CheckoutSuccess from "pages/Checkout/components/CheckoutSuccess";
import ContactUs from "pages/ContactUs";
import FAQ from "pages/FAQ";
import Terms from "pages/Terms";
import Profile from "pages/Profile";
import AccountDetail from "pages/Profile/components/AccountDetail";
import Orders from "pages/Profile/components/Orders";
import Order from "pages/Profile/components/Order"; 
import PasswordUpdate from "pages/Profile/components/PasswordUpdate";

const routes = [
  { path: paths.ROOT_PATH, component: Home, layout: Custom1Layout },
  { path: paths.CATALOG_PATH, component: Catalog, layout: Custom1Layout },
  { 
    path: paths.CHECKOUT_PATH, 
    component: Checkout, 
    nestLayouts: [
      {
        path: 'detail',
        component: CheckoutDetail
      }, 
      {
        path: 'success', 
        component: CheckoutSuccess
      }
    ] 
  },
  { path: paths.CONTACTUS_PATH, component: ContactUs },
  { path: paths.FAQ_PATH, component: FAQ }, 
  { path: paths.TERMS_PATH, component: Terms }, 
  { 
    path: paths.PROFILE_PATH, 
    component: Profile, 
    nestLayouts: [
      {
        path: 'account-details', 
        component: AccountDetail
      }, 
      {
        path: 'orders', 
        component: Orders
      },
      {
        path: "orders/:id", 
        component: Order
      },
      {
        path: 'change-password', 
        component: PasswordUpdate
      }
    ] 
  }
];

const AnimateRoutes = () => {
  const location = useLocation(); 
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}> {
        routes.map((route, index) => {
          const Component = route.component;
          const Layout = route.layout || DefaultLayout;
          return (
            <Route 
              key={`${route.path}-${index}`}
              path={route.path} 
              element={
                <Layout>
                  <Component />
                </Layout>
              }>
              {
                route.nestLayouts && route.nestLayouts.map((layout, index) => {
                  const NestLayout = layout.component;
                  return (
                    <Route key={`${layout.path}-${index}`} path={layout.path} element={<NestLayout />} />
                  )
                })
              }
            </Route>
          )
        })}
      </Routes>
    </AnimatePresence>
  )
}

const Router = () => {
  return (
    <BrowserRouter>
      <AnimateRoutes />
    </BrowserRouter>
  )
}

export default Router;