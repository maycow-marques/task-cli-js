const database = require("./database.js")

function add(task) {
  if (!task || typeof task !== "string" || task.trim() === "") {
    throw new Error("Task cannot be empty.")
  }

  const { id } = database.task.create(task)

  console.log(`Task added successfully (ID: ${id})`)
}

function list(status) {
  const validStatus = [undefined, 'to-do', 'in-progress', 'done'] 

  if (status && !validStatus.includes(status)) {
    throw new Error("Invalid task status");
  }
  
  console.table(database.task.retrieve(status))
}

function del(id) {
  if (!id || typeof id !== "number") {
    throw new Error("Id cannot be empty.")
  }

  database.task.delete(id)
}

function mark(id, status) {
  const validStatus = ['in-progress', 'done'] 

  if (!id || typeof id !== "number") {
    throw new Error("Id cannot be empty.")
  }

  if (!validStatus.includes(status)) {
    throw new Error("Invalid task status");
  }

  database.task.update(id, undefined, status)
}

function update(id, task) {
  if (!id || typeof id !== "number") {
    throw new Error("Id cannot be empty.")
  }
  
  if (!task || typeof task !== "string" || task.trim() === "") {
    throw new Error("Task cannot be empty.")
  }

  database.task.update(id, task, undefined)
}

function help() {
  console.log("\x1b[1mList of Valid Commands:\x1b[0m\n");
  console.log("  \x1b[1;34mAdding a new task:\x1b[0m");
  console.log("    task-cli add 'Buy groceries'\n");
  console.log("  \x1b[1;34mUpdating and deleting tasks:\x1b[0m");
  console.log("    task-cli update 1 'Buy groceries and cook dinner'");
  console.log("    task-cli delete 1\n");
  console.log("  \x1b[1;34mMarking a task as in progress or done:\x1b[0m");
  console.log("    task-cli mark-in-progress 1");
  console.log("    task-cli mark-done 1\n");
  console.log("  \x1b[1;34mListing all tasks:\x1b[0m");
  console.log("    task-cli list\n");
  console.log("  \x1b[1;34mListing tasks by status:\x1b[0m");
  console.log("    task-cli list done");
  console.log("    task-cli list todo");
  console.log("    task-cli list in-progress");
}

module.exports = {
  add,
  list,
  del,
  mark,
  update,
  help
}