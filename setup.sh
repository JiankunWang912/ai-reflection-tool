#!/usr/bin/env bash
# Sets up the si840-expo conda environment and installs npm dependencies.
# Run once before using the app for the first time.
set -e

CONDA_BASE=$(conda info --base 2>/dev/null)
if [ -z "$CONDA_BASE" ]; then
  echo "ERROR: conda not found. Install Miniconda or Anaconda first."
  exit 1
fi

source "${CONDA_BASE}/etc/profile.d/conda.sh"

echo "=== Creating conda environment si840-expo with Node.js 24 ==="
conda create -n si840-expo nodejs=24 -y

echo "=== Activating si840-expo ==="
conda activate si840-expo

echo "=== Installing npm dependencies ==="
cd "$(dirname "$0")"
npm install

echo "=== Installing web preview dependencies ==="
npx expo install react-dom react-native-web

echo ""
echo "Setup complete."
echo ""
echo "To run the app:"
echo "  conda activate si840-expo"
echo "  cd $(pwd)"
echo "  npx expo start"
echo ""
echo "For web preview:"
echo "  npx expo start --web"
