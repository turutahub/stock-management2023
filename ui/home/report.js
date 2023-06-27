//　当日の経営情報取得・表示
async function getInformationTable() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  try {
    const response = await fetch(`http://localhost:8080/inventory/info/${formattedDate}`);
    const data = await response.json();
    const tableBody = document.getElementById("informationTable")
    tableBody.innerHTML = '';
    
    data.forEach(item => {
      const row = document.createElement('tr');
      
      const totalCell = document.createElement('td');
      const costCell = document.createElement('td');
      const costRateCell = document.createElement('td');
      const wasteAmtCell = document.createElement('td');
      const lossRateCell = document.createElement('td');
      const balanceCell = document.createElement('td');
      //const dayCell = document.createElement('td');
  

      totalCell.textContent = "総計"
      costCell.textContent = item.cost;
      costRateCell.textContent = item.costRate;
      wasteAmtCell.textContent = item.wasteAmt;
      lossRateCell.textContent = item.lossRate;
      balanceCell.textContent = item.balance;
      //dayCell = item.day;
  
      row.appendChild(totalCell);
      row.appendChild(costCell);
      row.appendChild(costRateCell);
      row.appendChild(wasteAmtCell);
      row.appendChild(lossRateCell);
      row.appendChild(balanceCell);
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
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  try {
    const response = await fetch(`http://localhost:8080/inventory/get/${formattedDate}`);
    const data = await response.json();
    const tableBody = document.getElementById('inventoryTable');
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
      const row = document.createElement('tr');

      const foodNameCell = document.createElement('td');
      const consumedNumCell = document.createElement('td');
      const costCell = document.createElement('td');
      const wasteNumCell = document.createElement('td');
      const wasteAmtCell = document.createElement('td');
      const lossRateCell = document.createElement('td');
      const foodIdCell = document.createElement('td');
      //const dayCell = document.createElement('td');
  
      foodNameCell.textContent = item.foodName;
      consumedNumCell.textContent = item.consumedNum;
      costCell.textContent = item.cost;
      wasteNumCell.textContent = item.wasteNum;
      wasteAmtCell.textContent = item.wasteAmt;
      lossRateCell.textContent = item.lossRate;
      foodIdCell.textContent = item.foodId;
      foodIdCell.style.display = "none";
      foodIdCell.setAttribute("id", "foodID");
      //dayCell = item.day;
  
      row.appendChild(foodNameCell);
      row.appendChild(consumedNumCell);
      row.appendChild(costCell);
      row.appendChild(wasteNumCell);
      row.appendChild(wasteAmtCell);
      row.appendChild(lossRateCell);
      row.appendChild(foodIdCell);
      //row.appendChild(dayCell);
  
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}