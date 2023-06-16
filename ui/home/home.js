document.addEventListener("DOMContentLoaded", () => {
    if(document.cookie === "") {
        location.href = `http://127.0.0.1:5500/ui/login/login.html`
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
        location.href = `http://127.0.0.1:5500/login/login.html`
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
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const clock = document.querySelector("#clock");
  clock.textContent = `${hour}:${minute}:${second}`;
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
    'order',
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

// 在庫概要の表示
function showStockSummary() {
  // 総在庫数の取得と表示
  const totalStockElement = document.getElementById('totalStock');
  const totalStock = getTotalStockFromDatabase(); // データベースから総在庫数を取得
  totalStockElement.textContent = totalStock;

  // カテゴリごとの在庫数の取得と表示
  const categoryStockElement = document.getElementById('categoryStock');
  const categoryStockData = getCategoryStockFromDatabase(); // データベースからカテゴリごとの在庫数を取得
  categoryStockElement.innerHTML = '';
  for (const category in categoryStockData) {
    const stock = categoryStockData[category];
    const categoryStockItem = document.createElement('p');
    categoryStockItem.textContent = `${category}: ${stock}`;
    categoryStockElement.appendChild(categoryStockItem);
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

// 最新の発注情報
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

// ページ読み込み時にダッシュボードを更新
window.addEventListener('load', updateDashboard);
}