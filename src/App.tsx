import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import BaseLayout from './components/base_layout/BaseLayout'
import MealDataTable from './components/meal_datatable/MealDataTable'
import data_table_meals from './data_sourcing_example/data_datatable'
import MealDetail from './components/meal_detail/MealDetail'
import EntryNewMeal from './components/entry_new_meal/EntryNewMeal'

const RoutesAll = {
  meal_datatable: "/",
  register_new_meal : "/register-meal"
}

export { RoutesAll };


function App() {
  // note: real pendefinisian path disini. 
  // kalo ada path baru, tambahkan di sini
  // nav bar at PageNavigation mengikuti path disini
  return (

    <BaseLayout>
      <Routes>
        <Route path={RoutesAll.meal_datatable} element={<Navigate to="/meal-datatable" />} />
        <Route path="/meal-datatable" element={<MealDataTable data_source={data_table_meals} />} />
        <Route path="/meal-detail/:id" element={<MealDetail />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        <Route path={RoutesAll.register_new_meal} element={<EntryNewMeal />} />
      </Routes>
    </BaseLayout>
  )
}

export default App
