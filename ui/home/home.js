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
    'addreport'
  ];

  contents.forEach(content => {
    const contentElement = document.getElementById(content);
    if (contentElement) {
      contentElement.style.display = contentId === content ? 'block' : 'none';
    }
  });
}

function backHome() {
  document.getElementById("home").style.display = "block"
  document.querySelector("header button").style.display = "none"
}


function select1Checked() {
  document.getElementById("select1").checked = true;
  document.querySelector("header button").style.display = "block"
}
function select3Checked() {
  document.getElementById("select3").checked = true;
  document.querySelector("header button").style.display = "block"
}
function select4Checked() {
  document.getElementById("select4").checked = true;
  document.querySelector("header button").style.display = "block"
}
function select5Checked() {
  document.getElementById("select5").checked = true;
  document.querySelector("header button").style.display = "block"
}
function select6Checked() {
  document.getElementById("select6").checked = true;
  document.querySelector("header button").style.display = "block"
}
function select7Checked() {
  document.getElementById("select7").checked = true;
  document.querySelector("header button").style.display = "block"
}
function select8Checked() {
  document.getElementById("select8").checked = true;
  document.querySelector("header button").style.display = "block"
}

// 初期表示時にホームと時計を表示
window.onload = function() {
  showContent('home');
};

// 初期表示時にホームと時計を表示
window.onload = function() {
  showContent('home');
};

function openSettings() {
  const settingsElement = document.getElementById('settings');
  if (settingsElement) {
    settingsElement.style.display = 'block';
  }
}
function today() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}


// データベースから在庫一覧を取得する処理
async function getStockListFromDatabase() {
  try {
    const response = await fetch('http://localhost:8080/stock');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// データベースから最新の発注情報を取得する処理
document.addEventListener("DOMContentLoaded",getLatestShipmentsFromDatabase())
async function getLatestShipmentsFromDatabase() {
  try {
    const response = await fetch('http://localhost:8080/home/order');
    const data = await response.json();
    console.log (data)
    data.forEach(latelist=>{
      const li = document.createElement('li');
      li.textContent = `${latelist.day}に${latelist.foodName}を発注しました`

      document.getElementById("latestShipmentsList").appendChild(li)
    })

   
    
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


function displayLatestShipments(latestShipments) {
  const latestShipmentsList = document.getElementById('latestShipments').querySelector('ul');
  latestShipmentsList.innerHTML = '';

  for (const shipment of latestShipments) {
    const listItem = document.createElement('li');
    listItem.textContent = shipment.name;
    latestShipmentsList.appendChild(listItem);
  }
}


document.addEventListener("DOMContentLoaded", async function() {
  try {
    var response = await fetch(`http://localhost:8080/register`)
    var data = await response.json()

    var selectBox = document.getElementById("selectBox")

    data.forEach(elm => {
      var option = new Option(elm.foodName)
      selectBox.add(option)
    })
  } catch(e) {
    console.error(e)
  }
  try {
    var foodName = selectBox.value
    var response = await fetch(`http://localhost:8080/home/stock/${foodName}`)
    var stock = await response.json();
    document.getElementById("totalStock").textContent = stock
  } catch(e) {
    document.getElementById("totalStock").textContent = "データ無し"
    console.error(e)
  }
  selectBox.addEventListener("change", async function(event) {
    try {
      var foodName = event.target.value;
      var response = await fetch(`http://localhost:8080/home/stock/${foodName}`)
      var stock = await response.json();
      document.getElementById("totalStock").textContent = stock
    } catch(e) {
      document.getElementById("totalStock").textContent = "データ無し"
      console.error(e)
    }
  })
})


