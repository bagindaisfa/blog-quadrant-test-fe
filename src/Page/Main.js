import "../App.css";
import Routes from "../Config/Routes/index";
import MainPage from "../Component/drawer/index";

function Main() {
  const isLogin = localStorage.getItem("quadrant");

  return (
    <div className="App" style={{ height: "100%" }}>
      {isLogin ? <MainPage /> : <Routes />}
    </div>
  );
}

export default Main;
