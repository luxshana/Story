import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Typography, Card, CardContent } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const data = useLocation();
  console.log(data);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [videos, setVideos] = useState([
    {
      id: 1,
      link: "https://www.youtube.com/embed/TpLhLBhFTag?si=Z2Qna5TC6SKswVCf",
      head: "The Ant and The Dove",
      button: <FavoriteBorderIcon />,
      count: 50,
    },
    {
      id: 2,
      link: "https://www.youtube.com/embed/htu5BAlmZzU?si=EUDyhFTklPdZ33mm",
      head: "Jenny and Friends Explore Castle Willow",
      button: <FavoriteBorderIcon />,
      count: 44,
    },
    {
      id: 3,
      link: "https://www.youtube.com/embed/r0G86-0-4O4?si=o71K0tH-0lQwObmg",
      head: "The two cats and a monkey",
      button: <FavoriteBorderIcon />,
      count: 43,
    },
    {
      id: 4,
      link: "https://www.youtube.com/embed/M82wSOcGYxc?si=eDq-gFzYjTDhXNi_",
      head: "The Hungry Mouse",
      button: <FavoriteBorderIcon />,
      count: 22,
    },
    {
      id: 5,
      link: "https://www.youtube.com/embed/TRImDimcXYk?si=fWoZtoLSb50-cv1q",
      head: "The Lion And The Cheetah",
      button: <FavoriteBorderIcon />,
      count: 67,
    },
    {
      id: 6,
      link: "https://www.youtube.com/embed/49DSZhHGLwo?si=59q29zbMOOGGltV_",
      head: "Colorless Bird",
      button: <FavoriteBorderIcon />,
      count: 32,
    },
    
  ]);

  const [favoriteStatus, setFavoriteStatus] = useState({});

  useEffect(() => {
    const updatedVideos = videos.map((video) => {
      const storedCount = localStorage.getItem(`videoCount_${video.id}`);
      const count = storedCount ? parseInt(storedCount) : video.count;
      return { ...video, count };
    });
    setVideos(updatedVideos);

    const initialFavoriteStatus = videos.reduce((status, video) => {
      const storedStatus = localStorage.getItem(`videoFavorite_${video.id}`);
      if (storedStatus !== null) {
        status[video.id] = JSON.parse(storedStatus);
      }
      return status;
    }, {});
    setFavoriteStatus(initialFavoriteStatus);
  }, []);

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
    navigate("/p");
  };

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

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#332941" }}>
        <AppBar position="static" sx={{ backgroundColor: "#332941" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            fontWeight={600}
            sx={{ flexGrow: 1, color: "#F8E559" }}>
            {/* Welcome {name} to our  */}
            Kids Story
          </Typography>
          <IconButton color="inherit" onClick={handleMenu}>
            <Avatar />
          </IconButton>
        </Toolbar>
      </AppBar>
      
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
      </Box>
    </Box>
  );
}