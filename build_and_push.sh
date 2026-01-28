# Build image
docker build -t khaerulilman/shipping-service:latest .

# Login Docker Hub (optional jika belum login)
# docker login

# Push ke Docker Hub
docker push khaerulilman/shipping-service:latest
