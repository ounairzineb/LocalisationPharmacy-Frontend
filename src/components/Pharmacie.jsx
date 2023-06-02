import React, { useEffect, useReducer, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Table, Space, Popconfirm } from "antd";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Input, InputLabel } from "@mui/material";
import axios from "axios";
import { UploadOutlined } from '@ant-design/icons';
import {   Upload } from 'antd';
import AddIcon from '@material-ui/icons/Add';

const theme = createTheme();

export default function Pharmacie() {
  const [loading, setLoad] = useState(false);
  const [zones, setZones] = useState([]);
  const [z, setZ] = useState("");
  const [pharmacies, setPharmacies] = useState([])
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
  const [file, setFile] = useState("");

  useEffect(() => {
    axios.get("/api/controller/zones/")
      .then((res) => {
        setZones(res.data)
      })
  }, [])

  // SAVE
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var d = {
      nom: data.get("nom"),
      adresse: data.get("adresse"),
      latitude: data.get("latitude"),
      longitude: data.get("longitude"),
      photos: file,
      zone: {
        id: z,
      }
    };
    console.log(JSON.stringify(d));
    if (!d) {
      alert(" vide !");
    } else {
      console.log(d)
      axios.post('/api/controller/pharmacies/save', d).then(() => {
        forceUpdate(); // rel
      })
    }
  };

  // all
  const getPh = async () => {
    setLoad(true);
    try {
      const res = await axios.get("/api/controller/pharmacies/");
      setPharmacies(
        res.data.map((row) => ({
          id: row.id,
          nom: row.nom,
          adresse: row.adresse,
          latitude: row.latitude,
          longitude: row.longitude,
          photos: row.photos,
          zone: row.zone.nom,
        }))
      );
    } catch (error) {
      console.error(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    getPh();
  }, [upTB]);

  // Delete
  function deleteUser(id) {
    axios.delete(`/api/controller/pharmacies/delete/${id}`).then((result) => {
      console.log("delete ", id);;
      forceUpdate(); // rel
    });
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "adresse",
      dataIndex: "adresse",
      key: "adresse",
    },
    {
      title: "latitude",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "longitude",
      dataIndex: "longitude",
      key: "longitude",
    },
    
    {
      title: "zone",
      dataIndex: "zone",
      key: "zone",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?">
            <Button variant="outlined">Update</Button>
          </Popconfirm>
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteUser(record.id)}>
            <Button variant="outlined">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      key: "action",
    },
  ];

  

  const handleChange = (event) => {
    setZ(event.target.value);
    console.log("setF ", event.target.value);
  };

  //photo
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFile(dataUrl);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "pink",
          backgroundImage: "linear-gradient(pink, blue)",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AddIcon sx={{ m: 3 }} />
          <Typography component="h1" variant="h5">
            Pharmacie
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="nom"
              label="nom"
              id="nom"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="adresse"
              label="adresse"
              id="adresse"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="latitude"
              label="latitude"
              id="latitude"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="longitude"
              label="longitude"
              id="longitude"
              autoFocus
            />

            <Upload
              name="photosModale"
              maxCount={1}
              listType="picture"
              action="http://localhost:3000/Pharmacie"
              accept=".png,.PNG,.JPEG,.jpeg,.jpg"
              beforeUpload={beforeUpload}
 
            >
             <Button
  icon={<UploadOutlined />}
  sx={{ color: 'white' }}
>
  Upload (Max: 1)
</Button>

            </Upload>
            <FormControl fullWidth style={{ marginTop: 14 }}>
              <InputLabel id="demo-simple-select-label">Zones</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={zones}
                label="zone"
                onChange={handleChange}
              >
                {zones?.map((item) => (
                  <MenuItem value={item.id}>{item.nom}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 3,
    mb: 2,
    backgroundColor: 'pink',
    '&:hover': {
      backgroundColor: 'lightpink',
    },
  }}
>
  <Typography variant="button" sx={{ color: 'white', fontWeight: 'bold' }}>
    Ajouter
  </Typography>
</Button>
          </Box>
        </Box>
      </Container>

      <Table
        columns={columns}
        loading={loading}
        dataSource={pharmacies}
        bordered
        handleChange={handleChange}
      />
    </ThemeProvider>
  );
}
