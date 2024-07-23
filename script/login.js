const $loginForm = document.querySelector("#login-form")
const $loginEmail = document.querySelector("#login-email");
const $loginPassword = document.querySelector("#login-password");


const ToastifyDisplay = (message,type) => {
    return  Toastify({
         className: type === "succes" ? "succes" : "error",
         text: message,  
         duration: 3000  
         })
 }


function User(email,password) {
  this.email = email,
  this.password = password

  console.log(email,password)
}

const newLoginUser = (e) => {
    e.preventDefault();

    const user = new User($loginEmail.value, $loginPassword.value)
    console.log(user)

    fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data =>  {
            console.log(data)
            if (data && data.access_token) {

                localStorage.setItem("token", data.access_token)
                 
                ToastifyDisplay("Succesfully logged", "succes").showToast();

                setTimeout(() => {
                    location.replace(window.location.origin + "/index.html")
                },3000)
            }else{
                ToastifyDisplay("Login failed. No such user exists", "error").showToast();
            }
        })
 
}


 $loginForm.addEventListener("submit" , newLoginUser)