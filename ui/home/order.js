// 発注テーブル表示
async function getOrderTable() {
  try {
    const response = await fetch('http://localhost:8080/order');
    const data = await response.json();
    const tableBody = document.getElementById('orderTable');

    // テーブルの内容をクリア
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');

      const foodNameCell = document.createElement('td');
      const unitCell = document.createElement('td');
      const costCell = document.createElement('td');
      const expdaysCell = document.createElement('td');
      const supplierCell = document.createElement('td');
      const noteCell = document.createElement('td');
      const impNumCell = document.createElement('td');
      const deliveryDayCell = document.createElement('td');
      const foodIdCell = document.createElement('td');
      //const dayCell = document.createElement('td');

      foodNameCell.textContent = item.foodName;
      unitCell.textContent = item.unit;
      costCell.textContent = item.cost;
      expdaysCell.textContent = item.expDays;
      supplierCell.textContent = item.supplier;
      noteCell.textContent = item.note;
      impNumCell.textContent = item.impNum;
      deliveryDayCell.textContent = item.deliveryDay;
      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";
      //dayCell = item.day;

      row.appendChild(foodNameCell);
      row.appendChild(unitCell);
      row.appendChild(costCell);
      row.appendChild(expdaysCell);
      row.appendChild(supplierCell);
      row.appendChild(noteCell);
      row.appendChild(impNumCell);
      row.appendChild(deliveryDayCell);
      row.appendChild(foodIdCell);
      //row.appendChild(dayCell);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
// 新規発注テーブル表示
async function getOrder() {
  try {
    const response = await fetch('http://localhost:8080/order/get');
    const data = await response.json();
    const tableBody = document.getElementById('newOrderTable');

    // テーブルの内容をクリア
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');

      const foodNameCell = document.createElement('td');
      const unitCell = document.createElement('td');
      const costCell = document.createElement('td');
      const expdaysCell = document.createElement('td');
      const supplierCell = document.createElement('td');
      const noteCell = document.createElement('td');
      const impNumCell = document.createElement('td');
      const deliveryDayCell = document.createElement('td');
      const foodIdCell = document.createElement('td');
      const orderButton = document.createElement("button");
      //const dayCell = document.createElement('td');


      foodNameCell.textContent = item.foodName;
      unitCell.textContent = item.unit;
      costCell.textContent = item.cost;
      expdaysCell.textContent = item.expDays;
      supplierCell.textContent = item.supplier;
      noteCell.textContent = item.note;

      //impNumCell.textContent = item.impNum;
      impNumCell.appendChild(document.createElement("input"));

      //deliveryDayCell.textContent = item.deliveryDay;
      deliveryDayCell.appendChild(document.createElement("input"));
      deliveryDayCell.querySelector('input').type = 'date'

      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";

      orderButton.innerHTML = "発注";
      orderButton.onclick = function() {
        registerOrder(foodIdCell.innerHTML, impNumCell.querySelector('input').value, deliveryDayCell.querySelector('input').value);
      }
      //dayCell = item.day;

      row.appendChild(foodNameCell);
      row.appendChild(unitCell);
      row.appendChild(costCell);
      row.appendChild(expdaysCell);
      row.appendChild(supplierCell);
      row.appendChild(noteCell);
      row.appendChild(impNumCell);
      row.appendChild(deliveryDayCell);
      row.appendChild(foodIdCell);
      row.appendChild(orderButton)
      //row.appendChild(dayCell);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function registerOrder(foodId, impNum, deliveryDay) {
  //console.log(foodId, impNum, deliveryDay);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  try {
    // データベースへの接続と発注情報の登録
    const response = await fetch('http://localhost:8080/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodId: foodId,
        day: formattedDate,
        impNum: impNum,
        deliveryDay: deliveryDay
      })
    });
    getOrder()
  } catch(e) {
    console.error()
  }
}
  


/*
// 発注処理を実行する関数
async function registerOrder() {
  try {
    // データベースへの接続と発注情報の登録
    const response = await fetch('/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName: productName,
        quantity: quantity,
        price: price
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('発注が登録されました:', data);
      // 登録成功時の処理
    } else {
      console.error('発注登録エラー:', response.status);
      // エラーを追加
    }
  } catch (error) {
    console.error('発注登録エラー:', error);
    // エラーを追加
  }
}*/

/*
// 発注情報をデータベースで更新する関数
async function updateOrder(orderId, updatedData) {
  try {
    // データベースで発注情報を更新
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('発注が更新されました:', data);
      // 更新成功時の処理
    } else {
      console.error('発注更新エラー:', response.status);
      // エラー
    }
  } catch (error) {
    console.error('発注更新エラー:', error);
    // エラーを追加
  }
}*/

/*
// 発注情報をデータベースから削除する関数
async function deleteOrder(orderId) {
  try {
    // データベースから発注情報を削除
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log('発注が削除されました');
      // 削除成功時の処理
    } else {
      console.error('発注削除エラー:', response.status);
      // エラーを追加
    }
  } catch (error) {
    console.error('発注削除エラー:', error);
    // エラーを追加
  }
}*/


