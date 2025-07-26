import './CSS/Todoitems.css'
import tick from './Assets/tick.png'
import not_tick from './Assets/not_tick.png'
import cross from './Assets/cross.png'

const Todoitems = ({ no, display, text, toggleComplete, deleteTodo }) => {
  return (
    <div className='todoitems'>
      <div className="todoitems-container" onClick={() => toggleComplete(no)}>
        <img src={display === "completed" ? tick : not_tick} alt="tick status" />
        <div className={`todoitems-text ${display === "completed" ? "completed" : ""}`}>
          {text}
        </div>
      </div>
      <img
        className='todoitems-cross-icon'
        src={cross}
        alt="delete"
        onClick={() => deleteTodo(no)}
      />
    </div>
  )
}

export default Todoitems;
