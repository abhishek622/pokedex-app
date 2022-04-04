import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function PokeDialog({ open, handleClose, pokeDex }) {
	// console.log(pokeDex);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{!pokeDex ? (
				<h6>No data available</h6>
			) : (
				<>
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
					<DialogTitle id="alert-dialog-title">{pokeDex.name}</DialogTitle>
					<DialogContent>
						<img
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeDex.id}.svg`}
							alt=""
						/>

						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							{pokeDex.abilities.map((poke) => (
								<Typography
									variant="subtitle2"
									sx={{
										border: "1px solid black",
										padding: "5px",
									}}
									key={poke.ability.name}
								>
									{poke.ability.name}
								</Typography>
							))}
						</div>
						<List dense>
							{pokeDex.stats.map((poke, idx) => (
								<ListItem key={idx}>
									<ListItemText
										primary={poke.stat.name + " : " + poke.base_stat}
									/>
								</ListItem>
							))}
						</List>
					</DialogContent>
				</>
			)}
		</Dialog>
	);
}

export default PokeDialog;
