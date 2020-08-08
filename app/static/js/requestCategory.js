$(function() {
  let validLink = /^https:\/\/[wW]{3}\.amazon/
  const submit_requestButton = document.getElementById("submit")
  document.getElementById("target_page").addEventListener("keyup", function() {
    const nameInput = document.getElementById("target_page").value;
    if (nameInput != "" && nameInput.match(validLink)) {
        document.getElementById("submit").removeAttribute("disabled");
        displayalert("All set","00");
    } else {
        document.getElementById("submit").setAttribute("disabled", null);
        displayalert("Only Amazon Category Pages are supported, your link should start by https://www.amazon","01");
    }
  });
})

function submit_request() {
  const targetPage = document.getElementById("target_page");
  var entry = {url:""};
  entry["url"] = targetPage.value;
  fetch(`${window.origin}/main/request-category`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(entry),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function (response) {
    if (response.status !== 200) {
      console.log(`Looks like there was a problem. Status code: ${response.status}`);
      return;
    }
    response.json().then(function (data) {
      //console.log(data);
      if ("exception" in data){
        displayalert(data["exception"]["description"],"02");
      } else {
        buildTable(data["gridElements"]);
      }
    });
  })
  .catch(function (error) {
    console.log("Fetch error: " + error);
  });
}

function buildTable(data){
  document.getElementById("resultSpace").innerHTML =  `<table id="myTable" class="table table-striped">
                                                       </table>`;
  var table = document.getElementById('myTable');
  var rowHeader = `<thead>
                    <tr class="bg-info">
                        <th>Rank</th>
                        <th>AMZID</th>
                        <th>Description</th>
                        <th>Currency</th>
                        <th>Price</th>
                        <th>Stars</th>
                    </tr>
                  </thead>
                  <tbody id="myTableBody">
                  </tbody>`;
  table.innerHTML += rowHeader;
  tableBody = document.getElementById('myTableBody')
  for (var i = 0; i < data.length; i++){
      var row = `<tr>
                      <td>${data[i].Rank}</td>
                      <td>${data[i].AMZID}</td>
                      <td>${data[i].Description}</td>
                      <td>${data[i].Currency}</td>
                      <td>${data[i].Price}</td>
                      <td>${data[i].Stars}</td>
                </tr>`
      tableBody.innerHTML += row
  }
  formatTable('#myTable');
}

function formatTable(tableName) {
  $(function() {
      $(tableName).DataTable( {
          dom: 'Bfrtip',
          ordering:  false,
          buttons: [
              'copyHtml5',
              'csvHtml5',
              'pdfHtml5'
          ]
      } );
  } );
};

function displayalert(alert, alertClass){
  alertTypes = {"00":`<div class="alert alert-success" role="alert">
                        ${alert}
                      </div>`,
                "01":`<div class="alert alert-warning" role="alert">
                        ${alert}
                      </div>`,
                "02":`<div class="alert alert-danger" role="alert">
                        ${alert}
                      </div>`
  }
  document.getElementById("resultSpace").innerHTML =   alertTypes[alertClass];
}