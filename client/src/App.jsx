import { DndProvider } from 'react-dnd';
import './App.css';
import BuildingArea from './components/BuildingArea';
import Sidebar from './components/Sidebar';
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className='main'>
      <DndProvider backend={HTML5Backend}>
        <Sidebar />
        <BuildingArea />
      </DndProvider>
    </div>
  )
}

export default App;
