/*eslint-env jquery*/
'use strict';

const STORE = {
  list: [{name: 'apples', checked: false}, {name: 'oranges', checked: false}, {name: 'milk', checked: true}, {name: 'bread', checked: false}],
  hideCompleted: false,
  searchTerm: null
};

function generateItemElement(item, itemIndex) {
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
  // const items = shoppingList.map((item, index) => generateItemElement(item, index));
  const items = shoppingList.map((item) => generateItemElement(item, STORE.list.findIndex(element => element.name === item.name)));
  // because this is called with a filtered list, generateItemElement needs to receive the index of the element from the
  // original list
  // .findIndex() is only a partial solution, because if two elements exist with the same name, it only returns the first
  // I've decided to disallow duplicate names
  return items.join('');
}

function renderShoppingList() {
  let listFiltered = [...STORE.list];
  if (STORE.hideCompleted) listFiltered = listFiltered.filter(item => !item.checked);
  if (STORE.searchTerm) listFiltered = listFiltered.filter(item => item.name.includes(STORE.searchTerm));
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
    let isDuplicate = false;
    STORE.list.forEach(element => {if (newItem === element.name) isDuplicate = true;});
    // console.log(isDuplicate);
    if (isDuplicate) window.alert('Duplicate item disallowed');
    if (newItem && !isDuplicate) addItemToShoppingList(newItem); // does not add item if the input was empty
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
}

function handleHideCompleteClicked() {
  $('#toggle-filter-completed').on('click', () => {
    toggleHideComplete();
    renderShoppingList();
  });
}

function search(searchTerm) {
  STORE.searchTerm = searchTerm;
}

function handleSearchSubmit() {
  $('#search-form').submit(event => {
    event.preventDefault();
    const term = $('.js-search-entry').val();
    // console.log(term);
    if (term) search(term);
    else search(undefined); // reset STORE.searchTerm if search is empty
    renderShoppingList();
  });
}

function handleShoppingList() {
  renderShoppingList();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  // try {handleNewItemSubmit();} catch (e) {};
  handleNewItemSubmit();
  handleHideCompleteClicked();
  handleSearchSubmit();
}

$(handleShoppingList);