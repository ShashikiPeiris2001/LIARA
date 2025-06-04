// // import { useState } from "react";
// // import emailjs from "@emailjs/browser";

// // const ResetPassword = () => {
// //   const [email, setEmail] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [message, setMessage] = useState<string | null>(null);

// //   const sendOTP = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setMessage(null);

// //     const generatedOtp = generateOTP();
// //     setOtp(generatedOtp);

// //     const templateParams = {
// //       to_email: email,
// //       otp_code: generatedOtp, // This is your OTP
// //     };

// //     try {
// //       await emailjs.send(
// //         "service_dlcz2k8",   // Replace with your EmailJS service ID
// //         "template_6otnjwa",  // Replace with your EmailJS template ID
// //         templateParams,
// //         "E9ytynQz2SSjgEqnx"    // Replace with your EmailJS public key
// //       );

// //       setMessage("OTP has been sent to your email.");
// //     } catch (error) {
// //       console.error("EmailJS error:", error);
// //       setMessage("Error sending OTP. Please try again.");
// //     }


    
// //   };

// //   const generateOTP = (): string => {
// //     return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
// //   };
  
  

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //       <div className="bg-white shadow-lg rounded-lg p-8 w-96">
// //         <h1 className="text-2xl font-bold mb-6 text-center">RESET PASSWORD</h1>
// //         <hr className="mb-6" />
// //         <form className="space-y-6" onSubmit={sendOTP}>
// //           <div>
// //             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //               Email
// //             </label>
// //             <input
// //               type="email"
// //               id="email"
// //               name="email"
// //               placeholder="Enter your email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //               required
// //             />
// //           </div>

// //           {message && <p className="text-green-500 text-sm text-center">{message}</p>}

// //           <button
// //             type="submit"
// //             className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
// //           >
// //             Send OTP
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResetPassword;

// // // OTP Generator Function
// // const generateOTP = (): string => {
// //   return Math.floor(100000 + Math.random() * 900000).toString();
// // };
// import { useState } from "react";
// import emailjs from "@emailjs/browser";
// import { useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState<string | null>(null);

//   // Function to generate OTP
//   const generateOTP = (): string => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   // Function to send OTP via EmailJS
//   const sendOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);

//     const newOtp = generateOTP();
//     setGeneratedOtp(newOtp); // Store OTP in state


//     console.log(newOtp);

//     const templateParams = {
//       to_email: email,
//       otp_code: newOtp, // This is the generated OTP
//     };

//     try {
//       await emailjs.send(
//         "service_u65mnzl", // Replace with your EmailJS service ID
//         "template_lxg8kx6", // Replace with your EmailJS template ID
//         templateParams,
//         "Qq7uzAQEzMCTxYTMQ" // Replace with your EmailJS public key
//       );

//       setOtpSent(true);
//       setMessage(`OTP has been sent to ${email}`);
//     } catch (error) {
//       console.error("EmailJS error:", error);
//       setMessage("Error sending OTP. Please try again.");
//     }
//   };

//   // Function to verify OTP
//   const verifyOTP = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (otp === generatedOtp) {
//       setOtpVerified(true);
//       setMessage("OTP verified successfully! You can now reset your password.");
//     } else {
//       setMessage("Invalid OTP. Please try again.");
//     }
//   };

//   // Function to reset password
//   const navigate = useNavigate(); // ✅ Declare useNavigate inside the component

//   // const resetPassword = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   if (password !== confirmPassword) {
//   //     setMessage("Passwords do not match!");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch("http://localhost:5005/api/Users/reset-password", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ email, newPassword: password }),
//   //     });
  
//   //     const data = await response.json();

      
  
//   //     if (response.ok) {
//   //       setMessage("Your password has been reset successfully!");
//   //       setTimeout(() => {
//   //         navigate("/login"); // Redirect to login page
//   //       }, 2000);
//   //     } else {
//   //       setMessage(data.message || "Failed to reset password.");
//   //     }
//   //   } catch (error) {
//   //     setMessage("Server error. Please try again.");
//   //   }
//   //   // Assuming password update API call here
//   //   setMessage("Your password has been reset successfully!");
//   //   setTimeout(() => {
//   //     navigate("/login"); // ✅ Redirect to login page after 2 seconds
//   //   }, 2000);
//   // };

//   const resetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match!");
//       return;
//     }
  
//     const requestData = { email, newPassword: password };
//     console.log("Submitted data:", requestData); // ✅ Log the submitted data
  
//     try {
//       const response = await fetch("http://localhost:5005/api/Users/reset-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         setMessage("Your password has been reset successfully!");
//         setTimeout(() => {
//           navigate("/login"); // Redirect to login page
//         }, 2000);
//       } else {
//         setMessage(data.message || "Failed to reset password.");
//       }
//     } catch (error) {
//       console.error("Error:", error); // ✅ Log any errors
//       setMessage("Server error. Please try again.");
//     }
//   };
  
  

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-96">
//         <h1 className="text-2xl font-bold mb-6 text-center">RESET PASSWORD</h1>
//         <hr className="mb-6" />

//         {/* Step 1: Enter Email & Send OTP */}
//         {!otpSent && (
//           <form className="space-y-6" onSubmit={sendOTP}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 required
//               />
//             </div>

//             {message && <p className="text-green-500 text-sm text-center">{message}</p>}

//             <button
//               type="submit"
//               className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Send OTP
//             </button>
//           </form>
//         )}

//         {/* Step 2: Enter OTP */}
//         {otpSent && !otpVerified && (
//           <form className="space-y-6" onSubmit={verifyOTP}>
//             <div>
//               <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 id="otp"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 required
//               />
//             </div>

//             {message && <p className="text-red-500 text-sm text-center">{message}</p>}

//             <button
//               type="submit"
//               className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Verify OTP
//             </button>
//           </form>
//         )}

//         {/* Step 3: Reset Password */}
//         {otpVerified && (
//           <form className="space-y-6" onSubmit={resetPassword}>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter new password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 placeholder="Confirm new password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 required
//               />
//             </div>

//             {message && <p className="text-green-500 text-sm text-center">{message}</p>}

//             <button
//               type="submit"
//               className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Reset Password
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // Function to generate OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Function to send OTP via EmailJS
  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const newOtp = generateOTP();
    setGeneratedOtp(newOtp); // Store OTP in state


    console.log(newOtp);

    const templateParams = {
      to_email: email,
      otp_code: newOtp, // This is the generated OTP
    };

    try {
      await emailjs.send(
        "service_u65mnzl", // Replace with your EmailJS service ID
        "template_lxg8kx6", // Replace with your EmailJS template ID
        templateParams,
        "Qq7uzAQEzMCTxYTMQ" // Replace with your EmailJS public key
      );

      setOtpSent(true);
      setMessage(`OTP has been sent to ${email}`);
    } catch (error) {
      console.error("EmailJS error:", error);
      setMessage("Error sending OTP. Please try again.");
    }
  };

  // Function to verify OTP
  const verifyOTP = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp === generatedOtp) {
      setOtpVerified(true);
      setMessage("OTP verified successfully! You can now reset your password.");
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  // Function to reset password
  const navigate = useNavigate(); // ✅ Declare useNavigate inside the component

  // const resetPassword = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     setMessage("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5005/api/Users/reset-password", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, newPassword: password }),
  //     });
  
  //     const data = await response.json();

      
  
  //     if (response.ok) {
  //       setMessage("Your password has been reset successfully!");
  //       setTimeout(() => {
  //         navigate("/login"); // Redirect to login page
  //       }, 2000);
  //     } else {
  //       setMessage(data.message || "Failed to reset password.");
  //     }
  //   } catch (error) {
  //     setMessage("Server error. Please try again.");
  //   }
  //   // Assuming password update API call here
  //   setMessage("Your password has been reset successfully!");
  //   setTimeout(() => {
  //     navigate("/login"); // ✅ Redirect to login page after 2 seconds
  //   }, 2000);
  // };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
  
    const requestData = { email, newPassword: password };
    console.log("Submitted data:", requestData); // ✅ Log the submitted data
  
    try {
      const response = await fetch("http://localhost:5005/api/Users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Your password has been reset successfully!");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 2000);
      } else {
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error:", error); // ✅ Log any errors
      setMessage("Server error. Please try again.");
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">RESET PASSWORD</h1>
        <hr className="mb-6" />

        {/* Step 1: Enter Email & Send OTP */}
        {!otpSent && (
          <form className="space-y-6" onSubmit={sendOTP}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {message && <p className="text-green-500 text-sm text-center">{message}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {otpSent && !otpVerified && (
          <form className="space-y-6" onSubmit={verifyOTP}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {message && <p className="text-red-500 text-sm text-center">{message}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {otpVerified && (
          <form className="space-y-6" onSubmit={resetPassword}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {message && <p className="text-green-500 text-sm text-center">{message}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
