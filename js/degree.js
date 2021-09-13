const selectedDegree = document.querySelector(".select-Degree");
const optionsContainerDegree = document.querySelector(".optionsDegree");
const searchBoxEnd = document.querySelector(".search-Degree input");

const optionsListDegree = document.querySelectorAll(".option");

selectedDegree.addEventListener("click", () => {
  optionsContainerDegree.classList.toggle("active");

  searchBoxEnd.value = "";
  filterListDegree("");

  if (optionsContainerDegree.classList.contains("active")) {
    searchBoxEnd.focus();
  }
});

optionsListDegree.forEach(o => {
  o.addEventListener("click", () => {
    selectedDegree.innerHTML = o.querySelector(".labelDegree").innerHTML;
    optionsContainerDegree.classList.remove("active");
  });
});

searchBoxEnd.addEventListener("keyup", function(e) {
  filterListDegree(e.target.value);
});

const filterListDegree = searchTerm => {
  searchTerm = searchTerm.toLowerCase();
  optionsListDegree.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};
