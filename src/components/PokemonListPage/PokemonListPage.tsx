import { styled } from "@mui/material/styles";
import { Box, Grid, Pagination, Paper, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import capitaliseString from "../../utils/capitaliseFirstLetter";
import usePokemonListPage, { Pokemon } from "./usePokemonListPage";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: "20px 20px 0 20px",
}));

const PokemonListPage = () => {
  const {
    paginatedFilteredPokemon,
    pagesCount,
    setPage,
    search,
    setSearch,
    page,
  } = usePokemonListPage();
  return (
    <Box
      sx={{ flexGrow: 1 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin={4}
    >
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        margin="normal"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid
        container
        columns={{ xs: 1, sm: 2, md: 4 }}
        bgcolor="red"
        pb={3}
        borderRadius={3}
      >
        {paginatedFilteredPokemon.map(
          (singlePokemon: Pokemon, index: number) => (
            <Grid item xs={1} sm={1} md={1} key={index}>
              <Item>
                <Link to={`/pokemon/?name=${singlePokemon.name}`}>
                  {capitaliseString(singlePokemon.name)}
                </Link>
              </Item>
            </Grid>
          )
        )}
      </Grid>
      <Box margin="10px">
        <Pagination
          count={pagesCount}
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, page: number) =>
            setPage(page)
          }
          variant="outlined"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PokemonListPage;
