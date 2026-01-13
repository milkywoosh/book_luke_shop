
import { Route, Routes } from 'react-router';
import './App.css';
import BaseLayout from './components/base_layout/BaseLayout.tsx';



import About from './components/about/About.tsx';
import OrderManagement from './components/order_management/OrderManagement.tsx';
import CustomerListView from './components/customer_list_view/CustomerListView.tsx';
import CustomerDetailView from './components/customer_list_view/CustomerDetailList.tsx';
import AdminDashboard from './components/admin_view/Dashboard.tsx';

function App() {


  return (
    // md:flex-row
    <div className='flex flex-col sm:flex-row w-full sm:min-w-[400px]'>
      <BaseLayout>
        <Routes>
          <Route path='/' element={<OrderManagement />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/customer-list-view' element={<CustomerListView onSelect />} />
          <Route path='/customer-detail' element={<CustomerDetailView />} />
          <Route path='about' element={<About />} />
        </Routes>
        {/* <BoxWrapper />  */}

      </BaseLayout>
    </div>
  )
}

export default App
