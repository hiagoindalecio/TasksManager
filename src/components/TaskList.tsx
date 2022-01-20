import { useState } from 'react'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import Alert from './Alert';

import '../styles/tasklist.scss'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  //Modal props
  const [isModalHidden, setIsModalHidden] = useState(true);
  const [modalBgColor, setModalBgColor] = useState('');
  const [modalText, setModalText] = useState('');

  function handleCreateNewTask() {
    // Criar uma nova task com um id random, não permite criar caso o título seja vazio.
    if (newTaskTitle !== '') {
      setTasks([...tasks, { id: Math.random(), title: newTaskTitle, isComplete: false }]);
      
      setNewTaskTitle('');

      setModalText('Todo adicionado com sucesso');
      setModalBgColor('#68BB59');
      setIsModalHidden(false);
      setTimeout(() => {setIsModalHidden(true)}, 4000);
    } else {
      setModalText('Você deve adicionar um título!');
      setModalBgColor('#f63030');
      setIsModalHidden(false);
      setTimeout(() => {setIsModalHidden(true)}, 4000);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altera a situação de um task de acordo com a situação atual
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);
    
    setModalText('O todo foi modificado com sucesso!');
    setModalBgColor('#68BB59');
    setIsModalHidden(false);
    setTimeout(() => {setIsModalHidden(true)}, 4000);
  }

  function handleRemoveTask(id: number) {
    // Remove uma task da listagem pelo ID
    const newTasks = tasks.filter(task => task.id !== id);

    setTasks(newTasks);

    setModalText('O todo foi excluído com sucesso!');
    setModalBgColor('#68BB59');
    setIsModalHidden(false);
    setTimeout(() => {setIsModalHidden(true)}, 4000);
  }

  return (
    <>
    <Alert
      text={modalText}
      bgColor={modalBgColor}
      hide={isModalHidden} />
    <section className="task-list container">

        <header>
          <h2>Minhas tasks</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Adicionar novo todo"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle} />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </div>
        </header>

        <main>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)} />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16} />
                </button>
              </li>
            ))}

          </ul>
        </main>
      </section>
      </>
  )
}