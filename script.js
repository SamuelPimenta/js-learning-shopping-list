const form = document.getElementById('item-form');
const intemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const clearAllButton = document.getElementById('clear');
const filter = document.getElementById('filter');

const checkIfListIsEmpty = () => {
    if(intemList.childElementCount === 0) {
        clearAllButton.style.display = 'none';
        filter.style.display = 'none';
    }else{
        clearAllButton.style.display = 'block'
        filter.style.display = 'block';
    }
}

const validateInput = (input) => {
    if (input === '') { 
        alert('Please write down an item');
        return false;
    }
    return true;
}

const createListItem = (text) => {
    const listItem = document.createElement('li');
    const removeButton = '<button class="remove-item btn-link text-red"><i class="fa-solid fa-xmark"></i></button>';
    listItem.innerHTML = text + removeButton;
    return listItem;
}

const handleSubmit = (e) => {
    e.preventDefault();
    const newItemText = itemInput.value;
    if(!validateInput(newItemText)) return;
    const newListItem = createListItem(newItemText);
    intemList.appendChild(newListItem);
    checkIfListIsEmpty();
    itemInput.value = '';
}

const deleteItem = (e) => {
    if(e.target.parentElement.classList.contains('remove-item') && 
    confirm('Are you sure you want to remove this item?')) {
        e.target.parentNode.parentNode.remove();
        checkIfListIsEmpty();
    };
}

const clearAll = () => {
    if (confirm('Are you sure you want to remove this item?')) {
        while(intemList.firstChild) {
        intemList.removeChild(intemList.firstChild);
    }
    checkIfListIsEmpty();
    }
}

form.addEventListener("submit", handleSubmit);
intemList.addEventListener("click", deleteItem);
clearAllButton.addEventListener("click", clearAll)

checkIfListIsEmpty();