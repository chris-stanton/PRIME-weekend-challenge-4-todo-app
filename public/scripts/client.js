console.log("this works");

$(document).ready(function() {

  getThingsToDo();
    $('#submitThingToDo').on('click', function() {
  postThingToDo();
    $('#taskForm').find('input').val('');
  });
    $('#toDoList').on('click', '.complete', completeThingToDo);
    console.log('complete');
    $('#toDoList').on('click', '.delete', deleteThingToDo);
    console.log('delete');
});

//pulls list from database
function getThingsToDo() {
  $.ajax({
    type: 'GET',
    url: '/thingsToDo',
    success: function(thingToDo) {
      appendThingToDo(thingToDo);
    },
    error: function() {
      console.log('getThingsToDo error');
    }
  });
}

//appends to DOM
function appendThingToDo(thingToDo) {
  $("#toDoList").empty();
  for (var i = 0; i < thingToDo.length; i++) {
    var toDo = thingToDo[i];
    $("#toDoList").append('<div class="' + toDo.status + '" data-id="' + toDo.id + '"></div>');
    $('#toDoList').children().last().append('<h2 id="todoBox"> ' + toDo.description + '</h2>');
    $('#toDoList').children().last().append('<button class="complete">Complete</button>');
    $('#toDoList').children().last().append('<button class="delete">Delete</button>');
  }
}

//ajax update database
function postThingToDo(){
  event.preventDefault();
  var postThing = {};
  $.each($('#toDoInputs').serializeArray(), function(i, field){
    postThing[field.name] = field.value;
  });
  postThing.status = 'incomplete';

  $.ajax({
    type: 'POST',
    url: '/thingsToDo',
    data: postThing,
    success: function(response){
      getThingsToDo();
    },
    error: function(){
      console.log('could not post a new task');
    }
  });
}

//ajax delete from database
function deleteThingToDo(){
  var id = $(this).parent().data('id');
  $.ajax({
    type: 'DELETE',
    url: '/thingsToDo/' + id,
    success: function(result){
      getThingsToDo();
    },
    error: function(result){
      console.log('delete broken');
    }
  });
}

function completeThingToDo(){
  $(this).parent().removeClass('incomplete').addClass('completeToDo');
}
