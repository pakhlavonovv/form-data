import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ children, hederData = [] }) {
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  {
                     hederData?.map(el => <TableCell align="center"> {el} </TableCell>)
                  }
               </TableRow>
            </TableHead>
            <TableBody>
               {children}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
