// 在庫マスタを取得して表示する関数
async function getInventoryList() {
  try {
    const response = await fetch('http://localhost:8080/register');
    const data = await response.json();
    const tableBody = document.getElementById('registerTable');

    // テーブルの内容をクリア
    tableBody.innerHTML = '';

    document.querySelectorAll("#register form input").forEach((input) => {
      input.value = "";
    });

    // 取得したデータをテーブルに追加
    data.forEach((item) => {
      const row = document.createElement('tr');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.setAttribute('name', 'inventoryItem');
      checkbox.value = item.foodId;
      row.appendChild(checkbox);

      const foodNameCell = document.createElement('td');
      foodNameCell.textContent = item.foodName;
      row.appendChild(foodNameCell);

      const unitCell = document.createElement('td');
      unitCell.textContent = item.unit;
      row.appendChild(unitCell);

      const costCell = document.createElement('td');
      costCell.textContent = item.cost;
      row.appendChild(costCell);

      const expDaysCell = document.createElement('td');
      expDaysCell.textContent = item.expDays;
      row.appendChild(expDaysCell);

      const supplierCell = document.createElement('td');
      supplierCell.textContent = item.supplier;
      row.appendChild(supplierCell);

      const noteCell = document.createElement('td');
      noteCell.textContent = item.note;
      row.appendChild(noteCell);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('在庫一覧の取得エラー:', error);
    // エラー処理
  }
}

// 選択された在庫の基本情報を取得して表示する関数
function showSelectedInventory() {
  const selectedInventory = document.querySelectorAll('input[name="inventoryItem"]:checked');
    selectedInventory.forEach(elm => {
      getFoodById(elm.value);
  })
}

async function getFoodById(foodId) {
  try {
    const response = await fetch(`http://localhost:8080/register/${foodId}`);
    const data = await response.json();
    const tableBody = document.getElementById("modifyRegisterTable")

    const row = document.createElement('tr');

    const foodNameCell = document.createElement('td');
    foodNameCell.appendChild(document.createElement('input'))
    foodNameCell.querySelector("input").value = data.foodName;
    row.appendChild(foodNameCell);

    const unitCell = document.createElement('td');
    unitCell.appendChild(document.createElement('input'))
    unitCell.querySelector("input").value = data.unit;
    row.appendChild(unitCell);

    const costCell = document.createElement('td');
    costCell.appendChild(document.createElement('input'))
    costCell.querySelector("input").value = data.cost;
    costCell.querySelector("input").type = "number"
    row.appendChild(costCell);

    const expDaysCell = document.createElement('td');
    expDaysCell.appendChild(document.createElement('input'))
    expDaysCell.querySelector("input").value = data.expDays;
    expDaysCell.querySelector("input").type = "number"
    row.appendChild(expDaysCell);

    const supplierCell = document.createElement('td');
    supplierCell.appendChild(document.createElement('input'))
    supplierCell.querySelector("input").value = data.supplier;
    row.appendChild(supplierCell);

    const noteCell = document.createElement('td');
    noteCell.appendChild(document.createElement('input'))
    noteCell.querySelector("input").value = data.note;
    row.appendChild(noteCell);

    const foodIdCell = document.createElement('td');
    foodIdCell.textContent = data.foodId
    foodIdCell.style.display = "none"
    row.appendChild(foodIdCell)

    tableBody.appendChild(row);

  } catch (error) {
    console.error('食材情報の取得エラー:', error);
    // エラー処理
  }
}


function modify() {
  const tableBody = document.getElementById("modifyRegisterTable")
  const record = tableBody.querySelectorAll("tr")
  record.forEach(elm => {
    const foodId = elm.children[6].textContent
    const foodName = elm.children[0].querySelector("input").value
    const unit = elm.children[1].querySelector("input").value
    const cost = elm.children[2].querySelector("input").value
    const expDays = elm.children[3].querySelector("input").value
    const supplier = elm.children[4].querySelector("input").value
    const note = elm.children[5].querySelector("input").value
    console.log(foodId, foodName, unit, cost, expDays, supplier, note)
    modifyInventory(foodId, foodName, unit, cost, expDays, supplier, note)
  })
}
  
async function modifyInventory(foodId, foodName, unit, cost, expDays, supplier, note) {
  try {
    const response = await fetch(`http://localhost:8080/register/${foodId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodName: foodName,
        unit: unit,
        cost: cost,
        expDays: expDays,
        supplier: supplier,
        note: note
      })
    });
  } catch (error) {
    console.error('商品修正エラー:', error);
    // エラー処理
  }
  getInventoryList();
  document.getElementById("modifyRegisterTable").innerHTML = ""
}




// 商品登録処理を実行する関数
async function registerProduct(form) {
  try {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodName: form.foodName.value,
        unit: form.unit.value,
        cost: parseInt(form.cost.value),
        expDays: parseInt(form.expDays.value),
        supplier: form.supplier.value,
        note: form.note.value
      })
    });

    /*if (response.ok) {
      const data = await response.json();
      console.log('商品が登録されました:', data);
      // 登録成功時の処理
    } else {
      console.error('商品登録エラー:', response.status);
      // エラー処理
    }*/
  } catch (error) {
    console.error('商品登録エラー:', error);
    // エラー処理
  }
  getInventoryList();
}