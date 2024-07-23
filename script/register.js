const $registerForm = document.querySelector("#register-form");
const $registerName = document.querySelector("#register-name");
const $registerEmail = document.querySelector("#register-email");
const $registerPassword = document.querySelector("#register-password");
const $registerUrl = document.querySelector("#register-url");
const $registerBtn = document.querySelector("#register-btn");


const ToastifyDisplay = (message,type) => {
   return  Toastify({
        className: type === "succes" ? "succes" : "error",
        text: message,  
        duration: 3000  
        })
}

function User(name,email, password,avatar) {
    this.name = name,
    this.email = email,
    this.password = password,
    this.avatar = avatar
}


const newRegisterUser = (e) => {
    e.preventDefault();
    const newUser = new User($registerName.value, $registerEmail.value, $registerPassword.value, $registerUrl.value)
    console.log(newUser)

    fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(data => {
           console.log(data)
            if (data.id) {
                console.log("id bor")
                ToastifyDisplay("Succesfully registered", "succes").showToast();
               
                setTimeout(() => {
                    location.replace( window.location.origin + "/pages/login.html")
                },3000)
            }

        })
}


$registerForm.addEventListener("submit", newRegisterUser)

