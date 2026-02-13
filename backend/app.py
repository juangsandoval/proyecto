import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# 👇 Permite CORS solo desde tu GitHub Pages (recomendado).
# En Render luego pondrás esta variable.
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "*")

CORS(
    app,
    resources={r"/api/*": {"origins": FRONTEND_ORIGIN}},
)

@app.get("/")
def home():
    return "Backend OK ✅"

@app.get("/api/saludo")
def saludo():
    return jsonify(message="Hola desde Render 👋")

@app.post("/api/contacto")
def contacto():
    data = request.get_json(silent=True) or {}
    nombre = (data.get("nombre") or "").strip()
    email = (data.get("email") or "").strip()
    mensaje = (data.get("mensaje") or "").strip()

    if not nombre or not email or not mensaje:
        return jsonify(error="Faltan campos: nombre, email y mensaje."), 400

    # Aquí normalmente guardarías en DB o enviarías email.
    # Por ahora solo devolvemos un OK.
    return jsonify(
        ok=True,
        recibido={
            "nombre": nombre,
            "email": email,
            "mensaje": mensaje
        }
    ), 201

if __name__ == "__main__":
    # Solo para correr local; Render usa gunicorn.
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
