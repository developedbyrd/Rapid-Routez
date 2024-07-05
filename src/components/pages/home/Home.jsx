import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="bg-gray-100 py-12 lg:py-16">
        <div className="container flex flex-col justify-center gap-4 px-4 md:px-6 h-screen w-full">
          <div className="relative bottom-32">
            <div className="space-y-5 text-center mb-32">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-6xl">
                Share the Ride, Split the Cost
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-500">
                Connect with drivers and passengers to make your daily commute
                more affordable and eco-friendly. Let's ride together.
              </p>
            </div>
            <div className="mx-auto lg:space-y-0 text-center font-apercu">
              <Link
                to={"/SearchRide"}
                className="bg-black text-white py-3 px-5 mx-4 rounded-md"
                size="lg"
              >
                Find a Ride
              </Link>

              <Link
                to={"/CreateRide"}
                className="bg-[#e1e1e1a1] hover:bg-gray-200 text-black py-3 px-5 mx-4 rounded-md"
                size="lg"
              >
                Create a Ride
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="py-12 lg:py-16">
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Benefits of Carpooling
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Carpooling isn't just about sharing a ride. It offers a wide range
              of benefits that make it a smart choice for commuters.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <CarFrontIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">Cost Savings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sharing the cost of fuel and parking can significantly reduce
                your commuting expenses.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <RecycleIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">Reduced Carbon Footprint</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By sharing a ride, you help lower the number of vehicles on the
                road, reducing air pollution and greenhouse gas emissions.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <CarIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">Convenience</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Carpooling allows you to relax during your commute, catch up on
                work, or socialize with your co-riders instead of dealing with
                traffic stress.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <HeartHandshakeIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">Social Connections</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Carpooling provides an opportunity to meet new people, make
                friends, and build a sense of community during your daily
                commute.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 lg:py-16">
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Advantages of Our Carpooling Platform
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We offer a range of features and benefits that make carpooling
              with our platform the smart choice for commuters.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <CarFrontIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">Advanced Ride Matching</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our platform uses sophisticated algorithms to match riders with
                the most compatible drivers, ensuring a smooth and enjoyable
                carpooling experience.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <ClockIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">Flexible Scheduling</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Commuters can easily customize their ride preferences, including
                departure times, pickup locations, and other parameters to
                ensure a personalized and convenient carpooling experience.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <StarIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">User Ratings and Reviews</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our platform allows passengers and drivers to rate each other
                after the ride, providing valuable feedback and enhancing trust
                and accountability within the carpooling community.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Carpooling with our platform is simple and convenient. Here's how
              it works in a few easy steps.
            </p>
          </div>
          <div className="mx-auto max-w-sm space-y-8 lg:max-w-none lg:grid lg:grid-cols-4 lg:items-center lg:gap-8">
            <div className="flex flex-col items-center space-y-2 text-center mt-8">
              <div className="flex w-12 h-12 items-center justify-center rounded-full border bg-gray-100 border-gray-800">
                1
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sign Up
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex w-12 h-12 items-center justify-center rounded-full border bg-gray-100 border-gray-800">
                2
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Search Rides
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex w-12 h-12 items-center justify-center rounded-full border bg-gray-100 border-gray-800">
                3
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Book Ride
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex w-12 h-12 items-center justify-center rounded-full border bg-gray-100 border-gray-800">
                4
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enjoy the Ride
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 lg:py-16">
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Safety and Trust
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We prioritize the safety and security of our users, providing
              peace of mind for every carpooling journey.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <ShieldCheckIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">Verified Profiles</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                All users undergo a verification process to ensure that their
                profiles are authentic, adding an extra layer of trust to the
                carpooling community.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <CheckIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">Insurance Coverage</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our platform provides insurance coverage for all rides, offering
                protection and security for both drivers and passengers.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <UserIcon className="w-16 h-16 rounded-full p-4 bg-gray-100 border-gray-800" />
              <h3 className="text-xl font-bold">User-Friendly Interface</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our platform offers a seamless and intuitive user experience,
                making it easy to find, book, and share rides while ensuring
                safety and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <footer className="container flex items-center justify-between py-6 px-4 md:px-10">
          <nav className="flex gap-5 text-center">
            <a
              className="text-sm font-medium text-gray-900 hover:underline"
              href="#"
            >
              About Us
            </a>
            <a
              className="text-sm font-medium text-gray-900 hover:underline"
              href="#"
            >
              Terms and Conditions
            </a>
            <a
              className="text-sm font-medium text-gray-900 hover:underline"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-sm font-medium text-gray-900 hover:underline"
              href="#"
            >
              Contact Us
            </a>
          </nav>
          <div className="flex items-center justify-center space-x-5">
            <a
              className="text-gray-500 hover:text-gray-900 transition-colors duration-100"
              href="#"
            >
              <TwitterIcon className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              className="text-gray-500 hover:text-gray-900 transition-colors duration-100"
              href="#"
            >
              <FacebookIcon className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              className="text-gray-500 hover:text-gray-900 transition-colors duration-100"
              href="#"
            >
              <InstagramIcon className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

function CarFrontIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
      <path d="M7 14h.01" />
      <path d="M17 14h.01" />
      <rect width="18" height="8" x="3" y="10" rx="2" />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </svg>
  );
}

function CarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function HeartHandshakeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function RecycleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default Home;
