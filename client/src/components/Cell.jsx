import { useDrop } from "react-dnd";

function Cell({ children, ...props}) { 
  // const [{ isOver, itemType }, drop] = useDrop(() => ({
  //   accept: 'widget',
  //   drop: (item, monitor) => {
  //     console.log('dropped');
  //   },
  //   collect: monitor => ({
  //     isOver: !!monitor.isOver(),
  //     itemType: monitor.getItemType(),
  //   }),
  // }), []);

  // console.log({ isOver , children});
  
  return (
    <div {...props}>{children}</div>
  )
}

export default Cell