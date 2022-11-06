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
      children,
      ...props,
    }
  }))
  
  return (
    <div ref={drag} className={props.className ?? ''} style={{...props.customStyle ?? {}}}>{children}</div>
  )
}

export default Widget