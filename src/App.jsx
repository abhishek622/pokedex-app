import React, { useEffect, useState } from "react";
import { Button, CssBaseline, Grid } from "@mui/material";
import PokeCard from "./components/PokeCard";
import Header from "./components/Header";
import { ThemeProvider} from "@mui/material";
import { createTheme } from '@mui/material/styles';

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const theme=createTheme({
	typography:{
	    fontFamily:"Carter One, cursive",
		h3: {
        fontSize:'5em',
		backgroundImage:'conic-gradient(from 60deg, red, yellow, green,blue) ',
        backgroundClip: 'text',
        color: 'transparent'
		}
	}
})

function App() {
	const [pokeData, setPokeData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [url, setUrl] = useState(baseUrl);
	const [nextUrl, setNextUrl] = useState();
	const [prevUrl, setPrevUrl] = useState();

	// handle pagination buttons
	// const handleChange = (event, value) => {
	// 	if (value === page) return;
	// 	setLoading(true);
	// 	setPage(value);
	// 	if (value === 1) {
	// 		setUrl(baseUrl);
	// 	} else {
	// 		setUrl(`${baseUrl}?offset=${(value - 1) * 20}&limit=20`);
	// 	}
	// 	setLoading(false);
	// };

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
		setPokeData([]);
		fetchData();
	}, [url]);

	return (
		<div>
			<CssBaseline />
			<ThemeProvider theme={theme}>
			  <Header />
			</ThemeProvider>
			<Grid container spacing={3}>
				{pokeData.map((item) => {
					return (
						<Grid item xs={3} key={item.id}>
							{isLoading ? <h1>loading ...</h1> : <PokeCard data={item} />}
						</Grid>
					);
				})}
			</Grid>
			<div style={{ textAlign: "center" }}>
				<Button
					onClick={() => {
						setUrl(prevUrl);
					}}
					variant="contained"
					disabled={prevUrl === null}
				>
					Prev
				</Button>
				<Button
					onClick={() => {
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
