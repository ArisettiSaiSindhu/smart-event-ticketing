pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Smart Event Ticketing project'
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Frontend Install') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Backend Check') {
            steps {
                dir('backend') {
                    bat 'node --check server.js'
                }
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                if not exist "%WORKSPACE%\\deployment" mkdir "%WORKSPACE%\\deployment"
                if exist "%WORKSPACE%\\deployment\\frontend" rmdir /S /Q "%WORKSPACE%\\deployment\\frontend"
                xcopy "%WORKSPACE%\\frontend\\dist" "%WORKSPACE%\\deployment\\frontend" /E /I /Y
                echo Deployment completed successfully.
                '''
            }
        }

        stage('CI/CD Complete') {
            steps {
                echo 'CI/CD pipeline completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'BUILD AND DEPLOYMENT SUCCESSFUL!'
        }

        failure {
            echo 'BUILD OR DEPLOYMENT FAILED - Check console output.'
        }
    }
}