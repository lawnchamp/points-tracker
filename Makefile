export SHELL := /bin/bash

.DEFAULT_GOAL := help

certs: ## generate certificates
	@sudo mkdir -p /etc/resolver/;
	@mkdir certs;
	@sudo sh -c 'echo "nameserver 127.0.0.1" > /etc/resolver/dev';
	@mkcert -install;
	@mkcert \
		--cert-file ./certs/points.dev.pem --key-file ./certs/points.dev-key.pem \
		devhost 127.0.0.1 ::1 \
		points.dev "*.points.dev"

# PHONY (non-file) Targets
# ------------------------
.PHONY: certs

# `make help` -  see http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
# ------------------------------------------------------------------------------------
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
