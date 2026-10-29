const email = document.querySelector("#email");
const password = document.querySelector("#password");
const emailError = document.querySelector("#emailError");
const passError = document.querySelector("#passError");
const form = document.querySelector("form");
const loginError = document.querySelector("#loginError");
const show = document.querySelector(".show");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function validation(value, regex, error) {
  if (value.value.trim() === "") {
    value.classList.remove("valid");
    value.classList.remove("invalid");
    error.textContent = "";
    return false;
  }
  if (regex.test(value.value)) {
    error.textContent = "";
    value.classList.add("valid");
    value.classList.remove("invalid");
    return true;
  } else {
    error.textContent = `invalid ${value.type}`;
    value.classList.add("invalid");
    value.classList.remove("valid");
    return false;
  }
}

function liveValidation(value, regex, error) {
  value.addEventListener("input", function () {
    validation(value, regex, error);

    loginError.textContent = "";
  });
}
liveValidation(email, emailRegex, emailError);
liveValidation(password, passwordRegex, passError);

show.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    show.textContent = "Hide";
  } else {
    password.type = "password";
    show.textContent = "Show";
  }
});
function removeValid(value, error){
    value.classList.remove("valid" , "invalid")
    value.value = ""
    error.textContent = ""
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const emailValid = validation(email, emailRegex, emailError);
  const passValid = validation(password, passwordRegex, passError);

  if (emailValid && passValid) {
     removeValid(email, emailError)
    removeValid(password, passError)
    loginError.textContent = "login succesfully";
    loginError.classList.add("succuse");
    loginError.classList.remove("error");
  } else {
    loginError.textContent = "invalid";
    loginError.classList.add("error");
    loginError.classList.remove("succuse");
    if (email.value.trim() === "" || password.value.trim() === "") {
      loginError.textContent = "must be filled";
    }
    // if (password.value.trim() === "") {
    //   passError.textContent = "must be filled";
    // }
  }
});
