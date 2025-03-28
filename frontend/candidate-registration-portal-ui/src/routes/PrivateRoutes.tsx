import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import PersonalDetails from "@/pages/PersonalDetails";
import QualificationDetails from "@/pages/QualificationDetails";
import BranchPreferenceDetails from "@/pages/BranchPreferenceDetails";
import CommunicationDetails from "@/pages/CommunicationDetails";
import DocumentsUploadDetails from "@/pages/DocumentsUploadDetails";
import ApplicationPreviewDetails from "@/pages/ApplicationPreviewDetails";
import PaymentDetails from "@/pages/PaymentDetails";
import ApplicationStatusDetails from "@/pages/ApplicationStatusDetails";
import { useAuth } from "@/hooks/useAuth";

const PrivateRoutes = () => {
    const { user } = useAuth();

    return user ? (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/personal-details" element={<PersonalDetails />} />
                <Route path="/qualification-details" element={<QualificationDetails />} />
                <Route path="/branch-preference" element={<BranchPreferenceDetails />} />
                <Route path="/communication-details" element={<CommunicationDetails />} />
                <Route path="/documents-upload" element={<DocumentsUploadDetails />} />
                <Route path="/application-preview" element={<ApplicationPreviewDetails />} />
                <Route path="/payment-details" element={<PaymentDetails />} />
                <Route path="/application-status" element={<ApplicationStatusDetails />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </AppLayout>
    ) : (
        <Navigate to="/auth/login" replace />
    );
};

export default PrivateRoutes;
