import toast from "react-hot-toast";
import Colors from "../../utils/Colors";
import Lookup from "../../utils/Lookup";
import { Button } from "../ui/button";
import { verifyToken } from "../../lib/utils";
import { logout, setUser } from "../../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rzpLogo from "../../assets/logo.png";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PriceModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: any) => state.auth);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const buyTokens = async (creditType: string, tokens: number) => {
    try {
      // load script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toast.error(
          "Razorpay SDK failed to load. Check your Internet Connection."
        );
        return;
      }

      const { data } = await axios.post(
        `${BASE_URL}/payment/capture-payment`,
        { creditType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      // options
      const options = {
        key: import.meta.env.RAZORPAY_KEY,
        currency: data.data.currency,
        amount: `${data.data.amount}`,
        order_id: data.data.id,
        name: "Bolt.Clone",
        description:
          "Thank you for Purchasing tokens. Expand your devlopment skills with AI.",
        image: rzpLogo,
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
        handler: function (response: any) {
          // verify payment
          verifyPayment({ ...response, tokens });
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response: any) {
        toast.error("Oops! Payment Failed.");
        console.log(response.error);
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
      const resp = verifyToken(error?.response?.data?.message);
      if (resp) {
        dispatch(logout());
        navigate("/");
      }
    }
  };

  const verifyPayment = async (reqBody: any) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/payment/verify-payment`,
        reqBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      dispatch(setUser({ ...user, token: data.data }));
      toast.success(
        "Payment Successful. Required tokens have been added to your account."
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
      const res = verifyToken(error?.response?.data?.message);
      if (res) {
        dispatch(logout());
        navigate("/");
      }
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Lookup.PRICING_OPTIONS.map((option: any, i: number) => (
        <div
          key={i}
          className="p-4 border flex flex-col gap-3 rounded-lg"
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <h2 className="font-bold text-2xl">{option.name}</h2>
          <h2 className="font-medium text-lg">{option.tokens} tokens</h2>
          <p className="text-gray-400">{option.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6">
            ${option.price}
          </h2>
          <Button onClick={() => buyTokens(option.name, option.value)}>
            Upgrade to {option.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PriceModel;
