import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import usePokemonDetailsPage from "./usePokemonDetailsPage";

const PokemonDetailsPage = () => {
    const {
      loading,
    typeDescription,
    displayName,
    displaySprite,
    showShiny,
    toggleShiny,
    showBack,
    toggleBack,
  } = usePokemonDetailsPage();

  return (
    <Box
      sx={{ flexGrow: 1 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin={4}
    >
      <Card>
        <CardMedia component="img" image={displaySprite} alt="pokemon sprite" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {typeDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <FormControl component="fieldset">
            <FormGroup aria-label="sprite controls" row>
              <Box display="flex" alignItems="baseline" margin={1}>
                <Typography>Normal</Typography>
                <Switch
                  value={showShiny}
                  onChange={toggleShiny}
                  color="primary"
                />
                <Typography>Shiny</Typography>
              </Box>
              <Box display="flex" alignItems="baseline" margin={1}>
                <Typography>Front</Typography>
                <Switch
                  value={showBack}
                  onChange={toggleBack}
                  color="primary"
                />
                <Typography>Back</Typography>
              </Box>
            </FormGroup>
          </FormControl>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PokemonDetailsPage;
