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

async function getStockTable() {
  try {
    const response = await fetch('http://localhost:8080/stock');
    const data = await response.json();
    const tableBody = document.getElementById('stockTable');

    function calculateTotalStock(data) {
      let totalStock = 0;
      for (const item of data) {
        totalStock += item.quantity;
      }
      return totalStock;
    }


// 在庫総数を在庫一覧から持ってきて表示
function showStockSummary() {
  const stockListElement = document.getElementById('stockList');
  const stockList = getStockListFromDatabase(); // データベースから在庫一覧を取得
  stockListElement.innerHTML = '';
  for (const stockItem of stockList) {
    const stockItemElement = document.createElement('li');
    stockItemElement.textContent = stockItem.name + ': ' + stockItem.quantity;
    stockListElement.appendChild(stockItemElement);
  }
}

// 重要なアラートの表示
function showImportantAlerts() {
  const importantAlertsElement = document.getElementById('importantAlerts');
  const importantAlerts = getImportantAlertsFromDatabase(); // データベースから重要なアラートを取得
  importantAlertsElement.innerHTML = '';
  for (const alert of importantAlerts) {
    const alertItem = document.createElement('li');
    alertItem.textContent = alert;
    importantAlertsElement.appendChild(alertItem);
  }
}

// 最新の発注情報の表示
function showLatestShipments() {
  const latestShipmentsElement = document.getElementById('latestShipments');
  const latestShipments = getLatestShipmentsFromDatabase(); // データベースから最新の発注情報を取得
  latestShipmentsElement.innerHTML = '';
  for (const shipment of latestShipments) {
    const shipmentItem = document.createElement('li');
    shipmentItem.textContent = shipment;
    latestShipmentsElement.appendChild(shipmentItem);
  }
}

// 在庫概要、重要なアラート、最新の出荷情報の表示を更新
function updateDashboard() {
  showStockSummary();
  showImportantAlerts();
  showLatestShipments();
}

// ページ読み込み時にホーム画面を更新
window.addEventListener('load', updateHome);

    function displayTotalStock(totalStock) {
      const totalStockElement = document.getElementById('totalStock');
      totalStockElement.textContent = totalStock;
    }

    tableBody.innerHTML = ''; 
    for (const item of data) {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const quantityCell = document.createElement('td');

      nameCell.textContent = item.name;
      quantityCell.textContent = item.quantity;

      row.appendChild(nameCell);
      row.appendChild(quantityCell);

      tableBody.appendChild(row);
    }

    const totalStock = calculateTotalStock(data);
    displayTotalStock(totalStock);
  } catch (error) {
    console.error('Error:', error);
  }
}

getStockTable();

// データベースから在庫一覧を取得
// データベースから在庫一覧を取得する処理
async function getStockListFromDatabase() {
  try {
    const response = await fetch('http://localhost:8080/stock');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return []; // エラー時は空の配列を返すか、エラー処理を行う
  }
}

// データベースから重要なアラートを取得する処理
async function getImportantAlertsFromDatabase() {
  try {
    const response = await fetch('http://localhost:8080/stock');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return []; // エラー時は空の配列を返すか、エラー処理を行う
  }
}

// データベースから最新の発注情報を取得する処理
async function getLatestShipmentsFromDatabase() {
  try {
    const response = await fetch('http://localhost:8080/order');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return []; // エラー時は空の配列を返すか、エラー処理を行う
  }
}

// ページ読み込み時にホーム画面を更新
function updateHome() {
  updateDashboard();
}

// ページ読み込み時にホーム画面を更新
window.addEventListener('load', updateHome);

