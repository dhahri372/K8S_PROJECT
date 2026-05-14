const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * CONFIGURATION FINALE : 
 * On pointe directement vers l'IP du Worker 1 via son interface Bridge/Host-only
 * pour contourner les problèmes de résolution DNS interne (EAI_AGAIN).
 */
const dbConfig = {
  host: 'mysql-service',    
  user: 'root',
  password: 'password',
  database: 'k8s_db',      
  port: 3306               
};

const db = mysql.createPool(dbConfig);

/**
 * ROUTE DE SANTÉ (Healthcheck)
 */
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: "UP", 
        message: "Backend connecté via IP physique au Worker 1" 
    });
});

/**
 * RÉCUPÉRATION DES UTILISATEURS (READ)
 */
app.get('/api/users', (req, res) => {
    const sqlQuery = 'SELECT * FROM users';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(" Erreur lors de la lecture DB:", err.message);
            return res.status(500).json({ error: "Erreur Base de données" });
        }
        res.json(results);
    });
});

/**
 * AJOUT D'UN UTILISATEUR (CREATE)
 */
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Nom et Email requis" });
    }
    const sqlInsert = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sqlInsert, [name, email], (err, result) => {
        if (err) {
            console.error(" Erreur lors de l'insertion:", err.message);
            return res.status(500).json({ error: "Échec de l'insertion" });
        }
        res.status(201).json({ id: result.insertId, name, email });
    });
});

/**
 * DÉMARRAGE DU SERVEUR
 */
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(` SERVEUR BACKEND DÉMARRÉ SUR LE PORT ${PORT}`);
    console.log(` CIBLE MYSQL : ${dbConfig.host}:${dbConfig.port}`);
    console.log(`==========================================`);
});