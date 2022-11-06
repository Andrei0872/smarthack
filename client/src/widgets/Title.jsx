import { useState } from "react"
import Widget from "../components/Widget"

function Title(props) {
  const [value, setValue] = useState(props.existingValue ?? 'Title');
  
  const handleOnChange = ev => {
    setValue(ev.target.value);
    props.change?.({ ...props, newValue: ev.target.value });
  }

  return (
    // <h1 onChange={() => {}} contentEditable={true}>Title</h1>
    <input style={{ fontSize: '2rem', width: '100%' }} type="text" value={value} onChange={handleOnChange} />
  )
}

export default Title