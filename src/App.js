import React, { useState } from 'react';
import "./App.css"

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const taskStage = (taskId, direction) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          let newStage = task.stage;

          if (direction === 'next') {
            if (task.stage === 'todo') newStage = 'inProgress';
            else if (task.stage === 'inProgress') newStage = 'done';
          } else if (direction === 'previous') {
            if (task.stage === 'inProgress') newStage = 'todo';
            else if (task.stage === 'done') newStage = 'inProgress';
          }

          return { ...task, stage: newStage, timestamp: Date.now() };
        }
        return task;
      });

      return updatedTasks;
    });
  };

  const addNewTask = () => {
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      stage: 'todo',
      timestamp: Date.now(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskText('');
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>

      <div className="task">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button onClick={addNewTask}>Add Task</button>
      </div>
      <div className='flex-container'>
        <div className="Todo stage">
          <h2>To Do</h2>
          {tasks
            .filter((task) => task.stage === 'todo')
            .map((task) => (
              <div key={task.id} className={`task todo`}>
                <p>{task.text}</p>
                <button
                  onClick={() => taskStage(task.id, 'previous')}
                  disabled={task.stage === 'todo'}
                >
                  Previous
                </button>
                <button
                  onClick={() => taskStage(task.id, 'next')}
                  disabled={task.stage === 'done'}
                >
                  Next
                </button>
                <p>{new Date(task.timestamp).toLocaleString()}</p>
              </div>
            ))}

        </div>
        <div className="Progress stage">
          <h2>In Progress</h2>
          {tasks
            .filter((task) => task.stage === 'inProgress')
            .map((task) => (
              <div key={task.id} className={`task inProgress`}>
                <p>{task.text}</p>
                <button
                  onClick={() => taskStage(task.id, 'previous')}
                  disabled={task.stage === 'todo'}
                >
                  Previous
                </button>
                <button
                  onClick={() => taskStage(task.id, 'next')}
                  disabled={task.stage === 'done'}
                >
                  Next
                </button>
                <p>{new Date(task.timestamp).toLocaleString()}</p>
              </div>
            ))}
        </div>
        <div className="Done stage">
          <h2>Done</h2>
          {tasks
            .filter((task) => task.stage === 'done')
            .map((task) => (
              <div key={task.id} className={`task done`}>
                <p>{task.text}</p>
                <button
                  onClick={() => taskStage(task.id, 'previous')}
                  disabled={task.stage === 'todo'}
                >
                  Previous
                </button>
                <button
                  onClick={() => taskStage(task.id, 'next')}
                  disabled={task.stage === 'done'}
                >
                  Next
                </button>
                <p>{new Date(task.timestamp).toLocaleString()}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
