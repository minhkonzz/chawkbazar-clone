import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import DefaultLayout from '../layouts/default'
import Custom1Layout from "../layouts/customs/custom1";
import Catalog from "../pages/Catalog/Catalog";
import Checkout from "../pages/Checkout/Checkout";
import ContactUs from "../pages/ContactUs/ContactUs";
import FAQ from "../pages/FAQ/FAQ";
import Terms from "../pages/Terms/Terms";
import Profile from '../pages/Profile/Profile'

const routes = [
   { path: '/', component: Home, layout: Custom1Layout },
   { path: '/catalog', component: Catalog, layout: Custom1Layout },
   { path: '/checkout', component: Checkout },
   { path: '/contactus', component: ContactUs },
   { path: '/faq', component: FAQ }, 
   { path: '/terms', component: Terms }, 
   { path: '/profile', component: Profile }
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
                     }/>
               )
            })
         }
         </Routes>
      </BrowserRouter>
   )
}

export default Router 