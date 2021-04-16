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
  $("#signup-button").click(() =>
  {
    const username = $("#signup-username-input").val().trim();
    const email = $("#signup-email-input").val().trim();
    const password = $("#signup-password-input").val().trim();

    if (username && email && password)
    {
        $.ajax({
            url: "/api/users/new",
            type: "POST",
            data: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" },
            success: () => { document.location.replace("/"); },
            error: (req, text, err) => { alert(`Something went wrong! Status: ${text}; Error: ${err}`); }
        });
    }
  });

  //Login button/
  $("#login-button").click(() =>
  {
    const email = $("#login-email-input").val().trim();
    const password = $("#login-password-input").val().trim();

    if (email && password)
    {
        $.ajax({
            url: "/api/users/login",
            type: "POST",
            data: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            success: () => { document.location.replace("/"); },
            error: (req, text, err) => { alert(`Something went wrong! Status: ${text}; Error: ${err}`); }
        });
    }
  });

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

  //Send email button.
  $("#contact-send-button").click((e) =>
  {
    e.preventDefault();
    //TODO
  });

  //Open my github repos page.
  $("#repos-button").click(() =>
  {
    window.open("https://github.com/Connerjm?tab=repositories", "_blank");
  });
});