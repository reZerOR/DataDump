import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Pro = () => {
  return (
    <div>
      <div className="w-full my-10 gap-10 flex flex-col items-center justify-center text-center text-5xl">
        <p className="text-7xl font-bold">Become Pro</p>
        <p>
          Just <span className="font-bold text-project-500">$25</span>
        </p>
      </div>
      {/* intigrede payment */}
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Pro;
