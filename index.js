const fs = require("fs");

const command = process.argv[2];

// ADD
if (command === "add") {
  fs.readFile("./data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const entries = JSON.parse(data);

    const newEntry = {
      id: entries.length === 0 ? 1 : entries[entries.length - 1].id + 1,
      title: process.argv[3],
    };

    entries.push(newEntry);

    fs.writeFile(
      "./data.json",
      JSON.stringify(entries, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Entry added successfully");
        }
      }
    );
  });
}

// LIST
if (command === "list") {
  fs.readFile("./data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const entries = JSON.parse(data);
    console.log(entries);
  });
}

// EDIT
if (command === "edit") {
  fs.readFile("./data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const entries = JSON.parse(data);

    const id = Number(process.argv[3]);
    const newTitle = process.argv[4];

    const entry = entries.find((entry) => entry.id === id);

    if (!entry) {
      console.log("Entry not found");
      return;
    }

    entry.title = newTitle;

    fs.writeFile(
      "./data.json",
      JSON.stringify(entries, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Entry edited successfully");
        }
      }
    );
  });
}

// DELETE
if (command === "delete") {
  fs.readFile("./data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const entries = JSON.parse(data);

    const id = Number(process.argv[3]);

    const newEntries = entries.filter((entry) => entry.id !== id);

    fs.writeFile(
      "./data.json",
      JSON.stringify(newEntries, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Entry deleted successfully");
        }
      }
    );
  });
}