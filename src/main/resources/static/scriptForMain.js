
//для верхней шутки где показывается авторизованный юзер
fetch("http://localhost:8080/api/authUser").then(
    res => {
        res.json().then(
            data => {
                const roles = data.roleSet;
                var tbody = " <span style=\"color: white\">";
                tbody += "<span>" + data.username + " </span>"
                tbody += "<span>with roles: </span>";
                tbody += "<span>"
                roles.forEach((r) => {
                    tbody += r.value + " ";
                    }
                )
                tbody += "</span>";
                tbody += "</span>";
                tbody += "<a href=\"/logout\">Logout</a>"
                document.getElementById("navbar-toggle-button").innerHTML = tbody;
            }
        )
    }
)

//для таблицы юзеров
// fetch("http://localhost:8080/api/people").then(
//     res => {
//         res.json().then(
//             data => {
//                 var tbody = "";
//                 data.forEach((user) => {
//                     var editBtn = document.getElementById("buttonEdit_" + user.id);
//                     var editModal = document.getElementById("Modal_Edit_" + user.id);
//                     const roles = user.roleSet;
//                     tbody = "<td>" + user.id + "</td>";
//                     document.getElementById("user-id").innerHTML = tbody;
//                     tbody = "<td>" + user.username + "</td>";
//                     document.getElementById("user-username").innerHTML = tbody;
//                     tbody = "<td>"
//                     roles.forEach((r) => {
//                             tbody += r.value + " ";
//                         }
//                     )
//                     document.getElementById("user-roles").innerHTML = tbody;
//                     tbody = "<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\"\n" +
//                         "                                                id=\"buttonEdit_" + user.id + "\"\n" +
//                         "                                                data-target=\"#Modal_Edit_" + user.id + "\">\n" +
//                         "                                            Edit\n" +
//                         "                                        </button>"
//                     document.getElementById("button-edit").innerHTML = tbody;
//                 })
//             }
//         )
//     }
// )
// var editBtn = document.getElementById("buttonEdit_" + 1);
// console.log(editBtn);
// editBtn.onclick = function () {
//     alert("helo")
// }

const url = "http://localhost:8080/api/people"
let roles = []
const renderPosts = (data) => {
    let table = '';
    console.log(data);

    data.forEach(user => {
        let roles = '';
        table += `<tr data-id="${user.id}">
            <td> ${user.id}</td>
            <td> ${user.username}</td>
            <td>`;
        user.roleSet.forEach(role => {
            roles +=role.value + '\n'
            table += `<span>${role.value} </span>`;
        })
        table += `<td>
                        <!-- Button edit -->
                        <button type="button" class="btn btn-primary" data-toggle="modal"
                         data-target="${'#Modal_Edit_' + user.id}">
                            Edit
                        </button>
                        <!-- Modal edit -->
                        <div class="modal fade" id="${'Modal_Edit_' + user.id}" tabindex="-1"
                             role="dialog"
                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Edit
                                            user</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                    </div>
                                    <div class="modal-body tab-pane fade show active card">
                                        <form  id="formEdit_${user.id}">
                                            <br>
                                            <div class="form-group">
                                                <label class="form-label"
                                                       for="edit-id"><strong>Id</strong></label>
                                                <input class="form-control" type="text" name="id"
                                                       value="${user.id}" id="edit-id${user.id}" disabled />
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label"
                                                       for="edit-name"><strong>Name</strong></label>
                                                <input class="form-inline" type="text" name="name"
                                                       value="${user.username}" id="edit-name${user.id}"/>
                                            </div>
                                            <br>
                                            <div class="form-group">
                                                <label class="form-label" for="edit-password"><strong>Password</strong></label>
                                                <input class="form-inline" type="text" name="pass"
                                                       value="12345" id="edit-password${user.id}"/>
                                                <br>
                                            </div>
                                            <div class="form-label  form-group">
                                                <label class="form-label"
                                                       for="edit-role"><strong>Role</strong></label>
                                                <select class="custom-select" id="edit-role${user.id}"
                                                        name="role[]" multiple size="2">
                                                    <option value="ROLE_ADMIN">ADMIN</option>
                                                    <option value="ROLE_USER">USER</option>
                                                </select>
                                            </div>
                                            <br>
                                            <br>
                                            <br>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" id="close-edit"
                                                        data-dismiss="modal">Close
                                                </button>
                                                <input type="submit" id="buttonEdit" class="btn btn-primary"
                                                       value="Edit">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>`
        table += `<!-- Button delete -->
                                    <td>
                                        <button  type="button" class="btn btn-danger" data-toggle="modal"
                                                data-target="${'#Modal_Delete_' + user.id}">
                                            Delete
                                        </button>
                                        <!-- Modal delete -->
                                        <div class="modal fade" id="${'Modal_Delete_' + user.id}" tabindex="-1"
                                             role="dialog"
                                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Delete
                                                            user</h5>
                                                        <button type="button" class="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body tab-pane fade show active card">
                                                        <form id="formDelete_${user.id}">
                                                            <br>
                                                            <div class="form-group">
                                                                <label class="form-label"
                                                                       for="delete-id"><strong>Id</strong></label>
                                                                <input class="form-control" type="text" name="id"
                                                                       value="${user.id}" id="delete-id${user.id}" readonly/>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="form-label"
                                                                       for="delete-name"><strong>Name</strong></label>
                                                                <input class="form-control" type="text" name="name"
                                                                       value="${user.name}" id="delete-name${user.id}"
                                                                       readonly/>
                                                            </div>
                                                            <br>
                                                            <div class="form-group">
                                                                <label class="form-label" for="delete-password"><strong>Password</strong></label>
                                                                <input class="form-control" type="text" name="pass"
                                                                       value="******" id="delete-password${user.id}" readonly/>
                                                                <br>
                                                            </div>
                                                            <div class="form-label  form-group">
                                                                <label class="form-label"
                                                                       for="delete-role"><strong>Role</strong></label>
                                                                <select class="custom-select" id="delete-role${user.id}"
                                                                        name="role[]" multiple size="2" disabled>
                                                                    <option readonly>${roles}</option>
                                                               </select>
                                                            </div>
                                                            <br>
                                                            <br>
                                                            <br>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" id="close-delete"
                                                                        data-dismiss="modal">Close
                                                                </button>
                                                                <input type="submit" id="buttonDelete" class="btn btn-danger"
                                                                       value="Delete">
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`
        document.getElementById("user-table").innerHTML = table
    })
}
let userId;
document.getElementById("user-table").addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonPressed = e.target.id === `buttonDelete`;
    let editButtonPressed = e.target.id === `buttonEdit`;
    if (!!e.target.parentElement.parentElement.dataset.id) {
        userId = e.target.parentElement.parentElement.dataset.id;
    }
    console.log(userId);
    if (delButtonPressed) {
        fetch(`${url}/${userId}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(data => renderPosts(data))
        document.getElementById('close-delete').click()

    } if (editButtonPressed) {

        const nameEdit = document.getElementById(`edit-name${userId}`);
        const passwordEdit = document.getElementById(`edit-password${userId}`);
        const rolesUserEdit = document.getElementById(`edit-role${userId}`);

        let getrole = (id) => {
            for (const op of roles) {
                if (op.id === id) {
                    return op.authority;
                }
            }
        }

        let roles = [];
        for (const option of rolesUserEdit.selectedOptions) {
            roles.push({
                id: option.value,
                name: getrole(option.value)
            });
        }

        const d = {
            name: nameEdit.value,
            password: passwordEdit.value,
            roles: roles
        };
        console.log(d);
        fetch(`${url}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(d)
        }).then(res => res.json())
            .then(data => renderPosts(data))
        $('.modal-backdrop').remove();
        document.getElementById('close-edit').click()
    }
})
fetch(url).then(res => res.json())
    .then(data => renderPosts(data))