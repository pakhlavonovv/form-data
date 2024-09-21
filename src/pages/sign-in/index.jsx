import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "@utilis/validations";
import { Notification } from "@utilis/notification";
import { auth } from "@service";
const Index = () => {
   const navigate = useNavigate();
   const initialValues = {
      phone_number: "",
      password: "",
   };

   const handleSumbit = async (value) => {
      try {
         const response = await auth.sign_in(value);
         let access_token = response?.data?.data?.tokens?.access_token;
         localStorage.setItem("access_token", access_token);
         console.log(response)
         if (response.status === 201) {
            navigate("/admin-layout/category");
         }
      } catch (error) {
         console.log(error?.message ,"err");
         Notification({
            title: "Password or Name is wrong",
            type: "error",
         });
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
            
         ></ToastContainer>
         <div className="row">
            <div className="col-3 offset-4 " style={{marginTop: "100px"}}>
               <div className="card">
                  <div className="card-header">
                     <h1 className="text-center text-4xl"><b>Sign In</b></h1>
                  </div>
                  <div className="card-body">
                     <Formik
                        onSubmit={handleSumbit}
                        initialValues={initialValues}
                        validationSchema={signInValidationSchema}
                     >
                        <Form id="sigin-in">
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
                     <Box>
                        <p className="text-center text-sm text-red-500">
                           Don’t have an account?
                        </p>
                        <center>

                        <NavLink
                           to="/sign-up"
                           className="my-3.5 text-sm text-start"
                           color="success"
                        >
                           Sign Up here
                        </NavLink>
                        </center>
                     </Box>
                     <Button
                        variant="contained"
                        fullWidth
                        className="mt-3"
                        color="success"
                        form="sigin-in"
                        type="submit"
                     >
                        Sign In
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Index;
