
import { Route, Routes } from 'react-router';
import './App.css';
import BaseLayout from './components/base_layout/BaseLayout.tsx';



import About from './components/about/About.tsx';
import OrderManagement from './components/order_management/OrderManagement.tsx';

function App() {


  return (
    // md:flex-row
    <div className='flex flex-col sm:flex-row w-full sm:min-w-[400px]'>
      <BaseLayout>
        <Routes>
          <Route path='order-management' element={<OrderManagement />} />
          <Route path='about' element={<About />} />
        </Routes>
        {/* <BoxWrapper />  */}

      </BaseLayout>
    </div>
  )
}

export default App
