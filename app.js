// ===============================
// CONFIGURACIÓN
// ===============================
const API = "https://batman-venice-manitoba-placement.trycloudflare.com"; 
// 👆 cambia solo si Cloudflare te da otra URL


// ===============================
// LOGIN
// ===============================
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.ok) {
            // Guardamos token y datos básicos
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirigir a dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Credenciales incorrectas");
        }

    } catch (error) {
        console.error("Error en login:", error);
        alert("No se pudo conectar con el servidor");
    }
}


// ===============================
// LOGOUT
// ===============================
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirige al login
    window.location.href = "index.html";
}


// ===============================
// PROTEGER PÁGINAS
// ===============================
function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        // No hay sesión → fuera
        window.location.href = "index.html";
    }
}


// ===============================
// OBTENER USUARIO LOGUEADO
// ===============================
function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}


// ===============================
// PETICIÓN AUTENTICADA (UTILIDAD)
// ===============================
async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    if (!token) {
        logout();
        return;
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(options.headers || {})
    };

    const response = await fetch(`${API}${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        // Token inválido o expirado
        logout();
        return;
    }

    return response.json();
}
