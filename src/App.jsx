
import { useState } from "react";
import {
  CheckCircle2,
  Plus,
  Trash2,
  Zap,
  Sparkles,
  ListTodo,
  CircleCheck,
  ArrowUpRight,
} from "lucide-react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask(e) {
    e.preventDefault();

    if (!newTask.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTask.trim(),
        done: false,
      },
    ]);

    setNewTask("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <main className="app-main">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="background-grid" />

      <section className="taskflow-card">
        <header className="app-header">
          <div className="brand-icon">
            <Zap size={27} fill="currentColor" />
          </div>

          <div>
            <h1>
              Todo<span>Spark</span>
            </h1>
            <p className="tagline">
             TodoSpark | Your Productivity Space
            </p>
          </div>
        </header>

        <div className="welcome-message">
          <div className="eyebrow">
            <span className="live-dot" />
            YOUR PERSONAL WORKSPACE
          </div>

          <h2>
            Make today <span>count.</span>
          </h2>

          <p>
            Turn your plans into progress, one task at a time.
          </p>
        </div>

        <div className="stats-row">
          <div className="mini-stat">
            <div className="mini-stat-icon cyan">
              <ListTodo size={19} />
            </div>
            <div>
              <span>Total tasks</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="mini-stat">
            <div className="mini-stat-icon purple">
              <CircleCheck size={19} />
            </div>
            <div>
              <span>Completed</span>
              <strong>{completed}</strong>
            </div>
          </div>

          <div className="mini-stat">
            <div className="mini-stat-icon pink">
              <Sparkles size={19} />
            </div>
            <div>
              <span>Progress</span>
              <strong>{progress}%</strong>
            </div>
          </div>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <div className="input-wrap">
            <Plus size={19} />

            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What do you want to accomplish?"
              aria-label="New task"
              maxLength={150}
            />
          </div>

          <button
            className="add-button"
            type="submit"
            aria-label="Add task"
          >
            <Plus size={22} />
            <span>Add task</span>
          </button>
        </form>

        <div className="section-heading">
          <div>
            <h3>Today's Tasks</h3>
            <p>Your next accomplishment starts here.</p>
          </div>

          <span className="task-count">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <ListTodo size={28} />
              </div>

              <h4> Your next big win starts here ✨</h4>

              <p>
               Dream it. Plan it. Get it done. Add your first task and make today count.
              </p>

              <div className="empty-decoration">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : (
            tasks.map((task, index) => (
              <article
                key={task.id}
                className={`task-item ${
                  task.done ? "task-completed" : ""
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  className={`complete-button ${
                    task.done ? "is-completed" : ""
                  }`}
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.done ? "Mark incomplete" : "Complete task"
                  }
                  type="button"
                >
                  <CheckCircle2 size={21} />
                </button>

                <span className="task-title">{task.title}</span>

                <span className="task-status">
                  {task.done ? "Completed" : "In progress"}
                </span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                  type="button"
                >
                  <Trash2 size={17} />
                </button>
              </article>
            ))
          )}
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span>Daily progress</span>
            <strong>{completed} of {tasks.length} completed</strong>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Task completion progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="motivation-card">
          <div className="motivation-icon">
            <Sparkles size={19} />
          </div>

          <div>
            <strong>
              {tasks.length > 0 && completed === tasks.length
                ? "Amazing work!"
                : "Keep your momentum going"}
            </strong>

            <p>
              {tasks.length > 0 && completed === tasks.length
                ? "You've completed every task. Celebrate your progress!"
                : "Every small step brings you closer to your goals."}
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-status">
          <span className="footer-dot" />
          Your tasks are stored for this session
        </span>

        <span className="footer-credit">
          Crafted with <span className="heart">♥</span> by{" "}
          <a
            href="https://sumityadavportfolio1.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-link"
          >
            Sumit Yadav
            <ArrowUpRight size={13} />
          </a>
        </span>
      </footer>
    </main>
  );
}
