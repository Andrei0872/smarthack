import { useDrag } from 'react-dnd'

function Widget({ children, ...props }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'widget',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    item: {
      name: 'foo',
      height: props.height,
      width: props.width,
      ...props,
    }
  }))
  
  return (
    <div ref={drag} style={{...props.customStyle ?? {}}}>{children}</div>
  )
}

export default Widget