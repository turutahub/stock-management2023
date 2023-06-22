// 検品テーブル表示
async function getInspectionTable() {
  try {
    const response = await fetch('http://localhost:8080/inspect');
    const data = await response.json();
    const tableBody = document.getElementById('inspectionTable');

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
      const insNumCell = document.createElement('td');
      const insInsufficientCell = document.createElement('td');
      const orderDayCell = document.createElement('td');
      const insDayCell = document.createElement('td');
      const foodIdCell = document.createElement('td');
      //const dayCell = document.createElement('td');

      checkBox.type = "checkbox";
      checkBox.setAttribute("class", "checkbox");
      foodNameCell.textContent = item.foodName;
      unitCell.textContent = item.unit;
      costCell.textContent = item.cost;
      expdaysCell.textContent = item.expDays;
      supplierCell.textContent = item.supplier;
      noteCell.textContent = item.note;
      impNumCell.textContent = item.impNum;
      orderDayCell.textContent = item.impDay;
      orderDayCell.setAttribute("id", "day")
      insNumCell.textContent = item.insNum;
      insInsufficientCell.textContent = item.insInsufficient;
      insDayCell.textContent = item.insDay;
      foodIdCell.textContent = item.foodId;
      foodIdCell.setAttribute("id", "foodId");
      foodIdCell.style.display = "none";
      //dayCell = item.day;

      row.appendChild(checkBox)
      row.appendChild(foodNameCell);
      row.appendChild(unitCell);
      row.appendChild(costCell);
      row.appendChild(expdaysCell);
      row.appendChild(supplierCell);
      row.appendChild(noteCell);
      row.appendChild(impNumCell);
      row.appendChild(orderDayCell);
      row.appendChild(insNumCell);
      row.appendChild(insInsufficientCell);
      row.appendChild(insDayCell);
      row.appendChild(foodIdCell);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getUnInspectedTable() {
  try {
    const response = await fetch('http://localhost:8080/inspect/get');
    const data = await response.json();
    const tableBody = document.getElementById('unInspectedTable');

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
      const dayCell = document.createElement('td');
      const insNumCell = document.createElement('td');
      const insInsufficientCell = document.createElement('td');
      const foodIdCell = document.createElement('td');
      const button = document.createElement('button');

      foodNameCell.textContent = item.foodName;
      unitCell.textContent = item.unit;
      costCell.textContent = item.cost;
      expdaysCell.textContent = item.expDays;
      supplierCell.textContent = item.supplier;
      noteCell.textContent = item.note;
      impNumCell.textContent = item.impNum;
      dayCell.textContent = item.day;
      insNumCell.appendChild(document.createElement("input"))
      insNumCell.querySelector("input").type = "number"
      insNumCell.querySelector("input").value = 0
      insNumCell.addEventListener("input", function() {
        calculateInsSuf(item.impNum, insNumCell.querySelector("input").value, insInsufficientCell)
      })
      insInsufficientCell.textContent = 0
      foodIdCell.textContent = item.foodId;
      foodIdCell.setAttribute("id", "foodId");
      foodIdCell.style.display = "none";
      button.textContent = "決定"
      button.onclick = function() {
        submitInspection(item.foodId, item.day, insNumCell.querySelector("input").value, insInsufficientCell.textContent)
      }
      

      row.appendChild(foodNameCell);
      row.appendChild(unitCell);
      row.appendChild(costCell);
      row.appendChild(expdaysCell);
      row.appendChild(supplierCell);
      row.appendChild(noteCell);
      row.appendChild(impNumCell);
      row.appendChild(dayCell);
      row.appendChild(insNumCell);
      row.appendChild(insInsufficientCell);
      row.appendChild(foodIdCell);
      row.appendChild(button)
      
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function calculateInsSuf(impNum, insNum, cell) {
  cell.textContent = impNum - insNum
}

async function submitInspection(foodId, day, insNum, insInsufficient) {
  try {
    // データベースへの接続と発注情報の登録
    const response = await fetch('http://localhost:8080/inspect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodId: foodId,
        day: day,
        insNum: insNum,
        insInsufficient: insInsufficient
      })
  })
  } catch(e) {
    console.error()
  }
  getUnInspectedTable()
}

// チェックされたレコードのfoodId取得
function displayCheckedIns() {
  document.querySelectorAll(".checkbox").forEach(checkbox => {
    if (checkbox.checked) {
      const row = checkbox.closest("tr");
      fetchCheckedIns(row.querySelector("#foodId").textContent, row.querySelector("#day").textContent)
    }
  });
}

// チェックされたレコードをDBから取得
async function fetchCheckedIns(foodId, day) {
  try {
    const response = await fetch(`http://localhost:8080/inspect/${foodId}/${day}`);
    const data = await response.json();
    const tableBody = document.getElementById('newInspectionTable');

      const row = document.createElement('tr');

      const foodNameCell = document.createElement('td');
      const unitCell = document.createElement('td');
      const costCell = document.createElement('td');
      const expdaysCell = document.createElement('td');
      const supplierCell = document.createElement('td');
      const noteCell = document.createElement('td');
      const impNumCell = document.createElement('td');
      const impDayCell = document.createElement('td');
      const insNumCell = document.createElement('td');
      const insInsufficientCell = document.createElement('td');
      const insDayCell = document.createElement('td');
      const foodIdCell = document.createElement('td');
      //const dayCell = document.createElement('td');

      foodNameCell.textContent = data.foodName;
      unitCell.textContent = data.unit;
      costCell.textContent = data.cost;
      expdaysCell.textContent = data.expDays;
      supplierCell.textContent = data.supplier;
      noteCell.textContent = data.note;
      impNumCell.textContent = data.impNum;
      impNumCell.setAttribute("id", "impNum");
      impDayCell.textContent = data.impDay;
      impDayCell.setAttribute("id", "impDay")
      insNumCell.appendChild(document.createElement("input"));
      insNumCell.querySelector('input').value = data.insNum;
      insNumCell.querySelector('input').setAttribute("id", "insNum");
      insNumCell.querySelector('input').type = "number"
      insNumCell.addEventListener("input", function() {
        calculateInsSuf(data.impNum, insNumCell.querySelector("input").value, insInsufficientCell)
      })

      insInsufficientCell.textContent = 0;
      insInsufficientCell.setAttribute("id", "insInsufficient")
      insDayCell.textContent = data.insDay;
      foodIdCell.textContent = data.foodId;
      foodIdCell.setAttribute("id", "foodId");
      foodIdCell.style.display = "none";
      //dayCell = item.day;

      row.appendChild(foodNameCell);
      row.appendChild(unitCell);
      row.appendChild(costCell);
      row.appendChild(expdaysCell);
      row.appendChild(supplierCell);
      row.appendChild(noteCell);
      row.appendChild(impNumCell);
      row.appendChild(impDayCell);
      row.appendChild(insNumCell);
      row.appendChild(insInsufficientCell);
      row.appendChild(insDayCell);
      row.appendChild(foodIdCell);
      //row.appendChild(dayCell);
      tableBody.appendChild(row);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 検品メソッド
async function modifyInspection() {
  const tableBody = document.getElementById('newInspectionTable');
  try {
    for(i=0;i<tableBody.children.length;i++){
    // データベースへの接続と発注情報の登録
    const response = await fetch('http://localhost:8080/inspect', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodId: tableBody.children[i].querySelector("#foodId").textContent,
        day: tableBody.children[i].querySelector("#impDay").textContent,
        insNum: tableBody.children[i].querySelector("#insNum").value,
        insInsufficient: tableBody.children[i].querySelector("#insInsufficient").textContent
      })
    });
  }
  } catch(e) {
    console.error()
  }
  document.getElementById('newInspectionTable').innerHTML = ""
  getInspectionTable();
}







  // 検品結果の保存
  async function saveInspectionResult(product, status) {
    try {
      const response = await fetch('/saveInspectionResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          status: status
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('検品結果が保存されました:', data);
        // 保存成功時の処理を追加する
      } else {
        console.error('検品結果の保存エラー:', response.status);
        // エラーを追加
      }
    } catch (error) {
      console.error('検品結果の保存エラー:', error);
      // エラーを追加
    }
  }


/*
// 商品情報の表示
function displayProductDetails(product) {
    const productNameElement = document.getElementById('product-name');
    const productCodeElement = document.getElementById('product-code');
    const quantityElement = document.getElementById('quantity');
    const categoryElement = document.getElementById('category');
    const locationElement = document.getElementById('location');
  
    productNameElement.textContent = product.name;
    productCodeElement.textContent = product.code;
    quantityElement.textContent = product.quantity;
    categoryElement.textContent = product.category;
    locationElement.textContent = product.location;
  }
  
  // 在庫数量の確認
  function checkStockQuantity(product, quantityToCheck) {
    const actualQuantity = product.quantity;
    const expectedQuantity = parseInt(quantityToCheck, 10);
  
    if (actualQuantity === expectedQuantity) {
      // 在庫数量一致の処理を実行
      console.log('在庫数量が一致しています');
    } else {
      // 在庫数量不一致の処理を実行
      console.log('在庫数量が一致しません');
    }
  }
  
  // 検品ステータスの設定
  function setInspectionStatus(status) {
    // 検品ステータスの設定処理を実行
    console.log('検品ステータスが設定されました:', status);
  }
  

  
  // 検品履歴の表示
  async function displayInspectionHistory() {
    try {
      const response = await fetch('/getInspectionHistory');
      if (response.ok) {
        const history = await response.json();
        // 検品履歴の表示処理を実行する
        console.log('検品履歴:', history);
      } else {
        console.error('検品履歴の取得エラー:', response.status);
        // エラーを追加
      }
    } catch (error) {
      console.error('検品履歴の取得エラー:', error);
      // エラーを追加
    }
  }
  */