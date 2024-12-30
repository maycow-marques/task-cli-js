const fs = require("fs");

class Database {
  data = { tasks: [] }
  filename = "tasks.json"

  constructor() {
    this._loadData()
  }

  _loadData() {
    if (!fs.existsSync(this.filename)) {
      this._saveData();
      return;
    }

    try {
      const data = fs.readFileSync(this.filename, "utf8");
      this.data = JSON.parse(data);
    } catch (err) {
      console.error("Error reading file:", err);
      process.exit(1);
    }
  }

  _saveData() {
    try {
      const jsonData = JSON.stringify(this.data, null, 2);
      fs.writeFileSync(this.filename, jsonData);
    } catch (err) {
      console.error("Error saving file:", err);
      process.exit(1);
    }
  }

  _getLastId(table) {
    const tables = ["tasks"];

    if (!tables.includes(table)) {
      throw new Error("Selected table does not exist.");
    }

    return this.data[table].length > 0
      ? this.data[table][this.data[table].length - 1].id + 1
      : 1;
  }

  get task() {
    return {
      create: (task) => {
        const newTask = {
          id: this._getLastId('tasks'),
          task,
          status: 'to-do'
        }

        this.data.tasks.push(newTask)
        this._saveData()
        return newTask
      },
      retrieve: (status) => {
        return status 
          ? this.data.tasks.filter((tsk) => tsk.status === status)
          : this.data.tasks
      },
      update: (id, title, status) => {
        const index = this.data.tasks.findIndex((tsk) => tsk.id === id)

        if (index === -1) throw new Error("Task not found.")

        if (title) this.data.tasks[index].task = title;
        if (status) this.data.tasks[index].status = status;

        this._saveData()
      },
      delete: (id) => {
        const index = this.data.tasks.findIndex((tsk) => tsk.id === id)

        if (index === -1) throw new Error("Task not found.")

        this.data.tasks.splice(index, 1)
        this._saveData()
      },
    }
  }
}

module.exports = new Database()