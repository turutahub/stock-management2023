async function displayCost(url) {
  var response = await fetch(url)
  var data = await response.json()

  var field = document.getElementById("searchResults")

  var title = document.createElement('h3')
  title.textContent = "原価"
  field.appendChild(title)

  var dates = [...new Set(data.map(item => item.day))].sort();// 日付を一意のセットに取得
    
  var foodNames = [...new Set(data.map(item => item.foodName))];// 食材名を一意のセットに取得

///// テーブルのヘッダー行を生成
  var table = document.createElement('table');

  var thead = document.createElement('thead');

  var headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  
  //　ヘッダーに日付記載
  dates.forEach(date => {
    var th = document.createElement('th');
    th.textContent = date;
    headerRow.appendChild(th);
  });
  
  //　ヘッダーに期間計セル追加
  var th = document.createElement('th');
  th.textContent = "期間計"
  headerRow.appendChild(th)
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

///// テーブルのデータ行を生成
  var tbody = document.createElement('tbody');

  var row = document.createElement('tr');

  //　食材計ロウ追加
  var cell = document.createElement('td')
  cell.textContent = "食材計"
  row.appendChild(cell)

  for(i=0;i<dates.length;i++) {
    var totalCell = document.createElement('td')
    row.appendChild(totalCell)
  }

  //　食材計ロウに期間計セル追加
  var totalCell = document.createElement('td')
  row.appendChild(totalCell)
  tbody.appendChild(row)

  //　食材名ごとのロウ追加
  foodNames.forEach(foodName => {
    var row = document.createElement('tr');
    var tdFoodName = document.createElement('td');
    tdFoodName.textContent = foodName;
    row.appendChild(tdFoodName);
      
    //　コスト記載
    dates.forEach(date => {
      var td = document.createElement('td');
      var dataItem = data.find(item => item.day === date && item.foodName === foodName);
      td.textContent = dataItem ? dataItem.cost : '-';
      row.appendChild(td);
    });

  //　食材名ごとのロウに期間計セル追加
    row.appendChild(document.createElement("td"))
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  field.appendChild(table);
  
  for(i=1;i<dates.length+1;i++) {
    var rows = table.getElementsByTagName('tr'); // テーブル内の全ての行を取得する

    var columnValues = [];
    
    for (j=2;j<rows.length;j++) {
        var cell = rows[j].getElementsByTagName('td')[i]; // 指定した列のセルを取得する
        var value = cell.textContent || cell.innerText; // セルの値を取得する
        columnValues.push(value);
    }
    var Array = columnValues.filter(function(element) {
        return !isNaN(element);
    });
    //console.log(Array)
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[1].getElementsByTagName('td')[i].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  for(i=1;i<rows.length;i++) {
    var rowValues = [];
    for(j=1;j<dates.length+1;j++) {
        var cell = rows[i].getElementsByTagName('td')[j];
        var value = cell.textContent || cell.innerText;
        rowValues.push(value)
    }
    var Array = rowValues.filter(function(element) {
        return !isNaN(element);
    });
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[i].getElementsByTagName('td')[dates.length+1].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
}

  
//後から
async function displayCostRate(url) {
    const response = await fetch(url)
    //console.log(await response.json())

}
  
//後から
async function displayBalance(url) {
    const response = await fetch(url)
    //console.log(await response.json())

}
  
async function displayOrder(url){
    const response = await fetch(url)
    //console.log(await response.json())
    var data = await response.json()

    var field = document.getElementById("searchResults")
    
    var title = document.createElement('h3')
    title.textContent = "発注履歴"
    field.appendChild(title)

  var dates = [...new Set(data.map(item => item.day))].sort();// 日付を一意のセットに取得
    
  var foodNames = [...new Set(data.map(item => item.foodName))];// 食材名を一意のセットに取得

///// テーブルのヘッダー行を生成
  var table = document.createElement('table');

  var thead = document.createElement('thead');

  var headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  
  //　ヘッダーに日付記載
  dates.forEach(date => {
    var th = document.createElement('th');
    th.textContent = date;
    headerRow.appendChild(th);
  });
  
  //　ヘッダーに期間計セル追加
  var th = document.createElement('th');
  th.textContent = "期間計"
  headerRow.appendChild(th)
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

///// テーブルのデータ行を生成
  var tbody = document.createElement('tbody');

  var row = document.createElement('tr');

  //　食材計ロウ追加
  var cell = document.createElement('td')
  cell.textContent = "食材計"
  row.appendChild(cell)

  for(i=0;i<dates.length;i++) {
    var totalCell = document.createElement('td')
    row.appendChild(totalCell)
  }

  //　食材計ロウに期間計セル追加
  var totalCell = document.createElement('td')
  row.appendChild(totalCell)
  tbody.appendChild(row)

  //　食材名ごとのロウ追加
  foodNames.forEach(foodName => {
    var row = document.createElement('tr');
    var tdFoodName = document.createElement('td');
    tdFoodName.textContent = foodName;
    row.appendChild(tdFoodName);
      
    //　コスト記載
    dates.forEach(date => {
      var td = document.createElement('td');
      var dataItem = data.find(item => item.day === date && item.foodName === foodName);
      td.textContent = dataItem ? dataItem.impNum : '-';
      row.appendChild(td);
    });

  //　食材名ごとのロウに期間計セル追加
    row.appendChild(document.createElement("td"))
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  field.appendChild(table);
  
  for(i=1;i<dates.length+1;i++) {
    var rows = table.getElementsByTagName('tr'); // テーブル内の全ての行を取得する

    var columnValues = [];
    
    for (j=2;j<rows.length;j++) {
        var cell = rows[j].getElementsByTagName('td')[i]; // 指定した列のセルを取得する
        var value = cell.textContent || cell.innerText; // セルの値を取得する
        columnValues.push(value);
    }
    var Array = columnValues.filter(function(element) {
        return !isNaN(element);
    });
    //console.log(Array)
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[1].getElementsByTagName('td')[i].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  for(i=1;i<rows.length;i++) {
    var rowValues = [];
    for(j=1;j<dates.length+1;j++) {
        var cell = rows[i].getElementsByTagName('td')[j];
        var value = cell.textContent || cell.innerText;
        rowValues.push(value)
    }
    var Array = rowValues.filter(function(element) {
        return !isNaN(element);
    });
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[i].getElementsByTagName('td')[dates.length+1].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

}
  
async function displayWasteNum(url) {
    const response = await fetch(url)
    //console.log(await response.json())
    var data = await response.json()

    var field = document.getElementById("searchResults")

    var title = document.createElement('h3')
    title.textContent = "廃棄数"
    field.appendChild(title)
    
  var dates = [...new Set(data.map(item => item.day))].sort();// 日付を一意のセットに取得
    
  var foodNames = [...new Set(data.map(item => item.foodName))];// 食材名を一意のセットに取得

///// テーブルのヘッダー行を生成
  var table = document.createElement('table');

  var thead = document.createElement('thead');

  var headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  
  //　ヘッダーに日付記載
  dates.forEach(date => {
    var th = document.createElement('th');
    th.textContent = date;
    headerRow.appendChild(th);
  });
  
  //　ヘッダーに期間計セル追加
  var th = document.createElement('th');
  th.textContent = "期間計"
  headerRow.appendChild(th)
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

///// テーブルのデータ行を生成
  var tbody = document.createElement('tbody');

  var row = document.createElement('tr');

  //　食材計ロウ追加
  var cell = document.createElement('td')
  cell.textContent = "食材計"
  row.appendChild(cell)

  for(i=0;i<dates.length;i++) {
    var totalCell = document.createElement('td')
    row.appendChild(totalCell)
  }

  //　食材計ロウに期間計セル追加
  var totalCell = document.createElement('td')
  row.appendChild(totalCell)
  tbody.appendChild(row)

  //　食材名ごとのロウ追加
  foodNames.forEach(foodName => {
    var row = document.createElement('tr');
    var tdFoodName = document.createElement('td');
    tdFoodName.textContent = foodName;
    row.appendChild(tdFoodName);
      
    //　コスト記載
    dates.forEach(date => {
      var td = document.createElement('td');
      var dataItem = data.find(item => item.day === date && item.foodName === foodName);
      td.textContent = dataItem ? dataItem.wasteNum : '-';
      row.appendChild(td);
    });

  //　食材名ごとのロウに期間計セル追加
    row.appendChild(document.createElement("td"))
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  field.appendChild(table);
  
  for(i=1;i<dates.length+1;i++) {
    var rows = table.getElementsByTagName('tr'); // テーブル内の全ての行を取得する

    var columnValues = [];
    
    for (j=2;j<rows.length;j++) {
        var cell = rows[j].getElementsByTagName('td')[i]; // 指定した列のセルを取得する
        var value = cell.textContent || cell.innerText; // セルの値を取得する
        columnValues.push(value);
    }
    var Array = columnValues.filter(function(element) {
        return !isNaN(element);
    });
    //console.log(Array)
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[1].getElementsByTagName('td')[i].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  for(i=1;i<rows.length;i++) {
    var rowValues = [];
    for(j=1;j<dates.length+1;j++) {
        var cell = rows[i].getElementsByTagName('td')[j];
        var value = cell.textContent || cell.innerText;
        rowValues.push(value)
    }
    var Array = rowValues.filter(function(element) {
        return !isNaN(element);
    });
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[i].getElementsByTagName('td')[dates.length+1].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

}
  
async function displayWasteAmt(url) {
    const response = await fetch(url)
    //console.log(await response.json())

    var data = await response.json()

    var field = document.getElementById("searchResults")

    var title = document.createElement('h3')
    title.textContent = "廃棄額"
    field.appendChild(title)
    
  var dates = [...new Set(data.map(item => item.day))].sort();// 日付を一意のセットに取得
    
  var foodNames = [...new Set(data.map(item => item.foodName))];// 食材名を一意のセットに取得

///// テーブルのヘッダー行を生成
  var table = document.createElement('table');

  var thead = document.createElement('thead');

  var headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  
  //　ヘッダーに日付記載
  dates.forEach(date => {
    var th = document.createElement('th');
    th.textContent = date;
    headerRow.appendChild(th);
  });
  
  //　ヘッダーに期間計セル追加
  var th = document.createElement('th');
  th.textContent = "期間計"
  headerRow.appendChild(th)
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

///// テーブルのデータ行を生成
  var tbody = document.createElement('tbody');

  var row = document.createElement('tr');

  //　食材計ロウ追加
  var cell = document.createElement('td')
  cell.textContent = "食材計"
  row.appendChild(cell)

  for(i=0;i<dates.length;i++) {
    var totalCell = document.createElement('td')
    row.appendChild(totalCell)
  }

  //　食材計ロウに期間計セル追加
  var totalCell = document.createElement('td')
  row.appendChild(totalCell)
  tbody.appendChild(row)

  //　食材名ごとのロウ追加
  foodNames.forEach(foodName => {
    var row = document.createElement('tr');
    var tdFoodName = document.createElement('td');
    tdFoodName.textContent = foodName;
    row.appendChild(tdFoodName);
      
    //　コスト記載
    dates.forEach(date => {
      var td = document.createElement('td');
      var dataItem = data.find(item => item.day === date && item.foodName === foodName);
      td.textContent = dataItem ? dataItem.wasteAmt : '-';
      row.appendChild(td);
    });

  //　食材名ごとのロウに期間計セル追加
    row.appendChild(document.createElement("td"))
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  field.appendChild(table);
  
  for(i=1;i<dates.length+1;i++) {
    var rows = table.getElementsByTagName('tr'); // テーブル内の全ての行を取得する

    var columnValues = [];
    
    for (j=2;j<rows.length;j++) {
        var cell = rows[j].getElementsByTagName('td')[i]; // 指定した列のセルを取得する
        var value = cell.textContent || cell.innerText; // セルの値を取得する
        columnValues.push(value);
    }
    var Array = columnValues.filter(function(element) {
        return !isNaN(element);
    });
    //console.log(Array)
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[1].getElementsByTagName('td')[i].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  for(i=1;i<rows.length;i++) {
    var rowValues = [];
    for(j=1;j<dates.length+1;j++) {
        var cell = rows[i].getElementsByTagName('td')[j];
        var value = cell.textContent || cell.innerText;
        rowValues.push(value)
    }
    var Array = rowValues.filter(function(element) {
        return !isNaN(element);
    });
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[i].getElementsByTagName('td')[dates.length+1].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
}
  
async function displayLossRate(url) {
    const response = await fetch(url)
    //console.log(await response.json())
    var data = await response.json()

    var field = document.getElementById("searchResults")

    var title = document.createElement('h3')
    title.textContent = "ロス率"
    field.appendChild(title)
    
  var dates = [...new Set(data.map(item => item.day))].sort();// 日付を一意のセットに取得
    
  var foodNames = [...new Set(data.map(item => item.foodName))];// 食材名を一意のセットに取得

///// テーブルのヘッダー行を生成
  var table = document.createElement('table');

  var thead = document.createElement('thead');

  var headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  
  //　ヘッダーに日付記載
  dates.forEach(date => {
    var th = document.createElement('th');
    th.textContent = date;
    headerRow.appendChild(th);
  });
  
  //　ヘッダーに期間計セル追加
  var th = document.createElement('th');
  th.textContent = "期間計"
  headerRow.appendChild(th)
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

///// テーブルのデータ行を生成
  var tbody = document.createElement('tbody');

  var row = document.createElement('tr');

  //　食材計ロウ追加
  var cell = document.createElement('td')
  cell.textContent = "食材計"
  row.appendChild(cell)

  for(i=0;i<dates.length;i++) {
    var totalCell = document.createElement('td')
    row.appendChild(totalCell)
  }

  //　食材計ロウに期間計セル追加
  var totalCell = document.createElement('td')
  row.appendChild(totalCell)
  tbody.appendChild(row)

  //　食材名ごとのロウ追加
  foodNames.forEach(foodName => {
    var row = document.createElement('tr');
    var tdFoodName = document.createElement('td');
    tdFoodName.textContent = foodName;
    row.appendChild(tdFoodName);
      
    //　コスト記載
    dates.forEach(date => {
      var td = document.createElement('td');
      var dataItem = data.find(item => item.day === date && item.foodName === foodName);
      td.textContent = dataItem ? dataItem.lossRate : '-';
      row.appendChild(td);
    });

  //　食材名ごとのロウに期間計セル追加
    row.appendChild(document.createElement("td"))
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  field.appendChild(table);
  
  for(i=1;i<dates.length+1;i++) {
    var rows = table.getElementsByTagName('tr'); // テーブル内の全ての行を取得する

    var columnValues = [];
    
    for (j=2;j<rows.length;j++) {
        var cell = rows[j].getElementsByTagName('td')[i]; // 指定した列のセルを取得する
        var value = cell.textContent || cell.innerText; // セルの値を取得する
        columnValues.push(value);
    }
    var Array = columnValues.filter(function(element) {
        return !isNaN(element);
    });
    //console.log(Array)
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[1].getElementsByTagName('td')[i].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  for(i=1;i<rows.length;i++) {
    var rowValues = [];
    for(j=1;j<dates.length+1;j++) {
        var cell = rows[i].getElementsByTagName('td')[j];
        var value = cell.textContent || cell.innerText;
        rowValues.push(value)
    }
    var Array = rowValues.filter(function(element) {
        return !isNaN(element);
    });
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[i].getElementsByTagName('td')[dates.length+1].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

}
  
async function displaySpplmNum(url) {
    const response = await fetch(url)
    //console.log(await response.json())
    var data = await response.json()

    var field = document.getElementById("searchResults")

    var title = document.createElement('h3')
    title.textContent = "補填数"
    field.appendChild(title)
    
  var dates = [...new Set(data.map(item => item.day))].sort();// 日付を一意のセットに取得
    
  var foodNames = [...new Set(data.map(item => item.foodName))];// 食材名を一意のセットに取得

///// テーブルのヘッダー行を生成
  var table = document.createElement('table');

  var thead = document.createElement('thead');

  var headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  
  //　ヘッダーに日付記載
  dates.forEach(date => {
    var th = document.createElement('th');
    th.textContent = date;
    headerRow.appendChild(th);
  });
  
  //　ヘッダーに期間計セル追加
  var th = document.createElement('th');
  th.textContent = "期間計"
  headerRow.appendChild(th)
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

///// テーブルのデータ行を生成
  var tbody = document.createElement('tbody');

  var row = document.createElement('tr');

  //　食材計ロウ追加
  var cell = document.createElement('td')
  cell.textContent = "食材計"
  row.appendChild(cell)

  for(i=0;i<dates.length;i++) {
    var totalCell = document.createElement('td')
    row.appendChild(totalCell)
  }

  //　食材計ロウに期間計セル追加
  var totalCell = document.createElement('td')
  row.appendChild(totalCell)
  tbody.appendChild(row)

  //　食材名ごとのロウ追加
  foodNames.forEach(foodName => {
    var row = document.createElement('tr');
    var tdFoodName = document.createElement('td');
    tdFoodName.textContent = foodName;
    row.appendChild(tdFoodName);
      
    //　コスト記載
    dates.forEach(date => {
      var td = document.createElement('td');
      var dataItem = data.find(item => item.day === date && item.foodName === foodName);
      td.textContent = dataItem ? dataItem.spplmNum : '-';
      row.appendChild(td);
    });

  //　食材名ごとのロウに期間計セル追加
    row.appendChild(document.createElement("td"))
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  field.appendChild(table);
  
  for(i=1;i<dates.length+1;i++) {
    var rows = table.getElementsByTagName('tr'); // テーブル内の全ての行を取得する

    var columnValues = [];
    
    for (j=2;j<rows.length;j++) {
        var cell = rows[j].getElementsByTagName('td')[i]; // 指定した列のセルを取得する
        var value = cell.textContent || cell.innerText; // セルの値を取得する
        columnValues.push(value);
    }
    var Array = columnValues.filter(function(element) {
        return !isNaN(element);
    });
    //console.log(Array)
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[1].getElementsByTagName('td')[i].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  for(i=1;i<rows.length;i++) {
    var rowValues = [];
    for(j=1;j<dates.length+1;j++) {
        var cell = rows[i].getElementsByTagName('td')[j];
        var value = cell.textContent || cell.innerText;
        rowValues.push(value)
    }
    var Array = rowValues.filter(function(element) {
        return !isNaN(element);
    });
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[i].getElementsByTagName('td')[dates.length+1].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

}
  
async function displaySpplmAmt(url) {
    const response = await fetch(url)
    //console.log(await response.json())
    var data = await response.json()

    var field = document.getElementById("searchResults")

    var title = document.createElement('h3')
    title.textContent = "補填額"
    field.appendChild(title)
    
  var dates = [...new Set(data.map(item => item.day))].sort();// 日付を一意のセットに取得
    
  var foodNames = [...new Set(data.map(item => item.foodName))];// 食材名を一意のセットに取得

///// テーブルのヘッダー行を生成
  var table = document.createElement('table');

  var thead = document.createElement('thead');

  var headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  
  //　ヘッダーに日付記載
  dates.forEach(date => {
    var th = document.createElement('th');
    th.textContent = date;
    headerRow.appendChild(th);
  });
  
  //　ヘッダーに期間計セル追加
  var th = document.createElement('th');
  th.textContent = "期間計"
  headerRow.appendChild(th)
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

///// テーブルのデータ行を生成
  var tbody = document.createElement('tbody');

  var row = document.createElement('tr');

  //　食材計ロウ追加
  var cell = document.createElement('td')
  cell.textContent = "食材計"
  row.appendChild(cell)

  for(i=0;i<dates.length;i++) {
    var totalCell = document.createElement('td')
    row.appendChild(totalCell)
  }

  //　食材計ロウに期間計セル追加
  var totalCell = document.createElement('td')
  row.appendChild(totalCell)
  tbody.appendChild(row)

  //　食材名ごとのロウ追加
  foodNames.forEach(foodName => {
    var row = document.createElement('tr');
    var tdFoodName = document.createElement('td');
    tdFoodName.textContent = foodName;
    row.appendChild(tdFoodName);
      
    //　コスト記載
    dates.forEach(date => {
      var td = document.createElement('td');
      var dataItem = data.find(item => item.day === date && item.foodName === foodName);
      td.textContent = dataItem ? dataItem.spplmAmt : '-';
      row.appendChild(td);
    });

  //　食材名ごとのロウに期間計セル追加
    row.appendChild(document.createElement("td"))
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  field.appendChild(table);
  
  for(i=1;i<dates.length+1;i++) {
    var rows = table.getElementsByTagName('tr'); // テーブル内の全ての行を取得する

    var columnValues = [];
    
    for (j=2;j<rows.length;j++) {
        var cell = rows[j].getElementsByTagName('td')[i]; // 指定した列のセルを取得する
        var value = cell.textContent || cell.innerText; // セルの値を取得する
        columnValues.push(value);
    }
    var Array = columnValues.filter(function(element) {
        return !isNaN(element);
    });
    //console.log(Array)
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[1].getElementsByTagName('td')[i].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  for(i=1;i<rows.length;i++) {
    var rowValues = [];
    for(j=1;j<dates.length+1;j++) {
        var cell = rows[i].getElementsByTagName('td')[j];
        var value = cell.textContent || cell.innerText;
        rowValues.push(value)
    }
    var Array = rowValues.filter(function(element) {
        return !isNaN(element);
    });
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[i].getElementsByTagName('td')[dates.length+1].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

}
  
async function displayConsumedNum(url) {
    const response = await fetch(url)
    //console.log(await response.json())
    var data = await response.json()

    var field = document.getElementById("searchResults")
    var title = document.createElement('h3')
    title.textContent = "消費数"
    field.appendChild(title)
    
  var dates = [...new Set(data.map(item => item.day))].sort();// 日付を一意のセットに取得
    
  var foodNames = [...new Set(data.map(item => item.foodName))];// 食材名を一意のセットに取得

///// テーブルのヘッダー行を生成
  var table = document.createElement('table');

  var thead = document.createElement('thead');

  var headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  
  //　ヘッダーに日付記載
  dates.forEach(date => {
    var th = document.createElement('th');
    th.textContent = date;
    headerRow.appendChild(th);
  });
  
  //　ヘッダーに期間計セル追加
  var th = document.createElement('th');
  th.textContent = "期間計"
  headerRow.appendChild(th)
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

///// テーブルのデータ行を生成
  var tbody = document.createElement('tbody');

  var row = document.createElement('tr');

  //　食材計ロウ追加
  var cell = document.createElement('td')
  cell.textContent = "食材計"
  row.appendChild(cell)

  for(i=0;i<dates.length;i++) {
    var totalCell = document.createElement('td')
    row.appendChild(totalCell)
  }

  //　食材計ロウに期間計セル追加
  var totalCell = document.createElement('td')
  row.appendChild(totalCell)
  tbody.appendChild(row)

  //　食材名ごとのロウ追加
  foodNames.forEach(foodName => {
    var row = document.createElement('tr');
    var tdFoodName = document.createElement('td');
    tdFoodName.textContent = foodName;
    row.appendChild(tdFoodName);
      
    //　コスト記載
    dates.forEach(date => {
      var td = document.createElement('td');
      var dataItem = data.find(item => item.day === date && item.foodName === foodName);
      td.textContent = dataItem ? dataItem.consumedNum : '-';
      row.appendChild(td);
    });

  //　食材名ごとのロウに期間計セル追加
    row.appendChild(document.createElement("td"))
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  field.appendChild(table);
  
  for(i=1;i<dates.length+1;i++) {
    var rows = table.getElementsByTagName('tr'); // テーブル内の全ての行を取得する

    var columnValues = [];
    
    for (j=2;j<rows.length;j++) {
        var cell = rows[j].getElementsByTagName('td')[i]; // 指定した列のセルを取得する
        var value = cell.textContent || cell.innerText; // セルの値を取得する
        columnValues.push(value);
    }
    var Array = columnValues.filter(function(element) {
        return !isNaN(element);
    });
    //console.log(Array)
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[1].getElementsByTagName('td')[i].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  for(i=1;i<rows.length;i++) {
    var rowValues = [];
    for(j=1;j<dates.length+1;j++) {
        var cell = rows[i].getElementsByTagName('td')[j];
        var value = cell.textContent || cell.innerText;
        rowValues.push(value)
    }
    var Array = rowValues.filter(function(element) {
        return !isNaN(element);
    });
    var numericArray = Array.map(function(str) {
        return parseInt(str);
    });
    //console.log(numericArray)
    rows[i].getElementsByTagName('td')[dates.length+1].textContent = numericArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

}

//後から
async function displaySales(url) {
    const response = await fetch(url)
    //console.log(await response.json())
}