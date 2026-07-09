#!/bin/bash
set -e

echo "========================================"
echo "  HutanoTrack - Project Setup"
echo "========================================"
echo ""

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Error: Node.js is required (v20+). Install it from https://nodejs.org"; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "Installing pnpm..."; npm install -g pnpm; }

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "Error: Node.js v20+ required (current: $(node -v))"
  exit 1
fi

echo "✓ Node.js $(node -v)"
echo "✓ pnpm $(pnpm -v)"

# Install dependencies
echo ""
echo "Installing dependencies..."
pnpm install

# Setup environment
echo ""
echo "Setting up environment files..."
if [ ! -f apps/api/.env ]; then
  cp apps/api/.env.example apps/api/.env 2>/dev/null || true
  echo "Created apps/api/.env"
fi

# Build shared packages
echo ""
echo "Building shared packages..."
pnpm build --filter=@hutanotrack/shared
pnpm build --filter=@hutanotrack/ui

echo ""
echo "========================================"
echo "  Setup complete!"
echo ""
echo "  Start development:"
echo "    pnpm dev"
echo ""
echo "  Or run individual apps:"
echo "    Web Dashboard:   pnpm dev --filter=@hutanotrack/web"
echo "    Family Portal:   pnpm dev --filter=@hutanotrack/family-portal"
echo "    Admin Portal:    pnpm dev --filter=@hutanotrack/admin"
echo "    API:             pnpm dev --filter=@hutanotrack/api"
echo "========================================"
