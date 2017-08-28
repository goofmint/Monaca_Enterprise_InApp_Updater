ons.ready(() => {  
  monaca.InAppUpdater.autoUpdate({
    // サーバー接続を開始するまでの待機時間
    connectDelay : 1000,
    // タイムアウトする時間
    connectTimeout : 30000,
    // 読み込み時のタイムアウト時間
    readTimeout: 300000,
    // 更新成功時に呼ばれる関数
    nextTask : function(res) {
      if (res.requireRestart) {
        monaca.InAppUpdater.updateAndRestart().then(
          function() {
            // アップデート完了
          },
          function(fail) {
            // アップデートでエラー
            alert( JSON.stringify(fail) );
          }
        );
      } else {
        // 特にアップデートの必要がない場合
      }
    },
    // 更新失敗時に呼ばれる関数
    failTask : function(res) {
      // ダイアログ ( タイトルとメッセージ ) を表示します
      monaca.InAppUpdater.showAlertDialog({
        // ダイアログのタイトル
        title: "Error Code " + res.error.code,
        // メッセージ本文
        message: res.error.message,
        // 表示するボタン
        button: {
          // ボタンのラベル
          label: "OK",
          handler : function() {
            // ボタンがクリックされたときに呼ばれる関数
          }}
        }).then(function(json) {
          // 成功時のコールバック
        }, function(fail) {
          // 失敗時のコールバック
        });
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
