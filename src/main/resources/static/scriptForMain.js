
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
        table += `<tr data-id="${user.id}">
            <td> ${user.id}</td>
            <td> ${user.username}</td>
            <td>`;
        user.roleSet.forEach(role => {
            table += `<span>${role.value} </span>`;
        })
        table += `<td>
                        <!-- Button edit -->
                        <button type="button" class="btn btn-primary" data-toggle="modal"
                        id="buttonEdit" data-target="${'#Modal_Edit_' + user.id}">
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
                                        <form th:method="PATCH" id="form_${user.id}">
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
                                                <button type="button" class="btn btn-secondary"
                                                        data-dismiss="modal">Close
                                                </button>
                                                <input type="submit" class="btn btn-primary"
                                                       value="Edit">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>`
        document.getElementById("user-table").innerHTML = table
    })
}
fetch(url).then(res => res.json())
    .then(data => renderPosts(data))