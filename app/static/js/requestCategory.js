function submit_request() {
    var page = document.getElementById("target_page");
    var entry = {
        type:"1",
        url:page.value,
        elementSet:{etag:"li",eclass:"zg-item-immersion"},
        elementDef:[
            {elementName:"Rank",elementTag:"span",elementClass:"zg-badge-text",extractType:"0",elementExtract:"text"},
            {elementName:"Url",elementTag:"a",elementClass:"a-link-normal",extractType:"1",elementExtract:"href"},
            {elementName:"Description",elementTag:"div",elementClass:"p13n-sc-truncate",extractType:"0",elementExtract:"text"},
            {elementName:"Price",elementTag:"span",elementClass:"p13n-sc-price",extractType:"0",elementExtract:"text"},
            {elementName:"Stars",elementTag:"span",elementClass:"a-icon-alt",extractType:"0",elementExtract:"text"}
        ]
    };
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
          });
        })
        .catch(function (error) {
          console.log("Fetch error: " + error);
        });
}