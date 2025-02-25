import { useSelector } from "react-redux";
import Lookup from "../utils/Lookup";
import Colors from "../utils/Colors";
import PriceModel from "../components/core/PriceModel";
import { Play } from "lucide-react";

const Subscription = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="mt-6 flex flex-col items-center w-full p-10 md:px-32 lg:px-48">
      <h2 className="font-bold text-4xl">Pricing</h2>
      <p className="text-gray-400 max-w-xl text-center mt-4">
        {Lookup.PRICING_DESC}
      </p>

      <div
        className="p-5 py-3 border rounded-xl w-full flex justify-between items-center mt-7"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <h2 className="text-lg flex items-center gap-1">
          <Play width={15} height={15} className="text-white" />
          <span className="font-bold">{user?.token}</span> tokens left.
        </h2>
        <div className="text-gray-400">
          <h2 className="font-medium">Need more token?</h2>
          <p>Upgrade your plan below</p>
        </div>
      </div>

      <PriceModel />
    </div>
  );
};

export default Subscription;
