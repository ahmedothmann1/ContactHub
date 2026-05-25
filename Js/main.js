// ^ USERS INPUTS
var userNameInput = document.querySelector("#inputOne");
var userNumberInput = document.querySelector("#inputTwo");
var userEmailInput = document.querySelector("#inputThree");
var userAddressInput = document.querySelector("#inputFour");
var userSelectInput = document.querySelector("#inputFive");
var userTextareaInput = document.querySelector("#exampleFormControlTextarea1");
var searchInput = document.getElementById("exampleFormControlInput1");
var userImg = document.getElementById("fileInput");
// &CHECKBOXES
var checkboxTwo = document.getElementById("emergencyCheckbox");
var checkboxOne = document.getElementById("favoriteCheckbox");
// *THE RIGHT EMERGENCY AND FAVORITE PART
var rightEmergency = document.getElementById("rightEmergency");
var rightFavorite = document.getElementById("rightFavorite");
//! ADD NEW CONTACT BUTTON
var addNewContactBtn = document.querySelector("#btnOne");
var updateButton = document.getElementById("updateBtn");
var afterUpdate = document.getElementById("btnUpdate");
var closeBtn = document.getElementById("btnClose");
var cancelBtn = document.getElementById("cancelButton");
//& NO CONTACTS HERE SECTION
var noneSection = document.getElementById("afterNone");
var noneEmergency = document.getElementById("noEmergency");
var noFavorite = document.getElementById("noFavorite");
//~ THE SPAN THAT REPRESENTS THE COUNTERS
var addTotalNumber = document.getElementById("addTotalNumber");
var addEmergency = document.getElementById("emergencyPart");
var addFavorite = document.getElementById("favoritePart");
var AllContact = document.getElementById("zeroContact");
// ? THE ICONS IN CARDS
var stars = document.querySelectorAll(".fa-star");
var container = document.getElementById("theContact");
var favoriteBadges = document.querySelector("#favoriteBadge");
var profile = document.getElementById("profileIcon");

// -----------------------------------------------------------------------------------------
var colors = {
  0: "color-one",
  1: "color-two",
  2: "color-three",
  3: "color-four",
};

var updateIndex;
var array = [];
// ^ LOCAL STORAGE
if (localStorage.getItem("productContainer") !== null) {
  var array = JSON.parse(localStorage.getItem("productContainer"));
  displayContact();
  total();
}
// & CHECK IF THE ARRAY EMPTY OR NOT
function checkEmptyState() {
  if (array.length === 0) {
    noneSection.classList.remove("d-none");
  } else {
    noneSection.classList.add("d-none");
  }

  var hasEmergency = false;
  var hasFavorite = false;

  for (var i = 0; i < array.length; i++) {
    if (array[i].emergencyCheckbox) {
      hasEmergency = true;
    }

    if (array[i].favoriteCheckbox) {
      hasFavorite = true;
    }
  }

  if (hasEmergency) {
    noneEmergency.classList.add("d-none");
  } else {
    noneEmergency.classList.remove("d-none");
  }

  if (hasFavorite) {
    noFavorite.classList.add("d-none");
  } else {
    noFavorite.classList.remove("d-none");
  }
}
/* 
  بعملها كول في الجلوبال سكوب علشان انا عايز اول ما الصفحه تفتح او يحصل ريلود يتأكد هل فيه حاجه جوه الاراي ولا لا ويحقق الشرط
  */
checkEmptyState();
// ~ ADD NEW CONTACT EVENT
addNewContactBtn.addEventListener("click", function () {
  if (validateAllInputs()) {
    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully.",
      icon: "success",
    });
    addContact();
    total();
    clearInputs();
  } else {
    Swal.fire({
      title: "Invalid values!",
      text: "Please fix errors before adding contact.",
      icon: "error",
    });
  }
});
// ! ADD CONTACT FUNCTION
function addContact() {
  var addNewContact = {
    name: userNameInput.value,
    number: userNumberInput.value,
    email: userEmailInput.value,
    address: userAddressInput.value,
    selectOption: userSelectInput.value,
    textArea: userTextareaInput.value,
    image: `${userImg.files[0] ? `images/${userImg.files[0].name}` : ""}`,
    emergencyCheckbox: checkboxTwo.checked, //* RETURN true or false
    favoriteCheckbox: checkboxOne.checked, //* RETURN true or false
    color: Math.trunc(Math.random() * 4),
  };
  array.push(addNewContact);
  document.getElementById("btnOne").classList.remove("d-none");
  document.getElementById("btnUpdate").classList.add("d-none");
  displayContact();
  clearInputs();
  checkEmptyState();
  numberOfContacts();

  localStorage.setItem("productContainer", JSON.stringify(array));
}
// ^ CLEAR INPUTS FUNCTION
function clearInputs() {
  userNameInput.value = ""; // او null
  userNumberInput.value = ""; // او null
  userEmailInput.value = ""; // او null
  userAddressInput.value = ""; // او null
  checkboxTwo.checked = "";
  checkboxOne.checked = "";
}
userImg.addEventListener("change", function () {
  var file = `images/${userImg.files[0].name}`;
  imageHTML = `<img style="border-radius: 12px" src="${file}" />`;
  profile.innerHTML = imageHTML;
});
function displayContact() {
  var emCounter = 0;
  var favCounter = 0;
  var emergencyBadge = "";
  var favoriteStore = "";
  var emergencyStore = "";
  var favoriteIcon = "";
  var heartIcon = "";
  var cartona = "";

  for (var i = 0; i < array.length; i++) {
    var imageHTML = array[i].image
      ? `<img style="border-radius: 12px" src="${array[i].image}" />`
      : `<span class="text-white">${
          array[i].name.split(" ")[0].charAt(0).toUpperCase() +
          (array[i].name.split(" ")[1]
            ? array[i].name.split(" ")[1].charAt(0).toUpperCase()
            : "")
        }</span>`;

    if (array[i].emergencyCheckbox) {
      emCounter = emCounter + 1; //* or count ++ (its own statement)
      emergencyBadge = `
            <span class="my-select select-two fs-11">
              Emergency
            </span>
          `;
      emergencyStore += `
              <div class="p-2 ">
                                      <div class=" d-flex align-items-center gap-2 justify-content-between bg-gray-50 p-2 rounded-3 emergency-hover">
                                          <div class="d-flex gap-2">
                                          <div class="${colors[array[i].color]} icon-one d-flex align-items-center justify-content-center overflow-hidden "
                                                  style="width: 40px; height: 40px;">
                                                ${imageHTML}
                                              </div>
                                              <div class="d-flex flex-column">
                                                  <span class="fs-14">${array[i].name}</span>
                                                  <a href ="tel:${array[i].number}" class="text-gray-600 fs-14 ">${array[i].number} </a>
                                              </div>
                                          </div>
                                       <a href="tel:${array[i].number}"
   class="add-icon phone-icon-left d-flex align-items-center justify-content-center">
   <i class="fas fa-phone"></i>
</a>
                                      </div>
                                  </div>


  `;
    }

    if (array[i].favoriteCheckbox) {
      favCounter++;
      favoriteStore += `
    <div class="p-2 ">
                                      <div
                                          class=" d-flex align-items-center gap-2 justify-content-between bg-gray-50 p-2 rounded-3 favorite-hover">
                                          <div class="d-flex gap-2">
                                              <div class="${colors[array[i].color]} icon-one d-flex align-items-center justify-content-center overflow-hidden "
                                                  style="width: 40px; height: 40px;">
                                                ${imageHTML}
                                              </div>
                                              <div class="d-flex flex-column">
                                                  <span class="fs-14">${array[i].name}</span>
                                                  <a href="tel:${array[i].number}"
                                                      class="text-gray-600 fs-14 ">${array[i].number} </a>
                                              </div>
                                          </div>
                                         <a href="tel:${array[i].number}"
   class="add-icon favorite-icon-left d-flex align-items-center justify-content-center">
   <i class="fas fa-phone"></i>
</a>  
                                      </div>
                                  </div>
  `;
    }

    favoriteIcon += `
            <span
                                                              class=" border border-2 border-white card-star  position-absolute  text-white rounded-pill d-flex justify-content-center align-items-center bg-amber-400"
                                                              style="width: 20px; height: 20px;">
                                                              <i class="fas fa-star fs-8"></i>
                                                          </span>
        
        `;
    heartIcon += `
            <span
                                                              class=" border border-2 border-white card-heart  position-absolute  text-white rounded-pill d-flex justify-content-center align-items-center bg-rose-500"
                                                              style="width: 20px; height: 20px;">
                                                              <i class="fas fa-heart-pulse fs-8"></i>
                                                          </span>
        
        `;

    cartona += `        
        <div class="col-md-6 col-12">
                                      <div class="bg-white rounded-4 card-hover">
                                          <div class="top p-3 ">
                                              <div class=" d-flex align-items-center gap-2">
                                                  <div class=" ${colors[array[i].color]}  icon-one d-flex align-items-center justify-content-center position-relative">
                                                    ${imageHTML}
                                                    <div >    
                                                      ${array[i].favoriteCheckbox ? favoriteIcon : ""}
                                                    </div>
                                                    <div  >
                                                      ${array[i].emergencyCheckbox ? heartIcon : ""}
                                                    </div>

                                                  </div>
                                                  <div class="d-flex flex-column">
                                                      <span>${array[i].name}</span>
                                                      <div class="d-flex gap-2">
                                                          <div
                                                              class="add-icon phone-icon d-flex align-items-center justify-content-center">
                                                              <i class="fas fa-phone"> </i>
                                                          </div>
                                                          <div>
                                                              <span class="text-gray-600 fs-14 ">${array[i].number} </span>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="mt-3 d-flex align-items-center gap-2">
                                                  <div
                                                      class="add-icon email-icon d-flex align-items-center justify-content-center">
                                                      <i class="fas fa-envelope"> </i>
                                                  </div>
                                                  <span class="text-gray-600 fs-14">${array[i].email}</span>
                                              </div>
                                              <div class="mt-3 d-flex align-items-center gap-2">
                                                  <div
                                                      class="add-icon location-icon d-flex align-items-center justify-content-center">
                                                      <i class="fas fa-location-dot"> </i>
                                                  </div>
                                                  <span class="text-gray-600  fs-14">${array[i].address}</span>
                                              </div>
                                              <div class="d-flex align-items-center mt-3 gap-2">
                                                  <span class=" fs-11 my-select select-one ">${array[i].selectOption}</span>
                                                  <div>${emergencyBadge}</div>
                                              </div>
                                          </div>
                                          <div class="bottom">
                                              <div class="d-flex align-items-center justify-content-between">
                                                  <div class="d-flex align-items-center gap-3">
                                                      <a href="tel:${array[i].number}"
                                                          class="phone-hover add-icon-two phone-icon-two d-flex align-items-center justify-content-center">
                                                          <i class="fas fa-phone"> </i>
                                                      </a>
                                                <a href="mailto:${array[i].email}"
                          class="email-hover add-icon-two email-icon-two d-flex align-items-center justify-content-center">
                          <i class="fas fa-envelope "></i>
                          </a>
                                                  </div>
                                                      <div>
                                                          <button class="btn p-0 border-0">
                                                          <span id="starOne"
                                                          class=" star-hover star bottom-icon d-flex align-items-center justify-content-center">
                                                          <i  class="far fa-star ${array[i].favoriteCheckbox ? "text-warning fas star-after-click" : "text-gray-400 "}"
                                                              data-index="${i}">
                                                                      </i>
                                                          </span>
                                                          </button>
                                                          <button class="btn p-0 border-0">
                                                      <span class="heart-hover heart bottom-icon d-flex align-items-center justify-content-center">
                                                          <i class="fas fa-heart-pulse   ${array[i].emergencyCheckbox ? "text-danger heart-after-click" : "text-gray-400"}" data-index-two="${i}"  >
                                                          </i>
                                                      </span>
                                                          </button>
                                                              <button class=" btn border-0 p-0">
                                                          <span  class="pen-hover  pen bottom-icon d-flex align-items-center justify-content-center">
                                                              <i update-index="${i}" class="update-btn fas fa-pen"></i>
                                                          </span>
                                                              </button>
                                                              <button  class="p-0 btn border-0 ">
                                                              <span   class=" trash-hover trash bottom-icon d-flex align-items-center justify-content-center">
                                                                  <i delete-index="${i}" class=" delete-btn  fas fa-trash"></i>
                                                              </span>
                                                              </button>
                                                      </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
    `;
  }
  document.getElementById("rightEmergency").innerHTML = emergencyStore;
  document.getElementById("rightFavorite").innerHTML = favoriteStore;

  document.getElementById("theContact").innerHTML = cartona;
  addEmergency.innerHTML = `  <span class="fw-bold text-gray-900 fs-24"> ${emCounter}
                                      </span>`;
  addFavorite.innerHTML = ` <span class="fw-bold text-gray-900 fs-24">${favCounter}
                                      </span>`;
}
container.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-star")) {
    var index = e.target.getAttribute("data-index"); // the attr = the i (index of star)
    toggleFavorite(index);
  }

  if (e.target.classList.contains("fa-heart-pulse")) {
    var heartIndex = e.target.getAttribute("data-index-two");
    toggleEmergency(heartIndex);
  }

  if (e.target.classList.contains("delete-btn")) {
    var deleteIndex = e.target.getAttribute("delete-index");
    deleteContact(deleteIndex);
  }
  if (e.target.classList.contains("update-btn")) {
    var updateIndex = e.target.getAttribute("update-index");
    updateData(updateIndex);
  }
});
function toggleEmergency(emergencyIndex) {
  array[emergencyIndex].emergencyCheckbox =
    !array[emergencyIndex].emergencyCheckbox;
  localStorage.setItem("productContainer", JSON.stringify(array));
  displayContact();
  checkEmptyState();
}
function toggleFavorite(theIndex) {
  array[theIndex].favoriteCheckbox = !array[theIndex].favoriteCheckbox;
  localStorage.setItem("productContainer", JSON.stringify(array));
  displayContact();
  checkEmptyState();
}
function total() {
  addTotalNumber.innerHTML = `
    <span class="fw-bold text-gray-900 fs-24"> ${array.length}
                                  </span>
  `;
}
function deleteContact(deleteI) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Delete Contact ?",
      text: `Are you sure you want to delete ${array[deleteI].name}? This action cannot be undone.`,
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-danger me-2",
        cancelButton: "btn btn-secondary",
      },
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })
    .then((result) => {
      if (result.isConfirmed) {
        array.splice(deleteI, 1);

        localStorage.setItem("productContainer", JSON.stringify(array));

        displayContact();
        checkEmptyState();
        total();
        numberOfContacts();

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Contact has been deleted.",
          icon: "success",
        });
      }
    });
}
// !EVENT FOR BUTTONS MODAL
afterUpdate.addEventListener("click", function () {
  if (validateAllInputs()) {
    Swal.fire({
      title: "Updated!",
      text: "Contact has been updated successfully.",
      icon: "success",
    });
    addAfterUpdate(updateIndex);
    document.getElementById("exampleModal").classList.add("show");
    document.getElementById("exampleModal").style.display = "none";
  } else {
    Swal.fire({
      title: "Invalid values!",
      icon: "error",
      draggable: true,
    });
  }
});
cancelBtn.addEventListener("click", function () {
  document.getElementById("exampleModal").classList.add("show");
  document.getElementById("exampleModal").style.display = "none";
});
closeBtn.addEventListener("click", function () {
  document.getElementById("exampleModal").classList.add("show");
  document.getElementById("exampleModal").style.display = "none";
});
function updateData(updateI) {
  updateIndex = updateI;
  document.getElementById("exampleModal").classList.add("show");
  document.getElementById("exampleModal").style.display = "block";
  document.getElementById("btnOne").classList.add("d-none");
  document.getElementById("btnUpdate").classList.remove("d-none");

  userNameInput.value = array[updateI].name;
  userNumberInput.value = array[updateI].number;
  userEmailInput.value = array[updateI].email;
  userAddressInput.value = array[updateI].address;
  userSelectInput.value = array[updateI].selectOption;
  checkboxTwo.checked = array[updateI].emergencyCheckbox;
  checkboxOne.checked = array[updateI].favoriteCheckbox;
    profile.innerHTML = `<img style="border-radius: 12px" src="${array[updateI].image}" />`;

}
function addAfterUpdate() {
  array[updateIndex].name = userNameInput.value;
  array[updateIndex].number = userNumberInput.value;
  array[updateIndex].email = userEmailInput.value;
  array[updateIndex].address = userAddressInput.value;
  array[updateIndex].selectOption = userSelectInput.value;
  array[updateIndex].emergencyCheckbox = checkboxTwo.checked;
  array[updateIndex].favoriteCheckbox = checkboxOne.checked;
  array[updateIndex].image =
    `${userImg.files[0] ? `images/${userImg.files[0].name}` : ""}`;
  displayContact();
  checkEmptyState();
  localStorage.setItem("productContainer", JSON.stringify(array));

  clearInputs();
  resetMode();
}
function numberOfContacts() {
  AllContact.innerHTML = `  <p class="text-gray-500 mt-1 fs-14">Manage and organize your ${array.length} contacts
                              </p>`;
}
searchInput.addEventListener("input", search);
function search() {
  var term = searchInput.value;
  var emCounter = 0;
  var favCounter = 0;
  var favoriteStore = "";
  var emergencyStore = "";
  var favoriteIcon = "";
  var heartIcon = "";
  var emergencyBadge = "";
  var cartona = "";
  for (var i = 0; i < array.length; i++) {
    var imageHTML = array[i].image
      ? `<img style="border-radius: 12px" src="${array[i].image}" />`
      : `<span class="text-white">${
          array[i].name.split(" ")[0].charAt(0).toUpperCase() +
          (array[i].name.split(" ")[1]
            ? array[i].name.split(" ")[1].charAt(0).toUpperCase()
            : "")
        }</span>`;

    if (array[i].emergencyCheckbox) {
      emergencyBadge = `
            <span class="my-select select-two fs-11">
              Emergency
            </span>
          `;
    }
    favoriteIcon += `
            <span
                                                              class=" border border-2 border-white card-star  position-absolute  text-white rounded-pill d-flex justify-content-center align-items-center bg-amber-400"
                                                              style="width: 20px; height: 20px;">
                                                              <i class="fas fa-star fs-8"></i>
                                                          </span>
        
        `;
    heartIcon += `
            <span
                                                              class=" border border-2 border-white card-heart  position-absolute  text-white rounded-pill d-flex justify-content-center align-items-center bg-rose-500"
                                                              style="width: 20px; height: 20px;">
                                                              <i class="fas fa-heart-pulse fs-8"></i>
                                                          </span>
        
        `;
    if (
      array[i].name.toLowerCase().includes(term.toLowerCase().trim()) ||
      array[i].number.includes(term) ||
      array[i].email.toLowerCase().includes(term.toLowerCase())
    ) {
      cartona += `        
        <div class="col-md-6 col-12">
                                      <div class="bg-white rounded-4 card-hover">
                                          <div class="top p-3 ">
                                              <div class=" d-flex align-items-center gap-2">
                                                  <div class=" ${colors[array[i].color]}  icon-one d-flex align-items-center justify-content-center position-relative">
                                                    ${imageHTML}
                                                    <div >    
                                                      ${array[i].favoriteCheckbox ? favoriteIcon : ""}
                                                    </div>
                                                    <div  >
                                                      ${array[i].emergencyCheckbox ? heartIcon : ""}
                                                    </div>

                                                  </div>
                                                  <div class="d-flex flex-column">
                                                      <span>${array[i].name}</span>
                                                      <div class="d-flex gap-2">
                                                          <div
                                                              class="add-icon phone-icon d-flex align-items-center justify-content-center">
                                                              <i class="fas fa-phone"> </i>
                                                          </div>
                                                          <div>
                                                              <span class="text-gray-600 fs-14 ">${array[i].number} </span>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="mt-3 d-flex align-items-center gap-2">
                                                  <div
                                                      class="add-icon email-icon d-flex align-items-center justify-content-center">
                                                      <i class="fas fa-envelope"> </i>
                                                  </div>
                                                  <span class="text-gray-600 fs-14">${array[i].email}</span>
                                              </div>
                                              <div class="mt-3 d-flex align-items-center gap-2">
                                                  <div
                                                      class="add-icon location-icon d-flex align-items-center justify-content-center">
                                                      <i class="fas fa-location-dot"> </i>
                                                  </div>
                                                  <span class="text-gray-600  fs-14">${array[i].address}</span>
                                              </div>
                                              <div class="d-flex align-items-center mt-3 gap-2">
                                                  <span class=" fs-11 my-select select-one ">${array[i].selectOption}</span>
                                                  <div>${emergencyBadge}</div>
                                              </div>
                                          </div>
                                          <div class="bottom">
                                              <div class="d-flex align-items-center justify-content-between">
                                                  <div class="d-flex align-items-center gap-3">
                                                      <a href="tel:${array[i].number}"
                                                          class="phone-hover add-icon-two phone-icon-two d-flex align-items-center justify-content-center">
                                                          <i class="fas fa-phone"> </i>
                                                      </a>
                                                <a href="mailto:${array[i].email}"
                          class="email-hover add-icon-two email-icon-two d-flex align-items-center justify-content-center">
                          <i class="fas fa-envelope "></i>
                          </a>
                                                  </div>
                                                      <div>
                                                          <button class="btn p-0 border-0">
                                                          <span id="starOne"
                                                          class=" star-hover star bottom-icon d-flex align-items-center justify-content-center">
                                                          <i  class="far fa-star ${array[i].favoriteCheckbox ? "text-warning fas star-after-click" : "text-gray-400 "}"
                                                              data-index="${i}">
                                                                      </i>
                                                          </span>
                                                          </button>
                                                          <button class="btn p-0 border-0">
                                                      <span class="heart-hover heart bottom-icon d-flex align-items-center justify-content-center">
                                                          <i class="fas fa-heart-pulse   ${array[i].emergencyCheckbox ? "text-danger heart-after-click" : "text-gray-400"}" data-index-two="${i}"  >
                                                          </i>
                                                      </span>
                                                          </button>
                                                              <button class=" btn border-0 p-0">
                                                          <span  class="pen-hover  pen bottom-icon d-flex align-items-center justify-content-center">
                                                              <i update-index="${i}" class="update-btn fas fa-pen"></i>
                                                          </span>
                                                              </button>
                                                              <button  class="p-0 btn border-0 ">
                                                              <span   class=" trash-hover trash bottom-icon d-flex align-items-center justify-content-center">
                                                                  <i delete-index="${i}" class=" delete-btn  fas fa-trash"></i>
                                                              </span>
                                                              </button>
                                                      </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
    `;
    }
  }
  document.getElementById("theContact").innerHTML = cartona;
}

// ~ VALIDATION
var allInputs = document.querySelectorAll(".validate-input");

for (var i = 0; i < allInputs.length; i++) {
  allInputs[i].addEventListener("input", function () {
    var regex = new RegExp(this.getAttribute("data-regex"));
    var message = document.getElementById(this.getAttribute("data-message"));

    if (regex.test(this.value)) {
      this.classList.remove("is-invalid");
      message.classList.add("d-none");
    } else {
      this.classList.add("is-invalid");
      message.classList.remove("d-none");
    }
  });
}

function validateAllInputs() {
  var allValid = true;
  for (var i = 0; i < allInputs.length; i++) {
    var regex = new RegExp(allInputs[i].getAttribute("data-regex"));
    var message = document.getElementById(
      allInputs[i].getAttribute("data-message"),
    );

    if (regex.test(allInputs[i].value)) {
      allInputs[i].classList.remove("is-invalid");
      message.classList.add("d-none");
    } else {
      allInputs[i].classList.add("is-invalid");
      message.classList.remove("d-none");
      allValid = false;
    }
  }
  return allValid;
}

function resetMode() {
  updateIndex = null;
  document.getElementById("btnOne").classList.remove("d-none");
  document.getElementById("btnUpdate").classList.add("d-none");
  document.getElementById("exampleModal").classList.remove("show");
  document.getElementById("exampleModal").style.display = "none";
}
