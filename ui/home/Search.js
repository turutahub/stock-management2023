// 検索ボタン押下時
function search() {
  document.getElementById("searchResults").innerHTML = ""

  var infoURL = `http://localhost:8080/search/info`
  infoURL += '?' + new URLSearchParams(getDates());
  var stkURL = `http://localhost:8080/search/stock`
  stkURL += '?' + new URLSearchParams(getDates());
  var impURL = `http://localhost:8080/search/order`
  impURL += '?' + new URLSearchParams(getDates());
  var invURL = `http://localhost:8080/search/inv`
  invURL += '?' + new URLSearchParams(getDates());

  if(document.getElementById('displayCost').checked) {
    displayCost(stkURL); 
  }
  if(document.getElementById('displayCostRatio').checked) {
    displayCostRate(infoURL);
  }
  if(document.getElementById('displayProfit').checked) {
    displayBalance(infoURL);
  }
  if(document.getElementById('displayOrderHistory').checked) {
    displayOrder(impURL);
  }
  if(document.getElementById('displayDisposalQuantity').checked) {
    displayWasteNum(invURL);
  }
  if(document.getElementById('displayDisposalAmount').checked) {
    displayWasteAmt(stkURL);
  }
  if(document.getElementById('displayLossRatio').checked) {
    displayLossRate(stkURL);
  }
  if(document.getElementById('displayReplenishmentQuantity').checked) {
    displaySpplmNum(invURL);
  }
  if(document.getElementById('displayReplenishmentAmount').checked) {
    displaySpplmAmt(invURL);
  }
  if(document.getElementById('displayConsumptionQuantity').checked) {
    displayConsumedNum(stkURL);
  }
  if(document.getElementById('displaySales').checked) {
    displaySales(infoURL);
  }
}

// 日付期間の入力値を取得する関数
function getDates() {
  var startDate = document.getElementById('startDate').value;
  var endDate = document.getElementById('endDate').value;
  return { startDate, endDate };
}
//　日付の間を取得
function getDatesBetween() {
  var dates = [];
  var startDate = new Date(getDates().startDate)
  var endDate = new Date(getDates().endDate)
  while (startDate <= endDate) {
    dates.push(formatDate(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
}
//　日付の形式をYYYY-MM-DDに変換
function formatDate(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}