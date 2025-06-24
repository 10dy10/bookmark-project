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
        className="fixed block bg-red-500 text-white px-4 py-2 rounded mt-4 right-4"
      >
        <svg
          className="w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
          />
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default App;
