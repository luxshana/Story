import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Typography, Card, CardContent } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function ButtonAppBar() {
  const navigate = useNavigate();
  const data = useLocation();
  console.log(data);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigate("/p"); // Replace "/profile" with the actual path of your profile page
  };

  const handleAvatarClick = () => {
    setAuth((prev) => !prev);
  };

  const [videos, setVideos] = useState([
    {
      id: 1,
      link: "https://www.youtube.com/embed/m_R4WOZtPEE?si=N_G8sDoQ8PHolvNy",
      head:'Real time practice',
      button:<FavoriteBorderIcon />,
      count: 88,
    },
    {
      id: 2,
      link: "https://www.youtube.com/embed/d-ayUCHOWJg?si=BqB1fcnSp3QnJVZQ",
      head:'Conersational',
      button:<FavoriteBorderIcon />,
      count: 504,
    },
    {
      id: 3,
      link: "https://www.youtube.com/embed/by1QAoRcc-U?si=dPkPJnkQakO_NVOk",
      head:'Basic Conversational',
      button:<FavoriteBorderIcon />,
      count: 67,
    },
    {
      id: 4,
      link: "https://www.youtube.com/embed/JB2zdeAmTpA?si=7kjj3UkxkJwpdXr6",
      head:'Beginners',
      button:<FavoriteBorderIcon />,
      count: 18,
    },
    {
      id: 5,
      link: "https://www.youtube.com/embed/5XWfavgmZoQ?si=CAOmxtx5s2OmhIv0",
      head:'Imporve spoken skills',
      button:<FavoriteBorderIcon />,
      count: 8,
    },
    {
      id: 6,
      link: "https://www.youtube.com/embed/w_ysxZqQoXg?si=nIetIjEGRsIfQ3hI",
      head:'Every day ',
      button:<FavoriteBorderIcon />,
      count: 38,

    },
   

  ]);
  const incrementCount = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === videoId) {
          const isFavorite = favoriteStatus[videoId] || false;
          const count = isFavorite ? video.count - 1 : video.count + 1;
          setFavoriteStatus((prevStatus) => ({
            ...prevStatus,
            [videoId]: !isFavorite,
          }));
          const updatedVideo = {
            ...video,
            count: count >= 0 ? count : 0,
          };
          localStorage.setItem(`videoCount_${videoId}`, updatedVideo.count.toString());
          return updatedVideo;
        }
        return video;
      })
    );
  };

  const [favoriteStatus, setFavoriteStatus] = useState({});

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#332941" }}>
      <AppBar position="static" sx={{ backgroundColor: "#332941" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            fontWeight={600}
            sx={{ flexGrow: 1,color: "#F8E559" }}
          >
            {/* Welcome {data.state} to our  */}
            Kids Story
          </Typography>
          <IconButton color="inherit" onClick={handleMenu}>
            <Avatar />
          </IconButton>
        </Toolbar>
      </AppBar>
      {auth && (
        <div>
          <Box sx={{ bgcolor: "#332941" }}>
          <Grid container spacing={2} sx={{ p: 3 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card sx={{ p: 3, m: 3,  bgcolor: "#332941" }}>
              <iframe
                width="100%"
                height="200"
                src={video.link}
                title={video.head}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <CardContent>
                
                <Typography gutterBottom variant="h5" component="div" sx={{color:"#F8E559",textAlign:"center"}}>
                  {video.head}
                </Typography>
                <div sx={{display: 'flex',  justifyContent: 'space-between'}}>
                  
                <Typography
                  sx={{ color: favoriteStatus[video.id] ? "white" : "#F8E559",}}
                  onClick={() => incrementCount(video.id)}
                >
                  {video.button} {" "}
                  {video.count}
                </Typography>
                {/* <Typography variant="body2" sx={{color:"#F8E559"}}>
              
                </Typography> */}
                </div>
              </CardContent>
            </Card>
          </Grid>
          
        ))}
      </Grid>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleProfileClick}>Profile</MenuItem> */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </Box>
  );
}