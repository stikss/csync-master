import React, { createContext, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

export const PlaceContext = createContext({
  tasks: '',
  fecha: '',
  addTask: (task) => {},
  loadTasks: () => {},
  deleteTask: (id) => {},
  updateTask: (id, task) => {},
  loadTasksForSelectedDate: (fecha) => {}
});

function PlaceContextProvider({ children }) {
  const [tareas, setTasks] = useState([]);

  async function CsyncDB() {
    const db = await SQLite.openDatabaseAsync('Csync');
    await db.execAsync('PRAGMA journal_mode = WAL');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS TASKS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        Status TEXT,
        time TEXT,
        created_at TEXT,
        imageUri TEXT
      );
      CREATE TABLE IF NOT EXISTS premium_status (
        id INTEGER PRIMARY KEY,
        description TEXT NOT NULL
      );
    `);
  }

  async function insertarDatos() {
    const db = await SQLite.openDatabaseAsync('Csync');
    await db.runAsync(`INSERT OR IGNORE INTO premium_status (id, description) VALUES
      (1, 'Es premium'),
      (2, 'No es premium'),
      (3, 'Prueba');`);
  }

  const loadTasks = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('Csync');
      const result = await db.getAllAsync(`SELECT * FROM TASKS`);
      const processedResult = result.map(task => ({
        ...task,
        created_at: task.created_at.split('T')[0], // Extraer solo la fecha
        time: task.created_at.split('T')[1].split('.')[0] // Extraer solo la hora
      }));
      setTasks(processedResult);
      console.log('Tasks loaded:', processedResult);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const now = new Date().toISOString();
      const defaultTask = {
        title: task.title,
        description: task.description,
        Status: task.Status,
        time: now.split('T')[1].split('.')[0], // Hora
        created_at: now.split('T')[0], // Fecha
        imageUri: task?.imageUri !== undefined ? task.imageUri : "",
      };
      const taskToInsert = {
        title: task?.title || defaultTask.title,
        description: task?.description || defaultTask.description,
        Status: task?.status || defaultTask.Status,
        time: task?.time || defaultTask.time,
        created_at: task?.created_at || defaultTask.created_at,
        imageUri: task?.imageUri || defaultTask.imageUri,
      };

      const db = await SQLite.openDatabaseAsync('Csync');
      await db.runAsync(
        `INSERT INTO TASKS (title, description, Status, time, created_at, created_time, imageUri) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [taskToInsert.title, taskToInsert.description, taskToInsert.Status, taskToInsert.time, taskToInsert.created_at, taskToInsert.created_time, taskToInsert.imageUri]
      );
      console.log("Tarea Agregada Exitosamente!");
      await loadTasks(); // Cargar las tareas después de agregar
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const db = await SQLite.openDatabaseAsync('Csync');
      await db.runAsync(
        `UPDATE TASKS SET title = ?, description = ?, Status = ?, time = ?, created_at = ?, imageUri = ? WHERE id = ?`,
        [updatedTask.title, updatedTask.description, updatedTask.Status, updatedTask.time, updatedTask.created_at, updatedTask.imageUri, id]
      );
      console.log('Datos modificados');
      await loadTasks(); // Cargar las tareas después de modificar
    } catch (error) {
      console.error("Problema al editar los datos", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('Csync');
      await db.runAsync(`DELETE FROM TASKS WHERE id = ?`, [id]);
      console.log("Elemento eliminado con éxito");
      await loadTasks(); // Cargar las tareas después de eliminar
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const loadTasksForSelectedDate = async (fecha) => {
    console.log(fecha.date);
    const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; // Formato completo con hora
  
    if (!datePattern.test(fecha.date)) {
      console.error('Formato de fecha y hora inválido:', fecha.date);
      return;
    }
  
    const dateOnly = fecha.date.split('T')[0];
  
    try {
      const db = await SQLite.openDatabaseAsync('Csync');
      const result = await db.getAllAsync(`SELECT * FROM TASKS WHERE time = ?`, [dateOnly]);
      console.log('ESTE ES CALENDARIOOOO', result);
    } catch (error) {
      console.error('Error loading tasks for selected date:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await CsyncDB();
      await insertarDatos();
      await loadTasks(); // Cargar tareas al inicio
      await loadTasksForSelectedDate();
    };
    initialize();
  }, []);

  const value = {
    tasks: tareas,
    addTask,
    deleteTask,
    updateTask,
    loadTasks,
    loadTasksForSelectedDate,
  };

  return (
    <PlaceContext.Provider value={value}>
      {children}
    </PlaceContext.Provider>
  );
}

export default PlaceContextProvider;