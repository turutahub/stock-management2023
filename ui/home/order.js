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
      const foodNameCell = document.createElement('td');
      const unitCell = document.createElement('td');
      const costCell = document.createElement('td');
      const expdaysCell = document.createElement('td');
      const supplierCell = document.createElement('td');
      const noteCell = document.createElement('td');
      const impNumCell = document.createElement('td');
      const deliveryDayCell = document.createElement('td');
      const dayCell = document.createElement('td');
      const foodIdCell = document.createElement('td');

      checkBox.type = "checkbox"
      checkBox.setAttribute("id", "checkBox");
      foodNameCell.textContent = item.foodName;
      unitCell.textContent = item.unit;
      costCell.textContent = item.cost;
      expdaysCell.textContent = item.expDays;
      supplierCell.textContent = item.supplier;
      noteCell.textContent = item.note;
      impNumCell.textContent = item.impNum;
      deliveryDayCell.textContent = item.deliveryDay;
      dayCell.textContent = item.day;
      dayCell.setAttribute("id", "day")
      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";
      foodIdCell.setAttribute("id", "foodID");


      row.appendChild(checkBox)
      row.appendChild(foodNameCell);
      row.appendChild(unitCell);
      row.appendChild(costCell);
      row.appendChild(expdaysCell);
      row.appendChild(supplierCell);
      row.appendChild(noteCell);
      row.appendChild(impNumCell);
      row.appendChild(deliveryDayCell);
      row.appendChild(dayCell);
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
      impNumCell.appendChild(document.createElement("input"));
      deliveryDayCell.appendChild(document.createElement("input"));
      deliveryDayCell.querySelector('input').type = 'date'
      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";
      //dayCell = item.day;

      orderButton.innerHTML = "発注";
      orderButton.onclick = function() {
        registerOrder(foodIdCell.innerHTML, impNumCell.querySelector('input').value, deliveryDayCell.querySelector('input').value);
      }
      
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

// 発注メソッド
async function registerOrder(foodId, impNum, deliveryDay) {
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

// チェックされたレコードのfoodId取得
function displayCheckedOrder() {
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
    const unitCell = document.createElement('td');
    const costCell = document.createElement('td');
    const expdaysCell = document.createElement('td');
    const supplierCell = document.createElement('td');
    const noteCell = document.createElement('td');
    const impNumCell = document.createElement('td');
    const deliveryDayCell = document.createElement('td');
    const foodIdCell = document.createElement('td');
    const dayCell = document.createElement('td');

    foodNameCell.textContent = data.foodName;
    unitCell.textContent = data.unit;
    costCell.textContent = data.cost;
    expdaysCell.textContent = data.expDays;
    supplierCell.textContent = data.supplier;
    noteCell.textContent = data.note;
    impNumCell.appendChild(document.createElement("input"));
    impNumCell.querySelector('input').value = data.impNum;
    impNumCell.querySelector('input').setAttribute("id", "impNum");
    deliveryDayCell.appendChild(document.createElement("input"));
    deliveryDayCell.querySelector('input').type = 'date'
    deliveryDayCell.querySelector('input').value = data.deliveryDay;
    deliveryDayCell.querySelector('input').setAttribute("id", "deliveryDay");
    foodIdCell.textContent = data.foodId;
    foodIdCell.style.display = "none";
    foodIdCell.setAttribute("id", "foodId");
    dayCell.textContent = data.day;
    dayCell.setAttribute("id", "day")

    row.appendChild(foodNameCell);
    row.appendChild(unitCell);
    row.appendChild(costCell);
    row.appendChild(expdaysCell);
    row.appendChild(supplierCell);
    row.appendChild(noteCell);
    row.appendChild(impNumCell);
    row.appendChild(deliveryDayCell);
    row.appendChild(foodIdCell);
    row.appendChild(dayCell);

    tableBody.appendChild(row);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// 発注修正メソッド
async function modifyOrder() {
  const tableBody = document.getElementById('modifyOrderTable');
  /*const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;*/
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
