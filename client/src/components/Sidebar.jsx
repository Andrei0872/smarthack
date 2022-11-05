import { useDrop } from 'react-dnd';
import './Sidebar.css'
import Widget from './Widget'
import './BuildingArea.css'
import Cell from './Cell';
import { useState } from 'react';

function Sidebar() {
  const [{ isOver, itemType, item }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item, monitor) => {
      console.log('dropped');
      // item.dropped = true;
      console.log(item);

      setOverCells(null);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
    }),
  }));

  const [overCells, setOverCells] = useState(null);

  // TODO(perf): debounce
  const onOverCell = (rowIdx, colIdx, dimensions) => {    
    // Up and right directions.
    const { width, height } = dimensions;
    Promise.resolve()
      .then(() => {
        setOverCells({
          startX: colIdx,
          endX: colIdx + width,
          startY: rowIdx,
          endY: rowIdx + height,
        }); 
      })
  }
  
  return (
  <>
    <div className="sidebar">
      <div className="page-adder">page adder</div>
      <div className="widgets">
        <ul>
          <Widget>widget1</Widget>
          <Widget>widget2</Widget>
          <Widget>widget3</Widget>
        </ul>
      </div>
    </div>

    <div className='building-area' ref={drop}>
      <div className='widgets-wrapper'>
        {
          Array.from({ length: 12 }).map((r, idx) => (
            <div
              className={`row ${overCells?.startY <= idx && idx < overCells?.endY ? 'is-selected' : ''}`}
              key={idx}
            >
              {
                Array.from({ length: 12 }).map((c, cIdx) => (
                  <Cell
                    overCell={(dimensions) => onOverCell(idx, cIdx, dimensions)}
                    className={`cell ${overCells?.startX <= cIdx && cIdx < overCells?.endX ? 'is-selected' : ''}`}
                    key={`cell-${idx}-${cIdx}`}
                  >
                    {cIdx}
                  </Cell>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
   </>
  )
}

export default Sidebar