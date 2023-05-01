//call the selectors
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let category = document.getElementById("category");
let mood = "create";
let assistantVar;

//get total function
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  }
}
//creat product
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value,
  };
  //count operation
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 51
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataProduct.push(newPro);
        }
      } else {
        dataProduct.push(newPro);
      }
    } else {
      dataProduct[assistantVar] = newPro;
      mood = "creat";
      submit.innerHTML = "Creat";
      count.style.display = "block";
    }
  }

  //save the product in the local storage
  localStorage.setItem("product", JSON.stringify(dataProduct));
  clearData();
  showData();
};

//clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}
//show data function
function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].count}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button  onclick="deleteData(${i})"  id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAllBtn = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    deleteAllBtn.innerHTML = `
  <button onclick ="deleteAll()" >Delete All ( ${dataProduct.length} )</button>
  `;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}
showData();
//delete function
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
//delete All Data function
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

//update function
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  getTotal();
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  count.style.display = "none";
  submit.innerHTML = "UpDate";
  mood = "update";
  assistantVar = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//seacrh function

let searchmood = "title";
function getsearch(id) {
  let seacrh = document.getElementById("search");
  if (id == "searchTitle") {
    searchmood = "title";
    seacrh.placeholder = "search By Title";
  } else {
    searchmood = "category";
    seacrh.placeholder = "search By Category";
  }
  seacrh.focus();
}
function mainsearch(value) {
  let table = "";
  //search by title
  if (searchmood == "title") {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value.tolowercase())) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].count}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button  onclick="deleteData(${i})"  id="delete">delete</button></td>
    </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value.tolowercase())) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].count}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button  onclick="deleteData(${i})"  id="delete">delete</button></td>
    </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
