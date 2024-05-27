# ideascope

## Infra setup

Set the OS_CLOUD environment variable as it appears in clouds.yaml.
```
OS_CLOUD=infomaniak-dev
```

Initial key setup if you are in a brand new environment and no one has generated the key yet.
```
openstack --os-cloud $OS_CLOUD keypair create microk8s > ~/.ssh/openstack/$OS_CLOUD-microk8s.priv
chmod 600 ~/.ssh/openstack/$OS_CLOUD-microk8s.priv
```

Then connect with
```
ssh -i ~/.ssh/openstack/$OS_CLOUD-microk8s.priv -o StrictHostKeyChecking=accept-new ubuntu@<IP>
```

To troubleshoot issues (run inside the VM):
```
sudo less /var/log/cloud-init-output.log
```