const fs = require("fs");

function addEntry(title) {
  const data = fs.readFileSync("./data.txt", "utf8");

  let id = 1;

  if (data !== "") {
    const lines = data.split("\n");
    id = lines.length;
  }

  fs.appendFileSync("./data.txt", id + "- " + title + "\n");

  console.log("Entry added");
}

function listEntries() {
  const data = fs.readFileSync("./data.txt", "utf8");
  console.log(data);
}

function editEntry(id, newTitle) {
  const data = fs.readFileSync("./data.txt", "utf8");
  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(id + "-")) {
      lines[i] = id + "- " + newTitle;
    }
  }

  fs.writeFileSync("./data.txt", lines.join("\n"));

  console.log("Entry edited");
}

function deleteEntry(id) {
  const data = fs.readFileSync("./data.txt", "utf8");
  const lines = data.split("\n");

  const newLines = lines.filter(function (line) {
    return !line.startsWith(id + "-");
  });

  fs.writeFileSync("./data.txt", newLines.join("\n"));

  console.log("Entry deleted");
}

if (process.argv[2] === "add") {
  addEntry(process.argv[3]);
}

if (process.argv[2] === "list") {
  listEntries();
}

if (process.argv[2] === "edit") {
  editEntry(process.argv[3], process.argv[4]);
}

if (process.argv[2] === "delete") {
  deleteEntry(process.argv[3]);
}