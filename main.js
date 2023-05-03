var ProductName= document.getElementById("ProductName");
var ProductPrice= document.getElementById("ProductPrice");
var ProductCategory= document.getElementById("ProductCategory");
var ProductDescription= document.getElementById("ProductDescription");
var searchInput = document.getElementById("search");
var addBtn =document.getElementById("getProductInfo");
var currentIndex = 0 ;

var productList;
if(localStorage.getItem("List") != null ){
    productList =JSON.parse(localStorage.getItem("List"))
    DisplayData()
}
else
{
    productList=[]
}
function addProduct(){ 

    if (validName() && validPrice() && validateDesc()) {
        if (addBtn.innerHTML=='Add Product'){ //add Mode
            var product ={
        Name:ProductName.value,
        Price:ProductPrice.value,
        Category:ProductCategory.value,
        Description:ProductDescription.value
    }
    productList.push(product);
    }
  else{              //update Mode

    updateProduct();
  }
    localStorage.setItem("List",JSON.stringify(productList))
    DisplayData ();
    }

}
function DisplayData (){
    var temp="";
    for (var i=0 ; i<productList.length;i++){
    temp += `<tr>
    <td>`+i+`</td>
    <td>`+productList[i].Name +`</td>
    <td>`+productList[i].Price +`</td>
    <td>`+productList[i].Category +`</td>
    <td>`+productList[i].Description +`</td>
    <td><button class="btn btn-outline-warning" onclick="getProductInfo(`+i+`)"  >Click To update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteData(`+i+`)">Delete</button></td>
     </tr>`
    }

    document.getElementById("tableData").innerHTML=temp
} 

function searchClick() {
    var searchValue = searchInput.value;
    var cartona="";
    for(var i=0; i<productList.length ; i++){
        if (productList[i].Name.toLowerCase().includes(searchValue.toLowerCase())
        ||
        productList[i].Category.toLowerCase().includes(searchValue.toLowerCase())
        ||
        productList[i].Description.toLowerCase().includes(searchValue.toLowerCase())
        ||
        productList[i].Price.toLowerCase().includes(searchValue.toLowerCase())
        ){
            cartona +=
            `<tr>
            <td>`+i+`</td>
            <td>`+productList[i].Name +`</td>
            <td>`+productList[i].Price +`</td>
            <td>`+productList[i].Category +`</td>
            <td>`+productList[i].Description +`</td>
            <td> <button class="btn btn-outline-warning">update</button></td>
            <td><button class="btn btn-outline-danger">delete</button></td>
        </tr>`
        }

    }
    document.getElementById("tableData").innerHTML=cartona

    
}

function deleteData(index){
    productList.splice(index ,1);
    localStorage.setItem("List",JSON.stringify(productList))
    DisplayData()
}

function cleardata(){
    ProductName.value=""
    ProductPrice.value=""
    ProductCategory.value=""
    ProductDescription.value=""
}


function getProductInfo(i){
    currentIndex = i;
    ProductName.value=productList[i].Name
    ProductPrice.value=productList[i].Price
    ProductCategory.value=productList[i].Category
    ProductDescription.value=productList[i].Description
    addBtn.innerHTML="Update";
   
    
}

function updateProduct(){
    var product ={
        Name:ProductName.value,
        Price:ProductPrice.value,
        Category:ProductCategory.value,
        Description:ProductDescription.value
    }
    productList[currentIndex]=product;
    addBtn.innerHTML="Add Product";
    cleardata();
}

function validName() {
  var regex = /^[A-z][a-z]{3,6}[0-9]?$/;
var validTest = false;
  if (regex.test(ProductName.value)) {
    document.getElementById("alertName").style.display ="none"
     validTest = true;
  } else {
    document.getElementById("alertName").style.display ="block"
    validTest = false;
  }
  return validTest;
}

function validPrice() {
    var regex = /^[1-9][0-9]{3,5}$/;
    var validTest = false;

    if (regex.test(ProductPrice.value)) {
      document.getElementById("alertPrice").style.display ="none"
       validTest = true;
    } else {
      document.getElementById("alertPrice").style.display ="block"
      validTest = false;
    }
    return validTest;

  }

  function validateDesc() {
    var regex=  /^[a-z]{3,400}$/;
var validTest= false;
    if (regex.test(ProductDescription.value)) {
      document.getElementById("alertDesc").style.display = "none"
      validTest =true;
    }
    else {
      document.getElementById("alertDesc").style.display = "block"
      validTest =false;
    }
    return validTest;
  }