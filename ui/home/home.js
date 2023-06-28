document.addEventListener("DOMContentLoaded", () => {
    if(document.cookie === "") {
        //location.href = `http://localhost:5500/login/login.html`
    } else {
    const userId = $.cookie("sessionData").split(",")[0];
    const sessionId = $.cookie("sessionData").split(",")[1];
    checkId(userId, sessionId)
    }
})

async function checkId(userId, sessionId){
    const response = await fetch(`http://localhost:8080/login/check/${userId}/${sessionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if(!response.ok) {
        console.error(await response.json());
        location.href = `http://localhost:5500/login/login.html`
        console.log("error")
    } else {
        console.log("OK")
    }
}

// 時計、日付、曜日を表示
// 日付・時計機能の実装
function displayClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = formatDigits(now.getMinutes());
  const second = formatDigits(now.getSeconds());
  const clock = document.querySelector("#clock");
  clock.textContent = `${hour}:${minute}:${second}`;
}

function formatDigits(value) {
  return value.toString().padStart(2, "0");
}

function displayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = ["日", "月", "火", "水", "木", "金", "土"][now.getDay()];
  const dateElement = document.querySelector("#date");
  dateElement.textContent = `${year}/${month}/${date}(${day})`;
}

setInterval(displayClock, 1000);
setInterval(displayDate, 1000);

function showContent(contentId) {
  const contents = [
    'home',
    'dashboard',
    'stock',
    'register',
    'registerFood',
    'modifyRegister',
    'order',
    'newOrder',
    'modifyOrder',
    'inspect',
    'newInspect',
    'unInspected',
    'stockManagement',
    'Search',
    'reports',
    'addreport',
    'settings'
  ];

  contents.forEach(content => {
    const contentElement = document.getElementById(content);
    if (contentElement) {
      contentElement.style.display = contentId === content ? 'block' : 'none';
    }
  });
}

// 初期表示時にホームと時計を表示
window.onload = function() {
  showContent('home');
};

function showContent(contentId) {
  const contents = [
    'home',
    'dashboard',
    'stock',
    'register',
    'editForm',
    'order',
    'newOrder',
    'inspect',
    'stockManagement',
    'finditem',
    'reports',
    'addreport',
    'settings'
  ];

  contents.forEach(content => {
    const contentElement = document.getElementById(content);
    if (contentElement) {
      contentElement.style.display = contentId === content ? 'block' : 'none';
    }
  });
}
// 初期表示時にホームと時計を表示
window.onload = function() {
  showContent('home');
};

function openSettings() {
  // 設定画面に遷移する処理
  window.location.href = 'settings.html';
}


function today() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}



