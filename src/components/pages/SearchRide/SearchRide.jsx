import React, { useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useAuth } from "../../../contexts/authContext/AuthContext";
import {
  collection,
  collectionGroup,
  doc,
  firestoreDB,
  getDocs,
  setDoc,
} from "../../../firebase/firebase";
import toast from "react-hot-toast";

const center = { lat: 48.8584, lng: 2.2945 };
const libraries = ["places"];

const SearchRide = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();
  const departureDate = useRef();
  const departureTime = useRef();
  const originAutocomplete = useRef(null);
  const destinationAutocomplete = useRef(null);
  const [rideData, setRideData] = useState([]);
  const { currentUser } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  const handlePlaceSelection = (place, type) => {
    console.log(`Selected ${type} place:`, place);
  };

  const handleContentClick = (index) => {
    setRideData((prevRides) =>
      prevRides.map((ride, i) => ({
        ...ride,
        expanded: i === index ? !ride.expanded : ride.expanded,
      }))
    );
  };

  const handleGetRideDets = async () => {
    try {
      const query = collectionGroup(firestoreDB, "Created Ride");
      const querySnapshot = await getDocs(query);

      if (!querySnapshot.empty) {
        const rides = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          expanded: false,
        }));

        const currentUserRides = rides.filter(
          (ride) => ride.creator !== currentUser.displayName
        );

        const departureDateValue = departureDate.current.value;
        const departureTimeValue = departureTime.current.value;

        const filteredRides = currentUserRides.filter((ride) => {
          const isOriginMatch =
            originRef.current.value === "" ||
            ride.origin
              .toLowerCase()
              .includes(originRef.current.value.toLowerCase());
          const isDestinationMatch =
            destinationRef.current.value === "" ||
            ride.destination
              .toLowerCase()
              .includes(destinationRef.current.value.toLowerCase());

          const rideDepartureDateTime = new Date(
            `${ride.departureDate} ${ride.departureTime}`
          );
          const searchDepartureDateTime = new Date(
            `${departureDateValue} ${departureTimeValue}`
          );

          const isDepartureDateMatch =
            departureDateValue === "" ||
            rideDepartureDateTime.getTime() ===
              searchDepartureDateTime.getTime();

          return isOriginMatch && isDestinationMatch && isDepartureDateMatch;
        });

        // const myCollection = collection(firestoreDB, "Driver Details");
        // let driversData = {};
        // const querySnapshotDrivers = await getDocs(myCollection);
        // querySnapshotDrivers.forEach((doc) => {
        //   driversData = doc.data().fullName;
        // });
        // console.log(driversData);

        // const updateDriverName = filteredRides.map((ride) => ({
        //   ...ride,
        //   driver: driversData,
        // }));
        // console.log(updateDriverName);

        if (filteredRides.length > 0) {
          setRideData(filteredRides);
          // setRideData(updateDriverName);
        } else {
          toast.error("No matching rides found!");
        }
      } else {
        toast.error("No ride found!");
      }
    } catch (error) {
      console.error("Error finding subcollection: ", error);
    }
  };

  const handleJoinRide = async (selectedRideIndex) => {
    try {
      const query = collectionGroup(firestoreDB, "Created Ride");
      const querySnapshot = await getDocs(query);

      const rides = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const currentUserRides = rides.filter(
        (ride) => ride.creator !== currentUser.displayName
      );

      const selectedRide = currentUserRides[selectedRideIndex];

      const rideData = {
        creator: selectedRide.creator,
        origin: selectedRide.origin,
        destination: selectedRide.destination,
        departureDate: selectedRide.departureDate,
        departureTime: selectedRide.departureTime,
        person: selectedRide.person,
        // fare: selectedRide.fare,
      };

      const userDocRef = doc(
        firestoreDB,
        "User Details",
        currentUser.displayName
      );
      const rideDocRef = doc(collection(userDocRef, "Joined Ride"), "rides");
      await setDoc(rideDocRef, rideData);
      toast.success("Ride Joined");
    } catch (error) {
      console.error("Error finding user's collection: ", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 flex font-apercu">
      <div className="controls left w-[35%] mt-5">
        <div className="p-4 bg-[#e1e1e17f] rounded m-4 shadow-base min-w-md z-10">
          <div className="flex flex-col">
            <div className="flex flex-col mb-6 h-full w-[100%] ml-5">
              <div className="flex justify-start items-center ml-10 mb-4 w-full">
                <label className="mr-4" htmlFor="origin">
                  Origin:{" "}
                </label>
                <Autocomplete
                  onLoad={(autocomplete) => {
                    originAutocomplete.current = autocomplete;
                  }}
                  onPlaceChanged={() => {
                    const place = originAutocomplete.current.getPlace();
                    if (place.geometry) {
                      handlePlaceSelection(place, "origin");
                    } else {
                      console.error("Selected place has no geometry");
                    }
                  }}
                >
                  <input
                    id="origin"
                    className="flex-grow px-3 py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin w-[17.2rem]"
                    type="text"
                    placeholder="Type the name of a place"
                    ref={originRef}
                  />
                </Autocomplete>
              </div>
              <div className="flex justify-start items-center w-[90%]">
                <label className="mr-4" htmlFor="destination">
                  Destination:{" "}
                </label>
                <Autocomplete
                  onLoad={(autocomplete) => {
                    destinationAutocomplete.current = autocomplete;
                  }}
                  onPlaceChanged={() => {
                    const place = destinationAutocomplete.current.getPlace();
                    if (place.geometry) {
                      handlePlaceSelection(place, "destination");
                    } else {
                      console.error("Selected place has no geometry");
                    }
                  }}
                >
                  <input
                    id="destination"
                    className="flex-grow px-3 py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin w-[17.2rem]"
                    type="text"
                    placeholder="Type the name of a place"
                    ref={destinationRef}
                  />
                </Autocomplete>
              </div>
            </div>

            <div className="departure mb-7 ml-7 flex items-center w-[92%]">
              <label htmlFor="departureDate" className="mr-4">
                Departure:
              </label>
              <input
                type="date"
                id="departureDate"
                className="flex-grow px-3 py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin mr-5"
                ref={departureDate}
              />
              <input
                type="time"
                id="departureTime"
                className="flex-grow px-3 py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin mr-[56px]"
                ref={departureTime}
              />
            </div>
            <div
              className="flex items-end justify-end mt-4 text-[#ffffffb3]"
              onClick={handleGetRideDets}
            >
              <button
                type="submit"
                className="bg-[#222222] hover:text-white py-[0.7rem] px-3 text-md rounded transition"
              >
                Search Ride
              </button>
            </div>
          </div>
        </div>

        <div className="searchResults p-4 bg-[#e1e1e17f] rounded m-4 shadow-base min-w-md z-10 select-none">
          <h1 className="text-center text-xl">Search Results</h1>
          {rideData.map((ride, index) => (
            <div
              key={index}
              className={`searchContentCard bg-[#49494921] w-full text-black rounded-3xl mt-5 mb-4 p-6 ${
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
                {/* <div className="mb-1">
                  <span className="mr-2">Driver's Name</span>
                  <span className="font-medium text-[1.02rem]">
                    {ride.driver}
                  </span>
                </div> */}
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
                  {/* <button className="bg-[#2c2c2c] hover:bg-[#0c0c0c] hover:shadow-xl transition duration-200 text-white px-3 py-[0.7rem] rounded-md cursor-pointer text-center mr-4 requestButton" onClick={handleRequestRideClick}>
                    Pay Now
                  </button> */}
                  <button
                    className="bg-[#2c2c2c] hover:bg-[#0c0c0c] hover:shadow-xl transition duration-200 text-white px-3 py-[0.7rem] rounded-md cursor-pointer text-center mr-4 requestButton"
                    onClick={() => handleJoinRide(index)}
                  >
                    Join Ride
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="map rounded overflow-hidden w-[65%] mt-9">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => {
            setMap(map);
          }}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default SearchRide;
