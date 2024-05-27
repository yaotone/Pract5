import Form from "./components/Form";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  Все: () => true,
  Активные: (task) => !task.completed,
  Завершенные: (task) => task.completed
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('Все');

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
      });
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks); 
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
    //
    return {...task, name: newName}
    }
    return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask = {deleteTask}
    editTask = {editTask}
    />
    )
    );

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
    ));

  const headingText = `Осталось задач: ${taskList.length}`;

  return (
    <div className="todoapp stack-large">
      <h1>Список задач  </h1>
      <Form addTask = {addTask}></Form>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading">
      {taskList}
      </ul>
    </div>
  );
}

export default App;
