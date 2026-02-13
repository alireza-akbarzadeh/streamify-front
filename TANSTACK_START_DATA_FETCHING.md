# TanStack Start Data Fetching Patterns

## 📚 Best Practices for Data Fetching in TanStack Start

### ✅ Pattern 1: `ensureQueryData` + `useSuspenseQuery` (RECOMMENDED)

**When:** Most common case - fetch data and use it in component

```tsx
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/")({
  loader: async ({ context }) => {
    // Fetches ONLY if not already cached
    await context.queryClient.ensureQueryData(
      orpc.media.list.queryOptions({
        input: { status: ["PUBLISHED"] },
      }),
    );
  },
});

function RouteComponent() {
  // Suspends until data ready - data is NEVER undefined
  const { data } = useSuspenseQuery(
    orpc.media.list.queryOptions({
      input: { status: ["PUBLISHED"] },
    }),
  );

  // ✅ TypeScript knows data is defined!
  return <MovieList movies={data.data.items} />;
}
```

**Benefits:**

- ✅ Data guaranteed to exist (no null checks)
- ✅ Automatic loading states via Suspense
- ✅ Avoids re-fetching if cached
- ✅ TypeScript knows data is defined

---

### ✅ Pattern 2: Return data from loader + `useLoaderData`

**When:** Need data in multiple places, or want to pass to non-query components

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/")({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(
      orpc.media.list.queryOptions({
        input: { status: ["PUBLISHED"] },
      }),
    );

    // Return data from loader
    return { movies: data };
  },
});

function RouteComponent() {
  // Access loader data directly
  const { movies } = Route.useLoaderData();

  // Can still use the query if needed
  const { data, refetch } = useSuspenseQuery(
    orpc.media.list.queryOptions({
      input: { status: ["PUBLISHED"] },
    }),
  );

  return <MovieList movies={movies.data.items} onRefresh={refetch} />;
}
```

**Benefits:**

- ✅ Data available immediately
- ✅ No duplicate queries
- ✅ Can pass to non-React-Query components

---

### ✅ Pattern 3: Dynamic data with `loaderDeps`

**When:** Query depends on URL params or search params

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const moviesSearchSchema = z.object({
  type: z.enum(["MOVIE", "EPISODE", "TRACK"]).optional(),
  search: z.string().optional(),
  page: z.number().default(1),
});

export const Route = createFileRoute("/movies/")({
  validateSearch: moviesSearchSchema,
  // Define dependencies that trigger re-fetching
  loaderDeps: ({ search }) => ({
    type: search.type,
    search: search.search,
    page: search.page,
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      orpc.media.list.queryOptions({
        input: {
          status: ["PUBLISHED"],
          type: deps.type,
          search: deps.search,
          page: deps.page,
        },
      }),
    );
  },
});

function RouteComponent() {
  const { type, search, page } = Route.useSearch();

  const { data } = useSuspenseQuery(
    orpc.media.list.queryOptions({
      input: {
        status: ["PUBLISHED"],
        type,
        search,
        page,
      },
    }),
  );

  return <MovieList movies={data.data.items} />;
}
```

**Benefits:**

- ✅ Automatic re-fetch when deps change
- ✅ Works with navigation
- ✅ Deep linking support

---

### ✅ Pattern 4: Mutations with optimistic updates

**When:** Creating, updating, or deleting data

```tsx
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

function RouteComponent() {
  const { data } = useSuspenseQuery(
    orpc.media.list.queryOptions({
      input: { status: ["PUBLISHED"] },
    }),
  );

  const createMovie = useMutation({
    mutationFn: (input: CreateMediaInput) =>
      orpc.media.create.mutate({ input }),

    // Optimistic update
    onMutate: async (newMovie) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: orpc.media.list.getQueryKey(),
      });

      // Snapshot previous value
      const previousMovies = queryClient.getQueryData(
        orpc.media.list.getQueryKey(),
      );

      // Optimistically update
      queryClient.setQueryData(orpc.media.list.getQueryKey(), (old) => ({
        ...old,
        data: {
          ...old.data,
          items: [...old.data.items, newMovie],
        },
      }));

      return { previousMovies };
    },

    // On error, rollback
    onError: (err, newMovie, context) => {
      queryClient.setQueryData(
        orpc.media.list.getQueryKey(),
        context.previousMovies,
      );
    },

    // Always refetch after success/error
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: orpc.media.list.getQueryKey(),
      });
    },
  });

  return (
    <div>
      <MovieList movies={data.data.items} />
      <CreateMovieForm onSubmit={createMovie.mutate} />
    </div>
  );
}
```

---

### ✅ Pattern 5: Parallel queries

**When:** Need multiple independent data sources

```tsx
export const Route = createFileRoute("/dashboard/")({
  loader: async ({ context }) => {
    // Fetch multiple queries in parallel
    await Promise.all([
      context.queryClient.ensureQueryData(
        orpc.media.list.queryOptions({
          input: { status: ["PUBLISHED"] },
        }),
      ),
      context.queryClient.ensureQueryData(orpc.genres.list.queryOptions()),
      context.queryClient.ensureQueryData(orpc.creators.list.queryOptions()),
    ]);
  },
});

function RouteComponent() {
  const { data: movies } = useSuspenseQuery(
    orpc.media.list.queryOptions({
      input: { status: ["PUBLISHED"] },
    }),
  );

  const { data: genres } = useSuspenseQuery(orpc.genres.list.queryOptions());

  const { data: creators } = useSuspenseQuery(
    orpc.creators.list.queryOptions(),
  );

  return (
    <Dashboard
      movies={movies.data.items}
      genres={genres.data}
      creators={creators.data}
    />
  );
}
```

---

### ✅ Pattern 6: Server-only data (no client caching)

**When:** Sensitive data, one-time data, or data that shouldn't be cached

```tsx
export const Route = createFileRoute("/admin/analytics/")({
  loader: async ({ context }) => {
    // Fetch directly without caching
    const analytics = await orpc.admin.analytics.query();

    return { analytics };
  },
});

function RouteComponent() {
  const { analytics } = Route.useLoaderData();

  return <AnalyticsDashboard data={analytics} />;
}
```

---

## 🚫 What NOT to do

### ❌ Pattern: `prefetchQuery` + `useQuery`

```tsx
// ❌ Bad: Data might be undefined
loader: async ({ context }) => {
  await context.queryClient.prefetchQuery(...); // Might fail silently
},

function Component() {
  const { data } = useQuery(...); // data can be undefined!

  return <div>{data?.items.length}</div>; // Need null checks
}
```

**Why bad:**

- ❌ Data can be undefined
- ❌ Need null checks everywhere
- ❌ May re-fetch unnecessarily
- ❌ No loading state

---

## 📋 Quick Decision Tree

```
Do you need the data in the component?
├─ Yes
│  ├─ Does it depend on URL params?
│  │  ├─ Yes → Use loaderDeps + useSuspenseQuery
│  │  └─ No → Use ensureQueryData + useSuspenseQuery
│  │
│  └─ Is it sensitive/one-time data?
│     ├─ Yes → Fetch in loader, return data, use useLoaderData
│     └─ No → Use ensureQueryData + useSuspenseQuery
│
└─ No (just prefetch for later)
   └─ Use ensureQueryData in loader only
```

---

## 🎯 Your Current Setup

**Before (Not optimal):**

```tsx
loader: async ({ context }) => {
  await context.queryClient.prefetchQuery(...); // ❌
},

function Component() {
  const { data } = useQuery(...); // ❌ data can be undefined
}
```

**After (Optimal):**

```tsx
loader: async ({ context }) => {
  await context.queryClient.ensureQueryData(...); // ✅
},

function Component() {
  const { data } = useSuspenseQuery(...); // ✅ data guaranteed
}
```

---

## 📚 Key Takeaways

1. **Always use `ensureQueryData`** instead of `prefetchQuery` in loaders
2. **Always use `useSuspenseQuery`** instead of `useQuery` for loader data
3. **Use `loaderDeps`** for dynamic queries based on URL
4. **Return data from loader** when you need it in multiple places
5. **Parallel fetch** independent queries with `Promise.all`
6. **Use mutations** with optimistic updates for better UX

---

## 🔗 Resources

- [TanStack Router Loaders](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [TanStack Query Suspense](https://tanstack.com/query/latest/docs/framework/react/guides/suspense)
- [ORPC React Query](https://orpc.unnoq.com/docs/integrations/react-query)
