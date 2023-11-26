@Library('jenkins-common')_

node("projecdep"){
    stage('Load credentials') {
      withCredentials([
            string(credentialsId: 'jenkins_token_project_dep', variable: 'telegramNotifyChannelBotApiToken'),
            string(credentialsId: 'jenkins_chat_id_project_dep', variable: 'telegramNotifyChannelChatId'),
            string(credentialsId: 'api_token_to_hosting', variable: 'authHostingToken'),
            string(credentialsId: 'id_domain_goit_study', variable: 'domainId'),
            string(credentialsId: 'ip_front_projects_server', variable: 'serverIP'),
            
            //ssh credentials to front server stud projects
            string(credentialsId: 'ssh_user_host_for_stud_project_front', variable: 'sshUserAndHost')
        ]){
                //global bild env
                env.telegramNotifyChannelBotApiToken = telegramNotifyChannelBotApiToken;
                env.telegramNotifyChannelChatId = telegramNotifyChannelChatId;
                env.sshUserAndHost = sshUserAndHost;
                env.authHostingToken = authHostingToken;
                env.domainId = domainId;
                env.ipStudServer = serverIP;

                //env for github
                env.branch = 'main';
                env.gitCredential = 'pasha-goitacad-ssh';
                env.gitUrl = 'git@github.com:goitProjects/expense_tracker_backend.git';
                
                env.subdomain = 'expense-tracker.b';
                env.vaultFolder = 'expense-tracker-b'; 
                
            }
        
    }

    stage('Setup texts') {
        def buildUrl = env.RUN_DISPLAY_URL;
        
        env.startBuildText = java.net.URLEncoder.encode("Build *${JOB_NAME}* started\n[Go to build](${buildUrl})", "UTF-8");
        env.successBuildText = java.net.URLEncoder.encode("Build *${JOB_NAME}* finished SUCCESS.\nTime: TIME\n[Go to build](${buildUrl})", "UTF-8");
        env.failedBuildText = java.net.URLEncoder.encode("Build *${JOB_NAME}* FAILED.\nTime: TIME\n[Go to build](${buildUrl})", "UTF-8");
    }
    
    stage('Pre Build Notify') {
        //Send message to channel
        sendTelegramChannelMessage(
            env.telegramNotifyChannelBotApiToken,
            env.telegramNotifyChannelChatId,
            env.startBuildText
        );

    }

    stage('Clone Git Repo') {
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
            git branch: env.branch, credentialsId: env.gitCredential, url: env.gitUrl
        }
    }

    stage('Copy scripts to project`s folder') {
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          def pwdFolder = pwd();
          sh "cp /root/scripts/* ${pwdFolder}"
        }
    }    
    
    stage('Add A record to domain') {
        def success = 'SUCCESS'.equals(currentBuild.currentResult);

        if(success){
        env.fullSubdomain = "${env.subdomain}" + '.goit.study';
          def curentIp = sh returnStdout: true, script: "ping ${env.fullSubdomain} -c 1 | tr -d \\(\\)  | awk \'NR==1{print \$3}\'"
          env.curentIp = curentIp.trim();
          if ("${env.curentIp}" == "${env.ipStudServer}"){
            echo "subdomain already exists"
          }else{
            sh "php -e addDomainRecord.php ${env.subdomain} ${env.ipStudServer} ${env.authHostingToken} ${env.domainId}"
          }
        }
     }
        
    stage('Build'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult);

        if (success) {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                sh "./build.sh"
            }
        }
     }
    
    stage('Deploy') {
          def success = 'SUCCESS'.equals(currentBuild.currentResult);

         if (success) {
             catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                //create folder for project
                def mkdirCmd = "mkdir -p /var/www/${env.fullSubdomain}/html"
                sh "ssh ${env.sshUserAndHost} ${mkdirCmd}"
                //sent files to projectFolder
                sh "scp -r ./${env.buildFolder}/* ${env.sshUserAndHost}:/var/www/${env.fullSubdomain}/html"
             }
         }
     }

    stage('Add Apache2 config and SSL'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult);

        if(success){
        if ("${env.curentIp}" == "${env.ipStudServer}"){
            echo "Apache config already exists"
          }else{
            //copy file config to the server
            sleep 60;
            def apache2Conf = env.fullSubdomain + '.conf';
            env.apache2Conf = apache2Conf;
            sh "java createApacheConf.java ${env.fullSubdomain}"
            sh "scp ${env.apache2Conf} ${env.sshUserAndHost}:/etc/apache2/sites-available/"
            
            //check apache2 syntax 
            def apache2Syntax = "apache2ctl configtest";
            env.apache2Syntax = apache2Syntax;
            sh "ssh ${env.sshUserAndHost} ${env.apache2Syntax}"

            //enable apache2 conf file 
            def apache2EnableSite = "a2ensite ${env.apache2Conf}";
            env.apache2EnableSite = apache2EnableSite;
            sh "ssh ${env.sshUserAndHost} ${env.apache2EnableSite}"

            //reload apache2
            def apache2Reload = "systemctl reload apache2";
            env.apache2Reload = apache2Reload;
            sh "ssh ${env.sshUserAndHost} ${env.apache2Reload}"

            //create SSL
            sleep 120;
            def certbotSSL = "certbot --apache -d ${env.fullSubdomain}";
            env.certbotSSL = certbotSSL;
            sh "ssh ${env.sshUserAndHost} ${env.certbotSSL}"
          }
        }
    }

    stage('Check SSL') {
         def success = 'SUCCESS'.equals(currentBuild.currentResult);

         if (success){
            sleep 30;
            def urlHttps = 'https://' + "${env.fullSubdomain}";
            def curlRequest='curl -s -o /dev/null -w "%{http_code}"'

            def response_code = sh returnStdout: true, script: "${curlRequest}  ${urlHttps}"
            env.response_code = response_code.trim();

            if("${env.response_code}" == '200'){
                echo "HTTPS connection success"
            } else {
                echo "HTTPS connection to ${urlHttps} returned a non-200 status code: ${response_code}"
                sh "ssh ${env.sshUserAndHost} ${env.certbotSSL}"
            }
         }
    }

    stage('Clear project folder'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult);

        if(success){
        //clear project build folder
        sh "rm -rf .[!.]* *"
        }
    }
    
    stage('Post Build Notify') {
        def success = 'SUCCESS'.equals(currentBuild.currentResult);
        def previousBuildSuccess = true;
        if (currentBuild.previousBuild != null && !'SUCCESS'.equals(currentBuild.previousBuild.currentResult)) {
            previousBuildSuccess = false;
        }
        
        def message = '';
        if (success) {
            message = env.successBuildText;
        } else {
            message = env.failedBuildText;
        }
        
        //Calculate time
        def durationSeconds = (int) (currentBuild.duration / 1000);
        def durationMinutes = (int) (durationSeconds / 60);
        durationSeconds -= durationMinutes * 60;
        
        message = message.replace('TIME', "${durationMinutes} min ${durationSeconds} sec");
        
        //Send message to global notify channel
        sendTelegramChannelMessage(
            env.telegramNotifyChannelBotApiToken,
            env.telegramNotifyChannelChatId,
            message
        )
        
    }
}
