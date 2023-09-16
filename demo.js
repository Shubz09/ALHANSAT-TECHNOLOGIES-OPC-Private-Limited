
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// Define the Kanban board component.
const KanbanBoard = () => {
  // State variables.
  const [tasks, setTasks] = useState([]);
  const [currentColumn, setCurrentColumn] = useState("To Do");

  // Fetch the tasks from the API.
  useEffect(() => {
    axios.get("/api/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  // Add a new task.
  const addTask = () => {
    const task = {
      title: "",
      description: "",
      status: "To Do",
    };

    // Open the task form.
    setCurrentColumn("To Do");

    // Clear the task title and description inputs.
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
  };

  // Edit a task.
  const editTask = (task) => {
    // Open the task form.
    setCurrentColumn(task.status);

    // Set the task title and description inputs to the task's values.
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
  };

  // Delete a task.
  const deleteTask = (task) => {
    // Confirm the deletion.
    const confirm = window.confirm("Are you sure you want to delete this task?");

    if (confirm) {
      axios.delete("/api/tasks/" + task.id).then(() => {
        setTasks(tasks.filter((t) => t !== task));
      });
    }
  };

  // Move a task to a different column.
  const moveTask = (task) => {
    const newColumn = document.getElementById(task.status);

    // Remove the task from the current column.
    const currentColumn = document.getElementById(task.currentColumn);
    currentColumn.removeChild(task);

    // Add the task to the new column.
    newColumn.appendChild(task);

    // Update the task's status.
    task.currentColumn = newColumn.id;
  };

  // Render the Kanban board.
  return (
    <div>
      <h1>Kanban Board</h1>
      <div className="kanban-board">
        <div className="kanban-column" id="to-do">
          <h2>To Do</h2>
          {tasks.filter((task) => task.status === "To Do")}
        </div>
        <div className="kanban-column" id="doing">
          <h2>Doing</h2>
          {tasks.filter((task) => task.status === "Doing")}
        </div>
        <div className="kanban-column" id="done">
          <h2>Done</h2>
          {tasks.filter((task) => task.status === "Done")}
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" id="taskTitle" placeholder="Task Title" />
        <input type="text" id="taskDescription" placeholder="Task Description" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

// Render the Kanban board.
ReactDOM.render(<KanbanBoard />, document.getElementById("root"));
