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

// 在庫概要、最新の出荷情報の表示を更新
async function updateDashboard() {
  try {
    await showStockSummary();
    await showLatestShipments();
  } catch (error) {
    console.error('Error:', error);
  }
}

// 在庫概要の表示を更新
async function showStockSummary() {
  try {
    const stockList = await getStockListFromDatabase();
    const totalStock = calculateTotalStock(stockList);
    displayTotalStock(totalStock);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 最新の発注情報の表示を更新
async function showLatestShipments() {
  try {
    const latestShipments = await getLatestShipmentsFromDatabase();
    displayLatestShipments(latestShipments);
  } catch (error) {
    console.error('Error:', error);
  }
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
async function getLatestShipmentsFromDatabase() {
  try {
    const response = await fetch('http://localhost:8080/orders/latest-shipments');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// 最新の発注情報を表示
function displayLatestShipments(latestShipments) {
  const latestShipmentsList = document.getElementById('latestShipments').querySelector('ul');
  latestShipmentsList.innerHTML = '';

  for (const shipment of latestShipments) {
    const listItem = document.createElement('li');
    listItem.textContent = shipment.name;
    latestShipmentsList.appendChild(listItem);
  }
}

// ページ読み込み時に最新の発注情報を取得して表示
window.addEventListener('DOMContentLoaded', async () => {
  const latestShipments = await getLatestShipmentsFromDatabase();
  displayLatestShipments(latestShipments);
});

// 在庫概要の総在庫数を表示
function displayTotalStock(totalStock) {
  const totalStockElement = document.getElementById('totalStock');
  totalStockElement.textContent = totalStock;
}

// 最新の発注情報を表示
function displayLatestShipments(latestShipments) {
  const latestShipmentsList = document.getElementById('latestShipments').querySelector('ul');
  latestShipmentsList.innerHTML = '';

  for (const shipment of latestShipments) {
    const listItem = document.createElement('li');
    listItem.textContent = shipment.name;
    latestShipmentsList.appendChild(listItem);
  }
}

// 在庫一覧の表示を更新
async function showStockTable() {
  try {
    const stockList = await getStockListFromDatabase();
    displayStockTable(stockList);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 在庫一覧の表示を更新
function displayStockTable(stockList) {
  const tableBody = document.getElementById('stockTableBody');
  tableBody.innerHTML = '';

  for (const item of stockList) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const quantityCell = document.createElement('td');

    nameCell.textContent = item.name;
    quantityCell.textContent = item.quantity;

    row.appendChild(nameCell);
    row.appendChild(quantityCell);

    tableBody.appendChild(row);
  }
}

// 総在庫数を計算
function calculateTotalStock(stockList) {
  let totalStock = 0;

  for (const item of stockList) {
    totalStock += item.quantity;
  }

  return totalStock;
}
