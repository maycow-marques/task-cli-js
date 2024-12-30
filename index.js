const functions = require("./functions.js");

const params = process.argv.slice(2)

try {
  switch (params[0]) {
    case "add":
      if (typeof params[1] !== 'string' || params[1].length < 1)
        throw new Error("Invalid Task!");
      
      functions.add(params[1])
      break;
    case "update":
      functions.update(parseInt(params[1], 10), params[2])
      break;
    case "delete":
      functions.del(parseInt(params[1], 10))
      break;
    case "mark-in-progress":
      functions.mark(parseInt(params[1], 10), 'in-progress')
      break;
    case "mark-done":
      functions.mark(parseInt(params[1], 10), 'done')
      break;
    case "list":
      functions.list(params[1])
      break;
    case "--help":
      functions.help()
      break;
  
    default:
      console.error("Invalid command!")
      console.error("For more information, use the --help flag")
      process.exit(1)
      break;
  }
} catch (err) {
  let error = err instanceof Error ? err.message : 'Unexpected error.' 
  
  console.error(error)
  console.error("For more information, use the --help flag")
  process.exit(1)
}