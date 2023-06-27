// 発注済み商品テーブル表示
async function getOrderTable() {
  try {
    const response = await fetch('http://localhost:8080/order');
    const data = await response.json();
    const tableBody = document.getElementById('orderTable');

    // テーブルの内容をクリア
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');

      const checkBox = document.createElement('input');
      checkBox.type = "checkbox"
      checkBox.setAttribute("id", "checkBox");
      row.appendChild(checkBox)

      const foodNameCell = document.createElement('td');
      foodNameCell.textContent = item.foodName;
      row.appendChild(foodNameCell);

      const unitCell = document.createElement('td');
      unitCell.textContent = item.unit;
      row.appendChild(unitCell);
      
      const costCell = document.createElement('td');
      costCell.textContent = item.cost;
      row.appendChild(costCell);

      const expdaysCell = document.createElement('td');
      expdaysCell.textContent = item.expDays;
      row.appendChild(expdaysCell);

      const supplierCell = document.createElement('td');
      supplierCell.textContent = item.supplier;
      row.appendChild(supplierCell);

      const noteCell = document.createElement('td');
      noteCell.textContent = item.note;
      row.appendChild(noteCell);

      const impNumCell = document.createElement('td');
      impNumCell.textContent = item.impNum;
      row.appendChild(impNumCell);

      const deliveryDayCell = document.createElement('td');
      deliveryDayCell.textContent = item.deliveryDay;
      row.appendChild(deliveryDayCell);

      const dayCell = document.createElement('td');
      dayCell.textContent = item.day;
      dayCell.setAttribute("id", "day")
      row.appendChild(dayCell);

      const foodIdCell = document.createElement('td');
      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";
      foodIdCell.setAttribute("id", "foodID");
      row.appendChild(foodIdCell);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// 未発注テーブル表示
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
      foodNameCell.textContent = item.foodName;
      row.appendChild(foodNameCell);

      const unitCell = document.createElement('td');
      unitCell.textContent = item.unit;
      row.appendChild(unitCell);

      const costCell = document.createElement('td');
      costCell.textContent = item.cost;
      row.appendChild(costCell);

      const expdaysCell = document.createElement('td');
      expdaysCell.textContent = item.expDays;
      row.appendChild(expdaysCell);

      const supplierCell = document.createElement('td');
      supplierCell.textContent = item.supplier;
      row.appendChild(supplierCell);

      const noteCell = document.createElement('td');
      noteCell.textContent = item.note;
      row.appendChild(noteCell);

      const impNumCell = document.createElement('td');
      impNumCell.appendChild(document.createElement("input"));
      row.appendChild(impNumCell);

      const deliveryDayCell = document.createElement('td');
      deliveryDayCell.appendChild(document.createElement("input"));
      deliveryDayCell.querySelector('input').type = 'date'
      row.appendChild(deliveryDayCell);

      const foodIdCell = document.createElement('td');
      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";
      row.appendChild(foodIdCell);

      const orderButton = document.createElement("button");
      orderButton.innerHTML = "発注";
      orderButton.onclick = function() {
        registerOrder(foodIdCell.innerHTML, impNumCell.querySelector('input').value, deliveryDayCell.querySelector('input').value);
      }
      row.appendChild(orderButton)

      //const dayCell = document.createElement('td');
      //dayCell = item.day;
      //row.appendChild(dayCell);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// 発注メソッド
async function registerOrder(foodId, impNum, deliveryDay) {
  try {
    // データベースへの接続と発注情報の登録
    const response = await fetch('http://localhost:8080/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodId: foodId,
        day: today(),
        impNum: impNum,
        deliveryDay: deliveryDay
      })
    });
    getOrder()
  } catch(e) {
    console.error()
  }
}

// チェックされたレコードのfoodId取得
function displayCheckedOrder() {
  document.getElementById("modifyOrderTable").innerHTML = "";
  document.querySelectorAll("#checkBox").forEach(checkbox => {
    if (checkbox.checked) {
      const row = checkbox.closest("tr");
      fetchCheckedOrder(row.querySelector("#foodId").textContent, row.querySelector("#day").textContent)
    }
  });
}

// チェックされたレコードをDBから取得
async function fetchCheckedOrder(foodId, day) {
  try {
    const response = await fetch(`http://localhost:8080/order/${foodId}/${day}`);
    const data = await response.json();
    const tableBody = document.getElementById("modifyOrderTable");
  
    const row = document.createElement('tr');

    const foodNameCell = document.createElement('td');
    foodNameCell.textContent = data.foodName;
    row.appendChild(foodNameCell);

    const unitCell = document.createElement('td');
    unitCell.textContent = data.unit;
    row.appendChild(unitCell);

    const costCell = document.createElement('td');
    costCell.textContent = data.cost;
    row.appendChild(costCell);

    const expdaysCell = document.createElement('td');
    expdaysCell.textContent = data.expDays;
    row.appendChild(expdaysCell);

    const supplierCell = document.createElement('td');
    supplierCell.textContent = data.supplier;
    row.appendChild(supplierCell);

    const noteCell = document.createElement('td');
    noteCell.textContent = data.note;
    row.appendChild(noteCell);

    const impNumCell = document.createElement('td');
    impNumCell.appendChild(document.createElement("input"));
    impNumCell.querySelector('input').value = data.impNum;
    impNumCell.querySelector('input').setAttribute("id", "impNum");
    row.appendChild(impNumCell);

    const deliveryDayCell = document.createElement('td');
    deliveryDayCell.appendChild(document.createElement("input"));
    deliveryDayCell.querySelector('input').type = 'date'
    deliveryDayCell.querySelector('input').value = data.deliveryDay;
    deliveryDayCell.querySelector('input').setAttribute("id", "deliveryDay");
    row.appendChild(deliveryDayCell);

    const foodIdCell = document.createElement('td');
    foodIdCell.textContent = data.foodId;
    foodIdCell.style.display = "none";
    foodIdCell.setAttribute("id", "foodId");
    row.appendChild(foodIdCell);

    const dayCell = document.createElement('td');
    dayCell.textContent = data.day;
    dayCell.setAttribute("id", "day")
    row.appendChild(dayCell);

    tableBody.appendChild(row);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// 発注修正メソッド
async function modifyOrder() {
  const tableBody = document.getElementById('modifyOrderTable');
  try {
    for(i=0;i<tableBody.children.length;i++){
    // データベースへの接続と発注情報の登録
    const response = await fetch('http://localhost:8080/order', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodId: tableBody.children[i].querySelector("#foodId").textContent,
        day: tableBody.children[i].querySelector("#day").textContent,
        impNum: tableBody.children[i].querySelector("#impNum").value,
        deliveryDay: tableBody.children[i].querySelector("#deliveryDay").value
      })
    });
  }
  } catch(e) {
    console.error()
  }
  document.getElementById('modifyOrderTable').innerHTML = "";
  getOrderTable();
}
