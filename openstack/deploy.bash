#!/bin/bash
OS_CLOUD=${1:-infomaniak-dev}
if openstack --os-cloud $OS_CLOUD stack show microk8s > /dev/null 2>&1; then
    STACK_COMMAND=update
else
    STACK_COMMAND=create
fi
openstack \
    --os-cloud $OS_CLOUD \
    stack $STACK_COMMAND \
    --template openstack/microk8s-single.yml \
    --parameter image_id="Ubuntu 24.04 LTS Noble Numbat" \
    --parameter instance_type=a1-ram2-disk20-perf1 \
    --parameter network=ext-net1 \
    microk8s
