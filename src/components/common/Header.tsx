import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Colors from "../../utils/Colors";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDialog } from "../../slice/authSlice";
import { Download, Rocket } from "lucide-react";
import { setNavAction } from "../../slice/actionSlice";
import Sidebar from "./Sidebar";
const Header = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: any) => state.auth);
  const { pathname } = useLocation();

  const handleNavAction = (type: string) => {
    dispatch(
      setNavAction({
        type,
        timeStamp: Date.now(),
      })
    );
  };
  return (
    <div
      className="p-4 py-3 flex justify-between items-center shadow-[44px_37px_171px_31px_rgba(46,_9,_255,_0.2)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
to-black from-[rgba(46,_9,_255,_0.2)]"
    >
      <Link to={"/"}>
        <img src={Logo} alt="logo" width={40} />
      </Link>
      {token ? (
        <div className="flex gap-3 items-center">
          {pathname.includes("/workspace") && (
            <div className="flex gap-5 items-center">
              <Button
                variant="outline"
                onClick={() => handleNavAction("export")}
              >
                <Download />
                Export
              </Button>
              <Button
                className="text-white"
                style={{ backgroundColor: Colors.BLUE }}
                onClick={() => handleNavAction("deploy")}
              >
                <Rocket />
                Deploy
              </Button>
            </div>
          )}
          <Sidebar>
            <img
              src={user?.image}
              alt="user"
              height={40}
              width={40}
              className="rounded-full w-8 h-8 p-0 cursor-pointer"
            />
          </Sidebar>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <Button variant="ghost" onClick={() => dispatch(setOpenDialog(true))}>
            Sign In
          </Button>
          <Button
            className="text-white"
            style={{ backgroundColor: Colors.BLUE }}
          >
            Get Strated
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
