//DO Import needed hooks and libraries
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function CountryDetails() {
  const { alpha3Code } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);

  const getCountryDetails = async () => {
    const response = await axios.get(
      `https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`
    );
    setCountryDetails(response.data);
  };

  useEffect(() => {
    getCountryDetails();
  }, [alpha3Code]);

  if (!countryDetails) {
    return <div>...Loading</div>;
  }
  const { name, alpha2Code, area } = countryDetails;
  const flagImg = `https://flagpedia.net/data/flags/w580/${alpha2Code.toLowerCase()}.png`;
  return (
    <Card className="country-card">
      <CardActionArea>
        <CardMedia
          component="img"
          image={flagImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name.common}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Area: {area}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CountryDetails;
