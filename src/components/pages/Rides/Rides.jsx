import React, { useEffect, useState } from "react";
import {
  collection,
  collectionGroup,
  doc,
  firestoreDB,
  getDoc,
  getDocs,
  onSnapshot,
} from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/authContext/AuthContext";

const Rides = () => {
  const [rideData, setRideData] = useState([]);
  const [joinedRideData, setJoinedRideData] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collectionGroup(firestoreDB, "Created Ride"),
      (querySnapshot) => {
        const rides = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            expanded: false,
          }))
          .filter((ride) => ride.creator === currentUser.displayName);
        setRideData(rides);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    const joinedRide = async () => {
      const userDocRef = doc(
        firestoreDB,
        "User Details",
        currentUser.displayName
      );
      const joinedRidesCollectionRef = collection(userDocRef, "Joined Ride");
      const rideDocsSnapshot = await getDocs(joinedRidesCollectionRef);

      // Extract document names for users who joined the ride
      const documentNames = rideDocsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        creator: doc.data().creator,
      }));

      const getRideDataPromises = documentNames.map(({ creator, id }) => {
        const rideDocRef = doc(
          firestoreDB,
          "User Details",
          creator,
          "Created Ride",
          id
        );
        return getDoc(rideDocRef);
      });

      try {
        const rideDataSnapshots = await Promise.all(getRideDataPromises);
        rideDataSnapshots.forEach((rideDocSnapshot, index) => {
          if (rideDocSnapshot.exists()) {
            const rideData = rideDocSnapshot.data();
            documentNames[index].driver = rideData.driver;
          }
        });
      } catch (error) {
        console.error("Error fetching ride documents:", error);
      }

      setJoinedRideData(documentNames);
    };

    joinedRide();
  }, [currentUser]);

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-center font-apercu select-none">
      <div className="mt-8 w-full flex justify-center">
        <div className="flex flex-col gap-24 w-[90%]">
          <div>
            <h1 className="text-[1.7rem] font-medium text-[#000000e0] ml-8 mt-8">
              Rides that you've created
            </h1>
            {rideData.map((ride, index) => (
              <div className="w-full mt-3 p-3" key={index}>
                <table className="table-auto w-full border-collapse border border-[#b4b4b4]">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-[#b4b4b4] py-2 w-[20%]">
                        Departure
                      </th>
                      <th className="border border-[#b4b4b4] py-2 px-14">
                        Driver
                      </th>
                      <th className="border border-[#b4b4b4] py-2 w-[40%]">
                        Origin
                      </th>
                      <th className="border border-[#b4b4b4] py-2 w-[40%]">
                        Destination
                      </th>
                      <th className="border border-[#b4b4b4] py-2 px-2">
                        Rider
                      </th>
                      <th className="border border-[#b4b4b4] py-2 px-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.departureDate}</span>
                        <span className="ml-3">{ride.departureTime}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.driver}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.origin}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.destination}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.person}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.status}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div>
            <h1 className="text-[1.7rem] font-medium text-[#000000e0] ml-8 mt-8">
              Rides that you've joined
            </h1>
            {joinedRideData.map((ride, index) => (
              <div className="w-full mt-3 p-3" key={index}>
                <table className="table-auto w-full border-collapse border border-[#b4b4b4]">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-[#b4b4b4] py-2 w-[20%]">
                        Departure
                      </th>
                      <th className="border border-[#b4b4b4] py-2 w-[40%]">
                        Origin
                      </th>
                      <th className="border border-[#b4b4b4] py-2 w-[40%]">
                        Destination
                      </th>
                      <th className="border border-[#b4b4b4] py-2 px-3">
                        Creator
                      </th>
                      <th className="border border-[#b4b4b4] py-2 px-3">
                        Driver
                      </th>
                      <th className="border border-[#b4b4b4] py-2 px-2">
                        Rider
                      </th>
                      <th className="border border-[#b4b4b4] py-2 px-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.departureDate}</span>
                        <span className="ml-3">{ride.departureTime}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.origin}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.destination}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.creator}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.driver}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>{ride.person}</span>
                      </td>
                      <td className="border border-[#b4b4b4] py-2 text-center">
                        <span>Status</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rides;
