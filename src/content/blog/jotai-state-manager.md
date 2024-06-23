---
title: "Jotai, a beautiful state manager for React dev"
description: "When talked about state manager, the first word you could think would probably Redux, but for now let's use another state manager library, introducing Jotai."
publishedAt: "07/08/2022"
status: "published"
featured: true
author: rimzzlabs
keywords:
  - react
  - hooks
  - jotai hooks
  - state mangement
  - react state management
  - jotai
  - jotai state manager
  - jotai react
  - jotai state
  - state
  - primitive state
  - primitive state management
relatedPosts:
  - jotai-recipes
---

## Introduction

Jotai is an awesome state manager for React, **No extra re-renders**, state resides within React, and you get the full benefits from suspense and concurrent features. It's scalable from a simple `React.useState` replacement to a large-scale application with complex requirements.

> Jotai takes a bottom-up approach to React state management with an atomic model inspired by Recoil. One can build state by combining atoms and renders are optimized based on atom dependency. This solves the extra re-render issue of React context and eliminates the need for the memoization technique.

A long time ago, I started to learn Frontend Web Development, and there is so much I could learn about, one of the most important topic in Frontend development is state management.

## Using Jotai

In React, I can declare a state by using `useState`.

```tsx
const [count, setCount] = useState(0);
```

But the problem here is that when my app is getting bigger, I need to pass the state to the component props, otherwise using `React context` might be helpful.

But React context is not an _awesome_ solution for me, I need to wrap my components inside it's provider, which you may already know about **Provider Hell**, React context also make a re-render to my component everytime a state has changed.

Jotai on the other side is like a useState, I don't need to wrap my app with Provider, and it is also using atomic appproach, which is I've been using this approach lately _(components, style, services, etc.)_.

### Declaring State in Store file

In Jotai, I can declare my app's state with atom.

```ts title="@/store/atom.ts" showLineNumbers
import { atom } from "jotai";

type User = {
  username: string;
  gender: "male" | "female";
  website: string;
};

export const userAtom = atom<User | null>(null);
```

And then I can use the state on my component.

```tsx showLineNumbers
import { userAtom } from "@/store/atom";

import { useAtom } from "jotai";

const [user, setUser] = useAtom(userAtom);
```

The user variable is containing user's data, otherwise `null` if there is no user logged in, so what's the `setUser` do?. Well setUser is just like `setState` in React, it's a function to modify it's state.

Just like React setState, setUser can accept a function or a new state. I can replace the state with a new state, like this.

```tsx showLineNumbers
import { userAtom } from "@/store/atom";

import { useAtom } from "jotai";

const [user, setUser] = useAtom(userAtom);

// replace with newer state
const updateUser = () =>
  setUser({ name: "Foo", gender: "male", website: "foo.com" });
```

Or maybe I just want to modify a certain properties. On this context, I've previously declared a **type User** which is an object containing property **name**, **gender** and **website**.

```tsx showLineNumbers
import { userAtom } from "@/store/atom";

import { useAtom } from "jotai";

const [user, setUser] = useAtom(userAtom);

// modify only name property
const updateUser = () =>
  setUser((prevState) => ({ ...prevState, name: "FooBizz" }));
```

On `updateUser` function, I modify the name property with **FooBizz**, that's the basic usage with Jotai.

See? it's just like a regular useState, and also I can use the User state in another component, cool, right?😎.

### Persistent State

Sometimes when I refreshed my browser, my app's state is also got refreshed, but I want to keep my state, the solution here is persistent state.

Jotai comes with battery-packed utilities, for example `atomWithStorage` not only holds my state but also saved my state on localStorage, this is called a persistent state because I can save my state on localStorage, when I modify my state, it will also update my state on the localStorage.

This is very useful for a state that need to be hold on localStorage like **Theme**.

```tsx {2,9,13-14} title="@/store/atom.ts" showLineNumbers
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type User = {
  username: string;
  gender: "male" | "female";
  website: string;
};
type Theme = "dark" | "light";

export const userAtom = atom<User | null>(null);

// atomWithStorage(localStorage key, initial value)
export const themeAtom = atomWithStorage<Theme>("theme", "light");
```

I'm exporting a new atom state with `atomWithStorage()` utility. This function accept 3 arguments, the first two is required, the last one is optional, the first argument is the localStorage key, and the second argument is the initial value set to it's state.

But how can I use this state? well again, I can read and modify the state just like regular useState.

```tsx showLineNumbers
import { themeAtom } from "@/store/atom";

import { useAtom } from "jotai";

const [theme, setTheme] = useAtom(themeAtom);
```

## Comparison to Another Library

Let's compare Jotai to another library, this comparison is based on Jotai official website.

### Jotai vs Zustand

Jotai is like Recoil. while [Zustand](https://github.com/pmndrs/zustand "Zustand Repository") is like Redux.

The major difference is the state model. Zustand is a single store (although you could create multiple separate stores), while Jotai consists of primitive atoms and allows composing them together. In this sense, it's the matter of programming mental model.

Jotai can be a replacement for useState+useContext. Instead of creating multiple contexts, atoms share one big context.

Zustand is an external store and the hook is to connect the external world to the React world.

#### When to Switch

- If you need a replacement for useState+useContext, Jotai fits well.
- If you want to update state outside React, Zustand works better.
- If code splitting is important, Jotai should perform well.
- If you prefer Redux devtools, Zustand is good to go.
- If you want to make use of Suspense, Jotai is the one.

### How is Jotai Different from Recoil?

#### Developer

- Jotai is developed with collective work by a few developers in Poimandres (formerly react-spring) org.
- Recoil is developed by a team at Facebook.

#### Basis

- Jotai is focusing on primitive APIs for easy learning, and it's unopinionated. (The same philosophy with Zustand)
- Recoil is full featured for big apps with complex requirements.

#### Techincal Difference

- Jotai depends on atom object referential identities.
- Recoil depends on atom string keys.

#### When to Use Which

- If you want to learn something new, either should work.
- If you like Zustand, Jotai would also be pleasant.
- If your app heavily requires state serialization (storing state in storage, server, or URL), Recoil comes with good features.
- If you need React Context alternatives, Jotai comes with enough features.
- If you would try to create a new library, Jotai might give good primitives.
- Otherwise, both are pretty similar about the general goals and basic techniques.

## Using it with React

I can store my app's state on every component, but I can also create a store on a separated file, I prefer create a new file inside store folder, for example.

```tsx title="@/store/atom.ts" showLineNumbers
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Theme = "light" | "dark";
type User = {
  name: string;
  gender: "male" | "female";
  website: string;
};

export const userAtom = atom<User | null>(null);

export const themeAtom = atomWithStorage<Theme>("theme", "light");
```

### Read and Modify State

I could read and modify the state on every component like this.

```tsx title="@/components/DarkModeToggle.tsx" showLineNumbers
import * as atoms from "@/store/atom";

import { useAtom } from "atom";

export default function DarkModeToggle() {
  const [theme, setTheme] = useAtom(atoms.themeAtom);

  const toggleTheme = setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return <button onClick={toggleTheme}>Current theme is {theme}</button>;
}
```

But I prefer to create a custom hooks instead, for example, to manage my theme state, I could create a custom hooks to switch between dark mode and light mode.

```tsx title="@/hooks/useDarkMode.ts" showLineNumbers
import * as atoms from "@/store";

import { useAtom } from "jotai";
import { useEffect } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useAtom(atoms.themeAtom);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return { theme, toggleTheme };
};

export default useDarkMode;
```

And then I could refactor the above component which is **DarkModeToggle** to be like this:

```tsx {4,6} title="@/components/DarkModeToggle.tsx" showLineNumbers
import useDarkMode from "@/hooks/useDarkMode";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useDarkMode();

  return <button onClick={toggleTheme}>Current theme is {theme}</button>;
}
```

See, very simple right? oh and you could read the complete documentation of Jotai [Here](https://jotai.org "Jotai official website").

The core concept and API reference are very easy to learn, also checkout this [free course's](https://egghead.io/courses/manage-application-state-with-jotai-atoms-2c3a29f0 "Jotai free course") Jotai provided.

So that's it folks, thank you so much for reading my blog and I hope you gain more insight about Jotai after reading this blog, see you next time👋.
