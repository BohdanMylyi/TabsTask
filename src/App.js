import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import TabsContainer from "./components/mainComponents/TabsContainer";

import Dashboard from "./components/routePages/Dashboard";
import Banking from "./components/routePages/Banking";
import Phone from "./components/routePages/Telephonie";
import Statistics from "./components/routePages/Statistics";
import Administration from "./components/routePages/Administration";
import Accounting from "./components/routePages/Accounting";
import PostOffice from "./components/routePages/PostOffice";
import Verkauf from "./components/routePages/Verkauf";
import Help from "./components/routePages/Help";

const App = () => {
  return (
    <Router>
      <Box sx={{ width: "100vw", marginTop: '68px' }}>
        <TabsContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/help" element={<Help />} />
          <Route path="/phone" element={<Phone />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/post-office" element={<PostOffice />} />
          <Route path="/verkauf" element={<Verkauf />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
