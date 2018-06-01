$(function() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    $("form").find("button").prop("disabled", true);
    fetch("http://localhost:3000/api/v1/users")
    .then(response => response.json())
    .then(data => {authenticate(data[1])});
  });
});

function authenticate(userData) {
  if($("#username-input-field").val() === userData.name
  && $("#password-input-field").val() === userData.password) {
    window.location.replace("../pages/home-page.html");
  } else {
    if($("#authentication-error").length === 0) {
      $("form").before($("<h5 style='color:red' id='authentication-error'>Authentication Failed!</h5>"));
    } else {
      $("#authentication-error").remove();
      $("form").before($("<h5 style='color:red' id='authentication-error'>Authentication Failed!</h5>"));
    }

    $("form").find("button").prop("disabled", false);
  }
}
