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
      checkBox.type = "checkbox";
      checkBox.setAttribute("class", "checkbox");
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

      const insNumCell = document.createElement('td');
      insNumCell.textContent = item.insNum;
      row.appendChild(insNumCell);

      const insInsufficientCell = document.createElement('td');
      insInsufficientCell.textContent = item.insInsufficient;
      row.appendChild(insInsufficientCell);

      const orderDayCell = document.createElement('td');
      orderDayCell.textContent = item.impDay;
      orderDayCell.setAttribute("id", "day")
      row.appendChild(orderDayCell);

      const insDayCell = document.createElement('td');
      insDayCell.textContent = item.insDay;
      row.appendChild(insDayCell);

      const foodIdCell = document.createElement('td');
      foodIdCell.textContent = item.foodId;
      foodIdCell.setAttribute("id", "foodId");
      foodIdCell.style.display = "none";
      row.appendChild(foodIdCell);

      //const dayCell = document.createElement('td');
      //dayCell = item.day;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

//　未検品テーブル表示
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

      const dayCell = document.createElement('td');
      dayCell.textContent = item.day;
      row.appendChild(dayCell);

      const insNumCell = document.createElement('td');
      insNumCell.appendChild(document.createElement("input"))
      insNumCell.querySelector("input").type = "number"
      insNumCell.querySelector("input").value = 0
      insNumCell.addEventListener("input", function() {
        calculateInsSuf(item.impNum, insNumCell.querySelector("input").value, insInsufficientCell)
      })
      row.appendChild(insNumCell);


      const insInsufficientCell = document.createElement('td');
      //insInsufficientCell.textContent = calculateInsSuf(item.impNum, insNumCell.querySelector("input").value, insInsufficientCell)
      row.appendChild(insInsufficientCell);


      const foodIdCell = document.createElement('td');
      foodIdCell.textContent = item.foodId;
      foodIdCell.setAttribute("id", "foodId");
      foodIdCell.style.display = "none";
      row.appendChild(foodIdCell);


      const button = document.createElement('button');
      button.textContent = "決定"
      button.onclick = function() {
        submitInspection(item.foodId, insNumCell.querySelector("input").value, insInsufficientCell.textContent)
      }
      row.appendChild(button)

      tableBody.appendChild(row);

      calculateInsSuf(item.impNum, insNumCell.querySelector("input").value, insInsufficientCell)
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

//　過不足計算
function calculateInsSuf(impNum, insNum, cell) {
  cell.textContent = impNum - insNum
}

//　データ追加
async function submitInspection(foodId, insNum, insInsufficient) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  try {
    // データベースへの接続と発注情報の登録
    const response = await fetch('http://localhost:8080/inspect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foodId: foodId,
        day: formattedDate,
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
  document.getElementById('newInspectionTable').innerHTML = "";
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
      impNumCell.textContent = data.impNum;
      impNumCell.setAttribute("id", "impNum");
      row.appendChild(impNumCell);

      const impDayCell = document.createElement('td');
      impDayCell.textContent = data.impDay;
      impDayCell.setAttribute("id", "impDay")
      row.appendChild(impDayCell);

      const insNumCell = document.createElement('td');
      insNumCell.appendChild(document.createElement("input"));
      insNumCell.querySelector('input').value = data.insNum;
      insNumCell.querySelector('input').setAttribute("id", "insNum");
      insNumCell.querySelector('input').type = "number"
      insNumCell.addEventListener("input", function() {
        calculateInsSuf(data.impNum, insNumCell.querySelector("input").value, insInsufficientCell)
      })
      row.appendChild(insNumCell);

      const insInsufficientCell = document.createElement('td');
      insInsufficientCell.textContent = data.insInsufficient;
      insInsufficientCell.setAttribute("id", "insInsufficient")
      row.appendChild(insInsufficientCell);

      const insDayCell = document.createElement('td');
      insDayCell.textContent = data.insDay;
      insDayCell.setAttribute("id", "insDay")
      row.appendChild(insDayCell);

      const foodIdCell = document.createElement('td');
      foodIdCell.textContent = data.foodId;
      foodIdCell.setAttribute("id", "foodId");
      foodIdCell.style.display = "none";
      row.appendChild(foodIdCell);

      //const dayCell = document.createElement('td');
      //dayCell = item.day;
      //row.appendChild(dayCell);
      
      tableBody.appendChild(row);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 検品数修正
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
        day: tableBody.children[i].querySelector("#insDay").textContent,
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