---
title: "How To Setup Husky, Lint Staged, And Commitizen On A Next.js Project"
description: "Coding is not just writing lines of code, we often end up do everything manually, so why not use some tools that help us achieve our goals? This article will show you how to setup Husky, Lint Staged, And Conventional Commit With Next.js"
publishedAt: "03/23/2022"
status: "published"
featured: false
author: rimzzlabs
keywords:
  - husky nextjs
  - husky lint staged
  - nextjs husky lint-staged
  - how to setup husky
  - how to setup husky lint staged
  - how to setup nextjs
  - husky lint staged commitizen
  - commitizen
  - commitizen nextjs
  - commitizen reactjs
  - conventional commit setup
  - husky setup
  - lint staged nextjs
  - lint staged reactjs
  - lint staged setup
  - nextjs reactjs
  - setup developer experience
  - setup developer experience nextjs
relatedPosts:
  - improving-performance-in-react
---

## Introduction

As a developer, we love to work with Git, a version control system that allows us to keep the code tracked and make sure we don't forget to commit our changes.

But there is a bit of a problem with Git, when we are working with multiple developers, we often have to merge our changes, and that's where merge conflicts come in, if the conflicts are happen because of our code, we would made change again, but there is some case where the conflicts are caused by just different code style, _single quote vs double quote for example_, aren't it a bit awkward?.

### Git Hooks

Like many other Version Control Systems, Git has a way to fire off custom scripts when certain important actions occur. There are two groups of these hooks: client-side and server-side.

Client-side hooks are triggered by operations such as committing and merging, while server-side hooks run on network operations such as receiving pushed commits. You can use these hooks for all sorts of reasons.

Let's say I have one project with 2 people in it, where we build features on different branches, and when I do commit there are actually type error accoured within the code, and I have no idea why, so the solution is I want to run linter before I commit my changes, and then I can fix the error before I made commit.

But doing it manually would be a pain, so I want to use a tool that can help me do it for me, so I can just run a script that will run linter before commit has made.

## Husky

What is [Husky](https://typicode.github.io/husky)?, from what I get, it said:

> Husky improves your commits and more 🐶 woof!

As I said before about Git Hooks, we can use these hooks to run custom scripts before certain actions occur, Husky made it more easier to use, and it's a good way to make your life easier.

### Features

Husky offer features to help you, it offer:

- Zero dependencies and lightweight (`6 kB`)
- Powered by modern new Git feature (`core.hooksPath`)
- Follows [npm](https://docs.npmjs.com/cli/v7/using-npm/scripts#best-practices) and [yarn](https://yarnpkg.com/advanced/lifecycle-scripts#a-note-about-postinstall) best practices regarding auto install
- User-friendly messages
- Optional install
- Like husky 4, supports
  - macOS, Linux and Windows
  - Git GUIs
  - Custom directories
  - Monorepos

## Lint Staged

[Lint Staged](https://github.com/okonet/lint-staged) will run linters against staged git files and don't let 💩 slip into your code base!, so when you execcute
this command for example, then some script would run

```bash showLineNumbers
$ git commit

✔ Preparing lint-staged...
❯ Running tasks for staged files...
  ❯ packages/frontend/.lintstagedrc.json — 1 file
    ↓ *.js — no files [SKIPPED]
    ❯ *.{json,md} — 1 file
      ⠹ prettier --write
  ↓ packages/backend/.lintstagedrc.json — 2 files
    ❯ *.js — 2 files
      ⠼ eslint --fix
    ↓ *.{json,md} — no files [SKIPPED]
◼ Applying modifications from tasks...
◼ Cleaning up temporary files...
```

> Linting makes more sense when run before committing your code. By doing so you can ensure no errors go into the repository and enforce code style. But running a lint process on a whole project is slow, and linting results can be irrelevant. Ultimately you only want to lint files that will be committed.

## Conventional Commit With Commitizen

Collaborating with other developer are quiet fun to do, but when you are working with a team, you need to make sure that your code is clean, and that you are following the rules of your team, some are more strict than others, so you need to make sure your commit message are clear and easy to understand.

That's why we need to use [Commitizen](https://commitizen-tools.github.io/commitizen/) to make sure that your commit message is clear by context and easy to understand by other developer.

Commitizen are very helpful when you want to make a commit, instead of writing your own message, it will prompt you to write your message based on the rules of your team, and based on context, such as `feat`, `fix`, and `chore`.

Here's what it looks like when you run `cz` instead of git commit, it would generate a prompt to help you choose your commit message:

![Commitizen](https://ik.imagekit.io/mlnzyx/attachment/commitizen_Qkfrd4tze.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648026254029 "Commitizen Prompt on terminal")

> Tip: click the image to see it more clearly

## Setup Next.js Project

Before we use any tools, we need to install Next.js and create a new project, simply execute the following command on your terminal:

```bash
yarn create next-app my-app
```

It will spin up a new Next.js project, as usual, you will get a default template created for you, and you can start editing your code there, but in this article I will not teach you how to edit your code, so let's skip that part, and start using the tools we want to use.

## Setup Eslint And Prettier

Before we continue, the method I'm trying to explain is also use 2 essential tools, which is [eslint](https://eslint.org/) and [prettier](https://prettier.io/).

Let's setup those tools then, we're going to install prettier and eslint then add the config file inside of our project, run the following command on your terminal to install prettier and eslint

```bash
yarn add prettier -D && npx eslint --init
```

The above command will install prettier as your devDependencies and then initialize eslint for your project, you would be asked to some choices, depends on which project you have, if you are using typescript, choose **typescript react**, otherwise javascript react.

Eslint will install dependencies for you and then created a config file, if it was `.json` file, consider renaming it to `.js` file and change the code to match to `.js` file instead of `.json`.

Next, create a file at the root of your project and name it with `.prettierrc.js`, and then paste the following config inside of it:

```js title=".prettierrc.js" showLineNumbers
const config = {
  semi: false,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: "none",
  arrowParens: "always",
  endOfLine: "auto",
};

module.exports = config;
```

> If you are familiar with it, just change the config file to match with your own preference

## Setup Husky

Next, let's install Husky as our Git Hooks, by executing the following command in the terminal:

```bash
yarn add husky -D
```

After installation completed, run the command to setup husky

```bash
husky install
```

It will create a new folder at the root of directory which is `/.husky`, open it and create a new file called `pre-commit` inside of `/.husky` directory, then the structure would be like this:

```bash
/.husky
/pre-commit
|- /_
|-|
  |- /.gitignore
  |- /husky.sh
```

Inside `pre-commit` file, paste this code:

```bash title=".husky/pre-commit" showLineNumbers
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🏗️👷 Styling your project before committing👷‍♂️🏗️'
echo 'please be patient, this may take a while...'

# Check ESLint Standards
yarn lint ||
(
    echo '🔨❌ Yoo, you have a problem in your code. Check linter 🔨❌
          Run yarn lint, add changes and try commit again.';
    false;
)

echo '🎉 No error found: committing this now.... ✨🚀🏄‍♂️🍻'

npx lint-staged
```

The above code simply will run on your terminal before commit is goint to made by Git, first we printed out 2 paragraphs, and then we run the `yarn lint` command, if the command wasn't successful, then It'll print out the _*🔨❌ Yoo, you have...*_ and immediately cancel the rest of the code as we run the `false` code.

If _*linting*_ was successfully and no error found, then it'll printed out the message and then it run the `npx lint-staged` script, which is going to format our code with prettier.

Create a new scripts inside `package.json` file, so it will run everytime the project started to install all the dependencies.

```json {5} title="./package.json" showLineNumbers
{
  "name": "app name",
  "version": "0.0.0",
  "scripts": {
    "postinstall": "husky install"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

## Setup Lint Staged

Next we need to install Lint Staged, and then we need to setup Lint Staged, so we can run lint before commit, and it's very easy to do, just execute the following command in the terminal to install lint staged:

```bash
yarn add lint-staged -D
```

After the installation, let's start create the configuration for lint-staged, lint staged give you different ways of configuring lint staged:

- `lint-staged` object in your `package.json`
- `.lintstagedrc` file in JSON or YML format, or you can be explicit with the file extension:
  - `.lintstagedrc.json`
  - `.lintstagedrc.yaml`
  - `.lintstagedrc.yml`

But this way I want to show you with lint-staged object in package.json, so let's start with that:

```json title="./package.json" {9-12}
{
  "name": "app name",
  "version": "0.0.0",
  "scripts": {
    "postinstall": "husky install"
  },
  "dependencies": {},
  "devDependencies": {},
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --config ./.prettierrc.js --write"
    ],
    "**/*.{css,scss,md,html,json}": [
      "prettier --config ./.prettierrc.js --write"
    ]
  }
}
```

## Setup Commitizen

Commitizen help organize commit message, usually when I want to make changes to my code, and start to track what was I did.

The easiest way to setup Commitizen is by using it's CLI, the first step is to make your repo **Commitizen friendly**, so let's install the commitizen CLI tools, you can install it globally or locally, but I prefer instaling it globally, so let's type the following command in the terminal:

```bash
yarn global add commitizen
```

if you are using npm, you could easly install it by typing the following command:

```bash
npm install commitizen -g
```

Next, initialize your project to use the cz-conventional-changelog adapter by typing:

```bash
commitizen init cz-conventional-changelog --save-dev --save-exact
```

Or if you are using Yarn:

```bash
commitizen init cz-conventional-changelog --yarn --dev --exact
```

The above command does three things for you:

- Installs the `cz-conventional-changelog adapter`
- Saves it to `package.json`'s dependencies or devDependencies
- Adds the config.commitizen key to the root of your package.json file as shown here:

```json {13-17} title="./package.json" showLineNumbers
{
  "name": "app name",
  "version": "0.0.0",
  "scripts": {
    "postinstall": "husky install"
  },
  "dependencies": {},
  "devDependencies": {},
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --config ./.prettierrc.js --write"
    ],
    "**/*.{css,scss,md,html,json}": [
      "prettier --config ./.prettierrc.js --write"
    ]
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

And now we are ready to use the `cz` command to make a commit, and it will prompt you to choose your commit message!.

## Summary:

We made it to the end, let's summarize what was done:

- **Husky**

  It will help us to setup Git Hooks easier.

- **Lint Staged**

  It will help us to run a certain task before commiting our code, and it will make sure that our code is clean and well formatted.

- **Commitizen**

  It will help us to organize our commit message, and it will make sure that our commit message is clear and easy to understand.

So that's all folks, I hope this article help you out to get started, see you next time!
