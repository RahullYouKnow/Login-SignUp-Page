const user = document.querySelector("#user");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const userError = document.querySelector("#userError");
const emailError = document.querySelector("#emailError");
const passError = document.querySelector("#passError");
const form = document.querySelector("form");
const show = document.querySelector("#show");
const signUpError = document.querySelector("#signUpError");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRegex = /^(?=.{3,20}$)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/;

function validation(value, regex, error) {
  if (value.value.trim() === "") {
    error.textContent = "";
    value.classList.remove("valid", "invalid");
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

function liveValid(value, regex, error) {
  value.addEventListener("input", function () {
    validation(value, regex, error);
    signUpError.textContent = "";
  });
}
show.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    show.textContent = "Hide";
  } else {
    password.type = "password";
    show.textContent = "Show";
  }
});

liveValid(user, usernameRegex, userError);
liveValid(email, emailRegex, emailError);
liveValid(password, passwordRegex, passError);


function removeValid(value, error){
    value.classList.remove("valid" , "invalid")
    value.value = ""
    error.textContent = ""
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const emailValid = validation(email, emailRegex, emailError);
  const userValid = validation(user, usernameRegex, userError);
  const passValid = validation(password, passwordRegex, passError);

  if (emailValid && userValid && passValid) {
    signUpError.textContent = "SignUp succusfull";

    removeValid(email, emailError)
    removeValid(password, passError)
    removeValid(user, userError)
    signUpError.classList.add("succuse");
    signUpError.classList.remove("error");

  } else {
    signUpError.textContent = "invalid";
    signUpError.classList.add("error");
    signUpError.classList.remove("succuse");
    if (email.value.trim() === "" || password.value.trim() === "" || user.value.trim() === "") {
      signUpError.textContent = "must be filled";
    }
  
  }
});

