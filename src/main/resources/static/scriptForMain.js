//
// //для верхней шутки где показывается авторизованный юзер
// fetch("http://localhost:8080/api/authUser").then(
//     res => {
//         res.json().then(
//             data => {
//                 const roles = data.roleSet;
//                 var tbody = " <span style=\"color: white\">";
//                 tbody += "<span>" + data.username + " </span>"
//                 tbody += "<span>with roles: </span>";
//                 tbody += "<span>"
//                 roles.forEach((r) => {
//                     tbody += r.value + " ";
//                     }
//                 )
//                 tbody += "</span>";
//                 tbody += "</span>";
//                 tbody += "<a href=\"/logout\">Logout</a>"
//                 document.getElementById("navbar-toggle-button").innerHTML = tbody;
//             }
//         )
//     }
// )
//
// //для таблицы юзеров
// fetch("http://localhost:8080/api/people").then(
//     res => {
//         res.json().then(
//             data => {
//                 var tbody = "";
//                 data.forEach((user) => {
//                     var editBtn = document.getElementById("buttonEdit_" + user.id);
//                     var editModal = document.getElementById("Modal_Edit_" + user.id);
//                     const roles = user.roleSet;
//                     tbody += "<tr>";
//                     tbody += "<td>" + user.id + "</td>";
//                     tbody += "<td>" + user.username + "</td>";
//                     tbody += "<td>"
//                     roles.forEach((r) => {
//                             tbody += r.value + " ";
//                         }
//                     )
//                     tbody += "</span>";
//                     tbody += "</td>";
//                     tbody += "<td>";
//                     tbody += "<button type=\"button\" id=\"buttonEdit_" + user.id + "\"class=\"btn btn-primary\" data-toggle=\"modal\" data-target=";
//                     tbody += "\"#Modal_Edit_" + user.id + "\">" + "Edit" + "</button>";
//                     tbody += "</td>";
//                     tbody += "<div class=\"modal fade\" id=" + "\"#Modal_Edit_" + user.id + "\"";
//                     tbody += "tabindex=\"-1\"" + "role=\"dialog\"" + "aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">";
//                     tbody += "<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n" +
//                         "                                                <div class=\"modal-content\">\n" +
//                         "                                                    <div class=\"modal-header\">\n" +
//                         "                                                        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Edit\n" +
//                         "                                                            user</h5>\n" +
//                         "                                                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n" +
//                         "                                                                aria-label=\"Close\">\n" +
//                         "                                                            <span aria-hidden=\"true\">&times;</span>\n" +
//                         "                                                          </button>\n" +
//                         "                                                    </div>\n" +
//                         "                                                    <div class=\"modal-body tab-pane fade show active card\">\n" +
//                         "                                                        <form th:method=\"PATCH\" th:action=\"@{/admin/updateUser}\"\n" +
//                         "                                                              th:object=\"${updateUser}\">\n" +
//                         "                                                            <br>\n" +
//                         "                                                            <div class=\"form-group\">\n" +
//                         "                                                                <label class=\"form-label\"\n" +
//                         "                                                                       for=\"edit-id\"><strong>Id</strong></label>";
//                     tbody += "<input class=\"form-control\" type=\"text\" name=\"id\"" + "th:value=\"" + user.id + "id=\"edit-id\" readonly/> </div>";
//                     console.log(editBtn);
//                     document.onload = function() {
//                         editBtn.onclick(function() {
//                             console.log("cccaasssssssss");
//                         });
//                     };
//
//                     document.getElementById("user-table").innerHTML = tbody;
//                 })
//             }
//         )
//     }
// )
var btn = document.getElementById("das");
console.log(btn)
document.onload = function () {
    btn.onclick(function () {
        console.log("cccaasssssssss");
    });
};