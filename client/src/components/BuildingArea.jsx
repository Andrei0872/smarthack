import { useDrop } from 'react-dnd';
import './BuildingArea.css'
import Cell from './Cell'

function BuildingArea() {
  const [{ isOver, itemType }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item, monitor) => {
      console.log('dropped');
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      itemType: monitor.getItemType(),
    }),
  }), []);

  console.log({ isOver });
  
  return (
    <div ref={drop} className="building-area">
      <div className='widgets-wrapper'>
      {
        Array.from({ length: 12 }).map((r, idx) => (
          <div className="row" key={idx}>
            {
              Array.from({ length: 12 }).map((c, cIdx) => (
                <Cell className="cell" key={`cell-${idx}-${cIdx}`}>{cIdx}</Cell>
              ))
            }
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default BuildingArea