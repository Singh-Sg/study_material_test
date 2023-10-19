import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenratePdf from './component/GenratePdf';
import ShowParticularData from './component/ShowParticularData';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GenratePdf />}></Route>
          <Route path='/show-particular-data/:id' element={<ShowParticularData/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
