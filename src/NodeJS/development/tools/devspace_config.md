# File: devspace.yaml

```yaml
## INSTRUCTIONS:
## cmd: devspace dev
##

version: v1beta10

# `vars` specifies variables which may be used as ${VAR_NAME} in devspace.yaml
vars:
  - name: IMAGE
    value: node:18.17.1-alpine
  - name: WORKDIR
    value: /opt/app
  - name: LABEL_NAME
    # value: &LABEL_NAME centralledger-handler-admin-transfer
    # value: &LABEL_NAME centralledger-handler-transfer-prepare
    value: &LABEL_NAME centralledger-handler-transfer-fulfil
    # value: &LABEL_NAME cl-handler-bulk-transfer-fulfil
    # value: &LABEL_NAME cl-handler-bulk-transfer-prepare
    # value: &LABEL_NAME centralledger-handler-transfer-position
    # value: &LABEL_NAME centralledger-handler-timeout
  - name: LABEL_INSTANCE
    # value: moja1
    value: moja2
    # value: moja3
    # value: dev3
  - name: DEPLOYMENT_NAME
    value: *LABEL_NAME
  - name: CONTAINER_NAME
    value: *LABEL_NAME
  - name: REPLACE_IMAGE
    value: node:18.17.1-alpine

# `deployments` tells DevSpace how to deploy this project
deployments:
- name: ${LABEL_INSTANCE}-${DEPLOYMENT_NAME}
  # This deployment uses `kubectl` but you can also define `helm` deployments
  kubectl:
    manifests:
    - .devspace/deployment.yaml

# `dev` only applies when you run `devspace dev`
dev:
  # `dev.ports` specifies all ports that should be forwarded while `devspace dev` is running
  # Port-forwarding lets you access your application via localhost on your local machine
  ports:
  - labelSelector:
      app.kubernetes.io/name: ${LABEL_NAME}
      app.kubernetes.io/instance: ${LABEL_INSTANCE}
  # - imageSelector: ${IMAGE} # Select the Pod that runs our `${IMAGE}`
    forward:
    - port: 3001
    - port: 9229
      remotePort: 9229

  # `dev.open` tells DevSpace to open certain URLs as soon as they return HTTP status 200
  # Since we configured port-forwarding, we can use a localhost address here to access our application
  # open:
  # - url: http://localhost:3007

  # `dev.sync` configures a file sync between our Pods in k8s and your local project files
  sync:
  - labelSelector:
      app.kubernetes.io/name: ${LABEL_NAME}
      app.kubernetes.io/instance: ${LABEL_INSTANCE}
  # - imageSelector: ${IMAGE} # Select the Pod that runs our `${IMAGE}`
    disableDownload: true
    # waitInitialSync: false
    # polling: false
    containerPath: ${WORKDIR}
    localSubPath: ./
    excludePaths:
    - .git/
    - config/
    - secrets/
    - test/
    # downloadExcludePaths:
    # - config/
    uploadExcludePaths:
    - deploy/
    # - config/
    - coverage/
    - node_modules/
    - .dockerignore
    - .editorconfig
    - .istanbul.yml
    - circle.yml
    - docker-compose.circle.yml
    - docker-compose.dev.yml
    - docker-compose.functional.yml
    - docker-compose.yml
    - Dockerfile
    - LICENSE
    - sonar-project.properties

  # `dev.terminal` tells DevSpace to open a terminal as a last step during `devspace dev`
  terminal:
    labelSelector:
      app.kubernetes.io/name: ${LABEL_NAME}
      app.kubernetes.io/instance: ${LABEL_INSTANCE}
    # imageSelector: ${IMAGE} # Select the Pod that runs our `${IMAGE}`
    # With this optional `command` we can tell DevSpace to run a script when opening the terminal
    # This is often useful to display help info for new users or perform initial tasks (e.g. installing dependencies)
    # DevSpace has generated an example ./devspace_start.sh file in your local project - Feel free to customize it!
    workDir: ${WORKDIR}
    command:
    - sh
    - devspace_start.sh

  # Since our Helm charts and manifests deployments are often optimized for production,
  # DevSpace let's you swap out Pods dynamically to get a better dev environment
  replacePods:
  - labelSelector:
      app.kubernetes.io/name: ${LABEL_NAME}
      app.kubernetes.io/instance: ${LABEL_INSTANCE}
    containerName: ${CONTAINER_NAME}
  # - imageSelector: ${IMAGE} # Select the Pod that runs our `${IMAGE}`
    # Since the `${IMAGE}` used to start our main application pod may be distroless or not have any dev tooling, let's replace it with a dev-optimized image
    # DevSpace provides a sample image here but you can use any image for your specific needs
    # replaceImage: loftsh/javascript:latest
    replaceImage: ${REPLACE_IMAGE}
    # Besides replacing the container image, let's also apply some patches to the `spec` of our Pod
    # We are overwriting `command` + `args` for the first container in our selected Pod, so it starts with `sleep 9999999`
    # Using `sleep infinity` as PID 1 (instead of the regular ENTRYPOINT), allows you to start the application manually
    patches:
    # Lets replace the container command with `sleep infinity` so that the container does not start the application automatically
    - op: replace
      path: spec.containers[0].command
      value:
      - sleep
    - op: replace
      path: spec.containers[0].args
      value:
      - infinity
    - op: add
      path: spec.containers[0].ports
      value:
        containerPort: 9229
        name: debug
        protocol: TCP
    # Remove securityContext
    - op: remove
      path: spec.containers[0].securityContext
    # Remove Readiness and Liveness probes
    - op: remove
      path: spec.containers[0].readinessProbe
    - op: remove
      path: spec.containers[0].livenessProbe
    - op: remove
      path: spec.containers[1].readinessProbe
    - op: remove
      path: spec.containers[1].livenessProbe

# `profiles` lets you modify the config above for different environments (e.g. dev vs production)
profiles:
  # This profile is called `production` and you can use it for example using: devspace deploy -p production
  # We generally recommend to use the base config without any profiles as optimized for development (e.g. image build+push is disabled)
- name: production
# This profile adds our image to the config so that DevSpace will build, tag and push our image before the deployment
  merge:
    images:
      app:
        image: ${IMAGE} # Use the value of our `${IMAGE}` variable here (see vars above)
        dockerfile: ./Dockerfile
```
