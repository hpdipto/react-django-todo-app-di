import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [activeItem, setActiveItem] = useState({id: null, title: '', completed: false});
  const [editing, setEditing] = useState(false);

  const fetchTask = () => {
    console.log('Fetching...');
  }

  useEffect(() => {
    fetchTask();
  });



  return (
    <div className="container">
      <div id="task-container">
        <div id="form-wrapper">
          <form id="form">
            <div className="flex-wrapper">
              <div style={{flex: 6}}>
                <input type="text" className="form-control" id="title" name="title" placeholder="Add task" />
              </div>

              <div style={{flex: 1}}>
                <input type="submit" id="submit" className="btn btn-warning" name="Add" value="Submit" />
              </div>
            </div>
          </form>
        </div>

        <div id="list-wrapper">

        </div>
      </div>
    </div>
  );
}

export default App;
