import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import PokeDialog from "./PokeDialog";

function PokeCard({ name, id, src, data }) {
	const [open, setOpen] = useState(false);
	// const [pokeDex, setPokeDex] = useState(data);

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
				<img src={src} alt={name} height={160} width={160} />
				<Typography variant="h6" gutterBottom>
					{id}: {name}
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
