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

    // Guardamos sesión
    localStorage.setItem("usuario", email);

    mensaje.textContent = "Login correcto ✅";
    mensaje.style.color = "green";

    setTimeout(() => {
      window.location.reload();
    }, 1000);

  } else {
    mensaje.textContent = "Credenciales incorrectas ❌";
    mensaje.style.color = "red";
  }
}

window.onload = () => {
  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    document.body.innerHTML = `
      <h2>Bienvenido ${usuario}</h2>
      <p>Sesión activa</p>
      <button onclick="logout()">Cerrar sesión</button>
    `;
  }
};

function logout() {
  localStorage.removeItem("usuario");
  window.location.reload();
}

