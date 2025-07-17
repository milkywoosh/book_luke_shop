import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import BaseLayout from './components/base_layout/BaseLayout'
import MealDataTable from './components/meal_datatable/MealDataTable'
import data_table_meals from './data_sourcing_example/data_datatable'
import MealDetail from './components/meal_detail/MealDetail'



function App() {



  return (
    <>

      <BaseLayout>
        <Routes>
          {/* <Login arg="tesst" arg1={100} /> */}
          <Route path="/" element={<Navigate to="/meal-datatable" />} />
          <Route path="/meal-datatable" element={<MealDataTable data_source={data_table_meals} />} />
          <Route path="/meal-detail/:id" element={<MealDetail />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />

        </Routes>
      </BaseLayout>

    </>
  )
}

export default App
