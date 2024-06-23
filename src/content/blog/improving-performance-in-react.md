---
title: "Improving Performance in React with These 3 Techniques"
description: "A slow or unresponsive app can frustrate users and lead to a poor user experience. In today's competitive market, it's more important than ever to ensure that your app is delivering the best possible experience to your users."
publishedAt: "12/25/2022"
status: "published"
featured: false
author: rimzzlabs
keywords:
  - improve performance
  - react
  - react.js
  - performance
  - code-splitting
  - react app
  - lazy
  - loading
  - lazy loading
  - react performance
  - code splitting react app
  - vitejs
  - memoization
  - usememo
  - usecallback
  - React.memo
  - React.useCallback
  - React.useMemo
  - memoization in react
  - improving performance in react app
relatedPosts:
  - how-to-setup-husky-nextjs
  - jotai-state-manager
---

## Introduction

> Long read, take a nice seat and enjoy 🍻.

React.js is a popular JavaScript library for building user interfaces, known for its flexibility and performance. With React.js, you can create reusable components that make it easy to build and maintain complex applications.

> Hi there! I wanted to recommend that you can try out the live code examples while reading this blog post. Go ahead and continue on with the post! Cheers ✌️.

It was created by Facebook and has since become one of the most popular choices for front-end development, thanks to its ability to handle complex and dynamic applications with ease.

In a React.js app, components are the building blocks that make up the user interface. They can be composed together to create a hierarchical tree of components, with the root component representing the entire app.

When a component's state or props _(short for properties)_ change, React.js efficiently updates the DOM to reflect these changes. This helps to make React.js apps fast and responsive, even when dealing with large amounts of data.

However, as the complexity and scale of a React.js app grow, developers need to take steps to optimize its performance. This might include techniques like `**code-splitting**, which helps to reduce the size of the initial bundle that is loaded by the browser and **memoization**, which helps to improve the efficiency of function calls by caching their results.

In this blog post, we'll be covering things like **code-splitting**, memoization with `React.memo`, `React.useMemo`, and `React.useCallback`. Whether you're new to React.js or an experienced developer looking to take your app's performance to the next level, this post might suit ya.

## Why should I care about performance?

When it comes to building web applications, performance is critical. A slow or unresponsive app can frustrate users and lead to a poor **user experience**. In today's competitive market, it's more important than ever to ensure that your app is delivering the best possible experience to your users.

But performance _isn't just about user satisfaction_. It can also have a direct impact on your business. For example, if your app takes too long to load, users may abandon it before it even has a chance to show them what it can do. This can lead to lost customers and revenue. On the other hand, a fast and responsive app can help to keep users engaged and more likely to return.

Performance is still an important consideration for any web application. Here are just a few reasons why you should care about the performance of your React.js app:

- **User Experience:** A slow or unresponsive app can be frustrating for users, which can lead to them abandoning the app altogether. On the other hand, a fast and smooth app can improve the user's overall experience and keep them coming back for more.

- **SEO:** In today's digital landscape, your website or app needs to rank well in search engine results. One factor that can affect your ranking is the loading speed of your site. If your React.js app is slow to load, it could hurt your search engine ranking and make it harder for users to find your app.

- **Conversion Rates:** A slow app can also impact your business's bottom line. Studies have shown that faster loading times can lead to higher conversion rates, meaning more users taking the desired action (such as making a purchase).

- **Scalability:** As your React.js app grows in complexity and scale, it's important to ensure that it can handle the increased load. Optimizing the performance of your app can help to ensure that it remains stable and scalable as it grows.

In short, optimizing the performance of your React.js app is important for both user satisfaction and the success of your business. In the following sections, we'll be exploring advanced techniques for doing just that.

## Code-Splitting

Code-splitting is a technique that allows developers to split their code into smaller, more manageable chunks or bundles. These bundles can then be loaded on demand, rather than all at once when the app first loads.

This can help to improve the performance of a React.js app by reducing the size of the initial bundle that the browser has to download, which can make the app load faster.

Code-splitting is particularly useful for larger, more complex apps that have a lot of code, as it allows developers to break the code up into smaller pieces that can be loaded as needed. This can help to reduce the overall size of the app, which can improve its performance and make it easier to maintain.

There are several ways to implement code-splitting in a React.js app, such as using the `React.lazy` and `React.Suspense` components, or using a tool like [Vite.js](https://vitejs.dev).

### Using React.lazy and React.Suspense

To implement code splitting in your React application, you can use `React.lazy` and `React.suspense`.

`React.lazy` allows you to dynamically import a component so that it is only loaded when it is needed. This is done using the `import()` function, which returns a promise that resolves to the module that you are importing.

`React.suspense` is a higher-order component that you can use to wrap a dynamic import in a `<Suspense>` component. This will display a fallback component while the code for the dynamically imported component is being loaded.

Here's an example of how you might use `React.lazy` and `React.Suspense` in your application:

```tsx title="App.tsx" showLineNumbers
import { Suspense, lazy } from "react";

const MyComponent = lazy(() => import("./MyComponent"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
```

In this example, the `MyComponent` component will not be loaded until it is needed, and the fallback component will be displayed while the code for `MyComponent` is being loaded. This can help improve the performance of your application by only loading the code that is needed.

### Using Vite.js

> To Read more about Vite.js, please [follow this link about Vite.js](https://vitejs.dev/guide)

In addition to using `React.lazy` and `React.suspense`, another way to implement code splitting in your React application is by using a tool called Vite.js as your frontend tooling.

Vite.js is a lightweight, simple, and fast-build tool that is designed specifically for modern JavaScript applications. It uses Rollup under the hood, which means that you can use all of the same code-splitting techniques that you would use with Rollup in your Vite.js projects.

One of the benefits of using Vite.js for code splitting is that it allows you to easily split your code into different chunks, including splitting vendors' code from your code. This can help improve the performance of your application by only loading the code that is needed at a given moment, rather than loading everything up upfront.

Let's split vendors' code from our code, take a look at this code:

```ts title="vite.config.ts" showLineNumbers
import { dependencies } from "./package.json";

const exclVendors = ["react", "react-router-dom", "react-dom"];
function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (exclVendors.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
```

In this code, the `renderChunks` function is being used to create an object with keys for each dependency, and values that include the dependency name. This allows you to create a chunk for each dependency, which can then be code split.

You may have noticed that in the code provided, there is an array of excluded vendors. This array is used to specify which dependencies should not be included in the code-splitting process.

In this case, the array includes `react`, `react-router-dom`, and `react-dom`, which are core dependencies of React that are not included in the code-splitting process. This is because these dependencies are likely to be used throughout your application, and it may not be beneficial to split them into separate chunks.

However, the rest of the dependencies are added to the `rollupOptions` object, which is used to configure the code-splitting process. These dependencies will be split into separate chunks and loaded on demand, rather than all at once. This can help improve the performance of your application by only loading the code that is needed at a given moment.

Overall, by excluding certain dependencies from the code splitting process and adding the rest to the `rollupOptions` object, you can effectively set up code splitting in your Vite.js project and improve the performance of your React.js application.

### When Should I Split Code with React.Lazy?

What types of components should I use `React.lazy` with, and what types of components should I not lazy load?

There are a few types of components that are good candidates for code-splitting with `React.lazy`. For example, if I have a feature that's only used on one page of my application, I might consider code-splitting that feature into a separate chunk that only gets loaded when the user navigates to that page.

Here are some types of components that are good candidates for code-splitting with `React.lazy`:

- Components that are only needed in specific routes or areas of the application. For example, if you have a feature that is only used on one page of your application, you might consider code-splitting that feature into a separate chunk that is only loaded when the user navigates to that page.
- Components that are large or complex, and may take a long time to load. Splitting these components into smaller chunks can help reduce the initial load time of your application.
- Components that are used infrequently or by a small number of users. In these cases, code-splitting can help reduce the overall size of your application and improve its performance for the majority of users.

On the other hand, some types of components may not be good candidates for code-splitting with `React.lazy`:

- Components that are needed immediately on initial load. If a component is critical to the initial rendering of your application, it may not be a good candidate for code-splitting, as the user would have to wait for it to be loaded before the application can be used.
- Components that are small and simple, and may not provide significant performance benefits when code-split. In these cases, it may be more efficient to leave the component in the main bundle and avoid the overhead of dynamically importing it.

In general, it's a good idea to carefully evaluate the trade-offs of code-splitting when deciding which components to split. Code-splitting can be a powerful tool for improving the performance of a React application, but it's important to carefully consider the specific needs of your application before implementing it.

## Memoization

So, memoization is a technique that helps speed up your app by storing the results of expensive function calls and returning them when the same inputs come up again. This can be especially useful for functions that get called a lot with the same arguments since it saves time by not having to recalculate the result every time.

In the case of React, memoization can be used to make functional components run more efficiently. By default, React will re-render a functional component whenever the component's props or state changes. This can be a problem if the component gets called a lot with the same props since it will cause unnecessary re-renders. Memoization can help solve this issue by "memoizing" the component and only re-rendering it if the props have changed.

There are a few different ways you can use memoization in a React app. One option is to use the `React.useMemo` hook, which is a built-in React feature that lets you memoize a value. And then there is `React.useCallback` hook, which is a built-in React feature, but this hook will memoize a function instead of a value. Last but not least, there is `React.memo` which is a also built-in React feature, but the difference here is not a function but a _Higher Order Components_ that let you memoize a component.

### Why Memoization?

Memoization is like caching on your React.js app, here are a few reasons why memoization can be important in a React.js app:

- **Improved performance**: As mentioned earlier, memoization can help improve the performance of your app by avoiding unnecessary re-renders of functional components. This can be especially useful for components that are called frequently with the same props, as it can save a lot of time and resources by avoiding the need to recalculate the component's result.

- **Improved user experience**: By optimizing the performance of your app, you can improve the overall user experience. Faster loading times and smoother transitions between screens can make your app feel more responsive and enjoyable to use.

- **Reduced complexity**: Memoization can also help reduce the complexity of your code by allowing you to write simpler, more declarative components. Without memoization, you might have to write more complex logic to avoid unnecessary re-renders, which can make your code harder to understand and maintain.

### React.useMemo

The useMemo hook is a built-in React hook that allows you to memoize a value. It takes a function as an argument and **returns a memoized version** of the value returned by that function.

The memoized value is **only recomputed if one of the dependencies listed in the second argument to the hook has changed**. This can be useful for optimizing the performance of functional components by avoiding unnecessary recalculations of expensive values.

Take a look at this basic syntax for the `React.useMemo` hook:

```tsx
const value = useMemo(() => computedExpensiveValue(buzz, fizz), [buzz, fizz]);
```

In this example, the `computedExpensiveValue` function is called with arguments `buzz` and `fizz`, and **the result is memoized**. The memoized value **will only be recomputed if the values of `buzz` or `fizz` change**.

Another example to use `React.useMemo` is for filtering and sorting large data sets: Let's say you have a list of products that you want to display in a component, and you want to allow the user to filter and sort the list based on various criteria. You could use the `useMemo` hook to memoize the filtered and sorted version of the list, like so:

```tsx title="@/components/product-list.tsx" showLineNumbers
import { useMemo } from "react";

export const ProductList = ({ products, filter, sortBy }) => {
  // Memoize the filtered and sorted version of the product list
  const filteredAndSortedProducts = useMemo(() => {
    // Filter the products based on the filter criteria
    let filteredProducts = products;
    if (filter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.includes(filter),
      );
    }
    // Sort the products based on the sortBy criteria
    return filteredProducts.sort((a, b) => a[sortBy] > b[sortBy]);
  }, [products, filter, sortBy]);

  return (
    <ul>
      {filteredAndSortedProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};
```

In this example, the `ProductList` component filters and sorts the products list based on the filter and `sortBy` props, and stores the result in a memoized value. This can help to improve the performance of the component by **avoiding unnecessary recalculations** of the filtered and sorted list every time the component re-renders.

### When Should I NOT use React.useMemo?

`React.useMemo` is a hook that allows you to optimize the performance of your functional components by memoizing values that are expensive to compute. But there are a few situations where it might not be the best choice:

- If the value you're computing is _super simple_ or _cheap to compute_, then it might not be worth the extra overhead of using `React.useMemo`. In these cases, the performance boost might not be worth the extra code.

- If the value you're computing is only used once or a few times in the component, then it might not be worth the extra overhead of using `React.useMemo`. In these cases, the performance boost might not be significant enough to justify the extra code.

- If the value you're computing depends on props that change very frequently, then `React.useMemo` might not be able to keep up with the changes and you could end up with stale data. In these cases, you might want to consider using a different optimization technique, like `React.useEffect` or `React.useReducer`, to **avoid unnecessary re-computations**.

`React.useMemo` is a good way to improve your React app performance, but if the value you're computing is super simple or cheap to compute, if it's only used a few times in the component, or if it depends on frequent changing props. But in most other cases, `React.useMemo` can be a really useful way to optimize the performance of your functional components.

## React.useCallback

The `useCallback` hook is a built-in React hook that allows you to create a memoized version of a callback function. It takes a function as an argument and an array of dependencies and **returns a memoized version of the function that only changes if one of the dependencies has changed**.

This can be useful for optimizing the performance of functional components **by avoiding unnecessary re-creations** of callback functions.

Take a look at this basic syntax of the `useCallback` hook:

```tsx showLineNumbers
const callback = useCallback(() => {
  doSomething(longitude, latitude);
}, [longitude, latitude]);
```

In this example, the callback function is created using the `useCallback` hook, and it will **only be re-created if the values of `longitude` or `latitude` change**.

Another example to use `React.useCallback` is by passing callbacks to deeply nested components. If you have a complex component hierarchy and you want to pass a callback function down to a child component, you can use the `useCallback` hook to avoid unnecessary re-creations of the callback function. This can help improve the performance of your app by avoiding unnecessary re-renders of the child component.

Let's say you have a parent component that renders a list of items, and each item has a delete button that calls a delete callback when clicked. You could use the `useCallback` hook to create a memoized version of the delete callback and pass it down to the child component like this:

```tsx title="@/components/parent-component.tsx" showLineNumbers
import { useCallback } from "react";

const ParentComponent = ({ items, onDelete }) => {
  // Create a memoized version of the onDelete callback
  const handleDelete = useCallback(
    (itemId) => {
      onDelete(itemId);
    },
    [onDelete],
  );

  return (
    <ul>
      {items.map((item) => (
        <ChildComponent key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </ul>
  );
};
```

In this example, the `ParentComponent` function component renders a list of ChildComponent components and passes each component a callback function for deleting items. The `useCallback` hook is used to create a memoized version of the callback function, which helps improve the performance of the `ParentComponent` component by **avoiding unnecessary re-creations of the function**. The `ChildComponent` components can then use the callback function to delete the corresponding item when the delete button is clicked.

### When Should I NOT use React.useCallback?

There are a few situations where it might not be the best choice to use this hook, here are a few reasons why:

- If the callback function is super simple or cheap to create, then it probably doesn't make sense to use `React.useCallback`. The extra overhead might not be worth it in these cases.

- If the callback function is only used a few times in the component, then it might not be worth using `React.useCallback`. The performance boost might not be significant enough in these cases.

- If the callback function depends on props that change very frequently, then `React.useCallback` might not be able to keep up with the changes and you could end up with a stale function. In these cases, you might want to consider using a different optimization technique.

## React.memo

`React.memo` is a way to optimize the performance of functional components in React by **preventing them from re-rendering unnecessarily**. It does this by **"memoizing"** the component, which means that it only re-renders the component if the props have actually changed.

Here's an example of how you might use `React.memo`:

```tsx title="@/components/my-component.tsx" showLineNumbers
import { memo } from "react";

const MyComponent = ({ name }) => {
  console.log("Render MyComponent");
  return <div>Hello, {name}!</div>;
};

export default memo(MyComponent);
```

In this example, the `MyComponent` component renders a greeting with the name prop. By wrapping the component with `React.memo`, you can tell React to only re-render the component if the name prop has hanged. This can help improve the performance of your app by avoiding unnecessary re-renders of the component.

You can use `React.memo` to optimize the performance of any functional component that doesn't need to re-render every time its props change. It's a simple and effective way to improve the performance of your React app.

### When Should I NOT Use React.memo?

Basically, `React.memo` is a way to optimize the performance of functional components by **avoiding unnecessary re-renders**. But there are a few situations where it might not be the best choice:

- If the component does not have any expensive calculations or props _(e.g. large `objects` or `arrays`)_, then there may not be much of a performance benefit to using `React.memo`. In these cases, the overhead of using `React.memo` might be slower than just re-rendering the component.

- If the component has a lot of states or props, then using `React.memo` might actually make the component slower, as the HOC has to compare all of the states and props on every update. In these cases, it might be more efficient to use the `React.useMemo` hook or the `React.useReducer` hook to optimize the component's performance.

- If the component updates very frequently _(e.g. on every tick of a timer)_, then using `React.memo` might not be efficient, as the _HOC_ has to compare the previous and current props on every update. In these cases, it might be more efficient to use a class component or the `React.useReducer` hook to optimize the component's performance.

I hope this helps give you a sense of when you might or might not want to use `React.memo` to optimize the performance.

## Closing

We've looked at several techniques for optimizing the performance of a React.js app, including memoization, code-splitting, and more. By using these techniques, you can improve the performance of your app and provide a better experience for your users.

Here are a few additional tips for optimizing the performance of your React.js app:

- Use the [React Developer Tools](https://beta.reactjs.org/learn/react-developer-tools "react dev tools browser extension link") browser extension to profile your app and identify performance bottlenecks.

- Consider using a performance monitoring tool like [LogRocket](https://logrocket.com/ "log rocket official website") to track the performance of your app over time.

- Consider using a state management like [Jotai](https://jotai.org "Jotai official website") or [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction "Zustand official documentation website") to easily manage your app's state.

Thank you for reading this blog post! I hope you found it helpful. See you in my next post!
