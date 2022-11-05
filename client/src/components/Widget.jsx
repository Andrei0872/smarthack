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
      width: 4,
    }
  }))
  
  return (
    <div ref={drag} {...props}>{children}</div>
  )
}

export default Widget