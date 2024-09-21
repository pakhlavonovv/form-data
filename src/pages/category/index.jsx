import React, { useEffect, useState } from "react";
import { category } from "@service";
import { Button } from "@mui/material";
import { CategoryModal } from "@components";
import BasicTable from "../../components/category-table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom"; 

const Index = () => {
   const [open, setOpen] = useState(false);
   const [categories, setCategories] = useState([]);
   const [update, setUpdate] = useState({});
   const navigate = useNavigate(); 

   const handleClose = () => {
      setOpen(false);
   };
   const openModal = async () => {
      setOpen(true);
   };
   const getCategory = async () => {
      const resp = await category.get()
      if (resp.status === 200) {
         const data = resp.data?.data?.categories
         setCategories(data);
      }
   };

   const deleteCategory = (id) => async () => {
      const resp = await category.delete(id);
      if (resp.status === 200) {
         getCategory();
      }
   };

   const editCategory = (item) => () => {
      openModal();
      setUpdate(item);
   };

   const goToSubCategory = (id) => () => {
      navigate(`/admin-layout/sub-category?categoryId=${id}`); 
   };

   useEffect(() => {
      getCategory();
   }, []);

   return (
      <div>
         <CategoryModal open={open} handleClose={handleClose} getData={getCategory} update={update} />
         <Button
            variant="contained"
            color="primary"
            onClick={openModal}
            className="mb-3"
         >
            Add Category
         </Button>
         <BasicTable hederData={["T/R", "Category Name", "Actions"]}>
            {categories?.map((row, index) => (
               <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
               >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center" className="flex gap-3">
                     <Button
                        variant="contained"
                        color="success"
                        className=" w-[80px] h-[40px]"
                        onClick={editCategory(row)}
                     >
                        Edit
                     </Button>
                     <Button
                        variant="contained"
                        color="error"
                        style={{marginLeft:"10px"}}
                        className=" w-[80px] h-[40px]"
                        onClick={deleteCategory(row.id)}
                     >
                        Delete
                     </Button>
                     <Button
                        variant="contained"
                        color="primary"
                        style={{marginLeft:"10px"}}
                        className=" w-[60px] h-[40px]"
                        onClick={goToSubCategory(row.id)}
                     >
                        <i className="fa-solid fa-arrow-right-long"></i>
                     </Button>
                  </TableCell>
               </TableRow>
            ))}
         </BasicTable>
      </div>
   );
};

export default Index;
