// 在庫マスタを取得して表示する関数
async function getInventoryList() {
  try {
    const response = await fetch('http://localhost:8080/register');
    const data = await response.json();
    const tableBody = document.getElementById('registertable');

    // テーブルの内容をクリア
    tableBody.innerHTML = '';

    // 取得したデータをテーブルに追加
    data.forEach((item) => {
      const row = document.createElement('tr');

      const productNameCell = document.createElement('td');
      productNameCell.textContent = item.foodName;
      row.appendChild(productNameCell);

      const productCodeCell = document.createElement('td');
      productCodeCell.textContent = item.unit;
      row.appendChild(productCodeCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = item.expDays;
      row.appendChild(quantityCell);

      const priceCell = document.createElement('td');
      priceCell.textContent = item.cost;
      row.appendChild(priceCell);

      const categoryCell = document.createElement('td');
      categoryCell.textContent = item.supplier;
      row.appendChild(categoryCell);

      const locationCell = document.createElement('td');
      locationCell.textContent = item.note;
      row.appendChild(locationCell);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('在庫一覧の取得エラー:', error);
    // エラー処理
  }
}

// 商品登録処理を実行する関数
async function registerProduct(productName, productCode, quantity, price, category, location) {
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodName: productName,
        unit: productCode,
        cost: price,
        expdays: quantity,
        supplier: category,
        note: location
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('商品が登録されました:', data);
      // 登録成功時の処理
    } else {
      console.error('商品登録エラー:', response.status);
      // エラー処理
    }
  } catch (error) {
    console.error('商品登録エラー:', error);
    // エラー処理
  }
}