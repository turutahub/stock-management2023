//棚卸情報登録済みの食材データ取得
async function getNewInventory() {
  try {
  const response = await fetch('http://localhost:8080/inventory');
  const data = await response.json();
  const tableBody = document.getElementById('newInventoryTable');

  // テーブルの内容をクリア
  tableBody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');

    const foodNameCell = document.createElement('td');
    const expdaysCell = document.createElement('td');
    const stockCell = document.createElement('td');
    const spplmNumCell = document.createElement('td');
    const spplmAmtCell = document.createElement('td');
    const wasteNumCell = document.createElement('td');
    const consumedNumCell = document.createElement('td');
    const wasteAmtCell = document.createElement('td');
    const lossRateCell = document.createElement('td');
    const costCell = document.createElement('td');
    const requiredNumCell = document.createElement('td');
    const insufficientNumCell = document.createElement('td');
    const foodIdCell = document.createElement('td');
    //const dayCell = document.createElement('td');

    foodNameCell.textContent = item.foodName;
    expdaysCell.textContent = item.expDays;
    stockCell.appendChild(document.createElement("input"));
    stockCell.querySelector('input').value = item.stock;
    spplmNumCell.appendChild(document.createElement("input"));
    spplmNumCell.querySelector('input').value = item.spplmNum;
    spplmAmtCell.appendChild(document.createElement("input"));
    spplmAmtCell.querySelector('input').value = item.spplmAmt;
    wasteNumCell.appendChild(document.createElement("input"));
    wasteNumCell.querySelector('input').value = item.wasteNum;
    consumedNumCell.textContent = item.consumedNum;
    wasteAmtCell.textContent = item.wasteAmt;
    lossRateCell.textContent = item.lossRate;
    costCell.textContent = item.cost;
    requiredNumCell.textContent = item.requiredNum;
    insufficientNumCell.textContent = item.insufficientNum;
    foodIdCell.textContent = item.foodId;
    foodIdCell.style.display = "none";
    foodIdCell.setAttribute("id", "foodID");
    //dayCell = item.day;

    row.appendChild(foodNameCell);
    row.appendChild(expdaysCell);
    row.appendChild(stockCell);
    row.appendChild(spplmNumCell);
    row.appendChild(spplmAmtCell);
    row.appendChild(wasteNumCell);
    row.appendChild(consumedNumCell);
    row.appendChild(wasteAmtCell);
    row.appendChild(lossRateCell);
    row.appendChild(costCell);
    row.appendChild(requiredNumCell);
    row.appendChild(insufficientNumCell);
    row.appendChild(foodIdCell);
    //row.appendChild(dayCell);

    tableBody.appendChild(row);
  });
} catch (error) {
  console.error('Error:', error);
}
getUnInventoried();
}





//棚卸情報未登録の食材データ取得
async function getUnInventoried() {
  try {
  const response = await fetch('http://localhost:8080/inventory/get');
  const data = await response.json();
  const tableBody = document.getElementById('newInventoryTable');

  // テーブルの内容をクリア
  //tableBody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');

    //食材名
    const foodNameCell = document.createElement('td');
    foodNameCell.textContent = item.foodName;
    row.appendChild(foodNameCell);

    //消費期間
    const expdaysCell = document.createElement('td');
    expdaysCell.textContent = item.expDays;
    row.appendChild(expdaysCell);

    //在庫数
    const stockCell = document.createElement('td');
    stockCell.appendChild(document.createElement("input"));
    stockCell.querySelector('input').type = "number";
    stockCell.querySelector('input').value = 0;
    stockCell.querySelector('input').addEventListener("input", function() {
      calculateConsumedNum(item.foodId, stockCell.querySelector('input').value,  wasteNumCell.querySelector('input').value, consumedNumCell)
      calculateCost(consumedNumCell.textContent, item.cost, spplmAmtCell.querySelector('input').value, costCell)
    })
    row.appendChild(stockCell);

    //補填数
    const spplmNumCell = document.createElement('td');
    spplmNumCell.appendChild(document.createElement("input"));
    spplmNumCell.querySelector('input').type = "number";
    spplmNumCell.querySelector('input').value = 0;
    row.appendChild(spplmNumCell);

    //補填額
    const spplmAmtCell = document.createElement('td');
    spplmAmtCell.appendChild(document.createElement("input"));
    spplmAmtCell.querySelector('input').type = "number";
    spplmAmtCell.querySelector('input').value = 0;
    spplmAmtCell.querySelector('input').addEventListener("input", function() {
      calculateCost(consumedNumCell.textContent, item.cost, spplmAmtCell.querySelector('input').value, costCell)
    })
    row.appendChild(spplmAmtCell);

    //廃棄数
    const wasteNumCell = document.createElement('td');
    wasteNumCell.appendChild(document.createElement("input"));
    wasteNumCell.querySelector('input').type = "number";
    wasteNumCell.querySelector('input').value = 0;
    wasteNumCell.querySelector('input').addEventListener("input", function() {
      calculateWasteAmt(item.cost, wasteNumCell.querySelector('input').value, wasteAmtCell)
      calculateConsumedNum(item.foodId, stockCell.querySelector('input').value,  wasteNumCell.querySelector('input').value, consumedNumCell)
      calculateLossRate(item.foodId, wasteNumCell.querySelector('input').value, lossRateCell)
      calculateCost(consumedNumCell.textContent, item.cost, spplmAmtCell.querySelector('input').value, costCell)
    });
    row.appendChild(wasteNumCell);

    //消費数
    const consumedNumCell = document.createElement('td');
    consumedNumCell.textContent = calculateConsumedNum(item.foodId, stockCell.querySelector('input').value,  wasteNumCell.querySelector('input').value, consumedNumCell)
    row.appendChild(consumedNumCell);
    //廃棄額
    const wasteAmtCell = document.createElement('td');
    wasteAmtCell.textContent = calculateWasteAmt(item.cost, wasteNumCell.querySelector('input').value, wasteAmtCell)
    row.appendChild(wasteAmtCell);
    //ロス率
    const lossRateCell = document.createElement('td');
    lossRateCell.textContent = calculateLossRate(item.foodId, wasteNumCell.querySelector('input').value, lossRateCell)
    row.appendChild(lossRateCell);
    //原価
    const costCell = document.createElement('td');
    costCell.textContent = calculateCost(consumedNumCell.textContent, item.cost, spplmAmtCell.querySelector('input').value, costCell)
    row.appendChild(costCell);
    //必要数   
    const requiredNumCell = document.createElement('td');
    //requiredNumCell.textContent = calculateRequiredNum(item.foodId)
    row.appendChild(requiredNumCell);
    //不足数
    const insufficientNumCell = document.createElement('td');
    row.appendChild(insufficientNumCell);
    

    //食材ID（非表示）
    const foodIdCell = document.createElement('td');
    foodIdCell.textContent = item.foodId;
    foodIdCell.style.display = "none";
    foodIdCell.setAttribute("id", "foodID");
    row.appendChild(foodIdCell);

    //const dayCell = document.createElement('td');
    //dayCell = item.day;
    //row.appendChild(dayCell);

    tableBody.appendChild(row);
  });
} catch (error) {
  console.error('Error:', error);
}
}



//消費数計算
async function calculateConsumedNum(foodId, stock, wasteNum, cell) {
  const insNum = await fetchInsNum(foodId);
  cell.textContent = insNum - stock - wasteNum
}

//廃棄額計算
function calculateWasteAmt(cost, wasteNum, cell) {
  cell.textContent = wasteNum * cost
}

//ロス率計算
async function calculateLossRate(foodId, wasteNum, cell) {
  const insNum = await fetchInsNum(foodId);
  if (insNum !== 0) {
    cell.textContent = wasteNum / insNum;
  } else {
    cell.textContent = 0 ; // ゼロで割り算が発生する場合の代替値
  }
}

//原価計算
function calculateCost(consumedNum, cost, spplmAmt, costCell) {
  costCell.textContent = (consumedNum * cost + parseInt(spplmAmt));
}

//必要数計算


//当日の検品数取得（DBから)
async function fetchInsNum(foodId) {
  try {
    const response = await fetch(`http://localhost:8080/inventory/${foodId}`);
    // レスポンスが正常な場合はデータを取得
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // エラーレスポンスが返ってきた場合は例外をスロー
      throw new Error('Error in fetch');
    }
  } catch (error) {
    // エラーレスポンスまたは例外が発生した場合は0を返す
    //console.error('Error', error);
    return 0;
  }
}

//前日の在庫取得(DBから)
async function fetchPreviousInv(foodId) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  const date = `${year}-${month}-${day}`;
  try {

  } catch (error) {

  }
}


async function calculateRequiredNum(foodId) {
  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function getPastWeekDates() {
    const today = new Date();
    const pastWeekDates = [];
    for (let i = 1; i <= 4; i++) {
      const pastDate = new Date(today.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const formattedDate = getFormattedDate(pastDate);
      pastWeekDates.push(formattedDate);
    }
    return pastWeekDates;
  }
  const pastWeekDates = getPastWeekDates();
  pastWeekDates.forEach((date) => {
    fetchPastRequiredNum(foodId, date)
  })
}

async function fetchPastRequiredNum(foodId, date) {
  try {
    const response = await fetch(`http://localhost:8080/stock/${foodId}/${date}`)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // エラーレスポンスが返ってきた場合は例外をスロー
      throw new Error('Error in fetch');
    }
  } catch (error) {
    // エラーレスポンスまたは例外が発生した場合は0を返す
    console.error('Error', error);
    return 0;
  }
}













/*
// 棚卸確定ボタンがクリックされた時の処理
function confirmInventory() {
    // 棚卸情報の入力を確定させる処理
  
    // 各データに反映させる処理
  
    // 経営情報表示画面に戻る処理
    window.location.href = 'management_info.html'; // 遷移先のURLを指定
  }
  
  // 売上入力ボタンがクリックされた時の処理
  function submitSales() {
    const salesInput = document.getElementById('salesInput').value;
  
    // バックエンドに売上情報を送信する処理
    sendSalesData(salesInput);
  }
  
  // 食材の名称を取得して要素に反映する処理
  function displayIngredientName(name) {
    const ingredientNameElement = document.getElementById('foodName');
    ingredientNameElement.textContent = name;
  }
  
  // 食材の消費期間を取得して要素に反映する処理
  function displayExpirationPeriod(period) {
    const expirationPeriodElement = document.getElementById('expiryPeriod');
    expirationPeriodElement.textContent = period;
  }
  
  // 在庫数入力ボタンがクリックされた時の処理
  function submitStock() {
    const stockInput = document.getElementById('stockInput').value;
  
    // バックエンドに在庫数情報を送信する処理
    sendStockData(stockInput);
  }
  
  // 補填数入力ボタンがクリックされた時の処理
  function submitRefillQuantity() {
    const refillQuantityInput = document.getElementById('supplementInput').value;
  
    // バックエンドに補填数情報を送信する処理
    sendRefillQuantityData(refillQuantityInput);
  }
  
  // 補填額入力ボタンがクリックされた時の処理
  function submitRefillAmount() {
    const refillAmountInput = document.getElementById('supplementCostInput').value;
  
    // バックエンドに補填額情報を送信する処理
    sendRefillAmountData(refillAmountInput);
  }
  
  // 廃棄数入力ボタンがクリックされた時の処理
  function submitWasteQuantity() {
    const wasteQuantityInput = document.getElementById('wasteInput').value;
  
    // バックエンドに廃棄数情報を送信する処理
    sendWasteQuantityData(wasteQuantityInput);
  }
  
  // 消費数を計算して表示する処理
  function calculateAndDisplayConsumption() {
    const previousStock =  // 前日の在庫数を取得
    const inspectionQuantity =  // 当日の検品数を取得
    const currentStock =  // 当日の在庫数を取得
    const wasteQuantity =  // 廃棄数を取得
  
    const consumption = previousStock + inspectionQuantity - currentStock - wasteQuantity;
    // 消費数を表示する処理
    displayConsumption(consumption);
  }
  
  // 廃棄額を計算して表示する処理
  function calculateAndDisplayWasteAmount() {
    const wasteQuantity =  // 廃棄数を取得
    const unitPrice =  // 単価を取得
  
    const wasteAmount = wasteQuantity * unitPrice;
    // 廃棄額を表示する処理
    displayWasteAmount(wasteAmount);
  }
  
  // ロス率を計算して表示する処理
  function calculateAndDisplayLossRate() {
    const wasteQuantity =  // 廃棄数を取得
    const previousStock =  // 前日の在庫数を取得
    const inspectionQuantity =  // 当日の検品数を取得
  
    const lossRate = (wasteQuantity / (previousStock + inspectionQuantity)) * 100;
    // ロス率を表示する処理
    displayLossRate(lossRate);
  }
  
  // 原価を計算して表示する処理
  function calculateAndDisplayCost() {
    const consumption =  // 消費数を取得
    const unitPrice =  // 単価を取得
    const refillAmount =  // 補填額を取得
  
    const cost = consumption * unitPrice + refillAmount;
    // 原価を表示する処理
    displayCost(cost);
  }
  
  // 必要数を計算して表示する処理
  function calculateAndDisplayRequiredQuantity() {
    const weeklyConsumption =  // 週ごとの消費量を取得
  
    const requiredQuantity = weeklyConsumption / 4; // 4週分の平均を求める
    // 必要数を表示する処理
    displayRequiredQuantity(requiredQuantity);
  }
  
  // 不足数を計算して表示する処理
  function calculateAndDisplayShortage() {
    const requiredQuantity =  // 必要数を取得
    const stock =  // 在庫数を取得
  
    const shortage = requiredQuantity - stock;
    // 不足数を表示する処理
    displayShortage(shortage);
  }
  

  */