const txtAdd = document.querySelector('.txtAddTodo');
const btnAdd = document.querySelector('.btn_add');
let data = [];

btnAdd.addEventListener('click',addTodo);
function addTodo(){
    let todo = {
        txt:txtAdd.value,
        id:new Date().getTime(),
        checked: '',
    };
    if(txtAdd.value.trim() == ""){
        alert('請輸入內容');
        return
    }else{
        data.unshift(todo);
        txtAdd.value = '';
    }
    upData();
};

const list = document.querySelector('.list');
function rander(data){
    let str = '';
    data.forEach((i)=>{
        str+=`
        <li data-id="${i.id}">
            <label class="checkbox">
                <input type="checkbox" id="confirm" 
                ${i.checked}/>
                <span>${i.txt}</span>
            </label>
            <a href="#" class="delete"></a>
            </li>
        `;
    });
    list.innerHTML = str;
}




list.addEventListener('click', function(e){
  let id = e.target.closest('li').dataset.id;
  if (e.target.classList.value == 'delete') {
    e.preventDefault();
    data = data.filter((i) => i.id != id);
  } else {
      data.forEach((i, index) => {
      if (i.id == id) {
        if (data[index].checked == 'checked') {
          data[index].checked = '';
        } else {
          data[index].checked = 'checked';
        }
      }
    });
  }
  upData();
})



const tab = document.querySelector('.tab');
let state = 'all';
tab.addEventListener('click', function(e){
    state = e.target.dataset.state;

  let tabs = document.querySelectorAll('.tab li');
  tabs.forEach((i) => {
    i.classList.remove('active');
  });
  e.target.classList.add('active');
  upData();
})



function upData() {
    let newData = [];
    if (state == 'all') {
      newData = data;
    } else if (state == 'todo') {
      newData = data.filter((i) => i.checked == '');
      console.log(newData);
    } else {
      newData = data.filter((i) => i.checked == 'checked');
    }
  
    const todoCount = document.querySelector('.todoCount');
    let todoNum = data.filter((i)=>i.checked == '');
    todoCount.textContent = todoNum.length;
    rander(newData);
  }

  const btnDele = document.querySelector('.btnClear');
  btnDele.addEventListener('click', function (e) {
    e.preventDefault();
    data = data.filter((i) => i.checked != 'checked');
    upData();
  });
  
  
  txtAdd.addEventListener("keyup", function (e) {
    if(e.key == 'Enter'){
        addTodo();
    }
  });
  
