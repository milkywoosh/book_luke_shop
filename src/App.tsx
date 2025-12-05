
import { Route, Routes } from 'react-router';
import './App.css';
import BaseLayout from './components/base_layout/BaseLayout.tsx';
import Dashboard from './components/dashboard/Dashboard.tsx';
import Installation from './components/dashboard/installation/Installation.tsx';
import Dismantle from './components/dashboard/dismantle/Dismantle.tsx';
import Product from './components/product/Product.tsx';
import CreateProduct from './components/product/CreateProduct.tsx';
import BoxWrapper from './components/box_wrapper/BoxWrapper.tsx';
import About from './components/about/About.tsx';

function App() {


  return (
    // md:flex-row
    <div className='flex flex-col sm:flex-row w-full sm:min-w-[400px]'>
      <BaseLayout>
        <Routes>
          <Route path='dashboard' element={<Dashboard />}>
            <Route path='installation' element={<Installation />} />
            <Route path='dismantle' element={<Dismantle />} />
          </Route>

          <Route path='product' element={<Product />}>
            <Route path='create' element={<CreateProduct />} />
            <Route path='list' element={<CreateProduct />} />
          </Route>

          <Route path='random' element={<BoxWrapper />} />
          <Route path='about' element={<About />} />

        </Routes>
        {/* <BoxWrapper />  */}

      </BaseLayout>
    </div>
  )
}

export default App
