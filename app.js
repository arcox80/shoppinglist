// Single state object
var state = {
    items: []
};

// State modification functions
var addItem = function(state, item) {
    state.items.push({
      displayName: item,
      checkedOff: false
    });
};

function deleteItem(state, itemIndex) {
  state.items.splice(itemIndex, 1);
}

// Render functions
var renderList = function(state, element) {
    element.empty();
    var itemsHTML = state.items.map(function(item, index) {
        return listModifiers(item, index);
    });
    element.append(itemsHTML);
};

var deleteClosure = function(index) {
  return function(event) {
    deleteItem(state, index);
    renderList(state, $('.shopping-list'));
  };
};

var toggleClosure = function(index) {
  return function(event) {
    state.items[index].checkedOff = !state.items[index].checkedOff;
    renderList(state, $('.shopping-list'));
  };
};

var listModifiers = function(item, index) {
  var listDiv = $('<li>' +
                    '<span class="shopping-item"></span>' +
                    '<div class="shopping-item-controls">' +
                      '<button class="shopping-item-toggle">' +
                        '<span class="button-label">check</span>' +
                      '</button>' +
                      '<button class="shopping-item-delete">' +
                        '<span class="button-label">delete</span>' +
                      '</button>' +
                    '</div>' +
                 '</li>');
  listDiv.find('.shopping-item').text(item.displayName);
  if (item.checkedOff) {
    listDiv.find('.shopping-item').toggleClass('shopping-item__checked');
  }
  listDiv.find('.shopping-item-toggle').click(toggleClosure(index));
  listDiv.find('.shopping-item-delete').click(deleteClosure(index));
  return listDiv;
};

// Event listeners
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
    listModifiers();
});
