import "./App.css";
import SideMenu from "./components/layout/Sidemenu";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import { useAuth } from "./auth/AuthProvider";

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

function AppContent() {
  const [open, setOpen] = useState(false);

  const location = useLocation(); // Now useLocation is called after Router

  const isAdmin = location.pathname.startsWith("/admin");

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
    (flight) => flight.status === "COMPLETED"
  );

  return (
    <div className="flex">
      {location.pathname !== "/" && (
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
      )}
      <div className="duration-300 flex-grow">
        <div
          className={
            "overflow-y-auto h-screen " +
            (location.pathname !== "/" ? "px-4" : "")
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path=""
                element={
                  <motion.div
                    key="login"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <LoginPage />
                  </motion.div>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
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
                  </RequireAuth>
                }
              />

              <Route
                path="/reports/flight/:flightId"
                element={
                  <RequireAuth>
                    <motion.div
                      key="reports"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <Reports
                        tableData={completedFlights}
                        tableError={tableError}
                        tableLoading={tableLoading}
                      />
                    </motion.div>
                  </RequireAuth>
                }
              />

              <Route
                path="/flights"
                element={
                  <RequireAuth>
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
                  </RequireAuth>
                }
              />

              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <motion.div
                      key="profile"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <Profile />
                    </motion.div>
                  </RequireAuth>
                }
              />

              <Route
                path="/admin/currentFlight"
                element={
                  <RequireAuth>
                    <motion.div
                      key="adminDashboard"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <AdminDashboard />
                    </motion.div>
                  </RequireAuth>
                }
              />

              <Route
                path="/admin/flights"
                element={
                  <RequireAuth>
                    <motion.div
                      key="adminFlights"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <AdminFlights />
                    </motion.div>
                  </RequireAuth>
                }
              />

              <Route
                path="/admin/currentFlight/new"
                element={
                  <RequireAuth>
                    <motion.div
                      key="newFlight"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <NewFlight />
                    </motion.div>
                  </RequireAuth>
                }
              />

              <Route
                path="/admin/farmers"
                element={
                  <RequireAuth>
                    <motion.div
                      key="farmers"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <AdminFarmers />
                    </motion.div>
                  </RequireAuth>
                }
              />

              <Route
                path="/admin/farmers/new"
                element={
                  <RequireAuth>
                    <motion.div
                      key="newFarmers"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <NewFarmer />
                    </motion.div>
                  </RequireAuth>
                }
              />

              <Route
                path="/admin/farmers/:farmerId"
                element={
                  <RequireAuth>
                    <motion.div
                      key="farmerProfile"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <FarmerProfile />
                    </motion.div>
                  </RequireAuth>
                }
              />

              <Route
                path="/admin/profile"
                element={
                  <RequireAuth>
                    <motion.div
                      key="adminProfile"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                    >
                      <AdminProfile />
                    </motion.div>
                  </RequireAuth>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
