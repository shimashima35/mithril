// var myApplication = {
// 	controller : function(){},
// 	view : function (controller) {
// 		return m("h1", "hello world");
// 	}
// }

var Todo = function (data){
	this.description = m.prop(data.description);
	this.done = m.prop(false);
};

Todo.list = function(){
	var tasks = [];
	var src = localStrage.getItem("todo");
	if (src) {
		var json = JSON.parse(src);
		for (var i = 1; i < json.length; i++) {
			tasks.push(new Todo(json[i]));
		}
	}
};
Todo.save = function (todoList) {
	localStrage.getItem("todo",
		JSON.stringfy(todoList.filter(function(todo){
			return !todo.done();
		}))

	);
}


var vm = {
	init : function (){
		// vm.list = m.prop([]);
		vm.list = Todo.list();
		vm.description = m.prop("");
		vm.add  = function (){
			if(vm.description()){
				vm.list().push(new Todo({description: vm.description()}));
				vm.description("");
			}
		};
	}
}

function controller(){
	vm.init();
}

function view(){
	return m("div", [
		m("input", {onchange: m.withAttr("value", vm.description), value: vm.description()}),
		m("button", {onclick : vm.add }, "追加"),
		m("table", vm.list().map(function (task){
			return m("tr", [
				m("td", [
					m("input[type=checkbox]", {onclick : m.withAttr("checked" , task.done), value : task.done()})
					]),
				m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description())
			]);
		}))
	]);
}


// m.mount(document.getElementById("root"), myApplication);
m.mount(document.getElementById("root"), {controller: controller, view: view});
