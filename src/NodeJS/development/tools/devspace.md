# Example using Devspace for Central-Ledger

[Devspace](https://www.devspace.sh/) will allow you to run and debug code within a live Kubernetes environment.

The method shown below can be applied to any services with some minor tweaks/changes.

## References

1. original version of this document: https://gist.github.com/mdebarros/01ad36506ecc079753acd18d2dd4cabf
2. similar (possibly out-dated) gist that I shared in the past: https://gist.github.com/mdebarros/0b0818189a277679cc7a01049f81b0fa#file-devspace-md

## Install Devspace

Install [Devspace](https://www.devspace.sh/) --> https://www.devspace.sh/docs/getting-started/installation

## Setup

1. Copy [devspace.yaml](./devspace_config.md) to the root folder, making sure to edit the confg to match your environment
    - IMAGE / REPLACE_IMAGE vars - make sure it matches the Alpine Nodejs Docker image version as in your `nvmrc` file with format as `node:{{NODE_VERSION}}-alpine` (e.g. `node:18.17.1-alpine`)
    - LABEL_NAME var - make sure it matches the sub-prefix name of your desired deployment label for `app.kubernetes.io/name` (refer to /.devspace/deployment.yaml - see below for more info)
    - LABEL_INSTANCE var - make sure it matches the name of your deployment label for `app.kubernetes.io/instance` (refer to /.devspace/deployment.yaml - see below for more info)
2. Copy [devspace_start.sh](./devspace_script.md) to the root folder
3. Create a `.devspace` folder
4. Dump desired Central-ledger `deployment.yaml` using the following example into the `.devspace` folder

    ```bash
    kubectl -n moja2 get deployment moja2-centralledger-handler-transfer-fulfil -o yaml > ./.devspace/deployment.yaml
    ```

## Configure VS Code with the following debug targert

Save the following config in `.vscode/launch.json`

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach to Process @9229",
            "type": "node",
            "request": "attach",
            "port": 9229,
            "remoteRoot": "/opt/app/"
        }
    ]
}
```

## Run Devspace

```bash
devspace dev
```

This will deploy a new deployment with the same name as the target deployment, except it will have a `devspace` suffix at the end. E.g. `moja2-centralledger-handler-transfer-fulfil-devspace`.

```bash
❯ kubectl -n moja2 get deployment | grep fulfil
moja2-centralledger-handler-transfer-fulfil            0/0     0            0           51m <-- NOTE: This has been scaled to 0.
moja2-centralledger-handler-transfer-fulfil-devspace   1/1     1            1           17h
```

If you want to revert, then 

1. Exit the devspace process in your terminal, 
2. Delete the `moja2-centralledger-handler-transfer-fulfil-devspace` deployment, and
3. Scale the `moja2-centralledger-handler-transfer-fulfil` deployment from `0` to `1`

### Running Service

Once the devspace service has fully started and synchronised the filesystem from your local to remote, it will

1. Execute the [devspace_start.sh](src/NodeJS/development/tools/assets/devspace_start.sh) file (which currently installs OS and NPM dependencies)
2. Print out some sample instructions/commands on how to start the Central-Ledger service as found in the [devspace_start.sh](src/NodeJS/development/tools/assets/devspace_start.sh)

You can also refer to the `deployment.yaml` for the container command:

 ```yaml
 spec:
  containers:
  - command:
    - node
    - src/handlers/index.js
    - handler
    - --fulfil
 ```

 You can execute it in your pod terminal like so:

 ```bash
 node --inspect=0.0.0.0:9229 src/handlers/index.js handler --fulfil
 ```

 > Note: `--inspect=0.0.0.0:9229` argument to start the service in debug mode (ensure that you have added the debug port to the `deployment.yaml`.

If you need to attach a debugger on startup, then use `--inspect-brk=0.0.0.0:9229` instead.

If youare missing some stdout statements, you can override the `CSL_LOG_TRANSPORT` (which is generally set to `file`) to `console` - This will ensure that all log statements are printed to your stdout.

 ```bash
 CSL_LOG_TRANSPORT=console node --inspect=0.0.0.0:9229 src/handlers/index.js handler --fulfil
 ```

 You can also override the `LOG_LEVEL`.

 ```bash
 LOG_LEVEL=debug CSL_LOG_TRANSPORT=console node --inspect=0.0.0.0:9229 src/handlers/index.js handler --fulfil
 ```

## Debugging

Once the service has been started, execute the `Attach to Process @9229` process in VSCode, and you should see your Pod stdout show 

```bash
Debugger attached.
```

Overally it should look something like this:

```bash
$ node --inspect=0.0.0.0:9229 src/handlers/index.js handler --fulfil
Debugger listening on ws://0.0.0.0:9229/97ecb806-186a-4448-99c9-5d9b417e2f8d   <-- NOTE: Indicates that debugger has started
For help, see: https://nodejs.org/en/docs/inspector
(node:2151) [MONGODB DRIVER] Warning: promiseLibrary is a deprecated option
(Use `node --trace-warnings ...` to show where the warning was created)
http://moja3-cl-handler-bulk-transfer-fulfil-fc84f74fc-w6426-q2hn8:3001
method  path      description                
------  --------  ---------------------------
GET     /health                              
GET     /metrics  Prometheus metrics endpoint

Debugger attached.   <-- NOTE: This indicates that your debugger has attached successfully!
```
