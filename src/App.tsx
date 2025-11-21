
import { Route, Routes } from 'react-router';
import './App.css';
import BaseLayout from './components/base_layout/BaseLayout.tsx';
import Dashboard from './components/dashboard/Dashboard.tsx';
import Installation from './components/dashboard/installation/Installation.tsx';
import Dismantle from './components/dashboard/dismantle/Dismantle.tsx';
import Product from './components/product/Product.tsx';
import CreateProduct from './components/product/CreateProduct.tsx';
import BoxWrapper from './components/box_wrapper/BoxWrapper.tsx';

function App() {


  return (
    <>
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

        </Routes>
        {/* <BoxWrapper />  */}

      </BaseLayout>
    </>
  )
}

export default App
