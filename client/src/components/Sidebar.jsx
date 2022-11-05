import { useDrop } from 'react-dnd';
import './Sidebar.css'
import Widget from './Widget'
import './BuildingArea.css'
import Cell from './Cell';
import { useState } from 'react';

const mapWidgetCoordsToStyle = (coords) => {
  debugger;
  return {
    gridColumn: `${coords.startX + 1} / ${coords.endX + 1}`,
    gridRow: `${coords.startY + 1} / ${coords.endY + 1}`,
    background: 'red'
  }
}

function Sidebar() {
  const [activeWidgets, setActiveWidgets] = useState([]);

  const [{ isOver, itemType, item }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item, monitor) => {
      console.log('dropped');
      // item.dropped = true;
      console.log(item);
      setActiveWidgets((widgets) => {
        // TODO: duplicates
        return [
          ...widgets,
          { ...item, customStyle: mapWidgetCoordsToStyle(item.coords) },
        ]
      });

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

        item.coords = {
          startX: colIdx,
          endX: colIdx + width,
          startY: rowIdx,
          endY: rowIdx + height,
        }
      })
  }
  
  return (
  <>
    <div className="sidebar">
      <div className="page-adder">page adder</div>
      <div className="widgets">
        <ul>
          <Widget preview={true} id={1} height={2} width={4}>widget1</Widget>
          <Widget preview={true} id={2} height={3} width={5}>widget2</Widget>
          <Widget preview={true} id={3} height={2} width={6}>widget3</Widget>
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

      {
        activeWidgets.length ? (
          <div className='active-widgets'>
            {
              activeWidgets.map(aw => (
                <Widget key={aw.id} preview={false} {...aw}>foo</Widget>
              ))
            }
          </div>
        ) : null
      }
    </div>
   </>
  )
}

export default Sidebar