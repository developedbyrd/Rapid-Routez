import { useRef, useState } from "react";
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
  doc,
  firestoreDB,
  setDoc,
} from "../../../firebase/firebase";
import toast from "react-hot-toast";

const center = { lat: 31.8907, lng: 75.1604 };
const libraries = ["places"];

const CreateRide = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("50km");
  const [duration, setDuration] = useState("1hr 50min");
  const originRef = useRef();
  const destinationRef = useRef();
  const departureDate = useRef();
  const departureTime = useRef();
  const person = useRef();
  const phoneNumber = useRef();
  const fare = useRef();
  const originAutocomplete = useRef(null);
  const destinationAutocomplete = useRef(null);
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
    departureDate.current.value = "";
    departureTime.current.value = "";
    person.current.value = "";
    phoneNumber.current.value = "";
    fare.current.value = "";
  }

  const handlePlaceSelection = (place, type) => {
    // Here, you can access information about the selected place
    console.log(`Selected ${type} place:`, place);

    // Example: You can use the selected place for further actions, such as setting state
    // if (type === "origin") {
    //   setOrigin(place.name);
    // } else if (type === "destination") {
    //   setDestination(place.name);
    // }
  };

  const handleCreateRide = async () => {
    try {
      const rideData = {
        creator: currentUser.displayName,
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        departureDate: departureDate.current.value,
        departureTime: departureTime.current.value,
        person: person.current.value,
        phoneNumber: phoneNumber.current.value,
        fare: fare.current.value,
        distance: distance,
        duration: duration,
      };

      const userDocRef = doc(
        firestoreDB,
        "User Details",
        currentUser.displayName
      );
      const rideDocRef = doc(collection(userDocRef, "Created Ride"), "rides");
      await setDoc(rideDocRef, rideData);
      toast.success("Ride Created");

      originRef.current.value = "";
      destinationRef.current.value = "";
      departureDate.current.value = "";
      departureTime.current.value = "";
      person.current.value = "";
      phoneNumber.current.value = "";
      fare.current.value = "";
      setDirectionsResponse(null);
      setDistance("");
      setDuration("");
    } catch (error) {
      console.error("Error finding user's collection: ", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 flex font-apercu">
      <div className="controls left w-[35%] mt-5">
        <div className="p-4 bg-[#e1e1e17f] rounded m-4 shadow-base min-w-md z-10">
          <div className="flex flex-col">
            <div className="flex flex-col mb-6 w-full ml-5">
              <div className="flex justify-start items-center ml-[3.7rem] mb-4 w-full">
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
              <div className="flex justify-start items-center w-[100%] ml-[1.2rem]">
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

            <div className="departure mb-6 ml-12 flex items-center w-[91%]">
              <label htmlFor="departure" className="mr-4">
                Departure:{" "}
              </label>
              <input
                type="date"
                id="departure"
                ref={departureDate}
                className="flex-grow px-2 py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin mr-5"
              />
              <input
                type="time"
                id="departure"
                ref={departureTime}
                className="flex-grow px-[0.15rem] py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin mr-[56px]"
              />
            </div>

            <div className="flex justify-between items-center w-[90%] mb-6">
              <label className="mr-4 ml-[4.5rem]" htmlFor="perCap">
                Person:{" "}
              </label>
              <input
                id="perCap"
                ref={person}
                className="flex-grow px-3 py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin"
                type="number"
                max={2}
                placeholder="required no. of seats"
              />
            </div>

            <div className="flex justify-between items-center w-[90%] mb-6">
              <label className="mr-4 ml-3" htmlFor="phNo">
                Phone Number:{" "}
              </label>
              <input
                id="phNo"
                ref={phoneNumber}
                className="flex-grow px-3 py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin"
                type="number"
                max={2}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="flex items-center w-full mb-4">
              <label className="mr-4" htmlFor="M-W_only">
                Men Only:{" "}
              </label>
              <input type="radio" name="M-W_only" />
            </div>
            <div className="flex items-center w-full mb-6">
              <label className="mr-4" htmlFor="M-W_only">
                Women Only:{" "}
              </label>
              <input type="radio" name="M-W_only" />
            </div>

            <div className="flex justify-between items-center w-[73%] mb-6 ml-[4.9rem]">
              <label className="mr-4" htmlFor="Fare">
                Fare:{" "}
              </label>
              <input
                id="Fare"
                ref={fare}
                className="flex-grow px-3 py-1 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu font-thin"
                type="number"
                placeholder="₹100"
                disabled
              />
            </div>

            <div>
              <button
                className="bg-[#2c2c2c] hover:bg-[#0c0c0c] hover:shadow-xl transition duration-200 text-white px-4 py-2 rounded-md mb-4 mr-4"
                onClick={calculateRoute}
              >
                Calculate Route
              </button>
              <button
                className="bg-gray-300 text-gray-700 hover:bg-[#d8d8d8] hover:text-[#222222] hover:shadow-sm transition duration-300 px-4 py-2 rounded-md mr-4"
                onClick={clearRoute}
              >
                Clear Route
              </button>
              <button
                className="bg-[#222222] text-white px-4 py-2 rounded-md"
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                }}
              >
                Center Map
              </button>
            </div>
          </div>

          {/* <span>
            <button
              className="bg-red-700 hover:bg-[#ff0000] transition-colors duration-200 text-white px-4 py-2 rounded-md mt-4 cursor-pointer text-center"
              onClick={() => {
                console.log("Cancel Ride or Other Action");
              }}
            >
              Cancel Ride
            </button>
          </span> */}

          <div className="flex justify-between mt-2 px-1">
            <div>Distance: {distance}</div>
            <div>Duration: {duration}</div>
          </div>
          <div
            className="bg-[#2c2c2c] hover:bg-[#0c0c0c] hover:shadow-xl transition duration-200 text-white px-4 py-4 rounded-md mt-10 mr-4 cursor-pointer text-center"
            onClick={handleCreateRide}
          >
            Create Your Ride
          </div>
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

export default CreateRide;
