ons.ready(() => {
  
  
  monaca.InAppUpdater.autoUpdate( {
    connectDelay : 0000,
    connectTimeout : 30000,
    readTimeout: 300000,
    nextTask : function(res) {
      if (res.requireRestart) {
        monaca.InAppUpdater.updateAndRestart().then(
          function() { },
          function(fail) { alert( JSON.stringify(fail) ); }
        );
      } else {
        alert("App is started!");
      }
    },
    failTask : function(res) {
      monaca.InAppUpdater.showAlertDialog(
        { title : "Error Code "+res.error.code ,
          message : res.error.message ,
          button : { label : "OK" , handler : function() { } }
        } ).then(
        function(json) {  },
        function(fail) { }
      );
    }
  });
  
  let todos;
  
  todos = localStorage.getItem('todos')
  todos = todos ? JSON.parse(todos) : [];
  show_todos(todos);
  
  // タスクを追加するイベント
  $('.add').on('click', (e) => {
    e.preventDefault();
    
    let todo = $('#todo').val();
    todos.push(todo);
    
    // タスクを保存する
    localStorage.setItem('todos', JSON.stringify(todos));
    $('#todo').val('');
    show_todos(todos);
  });
  
  // タスクを削除するイベント
  $(document).on('click', '.delete', (e) => {
    e.preventDefault();
    const index = $(e.target).data('index');
    
    todos.splice(index, 1);
    // タスクを保存する
    localStorage.setItem('todos', JSON.stringify(todos));
    show_todos(todos);
  });
});

let show_todos = (todos) => {
  $('#todos').empty();
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    $('#todos').append(`
      <ons-list-item class="item">
        <div class="center">${todo}</div>
        <div class="right">
          <ons-icon icon="fa-trash-o" class="delete" data-index=${i}>
        </ons-icon>
        </div>
      </ons-list-item>
    `);
  }
}
