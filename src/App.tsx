import React from 'react';
import { useState } from 'react';
import './App.css';

export function App() {
  const App: React.FC = () => {
    const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
    const [newTask, setNewTask] = useState('');
  
    const handleTaskAdd = () => {
      if (newTask.trim() !== '') {
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask('');
      }
    };
  
    const handleTaskRemove = (taskText: string) => {
      setTasks(tasks.filter((task) => task.text !== taskText));
    };
  
    const handleTaskComplete = (taskText: string) => {
      const updatedTasks = tasks.map((task) =>
        task.text === taskText ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    };
  
    return (
      <div className="container">
        <h1>Lista de Tarefas</h1>
        <div>
          <input
            type="text"
            placeholder="Adicionar nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleTaskAdd}>Adicionar</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <select
                value={task.text}
                onChange={() => handleTaskComplete(task.text)}
              >
                <option value={task.text}>{task.text}</option>
              </select>
              <button
                className="remove"
                onClick={() => handleTaskRemove(task.text)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
}
