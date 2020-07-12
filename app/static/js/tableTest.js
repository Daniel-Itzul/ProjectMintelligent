// this is purely a test file it has useful data to test
function generate_table() {
    var data = {gridElements:[
            {Rank:"#1", AMZID:"B07W6ZZZWK", Description:"TONOR PC Microphone USB Computer Condenser Gaming …aming for iMac PC Laptop Desktop Windows Computer", Price: "£40.99", Stars: "4.5 out of 5 stars"},
            {Rank:"#2", AMZID:"B07CZ6LWW4", Description:"Trust Gaming GXT 232 Mantis Streaming PC Gaming Mi…g Shock Mount, Pop Filter and Tripod Stand, Black", Price: "£29.99", Stars: "4.0 out of 5 stars"},
            {Rank:"#3", AMZID:"B0719CHFLS", Description:"DISDIM PC Microphone, 3.5mm Jack Condenser Recordi…rtphone - Gaming, Singing, YouTube, Skype (Black)", Price: "£19.99", Stars: "3.7 out of 5 stars"},
            {Rank:"#4", AMZID:"B07X53R38M", Description:"PC/Phone Microphone, EIVOTOR 3.5mm Professional Co…cebook, Skype Online Chatting, Gaming, Podcasting", Price: "£24.98", Stars: "4.0 out of 5 stars"},
            {Rank: "#5",AMZID:"B07D561S67", Description:"USB PC Microphone, TKGOU Ture Plug & Play Home Stu…ideal for Youtube,Skype,Gaming,Podcast(1.5m /5ft)", Price: "£24.99", Stars: "4.4 out of 5 stars"},
            ]};
    var myArray = data["gridElements"];
    buildTable(myArray);
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
                        <td>${data[i].AMZID}</td>
                        <td>${data[i].Description}</td>
                        <td>${data[i].Price}</td>
                        <td>${data[i].Stars}</td>
                  </tr>`
        table.innerHTML += row
   } 
}
