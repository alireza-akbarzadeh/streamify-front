# Auth Usage Guide - Best Practices

## 🎯 Architecture Overview

Auth is fetched **once** in the root route and available everywhere through context. This is the most efficient and secure approach.

```
Root Route (__root.tsx)
    ↓ beforeLoad fetches session
    ↓ passes to context.auth
    ↓
All Child Routes
    ↓ access via context.auth
    ↓ use middleware for protection
```

## ✅ Best Practices

### 1. **Root Route** (Already Set Up)

The session is fetched once in `__root.tsx`:

```typescript
// src/routes/__root.tsx
export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const session = await getSession();
    return {
      auth: session, // ← Available globally
    };
  },
  // ...
});
```

### 2. **Protected Routes** - Use Middleware

```typescript
// src/routes/(library)/route.tsx
export const Route = createFileRoute("/(library)")({
  component: LibraryLayout,
  server: {
    middleware: [authMiddleware], // ← Protects entire route tree
  },
});
```

### 3. **Access Auth in Loaders**

```typescript
export const Route = createFileRoute("/dashboard")({
  loader: async ({ context }) => {
    // Access auth from context
    const userId = context.auth?.user?.id;

    if (!userId) {
      throw redirect({ to: "/login" });
    }

    const data = await fetchUserData(userId);
    return { data };
  },
});
```

### 4. **Access Auth in Components**

```typescript
import { useRouter } from "@tanstack/react-router";

function MyComponent() {
    const router = useRouter();
    const session = router.options.context?.auth;

    if (!session) {
        return <Navigate to="/login" />;
    }

    return <div>Hello {session.user.name}</div>;
}
```

### 5. **Multiple Middleware Combo**

```typescript
export const Route = createFileRoute("/admin/dashboard")({
  server: {
    middleware: [
      authMiddleware, // Requires login
      adminMiddleware, // Requires admin role
    ],
  },
});
```

## 🛡️ Available Middleware

### Basic Auth

```typescript
import { authMiddleware } from "@/middleware/auth";

server: {
    middleware: [authMiddleware], // Just requires login
}
```

### Admin Only

```typescript
import { adminMiddleware } from "@/middleware/auth";

server: {
    middleware: [adminMiddleware], // Requires admin role
}
```

### Subscription Required

```typescript
import { proMiddleware, premiumMiddleware } from "@/middleware/auth";

// PRO or PREMIUM
server: {
    middleware: [proMiddleware],
}

// Only PREMIUM
server: {
    middleware: [premiumMiddleware],
}
```

### Email Verification Required

```typescript
import { verifiedEmailMiddleware } from "@/middleware/auth";

server: {
    middleware: [verifiedEmailMiddleware],
}
```

### Combined Requirements

```typescript
import { require } from "@/middleware/auth";

server: {
    middleware: [
        require({
            verified: true,
            role: "admin",
            subscription: "PREMIUM",
        })
    ],
}
```

### Custom Permission

```typescript
import { requirePermission } from "@/middleware/auth";

server: {
    middleware: [
        requirePermission("posts", "delete"),
    ],
}
```

## ❌ Don't Do This

### ❌ Fetching Session Again in Routes

```typescript
// WRONG - Session already in context!
export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await getSession(); // ← Redundant!
    return { auth: session };
  },
});
```

### ❌ Fetching in Every Component

```typescript
// WRONG - Use context instead
function MyComponent() {
  const session = await getSession(); // ← Can't even do this client-side!
}
```

## 🔐 API Routes (Exception)

API route handlers need to fetch session directly since they don't have route context:

```typescript
export const Route = createFileRoute("/api/data")({
  server: {
    handlers: {
      GET: async (request) => {
        // OK to fetch here - no route context available
        const session = await getSession();

        if (!session) {
          return new Response("Unauthorized", { status: 401 });
        }

        // ... handle request
      },
    },
  },
});
```

## 📊 Performance Benefits

By fetching auth once in the root:

✅ **1 database query** instead of N queries  
✅ **Automatic caching** through context  
✅ **Type safety** throughout the app  
✅ **SSR friendly** - no hydration mismatches  
✅ **Secure** - server-side validation

## 🚀 Summary

1. **Fetch once** in `__root.tsx` ✓ (already done)
2. **Use middleware** to protect routes
3. **Access via `context.auth`** in loaders
4. **Access via `router.options.context.auth`** in components
5. **Never refetch** in child routes (unless API handler)
