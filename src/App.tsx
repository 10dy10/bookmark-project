import LoginForm from "./components/LoginForm";
import { useAuth } from "./context/AuthContext";
import { auth } from "../firebase";
import Home from "./pages/Home";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>로딩중...</div>;

  if (!user)
    return (
      <LoginForm
        onLoginSuccess={() => {
          // 로그인 성공 시 추가 작업 필요하면 여기서
          console.log("로그인 성공!");
        }}
      />
    );

  return (
    <div className="min-h-screen flex justify-center items-start">
      <Home />
      <button
        onClick={() => auth.signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        로그아웃
      </button>
    </div>
  );
}

export default App;
