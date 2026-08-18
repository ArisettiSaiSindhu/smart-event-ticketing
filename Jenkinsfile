
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

        stage('CI Complete') {
            steps {
                echo 'CI pipeline completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL - Smart Event Ticketing is ready for deployment.'
        }

        failure {
            echo 'BUILD FAILED - Please check the console output.'
        }
    }
}