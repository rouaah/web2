$(document).ready(function () {
  let comments = [];
  getUsers();
  $("#usersSelect").change(function () {
    let user = $("#usersSelect").val();
    comments = getComments(user);
  });

  new DataTable("#commentsTable", {
    columns: [
      { data: "postId" },
      { data: "id" },
      { data: "name" },
      { data: "email" },
      { data: "body" },
    ],
    data: comments,
  });
});

function getUsers() {
  let users = [];
  $("#getUsersBtn").hide();
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/users`,
    type: "GET",
    headers: {
      Accept: "application/json",
    },
    success: function (data) {
      users = data;
      $.each(users, function (index, item) {
        $("#usersSelect").append(
          $("<option>", {
            value: item.id,
            text: item.name,
          })
        );
      });

      new DataTable("#usersTable", {
        // ajax: "https://jsonplaceholder.typicode.com/users",
        columns: [
          { data: "id" },
          { data: "name" },
          { data: "username" },
          { data: "email" },
          { data: "phone" },
          { data: "website" },
        ],
        data: users,
      });
    },
    error: function (error) {
      $("#getUsersBtn").show();
    },
  });
}

function getComments(postId) {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    type: "GET",
    headers: {
      Accept: "application/json",
    },
    success: function (data) {
      return data;
    },
    error: function (error) {
      $("#getUsersBtn").show();
    },
  });
}
