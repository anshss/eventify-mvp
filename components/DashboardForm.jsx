import React, { useState } from 'react';

const DashboardForm = () => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState(false);
  const [image, setImage] = useState('');

  const passwordStrengthText = getPasswordStrengthText();

  function getPasswordStrengthText() {
    // Implement the logic to check the password strength and return a corresponding text.
    // You can use the password state variable to check the password strength.
    // Example: if (password meets certain criteria) return 'Strong password';
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
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

  function handleSubmit() {
    // Implement the logic to submit the form data.
  }

  return (
    <div className="antialiased sans-serif">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className={step === 'complete' ? 'hidden' : 'block'}>
          {/* ... */}
          <div class="text-lg font-bold text-white leading-tight">Create Event</div>
          <div class="py-10">	
						<div class="mb-5 text-center">
							<div class="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
								<img id="image" class="object-cover w-full h-32 rounded-full"  />
							</div>
							
							<label 
								for="fileInput"
								type="button"
								class="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
									<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
									<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
									<circle cx="12" cy="13" r="3" />
								</svg>						
								Browse Photo
							</label>

							<div class="mx-auto w-48 text-gray-500 text-xs text-center mt-1">Click to add profile picture</div>

							<input name="photo" id="fileInput" accept="image/*" class="hidden" type="file" />
						</div>

						<div class="mb-5">
							<label for="firstname" class="font-bold mb-1 text-white block">Username</label>
							<input type="text"
								class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
								placeholder="Enter your firstname..."/>
						</div>

						<div class="mb-5">
							<label for="email" class="font-bold mb-1 text-white block">Event Name</label>
							<input type="email"
								class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
								placeholder="Enter your wvent name..."/>
						</div>
            <div class="mb-5">
							<label for="firstname" class="font-bold mb-1 text-white block">Venue</label>
							<input type="text"
								class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
								placeholder="Enter your venue"/>
						</div>
            <div class="mb-5">
							<label for="firstname" class="font-bold mb-1 text-white block">Date</label>
							<input type="text"
								class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
								placeholder="Enter date"/>
						</div>
            <div class="mb-5">
							<label for="firstname" class="font-bold mb-1 text-white block">Price</label>
							<input type="text"
								class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
								placeholder="Enter date"/>
						</div>
            <div class="mb-5">
							<label for="firstname" class="font-bold mb-1 text-white block">Supply</label>
							<input type="text"
								class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
								placeholder="Enter date"/>
						</div>

					</div>
          {/* ... */}
        </div>

        <div className={step === 'complete' ? 'block' : 'hidden'}>
          {/* ... */}
          <div class="text-lg font-bold text-white leading-tight">Your Username</div>          {/* ... */}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 py-5 shadow-md">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="w-1/2">
                <button
                  onClick={handlePrevious}
                  className={step > 1 ? 'w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border' : 'hidden'}
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
