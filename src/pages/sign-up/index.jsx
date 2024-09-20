import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "@utilis/validations";
import { Notification } from "@utilis/notification";
import { auth } from "@service";
const Index = () => {
   const navigate = useNavigate();
   const initialValues = {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
   };
   const handleSumbit = async (value) => {
      try {
         const response = await auth.sign_up(value);
         if (response.status === 201) {
            navigate("/sign-in");
         } else {
            Notification({
               title: "Password or Name is wrong",
               type: "error",
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="container">
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bouncer
         ></ToastContainer>
         <div className="row">
            <div className="col-3 offset-4 mt-5">
               <div className="card">
                  <div className="card-header">
                     <h1 className="text-center text-2xl">Sign Up</h1>
                  </div>
                  <div className="card-body">
                     <Formik
                        onSubmit={handleSumbit}
                        initialValues={initialValues}
                        validationSchema={signUpValidationSchema}
                     >
                        <Form id="sigin-up">
                           <Field
                              type="text"
                              name="first_name"
                              fullWidth
                              margin="normal"
                              label="First Name"
                              as={TextField}
                              helperText={
                                 <ErrorMessage
                                    name="first_name"
                                    component="p"
                                    className="text-red-500"
                                 />
                              }
                           />
                           <Field
                              type="text"
                              name="last_name"
                              fullWidth
                              margin="normal"
                              label="Last Name"
                              as={TextField}
                              helperText={
                                 <ErrorMessage
                                    name="last_name"
                                    component="p"
                                    className="text-red-500"
                                 />
                              }
                           />
                           <Field
                              type="text"
                              name="phone_number"
                              fullWidth
                              margin="normal"
                              label="Phone Number"
                              as={TextField}
                              helperText={
                                 <ErrorMessage
                                    name="phone_number"
                                    component="p"
                                    className="text-red-500"
                                 />
                              }
                           />
                           <Field
                              type="email"
                              name="email"
                              fullWidth
                              margin="normal"
                              label="Email"
                              as={TextField}
                              helperText={
                                 <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-500"
                                 />
                              }
                           />
                           <Field
                              type="password"
                              name="password"
                              margin="normal"
                              fullWidth
                              label="password"
                              as={TextField}
                              helperText={
                                 <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-500"
                                 />
                              }
                           />
                        </Form>
                     </Formik>
                     <Button
                        variant="contained"
                        fullWidth
                        className="mt-3"
                        color="success"
                        form="sigin-up"
                        type="submit"
                     >
                        Sign Up
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Index;
