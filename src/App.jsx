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
import { getFlightsByAdminId, getFlightsByFarmerId } from "./api/FarmerApi";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFlights from "./pages/AdminFlights";
import NewFlight from "./pages/NewFlight";
import AdminFarmers from "./pages/AdminFarmers";
import NewFarmer from "./pages/NewFarmer";
import AdminSideMenu from "./components/layout/AdminSideMenu";
import FarmerProfile from "./pages/FarmerProfile";
import AdminProfile from "./pages/AdminProfile";

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

  const isAdmin = false;

  let tableQueryKey = undefined;
  let tableQueryFn = undefined;

  if (isAdmin) {
    tableQueryKey = ["adminFlights", 1];
    tableQueryFn = () => getFlightsByAdminId(1);
  } else {
    tableQueryKey = ["farmerFlights", 2];
    tableQueryFn = () => getFlightsByFarmerId(2);
  }

  const {
    data: tableData,
    error: tableError,
    isLoading: tableLoading,
  } = useQuery({
    queryKey: tableQueryKey,
    queryFn: tableQueryFn,
  });

  const completedFlights = tableData?.filter(
    (flight) => flight.status == "COMPLETED"
  );
  return (
    <Router>
      <div className="flex">
        <div
          className={`h-screen bg-white duration-300 ${
            open ? "w-[262px]" : "w-[65px]"
          }`}
        >
          {isAdmin ? (
            <AdminSideMenu open={open} setOpen={setOpen} />
          ) : (
            <SideMenu
              open={open}
              setOpen={setOpen}
              firstFlightId={tableData?.[0]?.id}
            />
          )}
        </div>
        <div className={`duration-300  flex-grow`}>
          <div className="overflow-y-auto h-screen px-4">
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
                  path="/admin/currentFlight"
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
                <Route
                  path="/admin/flights"
                  element={
                    <motion.div
                      key="adminFlights"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <AdminFlights />
                    </motion.div>
                  }
                />
                <Route
                  path="/admin/currentFlight/new"
                  element={
                    <motion.div
                      key="newFlight"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <NewFlight />
                    </motion.div>
                  }
                />
                <Route
                  path="/admin/farmers"
                  element={
                    <motion.div
                      key="farmers"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <AdminFarmers />
                    </motion.div>
                  }
                />
                <Route
                  path="/admin/farmers/new"
                  element={
                    <motion.div
                      key="newFarmers"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <NewFarmer />
                    </motion.div>
                  }
                />
                <Route
                  path="/admin/farmers/:farmerId"
                  element={
                    <motion.div
                      key="reports"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <FarmerProfile />
                    </motion.div>
                  }
                />
                <Route
                  path="/admin/profile"
                  element={
                    <motion.div
                      key="adminProfile"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <AdminProfile />
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
