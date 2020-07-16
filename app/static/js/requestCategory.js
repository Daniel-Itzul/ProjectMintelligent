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
      buildTable(data["gridElements"]);
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
  var rowHeader = `<tr class="bg-info">
                      <th>Rank</th>
                      <th>AMZID</th>
                      <th>Description</th>
                      <th>Currency</th>
                      <th>Price</th>
                      <th>Stars</th>
                  </tr>`;
  table.innerHTML += rowHeader;
  for (var i = 0; i < data.length; i++){
      var row = `<tr>
                      <td>${data[i].Rank}</td>
                      <td>${data[i].AMZID}</td>
                      <td>${data[i].Description}</td>
                      <td>${data[i].Currency}</td>
                      <td>${data[i].Price}</td>
                      <td>${data[i].Stars}</td>
                </tr>`
      table.innerHTML += row
 } 
}