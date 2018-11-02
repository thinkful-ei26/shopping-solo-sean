/*eslint-env jquery*/
'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>
  `;
}

function generateShoppingItemString(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList() {
  const shoppingListItemString = generateShoppingItemString(STORE);

  $('.js-shopping-list').html(shoppingListItemString);
}

function handleNewItemSubmit() {

}

function handleItemClickChecked() {

}

function handleItemDeleteChecked() {

}

function handleShoppingList() {
  renderShoppingList();
  handleItemClickChecked();
  handleItemDeleteChecked();
  handleNewItemSubmit();
}

$(handleShoppingList);