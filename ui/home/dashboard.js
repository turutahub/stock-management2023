// 在庫概要の表示
function showStockSummary() {
    // 総在庫数の取得と表示
    const totalStockElement = document.getElementById('totalStock');
    const totalStock = getTotalStockFromDatabase(); // データベースから総在庫数を取得
    totalStockElement.textContent = totalStock;
  
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
