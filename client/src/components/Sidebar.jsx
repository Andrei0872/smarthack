import { useDrop } from 'react-dnd';
import './Sidebar.css'
import Widget from './Widget'
import './BuildingArea.css'
import Cell from './Cell';
import { useState } from 'react';
import Title from '../widgets/Title';

const mapWidgetCoordsToStyle = (coords) => {
  return {
    gridColumn: `${coords.startX + 1} / ${coords.endX + 1}`,
    gridRow: `${coords.startY + 1} / ${coords.endY + 1}`,
    // background: 'red'
  }
}

const createNewPage = (opts) => ({
  localId: Math.random().toString(36).slice(2, 7),
  name: 'index',
  path: '/',
  ...opts,
});

function Sidebar() {
  const [activeWidgets, setActiveWidgets] = useState([]);
  const [pages, setPages] = useState(() => [createNewPage(), createNewPage({ name: 'Product Page', path: 'product/:id' })]);
  const [crtPageId, setCrtPageId] = useState(() => pages[0].localId);

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

  const crtDayActiveWidgets = activeWidgets.filter(aw => aw.crtPage === crtPageId);

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

        item.crtPage = crtPageId;
      })
  }

  const CELLS_COUNT = 36;

  return (
  <>
    <div className="sidebar">
      <div className="page-adder">
        <button className='page-adder__add'>Add page</button>
        
        <ul className='pages'>
          {
            pages.map(p => (
              <li onClick={() => setCrtPageId(p.localId)} className={`pages__page ${p.localId === crtPageId ? 'is-selected' : ''}`} key={p.localId}>{p.name} - {p.path}</li>
            ))
          }
        </ul>
      </div>
      <div className="widgets">
        <div className='widgets-list'>
          <Widget className="widgets-list__item" preview={true} id={1} height={2} width={4}>widget1</Widget>
          <Widget className="widgets-list__item" preview={true} id={2} height={3} width={5}>widget2</Widget>
          <Widget className="widgets-list__item" preview={true} id={3} height={2} width={6}>widget3</Widget>
          <Widget className="widgets-list__item" preview={true} id={4} height={4} width={8}>
            <Title />
          </Widget>
        </div>
      </div>
    </div>

    <div className={`building-area ${isOver ? 'is-over' : ''}`} ref={drop}>
      <div style={{ zIndex: isOver ? 1 : -1 }} className='widgets-wrapper'>
        {
          Array.from({ length: CELLS_COUNT }).map((r, idx) => (
            <div
              className={`row ${overCells?.startY <= idx && idx < overCells?.endY ? 'is-selected' : ''}`}
              key={idx}
            >
              {
                Array.from({ length: CELLS_COUNT }).map((c, cIdx) => (
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
        crtDayActiveWidgets.length ? (
          <div className='active-widgets'>
            {
              crtDayActiveWidgets.map(aw => (
                <Widget key={`${aw.crtPageId}-${aw.id}`} preview={false} {...aw}>{aw.children}</Widget>
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