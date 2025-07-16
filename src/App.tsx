
import './App.css'
import BaseLayout from './components/base_layout/BaseLayout.tsx'
import MealDataTable from './components/meal_datatable/MealDataTable'
import data_table_meals from './data_sourcing_example/data_datatable'



function App() {


  return (
    <>
      <BaseLayout>
        {/* <Login arg="tesst" arg1={100} /> */}
        <MealDataTable data_source={data_table_meals}/>
        
      </BaseLayout>
    </>
  )
}

export default App
