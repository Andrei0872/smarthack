import { useDrag } from 'react-dnd'

function Widget({ children, ...props }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'widget',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    item: {
      name: 'foo',
      height: 2,
      length: 5,
    }
  }))
  
  console.log(isDragging);
  
  return (
    <div ref={drag} {...props}>{children}</div>
  )
}

export default Widget