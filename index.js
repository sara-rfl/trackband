const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Permitir requests do frontend
app.use(cors());
app.use(express.json());

// Estrutura simples para armazenar pacientes
let patients = {};

// Recebe dados da app
app.post("/api/location", (req, res) => {
    console.log ("Recebido: ", req.body);
    const { patient_id, unit, timestamp } = req.body;

    if (!patient_id || !unit || !timestamp) {
        return res.status(400).send({ error: "Dados incompletos" });
    }

    if (!patients[unit]) patients[unit] = [];

    // Atualiza paciente se já existir, senão adiciona
    const index = patients[unit].findIndex(p => p.patient_id === patient_id);
    if (index >= 0) {
        patients[unit][index].timestamp = timestamp;
    } else {
        patients[unit].push({ patient_id, timestamp });
    }

    res.send({ status: "ok" });
});

// Fornece dados para frontend
app.get("/api/patients", (req, res) => {
    res.send(patients);
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Backend a correr em http://0.0.0.0:3000");

});