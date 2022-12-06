node {
     stage('checkout SCM') {
         checkout scm
     }

     stage('Build image') {
         app = docker.build("812675885124.dkr.ecr.ap-northeast-1.amazonaws.com/test-aws-credentials")
     }

     stage('Push image') {      
         docker.withRegistry('https://812675885124.dkr.ecr.ap-northeast-1.amazonaws.com', 'ecr:ap-northeast-1:ecr_credential') {
             app.push("fe_${env.BUILD_NUMBER}")
             app.push("latest")
     }
  }
     
     stage('Deploy Repo2'){
          checkout([$class: 'GitSCM',
                        branches: [[name: '*/main' ]],
                        extensions: scm.extensions,
                        userRemoteConfigs: [[
                            url: 'git@github.com:minnnmin/hrhyv2-react-cd.git',
                            credentialsId: 'test-ssh-credentials',
                        ]]
                ])
          sshagent(credentials: ['test-ssh-credentials']){
               sh("""
                        #!/usr/bin/env bash
                        set +x
                        export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no"
                        git config --global user.email "rhkr_alswjd@naver.com"
                        git config --global user.name "minnmin"
                        git checkout main
                        git pull
                        cd overlay/dev && kustomize edit set image 685766701737.dkr.ecr.ap-northeast-1.amazonaws.com/test:fe_${env.BUILD_NUMBER}
                        git commit -a -m "updated the image tag fe_${env.BUILD_NUMBER}"
                        git push
                    """)
          }    
     }
}
