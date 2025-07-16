
import './App.css'
import BaseLayout from './components/base_layout/baseLayout'
import Login from './components/login/login'

function App() {


  return (
    <>
      
      <BaseLayout>
        <Login arg="tesst" arg1={100} />
      </BaseLayout>
    </>
  )
}

export default App
