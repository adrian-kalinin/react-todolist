import { useState } from 'react';
import { Container, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TaskList from './TaskList';

function App() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <TabContext value={value}>
        <TabList onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Home" value="1" />
          <Tab label="Todos" value="2" />
        </TabList>
        <TabPanel value="1">
          <Typography variant="h1">
            Welcome!
          </Typography>
        </TabPanel>
        <TabPanel value="2">
          <TaskList />
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default App;
