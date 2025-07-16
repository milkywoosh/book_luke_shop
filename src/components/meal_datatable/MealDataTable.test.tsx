
import data_table_meals from "../../data_sourcing_example/data_datatable";
import MealDataTable from "./MealDataTable";

import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';


test('renders MealDataTable component', () => {
  render(<MealDataTable data_source={data_table_meals} />);
  
  expect(screen.getByText('Meal Name')).toBeInTheDocument()
  expect(screen.getByText('Toast')).toBeInTheDocument()
  expect(screen.getByText('Green Pea')).toBeInTheDocument()
});