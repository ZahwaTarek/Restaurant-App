/// <reference types="../@types/@types/jquery"/>

const searchName = $("#nameSearch");
const searchFName = $("#firstLetterSearch");
const inputName = $("#inputName");
const inputEmail = $("#inputEmail");
const inputNumber = $("#inputNumber");
const inputAge = $("#inputAge");
const inputPassword = $("#inputPassword");
const inputRePassword = $("#inputRePassword");
const loading = $(".loading");

var searchValue;

function animateNavBar() {
  $(".side-nav").animate({ left: "0" }, 500);
  $("#nav-content").fadeOut(500, function () {
    $("#nav-content").css("display", "none");
  });
}

function emptyAll() {
  $(".search-data").empty();
  $(".categ-data").empty();
  $(".detailed-categ-data").empty();
  $("#firstPage").empty();
  $(".mealIngredients").empty();
  $(".area-content").empty();
  $(".area-details").empty();
  $(".ingred-content").empty();
  $(".ingred-details").empty();
}

async function search() {
  animateNavBar();
  emptyAll();

  $(".search-row").removeClass("d-none").addClass("d-flex");
  $(".form-row").removeClass("d-flex").addClass("d-none");
  $("#nameSearch").on("input", function () {
    searchValue = searchName.val();
    console.log(searchValue);
    searchNamee(searchValue);
  });

  $("#firstLetterSearch").on("input", function () {
    let input = $(this).val();

    // Trim the value to only the first character
    if (input.length > 1) {
      $(this).val(input.charAt(0));
    }

    // Ensure the input is only a single letter
    if (!/^[a-zA-Z]$/.test(input.charAt(0))) {
      $(this).val("");
    }
    console.log(input);
    searchfName(input);
  });
}
// search()

async function searchNamee(searchValue) {
  emptyAll();

  loading.removeClass("d-none");
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    );
    const data = await response.json();
    console.log(data.meals);
    for (let i = 0; i < data.meals.length; i++) {
      $(".search-data").append(`<div class="col-md-3 g-3 text-center">
                  <div class="item-categ card bg-black  position-relative">
                    <img id="${data.meals[i].idMeal}" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}" class="img-fluid">
                    <div id="${data.meals[i].idMeal}" class="img-content card-content d-flex ">
                      <h3 class=" text-black ms-2 align-self-center">${data.meals[i].strMeal}</h3>
                    </div>
                  </div>
                </div>`);
    }

    $(".search-data").on("click", function (e) {
      // console.log(mealid)
      console.log(e.target);
      displayMealDetails(e.target.id);
    });
  } catch (error) {
    console.log("error fetching the data", error);
  }finally{
    loading.addClass("d-none")
  }
}

async function searchfName(input) {
  emptyAll();
  loading.removeClass("d-none");
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
    );
    const data = await response.json();
    console.log(data.meals);
    for (let i = 0; i < data.meals.length; i++) {
      $(".search-data").append(`<div class="col-md-3 g-3 text-center">
                  <div class="item-categ card bg-black  position-relative">
                    <img id="${data.meals[i].idMeal}" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}" class="img-fluid">
                    <div id="${data.meals[i].idMeal}" class="img-content card-content  ">
                      <h3>${data.meals[i].strMeal}</h3>
                    </div>
                  </div>
                </div>`);
    }

    $(".search-data").on("click", function (e) {
      // console.log(mealid)
      console.log(e.target);
      displayMealDetails(e.target.id);
    });
  } catch (error) {
    console.log("error fetching the data", error);
  }finally{
    loading.addClass("d-none")
  }
}

$(".nav-btn").on("click", function () {
  let navContent = $("#nav-content");
  let display = navContent.css("display");

  if (display === "none") {
    navContent.css("display", "flex").hide().fadeIn(500);
    
    
  } else {
    navContent.fadeOut(500, function () {
      navContent.css("display", "none");
     
    });
  }

  let sideNav = $(".side-nav");
  let currentLeft = sideNav.css("left");

  if (currentLeft === "0px" || currentLeft === "0") {
    sideNav.animate({ left: "14rem" }, 500);
  } else {
    sideNav.animate({ left: "0" }, 500);
  }
});

$("#categ").on("click", function () {
  console.log("jj");
  displayCategories();
});

$("#area").on("click", function () {
  console.log("jj");
  areas();
});
$("#ingredients").on("click", function () {
  console.log("jj");
  displayIngredients();
});
$("#search").on("click", function () {
  console.log("jj");
  search();
});

$("#form-row").on("click", function () {
  console.log("jj");

  validation();
});

// First Page Displayed

function firstPage() {
  searchNamee(" ");
}

firstPage()

async function displayCategories() {
  animateNavBar();
  $(".search-row").removeClass("d-flex").addClass("d-none");
  $(".form-row").removeClass("d-flex").addClass("d-none");

  emptyAll();

  loading.removeClass("d-none");
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();
    //  console.log(data.categories);

    for (let i = 0; i < data.categories.length; i++) {
      // console.log(data.categories[i]);
      $(".categ-data").append(`<div class="col-md-3 g-3 text-center">
                  <div class="item-categ card bg-black  position-relative">
                    <img id="${data.categories[i].strCategory}" src="${data.categories[i].strCategoryThumb}" alt="${data.categories[i].strCategory}" class="img-fluid">
                    <div id="${data.categories[i].strCategory}"  class="img-content card-content  ">
                      <h3 id="${data.categories[i].strCategory}" >${data.categories[i].strCategory}</h3>
                      <p id="${data.categories[i].strCategory}" >${data.categories[i].strCategoryDescription}</p>

                    </div>
                  </div>
                </div>`);
      // console.log(data.categories[1]);
    }

    $(".categ-data").on("click", function (e) {
      // console.log("hii", e.target.alt);
      displayCategory(e.target.id);
    });
  } catch (error) {
    console.log("error fetching the data", error);
  }finally{
    loading.addClass("d-none")
  }
}

// $("#categ").on("click",function(){
//   displayCategories()
// })

// displayCategory("Beef");

async function displayCategory(categ) {
  emptyAll();
  loading.removeClass("d-none");
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`
    );
    const data = await response.json();
    // console.log(data.meals);

    console.log(data);

    for (let i = 0; i < data.meals.length; i++) {
      var mealid = data.meals[i].idMeal;
      // console.log(mealid);
      // console.log(data.meals[i]);
      $(".detailed-categ-data").append(`<div class="col-md-3 g-3 text-center">
                 <div class="item-categ card bg-black  position-relative">
                   <img id="${mealid}" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}" class="img-fluid">
                   <div id="${mealid}" class="img-content card-content  ">
                     <h3>${data.meals[i].strMeal}</h3>

                   </div>
                 </div>
               </div>`);
    }
    $(".detailed-categ-data").on("click", function (e) {
      // console.log(mealid)

      displayMealDetails(e.target.id);
    });
  } catch (error) {
    console.log("error fetching the data", error);
  } finally {
    loading.addClass("d-none");
  }
}
// displayCategories()

// displayCategories();

async function displayMealDetails(mealID) {
  animateNavBar();

  loading.removeClass("d-none");
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    const data = await response.json();
    // console.log(data.meals[0].strMeasure1 , data.meals[0].strIngredient1);

    if (!data.meals) {
      console.error("No meals found for the given ID.");
      return;
    }
    const meal = data.meals[0];

    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      const tags = meal[`strTags${i}`];

      if (
        ingredient &&
        ingredient.trim() !== "" &&
        measure &&
        measure.trim() !== ""
      ) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    // console.log(ingredients);

    emptyAll();

    $(".mealIngredients").append(`  <div class="col-md-6 mt-4 text-white">
              <img src="${data.meals[0].strMealThumb}" class="img-fluid" alt="${
      data.meals[0].strMeal
    }">
              <h3>${data.meals[0].strMeal}</h3>
            </div>
            <div class="col-md-6 mt-4 text-white">
              <h3>Instructions</h3>
              <p>${data.meals[0].strInstructions}</p>
               <div class="spans d-flex flex-column">
              <span>Area: ${data.meals[0].strArea}</span>
              <span>Category: ${data.meals[0].strCategory}</span>
              <span>Recipes: </span>
            </div>
              
              <div class="ingredients mt-3 d-flex flex-wrap gap-2">
                 
              </div>
              <span>Tags: </span>
              <div class="tags mb-3 mt-4 text-black d-flex flex-wrap gap-2">
                <div class="alert alert-danger p-1 ">${
                  data.meals[0].strTags !== null
                    ? data.meals[0].strTags
                    : "No Tags"
                }</div>
              </div>
              <div class="btn-grouping">
                <button class="btn btn-success"><a target="_blank" href="${
                  data.meals[0].strSource
                }">Source</a></button>
                <button class="btn btn-danger"><a target="_blank" href="${
                  data.meals[0].strYoutube
                }">Youtube</a></button>

              </div>

            </div>`);

    for (var i = 0; i < ingredients.length; i++) {
      $(".ingredients").append(
        `<div class="alert alert-info p-1">${ingredients[i]}</div>`
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.addClass("d-none");
  }
}

// displayMealDetails(52874)

async function areas() {
  animateNavBar();
  $(".search-row").removeClass("d-flex").addClass("d-none");
  $(".form-row").removeClass("d-flex").addClass("d-none");

  emptyAll();

  loading.removeClass("d-none");
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const data = await response.json();

    for (let i = 0; i < data.meals.length; i++) {
      $(".area-content").append(`   <div class="col-md-3">
              <div class="item2 text-white m-5">
                <i id="${data.meals[i].strArea}" class="fa-solid fa-house-laptop fa-4x"></i>
                <h3 id="${data.meals[i].strArea}" > ${data.meals[i].strArea}</h3>
              </div>
            </div>
           `);
    }

    $(".area-content").on("click", function (e) {
      // console.log(e.target.id);
      displayAres(e.target.id);
    });
  } catch (error) {
    console.log("error fetching the data", error);
  } finally {
    loading.addClass("d-none");
  }
}

async function displayAres(area) {
  emptyAll();
  // console.log(area);
  loading.removeClass("d-none");
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await response.json();

    for (let i = 0; i < data.meals.length; i++) {
      $(".area-details").append(` <div class="col-md-3 g-3 text-center">
              <div class="item-categ card bg-black  position-relative">
                <img src="${data.meals[i].strMealThumb}" id="${data.meals[i].idMeal}" alt="${data.meals[i].strMeal}" class="img-fluid">
                <div  id="${data.meals[i].idMeal}"  class="img-content card-content  ">
                  <h3 >${data.meals[i].strMeal}</h3>

                </div>
              </div>
            </div>
           `);
    }

    $(".area-details").on("click", function (e) {
      console.log(e.target.id);
      displayMealDetails(e.target.id);
    });
  } catch (error) {
    console.log("error fetching the data", error);
  } finally {
    loading.addClass("d-none");
  }
}

// areas()

async function displayIngredients() {
  animateNavBar();
  $(".search-row").removeClass("d-flex").addClass("d-none");
  $(".form-row").removeClass("d-flex").addClass("d-none");

  emptyAll();

  loading.removeClass("d-none");
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const data = await response.json();

    for (let i = 0; i < 20; i++) {
      let description = data.meals[i].strDescription;
      let shortDescription =
        description.length > 100
          ? description.substring(0, 150) + "..."
          : description;
      $(".ingred-content").append(`  <div class="col-md-3">
                  <i id="${data.meals[i].strIngredient}" class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h3 id="${data.meals[i].strIngredient}">${data.meals[i].strIngredient}</h3>
                  <p id="${data.meals[i].strIngredient}">${shortDescription}</p>
                </div>
           `);
    }

    $(".ingred-content").on("click", function (e) {
      console.log(e.target.id);
      displayIngredientsDetails(e.target.id);
    });
  } catch (error) {
    console.log("error fetching the data", error);
  } finally {
    loading.addClass("d-none");
  }
}

async function displayIngredientsDetails(ingred) {
  emptyAll();
  loading.removeClass("d-none");
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
    );
    const data = await response.json();
    console.log(data.meals);
    for (let i = 0; i < 20; i++) {
      // console.log(data.meals[i].strMealThumb);
      $(".ingred-details").append(`  <div class="col-md-3 g-3 text-center">
              <div class="item-categ card bg-black  position-relative">
                <img src="${data.meals[i]?.strMealThumb}" id="${data.meals[i]?.idMeal}" alt="${data.meals[i]?.strMeal}" class="img-fluid">
                <div id="${data.meals[i]?.idMeal}" class="img-content card-content  ">
                  <h3 >${data.meals[i]?.strMeal}</h3>

                </div>
              </div>
            </div>
           `);
      // console.log(data.meals?[i].idMeal);
    }
    // console.log("hii");
    $(".ingred-details").on("click", function (e) {
      console.log(e.target);

      displayMealDetails(e.target.id);
    });
  } catch (error) {
    console.log("error fetching the data", error);
  } finally {
    loading.addClass("d-none");
  }
}

// displayIngredientsDetails()
//  displayIngredients()

let formArray = [];

function contactUs() {
  if (
    isValid &&
    inputAge.val() != "" &&
    inputName.val() != "" &&
    inputEmail.val() != "" &&
    inputPassword.val() != "" &&
    inputNumber.val() != "" &&
    inputRePassword.val() != ""
  ) {
    $("span").removeClass("d-block").addClass("d-none");

    let fArray = {
      name: inputName.val(),
      email: inputEmail.val(),
      number: inputNumber.val(),
      age: inputAge.val(),
      password: inputPassword.val(),
      repassword: inputRePassword.val(),
    };
    formArray.push(fArray);
    console.log(formArray);
    clearInputs();
  } else {
    $("span").removeClass("d-none").addClass("d-block");
  }

  // console.log(regex.inputName.test(fArray.name));
}
var isValid;
function validation() {
  animateNavBar();
  $(".search-row").removeClass("d-flex").addClass("d-none");

  emptyAll();

  $(".form-row").removeClass("d-none").addClass("d-flex");

  let regex = {
    inputName: /^[a-zA-Z]{2,10}$/,
    inputEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    inputPassword: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]){2,15}/,
    inputRePassword: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]){2,15}/,
    inputNumber: /^0[1-9]{10}$/,
    inputAge: /^[1-9]{1,2}$/,
  };

  $(".form-control").on("input", function (e) {
    let val = e.target.value;
    // console.log(e.target.value);
    // console.log(regex[e.target.id].test(val));

    if (regex[e.target.id]?.test(val)) {
      // console.log(("yess"));
      e.target.nextElementSibling.classList.replace("d-block", "d-none");
      isValid = true;
    } else {
      // console.log("nooo");
      console.log(e.target.nextElementSibling);
      e.target.nextElementSibling.classList.replace("d-none", "d-block");
      isValid = false;
    }
  });
}

$(".form-btn2").on("click", function () {
  contactUs();
});

function clearInputs() {
  inputAge.val("");
  inputEmail.val("");
  inputName.val("");
  inputNumber.val("");
  inputPassword.val("");
  inputRePassword.val("");
}
