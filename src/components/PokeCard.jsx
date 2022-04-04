import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import PokeDialog from "./PokeDialog";

function PokeCard({ data }) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<img
					src={data.sprites.front_default}
					alt={data.name}
					height={160}
					width={160}
				/>
				<Typography variant="h6" gutterBottom>
					{data.id}: {data.name}
				</Typography>
				<Typography variant="body2" gutterBottom>
					XP: {data.base_experience}
				</Typography>
				<Button size="small" onClick={handleClickOpen}>
					Know More
				</Button>
			</div>
			<PokeDialog open={open} handleClose={handleClose} pokeDex={data} />
		</>
	);
}

export default PokeCard;
