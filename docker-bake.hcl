group "default" {
    targets = ["server"]
}

target "server" {
    tags = ["us-west2-docker.pkg.dev/vibrant-works-336017/docker/opensea-bulk-purchaser"]
    platforms = ["linux/amd64"]
    context = "."
    dockerfile = "./packages/server/Dockerfile"
}
