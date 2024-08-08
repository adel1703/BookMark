var siteNameInput= document.getElementById("bookmarkName");
var siteURLInput= document.getElementById("bookmarkURL");

var allSites = [];

if(localStorage.getItem("sites") != null){
    allSites = JSON.parse(localStorage.getItem("sites"));
    displayAllSites();
}

function addNewSite(){

    if( validateSiteName() ){
        if(validateSiteLink()){
            var site = {
                Name : siteNameInput.value,
                Link : siteURLInput.value
            }
            
            allSites.push(site);
            localStorage.setItem("sites" , JSON.stringify(allSites));
            console.log(allSites);
            clearInputs()
            displayAllSites()
        }else{
            alert("Site URL must include .com ")
        }
        
        
    }else{
        alert("Site name must start with capital letter and contain at least 3-15 characters. ");
    }

}

function clearInputs(){
    siteNameInput.value = "";
    siteURLInput.value = "";
    
}

function displayAllSites(){
    var listOfSites = "";

    for(  var i = 0 ;  i < allSites.length ;  i++  ){
        listOfSites += `<tr>
        <td>${ allSites[i].Name }</td>
        <td>${ allSites[i].Link }</td>
        <td>
        
            <a class="text-white text-decoration-none btn bg-success" target="blank" href="${allSites[i].Link}">
            <i class="fa fa-eye"></i>
            Visit
            </a>
    </td>
    <td>
        <button class="btn btn-warning text-white" onclick="updateSite(${i})">
        <i class="fa-regular fa-pen-to-square"></i>
        Update
        </button>
    <td>
        <button class="btn btn-danger" onclick="deleteSite(${i})">
            <i class="fa fa-trash"></i>
            Delete
        </button>
    </td>
    </tr>`
    }

    document.getElementById("tbody").innerHTML = listOfSites ;
}

function deleteSite(idx){
    allSites.splice(idx , 1);
    displayAllSites();
    localStorage.setItem("sites" , JSON.stringify(allSites));
}

function validateSiteName(){
    var nameRegex = /^[A-Z][a-z]{3,15}$/;
    return nameRegex.test(siteNameInput.value);
}

function validateSiteLink(){
    var linkRegex = /.com/;
    return linkRegex.test(siteURLInput.value);
}


var nameValidation = document.getElementById("bookmarkName");
var linkValidation = document.getElementById("bookmarkURL");

function formValid(){

    if(validateSiteName()){
        siteNameInput.classList.remove('is-invalid');
        siteNameInput.classList.add('is-valid');
    }else{
        siteNameInput.classList.remove('is-valid');
        siteNameInput.classList.add('is-invalid');
    }

    if(validateSiteLink()){
        siteURLInput.classList.remove('is-invalid');
        siteURLInput.classList.add('is-valid');
    }else{
        siteURLInput.classList.remove('is-valid');
        siteURLInput.classList.add('is-invalid');
    }
    
}

var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");

var tmp ;

function updateSite( index ){
    submitBtn.classList.replace('d-block' , 'd-none')
    updateBtn.classList.replace('d-none' , 'd-block')

    siteNameInput.value = allSites[index].Name;
    siteURLInput.value = allSites[index].Link;

    tmp = index ;

    scroll({top:0})
}

function onClickUpdate(){
    submitBtn.classList.replace('d-none' , 'd-block')
    updateBtn.classList.replace('d-block' , 'd-none')
}

function update(){

    var site = {
        Name : siteNameInput.value,
        Link : siteURLInput.value
    }

    allSites[tmp] = site ;
    displayAllSites()
    onClickUpdate()
    localStorage.setItem('sites', JSON.stringify(allSites) );

}