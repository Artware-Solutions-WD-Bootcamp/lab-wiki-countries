//DO Import needed hooks and libraries
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CountriesList() {
  //DO Create state
  const [countriesList, setcountriesList] = useState([]);

  //DO Async function to obtain countries list
  const getCountriesList = async () => {
    const response = await axios.get(
      'https://ih-countries-api.herokuapp.com/countries'
    );
    setcountriesList(response.data);
  };

  //DO Call getCountriesList function
  useEffect(() => {
    getCountriesList();
  }, []);

  //DO Map the array and return a table with links
  return (
    <div className="countries-list">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Flag</TableCell>
              <TableCell>a3C</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Area</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countriesList.map((eachCountry, index) => {
              const { name, alpha3Code, region, area } = eachCountry;
              const flagImg = `https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`;
              return (
                <TableRow
                  key={index + alpha3Code}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <img src={flagImg} alt={name.common} />
                  </TableCell>
                  <TableCell>
                    <Link to={`/countries/${alpha3Code}`}>
                      {name.common}
                    </Link>
                  </TableCell>
                  <TableCell>{name.common}</TableCell>
                  <TableCell>{region}</TableCell>
                  <TableCell align="right">{area}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CountriesList;
