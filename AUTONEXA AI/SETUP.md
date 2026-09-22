# Autonexa AI — Full Stack Setup

## 1. Packages install karein
```bash
npm install @supabase/supabase-js
```

## 2. Supabase account banayein
1. https://supabase.com pe free account banayein → New Project
2. Project Settings → API → yahan se `Project URL` aur `anon public key` copy karein
3. SQL Editor mein `supabase-setup.sql` file ka content run karein (isse "items" table aur security policies ban jayengi)

## 3. Environment variables set karein
- Local: `.env.example` ko `.env` mein rename karein aur apni values daalein
- Vercel: Project → Settings → Environment Variables mein wahi 3 variables add karein
  (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY`)

## 4. Files ko apne repo mein copy karein
Ye files apne repo ki matching locations pe daal dein:
```
api/chat.js
src/lib/supabaseClient.js
src/lib/useItems.js
src/contexts/AuthContext.jsx
src/components/ChatBox.jsx
```

## 5. App.jsx mein AuthProvider wrap karein
```jsx
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      {/* baaki app */}
    </AuthProvider>
  );
}
```

## 6. Login/Signup form banayein (quick example)
```jsx
import { useAuth } from "./contexts/AuthContext";
import { useState } from "react";

function LoginForm() {
  const { signIn, signUp, user, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <button onClick={signOut}>Logout ({user.email})</button>;

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button onClick={() => signIn(email, password)}>Login</button>
      <button onClick={() => signUp(email, password)}>Sign Up</button>
    </div>
  );
}
```

## 7. CRUD use karein
```jsx
import { useItems } from "./lib/useItems";

function ItemsList() {
  const { items, addItem, deleteItem } = useItems();
  return (
    <div>
      <button onClick={() => addItem("Naya item")}>Add</button>
      {items.map(i => (
        <p key={i.id}>{i.title} <button onClick={() => deleteItem(i.id)}>Delete</button></p>
      ))}
    </div>
  );
}
```

## 8. AI chat use karein
```jsx
import ChatBox from "./components/ChatBox";
// <ChatBox /> jahan bhi chahiye lagayein
```

## 9. Deploy
```bash
git add .
git commit -m "Add full-stack backend: auth + db + AI chat"
git push
```
Vercel automatically redeploy kar dega (agar GitHub se connected hai).

---
**Note:** `AUTONEXA AI` naam ka jo extra folder repo mein hai, wo check kar lein —
agar duplicate/unused files hain to unhe hata dein taake confusion na ho.
