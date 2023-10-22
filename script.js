const form = document.getElementById('item-form');
const intemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');

const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') { 
        alert('Please write down an item');
        return;
    }
    const listItem = document.createElement('li');
    const removeButton = '<button class="remove-item btn-link text-red"><i class="fa-solid fa-xmark"></i></button>';
    listItem.innerHTML = newItem + removeButton;
    intemList.appendChild(listItem);
    itemInput.value = '';
}

form.addEventListener("submit", handleSubmit);
