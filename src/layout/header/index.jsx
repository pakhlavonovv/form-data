import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu } from "@components";
const drawerWidth = 240;
const index = ({ handleDrawerToggle }) => {
   return (
      <AppBar
         position="fixed"
         sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
         }}
      >
         <Toolbar className="flex justify-between">
            <IconButton
               color="inherit"
               aria-label="open drawer"
               edge="start"
               onClick={handleDrawerToggle}
               sx={{ mr: 2, display: { sm: "none" } }}
            >
               <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
               Responsive drawer
            </Typography>
            <Menu />
         </Toolbar>
      </AppBar>
   );
};

export default index;
