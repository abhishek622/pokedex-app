import React, { Component } from "react";
import {
  ThemeProvider,
  Pagination,
  Stack,
  CssBaseline,
  Grid,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { DEFAULT_BASE_URL } from "../../services/api/Api.constant";
import PokeCard from "./components/poke-card/PokeCard";
import Header from "./components/header/Header";
import { fetchData } from "../../services/requests";
import { localStrings } from "../../shared/constants";
import "./HomeScreen.css";

const paginationStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
  marginRight: "7%",
};

const theme = createTheme({
  typography: {
    fontFamily: "Carter One, cursive",
    h3: {
      fontSize: "5em",
      backgroundImage: "conic-gradient(from 60deg, red, yellow, green,blue) ",
      backgroundClip: "text",
      color: "transparent",
    },
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokePerPage: 20,
      pokeData: [],
      pokeUrlsPerPagination: [DEFAULT_BASE_URL],
      isLoading: true,
      page: 1,
      allPage: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchUrls();
  }

  fetchUrls = async () => {
    let fetchedUrl = await fetchData(DEFAULT_BASE_URL);
    let data = await fetchedUrl.json();

    let urls = [this.state.pokeUrlsPerPagination, data.next];
    const dataLength = Math.ceil(data.count / this.state.pokePerPage);

    for (let i = 1; i < dataLength; i++) {
      fetchedUrl = await fetchData(data.next);
      data = await fetchedUrl.json();

      urls = [...urls, data.next];
    }

    this.setState({
      pokeUrlsPerPagination: [...urls],
      allPage: dataLength,
    });
  };

  fetchData = async () => {
    const { pokeUrlsPerPagination, page } = this.state;
    this.setState({ isLoading: true });
    let responsePokeData = await fetchData(pokeUrlsPerPagination[page - 1]);
    responsePokeData = await responsePokeData.json();

    this.setState({ pokeData: [], isLoading: false });
    await this.getPokeData(responsePokeData.results);
  };

  getPokeData = async (res) => {
    let data = [];
    for (let item of res) {
      let result = await fetchData(item.url);
      result = await result.json();

      data = [...data, result];
    }
    await this.setState({ pokeData: data });
  };

  handleChange = async (event, value) => {
    await this.setState({ page: value });
    this.fetchData();
  };

  renderHeader = () => {
    return (
      <div>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </div>
    );
  };

  renderPagination = () => {
    const { page, allPage } = this.state;
    return (
      <div style={paginationStyle}>
        <Stack spacing={2}>
          <Pagination
            count={allPage}
            page={page}
            variant="outlined"
            color="secondary"
            onChange={this.handleChange}
          />
        </Stack>
      </div>
    );
  };

  renderPokeCards = () => {
    const { pokeData } = this.state;
    return (
      <div>
        <Grid container spacing={3} id="grids">
          {pokeData.map((item) => {
            return (
              <Grid item xs={3} key={item.id}>
                {this.state.isLoading ? (
                  <h1>{localStrings.loading}</h1>
                ) : (
                  <PokeCard data={item} />
                )}
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderPagination()}
        {this.renderPokeCards()}
      </div>
    );
  }
}

export default HomeScreen;
