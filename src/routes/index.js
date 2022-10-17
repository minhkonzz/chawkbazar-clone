import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from '../utils/constants/index'
import Home from "../pages/Home/Home";
import DefaultLayout from '../layouts/default'
import Custom1Layout from "../layouts/customs/custom1";
import Catalog from "../pages/Catalog/Catalog";
import Checkout from "../pages/Checkout/Checkout";
import ContactUs from "../pages/ContactUs/ContactUs";
import FAQ from "../pages/FAQ/FAQ";
import Terms from "../pages/Terms/Terms";
import Profile from '../pages/Profile/Profile'
import AccountDetail from "../pages/Profile/components/AccountDetail";
import Orders from '../pages/Profile/components/Orders'
import PasswordUpdate from '../pages/Profile/components/PasswordUpdate'

const routes = [
   { path: paths.ROOT_PATH, component: Home, layout: Custom1Layout },
   { path: paths.CATALOG_PATH, component: Catalog, layout: Custom1Layout },
   { path: paths.CHECKOUT_PATH, component: Checkout },
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
            path: 'change-password', 
            component: PasswordUpdate
         }
      ] 
   }
]

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
         {
            routes.map((route, index) => {
               const Component = route.component
               const Layout = route.layout || DefaultLayout
               return (
                  <Route 
                     key={`${route.path}-${index}`}
                     path={route.path} 
                     element={
                        <Layout>
                           <Component />
                        </Layout>
                     }
                  >
                     {
                        route.nestLayouts && route.nestLayouts.map((layout, index) => {
                           const NestLayout = layout.component
                           return (
                              <Route key={`${layout.path}-${index}`} path={layout.path} element={<NestLayout />}/>
                           )
                        })
                     }
                  </Route>
               )
            })
         }
         </Routes>
      </BrowserRouter>
   )
}

export default Router 