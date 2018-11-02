/*eslint-env jquery*/
'use strict';

const STORE = {
  list: [{name: 'apples', checked: false}, {name: 'oranges', checked: false}, {name: 'milk', checked: true}, {name: 'bread', checked: false}],
  hideCompleted: false
};

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
  let listFiltered = [...STORE.list];
  if (STORE.hideCompleted) listFiltered = listFiltered.filter(item => !item.checked);
  const shoppingListItemString = generateShoppingItemString(listFiltered);

  $('.js-shopping-list').html(shoppingListItemString);
}

function addItemToShoppingList(itemName) {
  STORE.list.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit( function(event) {
    event.preventDefault();
    
    const newItem = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    if (newItem) addItemToShoppingList(newItem); // does not add item if the input was empty
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  // console.log('toggled item');
  STORE.list[itemIndex].checked = !STORE.list[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteListItem(itemIndex) {
  STORE.list.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // console.log(itemIndex);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}

function toggleHideComplete() {
  STORE.hideCompleted = !STORE.hideCompleted;
  renderShoppingList();
}

function handleHideCompleteClicked() {
  $('#toggle-filter-completed').on('click', event => {
    toggleHideComplete();
  });
}

function handleShoppingList() {
  renderShoppingList();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleNewItemSubmit();
  handleHideCompleteClicked();
}

$(handleShoppingList);