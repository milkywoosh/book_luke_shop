
import './App.css'
import BaseLayout from './components/base_layout/BaseLayout.tsx'
import BoxData from './components/box/BoxData.tsx'




function App() {


  return (
    <>
      <BaseLayout>
        {/* <Login arg="tesst" arg1={100} /> */}
        <BoxData />
      </BaseLayout>
    </>
  )
}

export default App
