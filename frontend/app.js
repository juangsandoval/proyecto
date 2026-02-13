// ✅ IMPORTANTE: pon aquí la URL de tu backend de Render (sin / final)
const BACKEND_URL = "https://proyectosaas.onrender.com";

const btnSaludo = document.getElementById("btnSaludo");
const salidaSaludo = document.getElementById("salidaSaludo");

btnSaludo.addEventListener("click", async () => {
  salidaSaludo.textContent = "Cargando...";
  try {
    const res = await fetch(`${BACKEND_URL}/api/saludo`);
    const data = await res.json();
    salidaSaludo.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    salidaSaludo.textContent = "Error: " + err.message;
  }
});

const form = document.getElementById("formContacto");
const salidaContacto = document.getElementById("salidaContacto");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  salidaContacto.textContent = "Enviando...";

  const fd = new FormData(form);
  const payload = {
    nombre: fd.get("nombre"),
    email: fd.get("email"),
    mensaje: fd.get("mensaje"),
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      salidaContacto.textContent = "Error " + res.status + ":\n" + JSON.stringify(data, null, 2);
      return;
    }

    salidaContacto.textContent = JSON.stringify(data, null, 2);
    form.reset();
  } catch (err) {
    salidaContacto.textContent = "Error: " + err.message;
  }
});
