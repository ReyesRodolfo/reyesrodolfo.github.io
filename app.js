const API = "http://siilat.duckdns.org:5000";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  const res = await fetch(`${API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    mensaje.textContent = "Credenciales incorrectas ❌";
    mensaje.style.color = "red";
    return;
  }

  const data = await res.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("usuario", data.usuario);
  localStorage.setItem("rol", data.rol);

  window.location.reload();
}

window.onload = () => {
  const token = localStorage.getItem("token");

  if (token) {
    document.body.innerHTML = `
      <h2>Sesión activa</h2>
      <p>Token recibido</p>
      <button onclick="logout()">Cerrar sesión</button>
    `;
  }
};

function logout() {
  localStorage.removeItem("usuario");
  window.location.reload();
}

