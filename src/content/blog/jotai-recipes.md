---
title: "Jotai Recipes I Commonly Use for My Project"
description: "To read and modify state on our application with Jotai, we need to use paradigm called Recipes, now lets see how we can utilize those terms to read and modify our state with Jotai"
publishedAt: "09/30/2023"
status: "published"
featured: true
author: rimzzlabs
keywords:
  - react
  - jotai
  - hooks
  - jotai recipes
  - reactjs
  - state management
  - state manager
relatedPosts:
  - jotai-state-manager
  - improving-performance-in-react
---

## Introduction

Jotai takes an atomic approach to global React state management. By combining atoms and renders are automatically optimized based on atom dependency.

This solves the extra re-render issue of React context, eliminates the need for memoization, and provides a similar developer experience to signals while maintaining a **_declarative programming model_**.

> If you don't know about Jotai, I have a [blog post about jotai](/blog/jotai-state-manager) explained you can read, feel free to check it out!

To update a state with Jotai, I can simply use built-in Jotai `setter` like so:

```tsx showLineNumbers title="app.tsx"
import { atom, useAtom } from "jotai";

const atomFruit = atom("mango");

export default function App() {
  const [fruit, setFruit] = useAtom(atomFruit);

  return <button onClick={() => setFruit("orange")}>{fruit}</button>;
}
```

Just a basic usage with Jotai, pretty simple.

## Derived Value

Before coming to know what _recipes_ are in Jotai, we first should know about a derived or computed value.

A derived or computed value is a value obtained from other existing value through some logic, transformation, or calculation.

In programming, a derived or computed values are often used to simplify code, it used to encapsulate logic, and make data manipulation based on existing value to be more convenient.

```tsx title="App.tsx" showLineNumbers
export default function App() {
  const { user } = useUser();
  const isUserAdmin = user.role === "admin";

  if (isUserAdmin) {
    return <p>You are admin</p>;
  }

  return <p>Just a normal user</p>;
}
```

In the above example we check wether the user is admin or not, if it's admin, the component simply render **"You are admin"**, otherwise it render **"Just a normal user"**.

The condition to render different UI to the client is by using a derived value `isUserAdmin`.

Oh wow! we already use a `derived` value here.

## Derived Atoms

Let's move on to derived atoms. Derived atoms are just same as the previous one, we just need to see what the previous values are, and then make some magic to process with the current logic or calculation.

```ts title="@/atoms.ts" showLineNumbers
import { atom } from "jotai";

type TUserRole = "admin" | "user";
type TUser = {
  name: string;
  role: Role;
};

const userAtom = atom<TUser>({ name: "Rizki", role: "user" });

const isUserAdminAtom = atom((get) => get(userAtom).role === "admin");
```

The above example shows how to create a derived value from the previous atom, very similiar from what we wrote before with `React.useState`.

In Jotai, It's called recipes, we can compose atoms to another atoms, or create an atoms based on the previous atoms to make a new value or atom.

Jotai allows to create these derived values using a declarative approach and without needing to explicitly manage complex state relationships.

## Recipes

Recipes are just derived atoms, a derived atoms usually consist of two principle.

A `read-only` atom takes another atom as input and transforms its value through a calculation performed by a function. This changed value can be used to indicate a computation or modification of the value of the original atom as a derived value.

A `write-only` atoms serve the purpose of accepting new values through writing mechanisms, like `callbacks`. These new values can then be used to trigger specific actions or update an atom in your `write-only` atom.

Now you know about these terms, let's create some recipes.

### 0. Compose Recipes

Composing atoms is a way to transform atoms with multiple function calls; the returned value should be predictable and have no side effects.

```ts title="@/atoms/compose.ts" showLineNumbers
import type { PrimitiveAtom } from "jotai";

type ComposeAtomFn<T> = (value: PrimitiveAtom<T>) => PrimitiveAtom<T>;

export function composePrimitiveAtom<T>(...fns: Array<ComposeAtomFn<T>>) {
  return (value: PrimitiveAtom<T>) => {
    return fns.reduce((currentValue, fun) => fun(currentValue), value);
  };
}
```

### 1. Boolean Recipes

Switch! Who doesn't need boolean? Everyone needs boolean value, so let's create boolean recipes.

First, we usually manage a boolean value with React. useState to handle an open or closed state, such as a sidebar or dialog. But what if it can be well-baked with Jotai?.

```ts title="@/atoms/boolean.ts" showLineNumbers
import type { PrimitiveAtom } from "jotai";

export function openAtom(boolAtom: PrimitiveAtom<boolean>) {
  return atom(null, (_, set) => set(boolAtom, true));
}

export function closeAtom(boolAtom: PrimitiveAtom<boolean>) {
  return atom(null, (_, set) => set(boolAtom, false));
}

export function toggleAtom(boolAtom: PrimitiveAtom<boolean>) {
  return atom(null, (get, set) => set(boolAtom, !get(boolAtom)));
}
```

With that snippet, we can create each handler to manage our `open/closed` state.

```ts title="@/atoms/sidebar.ts" showLineNumbers
import { openAtom, closeAtom, toggleAtom } from "@/atoms/boolean";

import { atom } from "jotai";

export const sidebarAtom = atom(false);
export const openSidebarAtom = openAtom(sidebarAtom);
export const closeSidebarAtom = closeAtom(sidebarAtom);
export const toggleSidebarAtom = toggleAtom(sidebarAtom);
```

Now let me explain about those codes: `openSidebarAtom`, `closeSidebarAtom`, and `toggleSidebarAtom` are actually a `write-only` atoms, meaning it's actually handlers to mutate our `sidebarAtom`, in Jotai style.

Now let's see how we can use those fancy atoms.

On our sidebar component, this sidebar can observe the `sidebarAtom` value and render the UI accordingly. But it can also close the sidebar itself.

```tsx title="@/components/sidebar.tsx" showLineNumbers
import { sidebarAtom, closeSidebarAtom } from "@/atoms/sidebar";

import { Drawer } from "@mantine/core";
import { useAtomValue, useSetAtom } from "jotai";

export function Sidebar() {
  const isSidebarOpen = useAtomValue(sidebarAtom);
  const closeSidebar = useSetAtom(closeSidebarAtom);

  return <Drawer opened={isSidebarOpen} onClose={closeSidebar} />;
}
```

Then, on our button component that triggers the `open/closed` state of the sidebar, the button may be placed on our `<Header />` component.

```tsx title="@/components/header.tsx" showLineNumbers
import { openSidebarAtom } from "@/atoms/sidebar";

import { useSetAtom } from "jotai";
import { MenuIcon } from "lucide-react";

export function Header() {
  const openSidebar = useSetAtom(openSidebarAtom);
  return (
    <header>
      // other content might be here
      <button onClick={openSidebar}>
        <MenuIcon />
      </button>
    </header>
  );
}
```

### 2. String Recipes

A string recipes usually a `read-only` atoms. Where you take a string atom to be transformed into a new string value.

This is very helpful whenever I work with string values, for example, lowercase string, [encoding strings to URI components](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent "Encoding URI Component"), and so on.

```ts title="@/atoms/string.ts" showLineNumbers
import type { PrimitiveAtom } from "jotai";

export function upperCaseAtom(stringAtom: PrimitiveAtom<string>) {
  return atom((get) => get(stringAtom).toUpperCase());
}

export function lowerCaseAtom(stringAtom: PrimitiveAtom<string>) {
  return atom((get) => get(stringAtom).toUpperCase());
}
```

Encoding a string to URI components.

```ts title="@/atoms/string.ts" showLineNumbers
import type { PrimitiveAtom } from "jotai";

export function encodeURIAtom(stringAtom: PrimitiveAtom<string>) {
  return atom((get) => encodeURIComponent(get(stringAtom)));
}
```

### 3. Number Recipes

Manipulating numbers with atoms is such ease. First, let's start with basic math.

```ts title="@/atoms/number.ts" showLineNumbers
import type { PrimitiveAtom } from "jotai";

export function addAtom(numberAtom: PrimitiveAtom<number>) {
  return atom((get) => get(numberAtom) + 1);
}
export function multiplyAtom(numberAtom: PrimitiveAtom<number>) {
  return atom((get) => get(numberAtom) * 2);
}
export function divideAtom(numberAtom: PrimitiveAtom<number>) {
  return atom((get) => get(numberAtom) / 2);
}
export function minusAtom(numberAtom: PrimitiveAtom<number>) {
  return atom((get) => get(numberAtom) - 1);
}
```

Then the cool thing here is that I can transform a number value into a well-formatted value, like formatting numbers into a currency.

```ts title="@/atoms/number.ts" showLineNumbers
import type { PrimitiveAtom } from "jotai";

export function formatNumberAtom(numberAtom: PrimitiveAtom<number>) {
  return atom((get) => {
    const fmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return fmt.format(get(numberAtom));
  });
}
```

### 4. Array Recipes

Let's start with basic array recipes. We have an array containing a list of objects, and the array should be filtered based on user input.

```ts title="@/atoms/array.ts" showLineNumbers
import { atom } from "jotai";

export const inputAtom = atom("");
export const clearInputAtom = composeAtom(
  lowerCaseAtom,
  noSpaceStringAtom,
)(inputAtom);
export const foodsAtom = atom([]);
export const filteredFoodsAtom = atom((get) => {
  const search = get(clearInputAtom);
  const foods = get(foodsAtom);

  if (search === "") return foods;
  return foods.filter((food) => {
    return food.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(search.toLowerCase().replace(/\s+/g, ""));
  });
});
```

That being said, the `filteredFoodsAtom` will filter out the `foodsAtom` based on the `inputAtom` value the user provided.

Wait, I can actually create a `pure function` to clear the string.

```ts title="@/util/clearstring"
export const clearString = (s: string) => s.toLowerCase().replace(/\s+/g, "");
```

Now, let's refactor our `filteredFoodsAtom`.

```ts {12-16} title="@/atoms.ts" showLineNumbers
import { clearString } from "@/utils/clearString";

import { atom } from "jotai";

export const inputAtom = atom("");
export const foodsAtom = atom([]);
export const filteredFoodsAtom = atom((get) => {
  const search = get(inputAtom);
  const foods = get(foodsAtom);

  if (search === "") return foods;
  return foods.filter((food) => {
    const clearSearch = clearString(search);
    const clearName = clearString(food.name);
    return clearName.includes(clearSearch);
  });
});
```

Another example is to sort an array; array recipes in Jotai are just like a regular declarative way to mutate your data.

Sorting an array of atoms is easy; just like in the previous example, we just need to sort it out.

```ts title="@/atoms.ts" showLineNumbers
import { compareDesc } from "date-fns";
import { atom } from "jotai";

export const postAtoms = atom([]);

export const latestPostAtoms = atom((get) => {
  const posts = get(postAtoms);

  return posts.slice(0).sort((a, b) => compareDesc(a, b));
});
```

I think that's all I can think of; I probably have used more than those recipes, but I can't remember them. Maybe in another post, thank you for reading this post!
