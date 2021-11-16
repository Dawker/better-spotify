import "bootstrap/dist/css/bootstrap.min.css"
import { Dashboard, Login } from "./components/index"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <Dashboard code={code} /> : <Login />
}

export default App
