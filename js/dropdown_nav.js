const selected = document.querySelector(".selected-container");
        const dropdownList = document.querySelector(".dropdown-list-container");

        selected.addEventListener("click",() => {
            dropdownList.classList.toggle("dropdown-active");
        })