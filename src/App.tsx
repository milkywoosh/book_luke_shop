import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import BaseLayout from './components/base_layout/BaseLayout'
import data_table_meals from './data_sourcing_example/data_datatable'
import MealDetail from './components/meal_detail/MealDetail'
import EntryNewMeal from './components/entry_new_meal/EntryNewMeal'
import MealDataTableAggrid from './components/meal_datatable_aggrid/MealDataTableAggrid'
import ListOfPackages from './components/list_of_packages/ListOfPackages'
import DetailsOfPackage from './components/detail_of_package/DetailOfPackage'

const RoutesAll: { [key: string]: string } = {
  // meal_datatable: "/",
  meal_datatable_aggrid: "/",
  register_new_meal: "/register-meal",
  list_of_packages: "/list-of-packages",
  details_of_package: "/package-type/detail/:id",
  meal_detail_id: "/meal-detail/:id",
}

export { RoutesAll };


function App() {
  // note: real pendefinisian path disini. 
  // kalo ada path baru, tambahkan di sini
  // nav bar at PageNavigation mengikuti path disini
  return (

    <BaseLayout>
      <Routes>
        <Route path={RoutesAll.meal_datatable_aggrid} element={<Navigate to="/meal-datatable" />} />
        {/* <Route path="/meal-datatable" element={<MealDataTable data_source={data_table_meals} />} /> */}
        <Route path="/meal-datatable" element={<MealDataTableAggrid data_source={data_table_meals} />} />
        <Route path={RoutesAll.meal_detail_id} element={<MealDetail />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        <Route path={RoutesAll.register_new_meal} element={<EntryNewMeal />} />
        <Route path={RoutesAll.list_of_packages} element={<ListOfPackages />} />
        <Route path={RoutesAll.details_of_package} element={<DetailsOfPackage />} />
      </Routes>
    </BaseLayout>
  )
}

export default App
