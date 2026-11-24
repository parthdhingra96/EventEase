(function () {
  "use strict";

var LOGIN_API_URL = "http://localhost:5000/api/auth/login";
var REGISTER_API_URL = "http://localhost:5000/api/auth/register";

  function setFieldError(input, message) {
    var error = document.getElementById(input.id + "Error");
    input.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) {
      error.textContent = message || "";
    }
  }

  function isEmail(value) {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim());
  }

  function isFullName(value) {
    var name = value.trim();
    return name.length >= 2 && name.length <= 80 && /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/.test(name);
  }

  function isIndianMobile(value) {
    var compact = String(value).replace(/[\s-]/g, "");
    return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(compact);
  }

  function isStrongPassword(value) {
    return value.length >= 8 &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /\d/.test(value);
  }

  function setStatus(element, message, type) {
    if (!element) {
      return;
    }
    element.textContent = message;
    element.classList.remove("is-error", "is-success");
    if (type) {
      element.classList.add("is-" + type);
    }
  }

  function clearErrors(form) {
    Array.prototype.forEach.call(form.elements, function (field) {
      if (field.id) {
        setFieldError(field, "");
      }
    });
  }

  document.querySelectorAll("[data-password-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var input = document.getElementById(button.getAttribute("data-password-toggle"));
      if (!input) {
        return;
      }
      var showPassword = input.type === "password";
      input.type = showPassword ? "text" : "password";
      button.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
      button.setAttribute("aria-pressed", showPassword ? "true" : "false");
      var icon = button.querySelector("i");
      if (icon) {
        icon.className = showPassword ? "bi bi-eye-slash" : "bi bi-eye";
      }
      input.focus();
    });
  });

  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    var loginEmail = document.getElementById("loginEmail");
    var loginPassword = document.getElementById("loginPassword");
    var loginStatus = document.getElementById("loginStatus");
    var forgotPassword = document.getElementById("forgotPassword");

    Array.prototype.forEach.call(loginForm.elements, function (field) {
      if (!field.id) {
        return;
      }
      field.addEventListener("input", function () {
        if (field.classList.contains("is-invalid")) {
          setFieldError(field, "");
        }
        setStatus(loginStatus, "", "");
      });
    });

    if (forgotPassword) {
      forgotPassword.addEventListener("click", function () {
        setStatus(loginStatus, "Password reset is ready to connect to the Spring Boot authentication API.", "error");
      });
    }

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(loginForm);
      setStatus(loginStatus, "", "");

      var emailValid = isEmail(loginEmail.value);
      var passwordValid = loginPassword.value.length > 0;
      setFieldError(loginEmail, emailValid ? "" : (loginEmail.value.trim() ? "Enter a valid email address." : "Email is required."));
      setFieldError(loginPassword, passwordValid ? "" : "Password is required.");

      if (!emailValid || !passwordValid) {
        (!emailValid ? loginEmail : loginPassword).focus();
        return;
      }

      var submitButton = loginForm.querySelector("button[type='submit']");
      submitButton.disabled = true;
      submitButton.textContent = "Logging in...";

      fetch(LOGIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.value.trim(),
          password: loginPassword.value,
          rememberMe: document.getElementById("rememberMe").checked
        })
      }).then(function (response) {
        return response.text().then(function (text) {
          var data = null;
          try {
            data = text ? JSON.parse(text) : null;
          } catch (error) {
            data = null;
          }
          return { response: response, data: data };
        });
      }).then(function (result) {
        if (!result.response.ok) {
          var apiMessage = result.data && (result.data.message || result.data.error);
          throw new Error(apiMessage || "Login failed. Please check your credentials.");
        }

        localStorage.setItem("eventeaseToken", result.data.token);
         localStorage.setItem("eventeaseUser", JSON.stringify(result.data.user));

        loginPassword.value = "";

        setStatus(loginStatus, "Login successful! Redirecting...", "success");

        setTimeout(function () {
    if (result.data.user.role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
}, 1000);
      }).catch(function (error) {
        setStatus(loginStatus, error.message || "Unable to connect to the login service.", "error");
      }).finally(function () {
        submitButton.disabled = false;
        submitButton.textContent = "Login";
      });
    });
  }

  var registerForm = document.getElementById("registerForm");
  if (registerForm) {
    var fullName = document.getElementById("fullName");
    var registerEmail = document.getElementById("registerEmail");
    var mobile = document.getElementById("mobile");
    var registerPassword = document.getElementById("registerPassword");
    var confirmPassword = document.getElementById("confirmPassword");
    var registerStatus = document.getElementById("registerStatus");

    Array.prototype.forEach.call(registerForm.elements, function (field) {
      if (!field.id) {
        return;
      }
      field.addEventListener("input", function () {
        if (field.classList.contains("is-invalid")) {
          setFieldError(field, "");
        }
        setStatus(registerStatus, "", "");
      });
    });

    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(registerForm);
      setStatus(registerStatus, "", "");

      var fullNameValid = isFullName(fullName.value);
      var emailValid = isEmail(registerEmail.value);
      var mobileValid = isIndianMobile(mobile.value);
      var passwordValid = isStrongPassword(registerPassword.value);
      var confirmValid = confirmPassword.value.length > 0 && confirmPassword.value === registerPassword.value;

      setFieldError(fullName, fullNameValid ? "" : (fullName.value.trim() ? "Enter a full name using letters." : "Full name is required."));
      setFieldError(registerEmail, emailValid ? "" : (registerEmail.value.trim() ? "Enter a valid email address." : "Email is required."));
      setFieldError(mobile, mobileValid ? "" : (mobile.value.trim() ? "Enter a valid 10-digit Indian mobile number." : "Mobile number is required."));
      setFieldError(registerPassword, passwordValid ? "" : (registerPassword.value ? "Password must meet the requirements above." : "Password is required."));
      setFieldError(confirmPassword, confirmValid ? "" : (confirmPassword.value ? "Passwords do not match." : "Confirm your password."));

      var checks = [
        [fullNameValid, fullName],
        [emailValid, registerEmail],
        [mobileValid, mobile],
        [passwordValid, registerPassword],
        [confirmValid, confirmPassword]
      ];
      var firstInvalid = checks.filter(function (check) { return !check[0]; })[0];
      if (firstInvalid) {
        firstInvalid[1].focus();
        return;
      }

      var submitButton = registerForm.querySelector("button[type='submit']");
      submitButton.disabled = true;
      submitButton.textContent = "Registering...";

      fetch(REGISTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          full_name: fullName.value.trim(),
          email: registerEmail.value.trim(),
          mobile: mobile.value.trim(),
          password: registerPassword.value
        })
      }).then(function (response) {
        return response.text().then(function (text) {
          var data = null;
          try {
            data = text ? JSON.parse(text) : null;
          } catch (error) {
            data = null;
          }
          return { response: response, data: data };
        });
      }).then(function (result) {
        if (!result.response.ok) {
          var apiMessage = result.data && (result.data.message || result.data.error);
          throw new Error(apiMessage || "Registration failed. Please try again.");
        }

        registerForm.reset();
        clearErrors(registerForm);
        setStatus(registerStatus, (result.data && result.data.message) || "Registration successful.", "success");
      }).catch(function (error) {
        setStatus(registerStatus, error.message || "Unable to connect to the registration service.", "error");
      }).finally(function () {
        submitButton.disabled = false;
        submitButton.textContent = "Register";
      });
    });
  }
})();
