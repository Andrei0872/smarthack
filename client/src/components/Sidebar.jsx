import './Sidebar.css'
import Widget from './Widget'

function Sidebar() {
  return (
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
  )
}

export default Sidebar