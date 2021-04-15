$(document).ready(() =>
{
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(() =>
  {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  });

  //Signup button.
  $("#signup-button")

  //Login button/
  $("#login-button")

  //Logout button.
  $("#logout-button").click(() =>
  {
    $.ajax({
            url: "/api/users/logout",
            type: "POST",
            headers: {"Content-Type" : "application/json" },
            success: () => { document.location.replace("/login") },
            error: (req, text, err) =>
            {
                alert(`Something went wrong! Status: ${text}; Error: ${err}`);
            }
        });
  });

  //Cancel button.
  $(".cancel-button").click(() =>
  {
    document.location.replace("/");
  });

  //Open my github repos page.
  $("#repos-button").click(() =>
  {
    window.open("https://github.com/Connerjm?tab=repositories", "_blank");
  });
});