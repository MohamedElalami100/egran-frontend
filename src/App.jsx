import "./App.css";
import SideMenu from "./components/layout/Sidemenu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Flights from "./pages/Flights";
import Profile from "./pages/Profile";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFlightsByFarmerId } from "./api/FarmerApi";
import AdminDashboard from "./pages/AdminDashboard";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3 },
  },
};

function App() {
  const [open, setOpen] = useState(false);

  // table data
  const tableQueryKey = ["farmer", 1];
  const tableQueryFn = () => getFlightsByFarmerId(1);

  const {
    data: tableData,
    error: tableError,
    isLoading: tableLoading,
  } = useQuery({
    queryKey: tableQueryKey,
    queryFn: tableQueryFn,
  });

  return (
    <Router>
      <div className="flex">
        <div
          className={`h-screen bg-white duration-300 ${
            open ? "w-[262px]" : "w-[65px]"
          }`}
        >
          <SideMenu open={open} setOpen={setOpen} />
        </div>
        <div className={`duration-300  flex-grow`}>
          <div className="overflow-y-auto h-screen p-4">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/dashboard"
                  element={
                    <motion.div
                      key="dashboard"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <Dashboard
                        tableData={tableData}
                        tableError={tableError}
                        tableLoading={tableLoading}
                      />
                    </motion.div>
                  }
                />
                <Route
                  path="/reports/flight/:flightId"
                  element={
                    <motion.div
                      key="reports"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <Reports
                        tableData={tableData}
                        tableError={tableError}
                        tableLoading={tableLoading}
                      />
                    </motion.div>
                  }
                />
                <Route
                  path="/flights"
                  element={
                    <motion.div
                      key="flights"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <Flights
                        tableData={tableData}
                        tableError={tableError}
                        tableLoading={tableLoading}
                      />
                    </motion.div>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <motion.div
                      key="profile"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <Profile />
                    </motion.div>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <motion.div
                      key="adminDashboard"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <AdminDashboard />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
