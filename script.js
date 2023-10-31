const form = document.getElementById("item-form");
const formButton = document.querySelector(".btn");
const intemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");
const clearAllButton = document.getElementById("clear");
const filter = document.getElementById("filter");
let isEditMode = false;

const checkUI = () => {
  if (intemList.childElementCount === 0) {
    clearAllButton.style.display = "none";
    filter.style.display = "none";
    filter.value = "";
  } else {
    clearAllButton.style.display = "block";
    filter.style.display = "block";
  }
  isEditMode = false;
  changeFormButton("add");
  itemInput.value = "";
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
  checkUI();
};

const getParsedItemsFromLocalStorage = () => {
  let items = [];
  items = JSON.parse(localStorage.getItem("items")) ?? items;
  return items;
};

const removeItemFromLocalStorage = (itemToRemove) => {
  let items = getParsedItemsFromLocalStorage();
  items = items.filter((i) => i !== itemToRemove);
  localStorage.setItem("items", JSON.stringify(items));
};

const removeItem = (item) => {
  removeItemFromLocalStorage(item.parentElement.parentElement.textContent);
  item.parentNode.parentNode.remove();
};

const editItem = (text) => {
  const itemToEdit = document.querySelector(".edit-mode");
  const storedItems = getParsedItemsFromLocalStorage();
  const updatedItems = storedItems.map((sI) =>
    sI === itemToEdit.textContent ? text : sI
  );
  localStorage.setItem("items", JSON.stringify(updatedItems));
  itemToEdit.firstChild.textContent = text;
  itemToEdit.classList.remove("edit-mode");
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newItemText = itemInput.value;
  if (!validateInput(newItemText)) return;
  if (isEditMode) {
    editItem(itemInput.value);
  } else {
    addItemToLocalStorage(newItemText);
    const newListItem = createListItem(newItemText);
    addItemToList(newListItem);
  }
  checkUI();
};

const handleListItemColors = (item) => {
  const listItems = document.querySelectorAll("li");
  listItems.forEach((item) => item.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
};

const changeFormButton = (option) => {
  if (option === "add") {
    formButton.innerHTML = '<i class="fa-solid fa-plus"></i>   Add Item';
    formButton.style.backgroundColor = "#333";
  } else {
    formButton.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
    formButton.style.backgroundColor = "green";
  }
};

const handleEditItem = (item) => {
  isEditMode = true;
  item.classList.add("edit-mode");
  handleListItemColors(item);
  changeFormButton("edit");
  itemInput.value = item.textContent;
};

const handleListItemClick = (e) => {
  const item = e.target;
  if (
    item.parentElement.classList.contains("remove-item") &&
    confirm("Are you sure you want to remove this item?")
  ) {
    removeItem(item);
    checkUI();
  } else {
    handleEditItem(item);
  }
};

const clearAll = () => {
  if (confirm("Are you sure you want to remove this item?")) {
    while (intemList.firstChild) {
      intemList.removeChild(intemList.firstChild);
    }
    removeAllItemsFromLocalStorage();
    checkUI();
  }
};

const handleFilter = (e) => {
  const textToFilter = e.target.value;
  const listItems = document.querySelectorAll("li");
  for (const item of listItems) {
    item.style.display = item.innerText.includes(textToFilter)
      ? "flex"
      : "none";
  }
};

const addItemToLocalStorage = (item) => {
  const items = getParsedItemsFromLocalStorage();
  items.push(item);
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
  intemList.addEventListener("click", handleListItemClick);
  clearAllButton.addEventListener("click", clearAll);
  filter.addEventListener("keyup", handleFilter);
  document.addEventListener("DOMContentLoaded", populateListFromLocalStorage);
  checkUI();
};

init();
