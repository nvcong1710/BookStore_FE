// import "./App.css";
// window.process = {};
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import { publicRoutes } from "./routes";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = UserLayout;
              if (route.layout) Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout {...route.props}>
                      {route.breadcrumb && (
                        <route.breadcrumb title={route.props?.heading} />
                      )}
                      <Page />
                    </Layout>
                  }
                >
                  <Route index element={<Page />} />
                </Route>
              );
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
