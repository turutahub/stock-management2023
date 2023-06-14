// 在庫一覧を取得して表示する関数
async function getInventoryList() {
  try {
    const response = await fetch('/stock');
    const data = await response.json();
    const tableBody = document.getElementById('tableBody');

    // テーブルの内容をクリア
    tableBody.innerHTML = '';

    // 在庫データをテーブルに追加
    data.forEach(item => {
      const row = document.createElement('tr');
      const foodIdCell = document.createElement('td');
      const dayCell = document.createElement('td');
      const stockCell = document.createElement('td');
      const consumedNumCell = document.createElement('td');
      const insufficientNumCell = document.createElement('td');
      const requiredNumCell = document.createElement('td');
      const costCell = document.createElement('td');
      const wasteAmtCell = document.createElement('td');
      const lossRateCell = document.createElement('td');

      foodIdCell.textContent = item.foodId;
      dayCell.textContent = item.day;
      stockCell.textContent = item.stock;
      consumedNumCell.textContent = item.consumedNum;
      insufficientNumCell.textContent = item.insufficientNum;
      requiredNumCell.textContent = item.requiredNum;
      costCell.textContent = item.cost;
      wasteAmtCell.textContent = item.wasteAmt;
      lossRateCell.textContent = item.lossRate;

      row.appendChild(foodIdCell);
      row.appendChild(dayCell);
      row.appendChild(stockCell);
      row.appendChild(consumedNumCell);
      row.appendChild(insufficientNumCell);
      row.appendChild(requiredNumCell);
      row.appendChild(costCell);
      row.appendChild(wasteAmtCell);
      row.appendChild(lossRateCell);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// 在庫一覧を取得して表示
getInventoryList();