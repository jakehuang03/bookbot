import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { useState } from "react";

function Question ({user, question}) {
  return (
    <Card sx={{display:'flex', m: 1}}>
      <CardHeader
        avatar={<Avatar src={user?.picture} />}
      />
        <CardContent>
          <Typography variant="h5" align="left">
            {question}
          </Typography>
        </CardContent>
    </Card>
  );
};
export default Question;
