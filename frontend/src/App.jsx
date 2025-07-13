import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MeusItens from './pages/MeusItens';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
       <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MeusItens" element={<MeusItens />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
