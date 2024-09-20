import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { categoryValidationSchema } from "@utilis/validations";
import { category } from "@service";
const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

export default function BasicModal({ open, handleClose, update, getData }) {
   const initialValues = {
      name: update?.name || "",
   };


   const handleSubmit = async (value) => {
      console.log(getData);

      try {
         if (update?.id) {
            await category.update(update.id, { name: value.name });
            handleClose();
            // window.location.reload();
            getData()
         } else {
            await category.create({ name: value.name });
            handleClose();
            // window.location.reload();
            getData()
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Formik
                  onSubmit={handleSubmit}
                  initialValues={initialValues}
                  validationSchema={categoryValidationSchema}
                  enableReinitialize
               >
                  <Form>
                     <FormControl fullWidth className="flex flex-col gap-3">
                        <Field
                           name="name"
                           label="category"
                           as={TextField}
                           fullWidth
                        />

                        <ErrorMessage
                           name="name"
                           component="p"
                           className="text-red-500"
                        />
                        <Button
                           type="submit"
                           variant="contained"
                           color="primary"
                        >
                           Save
                        </Button>
                     </FormControl>
                  </Form>
               </Formik>
            </Box>
         </Modal>
      </div>
   );
}
