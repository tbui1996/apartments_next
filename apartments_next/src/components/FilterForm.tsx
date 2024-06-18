import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box } from '@mui/material';

interface FilterFormProps {
  onFilter: (filters: FilterValues) => void;
  onClear: () => void;
}

interface FilterValues {
  minArea?: number;
  maxArea?: number;
  minPrice?: number;
  maxPrice?: number;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter, onClear }) => {
  const formik = useFormik<FilterValues>({
    initialValues: {
      minArea: 0,
      maxArea: 0,
      minPrice: 0,
      maxPrice: 0
    },
    onSubmit: (values) => {
      onFilter(values);
    },
  });

  const handleClear = () => {
    formik.resetForm();
    onClear();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Min Area"
          name="minArea"
          value={formik.values.minArea}
          onChange={formik.handleChange}
          type="number"
        />
        <TextField
          label="Max Area"
          name="maxArea"
          value={formik.values.maxArea}
          onChange={formik.handleChange}
          type="number"
        />
        <TextField
          label="Min Price"
          name="minPrice"
          value={formik.values.minPrice}
          onChange={formik.handleChange}
          type="number"
        />
        <TextField
          label="Max Price"
          name="maxPrice"
          value={formik.values.maxPrice}
          onChange={formik.handleChange}
          type="number"
        />
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleClear}>Clear All Filters</Button>
          <Button type="submit" variant="contained" color="primary">Search</Button>
        </Box>
      </Box>
    </form>
  );
};

export default FilterForm;
