import React, { useState } from "react";
import { mint, uploadToIPFS } from "../utils";

const DashboardForm = () => {
    const [step, setStep] = useState(1);

    const [image, setImage] = useState("");

    const [formInput, setFormInput] = useState({
        name: "",
        venue: "",
        date: "",
        image: "",
        price: "",
        supply: "",
        isPrivateEvent: false,
    });

    async function formURI() {
        const { name, venue, date, price, supply, image } = formInput;
        if (!name || !venue || !date || !price || !supply) return;
        const data = JSON.stringify({ name, venue, date, image });
        const files = [new File([data], "data.json")];
        const metaCID = await uploadToIPFS(files);
        const url = `https://ipfs.io/ipfs/${metaCID}/data.json`;
        console.log(url);
        return url;
    }

    async function onClickMint() {
        const NftURI = await formURI();
        await mint(
            formInput.price,
            formInput.supply,
            formInput.isPrivateEvent,
            NftURI
        );
    }

    async function handleFileChange(e) {
        const inputFile = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(inputFile);

        const inputFileName = e.target.files[0].name;
        const files = [new File([inputFile], inputFileName)];
        const metaCID = await uploadToIPFS(files);
        const url = `https://ipfs.io/ipfs/${metaCID}/${inputFileName}`;
        console.log(url);
        setFormInput({
            ...formInput,
            image: url,
        });
    }

    function handleNext() {
        if (step < 3) {
            setStep((prevStep) => prevStep + 1);
        }
    }

    function handlePrevious() {
        if (step > 1) {
            setStep((prevStep) => prevStep - 1);
        }
    }

    async function handleSubmit() {
        // Implement the logic to submit the form data.
        await onClickMint();
    }

    return (
        <div className="antialiased sans-serif">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className={step === "complete" ? "hidden" : "block"}>
                    {/* ... */}
                    <div class="text-lg font-bold text-white leading-tight">
                        Create Event
                    </div>
                    <div class="py-10">
                        <div class="mb-5 text-center">
                            <div class="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                                <img
                                    id="image"
                                    src={image || "cat.gif"}
                                    class="object-cover w-full h-32 rounded-full"
                                />
                            </div>

                            <label
                                for="fileInput"
                                type="button"
                                class="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <rect
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                        stroke="none"
                                    ></rect>
                                    <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                                    <circle cx="12" cy="13" r="3" />
                                </svg>
                                Browse Photo
                            </label>

                            <div class="mx-auto w-48 text-gray-500 text-xs text-center mt-1">
                                Click to add profile picture
                            </div>

                            <input
                                name="photo"
                                id="fileInput"
                                accept="image/*"
                                class="hidden"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div class="mb-5">
                            {/* <label for="firstname" class="font-bold mb-1 text-white block">Username</label>
							<input type="text"
								class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
								placeholder="Enter your firstname..."
                onChange={(e) =>
                  setFormInput({
                      ...formInput,
                      name: e.target.value,
                  })
              }
              value={formInput.name}
              /> */}
                        </div>

                        <div class="mb-5">
                            <label
                                for="email"
                                class="font-bold mb-1 text-white block"
                            >
                                Event Name
                            </label>
                            <input
                                type="email"
                                class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                placeholder="Enter your event name..."
                                onChange={(e) =>
                                    setFormInput({
                                        ...formInput,
                                        name: e.target.value,
                                    })
                                }
                                value={formInput.name}
                            />
                        </div>
                        <div class="mb-5">
                            <label
                                for="firstname"
                                class="font-bold mb-1 text-white block"
                            >
                                Venue
                            </label>
                            <input
                                type="text"
                                class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                placeholder="Enter your venue"
                                onChange={(e) =>
                                    setFormInput({
                                        ...formInput,
                                        venue: e.target.value,
                                    })
                                }
                                value={formInput.venue}
                            />
                        </div>
                        <div class="mb-5">
                            <label
                                for="firstname"
                                class="font-bold mb-1 text-white block"
                            >
                                Date
                            </label>
                            <input
                                type="text"
                                class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                placeholder="Enter date"
                                onChange={(e) =>
                                    setFormInput({
                                        ...formInput,
                                        date: e.target.value,
                                    })
                                }
                                value={formInput.date}
                            />
                        </div>
                        <div class="mb-5">
                            <label
                                for="firstname"
                                class="font-bold mb-1 text-white block"
                            >
                                Price
                            </label>
                            <input
                                type="text"
                                class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                placeholder="Enter date"
                                onChange={(e) =>
                                    setFormInput({
                                        ...formInput,
                                        price: e.target.value,
                                    })
                                }
                                value={formInput.price}
                            />
                        </div>
                        <div class="mb-5">
                            <label
                                for="firstname"
                                class="font-bold mb-1 text-white block"
                            >
                                Supply
                            </label>
                            <input
                                type="text"
                                class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                placeholder="Enter supply"
                                onChange={(e) =>
                                    setFormInput({
                                        ...formInput,
                                        supply: e.target.value,
                                    })
                                }
                                value={formInput.supply}
                            />
                        </div >
                        <div class="mb-5">
                            <label
                                for="firstname"
                                class="font-bold mb-1 text-white block"
                            >
                                Event type
                            </label>

                            <div class="d-flex">
                                <input
                                    type="radio"
                                    name="event-type"
                                    id="public"
                                    class=""
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            isPrivateEvent: false,
                                        })
                                    }
                                    value={formInput.isPrivateEvent}
                                />
                                <label for="public" class="text-white">
                                    Open Event
                                </label>

                                <input
                                    type="radio"
                                    name="event-type"
                                    id="private"
                                    class=""
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            isPrivateEvent: true,
                                        })
                                    }
                                    isPrivateEvent={formInput.isPrivateEvent}
                                />
                                <label for="private" class="text-white">
                                    Private Event
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ... */}
                </div>

                <div className={step === "complete" ? "block" : "hidden"}>
                    {/* ... */}
                    <div class="text-lg font-bold text-white leading-tight">
                        Your Username
                    </div>{" "}
                    {/* ... */}
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 py-5 shadow-md">
                    <div className="max-w-3xl mx-auto px-4">
                        <div className="flex justify-between">
                            <div className="w-1/2">
                                <button
                                    onClick={handlePrevious}
                                    className={
                                        step > 1
                                            ? "w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border"
                                            : "hidden"
                                    }
                                >
                                    Previous
                                </button>
                            </div>
                            <div className="w-1/2 text-right">
                                {step < 3 && (
                                    <button
                                        onClick={handleNext}
                                        className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"
                                    >
                                        Next
                                    </button>
                                )}
                                {step === 3 && (
                                    <button
                                        onClick={handleSubmit}
                                        className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"
                                    >
                                        Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* / Bottom Navigation */}
            </div>
        </div>
    );
};

export default DashboardForm;
