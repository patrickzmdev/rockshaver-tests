pipeline {
    agent {
        docker {
          image 'cypress/browsers:latest'
          args '-u root --network rockshaver_skynet'
          }
    }
    stages {
        stage('Testes no Backend') {
    steps {
        dir('api') {
            sh 'npm install'
            sh 'npx cypress install --force'
            sh 'chmod +x node_modules/.bin/cypress'
            sh 'npx cypress run'
        }
    }
}

        stage('Testes no Frontend(Mobile)') {
            steps {
              dir('mobile') {
                sh 'echo teste'
              }
            }
        }

        stage('Testes no Frontend(Web)') {
            steps {
              dir('web') {
                sh 'echo teste'
              }
            }
        }
    }
}
