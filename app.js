var arr_elements = []//global array to push notes

var sub_arr_elements = []//global array to push notes
let sub_data_ul = document.getElementById("sub_data_ul");
var outerid = 1;
var inner_id = 1;
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



function edit_Handler(sub_array_obj) {
    document.getElementById('addBtn_subForm').style.display = "none"
    var ul = document.getElementById('inner_ul_for_edit_' + sub_array_obj.sub_id)
    var editbtn = document.getElementById("edit_btn");
    editbtn.style.display = "block"
    editbtn.name = sub_array_obj.sub_id
    var inner_title = document.getElementById('title').value = ul.children[0].innerText;
    var inner_assign = document.getElementById('Assign').value = ul.children[1].innerText;
    var inner_description = document.getElementById('Description').value = ul.children[2].innerText;
    modal.style.display = "block";


}
function edit_Handler_2(e) {
    // debugger;

    var inner_title = document.getElementById('title').value
    var inner_assign = document.getElementById('Assign').value
    var inner_description = document.getElementById('Description').value
    console.log(e.target.name)
    var objIndex = sub_arr_elements.findIndex((obj => obj.sub_id == e.target.name));
    console.log("Before update: ", sub_arr_elements[objIndex])
    sub_arr_elements[objIndex].title = inner_title
    sub_arr_elements[objIndex].assign = inner_assign
    sub_arr_elements[objIndex].des = inner_description
    console.log("After update: ", sub_arr_elements[objIndex])
    var ul = document.getElementById('inner_ul_for_edit_' + e.target.name)
    ul.children[0].innerText=inner_title;
    ul.children[1].innerText=inner_assign;
    ul.children[2].innerText=inner_description;
    modal.style.display = "none";
    clearForm()
}



function display_inner_data(sub_array_obj, mainID) {
    // debugedit_btnger;
    if (sub_array_obj) {
        let elem = document.createElement('ul');
        elem.style.listStyle = "none"
        elem.style.marginBottom = "10px"
        elem.style.fontSize = "18px"
        elem.style.color = "white"
        elem.style.padding = "10px"
        elem.style.backgroundColor = "#844d4d"
        elem.id = "inner_ul_for_edit_" + sub_array_obj.sub_id
        elem.innerHTML = subTaskTemplate(sub_array_obj);
        var ul = document.getElementById("sub_data_ul_" + mainID);
        ul.appendChild(elem);
        inner_id++
        elem.onclick = function () {
            edit_Handler(sub_array_obj)
        };
        modal.style.display = "none";
    }
}


const subTaskTemplate = (obj) => { return `<li>${obj.title}</li><li>${obj.assign}</li><li>${obj.des}</li>` }


function submit_inner_data(mainID) {
    // debugger;
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

function saveForm(e) {
    // debugger;
    submit_inner_data(e.target.name)
    clearForm();
}

function bindForm() {
    // debugger;
    var sub_data_save_btn = document.getElementById('addBtn_subForm')
    sub_data_save_btn.addEventListener("click", saveForm)
    var editbtn = document.getElementById("edit_btn");
    editbtn.addEventListener('click', edit_Handler_2)
}

document.addEventListener("DOMContentLoaded", bindForm);


function add_sub_details(mainID) {
    // debugger;
    document.getElementById("addBtn_subForm").name = mainID
    document.getElementById('addBtn_subForm').style.display = "block"
    var editbtn = document.getElementById("edit_btn").style.display="none";

    modal.style.display = "block";
}

const MainTaskTemplate = (obj) => {
    return `
                                <div style="
                                padding: 15px;
                                height: 80px;
                                width: 150px;
                                position:relative;
                                background-color:#844d4d;
                                margin-right:10px;
                                margin-bottom:10px
                                "
                                id="sub_data_container_${obj.id}"
                                >
                                        
                                        <h2>${obj.title}</h2>
                                        <h5>${obj.date}</h5>
                                        <button style="position:absolute;bottom:0;left:0;padding:10px" onclick="add_sub_details(${obj.id})">Add a card</button>
                                        <button style="position:absolute;bottom:0;right:0;padding:10px"  onclick="delete_main_card(${obj.id})">Delete</button>            
                                        
                                </div>
                                <div id="sub_data_ul_${obj.id}" style="background-color:white;width:180px;height:auto;;margin-bottom:10px">
                                </div>
                                `


}


// function to save main data
var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", save_data);
function save_data() {
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
        display_main_data(myobj)
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
function delete_main_card(id) {

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
                sub_arr_elements.pop()
                document.getElementById("sub_data_container_" + id).style.display = "none";

                if (arr_elements.length == 2) {
                    open_Form.style.display = "block"
                }
            } else {
                swal("Delete unsucessfull");
            }
        });

}


