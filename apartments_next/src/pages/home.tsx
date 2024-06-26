import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import {prisma} from '../lib/prisma';
import FilterForm from '../components/FilterForm';
import ApartmentTable from '../components/ApartmentTable';
import { Apartment } from '@/types/types';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Navbar from '@/components/NavBar';
import { useRouter } from 'next/router';

interface HomeProps {
  apartments: Apartment[];
}

const Home = ({ apartments: initialApartments }: HomeProps) => {
  const router = useRouter()
  const {data: session, status} = useSession()
  console.log('what is sesh: ', session)
  if(session === undefined){
    router.push('/login')
  }
  const [apartments, setApartments] = useState<Apartment[]>(initialApartments);

  const handleFilter = async (filters: { minArea?: number; maxArea?: number; minPrice?: number; maxPrice?: number }) => {
    const query = new URLSearchParams(
      Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== 0)
        .map(([key, value]) => [key, String(value)])
    );

    const response = await fetch(`/api/apartments?${query.toString()}`);
    const filteredApartments = await response.json();
    setApartments(filteredApartments);
  };

  const handleClear = () => {
    setApartments(initialApartments);
  };

  return (
    <Layout>
      <Navbar />
      <Container style={{ marginTop: '2rem' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '1rem', backgroundColor: 'white' }}>
            <FilterForm onFilter={handleFilter} onClear={handleClear} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <ApartmentTable apartments={apartments} />
        </Grid>
      </Grid>
    </Container>
    </Layout>
    
  );
};

export async function getServerSideProps() {
  const apartments = await prisma.apartment.findMany();
  return {
    props: { apartments },
  };
}

export default Home;
