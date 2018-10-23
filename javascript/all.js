
let app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoArray: [
            {
                id: '1',
                title: 'hello , Vue !',
                isCompleted: false,
            }
        ],
        selectTab: 'all',
        tempTodo: {},
        tempTitle: '',
    },
    methods: {
        addTodo() {
            //新增資料
            let value = this.newTodo.trim();
            //console.log(value);
            if (!value) { return }
            //建立一個不重複的ID
            let timesTempID = Math.floor(new Date());
            //在陣列尾端加入
            this.todoArray.push({
                id: timesTempID,
                title: value,
                isCompleted: false,
            });
            //清空輸入欄(因為是雙向綁定的,所以清除資料也會順便清除欄位)
            this.newTodo = '';
        },
        clearAll() {
            if (confirm('你確定要清除所有任務嗎?')) {
                this.todoArray = [];
            }
        },
        deleteTask(todo) {
            //console.log(item);
            let index = this.todoArray.findIndex(function (item, key) {
                //條件 傳入的todo.id == this.todoArray的item.id
                return todo.id == item.id;
            });
            this.todoArray.splice(index, 1);
        },
        editTodo(todo) {
            //console.log(todo);
            this.tempTodo = todo;
            this.tempTitle = todo.title;
        },
        cancelEdit() {
            //因為v-if="item.id == tempTodo.id",把物件清空就隱藏了
            this.tempTodo = {};
        },
        editDone(todo) {
            todo.title = this.tempTitle;
            this.tempTitle = '';
            this.tempTodo = {};
        }
    },
    computed: {
        filter() {
            //篩選資料
            if (this.selectTab == 'all') {
                return this.todoArray;
            } else if (this.selectTab == 'doing') {
                let doingArray = this.todoArray.filter(function (item, index, array) {
                    return !item.isCompleted;
                });
                return doingArray;
            } else {
                let finshedArray = this.todoArray.filter(function (item, index, array) {
                    return item.isCompleted;
                });
                return finshedArray;
            }
        },
        calcAll() {
            return this.todoArray.length;
        },
        calcDoing() {
            let doingArray = this.todoArray.filter(function (item, index, array) {
                return !item.isCompleted;
            });
            return doingArray.length;
        },
        calcFinished() {
            let finshedArray = this.todoArray.filter(function (item, index, array) {
                return item.isCompleted;
            });
            return finshedArray.length;
        }
    }
})