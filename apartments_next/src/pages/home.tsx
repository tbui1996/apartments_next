import React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';
import FilterForm from '../components/FilterForm';
import ApartmentTable from '../components/ApartmentTable';
import { Apartment } from '@/types/types';

interface HomeProps {
apartments: Apartment[]
}
const Home = ({ apartments }: HomeProps) => {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '1rem', backgroundColor: 'white' }}>
            <FilterForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <ApartmentTable apartments={apartments} />
        </Grid>
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apartments = await prisma.apartment.findMany();
  return {
    props: { apartments },
  };
};

export default Home;
