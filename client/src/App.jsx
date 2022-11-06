import { DndProvider, useDrop } from 'react-dnd';
import './App.css';
// import BuildingArea from './components/BuildingArea';
import Sidebar from './components/Sidebar';
import { HTML5Backend } from 'react-dnd-html5-backend'
import Widget from './components/Widget';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Redirect,
  Navigate
} from "react-router-dom";
import ImportItems from './components/ImportItems';
import { ProductsProvider } from './context/productsContext';
import { ProductWidgetProvider } from './context/productWidgetContext';

const MainApp = <DndProvider backend={HTML5Backend}>
  <div className='main'>
    <Sidebar />
    {/* <BuildingArea /> */}
  </div>
</DndProvider>

function App() {
  return (
    <Router>
      <ProductsProvider>
        <ProductWidgetProvider>
          <Routes>
            <Route path="/import" element={<ImportItems />} />
            <Route path="/build" element={MainApp} />
            <Route
              path="*"
              element={<Navigate to="/import" replace />}
            />
          </Routes>
        </ProductWidgetProvider>
      </ProductsProvider>
    </Router>
  )
}

export default App;
