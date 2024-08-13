import React from "react";
import { useRoutes } from "react-router-dom";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import Home from "./Pages/Home/Home";
import CompanyDashboard from "./Pages/Dashboard/Company Dashboard/ComanyDashboard";
import AddCompany from "./Pages/Dashboard/Company Dashboard/AddCompany";
import SpareDashboard from "./Pages/Dashboard/Spare Dashboard/SpareDashboard";
import AddSpare from "./Pages/Dashboard/Spare Dashboard/AddSpare";
import AddAsset from "./Pages/Dashboard/Asset Dashboard/AddAsset";
import Book from "./Pages/Book/Book";
import CompanyProfile from "./Pages/Dashboard/Company Dashboard/CompanyProfile";
import AssetProfile from "./Pages/Dashboard/Asset Dashboard/AssetProfile";
import CreateClientUser from "./Pages/Dashboard/Cleint Users Dashboard/CreateClientUser";
import UpdateSpare from "./Pages/Dashboard/Spare Dashboard/UpdateSpare";
import AddAssetSpare from "./Pages/Dashboard/Asset Dashboard/Spares/AddAssetSpare";
import UpdateCompany from "./Pages/Dashboard/Company Dashboard/UpdateCompany";
import UpdateAsset from "./Pages/Dashboard/Asset Dashboard/UpdateAsset";

const Routes = () => {
  return useRoutes([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />,
    },

    {
      path: "/company-dashboard",
      element: <CompanyDashboard />,
    },
    {
      path: "/spare-dashboard",
      element: <SpareDashboard />,
    },

    {
      path: "/add-company",
      element: <AddCompany />,
    },
    {
      path: "/update-company/:companyId",
      element: <UpdateCompany />,
    },
    {
      path: "/add-spare",
      element: <AddSpare />,
    },
    {
      path: "/update-spare/:spareId",
      element: <UpdateSpare />,
    },
    {
      path: "/add-asset/:companyId",
      element: <AddAsset />,
    },
    {
      path: "/book",
      element: <Book />,
    },
    {
      path: "/company-profile/:companyId",
      element: <CompanyProfile />,
    },
    {
      path: "/asset-profile/:assetId",
      element: <AssetProfile />,
    },
    {
      path: "/add-asset-spare/:assetId",
      element: <AddAssetSpare />,
    },
    {
      path: "/create-client-user/:companyId",
      element: <CreateClientUser />,
    },
    {
      path: "/update-asset/:assetId",
      element: <UpdateAsset />,
    },
    // {
    //     path: 'support',
    //     element: <Login />,
    // },

    // {
    //     path: '*',
    //     element: <Navigate to="/404" replace />,
    // },
  ]);
};

export default Routes;
