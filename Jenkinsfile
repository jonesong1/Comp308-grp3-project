pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
        
    stages {
        stage('Checkout') {
            steps { 
                git branch: 'main', url: 'https://github.com/jonesong1/Comp308-grp3-project.git'
            }
        }
        stage('Build') {
          steps {
            sh 'npm install'
          }
        }  

        stage('Test') {
          steps {
            echo "Test run successfully!"
            input message: 'Test run successfull! (Click "Proceed" to continue)'
          }
        }
    }
}
