import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { AiOutlineDelete } from 'react-icons/ai';

function Subpage() {
    const [taskText, setTaskText] = useState('');
    const [deadline, setDeadline] = useState('');
    const [tasks, setTasks] = useState([]);
    const [allProject, setProject] = useState([]);
    const [newProject, setNewProject] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [user] = useState("current_user");

    const showProfile = () => {
        document.getElementById("Profile").style.display = "block";
        document.getElementById("Tasks").style.display = "none";
        document.getElementById("Project").style.display = "none";
    };

    const showTasks = () => {
        document.getElementById("Profile").style.display = "none";
        document.getElementById("Tasks").style.display = "block";
        document.getElementById("Project").style.display = "none";
    };

    const showProject = () => {
        document.getElementById("Profile").style.display = "none";
        document.getElementById("Tasks").style.display = "none";
        document.getElementById("Project").style.display = "block";
    };

    const handleAddproject = () => {
        let newItem = {
            project: newProject,
            description: newDescription,
            user: user 
        };
        let updatedArr = [...allProject]
        updatedArr.push(newItem)
        setProject(updatedArr);
        localStorage.setItem('dolist', JSON.stringify(updatedArr));
        setNewProject("");
        setNewDescription("");
    }

    const handleDelete = (index) => {
        const updatedProjectList = allProject.filter((item, idx) => idx !== index && item.user === user);
        setProject(updatedProjectList);
        localStorage.setItem('dolist', JSON.stringify(updatedProjectList));
    }

    useEffect(() => {
        let savedProject = JSON.parse(localStorage.getItem('dolist'));
        if(savedProject){
            setProject(savedProject);
        }
    }, []);

    const handleTaskTextChange = (event) => {
        setTaskText(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const addTask = () => {
        if (taskText.trim() === '' || deadline.trim() === '') {
            alert("You must enter both a task and a deadline.");
            return;
        }
    
        const currentDate = new Date();
        const newTask = {
            text: taskText,
            deadline: deadline, 
            overdue: new Date(deadline) < currentDate,
            user: user 
        };
    
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setTaskText('');
        setDeadline('');
    
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
    };
    
    const removeTask = (index) => {
        const updatedTasks = tasks.filter((task, idx) => idx !== index && task.user === user);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
    };

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);
    
    const getTotalTasksCount = () => {
        return tasks.filter(task => task.user === user).length;
    };

    const getTotalProjectsCount = () => {
        return allProject.filter(project => project.user === user).length;
    };

    return (
        <div className="container">
            <div className="sidebar">
                <p><strong>Dashboard</strong></p>
                <button onClick={showProfile}><b>Home</b></button>
                <button onClick={showTasks}><b>Tasks</b></button>
                <button onClick={showProject}><b>Projects</b></button>
            </div>
            <div className="content">
                <div className="Profile" id="Profile">
                    <div className="box3">
                        <div className="box3-0">
                            <p><b>TASK AND PROJECT MANAGEMENT</b></p>
                        </div>
                        <div className="box3-1">
                            <div className='box3-1-1'>
                                <img src="https://www.wimi-teamwork.com/static/medias/logiciels-gestion-des-taches-1280x640-1.png" width={700} height={500} alt=""/>
                            </div>
                            <div className="box3-1-2">
                                <p><b>Tasks and projects are organized according to your specifications. The total count of tasks and projects is offered to meet your specific needs.</b></p>
                                <div className='table-container'>
                                    <table cellSpacing="10" cellPadding="10" className="table1">
                                        <tbody>
                                            <tr>
                                                <td id="totalTasksTitle"><b>Total Tasks</b></td>
                                                <td id="totalProjectsTitle"><b>Total Projects</b></td>
                                            </tr>
                                            <tr>
                                                <td id="totalTasksCount"><b>{getTotalTasksCount()}</b></td>
                                                <td id="totalProjectsCount"><b>{getTotalProjectsCount()}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Tasks" id="Tasks">
                    <div className="box2">
                        <div className="tasks-list">
                            <p><b>Your Tasks</b></p>
                            <div className="text">
                                <input type="text" value={taskText} onChange={handleTaskTextChange} placeholder="Add your tasks" />
                                <input type="date" value={deadline} onChange={handleDeadlineChange} placeholder="Set Deadline" />
                                <button onClick={addTask} id="addbutton">Add</button>
                            </div>
                            <ul>
                                {tasks.map((task, index) => ( 
                                <li key={index} className={task.overdue ? 'overdue' : ''}>
                                    {task.text}
                                    <span onClick={() => removeTask(index)}>&times;</span>
                                </li>
                               ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Project" id="Project">
                    <p><b>Your Projects</b></p>
                    <div className='wrapper'>
                        <div className='input1'>
                            <label><b>Project</b></label>
                            <input type="text" placeholder="Enter project name" className='Name'
                             value={newProject} onChange={(e)=>setNewProject(e.target.value)}/>
                        </div>
                        <div className='input1'>
                            <label><b>Description</b></label>
                            <input type="text" placeholder="Enter project details" className='Description'
                             value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}/>
                        </div>
                        <div className='input1'>
                            <button type='button' onClick={handleAddproject} className='button2'>Add</button>
                        </div>
                    </div>
                    <div className='list'>
                        {allProject.map((item,index) => (
                            <div className='list-item' key={index}>
                                <div>
                                    <h3>{item.project}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <AiOutlineDelete className='icon' onClick={() => handleDelete(index)} title="Delete?" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subpage;
