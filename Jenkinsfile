@Library('jenkins-common')_

node("projecdep"){
    stage('Load credentials'){
        withCredentials([
            string(credentialsId: 'jenkins_token_project_dep', variable: 'telegramNotifyChannelBotApiToken'),
            string(credentialsId: 'jenkins_chat_id_project_dep', variable: 'telegramNotifyChannelChatId'),
            string(credentialsId: 'api_token_to_hosting', variable: 'authHostingToken'),
            string(credentialsId: 'id_domain_goit_study', variable: 'domainId'),
            string(credentialsId: 'ip_back_project_server', variable: 'serverIP'),
            
            //ssh credentials to front server stud projects
            string(credentialsId: 'ssh_user_host_stud_project_back', variable: 'sshUserAndHost')
        ]){
                //global bild env
                env.telegramNotifyChannelBotApiToken = telegramNotifyChannelBotApiToken;
                env.telegramNotifyChannelChatId = telegramNotifyChannelChatId;
                env.sshUserAndHost = sshUserAndHost;
                env.authHostingToken = authHostingToken;
                env.domainId = domainId;
                env.ipStudServer = serverIP;
                env.vautUrl = 'https://vault.goit.global';

                //env for github
                env.branch = 'main';
                env.gitCredential = 'pasha-goitacad-ssh';
                env.gitUrl = 'git@github.com:goitProjects/expense_tracker_backend.git';
                
                env.subdomain = 'expenses-tracker.b';
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
          sh "cp /root/scriptsBack/* ${pwdFolder}"
        }
    }

    stage('Add A record to domain') {
    def success = 'SUCCESS'.equals(currentBuild.currentResult)

    if (success){
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
        
    stage('Get ENV from vault') {
    def success = 'SUCCESS'.equals(currentBuild.currentResult)

    if (success) {
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {

                def getEnvProject = sh returnStdout: true, script: "vault kv get -address=${env.vautUrl} -format=json goitProjects/${env.vaultFolder} | jq -r .data.data"
                env.getEnvProject = getEnvProject.trim();
 
                //get projectPort
                def getProjectPort = sh returnStdout: true, script: "vault kv get -address=${env.vautUrl} -format=json goitProjects/${env.vaultFolder} | jq -r .data.data.PORT"
                env.getProjectPort = getProjectPort.trim();
            }
        }
    }

    stage('Create ENV file'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult)

        if (success) {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                sh "node createEnvFile.cjs \'${env.getEnvProject}\'"
            }
        }
    }

    stage('Build'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult);

        if (success) {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                sh "npm i"
            }
        }
    }

    stage('Deploy') {
        def success = 'SUCCESS'.equals(currentBuild.currentResult)

        if (success) {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                //create folder for project
                def mkdirCmd = "mkdir -p /root/${env.vaultFolder}"
                sh "ssh ${env.sshUserAndHost} ${mkdirCmd}"
                //deploy to remore folder
                sh "scp -r ./* ${env.sshUserAndHost}:/root/${env.vaultFolder}"
                sh "scp .env ${env.sshUserAndHost}:/root/${env.vaultFolder}"
                 //clear project build folder
                //sh "rm -rf .[!.]* *"
            }
        }
    }

    stage('Create Backend Service files'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult)

        if (success){
          if ("${env.curentIp}" == "${env.ipStudServer}"){
            echo "Back Services already exists"
          }else{
            sh "java createBackService.java ${env.vaultFolder}"

            //Copy service files to /etc/systemd/system
            def systemdPath = "/etc/systemd/system/";
            env.systemdPath = systemdPath;

            //copy backService
            def backService = env.vaultFolder + '.service';
            env.backService = backService;
            sh "scp ${env.backService} ${env.sshUserAndHost}:${env.systemdPath}"
            //enavle backService
            def enableBackService = "systemctl enable ${env.backService}";
            env.enableBackService = enableBackService;
            sh "ssh ${env.sshUserAndHost} ${env.enableBackService}"

            //copy backWatcherService
            def backWatcherService = env.vaultFolder + '-watcher.service';
            env.backWatcherService = backWatcherService;
            sh "scp ${env.backWatcherService} ${env.sshUserAndHost}:${env.systemdPath}"
            //enavle backWatcherService
            def enableBackWatcherService = "systemctl enable ${env.backWatcherService}";
            env.enableBackWatcherService = enableBackWatcherService;
            sh "ssh ${env.sshUserAndHost} ${env.enableBackWatcherService}"

            //copy backWatcherPath
            def backWatcherPath = env.vaultFolder + '-watcher.path';
            env.backWatcherPath = backWatcherPath;
            sh "scp ${env.backWatcherPath} ${env.sshUserAndHost}:${env.systemdPath}"
            //enavle backWatcherPath
            def enableBackWatcherPath = "systemctl enable ${env.backWatcherPath}";
            env.enableBackWatcherPath = enableBackWatcherPath;
            sh "ssh ${env.sshUserAndHost} ${env.enableBackWatcherPath}"
          }
        }
    }

    stage('Add Nginx config'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult)

        if (success){
        if ("${env.curentIp}" == "${env.ipStudServer}"){
            echo "Nginx config already exists"
          }else{
            //copy file config to the server
            sleep 30;
            def nginxConf = env.fullSubdomain + '.conf';
            env.nginxConf = nginxConf;
            sh "java createNginxConf.java ${env.fullSubdomain} ${env.getProjectPort}"
            sh "scp ${env.nginxConf} ${env.sshUserAndHost}:/etc/nginx/conf.d/"
            
            //check nginx syntax 
            def nginxSyntax = "nginx -t";
            env.nginxSyntax = nginxSyntax;
            sh "ssh ${env.sshUserAndHost} ${env.nginxSyntax}"

            //reload nginx
            def nginxReload = "nginx -s reload";
            env.nginxReload = nginxReload;
            sh "ssh ${env.sshUserAndHost} ${env.nginxReload}"

            //create SSL
            sleep 120;
            def certbotSSL = "certbot --nginx -d ${env.fullSubdomain}";
            env.certbotSSL = certbotSSL;
            sh "ssh ${env.sshUserAndHost} ${env.certbotSSL}"
          }
        }
    }

    stage('Start backend services'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult)

        if (success){
        if ("${env.curentIp}" == "${env.ipStudServer}"){
            echo "Backend services already running"
          }else{
            def backendServices = [
                    "${env.backService}",
                    "${env.backWatcherService}",
                    "${env.backWatcherPath}"
                ];
            for(backendService in backendServices){
                def startService = "systemctl start ${backendService}";
                env.startService = startService;
                sh "ssh ${env.sshUserAndHost} ${env.startService}"
            }
          }
        }
    }

    stage('Clear project folder'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult)

        if (success){
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
