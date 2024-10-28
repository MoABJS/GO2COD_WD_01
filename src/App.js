import "./App.css";
import { useState } from "react";

function App() {
  const date = new Date();
  const currentDate = date.toDateString().slice(4);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [todosList, setTodosList] = useState([]);
  const [todo, setTodo] = useState("");
  const [validateLessChar, setValidateLessChar] = useState();
  const [validateMoreChar, setValidateMoreChar] = useState();
  const [todoEditId, setTodoEditId] = useState();
  const [edit, setEdit] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.length < 5) {
      setValidateLessChar(true);
    } else if (todo.length > 45) {
      setValidateMoreChar(true);
    } else {
      {
        edit
          ? setTodosList(
              todosList.map((todoItem) =>
                todoItem.id === todoEditId
                  ? {
                      ...todoItem,
                      todo: todo,
                      time: new Date().toLocaleString(),
                    }
                  : todoItem
              )
            )
          : setTodosList([
              ...todosList,
              {
                id: todosList.length,
                todo: todo,
                time: new Date().toLocaleString(),
              },
            ]);
      }
      setEdit(false);
      setValidateLessChar(false);
      setValidateMoreChar(false);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    setTodosList(todosList.filter((todoItem) => todoItem.id !== id));
  };

  const handleEdit = (id) => {
    const editTodo = todosList.filter((todoItem) => todoItem.id === id);
    setTodo(editTodo[0].todo);
    setTodoEditId(editTodo[0].id);
    setEdit(true);
  };

  return (
    <div className="App">
      <div className="app-card">
        <div className="day-and-date">
          <h1 className="day">{days[date.getDay()]}</h1>
          <p className="date">{currentDate}</p>
        </div>

        <div className="form">
          <form>
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a todo..."
              value={todo}
              minLength={5}
              required
            />
            <button onClick={handleSubmit}>
              {edit ? "Edit To do" : "Add To do"}
            </button>
          </form>
        </div>
        {validateLessChar && (
          <p style={{ color: "red", margin: 8 }}>
            Your todo should not be less than 5
          </p>
        )}
        {validateMoreChar && (
          <p style={{ color: "green", margin: 8 }}>
            Your todo is too long kindly summarise it
          </p>
        )}
        <div className="todo-list">
          {todosList.length > 0 ? (
            <>
              {todosList.map((todoItem) => {
                return (
                  <div className="todo-item" key={todoItem.id}>
                    <div className="item-date">
                      <input type="checkbox" />
                      <label>{todoItem.todo}</label>
                      <p>{todoItem.time}</p>
                    </div>
                    <div className="buttons">
                      <button onClick={() => handleDelete(todoItem.id)}>
                        🗑︎ Delete
                      </button>
                      <button onClick={() => handleEdit(todoItem.id)}>
                        {"\u270E"} Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="Landing-page">
              <p style={{ margin: 10 }}>
                Its a brand new day, write down something and achieve it. Let's
                go!
              </p>
              <img src="goal2.jpg" alt="goal" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
