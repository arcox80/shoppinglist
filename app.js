// Single state object
var state = {
    items: []
};

// State modification functions
var addItem = function(state, item) {
    state.items.push(item);
};

// Render functions
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
        return '<li><span class="shopping-item">' + item + '</span></li>';
    });
    element.html(itemsHTML);
};

var listModifiers = function() {
  var listDiv = $('<div class="shopping-item-controls">' +
                    '<button class="shopping-item-toggle">' +
                      '<span class="button-label">check</span>' +
                    '</button>' +
                    '<button class="shopping-item-delete">' +
                      '<span class="button-label">delete</span>' +
                    '</button>' +
                  '</div>');
  $('.shopping-item').append(listDiv);
};

// Event listeners
$('.js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
    listModifiers();
});
