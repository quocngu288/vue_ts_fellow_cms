module.exports = (shipit) => {
  // Load shipit-deploy tasks
  require("shipit-deploy")(shipit);
  shipit.initConfig({
    default: {
      workspace: "./dist",
      keepWorkspace: false,
      repositoryUrl: "", // Skip fetching repo
      ignores: [".git", "node_modules", "deploy"],
      deleteOnRollback: true,
      shallowClone: false,
      keepReleases: 3,
    },
    staging: {
      deployTo: "/var/www/fellow/fellow-cms-vue-ts",
      key: "/Volumes/Storage/aws-key/gumi_key/dev-imri/imri-vietnam-public-key-dev.pem",
      servers: ["ec2-user@35.74.84.116"],
      build: "npm run build:staging",
    },
  });

  shipit.blTask("deploy:build", async () => {
    await shipit.local(shipit.config.build);
  });

  shipit.blTask("copyConfig", async () => {
    await shipit.copyToRemote('./deploy/.htaccess', shipit.currentPath + '/.htaccess')
  });

  shipit.on("deploy", async () => {
    await shipit.start(["deploy:build"]);
  });

  shipit.on("deployed", async function () {
    await shipit.start(["copyConfig"]);
  });
};
