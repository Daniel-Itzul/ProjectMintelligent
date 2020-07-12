var entry = {
  type:"1",
  url:"",
  elementSet:{etag:"li",eclass:"zg-item-immersion"},
  elementDef:[
      {elementName:"Rank",elementTag:"span",elementClass:"zg-badge-text",extractType:"0",elementExtract:"text"},
      {elementName:"Url",elementTag:"a",elementClass:"a-link-normal",extractType:"1",elementExtract:"href"},
      {elementName:"Description",elementTag:"div",elementClass:"p13n-sc-truncate",extractType:"0",elementExtract:"text"},
      {elementName:"Price",elementTag:"span",elementClass:"p13n-sc-price",extractType:"0",elementExtract:"text"},
      {elementName:"Stars",elementTag:"span",elementClass:"a-icon-alt",extractType:"0",elementExtract:"text"}
  ]
};

function submit_request() {
  const targetPage = document.getElementById("target_page");
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
      console.log(data);
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
                      <th>Rank</td>
                      <th>AMZID</td>
                      <th>Description</td>
                      <th>Price</td>
                      <th>Stars</td>
                  </tr>`;
  table.innerHTML += rowHeader;
  for (var i = 0; i < data.length; i++){
      var row = `<tr>
                      <td>${data[i].Rank}</td>
                      <td>"Pending"</td>
                      <td>${data[i].Description}</td>
                      <td>${data[i].Price}</td>
                      <td>${data[i].Stars}</td>
                </tr>`
      table.innerHTML += row
 } 
}