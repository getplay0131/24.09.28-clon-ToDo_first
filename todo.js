// 필요한 HTML 요소들을 선택합니다.
let list = document.querySelector("ul.list");
let btnAdd = document.getElementById("btnAdd");
const taskInput = document.getElementById("task");

// 초기 할 일 목록을 설정합니다. 각 할 일은 내용(content)과 상태(status)를 가집니다.
let listTask = [
  {
    content: "content task 1",
    status: "doing",
  },
  {
    content: "content task 2",
    status: "complete",
  },
];

// 로컬 스토리지에서 저장된 할 일 목록이 있는지 확인하고, 있다면 그것을 불러옵니다.
if (localStorage.getItem("listTask") != null) {
  listTask = JSON.parse(localStorage.getItem("listTask"));
}

// 할 일 목록을 로컬 스토리지에 저장하는 함수입니다.
// 이를 통해 페이지를 닫거나 새로고침해도 데이터가 유지됩니다.
function saveLocalStorage() {
  localStorage.setItem("listTask", JSON.stringify(listTask));
}

// '추가' 버튼 클릭 시 실행되는 함수입니다.
btnAdd.onclick = function (event) {
  // 버튼 클릭의 기본 동작(페이지 새로고침)을 막습니다.
  event.preventDefault();
  // 입력 필드에서 사용자가 입력한 내용을 가져옵니다.
  let content = document.getElementById("task").value;
  // 입력 내용이 있을 때만 새 할 일을 추가합니다.
  if (content != "") {
    listTask.unshift({
      content: content,
      status: "doing",
    });
  }
  // 화면에 할 일 목록을 다시 표시합니다.
  addTaskToHTML();
  // 입력 필드를 비웁니다.
  document.getElementById("task").value = "";
  // 변경된 할 일 목록을 로컬 스토리지에 저장합니다.
  saveLocalStorage();
};

// 입력 필드에서 엔터 키를 누를 때 새 할 일을 추가하는 기능입니다.
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // 엔터 키의 기본 동작(줄바꿈)을 막습니다.

    // 입력 필드의 내용을 가져오고 앞뒤 공백을 제거합니다.
    let content = taskInput.value.trim();

    // 내용이 있을 때만 새 할 일을 추가합니다.
    if (content !== "") {
      listTask.unshift({
        content: content,
        status: "doing",
      });

      // 화면에 할 일 목록을 다시 표시합니다.
      addTaskToHTML();
      // 입력 필드를 비웁니다.
      taskInput.value = "";

      // 변경된 할 일 목록을 로컬 스토리지에 저장합니다.
      saveLocalStorage();
    }
  }
});

// 할 일 목록을 화면에 표시하는 함수입니다.
function addTaskToHTML() {
  list.innerHTML = "";
  listTask.forEach((task, index) => {
    let newTask = document.createElement("li");
    newTask.classList.add(task.status);
    newTask.innerHTML = `          <div class="complete-icon" onClick="completedTask(${index})">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div class="content">${task.content}</div>
          <div class="close-icon" onClick="deleteTask(${index})">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </div>`;
    //   새 할일 추가
    list.appendChild(newTask);
  });
}

// 완료 아이콘 클릭 시 할 일의 상태를 변경하는 함수입니다.
function completedTask(index) {
  // 현재 상태가 'doing'이면 'complete'로, 'complete'면 'doing'으로 변경합니다.
  listTask[index].status =
    listTask[index].status === "doing" ? "complete" : "doing";
  // 변경된 목록을 화면에 다시 표시합니다.
  addTaskToHTML();
  // 변경 사항을 로컬 스토리지에 저장합니다.
  saveLocalStorage();
}

// 삭제 버튼 클릭 시 해당 할 일을 목록에서 제거하는 함수입니다.
function deleteTask(index) {
  // filter 메소드를 사용해 해당 인덱스의 할 일만 제외하고 새 배열을 만듭니다.
  listTask = listTask.filter((task, newIndex) => {
    return newIndex != index;
  });
  // 변경된 목록을 화면에 다시 표시합니다.
  addTaskToHTML();
  // 변경 사항을 로컬 스토리지에 저장합니다.
  saveLocalStorage();
}

// 페이지 로드 시 할 일 목록을 화면에 표시합니다.
addTaskToHTML();
