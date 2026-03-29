import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import FavouritePage from "./pages/FavouritePage";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/forgetPasswordPage";
import InterestPage from "./pages/interestPage";
import NotificationPage from "./pages/notificationPage";
import NotificationPreferencesPage from "./pages/NotificationPreferencesPage";
import ResetPasswordPage from "./pages/resetPasswordPage";
import { AdoptionCompletionDemo } from "./pages/AdoptionCompletionDemo";
import PetListingDetailsPage from "./pages/PetlistingdetailsPage";
import EditAdoptionListing from "./pages/EditAdoptionListing";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import { SettlementSummaryPage } from "./pages/SettlementSummaryPage";
import AdoptionTimelinePage from "./pages/AdoptionTimelinePage";
import ModalPreview from "./pages/ModalPreview";
import StatusPollingDemo from "./pages/StatusPollingDemo";
import CustodyTimelinePage from "./pages/CustodyTimelinePage";
import AdminApprovalQueuePage from "./pages/AdminApprovalQueuePage";

function App() {

  return (
    <Routes>
      {/* Auth Routes - No Navbar/Footer */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset" element={<ResetPasswordPage />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />

      {/* Main App Routes - With Navbar/Footer */}
      <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
      <Route path="/favourites" element={<MainLayout><FavouritePage /></MainLayout>} />
      <Route path="/interests" element={<MainLayout><InterestPage /></MainLayout>} />
      <Route path="/listings" element={<MainLayout><ListingsPage /></MainLayout>} />
      <Route path="/listings/:id" element={<MainLayout><PetListingDetailsPage /></MainLayout>} />
      <Route path="/list-for-adoption" element={<MainLayout><EditAdoptionListing /></MainLayout>} />
      <Route path="/my-listings/:id" element={<MainLayout><ListingDetailsPage /></MainLayout>} />
      <Route path="/notifications" element={<MainLayout><NotificationPage /></MainLayout>} />
      <Route path="/notification-preferences" element={<MainLayout><NotificationPreferencesPage /></MainLayout>} />
      <Route path="/adoption/:adoptionId/settlement" element={<MainLayout><SettlementSummaryPage /></MainLayout>} />
      <Route path="/adoption/:adoptionId/timeline" element={<MainLayout><AdoptionTimelinePage /></MainLayout>} />

      {/* Admin Approvals */}
      <Route path="/admin/approvals" element={<MainLayout><AdminApprovalQueuePage /></MainLayout>} />

      {/* Custody Routes */}
      <Route path="/custody/:custodyId/timeline" element={<MainLayout><CustodyTimelinePage /></MainLayout>} />

      {/* Preview Routes */}
      <Route path="/preview-modal" element={<MainLayout><ModalPreview /></MainLayout>} />
      <Route path="/adoption-completion-demo" element={<MainLayout><AdoptionCompletionDemo /></MainLayout>} />
      <Route path="/status-polling-demo" element={<MainLayout><StatusPollingDemo /></MainLayout>} />
    </Routes>
  );
}

export default App;
