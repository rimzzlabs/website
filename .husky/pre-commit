#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🏗️👷 Styling your project before committing...'

# Check ESLint Standards
yarn lint ||
(
    echo '🔨❌ Yoo, you have a problem in your code. Check linter 🔨❌
          Run yarn lint, add changes and try commit again.';
    false;
)

echo '🎉 No error found: committing this now.... ✨🚀🏄‍♂️🍻'

npx lint-staged