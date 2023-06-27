//　棚卸情報から取得したデータを元に当日の経営情報作成
function calculateInfo() {
  const tableBody = document.getElementById("calculateInfoTable")
  tableBody.innerHTML = '';

  const row = document.createElement('tr');
  
  const totalCell = document.createElement('td');
  totalCell.textContent = "総計"
  row.appendChild(totalCell);

  const costCell = document.createElement('td');
  costCell.setAttribute("id", "costInfo");
  //costCell.textContent = calculateCostInfo(costCell)
  row.appendChild(costCell);

  const costRateCell = document.createElement('td');
  costRateCell.setAttribute("id", "costRateInfo");
  //costRateCell.textContent = calculateCostRateInfo(costCell.textContent, document.getElementById("salesInput").value, costRateCell)
  row.appendChild(costRateCell);

  const wasteAmtCell = document.createElement('td');
  wasteAmtCell.setAttribute("id", "wasteAmtInfo");
  //wasteAmtCell.textContent = //calculateWasteAmtInfo()
  row.appendChild(wasteAmtCell);
  
  const lossRateCell = document.createElement('td');
  lossRateCell.setAttribute("id", "lossRateInfo");
  //lossRateCell.textContent = //calculateLossRateInfo()
  row.appendChild(lossRateCell);

  const balanceCell = document.createElement('td');
  balanceCell.setAttribute("id", "balanceInfo");
  //balanceCell.textContent = //calculateBalanceInfo()
  row.appendChild(balanceCell);

  //const dayCell = document.createElement('td');
  //dayCell = item.day;
  //row.appendChild(dayCell);
  

  tableBody.appendChild(row);

  document.getElementById("salesInput").addEventListener("input", function(){
    calculateCostRateInfo(costCell.textContent, document.getElementById("salesInput").value, costRateCell)
    calculateBalanceInfo(document.getElementById("salesInput").value, costCell.textContent, wasteAmtCell.textContent, balanceCell)
  })

  calculateCostInfo(costCell)
  calculateCostRateInfo(costCell.textContent, document.getElementById("salesInput").value, costRateCell)
  calculateWasteAmtInfo(wasteAmtCell)
  calculateLossRateInfo(wasteAmtCell.textContent, document.getElementById("salesInput").value,lossRateCell)
  calculateBalanceInfo(document.getElementById("salesInput").value, costCell.textContent, wasteAmtCell.textContent, balanceCell)
}


//　当日の経営情報＋売上の入力データを取得
function confirmInfo() {
  const sales = document.querySelector("#salesInput").value
  const tableBody = document.getElementById("calculateInfoTable")
  const record = Array.from(tableBody.children)
  record.forEach(elm => {
    const cost = elm.children[1].textContent
    const costRate = elm.children[2].textContent
    const wasteAmt = elm.children[3].textContent
    const lossRate = elm.children[4].textContent
    const balance = elm.children[5].textContent
    submitInfo(cost, costRate, wasteAmt, lossRate, sales, balance)
  })
}

//　informations_historyテーブルに追加
async function submitInfo(cost, costRate, wasteAmt, lossRate, sales, balance) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  try {
    const response = await fetch(`http://localhost:8080/inventory/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        day: formattedDate,
        cost: cost,
        costRate: costRate,
        wasteAmt: wasteAmt,
        lossRate: lossRate,
        sales: sales,
        balance: balance
      })
    })
    if(!response.ok)
    throw new Error('POST request failed');
  } catch(e) {
    console.error(e)
    // レコード重複により、POSTできなかった時にはPUTを行う
    try {
      const response = await fetch(`http://localhost:8080/inventory/info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: formattedDate,
          cost: cost,
          costRate: costRate,
          wasteAmt: wasteAmt,
          lossRate: lossRate,
          sales: sales,
          balance: balance
        })
      });
      if (!response.ok) {
        throw new Error('PUT request failed');
      }
    } catch (e) {
      console.error(e);
    }
  }
}



//　棚卸情報登録済みの食材データ取得
async function getNewInventory() {
  try {
    const response = await fetch('http://localhost:8080/inventory');
    const data = await response.json();
    const tableBody = document.getElementById('newInventoryTable');
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');

      const foodNameCell = document.createElement('td');
      foodNameCell.textContent = item.foodName;
      row.appendChild(foodNameCell);

      const expdaysCell = document.createElement('td');
      expdaysCell.textContent = item.expDays;
      row.appendChild(expdaysCell);

      const stockCell = document.createElement('td');
      stockCell.appendChild(document.createElement("input"));
      stockCell.querySelector('input').type = "number";
      stockCell.querySelector('input').value = item.stock;
      stockCell.querySelector('input').addEventListener("input", function() {
        calculateConsumedNum(item.foodId, stockCell.querySelector('input').value,  wasteNumCell.querySelector('input').value, consumedNumCell)
        calculateCost(consumedNumCell.textContent, item.unitPrice, spplmAmtCell.querySelector('input').value, costCell)
        calculateCostInfo(document.getElementById("costInfo"))
        calculateInsSuf(requiredNumCell.textContent, stockCell.querySelector('input').value, insufficientNumCell)
        calculateBalanceInfo(document.getElementById("salesInput").value, document.getElementById("costInfo").textContent, document.getElementById("wasteAmtInfo").textContent, document.getElementById("balanceInfo"))
      })
      row.appendChild(stockCell);

      const spplmNumCell = document.createElement('td');
      spplmNumCell.appendChild(document.createElement("input"));
      spplmNumCell.querySelector('input').type = "number";
      spplmNumCell.querySelector('input').value = item.spplmNum;
      row.appendChild(spplmNumCell);

      const spplmAmtCell = document.createElement('td');
      spplmAmtCell.appendChild(document.createElement("input"));
      spplmAmtCell.querySelector('input').type = "number";
      spplmAmtCell.querySelector('input').value = item.spplmAmt;
      spplmAmtCell.querySelector('input').addEventListener("input", function() {
        calculateCost(consumedNumCell.textContent, item.unitPrice, spplmAmtCell.querySelector('input').value, costCell)
        calculateCostInfo(document.getElementById("costInfo"))
        calculateBalanceInfo(document.getElementById("salesInput").value, document.getElementById("costInfo").textContent, document.getElementById("wasteAmtInfo").textContent, document.getElementById("balanceInfo"))
      })
      row.appendChild(spplmAmtCell);

      const wasteNumCell = document.createElement('td');
      wasteNumCell.appendChild(document.createElement("input"));
      wasteNumCell.querySelector('input').type = "number";
      wasteNumCell.querySelector('input').value = item.wasteNum;
      wasteNumCell.querySelector('input').addEventListener("input", function() {
        calculateWasteAmt(item.cost, wasteNumCell.querySelector('input').value, wasteAmtCell)
        calculateLossRateInfo(document.getElementById("wasteAmtInfo").textContent, document.getElementById("salesInput").value, document.getElementById("lossRateInfo"))
        calculateConsumedNum(item.foodId, stockCell.querySelector('input').value,  wasteNumCell.querySelector('input').value, consumedNumCell)
        calculateLossRate(item.foodId, wasteNumCell.querySelector('input').value, lossRateCell)
        calculateCost(consumedNumCell.textContent, item.unitPrice, spplmAmtCell.querySelector('input').value, costCell)
        calculateWasteAmtInfo(document.getElementById("wasteAmtInfo"))
        calculateBalanceInfo(document.getElementById("salesInput").value, document.getElementById("costInfo").textContent, document.getElementById("wasteAmtInfo").textContent, document.getElementById("balanceInfo"))
      });
      row.appendChild(wasteNumCell);

      const consumedNumCell = document.createElement('td');
      consumedNumCell.textContent = item.consumedNum;
      row.appendChild(consumedNumCell);

      const wasteAmtCell = document.createElement('td');
      wasteAmtCell.setAttribute("id", "wasteAmt")
      wasteAmtCell.textContent = item.wasteAmt;
      row.appendChild(wasteAmtCell);

      const lossRateCell = document.createElement('td');
      lossRateCell.textContent = item.lossRate;
      row.appendChild(lossRateCell);

      const costCell = document.createElement('td');
      costCell.setAttribute("id", "cost");
      costCell.textContent = item.costPrice;
      row.appendChild(costCell);

      const requiredNumCell = document.createElement('td');
      requiredNumCell.textContent = item.requiredNum;
      row.appendChild(requiredNumCell);

      const insufficientNumCell = document.createElement('td');
      insufficientNumCell.textContent = item.insufficientNum;
      row.appendChild(insufficientNumCell);

      const foodIdCell = document.createElement('td');
      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";
      foodIdCell.setAttribute("id", "foodID");
      row.appendChild(foodIdCell);


      //const dayCell = document.createElement('td');
      //dayCell = item.day;
      //row.appendChild(dayCell);

      tableBody.appendChild(row);
      calculateRequiredNum(item.foodId, requiredNumCell, stockCell.querySelector('input').value, insufficientNumCell)
    });
    getUnInventoried();
  } catch (error) {
    console.error('Error:', error);
  }
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
        calculateCostInfo(document.getElementById("costInfo"))
        calculateInsSuf(requiredNumCell.textContent, stockCell.querySelector('input').value, insufficientNumCell)
        calculateBalanceInfo(document.getElementById("salesInput").value, document.getElementById("costInfo").textContent, document.getElementById("wasteAmtInfo").textContent, document.getElementById("balanceInfo"))
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
        calculateCostInfo(document.getElementById("costInfo"))
        calculateBalanceInfo(document.getElementById("salesInput").value, document.getElementById("costInfo").textContent, document.getElementById("wasteAmtInfo").textContent, document.getElementById("balanceInfo"))
      })
      row.appendChild(spplmAmtCell);

      //廃棄数
      const wasteNumCell = document.createElement('td');
      wasteNumCell.appendChild(document.createElement("input"));
      wasteNumCell.querySelector('input').type = "number";
      wasteNumCell.querySelector('input').value = 0;
      wasteNumCell.querySelector('input').addEventListener("input", function() {
        calculateWasteAmt(item.cost, wasteNumCell.querySelector('input').value, wasteAmtCell)
        calculateLossRateInfo(document.getElementById("wasteAmtInfo").textContent, document.getElementById("salesInput").value, document.getElementById("lossRateInfo"))
        calculateConsumedNum(item.foodId, stockCell.querySelector('input').value,  wasteNumCell.querySelector('input').value, consumedNumCell)
        calculateLossRate(item.foodId, wasteNumCell.querySelector('input').value, lossRateCell)
        calculateCost(consumedNumCell.textContent, item.cost, spplmAmtCell.querySelector('input').value, costCell)
        calculateWasteAmtInfo(document.getElementById("wasteAmtInfo"))
        calculateBalanceInfo(document.getElementById("salesInput").value, document.getElementById("costInfo").textContent, document.getElementById("wasteAmtInfo").textContent, document.getElementById("balanceInfo"))
      });
      row.appendChild(wasteNumCell);

      //消費数
      const consumedNumCell = document.createElement('td');
      row.appendChild(consumedNumCell);
      //廃棄額
      const wasteAmtCell = document.createElement('td');
      wasteAmtCell.setAttribute("id", "wasteAmt")
      row.appendChild(wasteAmtCell);
      //ロス率
      const lossRateCell = document.createElement('td');
      row.appendChild(lossRateCell);
      //原価
      const costCell = document.createElement('td');
      costCell.setAttribute("id", "cost");
      row.appendChild(costCell);
      //必要数   
      const requiredNumCell = document.createElement('td');
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
      calculateConsumedNum(item.foodId, stockCell.querySelector('input').value,  wasteNumCell.querySelector('input').value, consumedNumCell)
      calculateWasteAmt(item.cost, wasteNumCell.querySelector('input').value, wasteAmtCell)
      calculateLossRate(item.foodId, wasteNumCell.querySelector('input').value, lossRateCell)
      calculateCost(consumedNumCell.textContent, item.cost, spplmAmtCell.querySelector('input').value, costCell)
      calculateRequiredNum(item.foodId, requiredNumCell, stockCell.querySelector('input').value, insufficientNumCell)
    });
  } catch (error) {
    console.error('Error:', error);
  }
  calculateInfo()
}


//　inventory_historyテーブルに追加するデータ取得
async function confirmInventory() {
  const tableBody = document.getElementById("newInventoryTable")
  const record = Array.from(tableBody.children)
  record.forEach(elm => {
    const spplmNum = elm.children[3].querySelector("input").value
    const spplmAmt = elm.children[4].querySelector("input").value
    const wasteNum = elm.children[5].querySelector("input").value
    const foodId = elm.querySelector("#foodId").textContent
    submitInventory(foodId, spplmNum, spplmAmt, wasteNum);
  })
}

//　inventory_historyテーブルに追加
async function submitInventory(foodId, spplmNum, spplmAmt, wasteNum) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  try {
    const response = await fetch(`http://localhost:8080/inventory`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodId: foodId,
        day: formattedDate,
        spplmNum: spplmNum,
        spplmAmt: spplmAmt,
        wasteNum: wasteNum
      })
    })
    if(!response.ok)
    throw new Error('POST request failed');
  } catch(e) {
    console.error(e)
    //　レコード重複により、POSTできなかった時にはPUTを行う
    try {
      const response = await fetch(`http://localhost:8080/inventory`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          foodId: foodId,
          day: formattedDate,
          spplmNum: spplmNum,
          spplmAmt: spplmAmt,
          wasteNum: wasteNum
        })
      })
     if(!response.ok) {
       throw new Error('PUT request failed')
      }
    } catch (e) {
      console.error(e)
    }
  }
}

async function confirmStock() {
  const tableBody = document.getElementById("newInventoryTable")
  const record = Array.from(tableBody.children)
  record.forEach(elm => {
    const stock = parseInt(elm.children[2].querySelector("input").value)
    const consumedNum = parseInt(elm.children[6].textContent)
    const insufficientNum = parseInt(elm.children[7].textContent)
    const requiredNum = parseInt(elm.children[8].textContent)
    const cost = parseInt(elm.children[9].textContent)
    const wasteAmt = parseInt(elm.children[10].textContent)
    const lossRate = parseInt(elm.children[11].textContent)
    const foodId = elm.querySelector("#foodId").textContent
    submitStock(foodId, stock, consumedNum, insufficientNum, requiredNum, cost, wasteAmt, lossRate);
  })
}

async function submitStock(foodId, stock, consumedNum, insufficientNum, requiredNum, cost, wasteAmt, lossRate) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  try {
    const response = await fetch(`http://localhost:8080/stock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodId: foodId,
        day: formattedDate,
        stock: stock,
        consumedNum: consumedNum,
        insufficientNum: insufficientNum,
        requiredNum: requiredNum,
        cost: cost,
        wasteAmt: wasteAmt,
        lossRate: lossRate
      })
    })
    if(!response.ok)
    throw new Error('POST request failed');
  } catch(e) {
    console.error(e)
    try {
      const response = await fetch(`http://localhost:8080/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          foodId: foodId,
          day: formattedDate,
          stock: stock,
          consumedNum: consumedNum,
          insufficientNum: insufficientNum,
          requiredNum: requiredNum,
          cost: cost,
          wasteAmt: wasteAmt,
          lossRate: lossRate
        })
      })
      if(!response.ok) {
        throw new Error('PUT request failed')
      }
    } catch(e) {
      console.log(e)
    }
  }
}
