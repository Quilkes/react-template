# Use official Bun image as base
FROM oven/bun:1

# Install git (needed for some npm packages)
RUN apt-get update && \
    apt-get install -y --no-install-recommends git ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /home/user/app

# Copy package files first (for better caching)
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Pre-warm the Vite dep cache so the first browser load doesn't trigger
# on-demand bundling of three/framer-motion/gsap/etc. at runtime.
# "vite optimize" writes pre-bundled chunks to node_modules/.vite/deps/
# and stays there in the image — dev server picks them up immediately.
RUN bunx vite optimize

# Expose the dev server port
EXPOSE 3000

# Default command (can be overridden by Modal)
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
