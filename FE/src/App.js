import { BrowserRouter, Routes} from 'react-router-dom';
import { Suspense } from 'react';
import Loader from './Components/Loader/Loader.jsx';
import renderRoutes from './Routes/Routes.js';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            {renderRoutes()}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
