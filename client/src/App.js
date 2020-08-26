import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [activeItem, setActiveItem] = useState({id: null, title: '', completed: false});
  const [editing, setEditing] = useState(false);


  // from django documentation
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }



  const fetchTask = () => {
    console.log('Fetching...');

    axios.get('http://localhost:8000/api/task-list/')
        .then(res => {
          setTodoList(res.data)
        })
  }


  const handleChange = (e) => {
    var name = e.target.name
    var value = e.target.value
    console.log('Name:', name)
    console.log('Value:', value)

    setActiveItem({...activeItem, title: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('ITEM: ', activeItem)

    var csrfToken = getCookie('csrftoken')

    var url = `http://localhost:8000/api/task-create/`

    if(editing) {
      url = `http://localhost:8000/api/task-update/${activeItem.id}/`
      setEditing(false)
    }

    axios.post(url, activeItem, { headers: { 'X-CSRFToken': csrfToken } })
        .then(res => {
          fetchTask()
          setActiveItem({id: null, title: '', completed: false})
        })
        .catch(err => console.log(err))
  }

  const startEdit = (task) => {
    setActiveItem({
      ...task
    })
    setEditing(true)
  }


  const deleteItem = (task) => {
    const url = `http://localhost:8000/api/task-delete/${task.id}/`
    var csrfToken = getCookie('csrftoken');

    axios.delete(url, { headers: { 'X-CSRFToken': csrfToken } })
        .then(res => {
          fetchTask();
        })

  }


  useEffect(() => {
    fetchTask();
  }, []);



  return (

    <div className="container">
      <div id="task-container">
        <div id="form-wrapper">
          <form onSubmit={handleSubmit} id="form">
            <div className="flex-wrapper">
              <div style={{flex: 6}}>
                <input type="text" onChange={handleChange} value={activeItem.title} className="form-control" id="title" name="title" placeholder="Add task" />
              </div>

              <div style={{flex: 1}}>
                <input type="submit" id="submit" className="btn btn-warning" name="Add" value="Submit" />
              </div>
            </div>
          </form>
        </div>

        <div id="list-wrapper">
          {todoList.map((task, index) => {
            return(
                <div key={index} className="task-wrapper flex-wrapper">
                  <div style={{flex: 7}}>
                    <span>{task.title}</span>
                  </div>
                  <div style={{flex: 1}}>
                    <button onClick={() => startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                  </div>
                  <div style={{flex: 1}}>
                    <button onClick={() => deleteItem(task)} className="btn btn-sm btn-outline-dark delete">X</button>
                  </div>
                </div>
              );
          } )}
        </div>
      </div>
    </div>
  );
}

export default App;
