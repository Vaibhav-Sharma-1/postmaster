console.log("Loaded");

//utility function
//1.get element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

//initialize count for params
let paramsAddedCount = 0;

//Hide the parameter box initially
let parameterBox = document.getElementById("parametersBox");
parameterBox.style.display = "none";

//if the user click on json radio button than hide the parameter box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  parameterBox.style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});
//if the user click on parameter radio button than hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  parameterBox.style.display = "block";
});

//grabbing + button of params to add more params
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-3">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${
                  paramsAddedCount + 2
                }</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${
                      paramsAddedCount + 2
                    }" placeholder="Enter Parameter ${
    paramsAddedCount + 2
  } Key" />
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${
                      paramsAddedCount + 2
                    }"
                        placeholder="Enter Parameter ${
                          paramsAddedCount + 2
                        } Value" />
                </div>
                <button id="addParam" class="btn btn-primary deleteParam"  >-</button>
                </div>`;

  let addParams = getElementFromString(string);
  params.appendChild(addParams);
  paramsAddedCount++;

  //   adding event listener on -  btn
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (const iterator of deleteParam) {
    iterator.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
});

// if the user click on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //showing wait to the use
  document.getElementById("responsePrism").innerHTML =
    "Please wait.. Fetching response...";
  // fetch all the values
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    `input[name='requestType']:checked`
  ).value;
  let contentType = document.querySelector(
    `input[name='contentType']:checked`
  ).value;

  //if user has select params instead of json, collect all the parameter in an object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < paramsAddedCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  //console log all the values
  console.log("url is ", url);
  console.log("requestType is ", requestType);
  console.log("data is ", data);

  // if the request type is get, invoke fetch api to create a post request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  }else{
    fetch(url, {
        method: 'POST', 
        body: data,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }  
    })
    .then(response=> response.text())
    .then((text) =>{
        // document.getElementById('responseJsonText').value = text;
        document.getElementById('responsePrism').innerHTML = text;
        Prism.highlightAll();
    });

}


});
