var arr_elements = []//global array to push notes
var sub_arr_elements = []//sub array to push notes
let sub_data_ul = document.getElementById("sub_data_ul");
var outerid = 1;
var inner_id = 1;
var status_display_count = 0;
var assign_to_global = []
var inside_assign = true
var toggle = true
var isInnerdata = true
var array_to_sort_by_title = []
var array_to_sort_by_randomly = []
axios.get('http://60d057db7de0b2001710859d.mockapi.io/users')
    .then(function (response) {
        assign_to_global = response.data
    })
    .catch(function (error) {
        console.log(error);
    });

var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var modal = document.getElementById("myModal");
var innerModel = document.getElementById("innerModel");
span2.onclick = function () {
    innerModel.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        innerModel.style.display = "none";
    }
}

span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



function edit_Handler(sub_array_obj) {

    document.getElementById('addBtn_subForm').style.display = "none"

    status_display_count++

    var status_after_onclick_edit = document.getElementById('status')
    status_after_onclick_edit.style.display = "block"
    document.getElementById('status_label').style.display = "block"
    var ul = document.getElementById('inner_ul_for_edit_' + sub_array_obj.sub_id)
    var editbtn = document.getElementById("edit_btn");
    editbtn.style.display = "block"
    editbtn.name = sub_array_obj.sub_id
    document.getElementById('title').value = ul.children[0].innerText;
    document.getElementById('Assign').value = ul.children[1].innerText;
    document.getElementById('Description').value = ul.children[2].innerText;
    modal.style.display = "block";
    active_status = status_after_onclick_edit.value
}

function edit_Handler_2(e) {
    // debugger
    var inner_title = document.getElementById('title').value
    var inner_assign = document.getElementById('Assign').value
    var inner_status = document.getElementById('status').value
    var inner_description = document.getElementById('Description').value

    if (inner_status == active_status) {
        var objIndex = sub_arr_elements.findIndex((obj => obj.sub_id == e.target.name));
        sub_arr_elements[objIndex].title = inner_title
        sub_arr_elements[objIndex].assign = inner_assign
        sub_arr_elements[objIndex].des = inner_description
        var ul = document.getElementById('inner_ul_for_edit_' + e.target.name)
        ul.children[0].innerText = inner_title;
        ul.children[1].innerText = inner_assign;
        ul.children[2].innerText = inner_description;
        modal.style.display = "none";
        document.getElementById('status').style.display = "none"
        document.getElementById('status_label').style.display = "none"

    }
    else {
        // debugger;
        var ul = document.getElementById('inner_ul_for_edit_' + e.target.name)
        ul.remove()
        var objIndex = sub_arr_elements.findIndex((obj => obj.sub_id == e.target.name));
        display_inner_data(sub_arr_elements[objIndex], inner_status)
        modal.style.display = "none";

    }
    clearForm()

}


function display_status_function(mainID, title) {

    // for (let index = 0; index < arr_elements.length; index++) {
    let elem = document.createElement('OPTION')
    elem.value = mainID
    var status = document.getElementById('status')
    elem.innerHTML = title
    status.appendChild(elem)


}



function display_inner_data(sub_array_obj, mainID) {
    //7
    if (sub_array_obj) {
        let elem = document.createElement('ul');
        elem.style.listStyle = "none"
        elem.style.marginBottom = "10px"
        elem.style.fontSize = "18px"
        elem.style.color = "white"
        elem.style.padding = "10px"
        elem.style.width = "160px"
        elem.style.height = "100px"
        elem.style.position = "relative"
        elem.style.backgroundColor = "#844d4d"
        elem.id = "inner_ul_for_edit_" + sub_array_obj.sub_id

        let edit_btn = document.createElement('button')
        edit_btn.innerText = "Edit"
        edit_btn.style.position = "absolute"
        edit_btn.style.padding = "5px"
        edit_btn.style.bottom = "0"
        edit_btn.style.right = "0"
        edit_btn.id = "edit_btn_inside_sub_data" + sub_array_obj.sub_id

        let delete_btn = document.createElement('button')
        delete_btn.innerText = "Delete"
        delete_btn.style.position = "absolute"
        delete_btn.style.padding = "5px"
        delete_btn.style.bottom = "0"
        delete_btn.style.right = "40px"
        delete_btn.id = "delete_btn_inside_sub_data" + sub_array_obj.sub_id

        elem.innerHTML = subTaskTemplate(sub_array_obj);
        var div = document.getElementById("sub_data_ul_" + mainID);

        div.appendChild(elem);
        elem.appendChild(edit_btn)
        elem.appendChild(delete_btn)
        inner_id++

        delete_btn.onclick = function () {
            delete_handler(sub_array_obj)
            remove_edit_and_delete(sub_array_obj.sub_id)
        };
        edit_btn.onclick = function () {
            edit_Handler(sub_array_obj)
        };
        modal.style.display = "none";
        clearForm()
    }
}


const subTaskTemplate = (obj) => {
    return `<li>${obj.title}</li><li>${obj.assign}</li><li>${obj.des}</li>`
}



function submit_inner_data(mainID) {
    //6
    var inner_title = document.getElementById('title').value
    var inner_assign = document.getElementById('Assign').value
    var inner_description = document.getElementById('Description').value
    let sub_array_obj = {
        id: mainID,
        sub_id: mainID + inner_id,
        title: inner_title,
        assign: inner_assign,
        des: inner_description
    }
    sub_arr_elements.push(sub_array_obj)

    display_inner_data(sub_array_obj, mainID)

}



function delete_handler_for_sort(array_to_sort_by_title) {

    array_to_sort_by_title.forEach((element, index, array) => {
        var ul = document.getElementById('inner_ul_for_edit_' + element.sub_id)
        remove_edit_and_delete(element.sub_id)
        ul.remove()
    });
    array_to_sort_by_title = null
}

function sortbyAlphabet(mainID) {
    closeDropDown(mainID)
    array_to_sort_by_title = [...sub_arr_elements]
    if (sub_arr_elements.length > 1) {
        array_to_sort_by_title.sort(function (a, b) {
            var nameA = a.title.toUpperCase(); // ignore upper and lowercase
            var nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
    delete_handler_for_sort(sub_arr_elements)
    // debugger;
    for (let index = 0; index < array_to_sort_by_title.length; index++) {
        display_inner_data(array_to_sort_by_title[index], mainID)
    }

}

function sortbyRandomly(mainID) {
    closeDropDown(mainID)
    array_to_sort_by_randomly = [...sub_arr_elements]
    if (sub_arr_elements.length > 1) {
        array_to_sort_by_randomly.sort(() => Math.random() - 1);
    }
    delete_handler_for_sort(array_to_sort_by_randomly)
    for (let index = 0; index < array_to_sort_by_randomly.length; index++) {
        display_inner_data(array_to_sort_by_randomly[index], mainID)
    }

}

function closeDropDown(mainID) {
    var showdropdown = document.getElementById('showdropdown_' + mainID)
    showdropdown.style.display = "none"
}

function PushAllTask(mainID) {
    innerModel.style.display = "block"
    PushAllTask_to_new()
    closeDropDown(mainID)
    // innerModel.style.display = "none";

}
function PushAllTask_to_new() {

    for (let index = 0; index < sub_arr_elements.length; index++) {
        var ul = document.getElementById('inner_ul_for_edit_' + sub_arr_elements[index].sub_id)
        ul.remove()
    }
    var inner_status = document.getElementById('status_update').value
    for (let index = 0; index < sub_arr_elements.length; index++) {
        display_inner_data(sub_arr_elements[index], inner_status)

    }


}
const MainTaskTemplate = (obj) => {
    //3
    return `
                                <div style="
                                padding: 15px;
                                height: 80px;
                                width: 150px;
                                position:relative;
                                background-color:#844d4d;
                                margin-right:150px;
                                margin-bottom:10px
                                "
                                id="sub_data_container_${obj.id}"
                                >
                                        <i style="
                                        font-size: x-large;
                                        color: white;
                                        position: absolute;
                                        right: 0px;
                                        top: 0px;
                                        background-color: #d2d2dd;
                                        padding-right: 5px;
                                        padding-left: 5px;
                                        "
                                        onclick="openDropDown(${obj.id})" 
                                        id="dropdown"
                                        class="fa fa-ellipsis-h"></i>
                                        <div id="showdropdown_${obj.id}" style="display:none" >
                                            
                                            <a href="#" onclick="sortbyAlphabet(${obj.id})">Sort By Alphabet</a>
                                            <br>
                                            <br>
                                            <a href="#" onclick="sortbyRandomly(${obj.id})")>Sort Randomly</a>
                                            <br>
                                            <br>
                                            <a href="#" onclick="PushAllTask(${obj.id})">Push All tasks</a>
                                            
                                        </div>

                                        <h2>${obj.title}</h2>
                                        <h5>${obj.date}</h5>
                                        <button style="position:absolute;bottom:0;left:0;padding:10px" onclick="add_sub_details(${obj.id})" >Add a card</button>
                                        <button style="position:absolute;bottom:0;right:0;padding:10px"  onclick="delete_main_card(${obj.id})">Delete</button>            
                                        
                                </div>
                                <div id="sub_data_ul_${obj.id}" style="position:"relative";background-color:white;height:auto;margin-bottom:10px">
                                
                                </div>
                                `


}


// function to save main data
var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", save_data);
function save_data() {
    console.log("1")
    //1
    var add_title = document.getElementById('notes_title');
    if (add_title.value == "") {
        alert("Please enter something")
    }
    else {
        const d = new Date();

        let myobj = {
            id: outerid,
            title: add_title.value,
            date: d.toDateString()
        }
        arr_elements.push(myobj);
        add_title.value = ""
        if (inside_assign == true) {
            assign_to_function()
        }
        display_main_data(myobj)

        display_status_function(myobj.id, myobj.title)
        outerid++;

    }
    if (arr_elements.length < 2) {
        document.getElementById('open_Form').style.display = "block"
    }

    if (arr_elements.length > 2) {
        var open_Form = document.getElementById('open_Form').style.display = "none"

    }


}

function display_main_data(obj) {

    let elem = document.createElement('div');
    elem.style.fontSize = "16px"
    elem.innerHTML = MainTaskTemplate(obj)
    let notesElm = document.getElementById("display_outer_card");
    notesElm.appendChild(elem)

}


function clearForm() {
    var inner_title = document.getElementById('title').value = "";
    var inner_assign = document.getElementById('Assign').value = "";
    var inner_description = document.getElementById('Description').value = "";
}
function saveForm(e) {
    //5
    submit_inner_data(e.target.name)
    clearForm();
}

function assign_to_function() {
    inside_assign = true
    for (let index = 0; index < assign_to_global.length; index++) {
        let elem = document.createElement('OPTION')
        elem.value = assign_to_global[index].name
        var assign_to = document.getElementById('Assign')
        elem.innerHTML = assign_to_global[index].name
        assign_to.appendChild(elem)
    }
    inside_assign = false

}

function openDropDown(id) {
    if (toggle == true) {
        var showdropdown = document.getElementById('showdropdown_' + id)
        showdropdown.style.display = "block";
        showdropdown.style.position = "absolute"
        showdropdown.style.right = "-140px"
        showdropdown.style.top = "5px"
        toggle = false
    }
    else if (toggle == false) {
        toggle = true
        var showdropdown = document.getElementById('showdropdown_' + id)
        showdropdown.style.display = "none"
    }
}


function delete_sub_card(mainID) {
    var ul = document.getElementById("sub_data_ul_" + mainID);
    ul.remove();
}

function add_sub_details(mainID) {
    document.getElementById("addBtn_subForm").name = mainID
    document.getElementById('addBtn_subForm').style.display = "block"
    document.getElementById("edit_btn").style.display = "none"
    modal.style.display = "block";
}

function delete_main_card(id) {

    if (id != 0) {
        swal({
            title: "Are you sure? You want to delete",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Deleted sucessfully", {
                        icon: "success",
                    });
                    arr_elements.pop();
                    document.getElementById("sub_data_container_" + id).remove();
                    delete_sub_card(id)
                    if (arr_elements.length == 2) {
                        open_Form.style.display = "block"
                    }
                }
            });
    }


}


function bindForm() {

    var sub_data_save_btn = document.getElementById('addBtn_subForm')
    sub_data_save_btn.addEventListener("click", saveForm)
    var editbtn = document.getElementById("edit_btn");
    editbtn.addEventListener('click', edit_Handler_2)
    var push_btn = document.getElementById("btn_push");
    push_btn.addEventListener('click', PushAllTask_to_new)
}

document.addEventListener("DOMContentLoaded", bindForm);

function remove_edit_and_delete(id) {
    document.getElementById('delete_btn_inside_sub_data' + id).style.display = "none"
    document.getElementById('edit_btn_inside_sub_data' + id).style.display = "none"
}

function delete_handler(sub_array_obj) {
    var ul = document.getElementById('inner_ul_for_edit_' + sub_array_obj.sub_id)
    ul.style.display = "none"
}