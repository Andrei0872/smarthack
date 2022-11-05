import { useRef } from "react";
import { useDrop } from "react-dnd";

function Cell({ children, ...props}) { 
  const cellRef = useRef();
  const [{ isOver, itemType, item }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item, monitor) => {
      console.log('cell dropped');
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
    }),
  }), []);

  
  if (isOver) {
    props.overCell({ height: item.height, width: item.width });
  }
  
  return (
    <div ref={drop} className={props.className ?? ''}>{children}</div>
  )
}

export default Cell