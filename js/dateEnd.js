const selectEnd = document.querySelector(".select-end");
const optionsContainerEnd = document.querySelector(".optionsEnd");
const searchEnd = document.querySelector(".search-end input");

const optionsListEnd = document.querySelectorAll(".option");

selectEnd.addEventListener("click", () => {
  optionsContainerEnd.classList.toggle("active");

  searchEnd.value = "";
  filterListEnd("");

  if (optionsContainerEnd.classList.contains("active")) {
    searchEnd.focus();
  }
});

optionsListEnd.forEach(o => {
  o.addEventListener("click", () => {
    selectEnd.innerHTML = o.querySelector(".labelName").innerHTML;
    optionsContainerEnd.classList.remove("active");
  });
});

searchEnd.addEventListener("keyup", function(e) {
  filterListEnd(e.target.value);
});

const filterListEnd = searchTerm => {
  searchTerm = searchTerm.toLowerCase();
  optionsListEnd.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};
