import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import toast from "react-hot-toast";

function Verify() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPament = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/order/verify",
        {
          success,
          orderId,
        }
      );
      if (response.data.success) {
        navigate("/order");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("Error in Payment");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPament();
  }, []);

  return (
    <div>
      <Loader />{" "}
    </div>
  );
}

export default Verify;
