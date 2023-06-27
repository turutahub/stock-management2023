//　原価計算
function calculateCostInfo(cell) {
  const cost = document.querySelectorAll("#cost")
  let sum = 0;
  cost.forEach(elm => {
    sum += parseInt(elm.textContent)  
  })
  cell.textContent = sum
}
//　原価率計算
function calculateCostRateInfo(cost, sales, cell) {
  if(cost==="0" || sales===0) {
    cell.textContent = 0
  } else {
  cell.textContent = parseInt(cost)/sales * 100
  }
}

//廃棄額計算
function calculateWasteAmtInfo(cell) {
  const wasteAmt = document.querySelectorAll("#wasteAmt")
  let sum = 0;
  wasteAmt.forEach(elm => {
    sum += parseInt(elm.textContent)
  })
  cell.textContent = sum
}

//　ロス率計算
function calculateLossRateInfo(wasteAmt, sales, cell) {
  if(wasteAmt==="0" || sales ===0) {
    cell.textContent = 0
  } else {
  cell.textContent = parseInt(wasteAmt)/sales * 100
  }
}

//　収支計算
function calculateBalanceInfo(sales, cost, wasteAmt, cell) {
  cell.textContent = sales - cost - wasteAmt
}





//　消費数計算
async function calculateConsumedNum(foodId, stock, wasteNum, cell) {
  const insNum = await fetchInsNum(foodId);
  cell.textContent = insNum - stock - wasteNum
}
  
//　廃棄額計算
function calculateWasteAmt(cost, wasteNum, cell) {
  cell.textContent = wasteNum * cost
}
  
//　ロス率計算
async function calculateLossRate(foodId, wasteNum, cell) {
  const insNum = await fetchInsNum(foodId);
  if (insNum !== 0) {
    cell.textContent = wasteNum / insNum;
  } else {
    cell.textContent = 0 ; // ゼロで割り算が発生する場合の代替値
  }
}
  
//　原価計算
function calculateCost(consumedNum, cost, spplmAmt, costCell) {
  costCell.textContent = (consumedNum * cost + parseInt(spplmAmt));
}
  
  
//　当日の検品数取得（DBから)
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
  
//　前日の在庫取得(DBから)
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
  
//　必要数計算
async function calculateRequiredNum(foodId, cell, stock, insufficientNumCell) {
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
  const requiredNum = await outputRequiredNum(foodId, date, pastWeekDates)
  cell.textContent = requiredNum
  insufficientNumCell.textContent = requiredNum - stock
}

async function outputRequiredNum(foodId, date, pastWeekDates) {
  let sum = 0;
  try {
    for (const date of pastWeekDates) {
      const result = await fetchPastConsumedNum(foodId, date);
      sum += result
    }
    return sum/4;
  } catch (error) {
    console.error(error);
  }
}


//　過去の消費数取得
async function fetchPastConsumedNum(foodId, date) {
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

//　不足数計算
function calculateInsSuf(requiredNum, stock, cell) {
  cell.textContent = requiredNum - stock
}


 
  