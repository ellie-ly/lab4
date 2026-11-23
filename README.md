 DCIT26 — Laboratory Exercise 4: React `useState` and `useEffect`

Guide Questions

1. Why do we use two separate states, `searchText` and `debouncedSearch`, instead of only one?
    `searchText` tracks what the user is typing immediately so the input field stays responsive on every keystroke, while `debouncedSearch` only updates after a 300ms pause so filtering doesn't run unnecessarily while the user is still typing.

2. What would happen if the debounce effect did not return a cleanup function?
    Without `clearTimeout(timer)` in the cleanup function, every keystroke would leave an active timer running and schedule `setDebouncedSearch` for each intermediate keystroke instead of waiting only for a pause in typing.

 3. What is the purpose of the dependency array? What happens if it is empty (`[]`)? What happens if it is left out completely?
    The dependency array tells React when to re-run the effect after renders based on changes to listed values. An empty array (`[]`) runs the effect only once after the component mounts. Leaving the dependency array out completely makes the effect run after every single render.

4. Why should we avoid sorting the original `products` array directly?
    Calling `.sort()` directly on `products` mutates the original array in place, which changes the base order of the catalog data and can cause unpredictable UI behavior or make resetting to the default order unreliable.

5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.
    Calculating it during rendering from existing state (`debouncedSearch`, `category`, `sortOrder`) and `products` is better because it avoids duplicate state, prevents filtered results from getting out of sync with the filter controls, and keeps the data flow simple.