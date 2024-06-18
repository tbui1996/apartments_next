import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@mui/material';

const FilterForm = () => {
  return (
    <Formik
      initialValues={{ keyword: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Field
            name="keyword"
            as={TextField}
            label="Search"
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;