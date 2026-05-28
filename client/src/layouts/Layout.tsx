import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Bounce, ToastContainer } from "react-toastify";

function Layout() {
  return (
    <main className="font-mono">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Header />
      <Outlet />
      {/* <Footer/> */}
    </main>
  );
}

export default Layout;
