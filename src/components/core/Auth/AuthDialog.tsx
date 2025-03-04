import { useGoogleLogin } from "@react-oauth/google";
import Lookup from "../../../utils/Lookup";
import { Button } from "../../ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDialog, setToken, setUser } from "../../../slice/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AuthDialog = () => {
  const dispatch = useDispatch();
  const { openDialog } = useSelector((state: any) => state.auth);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/auth/google`,
          { code },
          { withCredentials: true }
        );

        if (!data.success) {
          toast.error(data.message);
          return;
        }
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        dispatch(setOpenDialog(false));
        toast.success(data.message);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data.message || error?.message);
      }
    },
    flow: "auth-code",
  });

  return (
    <div>
      <Dialog
        open={openDialog}
        onOpenChange={(v) => dispatch(setOpenDialog(v))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col gap-3 items-center justify-center">
                <h2 className="font-bold text-xl text-center text-white">
                  {Lookup.SIGNIN_HEADING}
                </h2>
                <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-700 outline-none"
                  onClick={() => googleLogin()}
                >
                  SignIn with Google
                </Button>
                <p className="mt-2 text-center">
                  {Lookup.SIGNIn_AGREEMENT_TEXT}
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthDialog;
