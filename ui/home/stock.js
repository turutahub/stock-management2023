// 在庫一覧を取得して表示する関数
async function getStockTable() {
  try {
    const response = await fetch('http://localhost:8080/stock');
    const data = await response.json();
    const tableBody = document.getElementById('stockTable');

    // テーブルの内容をクリア
    tableBody.innerHTML = '';

    // 在庫データをテーブルに追加
    data.forEach(item => {
      const row = document.createElement('tr');

      //const foodIdCell = document.createElement('td');
      //const dayCell = document.createElement('td');
      const foodNameCell = document.createElement('td');
      const insufficientNumCell = document.createElement('td');
      const impNumCell = document.createElement('td');
      const deliveryDayCell = document.createElement('td');
      const stockCell = document.createElement('td');
      const requiredNumCell = document.createElement('td');
      const expDaysCell = document.createElement('td');

      //foodIdCell.textContent = item.foodId;
      //dayCell.textContent = item.day;
      foodNameCell.textContent = item.foodName;
      insufficientNumCell.textContent = item.insufficientNum;
      impNumCell.textContent = replaceImpNum(item.day, item.impNum);
      deliveryDayCell.textContent = checkOrderDay(item.day);
      stockCell.textContent = item.stock;
      requiredNumCell.textContent = item.requiredNum;
      expDaysCell.textContent = item.expdays;

      //row.appendChild(foodIdCell);
      //row.appendChild(dayCell);
      row.appendChild(foodNameCell);
      row.appendChild(insufficientNumCell);
      row.appendChild(impNumCell);
      row.appendChild(deliveryDayCell);
      row.appendChild(stockCell);
      row.appendChild(requiredNumCell);
      row.appendChild(expDaysCell);
      
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function checkOrderDay(impDay) {
  const today = new Date(); // 今日の日付
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`; 
  if(impDay >= formattedDate) {
    return impDay
  } else {
    return "-"
  }
}

function replaceImpNum(impDay, impNum) {
  const today = new Date(); // 今日の日付
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`; 
  if(impDay >= formattedDate) {
    return impNum
  } else {
    return 0
  }
}