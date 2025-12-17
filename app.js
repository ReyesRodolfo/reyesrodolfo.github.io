function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  if (!email || !password) {
    mensaje.textContent = "Completa todos los campos";
    return;
  }

  // LOGIN SIMULADO
  if (email === "admin@uni.edu" && password === "1234") {
    mensaje.textContent = "Login correcto ✅";
    mensaje.style.color = "green";
  } else {
    mensaje.textContent = "Credenciales incorrectas ❌";
    mensaje.style.color = "red";
  }
}
