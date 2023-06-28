//　当日の経営情報取得・表示
async function getInformationTable() {
  const day = today()
  try {
    const response = await fetch(`http://localhost:8080/inventory/info/${day}`);
    const data = await response.json();
    const tableBody = document.getElementById("informationTable")
    tableBody.innerHTML = '';
    
    data.forEach(item => {
      const row = document.createElement('tr');
      
      const totalCell = document.createElement('td');
      totalCell.textContent = "総計"
      row.appendChild(totalCell);

      const costCell = document.createElement('td');
      costCell.textContent = item.cost;
      row.appendChild(costCell);

      const costRateCell = document.createElement('td');
      costRateCell.textContent = item.costRate;
      row.appendChild(costRateCell);

      const wasteAmtCell = document.createElement('td');
      wasteAmtCell.textContent = item.wasteAmt;
      row.appendChild(wasteAmtCell);

      const lossRateCell = document.createElement('td');
      lossRateCell.textContent = item.lossRate;
      row.appendChild(lossRateCell);

      const balanceCell = document.createElement('td');
      balanceCell.textContent = item.balance;
      row.appendChild(balanceCell);

      //const dayCell = document.createElement('td');
      //dayCell = item.day;
      //row.appendChild(dayCell);
  
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
  getInventoryTable()
}

//　食材毎の経営情報取得・表示
async function getInventoryTable() {
  const day = today()
  try {
    const response = await fetch(`http://localhost:8080/inventory/get/${day}`);
    const data = await response.json();
    const tableBody = document.getElementById('inventoryTable');
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
      const row = document.createElement('tr');

      const foodNameCell = document.createElement('td');
      foodNameCell.textContent = item.foodName;
      row.appendChild(foodNameCell);

      const consumedNumCell = document.createElement('td');
      consumedNumCell.textContent = item.consumedNum;
      row.appendChild(consumedNumCell);

      const costCell = document.createElement('td');
      costCell.textContent = item.costPrice;
      row.appendChild(costCell);

      const wasteNumCell = document.createElement('td');
      wasteNumCell.textContent = item.wasteNum;
      row.appendChild(wasteNumCell);

      const wasteAmtCell = document.createElement('td');
      wasteAmtCell.textContent = item.wasteAmt;
      row.appendChild(wasteAmtCell);

      const lossRateCell = document.createElement('td');
      lossRateCell.textContent = item.lossRate;
      row.appendChild(lossRateCell);

      const foodIdCell = document.createElement('td');
      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";
      foodIdCell.setAttribute("id", "foodID");
      row.appendChild(foodIdCell);

      //const dayCell = document.createElement('td');
      //dayCell = item.day;
      //row.appendChild(dayCell);
  
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}