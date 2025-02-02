import React from "react";
import { Typography, Stack, Button } from "@mui/material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment, instructions } =
    exerciseDetail;
  console.log("detail", exerciseDetail);
  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Stack
      gap="60px"
      sx={{
        flexDirection: { lg: "row" },
        p: "20px",
        alignItems: "center",
      }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack>
        <Typography
          variant="h4"
          sx={{ textTransform: "capitalize", color: "orangered" }}
        >
          {name}
        </Typography>
        <Typography variant="h5" mt={"10px"}>
          Instructions
        </Typography>
        <Stack my={"10px"}>
          {instructions?.map((item, index) => (
            <Stack key={index} direction={"row"} gap="10px">
              <Typography>●</Typography>{" "}
              <Typography key={index}>{item}</Typography>
            </Stack>
          ))}
        </Stack>
        <Stack gap="10px" mt={"10px"}>
          {extraDetail.map((item) => (
            <Stack
              key={item.name}
              direction="row"
              gap="24px"
              alignItems="center"
            >
              <Button
                sx={{
                  background: "#fff2db",
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                }}
              >
                <img
                  src={item.icon}
                  alt="bodyPart"
                  style={{ width: "50px", height: "50px" }}
                />
              </Button>
              <Typography
                sx={{ textTransform: "capitalize", fontStyle: "italic" }}
              >
                {item.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Detail;
