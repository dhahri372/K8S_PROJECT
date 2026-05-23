#  Projet K8S - Architecture Microservices avec Kubernetes & Jenkins

Ce projet présente le déploiement automatisé d'une application Web Full-Stack (Frontend React, Backend Node.js, Base de données MySQL) sur un cluster Kubernetes managé localement.

##  Architecture du Projet
* **frontend/** : Application React.js exposée via un Service NodePort.
* **backend/** : API Node.js connectée à la base de données.
* **k8s/** : Manifestes Kubernetes (Déploiements, Services, et Stockage Persistant via NFS).
* **Jenkinsfile** : Pipeline CI/CD automatisant le Build Docker, le Push sur registre privé et le Déploiement.

##  Technologies utilisées
* **Automatisation / Infrastructure :** Vagrant, Ansible, Jenkins, Gitea
* **Conteneurisation & Orchestration :** Docker, Kubernetes (K8s)