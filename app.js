const openBtn = document.getElementById("open");
const saveBtn = document.getElementById("save");
const newFileBtn = document.getElementById("new-file");
const content_ = document.getElementById("content");

let fileName = "";

function readFile(e) {
  const openFileInput = document.getElementById("openFile");

  openFileInput.click();

  openFileInput.addEventListener("change", function (e) {
    const file_ = e.target.files[0];

    fileName = file_.name;

    const reader_ = new FileReader();
    // you can use 'load', 'loadend' as the event type
    reader_.addEventListener("loadend", function (event) {
      content_.value = event.target.result;
    });

    reader_.readAsText(file_);
  });
}

function saveFile(e) {
  if (!fileName) {
    newFileName();
  }

  const contentOfFile = content_.value;
  const blob_ = new Blob([contentOfFile], { type: "text/plain" });
  const url_ = URL.createObjectURL(blob_);
  const aEl = document.createElement("a");
  aEl.href = url_;
  aEl.download = fileName;
  aEl.click();
}

function newFileName(e) {
  fileName = promptResult();
}

function promptResult() {
  // Todo: check if the user has provided any extension for the file or not
  let msg =
    "Please give a name for the new file and also an extension for it: ";
  let userInput = prompt(msg);
  if (userInput) {
    return userInput;
  }

  const askAgian = confirm(
    "You have not given any name for the new file. Would you like to give a name and extension?"
  );
  if (askAgian) {
    userInput = prompt(msg);
    if (userInput) {
      return userInput;
    }
  }
  alert(
    "You have not given any name and extension for your file, so the default name is Aqyanoos and the default extension is .txt"
  );

  return "Aqyanoos.txt";
}

newFileBtn.onclick = newFileName;

openBtn.addEventListener("click", readFile);

saveBtn.addEventListener("click", saveFile);
