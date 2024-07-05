import React, { useEffect, useState } from "react";
import {
  collection,
  collectionGroup,
  doc,
  firestoreDB,
  onSnapshot,
  setDoc,
} from "../../../firebase/firebase";
import toast from "react-hot-toast";
import { useAuth } from "../../../contexts/authContext/AuthContext";

const Driver = () => {
  const [rideData, setRideData] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collectionGroup(firestoreDB, "Created Ride"),
      (querySnapshot) => {
        const rides = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          expanded: false,
        }));
        setRideData(rides);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleContentClick = (index) => {
    setRideData((prevRides) =>
      prevRides.map((ride, i) => ({
        ...ride,
        expanded: i === index ? !ride.expanded : ride.expanded,
      }))
    );
  };

  // const handleAcceptRide = async (e, ride) => {
  //   e.stopPropagation();

  //   try {
  //     const userDataRef = doc(firestoreDB, "User Details", ride.creator);
  //     const rideDocRef = doc(collection(userDataRef, "Created Ride"), ride.id);

  //     const newRideData = {
  //       ...ride,
  //       driver: currentUser.displayName,
  //       status: "Accepted",
  //     };

  //     await setDoc(rideDocRef, newRideData);
  //     toast.success("Ride Accepted");
  //   } catch (error) {
  //     toast.error("Error accepting ride");
  //   }
  // };

  const handleAcceptRide = async (e, ride) => {
    e.stopPropagation();
  
    try {
      if (!currentUser.displayName) {
        toast.error("Please update your profile with a display name.");
        return;
      }
  
      const userDataRef = doc(firestoreDB, "User Details", ride.creator);
      const rideDocRef = doc(collection(userDataRef, "Created Ride"), ride.id);
  
      const newRideData = {
        ...ride,
        driver: currentUser.displayName,
        status: "Accepted",
      };
  
      await setDoc(rideDocRef, newRideData);
      toast.success("Ride Accepted");
    } catch (error) {
      toast.error("Error accepting ride");
    }
  };
  

  return (
    <div className="w-full min-h-screen bg-slate-100 flex font-apercu select-none">
      <div className="controls left w-full mt-5">
        <h1 className="text-2xl text-center mt-8">Your Nearby Rides</h1>
        <div className="searchResults p-4 rounded m-4 shadow-base min-w-md z-10 flex flex-row">
          {rideData.map((ride, index) => (
            <div
              key={index}
              className={`searchContentCard bg-[#49494921] w-[30%] text-black rounded-3xl mt-5 mb-4 p-6 ml-2 mr-2 ${
                ride.expanded ? "h-full" : "max-h-[100px] overflow-hidden"
              }`}
              onClick={() => handleContentClick(index)}
            >
              <div className="flex justify-between cursor-pointer">
                <div>
                  <div className="flex items-center pb-2">
                    <span className="mr-7 text-[#453EEB] font-normal">
                      FROM
                    </span>
                    <h1 className="font-medium text-[#272727]">
                      {ride.origin}
                    </h1>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-7 ml-6 text-[#453EEB] font-normal">
                      TO
                    </span>
                    <h1 className="font-medium text-[#272727]">
                      {ride.destination}
                    </h1>
                  </div>
                </div>
                <div className="text-[#453EEB] font-semibold text-[1.2rem]">
                  <h1>₹100</h1>
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-1">
                  <span className="mr-2">Creator Name</span>
                  <span className="font-medium text-[1.02rem]">
                    {ride.creator}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="mr-2">Creator Phone Number</span>
                  <span className="font-medium text-[1.02rem]">
                    {ride.phoneNumber}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="mr-2">Departure Date</span>
                  <span className="font-medium text-[1.02rem]">
                    {ride.departureDate}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="mr-2">Departure Time</span>
                  <span className="font-medium text-[1.02rem]">
                    {ride.departureTime}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="mr-2">Person</span>
                  <span className="font-medium text-[1.02rem]">
                    {ride.person}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="mr-2">Distance</span>
                  <span className="font-medium text-[1.02rem]">
                    {ride.distance}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="mr-2">Duration</span>
                  <span className="font-medium text-[1.02rem]">
                    {ride.duration}
                  </span>
                </div>
              </div>
              <div className="w-full text-right inline-block mt-4">
                <div>
                  <button
                    className="bg-[#2c2c2c] hover:bg-[#0c0c0c] hover:shadow-xl transition duration-200 text-white px-2 py-[0.5rem] rounded-md text-sm cursor-pointer text-center mr-4 requestButton"
                    onClick={(e) => handleAcceptRide(e, ride)}
                  >
                    Accept Ride
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Driver;
