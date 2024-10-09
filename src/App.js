import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Layout = DefaultLayout;
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
