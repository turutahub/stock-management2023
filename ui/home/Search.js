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

async function searchKeyword() {
  var keyword = document.getElementById('keyword').value;
  var params = {
    keyword: keyword
  };
  var url = `http://localhost:8080/search/food`
  url += '?' + new URLSearchParams(params)

  var response = await fetch(url);

  var data = await response.json()

  var field = document.getElementById("searchKeywordResult")
  field.innerHTML = ""
  document.getElementById("keyword").value = ""

  var table = document.createElement("table")

  var thead = document.createElement("thead")

  var theadRow = document.createElement("tr")
  theadRow.innerHTML = `<th>食材名</th><th>単位</th><th>単価</th><th>消費期間</th><th>仕入れ店</th><th>備考</th>`

  thead.appendChild(theadRow)
  table.appendChild(thead)

  var tbody = document.createElement("tbody")

  data.forEach(elm => {


  var row = document.createElement("tr")

  var foodNameCell = document.createElement('td');
  foodNameCell.textContent = elm.foodName;
  row.appendChild(foodNameCell);

  var unitCell = document.createElement('td');
  unitCell.textContent = elm.unit;
  row.appendChild(unitCell);

  var costCell = document.createElement('td');
  costCell.textContent = elm.cost;
  row.appendChild(costCell);

  var expDaysCell = document.createElement('td');
  expDaysCell.textContent = elm.expDays;
  row.appendChild(expDaysCell);

  var supplierCell = document.createElement('td');
  supplierCell.textContent = elm.supplier;
  row.appendChild(supplierCell);

  var noteCell = document.createElement('td');
  noteCell.textContent = elm.note;
  row.appendChild(noteCell);

  console.log(row)


  tbody.appendChild(row);
})
  table.appendChild(tbody);

  field.appendChild(table)
}

async function partialMatch() {
  var keyword = document.getElementById('keyword').value;
  var params = {
    keyword: keyword
  };
  var url = `http://localhost:8080/search/food/part`
  url += '?' + new URLSearchParams(params)

  var response = await fetch(url);

  var data = await response.json()

  var field = document.getElementById("searchKeywordResult")
  field.innerHTML = ""
  document.getElementById("keyword").value = ""

  var table = document.createElement("table")

  var thead = document.createElement("thead")

  var theadRow = document.createElement("tr")
  theadRow.innerHTML = `<th>食材名</th><th>単位</th><th>単価</th><th>消費期間</th><th>仕入れ店</th><th>備考</th>`

  thead.appendChild(theadRow)
  table.appendChild(thead)

  var tbody = document.createElement("tbody")


  data.forEach(elm => {


  var row = document.createElement("tr")

  var foodNameCell = document.createElement('td');
  foodNameCell.textContent = elm.foodName;
  row.appendChild(foodNameCell);

  var unitCell = document.createElement('td');
  unitCell.textContent = elm.unit;
  row.appendChild(unitCell);

  var costCell = document.createElement('td');
  costCell.textContent = elm.cost;
  row.appendChild(costCell);

  var expDaysCell = document.createElement('td');
  expDaysCell.textContent = elm.expDays;
  row.appendChild(expDaysCell);

  var supplierCell = document.createElement('td');
  supplierCell.textContent = elm.supplier;
  row.appendChild(supplierCell);

  var noteCell = document.createElement('td');
  noteCell.textContent = elm.note;
  row.appendChild(noteCell);

  console.log(row)


  tbody.appendChild(row);
})
  table.appendChild(tbody);

  field.appendChild(table)
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