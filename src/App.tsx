
import './App.css';
import BaseLayout from './components/base_layout/BaseLayout.tsx';
import BoxWrapper from './components/box_wrapper/BoxWrapper.tsx';
import NavBar from './components/nav_bar/NavBar.tsx';




function App() {


  return (
    <>
      <BaseLayout>
        <NavBar />
        <BoxWrapper />
      </BaseLayout>
    </>
  )
}

export default App
