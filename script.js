const form = document.getElementById("item-form");
const intemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");
const clearAllButton = document.getElementById("clear");
const filter = document.getElementById("filter");

const checkIfListIsEmpty = () => {
  if (intemList.childElementCount === 0) {
    clearAllButton.style.display = "none";
    filter.style.display = "none";
    filter.value = "";
  } else {
    clearAllButton.style.display = "block";
    filter.style.display = "block";
  }
};

const validateInput = (input) => {
  if (input === "") {
    alert("Please write down an item");
    return false;
  }
  return true;
};

const createListItem = (text) => {
  const listItem = document.createElement("li");
  const removeButton =
    '<button class="remove-item btn-link text-red"><i class="fa-solid fa-xmark"></i></button>';
  listItem.innerHTML = text + removeButton;
  return listItem;
};

const addItemToList = (item) => {
  intemList.appendChild(item);
  checkIfListIsEmpty();
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newItemText = itemInput.value;
  if (!validateInput(newItemText)) return;
  addItemToLocalStorage(newItemText);
  const newListItem = createListItem(newItemText);
  addItemToList(newListItem);
  itemInput.value = "";
};

const deleteItem = (e) => {
  if (
    e.target.parentElement.classList.contains("remove-item") &&
    confirm("Are you sure you want to remove this item?")
  ) {
    removeItemFromLocalStorage(
      e.target.parentElement.parentElement.textContent
    );
    e.target.parentNode.parentNode.remove();
    checkIfListIsEmpty();
  }
};

const clearAll = () => {
  if (confirm("Are you sure you want to remove this item?")) {
    while (intemList.firstChild) {
      intemList.removeChild(intemList.firstChild);
    }
    removeAllItemsFromLocalStorage();
    checkIfListIsEmpty();
  }
};

const handleFilter = (e) => {
  const textToFilter = e.target.value;
  console.log(textToFilter);
  const listItems = document.querySelectorAll("li");
  for (const item of listItems) {
    item.style.display = item.innerText.includes(textToFilter)
      ? "flex"
      : "none";
  }
};

const getParsedItemsFromLocalStorage = () => {
  let items = [];
  items = JSON.parse(localStorage.getItem("items")) ?? items;
  return items;
};

const addItemToLocalStorage = (item) => {
  const items = getParsedItemsFromLocalStorage();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
};

const removeItemFromLocalStorage = (itemToRemove) => {
  let items = getParsedItemsFromLocalStorage();
  items = items.filter((i) => i !== itemToRemove);
  localStorage.setItem("items", JSON.stringify(items));
};

const removeAllItemsFromLocalStorage = () => {
  localStorage.removeItem("items");
};

const populateListFromLocalStorage = () => {
  const items = getParsedItemsFromLocalStorage();
  items.forEach((item) => {
    addItemToList(createListItem(item));
  });
};

const init = () => {
  form.addEventListener("submit", handleSubmit);
  intemList.addEventListener("click", deleteItem);
  clearAllButton.addEventListener("click", clearAll);
  filter.addEventListener("keyup", handleFilter);
  document.addEventListener("DOMContentLoaded", populateListFromLocalStorage);
  checkIfListIsEmpty();
};

init();
