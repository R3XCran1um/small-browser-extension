var myLeads = [];
var oldLeads = []; //maybe possibly use in hypothetical future
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));//this myLeads is not array name
                                                                        // but the name of key in localstorage

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage; //this myLeads is the array aforementioned
    render(myLeads); //again the array
}

const tabs = [
    {url: "https://www.w3schools.com/howto/default.asp"}
];

function render(leads) {   //leads here is an parameter which u learned in c, py etc
    var listItems = "";
    for (var i = 0; i < leads.length; i++) {
        listItems += "<li><a target='_blank' href=leads[i]>" + leads[i] + "</a></li>";
        //more eye friendly mehtod than the one used above ie template strings[`]
        // also allows variable, multi line
        /* listItems += `
             <li>
                 <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                 </a>
             </li>    
         `
        */ 
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {
    console.log("Button clicked!!!");
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    console.log(localStorage.getItem("myLeads"));
    
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs[0].url);
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

delBtn.addEventListener("dblclick", function() {
    console.log("Button clicked!!!");
    localStorage.removeItem("myLeads");
    myLeads = [];
    render(myLeads);
})



