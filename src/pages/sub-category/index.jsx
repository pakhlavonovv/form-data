import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Pagination, Modal, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom'; 

const SubCategory = () => {
   const [searchParams] = useSearchParams();
   const categoryId = searchParams.get('categoryId'); 
   const [subCategories, setSubCategories] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [open, setOpen] = useState(false); 
   const [newSubCategoryName, setNewSubCategoryName] = useState('');

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const getSubCategories = async () => {
      const data = [
         { id: 1, name: 'SubCategory 1', categoryId: 1 },
         { id: 2, name: 'SubCategory 2', categoryId: 1 },
         { id: 3, name: 'SubCategory 3', categoryId: 2 }
      ];

      const filteredData = data.filter(subCategory => subCategory.categoryId === parseInt(categoryId) && subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSubCategories(filteredData);
      setTotalPages(1); 
   };

   const deleteSubCategory = async (id) => {
      const filteredData = subCategories.filter(subCategory => subCategory.id !== id);
      setSubCategories(filteredData);
   };

   const handlePageChange = (event, value) => {
      setPage(value);
   };

   const handleSearch = (event) => {
      setSearchTerm(event.target.value);
   };

   const createSubCategory = async () => {
      const newSubCategory = {
         id: subCategories.length + 1, // Fake id
         name: newSubCategoryName,
         categoryId: parseInt(categoryId)
      };
      setSubCategories([...subCategories, newSubCategory]); 
      setNewSubCategoryName(''); 
      handleClose(); 
   };

   useEffect(() => {
      getSubCategories();
   }, [categoryId, searchTerm, page]);

   return (
      <div>
         <h2>Sub-Categories for Category {categoryId}</h2>
         <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px', marginTop: "20px" }}>
            Add Sub-Category
         </Button>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Sub-Category Name</TableCell>
                  <TableCell>Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {subCategories.map((subCategory, index) => (
                  <TableRow key={subCategory.id}>
                     <TableCell>{index + 1}</TableCell>
                     <TableCell>{subCategory.name}</TableCell>
                     <TableCell>
                        <Button
                           variant="contained"
                           color="success"
                           onClick={() => console.log('Edit sub-category')}
                        >
                           Edit
                        </Button>
                        <Button
                           variant="contained"
                           color="error"
                           style={{ marginLeft: '10px' }}
                           onClick={() => deleteSubCategory(subCategory.id)}
                        >
                           Delete
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            style={{ marginTop: '20px' }}
         />

         {/* Modal for adding new sub-category */}
         <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
               <h2>Add New Sub-Category</h2>
               <TextField
                  label="Sub-Category Name"
                  variant="outlined"
                  fullWidth
                  value={newSubCategoryName}
                  onChange={(e) => setNewSubCategoryName(e.target.value)}
                  style={{ marginBottom: '20px', marginTop: '20px' }}
               />
               <Button variant="contained" color="primary" onClick={createSubCategory}>
                  Create
               </Button>
            </Box>
         </Modal>
      </div>
   );
};

export default SubCategory;
