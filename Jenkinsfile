node {
     stage('checkout SCM') {
         checkout scm
     }

     stage('Build image') {
         app = docker.build("812675885124.dkr.ecr.ap-northeast-1.amazonaws.com/test-aws-credentials")
     }

     stage('Push image') {      
         docker.withRegistry('https://685766701737.dkr.ecr.ap-northeast-1.amazonaws.com', 'ecr:ap-northeast-1:ecr_credential') {
             app.push("fe_${env.BUILD_NUMBER}")
             app.push("latest")
     }
  }
     
     stage('Deploy Repo2'){
          checkout([$class: 'GitSCM',
                        branches: [[name: '*/main' ]],
                        extensions: scm.extensions,
                        userRemoteConfigs: [[
                            url: 'git@github.com:dlgusrb3456/ArgoCD_fe.git',
                            credentialsId: 'jenkins-ssh-private',
                        ]]
                ])
          sshagent(credentials: ['jenkins-ssh-private']){
               sh("""
                        #!/usr/bin/env bash
                        set +x
                        export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no"
                        git config --global user.email "dlgusrb3456@naver.com"
                        git config --global user.name "dlgusrb3456"
                        git checkout main
                        git pull
                        cd overlay/dev && kustomize edit set image 685766701737.dkr.ecr.ap-northeast-1.amazonaws.com/test:fe_${env.BUILD_NUMBER}
                        git commit -a -m "updated the image tag fe_${env.BUILD_NUMBER}"
                        git push
                    """)
          }    
     }
}
