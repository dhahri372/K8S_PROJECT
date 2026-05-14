pipeline {
    agent { label 'tools-agent' } // Utilise ton agent Tools

    environment {
        NEXUS_REGISTRY = "192.168.56.20:5000"
        K8S_MASTER     = "192.168.56.10"
        APP_VERSION    = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Cleanup & Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Build & Push Backend') {
            steps {
                dir('backend') {
                    sh "docker build -t ${NEXUS_REGISTRY}/mon-app-backend:${APP_VERSION} ."
                    sh "docker push ${NEXUS_REGISTRY}/mon-app-backend:${APP_VERSION}"
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                dir('frontend') {
                    sh "docker build --build-arg NODE_OPTIONS='--max-old-space-size=512' -t ${NEXUS_REGISTRY}/mon-app-frontend:${APP_VERSION} ."
                    sh "docker push ${NEXUS_REGISTRY}/mon-app-frontend:${APP_VERSION}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // 1. Préparer le dossier k8s sur le Master
                    sh "ssh -o StrictHostKeyChecking=no vagrant@${K8S_MASTER} 'mkdir -p ~/k8s'"
                    
                    // 2. Envoyer les fichiers YAML du dossier k8s vers le Master
                    sh "scp -r k8s/* vagrant@${K8S_MASTER}:~/k8s/"
                    
                    // 3. Modifier les images dans les YAML sur le Master pour utiliser la nouvelle version
                    sh "ssh vagrant@${K8S_MASTER} \"sed -i 's|image:.*backend.*|image: ${NEXUS_REGISTRY}/mon-app-backend:${APP_VERSION}|g' ~/k8s/backend.yaml\""
                    sh "ssh vagrant@${K8S_MASTER} \"sed -i 's|image:.*frontend.*|image: ${NEXUS_REGISTRY}/mon-app-frontend:${APP_VERSION}|g' ~/k8s/frontend.yaml\""
                    
                    // 4. Appliquer les changements sur le cluster
                    sh "ssh vagrant@${K8S_MASTER} 'kubectl apply -f ~/k8s/'"
                }
            }
        }
    }

    post {
        success {
            echo " Déploiement réussi ! Version : ${APP_VERSION}"
        }
        failure {
            echo " Le pipeline a échoué. Vérifiez les logs."
        }
    }
}