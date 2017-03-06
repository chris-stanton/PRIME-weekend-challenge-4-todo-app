console.log('listening on port: 5000');

$(document).ready(function(){

//button click listeners
  getThingsToDo();
    $('#submitThingToDo').on('click', function(){
  postThingToDo();
    $('#taskForm').find('input').val('');
  });//end of submit on.click function
    $('#toDoList').on('click', '.complete', completeThingToDo);
    $('#toDoList').on('click', '.delete', deleteThingToDo);


// GET ajax request
function getThingsToDo(){
  $.ajax({
    type: 'GET',
    url: '/thingsToDo',
    success: function(thingToDo){
      appendThingToDo(thingToDo);
    },//end of success function()
    error: function(){
      console.log('AJAX GET error');
    }//end of error function()
  });//end of ajax
}//end of getThingsToDo()

// appends to DOM
function appendThingToDo(thingToDo){
  $("#toDoList").empty();
  for (var i = 0; i < thingToDo.length; i++) {
    var toDo = thingToDo[i];
    $("#toDoList").append('<div class="' + toDo.status + '" data-id="' + toDo.id + '"></div>');
    $('#toDoList').children().last().append('<h2 id="todoBox"> ' + toDo.description + '</h2>');
    $('#toDoList').children().last().append('<button class="complete">Completed</button>');
    $('#toDoList').children().last().append('<button class="delete">Delete</button>');
  }//end of for loop
}//end of appendThingToDo()

// POST ajax request
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
    },//end of success function()
    error: function(){
      console.log('ajax POST error');
    }//end of error function()
  });//end of ajax
}//end of postThingToDo()

//DELETE ajax request
function deleteThingToDo(){
  var id = $(this).parent().data('id');
  $.ajax({
    type: 'DELETE',
    url: '/thingsToDo/' + id,
    success: function(result){
      getThingsToDo();
    },//end of success function()
    error: function(result){
      console.log('ajax DELETE error');
    }//end of error function()
  });//end of ajax
}//end of deleteThingToDo()

//CSS class changer
function completeThingToDo(){
  $(this).parent().removeClass('incomplete').addClass('completeToDo');
}//end of completeThingToDo()
});//end of do.ready
