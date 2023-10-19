import { useState } from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState('');

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedText, setEditedText] = useState('');

  const handleTaskAdd = () => {
    // verifica se input esta vazio
    if (newTask.trim() !== '') {
      // add no final da lista, dps de ...tasks
      setTasks([...tasks, { text: newTask, completed: false }]);
      // esvazia input 
      setNewTask('');
    }
  };

  const handleTaskRemove = (taskText: string) => {
    // filtra os elementos da lista com excecao desse elemento e cria uma outra lista sem esse elemento
    setTasks(tasks.filter((task) => task.text !== taskText));
  };

  const handleTaskComplete = (taskText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.text === taskText ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedText(tasks[index].text);
  };

  const handleSaveEdit = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedText;
    setTasks(updatedTasks);
    setEditingIndex(-1);
  };

  return (<div className="container">
    <h1>Lista de Tarefas</h1>
    <div>
      <input
        type="text"
        placeholder="Adicionar nova tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit" onClick={handleTaskAdd}>Adicionar</button>
    </div>
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className={task.completed ? 'completed' : ''}>
          {editingIndex === index ? (
            <input
              className="checkText"
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          ) : (
            <label>
              <input
                type="checkbox"
                className="check"
                checked={task.completed}
                onChange={() => handleTaskComplete(task.text)}
              />
              {task.text}
            </label>
          )}
          {editingIndex === index ? (
            <button onClick={() => handleSaveEdit(index)}>Salvar</button>
          ) : (
            <button onClick={() => handleEdit(index)}>Editar</button>
          )}
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
}
