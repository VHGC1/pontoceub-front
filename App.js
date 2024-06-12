import { AuthProvider } from "./app/context/AuthContext";
import Routes from "./app/routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
