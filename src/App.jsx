import React, { useEffect, useState } from "react";
import { Button, CssBaseline, Grid } from "@mui/material";
import PokeCard from "./components/PokeCard";
import Header from "./components/Header";

function App() {
	const [pokeData, setPokeData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
	const [nextUrl, setNextUrl] = useState();
	const [prevUrl, setPrevUrl] = useState();

	const fetchData = async () => {
		setIsLoading(true);
		const res = await fetch(url);
		const data = await res.json();
		setNextUrl(data.next);
		setPrevUrl(data.previous);
		getPokeData(data.results);
		setIsLoading(false);
		// console.log(data.results);
	};

	const getPokeData = async (res) => {
		res.map(async (item) => {
			const result = await fetch(item.url);
			const data = await result.json();
			setPokeData((state) => {
				state = [...state, data];
				state.sort((a, b) => (a.id > b.id ? 1 : -1));
				return state;
			});
		});
	};

	useEffect(() => {
		fetchData();
	}, [url]);

	return (
		<div>
			<CssBaseline />
			<Header />
			<Grid container spacing={3}>
				{pokeData.map((item) => {
					return (
						<Grid item xs={3} key={item.id}>
							{isLoading ? (
								<h1>loading ...</h1>
							) : (
								<PokeCard
									name={item.name}
									id={item.id}
									src={item.sprites.front_default}
									data={item}
								/>
							)}
						</Grid>
					);
				})}
			</Grid>
			<div
				style={{
					textAlign: "center",
				}}
			>
				<Button
					onClick={() => {
						setPokeData([]);
						setUrl(prevUrl);
					}}
					variant="contained"
					disabled={prevUrl === null}
				>
					Prev
				</Button>
				<Button
					onClick={() => {
						setPokeData([]);
						setUrl(nextUrl);
					}}
					variant="contained"
				>
					Next
				</Button>
			</div>
		</div>
	);
}

export default App;
