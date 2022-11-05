import { DndProvider, useDrop } from 'react-dnd';
import './App.css';
// import BuildingArea from './components/BuildingArea';
import Sidebar from './components/Sidebar';
import { HTML5Backend } from 'react-dnd-html5-backend'
import Widget from './components/Widget';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='main'>
        <Sidebar />
        {/* <BuildingArea /> */}
      </div>
    </DndProvider>
  )
}

export default App;
