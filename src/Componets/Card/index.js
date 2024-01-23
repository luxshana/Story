import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { dataSet } from "../../Constants/jsonData";
import { Button, Typography, Card, CardContent } from "@mui/material";

export default function RowAndColumnSpacing() {
  const [showComponents, setShowComponents] = useState(false);

  const handleClick = () => {
    setShowComponents(!showComponents);
  };
  return (
    <>
      <Grid container spacing={3}>
        {dataSet.map((data) => (
          <Grid item xs={12} md={4} key={data.id}>
            <Card sx={{ p: 3, m: 3, textAlign: "center", bgcolor: "#332941" }}>
              <CardContent>
                <Typography
                  fontWeight={600}
                  sx={{ p: 2, color: "#F8E559" }}
                  variant="h5"
                  key={data.id}>
                  {data.name}
                </Typography>
                {/* <Typography  sx={{}}>{data.Para}</Typography> */}
                <Box>
                  <img
                    key={data.id}
                    src={data.Para}
                    alt="Mas Logo"
                    style={{
                      Width: "100%",
                      height: "30vh",

                      border: "2px  #D9D9D9",
                    }}
                  />
                </Box>
                <Button
                  href={data.href}
                  variant="contained"
                  fullWidth
                  sx={{
                    m: 2,
                    bgcolor: "#3B3486",
                    color: "#F8E559",
                    "&:hover": {
                      bgcolor: "#5A549E",
                      color: "#FFF",
                    },
                  }}>
                  view story
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
